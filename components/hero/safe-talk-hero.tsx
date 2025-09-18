import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Br } from '@saas-ui/react'
import Image from 'next/image'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import { RealTimeAnalysisIcon } from '#components/safe-talk-icons'

import { ButtonLink } from '#components/button-link/button-link'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Em } from '#components/typography'
import { FloatingElement, PulseElement } from '#components/motion'
import siteConfig from '#data/config'

import { HeroStats } from './hero-stats'

export const SafeTalkHero = () => {
  const { hero } = siteConfig
  const gradientBg = useColorModeValue(
    'linear(to-br, safeTalk.turquoise.50, safeTalk.blue.50, white)',
    'linear(to-br, safeTalk.navy.900, gray.900)'
  )

  return (
    <Box position="relative" overflow="hidden" bg={gradientBg} minH="100vh">
      <BackgroundGradient height="100%" zIndex="-1" />
      
      <Container maxW="container.xl" pt={{ base: 20, lg: 32 }} pb="20">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
          spacing={{ base: 8, lg: 12 }}
          minH={{ base: 'auto', lg: '70vh' }}
        >
          {/* Left side - Content */}
          <VStack
            flex="1"
            alignItems={{ base: 'center', lg: 'flex-start' }}
            spacing={8}
            textAlign={{ base: 'center', lg: 'left' }}
            maxW={{ base: 'full', lg: '600px' }}
          >
            {/* Badge */}
            <FallInPlace delay={0.2}>
              <HStack
                spacing={2}
                px={4}
                py={2}
                bg="safeTalk.turquoise.100"
                borderRadius="full"
                fontSize="sm"
                fontWeight="medium"
                color="safeTalk.turquoise.700"
                _dark={{ 
                  bg: 'safeTalk.turquoise.900',
                  color: 'safeTalk.turquoise.200' 
                }}
              >
                <RealTimeAnalysisIcon size={16} />
                <Text>Ochrona w czasie rzeczywistym</Text>
              </HStack>
            </FallInPlace>

            {/* Main Title */}
            <FallInPlace delay={0.4}>
              <Text
                as="h1"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
                fontWeight="bold"
                lineHeight="1.1"
                color="safeTalk.navy.400"
                _dark={{ color: 'white' }}
              >
                Chroń się przed{' '}
                <Em color="safeTalk.turquoise.400">oszustwami telefonicznymi</Em>
                <Br />
                w czasie rzeczywistym
              </Text>
            </FallInPlace>

            {/* Subtitle */}
            <FallInPlace delay={0.6}>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}
                _dark={{ color: 'safeTalk.navy.200' }}
                maxW="500px"
                lineHeight="1.6"
              >
                {hero.subtitle}
              </Text>
            </FallInPlace>

            {/* CTA Buttons */}
            <FallInPlace delay={0.8}>
              <ButtonGroup
                spacing={4}
                alignItems="center"
                flexDirection={{ base: 'column', sm: 'row' }}
                w={{ base: 'full', sm: 'auto' }}
              >
                <ButtonLink
                  variant="safe-talk-primary"
                  size="lg"
                  href={hero.cta.primary.href}
                  w={{ base: 'full', sm: 'auto' }}
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: 'common',
                        transitionDuration: 'normal',
                        '.chakra-button:hover &': {
                          transform: 'translate(5px)',
                        },
                      }}
                    />
                  }
                >
                  {hero.cta.primary.label}
                </ButtonLink>
                <ButtonLink
                  variant="safe-talk-outline"
                  size="lg"
                  href={hero.cta.secondary.href}
                  w={{ base: 'full', sm: 'auto' }}
                  leftIcon={<Icon as={FiPlay} />}
                >
                  {hero.cta.secondary.label}
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>

            {/* Stats */}
            <FallInPlace delay={1.0}>
              <HeroStats stats={hero.stats} />
            </FallInPlace>
          </VStack>

          {/* Right side - Visual */}
          <Box
            flex="1"
            position="relative"
            maxW={{ base: 'full', lg: '500px' }}
            h={{ base: '300px', md: '400px', lg: '500px' }}
          >
            <FallInPlace delay={1.2}>
              <Box
                position="relative"
                h="full"
                borderRadius="2xl"
                overflow="hidden"
                shadow="2xl"
                bg="white"
                _dark={{ bg: 'safeTalk.navy.800' }}
              >
                {/* Phone mockup with Safe Talk interface */}
                <Image
                  src="/static/images/safe-talk-app-mockup-detailed.svg"
                  alt="Safe Talk aplikacja - interfejs ochrony przed oszustwami"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
                
                {/* Floating alert - appears with animation */}
                <FallInPlace delay={2.0}>
                  <FloatingElement duration={4} distance={8} direction="both">
                    <PulseElement duration={2}>
                      <Box
                        position="absolute"
                        top="10px"
                        right="10px"
                        bg="red.500"
                        color="white"
                        px={3}
                        py={2}
                        borderRadius="lg"
                        fontSize="xs"
                        fontWeight="bold"
                        boxShadow="lg"
                        maxW="120px"
                        textAlign="center"
                      >
                        ⚠️ OSZUSTWO WYKRYTE!
                        <Box fontSize="10px" mt={1} opacity={0.9}>
                          Podejrzana rozmowa
                        </Box>
                      </Box>
                    </PulseElement>
                  </FloatingElement>
                </FallInPlace>
                
                {/* Protection status */}
                <FallInPlace delay={1.8}>
                  <Box
                    position="absolute"
                    bottom="10px"
                    left="10px"
                    bg="safeTalk.limeGreen.500"
                    color="white"
                    px={3}
                    py={2}
                    borderRadius="lg"
                    fontSize="xs"
                    fontWeight="bold"
                    boxShadow="md"
                  >
                    🛡️ Ochrona aktywna
                  </Box>
                </FallInPlace>

                {/* Real-time indicator */}
                <FallInPlace delay={1.6}>
                  <Box
                    position="absolute"
                    top="50%"
                    left="-20px"
                    transform="translateY(-50%)"
                    bg="safeTalk.turquoise.400"
                    color="white"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="10px"
                    fontWeight="bold"
                    boxShadow="md"
                  >
                    LIVE
                  </Box>
                </FallInPlace>
              </Box>
            </FallInPlace>

            {/* Decorative elements */}
            <Box
              position="absolute"
              top="-20px"
              left="-20px"
              w="100px"
              h="100px"
              bg="safeTalk.turquoise.200"
              borderRadius="full"
              opacity="0.3"
              animation="float 6s ease-in-out infinite"
            />
            <Box
              position="absolute"
              bottom="-30px"
              right="-30px"
              w="150px"
              h="150px"
              bg="safeTalk.blue.200"
              borderRadius="full"
              opacity="0.2"
              animation="float 8s ease-in-out infinite reverse"
            />
          </Box>
        </Stack>
      </Container>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes alertPulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.05);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
      `}</style>
    </Box>
  )
}