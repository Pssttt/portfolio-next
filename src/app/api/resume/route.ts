import { headers } from "next/headers";
import { promises as fs } from "fs";
import path from "path";

interface Download {
  timestamp: string;
  userAgent: string;
  referer: string;
  ip: string;
}

const DOWNLOADS_FILE = path.join(process.cwd(), "data", "resume-downloads.json");

async function ensureDownloadsFile() {
  try {
    await fs.access(DOWNLOADS_FILE);
  } catch {
    await fs.mkdir(path.dirname(DOWNLOADS_FILE), { recursive: true });
    await fs.writeFile(DOWNLOADS_FILE, JSON.stringify([], null, 2));
  }
}

function getClientIp(headersList: Awaited<ReturnType<typeof headers>>): string {
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "unknown";
    const referer = headersList.get("referer") || "direct";
    const ip = getClientIp(headersList);

    // Ensure file exists
    await ensureDownloadsFile();

    // Read existing downloads
    const fileContent = await fs.readFile(DOWNLOADS_FILE, "utf-8");
    const downloads: Download[] = JSON.parse(fileContent);

    // Add new download record
    const newDownload: Download = {
      timestamp: new Date().toISOString(),
      userAgent,
      referer,
      ip,
    };

    downloads.push(newDownload);

    // Write updated data
    await fs.writeFile(DOWNLOADS_FILE, JSON.stringify(downloads, null, 2));

    // Return success response instead of redirect
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error tracking resume download:", error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const headersList = await headers();

    // Check for basic auth or admin token
    const authHeader = headersList.get("authorization");
    const token = process.env.ADMIN_TOKEN;

    if (
      !token ||
      !authHeader ||
      !authHeader.startsWith("Bearer ") ||
      authHeader.slice(7) !== token
    ) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return download stats
    await ensureDownloadsFile();
    const fileContent = await fs.readFile(DOWNLOADS_FILE, "utf-8");
    const downloads: Download[] = JSON.parse(fileContent);

    const stats = {
      totalDownloads: downloads.length,
      downloads: downloads,
      uniqueIPs: [...new Set(downloads.map((d) => d.ip))].length,
      lastDownload: downloads[downloads.length - 1]?.timestamp || null,
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching resume stats:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
