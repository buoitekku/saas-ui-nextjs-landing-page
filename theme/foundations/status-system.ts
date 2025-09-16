/**
 * Safe Talk Status System
 * Comprehensive error states and status indicators using brand colors
 * 
 * @deprecated This file is being refactored into a modular structure.
 * Please use the new modular imports from './status-system/' instead.
 * 
 * @example
 * ```typescript
 * // Old way (deprecated)
 * import { statusIndicators } from './status-system'
 * 
 * // New way (recommended)
 * import { statusIndicators, createStatusStyle } from './status-system/'
 * ```
 */

// Re-export everything from the new modular structure for backward compatibility
export * from './status-system/'

// Legacy exports (deprecated - use the modular imports instead)
import { SystemStyleObject } from '@chakra-ui/react'
import { 
  statusIndicators as newStatusIndicators,
  formValidationStates as newFormValidationStates,
  alertStyles as newAlertStyles,
  toastStyles as newToastStyles,
  progressStyles as newProgressStyles,
  createStatusStyle,
  createFormValidationStyle,
  createAlertStyle,
  createToastStyle,
  createProgressStyle,
  commonStatusStyles,
} from './status-system/'

/**
 * @deprecated Use the new modular structure instead
 */
export const statusColorSystem = {
  // This is now handled by the color mapping system
  // See ./status-system/colors.ts for the new approach
} as const

/**
 * @deprecated Use statusIndicators from './status-system/' instead
 */
export const statusIndicators = newStatusIndicators

/**
 * @deprecated Use formValidationStates from './status-system/' instead
 */
export const formValidationStates = newFormValidationStates

/**
 * @deprecated Use alertStyles from './status-system/' instead
 */
export const alertStyles = newAlertStyles

/**
 * @deprecated Use toastStyles from './status-system/' instead
 */
export const toastStyles = newToastStyles

/**
 * @deprecated Use progressStyles from './status-system/' instead
 */
export const progressStyles = newProgressStyles

/**
 * @deprecated Use utility functions from './status-system/' instead
 */
export {
  createStatusStyle,
  createFormValidationStyle,
  createAlertStyle,
  createToastStyle,
  createProgressStyle,
  commonStatusStyles,
}