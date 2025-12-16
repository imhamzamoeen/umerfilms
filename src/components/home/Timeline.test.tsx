import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Timeline from './Timeline';
import { timeline } from '@/data/timeline';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Timeline Section', () => {
    it('renders all timeline entries', () => {
        render(<Timeline />);

        timeline.forEach((entry) => {
            expect(screen.getByText(entry.position)).toBeInTheDocument();
            expect(screen.getByText(entry.company)).toBeInTheDocument();
        });
    });

    it('expands item on click', () => {
        render(<Timeline />);

        // First item is open by default in implementation
        // Let's check the second item
        if (timeline.length > 1) {
            const secondItemBtn = screen.getByText(timeline[1].position).closest('[role="button"]');
            expect(secondItemBtn).toBeInTheDocument();

            // Initial state: content might be hidden or not rendered depending on AnimatePresence mock
            // But our mock renders children directly, so AnimatePresence {isExpanded && ...} handles logic.
            // Wait, AnimatePresence just renders children. But the condition `isExpanded &&` is in the component code.
            // So if isExpanded is false, it won't render.

            // Click to expand
            fireEvent.click(secondItemBtn!);

            // Should be visible
            expect(screen.getByText(timeline[1].description)).toBeInTheDocument();
        }
    });

    it('collapses expanded item on click', () => {
        render(<Timeline />);

        // First item is expanded by default
        const firstItemBtn = screen.getByText(timeline[0].position).closest('[role="button"]');

        // Should be visible initially
        expect(screen.getByText(timeline[0].description)).toBeInTheDocument();

        // Click to collapse
        fireEvent.click(firstItemBtn!);

        // Should be hidden
        expect(screen.queryByText(timeline[0].description)).not.toBeInTheDocument();
    });

    it('has proper ARIA attributes', () => {
        render(<Timeline />);

        const firstItemBtn = screen.getByText(timeline[0].position).closest('[role="button"]');

        expect(firstItemBtn).toHaveAttribute('aria-expanded', 'true'); // Default open
        expect(firstItemBtn).toHaveAttribute('aria-controls');
    });
});
