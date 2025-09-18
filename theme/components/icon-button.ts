/**
 * Enhanced IconButton component theme with Safe Talk focus indicators
 */

import { createIconButtonStyles, focusRingStyles, transitionStyles } from '../foundations/focus-styles'

export default {
  baseStyle: {
    borderRadius: 'md',
    transition: transitionStyles.normal,
    _focus: focusRingStyles.primary,
    _focusVisible: focusRingStyles.primary,
    // Ensure focus ring is visible
    position: 'relative',
    zIndex: 1,
  },
  
  variants: {
    // Primary icon button
    'safe-talk-primary': {
      ...createIconButtonStyles('primary'),
      _focus: {
        ...focusRingStyles.primary,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(58, 181, 178, 0.3)',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(58, 181, 178, 0.3)',
      },
    },
    
    // Secondary icon button
    'safe-talk-secondary': {
      ...createIconButtonStyles('secondary'),
      _focus: {
        ...focusRingStyles.secondary,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(113, 198, 218, 0.3)',
      },
      _focusVisible: {
        ...focusRingStyles.secondary,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(113, 198, 218, 0.3)',
      },
    },
    
    // Subtle icon button (default)
    'safe-talk-subtle': createIconButtonStyles('subtle'),
    
    // Ghost icon button
    'safe-talk-ghost': {
      color: 'safeTalk.turquoise.400',
      bg: 'transparent',
      _hover: {
        color: 'safeTalk.turquoise.600',
        bg: 'safeTalk.turquoise.50',
      },
      _active: {
        color: 'safeTalk.turquoise.700',
        bg: 'safeTalk.turquoise.100',
      },
      _focus: focusRingStyles.primary,
      _focusVisible: focusRingStyles.primary,
      transition: transitionStyles.normal,
    },
    
    // Outline icon button
    'safe-talk-outline': {
      borderWidth: '2px',
      borderColor: 'safeTalk.turquoise.400',
      color: 'safeTalk.turquoise.400',
      bg: 'transparent',
      _hover: {
        bg: 'safeTalk.turquoise.400',
        color: 'white',
      },
      _active: {
        bg: 'safeTalk.turquoise.500',
        borderColor: 'safeTalk.turquoise.500',
      },
      _focus: focusRingStyles.primary,
      _focusVisible: focusRingStyles.primary,
      transition: transitionStyles.normal,
    },
    
    // Navigation icon button
    'nav': {
      color: 'safeTalk.navy.300',
      bg: 'transparent',
      borderRadius: 'md',
      _hover: {
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
      },
      _active: {
        color: 'safeTalk.turquoise.600',
        bg: 'safeTalk.turquoise.100',
      },
      _focus: {
        outline: 'none',
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
        boxShadow: '0 0 0 2px var(--chakra-colors-safeTalk-turquoise-400)',
      },
      _focusVisible: {
        outline: 'none',
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
        boxShadow: '0 0 0 2px var(--chakra-colors-safeTalk-turquoise-400)',
      },
      transition: transitionStyles.normal,
    },
    
    // Mobile menu toggle
    'mobile-menu': {
      color: 'safeTalk.navy.400',
      bg: 'transparent',
      borderRadius: 'md',
      _hover: {
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
      },
      _active: {
        color: 'safeTalk.turquoise.600',
        bg: 'safeTalk.turquoise.100',
      },
      _focus: {
        outline: 'none',
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
        boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3)',
      },
      _focusVisible: {
        outline: 'none',
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
        boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3)',
      },
      transition: transitionStyles.normal,
    },
    
    // Social media icon buttons
    'social': {
      color: 'safeTalk.navy.300',
      bg: 'transparent',
      borderRadius: 'full',
      _hover: {
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
        transform: 'translateY(-1px)',
      },
      _active: {
        color: 'safeTalk.turquoise.600',
        bg: 'safeTalk.turquoise.100',
        transform: 'translateY(0)',
      },
      _focus: {
        ...focusRingStyles.primary,
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        color: 'safeTalk.turquoise.500',
        bg: 'safeTalk.turquoise.50',
      },
      transition: transitionStyles.normal,
    },
    
    // Close button
    'close': {
      color: 'safeTalk.navy.400',
      bg: 'transparent',
      borderRadius: 'md',
      _hover: {
        color: 'safeTalk.limeGreen.600',
        bg: 'safeTalk.limeGreen.50',
      },
      _active: {
        color: 'safeTalk.limeGreen.700',
        bg: 'safeTalk.limeGreen.100',
      },
      _focus: {
        ...focusRingStyles.accent,
        color: 'safeTalk.limeGreen.600',
        bg: 'safeTalk.limeGreen.50',
      },
      _focusVisible: {
        ...focusRingStyles.accent,
        color: 'safeTalk.limeGreen.600',
        bg: 'safeTalk.limeGreen.50',
      },
      transition: transitionStyles.normal,
    },
  },
  
  sizes: {
    xs: {
      w: 6,
      h: 6,
      fontSize: 'xs',
    },
    sm: {
      w: 8,
      h: 8,
      fontSize: 'sm',
    },
    md: {
      w: 10,
      h: 10,
      fontSize: 'md',
    },
    lg: {
      w: 12,
      h: 12,
      fontSize: 'lg',
    },
    xl: {
      w: 14,
      h: 14,
      fontSize: 'xl',
    },
  },
}