'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface VideoUploaderProps {
  type: 'thumbnail' | 'video'
  currentUrl?: string | null
  onUpload: (url: string) => void
  onRemove?: () => void
}

function UploadIcon() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

export function VideoUploader({ type, currentUrl, onUpload, onRemove }: VideoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isThumbnail = type === 'thumbnail'
  const accept = isThumbnail ? 'image/*' : 'video/*'
  const maxSize = isThumbnail ? 10 * 1024 * 1024 : 500 * 1024 * 1024 // 10MB for images, 500MB for videos

  const handleFile = async (file: File) => {
    if (!file) return

    // Validate file type
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')

    if (isThumbnail && !isImage) {
      setError('Please upload an image file')
      return
    }

    if (!isThumbnail && !isVideo) {
      setError('Please upload a video file')
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${isThumbnail ? '10MB' : '500MB'}`)
      return
    }

    setIsUploading(true)
    setError(null)
    setProgress(0)

    try {
      const supabase = createClient()

      // Generate unique filename
      const timestamp = Date.now()
      const ext = file.name.split('.').pop()
      const folder = isThumbnail ? 'thumbnails' : 'videos'
      const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`

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

      onUpload(publicUrl)
      setProgress(100)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload file. Please try again.')
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleRemove = async () => {
    if (!currentUrl || !onRemove) return

    // Try to delete from storage
    try {
      const supabase = createClient()
      const path = currentUrl.split('/videos/')[1]
      if (path) {
        await supabase.storage.from('videos').remove([path])
      }
    } catch (err) {
      console.error('Error removing file:', err)
    }

    onRemove()
  }

  // Show preview if we have a current URL
  if (currentUrl) {
    return (
      <div className="space-y-2">
        <div className="relative overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800">
          {isThumbnail ? (
            <img
              src={currentUrl}
              alt="Thumbnail preview"
              className="h-48 w-full object-cover"
            />
          ) : (
            <video
              src={currentUrl}
              className="h-48 w-full object-cover"
              controls
            />
          )}
          {onRemove && (
            <button
              onClick={handleRemove}
              className="absolute right-2 top-2 rounded-lg bg-red-500/80 p-2 text-white transition-colors hover:bg-red-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="text-sm text-amber-500 hover:text-amber-400"
        >
          Replace {isThumbnail ? 'thumbnail' : 'video'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
          dragActive
            ? 'border-amber-500 bg-amber-500/10'
            : 'border-zinc-700 hover:border-zinc-600'
        } ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {isUploading ? (
          <>
            <div className="mb-2 h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            <p className="text-sm text-zinc-400">Uploading...</p>
            {progress > 0 && (
              <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-zinc-700">
                <div
                  className="h-full bg-amber-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-2 text-zinc-500">
              {isThumbnail ? <ImageIcon /> : <VideoIcon />}
            </div>
            <p className="text-sm text-zinc-400">
              Drag and drop or click to upload
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {isThumbnail
                ? 'PNG, JPG, WebP up to 10MB'
                : 'MP4, MOV, WebM up to 500MB'}
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  )
}
