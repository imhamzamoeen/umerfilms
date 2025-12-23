'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Video, Tag, VideoCategory } from '@/types/database'
import { VideoUploader } from './VideoUploader'
import { TagMultiSelect } from './TagMultiSelect'

const CATEGORIES: VideoCategory[] = ['Commercial', 'Music Video', 'Wedding', 'Short Film', 'Personal']

interface VideoFormProps {
  video?: Video | null
  allTags: Tag[]
  mode: 'create' | 'edit'
}

export function VideoForm({ video, allTags, mode }: VideoFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState(video?.title || '')
  const [slug, setSlug] = useState(video?.slug || '')
  const [description, setDescription] = useState(video?.description || '')
  const [category, setCategory] = useState<VideoCategory>(video?.category || 'Commercial')
  const [client, setClient] = useState(video?.client || '')
  const [date, setDate] = useState(video?.date || '')
  const [featured, setFeatured] = useState(video?.featured || false)
  const [displayOrder, setDisplayOrder] = useState(video?.display_order || 0)
  const [thumbnailUrl, setThumbnailUrl] = useState(video?.thumbnail_url || '')
  const [videoUrl, setVideoUrl] = useState(video?.video_url || '')
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    video?.tags?.map(t => t.id) || []
  )

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (mode === 'create' && !slug) {
      // Generate slug from title
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setSlug(generatedSlug)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const payload = {
        title,
        slug,
        description: description || null,
        category,
        client: client || null,
        date: date || null,
        featured,
        display_order: displayOrder,
        thumbnail_url: thumbnailUrl || null,
        video_url: videoUrl || null,
        tagIds: selectedTagIds
      }

      const url = mode === 'create' ? '/api/admin/videos' : `/api/admin/videos/${video?.id}`
      const method = mode === 'create' ? 'POST' : 'PATCH'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save video')
      }

      router.push('/admin/videos')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-500">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Title & Slug */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Basic Info</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="video-url-slug"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Used in the URL: /work/{slug || 'video-slug'}
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Describe this video project..."
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Media</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Thumbnail
                </label>
                <VideoUploader
                  type="thumbnail"
                  currentUrl={thumbnailUrl}
                  onUpload={setThumbnailUrl}
                  onRemove={() => setThumbnailUrl('')}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Video File
                </label>
                <VideoUploader
                  type="video"
                  currentUrl={videoUrl}
                  onUpload={setVideoUrl}
                  onRemove={() => setVideoUrl('')}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Tags</h2>
            <TagMultiSelect
              allTags={allTags}
              selectedIds={selectedTagIds}
              onChange={setSelectedTagIds}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category & Details */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Details</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as VideoCategory)}
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Client
                </label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Display Order
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Featured */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-5 w-5 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-900"
              />
              <div>
                <span className="font-medium text-white">Featured Video</span>
                <p className="text-sm text-zinc-500">Show on homepage</p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Video' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
