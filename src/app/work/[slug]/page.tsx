// src/app/work/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { ProjectHero, ProjectMeta, ProjectGallery } from '@/components/project';
import { VideoPlayer } from '@/components/video';
import { RelatedProjects } from '@/components/portfolio';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found - UmerFilms',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | UmerFilms`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnailUrl],
      type: 'website',
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

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

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <ProjectGallery images={project.gallery} projectTitle={project.title} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProjectMeta project={project} />
          </div>
        </div>
      </div>

      {/* Related Projects */}
      <RelatedProjects
        currentProjectId={project.id}
        category={project.category}
      />
    </main>
  );
}
