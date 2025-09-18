import { useColorModeValue } from '@chakra-ui/react'

/**
 * Custom hook for Safe Talk brand colors with light/dark mode support
 */
export const useSafeTalkColors = () => {
  return {
    // Primary turquoise colors
    turquoise: {
      bg: useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900'),
      color: useColorModeValue('safeTalk.turquoise.500', 'safeTalk.turquoise.300'),
      accent: useColorModeValue('safeTalk.turquoise.400', 'safeTalk.turquoise.400'),
      border: useColorModeValue('safeTalk.turquoise.200', 'safeTalk.turquoise.700'),
    },
    
    // Secondary blue colors
    blue: {
      bg: useColorModeValue('safeTalk.blue.50', 'safeTalk.blue.900'),
      color: useColorModeValue('safeTalk.blue.500', 'safeTalk.blue.300'),
      accent: useColorModeValue('safeTalk.blue.400', 'safeTalk.blue.400'),
    },
    
    // Navy text colors
    navy: {
      text: useColorModeValue('safeTalk.navy.400', 'white'),
      muted: useColorModeValue('safeTalk.navy.300', 'gray.300'),
    },
    
    // Accent colors
    limeGreen: {
      bg: useColorModeValue('safeTalk.limeGreen.50', 'safeTalk.limeGreen.900'),
      color: useColorModeValue('safeTalk.limeGreen.500', 'safeTalk.limeGreen.300'),
      accent: useColorModeValue('safeTalk.limeGreen.400', 'safeTalk.limeGreen.400'),
    },
    
    purple: {
      bg: useColorModeValue('safeTalk.purple.50', 'safeTalk.purple.900'),
      color: useColorModeValue('safeTalk.purple.500', 'safeTalk.purple.300'),
      accent: useColorModeValue('safeTalk.purple.400', 'safeTalk.purple.400'),
    },
    
    // Common UI colors
    card: {
      bg: useColorModeValue('white', 'gray.800'),
      border: useColorModeValue('gray.200', 'gray.600'),
    },
    
    section: {
      bg: useColorModeValue('gray.50', 'gray.900'),
      altBg: useColorModeValue('white', 'gray.900'),
    },
  }
}

/**
 * Semantic color mappings for specific use cases
 */
export const useSafeTalkSemanticColors = () => {
  const colors = useSafeTalkColors()
  
  return {
    primary: colors.turquoise,
    secondary: colors.blue,
    success: colors.limeGreen,
    accent: colors.purple,
    text: colors.navy,
    surface: colors.card,
    background: colors.section,
  }
}