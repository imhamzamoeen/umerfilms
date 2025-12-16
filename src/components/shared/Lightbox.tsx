'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import FocusTrap from 'focus-trap-react';
import { BsX, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Project } from '@/types/project';

interface LightboxProps {
  isOpen: boolean;
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function Lightbox({
  isOpen,
  project,
  projects,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Store the trigger element when lightbox opens
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Return focus to trigger on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  // Set initial focus on close button when opened
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      // Small delay to ensure animation has started
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onNavigate('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNavigate('next');
          break;
      }
    },
    [isOpen, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === projects.length - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap active={isOpen}>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <motion.div
              className="relative z-10 max-w-7xl w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="Close lightbox"
              >
                <BsX className="text-5xl" />
              </button>

              {/* Image */}
              <motion.div
                className="relative aspect-video w-full overflow-hidden rounded-lg bg-black"
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </motion.div>

              {/* Caption */}
              <div className="mt-6 text-center">
                <h2
                  id="lightbox-title"
                  className="text-3xl font-bold text-white"
                >
                  {project.title}
                </h2>
                <p className="mt-2 text-lg text-[#D5007F] font-semibold">
                  {project.category}
                </p>
                {project.description && (
                  <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
                    {project.description}
                  </p>
                )}
              </div>

              {/* Navigation Arrows */}
              {!isFirst && (
                <button
                  onClick={() => onNavigate('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#D5007F] transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
                  aria-label="Previous project"
                >
                  <BsChevronLeft className="text-5xl" />
                </button>
              )}

              {!isLast && (
                <button
                  onClick={() => onNavigate('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#D5007F] transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
                  aria-label="Next project"
                >
                  <BsChevronRight className="text-5xl" />
                </button>
              )}
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
