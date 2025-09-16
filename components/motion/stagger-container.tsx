'use client'

import { motion } from 'framer-motion'
import { MotionBoxProps } from './box'

interface StaggerContainerProps extends MotionBoxProps {
  children: React.ReactNode
  staggerDelay?: number
  delayChildren?: number
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps extends MotionBoxProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  distance = 30,
  ...props
}) => {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          ...directionOffset[direction],
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.25, 0.25, 0.75],
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}