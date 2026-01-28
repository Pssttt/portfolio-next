interface Section {
  title: string;
  color: string;
  items: string[];
}

const sections: Section[] = [
  {
    title: "Areas of Focus",
    color: "text-cat-red",
    items: [
      "Container Orchestration & Docker",
      "Cloud Infrastructure (AWS)",
      "Backend API Development",
      "Database Design & Management",
      "Infrastructure as Code & Automation",
      "CI/CD Pipeline Implementation",
    ],
  },
  {
    title: "Leadership Experience",
    color: "text-cat-mauve",
    items: [
      "Dev Lead: Leading development practices and technical standards across 16 teams",
      "Co-Infrastructure Lead: Managing infrastructure setup and deployment pipelines",
      "Coordinating 50+ developers in a university integrated project",
    ],
  },
  {
    title: "Currently Learning",
    color: "text-cat-yellow",
    items: [
      "Go (Golang) for systems programming",
      "Kubernetes for container orchestration",
      "Terraform for Infrastructure as Code",
      "Ansible for configuration management & automation",
      "AWS & Azure cloud platforms",
    ],
  },
  {
    title: "Current Goals",
    color: "text-cat-green",
    items: [
      "Seeking internship or entry-level opportunities in DevOps/Backend roles",
      "Building production-ready projects to improve practical skills",
      "Contributing to open-source projects",
    ],
  },
  {
    title: "Achievements",
    color: "text-cat-sapphire",
    items: [
      "1st Runner Up - IOT 2026 KMUTT Hackathon: Developed an NFC-based attendance tracking system with integrated IoT hardware and a full-stack management platform.",
      "2nd Runner Up - Hack Hed Dee Hackathon (2025) for Thai Sign Language Translation App",
    ],
  },
  {
    title: "Certifications",
    color: "text-cat-teal",
    items: [
      "DevOps Mastery Specialization - Coursera (In Progress)",
      "AWS Certified Cloud Practitioner (In Progress)",
    ],
  },
  {
    title: "Volunteer Experience",
    color: "text-cat-yellow",
    items: [
      "FOSSASIA - Contributing to open-source projects and community initiatives",
      "KMUTT Buddies Program - Mentoring and supporting students",
    ],
  },
];

function SectionBlock({ title, color, items }: Section) {
  return (
    <div className="pt-6 space-y-3">
      <h3 className={`${color} font-medium text-sm uppercase tracking-wider`}>
        {title}
      </h3>
      <ul className="text-base text-secondary space-y-2 pl-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="space-y-3 text-base leading-relaxed">
        <p className="text-foreground text-lg">
          Computer Science Student with a strong passion for DevOps Engineering
          and Backend Development.
        </p>
        <p className="text-secondary">
          <span className="text-primary">&gt;</span> Currently pursuing my
          degree while actively building skills in containerization, cloud
          infrastructure, and CI/CD pipelines. Passionate about automating
          workflows, optimizing system performance, and creating scalable
          backend solutions.
        </p>
        <p className="text-secondary">
          <span className="text-primary">&gt;</span> Serving as Dev Lead and
          Co-Infrastructure Lead for a university integrated project with 50+
          contributors across 16 teams, managing development workflows,
          infrastructure setup, and cross-team collaboration.
        </p>
        <p className="text-secondary">
          <span className="text-primary">&gt;</span> Hands-on experience with
          modern development tools and cloud platforms through personal projects
          and self-study. Eager to apply theoretical knowledge to real-world
          challenges and contribute to collaborative development teams.
        </p>
      </div>

      {/* Dynamic Sections */}
      {sections.map((section) => (
        <SectionBlock key={section.title} {...section} />
      ))}

      {/* Configs - Special Section */}
      <div className="pt-6 space-y-3">
        <h3 className="text-cat-blue font-medium text-sm uppercase tracking-wider">
          Configs
        </h3>
        <p className="text-base text-secondary pl-4">
          <span className="text-primary">▸</span> Check out my{" "}
          <a
            href="https://github.com/Pssttt/dotfiles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cat-sky hover:text-cat-sapphire underline transition-colors"
          >
            dotfiles
          </a>{" "}
          for my development environment setup and configurations
        </p>
      </div>
    </div>
  );
}
