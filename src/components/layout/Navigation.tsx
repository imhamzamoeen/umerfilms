'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import OffCanvasMenu from './OffCanvasMenu';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'bg-background/0 backdrop-blur-none'
          // Note: Changed to transparent to let the hero section show through, 
          // or we can keep it consistent. The story said "bg-black/90".
          // Let's stick to the story's suggestion for the header background
          // or keep it minimal. The story says: "bg-black/90 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white transition-colors z-50 mix-blend-difference"
          >
            UmerFilms
          </Link>

          {/* Header Buttons */}
          <div className="flex items-center gap-3 z-50">
            {/* Let's Talk Button */}
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-transparent border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              <span>Let&apos;s Talk</span>
              <span className="text-[#D5007F] group-hover:text-[#D5007F]">•</span>
            </Link>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-black hover:text-white"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span>Menu</span>
              <span className="text-[#D5007F] group-hover:text-[#D5007F]">•</span>
            </button>
          </div>
        </div>
      </header>

      {/* Off-Canvas Menu */}
      <OffCanvasMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
