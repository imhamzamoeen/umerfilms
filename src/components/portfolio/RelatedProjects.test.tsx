// src/components/portfolio/RelatedProjects.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RelatedProjects } from './RelatedProjects';
import type { Project } from '@/types/project';
import { getRelatedProjects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

// Mock getRelatedProjects
vi.mock('@/data/projects', () => ({
  getRelatedProjects: vi.fn(),
}));

// Mock ProjectCard
vi.mock('./ProjectCard', () => ({
  ProjectCard: vi.fn(({ project }: { project: Project }) => (
    <div data-testid={`project-card-${project.id}`}>
      {project.title}
    </div>
  )),
}));

// Mock PageWrapper
vi.mock('@/components/layout', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-wrapper">{children}</div>
  ),
}));

const mockProjects: Project[] = [
  {
    id: '2',
    title: 'Related Project 1',
    slug: 'related-project-1',
    category: 'Commercial',
    description: 'Test project 1',
    thumbnailUrl: '/videos/thumbnails/test-1.svg',
    videoUrl: '/videos/projects/test-1.mp4',
    featured: false,
    order: 2,
  },
  {
    id: '3',
    title: 'Related Project 2',
    slug: 'related-project-2',
    category: 'Commercial',
    description: 'Test project 2',
    thumbnailUrl: '/videos/thumbnails/test-2.svg',
    videoUrl: '/videos/projects/test-2.mp4',
    featured: false,
    order: 3,
  },
  {
    id: '4',
    title: 'Related Project 3',
    slug: 'related-project-3',
    category: 'Music Video',
    description: 'Test project 3',
    thumbnailUrl: '/videos/thumbnails/test-3.svg',
    videoUrl: '/videos/projects/test-3.mp4',
    featured: false,
    order: 4,
  },
];

describe('RelatedProjects', () => {
  it('renders section heading', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    expect(screen.getByText('More Work')).toBeInTheDocument();
  });

  it('renders ProjectCard for each related project', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    expect(screen.getByTestId('project-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('project-card-3')).toBeInTheDocument();
    expect(screen.getByTestId('project-card-4')).toBeInTheDocument();
  });

  it('returns null when no related projects', () => {
    vi.mocked(getRelatedProjects).mockReturnValue([]);

    const { container } = render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    expect(container.firstChild).toBeNull();
  });

  it('applies responsive grid classes', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    const { container } = render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('uses PageWrapper component', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();
  });

  it('passes correct props to getRelatedProjects', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    render(<RelatedProjects currentProjectId="test-id" category="Music Video" limit={5} />);

    expect(getRelatedProjects).toHaveBeenCalledWith('test-id', 'Music Video', 5);
  });

  it('uses default limit of 3 when not specified', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    render(<RelatedProjects currentProjectId="test-id" category="Commercial" />);

    expect(getRelatedProjects).toHaveBeenCalledWith('test-id', 'Commercial', 3);
  });

  it('heading has responsive typography', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    const heading = screen.getByText('More Work');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('text-3xl');
    expect(heading).toHaveClass('md:text-4xl');
    expect(heading).toHaveClass('font-bold');
  });

  it('section has proper spacing', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    const { container } = render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('md:py-20');
  });

  it('uses bg-surface background', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    const { container } = render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-surface');
  });

  it('passes showPreview=false to ProjectCard', () => {
    vi.mocked(getRelatedProjects).mockReturnValue(mockProjects);

    render(<RelatedProjects currentProjectId="1" category="Commercial" />);

    // Check that ProjectCard was called with showPreview=false
    const calls = vi.mocked(ProjectCard).mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    calls.forEach((call) => {
      expect(call[0]).toHaveProperty('showPreview', false);
    });
  });
});
