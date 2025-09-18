import { useState, useCallback, useMemo } from 'react'
import { useFormValidation, ValidationSchema } from './use-form-validation'
import { useFormSubmission, FormSubmissionOptions } from './use-form-submission'

interface UseFormOptions<TData extends Record<string, any>, TResponse = any> {
  initialValues: TData
  validationSchema: ValidationSchema<TData>
  submissionOptions: FormSubmissionOptions<TData, TResponse>
  onSuccess?: (data: TResponse) => void
  onError?: (error: Error) => void
}

export const useForm = <TData extends Record<string, any>, TResponse = any>({
  initialValues,
  validationSchema,
  submissionOptions,
  onSuccess,
  onError,
}: UseFormOptions<TData, TResponse>) => {
  const [values, setValues] = useState<TData>(initialValues)
  const [touched, setTouched] = useState<Partial<Record<keyof TData, boolean>>>({})

  const {
    errors,
    hasErrors,
    validateFormSync,
    validateField,
    clearFieldError,
    clearAllErrors,
    isFieldValid,
  } = useFormValidation(validationSchema)

  const {
    isSubmitting,
    isSuccess,
    error: submissionError,
    data,
    submitForm,
    resetForm: resetSubmission,
    clearError,
  } = useFormSubmission({
    ...submissionOptions,
    onSuccess: (responseData) => {
      submissionOptions.onSuccess?.(responseData)
      onSuccess?.(responseData)
    },
    onError: (error) => {
      submissionOptions.onError?.(error)
      onError?.(error)
    },
  })

  const setValue = useCallback((field: keyof TData, value: TData[keyof TData]) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when value changes
    if (errors[field]) {
      clearFieldError(field)
    }
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // Real-time validation for touched fields
    if (touched[field] && value !== undefined && value !== '') {
      validateField(field, value, values)
    }
  }, [errors, clearFieldError, touched, validateField, values])

  const setMultipleValues = useCallback((newValues: Partial<TData>) => {
    setValues(prev => ({ ...prev, ...newValues }))
  }, [])

  const handleBlur = useCallback((field: keyof TData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // Validate on blur
    const value = values[field]
    if (value !== undefined) {
      validateField(field, value, values)
    }
  }, [values, validateField])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
      acc[key as keyof TData] = true
      return acc
    }, {} as Record<keyof TData, boolean>)
    setTouched(allTouched)
    
    // Validate form
    const isValid = validateFormSync(values)
    if (!isValid) {
      return false
    }
    
    // Submit form
    const result = await submitForm(values)
    return result !== null
  }, [validationSchema, validateFormSync, values, submitForm])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setTouched({})
    clearAllErrors()
    resetSubmission()
  }, [initialValues, clearAllErrors, resetSubmission])

  const isDirty = useMemo(() => {
    return Object.keys(values).some(key => 
      values[key as keyof TData] !== initialValues[key as keyof TData]
    )
  }, [values, initialValues])

  const isValid = useMemo(() => !hasErrors, [hasErrors])

  const canSubmit = useMemo(() => 
    !isSubmitting && isValid && isDirty, 
    [isSubmitting, isValid, isDirty]
  )

  return {
    // Form state
    values,
    errors,
    touched,
    isDirty,
    isValid,
    canSubmit,
    
    // Submission state
    isSubmitting,
    isSuccess,
    submissionError,
    data,
    
    // Form actions
    setValue,
    setValues: setMultipleValues,
    handleBlur,
    handleSubmit,
    resetForm,
    clearError,
    
    // Field helpers
    getFieldProps: (field: keyof TData) => ({
      value: values[field] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => 
        setValue(field, e.target.value as TData[keyof TData]),
      onBlur: () => handleBlur(field),
      isInvalid: touched[field] && !!errors[field],
    }),
    
    getFieldError: (field: keyof TData) => touched[field] ? errors[field] : undefined,
    isFieldTouched: (field: keyof TData) => !!touched[field],
    isFieldValid: (field: keyof TData) => isFieldValid(field) || !touched[field],
  }
}