import * as React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import type { MotionBoxProps } from './box'

export const PageTransition: React.FC<MotionBoxProps> = (props) => (
  <motion.div
    initial={{ y: -24, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    {...props}
  />
)
