'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface ProfilePictureCardProps {
  currentUrl: string
}

export function ProfilePictureCard({ currentUrl }: ProfilePictureCardProps) {
  const router = useRouter()
  const [portraitUrl, setPortraitUrl] = useState(currentUrl)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setIsUploading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      // Generate unique filename
      const timestamp = Date.now()
      const ext = file.name.split('.').pop()
      const filename = `portraits/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`

      // Upload file
      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(data.path)

      // Update the setting via API
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'portrait_url', value: publicUrl })
      })

      if (!response.ok) {
        throw new Error('Failed to update setting')
      }

      setPortraitUrl(publicUrl)
      setSuccess('Profile picture updated!')
      router.refresh()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-start gap-6">
        {/* Portrait Preview */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-700">
            <img
              src={portraitUrl}
              alt="Profile portrait"
              className="w-full h-full object-cover"
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            </div>
          )}
        </div>

        {/* Info and Actions */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white">Homepage Portrait</h3>
          <p className="text-sm text-zinc-500 mt-1">
            This image appears in the hero section of your homepage.
          </p>

          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}

          {success && (
            <p className="text-sm text-green-400 mt-2">{success}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400 disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isUploading ? 'Uploading...' : 'Change Photo'}
            </button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  )
}
