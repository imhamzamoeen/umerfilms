'use client';

import { useState, lazy, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = lazy(() => import('./PreLoader').then(module => ({ default: module.PreLoader })));

// Check if preloader was already shown (client-side only)
const checkPreloaderShown = () => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('preloaderShown') === 'true';
};

export const TransitionLayout = ({ children }: { children: React.ReactNode }) => {
    const [showPreloader, setShowPreloader] = useState(() => !checkPreloaderShown());

    const handlePreloaderComplete = useCallback(() => {
        setShowPreloader(false);
        sessionStorage.setItem('preloaderShown', 'true');
    }, []);

    // Content is always rendered and visible for LCP detection
    // Preloader is just an overlay on top
    const contentVariants = {
        initial: { opacity: 1 },
        animate: {
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' }
        }
    } as const;

    return (
        <>
            <AnimatePresence mode="wait">
                {showPreloader && (
                    <PreLoader onComplete={handlePreloaderComplete} />
                )}
            </AnimatePresence>

            <motion.div
                initial="initial"
                animate="animate"
                variants={contentVariants}
                className="min-h-screen"
            >
                {children}
            </motion.div>
        </>
    );
};
