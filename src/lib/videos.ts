import { createClient } from '@/lib/supabase/server'
import type { Video, VideoInsert, VideoUpdate, Tag } from '@/types/database'

export async function getAllVideos(): Promise<Video[]> {
  const supabase = await createClient()

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('display_order', { ascending: true })

  if (error || !videos) {
    console.error('Error fetching videos:', error)
    return []
  }

  // Fetch tags for each video
  const videosWithTags = await Promise.all(
    videos.map(async (video) => {
      const { data: videoTags } = await supabase
        .from('video_tags')
        .select('tag_id')
        .eq('video_id', video.id)

      if (videoTags && videoTags.length > 0) {
        const tagIds = videoTags.map((vt) => vt.tag_id)
        const { data: tags } = await supabase
          .from('tags')
          .select('*')
          .in('id', tagIds)

        return { ...video, tags: tags || [] } as Video
      }

      return { ...video, tags: [] } as Video
    })
  )

  return videosWithTags
}

export async function getVideoBySlug(slug: string): Promise<Video | null> {
  const supabase = await createClient()

  const { data: video, error } = await supabase
    .from('videos')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !video) {
    return null
  }

  // Fetch tags
  const { data: videoTags } = await supabase
    .from('video_tags')
    .select('tag_id')
    .eq('video_id', video.id)

  if (videoTags && videoTags.length > 0) {
    const tagIds = videoTags.map((vt) => vt.tag_id)
    const { data: tags } = await supabase
      .from('tags')
      .select('*')
      .in('id', tagIds)

    return { ...video, tags: tags || [] } as Video
  }

  return { ...video, tags: [] } as Video
}

export async function getVideoById(id: string): Promise<Video | null> {
  const supabase = await createClient()

  const { data: video, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !video) {
    return null
  }

  // Fetch tags
  const { data: videoTags } = await supabase
    .from('video_tags')
    .select('tag_id')
    .eq('video_id', video.id)

  if (videoTags && videoTags.length > 0) {
    const tagIds = videoTags.map((vt) => vt.tag_id)
    const { data: tags } = await supabase
      .from('tags')
      .select('*')
      .in('id', tagIds)

    return { ...video, tags: tags || [] } as Video
  }

  return { ...video, tags: [] } as Video
}

export async function getFeaturedVideos(): Promise<Video[]> {
  const supabase = await createClient()

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .limit(3)

  if (error || !videos) {
    return []
  }

  // If no featured, get first 3
  if (videos.length === 0) {
    const { data: fallbackVideos } = await supabase
      .from('videos')
      .select('*')
      .order('display_order', { ascending: true })
      .limit(3)

    return (fallbackVideos || []) as Video[]
  }

  return videos as Video[]
}

export async function getVideosByCategory(category: string): Promise<Video[]> {
  const supabase = await createClient()

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .eq('category', category)
    .order('display_order', { ascending: true })

  if (error || !videos) {
    return []
  }

  return videos as Video[]
}

export async function getRelatedVideos(
  currentVideoId: string,
  category: string,
  limit: number = 3
): Promise<Video[]> {
  const supabase = await createClient()

  // Get videos from same category first
  const { data: sameCategoryVideos } = await supabase
    .from('videos')
    .select('*')
    .eq('category', category)
    .neq('id', currentVideoId)
    .order('display_order', { ascending: true })
    .limit(limit)

  if (sameCategoryVideos && sameCategoryVideos.length >= limit) {
    return sameCategoryVideos as Video[]
  }

  // Supplement with other videos if needed
  const existingIds = sameCategoryVideos?.map((v) => v.id) || []
  existingIds.push(currentVideoId)

  const remaining = limit - (sameCategoryVideos?.length || 0)

  const { data: otherVideos } = await supabase
    .from('videos')
    .select('*')
    .not('id', 'in', `(${existingIds.join(',')})`)
    .order('display_order', { ascending: true })
    .limit(remaining)

  return [...(sameCategoryVideos || []), ...(otherVideos || [])] as Video[]
}

export async function createVideo(data: VideoInsert): Promise<Video | null> {
  const supabase = await createClient()

  const { data: video, error } = await supabase
    .from('videos')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('Error creating video:', error)
    return null
  }

  return video as Video
}

export async function updateVideo(
  id: string,
  data: VideoUpdate
): Promise<Video | null> {
  const supabase = await createClient()

  const { data: video, error } = await supabase
    .from('videos')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating video:', error)
    return null
  }

  return video as Video
}

export async function deleteVideo(id: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase.from('videos').delete().eq('id', id)

  if (error) {
    console.error('Error deleting video:', error)
    return false
  }

  return true
}

export async function getVideoCount(): Promise<number> {
  const supabase = await createClient()

  const { count, error } = await supabase
    .from('videos')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return 0
  }

  return count || 0
}

export async function getFeaturedCount(): Promise<number> {
  const supabase = await createClient()

  const { count, error } = await supabase
    .from('videos')
    .select('*', { count: 'exact', head: true })
    .eq('featured', true)

  if (error) {
    return 0
  }

  return count || 0
}

export async function getLatestVideos(limit: number = 6): Promise<Video[]> {
  const supabase = await createClient()

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error || !videos) {
    console.error('Error fetching latest videos:', error)
    return []
  }

  // Fetch tags for each video
  const videosWithTags = await Promise.all(
    videos.map(async (video) => {
      const { data: videoTags } = await supabase
        .from('video_tags')
        .select('tag_id')
        .eq('video_id', video.id)

      if (videoTags && videoTags.length > 0) {
        const tagIds = videoTags.map((vt) => vt.tag_id)
        const { data: tags } = await supabase
          .from('tags')
          .select('*')
          .in('id', tagIds)

        return { ...video, tags: tags || [] } as Video
      }

      return { ...video, tags: [] } as Video
    })
  )

  return videosWithTags
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
