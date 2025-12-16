// data/projects.ts

import { Project, Category } from '@/types/project';

const projects: Project[] = [
  {
    id: '1',
    title: 'Brand Launch Campaign',
    slug: 'brand-launch-campaign',
    category: 'Commercial',
    description: 'A dynamic commercial showcasing a new product line with cinematic visuals and compelling narrative.',
    thumbnailUrl: '/videos/thumbnails/commercial-1.jpg',
    videoUrl: '/videos/projects/commercial-1.mp4',
    featured: true,
    order: 1,
    client: 'TechCorp Inc.',
    date: '2024-11',
  },
  {
    id: '2',
    title: 'Indie Artist Music Video',
    slug: 'indie-artist-music-video',
    category: 'Music Video',
    description: 'Creative visual storytelling for an emerging indie artist, blending vibrant colors and emotional depth.',
    thumbnailUrl: '/videos/thumbnails/music-video-1.jpg',
    videoUrl: '/videos/projects/music-video-1.mp4',
    featured: true,
    order: 2,
    client: 'Rising Records',
    date: '2024-10',
  },
  {
    id: '3',
    title: 'Urban Dreams',
    slug: 'urban-dreams',
    category: 'Short Film',
    description: 'A poignant short film exploring connection in modern city life through striking cinematography.',
    thumbnailUrl: '/videos/thumbnails/short-film-1.jpg',
    videoUrl: '/videos/projects/short-film-1.mp4',
    featured: true,
    order: 3,
    date: '2024-09',
  },
  {
    id: '4',
    title: 'Corporate Event Highlights',
    slug: 'corporate-event-highlights',
    category: 'Commercial',
    description: 'Professional coverage of annual corporate summit with dynamic transitions and impactful messaging.',
    thumbnailUrl: '/videos/thumbnails/commercial-2.jpg',
    videoUrl: '/videos/projects/commercial-2.mp4',
    featured: false,
    order: 4,
    client: 'Global Enterprises',
    date: '2024-08',
  },
  {
    id: '5',
    title: 'Destination Wedding',
    slug: 'destination-wedding',
    category: 'Wedding',
    description: 'Romantic wedding film capturing intimate moments against breathtaking coastal landscapes.',
    thumbnailUrl: '/videos/thumbnails/wedding-1.jpg',
    videoUrl: '/videos/projects/wedding-1.mp4',
    featured: false,
    order: 5,
    date: '2024-07',
  },
  {
    id: '6',
    title: 'Creative Experiments',
    slug: 'creative-experiments',
    category: 'Personal',
    description: 'Personal project exploring experimental techniques in color grading and visual effects.',
    thumbnailUrl: '/videos/thumbnails/personal-1.jpg',
    videoUrl: '/videos/projects/personal-1.mp4',
    featured: false,
    order: 6,
    date: '2024-06',
    tags: ['experimental', 'color-grading', 'vfx'],
  },
];

export function getAllProjects(): Project[] {
  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
}

export function getRelatedProjects(currentProjectId: string, category: Category, limit: number = 3): Project[] {
  // Get projects from same category (excluding current), sorted by order
  const sameCategoryProjects = projects
    .filter((p) => p.category === category && p.id !== currentProjectId)
    .sort((a, b) => a.order - b.order);

  // If we have enough from same category, return them
  if (sameCategoryProjects.length >= limit) {
    return sameCategoryProjects.slice(0, limit);
  }

  // Otherwise, supplement with projects from other categories, sorted by order
  const otherProjects = projects
    .filter((p) => p.category !== category && p.id !== currentProjectId)
    .sort((a, b) => a.order - b.order);

  // Combine and limit to specified count (same category first, then others)
  return [...sameCategoryProjects, ...otherProjects].slice(0, limit);
}
