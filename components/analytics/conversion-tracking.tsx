'use client'

import { useEffect } from 'react'
import { trackEvent, trackConversion } from './google-analytics'

// Conversion tracking hook
export const useConversionTracking = () => {
  // Track CTA clicks
  const trackCTAClick = (ctaName: string, location: string) => {
    trackEvent('cta_click', 'engagement', `${ctaName}_${location}`)
  }

  // Track form submissions
  const trackFormSubmission = (formName: string, success: boolean = true) => {
    trackEvent(
      success ? 'form_submit_success' : 'form_submit_error',
      'conversion',
      formName
    )
    
    if (success) {
      // Track as conversion
      trackConversion('AW-XXXXXXXXX/XXXXXXX') // Replace with actual conversion ID
    }
  }

  // Track app download attempts
  const trackAppDownload = (platform: 'ios' | 'android' | 'web') => {
    trackEvent('app_download_click', 'conversion', platform)
    trackConversion('AW-XXXXXXXXX/XXXXXXX') // Replace with actual conversion ID
  }

  // Track waitlist signups
  const trackWaitlistSignup = () => {
    trackEvent('waitlist_signup', 'conversion', 'landing_page')
    trackConversion('AW-XXXXXXXXX/XXXXXXX') // Replace with actual conversion ID
  }

  // Track demo requests
  const trackDemoRequest = () => {
    trackEvent('demo_request', 'conversion', 'landing_page')
    trackConversion('AW-XXXXXXXXX/XXXXXXX') // Replace with actual conversion ID
  }

  // Track business inquiries
  const trackBusinessInquiry = () => {
    trackEvent('business_inquiry', 'conversion', 'contact_form')
    trackConversion('AW-XXXXXXXXX/XXXXXXX') // Replace with actual conversion ID
  }

  // Track scroll depth
  const trackScrollDepth = (percentage: number) => {
    trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage)
  }

  // Track time on page
  const trackTimeOnPage = (seconds: number) => {
    trackEvent('time_on_page', 'engagement', 'landing_page', seconds)
  }

  return {
    trackCTAClick,
    trackFormSubmission,
    trackAppDownload,
    trackWaitlistSignup,
    trackDemoRequest,
    trackBusinessInquiry,
    trackScrollDepth,
    trackTimeOnPage,
  }
}

// Scroll depth tracking component
export const ScrollDepthTracker: React.FC = () => {
  const { trackScrollDepth } = useConversionTracking()

  useEffect(() => {
    const thresholds = [25, 50, 75, 90, 100]
    const trackedThresholds = new Set<number>()

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold)
          trackScrollDepth(threshold)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [trackScrollDepth])

  return null
}

// Time on page tracking component
export const TimeOnPageTracker: React.FC = () => {
  const { trackTimeOnPage } = useConversionTracking()

  useEffect(() => {
    const startTime = Date.now()
    const intervals = [30, 60, 120, 300] // 30s, 1m, 2m, 5m
    const trackedIntervals = new Set<number>()

    const interval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      
      intervals.forEach(threshold => {
        if (timeSpent >= threshold && !trackedIntervals.has(threshold)) {
          trackedIntervals.add(threshold)
          trackTimeOnPage(threshold)
        }
      })
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [trackTimeOnPage])

  return null
}