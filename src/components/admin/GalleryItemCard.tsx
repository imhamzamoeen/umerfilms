'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/types/database'

interface GalleryItemCardProps {
  item: GalleryItem
  onUpdate: (id: string, updates: { title?: string; alt_text?: string }) => Promise<void>
  onDelete: (id: string, fileUrl: string) => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}

export function GalleryItemCard({
  item,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: GalleryItemCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title || '')
  const [altText, setAltText] = useState(item.alt_text || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onUpdate(item.id, { title, alt_text: altText })
    setSaving(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(item.title || '')
    setAltText(item.alt_text || '')
    setIsEditing(false)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      <div className="relative aspect-video">
        {item.file_type === 'video' ? (
          <video
            src={item.file_url}
            className="h-full w-full object-cover"
            muted
            playsInline
          />
        ) : (
          <Image
            src={item.file_url}
            alt={item.alt_text || 'Gallery item'}
            fill
            className="object-cover"
          />
        )}

        <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="rounded bg-black/70 p-1.5 text-white transition-colors hover:bg-black disabled:opacity-30"
            title="Move up"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="rounded bg-black/70 p-1.5 text-white transition-colors hover:bg-black disabled:opacity-30"
            title="Move down"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute left-2 top-2">
          <span className="rounded bg-black/70 px-2 py-1 text-xs uppercase text-white">
            {item.file_type}
          </span>
        </div>
      </div>

      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-500">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500">Alt Text</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="mt-1 w-full rounded bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Describe the image..."
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 rounded bg-amber-500 px-3 py-1.5 text-sm font-medium text-black hover:bg-amber-400 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex-1 rounded bg-zinc-700 px-3 py-1.5 text-sm text-white hover:bg-zinc-600 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-[40px]">
              <p className="font-medium text-white">
                {item.title || <span className="italic text-zinc-500">No title</span>}
              </p>
              {item.alt_text && (
                <p className="mt-1 text-sm text-zinc-500 line-clamp-1">{item.alt_text}</p>
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 rounded bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id, item.file_url)}
                className="rounded bg-zinc-800 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/30"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
