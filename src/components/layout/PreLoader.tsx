'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreLoaderProps {
    onComplete?: () => void;
}

const PRELOADER_KEY = 'preloaderShown';

export const PreLoader = ({ onComplete }: PreLoaderProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const letters = 'LOADING'.split('');

    useEffect(() => {
        // Check if preloader was already shown in this session
        const hasShown = sessionStorage.getItem(PRELOADER_KEY);

        if (hasShown) {
            // Skip animation if already shown
            if (onComplete) onComplete();
            return;
        }

        // Show preloader for first visit in session
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem(PRELOADER_KEY, 'true');
            if (onComplete) onComplete();
        }, 1200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    // If we never set isVisible to true (because it was already shown), 
    // we return null immediately.
    if (!isVisible) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' as const },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' as const },
        },
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
            aria-live="polite"
            aria-label="Loading page content"
        >
            <motion.div className="flex gap-2 sm:gap-4 md:gap-6 overflow-hidden">
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-widest"
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
};
