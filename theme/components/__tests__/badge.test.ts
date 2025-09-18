/**
 * Badge theme tests
 */

import { badgeTheme, createCustomBadgeStyle, type BadgeVariant, type BadgeSize } from '../badge'

describe('Badge Theme', () => {
  test('should have all required properties', () => {
    expect(badgeTheme).toHaveProperty('baseStyle')
    expect(badgeTheme).toHaveProperty('variants')
    expect(badgeTheme).toHaveProperty('sizes')
    expect(badgeTheme).toHaveProperty('defaultProps')
  })

  test('should have correct default props', () => {
    expect(badgeTheme.defaultProps).toEqual({
      variant: 'safe-talk-primary',
      size: 'md',
    })
  })

  test('should have all Safe Talk brand variants', () => {
    const brandVariants: BadgeVariant[] = [
      'safe-talk-primary',
      'safe-talk-secondary',
      'safe-talk-success',
      'safe-talk-info',
      'safe-talk-subtle',
      'safe-talk-outline',
    ]

    brandVariants.forEach(variant => {
      expect(badgeTheme.variants).toHaveProperty(variant)
    })
  })

  test('should have all status variants', () => {
    const statusVariants: BadgeVariant[] = [
      'status-active',
      'status-pending',
      'status-inactive',
    ]

    statusVariants.forEach(variant => {
      expect(badgeTheme.variants).toHaveProperty(variant)
    })
  })

  test('should have all feature variants', () => {
    const featureVariants: BadgeVariant[] = [
      'feature-new',
      'feature-popular',
      'feature-premium',
    ]

    featureVariants.forEach(variant => {
      expect(badgeTheme.variants).toHaveProperty(variant)
    })
  })

  test('should have all sizes', () => {
    const sizes: BadgeSize[] = ['sm', 'md', 'lg']
    
    sizes.forEach(size => {
      expect(badgeTheme.sizes).toHaveProperty(size)
    })
  })

  test('createCustomBadgeStyle should work correctly', () => {
    const customStyle = createCustomBadgeStyle('red.500', 'white', {
      withDot: true,
      dotColor: 'red.600',
    })

    expect(customStyle).toHaveProperty('bg', 'red.500')
    expect(customStyle).toHaveProperty('color', 'white')
    expect(customStyle).toHaveProperty('_before')
  })

  test('createCustomBadgeStyle with icon should work', () => {
    const customStyle = createCustomBadgeStyle('blue.500', 'white', {
      withIcon: '🔥',
    })

    expect(customStyle).toHaveProperty('_before')
    expect(customStyle._before).toHaveProperty('content', '"🔥"')
  })
})