import { Button, ButtonProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'
import { HoverScale } from '#components/motion'

export type ButtonLinkProps = LinkProps & ButtonProps & {
  disableAnimation?: boolean
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  disableAnimation = false,
  ...props
}) => {
  const ButtonComponent = (
    <Button
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: disableAnimation ? undefined : 'translateY(-2px)',
        shadow: disableAnimation ? undefined : 'lg',
        ...props._hover,
      }}
      _active={{
        transform: disableAnimation ? undefined : 'translateY(0px)',
        ...props._active,
      }}
      {...props}
    >
      {children}
    </Button>
  )

  if (disableAnimation) {
    return (
      <NextLink href={href} passHref>
        {ButtonComponent}
      </NextLink>
    )
  }

  return (
    <NextLink href={href} passHref>
      <HoverScale scale={1.02} duration={0.2}>
        {ButtonComponent}
      </HoverScale>
    </NextLink>
  )
}
