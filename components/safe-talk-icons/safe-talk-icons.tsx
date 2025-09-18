import { Icon, IconProps, Box } from '@chakra-ui/react'
import { memo, useMemo } from 'react'
import Image from 'next/image'

// Icon configuration with metadata for better maintainability
const SAFE_TALK_ICONS = {
  'real-time-analysis': {
    label: 'Analiza w czasie rzeczywistym',
    description: 'Ikona przedstawiająca analizę rozmów w czasie rzeczywistym',
  },
  'ai-detection': {
    label: 'Wykrywanie AI',
    description: 'Ikona sztucznej inteligencji wykrywającej oszustwa',
  },
  'privacy-protection': {
    label: 'Ochrona prywatności',
    description: 'Ikona reprezentująca bezpieczeństwo i ochronę danych',
  },
  'smart-alerts': {
    label: 'Inteligentne ostrzeżenia',
    description: 'Ikona powiadomień i alertów bezpieczeństwa',
  },
  'voice-recognition': {
    label: 'Rozpoznawanie głosu',
    description: 'Ikona technologii rozpoznawania mowy',
  },
  'universal-protection': {
    label: 'Uniwersalna ochrona',
    description: 'Ikona kompleksowej ochrony dla wszystkich użytkowników',
  },
} as const

export type SafeTalkIconName = keyof typeof SAFE_TALK_ICONS

interface SafeTalkIconProps extends Omit<IconProps, 'as' | 'children'> {
  /** Name of the Safe Talk icon to display */
  name: SafeTalkIconName
  /** Custom alt text for accessibility (falls back to icon label) */
  alt?: string
  /** Size in pixels for the icon (defaults to 24) */
  size?: number
  /** Whether to show loading state */
  loading?: boolean
}

/**
 * Safe Talk branded icon component with optimized performance and accessibility
 * 
 * @example
 * ```tsx
 * <SafeTalkIcon name="real-time-analysis" size={32} color="safeTalk.turquoise.500" />
 * ```
 */
export const SafeTalkIcon: React.FC<SafeTalkIconProps> = memo(({
  name,
  alt,
  size = 24,
  loading = false,
  ...iconProps
}) => {
  const iconConfig = SAFE_TALK_ICONS[name]
  const altText = alt || iconConfig.label
  
  // Memoize the image source to prevent unnecessary re-renders
  const imageSrc = useMemo(() => `/static/images/icons/${name}.svg`, [name])
  
  if (loading) {
    return (
      <Box
        width={`${size}px`}
        height={`${size}px`}
        bg="gray.200"
        borderRadius="md"
        animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
        aria-label="Ładowanie ikony..."
        {...(iconProps as any)}
      />
    )
  }

  return (
    <Icon
      width={`${size}px`}
      height={`${size}px`}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      {...iconProps}
      aria-label={altText}
      role="img"
    >
      <Image
        src={imageSrc}
        alt={altText}
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        priority={false}
        loading="lazy"
      />
    </Icon>
  )
})

SafeTalkIcon.displayName = 'SafeTalkIcon'

// Individual icon components with proper TypeScript inference and memoization
export const RealTimeAnalysisIcon: React.FC<Omit<SafeTalkIconProps, 'name'>> = memo((props) => (
  <SafeTalkIcon name="real-time-analysis" {...props} />
))
RealTimeAnalysisIcon.displayName = 'RealTimeAnalysisIcon'

export const AIDetectionIcon: React.FC<Omit<SafeTalkIconProps, 'name'>> = memo((props) => (
  <SafeTalkIcon name="ai-detection" {...props} />
))
AIDetectionIcon.displayName = 'AIDetectionIcon'

export const PrivacyProtectionIcon: React.FC<Omit<SafeTalkIconProps, 'name'>> = memo((props) => (
  <SafeTalkIcon name="privacy-protection" {...props} />
))
PrivacyProtectionIcon.displayName = 'PrivacyProtectionIcon'

export const SmartAlertsIcon: React.FC<Omit<SafeTalkIconProps, 'name'>> = memo((props) => (
  <SafeTalkIcon name="smart-alerts" {...props} />
))
SmartAlertsIcon.displayName = 'SmartAlertsIcon'

export const VoiceRecognitionIcon: React.FC<Omit<SafeTalkIconProps, 'name'>> = memo((props) => (
  <SafeTalkIcon name="voice-recognition" {...props} />
))
VoiceRecognitionIcon.displayName = 'VoiceRecognitionIcon'

export const UniversalProtectionIcon: React.FC<Omit<SafeTalkIconProps, 'name'>> = memo((props) => (
  <SafeTalkIcon name="universal-protection" {...props} />
))
UniversalProtectionIcon.displayName = 'UniversalProtectionIcon'

// Utility function to get all available icon names (useful for documentation/testing)
export const getAvailableIconNames = (): SafeTalkIconName[] => {
  return Object.keys(SAFE_TALK_ICONS) as SafeTalkIconName[]
}

// Utility function to get icon metadata
export const getIconMetadata = (name: SafeTalkIconName) => {
  return SAFE_TALK_ICONS[name]
}