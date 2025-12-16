import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BlogPage from './page';

describe('BlogPage', () => {
  it('renders page heading', () => {
    render(<BlogPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Insights & Stories');
  });

  it('renders blog label', () => {
    render(<BlogPage />);

    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders featured post section', () => {
    render(<BlogPage />);

    expect(screen.getByText(/Featured/)).toBeInTheDocument();
  });

  it('renders latest posts section', () => {
    render(<BlogPage />);

    expect(screen.getByRole('heading', { name: /latest posts/i })).toBeInTheDocument();
  });

  it('renders blog post links', () => {
    render(<BlogPage />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('displays post categories', () => {
    render(<BlogPage />);

    // At least one category should be visible
    const categoryElements = screen.getAllByText(/Tips & Tricks|Post-Production|Behind the Scenes|Equipment/);
    expect(categoryElements.length).toBeGreaterThan(0);
  });

  it('displays reading time', () => {
    render(<BlogPage />);

    const readingTimes = screen.getAllByText(/min read/);
    expect(readingTimes.length).toBeGreaterThan(0);
  });
});
