import { 
  FiTarget,
  FiHeart
} from 'react-icons/fi'
import { SmartAlertsIcon } from '#components/safe-talk-icons'

export interface SocialLinks {
  readonly linkedin?: string
  readonly twitter?: string
  readonly github?: string
  readonly email?: string
}

export interface TeamMemberData {
  readonly name: string
  readonly role: string
  readonly bio: string
  readonly expertise: readonly string[]
  readonly avatar: string
  readonly social: SocialLinks
  readonly delay?: number
}

export interface CompanyValueData {
  readonly icon: React.ComponentType
  readonly title: string
  readonly description: string
  readonly delay?: number
}

export const TEAM_MEMBERS: readonly TeamMemberData[] = [
  {
    name: 'Anna Kowalska',
    role: 'CEO & Współzałożycielka',
    bio: 'Ekspertka w dziedzinie cyberbezpieczeństwa z 15-letnim doświadczeniem w ochronie przed oszustwami finansowymi. Wcześniej kierowała zespołem bezpieczeństwa w największym polskim banku.',
    expertise: ['Cybersecurity', 'Fintech', 'AI Ethics', 'Team Leadership'],
    avatar: '/static/images/team-anna.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/anna-kowalska',
      twitter: 'https://twitter.com/anna_kowalska',
      email: 'anna@safetalk.pl',
    },
    delay: 0.2,
  },
  {
    name: 'Michał Nowak',
    role: 'CTO & Współzałożyciel',
    bio: 'Inżynier AI z doktoratem z przetwarzania języka naturalnego. Specjalista w dziedzinie analizy głosu i uczenia maszynowego w czasie rzeczywistym. Autor 20+ publikacji naukowych.',
    expertise: ['Machine Learning', 'NLP', 'Voice Analysis', 'Real-time Systems'],
    avatar: '/static/images/team-michal.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/michal-nowak',
      github: 'https://github.com/michalnowak',
      email: 'michal@safetalk.pl',
    },
    delay: 0.4,
  },
  {
    name: 'Katarzyna Wiśniewska',
    role: 'Head of Product',
    bio: 'Designerka UX/UI z pasją do tworzenia intuicyjnych aplikacji bezpieczeństwa. Wcześniej pracowała przy projektach dla seniorów w Google i Microsoft, rozumie potrzeby różnych grup wiekowych.',
    expertise: ['UX/UI Design', 'Product Strategy', 'Accessibility', 'User Research'],
    avatar: '/static/images/team-katarzyna.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/katarzyna-wisniewska',
      twitter: 'https://twitter.com/kasia_design',
      email: 'katarzyna@safetalk.pl',
    },
    delay: 0.6,
  },
] as const

export const COMPANY_VALUES: readonly CompanyValueData[] = [
  {
    icon: FiTarget,
    title: 'Nasza misja',
    description: 'Chronimy ludzi przed oszustami telefonicznymi, wykorzystując najnowsze technologie AI do analizy rozmów w czasie rzeczywistym.',
    delay: 0.3,
  },
  {
    icon: SmartAlertsIcon,
    title: 'Nasza wizja',
    description: 'Świat, w którym każdy może bezpiecznie odbierać telefony, nie martwiąc się o oszustwa i manipulacje.',
    delay: 0.4,
  },
  {
    icon: FiHeart,
    title: 'Nasze wartości',
    description: 'Transparentność, prywatność i ochrona użytkowników to podstawa wszystkiego, co robimy.',
    delay: 0.5,
  },
] as const