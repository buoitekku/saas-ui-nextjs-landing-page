/**
 * Enhanced Badge component theme with Safe Talk brand colors
 * 
 * This theme provides a comprehensive set of badge variants that align with
 * Safe Talk's brand identity and accessibility standards.
 * 
 * Features:
 * - Brand-compliant color schemes
 * - Status indicators with visual dots
 * - Feature highlighting badges
 * - Pricing and promotional badges
 * - Accessibility-focused variants
 * - Hover states and animations
 * - TypeScript support with proper typing
 * 
 * Usage:
 * ```tsx
 * <Badge variant="safe-talk-primary">Primary</Badge>
 * <Badge variant="status-active">Active</Badge>
 * <Badge variant="feature-new">New Feature</Badge>
 * ```
 * 
 * @see {@link BadgeVariant} for available variants
 * @see {@link BadgeSize} for available sizes
 */

import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { badgeHierarchy } from '../foundations/typography-hierarchy'

// Base style for all badges
const baseStyle = defineStyle({
  fontWeight: 'semibold',
  fontSize: 'xs',
  px: 2,
  py: 1,
  borderRadius: 'full',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  transition: 'all 0.2s ease-in-out',
})

// Common style patterns to reduce duplication
const createStatusBadge = (bgColor: string, textColor: string, dotColor: string) => defineStyle({
  bg: bgColor,
  color: textColor,
  fontWeight: 'semibold',
  _before: {
    content: '""',
    width: '6px',
    height: '6px',
    borderRadius: 'full',
    bg: dotColor,
    mr: 1,
  },
})

const createFeatureBadge = (bgColor: string, textColor: string, extraProps = {}) => defineStyle({
  bg: bgColor,
  color: textColor,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  ...extraProps,
})

// Badge variant definitions with improved organization and reduced duplication
const variants = {
  // Safe Talk brand badges - using typography hierarchy
  'safe-talk-primary': defineStyle(badgeHierarchy.primary),
  'safe-talk-secondary': defineStyle(badgeHierarchy.secondary),
  'safe-talk-success': defineStyle(badgeHierarchy.success),
  'safe-talk-info': defineStyle(badgeHierarchy.info),
  'safe-talk-subtle': defineStyle(badgeHierarchy.subtle),
  'safe-talk-outline': defineStyle(badgeHierarchy.outline),
  
  // Status badges with consistent styling
  'status-active': createStatusBadge(
    'safeTalk.limeGreen.400',
    'safeTalk.navy.400',
    'safeTalk.limeGreen.600'
  ),
  'status-pending': createStatusBadge(
    'safeTalk.blue.400',
    'white',
    'safeTalk.blue.600'
  ),
  'status-inactive': createStatusBadge(
    'safeTalk.navy.200',
    'safeTalk.navy.400',
    'safeTalk.navy.400'
  ),
  
  // Feature badges for highlighting key features
  'feature-new': createFeatureBadge(
    'safeTalk.limeGreen.400',
    'safeTalk.navy.400',
    {
      animation: 'pulse 2s infinite',
      _hover: {
        transform: 'scale(1.05)',
      },
    }
  ),
  'feature-popular': createFeatureBadge(
    'safeTalk.turquoise.400',
    'white',
    {
      px: 3,
      boxShadow: '0 2px 4px rgba(58, 181, 178, 0.3)',
      _hover: {
        boxShadow: '0 4px 8px rgba(58, 181, 178, 0.4)',
        transform: 'translateY(-1px)',
      },
    }
  ),
  'feature-premium': createFeatureBadge(
    'safeTalk.purple.400',
    'white',
    {
      position: 'relative',
      _before: {
        content: '"✨"',
        mr: 1,
      },
      _hover: {
        bg: 'safeTalk.purple.500',
      },
    }
  ),
  
  // Pricing badges with enhanced styling
  'pricing-recommended': defineStyle({
    bg: 'safeTalk.turquoise.400',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 'sm',
    px: 4,
    py: 2,
    borderRadius: 'full',
    textTransform: 'none',
    letterSpacing: 'normal',
    boxShadow: 'lg',
    transform: 'translateY(-2px)',
    _hover: {
      bg: 'safeTalk.turquoise.500',
      transform: 'translateY(-3px)',
      boxShadow: 'xl',
    },
  }),
  'pricing-save': defineStyle({
    bg: 'safeTalk.limeGreen.400',
    color: 'safeTalk.navy.400',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    _hover: {
      bg: 'safeTalk.limeGreen.500',
    },
  }),
  
  // Accessibility-focused variants
  'high-contrast': defineStyle({
    bg: 'black',
    color: 'white',
    border: '2px solid white',
    fontWeight: 'bold',
  }),
  'low-vision': defineStyle({
    bg: 'yellow.400',
    color: 'black',
    fontSize: 'md',
    px: 3,
    py: 2,
    fontWeight: 'bold',
  }),
}

const sizes = {
  sm: defineStyle({
    fontSize: '2xs',
    px: 1.5,
    py: 0.5,
  }),
  md: defineStyle({
    fontSize: 'xs',
    px: 2,
    py: 1,
  }),
  lg: defineStyle({
    fontSize: 'sm',
    px: 3,
    py: 1.5,
  }),
}

// TypeScript types for better type safety
export type BadgeVariant = 
  | 'safe-talk-primary'
  | 'safe-talk-secondary' 
  | 'safe-talk-success'
  | 'safe-talk-info'
  | 'safe-talk-subtle'
  | 'safe-talk-outline'
  | 'status-active'
  | 'status-pending'
  | 'status-inactive'
  | 'feature-new'
  | 'feature-popular'
  | 'feature-premium'
  | 'pricing-recommended'
  | 'pricing-save'
  | 'high-contrast'
  | 'low-vision'

export type BadgeSize = 'sm' | 'md' | 'lg'

// Enhanced badge theme configuration
export const badgeTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'safe-talk-primary' as BadgeVariant,
    size: 'md' as BadgeSize,
  },
})

// Utility function for creating custom badge styles
export const createCustomBadgeStyle = (
  bgColor: string,
  textColor: string,
  options: {
    withDot?: boolean
    dotColor?: string
    withIcon?: string
    hover?: Record<string, any>
  } = {}
) => defineStyle({
  bg: bgColor,
  color: textColor,
  fontWeight: 'semibold',
  ...(options.withDot && {
    _before: {
      content: '""',
      width: '6px',
      height: '6px',
      borderRadius: 'full',
      bg: options.dotColor || textColor,
      mr: 1,
    },
  }),
  ...(options.withIcon && {
    _before: {
      content: `"${options.withIcon}"`,
      mr: 1,
    },
  }),
  ...(options.hover && {
    _hover: options.hover,
  }),
})