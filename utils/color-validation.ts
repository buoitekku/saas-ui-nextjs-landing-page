/**
 * Color validation utilities for Safe Talk brand compliance
 * Ensures proper brand color usage and accessibility compliance
 */

// Safe Talk brand color patterns
const SAFE_TALK_COLOR_PATTERNS = [
  // Main Safe Talk colors
  /^safeTalk\.(turquoise|blue|limeGreen|purple|navy)\.(50|100|200|300|400|500|600|700|800|900)$/,
  // Supporting Safe Talk colors
  /^safeTalkSupport\.(green|purpleGray|lightBlue)\.(50|100|200|300|400|500|600|700|800|900)$/,
  // Semantic colors mapped to Safe Talk
  /^(primary|secondary|accent)\.(50|100|200|300|400|500|600|700|800|900)$/,
  // Semantic tokens
  /^safe-talk-(primary|secondary|accent|text|text-muted)$/,
  // Allowed neutral colors
  /^(white|black|transparent)$/,
  // Limited gray usage for subtle backgrounds only
  /^gray\.(50|100|200)$/,
];

// Minimum contrast ratios per WCAG guidelines
const CONTRAST_REQUIREMENTS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3.0,
  AAA_NORMAL: 7.0,
  AAA_LARGE: 4.5,
} as const;

/**
 * Validates if a color follows Safe Talk brand guidelines
 */
export const validateBrandColor = (color: string): boolean => {
  if (!color || typeof color !== 'string') {
    return false;
  }

  return SAFE_TALK_COLOR_PATTERNS.some(pattern => pattern.test(color));
};

/**
 * Converts hex color to RGB values
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Calculates relative luminance of a color
 */
const getRelativeLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculates contrast ratio between two colors
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  // Handle named colors
  const colorMap: Record<string, string> = {
    white: '#FFFFFF',
    black: '#000000',
    transparent: '#FFFFFF', // Assume white background for transparent
  };

  const hex1 = colorMap[color1] || color1;
  const hex2 = colorMap[color2] || color2;

  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) {
    console.warn(`Invalid color format: ${color1} or ${color2}`);
    return 0;
  }

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Validates if color combination meets accessibility standards
 */
export const validateColorAccessibility = (
  backgroundColor: string,
  textColor: string,
  isLargeText: boolean = false,
  level: 'AA' | 'AAA' = 'AA'
): {
  isValid: boolean;
  contrastRatio: number;
  requiredRatio: number;
  recommendation?: string;
} => {
  const contrastRatio = getContrastRatio(backgroundColor, textColor);
  
  const requiredRatio = isLargeText 
    ? (level === 'AAA' ? CONTRAST_REQUIREMENTS.AAA_LARGE : CONTRAST_REQUIREMENTS.AA_LARGE)
    : (level === 'AAA' ? CONTRAST_REQUIREMENTS.AAA_NORMAL : CONTRAST_REQUIREMENTS.AA_NORMAL);

  const isValid = contrastRatio >= requiredRatio;

  let recommendation: string | undefined;
  if (!isValid) {
    if (contrastRatio < CONTRAST_REQUIREMENTS.AA_LARGE) {
      recommendation = 'Consider using darker text or lighter background colors from the Safe Talk palette';
    } else if (contrastRatio < CONTRAST_REQUIREMENTS.AA_NORMAL) {
      recommendation = 'This combination is only suitable for large text (18pt+)';
    }
  }

  return {
    isValid,
    contrastRatio: Math.round(contrastRatio * 100) / 100,
    requiredRatio,
    recommendation,
  };
};

/**
 * Safe Talk brand color mappings with hex values for validation
 */
export const SAFE_TALK_COLOR_VALUES: Record<string, string> = {
  // Turquoise
  'safeTalk.turquoise.50': '#E6F7F6',
  'safeTalk.turquoise.100': '#B3E9E7',
  'safeTalk.turquoise.200': '#80DBD8',
  'safeTalk.turquoise.300': '#4DCDC9',
  'safeTalk.turquoise.400': '#3AB5B2',
  'safeTalk.turquoise.500': '#329A97',
  'safeTalk.turquoise.600': '#2A7F7C',
  'safeTalk.turquoise.700': '#226461',
  'safeTalk.turquoise.800': '#1A4946',
  'safeTalk.turquoise.900': '#122E2B',
  
  // Blue
  'safeTalk.blue.50': '#EBF8FC',
  'safeTalk.blue.100': '#C7EBF6',
  'safeTalk.blue.200': '#A3DEF0',
  'safeTalk.blue.300': '#7FD1EA',
  'safeTalk.blue.400': '#71C6DA',
  'safeTalk.blue.500': '#5BB0C4',
  'safeTalk.blue.600': '#4A93A3',
  'safeTalk.blue.700': '#397682',
  'safeTalk.blue.800': '#285961',
  'safeTalk.blue.900': '#173C40',
  
  // Lime Green
  'safeTalk.limeGreen.50': '#F5F9E8',
  'safeTalk.limeGreen.100': '#E6EFBC',
  'safeTalk.limeGreen.200': '#D7E590',
  'safeTalk.limeGreen.300': '#C8DB64',
  'safeTalk.limeGreen.400': '#C5D54E',
  'safeTalk.limeGreen.500': '#B0C043',
  'safeTalk.limeGreen.600': '#94A038',
  'safeTalk.limeGreen.700': '#78802D',
  'safeTalk.limeGreen.800': '#5C6022',
  'safeTalk.limeGreen.900': '#404017',
  
  // Purple
  'safeTalk.purple.50': '#F0EDF6',
  'safeTalk.purple.100': '#D4CCE6',
  'safeTalk.purple.200': '#B8ABD6',
  'safeTalk.purple.300': '#9C8AC6',
  'safeTalk.purple.400': '#8974B2',
  'safeTalk.purple.500': '#7A659E',
  'safeTalk.purple.600': '#65548A',
  'safeTalk.purple.700': '#504376',
  'safeTalk.purple.800': '#3B3262',
  'safeTalk.purple.900': '#26214E',
  
  // Navy
  'safeTalk.navy.50': '#E6E9EC',
  'safeTalk.navy.100': '#B3BCC4',
  'safeTalk.navy.200': '#808F9C',
  'safeTalk.navy.300': '#4D6274',
  'safeTalk.navy.400': '#0A3447',
  'safeTalk.navy.500': '#092E3F',
  'safeTalk.navy.600': '#082837',
  'safeTalk.navy.700': '#07222F',
  'safeTalk.navy.800': '#061C27',
  'safeTalk.navy.900': '#05161F',
  
  // Semantic colors
  'primary.400': '#3AB5B2',
  'secondary.400': '#71C6DA',
  'accent.400': '#C5D54E',
  
  // Common colors
  'white': '#FFFFFF',
  'black': '#000000',
};

/**
 * Gets the hex value for a Safe Talk color token
 */
export const getSafeTalkColorValue = (colorToken: string): string | null => {
  return SAFE_TALK_COLOR_VALUES[colorToken] || null;
};

/**
 * Validates a complete color combination for brand compliance and accessibility
 */
export const validateColorCombination = (
  backgroundColor: string,
  textColor: string,
  isLargeText: boolean = false
): {
  brandCompliant: boolean;
  accessible: boolean;
  contrastRatio: number;
  issues: string[];
  recommendations: string[];
} => {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check brand compliance
  const bgBrandCompliant = validateBrandColor(backgroundColor);
  const textBrandCompliant = validateBrandColor(textColor);
  
  if (!bgBrandCompliant) {
    issues.push(`Background color "${backgroundColor}" is not from Safe Talk brand palette`);
    recommendations.push('Use colors from safeTalk.* palette for backgrounds');
  }
  
  if (!textBrandCompliant) {
    issues.push(`Text color "${textColor}" is not from Safe Talk brand palette`);
    recommendations.push('Use safeTalk.navy.* colors for text or white for dark backgrounds');
  }

  // Check accessibility
  const bgHex = getSafeTalkColorValue(backgroundColor) || backgroundColor;
  const textHex = getSafeTalkColorValue(textColor) || textColor;
  
  const accessibilityResult = validateColorAccessibility(bgHex, textHex, isLargeText);
  
  if (!accessibilityResult.isValid) {
    issues.push(`Contrast ratio ${accessibilityResult.contrastRatio}:1 is below required ${accessibilityResult.requiredRatio}:1`);
    if (accessibilityResult.recommendation) {
      recommendations.push(accessibilityResult.recommendation);
    }
  }

  return {
    brandCompliant: bgBrandCompliant && textBrandCompliant,
    accessible: accessibilityResult.isValid,
    contrastRatio: accessibilityResult.contrastRatio,
    issues,
    recommendations,
  };
};