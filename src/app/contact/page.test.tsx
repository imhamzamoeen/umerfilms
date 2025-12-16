// src/app/contact/page.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactPage, { metadata } from './page';

// Mock PageWrapper and ContactForm
vi.mock('@/components/layout', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-wrapper">{children}</div>
  ),
}));

vi.mock('@/components/contact', () => ({
  ContactForm: () => <div data-testid="contact-form">Contact Form</div>,
}));

describe('ContactPage', () => {
  it('renders page heading', () => {
    render(<ContactPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent("Let's Create Together");
  });

  it('heading has responsive typography', () => {
    render(<ContactPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('md:text-5xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-center');
  });

  it('renders intro paragraph', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Every project is unique/i)).toBeInTheDocument();
  });

  it('intro paragraph mentions custom quotes', () => {
    render(<ContactPage />);
    expect(screen.getByText(/custom quotes tailored to your vision/i)).toBeInTheDocument();
  });

  it('intro paragraph mentions response time', () => {
    render(<ContactPage />);
    expect(screen.getByText(/24-48 hours/i)).toBeInTheDocument();
  });

  it('intro paragraph has proper styling', () => {
    const { container } = render(<ContactPage />);
    const introParagraph = container.querySelector('.text-lg.md\\:text-xl');
    expect(introParagraph).toHaveClass('text-center');
    expect(introParagraph).toHaveClass('max-w-3xl');
    expect(introParagraph).toHaveClass('mx-auto');
  });

  it('renders services section heading', () => {
    render(<ContactPage />);
    const servicesHeading = screen.getByRole('heading', { name: /services/i, level: 2 });
    expect(servicesHeading).toBeInTheDocument();
  });

  it('services heading has responsive typography', () => {
    render(<ContactPage />);
    const servicesHeading = screen.getByRole('heading', { name: /services/i });
    expect(servicesHeading).toHaveClass('text-3xl');
    expect(servicesHeading).toHaveClass('md:text-4xl');
    expect(servicesHeading).toHaveClass('font-bold');
    expect(servicesHeading).toHaveClass('text-center');
  });

  it('renders Commercial & Brand Content service', () => {
    render(<ContactPage />);
    expect(screen.getByText('Commercial & Brand Content')).toBeInTheDocument();
    expect(screen.getByText(/Elevate your brand with cinematic commercials/i)).toBeInTheDocument();
  });

  it('renders Music Videos service', () => {
    render(<ContactPage />);
    expect(screen.getByText('Music Videos')).toBeInTheDocument();
    expect(screen.getByText(/Bring your music to life with creative visuals/i)).toBeInTheDocument();
  });

  it('renders Wedding & Event Coverage service', () => {
    render(<ContactPage />);
    expect(screen.getByText('Wedding & Event Coverage')).toBeInTheDocument();
    expect(screen.getByText(/Preserve your special moments/i)).toBeInTheDocument();
  });

  it('renders Short Films & Creative Projects service', () => {
    render(<ContactPage />);
    expect(screen.getByText('Short Films & Creative Projects')).toBeInTheDocument();
    expect(screen.getByText(/Collaborate on narrative-driven films/i)).toBeInTheDocument();
  });

  it('renders exactly 4 service cards', () => {
    const { container } = render(<ContactPage />);
    const serviceCards = container.querySelectorAll('.bg-gray-800.rounded-lg.p-6');
    expect(serviceCards.length).toBe(4);
  });

  it('applies responsive grid classes to services', () => {
    const { container } = render(<ContactPage />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('gap-6');
    expect(grid).toHaveClass('md:gap-8');
  });

  it('services grid has max-width constraint', () => {
    const { container } = render(<ContactPage />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('max-w-4xl');
    expect(grid).toHaveClass('mx-auto');
  });

  it('service cards have proper styling', () => {
    const { container } = render(<ContactPage />);
    const firstCard = container.querySelector('.bg-gray-800.rounded-lg');
    expect(firstCard).toHaveClass('p-6');
    expect(firstCard).toHaveClass('md:p-8');
  });

  it('service titles have proper typography', () => {
    render(<ContactPage />);
    const serviceTitle = screen.getByText('Commercial & Brand Content');
    expect(serviceTitle.tagName).toBe('H3');
    expect(serviceTitle).toHaveClass('text-xl');
    expect(serviceTitle).toHaveClass('md:text-2xl');
    expect(serviceTitle).toHaveClass('font-semibold');
  });

  it('service descriptions have readable styling', () => {
    const { container } = render(<ContactPage />);
    const description = container.querySelector('.text-gray-300.leading-relaxed');
    expect(description).toBeInTheDocument();
  });

  it('renders contact form section heading', () => {
    render(<ContactPage />);
    const formHeading = screen.getByRole('heading', { name: /get in touch/i, level: 2 });
    expect(formHeading).toBeInTheDocument();
  });

  it('contact form heading has responsive typography', () => {
    render(<ContactPage />);
    const formHeading = screen.getByRole('heading', { name: /get in touch/i });
    expect(formHeading).toHaveClass('text-3xl');
    expect(formHeading).toHaveClass('md:text-4xl');
    expect(formHeading).toHaveClass('font-bold');
    expect(formHeading).toHaveClass('text-center');
  });

  it('renders contact form component', () => {
    render(<ContactPage />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it('contact form is within proper container', () => {
    const { container } = render(<ContactPage />);
    const formSection = container.querySelector('.mt-16.md\\:mt-20');
    expect(formSection).toBeInTheDocument();
  });

  it('uses PageWrapper for layout', () => {
    render(<ContactPage />);
    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();
  });

  it('has proper vertical padding', () => {
    const { container } = render(<ContactPage />);
    const mainDiv = container.querySelector('.py-16');
    expect(mainDiv).toHaveClass('py-16');
    expect(mainDiv).toHaveClass('md:py-20');
  });

  it('services section has bottom margin', () => {
    const { container } = render(<ContactPage />);
    const servicesSection = container.querySelectorAll('.mb-16')[1]; // Second one (first is intro)
    expect(servicesSection).toHaveClass('md:mb-20');
  });

  it('contact form section has top margin', () => {
    const { container } = render(<ContactPage />);
    const formSection = container.querySelector('.mt-16.md\\:mt-20');
    expect(formSection).toBeInTheDocument();
  });

  it('intro paragraph has bottom margin', () => {
    const { container } = render(<ContactPage />);
    const intro = container.querySelector('.text-lg.md\\:text-xl');
    expect(intro).toHaveClass('mb-16');
  });

  it('services heading has bottom margin', () => {
    render(<ContactPage />);
    const servicesHeading = screen.getByRole('heading', { name: /services/i });
    expect(servicesHeading).toHaveClass('mb-8');
    expect(servicesHeading).toHaveClass('md:mb-12');
  });

  it('contact form heading has bottom margin', () => {
    render(<ContactPage />);
    const formHeading = screen.getByRole('heading', { name: /get in touch/i });
    expect(formHeading).toHaveClass('mb-8');
    expect(formHeading).toHaveClass('md:mb-12');
  });
});

describe('ContactPage metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Work With Me - UmerFilms');
  });

  it('has descriptive description', () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.description).toContain('video production services');
    expect(metadata.description).toContain('custom quote');
  });

  it('mentions service types in description', () => {
    expect(metadata.description).toContain('commercials');
    expect(metadata.description).toContain('music videos');
    expect(metadata.description).toContain('weddings');
    expect(metadata.description).toContain('creative projects');
  });

  it('has OpenGraph metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBe('Work With Me - UmerFilms');
    expect(metadata.openGraph?.description).toBe('Professional video production services');
    expect(metadata.openGraph?.type).toBe('website');
  });
});
