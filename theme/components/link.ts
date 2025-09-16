/**
 * Enhanced Link component theme with Safe Talk focus indicators
 */

import { createLinkStyles, focusRingStyles, transitionStyles } from '../foundations/focus-styles'

export default {
  baseStyle: {
    ...createLinkStyles('primary'),
    // Ensure focus ring doesn't interfere with text flow
    borderRadius: 'sm',
    px: 1,
    mx: -1,
    // Better focus visibility for links
    _focus: {
      ...focusRingStyles.primary,
      outline: 'none',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    _focusVisible: {
      ...focusRingStyles.primary,
      outline: 'none',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
  },
  
  variants: {
    // Primary link variant (default)
    primary: createLinkStyles('primary'),
    
    // Secondary link variant
    secondary: createLinkStyles('secondary'),
    
    // Accent link variant
    accent: createLinkStyles('accent'),
    
    // Subtle link variant for less prominent links
    subtle: {
      color: 'safeTalk.navy.300',
      _hover: {
        color: 'safeTalk.turquoise.500',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      },
      _focus: {
        ...focusRingStyles.primary,
        color: 'safeTalk.turquoise.500',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        color: 'safeTalk.turquoise.500',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      },
      transition: transitionStyles.color,
    },
    
    // Navigation link variant
    nav: {
      color: 'safeTalk.navy.300',
      fontWeight: 'medium',
      _hover: {
        color: 'safeTalk.turquoise.500',
        textDecoration: 'none',
      },
      _focus: {
        outline: 'none',
        color: 'safeTalk.turquoise.500',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        textDecorationThickness: '2px',
      },
      _focusVisible: {
        outline: 'none',
        color: 'safeTalk.turquoise.500',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        textDecorationThickness: '2px',
      },
      transition: transitionStyles.color,
    },
    
    // Footer link variant
    footer: {
      color: 'safeTalk.navy.200',
      fontSize: 'sm',
      _hover: {
        color: 'safeTalk.turquoise.400',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      },
      _focus: {
        ...focusRingStyles.primary,
        color: 'safeTalk.turquoise.400',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        color: 'safeTalk.turquoise.400',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      },
      transition: transitionStyles.color,
    },
    
    // External link variant with icon
    external: {
      ...createLinkStyles('primary'),
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      _after: {
        content: '"↗"',
        fontSize: 'sm',
        opacity: 0.7,
      },
      _hover: {
        color: 'safeTalk.turquoise.600',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        _after: {
          opacity: 1,
        },
      },
    },
  },
  
  sizes: {
    xs: {
      fontSize: 'xs',
    },
    sm: {
      fontSize: 'sm',
    },
    md: {
      fontSize: 'md',
    },
    lg: {
      fontSize: 'lg',
    },
    xl: {
      fontSize: 'xl',
    },
  },
}