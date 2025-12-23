import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAllVideos, createVideo, generateSlug } from '@/lib/videos'
import { setVideoTags } from '@/lib/video-tags'

async function checkAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.email === process.env.ADMIN_EMAIL
}

export async function GET() {
  const isAdmin = await checkAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const videos = await getAllVideos()
  return NextResponse.json(videos)
}

export async function POST(request: NextRequest) {
  const isAdmin = await checkAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { tagIds, ...videoData } = body

  // Generate slug if not provided
  if (!videoData.slug && videoData.title) {
    videoData.slug = await generateSlug(videoData.title)
  }

  const video = await createVideo(videoData)

  if (!video) {
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
  }

  // Set tags if provided
  if (tagIds && tagIds.length > 0) {
    await setVideoTags(video.id, tagIds)
  }

  return NextResponse.json(video, { status: 201 })
}
