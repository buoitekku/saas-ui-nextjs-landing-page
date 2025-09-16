/**
 * Style configurations for different status components
 */

import { SystemStyleObject } from '@chakra-ui/react'
import { 
  FormValidationConfig, 
  AlertStyleConfig, 
  ToastStyleConfig, 
  ProgressStyleConfig,
  FormValidationState,
  StatusType 
} from './types'
import { getStatusColorToken, getStatusTextColor, getStatusLightBg, getStatusLightColor } from './colors'

// Form validation states
export const formValidationStates: Record<FormValidationState, FormValidationConfig> = {
  valid: {
    borderColor: getStatusColorToken('success'),
    focusBorderColor: getStatusColorToken('success', '500'),
    boxShadow: `0 0 0 1px var(--chakra-colors-safeTalk-limeGreen-400)`,
    _focus: {
      borderColor: getStatusColorToken('success', '500'),
      boxShadow: '0 0 0 3px rgba(197, 213, 78, 0.3)',
    },
    iconColor: getStatusColorToken('success', '500'),
    messageColor: getStatusLightColor('success'),
  },
  
  invalid: {
    borderColor: getStatusColorToken('error'),
    focusBorderColor: getStatusColorToken('error', '500'),
    boxShadow: `0 0 0 1px var(--chakra-colors-safeTalk-purple-400)`,
    _focus: {
      borderColor: getStatusColorToken('error', '500'),
      boxShadow: '0 0 0 3px rgba(137, 116, 178, 0.3)',
    },
    iconColor: getStatusColorToken('error', '500'),
    messageColor: getStatusLightColor('error'),
  },
  
  warning: {
    borderColor: getStatusColorToken('warning', '500'),
    focusBorderColor: getStatusColorToken('warning', '600'),
    boxShadow: `0 0 0 1px var(--chakra-colors-safeTalk-limeGreen-500)`,
    _focus: {
      borderColor: getStatusColorToken('warning', '600'),
      boxShadow: '0 0 0 3px rgba(176, 192, 67, 0.3)',
    },
    iconColor: getStatusColorToken('warning', '600'),
    messageColor: getStatusLightColor('warning'),
  },
  
  loading: {
    borderColor: getStatusColorToken('loading'),
    focusBorderColor: getStatusColorToken('loading', '500'),
    boxShadow: `0 0 0 1px var(--chakra-colors-safeTalk-turquoise-400)`,
    _focus: {
      borderColor: getStatusColorToken('loading', '500'),
      boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3)',
    },
    iconColor: getStatusColorToken('loading', '500'),
    messageColor: getStatusLightColor('loading'),
  },
}

// Alert component styles
export const alertStyles: Record<Exclude<StatusType, 'loading' | 'pending' | 'active' | 'inactive'>, AlertStyleConfig> = {
  success: {
    container: {
      bg: getStatusLightBg('success'),
      borderColor: getStatusColorToken('success'),
      borderWidth: '1px',
      borderLeftWidth: '4px',
      color: getStatusLightColor('success'),
    },
    icon: {
      color: getStatusColorToken('success', '500'),
    },
    title: {
      color: getStatusLightColor('success'),
      fontWeight: 'semibold',
    },
    description: {
      color: getStatusColorToken('success', '600'),
    },
  },
  
  error: {
    container: {
      bg: getStatusLightBg('error'),
      borderColor: getStatusColorToken('error'),
      borderWidth: '1px',
      borderLeftWidth: '4px',
      color: getStatusLightColor('error'),
    },
    icon: {
      color: getStatusColorToken('error', '500'),
    },
    title: {
      color: getStatusLightColor('error'),
      fontWeight: 'semibold',
    },
    description: {
      color: getStatusColorToken('error', '600'),
    },
  },
  
  warning: {
    container: {
      bg: getStatusColorToken('warning', '100'),
      borderColor: getStatusColorToken('warning', '500'),
      borderWidth: '1px',
      borderLeftWidth: '4px',
      color: getStatusLightColor('warning'),
    },
    icon: {
      color: getStatusColorToken('warning', '600'),
    },
    title: {
      color: getStatusLightColor('warning'),
      fontWeight: 'semibold',
    },
    description: {
      color: getStatusColorToken('warning', '600'),
    },
  },
  
  info: {
    container: {
      bg: getStatusLightBg('info'),
      borderColor: getStatusColorToken('info'),
      borderWidth: '1px',
      borderLeftWidth: '4px',
      color: getStatusLightColor('info'),
    },
    icon: {
      color: getStatusColorToken('info', '500'),
    },
    title: {
      color: getStatusLightColor('info'),
      fontWeight: 'semibold',
    },
    description: {
      color: getStatusColorToken('info', '600'),
    },
  },
}

// Toast notification styles
export const toastStyles: Record<StatusType, ToastStyleConfig> = {
  success: {
    bg: getStatusColorToken('success'),
    color: getStatusTextColor('success'),
    borderRadius: 'md',
    boxShadow: 'lg',
    fontWeight: 'medium',
  },
  
  error: {
    bg: getStatusColorToken('error'),
    color: getStatusTextColor('error'),
    borderRadius: 'md',
    boxShadow: 'lg',
    fontWeight: 'medium',
  },
  
  warning: {
    bg: getStatusColorToken('warning', '500'),
    color: getStatusTextColor('warning'),
    borderRadius: 'md',
    boxShadow: 'lg',
    fontWeight: 'medium',
  },
  
  info: {
    bg: getStatusColorToken('info'),
    color: getStatusTextColor('info'),
    borderRadius: 'md',
    boxShadow: 'lg',
    fontWeight: 'medium',
  },
  
  loading: {
    bg: getStatusColorToken('loading'),
    color: getStatusTextColor('loading'),
    borderRadius: 'md',
    boxShadow: 'lg',
    fontWeight: 'medium',
  },
  
  pending: {
    bg: getStatusColorToken('pending', '300'),
    color: getStatusTextColor('pending'),
    borderRadius: 'md',
    boxShadow: 'lg',
    fontWeight: 'medium',
  },
  
  active: {
    bg: getStatusColorToken('active'),
    color: getStatusTextColor('active'),
    borderRadius: 'md',
    boxShadow: 'lg',
    fontWeight: 'medium',
  },
  
  inactive: {
    bg: getStatusColorToken('inactive', '200'),
    color: getStatusTextColor('inactive'),
    borderRadius: 'md',
    boxShadow: 'lg',
    fontWeight: 'medium',
  },
}

// Progress indicator styles
export const progressStyles: Record<StatusType | 'default', ProgressStyleConfig> = {
  success: {
    track: { bg: getStatusColorToken('success', '100') },
    filledTrack: { bg: getStatusColorToken('success') },
  },
  
  error: {
    track: { bg: getStatusColorToken('error', '100') },
    filledTrack: { bg: getStatusColorToken('error') },
  },
  
  warning: {
    track: { bg: getStatusColorToken('warning', '100') },
    filledTrack: { bg: getStatusColorToken('warning', '500') },
  },
  
  info: {
    track: { bg: getStatusColorToken('info', '100') },
    filledTrack: { bg: getStatusColorToken('info') },
  },
  
  loading: {
    track: { bg: getStatusColorToken('loading', '100') },
    filledTrack: { bg: getStatusColorToken('loading') },
  },
  
  pending: {
    track: { bg: getStatusColorToken('pending', '100') },
    filledTrack: { bg: getStatusColorToken('pending', '300') },
  },
  
  active: {
    track: { bg: getStatusColorToken('active', '100') },
    filledTrack: { bg: getStatusColorToken('active') },
  },
  
  inactive: {
    track: { bg: getStatusColorToken('inactive', '100') },
    filledTrack: { bg: getStatusColorToken('inactive', '200') },
  },
  
  default: {
    track: { bg: getStatusColorToken('loading', '100') },
    filledTrack: { bg: getStatusColorToken('loading') },
  },
}