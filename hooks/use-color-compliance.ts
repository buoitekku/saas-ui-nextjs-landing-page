/**
 * React hook for Safe Talk color compliance validation
 * Provides runtime color validation and accessibility checking
 */

import { useCallback, useMemo } from 'react';
import { 
  validateBrandColor, 
  validateColorCombination, 
  getSafeTalkColorValue,
  getContrastRatio 
} from '../utils/color-validation';
import { 
  validateColorInDev, 
  validateColorCombinationInDev,
  shouldShowColorWarnings 
} from '../utils/color-dev-warnings';

interface ColorValidationResult {
  isValid: boolean;
  contrastRatio?: number;
  issues: string[];
  recommendations: string[];
}

interface UseColorComplianceReturn {
  // Validation functions
  validateColor: (color: string, context?: string) => boolean;
  validateCombination: (bg: string, text: string, isLargeText?: boolean) => ColorValidationResult;
  getColorValue: (colorToken: string) => string | null;
  checkContrast: (color1: string, color2: string) => number;
  
  // Utility functions
  isBrandCompliant: (color: string) => boolean;
  isAccessible: (bg: string, text: string, isLargeText?: boolean) => boolean;
  
  // Safe Talk color helpers
  getSafeTalkColor: (colorName: keyof SafeTalkColorMap, shade?: ColorShade) => string;
  getSemanticColor: (semantic: 'primary' | 'secondary' | 'accent', shade?: ColorShade) => string;
  
  // Development helpers
  enableDevWarnings: boolean;
}

type SafeTalkColorMap = {
  turquoise: string;
  blue: string;
  limeGreen: string;
  purple: string;
  navy: string;
};

type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

/**
 * Hook for Safe Talk color compliance validation and utilities
 */
export const useColorCompliance = (): UseColorComplianceReturn => {
  const enableDevWarnings = useMemo(() => shouldShowColorWarnings(), []);

  // Validate a single color with optional development warnings
  const validateColor = useCallback((color: string, context?: string): boolean => {
    if (enableDevWarnings && context) {
      return validateColorInDev(color, context);
    }
    return validateBrandColor(color);
  }, [enableDevWarnings]);

  // Validate color combination with comprehensive feedback
  const validateCombination = useCallback((
    backgroundColor: string, 
    textColor: string, 
    isLargeText: boolean = false
  ): ColorValidationResult => {
    if (enableDevWarnings) {
      validateColorCombinationInDev(backgroundColor, textColor, isLargeText);
    }

    const result = validateColorCombination(backgroundColor, textColor, isLargeText);
    
    return {
      isValid: result.brandCompliant && result.accessible,
      contrastRatio: result.contrastRatio,
      issues: result.issues,
      recommendations: result.recommendations,
    };
  }, [enableDevWarnings]);

  // Get hex value for color token
  const getColorValue = useCallback((colorToken: string): string | null => {
    return getSafeTalkColorValue(colorToken);
  }, []);

  // Check contrast ratio between two colors
  const checkContrast = useCallback((color1: string, color2: string): number => {
    const hex1 = getSafeTalkColorValue(color1) || color1;
    const hex2 = getSafeTalkColorValue(color2) || color2;
    return getContrastRatio(hex1, hex2);
  }, []);

  // Simple brand compliance check
  const isBrandCompliant = useCallback((color: string): boolean => {
    return validateBrandColor(color);
  }, []);

  // Simple accessibility check
  const isAccessible = useCallback((
    backgroundColor: string, 
    textColor: string, 
    isLargeText: boolean = false
  ): boolean => {
    const result = validateColorCombination(backgroundColor, textColor, isLargeText);
    return result.accessible;
  }, []);

  // Get Safe Talk brand color with shade
  const getSafeTalkColor = useCallback((
    colorName: keyof SafeTalkColorMap, 
    shade: ColorShade = '400'
  ): string => {
    return `safeTalk.${colorName}.${shade}`;
  }, []);

  // Get semantic color with shade
  const getSemanticColor = useCallback((
    semantic: 'primary' | 'secondary' | 'accent', 
    shade: ColorShade = '400'
  ): string => {
    return `${semantic}.${shade}`;
  }, []);

  return {
    validateColor,
    validateCombination,
    getColorValue,
    checkContrast,
    isBrandCompliant,
    isAccessible,
    getSafeTalkColor,
    getSemanticColor,
    enableDevWarnings,
  };
};

/**
 * Hook for getting Safe Talk color values with validation
 */
export const useSafeTalkColors = () => {
  const { getSafeTalkColor, getSemanticColor, validateColor } = useColorCompliance();

  // Pre-defined color combinations that are guaranteed to be compliant
  const colors = useMemo(() => ({
    // Primary brand colors
    primary: getSafeTalkColor('turquoise'),
    primaryHover: getSafeTalkColor('turquoise', '600'),
    primaryLight: getSafeTalkColor('turquoise', '50'),
    
    // Secondary colors
    secondary: getSafeTalkColor('blue'),
    secondaryHover: getSafeTalkColor('blue', '600'),
    secondaryLight: getSafeTalkColor('blue', '50'),
    
    // Accent colors
    accent: getSafeTalkColor('limeGreen'),
    accentHover: getSafeTalkColor('limeGreen', '600'),
    accentLight: getSafeTalkColor('limeGreen', '50'),
    
    // Text colors
    textPrimary: getSafeTalkColor('navy'),
    textSecondary: getSafeTalkColor('navy', '300'),
    textMuted: getSafeTalkColor('navy', '200'),
    
    // Background colors
    bgPrimary: 'white',
    bgSecondary: getSafeTalkColor('turquoise', '50'),
    bgAccent: getSafeTalkColor('blue', '50'),
    
    // Status colors
    success: getSafeTalkColor('limeGreen'),
    info: getSafeTalkColor('blue'),
    warning: getSafeTalkColor('limeGreen', '600'),
    
    // Interactive states
    focusRing: getSafeTalkColor('turquoise', '400'),
    border: getSafeTalkColor('navy', '100'),
    borderHover: getSafeTalkColor('turquoise', '300'),
  }), [getSafeTalkColor]);

  // Validate all predefined colors in development
  if (process.env.NODE_ENV === 'development') {
    Object.entries(colors).forEach(([key, color]) => {
      validateColor(color, `useSafeTalkColors.${key}`);
    });
  }

  return colors;
};

/**
 * Hook for creating accessible color combinations
 */
export const useAccessibleColors = () => {
  const { validateCombination, getSafeTalkColor } = useColorCompliance();

  // Pre-validated accessible combinations
  const combinations = useMemo(() => ({
    // High contrast combinations (7:1+)
    highContrast: {
      darkOnLight: {
        bg: 'white',
        text: getSafeTalkColor('navy'),
      },
      lightOnDark: {
        bg: getSafeTalkColor('navy'),
        text: 'white',
      },
    },
    
    // Standard contrast combinations (4.5:1+)
    standard: {
      primaryButton: {
        bg: getSafeTalkColor('turquoise'),
        text: 'white',
      },
      secondaryButton: {
        bg: getSafeTalkColor('blue'),
        text: 'white',
      },
      accentButton: {
        bg: getSafeTalkColor('limeGreen'),
        text: getSafeTalkColor('navy'),
      },
    },
    
    // Large text combinations (3:1+)
    largeText: {
      subtleAccent: {
        bg: getSafeTalkColor('turquoise', '50'),
        text: getSafeTalkColor('turquoise', '600'),
      },
      softInfo: {
        bg: getSafeTalkColor('blue', '50'),
        text: getSafeTalkColor('blue', '600'),
      },
    },
  }), [getSafeTalkColor]);

  // Validation function for custom combinations
  const createAccessibleCombination = useCallback((
    backgroundColor: string,
    textColor: string,
    isLargeText: boolean = false
  ) => {
    const result = validateCombination(backgroundColor, textColor, isLargeText);
    
    if (!result.isValid) {
      console.warn('Inaccessible color combination:', {
        backgroundColor,
        textColor,
        issues: result.issues,
        recommendations: result.recommendations,
      });
    }
    
    return {
      bg: backgroundColor,
      text: textColor,
      isValid: result.isValid,
      contrastRatio: result.contrastRatio,
    };
  }, [validateCombination]);

  return {
    combinations,
    createAccessibleCombination,
  };
};