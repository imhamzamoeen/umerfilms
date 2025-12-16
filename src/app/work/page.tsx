// src/app/work/page.tsx

import { Metadata } from 'next';
import { PageWrapper } from '@/components/layout';
import { WorkPageClient } from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Work - UmerFilms',
  description: 'Explore a portfolio of commercial videos, music videos, weddings, short films, and personal projects by Umer.',
  openGraph: {
    title: 'Work - UmerFilms',
    description: 'Cinematic videography portfolio showcasing diverse video production work.',
  },
};

export default function WorkPage() {
  return (
    <PageWrapper>
      <div className="py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 md:mb-12">
          Work
        </h1>

        <WorkPageClient />
      </div>
    </PageWrapper>
  );
}
