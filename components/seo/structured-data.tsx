'use client'

import Script from 'next/script'

// Organization structured data
const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Safe Talk",
  "alternateName": "Safe Talk Sp. z o.o.",
  "url": "https://safetalk.pl",
  "logo": "https://safetalk.pl/static/images/safe-talk-logo-horizontal.svg",
  "description": "Aplikacja AI chroniąca przed oszustwami telefonicznymi w czasie rzeczywistym. Wykrywaj podejrzane rozmowy zanim dojdzie do wyłudzenia danych lub pieniędzy.",
  "foundingDate": "2024",
  "founders": [
    {
      "@type": "Person",
      "name": "Anna Kowalska",
      "jobTitle": "CEO & Współzałożycielka"
    },
    {
      "@type": "Person", 
      "name": "Michał Nowak",
      "jobTitle": "CTO & Współzałożyciel"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Technologiczna 1",
    "addressLocality": "Warszawa",
    "postalCode": "00-001",
    "addressCountry": "PL"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+48-123-456-789",
    "contactType": "customer service",
    "email": "kontakt@safetalk.pl",
    "availableLanguage": "Polish"
  },
  "sameAs": [
    "https://linkedin.com/company/safetalk",
    "https://twitter.com/SafeTalkPL",
    "https://facebook.com/safetalk.pl"
  ],
  "industry": "Cybersecurity",
  "numberOfEmployees": "2-10",
  "areaServed": "Poland"
}

// Software Application structured data
const softwareApplicationData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Safe Talk",
  "description": "Aplikacja AI chroniąca przed oszustwami telefonicznymi w czasie rzeczywistym. Wykrywaj podejrzane rozmowy zanim dojdzie do wyłudzenia danych lub pieniędzy.",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": ["Android", "iOS"],
  "offers": [
    {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "PLN",
      "name": "Darmowy",
      "description": "Podstawowa ochrona przed oszustwami dla użytkowników indywidualnych"
    },
    {
      "@type": "Offer", 
      "price": "19",
      "priceCurrency": "PLN",
      "name": "Premium",
      "description": "Zaawansowana ochrona z dodatkowymi funkcjami",
      "billingIncrement": "P1M"
    },
    {
      "@type": "Offer",
      "price": "99", 
      "priceCurrency": "PLN",
      "name": "Biznes",
      "description": "Kompleksowe rozwiązanie dla firm i organizacji",
      "billingIncrement": "P1M"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1247",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Organization",
    "name": "Safe Talk"
  },
  "publisher": {
    "@type": "Organization", 
    "name": "Safe Talk"
  },
  "screenshot": "https://safetalk.pl/static/images/safe-talk-app-mockup.svg",
  "featureList": [
    "Analiza rozmów w czasie rzeczywistym",
    "Wykrywanie oszustów AI",
    "Ochrona prywatności",
    "Inteligentne ostrzeżenia",
    "Rozpoznawanie głosu",
    "Ochrona dla całej rodziny"
  ],
  "requirements": "Android 8.0+ lub iOS 13.0+",
  "softwareVersion": "1.0.0",
  "datePublished": "2024-12-01",
  "inLanguage": "pl-PL",
  "copyrightYear": "2024",
  "copyrightHolder": {
    "@type": "Organization",
    "name": "Safe Talk"
  }
}

// Website structured data
const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Safe Talk - Ochrona przed oszustwami telefonicznymi",
  "alternateName": "Safe Talk",
  "url": "https://safetalk.pl",
  "description": "Aplikacja AI chroniąca przed oszustwami telefonicznymi w czasie rzeczywistym",
  "inLanguage": "pl-PL",
  "publisher": {
    "@type": "Organization",
    "name": "Safe Talk"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://safetalk.pl/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

// FAQ structured data - dynamically generated from FAQ data
const createFAQStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Jak działa analiza rozmów w czasie rzeczywistym?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safe Talk analizuje dźwięk rozmowy na Twoim urządzeniu używając algorytmów sztucznej inteligencji. System rozpoznaje wzorce mowy i treści typowe dla oszustów, ostrzegając Cię natychmiast gdy wykryje zagrożenie. Cały proces odbywa się lokalnie - Twoje rozmowy nie są wysyłane do internetu."
      }
    },
    {
      "@type": "Question",
      "name": "Czy Safe Talk nagrywa moje rozmowy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nie, Safe Talk nie nagrywa ani nie przechowuje Twoich rozmów. System analizuje dźwięk w czasie rzeczywistym i natychmiast go usuwa. Jedyne co pozostaje to informacja o wykrytym zagrożeniu (bez treści rozmowy)."
      }
    },
    {
      "@type": "Question",
      "name": "Ile kosztuje korzystanie z Safe Talk?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Planujemy model freemium - podstawowa ochrona będzie darmowa dla wszystkich użytkowników. Zaawansowane funkcje jak szczegółowe raporty, ochrona dla firm czy priorytetowe wsparcie będą dostępne w planach płatnych od 19 zł miesięcznie."
      }
    },
    {
      "@type": "Question",
      "name": "Czy Safe Talk oferuje rozwiązania dla firm?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak, oferujemy dedykowane rozwiązania dla firm i instytucji. Pakiet biznesowy obejmuje: centralne zarządzanie, szczegółowe raporty, szkolenia dla pracowników oraz priorytetowe wsparcie techniczne."
      }
    }
  ]
})

const faqData = createFAQStructuredData()

export const StructuredData: React.FC = () => {
  return (
    <>
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <Script
        id="software-application-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationData),
        }}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
    </>
  )
}