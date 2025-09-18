import { useState, useCallback } from 'react'
import { useToast } from '@chakra-ui/react'

export interface FormSubmissionOptions<TData = any, TResponse = any> {
  endpoint: string
  method?: 'POST' | 'PUT' | 'PATCH'
  successMessage?: string
  errorMessage?: string
  onSuccess?: (data: TResponse) => void
  onError?: (error: Error) => void
  // Transform data before sending
  transformData?: (data: TData) => any
  // Custom headers
  headers?: Record<string, string>
}

interface FormSubmissionState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  data: any | null
}

interface ApiErrorResponse {
  success: boolean
  message: string
  errors?: Array<{ field: string; message: string }>
}

export const useFormSubmission = <TData = any, TResponse = any>(
  options: FormSubmissionOptions<TData, TResponse>
) => {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    data: null,
  })
  
  const toast = useToast()

  const submitForm = useCallback(async (formData: TData): Promise<TResponse | null> => {
    setState(prev => ({
      ...prev,
      isSubmitting: true,
      isSuccess: false,
      error: null,
    }))

    try {
      // Transform data if transformer provided
      const dataToSend = options.transformData ? options.transformData(formData) : formData

      const response = await fetch(options.endpoint, {
        method: options.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(dataToSend),
      })

      const result: ApiErrorResponse & TResponse = await response.json()

      if (!response.ok) {
        // Handle validation errors from API
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors.map(err => err.message).join(', ')
          throw new Error(errorMessages)
        }
        throw new Error(result.message || 'Wystąpił błąd podczas wysyłania')
      }

      // Success
      setState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
        data: result,
      })

      toast({
        title: 'Sukces!',
        description: options.successMessage || result.message || 'Formularz został wysłany pomyślnie',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      options.onSuccess?.(result)
      return result

    } catch (error: any) {
      const errorMessage = error.message || options.errorMessage || 'Wystąpił nieoczekiwany błąd'
      
      setState({
        isSubmitting: false,
        isSuccess: false,
        error: errorMessage,
        data: null,
      })

      toast({
        title: 'Błąd wysyłania',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      const errorObj = error instanceof Error ? error : new Error(errorMessage)
      options.onError?.(errorObj)
      return null
    }
  }, [options, toast])

  const resetForm = useCallback(() => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
      data: null,
    })
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    submitForm,
    resetForm,
    clearError,
  }
}