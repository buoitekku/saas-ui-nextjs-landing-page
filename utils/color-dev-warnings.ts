/**
 * Development-mode color validation warnings
 * Provides real-time feedback for brand compliance during development
 */

import { validateBrandColor, validateColorCombination, getSafeTalkColorValue } from './color-validation';

// Track warned combinations to avoid spam
const warnedCombinations = new Set<string>();

/**
 * Development mode color validation with console warnings
 */
export const validateColorInDev = (
  color: string,
  context: string = 'component'
): boolean => {
  if (process.env.NODE_ENV !== 'development') {
    return true;
  }

  const isValid = validateBrandColor(color);
  
  if (!isValid) {
    const warningKey = `${color}-${context}`;
    
    if (!warnedCombinations.has(warningKey)) {
      console.warn(
        `🎨 Safe Talk Brand Warning: Non-compliant color "${color}" used in ${context}`,
        '\n📋 Allowed patterns:',
        '\n  • safeTalk.{turquoise|blue|limeGreen|purple|navy}.{50-900}',
        '\n  • safeTalkSupport.{green|purpleGray|lightBlue}.{50-900}',
        '\n  • {primary|secondary|accent}.{50-900}',
        '\n  • safe-talk-{primary|secondary|accent|text|text-muted}',
        '\n  • white, black, transparent',
        '\n  • gray.{50|100|200} (limited use)',
        '\n💡 Suggestion: Replace with appropriate Safe Talk brand color'
      );
      warnedCombinations.add(warningKey);
    }
  }

  return isValid;
};

/**
 * Validates color combination with development warnings
 */
export const validateColorCombinationInDev = (
  backgroundColor: string,
  textColor: string,
  isLargeText: boolean = false,
  context: string = 'component'
): boolean => {
  if (process.env.NODE_ENV !== 'development') {
    return true;
  }

  const result = validateColorCombination(backgroundColor, textColor, isLargeText);
  const warningKey = `${backgroundColor}-${textColor}-${context}`;

  if ((!result.brandCompliant || !result.accessible) && !warnedCombinations.has(warningKey)) {
    console.group(`🎨 Safe Talk Color Validation - ${context}`);
    
    if (!result.brandCompliant) {
      console.warn('❌ Brand Compliance Issues:');
      result.issues
        .filter(issue => issue.includes('brand palette'))
        .forEach(issue => console.warn(`  • ${issue}`));
    }

    if (!result.accessible) {
      console.warn('♿ Accessibility Issues:');
      result.issues
        .filter(issue => issue.includes('contrast'))
        .forEach(issue => console.warn(`  • ${issue}`));
    }

    if (result.recommendations.length > 0) {
      console.info('💡 Recommendations:');
      result.recommendations.forEach(rec => console.info(`  • ${rec}`));
    }

    console.info(`📊 Current contrast ratio: ${result.contrastRatio}:1`);
    console.groupEnd();
    
    warnedCombinations.add(warningKey);
  }

  return result.brandCompliant && result.accessible;
};

/**
 * Chakra UI style prop validator for development
 */
export const validateChakraStyleProp = (
  styleProp: Record<string, any>,
  componentName: string = 'Component'
): void => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const colorProps = [
    'color', 'bg', 'backgroundColor', 'borderColor', 'outlineColor',
    'textColor', 'fill', 'stroke', 'shadowColor'
  ];

  Object.entries(styleProp).forEach(([prop, value]) => {
    if (colorProps.includes(prop) && typeof value === 'string') {
      validateColorInDev(value, `${componentName}.${prop}`);
    }

    // Check for color combinations
    if (prop === 'bg' || prop === 'backgroundColor') {
      const textColor = styleProp.color || styleProp.textColor;
      if (textColor && typeof textColor === 'string') {
        validateColorCombinationInDev(
          value,
          textColor,
          false,
          `${componentName} bg+text`
        );
      }
    }
  });
};

/**
 * Hook for validating colors in React components during development
 */
export const useColorValidation = (
  colors: Record<string, string>,
  componentName: string = 'Component'
) => {
  if (process.env.NODE_ENV === 'development') {
    Object.entries(colors).forEach(([key, color]) => {
      validateColorInDev(color, `${componentName}.${key}`);
    });
  }
};

/**
 * Utility to check if current environment should show warnings
 */
export const shouldShowColorWarnings = (): boolean => {
  return process.env.NODE_ENV === 'development' && 
         process.env.DISABLE_COLOR_WARNINGS !== 'true';
};

/**
 * Batch validate multiple colors with context
 */
export const validateColorsInDev = (
  colors: Array<{ color: string; context: string }>,
  componentName: string = 'Component'
): boolean => {
  if (!shouldShowColorWarnings()) {
    return true;
  }

  let allValid = true;
  
  colors.forEach(({ color, context }) => {
    const isValid = validateColorInDev(color, `${componentName}.${context}`);
    if (!isValid) {
      allValid = false;
    }
  });

  return allValid;
};

/**
 * Create a color validation wrapper for styled components
 */
export const withColorValidation = <T extends Record<string, any>>(
  styles: T,
  componentName: string = 'StyledComponent'
): T => {
  if (shouldShowColorWarnings()) {
    validateChakraStyleProp(styles, componentName);
  }
  return styles;
};