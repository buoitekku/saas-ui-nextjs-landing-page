/**
 * Safe Talk Dark Mode Color System
 * Comprehensive dark mode adaptations using Safe Talk brand colors
 */

import { SystemStyleObject } from '@chakra-ui/react';

// Dark mode color adaptations for Safe Talk brand colors
export const darkModeColors = {
  // Turquoise adaptations for dark mode
  turquoise: {
    // Lighter shades for better contrast on dark backgrounds
    primary: 'safeTalk.turquoise.300',    // Main brand color in dark mode
    hover: 'safeTalk.turquoise.200',      // Hover state
    active: 'safeTalk.turquoise.400',     // Active state
    subtle: 'safeTalk.turquoise.800',     // Subtle backgrounds
    muted: 'safeTalk.turquoise.700',      // Muted elements
  },
  
  // Blue adaptations for dark mode
  blue: {
    primary: 'safeTalk.blue.300',
    hover: 'safeTalk.blue.200',
    active: 'safeTalk.blue.400',
    subtle: 'safeTalk.blue.800',
    muted: 'safeTalk.blue.700',
  },
  
  // Lime green adaptations for dark mode
  limeGreen: {
    primary: 'safeTalk.limeGreen.300',
    hover: 'safeTalk.limeGreen.200',
    active: 'safeTalk.limeGreen.400',
    subtle: 'safeTalk.limeGreen.800',
    muted: 'safeTalk.limeGreen.700',
  },
  
  // Purple adaptations for dark mode
  purple: {
    primary: 'safeTalk.purple.300',
    hover: 'safeTalk.purple.200',
    active: 'safeTalk.purple.400',
    subtle: 'safeTalk.purple.800',
    muted: 'safeTalk.purple.700',
  },
  
  // Navy adaptations for dark mode
  navy: {
    primary: 'safeTalk.navy.100',        // Light navy for text
    secondary: 'safeTalk.navy.200',      // Secondary text
    muted: 'safeTalk.navy.300',          // Muted text
    subtle: 'safeTalk.navy.800',         // Subtle backgrounds
    background: 'safeTalk.navy.900',     // Main background
  },
} as const;

// Dark mode semantic color mappings
export const darkModeSemanticColors = {
  // Text colors
  text: {
    primary: 'white',
    secondary: 'gray.300',
    muted: 'gray.400',
    inverse: 'safeTalk.navy.400',
  },
  
  // Background colors
  background: {
    primary: 'safeTalk.navy.900',
    secondary: 'safeTalk.navy.800',
    tertiary: 'safeTalk.navy.700',
    subtle: 'safeTalk.navy.850',
    card: 'safeTalk.navy.800',
    overlay: 'rgba(10, 52, 71, 0.9)',
  },
  
  // Border colors
  border: {
    primary: 'safeTalk.navy.600',
    secondary: 'safeTalk.navy.700',
    subtle: 'safeTalk.navy.750',
    accent: 'safeTalk.turquoise.600',
  },
  
  // Interactive colors
  interactive: {
    primary: darkModeColors.turquoise.primary,
    secondary: darkModeColors.blue.primary,
    accent: darkModeColors.limeGreen.primary,
    hover: darkModeColors.turquoise.hover,
    active: darkModeColors.turquoise.active,
  },
  
  // Status colors for dark mode
  status: {
    success: darkModeColors.limeGreen.primary,
    error: darkModeColors.purple.primary,
    warning: darkModeColors.limeGreen.hover,
    info: darkModeColors.blue.primary,
  },
} as const;

// Dark mode component color mappings
export const darkModeComponentColors = {
  // Button colors
  button: {
    primary: {
      bg: darkModeColors.turquoise.primary,
      color: 'safeTalk.navy.900',
      _hover: {
        bg: darkModeColors.turquoise.hover,
      },
      _active: {
        bg: darkModeColors.turquoise.active,
      },
    },
    secondary: {
      bg: darkModeColors.blue.primary,
      color: 'safeTalk.navy.900',
      _hover: {
        bg: darkModeColors.blue.hover,
      },
      _active: {
        bg: darkModeColors.blue.active,
      },
    },
    outline: {
      bg: 'transparent',
      color: darkModeColors.turquoise.primary,
      borderColor: darkModeColors.turquoise.primary,
      _hover: {
        bg: darkModeColors.turquoise.primary,
        color: 'safeTalk.navy.900',
      },
    },
    ghost: {
      bg: 'transparent',
      color: darkModeColors.turquoise.primary,
      _hover: {
        bg: darkModeColors.turquoise.subtle,
      },
    },
  },
  
  // Card colors
  card: {
    bg: darkModeSemanticColors.background.card,
    borderColor: darkModeSemanticColors.border.primary,
    _hover: {
      borderColor: darkModeSemanticColors.border.accent,
      bg: darkModeSemanticColors.background.secondary,
    },
  },
  
  // Input colors
  input: {
    bg: darkModeSemanticColors.background.secondary,
    borderColor: darkModeSemanticColors.border.primary,
    color: darkModeSemanticColors.text.primary,
    _placeholder: {
      color: darkModeSemanticColors.text.muted,
    },
    _hover: {
      borderColor: darkModeColors.turquoise.muted,
    },
    _focus: {
      borderColor: darkModeColors.turquoise.primary,
      boxShadow: `0 0 0 1px ${darkModeColors.turquoise.primary}`,
    },
  },
  
  // Alert colors
  alert: {
    success: {
      bg: darkModeColors.limeGreen.subtle,
      color: darkModeColors.limeGreen.primary,
      borderColor: darkModeColors.limeGreen.muted,
    },
    error: {
      bg: darkModeColors.purple.subtle,
      color: darkModeColors.purple.primary,
      borderColor: darkModeColors.purple.muted,
    },
    warning: {
      bg: darkModeColors.limeGreen.subtle,
      color: darkModeColors.limeGreen.hover,
      borderColor: darkModeColors.limeGreen.muted,
    },
    info: {
      bg: darkModeColors.blue.subtle,
      color: darkModeColors.blue.primary,
      borderColor: darkModeColors.blue.muted,
    },
  },
  
  // Badge colors
  badge: {
    primary: {
      bg: darkModeColors.turquoise.primary,
      color: 'safeTalk.navy.900',
    },
    secondary: {
      bg: darkModeColors.blue.primary,
      color: 'safeTalk.navy.900',
    },
    success: {
      bg: darkModeColors.limeGreen.primary,
      color: 'safeTalk.navy.900',
    },
    subtle: {
      bg: darkModeColors.turquoise.subtle,
      color: darkModeColors.turquoise.primary,
    },
  },
  
  // Link colors
  link: {
    primary: {
      color: darkModeColors.turquoise.primary,
      _hover: {
        color: darkModeColors.turquoise.hover,
      },
    },
    secondary: {
      color: darkModeColors.blue.primary,
      _hover: {
        color: darkModeColors.blue.hover,
      },
    },
    subtle: {
      color: darkModeSemanticColors.text.secondary,
      _hover: {
        color: darkModeColors.turquoise.primary,
      },
    },
  },
} as const;

// Dark mode gradient definitions
export const darkModeGradients = {
  // Hero gradients
  hero: {
    primary: `linear-gradient(135deg, ${darkModeSemanticColors.background.primary} 0%, ${darkModeColors.navy.subtle} 100%)`,
    accent: `linear-gradient(135deg, ${darkModeColors.turquoise.subtle} 0%, ${darkModeColors.blue.subtle} 100%)`,
  },
  
  // Card gradients
  card: {
    subtle: `linear-gradient(145deg, ${darkModeSemanticColors.background.card} 0%, ${darkModeSemanticColors.background.secondary} 100%)`,
    accent: `linear-gradient(145deg, ${darkModeColors.turquoise.subtle} 0%, ${darkModeColors.blue.subtle} 100%)`,
  },
  
  // Button gradients
  button: {
    primary: `linear-gradient(135deg, ${darkModeColors.turquoise.primary} 0%, ${darkModeColors.turquoise.active} 100%)`,
    secondary: `linear-gradient(135deg, ${darkModeColors.blue.primary} 0%, ${darkModeColors.blue.active} 100%)`,
  },
} as const;

// Utility functions for dark mode colors
export const createDarkModeStyle = (
  lightStyle: SystemStyleObject,
  darkOverrides: SystemStyleObject
): SystemStyleObject => {
  return {
    ...lightStyle,
    _dark: {
      ...lightStyle._dark,
      ...darkOverrides,
    },
  };
};

export const createResponsiveDarkModeStyle = (
  component: keyof typeof darkModeComponentColors
): SystemStyleObject => {
  return {
    _dark: darkModeComponentColors[component],
  };
};

// Dark mode color mode utilities
export const getDarkModeColor = (
  colorCategory: keyof typeof darkModeColors,
  variant: keyof typeof darkModeColors.turquoise = 'primary'
): string => {
  return darkModeColors[colorCategory][variant];
};

export const getDarkModeSemanticColor = (
  category: keyof typeof darkModeSemanticColors,
  variant: string
): string => {
  const categoryColors = darkModeSemanticColors[category] as Record<string, string>;
  return categoryColors[variant] || categoryColors.primary || '';
};

// Dark mode accessibility helpers
export const darkModeAccessibilityColors = {
  // High contrast combinations for dark mode
  highContrast: {
    text: 'white',
    background: 'black',
    accent: darkModeColors.turquoise.hover,
  },
  
  // Focus indicators for dark mode
  focus: {
    ring: `0 0 0 3px ${darkModeColors.turquoise.primary}40`, // 40 = 25% opacity
    border: darkModeColors.turquoise.primary,
  },
  
  // Error states for dark mode
  error: {
    text: darkModeColors.purple.primary,
    background: darkModeColors.purple.subtle,
    border: darkModeColors.purple.muted,
  },
  
  // Success states for dark mode
  success: {
    text: darkModeColors.limeGreen.primary,
    background: darkModeColors.limeGreen.subtle,
    border: darkModeColors.limeGreen.muted,
  },
} as const;

// Export commonly used dark mode styles
export const commonDarkModeStyles = {
  body: createDarkModeStyle(
    { bg: 'white', color: 'safeTalk.navy.400' },
    { bg: darkModeSemanticColors.background.primary, color: darkModeSemanticColors.text.primary }
  ),
  
  card: createDarkModeStyle(
    { bg: 'white', borderColor: 'gray.200' },
    darkModeComponentColors.card
  ),
  
  button: {
    primary: createDarkModeStyle(
      { bg: 'safeTalk.turquoise.400', color: 'white' },
      darkModeComponentColors.button.primary
    ),
    secondary: createDarkModeStyle(
      { bg: 'safeTalk.blue.400', color: 'white' },
      darkModeComponentColors.button.secondary
    ),
  },
  
  input: createDarkModeStyle(
    { bg: 'white', borderColor: 'gray.200', color: 'safeTalk.navy.400' },
    darkModeComponentColors.input
  ),
  
  link: {
    primary: createDarkModeStyle(
      { color: 'safeTalk.turquoise.400' },
      darkModeComponentColors.link.primary
    ),
  },
} as const;