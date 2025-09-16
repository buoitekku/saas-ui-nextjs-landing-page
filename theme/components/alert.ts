/**
 * Enhanced Alert component theme with Safe Talk status colors
 */

// Note: alertAnatomy not available in current Chakra UI version
// Using manual anatomy definition
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { alertStyles } from '../foundations/status-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(['container', 'title', 'description', 'icon', 'spinner'])

const baseStyle = definePartsStyle({
  container: {
    borderRadius: 'md',
    px: 4,
    py: 3,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 3,
    position: 'relative',
  },
  icon: {
    flexShrink: 0,
    mt: 0.5,
    fontSize: 'lg',
  },
  title: {
    fontWeight: 'semibold',
    fontSize: 'md',
    lineHeight: 'short',
    mb: 1,
  },
  description: {
    fontSize: 'sm',
    lineHeight: 'base',
  },
  spinner: {
    flexShrink: 0,
    mt: 0.5,
  },
})

const variants = {
  // Safe Talk success alert
  'safe-talk-success': definePartsStyle({
    container: alertStyles.success.container,
    icon: alertStyles.success.icon,
    title: alertStyles.success.title,
    description: alertStyles.success.description,
  }),
  
  // Safe Talk error alert
  'safe-talk-error': definePartsStyle({
    container: alertStyles.error.container,
    icon: alertStyles.error.icon,
    title: alertStyles.error.title,
    description: alertStyles.error.description,
  }),
  
  // Safe Talk warning alert
  'safe-talk-warning': definePartsStyle({
    container: alertStyles.warning.container,
    icon: alertStyles.warning.icon,
    title: alertStyles.warning.title,
    description: alertStyles.warning.description,
  }),
  
  // Safe Talk info alert
  'safe-talk-info': definePartsStyle({
    container: alertStyles.info.container,
    icon: alertStyles.info.icon,
    title: alertStyles.info.title,
    description: alertStyles.info.description,
  }),
  
  // Solid variants for high emphasis
  'solid-success': definePartsStyle({
    container: {
      bg: 'safeTalk.limeGreen.400',
      color: 'safeTalk.navy.400',
      borderRadius: 'md',
    },
    icon: {
      color: 'safeTalk.navy.400',
    },
    title: {
      color: 'safeTalk.navy.400',
      fontWeight: 'bold',
    },
    description: {
      color: 'safeTalk.navy.400',
    },
  }),
  
  'solid-error': definePartsStyle({
    container: {
      bg: 'safeTalk.purple.400',
      color: 'white',
      borderRadius: 'md',
    },
    icon: {
      color: 'white',
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
    },
    description: {
      color: 'white',
    },
  }),
  
  'solid-warning': definePartsStyle({
    container: {
      bg: 'safeTalk.limeGreen.500',
      color: 'safeTalk.navy.400',
      borderRadius: 'md',
    },
    icon: {
      color: 'safeTalk.navy.400',
    },
    title: {
      color: 'safeTalk.navy.400',
      fontWeight: 'bold',
    },
    description: {
      color: 'safeTalk.navy.400',
    },
  }),
  
  'solid-info': definePartsStyle({
    container: {
      bg: 'safeTalk.blue.400',
      color: 'white',
      borderRadius: 'md',
    },
    icon: {
      color: 'white',
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
    },
    description: {
      color: 'white',
    },
  }),
  
  // Outline variants for subtle emphasis
  'outline-success': definePartsStyle({
    container: {
      bg: 'transparent',
      borderWidth: '1px',
      borderColor: 'safeTalk.limeGreen.400',
      color: 'safeTalk.limeGreen.700',
    },
    icon: {
      color: 'safeTalk.limeGreen.500',
    },
    title: {
      color: 'safeTalk.limeGreen.700',
    },
    description: {
      color: 'safeTalk.limeGreen.600',
    },
  }),
  
  'outline-error': definePartsStyle({
    container: {
      bg: 'transparent',
      borderWidth: '1px',
      borderColor: 'safeTalk.purple.400',
      color: 'safeTalk.purple.700',
    },
    icon: {
      color: 'safeTalk.purple.500',
    },
    title: {
      color: 'safeTalk.purple.700',
    },
    description: {
      color: 'safeTalk.purple.600',
    },
  }),
  
  'outline-warning': definePartsStyle({
    container: {
      bg: 'transparent',
      borderWidth: '1px',
      borderColor: 'safeTalk.limeGreen.500',
      color: 'safeTalk.limeGreen.700',
    },
    icon: {
      color: 'safeTalk.limeGreen.600',
    },
    title: {
      color: 'safeTalk.limeGreen.700',
    },
    description: {
      color: 'safeTalk.limeGreen.600',
    },
  }),
  
  'outline-info': definePartsStyle({
    container: {
      bg: 'transparent',
      borderWidth: '1px',
      borderColor: 'safeTalk.blue.400',
      color: 'safeTalk.blue.700',
    },
    icon: {
      color: 'safeTalk.blue.500',
    },
    title: {
      color: 'safeTalk.blue.700',
    },
    description: {
      color: 'safeTalk.blue.600',
    },
  }),
  
  // Loading alert variant
  'safe-talk-loading': definePartsStyle({
    container: {
      bg: 'safeTalk.turquoise.50',
      borderColor: 'safeTalk.turquoise.400',
      borderWidth: '1px',
      borderLeftWidth: '4px',
      color: 'safeTalk.turquoise.700',
    },
    icon: {
      color: 'safeTalk.turquoise.500',
    },
    spinner: {
      color: 'safeTalk.turquoise.500',
    },
    title: {
      color: 'safeTalk.turquoise.700',
      fontWeight: 'semibold',
    },
    description: {
      color: 'safeTalk.turquoise.600',
    },
  }),
  
  // Security alert variant (special for Safe Talk)
  'safe-talk-security': definePartsStyle({
    container: {
      bg: 'safeTalk.navy.50',
      borderColor: 'safeTalk.navy.400',
      borderWidth: '1px',
      borderLeftWidth: '4px',
      color: 'safeTalk.navy.700',
      position: 'relative',
      _before: {
        content: '"🛡️"',
        position: 'absolute',
        top: 3,
        right: 3,
        fontSize: 'lg',
        opacity: 0.7,
      },
    },
    icon: {
      color: 'safeTalk.navy.500',
    },
    title: {
      color: 'safeTalk.navy.700',
      fontWeight: 'bold',
    },
    description: {
      color: 'safeTalk.navy.600',
    },
  }),
  
  // Scam alert variant (high priority for Safe Talk)
  'safe-talk-scam': definePartsStyle({
    container: {
      bg: 'safeTalk.purple.100',
      borderColor: 'safeTalk.purple.500',
      borderWidth: '2px',
      borderLeftWidth: '6px',
      color: 'safeTalk.purple.800',
      boxShadow: 'md',
      animation: 'pulse 2s infinite',
    },
    icon: {
      color: 'safeTalk.purple.600',
      fontSize: 'xl',
    },
    title: {
      color: 'safeTalk.purple.800',
      fontWeight: 'bold',
      fontSize: 'lg',
    },
    description: {
      color: 'safeTalk.purple.700',
      fontWeight: 'medium',
    },
  }),
}

const sizes = {
  sm: definePartsStyle({
    container: {
      px: 3,
      py: 2,
    },
    icon: {
      fontSize: 'md',
    },
    title: {
      fontSize: 'sm',
    },
    description: {
      fontSize: 'xs',
    },
  }),
  
  md: definePartsStyle({
    container: {
      px: 4,
      py: 3,
    },
    icon: {
      fontSize: 'lg',
    },
    title: {
      fontSize: 'md',
    },
    description: {
      fontSize: 'sm',
    },
  }),
  
  lg: definePartsStyle({
    container: {
      px: 6,
      py: 4,
    },
    icon: {
      fontSize: 'xl',
    },
    title: {
      fontSize: 'lg',
    },
    description: {
      fontSize: 'md',
    },
  }),
}

export const alertTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'safe-talk-info',
    size: 'md',
  },
})