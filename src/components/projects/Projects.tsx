import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <div key={project.slug || project.title}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
