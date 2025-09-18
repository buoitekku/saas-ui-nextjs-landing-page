import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { SafeTalkLogoHorizontal } from '#components/safe-talk-logo'
import { 
  RealTimeAnalysisIcon,
  AIDetectionIcon,
  PrivacyProtectionIcon,
  SmartAlertsIcon,
  UniversalProtectionIcon,
  VoiceRecognitionIcon
} from '#components/safe-talk-icons'

// Site configuration with TypeScript interfaces for better type safety
interface SiteConfig {
  logo: React.ComponentType<any>
  seo: NextSeoProps
  termsUrl: string
  privacyUrl: string
  header: {
    links: Array<{
      id?: string
      label: string
      href?: string
      variant?: string
    }>
  }
  footer: {
    copyright: React.ReactNode
    links: Array<{
      href: string
      label: React.ReactNode
      'aria-label': string
    }>
  }
  hero: {
    title: string
    subtitle: string
    cta: {
      primary: { label: string; href: string }
      secondary: { label: string; href: string }
    }
    stats: Array<{ value: string; label: string }>
  }
  features: {
    main: Array<{
      icon: React.ComponentType<any>
      title: string
      description: string
    }>
  }
  audiences: Array<{
    title: string
    description: string
    features: string[]
    cta: string
  }>
  signup: {
    title: string
    features: Array<{
      icon: React.ComponentType<any>
      title: string
      description: string
    }>
  }
}

const siteConfig: SiteConfig = {
  logo: SafeTalkLogoHorizontal,
  seo: {
    title: 'Safe Talk - Ochrona przed oszustwami telefonicznymi w czasie rzeczywistym',
    description: 'Aplikacja AI chroniąca przed oszustwami telefonicznymi w czasie rzeczywistym. Wykrywaj podejrzane rozmowy zanim dojdzie do wyłudzenia danych lub pieniędzy.',
    keywords: [
      // Primary keywords
      'ochrona przed oszustwami telefonicznymi',
      'wykrywanie oszustw AI',
      'Safe Talk aplikacja',
      // Secondary keywords
      'oszustwa na wnuczka',
      'oszustwa bankowe telefon',
      'cyberbezpieczeństwo rozmowy',
      'ochrona seniorów oszustwa',
      'analiza rozmów czasie rzeczywistym',
      // Long-tail keywords
      'jak chronić się przed oszustami telefonicznymi',
      'aplikacja wykrywająca oszustwa telefoniczne',
      'bezpieczne rozmowy telefoniczne AI'
    ],
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      url: 'https://safetalk.pl',
      siteName: 'Safe Talk',
      images: [
        {
          url: '/static/images/safe-talk-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Safe Talk - Ochrona przed oszustwami telefonicznymi',
        },
      ],
    },
    twitter: {
      handle: '@SafeTalkPL',
      site: '@SafeTalkPL',
      cardType: 'summary_large_image',
    },
  } as NextSeoProps,
  termsUrl: '/regulamin',
  privacyUrl: '/polityka-prywatnosci',
  header: {
    links: [
      {
        id: 'features',
        label: 'Funkcje',
      },
      {
        id: 'security',
        label: 'Bezpieczeństwo',
      },
      {
        id: 'pricing',
        label: 'Cennik',
      },
      {
        id: 'faq',
        label: 'FAQ',
      },
      {
        label: 'Kontakt',
        href: '#contact',
      },
      {
        label: 'Pobierz aplikację',
        href: '#download',
        variant: 'safe-talk-primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        © 2024 Safe Talk. Wszystkie prawa zastrzeżone.{' '}
        <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
        {' • '}
        <Link href="/regulamin">Regulamin</Link>
      </>
    ),
    links: [
      {
        href: 'mailto:kontakt@safetalk.pl',
        label: <FaEnvelope size="16" />,
        'aria-label': 'Email kontaktowy',
      },
      {
        href: 'tel:+48123456789',
        label: <FaPhone size="16" />,
        'aria-label': 'Telefon kontaktowy',
      },
      {
        href: 'https://linkedin.com/company/safetalk',
        label: <FaLinkedin size="16" />,
        'aria-label': 'LinkedIn Safe Talk',
      },
      {
        href: 'https://twitter.com/SafeTalkPL',
        label: <FaTwitter size="16" />,
        'aria-label': 'Twitter Safe Talk',
      },
    ],
  },
  // Hero section content
  hero: {
    title: 'Chroń się przed oszustwami telefonicznymi w czasie rzeczywistym',
    subtitle: 'Safe Talk wykorzystuje sztuczną inteligencję do analizy rozmów i ostrzega Cię przed oszustami, zanim dojdzie do wyłudzenia. Ochrona działa w czasie rzeczywistym, nie po fakcie.',
    cta: {
      primary: {
        label: 'Pobierz Safe Talk',
        href: '#download',
      },
      secondary: {
        label: 'Zobacz jak działa',
        href: '#demo',
      },
    },
    stats: [
      {
        value: '95%',
        label: 'skuteczności wykrywania oszustw',
      },
      {
        value: '< 1s',
        label: 'czas reakcji systemu',
      },
      {
        value: '100%',
        label: 'prywatności rozmów',
      },
    ],
  },
  // Features for different sections
  features: {
    main: [
      {
        icon: RealTimeAnalysisIcon,
        title: 'Analiza w czasie rzeczywistym',
        description: 'System analizuje rozmowę podczas jej trwania i ostrzega przed podejrzanymi treściami natychmiast, nie po zakończeniu połączenia.',
      },
      {
        icon: AIDetectionIcon,
        title: 'AI wykrywanie oszustw',
        description: 'Zaawansowane algorytmy uczenia maszynowego rozpoznają wzorce typowe dla oszustów telefonicznych i wyłudzeń.',
      },
      {
        icon: PrivacyProtectionIcon,
        title: 'Pełna prywatność',
        description: 'Twoje rozmowy są analizowane lokalnie na urządzeniu. Nie przechowujemy ani nie udostępniamy treści rozmów.',
      },
      {
        icon: SmartAlertsIcon,
        title: 'Transparentne działanie',
        description: 'Dokładnie wyjaśniamy jak działa nasz system i jakie dane są przetwarzane. Żadnych ukrytych funkcji.',
      },
      {
        icon: UniversalProtectionIcon,
        title: 'Ochrona całej rodziny',
        description: 'Szczególnie skuteczny w ochronie seniorów i osób mniej doświadczonych technologicznie przed oszustami.',
      },
      {
        icon: VoiceRecognitionIcon,
        title: 'Łatwa instalacja',
        description: 'Prosta aplikacja mobilna, która działa w tle i nie wymaga skomplikowanej konfiguracji.',
      },
    ],
  },
  // Target audiences
  audiences: [
    {
      title: 'Osoby prywatne',
      description: 'Chroń siebie i swoich bliskich przed oszustami telefonicznymi',
      features: ['Ochrona seniorów', 'Wykrywanie wyłudzeń', 'Proste w użyciu'],
      cta: 'Pobierz dla rodziny',
    },
    {
      title: 'Firmy',
      description: 'Zabezpiecz swoich pracowników przed oszustwami biznesowymi',
      features: ['Ochrona danych firmowych', 'Szkolenia zespołu', 'Raportowanie incydentów'],
      cta: 'Rozwiązania B2B',
    },
    {
      title: 'Instytucje',
      description: 'Kompleksowe rozwiązania dla dużych organizacji',
      features: ['Compliance', 'Integracje systemowe', 'Dedykowane wsparcie'],
      cta: 'Kontakt enterprise',
    },
  ],
  signup: {
    title: 'Dołącz do Safe Talk',
    features: [
      {
        icon: RealTimeAnalysisIcon,
        title: 'Ochrona w czasie rzeczywistym',
        description: 'System ostrzega przed oszustami podczas trwania rozmowy, gdy jeszcze możesz się bronić.',
      },
      {
        icon: PrivacyProtectionIcon,
        title: 'Prywatność gwarantowana',
        description: 'Twoje rozmowy pozostają prywatne. Analiza odbywa się lokalnie na Twoim urządzeniu.',
      },
      {
        icon: AIDetectionIcon,
        title: 'Natychmiastowa reakcja',
        description: 'Algorytmy AI reagują w czasie krótszym niż sekunda od wykrycia zagrożenia.',
      },
      {
        icon: UniversalProtectionIcon,
        title: 'Dla całej rodziny',
        description: 'Szczególnie skuteczny w ochronie seniorów i osób mniej doświadczonych technologicznie.',
      },
    ],
  },
}

export default siteConfig
