// src/app/about/page.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutPage, { metadata } from './page';

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ href, children, className }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock PageWrapper
vi.mock('@/components/layout', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-wrapper">{children}</div>
  ),
}));

// Mock VideoPlayer
vi.mock('@/components/video', () => ({
  VideoPlayer: vi.fn(({ src, poster, autoplay, className }: {
    src: string;
    poster?: string;
    autoplay?: boolean;
    className?: string;
  }) => (
    <div
      data-testid="video-player"
      data-src={src}
      data-poster={poster}
      data-autoplay={autoplay}
      className={className}
    />
  )),
}));

describe('AboutPage', () => {
  it('renders page heading', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Meet Umer');
  });

  it('heading has responsive typography', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('md:text-5xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-center');
  });

  it('renders VideoPlayer component', () => {
    render(<AboutPage />);
    const videoPlayer = screen.getByTestId('video-player');
    expect(videoPlayer).toBeInTheDocument();
  });

  it('VideoPlayer has correct src path', () => {
    render(<AboutPage />);
    const videoPlayer = screen.getByTestId('video-player');
    expect(videoPlayer).toHaveAttribute('data-src', '/videos/about/intro.mp4');
  });

  it('VideoPlayer has poster image', () => {
    render(<AboutPage />);
    const videoPlayer = screen.getByTestId('video-player');
    expect(videoPlayer).toHaveAttribute('data-poster', '/videos/about/poster.jpg');
  });

  it('VideoPlayer does not autoplay', () => {
    render(<AboutPage />);
    const videoPlayer = screen.getByTestId('video-player');
    expect(videoPlayer).toHaveAttribute('data-autoplay', 'false');
  });

  it('renders bio content paragraphs', () => {
    render(<AboutPage />);
    const paragraphs = screen.getAllByText(/videographer|visual storyteller/i);
    expect(paragraphs.length).toBeGreaterThanOrEqual(1);
  });

  it('bio content mentions Umer', () => {
    render(<AboutPage />);
    expect(screen.getByText(/I'm Umer/i)).toBeInTheDocument();
  });

  it('renders CTA link to contact page', () => {
    render(<AboutPage />);
    const ctaLink = screen.getByRole('link', { name: /let's work together/i });
    expect(ctaLink).toHaveAttribute('href', '/contact');
  });

  it('CTA link has button styling', () => {
    render(<AboutPage />);
    const ctaLink = screen.getByRole('link', { name: /let's work together/i });
    expect(ctaLink.className).toContain('bg-gradient-to-r');
    expect(ctaLink.className).toContain('from-[#450E93]');
    expect(ctaLink.className).toContain('to-[#D5007F]');
    expect(ctaLink.className).toContain('text-white');
    expect(ctaLink.className).toContain('px-8');
    expect(ctaLink.className).toContain('py-4');
  });

  it('CTA link has focus-visible ring', () => {
    render(<AboutPage />);
    const ctaLink = screen.getByRole('link', { name: /let's work together/i });
    expect(ctaLink.className).toContain('focus-visible:ring-2');
    expect(ctaLink.className).toContain('focus-visible:ring-[#D5007F]');
  });

  it('uses PageWrapper for layout', () => {
    render(<AboutPage />);
    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();
  });

  it('has proper vertical padding', () => {
    const { container } = render(<AboutPage />);
    const mainDiv = container.querySelector('.py-16');
    expect(mainDiv).toHaveClass('py-16');
    expect(mainDiv).toHaveClass('md:py-20');
  });

  it('video container has aspect-video ratio', () => {
    const { container } = render(<AboutPage />);
    const videoContainer = container.querySelector('.aspect-video');
    expect(videoContainer).toBeInTheDocument();
  });

  it('video container has rounded corners', () => {
    const { container } = render(<AboutPage />);
    const videoContainer = container.querySelector('.aspect-video');
    expect(videoContainer).toHaveClass('rounded-lg');
  });

  it('bio content has max-width constraint', () => {
    const { container } = render(<AboutPage />);
    const bioContent = container.querySelector('.max-w-3xl');
    expect(bioContent).toBeInTheDocument();
  });

  it('bio content is centered', () => {
    const { container } = render(<AboutPage />);
    const bioContent = container.querySelector('.max-w-3xl');
    expect(bioContent).toHaveClass('mx-auto');
  });

  it('bio text has readable size', () => {
    const { container } = render(<AboutPage />);
    const bioContainer = container.querySelector('.space-y-6');
    expect(bioContainer).toHaveClass('text-lg');
    expect(bioContainer).toHaveClass('md:text-xl');
  });

  it('CTA section has top margin spacing', () => {
    const { container } = render(<AboutPage />);
    const ctaSection = container.querySelector('.mt-16');
    expect(ctaSection).toHaveClass('mt-16');
    expect(ctaSection).toHaveClass('md:mt-20');
  });
});

describe('AboutPage metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('About - UmerFilms');
  });

  it('has description', () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.description).toContain('Umer');
    expect(metadata.description).toContain('videographer');
  });

  it('has OpenGraph metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBe('About Umer - UmerFilms');
    expect(metadata.openGraph?.description).toBeDefined();
  });
});
