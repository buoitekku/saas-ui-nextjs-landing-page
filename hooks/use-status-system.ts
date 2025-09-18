/**
 * Hook for managing status system in components
 */

import { useMemo } from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import { 
  StatusType, 
  StatusVariant,
  createStatusStyle,
  createStatusConfig,
  getStatusIcon,
  shouldUseLightText,
  isValidStatusType,
  getStatusColorSafe,
} from '#theme/foundations/status-system'

interface UseStatusSystemOptions {
  /** Default status type */
  defaultStatus?: StatusType
  /** Default variant */
  defaultVariant?: StatusVariant
  /** Whether to adapt colors for dark mode */
  adaptForDarkMode?: boolean
}

/**
 * Hook for managing status system styles and utilities
 */
export const useStatusSystem = (options: UseStatusSystemOptions = {}) => {
  const {
    defaultStatus = 'info',
    defaultVariant = 'solid',
    adaptForDarkMode = true,
  } = options

  // Memoize status configurations to avoid recalculation
  const statusConfigs = useMemo(() => {
    const statuses: StatusType[] = [
      'success', 'error', 'warning', 'info',
      'loading', 'pending', 'active', 'inactive'
    ]
    
    return statuses.reduce((acc, status) => {
      acc[status] = createStatusConfig(status)
      return acc
    }, {} as Record<StatusType, ReturnType<typeof createStatusConfig>>)
  }, [])

  /**
   * Get status style for a given status and variant
   */
  const getStatusStyle = (
    status: StatusType = defaultStatus,
    variant: StatusVariant = defaultVariant
  ) => {
    if (!isValidStatusType(status)) {
      console.warn(`Invalid status type: ${status}. Using default: ${defaultStatus}`)
      status = defaultStatus
    }
    
    return createStatusStyle(status, variant)
  }

  /**
   * Get status configuration
   */
  const getStatusConfig = (status: StatusType = defaultStatus) => {
    return statusConfigs[status] || statusConfigs[defaultStatus]
  }

  /**
   * Get status color with dark mode adaptation
   */
  const getStatusColor = (status: StatusType = defaultStatus) => {
    const config = getStatusConfig(status)
    
    if (adaptForDarkMode) {
      return useColorModeValue(config.bg, config.lightBg)
    }
    
    return config.bg
  }

  /**
   * Get status text color with dark mode adaptation
   */
  const getStatusTextColor = (status: StatusType = defaultStatus) => {
    const config = getStatusConfig(status)
    
    if (adaptForDarkMode) {
      return useColorModeValue(config.color, config.lightColor)
    }
    
    return config.color
  }

  /**
   * Check if status exists and is valid
   */
  const validateStatus = (status: string): status is StatusType => {
    return isValidStatusType(status)
  }

  /**
   * Get safe status color with fallback
   */
  const getSafeStatusColor = (status: string) => {
    return getStatusColorSafe(status, defaultStatus)
  }

  /**
   * Create a complete status object for a component
   */
  const createStatusObject = (
    status: StatusType = defaultStatus,
    variant: StatusVariant = defaultVariant
  ) => {
    const config = getStatusConfig(status)
    const style = getStatusStyle(status, variant)
    
    return {
      status,
      variant,
      config,
      style,
      icon: getStatusIcon(status),
      useLightText: shouldUseLightText(status),
      color: getStatusColor(status),
      textColor: getStatusTextColor(status),
    }
  }

  return {
    // Core functions
    getStatusStyle,
    getStatusConfig,
    getStatusColor,
    getStatusTextColor,
    
    // Utility functions
    validateStatus,
    getSafeStatusColor,
    createStatusObject,
    
    // Direct access to configurations
    statusConfigs,
    
    // Helper functions
    getIcon: getStatusIcon,
    shouldUseLightText,
    isValidStatus: isValidStatusType,
  }
}

/**
 * Simplified hook for basic status styling
 */
export const useStatusStyle = (
  status: StatusType,
  variant: StatusVariant = 'solid'
) => {
  return useMemo(() => createStatusStyle(status, variant), [status, variant])
}

/**
 * Hook for form validation status
 */
export const useFormValidationStatus = () => {
  const { getStatusStyle } = useStatusSystem()
  
  return {
    getValidStyle: () => getStatusStyle('success', 'subtle'),
    getInvalidStyle: () => getStatusStyle('error', 'subtle'),
    getWarningStyle: () => getStatusStyle('warning', 'subtle'),
    getLoadingStyle: () => getStatusStyle('loading', 'subtle'),
  }
}

/**
 * Hook for alert status
 */
export const useAlertStatus = () => {
  const { createStatusObject } = useStatusSystem()
  
  return {
    success: createStatusObject('success', 'subtle'),
    error: createStatusObject('error', 'subtle'),
    warning: createStatusObject('warning', 'subtle'),
    info: createStatusObject('info', 'subtle'),
  }
}