import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Section } from '#components/section'

interface AppShowcaseProps {
  title?: string
  description?: string
}

export const AppShowcase: React.FC<AppShowcaseProps> = ({
  title = "Zobacz Safe Talk w akcji",
  description = "Poznaj interfejs aplikacji i zobacz jak chronimy Cię przed oszustwami telefonicznymi"
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  
  return (
    <Section bg={bgColor} py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12} textAlign="center">
          <FallInPlace delay={0.2}>
            <VStack spacing={4}>
              <Heading
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                fontFamily="Gabarito"
                fontWeight="bold"
                color="safeTalk.navy.400"
                _dark={{ color: 'white' }}
              >
                {title}
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}
                maxW="600px"
              >
                {description}
              </Text>
            </VStack>
          </FallInPlace>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={8}
            w="full"
            maxW="900px"
          >
            {/* Main app screen */}
            <FallInPlace delay={0.4}>
              <VStack spacing={4}>
                <Box
                  position="relative"
                  w="200px"
                  h="400px"
                  mx="auto"
                  borderRadius="2xl"
                  overflow="hidden"
                  shadow="2xl"
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  <Image
                    src="/static/images/safe-talk-app-mockup-detailed.svg"
                    alt="Safe Talk - główny ekran aplikacji"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <VStack spacing={2} textAlign="center">
                  <Text fontWeight="bold" color="safeTalk.navy.400">
                    Główny ekran
                  </Text>
                  <Text fontSize="sm" color="gray.600" maxW="180px">
                    Status ochrony i ostatnia aktywność w przejrzystym interfejsie
                  </Text>
                </VStack>
              </VStack>
            </FallInPlace>

            {/* Alert screen */}
            <FallInPlace delay={0.6}>
              <VStack spacing={4}>
                <Box
                  position="relative"
                  w="200px"
                  h="400px"
                  mx="auto"
                  borderRadius="2xl"
                  overflow="hidden"
                  shadow="2xl"
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  <Image
                    src="/static/images/safe-talk-alert-screen.svg"
                    alt="Safe Talk - ekran ostrzeżenia o oszustwie"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <VStack spacing={2} textAlign="center">
                  <Text fontWeight="bold" color="red.500">
                    Ostrzeżenie oszustwa
                  </Text>
                  <Text fontSize="sm" color="gray.600" maxW="180px">
                    Natychmiastowe powiadomienie o wykrytym zagrożeniu
                  </Text>
                </VStack>
              </VStack>
            </FallInPlace>

            {/* Dashboard screen */}
            <FallInPlace delay={0.8}>
              <VStack spacing={4}>
                <Box
                  position="relative"
                  w="200px"
                  h="400px"
                  mx="auto"
                  borderRadius="2xl"
                  overflow="hidden"
                  shadow="2xl"
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  <Image
                    src="/static/images/safe-talk-dashboard.svg"
                    alt="Safe Talk - panel statystyk i analiz"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <VStack spacing={2} textAlign="center">
                  <Text fontWeight="bold" color="safeTalk.turquoise.400">
                    Statystyki
                  </Text>
                  <Text fontSize="sm" color="gray.600" maxW="180px">
                    Szczegółowe analizy i historia wykrytych zagrożeń
                  </Text>
                </VStack>
              </VStack>
            </FallInPlace>
          </SimpleGrid>

          {/* Additional info */}
          <FallInPlace delay={1.0}>
            <VStack spacing={4} textAlign="center" maxW="600px">
              <Text
                fontSize="lg"
                color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}
              >
                Safe Talk działa w tle, analizując każdą rozmowę i ostrzegając Cię 
                przed potencjalnymi oszustwami w czasie rzeczywistym.
              </Text>
              <Box
                px={6}
                py={3}
                bg="safeTalk.turquoise.100"
                borderRadius="full"
                _dark={{ bg: 'safeTalk.turquoise.900' }}
              >
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color="safeTalk.turquoise.700"
                  _dark={{ color: 'safeTalk.turquoise.200' }}
                >
                  🛡️ Średni czas reakcji: &lt;1 sekunda
                </Text>
              </Box>
            </VStack>
          </FallInPlace>
        </VStack>
      </Container>
    </Section>
  )
}