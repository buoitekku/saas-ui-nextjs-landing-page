/**
 * React hook for Safe Talk dark mode management with brand color adaptations
 */

import { useCallback, useEffect, useState } from 'react';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { 
  darkModeColors, 
  darkModeSemanticColors, 
  getDarkModeColor,
  getDarkModeSemanticColor,
  createDarkModeStyle
} from '../theme/foundations/dark-mode-colors';

interface DarkModeOptions {
  // Auto-detection options
  respectSystemPreference?: boolean;
  
  // Transition options
  enableTransitions?: boolean;
  transitionDuration?: string;
  
  // Accessibility options
  announceChanges?: boolean;
  respectReducedMotion?: boolean;
  
  // Storage options
  persistPreference?: boolean;
  storageKey?: string;
}

interface UseDarkModeReturn {
  // Current state
  isDark: boolean;
  colorMode: 'light' | 'dark';
  
  // Toggle functions
  toggleColorMode: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
  
  // Color utilities
  getBrandColor: (color: keyof typeof darkModeColors, variant?: string) => string;
  getSemanticColor: (category: string, variant: string) => string;
  getAdaptiveColor: (lightColor: string, darkColor: string) => string;
  
  // Style utilities
  createAdaptiveStyle: (lightStyle: any, darkStyle: any) => any;
  getBackgroundColor: (level?: 'primary' | 'secondary' | 'tertiary' | 'card') => string;
  getTextColor: (level?: 'primary' | 'secondary' | 'muted') => string;
  getBorderColor: (level?: 'primary' | 'secondary' | 'subtle' | 'accent') => string;
  
  // Component-specific utilities
  getButtonColors: (variant: 'primary' | 'secondary' | 'outline' | 'ghost') => any;
  getCardColors: () => any;
  getInputColors: () => any;
  getLinkColors: (variant?: 'primary' | 'secondary' | 'subtle') => any;
  
  // Accessibility utilities
  getHighContrastColors: () => any;
  getFocusColors: () => any;
  getStatusColors: () => any;
  
  // System integration
  respectSystemPreference: () => void;
  getSystemPreference: () => 'light' | 'dark';
}

/**
 * Hook for Safe Talk dark mode management with brand color adaptations
 */
export const useDarkMode = (options: DarkModeOptions = {}): UseDarkModeReturn => {
  const {
    respectSystemPreference = true,
    enableTransitions = true,
    transitionDuration = '0.2s',
    announceChanges = true,
    respectReducedMotion = true,
    persistPreference = true,
    storageKey = 'safe-talk-color-mode',
  } = options;

  const { colorMode, toggleColorMode: chakraToggle, setColorMode } = useColorMode();
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light');

  const isDark = colorMode === 'dark';

  // Detect system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemPreference(mediaQuery.matches ? 'dark' : 'light');
      
      const handleChange = (e: MediaQueryListEvent) => {
        setSystemPreference(e.matches ? 'dark' : 'light');
        
        if (respectSystemPreference) {
          setColorMode(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [respectSystemPreference, setColorMode]);

  // Enhanced toggle with announcements
  const toggleColorMode = useCallback(() => {
    chakraToggle();
    
    if (announceChanges) {
      const newMode = colorMode === 'light' ? 'dark' : 'light';
      console.log(`Switched to ${newMode} mode`);
      
      // Announce to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.style.position = 'absolute';
      announcement.style.left = '-10000px';
      announcement.textContent = `Switched to ${newMode} mode`;
      
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  }, [chakraToggle, colorMode, announceChanges]);

  const setLightMode = useCallback(() => {
    setColorMode('light');
  }, [setColorMode]);

  const setDarkMode = useCallback(() => {
    setColorMode('dark');
  }, [setColorMode]);

  // Color utilities
  const getBrandColor = useCallback((
    color: keyof typeof darkModeColors, 
    variant: string = 'primary'
  ): string => {
    if (isDark) {
      return getDarkModeColor(color, variant as any);
    }
    return `safeTalk.${color}.400`; // Default light mode color
  }, [isDark]);

  const getSemanticColor = useCallback((category: string, variant: string): string => {
    if (isDark) {
      return getDarkModeSemanticColor(category as any, variant);
    }
    // Return light mode equivalent
    const lightModeMap: Record<string, Record<string, string>> = {
      text: { primary: 'safeTalk.navy.400', secondary: 'safeTalk.navy.300', muted: 'safeTalk.navy.200' },
      background: { primary: 'white', secondary: 'gray.50', card: 'white' },
      border: { primary: 'gray.200', accent: 'safeTalk.turquoise.200' },
    };
    
    return lightModeMap[category]?.[variant] || 'safeTalk.navy.400';
  }, [isDark]);

  const getAdaptiveColor = useColorModeValue;

  // Style utilities
  const createAdaptiveStyle = useCallback((lightStyle: any, darkStyle: any) => {
    return createDarkModeStyle(lightStyle, darkStyle);
  }, []);

  const getBackgroundColor = useCallback((level: 'primary' | 'secondary' | 'tertiary' | 'card' = 'primary') => {
    return getSemanticColor('background', level);
  }, [getSemanticColor]);

  const getTextColor = useCallback((level: 'primary' | 'secondary' | 'muted' = 'primary') => {
    return getSemanticColor('text', level);
  }, [getSemanticColor]);

  const getBorderColor = useCallback((level: 'primary' | 'secondary' | 'subtle' | 'accent' = 'primary') => {
    return getSemanticColor('border', level);
  }, [getSemanticColor]);

  // Component-specific utilities
  const getButtonColors = useCallback((variant: 'primary' | 'secondary' | 'outline' | 'ghost') => {
    const baseColors = {
      primary: {
        bg: getBrandColor('turquoise'),
        color: isDark ? 'safeTalk.navy.900' : 'white',
        _hover: {
          bg: getBrandColor('turquoise', 'hover'),
        },
      },
      secondary: {
        bg: getBrandColor('blue'),
        color: isDark ? 'safeTalk.navy.900' : 'white',
        _hover: {
          bg: getBrandColor('blue', 'hover'),
        },
      },
      outline: {
        bg: 'transparent',
        color: getBrandColor('turquoise'),
        borderColor: getBrandColor('turquoise'),
        _hover: {
          bg: getBrandColor('turquoise'),
          color: isDark ? 'safeTalk.navy.900' : 'white',
        },
      },
      ghost: {
        bg: 'transparent',
        color: getBrandColor('turquoise'),
        _hover: {
          bg: getBrandColor('turquoise', 'subtle'),
        },
      },
    };
    
    return baseColors[variant];
  }, [getBrandColor, isDark]);

  const getCardColors = useCallback(() => ({
    bg: getBackgroundColor('card'),
    borderColor: getBorderColor('primary'),
    _hover: {
      borderColor: getBorderColor('accent'),
      bg: getBackgroundColor('secondary'),
    },
  }), [getBackgroundColor, getBorderColor]);

  const getInputColors = useCallback(() => ({
    bg: getBackgroundColor('secondary'),
    borderColor: getBorderColor('primary'),
    color: getTextColor('primary'),
    _placeholder: {
      color: getTextColor('muted'),
    },
    _hover: {
      borderColor: getBrandColor('turquoise', 'muted'),
    },
    _focus: {
      borderColor: getBrandColor('turquoise'),
      boxShadow: `0 0 0 1px ${getBrandColor('turquoise')}`,
    },
  }), [getBackgroundColor, getBorderColor, getTextColor, getBrandColor]);

  const getLinkColors = useCallback((variant: 'primary' | 'secondary' | 'subtle' = 'primary') => {
    const colorMap = {
      primary: getBrandColor('turquoise'),
      secondary: getBrandColor('blue'),
      subtle: getTextColor('secondary'),
    };
    
    const hoverColorMap = {
      primary: getBrandColor('turquoise', 'hover'),
      secondary: getBrandColor('blue', 'hover'),
      subtle: getBrandColor('turquoise'),
    };
    
    return {
      color: colorMap[variant],
      _hover: {
        color: hoverColorMap[variant],
      },
    };
  }, [getBrandColor, getTextColor]);

  // Accessibility utilities
  const getHighContrastColors = useCallback(() => ({
    text: isDark ? 'white' : 'black',
    background: isDark ? 'black' : 'white',
    accent: getBrandColor('turquoise', 'hover'),
  }), [isDark, getBrandColor]);

  const getFocusColors = useCallback(() => ({
    ring: `0 0 0 3px ${getBrandColor('turquoise')}40`,
    border: getBrandColor('turquoise'),
  }), [getBrandColor]);

  const getStatusColors = useCallback(() => ({
    success: getBrandColor('limeGreen'),
    error: getBrandColor('purple'),
    warning: getBrandColor('limeGreen', 'hover'),
    info: getBrandColor('blue'),
  }), [getBrandColor]);

  // System integration
  const respectSystemPreferenceFunc = useCallback(() => {
    setColorMode(systemPreference);
  }, [systemPreference, setColorMode]);

  const getSystemPreference = useCallback(() => {
    return systemPreference;
  }, [systemPreference]);

  return {
    isDark,
    colorMode,
    toggleColorMode,
    setLightMode,
    setDarkMode,
    getBrandColor,
    getSemanticColor,
    getAdaptiveColor,
    createAdaptiveStyle,
    getBackgroundColor,
    getTextColor,
    getBorderColor,
    getButtonColors,
    getCardColors,
    getInputColors,
    getLinkColors,
    getHighContrastColors,
    getFocusColors,
    getStatusColors,
    respectSystemPreference: respectSystemPreferenceFunc,
    getSystemPreference,
  };
};

/**
 * Hook for creating dark mode aware components
 */
export const useDarkModeAware = () => {
  const { 
    isDark, 
    getBackgroundColor, 
    getTextColor, 
    getBorderColor,
    getButtonColors,
    getCardColors,
    getInputColors,
    getLinkColors
  } = useDarkMode();

  const getComponentProps = useCallback((component: 'card' | 'button' | 'input' | 'link', variant?: string) => {
    switch (component) {
      case 'card':
        return getCardColors();
      case 'button':
        return getButtonColors(variant as any || 'primary');
      case 'input':
        return getInputColors();
      case 'link':
        return getLinkColors(variant as any);
      default:
        return {};
    }
  }, [getCardColors, getButtonColors, getInputColors, getLinkColors]);

  const getSectionProps = useCallback(() => ({
    bg: getBackgroundColor('primary'),
    color: getTextColor('primary'),
    borderColor: getBorderColor('subtle'),
  }), [getBackgroundColor, getTextColor, getBorderColor]);

  return {
    isDark,
    getComponentProps,
    getSectionProps,
    getBackgroundColor,
    getTextColor,
    getBorderColor,
  };
};