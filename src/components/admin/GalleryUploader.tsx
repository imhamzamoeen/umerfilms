'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createClient } from '@/lib/supabase/client'
import type { GalleryItemInsert } from '@/types/database'

interface GalleryUploaderProps {
  videoId: string
  onUploadComplete: () => void
}

interface UploadProgress {
  file: string
  progress: number
  status: 'uploading' | 'complete' | 'error'
  error?: string
}

export function GalleryUploader({ videoId, onUploadComplete }: GalleryUploaderProps) {
  const [uploads, setUploads] = useState<UploadProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = async (file: File): Promise<void> => {
    const supabase = createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${videoId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const fileType = file.type.startsWith('video/') ? 'video' : 'image'

    setUploads((prev) => [
      ...prev,
      { file: file.name, progress: 0, status: 'uploading' },
    ])

    try {
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName)

      const { data: existingItems } = await supabase
        .from('gallery_items')
        .select('display_order')
        .eq('video_id', videoId)
        .order('display_order', { ascending: false })
        .limit(1)

      const nextOrder = (existingItems?.[0]?.display_order ?? -1) + 1

      const newItem: GalleryItemInsert = {
        video_id: videoId,
        file_url: publicUrl,
        file_type: fileType,
        display_order: nextOrder,
      }

      const { error: dbError } = await supabase
        .from('gallery_items')
        .insert(newItem)

      if (dbError) throw dbError

      setUploads((prev) =>
        prev.map((u) =>
          u.file === file.name ? { ...u, progress: 100, status: 'complete' } : u
        )
      )
    } catch (error) {
      setUploads((prev) =>
        prev.map((u) =>
          u.file === file.name
            ? { ...u, status: 'error', error: (error as Error).message }
            : u
        )
      )
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true)
      setUploads([])

      await Promise.all(acceptedFiles.map(uploadFile))

      setIsUploading(false)
      onUploadComplete()

      setTimeout(() => setUploads([]), 3000)
    },
    [videoId, onUploadComplete]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.mov'],
    },
    disabled: isUploading,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? 'border-amber-500 bg-amber-500/10'
            : 'border-zinc-700 hover:border-zinc-600'
        } ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="text-zinc-400">
          {isDragActive ? (
            <p>Drop files here...</p>
          ) : (
            <>
              <p className="text-lg">Drag & drop files here</p>
              <p className="mt-1 text-sm text-zinc-500">
                or click to select files (images & videos)
              </p>
            </>
          )}
        </div>
      </div>

      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((upload) => (
            <div
              key={upload.file}
              className="flex items-center justify-between rounded-lg bg-zinc-800 px-4 py-2"
            >
              <span className="truncate text-sm text-zinc-300">{upload.file}</span>
              <span
                className={`text-sm ${
                  upload.status === 'complete'
                    ? 'text-green-400'
                    : upload.status === 'error'
                    ? 'text-red-400'
                    : 'text-amber-400'
                }`}
              >
                {upload.status === 'complete'
                  ? 'Done'
                  : upload.status === 'error'
                  ? upload.error
                  : 'Uploading...'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
