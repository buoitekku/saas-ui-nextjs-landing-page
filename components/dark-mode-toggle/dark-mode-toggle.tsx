/**
 * Dark Mode Toggle Component with Safe Talk brand styling
 */

import {
  IconButton,
  useColorMode,
  useColorModeValue,
  Tooltip,
  Box,
  HStack,
  Text,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useSafeTalkColors } from '../../hooks/use-color-compliance';

interface DarkModeToggleProps {
  variant?: 'icon' | 'switch' | 'button';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  variant = 'icon',
  size = 'md',
  showLabel = false,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colors = useSafeTalkColors();
  
  const isDark = colorMode === 'dark';
  const toggleLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const Icon = isDark ? FiSun : FiMoon;
  
  // Icon button variant
  if (variant === 'icon') {
    return (
      <Tooltip label={toggleLabel} placement="bottom">
        <IconButton
          aria-label={toggleLabel}
          icon={<Icon />}
          onClick={toggleColorMode}
          variant="safe-talk-subtle"
          size={size}
          color={useColorModeValue(colors.textPrimary, colors.primary)}
          _hover={{
            bg: useColorModeValue(colors.bgSecondary, 'safeTalk.turquoise.800'),
            color: useColorModeValue(colors.primary, colors.primaryHover),
          }}
          transition="all 0.2s ease-in-out"
        />
      </Tooltip>
    );
  }
  
  // Switch variant
  if (variant === 'switch') {
    return (
      <HStack spacing={3}>
        {showLabel && (
          <Text fontSize={size} color={colors.textSecondary}>
            {isDark ? 'Dark' : 'Light'}
          </Text>
        )}
        <HStack spacing={2}>
          <FiSun 
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            color={!isDark ? colors.primary : colors.textMuted}
          />
          <Switch
            isChecked={isDark}
            onChange={toggleColorMode}
            colorScheme="teal"
            size={size}
            sx={{
              '.chakra-switch__track': {
                bg: useColorModeValue('gray.200', 'safeTalk.navy.600'),
                _checked: {
                  bg: colors.primary,
                },
              },
              '.chakra-switch__thumb': {
                bg: 'white',
                _checked: {
                  bg: 'white',
                },
              },
            }}
          />
          <FiMoon 
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            color={isDark ? colors.primary : colors.textMuted}
          />
        </HStack>
      </HStack>
    );
  }
  
  // Button variant
  return (
    <Box
      as="button"
      onClick={toggleColorMode}
      p={3}
      borderRadius="md"
      bg={useColorModeValue('white', 'safeTalk.navy.800')}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'safeTalk.navy.600')}
      _hover={{
        borderColor: colors.primary,
        bg: useColorModeValue(colors.bgSecondary, 'safeTalk.navy.700'),
      }}
      transition="all 0.2s ease-in-out"
      cursor="pointer"
    >
      <VStack spacing={2}>
        <Icon 
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
          color={colors.primary}
        />
        {showLabel && (
          <Text fontSize="sm" color={colors.textSecondary}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

// Floating dark mode toggle for demos
export const FloatingDarkModeToggle: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={4}
      right={4}
      zIndex={1000}
      bg={useColorModeValue('white', 'safeTalk.navy.800')}
      borderRadius="full"
      boxShadow="lg"
      p={1}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'safeTalk.navy.600')}
    >
      <DarkModeToggle variant="icon" size="md" />
    </Box>
  );
};

// Dark mode status indicator
export const DarkModeStatus: React.FC = () => {
  const { colorMode } = useColorMode();
  const colors = useSafeTalkColors();
  
  return (
    <HStack spacing={2} fontSize="sm" color={colors.textMuted}>
      <Text>Current mode:</Text>
      <Text fontWeight="semibold" color={colors.primary}>
        {colorMode === 'dark' ? 'Dark' : 'Light'}
      </Text>
    </HStack>
  );
};