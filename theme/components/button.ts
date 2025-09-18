import { mode } from '@chakra-ui/theme-tools'
import { 
  createInteractiveStyles, 
  focusRingStyles, 
  transitionStyles,
  createNavItemStyles 
} from '../foundations/focus-styles'

type Dict = Record<string, any>

export default {
  // Base button styles with enhanced focus indicators
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'md',
    transition: transitionStyles.normal,
    _focus: focusRingStyles.primary,
    _focusVisible: focusRingStyles.primary,
    // Ensure focus ring is visible above other elements
    position: 'relative',
    zIndex: 1,
  },
  
  variants: {
    'nav-link': (props: Dict) => {
      const { isActive } = props
      const navStyles = createNavItemStyles()

      return {
        ...navStyles,
        fontWeight: '500',
        color: isActive
          ? mode('safeTalk.turquoise.500', 'white')(props)
          : mode('safeTalk.navy.300', 'whiteAlpha.700')(props),
        _hover: {
          ...navStyles._hover,
          textDecoration: 'none',
        },
        _focus: {
          ...navStyles._focus,
          outline: 'none',
        },
        _focusVisible: {
          ...navStyles._focusVisible,
          outline: 'none',
        },
      }
    },
    
    // Enhanced Safe Talk button variants with proper focus indicators
    'safe-talk-primary': {
      bg: 'safeTalk.turquoise.400',
      color: 'white',
      ...createInteractiveStyles('primary'),
      _focus: {
        ...focusRingStyles.primary,
        // Ensure focus ring is visible on colored backgrounds
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(58, 181, 178, 0.3)',
      },
      _focusVisible: {
        ...focusRingStyles.primary,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(58, 181, 178, 0.3)',
      },
    },
    
    'safe-talk-secondary': {
      bg: 'safeTalk.blue.400',
      color: 'white',
      ...createInteractiveStyles('secondary'),
      _focus: {
        ...focusRingStyles.secondary,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(113, 198, 218, 0.3)',
      },
      _focusVisible: {
        ...focusRingStyles.secondary,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(113, 198, 218, 0.3)',
      },
    },
    
    'safe-talk-accent': {
      bg: 'safeTalk.limeGreen.400',
      color: 'safeTalk.navy.400',
      ...createInteractiveStyles('accent'),
      _focus: {
        ...focusRingStyles.accent,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(197, 213, 78, 0.3)',
      },
      _focusVisible: {
        ...focusRingStyles.accent,
        boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.8), 0 0 0 6px rgba(197, 213, 78, 0.3)',
      },
    },
    
    'safe-talk-outline': {
      borderWidth: '2px',
      borderColor: 'safeTalk.turquoise.400',
      color: 'safeTalk.turquoise.400',
      bg: 'transparent',
      _hover: {
        bg: 'safeTalk.turquoise.400',
        color: 'white',
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _active: {
        bg: 'safeTalk.turquoise.500',
        borderColor: 'safeTalk.turquoise.500',
        transform: 'translateY(0)',
        boxShadow: 'sm',
      },
      _focus: focusRingStyles.primary,
      _focusVisible: focusRingStyles.primary,
      transition: transitionStyles.normal,
    },
    
    'safe-talk-ghost': {
      color: 'safeTalk.turquoise.400',
      bg: 'transparent',
      _hover: {
        bg: 'safeTalk.turquoise.50',
        color: 'safeTalk.turquoise.600',
      },
      _active: {
        bg: 'safeTalk.turquoise.100',
        color: 'safeTalk.turquoise.700',
      },
      _focus: focusRingStyles.primary,
      _focusVisible: focusRingStyles.primary,
      transition: transitionStyles.normal,
    },
    
    'safe-talk-subtle': {
      ...createInteractiveStyles('subtle'),
      bg: 'safeTalk.turquoise.50',
      color: 'safeTalk.turquoise.600',
      _focus: focusRingStyles.primary,
      _focusVisible: focusRingStyles.primary,
    },
  },
  
  // Size variants with consistent focus ring scaling
  sizes: {
    xs: {
      fontSize: 'xs',
      px: 2,
      py: 1,
      minH: 6,
    },
    sm: {
      fontSize: 'sm',
      px: 3,
      py: 2,
      minH: 8,
    },
    md: {
      fontSize: 'md',
      px: 4,
      py: 2,
      minH: 10,
    },
    lg: {
      fontSize: 'lg',
      px: 6,
      py: 3,
      minH: 12,
    },
    xl: {
      fontSize: 'xl',
      px: 8,
      py: 4,
      minH: 14,
    },
  },
}
