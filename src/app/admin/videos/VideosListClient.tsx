'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Video, VideoCategory } from '@/types/database'
import { DeleteConfirmModal } from '@/components/admin'

const CATEGORIES: VideoCategory[] = ['Commercial', 'Music Video', 'Wedding', 'Short Film', 'Personal']

// Icons
function PlusIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function VideoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
}

interface VideosListClientProps {
  initialVideos: Video[]
}

export function VideosListClient({ initialVideos }: VideosListClientProps) {
  const [videos, setVideos] = useState(initialVideos)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<VideoCategory | 'all'>('all')
  const [deleteTarget, setDeleteTarget] = useState<Video | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState<string | null>(null)

  // Filter videos based on search and category
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.description?.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [videos, searchQuery, categoryFilter])

  const handleToggleFeatured = async (video: Video) => {
    setIsToggling(video.id)
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !video.featured })
      })

      if (res.ok) {
        setVideos(prev => prev.map(v =>
          v.id === video.id ? { ...v, featured: !v.featured } : v
        ))
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error)
    } finally {
      setIsToggling(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/videos/${deleteTarget.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setVideos(prev => prev.filter(v => v.id !== deleteTarget.id))
        setDeleteTarget(null)
      }
    } catch (error) {
      console.error('Failed to delete video:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Videos</h1>
          <p className="mt-1 text-sm text-zinc-500">{videos.length} videos total</p>
        </div>
        <Link
          href="/admin/videos/new"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 hover:shadow-amber-500/30"
        >
          <PlusIcon />
          Add Video
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center text-zinc-500">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-zinc-700/50 bg-zinc-800/50 pl-12 pr-4 text-white placeholder-zinc-500 transition-all focus:border-amber-500/50 focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <div className="relative sm:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as VideoCategory | 'all')}
            className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-4 pr-10 text-white transition-all focus:border-amber-500/50 focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            style={{
              colorScheme: 'dark',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Videos List */}
      {filteredVideos.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur">
          <div className="divide-y divide-zinc-800/50">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group flex items-center gap-4 p-4 transition-all hover:bg-zinc-800/30 sm:gap-5 sm:p-5"
              >
                {/* Thumbnail */}
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="h-16 w-28 shrink-0 rounded-lg object-cover ring-1 ring-white/10 transition-all group-hover:ring-amber-500/30 sm:h-20 sm:w-36"
                  />
                ) : (
                  <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-600 ring-1 ring-white/5 sm:h-20 sm:w-36">
                    <VideoIcon />
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-white group-hover:text-amber-500 transition-colors">{video.title}</h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                    <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs font-medium text-zinc-400">{video.category}</span>
                    {video.client && <span className="text-zinc-600">•</span>}
                    {video.client && <span>{video.client}</span>}
                    {video.date && <span className="text-zinc-600">•</span>}
                    {video.date && <span>{video.date}</span>}
                  </div>
                  {video.tags && video.tags.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {video.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: `${tag.color}15`,
                            color: tag.color,
                            border: `1px solid ${tag.color}30`
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => handleToggleFeatured(video)}
                    disabled={isToggling === video.id}
                    className={`rounded-lg p-2.5 transition-all ${
                      video.featured
                        ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                        : 'text-zinc-500 hover:bg-zinc-700/50 hover:text-white'
                    }`}
                    title={video.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    <StarIcon filled={video.featured} />
                  </button>
                  <Link
                    href={`/admin/videos/${video.id}`}
                    className="rounded-lg p-2.5 text-zinc-500 transition-all hover:bg-zinc-700/50 hover:text-white"
                    title="Edit video"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(video)}
                    className="rounded-lg p-2.5 text-zinc-500 transition-all hover:bg-red-500/10 hover:text-red-500"
                    title="Delete video"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-700/50 bg-zinc-900/30 px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800/50 text-zinc-500 ring-1 ring-zinc-700/50">
            <VideoIcon className="h-8 w-8" />
          </div>
          <h3 className="mt-6 text-lg font-medium text-zinc-300">
            {searchQuery || categoryFilter !== 'all'
              ? 'No videos match your filters'
              : 'No videos yet'}
          </h3>
          <p className="mt-2 text-sm text-zinc-500">
            {searchQuery || categoryFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first video project'}
          </p>
          {!searchQuery && categoryFilter === 'all' && (
            <Link
              href="/admin/videos/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-500 ring-1 ring-amber-500/20 transition-all hover:bg-amber-500/20 hover:ring-amber-500/30"
            >
              <PlusIcon />
              Add your first video
            </Link>
          )}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Video"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={isDeleting}
      />
    </div>
  )
}
