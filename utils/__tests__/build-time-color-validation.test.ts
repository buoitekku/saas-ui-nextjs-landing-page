/**
 * Tests for build-time color validation utilities
 */

import { 
  validateThemeColors, 
  validateCommonColorCombinations,
  runBuildTimeValidation,
  type ValidationResult,
  type ColorUsageReport 
} from '../build-time-color-validation';

describe('Build-time Color Validation', () => {
  describe('validateThemeColors', () => {
    it('should return valid result when no theme colors provided', () => {
      const result = validateThemeColors();
      
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('No theme colors provided for validation');
    });

    it('should detect missing Safe Talk palette', () => {
      const mockTheme = {
        primary: { '400': '#3AB5B2' },
        secondary: { '400': '#71C6DA' }
      };
      
      const result = validateThemeColors(mockTheme);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Safe Talk color palette not found in theme');
    });
  });

  describe('validateCommonColorCombinations', () => {
    it('should validate color combinations', () => {
      const result = validateCommonColorCombinations();
      
      expect(result).toHaveProperty('isValid');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');
      expect(result).toHaveProperty('suggestions');
    });
  });

  describe('runBuildTimeValidation', () => {
    it('should handle validation errors gracefully', () => {
      const result = runBuildTimeValidation();
      
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('themeValidation');
      expect(result).toHaveProperty('accessibilityValidation');
      expect(result).toHaveProperty('report');
    });
  });
});