export interface HomePageProps {
  theme: 'dark' | 'light';
}

export interface ShowcaseTheme {
  id: string;
  name: string;
  emoji: string;
  accentColor: string;
  isFree: boolean;
  description: string;
}

export const GAME_THEMES: ShowcaseTheme[] = [
  {
    id: 'midnight',
    name: 'Midnight Neon',
    emoji: '🌙',
    accentColor: '#00E5FF',
    isFree: true,
    description: 'High-contrast electric cyan and hot pink set against a deep, velvety dark void.',
  },
  {
    id: 'retro_pink',
    name: 'Retro Pink',
    emoji: '🌸',
    accentColor: '#FF007F',
    isFree: false,
    description: 'Soft, nostalgic magenta glows paired with warm orange paths. Evokes the dreamy vibes of a late-night retro synthwave arcade.',
  },
  {
    id: 'cyber_gold',
    name: 'Cyber Gold',
    emoji: '⚡',
    accentColor: '#FBBC05',
    isFree: false,
    description: 'A striking amber and solar gold flow moving across high-tech dark charcoal. Perfect for players who love a clean cyberpunk aesthetic.',
  },
  {
    id: 'forest',
    name: 'Neon Forest',
    emoji: '🌿',
    accentColor: '#34A853',
    isFree: false,
    description: 'Luminous emerald and matrix-green lines branching across an ultra-dark moss backdrop. A soothing yet vibrant digital-organic experience.',
  },
  {
    id: 'sunset',
    name: 'Sunset Coral',
    emoji: '🌅',
    accentColor: '#FF6B35',
    isFree: false,
    description: 'Warm coral orange and peach-pink connections that fade like a summer sunset. Brings a relaxed, cozy twilight warmth to your puzzle screen.',
  },
  {
    id: 'galaxy',
    name: 'Galaxy Purple',
    emoji: '🔮',
    accentColor: '#A06CD5',
    isFree: false,
    description: 'Nebulous ultraviolet and deep royal purple paths floating on a galactic starless background. Deeply hypnotic and visually immersive.',
  },
  {
    id: 'ocean',
    name: 'Ocean Drift',
    emoji: '🌊',
    accentColor: '#4285F4',
    isFree: false,
    description: 'Cool mint and sky blue dots connected by refreshing oceanic lines over a dark navy abyss. Calming, fluid, and pristine.',
  },
  {
    id: 'blood_moon',
    name: 'Blood Moon',
    emoji: '🌑',
    accentColor: '#EA4335',
    isFree: false,
    description: 'Crimson red and dark scarlet pulses contrasting sharply with absolute obsidian black. Intense, dramatic, and bold.',
  },
  {
    id: 'arctic',
    name: 'Arctic Ice',
    emoji: '❄️',
    accentColor: '#87CEEB',
    isFree: false,
    description: 'Crisp frosted blue and icy silver lines on a deep glacial dark background. A clean, chillingly beautiful aesthetic for focused solving.',
  },
  {
    id: 'golden_hour',
    name: 'Golden Hour',
    emoji: '✨',
    accentColor: '#D4A373',
    isFree: false,
    description: 'Muted champagne sand and soft bronze connections. A warm, elegant, and sophisticated theme for a premium tactile feel.',
  },
];

