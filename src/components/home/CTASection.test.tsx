// src/components/home/CTASection.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CTASection } from './CTASection';

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

describe('CTASection', () => {
  it('renders section heading', () => {
    render(<CTASection />);
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<CTASection />);
    expect(screen.getByText(/Ready to bring your vision to life/i)).toBeInTheDocument();
  });

  it('renders CTA button with correct text', () => {
    render(<CTASection />);
    const button = screen.getByRole('link', { name: 'Work With Me' });
    expect(button).toBeInTheDocument();
  });

  it('CTA button links to contact page', () => {
    render(<CTASection />);
    const button = screen.getByRole('link', { name: 'Work With Me' });
    expect(button).toHaveAttribute('href', '/contact');
  });

  it('uses semantic section element', () => {
    const { container } = render(<CTASection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has proper vertical padding', () => {
    const { container } = render(<CTASection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16');
    expect(section).toHaveClass('md:py-20');
  });

  it('uses bg-background color', () => {
    const { container } = render(<CTASection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-background');
  });

  it('centers content with max-width constraint', () => {
    const { container } = render(<CTASection />);
    const content = container.querySelector('.max-w-2xl');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('mx-auto');
    expect(content).toHaveClass('text-center');
  });

  it('heading has large responsive typography', () => {
    render(<CTASection />);
    const heading = screen.getByText("Let's Work Together");
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('md:text-5xl');
    expect(heading).toHaveClass('font-bold');
  });

  it('description has appropriate size and spacing', () => {
    render(<CTASection />);
    const description = screen.getByText(/Ready to bring your vision to life/i);
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('text-lg');
    expect(description).toHaveClass('md:text-xl');
    expect(description).toHaveClass('text-gray-300');
    expect(description).toHaveClass('mb-8');
  });

  it('CTA button has gradient background', () => {
    render(<CTASection />);
    const button = screen.getByRole('link', { name: 'Work With Me' });
    expect(button.className).toContain('bg-gradient-to-r');
    expect(button.className).toContain('from-[#450E93]');
    expect(button.className).toContain('to-[#D5007F]');
  });

  it('CTA button has hover scale effect', () => {
    render(<CTASection />);
    const button = screen.getByRole('link', { name: 'Work With Me' });
    expect(button.className).toContain('hover:scale-105');
  });

  it('CTA button has proper padding and sizing', () => {
    render(<CTASection />);
    const button = screen.getByRole('link', { name: 'Work With Me' });
    expect(button).toHaveClass('px-8');
    expect(button).toHaveClass('py-4');
    expect(button).toHaveClass('text-lg');
    expect(button).toHaveClass('font-semibold');
  });

  it('CTA button has focus-visible ring styles', () => {
    render(<CTASection />);
    const button = screen.getByRole('link', { name: 'Work With Me' });
    expect(button.className).toContain('focus-visible:ring-2');
    expect(button.className).toContain('focus-visible:ring-[#D5007F]');
    expect(button.className).toContain('focus-visible:ring-offset-2');
  });

  it('CTA button uses white text for contrast', () => {
    render(<CTASection />);
    const button = screen.getByRole('link', { name: 'Work With Me' });
    expect(button).toHaveClass('text-white');
  });
});
