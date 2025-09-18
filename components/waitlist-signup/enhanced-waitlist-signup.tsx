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
  useColorModeValue,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useForm } from '#hooks/use-form'
import { createValidationSchema, validationPatterns } from '#hooks/use-form-validation'
import { useConversionTracking } from '#components/analytics'

interface WaitlistFormData {
  email: string
  name: string
  userType: string
}

interface EnhancedWaitlistSignupProps {
  source?: string
  compact?: boolean
  onSuccess?: () => void
}

export const EnhancedWaitlistSignup: React.FC<EnhancedWaitlistSignupProps> = ({
  source = 'landing_page',
  compact = false,
  onSuccess,
}) => {
  const { trackWaitlistSignup } = useConversionTracking()

  // Create validation schema based on compact mode
  const validationSchema = useMemo(() => createValidationSchema<WaitlistFormData>({
    email: { 
      required: true, 
      pattern: validationPatterns.email,
      message: 'Podaj prawidłowy adres email'
    },
    name: compact ? 
      { minLength: 2, maxLength: 100, pattern: validationPatterns.name } : 
      { required: true, minLength: 2, maxLength: 100, pattern: validationPatterns.name },
    userType: compact ? 
      {} : 
      { required: true, message: 'Wybierz typ użytkownika' },
  }), [compact])

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      userType: '',
    },
    validationSchema,
    submissionOptions: {
      endpoint: '/api/waitlist',
      successMessage: 'Dziękujemy! Zostałeś dodany do listy oczekujących.',
      transformData: (data) => ({ ...data, source }),
    },
    onSuccess: () => {
      trackWaitlistSignup()
      onSuccess?.()
    },
  })

  if (form.isSuccess) {
    return (
      <Box
        p={6}
        bg={useColorModeValue('safeTalk.limeGreen.50', 'safeTalk.limeGreen.900')}
        borderRadius="lg"
        textAlign="center"
      >
        <Text color={useColorModeValue('safeTalk.limeGreen.700', 'safeTalk.limeGreen.200')} fontWeight="semibold">
          ✅ Dziękujemy za zapisanie się!
        </Text>
        <Text color={useColorModeValue('safeTalk.limeGreen.600', 'safeTalk.limeGreen.300')} fontSize="sm" mt={2}>
          Powiadomimy Cię o uruchomieniu Safe Talk.
        </Text>
        <Button
          size="sm"
          variant="ghost"
          colorScheme="teal"
          mt={3}
          onClick={form.resetForm}
        >
          Zapisz kolejny email
        </Button>
      </Box>
    )
  }

  return (
    <Box as="form" onSubmit={form.handleSubmit}>
      <VStack spacing={4} align="stretch">
        {!compact && (
          <FormControl isInvalid={!form.isFieldValid('name')}>
            <FormLabel>Imię</FormLabel>
            <Input
              {...form.getFieldProps('name')}
              placeholder="Twoje imię"
              size={compact ? 'md' : 'lg'}
            />
            <FormErrorMessage>{form.getFieldError('name')}</FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={!form.isFieldValid('email')}>
          <FormLabel>Email</FormLabel>
          <Input
            {...form.getFieldProps('email')}
            type="email"
            placeholder="twoj@email.com"
            size={compact ? 'md' : 'lg'}
          />
          <FormErrorMessage>{form.getFieldError('email')}</FormErrorMessage>
        </FormControl>

        {!compact && (
          <FormControl isInvalid={!form.isFieldValid('userType')}>
            <FormLabel>Jestem</FormLabel>
            <Select
              {...form.getFieldProps('userType')}
              placeholder="Wybierz opcję"
              size={compact ? 'md' : 'lg'}
            >
              <option value="individual">Osobą prywatną</option>
              <option value="business">Przedstawicielem firmy</option>
              <option value="institution">Przedstawicielem instytucji</option>
            </Select>
            <FormErrorMessage>{form.getFieldError('userType')}</FormErrorMessage>
          </FormControl>
        )}

        <Button
          type="submit"
          colorScheme="teal"
          size={compact ? 'md' : 'lg'}
          isLoading={form.isSubmitting}
          loadingText="Zapisywanie..."
          isDisabled={!form.canSubmit}
          w="full"
        >
          Dołącz do listy oczekujących
        </Button>

        {compact && (
          <Text fontSize="xs" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} textAlign="center">
            Powiadomimy Cię o uruchomieniu aplikacji
          </Text>
        )}
      </VStack>
    </Box>
  )
}