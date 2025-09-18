'use client'

import { useEffect } from 'react'

/**
 * Mobile optimization component that applies mobile-specific optimizations
 */
export const MobileOptimization: React.FC = () => {
  useEffect(() => {
    // Optimize touch interactions
    const optimizeTouchInteractions = () => {
      // Add touch-action CSS for better touch handling
      const style = document.createElement('style')
      style.textContent = `
        /* Optimize touch interactions */
        button, [role="button"], .chakra-button {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          min-height: 44px; /* iOS accessibility guideline */
          min-width: 44px;
        }
        
        /* Improve scrolling performance */
        * {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Optimize form inputs for mobile */
        input, textarea, select {
          font-size: 16px; /* Prevent zoom on iOS */
          touch-action: manipulation;
        }
        
        /* Better mobile typography */
        @media (max-width: 768px) {
          body {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
        }
        
        /* Optimize animations for mobile */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Mobile-specific hover states */
        @media (hover: none) and (pointer: coarse) {
          .chakra-button:hover {
            transform: none;
          }
        }
      `
      document.head.appendChild(style)
      
      return () => {
        document.head.removeChild(style)
      }
    }

    const cleanup = optimizeTouchInteractions()
    
    // Optimize viewport for mobile
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover')
    }

    return cleanup
  }, [])

  return null
}