/**
 * Demo component showcasing Safe Talk visual hierarchy and brand consistency
 */

import {
  Box,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  VStack,
  HStack,
  Divider,
  Container,
} from '@chakra-ui/react';
import { useVisualHierarchy, useSectionLayout, useCardHierarchy } from '../../hooks/use-visual-hierarchy';
import { useSafeTalkColors } from '../../hooks/use-color-compliance';

export const VisualHierarchyDemo: React.FC = () => {
  const colors = useSafeTalkColors();
  const { 
    getHeadingStyle, 
    getBodyTextStyle, 
    getLinkStyle, 
    getBadgeStyle,
    createSection,
    getBrandColor 
  } = useVisualHierarchy();
  
  const { getSectionProps, getHeadingProps, getSubheadingProps } = useSectionLayout('main');
  const { getCardTitleProps, getCardDescriptionProps, getCardLinkProps } = useCardHierarchy();

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={16} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading {...getHeadingStyle('h1')} mb={4}>
            Safe Talk Visual Hierarchy System
          </Heading>
          <Text {...getBodyTextStyle('lead')} maxW="3xl" mx="auto">
            A comprehensive demonstration of Safe Talk's brand-compliant typography, 
            color usage, and visual hierarchy system designed for accessibility and consistency.
          </Text>
        </Box>

        {/* Typography Hierarchy */}
        <Box>
          <Heading {...getHeadingStyle('h2')} mb={8} textAlign="center">
            Typography Hierarchy
          </Heading>
          
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* Headings */}
            <Card variant="outline">
              <CardHeader>
                <Heading {...getCardTitleProps()}>
                  Heading Hierarchy
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Heading {...getHeadingStyle('h1')} size="lg">H1 - Main Page Title</Heading>
                    <Text fontSize="sm" color={colors.textSecondary}>
                      Used for primary page headings and hero titles
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading {...getHeadingStyle('h2')} size="md">H2 - Section Heading</Heading>
                    <Text fontSize="sm" color={colors.textSecondary}>
                      Used for major section titles
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading {...getHeadingStyle('h3')} size="sm">H3 - Subsection Heading</Heading>
                    <Text fontSize="sm" color={colors.textSecondary}>
                      Used for subsection titles with turquoise color
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading {...getHeadingStyle('h4')} size="sm">H4 - Component Title</Heading>
                    <Text fontSize="sm" color={colors.textSecondary}>
                      Used for card titles and component headings
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading {...getHeadingStyle('h5')} size="xs">H5 - Small Heading</Heading>
                    <Text fontSize="sm" color={colors.textSecondary}>
                      Used for small section titles with blue color
                    </Text>
                  </Box>
                  
                  <Box>
                    <Heading {...getHeadingStyle('h6')} size="xs">H6 - MICRO HEADING</Heading>
                    <Text fontSize="sm" color={colors.textSecondary}>
                      Used for labels and captions (uppercase)
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            {/* Body Text */}
            <Card variant="outline">
              <CardHeader>
                <Heading {...getCardTitleProps()}>
                  Body Text Variants
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Text {...getBodyTextStyle('lead')}>
                      Lead Text - Introductory paragraphs and important content
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text {...getBodyTextStyle('large')}>
                      Large Body Text - Hero descriptions and prominent content
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text {...getBodyTextStyle('regular')}>
                      Regular Body Text - Main content and standard paragraphs
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text {...getBodyTextStyle('small')}>
                      Small Body Text - Secondary content and supporting information
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text {...getBodyTextStyle('caption')}>
                      Caption Text - Disclaimers, fine print, and image captions
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        {/* Link Hierarchy */}
        <Box>
          <Heading {...getHeadingStyle('h2')} mb={8} textAlign="center">
            Link Hierarchy & Interactive Elements
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card variant="outline">
              <CardBody textAlign="center">
                <Heading {...getCardTitleProps()}>Primary Links</Heading>
                <VStack spacing={3}>
                  <Link {...getLinkStyle('primary')}>
                    Main Navigation Link
                  </Link>
                  <Link {...getLinkStyle('primary')}>
                    Important Action Link
                  </Link>
                  <Text fontSize="sm" color={colors.textSecondary}>
                    Used for primary navigation and key actions
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Card variant="outline">
              <CardBody textAlign="center">
                <Heading {...getCardTitleProps()}>Secondary Links</Heading>
                <VStack spacing={3}>
                  <Link {...getLinkStyle('secondary')}>
                    Supporting Link
                  </Link>
                  <Link {...getLinkStyle('secondary')}>
                    Additional Resource
                  </Link>
                  <Text fontSize="sm" color={colors.textSecondary}>
                    Used for supporting navigation and resources
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Card variant="outline">
              <CardBody textAlign="center">
                <Heading {...getCardTitleProps()}>Subtle Links</Heading>
                <VStack spacing={3}>
                  <Link {...getLinkStyle('subtle')}>
                    Footer Link
                  </Link>
                  <Link {...getLinkStyle('subtle')}>
                    Less Important Link
                  </Link>
                  <Text fontSize="sm" color={colors.textSecondary}>
                    Used for footer and less prominent links
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Card variant="outline">
              <CardBody textAlign="center">
                <Heading {...getCardTitleProps()}>External Links</Heading>
                <VStack spacing={3}>
                  <Link {...getLinkStyle('external')}>
                    External Resource
                  </Link>
                  <Link {...getLinkStyle('external')}>
                    Third-party Link
                  </Link>
                  <Text fontSize="sm" color={colors.textSecondary}>
                    Used for external links with arrow indicator
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        {/* Badge Hierarchy */}
        <Box>
          <Heading {...getHeadingStyle('h2')} mb={8} textAlign="center">
            Badge & Label System
          </Heading>
          
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={6}>
            <VStack spacing={3}>
              <Badge variant="safe-talk-primary">Primary</Badge>
              <Text fontSize="sm" textAlign="center" color={colors.textSecondary}>
                Important status
              </Text>
            </VStack>

            <VStack spacing={3}>
              <Badge variant="safe-talk-secondary">Secondary</Badge>
              <Text fontSize="sm" textAlign="center" color={colors.textSecondary}>
                Supporting info
              </Text>
            </VStack>

            <VStack spacing={3}>
              <Badge variant="safe-talk-success">Success</Badge>
              <Text fontSize="sm" textAlign="center" color={colors.textSecondary}>
                Positive status
              </Text>
            </VStack>

            <VStack spacing={3}>
              <Badge variant="safe-talk-info">Info</Badge>
              <Text fontSize="sm" textAlign="center" color={colors.textSecondary}>
                Neutral info
              </Text>
            </VStack>

            <VStack spacing={3}>
              <Badge variant="safe-talk-subtle">Subtle</Badge>
              <Text fontSize="sm" textAlign="center" color={colors.textSecondary}>
                Low emphasis
              </Text>
            </VStack>

            <VStack spacing={3}>
              <Badge variant="safe-talk-outline">Outline</Badge>
              <Text fontSize="sm" textAlign="center" color={colors.textSecondary}>
                Minimal style
              </Text>
            </VStack>
          </SimpleGrid>

          <Divider my={8} />

          <VStack spacing={4}>
            <Heading {...getHeadingStyle('h3')}>Special Badges</Heading>
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Badge variant="feature-new">New</Badge>
              <Badge variant="feature-popular">Most Popular</Badge>
              <Badge variant="feature-premium">Premium</Badge>
              <Badge variant="pricing-recommended">Recommended</Badge>
              <Badge variant="pricing-save">Save 20%</Badge>
            </HStack>
          </VStack>
        </Box>

        {/* List Hierarchy */}
        <Box>
          <Heading {...getHeadingStyle('h2')} mb={8} textAlign="center">
            List Styles & Visual Consistency
          </Heading>
          
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            <Card variant="outline">
              <CardHeader>
                <Heading {...getCardTitleProps()}>Feature Lists</Heading>
              </CardHeader>
              <CardBody>
                <List variant="safe-talk-features" spacing={3}>
                  <ListItem>Real-time call analysis and protection</ListItem>
                  <ListItem>AI-powered scam detection technology</ListItem>
                  <ListItem>User-friendly interface for all ages</ListItem>
                  <ListItem>Privacy-focused with transparent data handling</ListItem>
                </List>
              </CardBody>
            </Card>

            <Card variant="outline">
              <CardHeader>
                <Heading {...getCardTitleProps()}>Step-by-Step Process</Heading>
              </CardHeader>
              <CardBody>
                <List variant="safe-talk-steps" spacing={4}>
                  <ListItem>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">Download Safe Talk</Text>
                      <Text fontSize="sm" color={colors.textSecondary}>
                        Install the app from your device's app store
                      </Text>
                    </VStack>
                  </ListItem>
                  <ListItem>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">Set Up Protection</Text>
                      <Text fontSize="sm" color={colors.textSecondary}>
                        Configure your preferences and enable call monitoring
                      </Text>
                    </VStack>
                  </ListItem>
                  <ListItem>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">Stay Protected</Text>
                      <Text fontSize="sm" color={colors.textSecondary}>
                        Receive real-time alerts during suspicious calls
                      </Text>
                    </VStack>
                  </ListItem>
                </List>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        {/* Brand Color Usage */}
        <Box>
          <Heading {...getHeadingStyle('h2')} mb={8} textAlign="center">
            Brand Color Usage & Accessibility
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6}>
            <Card variant="outline" textAlign="center">
              <CardBody>
                <Box w={16} h={16} bg={colors.primary} borderRadius="lg" mx="auto" mb={3} />
                <Heading size="sm" mb={2}>Primary</Heading>
                <Text fontSize="sm" color={colors.textSecondary}>
                  Turquoise (#3AB5B2)
                </Text>
                <Text fontSize="xs" color={colors.textSecondary} mt={2}>
                  CTAs, primary links, focus indicators
                </Text>
              </CardBody>
            </Card>

            <Card variant="outline" textAlign="center">
              <CardBody>
                <Box w={16} h={16} bg={colors.secondary} borderRadius="lg" mx="auto" mb={3} />
                <Heading size="sm" mb={2}>Secondary</Heading>
                <Text fontSize="sm" color={colors.textSecondary}>
                  Blue (#71C6DA)
                </Text>
                <Text fontSize="xs" color={colors.textSecondary} mt={2}>
                  Secondary buttons, supporting elements
                </Text>
              </CardBody>
            </Card>

            <Card variant="outline" textAlign="center">
              <CardBody>
                <Box w={16} h={16} bg={colors.accent} borderRadius="lg" mx="auto" mb={3} />
                <Heading size="sm" mb={2}>Accent</Heading>
                <Text fontSize="sm" color={colors.textSecondary}>
                  Lime Green (#C5D54E)
                </Text>
                <Text fontSize="xs" color={colors.textSecondary} mt={2}>
                  Success states, positive feedback
                </Text>
              </CardBody>
            </Card>

            <Card variant="outline" textAlign="center">
              <CardBody>
                <Box w={16} h={16} bg={colors.textPrimary} borderRadius="lg" mx="auto" mb={3} />
                <Heading size="sm" mb={2}>Text Primary</Heading>
                <Text fontSize="sm" color={colors.textSecondary}>
                  Navy (#0A3447)
                </Text>
                <Text fontSize="xs" color={colors.textSecondary} mt={2}>
                  Main text, headings, high contrast
                </Text>
              </CardBody>
            </Card>

            <Card variant="outline" textAlign="center">
              <CardBody>
                <Box w={16} h={16} bg={colors.textSecondary} borderRadius="lg" mx="auto" mb={3} />
                <Heading size="sm" mb={2}>Text Secondary</Heading>
                <Text fontSize="sm" color={colors.textSecondary}>
                  Navy Light (#4D6274)
                </Text>
                <Text fontSize="xs" color={colors.textSecondary} mt={2}>
                  Secondary text, descriptions
                </Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        {/* Accessibility Notes */}
        <Card bg={colors.bgSecondary} borderLeft="4px solid" borderLeftColor={colors.primary}>
          <CardBody>
            <Heading {...getHeadingStyle('h3')} mb={4}>
              Accessibility & Brand Compliance Features
            </Heading>
            <List variant="safe-talk-features" spacing={3}>
              <ListItem>
                All color combinations meet WCAG AA standards (4.5:1+ contrast ratio)
              </ListItem>
              <ListItem>
                Typography hierarchy uses consistent Safe Talk brand colors
              </ListItem>
              <ListItem>
                Interactive elements provide clear visual feedback with brand colors
              </ListItem>
              <ListItem>
                Responsive design maintains hierarchy across all screen sizes
              </ListItem>
              <ListItem>
                Color-blind friendly design with sufficient contrast and visual cues
              </ListItem>
              <ListItem>
                Semantic HTML structure supports screen readers and assistive technology
              </ListItem>
            </List>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};