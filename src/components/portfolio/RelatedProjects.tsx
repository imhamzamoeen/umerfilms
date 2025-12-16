// src/components/portfolio/RelatedProjects.tsx
'use client';

import { Category } from '@/types/project';
import { getRelatedProjects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { PageWrapper } from '@/components/layout';

interface RelatedProjectsProps {
  currentProjectId: string;
  category: Category;
  limit?: number;
}

export function RelatedProjects({
  currentProjectId,
  category,
  limit = 3
}: RelatedProjectsProps) {
  const relatedProjects = getRelatedProjects(currentProjectId, category, limit);

  // Don't render if no related projects
  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-surface">
      <PageWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12">
          More Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {relatedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showPreview={false}
            />
          ))}
        </div>
      </PageWrapper>
    </section>
  );
}
