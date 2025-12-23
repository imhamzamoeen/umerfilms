'use client'

import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { AdminSidebar, MobileSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

interface AdminLayoutWrapperProps {
  user: User
  children: React.ReactNode
}

export function AdminLayoutWrapper({ user, children }: AdminLayoutWrapperProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <AdminHeader user={user} onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
