# Safe Talk Status System

A comprehensive, brand-compliant status system for the Safe Talk application that provides consistent styling for success, error, warning, and informational states across all components.

## 🎯 Overview

The Safe Talk Status System is designed to:
- Maintain brand consistency using Safe Talk's color palette
- Ensure accessibility compliance (WCAG 2.1 AA)
- Provide a unified API for status-related styling
- Support both light and dark modes
- Offer flexible styling variants (solid, subtle, outline)

## 📁 Structure

```
theme/foundations/status-system/
├── index.ts              # Main exports and public API
├── types.ts              # TypeScript type definitions
├── colors.ts             # Color mappings and utilities
├── indicators.ts         # Status indicator configurations
├── styles.ts             # Component-specific styles
├── utils.ts              # Utility functions
└── README.md            # This documentation
```

## 🎨 Status Types

### Core Status Types
- **success** - Positive outcomes, completed actions
- **error** - Failures, validation errors, critical issues
- **warning** - Cautions, non-critical issues
- **info** - Informational messages, neutral states

### Extended Status Types
- **loading** - In-progress states, async operations
- **pending** - Waiting states, queued actions
- **active** - Currently active/selected states
- **inactive** - Disabled or inactive states

## 🎨 Color Mapping

The status system maps semantic status types to Safe Talk brand colors:

```typescript
const statusColorMappings = {
  success: 'safeTalk.limeGreen',    // Positive actions
  error: 'safeTalk.purple',         // Errors and failures
  warning: 'safeTalk.limeGreen',    // Warnings (darker shade)
  info: 'safeTalk.blue',            // Information
  loading: 'safeTalk.turquoise',    // Primary brand color
  pending: 'safeTalk.blue',         // Lighter blue
  active: 'safeTalk.turquoise',     // Primary brand color
  inactive: 'safeTalk.navy',        // Neutral gray-blue
}
```

## 🔧 Usage

### Basic Usage

```typescript
import { 
  createStatusStyle, 
  getStatusIcon, 
  statusIndicators 
} from '#theme/foundations/status-system'

// Create a status style
const successStyle = createStatusStyle('success', 'solid')

// Get status icon
const icon = getStatusIcon('success') // '✓'

// Access status configuration
const config = statusIndicators.success
```

### Using Hooks

```typescript
import { 
  useStatusSystem, 
  useStatusStyle, 
  useFormValidationStatus 
} from '#hooks/use-status-system'

// In a component
const MyComponent = () => {
  const { getStatusStyle, createStatusObject } = useStatusSystem()
  
  // Get a specific style
  const errorStyle = getStatusStyle('error', 'subtle')
  
  // Create complete status object
  const statusObj = createStatusObject('success', 'solid')
  
  return (
    <Box {...errorStyle}>
      {statusObj.icon} {statusObj.status}
    </Box>
  )
}
```

### Form Validation

```typescript
import { useFormValidationStatus } from '#hooks/use-status-system'

const FormField = ({ isValid, hasWarning, isLoading }) => {
  const { getValidStyle, getInvalidStyle, getWarningStyle, getLoadingStyle } = useFormValidationStatus()
  
  const getFieldStyle = () => {
    if (isLoading) return getLoadingStyle()
    if (!isValid) return getInvalidStyle()
    if (hasWarning) return getWarningStyle()
    return getValidStyle()
  }
  
  return <Input {...getFieldStyle()} />
}
```

### Alert Components

```typescript
import { useAlertStatus } from '#hooks/use-status-system'

const AlertComponent = ({ type, message }) => {
  const alerts = useAlertStatus()
  const alertConfig = alerts[type] // success, error, warning, info
  
  return (
    <Alert {...alertConfig.style}>
      <AlertIcon>{alertConfig.icon}</AlertIcon>
      <AlertTitle>Alert</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
```

## 🎨 Styling Variants

### Solid Variant
Full background color with contrasting text:
```typescript
const solidStyle = createStatusStyle('success', 'solid')
// { bg: 'safeTalk.limeGreen.400', color: 'safeTalk.navy.400', ... }
```

### Subtle Variant
Light background with darker text:
```typescript
const subtleStyle = createStatusStyle('success', 'subtle')
// { bg: 'safeTalk.limeGreen.50', color: 'safeTalk.limeGreen.700', ... }
```

### Outline Variant
Transparent background with colored border:
```typescript
const outlineStyle = createStatusStyle('success', 'outline')
// { bg: 'transparent', color: 'safeTalk.limeGreen.400', borderWidth: '1px', ... }
```

## 🧩 Component Integration

### Chakra UI Components

The status system integrates seamlessly with Chakra UI components:

```typescript
// Button with status styling
<Button {...createStatusStyle('success', 'solid')}>
  Success Button
</Button>

// Badge with status styling
<Badge {...createStatusStyle('error', 'subtle')}>
  Error Badge
</Badge>

// Alert with status styling
<Alert status="success">
  <AlertIcon />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Operation completed successfully.</AlertDescription>
</Alert>
```

### Custom Components

```typescript
const StatusBadge = ({ status, variant = 'solid', children }) => {
  const style = createStatusStyle(status, variant)
  const icon = getStatusIcon(status)
  
  return (
    <Box
      {...style}
      px={3}
      py={1}
      borderRadius="md"
      fontSize="sm"
      fontWeight="medium"
      display="inline-flex"
      alignItems="center"
      gap={2}
    >
      <Text>{icon}</Text>
      <Text>{children}</Text>
    </Box>
  )
}

// Usage
<StatusBadge status="success" variant="subtle">
  Operation Successful
</StatusBadge>
```

## ♿ Accessibility

The status system ensures accessibility through:

### Color Contrast
- All color combinations meet WCAG 2.1 AA standards (4.5:1 minimum)
- High contrast variants available for AAA compliance (7:1)
- Automatic text color selection based on background

### Screen Readers
- Semantic status information
- Proper ARIA attributes support
- Icon alternatives for text-only contexts

### Color Blindness
- Status information not conveyed through color alone
- Icons and text labels accompany color coding
- Tested with color blindness simulators

## 🧪 Testing

### Unit Tests
```bash
# Run status system tests
pnpm test __tests__/status-system-comprehensive.test.tsx
```

### Visual Testing
```typescript
// Test color contrast
import { getContrastRatio } from '#utils/color-validation'

const testContrast = (bg: string, text: string) => {
  const ratio = getContrastRatio(bg, text)
  expect(ratio).toBeGreaterThan(4.5) // AA compliance
}
```

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- High contrast mode support
- Color blindness simulation

## 🔄 Migration Guide

### From Legacy Status System

```typescript
// Old way (deprecated)
import { statusIndicators } from '#theme/foundations/status-system'

// New way (recommended)
import { statusIndicators } from '#theme/foundations/status-system/'
// or
import { createStatusStyle } from '#theme/foundations/status-system'
```

### Updating Components

```typescript
// Before
const MyComponent = () => (
  <Box bg="green.500" color="white">
    Success
  </Box>
)

// After
const MyComponent = () => {
  const successStyle = createStatusStyle('success', 'solid')
  return (
    <Box {...successStyle}>
      {getStatusIcon('success')} Success
    </Box>
  )
}
```

## 📚 API Reference

### Types

```typescript
type StatusType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'pending' | 'active' | 'inactive'
type StatusVariant = 'solid' | 'subtle' | 'outline'
type FormValidationState = 'valid' | 'invalid' | 'warning' | 'loading'
```

### Functions

```typescript
// Style creators
createStatusStyle(status: StatusType, variant?: StatusVariant): SystemStyleObject
createFormValidationStyle(state: FormValidationState): SystemStyleObject
createAlertStyle(status: StatusType): SystemStyleObject

// Utilities
getStatusIcon(status: StatusType): string
shouldUseLightText(status: StatusType): boolean
isValidStatusType(status: string): status is StatusType
getStatusColorSafe(status: string, fallback?: StatusType): string
```

### Hooks

```typescript
// Main hook
useStatusSystem(options?: UseStatusSystemOptions)

// Specialized hooks
useStatusStyle(status: StatusType, variant?: StatusVariant)
useFormValidationStatus()
useAlertStatus()
```

## 🤝 Contributing

When contributing to the status system:

1. **Maintain Brand Compliance**: All colors must reference Safe Talk palette
2. **Ensure Accessibility**: Test color contrast and screen reader compatibility
3. **Add Tests**: Include unit tests for new functionality
4. **Update Documentation**: Keep this README current with changes
5. **Follow TypeScript**: Use proper typing for all new additions

## 📝 Examples

See the `components/status-demo/` directory for comprehensive examples of the status system in action.

## 🔗 Related

- [Safe Talk Brand Colors](../../../brand/safe-talk-brand-colors.md)
- [Color Validation Utils](../../../utils/color-validation.ts)
- [Accessibility Helpers](../../../utils/accessibility-helpers.ts)
- [Status Demo Component](../../../components/status-demo/)