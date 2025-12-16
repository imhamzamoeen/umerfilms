import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServiceCard from './ServiceCard';
import { BsCameraVideo } from 'react-icons/bs';

const mockService = {
    id: 'test',
    title: 'Test Service',
    description: 'Test description',
    icon: BsCameraVideo,
};

describe('ServiceCard', () => {
    it('renders service title and description', () => {
        render(<ServiceCard service={mockService} />);

        expect(screen.getByText('Test Service')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('applies hover effect class', () => {
        const { container } = render(<ServiceCard service={mockService} />);
        const card = container.firstChild as HTMLElement;

        expect(card).toHaveClass('service-card');
    });

    it('renders icon', () => {
        // We check if the SVG is rendered. react-icons render as svg.
        const { container } = render(<ServiceCard service={mockService} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});
