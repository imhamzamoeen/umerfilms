// src/components/home/FeaturedWork.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FeaturedWork } from './FeaturedWork';
import type { Project } from '@/types/project';
import { getFeaturedProjects, getAllProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio';

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

// Mock ProjectCard
vi.mock('@/components/portfolio', () => ({
  ProjectCard: vi.fn(({ project, priority }: { project: Project; priority?: boolean }) => (
    <div
      data-testid={`project-card-${project.id}`}
      data-priority={priority}
    >
      {project.title}
    </div>
  )),
}));

// Mock data functions
vi.mock('@/data/projects', () => ({
  getFeaturedProjects: vi.fn(),
  getAllProjects: vi.fn(),
}));

const mockFeaturedProjects: Project[] = [
  {
    id: '1',
    title: 'Featured Project 1',
    slug: 'featured-project-1',
    category: 'Commercial',
    description: 'Test project 1',
    thumbnailUrl: '/videos/thumbnails/project-1.svg',
    videoUrl: '/videos/projects/project-1.mp4',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Featured Project 2',
    slug: 'featured-project-2',
    category: 'Music Video',
    description: 'Test project 2',
    thumbnailUrl: '/videos/thumbnails/project-2.svg',
    videoUrl: '/videos/projects/project-2.mp4',
    featured: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Featured Project 3',
    slug: 'featured-project-3',
    category: 'Wedding',
    description: 'Test project 3',
    thumbnailUrl: '/videos/thumbnails/project-3.svg',
    videoUrl: '/videos/projects/project-3.mp4',
    featured: true,
    order: 3,
  },
];

const mockAllProjects: Project[] = [
  {
    id: '4',
    title: 'Project 1',
    slug: 'project-1',
    category: 'Short Film',
    description: 'Test project 4',
    thumbnailUrl: '/videos/thumbnails/project-4.svg',
    videoUrl: '/videos/projects/project-4.mp4',
    featured: false,
    order: 4,
  },
  {
    id: '5',
    title: 'Project 2',
    slug: 'project-2',
    category: 'Personal',
    description: 'Test project 5',
    thumbnailUrl: '/videos/thumbnails/project-5.svg',
    videoUrl: '/videos/projects/project-5.mp4',
    featured: false,
    order: 5,
  },
  {
    id: '6',
    title: 'Project 3',
    slug: 'project-3',
    category: 'Commercial',
    description: 'Test project 6',
    thumbnailUrl: '/videos/thumbnails/project-6.svg',
    videoUrl: '/videos/projects/project-6.mp4',
    featured: false,
    order: 6,
  },
];

describe('FeaturedWork', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section heading', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);
    expect(screen.getByText('Featured Work')).toBeInTheDocument();
  });

  it('calls getFeaturedProjects', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);
    expect(getFeaturedProjects).toHaveBeenCalled();
  });

  it('renders ProjectCard for each featured project', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);

    expect(screen.getByTestId('project-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('project-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('project-card-3')).toBeInTheDocument();
  });

  it('displays max 3 projects', () => {
    const manyProjects = [
      ...mockFeaturedProjects,
      {
        id: '7',
        title: 'Featured Project 4',
        slug: 'featured-project-4',
        category: 'Commercial',
        description: 'Test',
        thumbnailUrl: '/test.svg',
        videoUrl: '/test.mp4',
        featured: true,
        order: 7,
      },
    ];
    vi.mocked(getFeaturedProjects).mockReturnValue(manyProjects);
    render(<FeaturedWork />);

    const cards = screen.getAllByTestId(/project-card-/);
    expect(cards.length).toBe(3);
  });

  it('renders "View All Work" link to /work', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);

    const link = screen.getByRole('link', { name: /view all work/i });
    expect(link).toHaveAttribute('href', '/work');
  });

  it('uses fallback if no featured projects', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue([]);
    vi.mocked(getAllProjects).mockReturnValue(mockAllProjects);

    render(<FeaturedWork />);

    // Should call getAllProjects as fallback
    expect(getAllProjects).toHaveBeenCalled();

    // Should display projects from fallback
    expect(screen.getByTestId('project-card-4')).toBeInTheDocument();
    expect(screen.getByTestId('project-card-5')).toBeInTheDocument();
    expect(screen.getByTestId('project-card-6')).toBeInTheDocument();
  });

  it('applies responsive grid classes', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    const { container } = render(<FeaturedWork />);
    const grid = container.querySelector('.grid');

    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('sets priority for first 3 projects', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);

    const card1 = screen.getByTestId('project-card-1');
    const card2 = screen.getByTestId('project-card-2');
    const card3 = screen.getByTestId('project-card-3');

    expect(card1).toHaveAttribute('data-priority', 'true');
    expect(card2).toHaveAttribute('data-priority', 'true');
    expect(card3).toHaveAttribute('data-priority', 'true');
  });

  it('passes correct project data to ProjectCard', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);

    // Check that ProjectCard was called with correct props
    const calls = vi.mocked(ProjectCard).mock.calls;
    expect(calls.length).toBeGreaterThan(0);

    // Verify first call has correct props
    expect(calls[0][0]).toMatchObject({
      project: mockFeaturedProjects[0],
      priority: true,
    });
  });

  it('has proper vertical padding', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    const { container } = render(<FeaturedWork />);
    const section = container.querySelector('section');

    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('md:py-20');
  });

  it('uses bg-surface background color', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    const { container } = render(<FeaturedWork />);
    const section = container.querySelector('section');

    expect(section).toHaveClass('bg-surface');
  });

  it('heading has responsive typography and is centered', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);
    const heading = screen.getByText('Featured Work');

    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('text-3xl');
    expect(heading).toHaveClass('md:text-4xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-center');
  });

  it('grid has margin bottom for spacing before link', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    const { container } = render(<FeaturedWork />);
    const grid = container.querySelector('.grid');

    expect(grid).toHaveClass('mb-12');
  });

  it('View All Work link has proper button styling', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);

    const link = screen.getByRole('link', { name: /view all work/i });
    expect(link.className).toContain('border-2');
    expect(link.className).toContain('border-white');
    expect(link.className).toContain('hover:bg-white');
    expect(link.className).toContain('hover:text-black');
  });

  it('View All Work link has focus-visible ring', () => {
    vi.mocked(getFeaturedProjects).mockReturnValue(mockFeaturedProjects);
    render(<FeaturedWork />);

    const link = screen.getByRole('link', { name: /view all work/i });
    expect(link.className).toContain('focus-visible:ring-2');
    expect(link.className).toContain('focus-visible:ring-amber-600');
  });
});
