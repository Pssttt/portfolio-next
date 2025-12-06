import { ImageResponse } from "next/og";
import { getAllBlogPosts } from "@/lib/blogs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            color: "white",
            background: "linear-gradient(to bottom, #1e1e2e, #09090b)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Post not found
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#09090b",
          padding: "40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Terminal Window Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "#1e1e1e",
            borderRadius: "12px",
            boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid #333",
            overflow: "hidden",
          }}
        >
          {/* Window Chrome / Title Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "48px",
              backgroundColor: "#2d2d2d",
              padding: "0 20px",
              borderBottom: "1px solid #333",
            }}
          >
            {/* Traffic Lights */}
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#ff5f56",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#ffbd2e",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#27c93f",
                }}
              />
            </div>
            {/* Title Bar Text */}
            <div style={{ marginLeft: "auto", color: "#888", fontSize: 14 }}>
              psst@portfolio: ~/blog
            </div>
          </div>

          {/* Terminal Content Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              color: "#d4d4d4",
              fontSize: 24,
              lineHeight: 1.5,
              flex: 1,
            }}
          >
            {/* Command Line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <span style={{ color: "#27c93f", marginRight: 10 }}>➜</span>
              <span style={{ color: "#569cd6", marginRight: 10 }}>~</span>
              <span>bat ./posts/{post.date}.md</span>
            </div>

            {/* The Actual "Content" (Title) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
                padding: 20,
                borderLeft: "4px solid #569cd6",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "#6a9955",
                  marginBottom: 10,
                  fontSize: 20,
                }}
              >
                # Metadata: Public
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 10,
                  textShadow: "0 0 10px rgba(255,255,255,0.3)",
                  wordWrap: "break-word",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical" as const,
                }}
              >
                {post.title}
              </div>
            </div>

            {/* Blinking Cursor Simulation */}
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 30 }}
            >
              <span style={{ color: "#27c93f", marginRight: 10 }}>➜</span>
              <span style={{ color: "#569cd6", marginRight: 10 }}>~</span>
              <div
                style={{ width: 12, height: 24, backgroundColor: "#d4d4d4" }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
