/**
 * Build-time color validation utilities
 * 
 * This module provides comprehensive validation for Safe Talk brand colors,
 * ensuring both brand compliance and accessibility standards are met during
 * the build process.
 * 
 * @example
 * ```typescript
 * import { runBuildTimeValidation } from './build-time-color-validation';
 * 
 * const result = runBuildTimeValidation();
 * if (!result.success) {
 *   console.error('Color validation failed');
 * }
 * ```
 */

import { validateBrandColor, validateColorCombination, SAFE_TALK_COLOR_VALUES } from './color-validation';
// Note: This import may need to be adjusted based on actual theme structure
// import { colors } from '#theme/foundations/colors';

/**
 * Result of a validation check
 */
export interface ValidationResult {
  /** Whether the validation passed without errors */
  isValid: boolean;
  /** Critical issues that must be fixed */
  errors: string[];
  /** Non-critical issues that should be addressed */
  warnings: string[];
  /** Helpful recommendations for improvement */
  suggestions: string[];
}

/**
 * Accessibility issue details
 */
export interface AccessibilityIssue {
  /** Background color token or hex value */
  background: string;
  /** Text color token or hex value */
  text: string;
  /** Actual contrast ratio */
  contrastRatio: number;
  /** Required minimum contrast ratio */
  requiredRatio: number;
}

/**
 * Comprehensive report of color usage across the application
 */
export interface ColorUsageReport {
  /** Total number of colors analyzed */
  totalColors: number;
  /** Number of colors that comply with brand guidelines */
  brandCompliantColors: number;
  /** List of colors that don't comply with brand guidelines */
  nonCompliantColors: string[];
  /** Accessibility issues found in color combinations */
  accessibilityIssues: AccessibilityIssue[];
}

// Type definitions for better type safety
type ColorScale = Record<string, string>;
type ThemeColors = {
  safeTalk?: Record<string, ColorScale>;
  primary?: ColorScale;
  secondary?: ColorScale;
  accent?: ColorScale;
  [key: string]: ColorScale | Record<string, ColorScale> | undefined;
};

type SemanticColorMapping = {
  primary: 'turquoise';
  secondary: 'blue';
  accent: 'limeGreen';
};

const SEMANTIC_COLOR_MAPPING: SemanticColorMapping = {
  primary: 'turquoise',
  secondary: 'blue',
  accent: 'limeGreen',
} as const;

/**
 * Validates a single color scale against expected values
 */
const validateColorScale = (
  colorScale: ColorScale,
  colorName: string,
  expectedValues: Record<string, string>,
  errors: string[]
): void => {
  Object.entries(colorScale).forEach(([shade, value]) => {
    const expectedKey = `safeTalk.${colorName}.${shade}`;
    const expectedValue = expectedValues[expectedKey];
    
    if (expectedValue && value !== expectedValue) {
      errors.push(
        `Color mismatch: ${expectedKey} is "${value}" but should be "${expectedValue}"`
      );
    }
  });
};

/**
 * Validates semantic colors mapping to Safe Talk colors
 */
const validateSemanticColors = (
  themeColors: ThemeColors,
  errors: string[]
): void => {
  Object.entries(SEMANTIC_COLOR_MAPPING).forEach(([semanticColor, safeTalkColor]) => {
    const semanticScale = themeColors[semanticColor];
    const safeTalkScale = themeColors.safeTalk?.[safeTalkColor];
    
    if (semanticScale && safeTalkScale) {
      Object.entries(semanticScale).forEach(([shade, value]) => {
        const expectedValue = safeTalkScale[shade];
        
        if (expectedValue && value !== expectedValue) {
          errors.push(
            `Semantic color mismatch: ${semanticColor}.${shade} should match safeTalk.${safeTalkColor}.${shade}`
          );
        }
      });
    }
  });
};

/**
 * Validates all colors in the theme configuration
 */
export const validateThemeColors = (themeColors?: ThemeColors): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Early return if no theme colors provided
  if (!themeColors) {
    warnings.push('No theme colors provided for validation');
    return { isValid: true, errors, warnings, suggestions };
  }

  // Validate main Safe Talk colors
  if (themeColors.safeTalk) {
    Object.entries(themeColors.safeTalk).forEach(([colorName, colorScale]) => {
      validateColorScale(colorScale, colorName, SAFE_TALK_COLOR_VALUES, errors);
    });
  } else {
    errors.push('Safe Talk color palette not found in theme');
  }

  // Validate semantic colors mapping
  validateSemanticColors(themeColors, errors);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
};

// Constants for color combinations
type ColorCombination = {
  bg: string;
  text: string;
  context: string;
};

const COMMON_COLOR_COMBINATIONS: readonly ColorCombination[] = [
  // Primary combinations
  { bg: 'safeTalk.turquoise.400', text: 'white', context: 'Primary CTA buttons' },
  { bg: 'white', text: 'safeTalk.turquoise.400', context: 'Primary links' },
  { bg: 'white', text: 'safeTalk.navy.400', context: 'Main text content' },
  
  // Secondary combinations
  { bg: 'safeTalk.blue.400', text: 'white', context: 'Secondary buttons' },
  { bg: 'white', text: 'safeTalk.blue.600', context: 'Secondary links' },
  { bg: 'safeTalk.blue.50', text: 'safeTalk.navy.400', context: 'Info sections' },
  
  // Success/accent combinations
  { bg: 'safeTalk.limeGreen.400', text: 'white', context: 'Success buttons' },
  { bg: 'safeTalk.limeGreen.50', text: 'safeTalk.navy.400', context: 'Success messages' },
  
  // Navigation and headers
  { bg: 'safeTalk.navy.400', text: 'white', context: 'Dark headers' },
  { bg: 'white', text: 'safeTalk.navy.300', context: 'Secondary text' },
] as const;

const AAA_CONTRAST_THRESHOLD = 7.0;
const AA_CONTRAST_THRESHOLD = 4.5;

/**
 * Validates a single color combination for accessibility
 */
const validateSingleColorCombination = (
  combination: ColorCombination,
  errors: string[],
  warnings: string[],
  suggestions: string[]
): void => {
  const { bg, text, context } = combination;
  const bgHex = SAFE_TALK_COLOR_VALUES[bg] || bg;
  const textHex = SAFE_TALK_COLOR_VALUES[text] || text;
  
  const result = validateColorCombination(bgHex, textHex, false);
  
  if (!result.accessible) {
    errors.push(
      `Accessibility issue in ${context}: ${bg} + ${text} has contrast ratio ${result.contrastRatio}:1 (minimum required: ${AA_CONTRAST_THRESHOLD}:1)`
    );
    
    if (result.recommendations.length > 0) {
      suggestions.push(`For ${context}: ${result.recommendations.join(', ')}`);
    }
  } else if (result.contrastRatio < AAA_CONTRAST_THRESHOLD) {
    warnings.push(
      `${context} contrast could be improved: ${result.contrastRatio}:1 (AAA standard: ${AAA_CONTRAST_THRESHOLD}:1)`
    );
  }
};

/**
 * Validates common color combinations for accessibility
 */
export const validateCommonColorCombinations = (): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  COMMON_COLOR_COMBINATIONS.forEach(combination => {
    validateSingleColorCombination(combination, errors, warnings, suggestions);
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
};

/**
 * Generates a comprehensive color usage report
 */
export const generateColorUsageReport = (): ColorUsageReport => {
  const allColors = Object.keys(SAFE_TALK_COLOR_VALUES);
  const brandCompliantColors = allColors.filter(color => validateBrandColor(color));
  const nonCompliantColors = allColors.filter(color => !validateBrandColor(color));

  // Check accessibility issues in common combinations
  const accessibilityIssues: ColorUsageReport['accessibilityIssues'] = [];
  
  const testCombinations = [
    { bg: 'white', text: 'safeTalk.turquoise.300' },
    { bg: 'white', text: 'safeTalk.blue.300' },
    { bg: 'white', text: 'safeTalk.limeGreen.300' },
    { bg: 'safeTalk.turquoise.400', text: 'safeTalk.navy.200' },
  ];

  testCombinations.forEach(({ bg, text }) => {
    const bgHex = SAFE_TALK_COLOR_VALUES[bg] || bg;
    const textHex = SAFE_TALK_COLOR_VALUES[text] || text;
    
    const result = validateColorCombination(bgHex, textHex, false);
    
    if (!result.accessible) {
      accessibilityIssues.push({
        background: bg,
        text: text,
        contrastRatio: result.contrastRatio,
        requiredRatio: 4.5,
      });
    }
  });

  return {
    totalColors: allColors.length,
    brandCompliantColors: brandCompliantColors.length,
    nonCompliantColors,
    accessibilityIssues,
  };
};

// Type for validation results
type BuildTimeValidationResult = {
  success: boolean;
  themeValidation: ValidationResult;
  accessibilityValidation: ValidationResult;
  report: ColorUsageReport;
};

/**
 * Logs validation results in a structured format
 */
const logValidationResults = (
  themeValidation: ValidationResult,
  accessibilityValidation: ValidationResult,
  report: ColorUsageReport
): void => {
  // Log errors
  const allErrors = [...themeValidation.errors, ...accessibilityValidation.errors];
  if (allErrors.length > 0) {
    console.error('❌ Color Validation Errors:');
    allErrors.forEach(error => console.error(`  • ${error}`));
  }

  // Log warnings
  const allWarnings = [...themeValidation.warnings, ...accessibilityValidation.warnings];
  if (allWarnings.length > 0) {
    console.warn('⚠️  Validation Warnings:');
    allWarnings.forEach(warning => console.warn(`  • ${warning}`));
  }

  // Log suggestions
  const allSuggestions = [...themeValidation.suggestions, ...accessibilityValidation.suggestions];
  if (allSuggestions.length > 0) {
    console.info('💡 Suggestions:');
    allSuggestions.forEach(suggestion => console.info(`  • ${suggestion}`));
  }

  // Log summary
  console.log('📊 Color Usage Summary:');
  console.log(`  • Total colors: ${report.totalColors}`);
  console.log(`  • Brand compliant: ${report.brandCompliantColors}/${report.totalColors}`);
  console.log(`  • Accessibility issues: ${report.accessibilityIssues.length}`);
  
  const compliancePercentage = report.totalColors > 0 
    ? Math.round((report.brandCompliantColors / report.totalColors) * 100)
    : 0;
  console.log(`  • Compliance rate: ${compliancePercentage}%`);
};

/**
 * Main build-time validation function
 */
export const runBuildTimeValidation = (themeColors?: ThemeColors): BuildTimeValidationResult => {
  console.log('🎨 Running Safe Talk brand color validation...');
  
  try {
    const themeValidation = validateThemeColors(themeColors);
    const accessibilityValidation = validateCommonColorCombinations();
    const report = generateColorUsageReport();

    logValidationResults(themeValidation, accessibilityValidation, report);

    const success = themeValidation.isValid && accessibilityValidation.isValid;
    
    if (success) {
      console.log('✅ All color validations passed!');
    } else {
      console.error('❌ Color validation failed. Please fix the issues above.');
    }

    return {
      success,
      themeValidation,
      accessibilityValidation,
      report,
    };
  } catch (error) {
    console.error('💥 Validation process failed:', error);
    
    // Return a failed result with error information
    const failedResult: ValidationResult = {
      isValid: false,
      errors: [`Validation process failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      warnings: [],
      suggestions: ['Check the color validation configuration and try again'],
    };

    return {
      success: false,
      themeValidation: failedResult,
      accessibilityValidation: { isValid: true, errors: [], warnings: [], suggestions: [] },
      report: { totalColors: 0, brandCompliantColors: 0, nonCompliantColors: [], accessibilityIssues: [] },
    };
  }
};

/**
 * Utility for CI/CD integration
 * @param themeColors - Optional theme colors to validate
 * @param exitOnFailure - Whether to exit process on validation failure (default: true)
 */
export const validateColorsForCI = (
  themeColors?: ThemeColors, 
  exitOnFailure: boolean = true
): BuildTimeValidationResult => {
  const result = runBuildTimeValidation(themeColors);
  
  if (!result.success && exitOnFailure) {
    console.error('🚨 Color validation failed in CI environment');
    process.exit(1);
  }
  
  return result;
};