/**
 * Enhanced List component theme with Safe Talk brand colors
 */

// Note: listAnatomy not available in current Chakra UI version
// Using manual anatomy definition
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { listHierarchy } from '../foundations/typography-hierarchy'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(['container', 'item', 'icon'])

const baseStyle = definePartsStyle({
  container: {
    color: 'safeTalk.navy.300',
    lineHeight: 1.6,
  },
  item: {
    mb: 2,
  },
  icon: {
    color: 'safeTalk.turquoise.400',
    mr: 2,
  },
})

const variants = {
  // Safe Talk unordered list with brand bullet points
  'safe-talk-unordered': definePartsStyle({
    container: {
      ...listHierarchy.unordered,
      listStyleType: 'none',
    },
    item: {
      position: 'relative',
      pl: 6,
      _before: {
        content: '""',
        position: 'absolute',
        left: '0',
        top: '0.6em',
        width: '6px',
        height: '6px',
        borderRadius: 'full',
        bg: 'safeTalk.turquoise.400',
      },
    },
  }),
  
  // Safe Talk ordered list with brand numbering
  'safe-talk-ordered': definePartsStyle({
    container: {
      ...listHierarchy.ordered,
      listStyleType: 'none',
      counterReset: 'safe-talk-counter',
    },
    item: {
      position: 'relative',
      pl: 8,
      counterIncrement: 'safe-talk-counter',
      _before: {
        content: 'counter(safe-talk-counter)',
        position: 'absolute',
        left: '0',
        top: '0',
        width: '24px',
        height: '24px',
        borderRadius: 'full',
        bg: 'safeTalk.turquoise.400',
        color: 'white',
        fontSize: 'xs',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  }),
  
  // Feature list with checkmarks
  'safe-talk-features': definePartsStyle({
    container: {
      listStyleType: 'none',
      spacing: 3,
    },
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 3,
      _before: {
        content: '"✓"',
        flexShrink: 0,
        width: '20px',
        height: '20px',
        borderRadius: 'full',
        bg: 'safeTalk.limeGreen.400',
        color: 'safeTalk.navy.400',
        fontSize: 'sm',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '2px',
      },
    },
  }),
  
  // Step list for processes
  'safe-talk-steps': definePartsStyle({
    container: {
      listStyleType: 'none',
      spacing: 4,
      counterReset: 'step-counter',
    },
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 4,
      counterIncrement: 'step-counter',
      _before: {
        content: 'counter(step-counter)',
        flexShrink: 0,
        width: '32px',
        height: '32px',
        borderRadius: 'full',
        bg: 'safeTalk.blue.400',
        color: 'white',
        fontSize: 'sm',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  }),
  
  // Benefits list with icons
  'safe-talk-benefits': definePartsStyle({
    container: {
      listStyleType: 'none',
      spacing: 3,
    },
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 3,
      _before: {
        content: '"🛡️"',
        flexShrink: 0,
        fontSize: 'lg',
        mt: '2px',
      },
    },
  }),
  
  // Security features list
  'safe-talk-security': definePartsStyle({
    container: {
      listStyleType: 'none',
      spacing: 3,
    },
    item: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 3,
      _before: {
        content: '""',
        flexShrink: 0,
        width: '16px',
        height: '16px',
        borderRadius: 'sm',
        bg: 'safeTalk.turquoise.400',
        mt: '4px',
        position: 'relative',
        _after: {
          content: '"✓"',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
        },
      },
    },
  }),
  
  // Pricing features list
  'safe-talk-pricing': definePartsStyle({
    container: {
      listStyleType: 'none',
      spacing: 2,
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      fontSize: 'sm',
      _before: {
        content: '"✓"',
        color: 'safeTalk.limeGreen.500',
        fontWeight: 'bold',
        fontSize: 'sm',
      },
    },
  }),
  
  // FAQ list
  'safe-talk-faq': definePartsStyle({
    container: {
      listStyleType: 'none',
      spacing: 4,
    },
    item: {
      borderLeft: '3px solid',
      borderLeftColor: 'safeTalk.turquoise.400',
      pl: 4,
      py: 2,
      bg: 'safeTalk.turquoise.50',
      borderRadius: 'md',
      _hover: {
        bg: 'safeTalk.turquoise.100',
        borderLeftColor: 'safeTalk.turquoise.500',
      },
      transition: 'all 0.2s ease-in-out',
    },
  }),
  
  // Navigation list
  'safe-talk-nav': definePartsStyle({
    container: {
      listStyleType: 'none',
      spacing: 1,
    },
    item: {
      borderRadius: 'md',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        bg: 'safeTalk.turquoise.50',
        color: 'safeTalk.turquoise.600',
      },
      _focus: {
        bg: 'safeTalk.turquoise.50',
        color: 'safeTalk.turquoise.600',
        outline: 'none',
        boxShadow: '0 0 0 2px var(--chakra-colors-safeTalk-turquoise-400)',
      },
    },
  }),
  
  // Social links list
  'safe-talk-social': definePartsStyle({
    container: {
      listStyleType: 'none',
      display: 'flex',
      gap: 4,
    },
    item: {
      _hover: {
        transform: 'translateY(-2px)',
      },
      transition: 'transform 0.2s ease-in-out',
    },
  }),
}

const sizes = {
  sm: definePartsStyle({
    container: {
      fontSize: 'sm',
    },
    item: {
      mb: 1,
    },
  }),
  md: definePartsStyle({
    container: {
      fontSize: 'md',
    },
    item: {
      mb: 2,
    },
  }),
  lg: definePartsStyle({
    container: {
      fontSize: 'lg',
    },
    item: {
      mb: 3,
    },
  }),
}

export const listTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'safe-talk-unordered',
    size: 'md',
  },
})