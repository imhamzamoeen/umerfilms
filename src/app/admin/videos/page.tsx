import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getAllVideos } from '@/lib/videos'
import { VideosListClient } from './VideosListClient'

export default async function AdminVideosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const videos = await getAllVideos()

  return <VideosListClient initialVideos={videos} />
}
