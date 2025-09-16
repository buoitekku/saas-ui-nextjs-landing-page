/**
 * Safe Talk Status System
 * Comprehensive error states and status indicators using brand colors
 * 
 * This module provides a complete status system that integrates with the Safe Talk
 * brand palette while maintaining accessibility and consistency across components.
 */

// Export types
export type {
  StatusType,
  StatusVariant,
  FormValidationState,
  ColorScale,
  StatusIndicatorConfig,
  FormValidationConfig,
  AlertStyleConfig,
  ToastStyleConfig,
  ProgressStyleConfig,
  StatusSystemConfig,
} from './types'

// Export color utilities
export {
  statusColorMappings,
  statusColorOverrides,
  getStatusColorToken,
  getStatusTextColor,
  getStatusLightBg,
  getStatusLightColor,
} from './colors'

// Export configurations
export { statusIndicators } from './indicators'
export { 
  formValidationStates, 
  alertStyles, 
  toastStyles, 
  progressStyles 
} from './styles'

// Export utility functions
export {
  createStatusStyle,
  createFormValidationStyle,
  createAlertStyle,
  createToastStyle,
  createProgressStyle,
  getStatusIcon,
  shouldUseLightText,
  createStatusConfig,
  isValidStatusType,
  getStatusColorSafe,
} from './utils'

// Export commonly used status combinations for convenience
export const commonStatusStyles = {
  // Badge styles
  successBadge: createStatusStyle('success', 'solid'),
  errorBadge: createStatusStyle('error', 'solid'),
  warningBadge: createStatusStyle('warning', 'solid'),
  infoBadge: createStatusStyle('info', 'solid'),
  
  // Subtle badge styles
  successBadgeSubtle: createStatusStyle('success', 'subtle'),
  errorBadgeSubtle: createStatusStyle('error', 'subtle'),
  warningBadgeSubtle: createStatusStyle('warning', 'subtle'),
  infoBadgeSubtle: createStatusStyle('info', 'subtle'),
  
  // Alert styles
  successAlert: createAlertStyle('success'),
  errorAlert: createAlertStyle('error'),
  warningAlert: createAlertStyle('warning'),
  infoAlert: createAlertStyle('info'),
  
  // Form validation styles
  validInput: createFormValidationStyle('valid'),
  invalidInput: createFormValidationStyle('invalid'),
  warningInput: createFormValidationStyle('warning'),
  loadingInput: createFormValidationStyle('loading'),
  
  // Toast styles
  successToast: createToastStyle('success'),
  errorToast: createToastStyle('error'),
  warningToast: createToastStyle('warning'),
  infoToast: createToastStyle('info'),
  loadingToast: createToastStyle('loading'),
  
  // Progress styles
  successProgress: createProgressStyle('success'),
  errorProgress: createProgressStyle('error'),
  warningProgress: createProgressStyle('warning'),
  infoProgress: createProgressStyle('info'),
  defaultProgress: createProgressStyle('default'),
} as const

// Re-export utility functions for backward compatibility
import {
  createStatusStyle,
  createFormValidationStyle,
  createAlertStyle,
  createToastStyle,
  createProgressStyle,
} from './utils'