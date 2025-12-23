'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { SiteSetting } from '@/lib/settings'

interface SettingsClientProps {
  initialSettings: SiteSetting[]
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSetting[]>(initialSettings)
  const [saving, setSaving] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const portraitSetting = settings.find(s => s.key === 'portrait_url')
  const portraitUrl = portraitSetting?.value || '/images/portrait.svg'

  const handleUpdate = async (key: string, value: string) => {
    setSaving(key)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      })

      if (response.ok) {
        setSettings((prev) =>
          prev.map((s) => (s.key === key ? { ...s, value } : s))
        )
      }
    } catch (error) {
      console.error('Failed to update setting:', error)
    } finally {
      setSaving(null)
    }
  }

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

      const timestamp = Date.now()
      const ext = file.name.split('.').pop()
      const filename = `portraits/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`

      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(data.path)

      await handleUpdate('portrait_url', publicUrl)
      setSuccess('Portrait updated successfully!')
      router.refresh()

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
    <div className="min-h-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your website configuration</p>
      </div>

      {/* Centered Content Container */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Notifications */}
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* Portrait Section */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="text-base font-semibold text-white">Homepage Portrait</h2>
            <p className="text-sm text-zinc-500 mt-0.5">
              Appears in the circular portrait on your homepage hero section
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Portrait Preview */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-zinc-800 shadow-2xl">
                  <img
                    src={portraitUrl}
                    alt="Profile portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                  </div>
                )}
              </div>

              {/* Upload Info & Button */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-sm font-medium text-white mb-2">Upload a new photo</h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Square image recommended (min 500x500px)<br />
                  PNG, JPG, or WebP up to 10MB
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <button
                    onClick={() => inputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-all hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {isUploading ? 'Uploading...' : 'Upload Photo'}
                  </button>

                  {portraitUrl !== '/images/portrait.svg' && (
                    <button
                      onClick={() => handleUpdate('portrait_url', '/images/portrait.svg')}
                      disabled={isUploading || saving === 'portrait_url'}
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white hover:border-zinc-600 disabled:opacity-50"
                    >
                      Reset to Default
                    </button>
                  )}
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
        </div>

        {/* Other Settings */}
        {settings.filter(s => s.key !== 'portrait_url').length > 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-base font-semibold text-white">Other Settings</h2>
            </div>
            <div className="divide-y divide-zinc-800">
              {settings.filter(s => s.key !== 'portrait_url').map((setting) => (
                <div key={setting.id} className="p-6">
                  <label className="block mb-3">
                    <span className="text-sm font-medium text-zinc-300 capitalize">
                      {setting.key.replace(/_/g, ' ')}
                    </span>
                    {setting.description && (
                      <p className="text-xs text-zinc-500 mt-1">{setting.description}</p>
                    )}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      defaultValue={setting.value || ''}
                      onBlur={(e) => {
                        if (e.target.value !== setting.value) {
                          handleUpdate(setting.key, e.target.value)
                        }
                      }}
                      className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                    />
                    {saving === setting.key && (
                      <span className="text-amber-500 text-sm self-center animate-pulse">Saving...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {settings.length === 0 && (
          <div className="text-center py-16 text-zinc-500 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <svg className="w-12 h-12 mx-auto mb-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm">No settings configured yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
