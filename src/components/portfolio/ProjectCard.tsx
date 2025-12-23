// src/components/portfolio/ProjectCard.tsx
'use client';

import { forwardRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';
import { VideoPlayer } from '@/components/video';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  showPreview?: boolean;
  className?: string;
}

const PLACEHOLDER_IMAGE = '/images/placeholder-video.svg';

// Sound icon components
function SoundOnIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
  );
}

export const ProjectCard = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  ({ project, priority = false, showPreview = true, className }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const handleSoundToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsMuted(!isMuted);
    };

    return (
      <Link
        ref={ref}
        href={`/work/${project.slug}`}
        className={cn(
          'group block relative overflow-hidden rounded-lg',
          'transition-transform duration-300 hover:scale-105',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`${project.title} - ${project.category}`}
      >
        {/* Aspect ratio container */}
        <div className="aspect-video relative bg-gray-800">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}

          {/* Thumbnail image */}
          <Image
            src={imageError ? PLACEHOLDER_IMAGE : (project.thumbnailUrl || PLACEHOLDER_IMAGE)}
            alt={project.title}
            fill
            className="object-cover"
            priority={priority}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          {/* Hover video preview (desktop only) */}
          {showPreview && isHovered && (
            <div className="hidden md:block absolute inset-0 z-10">
              <VideoPlayer
                src={project.videoUrl}
                autoplay
                muted={isMuted}
                loop
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Sound toggle button (visible on hover) */}
          {showPreview && isHovered && (
            <button
              type="button"
              onClick={handleSoundToggle}
              className="hidden md:flex absolute bottom-4 right-4 z-20 items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
            </button>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Card content */}
        <div className="p-4 bg-surface">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-amber-600 transition-colors">
              {project.title}
            </h3>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              {project.category}
            </span>
          </div>
        </div>
      </Link>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';
