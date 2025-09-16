/**
 * Status color mappings using Safe Talk brand palette
 * This file maps semantic status colors to the brand palette
 */

import { ColorScale } from './types'

// Import brand colors to avoid duplication
// Note: These should reference the main brand palette
export const statusColorMappings = {
  // Success states - using lime green from brand palette
  success: 'safeTalk.limeGreen',
  
  // Error states - using purple from brand palette for better accessibility
  error: 'safeTalk.purple',
  
  // Warning states - using darker lime green for warnings
  warning: 'safeTalk.limeGreen',
  
  // Info states - using blue from brand palette
  info: 'safeTalk.blue',
  
  // Loading states - using turquoise (primary brand color)
  loading: 'safeTalk.turquoise',
  
  // Pending states - using lighter blue
  pending: 'safeTalk.blue',
  
  // Active states - using turquoise (primary brand color)
  active: 'safeTalk.turquoise',
  
  // Inactive states - using navy for neutral
  inactive: 'safeTalk.navy',
  
  // Neutral states - using navy from brand palette
  neutral: 'safeTalk.navy',
} as const

// Status-specific color overrides (only when different from brand palette)
export const statusColorOverrides: Partial<Record<keyof typeof statusColorMappings, Partial<ColorScale>>> = {
  // Warning uses a slightly different shade than success
  warning: {
    400: '#B0C043', // Darker lime green for better contrast
  },
  
  // Error could use a more accessible red if needed
  // error: {
  //   400: '#DC2626', // Standard red for better accessibility
  //   500: '#B91C1C',
  // },
}

// Utility function to get status color token
export const getStatusColorToken = (
  status: keyof typeof statusColorMappings,
  shade: keyof ColorScale = '400'
): string => {
  const baseColor = statusColorMappings[status]
  return `${baseColor}.${shade}`
}

// Utility function to get contrasting text color for status
export const getStatusTextColor = (status: keyof typeof statusColorMappings): string => {
  switch (status) {
    case 'success':
    case 'warning':
    case 'pending':
    case 'inactive':
      return 'safeTalk.navy.400' // Dark text on light backgrounds
    
    case 'error':
    case 'info':
    case 'loading':
    case 'active':
      return 'white' // Light text on dark backgrounds
    
    default:
      return 'safeTalk.navy.400'
  }
}

// Utility function to get light background color for status
export const getStatusLightBg = (status: keyof typeof statusColorMappings): string => {
  return getStatusColorToken(status, '50')
}

// Utility function to get light text color for status
export const getStatusLightColor = (status: keyof typeof statusColorMappings): string => {
  return getStatusColorToken(status, '700')
}