// src/app/work/page.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkPageClient } from './WorkPageClient';
import { Project } from '@/types/project';

// Mock data functions
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Commercial Project',
    slug: 'commercial-project',
    category: 'Commercial',
    description: 'Test commercial',
    thumbnailUrl: '/test1.jpg',
    videoUrl: '/test1.mp4',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Music Video Project',
    slug: 'music-video-project',
    category: 'Music Video',
    description: 'Test music video',
    thumbnailUrl: '/test2.jpg',
    videoUrl: '/test2.mp4',
    featured: false,
    order: 2,
  },
  {
    id: '3',
    title: 'Wedding Project',
    slug: 'wedding-project',
    category: 'Wedding',
    description: 'Test wedding',
    thumbnailUrl: '/test3.jpg',
    videoUrl: '/test3.mp4',
    featured: false,
    order: 3,
  },
];

vi.mock('@/data/projects', () => ({
  getAllProjects: vi.fn(() => mockProjects),
  getProjectsByCategory: vi.fn((category: string) =>
    mockProjects.filter((p) => p.category === category)
  ),
}));

// Mock CategoryFilter
vi.mock('@/components/portfolio', () => ({
  CategoryFilter: ({ categories, selectedCategory, onCategoryChange }: {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
  }) => (
    <div data-testid="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={selectedCategory === category ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>
  ),
  ProjectGrid: ({ projects }: { projects: Project[] }) => (
    <div data-testid="project-grid">
      {projects.map((project) => (
        <div key={project.id} data-testid={`project-${project.id}`}>
          {project.title}
        </div>
      ))}
    </div>
  ),
}));

describe('WorkPageClient', () => {
  it('renders category filter buttons', () => {
    render(<WorkPageClient />);
    expect(screen.getByTestId('category-filter')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Commercial')).toBeInTheDocument();
    expect(screen.getByText('Music Video')).toBeInTheDocument();
  });

  it('renders project grid with all projects by default', () => {
    render(<WorkPageClient />);
    expect(screen.getByTestId('project-grid')).toBeInTheDocument();
    expect(screen.getByText('Commercial Project')).toBeInTheDocument();
    expect(screen.getByText('Music Video Project')).toBeInTheDocument();
    expect(screen.getByText('Wedding Project')).toBeInTheDocument();
  });

  it('filters projects when category is selected', () => {
    render(<WorkPageClient />);

    // Click on Commercial category
    const commercialButton = screen.getByText('Commercial');
    fireEvent.click(commercialButton);

    // Should show only Commercial project
    expect(screen.getByText('Commercial Project')).toBeInTheDocument();
    expect(screen.queryByText('Music Video Project')).not.toBeInTheDocument();
    expect(screen.queryByText('Wedding Project')).not.toBeInTheDocument();
  });

  it('shows all projects when "All" category is selected', () => {
    render(<WorkPageClient />);

    // Click on a specific category first
    fireEvent.click(screen.getByText('Commercial'));

    // Then click "All"
    fireEvent.click(screen.getByText('All'));

    // Should show all projects again
    expect(screen.getByText('Commercial Project')).toBeInTheDocument();
    expect(screen.getByText('Music Video Project')).toBeInTheDocument();
    expect(screen.getByText('Wedding Project')).toBeInTheDocument();
  });

  it('displays empty state when no projects in category', async () => {
    const { getProjectsByCategory } = await import('@/data/projects');
    vi.mocked(getProjectsByCategory).mockReturnValueOnce([]);

    render(<WorkPageClient />);

    // Click on a category that has no projects
    fireEvent.click(screen.getByText('Short Film'));

    // Should show empty state message
    expect(screen.getByText('No projects found in this category.')).toBeInTheDocument();
    expect(screen.queryByTestId('project-grid')).not.toBeInTheDocument();
  });

  it('shows correct number of projects for each category', () => {
    render(<WorkPageClient />);

    // All projects (default) - should show 3 project elements
    const allProjects = screen.getAllByTestId(/^project-\d+$/);
    expect(allProjects.length).toBe(3);

    // Music Video category (1 project)
    fireEvent.click(screen.getByText('Music Video'));
    const musicVideoProjects = screen.getAllByTestId(/^project-\d+$/);
    expect(musicVideoProjects.length).toBe(1);

    // Wedding category (1 project)
    fireEvent.click(screen.getByText('Wedding'));
    const weddingProjects = screen.getAllByTestId(/^project-\d+$/);
    expect(weddingProjects.length).toBe(1);
  });
});
