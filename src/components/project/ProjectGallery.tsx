'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { BsX, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return prev < images.length - 1 ? prev + 1 : prev;
      }
      return prev > 0 ? prev - 1 : prev;
    });
  }, [images.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    },
    [closeLightbox, navigate]
  );

  if (!images || images.length === 0) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  return (
    <>
      {/* Gallery Grid */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-video overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-[#D5007F] focus:ring-offset-2 focus:ring-offset-black"
              aria-label={`View gallery image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image}
                alt={`${projectTitle} gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <FocusTrap active={lightboxOpen}>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              role="dialog"
              aria-modal="true"
              aria-label="Image gallery lightbox"
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/95" />

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
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D5007F] rounded"
                  aria-label="Close lightbox"
                >
                  <BsX className="text-5xl" />
                </button>

                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                  <Image
                    src={images[currentIndex]}
                    alt={`${projectTitle} gallery image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                  />
                </div>

                {/* Counter */}
                <p className="mt-4 text-center text-gray-400">
                  {currentIndex + 1} / {images.length}
                </p>

                {/* Navigation Arrows */}
                {!isFirst && (
                  <button
                    onClick={() => navigate('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#D5007F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D5007F] rounded"
                    aria-label="Previous image"
                  >
                    <BsChevronLeft className="text-5xl" />
                  </button>
                )}

                {!isLast && (
                  <button
                    onClick={() => navigate('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#D5007F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D5007F] rounded"
                    aria-label="Next image"
                  >
                    <BsChevronRight className="text-5xl" />
                  </button>
                )}
              </motion.div>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </>
  );
}
