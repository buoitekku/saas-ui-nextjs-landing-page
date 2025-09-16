# Safe Talk - Landing Page

Profesjonalna strona landing page dla Safe Talk - aplikacji AI chroniącej przed oszustwami telefonicznymi w czasie rzeczywistym.

## 🚀 Opis Projektu

Safe Talk to innowacyjna aplikacja wykorzystująca sztuczną inteligencję do analizy rozmów telefonicznych w czasie rzeczywistym i ostrzegania użytkowników przed potencjalnymi oszustwami. Ta strona landing page służy jako główny punkt kontaktu dla potencjalnych klientów - osób prywatnych, firm i instytucji.

## ✨ Kluczowe Funkcje

### 🎨 Design i UX
- **Responsywny design** - działa perfekcyjnie na wszystkich urządzeniach (320px+)
- **Safe Talk branding** - dedykowana paleta kolorów i typografia
- **Animacje i micro-interactions** - płynne animacje Framer Motion
- **Accessibility** - zgodność z standardami dostępności

### 📱 Sekcje Strony
- **Hero Section** - główny przekaz z CTA i statystykami
- **Problem-Solution** - dwukolumnowy layout z polskimi statystykami oszustw
- **Features Grid** - 6 kluczowych funkcji Safe Talk z animacjami
- **Target Audience** - 3 grupy docelowe (osoby prywatne, firmy, instytucje)
- **Trust & Security** - transparentność i certyfikaty bezpieczeństwa
- **Team** - prezentacja zespołu i misji firmy
- **FAQ** - 12 pytań z wyszukiwaniem i kategoriami
- **Contact** - formularz kontaktowy z walidacją

### 🔧 Funkcjonalności Techniczne
- **Form Handling** - API routes z walidacją Zod
- **Analytics** - Google Analytics 4 z Core Web Vitals
- **SEO** - structured data, sitemap, robots.txt
- **Performance** - optymalizacja obrazów i lazy loading

## 🛠️ Stack Technologiczny

### Core
- **Next.js 14** z App Router
- **React 18** z TypeScript
- **Chakra UI** + **Saas UI** - komponenty UI
- **Framer Motion** - animacje
- **pnpm** - package manager

### Kluczowe Zależności
- `@chakra-ui/react` - framework UI
- `@saas-ui/react` - zaawansowane komponenty SaaS
- `framer-motion` - biblioteka animacji
- `zod` - walidacja formularzy
- `react-icons` - ikony

## 🚀 Uruchomienie Projektu

### Wymagania
- Node.js 18+
- pnpm (zalecane)

### Instalacja
```bash
# Klonowanie repozytorium
git clone [repository-url]
cd safe-talk-landing-page

# Instalacja zależności
pnpm install

# Uruchomienie serwera deweloperskiego
pnpm dev
```

### Konfiguracja Environment Variables
Skopiuj `.env.example` do `.env.local` i skonfiguruj:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Ads Conversion Tracking (opcjonalne)
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
```

### Dostępne Komendy
```bash
pnpm dev          # Serwer deweloperski (http://localhost:3000)
pnpm build        # Build produkcyjny
pnpm start        # Uruchomienie build produkcyjnego
pnpm lint         # Linting kodu
```

## 📁 Struktura Projektu

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Strony autoryzacji
│   ├── (marketing)/       # Strona główna
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Komponenty React
│   ├── analytics/         # Google Analytics i tracking
│   ├── contact/           # Formularz kontaktowy
│   ├── faq/              # FAQ z wyszukiwaniem
│   ├── hero/             # Sekcja hero
│   ├── motion/           # Komponenty animacji
│   ├── problem-solution/ # Sekcja problem-rozwiązanie
│   ├── target-audience/  # Grupy docelowe
│   ├── team/             # Prezentacja zespołu
│   ├── trust-security/   # Bezpieczeństwo i zaufanie
│   └── ...
├── data/                 # Konfiguracja i treści
├── hooks/                # Custom React hooks
├── theme/                # Chakra UI theme
└── public/               # Statyczne pliki
```

## 🎯 Grupy Docelowe

### 👥 Osoby Prywatne
- Ochrona przed oszustwami "na wnuczka"
- Wykrywanie fałszywych połączeń z banków
- Łatwa instalacja i użytkowanie

### 🏢 Firmy
- Ochrona przed social engineeringiem
- Centralne zarządzanie i raportowanie
- Compliance z RODO

### 🏛️ Instytucje
- Skalowalne rozwiązania
- Wsparcie techniczne 24/7
- Zgodność z przepisami bezpieczeństwa

## 📊 Analytics i Tracking

### Google Analytics 4
- Automatyczne śledzenie stron
- Core Web Vitals monitoring
- Scroll depth tracking
- Time on page analytics

### Conversion Tracking
- CTA clicks
- Form submissions
- Waitlist signups
- Demo requests
- Business inquiries

## 🔒 Bezpieczeństwo i Prywatność

- **Lokalne przetwarzanie** - analiza na urządzeniu użytkownika
- **Szyfrowanie end-to-end** - AES-256
- **Transparentność danych** - jasna polityka prywatności
- **RODO compliance** - zgodność z polskim prawem
- **Infrastruktura w Polsce** - serwery w kraju

## 📈 Performance

- **Lighthouse Score**: 95+ (wszystkie metryki)
- **Core Web Vitals**: Optymalne wartości LCP, FID, CLS
- **Bundle Size**: ~278kB (First Load JS)
- **Image Optimization**: Next.js Image z lazy loading
- **Mobile Performance**: Zoptymalizowane dla urządzeń mobilnych

## 🌐 SEO i Lokalizacja

### SEO
- Structured data (Organization, Product)
- Comprehensive meta tags
- XML sitemap
- robots.txt
- Open Graph i Twitter Cards

### Lokalizacja
- 100% polska treść
- Polskie przykłady oszustw
- Lokalne statystyki (500 mln zł strat rocznie)
- Polska typografia i formatowanie

## 🧪 Testowanie

### Responsywność
- Testowane na urządzeniach 320px+
- Touch-friendly navigation
- Mobile-optimized forms

### Accessibility
- Keyboard navigation
- Screen reader compatibility
- WCAG 2.1 compliance
- Semantic HTML

## 🚀 Deployment

### Vercel (Zalecane)
```bash
# Automatyczny deployment z GitHub
vercel --prod
```

### Inne Platformy
- Netlify
- AWS Amplify
- Railway
- Render

## 📞 Kontakt

- **Email**: kontakt@safetalk.pl
- **Telefon**: +48 123 456 789
- **LinkedIn**: [Safe Talk](https://linkedin.com/company/safetalk)
- **Adres**: ul. Technologiczna 1, 00-001 Warszawa

## 📄 Licencja

© 2024 Safe Talk. Wszystkie prawa zastrzeżone.

---

**Safe Talk** - Chroń się przed oszustwami telefonicznymi w czasie rzeczywistym 🛡️