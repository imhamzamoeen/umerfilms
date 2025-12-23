import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getVideoById } from '@/lib/videos'
import { GalleryManager } from '@/components/admin'
import type { GalleryItem } from '@/types/database'

interface PageProps {
  params: Promise<{ projectId: string }>
}

export default async function GalleryManagementPage({ params }: PageProps) {
  const { projectId: videoId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const video = await getVideoById(videoId)

  if (!video) {
    notFound()
  }

  const { data: galleryItems } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('video_id', videoId)
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/admin/videos/${videoId}`}
          className="text-sm text-zinc-500 hover:text-white"
        >
          &larr; Back to Video
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{video.title}</h1>
        <p className="mt-1 text-zinc-400">{video.category} &middot; Manage gallery content</p>
      </div>

      <GalleryManager
        videoId={videoId}
        videoTitle={video.title}
        initialItems={(galleryItems as GalleryItem[]) || []}
      />
    </div>
  )
}
