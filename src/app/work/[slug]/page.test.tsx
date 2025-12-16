// src/app/work/[slug]/page.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { notFound } from 'next/navigation';
import ProjectDetailPage, { generateStaticParams, generateMetadata } from './page';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import type { Project } from '@/types/project';

// Mock Next.js navigation - notFound throws to stop execution
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, className, fill, priority, sizes }: {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-fill={fill}
      data-priority={priority}
      data-sizes={sizes}
    />
  ),
}));

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

// Mock project components
vi.mock('@/components/project', () => ({
  ProjectHero: ({ project }: { project: Project }) => (
    <section data-testid="project-hero">
      <a href="/work">Back to Work</a>
      <span>{project.category}</span>
      <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
    </section>
  ),
  ProjectMeta: ({ project }: { project: Project }) => (
    <aside data-testid="project-meta">
      <span>{project.category}</span>
      {project.client && <span>Client: {project.client}</span>}
      {project.date && <span>Date: {project.date}</span>}
      {project.tags?.map((tag) => <span key={tag}>{tag}</span>)}
    </aside>
  ),
  ProjectGallery: () => <div data-testid="project-gallery" />,
}));

// Mock RelatedProjects
vi.mock('@/components/portfolio', () => ({
  RelatedProjects: () => null,
}));

// Mock data functions
vi.mock('@/data/projects', () => ({
  getProjectBySlug: vi.fn(),
  getAllProjects: vi.fn(),
  getRelatedProjects: vi.fn(() => []),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>{children}</div>
    ),
    section: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <section className={className} {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  slug: 'test-project',
  category: 'Commercial',
  description: 'A test project description for testing purposes.',
  thumbnailUrl: '/videos/thumbnails/test.svg',
  videoUrl: '/videos/projects/test.mp4',
  featured: true,
  order: 1,
  client: 'Test Client',
  date: '2024-01-15',
  tags: ['branding', 'corporate', 'motion graphics'],
};

const mockProjectMinimal: Project = {
  id: '2',
  title: 'Minimal Project',
  slug: 'minimal-project',
  category: 'Music Video',
  description: 'A minimal project without optional fields.',
  thumbnailUrl: '/videos/thumbnails/minimal.svg',
  videoUrl: '/videos/projects/minimal.mp4',
  featured: false,
  order: 2,
};

describe('ProjectDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project title', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Test Project');
  });

  it('renders project description', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByText(/test project description/i)).toBeInTheDocument();
  });

  it('renders category badge', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    expect(screen.getAllByText('Commercial').length).toBeGreaterThan(0);
  });

  it('renders VideoPlayer with correct props', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    const videoPlayer = screen.getByTestId('video-player');
    expect(videoPlayer).toBeInTheDocument();
    expect(videoPlayer).toHaveAttribute('data-src', '/videos/projects/test.mp4');
    expect(videoPlayer).toHaveAttribute('data-poster', '/videos/thumbnails/test.svg');
    expect(videoPlayer).toHaveAttribute('data-autoplay', 'false');
  });

  it('renders back to work link', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    const backLink = screen.getByRole('link', { name: /back to work/i });
    expect(backLink).toHaveAttribute('href', '/work');
  });

  it('calls notFound when project does not exist', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(undefined);
    const params = Promise.resolve({ slug: 'invalid-slug' });

    await expect(ProjectDetailPage({ params })).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('heading has large responsive typography', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('md:text-5xl');
    expect(heading).toHaveClass('font-bold');
  });

  it('renders client information when available', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByText(/Client:/)).toBeInTheDocument();
    expect(screen.getByText(/Test Client/)).toBeInTheDocument();
  });

  it('renders date information when available', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByText(/Date:/)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-15/)).toBeInTheDocument();
  });

  it('renders tags when available', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    render(await ProjectDetailPage({ params }));

    expect(screen.getByText('branding')).toBeInTheDocument();
    expect(screen.getByText('corporate')).toBeInTheDocument();
    expect(screen.getByText('motion graphics')).toBeInTheDocument();
  });

  it('does not render client when not available', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProjectMinimal);
    const params = Promise.resolve({ slug: 'minimal-project' });
    render(await ProjectDetailPage({ params }));

    expect(screen.queryByText(/Client:/)).not.toBeInTheDocument();
  });

  it('does not render date when not available', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProjectMinimal);
    const params = Promise.resolve({ slug: 'minimal-project' });
    render(await ProjectDetailPage({ params }));

    expect(screen.queryByText(/Date:/)).not.toBeInTheDocument();
  });

  it('does not render tags when not available', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProjectMinimal);
    const params = Promise.resolve({ slug: 'minimal-project' });
    render(await ProjectDetailPage({ params }));

    expect(screen.queryByText('branding')).not.toBeInTheDocument();
  });

  it('has proper vertical padding', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    const { container } = render(await ProjectDetailPage({ params }));

    const mainDiv = container.querySelector('.py-16');
    expect(mainDiv).toBeInTheDocument();
  });

  it('uses aspect-video for video container', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);
    const params = Promise.resolve({ slug: 'test-project' });
    const { container } = render(await ProjectDetailPage({ params }));

    const videoContainer = container.querySelector('.aspect-video');
    expect(videoContainer).toBeInTheDocument();
  });
});

describe('generateStaticParams', () => {
  it('returns array of all project slugs', async () => {
    const mockProjects: Project[] = [
      { ...mockProject, id: '1', slug: 'project-1' },
      { ...mockProject, id: '2', slug: 'project-2' },
      { ...mockProject, id: '3', slug: 'project-3' },
    ];
    vi.mocked(getAllProjects).mockReturnValue(mockProjects);

    const params = await generateStaticParams();

    expect(params).toEqual([
      { slug: 'project-1' },
      { slug: 'project-2' },
      { slug: 'project-3' },
    ]);
  });

  it('returns empty array when no projects exist', async () => {
    vi.mocked(getAllProjects).mockReturnValue([]);

    const params = await generateStaticParams();

    expect(params).toEqual([]);
  });
});

describe('generateMetadata', () => {
  it('returns metadata with project title and description', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);

    const params = Promise.resolve({ slug: 'test-project' });
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe('Test Project | UmerFilms');
    expect(metadata.description).toBe('A test project description for testing purposes.');
  });

  it('returns not found metadata when project does not exist', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(undefined);

    const params = Promise.resolve({ slug: 'invalid' });
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe('Project Not Found - UmerFilms');
    expect(metadata.description).toBe('The requested project could not be found.');
  });

  it('includes OpenGraph metadata', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);

    const params = Promise.resolve({ slug: 'test-project' });
    const metadata = await generateMetadata({ params });

    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBe('Test Project');
    expect(metadata.openGraph?.description).toBe('A test project description for testing purposes.');
    expect(metadata.openGraph?.images).toEqual(['/videos/thumbnails/test.svg']);
    expect(metadata.openGraph?.type).toBe('website');
  });

  it('uses correct slug parameter', async () => {
    vi.mocked(getProjectBySlug).mockReturnValue(mockProject);

    const params = Promise.resolve({ slug: 'test-project' });
    await generateMetadata({ params });

    expect(getProjectBySlug).toHaveBeenCalledWith('test-project');
  });
});
