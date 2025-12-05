export interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  metrics: string[];
  status?: string;
  repoUrl?: string;
  demoUrl?: string;
  slug?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
}

export const projects: Project[] = [
  {
    title: "Smart City Hub - University Integrated Project (Dev Lead)",
    description:
      "Smart city platform with OpenAPI-first architecture and enterprise standards",
    fullDescription:
      "A comprehensive smart city platform built with a focus on scalability and developer experience. Leading development practices and infrastructure setup for a 50+ developer team across 16 teams, establishing best practices in error handling, routing patterns, and CI/CD pipelines.",
    challenge:
      "Managing a large-scale university project with multiple teams required establishing clear architectural patterns and development standards to prevent conflicts and ensure consistency across 50+ developers.",
    solution:
      "Implemented OpenAPI-first architecture with Hono and Zod validation, established comprehensive development standards, and set up professional tooling including ESLint, Prettier, Husky, and lint-staged to maintain code quality.",
    technologies: [
      "React",
      "Hono",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "OpenAPI",
      "Orval",
      "TanStack Query",
      "pnpm",
    ],
    metrics: [
      "50+ developers across 16 teams",
      "Established CI/CD pipeline",
      "Reduced merge conflicts by 60%",
    ],
    highlights: [
      "OpenAPI specification with Hono and Zod validation",
      "Development standards: error handling, routing patterns, PR workflows",
      "Professional tooling: ESLint, Prettier, Husky, lint-staged",
    ],
    status: "In Progress",
    repoUrl: "https://github.com/orgs/CSC290-2025/repositories?type=source",
    demoUrl: "https://smartcity.sit.kmutt.ac.th/",
    slug: "smart-city-hub",
  },
  {
    title: "CS First Date - Junior-Senior Pair Matching Platform",
    description:
      "Senior-organized fresher welcome event with witch-themed matching game for CS juniors",
    fullDescription:
      "An interactive web platform designed for a university CS department event to match junior students with senior mentors. Features real-time matching, Azure AD authentication for university integration, and a witch-themed UI for an engaging user experience.",
    challenge:
      "Creating a real-time event platform that could handle 100+ concurrent users with instant matching and updates, while integrating with university Azure AD for authentication.",
    solution:
      "Built a monorepo architecture using Turbo for efficient multi-package management, implemented real-time updates with WebSockets, and integrated Azure MSAL for secure university authentication.",
    technologies: [
      "React",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Azure MSAL",
      "Cloudinary",
      "TanStack Query",
    ],
    metrics: ["100+ students registered", "Real-time event with 0 downtime"],
    highlights: [
      "Azure AD authentication for university student verification",
      "Monorepo architecture with Turbo for multi-package management",
      "Real-time countdown and live event indicators for matching",
    ],
    repoUrl: "https://github.com/KimTaeman/CSFD",
    demoUrl: "https://csfd.sit.kmutt.ac.th/",
    slug: "cs-first-date",
  },
  {
    title: "Stylofi - Fashion Social Platform",
    description:
      "Pinterest-like platform with AI-powered fashion content validation",
    fullDescription:
      "A social platform for fashion enthusiasts featuring AI-powered content validation using Google Cloud Vision API. Users can upload fashion images, share styling tips, and connect with other fashion lovers in a Pinterest-like feed interface.",
    challenge:
      "Ensuring high-quality fashion content while maintaining fast image processing times and preventing inappropriate content uploads.",
    solution:
      "Integrated Google Cloud Vision API for automated fashion image validation with >95% accuracy, implemented JWT authentication with OTP verification, and optimized image storage and processing using Cloudinary.",
    technologies: [
      "React",
      "Hono",
      "Prisma",
      "PostgreSQL",
      "Google Cloud Vision API",
      "Cloudinary",
      "JWT",
    ],
    metrics: [
      "AI validation accuracy >95%",
      "Image processing <2s per upload",
      "Built in 48-hour hackathon",
    ],
    highlights: [
      "Google Cloud Vision API for automated fashion image validation",
      "JWT authentication with OTP verification via Nodemailer",
      "Image storage and optimization pipeline using Cloudinary",
    ],
    repoUrl: "https://github.com/CSC105-2024/G15-stylofi-PreHack-2025",
    demoUrl: "https://stylofi.psstee.dev/",
    slug: "stylofi",
  },
  {
    title: "HuhOh - Gen Z Slang Translation Platform (Hackathon Project)",
    description:
      "Collaborative platform for translating Gen Z slang with AI assistance",
    fullDescription:
      "An interactive platform designed to bridge the generation gap by translating trendy Gen Z slang into standard language and vice versa. Powered by Google Gemini AI, it features collaborative translation submissions and comprehensive history tracking.",
    challenge:
      "Creating an AI system that understands context and nuances of slang, while allowing community contributions to expand the translation database.",
    solution:
      "Leveraged Google Gemini AI for contextual interpretation of slang, implemented a shared translation feature allowing users to contribute, and built history tracking to help users learn over time.",
    technologies: [
      "React",
      "Hono",
      "Prisma",
      "PostgreSQL",
      "Google Gemini AI",
      "Cloudinary",
      "JWT",
    ],
    metrics: ["100+ translations in database", "AI response time <3s"],
    highlights: [
      "AI-powered translation using Google Gemini for contextual interpretation",
      "Shared translation feature for collaborative learning",
      "Comprehensive history tracking for translations",
    ],
    repoUrl: "https://github.com/Pssttt/huhoh",
    demoUrl: "https://huhoh.psstee.dev/",
    slug: "huhoh",
  },
];
