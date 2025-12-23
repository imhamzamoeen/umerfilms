// src/components/home/FeaturedWork.tsx

import Link from 'next/link';
import { PageWrapper } from '@/components/layout';
import { ProjectCard } from '@/components/portfolio';
import { getFeaturedVideos, getAllVideos } from '@/lib/videos';
import { videosToProjects } from '@/lib/video-to-project';

export async function FeaturedWork() {
  // Get featured videos from Supabase
  let videos = await getFeaturedVideos();

  // Fallback: if no featured videos, use first 3 from all videos
  if (videos.length === 0) {
    const allVideos = await getAllVideos();
    videos = allVideos.slice(0, 3);
  }

  // Convert to Project format for existing components
  const displayProjects = videosToProjects(videos).slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-surface">
      <PageWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Featured Work
        </h2>

        {/* Project Grid */}
        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={index < 3} // Optimize first 3 images
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 mb-12">
            <p>No projects available yet.</p>
          </div>
        )}

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
