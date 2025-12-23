// Analytics types for Vercel Analytics API

export interface AnalyticsTimeSeriesPoint {
  date: string
  visitors: number
  pageViews: number
}

export interface AnalyticsPageData {
  path: string
  views: number
  visitors: number
}

export interface AnalyticsReferrerData {
  referrer: string
  views: number
  visitors: number
}

export interface AnalyticsCountryData {
  country: string
  code: string
  visitors: number
}

export interface AnalyticsDeviceData {
  device: 'desktop' | 'mobile' | 'tablet'
  visitors: number
  percentage: number
  [key: string]: string | number // Index signature for recharts compatibility
}

export interface AnalyticsBrowserData {
  browser: string
  visitors: number
  percentage: number
}

export interface AnalyticsData {
  visitors: number
  pageViews: number
  bounceRate: number
  avgDuration: number
  timeSeries: AnalyticsTimeSeriesPoint[]
  topPages: AnalyticsPageData[]
  topReferrers: AnalyticsReferrerData[]
  countries: AnalyticsCountryData[]
  devices: AnalyticsDeviceData[]
  browsers: AnalyticsBrowserData[]
}

export type AnalyticsPeriod = '24h' | '7d' | '30d' | '90d'

export interface AnalyticsFilters {
  period: AnalyticsPeriod
  from?: string
  to?: string
}
