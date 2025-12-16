import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroThreeColumn, IntroSection, CTASection } from "@/components/home";
import { PortfolioSkeleton, SectionSkeleton } from "@/components/shared";

// Dynamic imports for below-fold heavy components
const Services = dynamic(() => import('@/components/home/Services'), {
  loading: () => <SectionSkeleton height="min-h-[600px]" />,
});

const Timeline = dynamic(() => import('@/components/home/Timeline'), {
  loading: () => <SectionSkeleton height="min-h-[500px]" />,
});

const HomePortfolioSection = dynamic(() => import('@/components/home/HomePortfolioSection'), {
  loading: () => <PortfolioSkeleton />,
});

const Testimonials = dynamic(() => import('@/components/home/Testimonials'), {
  loading: () => <SectionSkeleton height="min-h-[400px]" />,
});

const BlogPreview = dynamic(() => import('@/components/home/BlogPreview'), {
  loading: () => <SectionSkeleton height="min-h-[500px]" />,
});

export const metadata: Metadata = {
  title: 'UmerFilms - Cinematic Videographer & Storyteller',
  description: 'Professional videographer creating cinematic experiences through authentic storytelling. Specializing in commercial videos, music videos, weddings, and creative projects.',
  openGraph: {
    title: 'UmerFilms - Cinematic Videographer & Storyteller',
    description: 'Professional videographer creating cinematic experiences through authentic storytelling.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <HeroThreeColumn />
      <main>
        <IntroSection />
        <Services />
        <Timeline />
        <HomePortfolioSection />
        <Testimonials />
        <BlogPreview />
        <CTASection />
      </main>
    </>
  );
}
