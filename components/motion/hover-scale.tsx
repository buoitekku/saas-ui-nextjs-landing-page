'use client'

import { motion } from 'framer-motion'
import { MotionBoxProps } from './box'

interface HoverScaleProps extends MotionBoxProps {
  children: React.ReactNode
  scale?: number
  duration?: number
  whileHover?: any
  whileTap?: any
}

export const HoverScale: React.FC<HoverScaleProps> = ({
  children,
  scale = 1.05,
  duration = 0.2,
  whileHover,
  whileTap,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{
        scale,
        transition: { duration, ease: 'easeOut' },
        ...whileHover,
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
        ...whileTap,
      }}
      style={{ cursor: 'pointer' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const HoverLift: React.FC<HoverScaleProps> = ({
  children,
  duration = 0.3,
  whileHover,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration, ease: 'easeOut' },
        ...whileHover,
      }}
      whileTap={{
        y: -4,
        transition: { duration: 0.1 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}