/**
 * Demo component showcasing Safe Talk focus indicators and interactive states
 * This component demonstrates all the enhanced focus and interactive features
 */

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { FiHeart, FiShare, FiBookmark, FiExternalLink } from 'react-icons/fi';
import { useFocusManagement, useInteractiveElement } from '../../hooks/use-focus-management';
import { useSafeTalkColors } from '../../hooks/use-color-compliance';

interface InteractiveCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, description, onClick }) => {
  const { getInteractiveProps, focusState } = useInteractiveElement('button');
  const colors = useSafeTalkColors();

  return (
    <Card
      variant="interactive"
      cursor="pointer"
      onClick={onClick}
      {...getInteractiveProps()}
      // Visual feedback based on state
      transform={focusState.isHovered || focusState.isFocused ? 'translateY(-2px)' : 'none'}
      boxShadow={focusState.isHovered || focusState.isFocused ? 'lg' : 'sm'}
      borderColor={focusState.isFocused ? colors.primary : 'gray.200'}
    >
      <CardHeader>
        <Heading size="md" color={colors.textPrimary}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text color={colors.textSecondary}>{description}</Text>
      </CardBody>
    </Card>
  );
};

interface AccessibleButtonProps {
  children: React.ReactNode;
  variant?: string;
  onClick?: () => void;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({ 
  children, 
  variant = 'safe-talk-primary',
  onClick 
}) => {
  const { getAccessibleProps, focusState } = useInteractiveElement('button');

  return (
    <Button
      variant={variant}
      onClick={onClick}
      {...getAccessibleProps()}
      // Additional visual feedback
      _focus={{
        transform: 'scale(1.02)',
      }}
      _active={{
        transform: 'scale(0.98)',
      }}
    >
      {children}
    </Button>
  );
};

export const FocusDemo: React.FC = () => {
  const colors = useSafeTalkColors();
  const { getInteractiveProps } = useFocusManagement({
    enableHoverEffects: true,
    enableKeyboardNavigation: true,
    announceStateChanges: true,
  });

  const handleCardClick = (cardName: string) => {
    console.log(`${cardName} card clicked`);
  };

  const handleButtonClick = (buttonName: string) => {
    console.log(`${buttonName} button clicked`);
  };

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <VStack spacing={12} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="xl" color={colors.textPrimary} mb={4}>
            Safe Talk Focus & Interactive States Demo
          </Heading>
          <Text color={colors.textSecondary} fontSize="lg">
            Navigate with Tab key or click to see enhanced focus indicators and interactive feedback
          </Text>
        </Box>

        {/* Button Variants */}
        <Box>
          <Heading size="lg" color={colors.textPrimary} mb={6}>
            Button Variants with Enhanced Focus
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <AccessibleButton 
              variant="safe-talk-primary"
              onClick={() => handleButtonClick('Primary')}
            >
              Primary Button
            </AccessibleButton>
            <AccessibleButton 
              variant="safe-talk-secondary"
              onClick={() => handleButtonClick('Secondary')}
            >
              Secondary Button
            </AccessibleButton>
            <AccessibleButton 
              variant="safe-talk-accent"
              onClick={() => handleButtonClick('Accent')}
            >
              Accent Button
            </AccessibleButton>
            <AccessibleButton 
              variant="safe-talk-outline"
              onClick={() => handleButtonClick('Outline')}
            >
              Outline Button
            </AccessibleButton>
            <AccessibleButton 
              variant="safe-talk-ghost"
              onClick={() => handleButtonClick('Ghost')}
            >
              Ghost Button
            </AccessibleButton>
            <AccessibleButton 
              variant="safe-talk-subtle"
              onClick={() => handleButtonClick('Subtle')}
            >
              Subtle Button
            </AccessibleButton>
          </SimpleGrid>
        </Box>

        {/* Icon Buttons */}
        <Box>
          <Heading size="lg" color={colors.textPrimary} mb={6}>
            Icon Buttons with Focus Indicators
          </Heading>
          <HStack spacing={4} justify="center">
            <IconButton
              variant="safe-talk-primary"
              aria-label="Like"
              icon={<FiHeart />}
              onClick={() => handleButtonClick('Like')}
            />
            <IconButton
              variant="safe-talk-secondary"
              aria-label="Share"
              icon={<FiShare />}
              onClick={() => handleButtonClick('Share')}
            />
            <IconButton
              variant="safe-talk-subtle"
              aria-label="Bookmark"
              icon={<FiBookmark />}
              onClick={() => handleButtonClick('Bookmark')}
            />
            <IconButton
              variant="safe-talk-ghost"
              aria-label="External Link"
              icon={<FiExternalLink />}
              onClick={() => handleButtonClick('External')}
            />
          </HStack>
        </Box>

        {/* Interactive Cards */}
        <Box>
          <Heading size="lg" color={colors.textPrimary} mb={6}>
            Interactive Cards with Focus Management
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <InteractiveCard
              title="Feature Card"
              description="This card demonstrates interactive focus states with Safe Talk brand colors."
              onClick={() => handleCardClick('Feature')}
            />
            <InteractiveCard
              title="Service Card"
              description="Hover or focus to see the enhanced visual feedback and accessibility features."
              onClick={() => handleCardClick('Service')}
            />
            <InteractiveCard
              title="Product Card"
              description="All interactive elements follow WCAG guidelines with proper contrast ratios."
              onClick={() => handleCardClick('Product')}
            />
          </SimpleGrid>
        </Box>

        {/* Form Elements */}
        <Box>
          <Heading size="lg" color={colors.textPrimary} mb={6}>
            Form Elements with Enhanced Focus
          </Heading>
          <Stack spacing={4} maxW="md" mx="auto">
            <Input
              placeholder="Email address"
              variant="outline"
              _focus={{
                borderColor: colors.primary,
                boxShadow: `0 0 0 3px ${colors.primary}33`,
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              variant="filled"
              _focus={{
                bg: 'white',
                borderColor: colors.primary,
                boxShadow: `0 0 0 3px ${colors.primary}33`,
              }}
            />
            <Button variant="safe-talk-primary" size="lg">
              Sign Up
            </Button>
          </Stack>
        </Box>

        {/* Links */}
        <Box>
          <Heading size="lg" color={colors.textPrimary} mb={6}>
            Links with Focus Indicators
          </Heading>
          <VStack spacing={4} align="center">
            <Link variant="primary" href="#" fontSize="lg">
              Primary Link with Focus Ring
            </Link>
            <Link variant="secondary" href="#" fontSize="lg">
              Secondary Link Style
            </Link>
            <Link variant="subtle" href="#" fontSize="lg">
              Subtle Link for Less Emphasis
            </Link>
            <Link variant="external" href="#" fontSize="lg">
              External Link with Icon
            </Link>
          </VStack>
        </Box>

        {/* Accessibility Notes */}
        <Box bg={colors.bgSecondary} p={6} borderRadius="lg" borderLeft="4px solid" borderLeftColor={colors.primary}>
          <Heading size="md" color={colors.textPrimary} mb={4}>
            Accessibility Features
          </Heading>
          <VStack align="start" spacing={2}>
            <Text color={colors.textSecondary}>
              • All interactive elements have visible focus indicators using Safe Talk brand colors
            </Text>
            <Text color={colors.textSecondary}>
              • Focus rings are only visible during keyboard navigation (focus-visible)
            </Text>
            <Text color={colors.textSecondary}>
              • Color contrast ratios meet or exceed WCAG AA standards (4.5:1 minimum)
            </Text>
            <Text color={colors.textSecondary}>
              • Interactive states provide clear visual feedback for hover, focus, and active states
            </Text>
            <Text color={colors.textSecondary}>
              • All elements are keyboard navigable with proper tab order
            </Text>
            <Text color={colors.textSecondary}>
              • Screen reader announcements for state changes (in development mode)
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};