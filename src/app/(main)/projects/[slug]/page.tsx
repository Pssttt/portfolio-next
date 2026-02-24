import Link from "next/link";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ScrollToTitle } from "@/components/projects/ScrollToTitle";

export function generateStaticParams() {
  return projects
    .filter((p) => p.slug)
    .map((project) => ({
      slug: project.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.fullDescription || project.description,
    keywords: [...project.technologies, project.title],
    authors: [{ name: "Pyae Sone Shin Thant" }],
    twitter: {
      card: "summary",
      title: project.title,
      description: project.fullDescription || project.description,
      creator: "@pssteee",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project || !project.slug) {
    notFound();
  }

  return (
    <>
      <ScrollToTitle />
      <div className="space-y-8">
        <Link
          href="/projects"
          className="text-sm text-cat-sky hover:text-cat-sapphire hover:underline transition-colors inline-flex items-center gap-1"
        >
          ← Back to Projects
        </Link>

        <div id="project-title" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-bold text-cat-sapphire">
                  {project.title}
                </h1>
                {project.status && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-cat-yellow/20 text-cat-yellow border border-cat-yellow/40 rounded-full">
                    {project.status}
                  </span>
                )}
              </div>
              {project.timeline && (
                <p className="text-base font-mono text-cat-mauve">
                  {project.timeline}
                </p>
              )}
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cat-sky hover:text-cat-sapphire hover:underline transition-colors inline-flex items-center gap-1"
              >
                View Repository →
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-cat-teal bg-cat-teal/20 text-cat-teal hover:bg-cat-teal/30 hover:border-cat-teal/80 hover:scale-105 hover:drop-shadow-lg rounded transition-all inline-flex items-center gap-1 text-sm font-semibold"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <h2 className="text-2xl font-bold text-cat-sapphire mb-4">
            Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <h2 className="text-xl font-bold text-cat-peach mb-4">Challenge</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <h2 className="text-xl font-bold text-cat-green mb-4">Solution</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.solution}
          </p>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-cat-teal font-semibold uppercase tracking-wide mb-4">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs text-cat-mauve bg-cat-surface0 border border-cat-surface1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-cat-green font-semibold uppercase tracking-wide mb-4">
                  Metrics
                </p>
                <div className="space-y-2.5">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <span className="text-cat-peach">◆</span>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-cat-yellow font-semibold uppercase tracking-wide mb-4">
                Highlights
              </p>
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="text-cat-green flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
