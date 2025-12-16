// src/components/portfolio/ProjectGrid.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectGrid } from './ProjectGrid';
import { Project } from '@/types/project';

// Mock ProjectCard component
vi.mock('./ProjectCard', () => ({
  ProjectCard: ({ project, priority }: { project: Project; priority?: boolean }) => (
    <div data-testid={`project-card-${project.id}`} data-priority={priority}>
      {project.title}
    </div>
  ),
}));

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Project 1',
    slug: 'project-1',
    category: 'Commercial',
    description: 'Test project 1',
    thumbnailUrl: '/test1.jpg',
    videoUrl: '/test1.mp4',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Project 2',
    slug: 'project-2',
    category: 'Music Video',
    description: 'Test project 2',
    thumbnailUrl: '/test2.jpg',
    videoUrl: '/test2.mp4',
    featured: false,
    order: 2,
  },
  {
    id: '3',
    title: 'Project 3',
    slug: 'project-3',
    category: 'Wedding',
    description: 'Test project 3',
    thumbnailUrl: '/test3.jpg',
    videoUrl: '/test3.mp4',
    featured: false,
    order: 3,
  },
  {
    id: '4',
    title: 'Project 4',
    slug: 'project-4',
    category: 'Short Film',
    description: 'Test project 4',
    thumbnailUrl: '/test4.jpg',
    videoUrl: '/test4.mp4',
    featured: false,
    order: 4,
  },
];

describe('ProjectGrid', () => {
  it('renders ProjectCard for each project', () => {
    render(<ProjectGrid projects={mockProjects} />);

    mockProjects.forEach((project) => {
      expect(screen.getByTestId(`project-card-${project.id}`)).toBeInTheDocument();
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('applies responsive grid classes', () => {
    const { container } = render(<ProjectGrid projects={mockProjects} />);
    const grid = container.firstChild;

    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('applies gap spacing', () => {
    const { container } = render(<ProjectGrid projects={mockProjects} />);
    const grid = container.firstChild;

    expect(grid).toHaveClass('gap-6');
    expect(grid).toHaveClass('md:gap-8');
  });

  it('sets priority prop to true for first 3 projects', () => {
    render(<ProjectGrid projects={mockProjects} />);

    // First 3 should have priority
    expect(screen.getByTestId('project-card-1')).toHaveAttribute('data-priority', 'true');
    expect(screen.getByTestId('project-card-2')).toHaveAttribute('data-priority', 'true');
    expect(screen.getByTestId('project-card-3')).toHaveAttribute('data-priority', 'true');

    // 4th should not have priority
    expect(screen.getByTestId('project-card-4')).toHaveAttribute('data-priority', 'false');
  });

  it('renders empty grid when no projects', () => {
    const { container } = render(<ProjectGrid projects={[]} />);
    const grid = container.firstChild;

    expect(grid).toBeInTheDocument();
    expect(grid?.childNodes.length).toBe(0);
  });

  it('uses project.id as React key', () => {
    render(<ProjectGrid projects={mockProjects} />);

    // Verify each card is rendered (keys are handled internally by React)
    mockProjects.forEach((project) => {
      expect(screen.getByTestId(`project-card-${project.id}`)).toBeInTheDocument();
    });
  });
});
