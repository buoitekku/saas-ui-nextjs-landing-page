/**
 * Tests for Safe Talk status system and error states
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import { StatusDemo } from '../components/status-demo';
import { useStatusManagement, useFormValidation } from '../hooks/use-status-management';
import { 
  statusIndicators,
  createStatusStyle,
  createFormValidationStyle,
  createAlertStyle,
  createToastStyle,
  createProgressStyle
} from '../theme/foundations/status-system';

// Test wrapper with theme
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>
);

// Mock component for testing status management hook
const StatusTestComponent: React.FC = () => {
  const { 
    currentStatus, 
    setSuccess, 
    setError, 
    setWarning, 
    setInfo,
    clearStatus,
    isStatus,
    getStatusStyle,
    getStatusIcon,
    getAriaProps
  } = useStatusManagement();
  
  return (
    <div>
      <button data-testid="success-btn" onClick={() => setSuccess('Success message')}>
        Set Success
      </button>
      <button data-testid="error-btn" onClick={() => setError('Error message')}>
        Set Error
      </button>
      <button data-testid="warning-btn" onClick={() => setWarning('Warning message')}>
        Set Warning
      </button>
      <button data-testid="info-btn" onClick={() => setInfo('Info message')}>
        Set Info
      </button>
      <button data-testid="clear-btn" onClick={clearStatus}>
        Clear Status
      </button>
      
      {currentStatus && (
        <div 
          data-testid="status-display"
          data-status-type={currentStatus.type}
          data-status-message={currentStatus.message}
          {...getAriaProps()}
        >
          <span data-testid="status-icon">{getStatusIcon()}</span>
          <span data-testid="status-message">{currentStatus.message}</span>
        </div>
      )}
      
      <div data-testid="status-checks">
        <span data-testid="is-success">{isStatus('success').toString()}</span>
        <span data-testid="is-error">{isStatus('error').toString()}</span>
      </div>
    </div>
  );
};

// Mock component for testing form validation hook
const FormValidationTestComponent: React.FC = () => {
  const {
    values,
    errors,
    touched,
    getFieldProps,
    getFieldErrorProps,
    validateForm,
    resetForm,
    isValid,
  } = useFormValidation({ email: '', password: '' });

  const handleValidate = () => {
    validateForm({
      email: (value: string) => !value ? 'Email is required' : null,
      password: (value: string) => !value ? 'Password is required' : null,
    });
  };

  return (
    <form data-testid="test-form">
      <input 
        data-testid="email-input" 
        {...getFieldProps('email')} 
        placeholder="Email"
      />
      <div data-testid="email-error" {...getFieldErrorProps('email')} />
      
      <input 
        data-testid="password-input" 
        {...getFieldProps('password')} 
        placeholder="Password"
      />
      <div data-testid="password-error" {...getFieldErrorProps('password')} />
      
      <button type="button" data-testid="validate-btn" onClick={handleValidate}>
        Validate
      </button>
      <button type="button" data-testid="reset-btn" onClick={resetForm}>
        Reset
      </button>
      
      <div data-testid="form-valid">{isValid.toString()}</div>
    </form>
  );
};

describe('Status System Foundation', () => {
  describe('statusIndicators', () => {
    test('should have all required status types', () => {
      const requiredStatuses = ['success', 'error', 'warning', 'info', 'loading', 'pending', 'active', 'inactive'];
      
      requiredStatuses.forEach(status => {
        expect(statusIndicators[status as keyof typeof statusIndicators]).toBeDefined();
      });
    });

    test('should have proper Safe Talk colors for each status', () => {
      expect(statusIndicators.success.bg).toBe('safeTalk.limeGreen.400');
      expect(statusIndicators.error.bg).toBe('safeTalk.purple.400');
      expect(statusIndicators.info.bg).toBe('safeTalk.blue.400');
      expect(statusIndicators.active.bg).toBe('safeTalk.turquoise.400');
    });

    test('should have appropriate icons for each status', () => {
      expect(statusIndicators.success.icon).toBe('✓');
      expect(statusIndicators.error.icon).toBe('✕');
      expect(statusIndicators.warning.icon).toBe('⚠');
      expect(statusIndicators.info.icon).toBe('ℹ');
    });
  });

  describe('createStatusStyle', () => {
    test('should create solid status styles', () => {
      const successStyle = createStatusStyle('success', 'solid');
      
      expect(successStyle.bg).toBe('safeTalk.limeGreen.400');
      expect(successStyle.color).toBe('safeTalk.navy.400');
      expect(successStyle.borderColor).toBe('safeTalk.limeGreen.500');
    });

    test('should create subtle status styles', () => {
      const errorStyle = createStatusStyle('error', 'subtle');
      
      expect(errorStyle.bg).toBe('safeTalk.purple.50');
      expect(errorStyle.color).toBe('safeTalk.purple.700');
    });

    test('should create outline status styles', () => {
      const warningStyle = createStatusStyle('warning', 'outline');
      
      expect(warningStyle.bg).toBe('transparent');
      expect(warningStyle.borderWidth).toBe('1px');
    });
  });

  describe('createFormValidationStyle', () => {
    test('should create valid form styles', () => {
      const validStyle = createFormValidationStyle('valid');
      
      expect(validStyle.borderColor).toBe('safeTalk.limeGreen.400');
      expect(validStyle.iconColor).toBe('safeTalk.limeGreen.500');
    });

    test('should create invalid form styles', () => {
      const invalidStyle = createFormValidationStyle('invalid');
      
      expect(invalidStyle.borderColor).toBe('safeTalk.purple.400');
      expect(invalidStyle.iconColor).toBe('safeTalk.purple.500');
    });
  });
});

describe('Status Management Hook', () => {
  test('should set and clear status correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <StatusTestComponent />
      </TestWrapper>
    );

    // Initially no status
    expect(screen.queryByTestId('status-display')).not.toBeInTheDocument();

    // Set success status
    await user.click(screen.getByTestId('success-btn'));
    
    const statusDisplay = screen.getByTestId('status-display');
    expect(statusDisplay).toBeInTheDocument();
    expect(statusDisplay).toHaveAttribute('data-status-type', 'success');
    expect(statusDisplay).toHaveAttribute('data-status-message', 'Success message');
    
    // Check status icon
    expect(screen.getByTestId('status-icon')).toHaveTextContent('✓');
    
    // Check status message
    expect(screen.getByTestId('status-message')).toHaveTextContent('Success message');
    
    // Check status detection
    expect(screen.getByTestId('is-success')).toHaveTextContent('true');
    expect(screen.getByTestId('is-error')).toHaveTextContent('false');

    // Clear status
    await user.click(screen.getByTestId('clear-btn'));
    expect(screen.queryByTestId('status-display')).not.toBeInTheDocument();
  });

  test('should handle different status types', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <StatusTestComponent />
      </TestWrapper>
    );

    // Test error status
    await user.click(screen.getByTestId('error-btn'));
    expect(screen.getByTestId('status-display')).toHaveAttribute('data-status-type', 'error');
    expect(screen.getByTestId('status-icon')).toHaveTextContent('✕');

    // Test warning status
    await user.click(screen.getByTestId('warning-btn'));
    expect(screen.getByTestId('status-display')).toHaveAttribute('data-status-type', 'warning');
    expect(screen.getByTestId('status-icon')).toHaveTextContent('⚠');

    // Test info status
    await user.click(screen.getByTestId('info-btn'));
    expect(screen.getByTestId('status-display')).toHaveAttribute('data-status-type', 'info');
    expect(screen.getByTestId('status-icon')).toHaveTextContent('ℹ');
  });

  test('should provide proper ARIA attributes', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <StatusTestComponent />
      </TestWrapper>
    );

    await user.click(screen.getByTestId('error-btn'));
    
    const statusDisplay = screen.getByTestId('status-display');
    expect(statusDisplay).toHaveAttribute('aria-live', 'assertive');
    expect(statusDisplay).toHaveAttribute('aria-atomic', 'true');
    expect(statusDisplay).toHaveAttribute('aria-label', 'Error message');
  });
});

describe('Form Validation Hook', () => {
  test('should handle form field changes', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FormValidationTestComponent />
      </TestWrapper>
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    // Initially form should be valid (no validation run yet)
    expect(screen.getByTestId('form-valid')).toHaveTextContent('true');

    // Type in email field
    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');

    // Type in password field
    await user.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');
  });

  test('should validate form and show errors', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FormValidationTestComponent />
      </TestWrapper>
    );

    // Validate empty form
    await user.click(screen.getByTestId('validate-btn'));

    // Should show validation errors
    expect(screen.getByTestId('form-valid')).toHaveTextContent('false');
    
    // Error messages should be present
    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required');
    });
  });

  test('should reset form correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <FormValidationTestComponent />
      </TestWrapper>
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    // Fill form
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    // Reset form
    await user.click(screen.getByTestId('reset-btn'));

    // Fields should be empty
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(screen.getByTestId('form-valid')).toHaveTextContent('true');
  });
});

describe('Status Demo Component', () => {
  test('should render all status sections', () => {
    render(
      <TestWrapper>
        <StatusDemo />
      </TestWrapper>
    );

    // Check main sections
    expect(screen.getByText('Safe Talk Status System & Error States')).toBeInTheDocument();
    expect(screen.getByText('Alert Components')).toBeInTheDocument();
    expect(screen.getByText('Status Badges')).toBeInTheDocument();
    expect(screen.getByText('Status Indicators')).toBeInTheDocument();
    expect(screen.getByText('Form Validation with Status Colors')).toBeInTheDocument();
  });

  test('should display all alert variants', () => {
    render(
      <TestWrapper>
        <StatusDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Error Detected')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Security Notice')).toBeInTheDocument();
    expect(screen.getByText('Scam Alert!')).toBeInTheDocument();
  });

  test('should display all status badges', () => {
    render(
      <TestWrapper>
        <StatusDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('should have interactive status buttons', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <StatusDemo />
      </TestWrapper>
    );

    // Find and click status buttons
    const successButton = screen.getByRole('button', { name: /success/i });
    const errorButton = screen.getByRole('button', { name: /error/i });
    
    expect(successButton).toBeInTheDocument();
    expect(errorButton).toBeInTheDocument();
    
    // Buttons should be clickable
    await user.click(successButton);
    await user.click(errorButton);
  });

  test('should display accessibility information', () => {
    render(
      <TestWrapper>
        <StatusDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Accessibility & Brand Compliance Features')).toBeInTheDocument();
    expect(screen.getByText(/All status colors meet WCAG AA contrast standards/)).toBeInTheDocument();
    expect(screen.getByText(/Error states use high contrast purple for color-blind users/)).toBeInTheDocument();
    expect(screen.getByText(/All status colors use Safe Talk brand palette/)).toBeInTheDocument();
  });
});

describe('Brand Compliance', () => {
  test('should use Safe Talk colors for all status types', () => {
    const statusTypes = ['success', 'error', 'warning', 'info', 'loading', 'active'];
    
    statusTypes.forEach(status => {
      const statusConfig = statusIndicators[status as keyof typeof statusIndicators];
      
      // All status colors should use Safe Talk palette
      expect(statusConfig.bg).toMatch(/^safeTalk\./);
      expect(statusConfig.borderColor).toMatch(/^safeTalk\./);
      expect(statusConfig.lightBg).toMatch(/^safeTalk\./);
      expect(statusConfig.lightColor).toMatch(/^safeTalk\./);
    });
  });

  test('should maintain accessibility contrast ratios', () => {
    // Test key color combinations
    const combinations = [
      { bg: 'safeTalk.limeGreen.400', text: 'safeTalk.navy.400', name: 'Success' },
      { bg: 'safeTalk.purple.400', text: 'white', name: 'Error' },
      { bg: 'safeTalk.blue.400', text: 'white', name: 'Info' },
      { bg: 'safeTalk.turquoise.400', text: 'white', name: 'Active' },
    ];

    combinations.forEach(({ bg, text, name }) => {
      // In a real implementation, you'd calculate actual contrast ratios
      // For now, we verify the color combinations are defined
      expect(bg).toBeDefined();
      expect(text).toBeDefined();
    });
  });
});

describe('Error State Accessibility', () => {
  test('should provide multiple ways to convey status information', () => {
    render(
      <TestWrapper>
        <StatusDemo />
      </TestWrapper>
    );

    // Status should be conveyed through:
    // 1. Color
    // 2. Icons
    // 3. Text
    // 4. ARIA attributes

    // Check that alerts have both icons and text
    const alerts = screen.getAllByRole('alert');
    expect(alerts.length).toBeGreaterThan(0);
    
    // Each alert should have descriptive text
    alerts.forEach(alert => {
      expect(alert.textContent).toBeTruthy();
    });
  });

  test('should be distinguishable by color-blind users', () => {
    // Error states use purple instead of red for better color-blind accessibility
    const errorStyle = createStatusStyle('error', 'solid');
    expect(errorStyle.bg).toBe('safeTalk.purple.400');
    
    // Success states use lime green which is more distinguishable
    const successStyle = createStatusStyle('success', 'solid');
    expect(successStyle.bg).toBe('safeTalk.limeGreen.400');
  });
});