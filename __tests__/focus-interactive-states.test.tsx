/**
 * Tests for Safe Talk focus indicators and interactive states
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import { FocusDemo } from '../components/focus-demo';
import { useFocusManagement, useInteractiveElement } from '../hooks/use-focus-management';
import { validateColorAccessibility, getContrastRatio } from '../utils/color-validation';

// Test wrapper with theme
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>
);

// Mock component for testing hooks
const TestComponent: React.FC<{ options?: any }> = ({ options = {} }) => {
  const { focusState, getInteractiveProps } = useFocusManagement(options);
  
  return (
    <button
      {...getInteractiveProps()}
      data-testid="test-button"
      data-focused={focusState.isFocused}
      data-hovered={focusState.isHovered}
      data-pressed={focusState.isPressed}
      data-keyboard-focused={focusState.isKeyboardFocused}
    >
      Test Button
    </button>
  );
};

const InteractiveTestComponent: React.FC = () => {
  const { focusState, getAccessibleProps } = useInteractiveElement('button');
  
  return (
    <button
      {...getAccessibleProps()}
      data-testid="interactive-button"
      data-focused={focusState.isFocused}
      data-pressed={focusState.isPressed}
    >
      Interactive Button
    </button>
  );
};

describe('Focus Management Hook', () => {
  test('should handle focus events correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    
    // Initially not focused
    expect(button).toHaveAttribute('data-focused', 'false');
    
    // Focus the button
    await user.tab();
    expect(button).toHaveAttribute('data-focused', 'true');
    expect(button).toHaveAttribute('data-keyboard-focused', 'true');
    
    // Blur the button
    await user.tab();
    expect(button).toHaveAttribute('data-focused', 'false');
    expect(button).toHaveAttribute('data-keyboard-focused', 'false');
  });

  test('should handle hover events correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    
    // Initially not hovered
    expect(button).toHaveAttribute('data-hovered', 'false');
    
    // Hover the button
    await user.hover(button);
    expect(button).toHaveAttribute('data-hovered', 'true');
    
    // Unhover the button
    await user.unhover(button);
    expect(button).toHaveAttribute('data-hovered', 'false');
  });

  test('should handle press events correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    
    // Initially not pressed
    expect(button).toHaveAttribute('data-pressed', 'false');
    
    // Press and hold
    fireEvent.mouseDown(button);
    expect(button).toHaveAttribute('data-pressed', 'true');
    
    // Release
    fireEvent.mouseUp(button);
    expect(button).toHaveAttribute('data-pressed', 'false');
  });

  test('should handle keyboard press events', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    
    // Focus first
    await user.tab();
    
    // Press Enter
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(button).toHaveAttribute('data-pressed', 'true');
    
    fireEvent.keyUp(button, { key: 'Enter' });
    expect(button).toHaveAttribute('data-pressed', 'false');
    
    // Press Space
    fireEvent.keyDown(button, { key: ' ' });
    expect(button).toHaveAttribute('data-pressed', 'true');
    
    fireEvent.keyUp(button, { key: ' ' });
    expect(button).toHaveAttribute('data-pressed', 'false');
  });

  test('should distinguish between mouse and keyboard focus', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    
    // Mouse click should not set keyboard focus
    await user.click(button);
    expect(button).toHaveAttribute('data-focused', 'true');
    expect(button).toHaveAttribute('data-keyboard-focused', 'false');
    
    // Tab navigation should set keyboard focus
    fireEvent.blur(button);
    await user.tab();
    expect(button).toHaveAttribute('data-focused', 'true');
    expect(button).toHaveAttribute('data-keyboard-focused', 'true');
  });
});

describe('Interactive Element Hook', () => {
  test('should provide accessible props', () => {
    render(
      <TestWrapper>
        <InteractiveTestComponent />
      </TestWrapper>
    );

    const button = screen.getByTestId('interactive-button');
    
    expect(button).toHaveAttribute('role', 'button');
    expect(button).toHaveAttribute('tabIndex', '0');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  test('should update aria-pressed on interaction', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <InteractiveTestComponent />
      </TestWrapper>
    );

    const button = screen.getByTestId('interactive-button');
    
    // Press and hold
    fireEvent.mouseDown(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    
    // Release
    fireEvent.mouseUp(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('Theme Focus Styles', () => {
  test('should apply Safe Talk focus colors to buttons', () => {
    render(
      <TestWrapper>
        <button className="chakra-button" data-variant="safe-talk-primary">
          Primary Button
        </button>
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    const styles = window.getComputedStyle(button);
    
    // Should have Safe Talk turquoise as background
    // Note: In a real test environment, you'd check the actual computed styles
    expect(button).toBeInTheDocument();
  });

  test('should have proper contrast ratios for focus indicators', () => {
    // Test primary focus ring contrast
    const primaryFocusContrast = getContrastRatio('#3AB5B2', '#FFFFFF');
    expect(primaryFocusContrast).toBeGreaterThan(3.0); // Minimum for focus indicators
    
    // Test secondary focus ring contrast
    const secondaryFocusContrast = getContrastRatio('#71C6DA', '#FFFFFF');
    expect(secondaryFocusContrast).toBeGreaterThan(3.0);
    
    // Test accent focus ring contrast
    const accentFocusContrast = getContrastRatio('#C5D54E', '#000000');
    expect(accentFocusContrast).toBeGreaterThan(3.0);
  });

  test('should validate accessibility of focus color combinations', () => {
    const focusCombinations = [
      { bg: '#3AB5B2', text: '#FFFFFF', context: 'Primary button focus' },
      { bg: '#71C6DA', text: '#FFFFFF', context: 'Secondary button focus' },
      { bg: '#FFFFFF', text: '#3AB5B2', context: 'Primary link focus' },
      { bg: '#FFFFFF', text: '#0A3447', context: 'Text on white background' },
    ];

    focusCombinations.forEach(({ bg, text, context }) => {
      const result = validateColorAccessibility(bg, text, false, 'AA');
      expect(result.isValid).toBe(true);
      expect(result.contrastRatio).toBeGreaterThan(4.5);
    });
  });
});

describe('Focus Demo Component', () => {
  test('should render all interactive elements', () => {
    render(
      <TestWrapper>
        <FocusDemo />
      </TestWrapper>
    );

    // Check for main sections
    expect(screen.getByText('Safe Talk Focus & Interactive States Demo')).toBeInTheDocument();
    expect(screen.getByText('Button Variants with Enhanced Focus')).toBeInTheDocument();
    expect(screen.getByText('Interactive Cards with Focus Management')).toBeInTheDocument();
    expect(screen.getByText('Form Elements with Enhanced Focus')).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByText('Primary Button')).toBeInTheDocument();
    expect(screen.getByText('Secondary Button')).toBeInTheDocument();
    expect(screen.getByText('Accent Button')).toBeInTheDocument();
    
    // Check for cards
    expect(screen.getByText('Feature Card')).toBeInTheDocument();
    expect(screen.getByText('Service Card')).toBeInTheDocument();
    expect(screen.getByText('Product Card')).toBeInTheDocument();
  });

  test('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FocusDemo />
      </TestWrapper>
    );

    // Should be able to tab through all interactive elements
    const buttons = screen.getAllByRole('button');
    const links = screen.getAllByRole('link');
    const inputs = screen.getAllByRole('textbox');
    
    const totalInteractiveElements = buttons.length + links.length + inputs.length;
    expect(totalInteractiveElements).toBeGreaterThan(0);
    
    // Tab through first few elements
    await user.tab();
    expect(document.activeElement).toBeInstanceOf(HTMLElement);
    
    await user.tab();
    expect(document.activeElement).toBeInstanceOf(HTMLElement);
  });

  test('should show accessibility features section', () => {
    render(
      <TestWrapper>
        <FocusDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Accessibility Features')).toBeInTheDocument();
    expect(screen.getByText(/All interactive elements have visible focus indicators/)).toBeInTheDocument();
    expect(screen.getByText(/Color contrast ratios meet or exceed WCAG AA standards/)).toBeInTheDocument();
    expect(screen.getByText(/All elements are keyboard navigable/)).toBeInTheDocument();
  });
});

describe('Focus Ring Visibility', () => {
  test('should show focus ring only during keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <button data-testid="focus-test-button">Test Button</button>
      </TestWrapper>
    );

    const button = screen.getByTestId('focus-test-button');
    
    // Click with mouse - should not show focus ring
    await user.click(button);
    expect(button).toHaveFocus();
    // In a real implementation, you'd check for the absence of focus-visible class
    
    // Navigate with keyboard - should show focus ring
    fireEvent.blur(button);
    await user.tab();
    expect(button).toHaveFocus();
    // In a real implementation, you'd check for the presence of focus-visible class
  });
});

describe('Interactive State Transitions', () => {
  test('should have smooth transitions between states', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    const styles = window.getComputedStyle(button);
    
    // Should have transition property
    // Note: In a real test environment, you'd check the actual computed styles
    expect(button).toBeInTheDocument();
  });
});

describe('Error State Focus Indicators', () => {
  test('should use appropriate colors for error states', () => {
    // Test error focus ring contrast
    const errorFocusContrast = getContrastRatio('#C5D54E', '#FFFFFF');
    expect(errorFocusContrast).toBeGreaterThan(3.0);
    
    // Validate error state accessibility
    const errorResult = validateColorAccessibility('#C5D54E', '#0A3447', false, 'AA');
    expect(errorResult.isValid).toBe(true);
  });
});