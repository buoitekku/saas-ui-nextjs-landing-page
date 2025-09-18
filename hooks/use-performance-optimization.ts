import { useCallback, useMemo, useRef } from 'react'

/**
 * Performance optimization utilities for Safe Talk components
 */

// Debounce hook for performance optimization
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    }) as T,
    [callback, delay]
  )
}

// Throttle hook for performance optimization
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastCallRef = useRef<number>(0)

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now
        callback(...args)
      }
    }) as T,
    [callback, delay]
  )
}

// Memoized style creator for typography hierarchy
export const useMemoizedStyles = <T extends Record<string, any>>(
  styleCreator: () => T,
  dependencies: any[]
): T => {
  return useMemo(styleCreator, dependencies)
}

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const observerRef = useRef<IntersectionObserver>()
  
  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    observerRef.current = new IntersectionObserver(callback, options)
    observerRef.current.observe(element)
  }, [callback, options])
  
  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
  }, [])
  
  return { observe, disconnect }
}