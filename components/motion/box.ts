/**
 * Motion Box Props for Framer Motion components
 */

import { BoxProps } from '@chakra-ui/react'
import { HTMLMotionProps } from 'framer-motion'

export type MotionBoxProps = Omit<BoxProps, keyof HTMLMotionProps<'div'>> & HTMLMotionProps<'div'>