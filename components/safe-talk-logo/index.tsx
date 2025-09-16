import { Box, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'

export interface SafeTalkLogoProps extends HTMLChakraProps<'div'> {
  variant?: 'horizontal' | 'vertical' | 'sygnet'
  height?: string | number
  width?: string | number
}

// Safe Talk Logo using real brand assets
export const SafeTalkLogo: React.FC<SafeTalkLogoProps> = ({ 
  variant = 'horizontal', 
  height = 'auto',
  width = 'auto',
  ...props 
}) => {
  // Use negative versions for dark mode
  const logoSrc = useColorModeValue(
    variant === 'horizontal' 
      ? '/static/images/safe-talk-logo-horizontal.svg'
      : variant === 'vertical'
      ? '/static/images/safe-talk-logo-vertical.svg'
      : '/static/images/safe-talk-logo-horizontal.svg', // fallback to horizontal for sygnet
    variant === 'horizontal'
      ? '/static/images/safe-talk-logo-horizontal-negative.svg'
      : '/static/images/safe-talk-logo-horizontal-negative.svg' // use horizontal negative as fallback
  )

  return (
    <Box 
      display="inline-block" 
      height={height}
      width={width}
      {...props}
    >
      <Image
        src={logoSrc}
        alt="Safe Talk - Ochrona przed oszustwami telefonicznymi"
        width={variant === 'horizontal' ? 200 : variant === 'vertical' ? 120 : 60}
        height={variant === 'horizontal' ? 60 : variant === 'vertical' ? 100 : 60}
        style={{
          width: width === 'auto' ? 'auto' : width,
          height: height === 'auto' ? 'auto' : height,
          objectFit: 'contain'
        }}
        priority
      />
    </Box>
  )
}

// Individual exports for convenience
export const SafeTalkLogoHorizontal: React.FC<Omit<SafeTalkLogoProps, 'variant'>> = (props) => (
  <SafeTalkLogo variant="horizontal" {...props} />
)

export const SafeTalkLogoVertical: React.FC<Omit<SafeTalkLogoProps, 'variant'>> = (props) => (
  <SafeTalkLogo variant="vertical" {...props} />
)

export const SafeTalkSygnet: React.FC<Omit<SafeTalkLogoProps, 'variant'>> = (props) => (
  <SafeTalkLogo variant="sygnet" {...props} />
)