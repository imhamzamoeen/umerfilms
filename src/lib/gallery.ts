import { createClient } from '@/lib/supabase/server'
import type { GalleryItem } from '@/types/database'

export async function getProjectGallery(projectId: string): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery_items')
    .select('file_url')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true })

  if (error || !data) {
    return []
  }

  return data.map((item) => item.file_url)
}

export async function getFullProjectGallery(projectId: string): Promise<GalleryItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true })

  if (error || !data) {
    return []
  }

  return data as GalleryItem[]
}
