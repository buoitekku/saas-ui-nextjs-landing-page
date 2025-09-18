import { HStack, Text } from '@chakra-ui/react'

export default {
  title: 'Cennik dostosowany do Twoich potrzeb',
  description: 'Wybierz plan odpowiedni dla siebie. Podstawowa ochrona jest darmowa dla wszystkich.',
  plans: [
    {
      id: 'free',
      title: 'Darmowy',
      description: 'Podstawowa ochrona przed oszustwami dla użytkowników indywidualnych.',
      price: 'Darmowy',
      features: [
        {
          title: 'Wykrywanie podstawowych oszustw',
        },
        {
          title: 'Ostrzeżenia w czasie rzeczywistym',
        },
        {
          title: 'Ochrona prywatności',
        },
        {
          title: 'Wsparcie społeczności',
        },
        {
          title: 'Aktualizacje bezpieczeństwa',
        },
      ],
      action: {
        href: '#download',
        children: 'Pobierz za darmo',
      },
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'Zaawansowana ochrona z dodatkowymi funkcjami dla wymagających użytkowników.',
      price: '19 zł/miesiąc',
      isRecommended: true,
      features: [
        {
          title: 'Wszystko z planu Darmowego',
        },
        {
          title: 'Zaawansowane wykrywanie oszustw',
        },
        {
          title: 'Szczegółowe raporty i statystyki',
        },
        {
          title: 'Ochrona dla całej rodziny (do 5 urządzeń)',
        },
        {
          title: 'Priorytetowe wsparcie techniczne',
        },
        {
          title: 'Personalizowane ostrzeżenia',
        },
        {
          title: 'Historia wykrytych zagrożeń',
        },
      ],
      action: {
        href: '#signup',
        children: 'Rozpocznij 30-dniowy trial',
      },
    },
    {
      id: 'business',
      title: 'Biznes',
      description: 'Kompleksowe rozwiązanie dla firm i organizacji.',
      price: (
        <HStack>
          <Text>Od 99 zł/miesiąc</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Wszystko z planu Premium',
        },
        {
          title: 'Nieograniczona liczba użytkowników',
        },
        {
          title: 'Centralne zarządzanie',
        },
        {
          title: 'Integracje z systemami firmowymi',
        },
        {
          title: 'Dedykowane wsparcie 24/7',
        },
        {
          title: 'Szkolenia dla zespołu',
        },
        {
          title: 'Raportowanie dla zarządu',
        },
        {
          title: 'SLA 99.9% dostępności',
        },
      ],
      action: {
        href: '#contact',
        children: 'Skontaktuj się z nami',
      },
    },
  ],
}