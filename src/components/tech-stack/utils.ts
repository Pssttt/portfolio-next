export function getTechIconUrl(techName: string): string {
  const iconMap: Record<string, string> = {
    // Frontend
    React: "react",
    "Next.js": "next.js",
    TypeScript: "typescript",
    TailwindCSS: "tailwindcss",
    "shadcn/ui": "shadcnui",

    // Backend
    "Node.js": "node.js",
    Hono: "hono",
    Express: "express",
    "REST API": "swagger",
    Swagger: "swagger",

    // Databases
    PostgreSQL: "postgresql",
    MySQL: "mysql",
    Prisma: "prisma",
    SQLite: "sqlite",

    // Cloud & IaC
    Docker: "docker",
    Terraform: "terraform",

    // Orchestration
    Kubernetes: "kubernetes",
    "Docker Compose": "docker",
    Ansible: "ansible",

    // CI/CD
    "GitHub Actions": "githubactions",
    Jenkins: "jenkins",
    Nginx: "nginx",

    // Languages
    JavaScript: "javascript",
    Python: "python",
    Go: "go",
    Java: "openjdk",

    // Tools
    Git: "git",
    Neovim: "neovim",
    Wezterm: "wezterm",
    Postman: "postman",
  };

  const slug = iconMap[techName];
  if (!slug) return "";

  // Catppuccin sapphire (#74c7ec) - dark blue-ish
  return `https://cdn.simpleicons.org/${slug}/74c7ec`;
}
