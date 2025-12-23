import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type {
  AnalyticsData,
  AnalyticsPeriod,
  AnalyticsTimeSeriesPoint,
  AnalyticsPageData,
  AnalyticsReferrerData,
  AnalyticsCountryData,
  AnalyticsDeviceData
} from '@/types/analytics'

const VERCEL_API_BASE = 'https://api.vercel.com'

function getPeriodDates(period: AnalyticsPeriod): { from: string; to: string } {
  const now = new Date()
  const to = now.toISOString()

  let from: Date
  switch (period) {
    case '24h':
      from = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      break
    case '7d':
      from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case '30d':
      from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    case '90d':
      from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      break
    default:
      from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  }

  return { from: from.toISOString(), to }
}

async function fetchVercelAnalytics(
  endpoint: string,
  projectId: string,
  token: string,
  params: Record<string, string> = {}
): Promise<Response> {
  const url = new URL(`${VERCEL_API_BASE}/v1/web/insights/${projectId}/${endpoint}`)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    next: { revalidate: 60 } // Cache for 60 seconds
  })
}

export async function GET(request: NextRequest) {
  // Auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const period = (searchParams.get('period') || '7d') as AnalyticsPeriod

  const token = process.env.VERCEL_API_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID

  if (!token || !projectId) {
    // Return mock data if Vercel API is not configured
    return NextResponse.json(getMockAnalyticsData(period))
  }

  try {
    const { from, to } = getPeriodDates(period)
    const commonParams = { from, to }

    // Fetch all data in parallel
    const [
      statsRes,
      timeseriesRes,
      pagesRes,
      referrersRes,
      countriesRes,
      devicesRes
    ] = await Promise.all([
      fetchVercelAnalytics('stats', projectId, token, commonParams),
      fetchVercelAnalytics('timeseries', projectId, token, { ...commonParams, granularity: period === '24h' ? 'hour' : 'day' }),
      fetchVercelAnalytics('breakdown', projectId, token, { ...commonParams, type: 'page', limit: '10' }),
      fetchVercelAnalytics('breakdown', projectId, token, { ...commonParams, type: 'referrer', limit: '10' }),
      fetchVercelAnalytics('breakdown', projectId, token, { ...commonParams, type: 'country', limit: '10' }),
      fetchVercelAnalytics('breakdown', projectId, token, { ...commonParams, type: 'device', limit: '5' })
    ])

    // Check if any request failed
    if (!statsRes.ok) {
      console.error('Vercel Analytics API error:', await statsRes.text())
      return NextResponse.json(getMockAnalyticsData(period))
    }

    const [stats, timeseries, pages, referrers, countries, devices] = await Promise.all([
      statsRes.json(),
      timeseriesRes.json(),
      pagesRes.json(),
      referrersRes.json(),
      countriesRes.json(),
      devicesRes.json()
    ])

    // Transform data to our format
    const analyticsData: AnalyticsData = {
      visitors: stats.visitors || 0,
      pageViews: stats.pageViews || 0,
      bounceRate: stats.bounceRate || 0,
      avgDuration: stats.avgDuration || 0,
      timeSeries: transformTimeSeries(timeseries.data || []),
      topPages: transformPages(pages.data || []),
      topReferrers: transformReferrers(referrers.data || []),
      countries: transformCountries(countries.data || []),
      devices: transformDevices(devices.data || []),
      browsers: []
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(getMockAnalyticsData(period))
  }
}

function transformTimeSeries(data: Array<{ date: string; visitors: number; pageViews: number }>): AnalyticsTimeSeriesPoint[] {
  return data.map(item => ({
    date: item.date,
    visitors: item.visitors || 0,
    pageViews: item.pageViews || 0
  }))
}

function transformPages(data: Array<{ key: string; visitors: number; pageViews: number }>): AnalyticsPageData[] {
  return data.map(item => ({
    path: item.key || '/',
    views: item.pageViews || 0,
    visitors: item.visitors || 0
  }))
}

function transformReferrers(data: Array<{ key: string; visitors: number; pageViews: number }>): AnalyticsReferrerData[] {
  return data.map(item => ({
    referrer: item.key || 'Direct',
    views: item.pageViews || 0,
    visitors: item.visitors || 0
  }))
}

function transformCountries(data: Array<{ key: string; visitors: number }>): AnalyticsCountryData[] {
  return data.map(item => ({
    country: getCountryName(item.key),
    code: item.key || 'XX',
    visitors: item.visitors || 0
  }))
}

function transformDevices(data: Array<{ key: string; visitors: number }>): AnalyticsDeviceData[] {
  const total = data.reduce((sum, item) => sum + (item.visitors || 0), 0)

  return data.map(item => ({
    device: (item.key?.toLowerCase() || 'desktop') as 'desktop' | 'mobile' | 'tablet',
    visitors: item.visitors || 0,
    percentage: total > 0 ? Math.round((item.visitors || 0) / total * 100) : 0
  }))
}

function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    'US': 'United States',
    'GB': 'United Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'IN': 'India',
    'PK': 'Pakistan',
    'AE': 'UAE',
    'SA': 'Saudi Arabia',
    'JP': 'Japan',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'NL': 'Netherlands',
    'IT': 'Italy',
    'ES': 'Spain',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'SG': 'Singapore',
    'NZ': 'New Zealand',
    'IE': 'Ireland',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'BE': 'Belgium',
    'PL': 'Poland',
    'PT': 'Portugal',
    'RU': 'Russia',
    'CN': 'China',
    'KR': 'South Korea'
  }
  return countries[code] || code
}

function getMockAnalyticsData(period: AnalyticsPeriod): AnalyticsData {
  const days = period === '24h' ? 24 : period === '7d' ? 7 : period === '30d' ? 30 : 90
  const isHourly = period === '24h'

  const timeSeries: AnalyticsTimeSeriesPoint[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    if (isHourly) {
      date.setHours(date.getHours() - i)
    } else {
      date.setDate(date.getDate() - i)
    }

    timeSeries.push({
      date: date.toISOString().split('T')[0] + (isHourly ? `T${date.getHours().toString().padStart(2, '0')}:00:00` : ''),
      visitors: Math.floor(Math.random() * 50) + 10,
      pageViews: Math.floor(Math.random() * 150) + 30
    })
  }

  const totalVisitors = timeSeries.reduce((sum, p) => sum + p.visitors, 0)
  const totalPageViews = timeSeries.reduce((sum, p) => sum + p.pageViews, 0)

  return {
    visitors: totalVisitors,
    pageViews: totalPageViews,
    bounceRate: Math.round(Math.random() * 30 + 30),
    avgDuration: Math.round(Math.random() * 180 + 60),
    timeSeries,
    topPages: [
      { path: '/', views: Math.floor(totalPageViews * 0.4), visitors: Math.floor(totalVisitors * 0.5) },
      { path: '/work', views: Math.floor(totalPageViews * 0.25), visitors: Math.floor(totalVisitors * 0.3) },
      { path: '/about', views: Math.floor(totalPageViews * 0.15), visitors: Math.floor(totalVisitors * 0.2) },
      { path: '/contact', views: Math.floor(totalPageViews * 0.1), visitors: Math.floor(totalVisitors * 0.15) },
      { path: '/work/sample-project', views: Math.floor(totalPageViews * 0.1), visitors: Math.floor(totalVisitors * 0.1) }
    ],
    topReferrers: [
      { referrer: 'Direct', views: Math.floor(totalPageViews * 0.4), visitors: Math.floor(totalVisitors * 0.4) },
      { referrer: 'google.com', views: Math.floor(totalPageViews * 0.3), visitors: Math.floor(totalVisitors * 0.3) },
      { referrer: 'instagram.com', views: Math.floor(totalPageViews * 0.15), visitors: Math.floor(totalVisitors * 0.15) },
      { referrer: 'facebook.com', views: Math.floor(totalPageViews * 0.1), visitors: Math.floor(totalVisitors * 0.1) },
      { referrer: 'linkedin.com', views: Math.floor(totalPageViews * 0.05), visitors: Math.floor(totalVisitors * 0.05) }
    ],
    countries: [
      { country: 'United States', code: 'US', visitors: Math.floor(totalVisitors * 0.35) },
      { country: 'United Kingdom', code: 'GB', visitors: Math.floor(totalVisitors * 0.2) },
      { country: 'Pakistan', code: 'PK', visitors: Math.floor(totalVisitors * 0.15) },
      { country: 'Canada', code: 'CA', visitors: Math.floor(totalVisitors * 0.1) },
      { country: 'UAE', code: 'AE', visitors: Math.floor(totalVisitors * 0.08) },
      { country: 'India', code: 'IN', visitors: Math.floor(totalVisitors * 0.06) },
      { country: 'Australia', code: 'AU', visitors: Math.floor(totalVisitors * 0.04) },
      { country: 'Germany', code: 'DE', visitors: Math.floor(totalVisitors * 0.02) }
    ],
    devices: [
      { device: 'desktop', visitors: Math.floor(totalVisitors * 0.55), percentage: 55 },
      { device: 'mobile', visitors: Math.floor(totalVisitors * 0.40), percentage: 40 },
      { device: 'tablet', visitors: Math.floor(totalVisitors * 0.05), percentage: 5 }
    ],
    browsers: []
  }
}
