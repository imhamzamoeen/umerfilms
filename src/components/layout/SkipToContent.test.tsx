// src/components/layout/SkipToContent.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkipToContent from './SkipToContent';

describe('SkipToContent', () => {
  it('renders skip link', () => {
    render(<SkipToContent />);

    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link).toBeInTheDocument();
  });

  it('links to main-content anchor', () => {
    render(<SkipToContent />);

    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has sr-only class for screen reader only visibility', () => {
    render(<SkipToContent />);

    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link).toHaveClass('sr-only');
  });

  it('becomes visible on focus', () => {
    render(<SkipToContent />);

    const link = screen.getByRole('link', { name: /skip to content/i });
    // Check that focus styles are defined
    expect(link.className).toContain('focus:not-sr-only');
    expect(link.className).toContain('focus:absolute');
  });

  it('has high z-index for visibility', () => {
    render(<SkipToContent />);

    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link.className).toContain('focus:z-[100]');
  });

  it('has focus ring styling', () => {
    render(<SkipToContent />);

    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link.className).toContain('focus:ring-2');
    expect(link.className).toContain('focus:ring-[#D5007F]');
  });
});
