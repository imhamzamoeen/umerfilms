'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { GalleryUploader } from './GalleryUploader'
import { GalleryItemCard } from './GalleryItemCard'
import { DeleteConfirmModal } from './DeleteConfirmModal'
import type { GalleryItem } from '@/types/database'

interface GalleryManagerProps {
  videoId: string
  videoTitle: string
  initialItems: GalleryItem[]
}

export function GalleryManager({
  videoId,
  videoTitle,
  initialItems,
}: GalleryManagerProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; fileUrl: string } | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchItems = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('video_id', videoId)
      .order('display_order', { ascending: true })

    if (data) {
      setItems(data as GalleryItem[])
    }
  }, [videoId])

  const handleUpdate = async (id: string, updates: { title?: string; alt_text?: string }) => {
    const supabase = createClient()
    await supabase
      .from('gallery_items')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  const handleDelete = async () => {
    if (!deleteTarget) return

    setDeleting(true)
    const supabase = createClient()

    const urlParts = deleteTarget.fileUrl.split('/gallery/')
    if (urlParts.length === 2) {
      await supabase.storage.from('gallery').remove([urlParts[1]])
    }

    await supabase.from('gallery_items').delete().eq('id', deleteTarget.id)

    setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id))
    setDeleteTarget(null)
    setDeleting(false)
  }

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= items.length) return

    const newItems = [...items]
    const [movedItem] = newItems.splice(index, 1)
    newItems.splice(newIndex, 0, movedItem)

    const updatedItems = newItems.map((item, i) => ({
      ...item,
      display_order: i,
    }))

    setItems(updatedItems)

    const supabase = createClient()
    await Promise.all(
      updatedItems.map((item) =>
        supabase
          .from('gallery_items')
          .update({ display_order: item.display_order })
          .eq('id', item.id)
      )
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-white">Upload New Media</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Add images and videos to {videoTitle}&apos;s gallery
        </p>
        <div className="mt-4">
          <GalleryUploader videoId={videoId} onUploadComplete={fetchItems} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Gallery Items ({items.length})
        </h2>
        {items.length === 0 ? (
          <p className="mt-4 text-center text-zinc-500">
            No gallery items yet. Upload some files above!
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <GalleryItemCard
                key={item.id}
                item={item}
                onUpdate={handleUpdate}
                onDelete={(id, fileUrl) => setDeleteTarget({ id, fileUrl })}
                onMoveUp={() => handleReorder(index, 'up')}
                onMoveDown={() => handleReorder(index, 'down')}
                isFirst={index === 0}
                isLast={index === items.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Gallery Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
