/**
 * Enhanced Progress component theme with Safe Talk status colors
 */

// Note: progressAnatomy not available in current Chakra UI version
// Using manual anatomy definition
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { progressStyles } from '../foundations/status-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(['track', 'filledTrack', 'label'])

const baseStyle = definePartsStyle({
  track: {
    borderRadius: 'full',
    overflow: 'hidden',
  },
  filledTrack: {
    borderRadius: 'full',
    transition: 'all 0.3s ease-in-out',
  },
  label: {
    fontSize: 'sm',
    fontWeight: 'medium',
    color: 'safeTalk.navy.400',
    mb: 2,
  },
})

const variants = {
  // Safe Talk success progress
  'safe-talk-success': definePartsStyle({
    track: progressStyles.success.track,
    filledTrack: progressStyles.success.filledTrack,
    label: {
      color: 'safeTalk.limeGreen.700',
    },
  }),
  
  // Safe Talk error progress
  'safe-talk-error': definePartsStyle({
    track: progressStyles.error.track,
    filledTrack: progressStyles.error.filledTrack,
    label: {
      color: 'safeTalk.purple.700',
    },
  }),
  
  // Safe Talk warning progress
  'safe-talk-warning': definePartsStyle({
    track: progressStyles.warning.track,
    filledTrack: progressStyles.warning.filledTrack,
    label: {
      color: 'safeTalk.limeGreen.700',
    },
  }),
  
  // Safe Talk info progress
  'safe-talk-info': definePartsStyle({
    track: progressStyles.info.track,
    filledTrack: progressStyles.info.filledTrack,
    label: {
      color: 'safeTalk.blue.700',
    },
  }),
  
  // Safe Talk default progress
  'safe-talk-default': definePartsStyle({
    track: progressStyles.default.track,
    filledTrack: progressStyles.default.filledTrack,
    label: {
      color: 'safeTalk.turquoise.700',
    },
  }),
  
  // Striped variants for loading states
  'striped-success': definePartsStyle({
    track: progressStyles.success.track,
    filledTrack: {
      ...progressStyles.success.filledTrack,
      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
      backgroundSize: '1rem 1rem',
      animation: 'progress-stripes 1s linear infinite',
    },
  }),
  
  'striped-error': definePartsStyle({
    track: progressStyles.error.track,
    filledTrack: {
      ...progressStyles.error.filledTrack,
      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
      backgroundSize: '1rem 1rem',
      animation: 'progress-stripes 1s linear infinite',
    },
  }),
  
  'striped-warning': definePartsStyle({
    track: progressStyles.warning.track,
    filledTrack: {
      ...progressStyles.warning.filledTrack,
      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
      backgroundSize: '1rem 1rem',
      animation: 'progress-stripes 1s linear infinite',
    },
  }),
  
  'striped-info': definePartsStyle({
    track: progressStyles.info.track,
    filledTrack: {
      ...progressStyles.info.filledTrack,
      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
      backgroundSize: '1rem 1rem',
      animation: 'progress-stripes 1s linear infinite',
    },
  }),
  
  'striped-default': definePartsStyle({
    track: progressStyles.default.track,
    filledTrack: {
      ...progressStyles.default.filledTrack,
      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
      backgroundSize: '1rem 1rem',
      animation: 'progress-stripes 1s linear infinite',
    },
  }),
  
  // Gradient variants for enhanced visual appeal
  'gradient-success': definePartsStyle({
    track: progressStyles.success.track,
    filledTrack: {
      bgGradient: 'linear(to-r, safeTalk.limeGreen.400, safeTalk.limeGreen.500)',
    },
  }),
  
  'gradient-error': definePartsStyle({
    track: progressStyles.error.track,
    filledTrack: {
      bgGradient: 'linear(to-r, safeTalk.purple.400, safeTalk.purple.500)',
    },
  }),
  
  'gradient-warning': definePartsStyle({
    track: progressStyles.warning.track,
    filledTrack: {
      bgGradient: 'linear(to-r, safeTalk.limeGreen.500, safeTalk.limeGreen.600)',
    },
  }),
  
  'gradient-info': definePartsStyle({
    track: progressStyles.info.track,
    filledTrack: {
      bgGradient: 'linear(to-r, safeTalk.blue.400, safeTalk.blue.500)',
    },
  }),
  
  'gradient-default': definePartsStyle({
    track: progressStyles.default.track,
    filledTrack: {
      bgGradient: 'linear(to-r, safeTalk.turquoise.400, safeTalk.turquoise.500)',
    },
  }),
  
  // Security scan progress (special for Safe Talk)
  'security-scan': definePartsStyle({
    track: {
      bg: 'safeTalk.navy.100',
      borderRadius: 'full',
      overflow: 'hidden',
    },
    filledTrack: {
      bgGradient: 'linear(to-r, safeTalk.turquoise.400, safeTalk.blue.400)',
      borderRadius: 'full',
      position: 'relative',
      _after: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: 'linear(to-r, transparent, rgba(255,255,255,0.3), transparent)',
        animation: 'shimmer 2s infinite',
      },
    },
    label: {
      color: 'safeTalk.navy.600',
      fontWeight: 'semibold',
    },
  }),
}

const sizes = {
  xs: definePartsStyle({
    track: {
      h: 1,
    },
    label: {
      fontSize: 'xs',
    },
  }),
  
  sm: definePartsStyle({
    track: {
      h: 2,
    },
    label: {
      fontSize: 'sm',
    },
  }),
  
  md: definePartsStyle({
    track: {
      h: 3,
    },
    label: {
      fontSize: 'md',
    },
  }),
  
  lg: definePartsStyle({
    track: {
      h: 4,
    },
    label: {
      fontSize: 'lg',
    },
  }),
}

export const progressTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'safe-talk-default',
    size: 'md',
  },
})