'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { AnalyticsData } from '@/types/analytics'

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

function ChartIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function TrendingUpIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
}

export function AnalyticsPreview() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics?period=7d')
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Site Analytics</h2>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-zinc-800 rounded-lg" />
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <ChartIcon />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Site Analytics</h2>
            <p className="text-sm text-zinc-500">Last 7 days</p>
          </div>
        </div>
        <Link
          href="/admin/analytics"
          className="text-sm text-amber-500 hover:text-amber-400"
        >
          View details &rarr;
        </Link>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-zinc-800/50 p-4">
            <p className="text-sm text-zinc-400">Visitors</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {formatNumber(data.visitors)}
              </span>
              <span className="flex items-center text-xs text-green-500">
                <TrendingUpIcon />
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800/50 p-4">
            <p className="text-sm text-zinc-400">Page Views</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {formatNumber(data.pageViews)}
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800/50 p-4">
            <p className="text-sm text-zinc-400">Bounce Rate</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {data.bounceRate}%
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800/50 p-4">
            <p className="text-sm text-zinc-400">Top Page</p>
            <div className="mt-1">
              <span className="text-lg font-bold text-white truncate block">
                {data.topPages[0]?.path || '/'}
              </span>
            </div>
          </div>
        </div>

        {/* Mini Chart Preview */}
        <div className="mt-4 flex h-16 items-end gap-1">
          {data.timeSeries.slice(-14).map((point, index) => {
            const maxVisitors = Math.max(...data.timeSeries.map(p => p.visitors))
            const height = maxVisitors > 0 ? (point.visitors / maxVisitors) * 100 : 0

            return (
              <div
                key={index}
                className="flex-1 rounded-t bg-gradient-to-t from-amber-500/50 to-amber-500"
                style={{ height: `${Math.max(height, 5)}%` }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
