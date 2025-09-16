'use client'

import { useEffect } from 'react'
import { trackEvent } from './google-analytics'

// Core Web Vitals tracking
export const PerformanceMonitoring: React.FC = () => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            
            if (lastEntry) {
              const lcp = Math.round(lastEntry.startTime)
              trackEvent('web_vitals', 'performance', 'LCP', lcp)
              
              // Track LCP rating
              let rating = 'good'
              if (lcp > 4000) rating = 'poor'
              else if (lcp > 2500) rating = 'needs_improvement'
              
              trackEvent('web_vitals_rating', 'performance', `LCP_${rating}`)
            }
          })
          
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (error) {
          console.warn('LCP tracking failed:', error)
        }

        // First Input Delay (FID)
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              const fid = Math.round(entry.processingStart - entry.startTime)
              trackEvent('web_vitals', 'performance', 'FID', fid)
              
              // Track FID rating
              let rating = 'good'
              if (fid > 300) rating = 'poor'
              else if (fid > 100) rating = 'needs_improvement'
              
              trackEvent('web_vitals_rating', 'performance', `FID_${rating}`)
            })
          })
          
          fidObserver.observe({ entryTypes: ['first-input'] })
        } catch (error) {
          console.warn('FID tracking failed:', error)
        }

        // Cumulative Layout Shift (CLS)
        try {
          let clsValue = 0
          let clsEntries: any[] = []
          
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsEntries.push(entry)
                clsValue += entry.value
              }
            })
          })
          
          clsObserver.observe({ entryTypes: ['layout-shift'] })
          
          // Report CLS on page unload
          const reportCLS = () => {
            const cls = Math.round(clsValue * 1000) / 1000
            trackEvent('web_vitals', 'performance', 'CLS', cls * 1000)
            
            // Track CLS rating
            let rating = 'good'
            if (cls > 0.25) rating = 'poor'
            else if (cls > 0.1) rating = 'needs_improvement'
            
            trackEvent('web_vitals_rating', 'performance', `CLS_${rating}`)
          }
          
          window.addEventListener('beforeunload', reportCLS)
          
          // Also report after 5 seconds
          setTimeout(reportCLS, 5000)
        } catch (error) {
          console.warn('CLS tracking failed:', error)
        }
      }

      // Track page load time
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          
          if (navigation) {
            const pageLoadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart)
            trackEvent('performance', 'timing', 'page_load_time', pageLoadTime)
            
            const domContentLoaded = Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart)
            trackEvent('performance', 'timing', 'dom_content_loaded', domContentLoaded)
            
            const firstByte = Math.round(navigation.responseStart - navigation.fetchStart)
            trackEvent('performance', 'timing', 'time_to_first_byte', firstByte)
          }
        }, 0)
      })
    }

    // Track JavaScript errors
    const trackErrors = () => {
      window.addEventListener('error', (event) => {
        trackEvent('javascript_error', 'error', event.message, 1)
      })

      window.addEventListener('unhandledrejection', (event) => {
        trackEvent('promise_rejection', 'error', event.reason?.toString() || 'Unknown', 1)
      })
    }

    // Track connection type
    const trackConnection = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        if (connection) {
          trackEvent('connection_type', 'performance', connection.effectiveType)
          trackEvent('connection_downlink', 'performance', 'downlink', Math.round(connection.downlink))
        }
      }
    }

    trackWebVitals()
    trackErrors()
    trackConnection()
  }, [])

  return null
}

// Resource loading performance tracker
export const ResourcePerformanceTracker: React.FC = () => {
  useEffect(() => {
    const trackResourcePerformance = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      
      resources.forEach((resource) => {
        const duration = Math.round(resource.duration)
        const resourceType = resource.initiatorType
        
        // Track slow resources (>1s)
        if (duration > 1000) {
          trackEvent('slow_resource', 'performance', resourceType, duration)
        }
        
        // Track resource sizes
        if (resource.transferSize) {
          const sizeKB = Math.round(resource.transferSize / 1024)
          trackEvent('resource_size', 'performance', resourceType, sizeKB)
        }
      })
    }

    // Track after page load
    window.addEventListener('load', () => {
      setTimeout(trackResourcePerformance, 2000)
    })
  }, [])

  return null
}