'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface SectionTransitionProps extends BoxProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  threshold?: number
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  ...props
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-50px',
    amount: threshold 
  })

  return (
    <Box ref={ref} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 50 }
        }
        transition={{
          duration,
          delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        }}
      >
        {children}
      </motion.div>
    </Box>
  )
}

export const ParallaxSection: React.FC<SectionTransitionProps> = ({
  children,
  ...props
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  return (
    <Box ref={ref} {...props}>
      <motion.div
        style={{
          transform: isInView ? 'translateY(0px)' : 'translateY(50px)',
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
      >
        {children}
      </motion.div>
    </Box>
  )
}