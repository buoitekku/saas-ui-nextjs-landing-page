/**
 * Enhanced Form Error component theme with Safe Talk status colors
 */

import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { formValidationStates } from '../foundations/status-system'

const baseStyle = defineStyle({
  fontSize: 'sm',
  lineHeight: 'base',
  mt: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
})

const variants = {
  // Safe Talk error message
  'safe-talk-error': defineStyle({
    color: 'safeTalk.purple.700',
    fontWeight: 'medium',
    _before: {
      content: '"⚠"',
      color: 'safeTalk.purple.500',
      fontSize: 'sm',
      mr: 1,
    },
  }),
  
  // Safe Talk warning message
  'safe-talk-warning': defineStyle({
    color: 'safeTalk.limeGreen.700',
    fontWeight: 'medium',
    _before: {
      content: '"⚠"',
      color: 'safeTalk.limeGreen.600',
      fontSize: 'sm',
      mr: 1,
    },
  }),
  
  // Safe Talk success message
  'safe-talk-success': defineStyle({
    color: 'safeTalk.limeGreen.700',
    fontWeight: 'medium',
    _before: {
      content: '"✓"',
      color: 'safeTalk.limeGreen.500',
      fontSize: 'sm',
      mr: 1,
    },
  }),
  
  // Safe Talk info message
  'safe-talk-info': defineStyle({
    color: 'safeTalk.blue.700',
    fontWeight: 'medium',
    _before: {
      content: '"ℹ"',
      color: 'safeTalk.blue.500',
      fontSize: 'sm',
      mr: 1,
    },
  }),
  
  // Subtle variants without icons
  'subtle-error': defineStyle({
    color: 'safeTalk.purple.600',
    fontWeight: 'normal',
  }),
  
  'subtle-warning': defineStyle({
    color: 'safeTalk.limeGreen.600',
    fontWeight: 'normal',
  }),
  
  'subtle-success': defineStyle({
    color: 'safeTalk.limeGreen.600',
    fontWeight: 'normal',
  }),
  
  'subtle-info': defineStyle({
    color: 'safeTalk.blue.600',
    fontWeight: 'normal',
  }),
  
  // High contrast variants for accessibility
  'high-contrast-error': defineStyle({
    color: 'safeTalk.purple.800',
    fontWeight: 'semibold',
    bg: 'safeTalk.purple.50',
    px: 2,
    py: 1,
    borderRadius: 'sm',
    borderLeft: '3px solid',
    borderLeftColor: 'safeTalk.purple.500',
  }),
  
  'high-contrast-warning': defineStyle({
    color: 'safeTalk.limeGreen.800',
    fontWeight: 'semibold',
    bg: 'safeTalk.limeGreen.50',
    px: 2,
    py: 1,
    borderRadius: 'sm',
    borderLeft: '3px solid',
    borderLeftColor: 'safeTalk.limeGreen.600',
  }),
  
  'high-contrast-success': defineStyle({
    color: 'safeTalk.limeGreen.800',
    fontWeight: 'semibold',
    bg: 'safeTalk.limeGreen.50',
    px: 2,
    py: 1,
    borderRadius: 'sm',
    borderLeft: '3px solid',
    borderLeftColor: 'safeTalk.limeGreen.500',
  }),
  
  'high-contrast-info': defineStyle({
    color: 'safeTalk.blue.800',
    fontWeight: 'semibold',
    bg: 'safeTalk.blue.50',
    px: 2,
    py: 1,
    borderRadius: 'sm',
    borderLeft: '3px solid',
    borderLeftColor: 'safeTalk.blue.500',
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
}

export const formErrorTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'safe-talk-error',
    size: 'sm',
  },
})