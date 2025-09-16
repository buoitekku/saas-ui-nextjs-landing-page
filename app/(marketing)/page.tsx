'use client'

import {
  Box,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { Br } from '@saas-ui/react'
import type { NextPage } from 'next'
import { 
  RealTimeAnalysisIcon,
  AIDetectionIcon,
  PrivacyProtectionIcon,
  SmartAlertsIcon,
  VoiceRecognitionIcon,
  UniversalProtectionIcon
} from '#components/safe-talk-icons'

import * as React from 'react'

import { lazy, Suspense } from 'react'

// Lazy load analytics components for better performance
const ScrollDepthTracker = lazy(() => 
  import('#components/analytics/conversion-tracking').then(m => ({ default: m.ScrollDepthTracker }))
)
const TimeOnPageTracker = lazy(() => 
  import('#components/analytics/conversion-tracking').then(m => ({ default: m.TimeOnPageTracker }))
)
import { AppShowcase } from '#components/app-showcase'
import { Contact } from '#components/contact'
import { EnhancedFaq } from '#components/faq'
import { FeatureDemos } from '#components/feature-demos'
import { FocusDemo } from '#components/focus-demo'
import { VisualHierarchyDemo } from '#components/visual-hierarchy-demo'
import { StatusDemo } from '#components/status-demo'
import { MobileOptimization } from '#components/mobile-optimization'
import { Features } from '#components/features'
import { SafeTalkHero, HeroBenefits } from '#components/hero'
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '#components/highlights'
import { FallInPlace } from '#components/motion/fall-in-place'
import { ProblemSolution } from '#components/problem-solution/problem-solution'
import { Pricing } from '#components/pricing/pricing'
import { TargetAudience } from '#components/target-audience'
import { Team } from '#components/team'
import { Testimonial, Testimonials } from '#components/testimonials'
import { TrustSecurity } from '#components/trust-security'
import { Em } from '#components/typography'
import { StaggerContainer, StaggerItem, HoverLift } from '#components/motion'
import faq from '#data/faq'
import pricing from '#data/pricing'
import testimonials from '#data/testimonials'

// Metadata will be handled by layout.tsx and config
// export const meta: Metadata = {
//   title: 'Saas UI Landingspage',
//   description: 'Free SaaS landingspage starter kit',
// }

const Home: NextPage = () => {
  return (
    <Box>
      <MobileOptimization />
      <Suspense fallback={null}>
        <ScrollDepthTracker />
        <TimeOnPageTracker />
      </Suspense>
      
      <HeroSection />

      <ProblemSolutionSection />

      <FeaturesSection />

      <AppShowcase />

      <FeatureDemos />

      <TargetAudienceSection />

      <TrustSecuritySection />

      <TeamSection />

      <TestimonialsSection />

      <PricingSection />

      <FaqSection />

      <FocusDemo />

      <VisualHierarchyDemo />

      <StatusDemo />

      <ContactSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <>
      <SafeTalkHero />
      <HeroBenefits />
    </>
  )
}

const ProblemSolutionSection: React.FC = () => {
  return <ProblemSolution />
}

const TargetAudienceSection: React.FC = () => {
  return <TargetAudience />
}

const TrustSecuritySection: React.FC = () => {
  return <TrustSecurity />
}

const TeamSection: React.FC = () => {
  return <Team />
}

const HighlightsSection = () => {
  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Dlaczego Safe Talk?">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Safe Talk to <Em>pierwsza w Polsce aplikacja</Em> oferująca ochronę przed 
            oszustwami telefonicznymi w czasie rzeczywistym. Nasze rozwiązanie wykorzystuje 
            najnowsze technologie AI i uczenia maszynowego.
          </Text>

          <VStack alignItems="flex-start" spacing="4" w="full">
            <HStack spacing="3">
              <RealTimeAnalysisIcon size={20} />
              <Text fontWeight="semibold">Ochrona w czasie rzeczywistym</Text>
            </HStack>
            <HStack spacing="3">
              <AIDetectionIcon size={20} />
              <Text fontWeight="semibold">Reakcja w czasie &lt;1 sekundy</Text>
            </HStack>
            <HStack spacing="3">
              <PrivacyProtectionIcon size={20} />
              <Text fontWeight="semibold">100% prywatności rozmów</Text>
            </HStack>
          </VStack>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Sprawdzona technologia">
        <Text color="muted" fontSize="lg">
          Nasze algorytmy zostały wytrenowane na tysiącach przykładów oszustw 
          telefonicznych z Polski. System stale się uczy i dostosowuje do nowych 
          technik stosowanych przez przestępców.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Renata Alink"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={['pink.200', 'purple.500']}
      >
        “Saas UI helped us set up a beautiful modern UI in no time. It saved us
        hundreds of hours in development time and allowed us to focus on
        business logic for our specific use-case from the start.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Start your next idea two steps ahead"
      >
        <Text color="muted" fontSize="lg">
          We took care of all your basic frontend needs, so you can start
          building functionality that makes your product unique.
        </Text>
        <Wrap mt="8">
          {[
            'authentication',
            'navigation',
            'crud',
            'settings',
            'multi-tenancy',
            'layouts',
            'billing',
            'a11y testing',
            'server-side rendering',
            'documentation',
            'onboarding',
            'storybooks',
            'theming',
            'upselling',
            'unit testing',
            'feature flags',
            'responsiveness',
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  )
}

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="center"
          as="p"
          fontFamily="Gabarito"
          fontWeight="bold"
        >
          Zaawansowana ochrona
          <Br /> w czasie rzeczywistym
        </Heading>
      }
      description={
        <>
          Safe Talk wykorzystuje najnowsze technologie AI do wykrywania oszustw telefonicznych.
          <Br />
          Nasza aplikacja chroni Cię przed stratami finansowymi i kradzieżą danych osobowych.
        </>
      }
      align="center"
      columns={[1, 2, 3]}
      iconSize={6}
      reveal={FallInPlace}
      features={[
        {
          title: 'Analiza w czasie rzeczywistym',
          icon: RealTimeAnalysisIcon,
          description:
            'Rozmowy są analizowane na bieżąco podczas trwania połączenia. Otrzymujesz ostrzeżenie zanim oszust zdąży Cię oszukać.',
          variant: 'inline',
          delay: 0.1,
        },
        {
          title: 'Wykrywanie AI',
          icon: AIDetectionIcon,
          description:
            'Zaawansowane algorytmy uczenia maszynowego rozpoznają wzorce oszustów i nietypowe zachowania rozmówców.',
          variant: 'inline',
          delay: 0.2,
        },
        {
          title: 'Ochrona prywatności',
          icon: PrivacyProtectionIcon,
          description:
            'Twoje rozmowy są analizowane lokalnie na urządzeniu. Nie przechowujemy nagrań ani danych osobowych.',
          variant: 'inline',
          delay: 0.3,
        },
        {
          title: 'Inteligentne ostrzeżenia',
          icon: SmartAlertsIcon,
          description:
            'System wysyła dyskretne powiadomienia o potencjalnym zagrożeniu bez przerywania rozmowy.',
          variant: 'inline',
          delay: 0.4,
        },
        {
          title: 'Rozpoznawanie głosu',
          icon: VoiceRecognitionIcon,
          description:
            'Technologia analizy głosu wykrywa emocjonalne manipulacje i techniki wywierania presji.',
          variant: 'inline',
          delay: 0.5,
        },
        {
          title: 'Ochrona dla wszystkich',
          icon: UniversalProtectionIcon,
          description:
            'Aplikacja jest zaprojektowana tak, aby chronić osoby w każdym wieku - od seniorów po młodych dorosłych.',
          variant: 'inline',
          delay: 0.6,
        },
      ]}
    />
  )
}

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t)

        return columns
      },
      [[], [], []],
    )
  }, [])

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <StaggerContainer key={i} staggerDelay={0.2} delayChildren={i * 0.1}>
            <Stack spacing="8">
              {column.map((t, j) => (
                <StaggerItem key={j}>
                  <HoverLift>
                    <Testimonial {...t} />
                  </HoverLift>
                </StaggerItem>
              ))}
            </Stack>
          </StaggerContainer>
        ))}
      </>
    </Testimonials>
  )
}

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
    </Pricing>
  )
}

const FaqSection = () => {
  return <EnhancedFaq {...faq} />
}

const ContactSection: React.FC = () => {
  return <Contact />
}

export default Home
