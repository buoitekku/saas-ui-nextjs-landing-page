import React from 'react'
import { motion } from 'framer-motion'
import type { MotionBoxProps } from './box'

export const FallInPlace: React.FC<MotionBoxProps & { delay?: number }> = (
  props,
) => {
  const { children, delay = 0.2, ...rest } = props
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0, translateY: '20px' }}
      animate={{ scale: 1, opacity: 1, translateY: 0 }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 2,
        delay,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
