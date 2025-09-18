'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  containerProps?: BoxProps
  fallback?: React.ReactNode
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  containerProps,
  fallback,
  ...imageProps
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError && fallback) {
    return <>{fallback}</>
  }

  return (
    <Box
      position="relative"
      overflow="hidden"
      {...containerProps}
      opacity={isLoading ? 0.7 : 1}
      transition="opacity 0.3s ease-in-out"
    >
      <Image
        {...imageProps}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          ...imageProps.style,
        }}
        // Optimize for mobile
        sizes={imageProps.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        // Enable lazy loading
        loading={imageProps.loading || 'lazy'}
        // Add quality optimization
        quality={imageProps.quality || 85}
      />
    </Box>
  )
}