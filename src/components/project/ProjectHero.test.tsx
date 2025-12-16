import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectHero from './ProjectHero';
import { Project } from '@/types/project';

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  slug: 'test-project',
  category: 'Commercial',
  description: 'A test project description',
  thumbnailUrl: '/images/test.jpg',
  videoUrl: '/videos/test.mp4',
  featured: true,
  order: 1,
  client: 'Test Client',
  date: '2024-01',
};

describe('ProjectHero', () => {
  it('renders project title', () => {
    render(<ProjectHero project={mockProject} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Project');
  });

  it('renders project category', () => {
    render(<ProjectHero project={mockProject} />);

    expect(screen.getByText('Commercial')).toBeInTheDocument();
  });

  it('renders back to work link', () => {
    render(<ProjectHero project={mockProject} />);

    const backLink = screen.getByRole('link', { name: /back to work/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/work');
  });

  it('renders hero image with correct alt text', () => {
    render(<ProjectHero project={mockProject} />);

    const image = screen.getByRole('img', { name: 'Test Project' });
    expect(image).toBeInTheDocument();
  });

  it('has accessible category with pink accent color', () => {
    render(<ProjectHero project={mockProject} />);

    const category = screen.getByText('Commercial');
    expect(category).toHaveClass('text-[#D5007F]');
  });
});
