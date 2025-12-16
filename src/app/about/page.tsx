// src/app/about/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout';
import { VideoPlayer } from '@/components/video';

export const metadata: Metadata = {
  title: 'About - UmerFilms',
  description: 'Meet Umer, a cinematic videographer passionate about crafting visual stories that capture authentic moments and compelling narratives.',
  openGraph: {
    title: 'About Umer - UmerFilms',
    description: 'Cinematic videographer and visual storyteller',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 md:mb-12 text-center">
          Meet Umer
        </h1>

        {/* Video Introduction */}
        <div className="mb-12 md:mb-16">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden max-w-4xl mx-auto">
            <VideoPlayer
              src="/videos/about/intro.mp4"
              poster="/videos/about/poster.jpg"
              autoplay={false}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Bio Content */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              Hi, I&apos;m Umer, a cinematic videographer and visual storyteller based in [Location].
              With a passion for capturing authentic moments and creating compelling narratives,
              I specialize in transforming ordinary stories into extraordinary visual experiences.
            </p>

            <p>
              My journey into videography began [background story]. What drives me is the ability
              to freeze emotions in time and craft videos that not only look beautiful but also
              resonate deeply with audiences. Every project is an opportunity to tell a unique story,
              whether it&apos;s a brand launch, a wedding celebration, or a personal creative endeavor.
            </p>

            <p>
              I believe in the power of collaboration and take pride in understanding each client&apos;s
              vision. From concept to final edit, I bring technical expertise, creative vision, and
              attention to detail to every frame. Let&apos;s create something memorable together.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-gradient-to-r from-[#450E93] to-[#D5007F] text-white hover:from-[#5a1bb8] hover:to-[#e6009a] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5007F] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Let&apos;s Work Together
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
