/**
 * Safe Talk focus and interactive state styles
 * Provides consistent focus indicators and interactive feedback using brand colors
 * 
 * @example Basic usage:
 * ```tsx
 * import { createInteractiveStyles, createLinkStyles } from '#theme/foundations/focus-styles';
 * 
 * // Button with primary interactive styles
 * <Button sx={createInteractiveStyles('primary')}>Click me</Button>
 * 
 * // Link with secondary styling
 * <Link sx={createLinkStyles('secondary')}>Learn more</Link>
 * ```
 * 
 * @example Advanced usage with options:
 * ```tsx
 * // Button with custom focus variant and no disabled state
 * <Button sx={createInteractiveStyles('primary', { 
 *   focusVariant: 'highContrast',
 *   includeDisabled: false 
 * })}>
 *   Accessible Button
 * </Button>
 * ```
 */

import { SystemStyleObject } from '@chakra-ui/react';

// Type definitions for better type safety
export type FocusVariant = 'primary' | 'secondary' | 'accent' | 'highContrast' | 'error';
export type InteractiveVariant = 'primary' | 'secondary' | 'accent' | 'subtle';
export type TransitionProperty = 'fast' | 'normal' | 'slow' | 'color' | 'background' | 'transform' | 'shadow' | 'border';

export interface FocusRingConfig {
  outline: string;
  boxShadow: string;
  borderColor: string;
}

export interface InteractiveStateConfig {
  bg?: string;
  color?: string;
  transform?: string;
  boxShadow?: string;
  textDecoration?: string;
  textUnderlineOffset?: string;
  cursor?: string;
  opacity?: number;
  _hover?: SystemStyleObject;
}

// Color mappings for focus rings - centralized for maintainability
const FOCUS_RING_COLORS = {
  turquoise: 'rgba(58, 181, 178, 0.3)', // safeTalk.turquoise.400 with 30% opacity
  blue: 'rgba(113, 198, 218, 0.3)', // safeTalk.blue.400 with 30% opacity
  limeGreen: 'rgba(197, 213, 78, 0.3)', // safeTalk.limeGreen.400 with 30% opacity
  navy: 'rgba(10, 52, 71, 0.4)', // safeTalk.navy.400 with 40% opacity
  limeGreenError: 'rgba(197, 213, 78, 0.4)', // safeTalk.limeGreen.400 with 40% opacity for errors
} as const;

// Helper function to create consistent focus ring styles
const createFocusRing = (
  shadowColor: string, 
  borderColor: string, 
  ringWidth: number = 3
): FocusRingConfig => ({
  outline: 'none',
  boxShadow: `0 0 0 ${ringWidth}px ${shadowColor}`,
  borderColor,
});

// Safe Talk focus ring configurations
export const focusRingStyles: Record<FocusVariant, FocusRingConfig> = {
  // Primary focus ring using turquoise
  primary: createFocusRing(FOCUS_RING_COLORS.turquoise, 'safeTalk.turquoise.400'),
  
  // Secondary focus ring using blue
  secondary: createFocusRing(FOCUS_RING_COLORS.blue, 'safeTalk.blue.400'),
  
  // Accent focus ring using lime green
  accent: createFocusRing(FOCUS_RING_COLORS.limeGreen, 'safeTalk.limeGreen.400'),
  
  // High contrast focus ring for accessibility
  highContrast: createFocusRing(FOCUS_RING_COLORS.navy, 'safeTalk.navy.400', 4),
  
  // Error focus ring - using lime green for brand compliance
  error: createFocusRing(FOCUS_RING_COLORS.limeGreenError, 'safeTalk.limeGreen.500', 4),
} as const;

// Interactive state configurations with proper typing
export const interactiveStyles: {
  hover: Record<InteractiveVariant | 'link', SystemStyleObject>;
  active: Record<InteractiveVariant, SystemStyleObject>;
  disabled: SystemStyleObject;
} = {
  // Hover states
  hover: {
    primary: {
      bg: 'safeTalk.turquoise.500',
      transform: 'translateY(-1px)',
      boxShadow: 'md',
    },
    secondary: {
      bg: 'safeTalk.blue.500',
      transform: 'translateY(-1px)',
      boxShadow: 'md',
    },
    accent: {
      bg: 'safeTalk.limeGreen.500',
      transform: 'translateY(-1px)',
      boxShadow: 'md',
    },
    subtle: {
      bg: 'safeTalk.turquoise.50',
      color: 'safeTalk.turquoise.600',
    },
    link: {
      color: 'safeTalk.turquoise.600',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
  },
  
  // Active states
  active: {
    primary: {
      bg: 'safeTalk.turquoise.600',
      transform: 'translateY(0)',
      boxShadow: 'sm',
    },
    secondary: {
      bg: 'safeTalk.blue.600',
      transform: 'translateY(0)',
      boxShadow: 'sm',
    },
    accent: {
      bg: 'safeTalk.limeGreen.600',
      transform: 'translateY(0)',
      boxShadow: 'sm',
    },
    subtle: {
      bg: 'safeTalk.turquoise.100',
      color: 'safeTalk.turquoise.700',
    },
  },
  
  // Disabled states
  disabled: {
    bg: 'gray.100',
    color: 'gray.400',
    cursor: 'not-allowed',
    opacity: 0.6,
    _hover: {
      bg: 'gray.100',
      transform: 'none',
      boxShadow: 'none',
    },
  },
} as const;

// Transition configurations
export const transitionStyles = {
  fast: 'all 0.15s ease-in-out',
  normal: 'all 0.2s ease-in-out',
  slow: 'all 0.3s ease-in-out',
  
  // Specific property transitions
  color: 'color 0.2s ease-in-out',
  background: 'background-color 0.2s ease-in-out',
  transform: 'transform 0.15s ease-in-out',
  shadow: 'box-shadow 0.2s ease-in-out',
  border: 'border-color 0.2s ease-in-out',
} as const;

// Focus-visible styles for better keyboard navigation
export const focusVisibleStyles = {
  // Only show focus ring when navigating with keyboard
  _focusVisible: focusRingStyles.primary,
  
  // Hide focus ring when clicking with mouse
  _focus: {
    outline: 'none',
    boxShadow: 'none',
  },
} as const;

// Accessibility-focused styles for high contrast mode
export const highContrastStyles = {
  '@media (prefers-contrast: high)': {
    _focus: focusRingStyles.highContrast,
    _focusVisible: focusRingStyles.highContrast,
    borderWidth: '2px',
  },
} as const;

// Reduced motion styles for users who prefer less animation
export const reducedMotionStyles = {
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    transform: 'none',
    animation: 'none',
  },
} as const;

// Enhanced utility functions with validation
export const createInteractiveStyles = (
  variant: InteractiveVariant = 'primary',
  options: {
    focusVariant?: FocusVariant;
    transition?: TransitionProperty;
    includeDisabled?: boolean;
  } = {}
): SystemStyleObject => {
  // Map interactive variants to appropriate focus variants
  const defaultFocusVariant: Record<InteractiveVariant, FocusVariant> = {
    primary: 'primary',
    secondary: 'secondary', 
    accent: 'accent',
    subtle: 'primary', // subtle uses primary focus variant
  };

  const {
    focusVariant = defaultFocusVariant[variant],
    transition = 'normal',
    includeDisabled = true,
  } = options;

  // Validate inputs in development
  if (process.env.NODE_ENV === 'development') {
    if (!interactiveStyles.hover[variant]) {
      console.warn(`Invalid interactive variant: ${variant}. Using 'primary' as fallback.`);
    }
    if (!focusRingStyles[focusVariant]) {
      console.warn(`Invalid focus variant: ${focusVariant}. Using 'primary' as fallback.`);
    }
    if (!transitionStyles[transition]) {
      console.warn(`Invalid transition: ${transition}. Using 'normal' as fallback.`);
    }
  }

  const safeVariant = interactiveStyles.hover[variant] ? variant : 'primary';
  const safeFocusVariant = focusRingStyles[focusVariant] ? focusVariant : 'primary';
  const safeTransition = transitionStyles[transition] || transitionStyles.normal;

  const baseStyles: SystemStyleObject = {
    transition: safeTransition,
    _hover: interactiveStyles.hover[safeVariant],
    _active: interactiveStyles.active[safeVariant],
    _focus: focusRingStyles[safeFocusVariant],
    _focusVisible: focusRingStyles[safeFocusVariant],
  };

  if (includeDisabled) {
    baseStyles._disabled = interactiveStyles.disabled;
  }

  return baseStyles;
};

// Link color mappings for better maintainability
const LINK_COLOR_MAP: Record<InteractiveVariant, { default: string; hover: string }> = {
  primary: {
    default: 'safeTalk.turquoise.400',
    hover: 'safeTalk.turquoise.600',
  },
  secondary: {
    default: 'safeTalk.blue.400',
    hover: 'safeTalk.blue.600',
  },
  accent: {
    default: 'safeTalk.limeGreen.400',
    hover: 'safeTalk.limeGreen.600',
  },
  subtle: {
    default: 'safeTalk.navy.300',
    hover: 'safeTalk.navy.400',
  },
} as const;

// Link-specific interactive styles with enhanced options
export const createLinkStyles = (
  variant: InteractiveVariant = 'primary',
  options: {
    underlineOffset?: string;
    focusVariant?: FocusVariant;
    showUnderlineOnHover?: boolean;
  } = {}
): SystemStyleObject => {
  // Map interactive variants to appropriate focus variants
  const defaultFocusVariant: Record<InteractiveVariant, FocusVariant> = {
    primary: 'primary',
    secondary: 'secondary', 
    accent: 'accent',
    subtle: 'primary', // subtle uses primary focus variant
  };

  const {
    underlineOffset = '3px',
    focusVariant = defaultFocusVariant[variant],
    showUnderlineOnHover = true,
  } = options;

  const colors = LINK_COLOR_MAP[variant];

  return {
    color: colors.default,
    textDecoration: 'none',
    transition: transitionStyles.color,
    _hover: {
      color: colors.hover,
      ...(showUnderlineOnHover && {
        textDecoration: 'underline',
        textUnderlineOffset: underlineOffset,
      }),
    },
    _focus: focusRingStyles[focusVariant],
    _focusVisible: focusRingStyles[focusVariant],
  };
};

// Form input interactive styles
export const createInputStyles = () => ({
  borderColor: 'gray.200',
  transition: transitionStyles.border,
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
    _focus: focusRingStyles.error,
    _focusVisible: focusRingStyles.error,
  },
});

// Card interactive styles
export const createCardStyles = () => ({
  transition: transitionStyles.normal,
  cursor: 'pointer',
  _hover: {
    transform: 'translateY(-2px)',
    boxShadow: 'lg',
    borderColor: 'safeTalk.turquoise.200',
  },
  _focus: {
    ...focusRingStyles.primary,
    transform: 'translateY(-2px)',
  },
  _focusVisible: {
    ...focusRingStyles.primary,
    transform: 'translateY(-2px)',
  },
});

// Navigation item interactive styles
export const createNavItemStyles = () => ({
  transition: transitionStyles.color,
  _hover: {
    color: 'safeTalk.turquoise.500',
  },
  _focus: {
    outline: 'none',
    color: 'safeTalk.turquoise.500',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
  _focusVisible: {
    outline: 'none',
    color: 'safeTalk.turquoise.500',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
});

// Icon button style configurations - memoized for performance
const ICON_BUTTON_VARIANTS: Record<'primary' | 'secondary' | 'subtle', SystemStyleObject> = {
  subtle: {
    color: 'safeTalk.navy.300',
    _hover: {
      color: 'safeTalk.turquoise.500',
      bg: 'safeTalk.turquoise.50',
    },
    _active: {
      color: 'safeTalk.turquoise.600',
      bg: 'safeTalk.turquoise.100',
    },
  },
  primary: {
    color: 'white',
    bg: 'safeTalk.turquoise.400',
    _hover: {
      bg: 'safeTalk.turquoise.500',
    },
    _active: {
      bg: 'safeTalk.turquoise.600',
    },
  },
  secondary: {
    color: 'white',
    bg: 'safeTalk.blue.400',
    _hover: {
      bg: 'safeTalk.blue.500',
    },
    _active: {
      bg: 'safeTalk.blue.600',
    },
  },
} as const;

// Icon button interactive styles with performance optimization
export const createIconButtonStyles = (
  variant: keyof typeof ICON_BUTTON_VARIANTS = 'subtle',
  options: {
    focusVariant?: FocusVariant;
    includeAccessibility?: boolean;
  } = {}
): SystemStyleObject => {
  const { focusVariant = 'primary', includeAccessibility = true } = options;

  const baseStyles: SystemStyleObject = {
    ...ICON_BUTTON_VARIANTS[variant],
    transition: transitionStyles.normal,
    _focus: focusRingStyles[focusVariant],
    _focusVisible: focusRingStyles[focusVariant],
    _disabled: interactiveStyles.disabled,
  };

  // Add accessibility styles if requested
  if (includeAccessibility) {
    Object.assign(baseStyles, highContrastStyles, reducedMotionStyles);
  }

  return baseStyles;
};

// Export commonly used style combinations for better performance
export const commonStyleCombinations = {
  primaryButton: createInteractiveStyles('primary'),
  secondaryButton: createInteractiveStyles('secondary'),
  primaryLink: createLinkStyles('primary'),
  subtleIconButton: createIconButtonStyles('subtle'),
  accessibleInput: createInputStyles(),
  interactiveCard: createCardStyles(),
} as const;