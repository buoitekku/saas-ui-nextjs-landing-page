'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MotionBoxProps } from './box'

interface ScrollRevealProps extends MotionBoxProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true,
  ...props
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              ...directionOffset[direction],
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}