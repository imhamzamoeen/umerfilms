import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AnimatedSection from './AnimatedSection';
import AnimatedHeading from './AnimatedHeading';
import AnimatedCard from './AnimatedCard';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      initial,
      whileInView,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      initial?: Record<string, unknown>;
      whileInView?: Record<string, unknown>;
      [key: string]: unknown;
    }) => (
      <div
        className={className}
        data-testid="motion-div"
        data-initial={JSON.stringify(initial)}
        {...props}
      >
        {children}
      </div>
    ),
  },
  useReducedMotion: () => false,
}));

describe('AnimatedSection', () => {
  it('renders children', () => {
    render(
      <AnimatedSection>
        <p>Test content</p>
      </AnimatedSection>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <AnimatedSection className="custom-class">
        <p>Content</p>
      </AnimatedSection>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('custom-class');
  });

  it('renders motion div wrapper', () => {
    render(
      <AnimatedSection>
        <p>Content</p>
      </AnimatedSection>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });
});

describe('AnimatedHeading', () => {
  it('renders children', () => {
    render(
      <AnimatedHeading>
        <h2>Test Heading</h2>
      </AnimatedHeading>
    );
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <AnimatedHeading className="heading-class">
        <h2>Heading</h2>
      </AnimatedHeading>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('heading-class');
  });

  it('renders motion div wrapper for left direction', () => {
    render(
      <AnimatedHeading direction="left">
        <h2>Heading</h2>
      </AnimatedHeading>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('renders motion div wrapper for right direction', () => {
    render(
      <AnimatedHeading direction="right">
        <h2>Heading</h2>
      </AnimatedHeading>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });
});

describe('AnimatedCard', () => {
  it('renders children', () => {
    render(
      <AnimatedCard>
        <div>Card content</div>
      </AnimatedCard>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <AnimatedCard className="card-class">
        <div>Card</div>
      </AnimatedCard>
    );
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('card-class');
  });

  it('renders motion div wrapper', () => {
    render(
      <AnimatedCard>
        <div>Card</div>
      </AnimatedCard>
    );
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });
});
