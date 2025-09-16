import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import Image from 'next/image'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Section } from '#components/section'

interface FeatureDemosProps {
  title?: string
  description?: string
}

export const FeatureDemos: React.FC<FeatureDemosProps> = ({
  title = "Jak działa Safe Talk",
  description = "Zobacz w akcji najważniejsze funkcje naszej aplikacji"
}) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const tabBg = useColorModeValue('gray.50', 'gray.700')
  
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

          <FallInPlace delay={0.4}>
            <Tabs
              variant="soft-rounded"
              colorScheme="safeTalk"
              bg={tabBg}
              p={2}
              borderRadius="xl"
              maxW="800px"
              w="full"
            >
              <TabList justifyContent="center" flexWrap="wrap" gap={2}>
                <Tab
                  fontSize={{ base: 'sm', md: 'md' }}
                  px={{ base: 3, md: 6 }}
                  py={3}
                  _selected={{
                    bg: 'safeTalk.turquoise.400',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  Analiza w czasie rzeczywistym
                </Tab>
                <Tab
                  fontSize={{ base: 'sm', md: 'md' }}
                  px={{ base: 3, md: 6 }}
                  py={3}
                  _selected={{
                    bg: 'safeTalk.turquoise.400',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  Wykrywanie AI
                </Tab>
              </TabList>

              <TabPanels mt={8}>
                <TabPanel p={0}>
                  <VStack spacing={6}>
                    <Box
                      w="full"
                      maxW="500px"
                      h="300px"
                      borderRadius="xl"
                      overflow="hidden"
                      shadow="lg"
                      position="relative"
                    >
                      <Image
                        src="/static/images/feature-demo-real-time.svg"
                        alt="Demonstracja analizy w czasie rzeczywistym"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                    <VStack spacing={3} textAlign="center" maxW="500px">
                      <Text fontSize="lg" fontWeight="bold" color="safeTalk.navy.400">
                        Ochrona działa podczas rozmowy
                      </Text>
                      <Text color="gray.600">
                        Safe Talk analizuje każde słowo w czasie rzeczywistym, 
                        wykrywając podejrzane wzorce i ostrzegając Cię przed 
                        oszustwami zanim zdążą Cię oszukać.
                      </Text>
                      <Box
                        px={4}
                        py={2}
                        bg="safeTalk.limeGreen.100"
                        borderRadius="full"
                        _dark={{ bg: 'safeTalk.limeGreen.900' }}
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color="safeTalk.limeGreen.700"
                          _dark={{ color: 'safeTalk.limeGreen.200' }}
                        >
                          ⚡ Średni czas reakcji: &lt;1 sekunda
                        </Text>
                      </Box>
                    </VStack>
                  </VStack>
                </TabPanel>

                <TabPanel p={0}>
                  <VStack spacing={6}>
                    <Box
                      w="full"
                      maxW="500px"
                      h="300px"
                      borderRadius="xl"
                      overflow="hidden"
                      shadow="lg"
                      position="relative"
                    >
                      <Image
                        src="/static/images/feature-demo-ai-detection.svg"
                        alt="Demonstracja wykrywania AI"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                    <VStack spacing={3} textAlign="center" maxW="500px">
                      <Text fontSize="lg" fontWeight="bold" color="safeTalk.navy.400">
                        Sztuczna inteligencja rozpoznaje oszustów
                      </Text>
                      <Text color="gray.600">
                        Nasze algorytmy AI zostały wytrenowane na tysiącach 
                        przykładów oszustw telefonicznych. Rozpoznają typowe 
                        frazy, techniki manipulacji i wzorce zachowań oszustów.
                      </Text>
                      <Box
                        px={4}
                        py={2}
                        bg="safeTalk.purple.100"
                        borderRadius="full"
                        _dark={{ bg: 'safeTalk.purple.900' }}
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color="safeTalk.purple.700"
                          _dark={{ color: 'safeTalk.purple.200' }}
                        >
                          🧠 Skuteczność wykrywania: 95%
                        </Text>
                      </Box>
                    </VStack>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </FallInPlace>

          {/* Additional benefits */}
          <FallInPlace delay={0.6}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} maxW="800px">
              <VStack spacing={3} textAlign="center">
                <Box
                  w={12}
                  h={12}
                  borderRadius="full"
                  bg="safeTalk.turquoise.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _dark={{ bg: 'safeTalk.turquoise.900' }}
                >
                  <Text fontSize="xl">🔒</Text>
                </Box>
                <Text fontWeight="bold" color="safeTalk.navy.400">
                  Prywatność
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Analiza odbywa się lokalnie na Twoim urządzeniu
                </Text>
              </VStack>

              <VStack spacing={3} textAlign="center">
                <Box
                  w={12}
                  h={12}
                  borderRadius="full"
                  bg="safeTalk.limeGreen.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _dark={{ bg: 'safeTalk.limeGreen.900' }}
                >
                  <Text fontSize="xl">⚡</Text>
                </Box>
                <Text fontWeight="bold" color="safeTalk.navy.400">
                  Szybkość
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Natychmiastowe ostrzeżenia bez opóźnień
                </Text>
              </VStack>

              <VStack spacing={3} textAlign="center">
                <Box
                  w={12}
                  h={12}
                  borderRadius="full"
                  bg="safeTalk.purple.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _dark={{ bg: 'safeTalk.purple.900' }}
                >
                  <Text fontSize="xl">🎯</Text>
                </Box>
                <Text fontWeight="bold" color="safeTalk.navy.400">
                  Precyzja
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Minimalna liczba fałszywych alarmów
                </Text>
              </VStack>
            </SimpleGrid>
          </FallInPlace>
        </VStack>
      </Container>
    </Section>
  )
}