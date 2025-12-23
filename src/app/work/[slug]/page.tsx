// src/app/work/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVideoBySlug, getAllVideos, getRelatedVideos } from '@/lib/videos';
import { getTagsForVideo } from '@/lib/video-tags';
import { videoToProject, videosToProjects } from '@/lib/video-to-project';
import { ProjectHero, ProjectMeta, ProjectGallery } from '@/components/project';
import { VideoPlayer } from '@/components/video';
import { RelatedProjects } from '@/components/portfolio';
import { getProjectGallery } from '@/lib/gallery';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Revalidate every 60 seconds
export const dynamicParams = true; // Generate pages on-demand

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);

  if (!video) {
    return {
      title: 'Project Not Found - UmerFilms',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${video.title} | UmerFilms`,
    description: video.description || 'View this project on UmerFilms portfolio.',
    openGraph: {
      title: video.title,
      description: video.description || 'View this project on UmerFilms portfolio.',
      images: video.thumbnail_url ? [video.thumbnail_url] : [],
      type: 'website',
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  // Get tags for this video
  const tags = await getTagsForVideo(video.id);
  const videoWithTags = { ...video, tags };

  // Convert to Project format for existing components
  const project = videoToProject(videoWithTags);

  // Get related videos
  const relatedVideos = await getRelatedVideos(video.id, video.category, 3);
  const relatedProjects = videosToProjects(relatedVideos);

  // Fetch gallery from Supabase
  const dynamicGallery = await getProjectGallery(video.id);
  const gallery = dynamicGallery.length > 0 ? dynamicGallery : [];

  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <ProjectHero project={project} />

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            {project.videoUrl && (
              <div className="mb-8">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <VideoPlayer
                    src={project.videoUrl}
                    poster={project.thumbnailUrl}
                    autoplay={false}
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            {project.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full px-3 py-1 text-sm font-medium"
                      style={{
                        backgroundColor: `${tag.color}20`,
                        color: tag.color
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <ProjectGallery images={gallery} projectTitle={project.title} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProjectMeta project={project} />
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="container mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((related) => (
              <a
                key={related.id}
                href={`/work/${related.slug}`}
                className="group block rounded-lg overflow-hidden bg-gray-900 transition-transform hover:scale-105"
              >
                <div className="aspect-video relative">
                  {related.thumbnailUrl && (
                    <img
                      src={related.thumbnailUrl}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-400">{related.category}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
