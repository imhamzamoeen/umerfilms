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

export const ProjectCard = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  ({ project, priority = false, showPreview = true, className }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

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
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority={priority}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Hover video preview (desktop only) */}
          {showPreview && isHovered && (
            <div className="hidden md:block absolute inset-0 z-10">
              <VideoPlayer
                src={project.videoUrl}
                autoplay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
