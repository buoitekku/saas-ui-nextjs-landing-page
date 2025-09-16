# Technology Stack

## Core Technologies
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Chakra UI** for component library
- **Saas UI** for enhanced components
- **Framer Motion** for animations
- **pnpm** as package manager

## Key Dependencies
- `@chakra-ui/react` - UI component framework
- `@saas-ui/react` - Enhanced SaaS components
- `@saas-ui/auth` - Authentication components
- `framer-motion` - Animation library
- `react-icons` - Icon library
- `date-fns` - Date utilities
- `velite` - Content processing

## Development Tools
- **TypeScript** for type safety
- **ESLint** with Next.js config
- **Prettier** with import sorting
- **@svgr/webpack** for SVG handling

## Build & Development Commands

```bash
# Install dependencies
pnpm i

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Configuration Files
- `next.config.mjs` - Next.js configuration with SVG support
- `tsconfig.json` - TypeScript configuration with path aliases
- `.eslintrc.json` - ESLint rules
- `.prettierrc.cjs` - Code formatting with import sorting

## Path Aliases
- `#components/*` → `./components/*`
- `#hooks/*` → `./hooks/*`
- `#data/*` → `./data/*`
- `#theme` → `./theme`

## Development Server
- Runs on `http://localhost:3000`
- Hot reload enabled
- React Strict Mode enabled