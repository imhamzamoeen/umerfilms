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
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          'bg-black/80 backdrop-blur-md border-b border-white/10'
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white tracking-tighter transition-colors z-50 hover:text-[#8B5CF6]"
          >
            UmerFilms
          </Link>

          {/* Header Buttons */}
          <div className="flex items-center gap-4 z-50">
            {/* Blog Link - Desktop Only */}
            <Link
              href="/blog"
              className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest mr-2"
            >
              Journal
            </Link>

            {/* Let's Talk Button */}
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-[#8B5CF6] border border-[#8B5CF6] px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-white"
            >
              <span>Let&apos;s Talk</span>
              <span className="bg-white rounded-full w-1.5 h-1.5 group-hover:scale-125 transition-transform" />
            </Link>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-transparent border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span>Menu</span>
              <span className="text-[#8B5CF6] group-hover:text-[#8B5CF6]">•</span>
            </button>
          </div>
        </div>
      </header>

      {/* Off-Canvas Menu */}
      <OffCanvasMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
