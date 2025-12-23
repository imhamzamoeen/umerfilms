import { createClient } from '@/lib/supabase/server'
import type { Tag } from '@/types/database'

export async function getTagsForVideo(videoId: string): Promise<Tag[]> {
  const supabase = await createClient()

  // Get tag IDs for this video
  const { data: videoTags, error: vtError } = await supabase
    .from('video_tags')
    .select('tag_id')
    .eq('video_id', videoId)

  if (vtError || !videoTags || videoTags.length === 0) {
    return []
  }

  const tagIds = videoTags.map((vt) => vt.tag_id)

  // Get the tags
  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .in('id', tagIds)
    .order('name', { ascending: true })

  if (error || !tags) {
    return []
  }

  return tags as Tag[]
}

export async function setVideoTags(
  videoId: string,
  tagIds: string[]
): Promise<boolean> {
  const supabase = await createClient()

  // Delete existing tags for this video
  const { error: deleteError } = await supabase
    .from('video_tags')
    .delete()
    .eq('video_id', videoId)

  if (deleteError) {
    console.error('Error removing existing tags:', deleteError)
    return false
  }

  // If no tags to add, we're done
  if (tagIds.length === 0) {
    return true
  }

  // Insert new tags
  const videoTags = tagIds.map((tagId) => ({
    video_id: videoId,
    tag_id: tagId,
  }))

  const { error: insertError } = await supabase
    .from('video_tags')
    .insert(videoTags)

  if (insertError) {
    console.error('Error adding tags:', insertError)
    return false
  }

  return true
}

export async function addTagToVideo(
  videoId: string,
  tagId: string
): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('video_tags')
    .insert({ video_id: videoId, tag_id: tagId })

  if (error) {
    // Might already exist, which is fine
    if (error.code === '23505') {
      return true
    }
    console.error('Error adding tag to video:', error)
    return false
  }

  return true
}

export async function removeTagFromVideo(
  videoId: string,
  tagId: string
): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('video_tags')
    .delete()
    .eq('video_id', videoId)
    .eq('tag_id', tagId)

  if (error) {
    console.error('Error removing tag from video:', error)
    return false
  }

  return true
}
