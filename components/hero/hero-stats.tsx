import { Box, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { FallInPlace } from '#components/motion/fall-in-place'

interface StatProps {
  value: string
  label: string
  delay?: number
}

const Stat = ({ value, label, delay = 0 }: StatProps) => {
  const statBg = useColorModeValue('white', 'safeTalk.navy.800')
  const statBorder = useColorModeValue('safeTalk.turquoise.200', 'safeTalk.turquoise.600')
  
  return (
    <FallInPlace delay={delay}>
      <VStack
        spacing={1}
        p={4}
        bg={statBg}
        borderWidth="1px"
        borderColor={statBorder}
        borderRadius="lg"
        shadow="sm"
        minW="120px"
        textAlign="center"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="safeTalk.turquoise.400"
          lineHeight="1"
        >
          {value}
        </Text>
        <Text
          fontSize="sm"
          color="gray.600"
          _dark={{ color: 'gray.400' }}
          textAlign="center"
          lineHeight="1.2"
        >
          {label}
        </Text>
      </VStack>
    </FallInPlace>
  )
}

interface HeroStatsProps {
  stats: Array<{
    value: string
    label: string
  }>
}

export const HeroStats = ({ stats }: HeroStatsProps) => {
  return (
    <HStack spacing={4} justify={{ base: 'center', lg: 'flex-start' }} wrap="wrap">
      {stats.map((stat, index) => (
        <Stat
          key={index}
          value={stat.value}
          label={stat.label}
          delay={1.2 + index * 0.1}
        />
      ))}
    </HStack>
  )
}