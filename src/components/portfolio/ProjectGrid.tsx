// src/components/portfolio/ProjectGrid.tsx

import { ProjectCard } from './ProjectCard';
import { Project } from '@/types/project';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          priority={index < 3} // Optimize first 3 images (above-fold)
        />
      ))}
    </div>
  );
}
