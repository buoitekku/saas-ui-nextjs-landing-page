'use client'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useState, useMemo, useCallback, memo } from 'react'
import { useFormSubmission } from '#hooks/use-form-submission'
import { useFormValidation, createValidationSchema, validationPatterns } from '#hooks/use-form-validation'
import { useConversionTracking } from '#components/analytics'
import { useSafeTalkSemanticColors } from '#hooks/use-safe-talk-colors'

interface WaitlistFormData {
  email: string
  name: string
  userType: string
}

// Success message component - memoized for performance
const SuccessMessage: React.FC<{ onReset: () => void }> = memo(({ onReset }) => {
  const colors = useSafeTalkSemanticColors()
  
  return (
    <Box
      p={6}
      bg={colors.success.bg}
      borderRadius="lg"
      textAlign="center"
    >
      <Text color={colors.success.color} fontWeight="semibold">
        ✅ Dziękujemy za zapisanie się!
      </Text>
      <Text color={colors.success.color} fontSize="sm" mt={2} opacity={0.8}>
        Powiadomimy Cię o uruchomieniu Safe Talk.
      </Text>
      <Button
        size="sm"
        variant="ghost"
        colorScheme="teal"
        mt={3}
        onClick={onReset}
      >
        Zapisz kolejny email
      </Button>
    </Box>
  )
})

SuccessMessage.displayName = 'SuccessMessage'

// Form field component for better reusability
interface FormFieldProps {
  name: keyof WaitlistFormData
  label: string
  type?: string
  placeholder: string
  size: string
  value: string
  error?: string
  onChange: (value: string) => void
  children?: React.ReactNode
}

const FormField: React.FC<FormFieldProps> = memo(({
  name,
  label,
  type = 'text',
  placeholder,
  size,
  value,
  error,
  onChange,
  children,
}) => (
  <FormControl isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    {children || (
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        size={size}
      />
    )}
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
))

FormField.displayName = 'FormField'

interface WaitlistSignupProps {
  /** Source identifier for analytics tracking */
  source?: string
  /** Whether to show compact version (fewer fields) */
  compact?: boolean
  /** Callback fired when form is successfully submitted */
  onSuccess?: () => void
  /** Custom CSS class for styling */
  className?: string
  /** ARIA label for the form */
  'aria-label'?: string
}

/**
 * WaitlistSignup Component
 * 
 * A form component for collecting user information for the Safe Talk waitlist.
 * Supports both full and compact modes, with proper validation and accessibility.
 * 
 * @example
 * ```tsx
 * <WaitlistSignup 
 *   compact={true} 
 *   source="hero_section"
 *   onSuccess={() => console.log('User signed up!')}
 * />
 * ```
 */
export const WaitlistSignup: React.FC<WaitlistSignupProps> = ({
  source = 'landing_page',
  compact = false,
  onSuccess,
  className,
  'aria-label': ariaLabel = 'Formularz zapisu na listę oczekujących Safe Talk',
}) => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    email: '',
    name: '',
    userType: '',
  })
  
  const colors = useSafeTalkSemanticColors()
  
  // Create validation schema based on compact mode - memoized for performance
  const validationSchema = useMemo(() => createValidationSchema<WaitlistFormData>({
    email: { 
      required: true, 
      pattern: validationPatterns.email,
      message: 'Podaj prawidłowy adres email'
    },
    name: compact ? 
      { 
        minLength: 2, 
        maxLength: 100,
        pattern: validationPatterns.name,
        message: 'Imię może zawierać tylko litery (2-100 znaków)'
      } : 
      { 
        required: true, 
        minLength: 2, 
        maxLength: 100, 
        pattern: validationPatterns.name,
        message: 'Imię jest wymagane (2-100 znaków, tylko litery)'
      },
    userType: compact ? 
      {} : 
      { required: true, message: 'Wybierz typ użytkownika' },
  }), [compact])

  const {
    errors,
    validateFormSync,
    validateField,
    clearFieldError,
    clearAllErrors,
  } = useFormValidation(validationSchema)
  
  const { trackWaitlistSignup } = useConversionTracking()
  
  const { isSubmitting, isSuccess, submitForm, resetForm } = useFormSubmission({
    endpoint: '/api/waitlist',
    successMessage: 'Dziękujemy! Zostałeś dodany do listy oczekujących.',
    onSuccess: () => {
      trackWaitlistSignup()
      setFormData({ email: '', name: '', userType: '' })
      clearAllErrors()
      onSuccess?.()
    },
  })

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const isValid = validateFormSync(formData)
      if (!isValid) return

      await submitForm({
        ...formData,
        source,
      })
    } catch (error) {
      console.error('Form submission error:', error)
      // Error is already handled by useFormSubmission hook
    }
  }, [formData, validateFormSync, submitForm, source])

  const handleInputChange = useCallback((field: keyof WaitlistFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (errors[field]) {
      clearFieldError(field)
    }
    
    // Real-time validation for better UX
    if (value.trim()) {
      validateField(field, value, formData)
    }
  }, [errors, clearFieldError, validateField, formData])

  if (isSuccess) {
    return (
      <SuccessMessage onReset={resetForm} />
    )
  }

  const fieldSize = compact ? 'md' : 'lg'
  
  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit}
      className={className}
      aria-label={ariaLabel}
      noValidate
    >
      <VStack spacing={4} align="stretch">
        {!compact && (
          <FormField
            name="name"
            label="Imię"
            placeholder="Twoje imię"
            size={fieldSize}
            value={formData.name}
            error={errors.name}
            onChange={(value) => handleInputChange('name', value)}
          />
        )}

        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="twoj@email.com"
          size={fieldSize}
          value={formData.email}
          error={errors.email}
          onChange={(value) => handleInputChange('email', value)}
        />

        {!compact && (
          <FormField
            name="userType"
            label="Jestem"
            placeholder="Wybierz opcję"
            size={fieldSize}
            value={formData.userType}
            error={errors.userType}
            onChange={(value) => handleInputChange('userType', value)}
          >
            <Select
              value={formData.userType}
              onChange={(e) => handleInputChange('userType', e.target.value)}
              placeholder="Wybierz opcję"
              size={fieldSize}
            >
              <option value="individual">Osobą prywatną</option>
              <option value="business">Przedstawicielem firmy</option>
              <option value="institution">Przedstawicielem instytucji</option>
            </Select>
          </FormField>
        )}

        <Button
          type="submit"
          colorScheme="teal"
          size={fieldSize}
          isLoading={isSubmitting}
          loadingText="Zapisywanie..."
          w="full"
        >
          Dołącz do listy oczekujących
        </Button>

        {compact && (
          <Text fontSize="xs" color={colors.text.muted} textAlign="center">
            Powiadomimy Cię o uruchomieniu aplikacji
          </Text>
        )}
      </VStack>
    </Box>
  )
}