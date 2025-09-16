'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiSearch, FiHelpCircle } from 'react-icons/fi'
import { Section } from '#components/section'
import { FallInPlace } from '#components/motion/fall-in-place'
import { useState, useMemo, useCallback, memo } from 'react'

interface FAQItem {
  q: React.ReactNode
  a: React.ReactNode
  category: 'general' | 'technical' | 'privacy' | 'business'
}

interface EnhancedFaqProps {
  title?: React.ReactNode
  description?: React.ReactNode
  items: FAQItem[]
}

const categoryLabels = {
  general: 'Ogólne',
  technical: 'Techniczne',
  privacy: 'Prywatność',
  business: 'Biznes',
}

const categoryColors = {
  general: 'blue',
  technical: 'green',
  privacy: 'purple',
  business: 'orange',
}

export const EnhancedFaq: React.FC<EnhancedFaqProps> = memo(({
  title = 'Najczęściej zadawane pytania',
  description = 'Znajdź odpowiedzi na pytania dotyczące Safe Talk i ochrony przed oszustwami telefonicznymi.',
  items = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const bgColor = useColorModeValue('white', 'gray.900')
  const cardBg = useColorModeValue('gray.50', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const filteredItems = useMemo(() => {
    let filtered = items

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => {
        const question = typeof item.q === 'string' ? item.q : ''
        const answer = typeof item.a === 'string' ? item.a : ''
        const searchLower = searchQuery.toLowerCase()
        return question.toLowerCase().includes(searchLower) || 
               answer.toLowerCase().includes(searchLower)
      })
    }

    return filtered
  }, [items, selectedCategory, searchQuery])

  const categories = useMemo(() => {
    const categoryCount = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categoryCount).map(([category, count]) => ({
      key: category,
      label: categoryLabels[category as keyof typeof categoryLabels],
      count,
      color: categoryColors[category as keyof typeof categoryColors],
    }))
  }, [items])

  return (
    <Section bg={bgColor} py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          {/* Header */}
          <FallInPlace delay={0.1}>
            <VStack spacing={4} textAlign="center" maxW="3xl">
              <Heading
                size="2xl"
                fontFamily="Gabarito"
                fontWeight="bold"
                color="gray.800"
              >
                {title}
              </Heading>
              <Text fontSize="xl" color="gray.600" lineHeight="tall">
                {description}
              </Text>
            </VStack>
          </FallInPlace>

          {/* Search and Filters */}
          <FallInPlace delay={0.2}>
            <VStack spacing={6} w="full" maxW="4xl">
              {/* Search Bar */}
              <InputGroup size="lg">
                <InputLeftElement>
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Wyszukaj pytanie..."
                  value={searchQuery}
                  onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
                    setSearchQuery(e.target.value), [])}
                  bg={cardBg}
                  borderColor={borderColor}
                  _focus={{
                    borderColor: 'safeTalk.turquoise.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-safeTalk-turquoise-500)',
                  }}
                />
              </InputGroup>

              {/* Category Filters */}
              <HStack spacing={3} flexWrap="wrap" justify="center">
                <Button
                  size="sm"
                  variant={selectedCategory === null ? 'solid' : 'outline'}
                  colorScheme={selectedCategory === null ? 'teal' : 'gray'}
                  onClick={() => setSelectedCategory(null)}
                >
                  Wszystkie ({items.length})
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    size="sm"
                    variant={selectedCategory === category.key ? 'solid' : 'outline'}
                    colorScheme={selectedCategory === category.key ? category.color : 'gray'}
                    onClick={() => setSelectedCategory(category.key)}
                    rightIcon={
                      <Badge
                        colorScheme={selectedCategory === category.key ? 'white' : category.color}
                        variant={selectedCategory === category.key ? 'solid' : 'subtle'}
                        fontSize="xs"
                        borderRadius="full"
                      >
                        {category.count}
                      </Badge>
                    }
                  >
                    {category.label}
                  </Button>
                ))}
              </HStack>
            </VStack>
          </FallInPlace>

          {/* FAQ Items */}
          <FallInPlace delay={0.3}>
            <Box w="full" maxW="4xl">
              {filteredItems.length > 0 ? (
                <Accordion allowMultiple>
                  {filteredItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      border="1px"
                      borderColor={borderColor}
                      borderRadius="lg"
                      mb={4}
                      bg={cardBg}
                      _last={{ mb: 0 }}
                    >
                      <AccordionButton
                        p={6}
                        _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                        _focus={{
                          bg: useColorModeValue('gray.100', 'gray.700'),
                          boxShadow: '0 0 0 2px var(--chakra-colors-safeTalk-turquoise-500)',
                        }}
                        borderRadius="lg"
                        aria-label={`Rozwiń pytanie: ${typeof item.q === 'string' ? item.q : 'FAQ item'}`}
                      >
                        <Box flex="1" textAlign="left">
                          <HStack spacing={3} align="start">
                            <Icon as={FiHelpCircle} color="safeTalk.turquoise.500" mt={1} flexShrink={0} />
                            <VStack spacing={2} align="start">
                              <Text fontWeight="semibold" fontSize="lg">
                                {item.q}
                              </Text>
                              <Badge
                                colorScheme={categoryColors[item.category]}
                                variant="subtle"
                                size="sm"
                              >
                                {categoryLabels[item.category]}
                              </Badge>
                            </VStack>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel p={6} pt={0}>
                        <Box pl={8}>
                          <Text color="gray.600" lineHeight="tall">
                            {item.a}
                          </Text>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <VStack spacing={4} py={12} textAlign="center">
                  <Icon as={FiSearch} boxSize={12} color="gray.400" />
                  <Heading size="md" color="gray.500">
                    Nie znaleziono pytań
                  </Heading>
                  <Text color="gray.500">
                    Spróbuj zmienić kryteria wyszukiwania lub wybierz inną kategorię.
                  </Text>
                </VStack>
              )}
            </Box>
          </FallInPlace>

          {/* Contact CTA */}
          <FallInPlace delay={0.4}>
            <Box
              bg="safeTalk.turquoise.50"
              borderColor="safeTalk.turquoise.200"
              borderWidth="1px"
              borderRadius="xl"
              p={8}
              textAlign="center"
              w="full"
              maxW="2xl"
            >
              <VStack spacing={4}>
                <Heading size="md" color="safeTalk.turquoise.700" fontFamily="Gabarito" fontWeight="bold">
                  Nie znalazłeś odpowiedzi?
                </Heading>
                <Text color="safeTalk.turquoise.600" lineHeight="tall">
                  Skontaktuj się z nami bezpośrednio - chętnie odpowiemy na wszystkie pytania 
                  dotyczące Safe Talk i ochrony przed oszustwami telefonicznymi.
                </Text>
                <Button colorScheme="teal" size="lg">
                  Skontaktuj się z nami
                </Button>
              </VStack>
            </Box>
          </FallInPlace>
        </VStack>
      </Container>
    </Section>
  )
})