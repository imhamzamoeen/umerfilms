import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getVideoById } from '@/lib/videos'
import { getAllTags } from '@/lib/tags'
import { getTagsForVideo } from '@/lib/video-tags'
import { VideoForm } from '@/components/admin'

interface EditVideoPageProps {
  params: Promise<{ id: string }>
}

export default async function EditVideoPage({ params }: EditVideoPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const { id } = await params
  const [video, allTags, videoTags] = await Promise.all([
    getVideoById(id),
    getAllTags(),
    getTagsForVideo(id)
  ])

  if (!video) {
    notFound()
  }

  // Attach tags to video for form
  const videoWithTags = {
    ...video,
    tags: videoTags
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/videos"
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Edit Video</h1>
          <p className="mt-1 text-zinc-400">{video.title}</p>
        </div>
      </div>

      {/* Form */}
      <VideoForm video={videoWithTags} allTags={allTags} mode="edit" />
    </div>
  )
}
