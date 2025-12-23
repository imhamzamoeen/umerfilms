import { createClient } from '@/lib/supabase/server'
import type { Tag, TagInsert, TagUpdate, Video } from '@/types/database'

export async function getAllTags(): Promise<Tag[]> {
  const supabase = await createClient()

  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })

  if (error || !tags) {
    console.error('Error fetching tags:', error)
    return []
  }

  return tags as Tag[]
}

export async function getTagById(id: string): Promise<Tag | null> {
  const supabase = await createClient()

  const { data: tag, error } = await supabase
    .from('tags')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !tag) {
    return null
  }

  return tag as Tag
}

export async function getTagByName(name: string): Promise<Tag | null> {
  const supabase = await createClient()

  const { data: tag, error } = await supabase
    .from('tags')
    .select('*')
    .eq('name', name)
    .single()

  if (error || !tag) {
    return null
  }

  return tag as Tag
}

export async function createTag(data: TagInsert): Promise<Tag | null> {
  const supabase = await createClient()

  const { data: tag, error } = await supabase
    .from('tags')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('Error creating tag:', error)
    return null
  }

  return tag as Tag
}

export async function updateTag(
  id: string,
  data: TagUpdate
): Promise<Tag | null> {
  const supabase = await createClient()

  const { data: tag, error } = await supabase
    .from('tags')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating tag:', error)
    return null
  }

  return tag as Tag
}

export async function deleteTag(id: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase.from('tags').delete().eq('id', id)

  if (error) {
    console.error('Error deleting tag:', error)
    return false
  }

  return true
}

export async function getVideosForTag(tagId: string): Promise<Video[]> {
  const supabase = await createClient()

  // Get video IDs for this tag
  const { data: videoTags, error: vtError } = await supabase
    .from('video_tags')
    .select('video_id')
    .eq('tag_id', tagId)

  if (vtError || !videoTags || videoTags.length === 0) {
    return []
  }

  const videoIds = videoTags.map((vt) => vt.video_id)

  // Get the videos
  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .in('id', videoIds)
    .order('display_order', { ascending: true })

  if (error || !videos) {
    return []
  }

  return videos as Video[]
}

export async function getVideoCountForTag(tagId: string): Promise<number> {
  const supabase = await createClient()

  const { count, error } = await supabase
    .from('video_tags')
    .select('*', { count: 'exact', head: true })
    .eq('tag_id', tagId)

  if (error) {
    return 0
  }

  return count || 0
}

export async function getTagCount(): Promise<number> {
  const supabase = await createClient()

  const { count, error } = await supabase
    .from('tags')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return 0
  }

  return count || 0
}

export async function getTagsWithVideoCount(): Promise<
  (Tag & { video_count: number })[]
> {
  const tags = await getAllTags()

  const tagsWithCount = await Promise.all(
    tags.map(async (tag) => {
      const count = await getVideoCountForTag(tag.id)
      return { ...tag, video_count: count }
    })
  )

  return tagsWithCount
}
