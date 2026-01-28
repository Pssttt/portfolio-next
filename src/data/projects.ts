export interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  metrics: string[];
  status?: string;
  timeline?: string;
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
    status: "Completed",
    timeline: "Aug 2025 – Dec 2025",
    repoUrl: "https://github.com/orgs/CSC290-2025/repositories?type=source",
    demoUrl: "https://smartcity.sit.kmutt.ac.th/",
    slug: "smart-city-hub",
  },
  {
    title: "Student–Mentor Booking Platform (Freelance)",
    description:
      "Backend service for a one-on-one booking platform with session management (Private Repo)",
    fullDescription:
      "Built and maintained a backend service for a one-on-one booking platform, handling scheduling, availability validation, and session management. Designed for scalability and reliability with containerized deployments.",
    challenge:
      "Preventing double-bookings and ensuring reliable media uploads while managing secure session-based authentication for multiple user roles.",
    solution:
      "Implemented transactional workflows with Prisma to ensure data consistency, designed a scalable media upload flow using AWS S3 presigned URLs, and containerized services for consistent deployment.",
    technologies: [
      "NestJS",
      "Prisma",
      "Docker",
      "AWS S3",
      "CloudFront",
      "PostgreSQL",
    ],
    metrics: [
      "Prevented double-bookings via transactions",
      "Scalable media uploads with S3/CloudFront",
      "Containerized deployment",
    ],
    highlights: [
      "Transactional workflows for scheduling integrity",
      "AWS S3 presigned URLs for direct client uploads",
      "Role-based access control and session management",
    ],
    status: "In Progress",
    timeline: "Nov 2025 – Present",
    slug: "mentor-booking",
  },
  {
    title: "Automated Court Booking System",
    description:
      "Automated backend service for time-sensitive Google Form bookings",
    fullDescription:
      "Developed an automated backend service to submit time-sensitive Google Form bookings on behalf of users. Engineered for reliability with precise scheduling to handle strict timing windows.",
    challenge:
      "Handling strict timing windows for booking submissions and managing external request failures reliably.",
    solution:
      "Implemented precise scheduling and retry logic, containerized the application for predictable runtime behavior on Linux servers, and set up monitoring for execution reliability.",
    technologies: ["Python", "FastAPI", "Docker", "Linux"],
    metrics: [
      "Precise scheduling logic",
      "Automated failure handling",
      "Consistent task completion",
    ],
    highlights: [
      "Automated Google Form submission engine",
      "Retry logic for network reliability",
      "Containerized Linux deployment",
    ],
    status: "Completed",
    timeline: "Jun 2025 – Jul 2025",
    repoUrl: "https://github.com/Pssttt/court-booking",
    demoUrl: "https://booking.psstee.dev",
    slug: "court-booking",
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
    timeline: "April 2025 – May 2025",
    repoUrl: "https://github.com/Pssttt/stylofi",
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
    timeline: "May 2025 – June 2025",
    repoUrl: "https://github.com/Pssttt/huhoh",
    demoUrl: "https://huhoh.psstee.dev/",
    slug: "huhoh",
  },
];
