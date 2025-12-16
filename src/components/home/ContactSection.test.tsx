import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  it('renders section heading', () => {
    render(<ContactSection />);
    expect(
      screen.getByRole('heading', { name: /let's work together/i })
    ).toBeInTheDocument();
  });

  it('renders section label', () => {
    render(<ContactSection />);
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });

  it('renders contact form', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders Send a Message subheading', () => {
    render(<ContactSection />);
    expect(
      screen.getByRole('heading', { name: /send a message/i })
    ).toBeInTheDocument();
  });

  it('renders Google Map iframe', () => {
    render(<ContactSection />);
    const iframe = screen.getByTitle(/location map/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe('IFRAME');
  });

  it('map has lazy loading', () => {
    render(<ContactSection />);
    const iframe = screen.getByTitle(/location map/i);
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('has two-column grid on desktop', () => {
    render(<ContactSection />);
    const grid = document.querySelector('.lg\\:grid-cols-2');
    expect(grid).toBeInTheDocument();
  });

  it('has dark card backgrounds', () => {
    render(<ContactSection />);
    const cards = document.querySelectorAll('.bg-\\[\\#1E1E1E\\]');
    expect(cards.length).toBe(2);
  });

  it('has section id for navigation', () => {
    render(<ContactSection />);
    const section = document.getElementById('contact');
    expect(section).toBeInTheDocument();
  });
});
