import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getAllSettings } from '@/lib/settings'
import { SettingsClient } from './SettingsClient'

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const settings = await getAllSettings()

  return <SettingsClient initialSettings={settings} />
}
