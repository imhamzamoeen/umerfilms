import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Testimonials from './Testimonials';
import { testimonials } from '@/data/testimonials';
import { ReactNode } from 'react';

interface SwiperProps {
  children: ReactNode;
  onSwiper?: (swiper: {
    autoplay: { start: () => void; stop: () => void };
  }) => void;
}

interface SwiperSlideProps {
  children: ReactNode;
}

// Mock Swiper components
vi.mock('swiper/react', () => ({
  Swiper: ({ children, onSwiper }: SwiperProps) => {
    // Simulate swiper instance with autoplay
    const mockSwiper = {
      autoplay: {
        start: vi.fn(),
        stop: vi.fn(),
      },
    };
    if (onSwiper) onSwiper(mockSwiper);
    return <div data-testid="swiper">{children}</div>;
  },
  SwiperSlide: ({ children }: SwiperSlideProps) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

// Mock Swiper modules
vi.mock('swiper/modules', () => ({
  Autoplay: 'Autoplay',
  Pagination: 'Pagination',
  Keyboard: 'Keyboard',
}));

// Mock css imports
vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));

describe('Testimonials', () => {
  it('renders section heading', () => {
    render(<Testimonials />);
    expect(
      screen.getByRole('heading', { name: /what clients say/i })
    ).toBeInTheDocument();
  });

  it('renders section label', () => {
    render(<Testimonials />);
    expect(screen.getByText(/testimonials/i)).toBeInTheDocument();
  });

  it('renders all testimonial slides', () => {
    render(<Testimonials />);

    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(testimonials.length);
  });

  it('renders testimonial content', () => {
    render(<Testimonials />);

    testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${testimonial.role}, ${testimonial.company}`)
      ).toBeInTheDocument();
    });
  });

  it('renders testimonial quotes', () => {
    render(<Testimonials />);

    testimonials.forEach((testimonial) => {
      // Use substring match since quotes are rendered with curly quote characters
      expect(
        screen.getByText((content) => content.includes(testimonial.quote))
      ).toBeInTheDocument();
    });
  });

  it('has accessible region role', () => {
    render(<Testimonials />);
    expect(
      screen.getByRole('region', { name: /client testimonials/i })
    ).toBeInTheDocument();
  });

  it('toggles autoplay pause on Space key', () => {
    render(<Testimonials />);

    const section = screen.getByRole('region', { name: /client testimonials/i });

    // Press space to pause
    fireEvent.keyDown(section, { key: ' ' });
    expect(screen.getByText(/autoplay paused/i)).toBeInTheDocument();

    // Press space to resume
    fireEvent.keyDown(section, { key: ' ' });
    expect(screen.queryByText(/autoplay paused/i)).not.toBeInTheDocument();
  });

  it('renders swiper container', () => {
    render(<Testimonials />);
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });
});
