import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";
import {
  getUserReplyEmail,
  getAdminNotificationEmail,
} from "@/lib/email-templates";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const MESSAGES_FILE = path.join(process.cwd(), "data", "contact-messages.json");
const resend = new Resend(process.env.RESEND_API_KEY);

async function ensureMessagesFile() {
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.mkdir(path.dirname(MESSAGES_FILE), { recursive: true });
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    name = String(name).trim();
    email = String(email).trim().toLowerCase();
    message = String(message).trim();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Fields cannot be empty" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name is too long (max 100 characters)" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Message is too long (max 5000 characters)" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await ensureMessagesFile();
    const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages: ContactMessage[] = JSON.parse(fileContent);

    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    messages.push(newMessage);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    // Send notification to admin
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: process.env.CONTACT_EMAIL,
          subject: `New message from ${sanitizeHtml(name)}`,
          html: getAdminNotificationEmail({
            name: sanitizeHtml(name),
            email,
            message: sanitizeHtml(message).replace(/\n/g, "<br>"),
          }),
        });
      } catch (emailError) {
        console.error("Failed to send admin email:", emailError);
      }
    }

    // Send auto-reply to visitor
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: email,
          subject: "Thanks for reaching out",
          html: getUserReplyEmail({
            name: sanitizeHtml(name),
            message: sanitizeHtml(message).replace(/\n/g, "<br>"),
          }),
        });
      } catch (emailError) {
        console.error("Failed to send auto-reply:", emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message received! I'll get back to you soon.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request: Request) {
  try {
    const headersList = request.headers;
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

    await ensureMessagesFile();
    const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
    const messages: ContactMessage[] = JSON.parse(fileContent);

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
