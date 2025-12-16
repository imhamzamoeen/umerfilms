import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectMeta from './ProjectMeta';
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
  date: '2024-06',
  role: 'Director',
  tags: ['cinematography', 'editing'],
};

const minimalProject: Project = {
  id: '2',
  title: 'Minimal Project',
  slug: 'minimal-project',
  category: 'Wedding',
  description: 'A minimal project',
  thumbnailUrl: '/images/minimal.jpg',
  videoUrl: '/videos/minimal.mp4',
  featured: false,
  order: 2,
};

describe('ProjectMeta', () => {
  it('renders project details heading', () => {
    render(<ProjectMeta project={mockProject} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Project Details');
  });

  it('renders category', () => {
    render(<ProjectMeta project={mockProject} />);

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Commercial')).toBeInTheDocument();
  });

  it('renders client when provided', () => {
    render(<ProjectMeta project={mockProject} />);

    expect(screen.getByText('Client')).toBeInTheDocument();
    expect(screen.getByText('Test Client')).toBeInTheDocument();
  });

  it('renders formatted date when provided', () => {
    render(<ProjectMeta project={mockProject} />);

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('June 2024')).toBeInTheDocument();
  });

  it('renders role when provided', () => {
    render(<ProjectMeta project={mockProject} />);

    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Director')).toBeInTheDocument();
  });

  it('renders tags when provided', () => {
    render(<ProjectMeta project={mockProject} />);

    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('cinematography')).toBeInTheDocument();
    expect(screen.getByText('editing')).toBeInTheDocument();
  });

  it('does not render client when not provided', () => {
    render(<ProjectMeta project={minimalProject} />);

    expect(screen.queryByText('Client')).not.toBeInTheDocument();
  });

  it('does not render date when not provided', () => {
    render(<ProjectMeta project={minimalProject} />);

    expect(screen.queryByText('Date')).not.toBeInTheDocument();
  });

  it('does not render role when not provided', () => {
    render(<ProjectMeta project={minimalProject} />);

    expect(screen.queryByText('Role')).not.toBeInTheDocument();
  });

  it('does not render tags section when not provided', () => {
    render(<ProjectMeta project={minimalProject} />);

    expect(screen.queryByText('Tags')).not.toBeInTheDocument();
  });

  it('has proper semantic structure with definition list', () => {
    render(<ProjectMeta project={mockProject} />);

    expect(document.querySelector('dl')).toBeInTheDocument();
    expect(document.querySelectorAll('dt').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('dd').length).toBeGreaterThan(0);
  });
});
