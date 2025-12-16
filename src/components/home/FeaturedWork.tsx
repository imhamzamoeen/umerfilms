// src/components/home/FeaturedWork.tsx

import Link from 'next/link';
import { PageWrapper } from '@/components/layout';
import { ProjectCard } from '@/components/portfolio';
import { getFeaturedProjects, getAllProjects } from '@/data/projects';

export function FeaturedWork() {
  // Get featured projects
  let featuredProjects = getFeaturedProjects();

  // Fallback: if no featured projects, use first 3 from all projects
  // This ensures the section always displays content
  if (featuredProjects.length === 0) {
    featuredProjects = getAllProjects().slice(0, 3);
  }

  // Limit to 3 projects for homepage
  const displayProjects = featuredProjects.slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-surface">
      <PageWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Featured Work
        </h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={index < 3} // Optimize first 3 images
            />
          ))}
        </div>

        {/* View All Work Link */}
        <div className="text-center">
          <Link
            href="/work"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View All Work
          </Link>
        </div>
      </PageWrapper>
    </section>
  );
}
