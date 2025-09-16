'use client'

import React from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiRefreshCw, FiAlertTriangle } from 'react-icons/fi'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Track error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      })
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error} 
          resetError={this.resetError} 
        />
      )
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<{ 
  error?: Error
  resetError: () => void 
}> = ({ error, resetError }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  return (
    <Box bg={bgColor} minH="50vh" display="flex" alignItems="center">
      <Container maxW="container.md">
        <Box bg={cardBg} p={8} borderRadius="xl" shadow="lg" textAlign="center">
          <VStack spacing={6}>
            <Box color="red.500">
              <FiAlertTriangle size={48} />
            </Box>
            
            <VStack spacing={2}>
              <Heading size="lg" color="gray.800">
                Ups! Coś poszło nie tak
              </Heading>
              <Text color="gray.600">
                Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
              </Text>
            </VStack>

            {process.env.NODE_ENV === 'development' && error && (
              <Box
                bg="red.50"
                border="1px"
                borderColor="red.200"
                borderRadius="md"
                p={4}
                textAlign="left"
                fontSize="sm"
                fontFamily="mono"
                color="red.800"
                maxW="full"
                overflow="auto"
              >
                <Text fontWeight="bold" mb={2}>
                  Error Details:
                </Text>
                <Text>{error.message}</Text>
                {error.stack && (
                  <Text mt={2} fontSize="xs" opacity={0.8}>
                    {error.stack}
                  </Text>
                )}
              </Box>
            )}

            <Button
              leftIcon={<FiRefreshCw />}
              colorScheme="teal"
              onClick={resetError}
            >
              Spróbuj ponownie
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}