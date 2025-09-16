/**
 * Utility functions for creating status styles
 */

import { SystemStyleObject } from '@chakra-ui/react'
import { StatusType, StatusVariant, FormValidationState } from './types'
import { statusIndicators } from './indicators'
import { formValidationStates, alertStyles, toastStyles, progressStyles } from './styles'

/**
 * Creates a status style object based on status type and variant
 */
export const createStatusStyle = (
  status: StatusType,
  variant: StatusVariant = 'solid'
): SystemStyleObject => {
  const statusConfig = statusIndicators[status]
  
  switch (variant) {
    case 'solid':
      return {
        bg: statusConfig.bg,
        color: statusConfig.color,
        borderColor: statusConfig.borderColor,
      }
    
    case 'subtle':
      return {
        bg: statusConfig.lightBg,
        color: statusConfig.lightColor,
        borderColor: statusConfig.borderColor,
      }
    
    case 'outline':
      return {
        bg: 'transparent',
        color: statusConfig.bg,
        borderColor: statusConfig.borderColor,
        borderWidth: '1px',
      }
    
    default:
      return createStatusStyle(status, 'solid')
  }
}

/**
 * Creates form validation styles
 */
export const createFormValidationStyle = (
  state: FormValidationState
): SystemStyleObject => {
  return formValidationStates[state]
}

/**
 * Creates alert styles
 */
export const createAlertStyle = (
  status: Exclude<StatusType, 'loading' | 'pending' | 'active' | 'inactive'>
): SystemStyleObject => {
  return alertStyles[status].container
}

/**
 * Creates toast styles
 */
export const createToastStyle = (
  status: StatusType
): SystemStyleObject => {
  return toastStyles[status]
}

/**
 * Creates progress styles
 */
export const createProgressStyle = (
  status: StatusType | 'default'
): SystemStyleObject => {
  return progressStyles[status]
}

/**
 * Gets the appropriate status icon
 */
export const getStatusIcon = (status: StatusType): string => {
  return statusIndicators[status].icon
}

/**
 * Determines if a status should use light or dark text
 */
export const shouldUseLightText = (status: StatusType): boolean => {
  const lightTextStatuses: StatusType[] = ['error', 'info', 'loading', 'active']
  return lightTextStatuses.includes(status)
}

/**
 * Creates a complete status configuration object
 */
export const createStatusConfig = (status: StatusType) => {
  const config = statusIndicators[status]
  
  return {
    ...config,
    variants: {
      solid: createStatusStyle(status, 'solid'),
      subtle: createStatusStyle(status, 'subtle'),
      outline: createStatusStyle(status, 'outline'),
    },
    useLightText: shouldUseLightText(status),
  }
}

/**
 * Validates if a status type is valid
 */
export const isValidStatusType = (status: string): status is StatusType => {
  const validStatuses: StatusType[] = [
    'success', 'error', 'warning', 'info', 
    'loading', 'pending', 'active', 'inactive'
  ]
  return validStatuses.includes(status as StatusType)
}

/**
 * Gets status color with fallback
 */
export const getStatusColorSafe = (
  status: string, 
  fallback: StatusType = 'info'
): string => {
  if (isValidStatusType(status)) {
    return statusIndicators[status].bg
  }
  return statusIndicators[fallback].bg
}