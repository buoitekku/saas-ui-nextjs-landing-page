/**
 * Performance monitoring hook for Safe Talk landing page
 */

import { useEffect, useCallback } from 'react'

interface PerformanceMetrics {
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  fcp?: number // First Contentful Paint
  ttfb?: number // Time to First Byte
}

interface UsePerformanceMonitoringOptions {
  enableReporting?: boolean
  reportingEndpoint?: string
  sampleRate?: number // 0-1, percentage of sessions to monitor
}

export const usePerformanceMonitoring = (
  options: UsePerformanceMonitoringOptions = {}
) => {
  const {
    enableReporting = true,
    reportingEndpoint = '/api/analytics/performance',
    sampleRate = 0.1, // Monitor 10% of sessions by default
  } = options

  const shouldReport = useCallback(() => {
    return enableReporting && Math.random() < sampleRate
  }, [enableReporting, sampleRate])

  const reportMetric = useCallback(async (metric: PerformanceMetrics) => {
    if (!shouldReport()) return

    try {
      await fetch(reportingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...metric,
          timestamp: Date.now(),
          url: window.location.pathname,
          userAgent: navigator.userAgent,
        }),
      })
    } catch (error) {
      console.warn('Failed to report performance metric:', error)
    }
  }, [shouldReport, reportingEndpoint])

  useEffect(() => {
    if (!enableReporting) return

    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            reportMetric({ lcp: entry.startTime })
            break
          case 'first-input':
            reportMetric({ fid: (entry as any).processingStart - entry.startTime })
            break
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              reportMetric({ cls: (entry as any).value })
            }
            break
        }
      }
    })

    // Observe Web Vitals
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (error) {
      console.warn('Performance observer not supported:', error)
    }

    // Navigation timing
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      reportMetric({
        fcp: navigationEntry.responseStart - navigationEntry.fetchStart,
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
      })
    }

    return () => observer.disconnect()
  }, [enableReporting, reportMetric])

  return {
    reportCustomMetric: reportMetric,
  }
}