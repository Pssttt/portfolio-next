import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
              psst@portfolio: ~
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
              <span style={{ color: "#569cd6", marginRight: 10, fontSize: 22 }}>~</span>
              <span style={{ color: "#d4d4d4", fontSize: 22 }}>whoami</span>
            </div>
            <div style={{ fontSize: 64, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
              Pyae Sone Shin Thant
            </div>
            <div style={{ fontSize: 28, color: "#569cd6", marginBottom: 8 }}>
              DevOps Engineer Intern @ social.plus
            </div>
            <div style={{ fontSize: 22, color: "#888" }}>
              Backend Development · Cloud Infrastructure · CI/CD
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
              <span style={{ color: "#27c93f", marginRight: 10, fontSize: 22 }}>➜</span>
              <span style={{ color: "#569cd6", marginRight: 10, fontSize: 22 }}>~</span>
              <div style={{ width: 12, height: 24, backgroundColor: "#d4d4d4" }} />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
