/**
 * Accessibility utilities for Safe Talk components
 */

// ARIA label generators
export const generateAriaLabel = (
  baseLabel: string,
  context?: string,
  state?: string
): string => {
  let label = baseLabel
  if (context) label += ` w ${context}`
  if (state) label += `, ${state}`
  return label
}

// Focus management utilities
export const focusManagement = {
  // Trap focus within an element
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    element.addEventListener('keydown', handleTabKey)
    return () => element.removeEventListener('keydown', handleTabKey)
  },

  // Restore focus to previous element
  restoreFocus: (previousElement: HTMLElement | null) => {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus()
    }
  },
}

// Screen reader utilities
export const screenReader = {
  // Announce message to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },

  // Create visually hidden text for screen readers
  createSROnlyText: (text: string): HTMLSpanElement => {
    const span = document.createElement('span')
    span.className = 'sr-only'
    span.textContent = text
    return span
  },
}

// Color contrast utilities
export const colorContrast = {
  // Check if color combination meets WCAG standards
  meetsWCAG: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    // This would integrate with the existing color validation utilities
    // For now, return true as placeholder
    return true
  },

  // Get recommended color for better contrast
  getRecommendedColor: (background: string, textType: 'normal' | 'large' = 'normal'): string => {
    // This would use the Safe Talk color palette to suggest better colors
    return 'safeTalk.navy.400' // Default safe choice
  },
}

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Handle arrow key navigation in lists
  handleArrowKeys: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onIndexChange: (newIndex: number) => void
  ) => {
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowDown':
        newIndex = (currentIndex + 1) % items.length
        break
      case 'ArrowUp':
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
        break
      case 'Home':
        newIndex = 0
        break
      case 'End':
        newIndex = items.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    onIndexChange(newIndex)
    items[newIndex]?.focus()
  },

  // Handle escape key
  handleEscape: (callback: () => void) => (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback()
    }
  },
}

// Form accessibility utilities
export const formAccessibility = {
  // Generate form field IDs and labels
  generateFieldId: (fieldName: string, formId?: string): string => {
    const base = formId ? `${formId}-${fieldName}` : fieldName
    return `field-${base}-${Math.random().toString(36).substr(2, 9)}`
  },

  // Create error message ID
  generateErrorId: (fieldId: string): string => {
    return `${fieldId}-error`
  },

  // Create description ID
  generateDescriptionId: (fieldId: string): string => {
    return `${fieldId}-description`
  },
}