// src/components/portfolio/ProjectCard.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/types/project';

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, onLoad, priority, fill, className }: {
    src: string;
    alt: string;
    onLoad?: () => void;
    priority?: boolean;
    fill?: boolean;
    className?: string;
  }) => {
    // Call onLoad immediately in tests to simulate image loading
    if (onLoad) {
      setTimeout(() => onLoad(), 0);
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        data-priority={priority}
        data-fill={fill}
        className={className}
      />
    );
  },
}));

// Mock VideoPlayer component
vi.mock('@/components/video', () => ({
  VideoPlayer: ({ src, className }: { src: string; className?: string }) => (
    <div data-testid="video-player" data-src={src} className={className}>
      Video Player
    </div>
  ),
}));

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  slug: 'test-project',
  category: 'Commercial',
  description: 'A test project description',
  thumbnailUrl: '/videos/thumbnails/test.jpg',
  videoUrl: '/videos/projects/test.mp4',
  featured: true,
  order: 1,
};

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project category', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Commercial')).toBeInTheDocument();
  });

  it('renders thumbnail image with correct src and alt', () => {
    render(<ProjectCard project={mockProject} />);
    const img = screen.getByAltText('Test Project');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/videos/thumbnails/test.jpg');
  });

  it('links to correct project detail page', () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/work/test-project');
  });

  it('has accessible aria-label', () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Test Project - Commercial');
  });

  it('applies priority prop to Image component', () => {
    render(<ProjectCard project={mockProject} priority />);
    const img = screen.getByAltText('Test Project');
    expect(img).toHaveAttribute('data-priority', 'true');
  });

  it('does not apply priority by default', () => {
    render(<ProjectCard project={mockProject} />);
    const img = screen.getByAltText('Test Project');
    expect(img).toHaveAttribute('data-priority', 'false');
  });

  it('renders with custom className', () => {
    render(<ProjectCard project={mockProject} className="custom-class" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
  });

  it('is keyboard accessible with proper link role', () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href');
    expect(link).toBeInTheDocument();
  });

  it('displays all project information correctly', () => {
    const customProject: Project = {
      id: '2',
      title: 'Music Video Project',
      slug: 'music-video-project',
      category: 'Music Video',
      description: 'An amazing music video',
      thumbnailUrl: '/videos/thumbnails/music.jpg',
      videoUrl: '/videos/projects/music.mp4',
      featured: false,
      order: 2,
    };

    render(<ProjectCard project={customProject} />);
    expect(screen.getByText('Music Video Project')).toBeInTheDocument();
    expect(screen.getByText('Music Video')).toBeInTheDocument();
    expect(screen.getByAltText('Music Video Project')).toBeInTheDocument();
  });

  it('has focus-visible ring styles for accessibility', () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('focus-visible:ring-2');
    expect(link.className).toContain('focus-visible:ring-amber-600');
  });

  it('uses correct aspect ratio container', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const aspectContainer = container.querySelector('.aspect-video');
    expect(aspectContainer).toBeInTheDocument();
  });
});
