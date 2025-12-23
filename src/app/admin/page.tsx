import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getVideoCount, getFeaturedCount, getAllVideos } from '@/lib/videos'
import { getTagCount } from '@/lib/tags'
import { StatsCard, AnalyticsPreview } from '@/components/admin'

// Icons
function VideoIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  // Fetch stats
  const [videoCount, featuredCount, tagCount, recentVideos] = await Promise.all([
    getVideoCount(),
    getFeaturedCount(),
    getTagCount(),
    getAllVideos().then(videos => videos.slice(0, 5))
  ])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-zinc-400">Manage your videos and tags</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/videos/new"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400"
          >
            <PlusIcon />
            Add Video
          </Link>
          <Link
            href="/admin/tags"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            <TagIcon />
            Manage Tags
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Videos"
          value={videoCount}
          icon={<VideoIcon />}
          href="/admin/videos"
          description="All uploaded videos"
        />
        <StatsCard
          title="Featured Videos"
          value={featuredCount}
          icon={<StarIcon />}
          href="/admin/videos"
          description="Displayed on homepage"
        />
        <StatsCard
          title="Tags"
          value={tagCount}
          icon={<TagIcon />}
          href="/admin/tags"
          description="Video categories"
        />
      </div>

      {/* Analytics Preview */}
      <AnalyticsPreview />

      {/* Recent Videos */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Recent Videos</h2>
          <Link
            href="/admin/videos"
            className="text-sm text-amber-500 hover:text-amber-400"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="divide-y divide-zinc-800">
          {recentVideos.length > 0 ? (
            recentVideos.map((video) => (
              <Link
                key={video.id}
                href={`/admin/videos/${video.id}`}
                className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-800"
              >
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="h-12 w-20 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-20 items-center justify-center rounded bg-zinc-800">
                    <VideoIcon />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-medium text-white">{video.title}</h3>
                  <p className="text-sm text-zinc-500">{video.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  {video.featured && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-500">
                      Featured
                    </span>
                  )}
                  <span className="text-sm text-zinc-500">
                    {video.date || 'No date'}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <VideoIcon />
              <p className="mt-4 text-zinc-400">No videos yet</p>
              <Link
                href="/admin/videos/new"
                className="mt-4 inline-flex items-center gap-2 text-amber-500 hover:text-amber-400"
              >
                <PlusIcon />
                Add your first video
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/videos/new"
          className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-amber-500/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-black">
            <PlusIcon />
          </div>
          <div>
            <h3 className="font-medium text-white">Upload Video</h3>
            <p className="text-sm text-zinc-500">Add a new video to your portfolio</p>
          </div>
        </Link>
        <Link
          href="/admin/tags"
          className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-amber-500/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-black">
            <TagIcon />
          </div>
          <div>
            <h3 className="font-medium text-white">Create Tag</h3>
            <p className="text-sm text-zinc-500">Organize videos with custom tags</p>
          </div>
        </Link>
        <Link
          href="/work"
          target="_blank"
          className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-amber-500/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-black">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-white">View Portfolio</h3>
            <p className="text-sm text-zinc-500">See your public work page</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
