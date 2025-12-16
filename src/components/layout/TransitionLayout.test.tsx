import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TransitionLayout } from './TransitionLayout';

// Partially mock PreLoader so we can control it
vi.mock('./PreLoader', () => ({
    PreLoader: ({ onComplete }: { onComplete: () => void }) => {
        return (
            <div data-testid="preloader">
                PRELOADER
                <button onClick={onComplete} data-testid="finish-loader">Finish</button>
            </div>
        );
    }
}));

describe('TransitionLayout', () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    it('shows preloader on first visit', async () => {
        render(<TransitionLayout>Main Content</TransitionLayout>);
        await waitFor(() => {
            expect(screen.getByTestId('preloader')).toBeInTheDocument();
        });
    });

    it('skips preloader if session storage flag is set', async () => {
        sessionStorage.setItem('preloaderShown', 'true');
        render(<TransitionLayout>Main Content</TransitionLayout>);

        await waitFor(() => {
            expect(screen.queryByTestId('preloader')).not.toBeInTheDocument();
            expect(screen.getByText('Main Content')).toBeVisible();
        });
    });

    it('sets session storage flag after preloader completes', async () => {
        render(<TransitionLayout>Main Content</TransitionLayout>);

        const finishBtn = screen.getByTestId('finish-loader');
        finishBtn.click();

        await waitFor(() => {
            expect(sessionStorage.getItem('preloaderShown')).toBe('true');
            expect(screen.queryByTestId('preloader')).not.toBeInTheDocument();
        });
    });
});
