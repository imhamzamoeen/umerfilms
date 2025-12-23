'use client'

import { useState } from 'react'
import type { Tag } from '@/types/database'
import { DeleteConfirmModal } from '@/components/admin'
import { ColorPicker } from '@/components/admin/ColorPicker'

interface TagWithCount extends Tag {
  video_count: number
}

// Icons
function PlusIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
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

function TagIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  )
}

interface TagsListClientProps {
  initialTags: TagWithCount[]
}

export function TagsListClient({ initialTags }: TagsListClientProps) {
  const [tags, setTags] = useState<TagWithCount[]>(initialTags)
  const [isCreating, setIsCreating] = useState(false)
  const [editingTag, setEditingTag] = useState<TagWithCount | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TagWithCount | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [color, setColor] = useState('#6b7280')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetForm = () => {
    setName('')
    setColor('#6b7280')
    setError(null)
    setIsCreating(false)
    setEditingTag(null)
  }

  const handleStartEdit = (tag: TagWithCount) => {
    setEditingTag(tag)
    setName(tag.name)
    setColor(tag.color)
    setIsCreating(false)
    setError(null)
  }

  const handleStartCreate = () => {
    setIsCreating(true)
    setEditingTag(null)
    setName('')
    setColor('#6b7280')
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Tag name is required')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      if (editingTag) {
        // Update existing tag
        const res = await fetch(`/api/admin/tags/${editingTag.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, color })
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to update tag')
        }

        const updatedTag = await res.json()
        setTags(prev => prev.map(t =>
          t.id === editingTag.id ? { ...updatedTag, video_count: t.video_count } : t
        ))
      } else {
        // Create new tag
        const res = await fetch('/api/admin/tags', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, color })
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to create tag')
        }

        const newTag = await res.json()
        setTags(prev => [...prev, { ...newTag, video_count: 0 }])
      }

      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/tags/${deleteTarget.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setTags(prev => prev.filter(t => t.id !== deleteTarget.id))
        setDeleteTarget(null)
      }
    } catch (error) {
      console.error('Failed to delete tag:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Tags</h1>
          <p className="mt-1 text-zinc-400">{tags.length} tags total</p>
        </div>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400"
        >
          <PlusIcon />
          Add Tag
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isCreating || editingTag) && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            {editingTag ? 'Edit Tag' : 'Create New Tag'}
          </h2>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Tag name"
                  autoFocus
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-400">
                  Color
                </label>
                <ColorPicker value={color} onChange={setColor} />
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-400">
                Preview
              </label>
              <span
                className="inline-flex rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  backgroundColor: `${color}20`,
                  color: color
                }}
              >
                {name || 'Tag name'}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : editingTag ? 'Update Tag' : 'Create Tag'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tags List */}
      {tags.length > 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="divide-y divide-zinc-800">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-zinc-800/50"
              >
                {/* Color indicator */}
                <div
                  className="h-10 w-10 rounded-lg"
                  style={{ backgroundColor: tag.color }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white">{tag.name}</h3>
                  <p className="text-sm text-zinc-500">
                    {tag.video_count} video{tag.video_count !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Tag preview */}
                <span
                  className="hidden rounded-full px-3 py-1 text-sm font-medium sm:inline-flex"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color
                  }}
                >
                  {tag.name}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(tag)}
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                    title="Edit tag"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(tag)}
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
                    title="Delete tag"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !isCreating && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500">
            <TagIcon />
          </div>
          <p className="mt-4 text-zinc-400">No tags yet</p>
          <button
            onClick={handleStartCreate}
            className="mt-4 inline-flex items-center gap-2 text-amber-500 hover:text-amber-400"
          >
            <PlusIcon />
            Create your first tag
          </button>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Tag"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? ${
          deleteTarget && deleteTarget.video_count > 0
            ? `This tag is assigned to ${deleteTarget.video_count} video${deleteTarget.video_count !== 1 ? 's' : ''}.`
            : ''
        } This action cannot be undone.`}
        loading={isDeleting}
      />
    </div>
  )
}
