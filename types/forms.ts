// Form-related type definitions

export interface ContactFormData {
  name: string
  email: string
  company?: string
  inquiryType: 'general' | 'demo' | 'business' | 'partnership' | 'press' | 'waitlist'
  message: string
}

export interface WaitlistFormData {
  email: string
  name?: string
  userType?: 'individual' | 'business' | 'institution'
  source?: string
}

export interface FormSubmissionResponse {
  success: boolean
  message: string
  errors?: Array<{
    field: string
    message: string
  }>
}

export interface FormValidationError {
  field: string
  message: string
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: FormValidationError[]
}

// Analytics event types
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export interface ConversionEvent extends AnalyticsEvent {
  conversionId?: string
  currency?: string
}