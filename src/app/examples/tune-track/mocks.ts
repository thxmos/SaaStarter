export const initialStages = [
  "Demo",
  "Drums",
  "Bass",
  "Guitars",
  "Synths",
  "Vocals",
  "FX",
  "Lyrics",
  "Mixing/Mastering",
];

export const artOptions = Array(9)
  .fill(null)
  .map((_, i) => `/placeholder.svg?height=100&width=100&text=Art+${i + 1}`);

export type Song = {
  name: string;
  stages: Record<string, boolean>;
  notes: Record<string, string>;
  mixNotes: string;
  lyrics: string;
};

export type MarketingStep = {
  name: string;
  completeByDate: string;
  description: string;
};

// Mock songs
export const mockSongs: Song[] = [
  {
    name: "Echoes of Tomorrow",
    stages: Object.fromEntries(
      initialStages.map((stage) => [stage, Math.random() < 0.7]),
    ),
    notes: {},
    mixNotes: "Add more reverb to the vocals in the chorus.",
    lyrics: "Verse 1:\nIn the silence of the night...",
  },
  {
    name: "Neon Heartbeat",
    stages: Object.fromEntries(
      initialStages.map((stage) => [stage, Math.random() < 0.6]),
    ),
    notes: {},
    mixNotes: "Boost the bass around 80Hz for more punch.",
    lyrics: "Chorus:\nNeon lights, electric dreams...",
  },
  {
    name: "Whispers in the Wind",
    stages: Object.fromEntries(
      initialStages.map((stage) => [stage, Math.random() < 0.5]),
    ),
    notes: {},
    mixNotes: "Pan the acoustic guitar slightly to the left.",
    lyrics: "Bridge:\nCarried on the breeze, your voice...",
  },
  {
    name: "Cosmic Lullaby",
    stages: Object.fromEntries(
      initialStages.map((stage) => [stage, Math.random() < 0.4]),
    ),
    notes: {},
    mixNotes: "Add a subtle delay to the synth pad.",
    lyrics: "Verse 2:\nStardust falls like gentle rain...",
  },
  {
    name: "Midnight Serenade",
    stages: Object.fromEntries(
      initialStages.map((stage) => [stage, Math.random() < 0.3]),
    ),
    notes: {},
    mixNotes: "Bring out the high-end of the ride cymbal.",
    lyrics: "Outro:\nAs the clock strikes twelve...",
  },
];

// Mock marketing steps
export const mockMarketingSteps: MarketingStep[] = [
  {
    name: "Social Media Teaser",
    completeByDate: "2024-10-15",
    description: "Post a 15-second teaser clip on Instagram and TikTok",
  },
  {
    name: "Press Release",
    completeByDate: "2024-10-20",
    description: "Send out press release to music journalists and bloggers",
  },
  {
    name: "Music Video Shoot",
    completeByDate: "2024-11-05",
    description: "Film music video for the lead single",
  },
  {
    name: "Podcast Appearances",
    completeByDate: "2024-11-15",
    description: "Schedule and record interviews on popular music podcasts",
  },
  {
    name: "Album Pre-order Launch",
    completeByDate: "2024-11-30",
    description: "Open pre-orders for the album on major platforms",
  },
];
