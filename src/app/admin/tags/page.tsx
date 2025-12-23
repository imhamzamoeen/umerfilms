import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getTagsWithVideoCount } from '@/lib/tags'
import { TagsListClient } from './TagsListClient'

export default async function AdminTagsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const tags = await getTagsWithVideoCount()

  return <TagsListClient initialTags={tags} />
}
