/**
 * Safe Talk Typography Hierarchy System
 * Provides consistent visual hierarchy using brand colors and typography scales
 * 
 * @example
 * ```tsx
 * import { createHeadingStyle, commonTypographyStyles } from '#theme/foundations/typography-hierarchy'
 * 
 * // Use predefined styles
 * <Heading sx={commonTypographyStyles.heroHeading}>Main Title</Heading>
 * 
 * // Create custom styles
 * <Text sx={createBodyTextStyle('large')}>Large body text</Text>
 * ```
 */

import { SystemStyleObject } from '@chakra-ui/react'

// Type definitions for better type safety
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type BodyTextVariant = 'large' | 'regular' | 'small' | 'caption' | 'lead'
export type LinkVariant = 'primary' | 'secondary' | 'subtle' | 'external'
export type ListVariant = 'unordered' | 'ordered' | 'features' | 'steps'
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'info' | 'subtle' | 'outline'
export type StatusVariant = 'active' | 'pending' | 'inactive' | 'warning' | 'error'

// Typography hierarchy levels with Safe Talk brand colors
export const typographyHierarchy: Record<HeadingLevel, SystemStyleObject> = {
  // Primary headings - highest importance
  h1: {
    fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
    fontWeight: 'bold',
    fontFamily: 'Gabarito',
    color: 'safeTalk.navy.400',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    mb: 6,
  },
  
  // Secondary headings - section titles
  h2: {
    fontSize: { base: 'xl', md: '2xl', lg: '3xl' },
    fontWeight: 'bold',
    fontFamily: 'Gabarito',
    color: 'safeTalk.navy.400',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    mb: 4,
  },
  
  // Tertiary headings - subsection titles
  h3: {
    fontSize: { base: 'lg', md: 'xl', lg: '2xl' },
    fontWeight: 'bold',
    fontFamily: 'Gabarito',
    color: 'safeTalk.turquoise.500',
    lineHeight: 1.4,
    mb: 3,
  },
  
  // Quaternary headings - component titles
  h4: {
    fontSize: { base: 'md', md: 'lg', lg: 'xl' },
    fontWeight: 'semibold',
    fontFamily: 'Gabarito',
    color: 'safeTalk.turquoise.600',
    lineHeight: 1.4,
    mb: 2,
  },
  
  // Small headings - card titles, labels
  h5: {
    fontSize: { base: 'sm', md: 'md', lg: 'lg' },
    fontWeight: 'semibold',
    fontFamily: 'Gabarito',
    color: 'safeTalk.blue.500',
    lineHeight: 1.5,
    mb: 2,
  },
  
  // Micro headings - form labels, captions
  h6: {
    fontSize: { base: 'xs', md: 'sm', lg: 'md' },
    fontWeight: 'medium',
    fontFamily: 'Gabarito',
    color: 'safeTalk.navy.300',
    lineHeight: 1.5,
    mb: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
} as const;

// Body text hierarchy
export const bodyTextHierarchy: Record<BodyTextVariant, SystemStyleObject> = {
  // Large body text - hero descriptions, important content
  large: {
    fontSize: { base: 'lg', md: 'xl' },
    fontWeight: 'normal',
    color: 'safeTalk.navy.300',
    lineHeight: 1.6,
    mb: 4,
  },
  
  // Regular body text - main content
  regular: {
    fontSize: { base: 'md', md: 'lg' },
    fontWeight: 'normal',
    color: 'safeTalk.navy.300',
    lineHeight: 1.6,
    mb: 3,
  },
  
  // Small body text - secondary content
  small: {
    fontSize: { base: 'sm', md: 'md' },
    fontWeight: 'normal',
    color: 'safeTalk.navy.200',
    lineHeight: 1.5,
    mb: 2,
  },
  
  // Caption text - disclaimers, fine print
  caption: {
    fontSize: { base: 'xs', md: 'sm' },
    fontWeight: 'normal',
    color: 'safeTalk.navy.200',
    lineHeight: 1.4,
    mb: 1,
  },
  
  // Lead text - introductory paragraphs
  lead: {
    fontSize: { base: 'xl', md: '2xl' },
    fontWeight: 'normal',
    color: 'safeTalk.navy.400',
    lineHeight: 1.5,
    mb: 6,
  },
} as const;

// Link hierarchy with Safe Talk colors
export const linkHierarchy: Record<LinkVariant, SystemStyleObject> = {
  // Primary links - main navigation, important actions
  primary: {
    color: 'safeTalk.turquoise.400',
    fontWeight: 'medium',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      color: 'safeTalk.turquoise.600',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    _focus: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3)',
      borderRadius: 'sm',
    },
  },
  
  // Secondary links - supporting navigation
  secondary: {
    color: 'safeTalk.blue.400',
    fontWeight: 'normal',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      color: 'safeTalk.blue.600',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    _focus: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(113, 198, 218, 0.3)',
      borderRadius: 'sm',
    },
  },
  
  // Subtle links - footer, less important
  subtle: {
    color: 'safeTalk.navy.300',
    fontWeight: 'normal',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      color: 'safeTalk.turquoise.500',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    _focus: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3)',
      borderRadius: 'sm',
    },
  },
  
  // External links - with icon indicator
  external: {
    color: 'safeTalk.turquoise.400',
    fontWeight: 'medium',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    transition: 'all 0.2s ease-in-out',
    _hover: {
      color: 'safeTalk.turquoise.600',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    _focus: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(58, 181, 178, 0.3)',
      borderRadius: 'sm',
    },
    _after: {
      content: '"↗"',
      fontSize: 'sm',
      opacity: 0.7,
    },
  },
} as const;

// List styles with Safe Talk brand colors
export const listHierarchy: Record<ListVariant, SystemStyleObject> = {
  // Unordered lists with brand bullet points
  unordered: {
    pl: 6,
    spacing: 2,
    '& li': {
      position: 'relative',
      color: 'safeTalk.navy.300',
      lineHeight: 1.6,
      _before: {
        content: '""',
        position: 'absolute',
        left: '-20px',
        top: '0.6em',
        width: '6px',
        height: '6px',
        borderRadius: 'full',
        bg: 'safeTalk.turquoise.400',
      },
    },
  },
  
  // Ordered lists with brand numbering
  ordered: {
    pl: 6,
    spacing: 2,
    counterReset: 'safe-talk-counter',
    '& li': {
      position: 'relative',
      color: 'safeTalk.navy.300',
      lineHeight: 1.6,
      counterIncrement: 'safe-talk-counter',
      _before: {
        content: 'counter(safe-talk-counter)',
        position: 'absolute',
        left: '-24px',
        top: '0',
        width: '20px',
        height: '20px',
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
  },
  
  // Feature lists - for highlighting key points
  features: {
    spacing: 3,
    '& li': {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 3,
      color: 'safeTalk.navy.300',
      lineHeight: 1.6,
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
  },
  
  // Step lists - for processes and instructions
  steps: {
    spacing: 4,
    counterReset: 'step-counter',
    '& li': {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 4,
      color: 'safeTalk.navy.300',
      lineHeight: 1.6,
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
  },
} as const;

// Badge and label hierarchy
export const badgeHierarchy: Record<BadgeVariant, SystemStyleObject> = {
  // Primary badges - important status
  primary: {
    bg: 'safeTalk.turquoise.400',
    color: 'white',
    fontWeight: 'semibold',
    fontSize: 'xs',
    px: 2,
    py: 1,
    borderRadius: 'full',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  
  // Secondary badges - supporting information
  secondary: {
    bg: 'safeTalk.blue.400',
    color: 'white',
    fontWeight: 'semibold',
    fontSize: 'xs',
    px: 2,
    py: 1,
    borderRadius: 'full',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  
  // Success badges - positive status
  success: {
    bg: 'safeTalk.limeGreen.400',
    color: 'safeTalk.navy.400',
    fontWeight: 'semibold',
    fontSize: 'xs',
    px: 2,
    py: 1,
    borderRadius: 'full',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  
  // Info badges - neutral information
  info: {
    bg: 'safeTalk.blue.100',
    color: 'safeTalk.blue.600',
    fontWeight: 'medium',
    fontSize: 'xs',
    px: 2,
    py: 1,
    borderRadius: 'full',
  },
  
  // Subtle badges - low emphasis
  subtle: {
    bg: 'safeTalk.turquoise.50',
    color: 'safeTalk.turquoise.600',
    fontWeight: 'medium',
    fontSize: 'xs',
    px: 2,
    py: 1,
    borderRadius: 'full',
  },
  
  // Outline badges - minimal style
  outline: {
    bg: 'transparent',
    color: 'safeTalk.turquoise.500',
    fontWeight: 'medium',
    fontSize: 'xs',
    px: 2,
    py: 1,
    borderRadius: 'full',
    borderWidth: '1px',
    borderColor: 'safeTalk.turquoise.400',
  },
} as const;

// Status indicator colors
export const statusColors: Record<StatusVariant, { bg: string; color: string; icon: string }> = {
  active: {
    bg: 'safeTalk.limeGreen.400',
    color: 'safeTalk.navy.400',
    icon: 'safeTalk.limeGreen.500',
  },
  pending: {
    bg: 'safeTalk.blue.400',
    color: 'white',
    icon: 'safeTalk.blue.500',
  },
  inactive: {
    bg: 'safeTalk.navy.200',
    color: 'safeTalk.navy.400',
    icon: 'safeTalk.navy.300',
  },
  warning: {
    bg: 'safeTalk.limeGreen.100',
    color: 'safeTalk.limeGreen.700',
    icon: 'safeTalk.limeGreen.500',
  },
  error: {
    bg: 'safeTalk.purple.100',
    color: 'safeTalk.purple.700',
    icon: 'safeTalk.purple.500',
  },
} as const;

// Utility functions for creating consistent typography with better type safety
export const createHeadingStyle = (level: HeadingLevel): SystemStyleObject => {
  return typographyHierarchy[level];
};

export const createBodyTextStyle = (variant: BodyTextVariant): SystemStyleObject => {
  return bodyTextHierarchy[variant];
};

export const createLinkStyle = (variant: LinkVariant): SystemStyleObject => {
  return linkHierarchy[variant];
};

export const createListStyle = (variant: ListVariant): SystemStyleObject => {
  return listHierarchy[variant];
};

export const createBadgeStyle = (variant: BadgeVariant): SystemStyleObject => {
  return badgeHierarchy[variant];
};

// Memoized style creators for performance optimization
export const memoizedCreateHeadingStyle = (() => {
  const cache = new Map<HeadingLevel, SystemStyleObject>();
  return (level: HeadingLevel): SystemStyleObject => {
    if (!cache.has(level)) {
      cache.set(level, createHeadingStyle(level));
    }
    return cache.get(level)!;
  };
})();

export const memoizedCreateBodyTextStyle = (() => {
  const cache = new Map<BodyTextVariant, SystemStyleObject>();
  return (variant: BodyTextVariant): SystemStyleObject => {
    if (!cache.has(variant)) {
      cache.set(variant, createBodyTextStyle(variant));
    }
    return cache.get(variant)!;
  };
})();

// Export commonly used combinations
export const commonTypographyStyles = {
  heroHeading: createHeadingStyle('h1'),
  sectionHeading: createHeadingStyle('h2'),
  cardTitle: createHeadingStyle('h4'),
  bodyText: createBodyTextStyle('regular'),
  leadText: createBodyTextStyle('lead'),
  primaryLink: createLinkStyle('primary'),
  featureList: createListStyle('features'),
  primaryBadge: createBadgeStyle('primary'),
} as const;