import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Services from './Services';

// Mock the services data to avoid testing implementation details of data
vi.mock('@/data/services', () => ({
    services: [
        {
            id: 's1',
            title: 'Service 1',
            description: 'Desc 1',
            icon: () => <svg data-testid="icon-1" />,
        },
        {
            id: 's2',
            title: 'Service 2',
            description: 'Desc 2',
            icon: () => <svg data-testid="icon-2" />,
        },
    ],
}));

describe('Services Section', () => {
    it('renders all services', () => {
        render(<Services />);

        expect(screen.getByText('Service 1')).toBeInTheDocument();
        expect(screen.getByText('Service 2')).toBeInTheDocument();
        expect(screen.getByText('Desc 1')).toBeInTheDocument();
    });

    it('renders section heading', () => {
        render(<Services />);
        expect(screen.getByRole('heading', { name: /what i do/i })).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
        render(<Services />);
        const h2 = screen.getByRole('heading', { level: 2 });
        const h3s = screen.getAllByRole('heading', { level: 3 });

        expect(h2).toBeInTheDocument();
        expect(h3s).toHaveLength(2); // Based on mock data
    });
});
