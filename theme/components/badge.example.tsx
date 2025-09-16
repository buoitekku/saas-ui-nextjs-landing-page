/**
 * Badge Theme Usage Examples
 * 
 * This file demonstrates how to use the Safe Talk badge theme
 * in various scenarios throughout the application.
 */

import { Badge, HStack, VStack, Text, Box } from '@chakra-ui/react'
import { createCustomBadgeStyle, type BadgeVariant } from './badge'

// Example component showing all badge variants
export const BadgeShowcase = () => {
  const brandVariants: BadgeVariant[] = [
    'safe-talk-primary',
    'safe-talk-secondary',
    'safe-talk-success',
    'safe-talk-info',
    'safe-talk-subtle',
    'safe-talk-outline',
  ]

  const statusVariants: BadgeVariant[] = [
    'status-active',
    'status-pending',
    'status-inactive',
  ]

  const featureVariants: BadgeVariant[] = [
    'feature-new',
    'feature-popular',
    'feature-premium',
  ]

  const pricingVariants: BadgeVariant[] = [
    'pricing-recommended',
    'pricing-save',
  ]

  return (
    <VStack spacing={8} align="start" p={6}>
      {/* Brand Badges */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Brand Badges
        </Text>
        <HStack spacing={4} wrap="wrap">
          {brandVariants.map(variant => (
            <Badge key={variant} variant={variant}>
              {variant.replace('safe-talk-', '').replace('-', ' ')}
            </Badge>
          ))}
        </HStack>
      </Box>

      {/* Status Badges */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Status Badges
        </Text>
        <HStack spacing={4} wrap="wrap">
          {statusVariants.map(variant => (
            <Badge key={variant} variant={variant}>
              {variant.replace('status-', '').replace('-', ' ')}
            </Badge>
          ))}
        </HStack>
      </Box>

      {/* Feature Badges */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Feature Badges
        </Text>
        <HStack spacing={4} wrap="wrap">
          {featureVariants.map(variant => (
            <Badge key={variant} variant={variant}>
              {variant.replace('feature-', '').replace('-', ' ')}
            </Badge>
          ))}
        </HStack>
      </Box>

      {/* Pricing Badges */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Pricing Badges
        </Text>
        <HStack spacing={4} wrap="wrap">
          {pricingVariants.map(variant => (
            <Badge key={variant} variant={variant}>
              {variant.replace('pricing-', '').replace('-', ' ')}
            </Badge>
          ))}
        </HStack>
      </Box>

      {/* Different Sizes */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Badge Sizes
        </Text>
        <HStack spacing={4} align="center">
          <Badge variant="safe-talk-primary" size="sm">
            Small
          </Badge>
          <Badge variant="safe-talk-primary" size="md">
            Medium
          </Badge>
          <Badge variant="safe-talk-primary" size="lg">
            Large
          </Badge>
        </HStack>
      </Box>
    </VStack>
  )
}

// Example of using badges in a feature card
export const FeatureCard = () => {
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      shadow="sm"
      position="relative"
    >
      {/* New feature badge */}
      <Badge
        variant="feature-new"
        position="absolute"
        top={-2}
        right={-2}
      >
        New
      </Badge>

      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Real-time Analysis
      </Text>
      <Text color="gray.600" mb={4}>
        AI-powered scam detection during phone calls
      </Text>

      {/* Status badge */}
      <Badge variant="status-active" mb={2}>
        Active
      </Badge>
    </Box>
  )
}

// Example of using badges in a pricing card
export const PricingCard = () => {
  return (
    <Box
      p={6}
      borderWidth="2px"
      borderColor="safeTalk.turquoise.400"
      borderRadius="lg"
      bg="white"
      shadow="lg"
      position="relative"
    >
      {/* Recommended badge */}
      <Badge
        variant="pricing-recommended"
        position="absolute"
        top={-3}
        left="50%"
        transform="translateX(-50%)"
      >
        Most Popular
      </Badge>

      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Premium Plan
      </Text>
      <Text fontSize="3xl" fontWeight="bold" color="safeTalk.turquoise.500" mb={4}>
        19 zł<Text as="span" fontSize="lg" color="gray.500">/miesiąc</Text>
      </Text>

      {/* Save badge */}
      <Badge variant="pricing-save" mb={4}>
        Save 20%
      </Badge>

      <Text color="gray.600">
        Advanced protection with detailed analytics
      </Text>
    </Box>
  )
}

// Example of custom badge usage
export const CustomBadgeExample = () => {
  // Create a custom badge style
  const customAlertBadge = createCustomBadgeStyle(
    'red.500',
    'white',
    {
      withIcon: '⚠️',
      hover: {
        bg: 'red.600',
        transform: 'scale(1.05)',
      },
    }
  )

  return (
    <Box p={6}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Custom Badge Example
      </Text>
      
      <Badge sx={customAlertBadge}>
        Security Alert
      </Badge>
    </Box>
  )
}

// Example of accessibility-focused badges
export const AccessibilityBadges = () => {
  return (
    <VStack spacing={4} align="start" p={6}>
      <Text fontSize="lg" fontWeight="bold">
        Accessibility-Focused Badges
      </Text>
      
      <HStack spacing={4}>
        <Badge variant="high-contrast">
          High Contrast
        </Badge>
        <Badge variant="low-vision">
          Large Text
        </Badge>
      </HStack>
    </VStack>
  )
}