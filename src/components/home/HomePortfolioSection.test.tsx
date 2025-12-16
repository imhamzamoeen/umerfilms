import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePortfolioSection from './HomePortfolioSection';

// Mock Swiper components
vi.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

vi.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  Keyboard: {},
  A11y: {},
}));

vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      onClick,
      className,
      role,
      'aria-modal': ariaModal,
      'aria-labelledby': ariaLabelledby,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
      className?: string;
      role?: string;
      'aria-modal'?: boolean | 'true' | 'false';
      'aria-labelledby'?: string;
    }) => (
      <div
        onClick={onClick}
        className={className}
        role={role}
        aria-modal={ariaModal}
        aria-labelledby={ariaLabelledby}
      >
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock focus-trap-react
vi.mock('focus-trap-react', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('HomePortfolioSection', () => {
  it('renders PortfolioSlider', () => {
    render(<HomePortfolioSection />);

    expect(screen.getByText('Featured Work')).toBeInTheDocument();
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('opens lightbox when project is clicked', async () => {
    render(<HomePortfolioSection />);

    // Find a project button and click it
    const projectButtons = screen.getAllByRole('button', {
      name: /view project/i,
    });
    fireEvent.click(projectButtons[0]);

    // Lightbox should open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes lightbox when close button is clicked', async () => {
    render(<HomePortfolioSection />);

    // Open lightbox
    const projectButtons = screen.getAllByRole('button', {
      name: /view project/i,
    });
    fireEvent.click(projectButtons[0]);

    // Wait for lightbox to open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click close button
    const closeButton = screen.getByRole('button', { name: /close lightbox/i });
    fireEvent.click(closeButton);

    // Lightbox should close
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('navigates between projects in lightbox', async () => {
    render(<HomePortfolioSection />);

    // Open lightbox on second project (to have prev/next available)
    const projectButtons = screen.getAllByRole('button', {
      name: /view project/i,
    });
    fireEvent.click(projectButtons[1]);

    // Wait for lightbox
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Get current project title (lightbox title has id="lightbox-title")
    const lightboxTitle = document.getElementById('lightbox-title');
    const initialTitle = lightboxTitle?.textContent;

    // Click next
    const nextButton = screen.getByRole('button', { name: /next project/i });
    fireEvent.click(nextButton);

    // Title should change
    await waitFor(() => {
      const newTitle = document.getElementById('lightbox-title')?.textContent;
      expect(newTitle).not.toBe(initialTitle);
    });
  });
});
