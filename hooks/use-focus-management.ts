/**
 * React hook for managing focus and interactive states with Safe Talk brand compliance
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useColorCompliance } from './use-color-compliance';

interface FocusManagementOptions {
  // Focus trap options
  trapFocus?: boolean;
  restoreFocus?: boolean;
  initialFocus?: string; // CSS selector
  
  // Interactive state options
  enableHoverEffects?: boolean;
  enableKeyboardNavigation?: boolean;
  
  // Accessibility options
  announceStateChanges?: boolean;
  respectReducedMotion?: boolean;
}

interface FocusState {
  isFocused: boolean;
  isHovered: boolean;
  isPressed: boolean;
  isKeyboardFocused: boolean;
}

interface UseFocusManagementReturn {
  // State
  focusState: FocusState;
  
  // Event handlers
  onFocus: (event: React.FocusEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onKeyUp: (event: React.KeyboardEvent) => void;
  
  // Utilities
  getFocusProps: () => Record<string, any>;
  getInteractiveProps: () => Record<string, any>;
  setFocus: () => void;
  removeFocus: () => void;
  
  // Focus management
  trapFocusWithin: (container: HTMLElement) => () => void;
  restorePreviousFocus: () => void;
}

/**
 * Hook for managing focus and interactive states with Safe Talk brand compliance
 */
export const useFocusManagement = (
  options: FocusManagementOptions = {}
): UseFocusManagementReturn => {
  const {
    trapFocus = false,
    restoreFocus = true,
    initialFocus,
    enableHoverEffects = true,
    enableKeyboardNavigation = true,
    announceStateChanges = false,
    respectReducedMotion = true,
  } = options;

  const { validateColor } = useColorCompliance();
  const elementRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [focusState, setFocusState] = useState<FocusState>({
    isFocused: false,
    isHovered: false,
    isPressed: false,
    isKeyboardFocused: false,
  });

  // Track if user is navigating with keyboard
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);

  // Detect keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ') {
        setIsUsingKeyboard(true);
      }
    };

    const handleMouseDown = () => {
      setIsUsingKeyboard(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Focus event handlers
  const onFocus = useCallback((event: React.FocusEvent) => {
    if (restoreFocus && !previousFocusRef.current) {
      previousFocusRef.current = event.relatedTarget as HTMLElement;
    }

    setFocusState(prev => ({
      ...prev,
      isFocused: true,
      isKeyboardFocused: isUsingKeyboard,
    }));

    if (announceStateChanges) {
      // Announce focus change to screen readers
      const element = event.currentTarget;
      const label = element.getAttribute('aria-label') || element.textContent || 'Element';
      console.log(`Focus: ${label}`); // In real implementation, use proper screen reader announcement
    }
  }, [restoreFocus, announceStateChanges, isUsingKeyboard]);

  const onBlur = useCallback((event: React.FocusEvent) => {
    setFocusState(prev => ({
      ...prev,
      isFocused: false,
      isKeyboardFocused: false,
    }));
  }, []);

  // Mouse event handlers
  const onMouseEnter = useCallback((event: React.MouseEvent) => {
    if (enableHoverEffects) {
      setFocusState(prev => ({
        ...prev,
        isHovered: true,
      }));
    }
  }, [enableHoverEffects]);

  const onMouseLeave = useCallback((event: React.MouseEvent) => {
    setFocusState(prev => ({
      ...prev,
      isHovered: false,
      isPressed: false,
    }));
  }, []);

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    setFocusState(prev => ({
      ...prev,
      isPressed: true,
    }));
  }, []);

  const onMouseUp = useCallback((event: React.MouseEvent) => {
    setFocusState(prev => ({
      ...prev,
      isPressed: false,
    }));
  }, []);

  // Keyboard event handlers
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!enableKeyboardNavigation) return;

    if (event.key === 'Enter' || event.key === ' ') {
      setFocusState(prev => ({
        ...prev,
        isPressed: true,
      }));
    }
  }, [enableKeyboardNavigation]);

  const onKeyUp = useCallback((event: React.KeyboardEvent) => {
    if (!enableKeyboardNavigation) return;

    if (event.key === 'Enter' || event.key === ' ') {
      setFocusState(prev => ({
        ...prev,
        isPressed: false,
      }));
    }
  }, [enableKeyboardNavigation]);

  // Get focus-specific props
  const getFocusProps = useCallback(() => ({
    onFocus,
    onBlur,
    tabIndex: 0,
    'data-focus-visible': focusState.isKeyboardFocused,
  }), [onFocus, onBlur, focusState.isKeyboardFocused]);

  // Get all interactive props
  const getInteractiveProps = useCallback(() => ({
    ...getFocusProps(),
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onKeyDown,
    onKeyUp,
    'data-hovered': focusState.isHovered,
    'data-pressed': focusState.isPressed,
    'data-focused': focusState.isFocused,
  }), [
    getFocusProps,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onKeyDown,
    onKeyUp,
    focusState,
  ]);

  // Focus management utilities
  const setFocus = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  }, []);

  const removeFocus = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.blur();
    }
  }, []);

  // Focus trap implementation
  const trapFocusWithin = useCallback((container: HTMLElement) => {
    if (!trapFocus) return () => {};

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Set initial focus
    if (initialFocus) {
      const initialElement = container.querySelector(initialFocus) as HTMLElement;
      if (initialElement) {
        initialElement.focus();
      }
    } else if (firstElement) {
      firstElement.focus();
    }

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [trapFocus, initialFocus]);

  // Restore previous focus
  const restorePreviousFocus = useCallback(() => {
    if (restoreFocus && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [restoreFocus]);

  return {
    focusState,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onKeyDown,
    onKeyUp,
    getFocusProps,
    getInteractiveProps,
    setFocus,
    removeFocus,
    trapFocusWithin,
    restorePreviousFocus,
  };
};

/**
 * Hook for creating accessible interactive components
 */
export const useInteractiveElement = (
  role: string = 'button',
  options: FocusManagementOptions = {}
) => {
  const focusManagement = useFocusManagement(options);
  
  const getAccessibleProps = useCallback(() => ({
    ...focusManagement.getInteractiveProps(),
    role,
    'aria-pressed': focusManagement.focusState.isPressed,
    'aria-expanded': undefined, // Can be overridden by component
    'aria-haspopup': undefined, // Can be overridden by component
  }), [focusManagement, role]);

  return {
    ...focusManagement,
    getAccessibleProps,
  };
};

/**
 * Hook for managing keyboard navigation in lists/menus
 */
export const useKeyboardNavigation = (
  items: Array<{ id: string; disabled?: boolean }>,
  options: {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
    onSelect?: (id: string) => void;
  } = {}
) => {
  const { orientation = 'vertical', loop = true, onSelect } = options;
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const enabledItems = items.filter(item => !item.disabled);
    if (enabledItems.length === 0) return;

    const isVertical = orientation === 'vertical';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

    switch (event.key) {
      case nextKey:
        event.preventDefault();
        setActiveIndex(prev => {
          const nextIndex = prev + 1;
          return nextIndex >= enabledItems.length ? (loop ? 0 : prev) : nextIndex;
        });
        break;

      case prevKey:
        event.preventDefault();
        setActiveIndex(prev => {
          const prevIndex = prev - 1;
          return prevIndex < 0 ? (loop ? enabledItems.length - 1 : prev) : prevIndex;
        });
        break;

      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;

      case 'End':
        event.preventDefault();
        setActiveIndex(enabledItems.length - 1);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < enabledItems.length) {
          onSelect?.(enabledItems[activeIndex].id);
        }
        break;
    }
  }, [items, orientation, loop, onSelect, activeIndex]);

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    getItemProps: (index: number) => ({
      'data-active': index === activeIndex,
      tabIndex: index === activeIndex ? 0 : -1,
    }),
  };
};