// src/app/work/page.tsx

import { Metadata } from 'next';
import { PageWrapper } from '@/components/layout';
import { WorkPageClient } from './WorkPageClient';
import { getAllVideos } from '@/lib/videos';
import { videosToProjects } from '@/lib/video-to-project';

export const metadata: Metadata = {
  title: 'Work - UmerFilms',
  description: 'Explore a portfolio of commercial videos, music videos, weddings, short films, and personal projects by Umer.',
  openGraph: {
    title: 'Work - UmerFilms',
    description: 'Cinematic videography portfolio showcasing diverse video production work.',
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function WorkPage() {
  const videos = await getAllVideos();
  const projects = videosToProjects(videos);

  return (
    <PageWrapper>
      <div className="py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 md:mb-12">
          Work
        </h1>

        <WorkPageClient initialProjects={projects} />
      </div>
    </PageWrapper>
  );
}
