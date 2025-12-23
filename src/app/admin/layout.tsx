import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminLayoutWrapper } from '@/components/admin'

export const metadata: Metadata = {
  title: 'Admin - UmerFilms',
  description: 'Admin panel for managing video content',
  robots: 'noindex, nofollow',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If not logged in at all, the middleware should handle redirect
  // But if they somehow get here without being admin, redirect
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    // Allow login page to render without wrapper
    return <div className="min-h-screen bg-zinc-950">{children}</div>
  }

  return <AdminLayoutWrapper user={user}>{children}</AdminLayoutWrapper>
}
