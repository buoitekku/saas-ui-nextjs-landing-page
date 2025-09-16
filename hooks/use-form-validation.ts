import { useState, useCallback, useMemo } from 'react'

export interface ValidationRule<T> {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: T) => string | null
  message?: string
}

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>
}

// Enhanced validation rule with better typing
export interface EnhancedValidationRule<T> extends ValidationRule<T> {
  // Add support for async validation
  asyncValidator?: (value: T) => Promise<string | null>
  // Add support for field dependencies
  dependsOn?: keyof T
  // Add support for conditional validation
  condition?: (formData: any) => boolean
}

// Helper function to check if value is empty
const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return !value.trim()
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// Helper function to get field display name
const getFieldDisplayName = (field: string): string => {
  // Convert camelCase to readable format
  return field
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, str => str.toUpperCase())
}

export const useFormValidation = <T extends Record<string, any>>(
  schema: ValidationSchema<T>
) => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isValidating, setIsValidating] = useState(false)

  // Memoize schema to prevent unnecessary re-renders
  const memoizedSchema = useMemo(() => schema, [schema])

  const validateField = useCallback(
    (field: keyof T, value: T[keyof T], formData?: Partial<T>): string | null => {
      const rule = memoizedSchema[field]
      if (!rule) return null

      const fieldName = getFieldDisplayName(String(field))
      const isEmptyValue = isEmpty(value)

      // Required validation
      if (rule.required && isEmptyValue) {
        return rule.message || `${fieldName} jest wymagane`
      }

      // Skip other validations if field is empty and not required
      if (isEmptyValue) {
        return null
      }

      // String-specific validations
      if (typeof value === 'string') {
        const trimmedValue = value.trim()
        
        // Min length validation
        if (rule.minLength !== undefined && trimmedValue.length < rule.minLength) {
          return rule.message || `${fieldName} musi mieć co najmniej ${rule.minLength} znaków`
        }

        // Max length validation
        if (rule.maxLength !== undefined && trimmedValue.length > rule.maxLength) {
          return rule.message || `${fieldName} może mieć maksymalnie ${rule.maxLength} znaków`
        }

        // Pattern validation (e.g., email)
        if (rule.pattern && !rule.pattern.test(trimmedValue)) {
          return rule.message || `${fieldName} ma nieprawidłowy format`
        }
      }

      // Number validations
      if (typeof value === 'number') {
        if (rule.minLength !== undefined && value < rule.minLength) {
          return rule.message || `${fieldName} musi być większe lub równe ${rule.minLength}`
        }
        if (rule.maxLength !== undefined && value > rule.maxLength) {
          return rule.message || `${fieldName} musi być mniejsze lub równe ${rule.maxLength}`
        }
      }

      // Custom validation
      if (rule.custom) {
        return rule.custom(value)
      }

      return null
    },
    [memoizedSchema]
  )

  const validateForm = useCallback(
    async (formData: T): Promise<boolean> => {
      setIsValidating(true)
      const newErrors: Partial<Record<keyof T, string>> = {}
      let isValid = true

      // Validate all fields
      for (const field of Object.keys(memoizedSchema)) {
        const fieldKey = field as keyof T
        const error = validateField(fieldKey, formData[fieldKey], formData)
        if (error) {
          newErrors[fieldKey] = error
          isValid = false
        }
      }

      setErrors(newErrors)
      setIsValidating(false)
      return isValid
    },
    [memoizedSchema, validateField]
  )

  // Synchronous version for backward compatibility
  const validateFormSync = useCallback(
    (formData: T): boolean => {
      const newErrors: Partial<Record<keyof T, string>> = {}
      let isValid = true

      Object.keys(memoizedSchema).forEach((field) => {
        const fieldKey = field as keyof T
        const error = validateField(fieldKey, formData[fieldKey], formData)
        if (error) {
          newErrors[fieldKey] = error
          isValid = false
        }
      })

      setErrors(newErrors)
      return isValid
    },
    [memoizedSchema, validateField]
  )

  const clearFieldError = useCallback((field: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const clearAllErrors = useCallback(() => {
    setErrors({})
  }, [])

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }))
  }, [])

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])
  const isFieldValid = useCallback((field: keyof T) => !errors[field], [errors])

  return {
    errors,
    hasErrors,
    isValidating,
    validateForm,
    validateFormSync,
    validateField,
    clearFieldError,
    clearAllErrors,
    setFieldError,
    isFieldValid,
  }
}

// Common validation patterns with improved regex
export const validationPatterns = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  phone: /^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{2}\s?\d{3}\s?\d{2}\s?\d{2})$/,
  url: /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/,
  // Additional patterns for Safe Talk
  name: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-']{2,}$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  postalCode: /^\d{2}-\d{3}$/,
} as const

// Common validation schemas with better typing and messages
export const commonSchemas = {
  contact: {
    name: { 
      required: true, 
      minLength: 2, 
      maxLength: 100,
      pattern: validationPatterns.name,
      message: 'Imię może zawierać tylko litery, spacje, myślniki i apostrofy'
    },
    email: { 
      required: true, 
      pattern: validationPatterns.email,
      message: 'Podaj prawidłowy adres email'
    },
    company: { 
      maxLength: 100,
      message: 'Nazwa firmy może mieć maksymalnie 100 znaków'
    },
    inquiryType: { 
      required: true,
      message: 'Wybierz typ zapytania'
    },
    message: { 
      required: true, 
      minLength: 10, 
      maxLength: 1000,
      message: 'Wiadomość musi mieć od 10 do 1000 znaków'
    },
  },
  
  waitlist: {
    email: { 
      required: true, 
      pattern: validationPatterns.email,
      message: 'Podaj prawidłowy adres email'
    },
    name: { 
      minLength: 2, 
      maxLength: 100,
      pattern: validationPatterns.name,
      message: 'Imię może zawierać tylko litery, spacje, myślniki i apostrofy'
    },
    userType: {
      message: 'Wybierz typ użytkownika'
    },
  },
} as const

// Type-safe schema creator
export const createValidationSchema = <T extends Record<string, any>>(
  schema: ValidationSchema<T>
): ValidationSchema<T> => schema