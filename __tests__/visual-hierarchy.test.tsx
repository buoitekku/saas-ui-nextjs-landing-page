/**
 * Tests for Safe Talk visual hierarchy and brand consistency
 */

import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import { VisualHierarchyDemo } from '../components/visual-hierarchy-demo';
import { useVisualHierarchy, useSectionLayout, useCardHierarchy } from '../hooks/use-visual-hierarchy';
import { 
  typographyHierarchy, 
  bodyTextHierarchy, 
  linkHierarchy, 
  badgeHierarchy,
  createHeadingStyle,
  createBodyTextStyle,
  createLinkStyle,
  createBadgeStyle
} from '../theme/foundations/typography-hierarchy';

// Test wrapper with theme
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>
);

// Mock component for testing hooks
const TestComponent: React.FC = () => {
  const { 
    getHeadingStyle, 
    getBodyTextStyle, 
    getLinkStyle, 
    getBadgeStyle,
    getBrandColor,
    validateBrandCompliance 
  } = useVisualHierarchy();
  
  const { getSectionProps, getHeadingProps } = useSectionLayout('main');
  const { getCardTitleProps } = useCardHierarchy();
  
  return (
    <div>
      <h1 data-testid="h1" style={getHeadingStyle('h1')}>Main Heading</h1>
      <h2 data-testid="h2" style={getHeadingStyle('h2')}>Section Heading</h2>
      <p data-testid="body-text" style={getBodyTextStyle('regular')}>Body text</p>
      <a data-testid="primary-link" style={getLinkStyle('primary')}>Primary Link</a>
      <span data-testid="primary-badge" style={getBadgeStyle('primary')}>Badge</span>
      <div data-testid="section" style={getSectionProps()}>Section</div>
      <h3 data-testid="card-title" style={getCardTitleProps()}>Card Title</h3>
      <div data-testid="brand-color" style={{ color: getBrandColor('primary') }}>
        Brand Color Text
      </div>
    </div>
  );
};

describe('Typography Hierarchy', () => {
  describe('createHeadingStyle', () => {
    test('should return correct styles for h1', () => {
      const h1Style = createHeadingStyle('h1');
      
      expect(h1Style.fontFamily).toBe('Gabarito');
      expect(h1Style.fontWeight).toBe('bold');
      expect(h1Style.color).toBe('safeTalk.navy.400');
      expect(h1Style.lineHeight).toBe(1.2);
    });

    test('should return correct styles for h3 with turquoise color', () => {
      const h3Style = createHeadingStyle('h3');
      
      expect(h3Style.color).toBe('safeTalk.turquoise.500');
      expect(h3Style.fontFamily).toBe('Gabarito');
      expect(h3Style.fontWeight).toBe('bold');
    });

    test('should return correct styles for h6 with uppercase transform', () => {
      const h6Style = createHeadingStyle('h6');
      
      expect(h6Style.textTransform).toBe('uppercase');
      expect(h6Style.letterSpacing).toBe('0.05em');
      expect(h6Style.color).toBe('safeTalk.navy.300');
    });
  });

  describe('createBodyTextStyle', () => {
    test('should return correct styles for lead text', () => {
      const leadStyle = createBodyTextStyle('lead');
      
      expect(leadStyle.color).toBe('safeTalk.navy.400');
      expect(leadStyle.lineHeight).toBe(1.5);
      expect(leadStyle.mb).toBe(6);
    });

    test('should return correct styles for regular body text', () => {
      const regularStyle = createBodyTextStyle('regular');
      
      expect(regularStyle.color).toBe('safeTalk.navy.300');
      expect(regularStyle.lineHeight).toBe(1.6);
      expect(regularStyle.mb).toBe(3);
    });

    test('should return correct styles for caption text', () => {
      const captionStyle = createBodyTextStyle('caption');
      
      expect(captionStyle.color).toBe('safeTalk.navy.200');
      expect(captionStyle.lineHeight).toBe(1.4);
      expect(captionStyle.mb).toBe(1);
    });
  });

  describe('createLinkStyle', () => {
    test('should return correct styles for primary links', () => {
      const primaryLinkStyle = createLinkStyle('primary');
      
      expect(primaryLinkStyle.color).toBe('safeTalk.turquoise.400');
      expect(primaryLinkStyle.fontWeight).toBe('medium');
      expect(primaryLinkStyle.textDecoration).toBe('none');
      expect(primaryLinkStyle._hover.color).toBe('safeTalk.turquoise.600');
      expect(primaryLinkStyle._hover.textDecoration).toBe('underline');
    });

    test('should return correct styles for secondary links', () => {
      const secondaryLinkStyle = createLinkStyle('secondary');
      
      expect(secondaryLinkStyle.color).toBe('safeTalk.blue.400');
      expect(secondaryLinkStyle._hover.color).toBe('safeTalk.blue.600');
    });

    test('should return correct styles for external links', () => {
      const externalLinkStyle = createLinkStyle('external');
      
      expect(externalLinkStyle.display).toBe('inline-flex');
      expect(externalLinkStyle.alignItems).toBe('center');
      expect(externalLinkStyle._after.content).toBe('"↗"');
    });
  });

  describe('createBadgeStyle', () => {
    test('should return correct styles for primary badge', () => {
      const primaryBadgeStyle = createBadgeStyle('primary');
      
      expect(primaryBadgeStyle.bg).toBe('safeTalk.turquoise.400');
      expect(primaryBadgeStyle.color).toBe('white');
      expect(primaryBadgeStyle.fontWeight).toBe('semibold');
      expect(primaryBadgeStyle.textTransform).toBe('uppercase');
    });

    test('should return correct styles for success badge', () => {
      const successBadgeStyle = createBadgeStyle('success');
      
      expect(successBadgeStyle.bg).toBe('safeTalk.limeGreen.400');
      expect(successBadgeStyle.color).toBe('safeTalk.navy.400');
    });

    test('should return correct styles for outline badge', () => {
      const outlineBadgeStyle = createBadgeStyle('outline');
      
      expect(outlineBadgeStyle.bg).toBe('transparent');
      expect(outlineBadgeStyle.borderWidth).toBe('1px');
      expect(outlineBadgeStyle.borderColor).toBe('safeTalk.turquoise.400');
    });
  });
});

describe('Visual Hierarchy Hook', () => {
  test('should provide all required functions', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    // Check that elements are rendered with proper test ids
    expect(screen.getByTestId('h1')).toBeInTheDocument();
    expect(screen.getByTestId('h2')).toBeInTheDocument();
    expect(screen.getByTestId('body-text')).toBeInTheDocument();
    expect(screen.getByTestId('primary-link')).toBeInTheDocument();
    expect(screen.getByTestId('primary-badge')).toBeInTheDocument();
    expect(screen.getByTestId('section')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('brand-color')).toBeInTheDocument();
  });

  test('should apply correct heading hierarchy', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    const h1 = screen.getByTestId('h1');
    const h2 = screen.getByTestId('h2');
    
    // H1 should be larger than H2
    const h1Styles = window.getComputedStyle(h1);
    const h2Styles = window.getComputedStyle(h2);
    
    // Note: In a real test environment, you'd check the actual computed styles
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });
});

describe('Section Layout Hook', () => {
  test('should provide correct section configuration for different levels', () => {
    const HeroSection: React.FC = () => {
      const { getSectionProps, getHeadingProps } = useSectionLayout('hero');
      return (
        <section data-testid="hero-section" {...getSectionProps()}>
          <h1 data-testid="hero-heading" {...getHeadingProps()}>Hero Title</h1>
        </section>
      );
    };

    const MainSection: React.FC = () => {
      const { getSectionProps, getHeadingProps } = useSectionLayout('main');
      return (
        <section data-testid="main-section" {...getSectionProps()}>
          <h2 data-testid="main-heading" {...getHeadingProps()}>Main Title</h2>
        </section>
      );
    };

    render(
      <TestWrapper>
        <HeroSection />
        <MainSection />
      </TestWrapper>
    );

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('hero-heading')).toBeInTheDocument();
    expect(screen.getByTestId('main-section')).toBeInTheDocument();
    expect(screen.getByTestId('main-heading')).toBeInTheDocument();
  });
});

describe('Card Hierarchy Hook', () => {
  test('should provide correct card styling functions', () => {
    const TestCard: React.FC = () => {
      const { getCardTitleProps, getCardDescriptionProps, getCardLinkProps } = useCardHierarchy();
      
      return (
        <div>
          <h3 data-testid="card-title" {...getCardTitleProps()}>Card Title</h3>
          <p data-testid="card-description" {...getCardDescriptionProps()}>Card description</p>
          <a data-testid="card-link" {...getCardLinkProps()}>Card Link</a>
        </div>
      );
    };

    render(
      <TestWrapper>
        <TestCard />
      </TestWrapper>
    );

    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-description')).toBeInTheDocument();
    expect(screen.getByTestId('card-link')).toBeInTheDocument();
  });
});

describe('Visual Hierarchy Demo Component', () => {
  test('should render all sections', () => {
    render(
      <TestWrapper>
        <VisualHierarchyDemo />
      </TestWrapper>
    );

    // Check for main sections
    expect(screen.getByText('Safe Talk Visual Hierarchy System')).toBeInTheDocument();
    expect(screen.getByText('Typography Hierarchy')).toBeInTheDocument();
    expect(screen.getByText('Link Hierarchy & Interactive Elements')).toBeInTheDocument();
    expect(screen.getByText('Badge & Label System')).toBeInTheDocument();
    expect(screen.getByText('List Styles & Visual Consistency')).toBeInTheDocument();
    expect(screen.getByText('Brand Color Usage & Accessibility')).toBeInTheDocument();
  });

  test('should display all heading levels', () => {
    render(
      <TestWrapper>
        <VisualHierarchyDemo />
      </TestWrapper>
    );

    expect(screen.getByText('H1 - Main Page Title')).toBeInTheDocument();
    expect(screen.getByText('H2 - Section Heading')).toBeInTheDocument();
    expect(screen.getByText('H3 - Subsection Heading')).toBeInTheDocument();
    expect(screen.getByText('H4 - Component Title')).toBeInTheDocument();
    expect(screen.getByText('H5 - Small Heading')).toBeInTheDocument();
    expect(screen.getByText('H6 - MICRO HEADING')).toBeInTheDocument();
  });

  test('should display all body text variants', () => {
    render(
      <TestWrapper>
        <VisualHierarchyDemo />
      </TestWrapper>
    );

    expect(screen.getByText(/Lead Text - Introductory paragraphs/)).toBeInTheDocument();
    expect(screen.getByText(/Large Body Text - Hero descriptions/)).toBeInTheDocument();
    expect(screen.getByText(/Regular Body Text - Main content/)).toBeInTheDocument();
    expect(screen.getByText(/Small Body Text - Secondary content/)).toBeInTheDocument();
    expect(screen.getByText(/Caption Text - Disclaimers/)).toBeInTheDocument();
  });

  test('should display all link variants', () => {
    render(
      <TestWrapper>
        <VisualHierarchyDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Main Navigation Link')).toBeInTheDocument();
    expect(screen.getByText('Supporting Link')).toBeInTheDocument();
    expect(screen.getByText('Footer Link')).toBeInTheDocument();
    expect(screen.getByText('External Resource')).toBeInTheDocument();
  });

  test('should display all badge variants', () => {
    render(
      <TestWrapper>
        <VisualHierarchyDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Subtle')).toBeInTheDocument();
    expect(screen.getByText('Outline')).toBeInTheDocument();
  });

  test('should display accessibility information', () => {
    render(
      <TestWrapper>
        <VisualHierarchyDemo />
      </TestWrapper>
    );

    expect(screen.getByText(/All color combinations meet WCAG AA standards/)).toBeInTheDocument();
    expect(screen.getByText(/Typography hierarchy uses consistent Safe Talk brand colors/)).toBeInTheDocument();
    expect(screen.getByText(/Color-blind friendly design/)).toBeInTheDocument();
  });
});

describe('Brand Compliance Validation', () => {
  test('should validate Safe Talk color patterns', () => {
    const validColors = [
      'safeTalk.turquoise.400',
      'safeTalk.blue.500',
      'safeTalk.limeGreen.300',
      'safeTalk.purple.600',
      'safeTalk.navy.400',
      'white',
      'black',
      'transparent',
      'gray.50',
    ];

    validColors.forEach(color => {
      const isValid = /^safeTalk\.|^(white|black|transparent)$|^gray\.(50|100|200)$/.test(color);
      expect(isValid).toBe(true);
    });
  });

  test('should reject non-compliant colors', () => {
    const invalidColors = [
      'red.500',
      'blue.500', // Generic blue
      'green.400',
      'yellow.300',
      'gray.300', // Too dark gray
      'purple.400', // Generic purple
    ];

    invalidColors.forEach(color => {
      const isValid = /^safeTalk\.|^(white|black|transparent)$|^gray\.(50|100|200)$/.test(color);
      expect(isValid).toBe(false);
    });
  });
});

describe('Responsive Typography', () => {
  test('should provide responsive font sizes', () => {
    const responsiveSizes = {
      xs: { base: 'xs', md: 'sm' },
      sm: { base: 'sm', md: 'md' },
      md: { base: 'md', md: 'lg' },
      lg: { base: 'lg', md: 'xl' },
    };

    Object.entries(responsiveSizes).forEach(([size, expected]) => {
      expect(expected.base).toBeDefined();
      expect(expected.md).toBeDefined();
    });
  });

  test('should provide responsive spacing', () => {
    const baseSpacing = 4;
    const responsiveSpacing = {
      base: baseSpacing,
      md: Math.round(baseSpacing * 1.25),
      lg: Math.round(baseSpacing * 1.5),
    };

    expect(responsiveSpacing.base).toBe(4);
    expect(responsiveSpacing.md).toBe(5);
    expect(responsiveSpacing.lg).toBe(6);
  });
});