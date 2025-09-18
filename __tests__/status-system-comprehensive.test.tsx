/**
 * Comprehensive test suite for Safe Talk Status System
 */

import { renderHook } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

import {
  StatusType,
  StatusVariant,
  createStatusStyle,
  createStatusConfig,
  getStatusIcon,
  shouldUseLightText,
  isValidStatusType,
  getStatusColorSafe,
  statusIndicators,
  formValidationStates,
  alertStyles,
  toastStyles,
  progressStyles,
} from '#theme/foundations/status-system'

import {
  useStatusSystem,
  useStatusStyle,
  useFormValidationStatus,
  useAlertStatus,
} from '#hooks/use-status-system'

// Test wrapper for hooks that need Chakra context
const ChakraWrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
)

describe('Status System Core Functions', () => {
  describe('createStatusStyle', () => {
    test('should create solid status styles', () => {
      const style = createStatusStyle('success', 'solid')
      
      expect(style).toHaveProperty('bg')
      expect(style).toHaveProperty('color')
      expect(style).toHaveProperty('borderColor')
    })

    test('should create subtle status styles', () => {
      const style = createStatusStyle('error', 'subtle')
      
      expect(style).toHaveProperty('bg')
      expect(style).toHaveProperty('color')
      expect(style).toHaveProperty('borderColor')
    })

    test('should create outline status styles', () => {
      const style = createStatusStyle('warning', 'outline')
      
      expect(style.bg).toBe('transparent')
      expect(style).toHaveProperty('borderWidth', '1px')
    })

    test('should default to solid variant', () => {
      const solidStyle = createStatusStyle('info', 'solid')
      const defaultStyle = createStatusStyle('info')
      
      expect(defaultStyle).toEqual(solidStyle)
    })
  })

  describe('createStatusConfig', () => {
    test('should create complete status configuration', () => {
      const config = createStatusConfig('success')
      
      expect(config).toHaveProperty('bg')
      expect(config).toHaveProperty('color')
      expect(config).toHaveProperty('icon')
      expect(config).toHaveProperty('variants')
      expect(config).toHaveProperty('useLightText')
      
      expect(config.variants).toHaveProperty('solid')
      expect(config.variants).toHaveProperty('subtle')
      expect(config.variants).toHaveProperty('outline')
    })
  })

  describe('getStatusIcon', () => {
    test('should return correct icons for each status', () => {
      expect(getStatusIcon('success')).toBe('✓')
      expect(getStatusIcon('error')).toBe('✕')
      expect(getStatusIcon('warning')).toBe('⚠')
      expect(getStatusIcon('info')).toBe('ℹ')
      expect(getStatusIcon('loading')).toBe('⟳')
      expect(getStatusIcon('pending')).toBe('⏳')
      expect(getStatusIcon('active')).toBe('●')
      expect(getStatusIcon('inactive')).toBe('○')
    })
  })

  describe('shouldUseLightText', () => {
    test('should return true for dark backgrounds', () => {
      expect(shouldUseLightText('error')).toBe(true)
      expect(shouldUseLightText('info')).toBe(true)
      expect(shouldUseLightText('loading')).toBe(true)
      expect(shouldUseLightText('active')).toBe(true)
    })

    test('should return false for light backgrounds', () => {
      expect(shouldUseLightText('success')).toBe(false)
      expect(shouldUseLightText('warning')).toBe(false)
      expect(shouldUseLightText('pending')).toBe(false)
      expect(shouldUseLightText('inactive')).toBe(false)
    })
  })

  describe('isValidStatusType', () => {
    test('should validate correct status types', () => {
      const validStatuses = [
        'success', 'error', 'warning', 'info',
        'loading', 'pending', 'active', 'inactive'
      ]
      
      validStatuses.forEach(status => {
        expect(isValidStatusType(status)).toBe(true)
      })
    })

    test('should reject invalid status types', () => {
      const invalidStatuses = ['invalid', 'unknown', 'test', '']
      
      invalidStatuses.forEach(status => {
        expect(isValidStatusType(status)).toBe(false)
      })
    })
  })

  describe('getStatusColorSafe', () => {
    test('should return correct color for valid status', () => {
      const color = getStatusColorSafe('success')
      expect(color).toBe(statusIndicators.success.bg)
    })

    test('should return fallback color for invalid status', () => {
      const color = getStatusColorSafe('invalid')
      expect(color).toBe(statusIndicators.info.bg) // Default fallback
    })

    test('should use custom fallback', () => {
      const color = getStatusColorSafe('invalid', 'error')
      expect(color).toBe(statusIndicators.error.bg)
    })
  })
})

describe('Status System Configurations', () => {
  test('should have all required status indicators', () => {
    const requiredStatuses: StatusType[] = [
      'success', 'error', 'warning', 'info',
      'loading', 'pending', 'active', 'inactive'
    ]
    
    requiredStatuses.forEach(status => {
      expect(statusIndicators).toHaveProperty(status)
      
      const indicator = statusIndicators[status]
      expect(indicator).toHaveProperty('bg')
      expect(indicator).toHaveProperty('color')
      expect(indicator).toHaveProperty('borderColor')
      expect(indicator).toHaveProperty('icon')
      expect(indicator).toHaveProperty('iconColor')
      expect(indicator).toHaveProperty('lightBg')
      expect(indicator).toHaveProperty('lightColor')
    })
  })

  test('should have form validation states', () => {
    const requiredStates = ['valid', 'invalid', 'warning', 'loading']
    
    requiredStates.forEach(state => {
      expect(formValidationStates).toHaveProperty(state)
      
      const validation = formValidationStates[state as keyof typeof formValidationStates]
      expect(validation).toHaveProperty('borderColor')
      expect(validation).toHaveProperty('focusBorderColor')
      expect(validation).toHaveProperty('_focus')
    })
  })

  test('should have alert styles', () => {
    const requiredAlerts = ['success', 'error', 'warning', 'info']
    
    requiredAlerts.forEach(alert => {
      expect(alertStyles).toHaveProperty(alert)
      
      const style = alertStyles[alert as keyof typeof alertStyles]
      expect(style).toHaveProperty('container')
      expect(style).toHaveProperty('icon')
      expect(style).toHaveProperty('title')
      expect(style).toHaveProperty('description')
    })
  })

  test('should have toast styles', () => {
    const requiredToasts: StatusType[] = [
      'success', 'error', 'warning', 'info',
      'loading', 'pending', 'active', 'inactive'
    ]
    
    requiredToasts.forEach(toast => {
      expect(toastStyles).toHaveProperty(toast)
      
      const style = toastStyles[toast]
      expect(style).toHaveProperty('bg')
      expect(style).toHaveProperty('color')
      expect(style).toHaveProperty('borderRadius')
      expect(style).toHaveProperty('boxShadow')
      expect(style).toHaveProperty('fontWeight')
    })
  })

  test('should have progress styles', () => {
    const requiredProgress = [
      'success', 'error', 'warning', 'info',
      'loading', 'pending', 'active', 'inactive', 'default'
    ]
    
    requiredProgress.forEach(progress => {
      expect(progressStyles).toHaveProperty(progress)
      
      const style = progressStyles[progress as keyof typeof progressStyles]
      expect(style).toHaveProperty('track')
      expect(style).toHaveProperty('filledTrack')
    })
  })
})

describe('Status System Hooks', () => {
  describe('useStatusSystem', () => {
    test('should provide status system utilities', () => {
      const { result } = renderHook(() => useStatusSystem(), {
        wrapper: ChakraWrapper,
      })
      
      expect(result.current).toHaveProperty('getStatusStyle')
      expect(result.current).toHaveProperty('getStatusConfig')
      expect(result.current).toHaveProperty('getStatusColor')
      expect(result.current).toHaveProperty('getStatusTextColor')
      expect(result.current).toHaveProperty('validateStatus')
      expect(result.current).toHaveProperty('createStatusObject')
    })

    test('should create status object correctly', () => {
      const { result } = renderHook(() => useStatusSystem(), {
        wrapper: ChakraWrapper,
      })
      
      const statusObject = result.current.createStatusObject('success', 'solid')
      
      expect(statusObject).toHaveProperty('status', 'success')
      expect(statusObject).toHaveProperty('variant', 'solid')
      expect(statusObject).toHaveProperty('config')
      expect(statusObject).toHaveProperty('style')
      expect(statusObject).toHaveProperty('icon', '✓')
      expect(statusObject).toHaveProperty('useLightText', false)
    })

    test('should validate status correctly', () => {
      const { result } = renderHook(() => useStatusSystem(), {
        wrapper: ChakraWrapper,
      })
      
      expect(result.current.validateStatus('success')).toBe(true)
      expect(result.current.validateStatus('invalid')).toBe(false)
    })
  })

  describe('useStatusStyle', () => {
    test('should return memoized status style', () => {
      const { result, rerender } = renderHook(
        ({ status, variant }: { status: StatusType; variant?: StatusVariant }) =>
          useStatusStyle(status, variant),
        {
          wrapper: ChakraWrapper,
          initialProps: { status: 'success' as StatusType },
        }
      )
      
      const firstResult = result.current
      
      // Rerender with same props
      rerender({ status: 'success' as StatusType })
      expect(result.current).toBe(firstResult) // Should be memoized
      
      // Rerender with different props
      rerender({ status: 'error' as StatusType })
      expect(result.current).not.toBe(firstResult) // Should be different
    })
  })

  describe('useFormValidationStatus', () => {
    test('should provide form validation styles', () => {
      const { result } = renderHook(() => useFormValidationStatus(), {
        wrapper: ChakraWrapper,
      })
      
      expect(result.current).toHaveProperty('getValidStyle')
      expect(result.current).toHaveProperty('getInvalidStyle')
      expect(result.current).toHaveProperty('getWarningStyle')
      expect(result.current).toHaveProperty('getLoadingStyle')
      
      // Test that functions return style objects
      expect(typeof result.current.getValidStyle()).toBe('object')
      expect(typeof result.current.getInvalidStyle()).toBe('object')
    })
  })

  describe('useAlertStatus', () => {
    test('should provide alert status objects', () => {
      const { result } = renderHook(() => useAlertStatus(), {
        wrapper: ChakraWrapper,
      })
      
      expect(result.current).toHaveProperty('success')
      expect(result.current).toHaveProperty('error')
      expect(result.current).toHaveProperty('warning')
      expect(result.current).toHaveProperty('info')
      
      // Test that each status object has required properties
      Object.values(result.current).forEach(statusObj => {
        expect(statusObj).toHaveProperty('status')
        expect(statusObj).toHaveProperty('variant', 'subtle')
        expect(statusObj).toHaveProperty('config')
        expect(statusObj).toHaveProperty('style')
        expect(statusObj).toHaveProperty('icon')
      })
    })
  })
})

describe('Status System Brand Compliance', () => {
  test('should use Safe Talk brand colors', () => {
    // Test that status colors reference Safe Talk palette
    expect(statusIndicators.success.bg).toMatch(/safeTalk\.limeGreen/)
    expect(statusIndicators.error.bg).toMatch(/safeTalk\.purple/)
    expect(statusIndicators.info.bg).toMatch(/safeTalk\.blue/)
    expect(statusIndicators.loading.bg).toMatch(/safeTalk\.turquoise/)
    expect(statusIndicators.inactive.bg).toMatch(/safeTalk\.navy/)
  })

  test('should maintain accessibility standards', () => {
    // Test that light text is used on dark backgrounds
    const darkBackgroundStatuses: StatusType[] = ['error', 'info', 'loading', 'active']
    
    darkBackgroundStatuses.forEach(status => {
      expect(shouldUseLightText(status)).toBe(true)
    })
  })

  test('should provide consistent color patterns', () => {
    // Test that all status indicators have consistent structure
    Object.values(statusIndicators).forEach(indicator => {
      expect(indicator.bg).toBeTruthy()
      expect(indicator.color).toBeTruthy()
      expect(indicator.borderColor).toBeTruthy()
      expect(indicator.lightBg).toBeTruthy()
      expect(indicator.lightColor).toBeTruthy()
    })
  })
})