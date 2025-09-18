import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki').max(100, 'Imię jest za długie'),
  email: z.string().email('Nieprawidłowy format email'),
  company: z.string().max(100, 'Nazwa firmy jest za długa').optional(),
  inquiryType: z.enum(['general', 'demo', 'business', 'partnership', 'press', 'waitlist']),
  message: z.string().min(10, 'Wiadomość musi mieć co najmniej 10 znaków').max(1000, 'Wiadomość jest za długa'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate form data
    const validatedData = contactFormSchema.parse(body)
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send confirmation email to user
    
    // For now, we'll simulate processing
    console.log('Contact form submission:', validatedData)
    
    // Simulate email sending (replace with actual email service)
    await simulateEmailSending(validatedData)
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Wiadomość została wysłana pomyślnie. Skontaktujemy się z Tobą w ciągu 24 godzin.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      // Validation error
      return NextResponse.json(
        { 
          success: false, 
          message: 'Błąd walidacji danych',
          errors: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }
    
    // Server error
    return NextResponse.json(
      { 
        success: false, 
        message: 'Wystąpił błąd serwera. Spróbuj ponownie później.' 
      },
      { status: 500 }
    )
  }
}

// Simulate email sending (replace with actual email service like SendGrid, Resend, etc.)
async function simulateEmailSending(data: z.infer<typeof contactFormSchema>) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Here you would integrate with email service:
  /*
  const emailService = new EmailService()
  
  // Send notification to Safe Talk team
  await emailService.send({
    to: 'kontakt@safetalk.pl',
    subject: `Nowe zapytanie: ${data.inquiryType}`,
    template: 'contact-form-notification',
    data: data
  })
  
  // Send confirmation to user
  await emailService.send({
    to: data.email,
    subject: 'Potwierdzenie otrzymania wiadomości - Safe Talk',
    template: 'contact-form-confirmation',
    data: { name: data.name }
  })
  */
  
  console.log('Email would be sent to:', data.email)
}