import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PreLoader } from './PreLoader';

describe('PreLoader', () => {
    beforeEach(() => {
        // Clear sessionStorage before each test
        sessionStorage.clear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders loading text with all letters on first visit', () => {
        render(<PreLoader />);
        expect(screen.getByText('L')).toBeInTheDocument();
        expect(screen.getByText('O')).toBeInTheDocument();
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('D')).toBeInTheDocument();
        expect(screen.getByText('I')).toBeInTheDocument();
        expect(screen.getByText('N')).toBeInTheDocument();
        expect(screen.getAllByText('G')[0]).toBeInTheDocument();
    });

    it('renders with correct accessibility roles', () => {
        render(<PreLoader />);
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveAttribute('aria-label', 'Loading page content');
    });

    it('calls onComplete after animation timeout', () => {
        const onComplete = vi.fn();

        render(<PreLoader onComplete={onComplete} />);

        act(() => {
            vi.advanceTimersByTime(2500); // Wait for animation duration
        });

        expect(onComplete).toHaveBeenCalled();
    });

    it('stores flag in sessionStorage after completion', () => {
        render(<PreLoader />);

        act(() => {
            vi.advanceTimersByTime(2500);
        });

        expect(sessionStorage.getItem('preloaderShown')).toBe('true');
    });

    it('skips animation if already shown in session', () => {
        // Set the flag as if preloader was already shown
        sessionStorage.setItem('preloaderShown', 'true');

        render(<PreLoader />);

        // Should not render the preloader
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('calls onComplete immediately if already shown in session', () => {
        sessionStorage.setItem('preloaderShown', 'true');
        const onComplete = vi.fn();

        render(<PreLoader onComplete={onComplete} />);

        expect(onComplete).toHaveBeenCalled();
    });
});
