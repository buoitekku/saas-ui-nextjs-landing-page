import {
  Box,
  Container,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiClock } from 'react-icons/fi'
import { 
  AIDetectionIcon,
  SmartAlertsIcon,
  UniversalProtectionIcon
} from '#components/safe-talk-icons'
import { FallInPlace } from '#components/motion/fall-in-place'

const benefits = [
  {
    icon: FiClock,
    title: 'Analiza w czasie rzeczywistym',
    description: 'Ostrzeżenia podczas rozmowy, nie po jej zakończeniu',
    color: 'safeTalk.turquoise.400',
  },
  {
    icon: AIDetectionIcon,
    title: 'AI wykrywanie oszustw',
    description: 'Zaawansowane algorytmy rozpoznają wzorce oszustów',
    color: 'safeTalk.blue.400',
  },
  {
    icon: SmartAlertsIcon,
    title: 'Pełna transparentność',
    description: 'Wiesz dokładnie jak działa system i jakie dane przetwarza',
    color: 'safeTalk.limeGreen.400',
  },
  {
    icon: UniversalProtectionIcon,
    title: 'Ochrona całej rodziny',
    description: 'Szczególnie skuteczny dla seniorów i mniej doświadczonych',
    color: 'safeTalk.purple.400',
  },
]

export const HeroBenefits = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box bg={bgColor} py={16}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {benefits.map((benefit, index) => (
            <FallInPlace key={index} delay={0.2 + index * 0.1}>
              <VStack
                p={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                spacing={4}
                textAlign="center"
                h="full"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'xl',
                  borderColor: benefit.color,
                }}
              >
                <Box
                  p={3}
                  borderRadius="full"
                  bg={`${benefit.color.replace('.400', '.100')}`}
                  _dark={{ bg: `${benefit.color.replace('.400', '.900')}` }}
                >
                  <Icon
                    as={benefit.icon}
                    w={6}
                    h={6}
                    color={benefit.color}
                  />
                </Box>
                
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="safeTalk.navy.400"
                  _dark={{ color: 'white' }}
                >
                  {benefit.title}
                </Text>
                
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: 'gray.400' }}
                  lineHeight="1.5"
                >
                  {benefit.description}
                </Text>
              </VStack>
            </FallInPlace>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}