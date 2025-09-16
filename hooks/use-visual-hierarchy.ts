/**
 * React hook for managing Safe Talk visual hierarchy and brand consistency
 */

import { useCallback, useMemo } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { 
  typographyHierarchy, 
  bodyTextHierarchy, 
  linkHierarchy, 
  badgeHierarchy,
  statusColors,
  createHeadingStyle,
  createBodyTextStyle,
  createLinkStyle,
  createBadgeStyle
} from '../theme/foundations/typography-hierarchy';

interface VisualHierarchyOptions {
  // Color mode preferences
  respectColorMode?: boolean;
  
  // Accessibility options
  highContrast?: boolean;
  reducedMotion?: boolean;
  
  // Brand compliance
  enforceCompliance?: boolean;
}

interface UseVisualHierarchyReturn {
  // Typography utilities
  getHeadingStyle: (level: keyof typeof typographyHierarchy) => any;
  getBodyTextStyle: (variant: keyof typeof bodyTextHierarchy) => any;
  getLinkStyle: (variant: keyof typeof linkHierarchy) => any;
  getBadgeStyle: (variant: keyof typeof badgeHierarchy) => any;
  
  // Color utilities
  getStatusColor: (status: keyof typeof statusColors) => any;
  getBrandColor: (color: 'primary' | 'secondary' | 'accent' | 'text' | 'muted') => string;
  
  // Hierarchy helpers
  createSection: (level: 'hero' | 'main' | 'sub' | 'component') => any;
  createTextHierarchy: (content: 'heading' | 'body' | 'caption' | 'label') => any;
  
  // Validation utilities
  validateColorContrast: (bg: string, text: string) => boolean;
  validateBrandCompliance: (styles: Record<string, any>) => boolean;
  
  // Responsive utilities
  getResponsiveTextSize: (baseSize: string) => any;
  getResponsiveSpacing: (baseSpacing: number) => any;
}

/**
 * Hook for managing Safe Talk visual hierarchy and brand consistency
 */
export const useVisualHierarchy = (
  options: VisualHierarchyOptions = {}
): UseVisualHierarchyReturn => {
  const {
    respectColorMode = true,
    highContrast = false,
    reducedMotion = false,
    enforceCompliance = true,
  } = options;

  // Color mode values
  const primaryColor = useColorModeValue('safeTalk.turquoise.400', 'safeTalk.turquoise.300');
  const secondaryColor = useColorModeValue('safeTalk.blue.400', 'safeTalk.blue.300');
  const accentColor = useColorModeValue('safeTalk.limeGreen.400', 'safeTalk.limeGreen.300');
  const textColor = useColorModeValue('safeTalk.navy.400', 'white');
  const mutedTextColor = useColorModeValue('safeTalk.navy.300', 'gray.400');

  // Typography style getters
  const getHeadingStyle = useCallback((level: keyof typeof typographyHierarchy) => {
    const baseStyle = createHeadingStyle(level);
    
    if (respectColorMode) {
      return {
        ...baseStyle,
        color: level === 'h1' || level === 'h2' ? textColor : 
               level === 'h3' || level === 'h4' ? primaryColor : 
               secondaryColor,
      };
    }
    
    return baseStyle;
  }, [respectColorMode, textColor, primaryColor, secondaryColor]);

  const getBodyTextStyle = useCallback((variant: keyof typeof bodyTextHierarchy) => {
    const baseStyle = createBodyTextStyle(variant);
    
    if (respectColorMode) {
      return {
        ...baseStyle,
        color: variant === 'lead' ? textColor : mutedTextColor,
      };
    }
    
    return baseStyle;
  }, [respectColorMode, textColor, mutedTextColor]);

  const getLinkStyle = useCallback((variant: keyof typeof linkHierarchy) => {
    const baseStyle = createLinkStyle(variant);
    
    if (respectColorMode) {
      const colorMap = {
        primary: primaryColor,
        secondary: secondaryColor,
        subtle: mutedTextColor,
        external: primaryColor,
      };
      
      return {
        ...baseStyle,
        color: colorMap[variant],
      };
    }
    
    return baseStyle;
  }, [respectColorMode, primaryColor, secondaryColor, mutedTextColor]);

  const getBadgeStyle = useCallback((variant: keyof typeof badgeHierarchy) => {
    return createBadgeStyle(variant);
  }, []);

  // Color utilities
  const getStatusColor = useCallback((status: keyof typeof statusColors) => {
    return statusColors[status];
  }, []);

  const getBrandColor = useCallback((color: 'primary' | 'secondary' | 'accent' | 'text' | 'muted') => {
    const colorMap = {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
      text: textColor,
      muted: mutedTextColor,
    };
    
    return colorMap[color];
  }, [primaryColor, secondaryColor, accentColor, textColor, mutedTextColor]);

  // Hierarchy helpers
  const createSection = useCallback((level: 'hero' | 'main' | 'sub' | 'component') => {
    const sectionStyles = {
      hero: {
        heading: getHeadingStyle('h1'),
        subheading: getBodyTextStyle('lead'),
        spacing: { base: 12, md: 16, lg: 20 },
      },
      main: {
        heading: getHeadingStyle('h2'),
        subheading: getBodyTextStyle('large'),
        spacing: { base: 8, md: 12, lg: 16 },
      },
      sub: {
        heading: getHeadingStyle('h3'),
        subheading: getBodyTextStyle('regular'),
        spacing: { base: 6, md: 8, lg: 12 },
      },
      component: {
        heading: getHeadingStyle('h4'),
        subheading: getBodyTextStyle('small'),
        spacing: { base: 4, md: 6, lg: 8 },
      },
    };
    
    return sectionStyles[level];
  }, [getHeadingStyle, getBodyTextStyle]);

  const createTextHierarchy = useCallback((content: 'heading' | 'body' | 'caption' | 'label') => {
    const hierarchyMap = {
      heading: getHeadingStyle('h3'),
      body: getBodyTextStyle('regular'),
      caption: getBodyTextStyle('caption'),
      label: getHeadingStyle('h6'),
    };
    
    return hierarchyMap[content];
  }, [getHeadingStyle, getBodyTextStyle]);

  // Validation utilities
  const validateColorContrast = useCallback((bg: string, text: string): boolean => {
    // This would integrate with the color validation utilities
    // For now, return true as a placeholder
    return true;
  }, []);

  const validateBrandCompliance = useCallback((styles: Record<string, any>): boolean => {
    if (!enforceCompliance) return true;
    
    // Check for non-compliant colors
    const colorProps = ['color', 'bg', 'backgroundColor', 'borderColor'];
    
    for (const prop of colorProps) {
      if (styles[prop] && typeof styles[prop] === 'string') {
        const color = styles[prop];
        // Check if color follows Safe Talk patterns
        const isCompliant = /^safeTalk\.|^(white|black|transparent)$|^gray\.(50|100|200)$/.test(color);
        if (!isCompliant) {
          console.warn(`Non-compliant color detected: ${prop}: ${color}`);
          return false;
        }
      }
    }
    
    return true;
  }, [enforceCompliance]);

  // Responsive utilities
  const getResponsiveTextSize = useCallback((baseSize: string) => {
    const sizeMap: Record<string, any> = {
      xs: { base: 'xs', md: 'sm' },
      sm: { base: 'sm', md: 'md' },
      md: { base: 'md', md: 'lg' },
      lg: { base: 'lg', md: 'xl' },
      xl: { base: 'xl', md: '2xl' },
      '2xl': { base: '2xl', md: '3xl' },
      '3xl': { base: '3xl', md: '4xl' },
      '4xl': { base: '4xl', md: '5xl' },
    };
    
    return sizeMap[baseSize] || { base: baseSize };
  }, []);

  const getResponsiveSpacing = useCallback((baseSpacing: number) => {
    return {
      base: baseSpacing,
      md: Math.round(baseSpacing * 1.25),
      lg: Math.round(baseSpacing * 1.5),
    };
  }, []);

  return {
    getHeadingStyle,
    getBodyTextStyle,
    getLinkStyle,
    getBadgeStyle,
    getStatusColor,
    getBrandColor,
    createSection,
    createTextHierarchy,
    validateColorContrast,
    validateBrandCompliance,
    getResponsiveTextSize,
    getResponsiveSpacing,
  };
};

/**
 * Hook for creating consistent section layouts with proper hierarchy
 */
export const useSectionLayout = (level: 'hero' | 'main' | 'sub' | 'component' = 'main') => {
  const { createSection, getResponsiveSpacing } = useVisualHierarchy();
  
  const sectionConfig = useMemo(() => createSection(level), [createSection, level]);
  
  const getSectionProps = useCallback(() => ({
    py: getResponsiveSpacing(sectionConfig.spacing.base),
    textAlign: 'center' as const,
  }), [sectionConfig, getResponsiveSpacing]);
  
  const getHeadingProps = useCallback(() => ({
    ...sectionConfig.heading,
    mb: 4,
  }), [sectionConfig]);
  
  const getSubheadingProps = useCallback(() => ({
    ...sectionConfig.subheading,
    mb: 8,
    maxW: '3xl',
    mx: 'auto',
  }), [sectionConfig]);
  
  return {
    getSectionProps,
    getHeadingProps,
    getSubheadingProps,
    sectionConfig,
  };
};

/**
 * Hook for creating consistent card layouts with proper hierarchy
 */
export const useCardHierarchy = () => {
  const { getHeadingStyle, getBodyTextStyle, getBrandColor } = useVisualHierarchy();
  
  const getCardTitleProps = useCallback(() => ({
    ...getHeadingStyle('h4'),
    mb: 2,
  }), [getHeadingStyle]);
  
  const getCardDescriptionProps = useCallback(() => ({
    ...getBodyTextStyle('small'),
    mb: 4,
  }), [getBodyTextStyle]);
  
  const getCardLinkProps = useCallback(() => ({
    color: getBrandColor('primary'),
    fontWeight: 'medium',
    _hover: {
      color: getBrandColor('primary'),
      textDecoration: 'underline',
    },
  }), [getBrandColor]);
  
  return {
    getCardTitleProps,
    getCardDescriptionProps,
    getCardLinkProps,
  };
};