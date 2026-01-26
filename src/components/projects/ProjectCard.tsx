"use client";

import { Project } from "@/data/projects";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  const cardContent = (
    <div className="border border-primary/20 rounded-lg p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 h-full">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-cat-sapphire">
                {project.title}
              </h3>
              {project.status && (
                <span className="px-2.5 py-1 text-xs font-medium bg-cat-yellow/20 text-cat-yellow border border-cat-yellow/40 rounded-full">
                  {project.status}
                </span>
              )}
            </div>
            {project.timeline && (
              <p className="text-sm font-mono text-cat-mauve">
                {project.timeline}
              </p>
            )}
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          {!project.slug && project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm text-cat-sky hover:text-cat-sapphire transition-colors"
            >
              View Repository →
            </a>
          )}
        </div>

        <div className="border-t border-primary/20 pt-6">
          <p className="text-xs text-cat-teal font-semibold uppercase tracking-wide mb-4">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs text-cat-mauve bg-cat-surface0 border border-cat-surface1 rounded hover:border-cat-sapphire/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="border-t border-primary/20 pt-6">
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
        )}

        {project.highlights && project.highlights.length > 0 && (
          <div className="border-t border-primary/20 pt-6">
            <p className="text-xs text-cat-yellow font-semibold uppercase tracking-wide mb-4">
              Highlights
            </p>
            <ul className="space-y-2">
              {project.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="text-cat-green">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!project.slug && (
          <div className="flex gap-3 flex-wrap items-center pt-4 border-t border-primary/20">
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
        )}
      </div>
    </div>
  );

  if (project.slug) {
    return (
      <Link href={`/projects/${project.slug}`} className="block no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
