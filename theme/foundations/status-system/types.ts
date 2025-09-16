/**
 * TypeScript types for the Safe Talk status system
 */

import { SystemStyleObject } from '@chakra-ui/react'

// Base status types
export type StatusType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'pending' | 'active' | 'inactive'
export type StatusVariant = 'solid' | 'subtle' | 'outline'
export type FormValidationState = 'valid' | 'invalid' | 'warning' | 'loading'

// Color scale interface
export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

// Status indicator configuration
export interface StatusIndicatorConfig {
  bg: string
  color: string
  borderColor: string
  icon: string
  iconColor: string
  lightBg: string
  lightColor: string
}

// Form validation style configuration
export interface FormValidationConfig {
  borderColor: string
  focusBorderColor: string
  boxShadow: string
  _focus: {
    borderColor: string
    boxShadow: string
  }
  iconColor: string
  messageColor: string
}

// Alert style configuration
export interface AlertStyleConfig {
  container: SystemStyleObject
  icon: SystemStyleObject
  title: SystemStyleObject
  description: SystemStyleObject
}

// Toast style configuration
export interface ToastStyleConfig extends SystemStyleObject {
  bg: string
  color: string
  borderRadius: string
  boxShadow: string
  fontWeight: string
}

// Progress style configuration
export interface ProgressStyleConfig {
  track: SystemStyleObject
  filledTrack: SystemStyleObject
}

// Status system configuration
export interface StatusSystemConfig {
  indicators: Record<StatusType, StatusIndicatorConfig>
  formValidation: Record<FormValidationState, FormValidationConfig>
  alerts: Record<Exclude<StatusType, 'loading' | 'pending' | 'active' | 'inactive'>, AlertStyleConfig>
  toasts: Record<StatusType, ToastStyleConfig>
  progress: Record<StatusType | 'default', ProgressStyleConfig>
}