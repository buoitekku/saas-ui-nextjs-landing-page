/**
 * Enhanced Input component theme with Safe Talk focus indicators
 */

// Note: inputAnatomy not available in current Chakra UI version
// Using manual anatomy definition
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { createInputStyles, focusRingStyles, transitionStyles } from '../foundations/focus-styles'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(['field', 'addon', 'element'])

const baseStyle = definePartsStyle({
  field: {
    ...createInputStyles(),
    bg: 'white',
    color: 'safeTalk.navy.400',
    _placeholder: {
      color: 'safeTalk.navy.200',
    },
    _dark: {
      bg: 'safeTalk.navy.800',
      color: 'white',
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
})

const variants = {
  outline: definePartsStyle({
    field: {
      borderColor: 'gray.200',
      _hover: {
        borderColor: 'safeTalk.turquoise.300',
      },
      _focus: {
        ...focusRingStyles.primary,
        borderColor: 'safeTalk.turquoise.400',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        borderColor: 'safeTalk.turquoise.400',
      },
      _invalid: {
        borderColor: 'safeTalk.limeGreen.400',
        _focus: {
          ...focusRingStyles.error,
          borderColor: 'safeTalk.limeGreen.500',
        },
        _focusVisible: {
          ...focusRingStyles.error,
          borderColor: 'safeTalk.limeGreen.500',
        },
      },
    },
  }),
  
  filled: definePartsStyle({
    field: {
      bg: 'safeTalk.turquoise.50',
      borderColor: 'transparent',
      _hover: {
        bg: 'safeTalk.turquoise.100',
      },
      _focus: {
        ...focusRingStyles.primary,
        bg: 'white',
        borderColor: 'safeTalk.turquoise.400',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        bg: 'white',
        borderColor: 'safeTalk.turquoise.400',
      },
      _invalid: {
        bg: 'safeTalk.limeGreen.50',
        _focus: {
          ...focusRingStyles.error,
          bg: 'white',
          borderColor: 'safeTalk.limeGreen.500',
        },
        _focusVisible: {
          ...focusRingStyles.error,
          bg: 'white',
          borderColor: 'safeTalk.limeGreen.500',
        },
      },
    },
  }),
  
  flushed: definePartsStyle({
    field: {
      borderBottomColor: 'gray.200',
      _hover: {
        borderBottomColor: 'safeTalk.turquoise.300',
      },
      _focus: {
        borderBottomColor: 'safeTalk.turquoise.400',
        boxShadow: '0 1px 0 0 var(--chakra-colors-safeTalk-turquoise-400)',
      },
      _focusVisible: {
        borderBottomColor: 'safeTalk.turquoise.400',
        boxShadow: '0 1px 0 0 var(--chakra-colors-safeTalk-turquoise-400)',
      },
      _invalid: {
        borderBottomColor: 'safeTalk.limeGreen.400',
        _focus: {
          borderBottomColor: 'safeTalk.limeGreen.500',
          boxShadow: '0 1px 0 0 var(--chakra-colors-safeTalk-limeGreen-500)',
        },
        _focusVisible: {
          borderBottomColor: 'safeTalk.limeGreen.500',
          boxShadow: '0 1px 0 0 var(--chakra-colors-safeTalk-limeGreen-500)',
        },
      },
    },
  }),
}

const sizes = {
  xs: definePartsStyle({
    field: {
      fontSize: 'xs',
      px: 2,
      py: 1,
      h: 6,
    },
  }),
  sm: definePartsStyle({
    field: {
      fontSize: 'sm',
      px: 3,
      py: 2,
      h: 8,
    },
  }),
  md: definePartsStyle({
    field: {
      fontSize: 'md',
      px: 4,
      py: 2,
      h: 10,
    },
  }),
  lg: definePartsStyle({
    field: {
      fontSize: 'lg',
      px: 4,
      py: 3,
      h: 12,
    },
  }),
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'outline',
    size: 'md',
  },
})