/**
 * React hook for managing Safe Talk status states and error handling
 */

import { useCallback, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { 
  createStatusStyle, 
  createFormValidationStyle,
  createToastStyle
} from '../theme/foundations/status-system';

export type StatusType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'pending' | 'active' | 'inactive';
export type StatusVariant = 'solid' | 'subtle' | 'outline';

interface StatusState {
  type: StatusType;
  message?: string;
  timestamp: number;
  id: string;
}

interface UseStatusManagementOptions {
  // Auto-clear options
  autoClearSuccess?: number; // ms
  autoClearError?: number; // ms
  autoClearWarning?: number; // ms
  autoClearInfo?: number; // ms
  
  // Toast options
  enableToasts?: boolean;
  toastPosition?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  // Accessibility options
  announceChanges?: boolean;
  respectReducedMotion?: boolean;
}

interface UseStatusManagementReturn {
  // Current status
  currentStatus: StatusState | null;
  
  // Status setters
  setSuccess: (message?: string) => void;
  setError: (message?: string) => void;
  setWarning: (message?: string) => void;
  setInfo: (message?: string) => void;
  setLoading: (message?: string) => void;
  setPending: (message?: string) => void;
  setActive: (message?: string) => void;
  setInactive: (message?: string) => void;
  
  // Status utilities
  clearStatus: () => void;
  isStatus: (type: StatusType) => boolean;
  getStatusStyle: (variant?: StatusVariant) => any;
  getStatusIcon: () => string;
  getStatusColor: () => string;
  
  // Form validation helpers
  getFormValidationStyle: () => any;
  isFormValid: () => boolean;
  
  // Toast helpers
  showToast: (type: StatusType, message: string, options?: any) => void;
  
  // Accessibility helpers
  getAriaProps: () => Record<string, any>;
  announceStatus: (message: string) => void;
}

/**
 * Hook for managing Safe Talk status states and error handling
 */
export const useStatusManagement = (
  options: UseStatusManagementOptions = {}
): UseStatusManagementReturn => {
  const {
    autoClearSuccess = 3000,
    autoClearError = 0, // Don't auto-clear errors
    autoClearWarning = 5000,
    autoClearInfo = 4000,
    enableToasts = false,
    toastPosition = 'top-right',
    announceChanges = true,
    respectReducedMotion = true,
  } = options;

  const [currentStatus, setCurrentStatus] = useState<StatusState | null>(null);
  const toast = useToast();

  // Auto-clear status based on type
  useEffect(() => {
    if (!currentStatus) return;

    const autoClearTimes = {
      success: autoClearSuccess,
      error: autoClearError,
      warning: autoClearWarning,
      info: autoClearInfo,
      loading: 0, // Don't auto-clear loading
      pending: 0, // Don't auto-clear pending
      active: 0, // Don't auto-clear active
      inactive: 0, // Don't auto-clear inactive
    };

    const clearTime = autoClearTimes[currentStatus.type];
    if (clearTime > 0) {
      const timer = setTimeout(() => {
        setCurrentStatus(null);
      }, clearTime);

      return () => clearTimeout(timer);
    }
  }, [currentStatus, autoClearSuccess, autoClearError, autoClearWarning, autoClearInfo]);

  // Create status setter function
  const createStatusSetter = useCallback((type: StatusType) => {
    return (message?: string) => {
      const newStatus: StatusState = {
        type,
        message,
        timestamp: Date.now(),
        id: `${type}-${Date.now()}`,
      };

      setCurrentStatus(newStatus);

      // Show toast if enabled
      if (enableToasts && message) {
        const toastStyle = createToastStyle(type);
        toast({
          title: message,
          status: type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info',
          duration: type === 'error' ? null : 3000,
          isClosable: true,
          position: toastPosition,
          containerStyle: toastStyle,
        });
      }

      // Announce to screen readers
      if (announceChanges && message) {
        announceStatus(message);
      }
    };
  }, [enableToasts, toast, toastPosition, announceChanges]);

  // Status setters
  const setSuccess = createStatusSetter('success');
  const setError = createStatusSetter('error');
  const setWarning = createStatusSetter('warning');
  const setInfo = createStatusSetter('info');
  const setLoading = createStatusSetter('loading');
  const setPending = createStatusSetter('pending');
  const setActive = createStatusSetter('active');
  const setInactive = createStatusSetter('inactive');

  // Clear status
  const clearStatus = useCallback(() => {
    setCurrentStatus(null);
  }, []);

  // Check if current status matches type
  const isStatus = useCallback((type: StatusType): boolean => {
    return currentStatus?.type === type;
  }, [currentStatus]);

  // Get status style
  const getStatusStyle = useCallback((variant: StatusVariant = 'solid') => {
    if (!currentStatus) return {};
    return createStatusStyle(currentStatus.type, variant);
  }, [currentStatus]);

  // Get status icon
  const getStatusIcon = useCallback((): string => {
    if (!currentStatus) return '';
    
    const iconMap: Record<StatusType, string> = {
      success: '✓',
      error: '✗',
      warning: '⚠',
      info: 'ℹ',
      loading: '⟳',
      pending: '⏳',
      active: '●',
      inactive: '○',
    };
    
    return iconMap[currentStatus.type] || '';
  }, [currentStatus]);

  // Get status color
  const getStatusColor = useCallback((): string => {
    if (!currentStatus) return '';
    
    const colorMap: Record<StatusType, string> = {
      success: 'safeTalk.limeGreen.400',
      error: 'safeTalk.purple.400',
      warning: 'yellow.400',
      info: 'safeTalk.blue.400',
      loading: 'safeTalk.turquoise.400',
      pending: 'safeTalk.blue.300',
      active: 'safeTalk.limeGreen.500',
      inactive: 'safeTalk.navy.300',
    };
    
    return colorMap[currentStatus.type] || '';
  }, [currentStatus]);

  // Get form validation style
  const getFormValidationStyle = useCallback(() => {
    if (!currentStatus) return {};
    
    const validationMap: Record<StatusType, string> = {
      success: 'valid',
      error: 'invalid',
      warning: 'warning',
      info: 'valid',
      loading: 'loading',
      pending: 'loading',
      active: 'valid',
      inactive: 'invalid',
    };

    const validationState = validationMap[currentStatus.type];
    return createFormValidationStyle(validationState as any);
  }, [currentStatus]);

  // Check if form is valid
  const isFormValid = useCallback((): boolean => {
    if (!currentStatus) return true;
    return ['success', 'info', 'active'].includes(currentStatus.type);
  }, [currentStatus]);

  // Show toast manually
  const showToast = useCallback((type: StatusType, message: string, options: any = {}) => {
    const toastStyle = createToastStyle(type);
    toast({
      title: message,
      status: type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info',
      duration: type === 'error' ? null : 3000,
      isClosable: true,
      position: toastPosition,
      containerStyle: toastStyle,
      ...options,
    });
  }, [toast, toastPosition]);

  // Get ARIA props for accessibility
  const getAriaProps = useCallback(() => {
    if (!currentStatus) return {};

    const ariaProps: Record<string, any> = {
      'aria-live': currentStatus.type === 'error' ? 'assertive' : 'polite',
      'aria-atomic': true,
    };

    if (currentStatus.message) {
      ariaProps['aria-label'] = currentStatus.message;
    }

    return ariaProps;
  }, [currentStatus]);

  // Announce status to screen readers
  const announceStatus = useCallback((message: string) => {
    if (!announceChanges) return;

    // Create a temporary element for screen reader announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [announceChanges]);

  return {
    currentStatus,
    setSuccess,
    setError,
    setWarning,
    setInfo,
    setLoading,
    setPending,
    setActive,
    setInactive,
    clearStatus,
    isStatus,
    getStatusStyle,
    getStatusIcon,
    getStatusColor,
    getFormValidationStyle,
    isFormValid,
    showToast,
    getAriaProps,
    announceStatus,
  };
};

/**
 * Hook for form validation with Safe Talk status colors
 */
export const useFormValidation = (initialValues: Record<string, any> = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { setError, setSuccess, clearStatus, getFormValidationStyle } = useStatusManagement();

  const setValue = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
    setError(error);
  }, [setError]);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    
    // Clear global status if no more errors
    if (Object.keys(errors).length <= 1) {
      clearStatus();
    }
  }, [errors, clearStatus]);

  const setFieldTouched = useCallback((field: string, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const validateField = useCallback((field: string, validator: (value: any) => string | null) => {
    const error = validator(values[field]);
    if (error) {
      setFieldError(field, error);
      return false;
    } else {
      clearFieldError(field);
      return true;
    }
  }, [values, setFieldError, clearFieldError]);

  const validateForm = useCallback((validators: Record<string, (value: any) => string | null>) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    Object.entries(validators).forEach(([field, validator]) => {
      const error = validator(values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      setSuccess('Form validation passed');
    } else {
      setError('Please fix the errors below');
    }

    return isValid;
  }, [values, setSuccess, setError]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    clearStatus();
  }, [initialValues, clearStatus]);

  const getFieldProps = useCallback((field: string) => {
    const hasError = errors[field] && touched[field];
    const validationStyle = hasError ? createFormValidationStyle('invalid') : {};

    return {
      value: values[field] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(field, e.target.value),
      onBlur: () => setFieldTouched(field),
      isInvalid: hasError,
      errorBorderColor: 'safeTalk.purple.400',
      focusBorderColor: hasError ? 'safeTalk.purple.500' : 'safeTalk.turquoise.400',
      ...validationStyle,
    };
  }, [values, errors, touched, setValue, setFieldTouched]);

  const getFieldErrorProps = useCallback((field: string) => {
    const hasError = errors[field] && touched[field];
    
    return {
      children: hasError ? errors[field] : null,
      variant: 'safe-talk-error',
      role: 'alert',
      'aria-live': 'polite',
    };
  }, [errors, touched]);

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldError,
    clearFieldError,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    getFieldProps,
    getFieldErrorProps,
    getFormValidationStyle,
    isValid: Object.keys(errors).length === 0,
  };
};