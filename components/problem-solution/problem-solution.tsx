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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiAlertTriangle, FiClock } from 'react-icons/fi'
import { 
  RealTimeAnalysisIcon,
  AIDetectionIcon
} from '#components/safe-talk-icons'
import Image from 'next/image'
import { Section } from '#components/section'
import { FallInPlace } from '#components/motion/fall-in-place'

export const ProblemSolution: React.FC = () => {
  const bgColor = useColorModeValue('white', 'safeTalk.navy.900')
  const cardBg = useColorModeValue('white', 'safeTalk.navy.800')
  const problemColor = useColorModeValue('red.500', 'red.300')
  const solutionColor = useColorModeValue('safeTalk.turquoise.500', 'safeTalk.turquoise.300')
  const textColor = useColorModeValue('safeTalk.navy.400', 'white')
  const mutedColor = useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')

  return (
    <Section bg={bgColor} py={20}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="start">
          {/* Problem Column */}
          <GridItem>
            <FallInPlace delay={0.2}>
              <VStack align="start" spacing={8}>
                <Box>
                  <HStack mb={4}>
                    <Icon as={FiAlertTriangle} color={problemColor} boxSize={8} />
                    <Heading
                      size="xl"
                      color={problemColor}
                      fontFamily="Gabarito"
                      fontWeight="bold"
                    >
                      Problem
                    </Heading>
                  </HStack>
                  <Heading
                    size="lg"
                    mb={4}
                    color={textColor}
                    fontFamily="Gabarito"
                    fontWeight="bold"
                  >
                    Oszustwa telefoniczne w Polsce to rosnący problem
                  </Heading>
                  <Text fontSize="lg" color={mutedColor} lineHeight="tall">
                    Każdego dnia tysiące Polaków pada ofiarą oszustów telefonicznych. 
                    Przestępcy wykorzystują coraz bardziej wyrafinowane techniki, 
                    podszywając się pod banki, urzędy czy firmy kurierskie.
                  </Text>
                </Box>

                {/* Problem Statistics */}
                <Grid templateColumns="1fr 1fr" gap={6} w="full">
                  <Box bg={cardBg} p={6} borderRadius="xl" shadow="sm">
                    <Stat>
                      <StatLabel color={mutedColor}>Straty rocznie</StatLabel>
                      <StatNumber color={problemColor} fontSize="2xl">
                        500 mln zł
                      </StatNumber>
                      <StatHelpText color={mutedColor}>
                        w Polsce
                      </StatHelpText>
                    </Stat>
                  </Box>
                  <Box bg={cardBg} p={6} borderRadius="xl" shadow="sm">
                    <Stat>
                      <StatLabel color={mutedColor}>Ofiary dziennie</StatLabel>
                      <StatNumber color={problemColor} fontSize="2xl">
                        1000+
                      </StatNumber>
                      <StatHelpText color={mutedColor}>
                        nowych przypadków
                      </StatHelpText>
                    </Stat>
                  </Box>
                </Grid>

                <VStack align="start" spacing={4}>
                  <Text fontSize="md" color={mutedColor}>
                    <strong>Najczęstsze oszustwa:</strong>
                  </Text>
                  <VStack align="start" spacing={2} pl={4}>
                    <Text fontSize="md" color={mutedColor}>
                      • Fałszywe połączenia z banków
                    </Text>
                    <Text fontSize="md" color={mutedColor}>
                      • Oszustwa "na wnuczka"
                    </Text>
                    <Text fontSize="md" color={mutedColor}>
                      • Podszywanie się pod firmy kurierskie
                    </Text>
                    <Text fontSize="md" color={mutedColor}>
                      • Fałszywe inwestycje i kredyty
                    </Text>
                  </VStack>
                </VStack>
              </VStack>
            </FallInPlace>
          </GridItem>

          {/* Solution Column */}
          <GridItem>
            <FallInPlace delay={0.4}>
              <VStack align="start" spacing={8}>
                <Box>
                  <HStack mb={4}>
                    <RealTimeAnalysisIcon size={32} />
                    <Heading
                      size="xl"
                      color={solutionColor}
                      fontFamily="Gabarito"
                      fontWeight="bold"
                    >
                      Rozwiązanie
                    </Heading>
                  </HStack>
                  <Heading
                    size="lg"
                    mb={4}
                    color={textColor}
                    fontFamily="Gabarito"
                    fontWeight="bold"
                  >
                    Safe Talk chroni w czasie rzeczywistym
                  </Heading>
                  <Text fontSize="lg" color={mutedColor} lineHeight="tall">
                    Nasza aplikacja analizuje rozmowy telefoniczne w czasie rzeczywistym 
                    i ostrzega przed potencjalnymi oszustwami, zanim stanie się szkoda. 
                    To pierwsza taka technologia w Polsce.
                  </Text>
                </Box>

                {/* Solution Benefits */}
                <VStack align="start" spacing={6} w="full">
                  <HStack spacing={4} align="start">
                    <Icon as={FiClock} color={solutionColor} boxSize={6} mt={1} />
                    <Box>
                      <Heading size="md" color={textColor} mb={2}>
                        Analiza w czasie rzeczywistym
                      </Heading>
                      <Text color={mutedColor}>
                        Nie czekamy aż rozmowa się skończy - ostrzegamy podczas trwania połączenia
                      </Text>
                    </Box>
                  </HStack>

                  <HStack spacing={4} align="start">
                    <AIDetectionIcon size={24} />
                    <Box>
                      <Heading size="md" color={textColor} mb={2}>
                        AI wykrywanie oszustw
                      </Heading>
                      <Text color={mutedColor}>
                        Zaawansowane algorytmy rozpoznają wzorce oszustów i nietypowe zachowania
                      </Text>
                    </Box>
                  </HStack>

                  <HStack spacing={4} align="start">
                    <RealTimeAnalysisIcon size={24} />
                    <Box>
                      <Heading size="md" color={textColor} mb={2}>
                        Ochrona prywatności
                      </Heading>
                      <Text color={mutedColor}>
                        Twoje rozmowy są analizowane lokalnie - nie przechowujemy nagrań
                      </Text>
                    </Box>
                  </HStack>
                </VStack>

                {/* Success Statistics */}
                <Box bg={cardBg} p={6} borderRadius="xl" shadow="sm" w="full">
                  <Grid templateColumns="1fr 1fr" gap={6}>
                    <Stat textAlign="center">
                      <StatNumber color={solutionColor} fontSize="3xl">
                        95%
                      </StatNumber>
                      <StatLabel color={mutedColor}>
                        skuteczność wykrywania
                      </StatLabel>
                    </Stat>
                    <Stat textAlign="center">
                      <StatNumber color={solutionColor} fontSize="3xl">
                        &lt;2s
                      </StatNumber>
                      <StatLabel color={mutedColor}>
                        czas reakcji
                      </StatLabel>
                    </Stat>
                  </Grid>
                </Box>
              </VStack>
            </FallInPlace>
          </GridItem>
        </Grid>

        {/* Comparison Graphic */}
        <FallInPlace delay={0.6}>
          <Box mt={16} textAlign="center">
            <Heading
              size="lg"
              mb={8}
              color={textColor}
              fontFamily="Gabarito"
              fontWeight="bold"
            >
              Porównanie: Tradycyjne podejście vs Safe Talk
            </Heading>
            <Box
              maxW="800px"
              mx="auto"
              borderRadius="xl"
              overflow="hidden"
              shadow="lg"
              bg="white"
              _dark={{ bg: 'safeTalk.navy.800' }}
            >
              <Image
                src="/static/images/safe-talk-vs-traditional.svg"
                alt="Porównanie Safe Talk z tradycyjnymi rozwiązaniami"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Box>
        </FallInPlace>
      </Container>
    </Section>
  )
}