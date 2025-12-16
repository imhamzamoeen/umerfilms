import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PortfolioSlider from './PortfolioSlider';
import { getAllProjects } from '@/data/projects';

// Mock Swiper components
vi.mock('swiper/react', () => ({
    Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
    SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide">{children}</div>,
}));

// Mock Swiper modules
vi.mock('swiper/modules', () => ({
    Navigation: 'Navigation',
    Pagination: 'Pagination',
    Keyboard: 'Keyboard',
    A11y: 'A11y',
}));

// Mock css imports
vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));

describe('PortfolioSlider', () => {
    const projects = getAllProjects();

    it('renders all project slides', () => {
        render(<PortfolioSlider />);

        projects.forEach((project) => {
            expect(screen.getByText(project.title)).toBeInTheDocument();
        });
    });

    it('calls onProjectClick when slide clicked', () => {
        const handleClick = vi.fn();
        render(<PortfolioSlider onProjectClick={handleClick} />);

        // Find the clickable element (using role="button" or click handler)
        // The slide wrapper has the onClick, role="button", and aria-label
        const firstProject = projects[0];
        const firstSlide = screen.getByLabelText(`View project: ${firstProject.title}`);

        fireEvent.click(firstSlide);

        expect(handleClick).toHaveBeenCalledWith(firstProject.id);
    });

    it('renders section heading', () => {
        render(<PortfolioSlider />);
        expect(screen.getByRole('heading', { name: /featured work/i })).toBeInTheDocument();
    });

    it('triggers click on Enter key', () => {
        const handleClick = vi.fn();
        render(<PortfolioSlider onProjectClick={handleClick} />);

        const firstProject = projects[0];
        const firstSlide = screen.getByLabelText(`View project: ${firstProject.title}`);

        firstSlide.focus();
        fireEvent.keyDown(firstSlide, { key: 'Enter', code: 'Enter' });

        expect(handleClick).toHaveBeenCalledWith(firstProject.id);
    });
});
