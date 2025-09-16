# Project Structure

## Directory Organization

### `/app` - Next.js App Router
- `layout.tsx` - Root layout with Chakra UI provider
- `provider.tsx` - Application providers setup
- `(auth)/` - Authentication pages (login, signup)
- `(marketing)/` - Marketing pages

### `/components` - Reusable UI Components
Organized by feature/purpose:
- `announcement-banner/` - Site announcements
- `button-link/` - Custom button components
- `faq/` - FAQ section components
- `features/` - Feature showcase components
- `gradients/` - Background gradient components
- `hero/` - Hero section components
- `highlights/` - Content highlight components
- `layout/` - Layout components (header, footer)
- `logos/` - Logo and brand components
- `mobile-nav/` - Mobile navigation
- `motion/` - Animation wrapper components
- `nav-link/` - Navigation link components
- `pricing/` - Pricing table components
- `section/` - Section wrapper components
- `seo/` - SEO components
- `testimonials/` - Customer testimonial components
- `typography/` - Text and typography components

### `/data` - Configuration & Content
- `config.tsx` - Site configuration (navigation, footer, SEO)
- `faq.tsx` - FAQ content
- `logo.tsx` - Logo component definitions
- `pricing.tsx` - Pricing plans data
- `testimonials.tsx` - Customer testimonials
- `appulse.tsx` - Additional configuration

### `/hooks` - Custom React Hooks
- `use-route-changed.ts` - Route change detection
- `use-scrollspy.ts` - Scroll position tracking

### `/theme` - Chakra UI Theme
- `index.ts` - Theme configuration entry
- `components/` - Component-specific theme overrides
- `foundations/` - Base theme foundations (colors, fonts, etc.)

### `/posts` - Content (MDX)
- Blog posts or content pages in MDX format

### `/public` - Static Assets
- `static/` - Images, favicons, and other static files

### `/brand` - Brand Guidelines
- Brand documentation and guidelines

## File Naming Conventions
- Components: PascalCase directories with index files
- Hooks: kebab-case with `use-` prefix
- Data files: kebab-case with `.tsx` extension
- Configuration: descriptive names (config, layout, etc.)

## Import Structure
Use path aliases for cleaner imports:
- `#components/` for component imports
- `#hooks/` for custom hooks
- `#data/` for configuration and content
- `#theme` for theme-related imports

## Component Organization
- Each component has its own directory
- Index file exports the main component
- Co-located styles and sub-components when needed
- Consistent use of TypeScript interfaces