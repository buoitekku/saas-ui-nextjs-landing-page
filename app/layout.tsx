import { ColorModeScript, theme } from '@chakra-ui/react'
import type { Metadata } from 'next'

import { Provider } from './provider'
import { GoogleAnalytics, PerformanceMonitoring, ResourcePerformanceTracker } from '#components/analytics'
import { StructuredData } from '#components/seo'

export const metadata: Metadata = {
  metadataBase: new URL('https://safetalk.pl'),
  title: 'Safe Talk - Ochrona przed oszustwami telefonicznymi w czasie rzeczywistym',
  description: 'Aplikacja AI chroniąca przed oszustwami telefonicznymi w czasie rzeczywistym. Wykrywaj podejrzane rozmowy zanim dojdzie do wyłudzenia danych lub pieniędzy.',
  keywords: [
    'ochrona przed oszustwami',
    'oszustwa telefoniczne', 
    'AI wykrywanie oszustw',
    'bezpieczeństwo rozmów',
    'ochrona przed wyłudzeniami',
    'Safe Talk',
    'analiza rozmów',
    'cyberbezpieczeństwo',
    'ochrona seniorów',
    'bezpieczne rozmowy'
  ],
  authors: [{ name: 'Safe Talk Team' }],
  creator: 'Safe Talk',
  publisher: 'Safe Talk',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://safetalk.pl',
    siteName: 'Safe Talk',
    title: 'Safe Talk - Ochrona przed oszustwami telefonicznymi',
    description: 'Aplikacja AI chroniąca przed oszustwami telefonicznymi w czasie rzeczywistym.',
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
    card: 'summary_large_image',
    site: '@SafeTalkPL',
    creator: '@SafeTalkPL',
    title: 'Safe Talk - Ochrona przed oszustwami telefonicznymi',
    description: 'Aplikacja AI chroniąca przed oszustwami telefonicznymi w czasie rzeczywistym.',
    images: ['/static/images/safe-talk-og.jpg'],
  },
  alternates: {
    canonical: 'https://safetalk.pl',
  },
}

export default function Layout(props: { children: React.ReactNode }) {
  const colorMode = theme.config.initialColorMode

  return (
    <html lang="pl" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/manifest.json" />
        <meta name="theme-color" content="#3AB5B2" />
        <meta name="msapplication-TileColor" content="#3AB5B2" />
      </head>
      <body className={`chakra-ui-${colorMode}`}>
        <ColorModeScript initialColorMode={colorMode} />
        <GoogleAnalytics />
        <PerformanceMonitoring />
        <ResourcePerformanceTracker />
        <StructuredData />
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
