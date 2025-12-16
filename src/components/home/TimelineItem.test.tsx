import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TimelineItem from './TimelineItem';
import { TimelineEntry } from '@/data/timeline';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockEntry: TimelineEntry = {
    id: 'test-1',
    year: '2023',
    position: 'Test Position',
    company: 'Test Company',
    description: 'Test Description',
    type: 'work',
};

describe('TimelineItem', () => {
    it('renders item details correctly', () => {
        render(<TimelineItem entry={mockEntry} index={1} />); // Index 1 starts collapsed

        expect(screen.getByText('2023')).toBeInTheDocument();
        expect(screen.getByText('Test Position')).toBeInTheDocument();
        expect(screen.getByText('Test Company')).toBeInTheDocument();
    });

    it('expands on click', () => {
        render(<TimelineItem entry={mockEntry} index={1} />);

        // Description should not be visible initially
        expect(screen.queryByText('Test Description')).not.toBeInTheDocument();

        // Click header
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Description should be visible
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders expanded by default if index is 0', () => {
        render(<TimelineItem entry={mockEntry} index={0} />);
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('expands on Enter key', () => {
        render(<TimelineItem entry={mockEntry} index={1} />);

        const button = screen.getByRole('button');
        fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('expands on Space key', () => {
        render(<TimelineItem entry={mockEntry} index={1} />);

        const button = screen.getByRole('button');
        fireEvent.keyDown(button, { key: ' ', code: 'Space' });

        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
        render(<TimelineItem entry={mockEntry} index={1} />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveAttribute('aria-controls', `timeline-${mockEntry.id}`);

        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });
});
