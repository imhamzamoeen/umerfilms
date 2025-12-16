// src/components/home/HeroSection.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HeroSection } from './HeroSection';

// Mock VideoPlayer component
vi.mock('@/components/video', () => ({
  VideoPlayer: vi.fn(({ src, autoplay, muted, loop, className, poster }) => (
    <video
      data-testid="hero-video"
      data-src={src}
      data-autoplay={autoplay}
      data-muted={muted}
      data-loop={loop}
      data-poster={poster}
      className={className}
    />
  )),
}));

// Mock window.scrollTo
const mockScrollTo = vi.fn();
beforeEach(() => {
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: mockScrollTo,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    value: 1000,
  });
  mockScrollTo.mockClear();
});

describe('HeroSection', () => {
  it('renders hero section with full viewport height', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');

    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('h-screen');
  });

  it('renders VideoPlayer with correct props', () => {
    render(<HeroSection />);
    const video = screen.getByTestId('hero-video');

    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('data-src', '/videos/hero/showreel');
    expect(video).toHaveAttribute('data-autoplay', 'true');
    expect(video).toHaveAttribute('data-muted', 'true');
    expect(video).toHaveAttribute('data-loop', 'true');
    expect(video).toHaveAttribute('data-poster', '/videos/hero/showreel-poster.jpg');
  });

  it('renders brand name and tagline text', () => {
    render(<HeroSection />);

    expect(screen.getByText('UmerFilms')).toBeInTheDocument();
    expect(screen.getByText('Cinematic Storytelling')).toBeInTheDocument();
  });

  it('renders hero heading with outline stroke typography', () => {
    render(<HeroSection />);
    const heading = screen.getByText('UmerFilms');

    expect(heading).toHaveClass('hero-heading');
    expect(heading.tagName).toBe('H1');
  });

  it('renders unmute button', () => {
    render(<HeroSection />);
    const unmuteButton = screen.getByLabelText('Unmute video');

    expect(unmuteButton).toBeInTheDocument();
  });

  it('unmute button toggles mute state and aria-label', () => {
    render(<HeroSection />);

    // Initially muted
    let button = screen.getByLabelText('Unmute video');
    expect(button).toBeInTheDocument();

    // Click to unmute
    fireEvent.click(button);

    // Should now show "Mute video"
    button = screen.getByLabelText('Mute video');
    expect(button).toBeInTheDocument();

    // Click again to mute
    fireEvent.click(button);

    // Should show "Unmute video" again
    button = screen.getByLabelText('Unmute video');
    expect(button).toBeInTheDocument();
  });

  it('renders scroll indicator button', () => {
    render(<HeroSection />);
    const scrollButton = screen.getByLabelText('Scroll to content');

    expect(scrollButton).toBeInTheDocument();
    expect(screen.getByText('Scroll')).toBeInTheDocument();
  });

  it('scroll indicator has bounce animation', () => {
    render(<HeroSection />);
    const scrollButton = screen.getByLabelText('Scroll to content');

    expect(scrollButton).toHaveClass('animate-bounce');
  });

  it('clicking scroll indicator scrolls to content', () => {
    render(<HeroSection />);
    const scrollButton = screen.getByLabelText('Scroll to content');

    fireEvent.click(scrollButton);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 1000, // window.innerHeight
      behavior: 'smooth',
    });
  });

  it('has dark overlay for text contrast', () => {
    const { container } = render(<HeroSection />);
    const overlay = container.querySelector('.bg-black\\/30');

    expect(overlay).toBeInTheDocument();
  });

  it('text overlay is positioned above video', () => {
    const { container } = render(<HeroSection />);
    const textOverlay = container.querySelector('.z-10');

    expect(textOverlay).toBeInTheDocument();
    expect(textOverlay).toHaveClass('relative');
  });

  it('unmute button has focus-visible styles', () => {
    render(<HeroSection />);
    const button = screen.getByLabelText('Unmute video');

    expect(button.className).toContain('focus-visible:ring-2');
    expect(button.className).toContain('focus-visible:ring-[#D5007F]');
  });

  it('scroll button has focus-visible styles', () => {
    render(<HeroSection />);
    const button = screen.getByLabelText('Scroll to content');

    expect(button.className).toContain('focus-visible:ring-2');
    expect(button.className).toContain('focus-visible:ring-[#D5007F]');
  });
});
