import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "#1e1e1e",
            borderRadius: "12px",
            border: "1px solid #333",
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
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
            <div style={{ display: "flex", gap: "8px" }}>
              {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: c }} />
              ))}
            </div>
            <div style={{ marginLeft: "auto", color: "#888", fontSize: 14 }}>
              psst@portfolio: ~/projects
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "50px",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <span style={{ color: "#27c93f", marginRight: 10, fontSize: 22 }}>➜</span>
              <span style={{ color: "#569cd6", marginRight: 10, fontSize: 22 }}>~/projects</span>
              <span style={{ color: "#d4d4d4", fontSize: 22 }}>cat {slug}.md</span>
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 20,
                display: "-webkit-box" as never,
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as never,
                overflow: "hidden",
              }}
            >
              {project?.title ?? slug}
            </div>
            {project?.description && (
              <div style={{ fontSize: 22, color: "#888", marginBottom: 24 }}>
                {project.description.slice(0, 100)}
              </div>
            )}
            {project?.technologies && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" as never }}>
                {project.technologies.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "4px 12px",
                      backgroundColor: "#2d2d2d",
                      color: "#569cd6",
                      borderRadius: "6px",
                      fontSize: 18,
                      border: "1px solid #444",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
