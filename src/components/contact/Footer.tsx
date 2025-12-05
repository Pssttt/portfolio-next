export function Footer() {
  const systemInfo = [
    { label: "name", value: "Pyae Sone Shin Thant", color: "text-cat-blue" },
    {
      label: "role",
      value: "CS Student",
      color: "text-cat-blue",
    },
    {
      label: "focus",
      value: "DevOps & Backend Development",
      color: "text-cat-blue",
    },
    {
      label: "email",
      value: "me@psstee.dev",
      color: "text-cat-sky",
      link: "mailto:me@psstee.dev",
    },
    {
      label: "github",
      value: "github.com/Pssttt",
      color: "text-cat-sky",
      link: "https://github.com/Pssttt",
    },
    {
      label: "linkedin",
      value: "linkedin.com/in/pssteee",
      color: "text-cat-sky",
      link: "https://www.linkedin.com/in/pssteee/",
    },
    {
      label: "resume",
      value: "resume.pdf",
      color: "text-cat-sky",
      link: "/resume.pdf",
    },
  ];

  const availability = [
    "Full-time positions",
    "Internship opportunities",
    "Contract work",
    "Remote opportunities",
  ];

  return (
    <div className="space-y-8">
      {/* Fastfetch-style display */}
      <div className="flex gap-8">
        {/* ASCII Art */}
        <div className="hidden lg:block text-primary font-mono text-xs leading-tight whitespace-pre">
          {`  .-"""-.
 /      o\\
|    o   0).-.
|       .-;(_/     .-.
 \\     /  /)).---._|  \`\\   ,
  '.  '  /((       \`'-./ _/|
    \\  .'  )        .-.;\`  /
     '.             |  \`\\-'
       '._        -'    /
         \`\`""--\`------\``}
        </div>

        {/* System Info */}
        <div className="flex-1 space-y-1 font-mono text-sm">
          {systemInfo.map((info, i) => (
            <div key={i} className="flex gap-1">
              <span className="text-cat-red w-20 sm:w-24 flex-shrink-0">{info.label}</span>
              <span className="text-muted-foreground flex-shrink-0">~</span>
              {info.link ? (
                <a
                  href={info.link}
                  target={info.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`${info.color} hover:underline transition-colors break-words`}
                >
                  {info.value}
                </a>
              ) : (
                <span className={`${info.color} break-words`}>{info.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Availability Section */}
      <div className="pt-6 border-t border-primary/30">
        <h3 className="text-foreground text-sm font-medium mb-3 uppercase tracking-wider">
          Availability
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {availability.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="text-cat-green">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* c2a */}
      <div className="pt-4 text-muted-foreground text-sm">
        <p>
          <span className="text-foreground">&gt; </span>
          Looking for opportunities to contribute to open-source projects and
          grow as a developer.
        </p>
      </div>
    </div>
  );
}
