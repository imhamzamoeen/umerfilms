// src/components/home/HeroThreeColumn.tsx

import { Biography } from './Biography';
import { SkillsList } from './SkillsList';
import { CircularPortrait } from './CircularPortrait';
import { Statistics } from './Statistics';
import { biography, statistics } from '@/data/about';
import { getPortraitUrl } from '@/lib/settings';

export async function HeroThreeColumn() {
  const portraitUrl = await getPortraitUrl();
  return (
    <section
      className="relative min-h-screen w-full bg-black px-4 lg:px-8 pt-32 pb-16"
      aria-label="Hero introduction"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Name - Spanning full width at top */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="hero-heading">{biography.name}</h1>
        </div>

        {/* Three-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Left Column - Biography, Skills & Connect */}
          <div
            className="order-2 lg:order-1 space-y-8"
            aria-label="Biography and skills"
          >
            <Biography bio={biography.bio} />
            <SkillsList skills={biography.skills} />
            {/* Connect Section */}
            <div>
              <h2 className="text-sm uppercase tracking-widest text-white font-semibold mb-4">Connect</h2>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/umer.films"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@umerfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/umerfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://www.threads.com/@umer.films"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  aria-label="Threads"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.082-1.168 3.576-1.302 1.126-.1 2.158-.043 3.089.17-.029-.752-.138-1.404-.334-1.953-.346-.97-.942-1.643-1.772-2.003-.9-.39-2.024-.467-3.345-.232l-.345-2.063c1.712-.287 3.248-.175 4.564.332 1.26.486 2.192 1.394 2.693 2.622.347.852.524 1.86.561 3.022l.013.397c1.244.624 2.203 1.476 2.794 2.504.758 1.317 1.079 3.016.593 4.77-.626 2.255-2.066 3.964-4.163 4.94-1.632.76-3.573 1.126-5.77 1.087zm-.012-9.76c-1.057.094-1.883.392-2.46.888-.556.478-.78 1.024-.75 1.826.035.619.345 1.12.897 1.45.577.345 1.32.48 2.096.439 1.058-.057 1.9-.46 2.5-1.198.456-.56.764-1.323.917-2.265-.934-.27-1.986-.35-3.2-.14z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Center Column - Circular Portrait */}
          <div
            className="order-1 lg:order-2 flex justify-center"
            aria-label="Profile portrait"
          >
            <CircularPortrait portraitUrl={portraitUrl} />
          </div>

          {/* Right Column - Statistics */}
          <div
            className="order-3 lg:order-3"
            aria-label="Career statistics"
          >
            <Statistics stats={statistics} />
          </div>
        </div>
      </div>
    </section>
  );
}
