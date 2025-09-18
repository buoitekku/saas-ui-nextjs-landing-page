# Safe Talk Icons

A collection of branded icons for the Safe Talk application with optimized performance and accessibility.

## Features

- **Performance Optimized**: Memoized components with lazy loading
- **Accessible**: Proper ARIA labels and semantic structure
- **Type Safe**: Full TypeScript support with strict typing
- **Flexible**: Customizable size, color, and styling
- **Loading States**: Built-in loading placeholder support

## Usage

### Basic Usage

```tsx
import { SafeTalkIcon } from '#components/safe-talk-icons'

// Basic icon
<SafeTalkIcon name="real-time-analysis" />

// With custom size and color
<SafeTalkIcon 
  name="ai-detection" 
  size={32} 
  color="safeTalk.turquoise.500" 
/>

// With loading state
<SafeTalkIcon 
  name="privacy-protection" 
  loading={isLoading}
  size={48}
/>
```

### Individual Icon Components

```tsx
import { 
  RealTimeAnalysisIcon,
  AIDetectionIcon,
  PrivacyProtectionIcon 
} from '#components/safe-talk-icons'

<RealTimeAnalysisIcon size={24} />
<AIDetectionIcon color="safeTalk.blue.500" />
<PrivacyProtectionIcon size={32} />
```

### Available Icons

- `real-time-analysis` - Analiza w czasie rzeczywistym
- `ai-detection` - Wykrywanie AI
- `privacy-protection` - Ochrona prywatności
- `smart-alerts` - Inteligentne ostrzeżenia
- `voice-recognition` - Rozpoznawanie głosu
- `universal-protection` - Uniwersalna ochrona

### Utility Functions

```tsx
import { getAvailableIconNames, getIconMetadata } from '#components/safe-talk-icons'

// Get all available icon names
const iconNames = getAvailableIconNames()

// Get metadata for specific icon
const metadata = getIconMetadata('real-time-analysis')
console.log(metadata.label) // "Analiza w czasie rzeczywistym"
```

## Props

### SafeTalkIcon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `SafeTalkIconName` | - | **Required.** Name of the icon to display |
| `size` | `number` | `24` | Size in pixels for the icon |
| `alt` | `string` | - | Custom alt text (falls back to icon label) |
| `loading` | `boolean` | `false` | Whether to show loading placeholder |
| `color` | `string` | - | Chakra UI color token or CSS color |
| `...iconProps` | `IconProps` | - | All other Chakra UI Icon props |

## Performance Considerations

- Icons are memoized to prevent unnecessary re-renders
- Images use lazy loading by default
- Loading states prevent layout shift
- Optimized for bundle size with tree shaking

## Accessibility

- Proper ARIA labels with meaningful descriptions
- Semantic `role="img"` attribute
- Support for custom alt text
- Loading states with appropriate labels

## File Structure

```
components/safe-talk-icons/
├── index.ts              # Main exports
├── safe-talk-icons.tsx   # Component implementation
└── README.md            # Documentation
```

## Adding New Icons

1. Add the SVG file to `/public/static/images/icons/`
2. Add the icon configuration to `SAFE_TALK_ICONS` object
3. The icon will be automatically available with full TypeScript support

```tsx
const SAFE_TALK_ICONS = {
  // ... existing icons
  'new-icon': {
    label: 'Nowa ikona',
    description: 'Opis nowej ikony',
  },
}
```