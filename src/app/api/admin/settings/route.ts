import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAllSettings, updateSetting } from '@/lib/settings'

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

  const settings = await getAllSettings()
  return NextResponse.json(settings)
}

export async function PUT(request: NextRequest) {
  const isAdmin = await checkAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { key, value } = body

  if (!key?.trim()) {
    return NextResponse.json({ error: 'Setting key is required' }, { status: 400 })
  }

  const success = await updateSetting(key, value)

  if (!success) {
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
