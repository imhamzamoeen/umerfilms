import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getVideoById, updateVideo, deleteVideo } from '@/lib/videos'
import { setVideoTags } from '@/lib/video-tags'

async function checkAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.email === process.env.ADMIN_EMAIL
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const video = await getVideoById(id)

  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  return NextResponse.json(video)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  // Handle tag updates separately
  const { tagIds, ...videoData } = body

  // Update video data
  const video = await updateVideo(id, videoData)

  if (!video) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
  }

  // Update tags if provided
  if (tagIds !== undefined) {
    await setVideoTags(id, tagIds)
  }

  return NextResponse.json(video)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  // Get video to check for files to delete
  const video = await getVideoById(id)
  if (video) {
    const supabase = await createClient()

    // Delete thumbnail from storage if exists
    if (video.thumbnail_url?.includes('supabase')) {
      const thumbnailPath = video.thumbnail_url.split('/videos/')[1]
      if (thumbnailPath) {
        await supabase.storage.from('videos').remove([thumbnailPath])
      }
    }

    // Delete video file from storage if exists
    if (video.video_url?.includes('supabase')) {
      const videoPath = video.video_url.split('/videos/')[1]
      if (videoPath) {
        await supabase.storage.from('videos').remove([videoPath])
      }
    }
  }

  const success = await deleteVideo(id)

  if (!success) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
