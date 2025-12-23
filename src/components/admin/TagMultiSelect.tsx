'use client'

import { useState, useRef, useEffect } from 'react'
import type { Tag } from '@/types/database'

interface TagMultiSelectProps {
  allTags: Tag[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export function TagMultiSelect({ allTags, selectedIds, onChange }: TagMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedTags = allTags.filter(tag => selectedIds.includes(tag.id))
  const filteredTags = allTags.filter(tag =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTag = (tagId: string) => {
    if (selectedIds.includes(tagId)) {
      onChange(selectedIds.filter(id => id !== tagId))
    } else {
      onChange([...selectedIds, tagId])
    }
  }

  const removeTag = (tagId: string) => {
    onChange(selectedIds.filter(id => id !== tagId))
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected tags */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[42px] cursor-pointer rounded-lg border border-zinc-700 bg-zinc-800 p-2"
      >
        <div className="flex flex-wrap gap-2">
          {selectedTags.length > 0 ? (
            selectedTags.map(tag => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color
                }}
              >
                {tag.name}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTag(tag.id)
                  }}
                  className="ml-1 hover:opacity-70"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))
          ) : (
            <span className="py-1 text-sm text-zinc-500">Select tags...</span>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 shadow-lg">
          {/* Search */}
          <div className="border-b border-zinc-700 p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tags..."
              className="w-full rounded border border-zinc-600 bg-zinc-700 px-3 py-1.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              autoFocus
            />
          </div>

          {/* Tags list */}
          <div className="max-h-48 overflow-y-auto p-2">
            {filteredTags.length > 0 ? (
              <div className="space-y-1">
                {filteredTags.map(tag => {
                  const isSelected = selectedIds.includes(tag.id)
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors ${
                        isSelected
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'text-white hover:bg-zinc-700'
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="flex-1">{tag.name}</span>
                      {isSelected && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-zinc-500">
                {search ? 'No tags found' : 'No tags available'}
              </p>
            )}
          </div>

          {/* Create new tag hint */}
          {allTags.length === 0 && (
            <div className="border-t border-zinc-700 p-2">
              <a
                href="/admin/tags"
                className="block text-center text-sm text-amber-500 hover:text-amber-400"
              >
                Create tags first &rarr;
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
