# Safe Talk Color Validation System

This comprehensive color validation system ensures brand compliance and accessibility standards across the Safe Talk landing page.

## Overview

The color validation system consists of several interconnected utilities:

- **Brand Color Validation**: Ensures only Safe Talk approved colors are used
- **Accessibility Checking**: Validates WCAG contrast requirements
- **Development Warnings**: Real-time feedback during development
- **Build-time Validation**: Automated checks during CI/CD
- **React Hooks**: Easy integration with React components

## Quick Start

### Basic Usage

```typescript
import { validateBrandColor, validateColorCombination } from '../utils/color-validation';

// Validate a single color
const isValid = validateBrandColor('safeTalk.turquoise.400'); // true
const isInvalid = validateBrandColor('red.500'); // false

// Validate color combination
const result = validateColorCombination('safeTalk.turquoise.400', 'white');
console.log(result.accessible); // true
console.log(result.contrastRatio); // ~3.2
```

### React Hook Usage

```typescript
import { useColorCompliance, useSafeTalkColors } from '../hooks/use-color-compliance';

function MyComponent() {
  const { validateColor, getSafeTalkColor } = useColorCompliance();
  const colors = useSafeTalkColors();

  // Use pre-validated colors
  const buttonColor = colors.primary; // 'safeTalk.turquoise.400'
  
  // Validate custom colors
  const isValid = validateColor('safeTalk.blue.500', 'MyComponent.background');
  
  return (
    <Button bg={buttonColor} color="white">
      Click me
    </Button>
  );
}
```

## Safe Talk Color Palette

### Primary Colors

- **Turquoise** (`safeTalk.turquoise.*`): Primary brand color (#3AB5B2)
- **Blue** (`safeTalk.blue.*`): Secondary brand color (#71C6DA)
- **Lime Green** (`safeTalk.limeGreen.*`): Accent color (#C5D54E)
- **Purple** (`safeTalk.purple.*`): Supporting color (#8974B2)
- **Navy** (`safeTalk.navy.*`): Dark accent (#0A3447)

### Semantic Mappings

- `primary.*` → `safeTalk.turquoise.*`
- `secondary.*` → `safeTalk.blue.*`
- `accent.*` → `safeTalk.limeGreen.*`

### Allowed Neutral Colors

- `white`, `black`, `transparent`
- `gray.50`, `gray.100`, `gray.200` (limited use for subtle backgrounds)

## Accessibility Standards

The system enforces WCAG 2.1 contrast requirements:

- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text (18pt+)**: 3.0:1 minimum contrast ratio
- **AAA compliance**: 7.0:1 for normal text, 4.5:1 for large text

### Pre-validated Combinations

```typescript
// ✅ High contrast (7:1+)
'safeTalk.navy.400' on 'white'
'white' on 'safeTalk.navy.400'

// ✅ AA compliant (4.5:1+)
'safeTalk.turquoise.600' on 'white'
'white' on 'safeTalk.turquoise.400'

// ⚠️ Large text only (3:1+)
'safeTalk.blue.400' on 'white'
'safeTalk.limeGreen.400' on 'white'
```

## Development Workflow

### 1. Development Mode Warnings

During development, the system provides real-time console warnings:

```typescript
import { validateColorInDev } from '../utils/color-dev-warnings';

// This will show a warning if the color is non-compliant
validateColorInDev('red.500', 'MyComponent.background');
```

### 2. Component Validation

```typescript
import { validateChakraStyleProp } from '../utils/color-dev-warnings';

const styles = {
  bg: 'safeTalk.turquoise.400',
  color: 'white',
  borderColor: 'safeTalk.turquoise.600'
};

// Validates all color properties in development
validateChakraStyleProp(styles, 'MyButton');
```

### 3. Build-time Validation

Run validation before deployment:

```bash
# Basic validation
npm run validate-colors

# Strict mode (fail on warnings)
npm run validate-colors:strict

# Generate detailed report
npm run validate-colors:report
```

### 4. Automated Testing

```bash
# Run color validation tests
npm run test:colors
```

## API Reference

### Core Validation Functions

#### `validateBrandColor(color: string): boolean`

Validates if a color follows Safe Talk brand guidelines.

```typescript
validateBrandColor('safeTalk.turquoise.400'); // true
validateBrandColor('red.500'); // false
```

#### `getContrastRatio(color1: string, color2: string): number`

Calculates WCAG contrast ratio between two colors.

```typescript
getContrastRatio('#3AB5B2', '#FFFFFF'); // ~3.2
```

#### `validateColorAccessibility(bg: string, text: string, isLargeText?: boolean, level?: 'AA' | 'AAA')`

Comprehensive accessibility validation with detailed feedback.

```typescript
const result = validateColorAccessibility('#3AB5B2', '#FFFFFF');
// {
//   isValid: true,
//   contrastRatio: 3.2,
//   requiredRatio: 4.5,
//   recommendation: undefined
// }
```

#### `validateColorCombination(bg: string, text: string, isLargeText?: boolean)`

Validates both brand compliance and accessibility.

```typescript
const result = validateColorCombination('safeTalk.turquoise.400', 'white');
// {
//   brandCompliant: true,
//   accessible: true,
//   contrastRatio: 3.2,
//   issues: [],
//   recommendations: []
// }
```

### React Hooks

#### `useColorCompliance()`

Main hook for color validation in React components.

```typescript
const {
  validateColor,
  validateCombination,
  getSafeTalkColor,
  isBrandCompliant,
  isAccessible
} = useColorCompliance();
```

#### `useSafeTalkColors()`

Pre-validated Safe Talk color tokens.

```typescript
const colors = useSafeTalkColors();
// {
//   primary: 'safeTalk.turquoise.400',
//   secondary: 'safeTalk.blue.400',
//   textPrimary: 'safeTalk.navy.400',
//   // ... more colors
// }
```

#### `useAccessibleColors()`

Pre-validated accessible color combinations.

```typescript
const { combinations, createAccessibleCombination } = useAccessibleColors();

// Use pre-validated combinations
const buttonStyle = combinations.standard.primaryButton;
// { bg: 'safeTalk.turquoise.400', text: 'white' }

// Create custom accessible combination
const customCombo = createAccessibleCombination('white', 'safeTalk.navy.400');
```

### Development Utilities

#### `validateColorInDev(color: string, context?: string): boolean`

Development-only validation with console warnings.

#### `validateColorCombinationInDev(bg: string, text: string, isLargeText?: boolean, context?: string): boolean`

Development-only combination validation.

#### `validateChakraStyleProp(styles: object, componentName?: string): void`

Validates all color properties in a Chakra UI style object.

#### `withColorValidation<T>(styles: T, componentName?: string): T`

Wrapper for styled components with automatic validation.

### Build-time Utilities

#### `runBuildTimeValidation()`

Comprehensive validation for CI/CD integration.

#### `validateThemeColors()`

Validates theme color consistency.

#### `validateCommonColorCombinations()`

Validates accessibility of common UI patterns.

#### `generateColorUsageReport()`

Generates detailed usage statistics and compliance report.

## Configuration

### Environment Variables

- `NODE_ENV=development`: Enables development warnings
- `DISABLE_COLOR_WARNINGS=true`: Disables development warnings
- `FAIL_ON_COLOR_WARNINGS=true`: Fail build on warnings
- `VERBOSE_COLOR_VALIDATION=true`: Show detailed validation output
- `OUTPUT_COLOR_REPORT=true`: Generate JSON validation report

### Package.json Scripts

```json
{
  "scripts": {
    "validate-colors": "node scripts/validate-colors.js",
    "validate-colors:strict": "FAIL_ON_COLOR_WARNINGS=true node scripts/validate-colors.js",
    "validate-colors:report": "OUTPUT_COLOR_REPORT=true node scripts/validate-colors.js",
    "test:colors": "jest __tests__/color-validation.test.ts",
    "prebuild": "npm run validate-colors"
  }
}
```

## Best Practices

### 1. Use Semantic Colors

```typescript
// ✅ Good - semantic and flexible
bg="primary.400"
color="white"

// ❌ Avoid - too specific
bg="safeTalk.turquoise.400"
```

### 2. Validate in Development

```typescript
// ✅ Good - validates during development
const { colors } = useSafeTalkColors();

// ❌ Avoid - no validation
const colors = {
  primary: 'blue.500' // Generic blue, not brand compliant
};
```

### 3. Test Accessibility

```typescript
// ✅ Good - ensures accessibility
const { createAccessibleCombination } = useAccessibleColors();
const combo = createAccessibleCombination(bgColor, textColor);

// ❌ Avoid - no accessibility check
const styles = { bg: bgColor, color: textColor };
```

### 4. Use Build Validation

```bash
# ✅ Good - validate before deployment
npm run validate-colors:strict

# ❌ Avoid - deploy without validation
npm run build
```

## Troubleshooting

### Common Issues

1. **"Non-compliant color" warnings**
   - Replace with Safe Talk brand colors
   - Use `safeTalk.*` or semantic tokens

2. **"Low contrast ratio" errors**
   - Use darker text on light backgrounds
   - Use lighter text on dark backgrounds
   - Check pre-validated combinations

3. **Build failures on color validation**
   - Fix all reported color issues
   - Use `npm run validate-colors:report` for detailed analysis

### Getting Help

1. Check the validation report: `npm run validate-colors:report`
2. Review console warnings in development mode
3. Use the React hooks for guided color selection
4. Refer to the pre-validated color combinations

## Migration Guide

### From Generic Colors

```typescript
// Before
bg="blue.500"
color="gray.600"

// After
bg="safeTalk.blue.400"
color="safeTalk.navy.400"
```

### From Custom Colors

```typescript
// Before
bg="#FF5733"
color="#333333"

// After - find closest Safe Talk equivalent
bg="safeTalk.limeGreen.400"  // Closest to orange
color="safeTalk.navy.400"    // Dark text
```

### Validation Integration

```typescript
// Before - no validation
const MyComponent = ({ bg, color }) => (
  <Box bg={bg} color={color}>Content</Box>
);

// After - with validation
const MyComponent = ({ bg, color }) => {
  const { validateCombination } = useColorCompliance();
  
  // Validate in development
  if (process.env.NODE_ENV === 'development') {
    validateCombination(bg, color, false, 'MyComponent');
  }
  
  return <Box bg={bg} color={color}>Content</Box>;
};
```