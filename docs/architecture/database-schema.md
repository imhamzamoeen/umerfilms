# Database Schema

**N/A for MVP** - Project data is stored in static TypeScript/JSON files.

## Static Data File Structure

```typescript
// data/projects.ts

import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Brand Campaign - Nike',
    slug: 'nike-brand-campaign',
    category: 'Commercial',
    description: 'High-energy commercial showcasing athletic performance...',
    thumbnailUrl: '/videos/thumbnails/nike-thumb.jpg',
    videoUrl: '/videos/projects/nike-campaign.mp4',
    featured: true,
    order: 1,
  },
  // ... more projects
];

// Helper functions
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured).sort((a, b) => a.order - b.order);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return getAllProjects();
  return projects.filter(p => p.category === category);
}

export function getAllCategories(): string[] {
  return ['All', ...new Set(projects.map(p => p.category))];
}
```

---
