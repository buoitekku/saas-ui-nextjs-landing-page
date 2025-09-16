'use client'

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Icon,
  Card,
  CardBody,
  CardHeader,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiGrid, FiCheck, FiArrowRight } from 'react-icons/fi'
import { 
  UniversalProtectionIcon,
  PrivacyProtectionIcon
} from '#components/safe-talk-icons'
import { Section } from '#components/section'
import { FallInPlace } from '#components/motion/fall-in-place'
import { ButtonLink } from '#components/button-link/button-link'

interface AudienceCardProps {
  title: string
  subtitle: string
  icon: any
  benefits: string[]
  useCases: string[]
  ctaText: string
  ctaHref: string
  delay?: number
}

const AudienceCard: React.FC<AudienceCardProps> = ({
  title,
  subtitle,
  icon,
  benefits,
  useCases,
  ctaText,
  ctaHref,
  delay = 0,
}) => {
  const cardBg = useColorModeValue('white', 'safeTalk.navy.800')
  const borderColor = useColorModeValue('safeTalk.turquoise.200', 'safeTalk.turquoise.600')
  const iconBg = useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900')
  const iconColor = useColorModeValue('safeTalk.turquoise.500', 'safeTalk.turquoise.300')

  return (
    <FallInPlace delay={delay}>
      <Card
        bg={cardBg}
        borderColor={borderColor}
        borderWidth="1px"
        shadow="lg"
        h="full"
        transition="all 0.3s ease-in-out"
        _hover={{
          transform: 'translateY(-8px)',
          shadow: 'xl',
          borderColor: 'safeTalk.turquoise.300',
        }}
      >
        <CardHeader pb={4}>
          <VStack spacing={4} align="center">
            <Box
              p={4}
              bg={iconBg}
              borderRadius="full"
              transition="all 0.3s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            >
              <Icon as={icon} boxSize={8} color={iconColor} />
            </Box>
            <VStack spacing={2} textAlign="center">
              <Heading size="lg" fontFamily="Gabarito" fontWeight="bold">
                {title}
              </Heading>
              <Text color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} fontSize="md">
                {subtitle}
              </Text>
            </VStack>
          </VStack>
        </CardHeader>

        <CardBody pt={0}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="sm" mb={3} color={useColorModeValue('safeTalk.navy.400', 'white')}>
                Kluczowe korzyści:
              </Heading>
              <List spacing={2}>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} fontSize="sm">
                    <ListIcon as={FiCheck} color="safeTalk.turquoise.500" />
                    {benefit}
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <Heading size="sm" mb={3} color={useColorModeValue('safeTalk.navy.400', 'white')}>
                Przypadki użycia:
              </Heading>
              <List spacing={2}>
                {useCases.map((useCase, index) => (
                  <ListItem key={index} fontSize="sm">
                    <ListIcon as={FiArrowRight} color={useColorModeValue('safeTalk.turquoise.400', 'safeTalk.turquoise.300')} />
                    {useCase}
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box pt={4}>
              <ButtonLink
                href={ctaHref}
                variant="solid"
                colorScheme="teal"
                size="md"
                w="full"
                rightIcon={<FiArrowRight />}
              >
                {ctaText}
              </ButtonLink>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </FallInPlace>
  )
}

export const TargetAudience: React.FC = () => {
  const bgColor = useColorModeValue('white', 'safeTalk.navy.900')

  const audiences: AudienceCardProps[] = [
    {
      title: 'Osoby prywatne',
      subtitle: 'Ochrona dla Ciebie i Twojej rodziny',
      icon: UniversalProtectionIcon,
      benefits: [
        'Ochrona przed stratami finansowymi',
        'Bezpieczeństwo danych osobowych',
        'Spokój ducha podczas rozmów',
        'Łatwa instalacja i użytkowanie',
      ],
      useCases: [
        'Ochrona seniorów przed oszustwami "na wnuczka"',
        'Wykrywanie fałszywych połączeń z banków',
        'Identyfikacja oszustów podszywających się pod kurierów',
        'Ochrona przed inwestycyjnymi oszustwami',
      ],
      ctaText: 'Pobierz aplikację',
      ctaHref: '#download',
      delay: 0.2,
    },
    {
      title: 'Firmy',
      subtitle: 'Kompleksowa ochrona dla Twojego biznesu',
      icon: FiGrid,
      benefits: [
        'Ochrona pracowników przed social engineeringiem',
        'Redukcja ryzyka wycieku danych firmowych',
        'Zwiększenie świadomości bezpieczeństwa',
        'Centralne zarządzanie i raportowanie',
      ],
      useCases: [
        'Ochrona działów finansowych przed oszustwami CEO',
        'Zabezpieczenie informacji o klientach',
        'Szkolenie pracowników w zakresie cyberbezpieczeństwa',
        'Compliance z regulacjami RODO',
      ],
      ctaText: 'Skontaktuj się z nami',
      ctaHref: '#contact-business',
      delay: 0.4,
    },
    {
      title: 'Instytucje',
      subtitle: 'Rozwiązania dla sektora publicznego',
      icon: PrivacyProtectionIcon,
      benefits: [
        'Ochrona danych wrażliwych obywateli',
        'Zgodność z przepisami bezpieczeństwa',
        'Skalowalne rozwiązanie dla dużych organizacji',
        'Wsparcie techniczne 24/7',
      ],
      useCases: [
        'Ochrona urzędów przed atakami socjotechnicznymi',
        'Zabezpieczenie szpitali i placówek medycznych',
        'Ochrona instytucji finansowych',
        'Bezpieczeństwo w sektorze edukacyjnym',
      ],
      ctaText: 'Umów prezentację',
      ctaHref: '#contact-institution',
      delay: 0.6,
    },
  ]

  return (
    <Section bg={bgColor} py={20}>
      <Container maxW="container.xl">
        <FallInPlace delay={0.1}>
          <VStack spacing={12} textAlign="center">
            <VStack spacing={4}>
              <Heading
                size="2xl"
                fontFamily="Gabarito"
                fontWeight="bold"
                color={useColorModeValue('safeTalk.navy.400', 'white')}
              >
                Safe Talk dla każdego
              </Heading>
              <Text fontSize="xl" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} maxW="2xl">
                Niezależnie od tego, czy jesteś osobą prywatną, prowadzisz firmę, 
                czy zarządzasz instytucją - Safe Talk zapewni Ci odpowiedni poziom ochrony.
              </Text>
            </VStack>

            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={8}
              w="full"
            >
              {audiences.map((audience, index) => (
                <GridItem key={index}>
                  <AudienceCard {...audience} />
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </FallInPlace>
      </Container>
    </Section>
  )
}