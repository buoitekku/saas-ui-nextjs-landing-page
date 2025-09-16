import * as React from 'react'

const faq = {
  title: 'Najczęściej zadawane pytania',
  description: 'Znajdź odpowiedzi na pytania dotyczące Safe Talk i ochrony przed oszustwami telefonicznymi.',
  items: [
    {
      q: 'Jak działa analiza rozmów w czasie rzeczywistym?',
      a: (
        <>
          Safe Talk analizuje dźwięk rozmowy na Twoim urządzeniu używając algorytmów sztucznej inteligencji. 
          System rozpoznaje wzorce mowy i treści typowe dla oszustów, ostrzegając Cię natychmiast gdy wykryje zagrożenie. 
          <br /><br />
          Cały proces odbywa się lokalnie - Twoje rozmowy nie są wysyłane do internetu.
        </>
      ),
      category: 'technical' as const,
    },
    {
      q: 'Czy Safe Talk nagrywa moje rozmowy?',
      a: 'Nie, Safe Talk nie nagrywa ani nie przechowuje Twoich rozmów. System analizuje dźwięk w czasie rzeczywistym i natychmiast go usuwa. Jedyne co pozostaje to informacja o wykrytym zagrożeniu (bez treści rozmowy).',
      category: 'privacy' as const,
    },
    {
      q: 'Jakie dane są zbierane przez aplikację?',
      a: (
        <>
          Safe Talk zbiera tylko niezbędne dane techniczne: informacje o wykrytych zagrożeniach (bez treści rozmów), 
          statystyki użytkowania aplikacji oraz dane potrzebne do poprawy algorytmów wykrywania. 
          <br /><br />
          Nigdy nie zbieramy treści rozmów, numerów telefonów rozmówców ani innych danych osobowych z rozmów.
        </>
      ),
      category: 'privacy' as const,
    },
    {
      q: 'Jak zainstalować Safe Talk na moim telefonie?',
      a: 'Safe Talk będzie dostępny w Google Play Store i App Store. Po pobraniu wystarczy uruchomić aplikację, przejść przez krótki proces konfiguracji i udzielić niezbędnych uprawnień. Aplikacja będzie działać w tle automatycznie.',
      category: 'general' as const,
    },
    {
      q: 'Czy Safe Talk działa z wszystkimi operatorami?',
      a: 'Tak, Safe Talk działa niezależnie od operatora sieci komórkowej. Aplikacja analizuje rozmowy na poziomie urządzenia, więc współpracuje z wszystkimi operatorami w Polsce i za granicą.',
      category: 'technical' as const,
    },
    {
      q: 'Ile kosztuje korzystanie z Safe Talk?',
      a: (
        <>
          Planujemy model freemium - podstawowa ochrona będzie darmowa dla wszystkich użytkowników. 
          Zaawansowane funkcje jak szczegółowe raporty, ochrona dla firm czy priorytetowe wsparcie będą dostępne w planach płatnych.
          <br /><br />
          Szczegóły cennika zostaną ogłoszone przed oficjalnym uruchomieniem aplikacji.
        </>
      ),
      category: 'general' as const,
    },
    {
      q: 'Czy Safe Talk chroni przed wszystkimi rodzajami oszustw?',
      a: 'Safe Talk jest szczególnie skuteczny przeciwko oszustwom telefonicznym: wyłudzeniom danych osobowych, oszustwom "na wnuczka", fałszywym ofertom inwestycyjnym czy próbom wyłudzenia pieniędzy. System stale się uczy i dodajemy nowe wzorce oszustów.',
      category: 'general' as const,
    },
    {
      q: 'Co się dzieje gdy Safe Talk wykryje oszustwo?',
      a: 'Gdy system wykryje podejrzaną rozmowę, natychmiast wyświetli ostrzeżenie na ekranie telefonu z informacją o rodzaju zagrożenia. Możesz wtedy bezpiecznie zakończyć rozmowę lub być bardziej ostrożny w dalszej konwersacji.',
      category: 'general' as const,
    },
    {
      q: 'Czy Safe Talk jest dostępny dla firm?',
      a: 'Tak, oferujemy dedykowane rozwiązania dla firm, które obejmują centralne zarządzanie, szczegółowe raporty, integrację z systemami bezpieczeństwa oraz wsparcie techniczne. Skontaktuj się z nami w sprawie wdrożenia korporacyjnego.',
      category: 'business' as const,
    },
    {
      q: 'Jak Safe Talk radzi sobie z fałszywymi alarmami?',
      a: 'Nasze algorytmy są stale doskonalone, aby minimalizować liczbę fałszywych alarmów. System uczy się z każdego przypadku i dostosowuje się do Twoich wzorców komunikacji. Możesz także zgłaszać fałszywe alarmy, co pomaga nam poprawić dokładność.',
      category: 'technical' as const,
    },
    {
      q: 'Czy mogę używać Safe Talk za granicą?',
      a: 'Tak, Safe Talk działa w każdym kraju. Aplikacja analizuje rozmowy lokalnie na urządzeniu, więc nie ma ograniczeń geograficznych. Algorytmy są jednak zoptymalizowane pod kątem polskich wzorców oszustw.',
      category: 'general' as const,
    },
    {
      q: 'Jak Safe Talk wpływa na żywotność baterii?',
      a: 'Safe Talk został zoptymalizowany pod kątem minimalnego zużycia baterii. Aplikacja używa zaawansowanych technik przetwarzania, które działają efektywnie w tle, nie wpływając znacząco na czas pracy urządzenia.',
      category: 'technical' as const,
    },
  ],
}

export default faq