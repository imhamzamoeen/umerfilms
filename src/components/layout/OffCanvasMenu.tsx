'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import FocusTrap from 'focus-trap-react';

interface OffCanvasMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/blog', label: 'Journal' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function OffCanvasMenu({ isOpen, onClose }: OffCanvasMenuProps) {
    // Prevent body scroll when menu open
    useEffect(() => {
        if (isOpen) {
            // Store scroll position to prevent jumping could be added here, 
            // but simple overflow hidden is usually enough for modern browsers
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const menuVariants: Variants = {
        closed: {
            x: '100%',
            transition: { duration: 0.4, ease: 'easeOut' },
        },
        open: {
            x: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    const backdropVariants: Variants = {
        closed: { opacity: 0 },
        open: { opacity: 1 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
                    <div className="fixed inset-0 z-50">
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            variants={backdropVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            onClick={onClose}
                            aria-hidden="true"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            className="absolute inset-y-0 right-0 w-full bg-black md:w-2/3 lg:w-1/2 shadow-2xl"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                        >
                            <nav className="flex h-full flex-col items-center justify-center p-6">
                                <ul className="space-y-8 text-center bg-black">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={onClose}
                                                className="nav-link block text-[clamp(2.5rem,6vw,5rem)] font-bold text-white uppercase tracking-wider relative transition-all duration-300 hover:text-transparent hover:bg-gradient-to-r hover:from-[#450E93] hover:to-[#D5007F] hover:bg-clip-text group"
                                            >
                                                {link.label}
                                                <span className="absolute bottom-[-0.5rem] left-0 w-0 h-[3px] bg-gradient-to-r from-[#450E93] to-[#D5007F] transition-[width] duration-300 group-hover:w-full"></span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 text-white text-4xl p-2 hover:text-[#D5007F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D5007F] rounded-full"
                                aria-label="Close menu"
                            >
                                ×
                            </button>
                        </motion.div>
                    </div>
                </FocusTrap>
            )}
        </AnimatePresence>
    );
}
