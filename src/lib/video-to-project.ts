import type { Video } from '@/types/database'
import type { Project } from '@/types/project'

/**
 * Converts a Video from Supabase to the Project interface
 * used by the existing frontend components.
 */
export function videoToProject(video: Video): Project {
  return {
    id: video.id,
    title: video.title,
    slug: video.slug,
    category: video.category,
    description: video.description || '',
    thumbnailUrl: video.thumbnail_url || '/images/placeholder-video.svg',
    videoUrl: video.video_url || '',
    featured: video.featured,
    order: video.display_order,
    client: video.client || undefined,
    date: video.date || undefined,
    tags: video.tags?.map(t => t.name) || undefined,
  }
}

/**
 * Converts an array of Videos to Projects
 */
export function videosToProjects(videos: Video[]): Project[] {
  return videos.map(videoToProject)
}
