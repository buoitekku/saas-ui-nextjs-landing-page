/**
 * Comprehensive test suite for Safe Talk color validation utilities
 */

import {
  validateBrandColor,
  getContrastRatio,
  validateColorAccessibility,
  validateColorCombination,
  getSafeTalkColorValue,
  SAFE_TALK_COLOR_VALUES,
} from '../utils/color-validation';

import {
  validateThemeColors,
  validateCommonColorCombinations,
  generateColorUsageReport,
} from '../utils/build-time-color-validation';

describe('Safe Talk Color Validation', () => {
  describe('validateBrandColor', () => {
    test('should accept valid Safe Talk colors', () => {
      const validColors = [
        'safeTalk.turquoise.400',
        'safeTalk.blue.500',
        'safeTalk.limeGreen.300',
        'safeTalk.purple.600',
        'safeTalk.navy.400',
        'primary.400',
        'secondary.500',
        'accent.300',
        'white',
        'black',
        'transparent',
        'gray.50',
        'gray.100',
        'gray.200',
      ];

      validColors.forEach(color => {
        expect(validateBrandColor(color)).toBe(true);
      });
    });

    test('should reject non-compliant colors', () => {
      const invalidColors = [
        'red.500',
        'blue.500', // Generic blue, not safeTalk.blue
        'green.400',
        'yellow.300',
        'gray.300', // Too dark gray
        'gray.500',
        'purple.400', // Generic purple, not safeTalk.purple
        'orange.200',
        '#FF0000',
        'rgb(255, 0, 0)',
      ];

      invalidColors.forEach(color => {
        expect(validateBrandColor(color)).toBe(false);
      });
    });

    test('should handle edge cases', () => {
      expect(validateBrandColor('')).toBe(false);
      expect(validateBrandColor(null as any)).toBe(false);
      expect(validateBrandColor(undefined as any)).toBe(false);
      expect(validateBrandColor(123 as any)).toBe(false);
    });
  });

  describe('getContrastRatio', () => {
    test('should calculate correct contrast ratios for known combinations', () => {
      // White on black should be maximum contrast (21:1)
      const whiteOnBlack = getContrastRatio('#FFFFFF', '#000000');
      expect(whiteOnBlack).toBeCloseTo(21, 0);

      // Same colors should have 1:1 ratio
      const sameColor = getContrastRatio('#FFFFFF', '#FFFFFF');
      expect(sameColor).toBeCloseTo(1, 1);

      // Safe Talk turquoise on white
      const turquoiseOnWhite = getContrastRatio('#3AB5B2', '#FFFFFF');
      expect(turquoiseOnWhite).toBeGreaterThan(3);
    });

    test('should handle named colors', () => {
      const whiteOnBlack = getContrastRatio('white', 'black');
      expect(whiteOnBlack).toBeCloseTo(21, 0);

      const blackOnWhite = getContrastRatio('black', 'white');
      expect(blackOnWhite).toBeCloseTo(21, 0);
    });

    test('should handle invalid colors gracefully', () => {
      const invalidResult = getContrastRatio('invalid-color', '#FFFFFF');
      expect(invalidResult).toBe(0);
    });
  });

  describe('validateColorAccessibility', () => {
    test('should validate high contrast combinations', () => {
      const result = validateColorAccessibility('#FFFFFF', '#000000');
      
      expect(result.isValid).toBe(true);
      expect(result.contrastRatio).toBeGreaterThan(4.5);
      expect(result.requiredRatio).toBe(4.5);
      expect(result.recommendation).toBeUndefined();
    });

    test('should detect low contrast issues', () => {
      const result = validateColorAccessibility('#FFFFFF', '#CCCCCC');
      
      expect(result.isValid).toBe(false);
      expect(result.contrastRatio).toBeLessThan(4.5);
      expect(result.recommendation).toBeDefined();
    });

    test('should handle large text requirements', () => {
      // A combination that passes for large text but not normal text
      const normalTextResult = validateColorAccessibility('#FFFFFF', '#999999', false);
      const largeTextResult = validateColorAccessibility('#FFFFFF', '#999999', true);
      
      expect(normalTextResult.requiredRatio).toBe(4.5);
      expect(largeTextResult.requiredRatio).toBe(3.0);
    });

    test('should handle AAA level requirements', () => {
      const aaResult = validateColorAccessibility('#FFFFFF', '#666666', false, 'AA');
      const aaaResult = validateColorAccessibility('#FFFFFF', '#666666', false, 'AAA');
      
      expect(aaResult.requiredRatio).toBe(4.5);
      expect(aaaResult.requiredRatio).toBe(7.0);
    });
  });

  describe('validateColorCombination', () => {
    test('should validate compliant Safe Talk combinations', () => {
      const result = validateColorCombination(
        'safeTalk.turquoise.400',
        'white'
      );

      expect(result.brandCompliant).toBe(true);
      expect(result.accessible).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    test('should detect brand compliance issues', () => {
      const result = validateColorCombination(
        'red.500', // Non-compliant background
        'safeTalk.navy.400'
      );

      expect(result.brandCompliant).toBe(false);
      expect(result.issues.some(issue => issue.includes('brand palette'))).toBe(true);
    });

    test('should detect accessibility issues', () => {
      const result = validateColorCombination(
        'safeTalk.turquoise.200', // Light background
        'safeTalk.turquoise.300'  // Light text - poor contrast
      );

      expect(result.accessible).toBe(false);
      expect(result.issues.some(issue => issue.includes('contrast'))).toBe(true);
    });

    test('should provide helpful recommendations', () => {
      const result = validateColorCombination(
        'white',
        'safeTalk.turquoise.200' // Too light for good contrast
      );

      expect(result.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('getSafeTalkColorValue', () => {
    test('should return correct hex values for Safe Talk colors', () => {
      expect(getSafeTalkColorValue('safeTalk.turquoise.400')).toBe('#3AB5B2');
      expect(getSafeTalkColorValue('safeTalk.blue.400')).toBe('#71C6DA');
      expect(getSafeTalkColorValue('safeTalk.navy.400')).toBe('#0A3447');
      expect(getSafeTalkColorValue('white')).toBe('#FFFFFF');
    });

    test('should return null for unknown colors', () => {
      expect(getSafeTalkColorValue('unknown.color')).toBeNull();
      expect(getSafeTalkColorValue('red.500')).toBeNull();
    });
  });
});

describe('Build-time Color Validation', () => {
  describe('validateThemeColors', () => {
    test('should validate theme color consistency', () => {
      const result = validateThemeColors();
      
      // Should have minimal errors in a properly configured theme
      expect(result.errors.length).toBeLessThan(5);
      
      // Should provide actionable feedback
      if (result.errors.length > 0) {
        result.errors.forEach(error => {
          expect(error).toMatch(/Color mismatch|should match/);
        });
      }
    });
  });

  describe('validateCommonColorCombinations', () => {
    test('should validate accessibility of common UI combinations', () => {
      const result = validateCommonColorCombinations();
      
      // Critical combinations should pass accessibility
      expect(result.errors.length).toBe(0);
      
      // May have warnings for AAA compliance
      if (result.warnings.length > 0) {
        result.warnings.forEach(warning => {
          expect(warning).toMatch(/contrast could be improved/);
        });
      }
    });
  });

  describe('generateColorUsageReport', () => {
    test('should generate comprehensive usage statistics', () => {
      const report = generateColorUsageReport();
      
      expect(report.totalColors).toBeGreaterThan(0);
      expect(report.brandCompliantColors).toBeGreaterThan(0);
      expect(report.brandCompliantColors).toBeLessThanOrEqual(report.totalColors);
      expect(Array.isArray(report.nonCompliantColors)).toBe(true);
      expect(Array.isArray(report.accessibilityIssues)).toBe(true);
    });

    test('should identify accessibility issues', () => {
      const report = generateColorUsageReport();
      
      report.accessibilityIssues.forEach(issue => {
        expect(issue).toHaveProperty('background');
        expect(issue).toHaveProperty('text');
        expect(issue).toHaveProperty('contrastRatio');
        expect(issue).toHaveProperty('requiredRatio');
        expect(issue.contrastRatio).toBeLessThan(issue.requiredRatio);
      });
    });
  });
});

describe('Safe Talk Color Values', () => {
  test('should have all required brand colors defined', () => {
    const requiredColors = [
      'safeTalk.turquoise.400',
      'safeTalk.blue.400', 
      'safeTalk.limeGreen.400',
      'safeTalk.purple.400',
      'safeTalk.navy.400',
    ];

    requiredColors.forEach(color => {
      expect(SAFE_TALK_COLOR_VALUES[color]).toBeDefined();
      expect(SAFE_TALK_COLOR_VALUES[color]).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  test('should have complete color scales', () => {
    const colorNames = ['turquoise', 'blue', 'limeGreen', 'purple', 'navy'];
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

    colorNames.forEach(colorName => {
      shades.forEach(shade => {
        const colorKey = `safeTalk.${colorName}.${shade}`;
        expect(SAFE_TALK_COLOR_VALUES[colorKey]).toBeDefined();
        expect(SAFE_TALK_COLOR_VALUES[colorKey]).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });
  });

  test('should have proper color progression in scales', () => {
    const colorNames = ['turquoise', 'blue', 'limeGreen', 'purple', 'navy'];
    
    colorNames.forEach(colorName => {
      const shade50 = SAFE_TALK_COLOR_VALUES[`safeTalk.${colorName}.50`];
      const shade900 = SAFE_TALK_COLOR_VALUES[`safeTalk.${colorName}.900`];
      
      // Shade 50 should be lighter than shade 900
      const contrast50to900 = getContrastRatio(shade50, shade900);
      expect(contrast50to900).toBeGreaterThan(1);
    });
  });
});