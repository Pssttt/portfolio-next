import Link from "next/link";

export default function Home() {
  const labelItems = [
    { label: "Projects", href: "/projects" },
    { label: "Tech Stack", href: "/tech-stack" },
    { label: "About", href: "/about" },
    { label: "Blogs", href: "/blogs" },
  ];

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-5xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <p className="text-primary font-mono text-sm sm:text-base">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Pyae Sone Shin Thant
              </h1>
            </div>

            <div className="space-y-3">
              <p className="text-lg sm:text-2xl text-muted-foreground">
                Computer Science Student · Backend & DevOps Enthusiast
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                I build scalable backend systems and infrastructure. Passionate
                about solving complex problems through clean code and DevOps
                practices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/projects"
                className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/80 transition-colors text-center"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-cat-sky text-foreground font-medium rounded-lg hover:bg-cat-sky/10 transition-colors text-center"
              >
                Get in Touch
              </Link>
            </div>

            <div className="pt-8 border-t border-primary/20">
              <p className="text-xs text-muted-foreground mb-4">Explore more</p>
              <div className="flex flex-wrap gap-3">
                {labelItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-mono"
                  >
                    → {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer accent */}
      <div className="h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />
    </div>
  );
}
