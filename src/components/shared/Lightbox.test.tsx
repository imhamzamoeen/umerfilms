import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Lightbox from './Lightbox';
import { Project } from '@/types/project';

// Mock framer-motion to avoid animation issues in tests
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

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    slug: 'project-one',
    category: 'Commercial',
    description: 'First project description',
    thumbnailUrl: '/images/project1.jpg',
    videoUrl: '/videos/project1.mp4',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Project Two',
    slug: 'project-two',
    category: 'Music Video',
    description: 'Second project description',
    thumbnailUrl: '/images/project2.jpg',
    videoUrl: '/videos/project2.mp4',
    featured: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Project Three',
    slug: 'project-three',
    category: 'Wedding',
    description: 'Third project description',
    thumbnailUrl: '/images/project3.jpg',
    videoUrl: '/videos/project3.mp4',
    featured: false,
    order: 3,
  },
];

describe('Lightbox', () => {
  const mockOnClose = vi.fn();
  const mockOnNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Project One')).toBeInTheDocument();
    expect(screen.getByText('First project description')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Lightbox
        isOpen={false}
        project={null}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render when project is null', () => {
    render(
      <Lightbox
        isOpen={true}
        project={null}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays project title and category', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[1]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText('Project Two')).toBeInTheDocument();
    expect(screen.getByText('Music Video')).toBeInTheDocument();
    expect(screen.getByText('Second project description')).toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('navigates to next on ArrowRight key', async () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalledWith('next');
    });
  });

  it('navigates to previous on ArrowLeft key', async () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[1]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalledWith('prev');
    });
  });

  it('closes on backdrop click', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking content', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    const title = screen.getByText('Project One');
    fireEvent.click(title);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('shows close button with aria-label', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close lightbox/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close lightbox/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('hides previous button on first project', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    expect(
      screen.queryByRole('button', { name: /previous project/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next project/i })
    ).toBeInTheDocument();
  });

  it('hides next button on last project', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[2]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    expect(
      screen.getByRole('button', { name: /previous project/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /next project/i })
    ).not.toBeInTheDocument();
  });

  it('shows both navigation buttons on middle project', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[1]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    expect(
      screen.getByRole('button', { name: /previous project/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next project/i })
    ).toBeInTheDocument();
  });

  it('calls onNavigate with prev when previous button is clicked', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[1]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    const prevButton = screen.getByRole('button', { name: /previous project/i });
    fireEvent.click(prevButton);

    expect(mockOnNavigate).toHaveBeenCalledWith('prev');
  });

  it('calls onNavigate with next when next button is clicked', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[1]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next project/i });
    fireEvent.click(nextButton);

    expect(mockOnNavigate).toHaveBeenCalledWith('next');
  });

  it('has proper accessibility attributes', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'lightbox-title');

    const title = screen.getByText('Project One');
    expect(title).toHaveAttribute('id', 'lightbox-title');
  });

  it('displays project image with correct alt text', () => {
    render(
      <Lightbox
        isOpen={true}
        project={mockProjects[0]}
        projects={mockProjects}
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
      />
    );

    const image = screen.getByRole('img', { name: 'Project One' });
    expect(image).toBeInTheDocument();
  });
});
