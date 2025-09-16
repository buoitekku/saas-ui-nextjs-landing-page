import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { 
  SafeTalkIcon, 
  RealTimeAnalysisIcon,
  getAvailableIconNames,
  getIconMetadata 
} from '../safe-talk-icons'

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider>{children}</ChakraProvider>
)

describe('SafeTalkIcon', () => {
  it('renders with correct accessibility attributes', () => {
    render(
      <TestWrapper>
        <SafeTalkIcon name="real-time-analysis" />
      </TestWrapper>
    )
    
    const icon = screen.getByRole('img')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-label', 'Analiza w czasie rzeczywistym')
  })

  it('renders with custom alt text', () => {
    render(
      <TestWrapper>
        <SafeTalkIcon name="ai-detection" alt="Custom alt text" />
      </TestWrapper>
    )
    
    const icon = screen.getByRole('img')
    expect(icon).toHaveAttribute('aria-label', 'Custom alt text')
  })

  it('renders with custom size', () => {
    render(
      <TestWrapper>
        <SafeTalkIcon name="privacy-protection" size={48} />
      </TestWrapper>
    )
    
    const icon = screen.getByRole('img')
    expect(icon).toHaveStyle({ width: '48px', height: '48px' })
  })

  it('shows loading state', () => {
    render(
      <TestWrapper>
        <SafeTalkIcon name="smart-alerts" loading={true} />
      </TestWrapper>
    )
    
    const loadingElement = screen.getByLabelText('Ładowanie ikony...')
    expect(loadingElement).toBeInTheDocument()
  })

  it('renders individual icon components', () => {
    render(
      <TestWrapper>
        <RealTimeAnalysisIcon />
      </TestWrapper>
    )
    
    const icon = screen.getByRole('img')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-label', 'Analiza w czasie rzeczywistym')
  })
})

describe('Utility functions', () => {
  it('returns all available icon names', () => {
    const iconNames = getAvailableIconNames()
    expect(iconNames).toContain('real-time-analysis')
    expect(iconNames).toContain('ai-detection')
    expect(iconNames).toContain('privacy-protection')
    expect(iconNames.length).toBeGreaterThan(0)
  })

  it('returns correct icon metadata', () => {
    const metadata = getIconMetadata('real-time-analysis')
    expect(metadata).toEqual({
      label: 'Analiza w czasie rzeczywistym',
      description: 'Ikona przedstawiająca analizę rozmów w czasie rzeczywistym',
    })
  })
})