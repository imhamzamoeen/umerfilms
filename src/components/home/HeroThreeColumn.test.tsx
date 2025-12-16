// src/components/home/HeroThreeColumn.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroThreeColumn } from './HeroThreeColumn';
import { Biography } from './Biography';
import { SkillsList } from './SkillsList';
import { CircularPortrait } from './CircularPortrait';
import { Statistics } from './Statistics';

describe('HeroThreeColumn', () => {
  describe('Layout Structure', () => {
    it('renders the hero section', () => {
      render(<HeroThreeColumn />);
      expect(screen.getByRole('region', { name: /hero introduction/i })).toBeInTheDocument();
    });

    it('contains biography and skills section', () => {
      render(<HeroThreeColumn />);
      expect(screen.getByLabelText(/biography and skills/i)).toBeInTheDocument();
    });

    it('contains profile portrait section', () => {
      render(<HeroThreeColumn />);
      expect(screen.getByLabelText(/profile portrait/i)).toBeInTheDocument();
    });

    it('contains career statistics section', () => {
      render(<HeroThreeColumn />);
      const statsElements = screen.getAllByLabelText(/career statistics/i);
      expect(statsElements.length).toBeGreaterThanOrEqual(1);
    });

    it('has three-column grid container', () => {
      const { container } = render(<HeroThreeColumn />);
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('lg:grid-cols-3');
    });
  });

  describe('Responsive Classes', () => {
    it('has responsive grid classes for mobile', () => {
      const { container } = render(<HeroThreeColumn />);
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1');
    });

    it('has responsive grid classes for tablet', () => {
      const { container } = render(<HeroThreeColumn />);
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('md:grid-cols-2');
    });

    it('has responsive grid classes for desktop', () => {
      const { container } = render(<HeroThreeColumn />);
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('lg:grid-cols-3');
    });

    it('has gap between columns', () => {
      const { container } = render(<HeroThreeColumn />);
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('gap-8');
    });
  });

  describe('Content Display', () => {
    it('displays the name', () => {
      render(<HeroThreeColumn />);
      expect(screen.getByRole('heading', { level: 1, name: /umer khan/i })).toBeInTheDocument();
    });

    it('displays portrait image', () => {
      render(<HeroThreeColumn />);
      expect(screen.getByAltText(/umer khan.*videographer/i)).toBeInTheDocument();
    });

    it('displays statistics with values', () => {
      render(<HeroThreeColumn />);
      expect(screen.getByText('10+')).toBeInTheDocument();
      expect(screen.getByText('50+')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('displays statistics labels', () => {
      render(<HeroThreeColumn />);
      // Labels appear twice - in sr-only dt and visible dd
      expect(screen.getAllByText(/years experience/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/projects completed/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/awards won/i).length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe('Biography', () => {
  const mockBiography = {
    name: 'Test Name',
    roles: ['Role 1', 'Role 2', 'Role 3'],
  };

  it('renders the name as heading', () => {
    render(<Biography name={mockBiography.name} roles={mockBiography.roles} />);
    expect(screen.getByRole('heading', { level: 1, name: mockBiography.name })).toBeInTheDocument();
  });

  it('applies hero-heading class for outline stroke typography', () => {
    render(<Biography name={mockBiography.name} roles={mockBiography.roles} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('hero-heading');
  });

  it('renders all roles', () => {
    render(<Biography name={mockBiography.name} roles={mockBiography.roles} />);
    mockBiography.roles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it('uses semantic list for roles', () => {
    render(<Biography name={mockBiography.name} roles={mockBiography.roles} />);
    expect(screen.getByRole('list', { name: /professional roles/i })).toBeInTheDocument();
  });
});

describe('SkillsList', () => {
  const mockSkills = ['Skill 1', 'Skill 2', 'Skill 3'];

  it('renders skills heading', () => {
    render(<SkillsList skills={mockSkills} />);
    expect(screen.getByRole('heading', { level: 2, name: /skills/i })).toBeInTheDocument();
  });

  it('renders all skills', () => {
    render(<SkillsList skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('uses semantic list for skills', () => {
    render(<SkillsList skills={mockSkills} />);
    expect(screen.getByRole('list', { name: /professional skills/i })).toBeInTheDocument();
  });
});

describe('CircularPortrait', () => {
  it('renders portrait image', () => {
    render(<CircularPortrait />);
    expect(screen.getByAltText(/umer khan.*videographer/i)).toBeInTheDocument();
  });

  it('has circular shape styling', () => {
    const { container } = render(<CircularPortrait />);
    const circularContainer = container.querySelector('.rounded-full');
    expect(circularContainer).toBeInTheDocument();
  });

  it('has white border', () => {
    const { container } = render(<CircularPortrait />);
    const borderedContainer = container.querySelector('.border-white');
    expect(borderedContainer).toBeInTheDocument();
  });

  it('has gradient overlay', () => {
    const { container } = render(<CircularPortrait />);
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('bg-gradient-to-br');
  });
});

describe('Statistics', () => {
  const mockStats = [
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
  ];

  it('renders all statistics values', () => {
    render(<Statistics stats={mockStats} />);
    mockStats.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    });
  });

  it('renders all statistics labels', () => {
    render(<Statistics stats={mockStats} />);
    mockStats.forEach((stat) => {
      // Label appears twice - in sr-only dt and visible dd
      const labels = screen.getAllByText(stat.label);
      expect(labels.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('uses semantic description list', () => {
    render(<Statistics stats={mockStats} />);
    const definitions = screen.getAllByRole('definition');
    expect(definitions.length).toBeGreaterThan(0);
  });

  it('has aria label for accessibility', () => {
    render(<Statistics stats={mockStats} />);
    expect(screen.getByLabelText(/career statistics/i)).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('has proper aria labels on sections', () => {
    render(<HeroThreeColumn />);
    expect(screen.getByRole('region', { name: /hero introduction/i })).toBeInTheDocument();
  });

  it('has descriptive alt text on portrait', () => {
    render(<HeroThreeColumn />);
    const portrait = screen.getByAltText(/umer khan.*videographer/i);
    expect(portrait).toHaveAttribute('alt');
  });

  it('uses semantic HTML elements', () => {
    render(<HeroThreeColumn />);
    // H1 for name
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    // H2 for skills section
    expect(screen.getByRole('heading', { level: 2, name: /skills/i })).toBeInTheDocument();
    // Lists for roles and skills
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(2);
  });
});
