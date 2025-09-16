'use client'

import React, { memo } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Avatar,
  Card,
  CardBody,
  Badge,
  Link,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { 
  FiLinkedin, 
  FiTwitter, 
  FiGithub, 
  FiMail,
} from 'react-icons/fi'
import { Section } from '#components/section'
import { FallInPlace } from '#components/motion'
import { 
  TEAM_MEMBERS, 
  COMPANY_VALUES, 
  type TeamMemberData, 
  type CompanyValueData 
} from '#data/team'

const TeamMember: React.FC<TeamMemberData> = memo(({
  name,
  role,
  bio,
  expertise,
  avatar,
  social,
  delay = 0,
}) => {
  const cardBg = useColorModeValue('white', 'safeTalk.navy.800')
  const borderColor = useColorModeValue('safeTalk.turquoise.200', 'safeTalk.turquoise.600')

  return (
    <FallInPlace delay={delay}>
      <Card
        bg={cardBg}
        borderColor={borderColor}
        borderWidth="1px"
        shadow="lg"
        borderRadius="xl"
        overflow="hidden"
        transition="all 0.3s ease-in-out"
        _hover={{
          transform: 'translateY(-8px)',
          shadow: 'xl',
          borderColor: 'safeTalk.turquoise.300',
        }}
      >
        <CardBody p={8}>
          <VStack spacing={6} align="center" textAlign="center">
            <Avatar
              size="2xl"
              name={name}
              src={avatar}
              bg="safeTalk.turquoise.100"
              color="safeTalk.turquoise.600"
            />
            
            <VStack spacing={2}>
              <Heading as="h3" size="lg" fontFamily="Gabarito" fontWeight="bold">
                {name}
              </Heading>
              <Text color="safeTalk.turquoise.500" fontWeight="semibold" fontSize="md">
                {role}
              </Text>
            </VStack>

            <Text color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} lineHeight="tall" fontSize="sm">
              {bio}
            </Text>

            <VStack spacing={3} w="full">
              <Text fontSize="sm" fontWeight="semibold" color={useColorModeValue('safeTalk.navy.400', 'white')}>
                Specjalizacja:
              </Text>
              <HStack spacing={2} flexWrap="wrap" justify="center">
                {expertise.map((skill) => (
                  <Badge
                    key={skill}
                    colorScheme="teal"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </HStack>
            </VStack>

            <HStack spacing={4} as="nav" aria-label={`Linki społecznościowe ${name}`}>
              {social.linkedin && (
                <Link 
                  href={social.linkedin} 
                  isExternal
                  aria-label={`Profil LinkedIn ${name}`}
                >
                  <Icon
                    as={FiLinkedin}
                    boxSize={5}
                    color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}
                    _hover={{ color: 'safeTalk.blue.500' }}
                    transition="color 0.2s"
                  />
                </Link>
              )}
              {social.twitter && (
                <Link 
                  href={social.twitter} 
                  isExternal
                  aria-label={`Profil Twitter ${name}`}
                >
                  <Icon
                    as={FiTwitter}
                    boxSize={5}
                    color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}
                    _hover={{ color: 'safeTalk.blue.400' }}
                    transition="color 0.2s"
                  />
                </Link>
              )}
              {social.github && (
                <Link 
                  href={social.github} 
                  isExternal
                  aria-label={`Profil GitHub ${name}`}
                >
                  <Icon
                    as={FiGithub}
                    boxSize={5}
                    color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}
                    _hover={{ color: 'safeTalk.navy.400' }}
                    transition="color 0.2s"
                  />
                </Link>
              )}
              {social.email && (
                <Link 
                  href={`mailto:${social.email}`}
                  aria-label={`Wyślij email do ${name}`}
                >
                  <Icon
                    as={FiMail}
                    boxSize={5}
                    color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}
                    _hover={{ color: 'safeTalk.turquoise.500' }}
                    transition="color 0.2s"
                  />
                </Link>
              )}
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </FallInPlace>
  )
})

TeamMember.displayName = 'TeamMember'

const CompanyValue: React.FC<CompanyValueData> = memo(({
  icon,
  title,
  description,
  delay = 0,
}) => {
  const iconBg = useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900')
  const iconColor = useColorModeValue('safeTalk.turquoise.500', 'safeTalk.turquoise.300')

  return (
    <FallInPlace delay={delay}>
      <VStack spacing={4} textAlign="center">
        <Box
          p={4}
          bg={iconBg}
          borderRadius="full"
          transition="all 0.3s ease-in-out"
          _hover={{ transform: 'scale(1.1)' }}
        >
          <Icon as={icon} boxSize={8} color={iconColor} />
        </Box>
        <VStack spacing={2}>
          <Heading as="h3" size="md" fontFamily="Gabarito" fontWeight="bold">
            {title}
          </Heading>
          <Text color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} fontSize="sm" lineHeight="tall">
            {description}
          </Text>
        </VStack>
      </VStack>
    </FallInPlace>
  )
})

CompanyValue.displayName = 'CompanyValue'

export const Team: React.FC = () => {
  const bgColor = useColorModeValue('white', 'safeTalk.navy.900')
  const missionBg = useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900')

  return (
    <Section bg={bgColor} py={20}>
      <Container maxW="container.xl">
        <VStack spacing={20}>
          {/* Header */}
          <FallInPlace delay={0.1}>
            <VStack spacing={4} textAlign="center" maxW="3xl">
              <Heading
                as="h1"
                size="2xl"
                fontFamily="Gabarito"
                fontWeight="bold"
                color={useColorModeValue('safeTalk.navy.400', 'white')}
              >
                Poznaj nasz zespół
              </Heading>
              <Text fontSize="xl" color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')} lineHeight="tall">
                Safe Talk to zespół ekspertów z dziedziny cyberbezpieczeństwa, AI i designu, 
                którzy połączyli siły, żeby chronić ludzi przed oszustami telefonicznymi.
              </Text>
            </VStack>
          </FallInPlace>

          {/* Company Mission, Vision, Values */}
          <Box w="full">
            <FallInPlace delay={0.2}>
              <Card bg={missionBg} borderRadius="2xl" shadow="lg" p={8} mb={16}>
                <CardBody p={0}>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
                    {COMPANY_VALUES.map((value) => (
                      <CompanyValue key={value.title} {...value} />
                    ))}
                  </SimpleGrid>
                </CardBody>
              </Card>
            </FallInPlace>
          </Box>

          {/* Team Members */}
          <VStack spacing={12} w="full">
            <FallInPlace delay={0.3}>
              <Heading
                as="h2"
                size="xl"
                fontFamily="Gabarito"
                fontWeight="bold"
                color={useColorModeValue('safeTalk.navy.400', 'white')}
                textAlign="center"
              >
                Założyciele i kluczowi członkowie zespołu
              </Heading>
            </FallInPlace>

            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              spacing={8} 
              w="full"
              role="list"
              aria-label="Członkowie zespołu Safe Talk"
            >
              {TEAM_MEMBERS.map((member) => (
                <Box key={member.name} role="listitem">
                  <TeamMember {...member} />
                </Box>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Call to Action */}
          <FallInPlace delay={0.8}>
            <Card bg={useColorModeValue('safeTalk.turquoise.50', 'safeTalk.turquoise.900')} borderRadius="xl" shadow="md" w="full">
              <CardBody p={8}>
                <VStack spacing={4} textAlign="center">
                  <Heading as="h2" size="lg" fontFamily="Gabarito" fontWeight="bold" color={useColorModeValue('safeTalk.turquoise.700', 'safeTalk.turquoise.200')}>
                    Dołącz do nas!
                  </Heading>
                  <Text color={useColorModeValue('safeTalk.turquoise.600', 'safeTalk.turquoise.300')} fontSize="lg" lineHeight="tall" maxW="2xl">
                    Szukamy utalentowanych osób, które chcą pomóc w walce z oszustami telefonicznymi. 
                    Jeśli pasjonuje Cię cyberbezpieczeństwo, AI lub design - skontaktuj się z nami!
                  </Text>
                  <HStack spacing={4} pt={4}>
                    <Link href="mailto:kariera@safetalk.pl" color="safeTalk.turquoise.500" fontWeight="semibold">
                      kariera@safetalk.pl
                    </Link>
                    <Text color={useColorModeValue('safeTalk.navy.300', 'safeTalk.navy.200')}>|</Text>
                    <Link href="https://linkedin.com/company/safetalk" isExternal color="safeTalk.turquoise.500" fontWeight="semibold">
                      LinkedIn
                    </Link>
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