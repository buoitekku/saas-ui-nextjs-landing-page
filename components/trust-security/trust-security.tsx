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
  Badge,
  Card,
  CardBody,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { 
  FiServer, 
  FiCheckCircle, 
  FiFileText,
  FiGlobe,
  FiDatabase
} from 'react-icons/fi'
import { 
  PrivacyProtectionIcon,
  SmartAlertsIcon
} from '#components/safe-talk-icons'
import { Section } from '#components/section'
import { FallInPlace } from '#components/motion/fall-in-place'

interface SecurityFeatureProps {
  icon: any
  title: string
  description: string
  delay?: number
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  const cardBg = useColorModeValue('white', 'safeTalk.navy.800')
  const iconBg = useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900')
  const iconColor = useColorModeValue('safeTalk.turquoise.500', 'safeTalk.turquoise.300')

  return (
    <FallInPlace delay={delay}>
      <Card
        bg={cardBg}
        shadow="md"
        borderRadius="xl"
        p={6}
        h="full"
        transition="all 0.3s ease-in-out"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: 'lg',
        }}
      >
        <CardBody p={0}>
          <VStack spacing={4} align="start">
            <Box
              p={3}
              bg={iconBg}
              borderRadius="lg"
              transition="all 0.3s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            >
              <Icon as={icon} boxSize={6} color={iconColor} />
            </Box>
            <VStack spacing={2} align="start">
              <Heading size="md" fontFamily="Gabarito" fontWeight="bold">
                {title}
              </Heading>
              <Text color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} fontSize="sm" lineHeight="tall">
                {description}
              </Text>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </FallInPlace>
  )
}

interface CertificationProps {
  name: string
  description: string
  status: 'active' | 'pending' | 'planned'
}

const Certification: React.FC<CertificationProps> = ({
  name,
  description,
  status,
}) => {
  const statusColors = {
    active: 'green',
    pending: 'yellow',
    planned: 'blue',
  }

  const statusLabels = {
    active: 'Aktywne',
    pending: 'W trakcie',
    planned: 'Planowane',
  }

  return (
    <HStack spacing={4} align="start" p={4} borderRadius="lg" bg={useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900')}>
      <Icon as={FiCheckCircle} color={`${statusColors[status]}.500`} mt={1} />
      <VStack spacing={1} align="start" flex={1}>
        <HStack>
          <Text fontWeight="semibold" fontSize="sm">
            {name}
          </Text>
          <Badge colorScheme={statusColors[status]} size="sm">
            {statusLabels[status]}
          </Badge>
        </HStack>
        <Text fontSize="xs" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}>
          {description}
        </Text>
      </VStack>
    </HStack>
  )
}

export const TrustSecurity: React.FC = () => {
  const bgColor = useColorModeValue('white', 'safeTalk.navy.900')
  const cardBg = useColorModeValue('white', 'safeTalk.navy.800')

  const securityFeatures: SecurityFeatureProps[] = [
    {
      icon: FiDatabase,
      title: 'Lokalne przetwarzanie',
      description: 'Wszystkie analizy odbywają się lokalnie na Twoim urządzeniu. Nie wysyłamy nagrań rozmów na nasze serwery.',
      delay: 0.1,
    },
    {
      icon: PrivacyProtectionIcon,
      title: 'Szyfrowanie end-to-end',
      description: 'Wszelkie dane przesyłane między aplikacją a naszymi serwerami są chronione szyfrowaniem AES-256.',
      delay: 0.2,
    },
    {
      icon: SmartAlertsIcon,
      title: 'Transparentność danych',
      description: 'Dokładnie informujemy jakie dane zbieramy, jak je używamy i nigdy nie sprzedajemy ich stronom trzecim.',
      delay: 0.3,
    },
    {
      icon: FiServer,
      title: 'Infrastruktura w Polsce',
      description: 'Nasze serwery znajdują się w Polsce i podlegają polskiemu prawu oraz regulacjom RODO.',
      delay: 0.4,
    },
  ]

  const certifications: CertificationProps[] = [
    {
      name: 'RODO/GDPR',
      description: 'Pełna zgodność z Rozporządzeniem o Ochronie Danych Osobowych',
      status: 'active',
    },
    {
      name: 'ISO 27001',
      description: 'Międzynarodowy standard zarządzania bezpieczeństwem informacji',
      status: 'pending',
    },
    {
      name: 'SOC 2 Type II',
      description: 'Certyfikat bezpieczeństwa i dostępności systemów',
      status: 'planned',
    },
    {
      name: 'Cybersecurity Framework',
      description: 'Zgodność z polskimi standardami cyberbezpieczeństwa',
      status: 'pending',
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
                Bezpieczeństwo i zaufanie
              </Heading>
              <Text fontSize="xl" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} lineHeight="tall">
                Twoja prywatność i bezpieczeństwo danych to nasz priorytet. 
                Dowiedz się jak chronimy Twoje informacje i zapewniamy transparentność.
              </Text>
            </VStack>
          </FallInPlace>

          {/* Security Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
            {securityFeatures.map((feature, index) => (
              <SecurityFeature key={index} {...feature} />
            ))}
          </SimpleGrid>

          {/* Privacy Policy and Certifications */}
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} w="full">
            {/* Privacy Policy */}
            <GridItem>
              <FallInPlace delay={0.5}>
                <Card bg={cardBg} shadow="lg" borderRadius="xl">
                  <CardBody p={8}>
                    <VStack spacing={6} align="start">
                      <HStack spacing={3}>
                        <Icon as={FiFileText} boxSize={8} color="safeTalk.turquoise.500" />
                        <Heading size="lg" fontFamily="Gabarito" fontWeight="bold">
                          Polityka prywatności
                        </Heading>
                      </HStack>
                      
                      <VStack spacing={4} align="start">
                        <Text color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} lineHeight="tall">
                          Nasza polityka prywatności jest napisana prostym językiem, 
                          bez prawniczego żargonu. Znajdziesz w niej jasne odpowiedzi na pytania:
                        </Text>
                        
                        <VStack spacing={2} align="start" pl={4}>
                          <Text fontSize="sm" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}>
                            • Jakie dane zbieramy i dlaczego
                          </Text>
                          <Text fontSize="sm" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}>
                            • Jak długo przechowujemy Twoje dane
                          </Text>
                          <Text fontSize="sm" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}>
                            • Z kim dzielimy informacje (spoiler: z nikim)
                          </Text>
                          <Text fontSize="sm" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}>
                            • Jak możesz kontrolować swoje dane
                          </Text>
                        </VStack>

                        <Box pt={4}>
                          <HStack spacing={4}>
                            <Badge colorScheme="teal" p={2} borderRadius="md">
                              <HStack spacing={1}>
                                <Icon as={FiGlobe} boxSize={3} />
                                <Text fontSize="xs">Dostępna w języku polskim</Text>
                              </HStack>
                            </Badge>
                            <Badge colorScheme="teal" p={2} borderRadius="md">
                              <HStack spacing={1}>
                                <Icon as={FiCheckCircle} boxSize={3} />
                                <Text fontSize="xs">Zgodna z RODO</Text>
                              </HStack>
                            </Badge>
                          </HStack>
                        </Box>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              </FallInPlace>
            </GridItem>

            {/* Certifications */}
            <GridItem>
              <FallInPlace delay={0.6}>
                <Card bg={cardBg} shadow="lg" borderRadius="xl">
                  <CardBody p={8}>
                    <VStack spacing={6} align="start">
                      <HStack spacing={3}>
                        <PrivacyProtectionIcon size={32} />
                        <Heading size="lg" fontFamily="Gabarito" fontWeight="bold">
                          Certyfikaty i standardy
                        </Heading>
                      </HStack>
                      
                      <Text color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} lineHeight="tall">
                        Pracujemy nad uzyskaniem najwyższych certyfikatów bezpieczeństwa 
                        i zgodności z międzynarodowymi standardami.
                      </Text>

                      <VStack spacing={3} w="full">
                        {certifications.map((cert, index) => (
                          <Certification key={index} {...cert} />
                        ))}
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              </FallInPlace>
            </GridItem>
          </Grid>

          {/* Trust Statement */}
          <FallInPlace delay={0.7}>
            <Card bg="safeTalk.turquoise.50" borderColor="safeTalk.turquoise.200" borderWidth="1px" shadow="lg" borderRadius="xl" w="full">
              <CardBody p={8}>
                <VStack spacing={4} textAlign="center">
                  <PrivacyProtectionIcon size={48} />
                  <Heading size="lg" fontFamily="Gabarito" fontWeight="bold" color="safeTalk.turquoise.700">
                    Nasze zobowiązanie
                  </Heading>
                  <Text color="safeTalk.turquoise.600" fontSize="lg" lineHeight="tall" maxW="4xl">
                    Safe Talk powstał z myślą o ochronie ludzi przed oszustami. Nigdy nie będziemy 
                    wykorzystywać Twoich danych w sposób, który mógłby Ci zaszkodzić. Nasze algorytmy 
                    działają wyłącznie po to, żeby Cię chronić - nie żeby Cię śledzić czy profilować.
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </FallInPlace>
        </VStack>
      </Container>
    </Section>
  )
}