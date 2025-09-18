/**
 * Enhanced Text component theme with Safe Talk typography hierarchy
 */

import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { bodyTextHierarchy } from '../foundations/typography-hierarchy'

const baseStyle = defineStyle({
  color: 'safeTalk.navy.300',
  lineHeight: 1.6,
})

const variants = {
  // Body text variants
  'body-large': defineStyle(bodyTextHierarchy.large),
  'body-regular': defineStyle(bodyTextHierarchy.regular),
  'body-small': defineStyle(bodyTextHierarchy.small),
  'body-caption': defineStyle(bodyTextHierarchy.caption),
  'body-lead': defineStyle(bodyTextHierarchy.lead),
  
  // Semantic text variants
  'safe-talk-primary': defineStyle({
    color: 'safeTalk.turquoise.500',
    fontWeight: 'medium',
  }),
  
  'safe-talk-secondary': defineStyle({
    color: 'safeTalk.blue.500',
    fontWeight: 'medium',
  }),
  
  'safe-talk-accent': defineStyle({
    color: 'safeTalk.limeGreen.600',
    fontWeight: 'medium',
  }),
  
  'safe-talk-muted': defineStyle({
    color: 'safeTalk.navy.200',
    fontWeight: 'normal',
  }),
  
  'safe-talk-emphasis': defineStyle({
    color: 'safeTalk.navy.400',
    fontWeight: 'semibold',
  }),
  
  // Status text variants
  'status-success': defineStyle({
    color: 'safeTalk.limeGreen.600',
    fontWeight: 'medium',
  }),
  
  'status-info': defineStyle({
    color: 'safeTalk.blue.600',
    fontWeight: 'medium',
  }),
  
  'status-warning': defineStyle({
    color: 'safeTalk.limeGreen.700',
    fontWeight: 'medium',
  }),
  
  'status-error': defineStyle({
    color: 'safeTalk.purple.600',
    fontWeight: 'medium',
  }),
  
  // Special text variants
  'hero-subtitle': defineStyle({
    fontSize: { base: 'lg', md: 'xl', lg: '2xl' },
    color: 'safeTalk.navy.300',
    fontWeight: 'normal',
    lineHeight: 1.5,
    textAlign: 'center',
  }),
  
  'section-subtitle': defineStyle({
    fontSize: { base: 'md', md: 'lg', lg: 'xl' },
    color: 'safeTalk.navy.300',
    fontWeight: 'normal',
    lineHeight: 1.5,
    textAlign: 'center',
    maxW: '3xl',
    mx: 'auto',
  }),
  
  'card-description': defineStyle({
    fontSize: { base: 'sm', md: 'md' },
    color: 'safeTalk.navy.200',
    lineHeight: 1.5,
  }),
  
  'feature-description': defineStyle({
    fontSize: { base: 'sm', md: 'md' },
    color: 'safeTalk.navy.300',
    lineHeight: 1.6,
  }),
  
  'testimonial-quote': defineStyle({
    fontSize: { base: 'md', md: 'lg' },
    color: 'safeTalk.navy.400',
    fontStyle: 'italic',
    lineHeight: 1.6,
    position: 'relative',
    _before: {
      content: '"\\201C"', // Left double quotation mark
      fontSize: '3xl',
      color: 'safeTalk.turquoise.400',
      position: 'absolute',
      left: '-0.5em',
      top: '-0.2em',
      lineHeight: 1,
    },
    _after: {
      content: '"\\201D"', // Right double quotation mark
      fontSize: '3xl',
      color: 'safeTalk.turquoise.400',
      position: 'absolute',
      right: '-0.3em',
      bottom: '-0.5em',
      lineHeight: 1,
    },
  }),
  
  'pricing-amount': defineStyle({
    fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
    fontWeight: 'bold',
    color: 'safeTalk.turquoise.500',
    lineHeight: 1,
    fontFamily: 'Gabarito',
  }),
  
  'pricing-period': defineStyle({
    fontSize: { base: 'sm', md: 'md' },
    color: 'safeTalk.navy.300',
    fontWeight: 'normal',
  }),
  
  'cta-text': defineStyle({
    fontSize: { base: 'lg', md: 'xl' },
    color: 'safeTalk.navy.400',
    fontWeight: 'semibold',
    textAlign: 'center',
  }),
  
  'footer-text': defineStyle({
    fontSize: 'sm',
    color: 'safeTalk.navy.200',
    lineHeight: 1.5,
  }),
  
  'copyright': defineStyle({
    fontSize: 'xs',
    color: 'safeTalk.navy.200',
    textAlign: 'center',
  }),
  
  // Interactive text variants
  'link-text': defineStyle({
    color: 'safeTalk.turquoise.400',
    fontWeight: 'medium',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease-in-out',
    _hover: {
      color: 'safeTalk.turquoise.600',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    _focus: {
      outline: 'none',
      boxShadow: '0 0 0 2px var(--chakra-colors-safeTalk-turquoise-400)',
      borderRadius: 'sm',
    },
  }),
  
  'button-text': defineStyle({
    fontWeight: 'semibold',
    textAlign: 'center',
  }),
  
  // Accessibility variants
  'screen-reader-only': defineStyle({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  }),
  
  'high-contrast': defineStyle({
    color: 'safeTalk.navy.400',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  }),
}

const sizes = {
  xs: defineStyle({
    fontSize: 'xs',
  }),
  sm: defineStyle({
    fontSize: 'sm',
  }),
  md: defineStyle({
    fontSize: 'md',
  }),
  lg: defineStyle({
    fontSize: 'lg',
  }),
  xl: defineStyle({
    fontSize: 'xl',
  }),
  '2xl': defineStyle({
    fontSize: '2xl',
  }),
}

export const textTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'body-regular',
    size: 'md',
  },
})