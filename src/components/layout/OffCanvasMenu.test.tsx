import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OffCanvasMenu from './OffCanvasMenu';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, onClick, ...props }: any) => (
            <div onClick={onClick} {...props}>
                {children}
            </div>
        ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    Variants: {},
}));

vi.mock('focus-trap-react', () => ({
    default: ({ children }: any) => <>{children}</>,
}));

describe('OffCanvasMenu', () => {
    const mockOnClose = vi.fn();

    it('renders when open', () => {
        render(<OffCanvasMenu isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(<OffCanvasMenu isOpen={false} onClose={mockOnClose} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('calls onClose when backdrop clicked', () => {
        render(<OffCanvasMenu isOpen={true} onClose={mockOnClose} />);

        // The backdrop is the first div inside the FocusTrap which is inside AnimatePresence
        // In our mock, AnimatePresence renders children directly.
        // The component structure is: FocusTrap > div.fixed > motion.div(backdrop) + motion.div(panel)
        // We can find the backdrop by the click handler or class.
        // However, since we mocked motion.div with onClick, we should be able to trigger it.
        // The backdrop has `onClick={onClose}`.

        // We need to identify the backdrop. Since role=dialog is on the panel, 
        // we can look for the element that is NOT the dialog but has the click handler.
        // Or simpler: The backdrop is the first child of the wrapper.
        // But testing library recommends user-centric querying.
        // Let's assume the first motion.div is the backdrop as per implementation

        // Actually, in the implementation:
        // <div className="fixed inset-0 z-50">
        //   <motion.div ... onClick={onClose} ... />  <-- Backdrop
        //   <motion.div ... role="dialog" ... />      <-- Panel
        // </div>

        // We can try to click the element with "fixed inset-0" (or absolute inset-0 in the implementation).
        // But better: since the backdrop is purely visual/interactive, checking if clicking "outside" works is good.
        // Since we mocked motion.div to pass onClick, we can just find the backdrop element.
        // The backdrop doesn't have a role, but it has aria-hidden="true".

        const backdrop = screen.getByRole('dialog').parentElement?.querySelector('[aria-hidden="true"]');
        expect(backdrop).toBeInTheDocument();

        fireEvent.click(backdrop as Element);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when Escape pressed', () => {
        render(<OffCanvasMenu isOpen={true} onClose={mockOnClose} />);

        fireEvent.keyDown(window, { key: 'Escape' });

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when navigation link clicked', () => {
        render(<OffCanvasMenu isOpen={true} onClose={mockOnClose} />);

        const homeLink = screen.getByText('Home');
        fireEvent.click(homeLink);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('has proper ARIA attributes', () => {
        render(<OffCanvasMenu isOpen={true} onClose={mockOnClose} />);

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-label', 'Navigation menu');
    });

    it('prevents body scroll when open', () => {
        render(<OffCanvasMenu isOpen={true} onClose={mockOnClose} />);
        expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', () => {
        const { unmount } = render(<OffCanvasMenu isOpen={true} onClose={mockOnClose} />);
        expect(document.body.style.overflow).toBe('hidden');
        unmount();
        expect(document.body.style.overflow).toBe('');
    });
});
