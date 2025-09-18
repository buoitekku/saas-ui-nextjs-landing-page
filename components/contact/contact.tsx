'use client'

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Card,
  CardBody,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiLinkedin, 
  FiTwitter, 
  FiFacebook,
  FiSend,
  FiUser,
  FiMessageSquare
} from 'react-icons/fi'
import { Section } from '#components/section'
import { FallInPlace } from '#components/motion/fall-in-place'
import { useConversionTracking } from '#components/analytics/conversion-tracking'
import { useFormSubmission } from '../../hooks/use-form-submission'
import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  company: string
  inquiryType: string
  message: string
}

interface ContactInfoProps {
  icon: any
  title: string
  content: string
  link?: string
  delay?: number
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  icon,
  title,
  content,
  link,
  delay = 0,
}) => {
  const iconBg = useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900')
  const iconColor = useColorModeValue('safeTalk.turquoise.500', 'safeTalk.turquoise.300')

  const ContentComponent = link ? Link : Text

  return (
    <FallInPlace delay={delay}>
      <HStack spacing={4} align="start">
        <Box
          p={3}
          bg={iconBg}
          borderRadius="lg"
          transition="all 0.3s ease-in-out"
          _hover={{ transform: 'scale(1.1)' }}
        >
          <Icon as={icon} boxSize={5} color={iconColor} />
        </Box>
        <VStack spacing={1} align="start">
          <Text fontWeight="semibold" color={useColorModeValue('safeTalk.navy.400', 'white')}>
            {title}
          </Text>
          <ContentComponent
            color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}
            fontSize="sm"
            href={link}
            isExternal={!!link}
            _hover={link ? { color: 'safeTalk.turquoise.500' } : {}}
          >
            {content}
          </ContentComponent>
        </VStack>
      </HStack>
    </FallInPlace>
  )
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const { trackFormSubmission, trackBusinessInquiry, trackDemoRequest, trackWaitlistSignup } = useConversionTracking()
  
  const { isSubmitting, submitForm } = useFormSubmission({
    endpoint: '/api/contact',
    onSuccess: () => {
      // Track successful form submission
      trackFormSubmission('contact_form', true)
      
      // Track specific conversion types
      switch (formData.inquiryType) {
        case 'business':
          trackBusinessInquiry()
          break
        case 'demo':
          trackDemoRequest()
          break
        case 'waitlist':
          trackWaitlistSignup()
          break
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: '',
        message: '',
      })
      setErrors({})
    },
    onError: () => {
      trackFormSubmission('contact_form', false)
    }
  })

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email'
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Wybierz rodzaj zapytania'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    await submitForm(formData)
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      content: 'kontakt@safetalk.pl',
      link: 'mailto:kontakt@safetalk.pl',
      delay: 0.2,
    },
    {
      icon: FiPhone,
      title: 'Telefon',
      content: '+48 123 456 789',
      link: 'tel:+48123456789',
      delay: 0.3,
    },
    {
      icon: FiMapPin,
      title: 'Adres',
      content: 'ul. Technologiczna 1, 00-001 Warszawa',
      delay: 0.4,
    },
  ]

  const socialLinks = [
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/safetalk',
      color: 'blue.600',
    },
    {
      icon: FiTwitter,
      label: 'Twitter',
      href: 'https://twitter.com/safetalk_pl',
      color: 'blue.400',
    },
    {
      icon: FiFacebook,
      label: 'Facebook',
      href: 'https://facebook.com/safetalk.pl',
      color: 'blue.500',
    },
  ]

  return (
    <Section bg={bgColor} py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* Header */}
          <FallInPlace delay={0.1}>
            <VStack spacing={4} textAlign="center" maxW="3xl">
              <Heading
                size="2xl"
                fontFamily="Gabarito"
                fontWeight="bold"
                color={useColorModeValue('safeTalk.navy.400', 'white')}
              >
                Skontaktuj się z nami
              </Heading>
              <Text fontSize="xl" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} lineHeight="tall">
                Masz pytania o Safe Talk? Chcesz umówić prezentację dla swojej firmy? 
                A może chcesz dołączyć do listy oczekujących na aplikację? Napisz do nas!
              </Text>
            </VStack>
          </FallInPlace>

          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} w="full">
            {/* Contact Form */}
            <GridItem>
              <FallInPlace delay={0.2}>
                <Card bg={cardBg} shadow="lg" borderRadius="xl">
                  <CardBody p={8}>
                    <VStack spacing={6} align="stretch">
                      <Heading size="lg" fontFamily="Gabarito" fontWeight="bold">
                        Wyślij wiadomość
                      </Heading>

                      <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="stretch">
                          <FormControl isInvalid={!!errors.name}>
                            <FormLabel>Imię i nazwisko *</FormLabel>
                            <Input
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Jan Kowalski"
                              size="lg"
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                          </FormControl>

                          <FormControl isInvalid={!!errors.email}>
                            <FormLabel>Email *</FormLabel>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="jan@example.com"
                              size="lg"
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>

                          <FormControl>
                            <FormLabel>Firma/Organizacja</FormLabel>
                            <Input
                              value={formData.company}
                              onChange={(e) => handleInputChange('company', e.target.value)}
                              placeholder="Nazwa firmy (opcjonalnie)"
                              size="lg"
                            />
                          </FormControl>

                          <FormControl isInvalid={!!errors.inquiryType}>
                            <FormLabel>Rodzaj zapytania *</FormLabel>
                            <Select
                              value={formData.inquiryType}
                              onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                              placeholder="Wybierz rodzaj zapytania"
                              size="lg"
                            >
                              <option value="general">Ogólne pytanie</option>
                              <option value="demo">Prezentacja produktu</option>
                              <option value="business">Rozwiązania biznesowe</option>
                              <option value="partnership">Partnerstwo</option>
                              <option value="press">Media i prasa</option>
                              <option value="waitlist">Lista oczekujących</option>
                            </Select>
                            <FormErrorMessage>{errors.inquiryType}</FormErrorMessage>
                          </FormControl>

                          <FormControl isInvalid={!!errors.message}>
                            <FormLabel>Wiadomość *</FormLabel>
                            <Textarea
                              value={formData.message}
                              onChange={(e) => handleInputChange('message', e.target.value)}
                              placeholder="Opisz swoje pytanie lub potrzeby..."
                              rows={5}
                              size="lg"
                            />
                            <FormErrorMessage>{errors.message}</FormErrorMessage>
                          </FormControl>

                          <Button
                            type="submit"
                            colorScheme="teal"
                            size={{ base: 'lg', md: 'lg' }}
                            leftIcon={<FiSend />}
                            isLoading={isSubmitting}
                            loadingText="Wysyłanie..."
                            w="full"
                            minH="48px" // Touch-friendly height
                          >
                            Wyślij wiadomość
                          </Button>
                        </VStack>
                      </form>
                    </VStack>
                  </CardBody>
                </Card>
              </FallInPlace>
            </GridItem>

            {/* Contact Info */}
            <GridItem>
              <VStack spacing={8} align="stretch">
                <FallInPlace delay={0.3}>
                  <Card bg={cardBg} shadow="lg" borderRadius="xl">
                    <CardBody p={8}>
                      <VStack spacing={6} align="stretch">
                        <Heading size="lg" fontFamily="Gabarito" fontWeight="bold">
                          Informacje kontaktowe
                        </Heading>

                        <VStack spacing={6} align="stretch">
                          {contactInfo.map((info, index) => (
                            <ContactInfo key={index} {...info} />
                          ))}
                        </VStack>

                        <Box pt={4}>
                          <Text fontWeight="semibold" color={useColorModeValue('safeTalk.navy.400', 'white')} mb={4}>
                            Śledź nas w mediach społecznościowych:
                          </Text>
                          <HStack spacing={4}>
                            {socialLinks.map((social, index) => (
                              <Link key={index} href={social.href} isExternal>
                                <Box
                                  p={3}
                                  borderRadius="lg"
                                  bg={useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900')}
                                  transition="all 0.3s ease-in-out"
                                  _hover={{
                                    bg: social.color,
                                    color: 'white',
                                    transform: 'translateY(-2px)',
                                  }}
                                >
                                  <Icon as={social.icon} boxSize={5} />
                                </Box>
                              </Link>
                            ))}
                          </HStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </FallInPlace>

                {/* Waitlist CTA */}
                <FallInPlace delay={0.4}>
                  <Card bg="safeTalk.turquoise.50" borderColor="safeTalk.turquoise.200" borderWidth="1px" shadow="lg" borderRadius="xl">
                    <CardBody p={8}>
                      <VStack spacing={4} textAlign="center">
                        <Icon as={FiUser} boxSize={12} color="safeTalk.turquoise.500" />
                        <Heading size="lg" fontFamily="Gabarito" fontWeight="bold" color="safeTalk.turquoise.700">
                          Dołącz do listy oczekujących
                        </Heading>
                        <Text color="safeTalk.turquoise.600" lineHeight="tall">
                          Bądź pierwszą osobą, która otrzyma dostęp do Safe Talk. 
                          Wyślij nam swój email, a powiadomimy Cię o uruchomieniu aplikacji.
                        </Text>
                        <Button 
                          colorScheme="teal" 
                          size="lg" 
                          w="full"
                          onClick={() => {
                            // This could open a modal with WaitlistSignup component
                            // For now, we'll redirect to contact form with waitlist pre-selected
                            setFormData(prev => ({ ...prev, inquiryType: 'waitlist' }))
                          }}
                        >
                          Zapisz się na listę oczekujących
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </FallInPlace>
              </VStack>
            </GridItem>
          </Grid>

          {/* Final CTA */}
          <FallInPlace delay={0.5}>
            <Card bg={useColorModeValue('safeTalk.navy.400', 'safeTalk.navy.800')} color="white" shadow="2xl" borderRadius="2xl" w="full">
              <CardBody p={12}>
                <VStack spacing={6} textAlign="center">
                  <Heading size="xl" fontFamily="Gabarito" fontWeight="bold">
                    Gotowy na bezpieczne rozmowy?
                  </Heading>
                  <Text fontSize="lg" lineHeight="tall" maxW="3xl" opacity={0.9}>
                    Safe Talk to przyszłość ochrony przed oszustwami telefonicznymi. 
                    Dołącz do tysięcy użytkowników, którzy już chronią się przed oszustami.
                  </Text>
                  <HStack spacing={4} pt={4}>
                    <Button colorScheme="teal" size="lg" leftIcon={<FiUser />}>
                      Dołącz do listy oczekujących
                    </Button>
                    <Button variant="outline" colorScheme="whiteAlpha" size="lg" leftIcon={<FiMessageSquare />}>
                      Umów prezentację
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </FallInPlace>
        </VStack>
      </Container>
    </Section>
  )
}