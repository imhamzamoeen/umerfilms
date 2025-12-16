import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectGallery from './ProjectGallery';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      onClick,
      className,
      role,
      'aria-modal': ariaModal,
      'aria-label': ariaLabel,
      onKeyDown,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
      className?: string;
      role?: string;
      'aria-modal'?: boolean | 'true' | 'false';
      'aria-label'?: string;
      onKeyDown?: (e: React.KeyboardEvent) => void;
    }) => (
      <div
        onClick={onClick}
        className={className}
        role={role}
        aria-modal={ariaModal}
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
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

const mockImages = [
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
];

describe('ProjectGallery', () => {
  it('renders gallery heading', () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Gallery');
  });

  it('renders all gallery images', () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    const buttons = screen.getAllByRole('button', { name: /view gallery image/i });
    expect(buttons).toHaveLength(3);
  });

  it('renders nothing when no images provided', () => {
    const { container } = render(
      <ProjectGallery images={[]} projectTitle="Test Project" />
    );

    expect(container.firstChild).toBeNull();
  });

  it('opens lightbox when image is clicked', async () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    const firstImage = screen.getByRole('button', {
      name: /view gallery image 1 of 3/i,
    });
    fireEvent.click(firstImage);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('shows image counter in lightbox', async () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    const firstImage = screen.getByRole('button', {
      name: /view gallery image 1 of 3/i,
    });
    fireEvent.click(firstImage);

    await waitFor(() => {
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });
  });

  it('closes lightbox when close button is clicked', async () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    // Open lightbox
    const firstImage = screen.getByRole('button', {
      name: /view gallery image 1 of 3/i,
    });
    fireEvent.click(firstImage);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Close lightbox
    const closeButton = screen.getByRole('button', { name: /close lightbox/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('navigates to next image', async () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    // Open lightbox on first image
    const firstImage = screen.getByRole('button', {
      name: /view gallery image 1 of 3/i,
    });
    fireEvent.click(firstImage);

    await waitFor(() => {
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });

    // Click next
    const nextButton = screen.getByRole('button', { name: /next image/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });
  });

  it('navigates to previous image', async () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    // Open lightbox on second image
    const secondImage = screen.getByRole('button', {
      name: /view gallery image 2 of 3/i,
    });
    fireEvent.click(secondImage);

    await waitFor(() => {
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });

    // Click previous
    const prevButton = screen.getByRole('button', { name: /previous image/i });
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });
  });

  it('hides previous button on first image', async () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    const firstImage = screen.getByRole('button', {
      name: /view gallery image 1 of 3/i,
    });
    fireEvent.click(firstImage);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /previous image/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next image/i })).toBeInTheDocument();
  });

  it('hides next button on last image', async () => {
    render(<ProjectGallery images={mockImages} projectTitle="Test Project" />);

    const lastImage = screen.getByRole('button', {
      name: /view gallery image 3 of 3/i,
    });
    fireEvent.click(lastImage);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /previous image/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next image/i })).not.toBeInTheDocument();
  });
});
