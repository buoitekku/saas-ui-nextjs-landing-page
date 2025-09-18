/**
 * Enhanced Card component theme with Safe Talk interactive states
 */

// Note: cardAnatomy not available in current Chakra UI version
// Using manual anatomy definition
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { createCardStyles, focusRingStyles, transitionStyles } from '../foundations/focus-styles'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(['container', 'header', 'body', 'footer'])

const baseStyle = definePartsStyle({
  container: {
    bg: 'white',
    borderRadius: 'lg',
    borderWidth: '1px',
    borderColor: 'gray.200',
    boxShadow: 'sm',
    transition: transitionStyles.normal,
    _dark: {
      bg: 'safeTalk.navy.800',
      borderColor: 'safeTalk.navy.600',
    },
  },
  header: {
    px: 6,
    py: 4,
  },
  body: {
    px: 6,
    py: 4,
  },
  footer: {
    px: 6,
    py: 4,
  },
})

const variants = {
  // Default card variant
  outline: definePartsStyle({
    container: {
      borderWidth: '1px',
      borderColor: 'gray.200',
      _dark: {
        borderColor: 'safeTalk.navy.600',
      },
    },
  }),
  
  // Interactive card variant
  interactive: definePartsStyle({
    container: {
      ...createCardStyles(),
      borderWidth: '1px',
      borderColor: 'gray.200',
      cursor: 'pointer',
      // Enhanced focus styles for cards
      _focus: {
        ...focusRingStyles.primary,
        transform: 'translateY(-2px)',
        boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3), 0 8px 25px -5px rgba(0, 0, 0, 0.1)',
        borderColor: 'safeTalk.turquoise.300',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        transform: 'translateY(-2px)',
        boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3), 0 8px 25px -5px rgba(0, 0, 0, 0.1)',
        borderColor: 'safeTalk.turquoise.300',
      },
      _dark: {
        borderColor: 'safeTalk.navy.600',
        _hover: {
          borderColor: 'safeTalk.turquoise.400',
        },
        _focus: {
          ...focusRingStyles.primary,
          borderColor: 'safeTalk.turquoise.400',
        },
        _focusVisible: {
          ...focusRingStyles.primary,
          borderColor: 'safeTalk.turquoise.400',
        },
      },
    },
  }),
  
  // Elevated card variant
  elevated: definePartsStyle({
    container: {
      boxShadow: 'md',
      borderWidth: '0',
      _hover: {
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      },
      _focus: {
        ...focusRingStyles.primary,
        transform: 'translateY(-4px)',
        boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        transform: 'translateY(-4px)',
        boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      transition: transitionStyles.normal,
    },
  }),
  
  // Feature card variant with brand colors
  feature: definePartsStyle({
    container: {
      bg: 'safeTalk.turquoise.50',
      borderWidth: '1px',
      borderColor: 'safeTalk.turquoise.200',
      _hover: {
        bg: 'safeTalk.turquoise.100',
        borderColor: 'safeTalk.turquoise.300',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      },
      _focus: {
        ...focusRingStyles.primary,
        bg: 'safeTalk.turquoise.100',
        borderColor: 'safeTalk.turquoise.400',
        transform: 'translateY(-2px)',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        bg: 'safeTalk.turquoise.100',
        borderColor: 'safeTalk.turquoise.400',
        transform: 'translateY(-2px)',
      },
      transition: transitionStyles.normal,
      cursor: 'pointer',
    },
  }),
  
  // Testimonial card variant
  testimonial: definePartsStyle({
    container: {
      bg: 'white',
      borderWidth: '1px',
      borderColor: 'safeTalk.blue.200',
      borderLeftWidth: '4px',
      borderLeftColor: 'safeTalk.blue.400',
      _hover: {
        borderLeftColor: 'safeTalk.turquoise.400',
        borderColor: 'safeTalk.turquoise.200',
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _focus: {
        ...focusRingStyles.primary,
        borderLeftColor: 'safeTalk.turquoise.500',
        borderColor: 'safeTalk.turquoise.300',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        borderLeftColor: 'safeTalk.turquoise.500',
        borderColor: 'safeTalk.turquoise.300',
      },
      transition: transitionStyles.normal,
    },
  }),
  
  // Pricing card variant
  pricing: definePartsStyle({
    container: {
      bg: 'white',
      borderWidth: '2px',
      borderColor: 'gray.200',
      position: 'relative',
      _hover: {
        borderColor: 'safeTalk.turquoise.300',
        transform: 'scale(1.02)',
        boxShadow: 'xl',
      },
      _focus: {
        ...focusRingStyles.primary,
        borderColor: 'safeTalk.turquoise.400',
        transform: 'scale(1.02)',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        borderColor: 'safeTalk.turquoise.400',
        transform: 'scale(1.02)',
      },
      transition: transitionStyles.normal,
      cursor: 'pointer',
    },
  }),
  
  // Popular pricing card variant
  'pricing-popular': definePartsStyle({
    container: {
      bg: 'safeTalk.turquoise.50',
      borderWidth: '2px',
      borderColor: 'safeTalk.turquoise.400',
      position: 'relative',
      _before: {
        content: '"Most Popular"',
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        bg: 'safeTalk.turquoise.400',
        color: 'white',
        px: 3,
        py: 1,
        borderRadius: 'full',
        fontSize: 'sm',
        fontWeight: 'semibold',
      },
      _hover: {
        borderColor: 'safeTalk.turquoise.500',
        transform: 'scale(1.02)',
        boxShadow: 'xl',
        bg: 'safeTalk.turquoise.100',
      },
      _focus: {
        ...focusRingStyles.primary,
        borderColor: 'safeTalk.turquoise.600',
        transform: 'scale(1.02)',
        bg: 'safeTalk.turquoise.100',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        borderColor: 'safeTalk.turquoise.600',
        transform: 'scale(1.02)',
        bg: 'safeTalk.turquoise.100',
      },
      transition: transitionStyles.normal,
      cursor: 'pointer',
    },
  }),
}

const sizes = {
  sm: definePartsStyle({
    container: {
      borderRadius: 'md',
    },
    header: {
      px: 4,
      py: 3,
    },
    body: {
      px: 4,
      py: 3,
    },
    footer: {
      px: 4,
      py: 3,
    },
  }),
  md: definePartsStyle({
    container: {
      borderRadius: 'lg',
    },
    header: {
      px: 6,
      py: 4,
    },
    body: {
      px: 6,
      py: 4,
    },
    footer: {
      px: 6,
      py: 4,
    },
  }),
  lg: definePartsStyle({
    container: {
      borderRadius: 'xl',
    },
    header: {
      px: 8,
      py: 6,
    },
    body: {
      px: 8,
      py: 6,
    },
    footer: {
      px: 8,
      py: 6,
    },
  }),
}

export const cardTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'outline',
    size: 'md',
  },
})