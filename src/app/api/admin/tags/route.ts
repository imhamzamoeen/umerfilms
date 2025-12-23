import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAllTags, createTag } from '@/lib/tags'

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

  const tags = await getAllTags()
  return NextResponse.json(tags)
}

export async function POST(request: NextRequest) {
  const isAdmin = await checkAuth()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, color } = body

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Tag name is required' }, { status: 400 })
  }

  const tag = await createTag({
    name: name.trim(),
    color: color || '#6b7280'
  })

  if (!tag) {
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
  }

  return NextResponse.json(tag, { status: 201 })
}
