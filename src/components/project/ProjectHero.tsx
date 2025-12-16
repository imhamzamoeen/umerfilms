'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';
import { Project } from '@/types/project';

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-12 md:pb-16">
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-[#D5007F] focus:ring-offset-2 focus:ring-offset-black rounded"
          aria-label="Back to Work page"
        >
          <BsArrowLeft className="text-lg" aria-hidden="true" />
          <span>Back to Work</span>
        </Link>

        {/* Category */}
        <p className="text-sm uppercase tracking-widest text-[#D5007F] font-bold mb-4">
          {project.category}
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl">
          {project.title}
        </h1>
      </div>
    </section>
  );
}
