import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for waitlist signup
const waitlistSchema = z.object({
  email: z.string().email('Nieprawidłowy format email'),
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki').max(100, 'Imię jest za długie').optional(),
  userType: z.enum(['individual', 'business', 'institution']).optional(),
  source: z.string().max(50, 'Źródło jest za długie').optional(), // Track where signup came from
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate form data
    const validatedData = waitlistSchema.parse(body)
    
    // Check if email already exists in waitlist
    const existingUser = await checkExistingWaitlistUser(validatedData.email)
    
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Ten email jest już zapisany na liście oczekujących.' 
        },
        { status: 409 }
      )
    }
    
    // Add to waitlist
    await addToWaitlist(validatedData)
    
    // Send confirmation email
    await sendWaitlistConfirmation(validatedData)
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Dziękujemy! Zostałeś dodany do listy oczekujących. Powiadomimy Cię o uruchomieniu aplikacji.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Waitlist signup error:', error)
    
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

// Check if user already exists in waitlist
async function checkExistingWaitlistUser(email: string): Promise<boolean> {
  // Here you would check your database
  // For now, simulate check
  console.log('Checking existing user:', email)
  return false // Assume user doesn't exist
}

// Add user to waitlist
async function addToWaitlist(data: z.infer<typeof waitlistSchema>) {
  // Here you would save to database
  console.log('Adding to waitlist:', data)
  
  // Example database save:
  /*
  const db = getDatabase()
  await db.waitlist.create({
    data: {
      email: data.email,
      name: data.name,
      userType: data.userType,
      source: data.source,
      createdAt: new Date(),
      status: 'active'
    }
  })
  */
}

// Send waitlist confirmation email
async function sendWaitlistConfirmation(data: z.infer<typeof waitlistSchema>) {
  // Here you would send confirmation email
  console.log('Sending waitlist confirmation to:', data.email)
  
  // Example email sending:
  /*
  const emailService = new EmailService()
  
  await emailService.send({
    to: data.email,
    subject: 'Witaj na liście oczekujących Safe Talk!',
    template: 'waitlist-confirmation',
    data: {
      name: data.name || 'Użytkowniku',
      unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(data.email)}`
    }
  })
  */
}

// GET endpoint to get waitlist stats (optional)
export async function GET() {
  try {
    // Here you would get waitlist statistics
    const stats = await getWaitlistStats()
    
    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Waitlist stats error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Nie udało się pobrać statystyk' 
      },
      { status: 500 }
    )
  }
}

async function getWaitlistStats() {
  // Simulate stats
  return {
    totalUsers: 1247,
    thisWeek: 89,
    averageDaily: 12
  }
}