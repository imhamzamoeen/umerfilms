// src/components/home/IntroSection.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IntroSection } from './IntroSection';

describe('IntroSection', () => {
  it('renders section heading', () => {
    render(<IntroSection />);
    expect(screen.getByText('Visual Storyteller')).toBeInTheDocument();
  });

  it('renders introduction text', () => {
    render(<IntroSection />);
    expect(screen.getByText(/Umer creates cinematic experiences/i)).toBeInTheDocument();
  });

  it('uses semantic section element', () => {
    const { container } = render(<IntroSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has proper vertical padding', () => {
    const { container } = render(<IntroSection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('md:py-20');
  });

  it('centers content with max-width constraint', () => {
    const { container } = render(<IntroSection />);
    const content = container.querySelector('.max-w-3xl');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('mx-auto');
    expect(content).toHaveClass('text-center');
  });

  it('heading has appropriate typography', () => {
    render(<IntroSection />);
    const heading = screen.getByText('Visual Storyteller');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('text-3xl');
    expect(heading).toHaveClass('md:text-4xl');
    expect(heading).toHaveClass('font-bold');
  });

  it('text has appropriate size and color', () => {
    render(<IntroSection />);
    const text = screen.getByText(/Umer creates cinematic experiences/i);
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-lg');
    expect(text).toHaveClass('md:text-xl');
    expect(text).toHaveClass('text-gray-300');
  });
});
