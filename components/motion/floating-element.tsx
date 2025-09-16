'use client'

import { motion } from 'framer-motion'
import { MotionBoxProps } from './box'

interface FloatingElementProps extends MotionBoxProps {
  children: React.ReactNode
  duration?: number
  distance?: number
  direction?: 'vertical' | 'horizontal' | 'both'
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 3,
  distance = 10,
  direction = 'vertical',
  ...props
}) => {
  const getAnimation = () => {
    switch (direction) {
      case 'vertical':
        return {
          y: [-distance, distance, -distance],
        }
      case 'horizontal':
        return {
          x: [-distance, distance, -distance],
        }
      case 'both':
        return {
          y: [-distance, distance, -distance],
          x: [-distance / 2, distance / 2, -distance / 2],
        }
      default:
        return {
          y: [-distance, distance, -distance],
        }
    }
  }

  return (
    <motion.div
      animate={getAnimation()}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const PulseElement: React.FC<Omit<FloatingElementProps, 'direction'>> = ({
  children,
  duration = 2,
  ...props
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}