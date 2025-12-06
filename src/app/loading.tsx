export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(166, 218, 149, .15) 25%, rgba(166, 218, 149, .15) 26%, transparent 27%, transparent 74%, rgba(166, 218, 149, .15) 75%, rgba(166, 218, 149, .15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(166, 218, 149, .15) 25%, rgba(166, 218, 149, .15) 26%, transparent 27%, transparent 74%, rgba(166, 218, 149, .15) 75%, rgba(166, 218, 149, .15) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      <div className="relative space-y-6 w-full max-w-sm px-4">
        {/* Minimal top line */}
        <div className="h-px bg-cat-green/40" />

        {/* Centered content */}
        <div className="text-center">
          {/* Simple glowing text with animated dots */}
          <div
            className="font-mono text-lg text-cat-green"
            style={{
              textShadow: "0 0 15px rgba(166, 218, 149, 0.5)",
              letterSpacing: "0.05em",
              minHeight: "1.75rem",
            }}
          >
            <span className="animate-pulse">▌</span> processing
            <span
              style={{
                display: "inline-block",
                width: "12px",
                marginLeft: "2px",
              }}
            >
              <span
                style={{
                  animation: "dot-blink 1.4s infinite",
                }}
              >
                .
              </span>
              <span
                style={{
                  animation: "dot-blink 1.4s infinite 0.2s",
                }}
              >
                .
              </span>
              <span
                style={{
                  animation: "dot-blink 1.4s infinite 0.4s",
                }}
              >
                .
              </span>
            </span>
          </div>

          {/* Shimmer line - like a page load bar */}
          <div className="h-0.5 bg-cat-surface0 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-gradient-to-r from-transparent via-cat-green to-transparent"
              style={{
                animation: "shimmer 1.5s infinite",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes dot-blink {
          0%, 20%, 50%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
