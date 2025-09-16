/**
 * Status indicator configurations
 */

import { StatusIndicatorConfig, StatusType } from './types'
import { getStatusColorToken, getStatusTextColor, getStatusLightBg, getStatusLightColor } from './colors'

// Status icons mapping
const statusIcons: Record<StatusType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
  loading: '⟳',
  pending: '⏳',
  active: '●',
  inactive: '○',
} as const

// Generate status indicators configuration
export const statusIndicators: Record<StatusType, StatusIndicatorConfig> = {
  success: {
    bg: getStatusColorToken('success'),
    color: getStatusTextColor('success'),
    borderColor: getStatusColorToken('success', '500'),
    icon: statusIcons.success,
    iconColor: getStatusTextColor('success'),
    lightBg: getStatusLightBg('success'),
    lightColor: getStatusLightColor('success'),
  },
  
  error: {
    bg: getStatusColorToken('error'),
    color: getStatusTextColor('error'),
    borderColor: getStatusColorToken('error', '500'),
    icon: statusIcons.error,
    iconColor: getStatusTextColor('error'),
    lightBg: getStatusLightBg('error'),
    lightColor: getStatusLightColor('error'),
  },
  
  warning: {
    bg: getStatusColorToken('warning', '500'), // Darker for warnings
    color: getStatusTextColor('warning'),
    borderColor: getStatusColorToken('warning', '600'),
    icon: statusIcons.warning,
    iconColor: getStatusTextColor('warning'),
    lightBg: getStatusColorToken('warning', '100'),
    lightColor: getStatusLightColor('warning'),
  },
  
  info: {
    bg: getStatusColorToken('info'),
    color: getStatusTextColor('info'),
    borderColor: getStatusColorToken('info', '500'),
    icon: statusIcons.info,
    iconColor: getStatusTextColor('info'),
    lightBg: getStatusLightBg('info'),
    lightColor: getStatusLightColor('info'),
  },
  
  loading: {
    bg: getStatusColorToken('loading'),
    color: getStatusTextColor('loading'),
    borderColor: getStatusColorToken('loading', '500'),
    icon: statusIcons.loading,
    iconColor: getStatusTextColor('loading'),
    lightBg: getStatusLightBg('loading'),
    lightColor: getStatusLightColor('loading'),
  },
  
  pending: {
    bg: getStatusColorToken('pending', '300'),
    color: getStatusTextColor('pending'),
    borderColor: getStatusColorToken('pending'),
    icon: statusIcons.pending,
    iconColor: getStatusTextColor('pending'),
    lightBg: getStatusLightBg('pending'),
    lightColor: getStatusColorToken('pending', '600'),
  },
  
  active: {
    bg: getStatusColorToken('active'),
    color: getStatusTextColor('active'),
    borderColor: getStatusColorToken('active', '500'),
    icon: statusIcons.active,
    iconColor: getStatusTextColor('active'),
    lightBg: getStatusLightBg('active'),
    lightColor: getStatusLightColor('active'),
  },
  
  inactive: {
    bg: getStatusColorToken('inactive', '200'),
    color: getStatusTextColor('inactive'),
    borderColor: getStatusColorToken('inactive', '300'),
    icon: statusIcons.inactive,
    iconColor: getStatusTextColor('inactive'),
    lightBg: getStatusLightBg('inactive'),
    lightColor: getStatusColorToken('inactive', '600'),
  },
} as const