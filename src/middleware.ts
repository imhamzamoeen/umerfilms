import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow access to login page
  if (pathname === '/admin/login') {
    const { user } = await updateSession(request)

    // If already logged in as admin, redirect to dashboard
    if (user && user.email === process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
  }

  // Protect all other /admin/* routes
  const { supabaseResponse, user } = await updateSession(request)

  // Not authenticated
  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Not the admin
  if (user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}
