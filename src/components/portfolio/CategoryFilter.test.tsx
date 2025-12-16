// src/components/portfolio/CategoryFilter.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from './CategoryFilter';

describe('CategoryFilter', () => {
  const categories = ['All', 'Commercial', 'Music Video', 'Wedding'];
  const mockOnCategoryChange = vi.fn();

  it('renders all category buttons', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="All"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('highlights the selected category', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="Commercial"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const commercialButton = screen.getByText('Commercial');
    expect(commercialButton).toHaveClass('bg-amber-600');
    expect(commercialButton).toHaveClass('text-black');
  });

  it('does not highlight unselected categories', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="Commercial"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const allButton = screen.getByText('All');
    expect(allButton).toHaveClass('bg-gray-800');
    expect(allButton).toHaveClass('text-white');
  });

  it('calls onCategoryChange when a button is clicked', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="All"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const commercialButton = screen.getByText('Commercial');
    fireEvent.click(commercialButton);

    expect(mockOnCategoryChange).toHaveBeenCalledWith('Commercial');
    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1);
  });

  it('sets correct aria-pressed attribute for selected category', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="Wedding"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const weddingButton = screen.getByText('Wedding');
    expect(weddingButton).toHaveAttribute('aria-pressed', 'true');

    const allButton = screen.getByText('All');
    expect(allButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('has focus-visible styles for keyboard accessibility', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="All"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const firstButton = screen.getByText('All');
    expect(firstButton.className).toContain('focus-visible:ring-2');
    expect(firstButton.className).toContain('focus-visible:ring-amber-600');
  });
});
