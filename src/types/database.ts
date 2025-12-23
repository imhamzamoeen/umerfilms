// Video types
export type VideoCategory = 'Commercial' | 'Music Video' | 'Wedding' | 'Short Film' | 'Personal'

export interface Video {
  id: string
  title: string
  slug: string
  description: string | null
  thumbnail_url: string | null
  video_url: string | null
  category: VideoCategory
  client: string | null
  date: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
  tags?: Tag[]
}

export interface VideoInsert {
  title: string
  slug: string
  description?: string
  thumbnail_url?: string
  video_url?: string
  category: VideoCategory
  client?: string
  date?: string
  featured?: boolean
  display_order?: number
}

export interface VideoUpdate {
  title?: string
  slug?: string
  description?: string
  thumbnail_url?: string
  video_url?: string
  category?: VideoCategory
  client?: string
  date?: string
  featured?: boolean
  display_order?: number
}

// Tag types
export interface Tag {
  id: string
  name: string
  color: string
  created_at: string
  updated_at: string
}

export interface TagInsert {
  name: string
  color?: string
}

export interface TagUpdate {
  name?: string
  color?: string
}

// Video-Tag junction
export interface VideoTag {
  video_id: string
  tag_id: string
}

// Gallery types (updated to use video_id)
export interface GalleryItem {
  id: string
  video_id: string
  file_url: string
  file_type: 'image' | 'video'
  title: string | null
  alt_text: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface GalleryItemInsert {
  video_id: string
  file_url: string
  file_type: 'image' | 'video'
  title?: string
  alt_text?: string
  display_order?: number
}

export interface GalleryItemUpdate {
  title?: string
  alt_text?: string
  display_order?: number
}
