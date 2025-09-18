import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import '@fontsource/gabarito/700.css' // Gabarito Bold for headings
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import { colors } from './foundations/colors'
import { fonts, fontSizes, fontWeights } from './foundations/typography'
import { darkModeSemanticColors, darkModeColors } from './foundations/dark-mode-colors'

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'light',
      useSystemColorMode: true, // Respect user's system preference
    },
    styles: {
      global: (props: any) => ({
        body: {
          color: 'safeTalk.navy.400',
          bg: 'white',
          fontSize: 'lg',
          transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
          _dark: {
            color: 'white',
            bg: 'safeTalk.navy.900',
          },
        },
        // Scrollbar styling for dark mode
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          bg: 'gray.100',
          _dark: {
            bg: 'safeTalk.navy.800',
          },
        },
        '*::-webkit-scrollbar-thumb': {
          bg: 'gray.300',
          borderRadius: 'full',
          _dark: {
            bg: 'safeTalk.navy.600',
          },
          _hover: {
            bg: 'gray.400',
            _dark: {
              bg: 'safeTalk.navy.500',
            },
          },
        },
        // Selection styling
        '::selection': {
          bg: 'safeTalk.turquoise.200',
          color: 'safeTalk.navy.400',
          _dark: {
            bg: 'safeTalk.turquoise.600',
            color: 'white',
          },
        },
      }),
    },
    colors,
    fonts,
    fontSizes,
    fontWeights,
    components,
    // Enhanced Safe Talk semantic tokens with comprehensive dark mode support
    semanticTokens: {
      colors: {
        // Primary brand colors
        'safe-talk-primary': {
          default: 'safeTalk.turquoise.400',
          _dark: 'safeTalk.turquoise.300',
        },
        'safe-talk-secondary': {
          default: 'safeTalk.blue.400',
          _dark: 'safeTalk.blue.300',
        },
        'safe-talk-accent': {
          default: 'safeTalk.limeGreen.400',
          _dark: 'safeTalk.limeGreen.300',
        },
        
        // Text colors
        'safe-talk-text': {
          default: 'safeTalk.navy.400',
          _dark: 'white',
        },
        'safe-talk-text-muted': {
          default: 'safeTalk.navy.300',
          _dark: 'gray.300',
        },
        'safe-talk-text-subtle': {
          default: 'safeTalk.navy.200',
          _dark: 'gray.400',
        },
        
        // Background colors
        'safe-talk-bg': {
          default: 'white',
          _dark: 'safeTalk.navy.900',
        },
        'safe-talk-bg-secondary': {
          default: 'gray.50',
          _dark: 'safeTalk.navy.800',
        },
        'safe-talk-bg-tertiary': {
          default: 'gray.100',
          _dark: 'safeTalk.navy.700',
        },
        'safe-talk-bg-subtle': {
          default: 'safeTalk.turquoise.50',
          _dark: 'safeTalk.turquoise.900',
        },
        
        // Border colors
        'safe-talk-border': {
          default: 'gray.200',
          _dark: 'safeTalk.navy.600',
        },
        'safe-talk-border-subtle': {
          default: 'gray.100',
          _dark: 'safeTalk.navy.700',
        },
        'safe-talk-border-accent': {
          default: 'safeTalk.turquoise.200',
          _dark: 'safeTalk.turquoise.600',
        },
        
        // Interactive colors
        'safe-talk-hover': {
          default: 'safeTalk.turquoise.500',
          _dark: 'safeTalk.turquoise.200',
        },
        'safe-talk-active': {
          default: 'safeTalk.turquoise.600',
          _dark: 'safeTalk.turquoise.400',
        },
        
        // Status colors
        'safe-talk-success': {
          default: 'safeTalk.limeGreen.400',
          _dark: 'safeTalk.limeGreen.300',
        },
        'safe-talk-error': {
          default: 'safeTalk.purple.400',
          _dark: 'safeTalk.purple.300',
        },
        'safe-talk-warning': {
          default: 'safeTalk.limeGreen.500',
          _dark: 'safeTalk.limeGreen.200',
        },
        'safe-talk-info': {
          default: 'safeTalk.blue.400',
          _dark: 'safeTalk.blue.300',
        },
        
        // Card colors
        'safe-talk-card-bg': {
          default: 'white',
          _dark: 'safeTalk.navy.800',
        },
        'safe-talk-card-border': {
          default: 'gray.200',
          _dark: 'safeTalk.navy.600',
        },
        
        // Shadow colors
        'safe-talk-shadow': {
          default: 'rgba(0, 0, 0, 0.1)',
          _dark: 'rgba(0, 0, 0, 0.3)',
        },
        'safe-talk-shadow-lg': {
          default: 'rgba(0, 0, 0, 0.15)',
          _dark: 'rgba(0, 0, 0, 0.4)',
        },
      },
    },
  },
  baseTheme,
)
