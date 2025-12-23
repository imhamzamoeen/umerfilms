import { createClient } from '@/lib/supabase/server'

export interface SiteSetting {
  id: string
  key: string
  value: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export async function getSetting(key: string): Promise<string | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error || !data) {
    return null
  }

  return data.value
}

export async function getAllSettings(): Promise<SiteSetting[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('key')

  if (error || !data) {
    return []
  }

  return data as SiteSetting[]
}

export async function updateSetting(
  key: string,
  value: string
): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('site_settings')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)

  if (error) {
    console.error('Error updating setting:', error)
    return false
  }

  return true
}

export async function getPortraitUrl(): Promise<string> {
  const url = await getSetting('portrait_url')
  return url || '/images/portrait.svg'
}
