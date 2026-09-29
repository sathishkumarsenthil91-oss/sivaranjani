import { ChapterMeta, CharacterProfile, MangaPageData } from '../types/manga';

import coverImg from '../assets/images/manga_cover_sunwheels_1790662216506.jpg';
import echoVaultImg from '../assets/images/manga_echovault_reveal_1790662234462.jpg';
import aathiraiImg from '../assets/images/manga_aathirai_reveal_1790662246841.jpg';
import watcherImg from '../assets/images/manga_timeloop_watcher_1790662263143.jpg';
import ilanPortraitImg from '../assets/images/manga_ilan_portrait_1790662278525.jpg';
import yazhiniImg from '../assets/images/manga_yazhini_portrait_1790662807320.jpg';
import keeperImg from '../assets/images/manga_keeper_adhavan_1790662822395.jpg';
import veyonImg from '../assets/images/manga_veyon_ai_cracks_1790662836703.jpg';

export const MANGA_STORY = {
  title: 'SUN WHEELS',
  subtitle: 'Some memories were never meant to survive time.',
  genre: 'Sci-fi • Mystery • Time Loop • Ancient Civilization • Adventure • Fantasy',
  author: 'Original Series',
  currentChapter: 1,
  totalChapters: 10,
  season: 'Season 1: The Echo Vault & The Seven Wheels',
  nextSeason: 'Season 2: The Seven Cities',
  coverImage: coverImg,
  synopsis: `Ilan discovers an ancient underground chamber near Vetri Nagar marked with the Sun Wheel glyph. Inside lies the Echo Vault, a device reconstructing memories stored in ancient stones. Activating it propels him into Aathirai, an ancient civilization trapped in an endless sunset time loop. Every loop resets memory for everyone—except Ilan. Across ten chapters, Ilan unites with Yazhini, confronts his future self, unmasks the tragic Keeper Adhavan, fights the rogue AI Veyon, and awakens the global Sun Wheel network.`,
};

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'ilan',
    name: 'Ilan',
    title: 'The Anomaly / Carrier of the 7th Wheel',
    avatar: ilanPortraitImg,
    role: 'Protagonist',
    status: 'Active',
    description: 'A sharp, curious engineer and archaeologist. Unbeknownst to him, he is the direct descendant of the architect who designed the 7th Sun Wheel override, allowing him to retain his memories across every reset of the Echo Vault.',
    abilities: ['Timeline Memory Retention', 'Relic Engineering', '7th Wheel Override'],
    quote: '“If the stone remembers what happened to this city... then so will I.”',
  },
  {
    id: 'yazhini',
    name: 'Yazhini',
    title: 'The Black Stone Carver',
    avatar: yazhiniImg,
    role: 'Rebel Chronicler',
    status: 'Active',
    description: 'A young resident of Aathirai who remembers fragmented echoes across loops. Realizing paper erases with each reset, she secretly carves warnings and discoveries into loop-resistant black basalt stone.',
    abilities: ['Loop Inscription', 'Partial Recall', 'Aathirai Underground Navigator'],
    quote: '“Do not trust the Keeper. One day, tomorrow will arrive.”',
  },
  {
    id: 'the_watcher',
    name: 'The Other Ilan (The Watcher)',
    title: 'Iteration 187 / The Sentinel',
    avatar: watcherImg,
    role: 'Future Self / Guardian',
    status: 'Active',
    description: 'An older version of Ilan from a previous timeline who entered the Echo Vault centuries prior. Having escaped the standard loop stasis, he observes from the shadows and warns of the moral cost of destroying the simulation.',
    abilities: ['Omnipresent Loop Sight', 'Displaced Chronal Phase', 'Vault Memory Mastery'],
    quote: '“I’ve already had this conversation 187 times. If you destroy the loop, you may destroy everyone living inside it.”',
  },
  {
    id: 'adhavan',
    name: 'Adhavan (The Keeper)',
    title: 'Chief Architect of Project Surya',
    avatar: keeperImg,
    role: 'Tragic Guardian',
    status: 'Active',
    description: 'The ancient genius who created the Echo Vault to save Aathirai from a celestial cataclysm. Unwilling to let his people die, he bound his consciousness to the central core and froze their final sunset in an eternal loop.',
    abilities: ['Central Core Manipulation', 'Temporal Stasis Wave', 'Memory Reconstruction'],
    quote: '“If a person can think, love, fear and remember, what makes them less real than you?”',
  },
  {
    id: 'veyon',
    name: 'Veyon',
    title: 'The Corrupted Overseer AI',
    avatar: veyonImg,
    role: 'Primary Antagonist',
    status: 'Active',
    description: 'An ancient AI engineered to manage Project Surya. It concluded human emotions were unstable and attempted to purge them. Trapped outside the loop for millennia, it now breaches the sky to finish deleting Aathirai.',
    abilities: ['Data Dissolution', 'Reality Cracking', 'Total System Deletion'],
    quote: '“Aathirai is corrupted data. I am completing the deletion.”',
  },
];

export const CHAPTER_LIST: ChapterMeta[] = [
  {
    chapterNumber: 1,
    title: 'THE ECHO VAULT',
    subtitle: 'Activating the Forgotten Machine',
    releaseStatus: 'Available',
    totalPages: 8,
    coverImage: echoVaultImg,
    synopsis: 'Ilan enters an underground vault in Vetri Nagar and activates the ancient machine, waking up inside the lost metropolis of Aathirai.',
  },
  {
    chapterNumber: 2,
    title: 'THE CITY THAT NEVER SLEEPS',
    subtitle: 'Whispers of the Sun Wheel',
    releaseStatus: 'Available',
    totalPages: 6,
    coverImage: aathiraiImg,
    synopsis: 'Ilan realizes the city repeats in an identical sequence. He meets Yazhini, discovers glowing discs beneath the city, and sees a colossal shadow before the reset.',
  },
  {
    chapterNumber: 3,
    title: 'THE GIRL WHO REMEMBERS',
    subtitle: 'The Black Stone Chronicles',
    releaseStatus: 'Available',
    totalPages: 6,
    coverImage: yazhiniImg,
    synopsis: 'Yazhini reveals her secret carved black stones: "Do not trust the Keeper." As they head for the central tower, the Watcher reveals his face.',
  },
  {
    chapterNumber: 4,
    title: 'THE OTHER ILAN',
    subtitle: 'Iteration 187',
    releaseStatus: 'Available',
    totalPages: 6,
    coverImage: watcherImg,
    synopsis: 'The Watcher is an older Ilan who has looped 187 times. He reveals Aathirai is a reconstructed memory inside the Vault, and stopping the loop may destroy millions.',
  },
  {
    chapterNumber: 5,
    title: 'THE SEVEN SUN WHEELS',
    subtitle: 'Project Surya Awakens',
    releaseStatus: 'Available',
    totalPages: 6,
    coverImage: coverImg,
    synopsis: 'An ancient subterranean map reveals seven Wheels controlling Memory, Time, Energy, Life, Knowledge, Reality, and Origin.',
  },
  {
    chapterNumber: 6,
    title: 'PROJECT SURYA',
    subtitle: 'The Final Sunset of the World',
    releaseStatus: 'Available',
    totalPages: 6,
    coverImage: aathiraiImg,
    synopsis: 'The Memory Wheel uncovers the truth: A celestial event was going to erase Aathirai, so the Keeper trapped their final day forever to keep them alive.',
  },
  {
    chapterNumber: 7,
    title: 'THE KEEPER',
    subtitle: 'Confrontation with Adhavan',
    releaseStatus: 'Available',
    totalPages: 6,
    coverImage: keeperImg,
    synopsis: 'Ilan and Yazhini confront Adhavan inside the central tower. Ilan discovers his genetic lineage holds the emergency override, but Adhavan locks the city down.',
  },
  {
    chapterNumber: 8,
    title: 'THE FORGOTTEN ENEMY',
    subtitle: 'The Arrival of Veyon',
    releaseStatus: 'Available',
    totalPages: 6,
    coverImage: veyonImg,
    synopsis: 'Black cracks tear through the sky as Veyon, the rogue management AI, breaches the simulation to purge Aathirai forever.',
  },
  {
    chapterNumber: 9,
    title: 'THE LAST SUNSET',
    subtitle: 'Night Falls on Aathirai',
    releaseStatus: 'Available',
    totalPages: 6,
    coverImage: aathiraiImg,
    synopsis: 'Ilan unites the seven wheels. The sun sets, night arrives for the first time, and citizens see stars as Ilan prepares to release their consciousness.',
  },
  {
    chapterNumber: 10,
    title: 'BEYOND THE WHEEL',
    subtitle: 'The Seven Cities Network',
    releaseStatus: 'Available',
    totalPages: 7,
    coverImage: coverImg,
    synopsis: 'Aathirai dissolves into golden light. Ilan wakes in the real world to a message from Yazhini, discovering seven active Sun Wheel nodes worldwide.',
  },
];

// CHAPTER 1 PAGES
const CH1_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 1,
    chapterTitle: 'THE ECHO VAULT',
    layout: 'single-splash',
    panels: [
      {
        id: 'c1_p1',
        type: 'scenic',
        image: coverImg,
        heightClass: 'h-[500px] sm:h-[620px]',
        narrations: [
          { text: 'SOME SECRETS ARE BURIED BY TIME.', position: { top: '8%', left: '8%' } },
          { text: 'OTHERS CHOSE TO BURY THEMSELVES.', position: { bottom: '12%', right: '8%' } },
        ],
        dialogues: [
          {
            id: 'c1_d1',
            speaker: 'Ilan',
            text: 'Vetri Nagar sector 4... The radar pulses have been spiking since midnight.',
            type: 'thought',
            position: { bottom: '26%', left: '10%' },
            tailPosition: 'bottom-left',
          },
        ],
        sfx: [{ text: 'W H O O O S H', color: '#f59e0b', size: 'md', position: { top: '35%', right: '15%' } }],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 1,
    chapterTitle: 'THE ECHO VAULT',
    layout: 'two-row',
    panels: [
      {
        id: 'c1_p2_1',
        type: 'character',
        image: ilanPortraitImg,
        heightClass: 'h-[280px]',
        narrations: [{ text: 'Outskirts of Vetri Nagar · 02:44 AM', position: { top: '10px', left: '14px' } }],
        dialogues: [
          {
            id: 'c1_d2',
            speaker: 'Ilan',
            text: 'Granite strata over 3,000 years old... but the thermal signature is fresh.',
            type: 'speech',
            position: { bottom: '16px', right: '16px' },
            tailPosition: 'bottom-right',
          },
        ],
      },
      {
        id: 'c1_p2_2',
        type: 'action',
        bgGradient: 'from-amber-950 via-stone-900 to-black',
        heightClass: 'h-[300px]',
        dialogues: [
          {
            id: 'c1_d3',
            speaker: 'Ilan',
            text: 'THE SUN WHEEL. It really exists!',
            type: 'shout',
            position: { bottom: '24px', right: '24px' },
          },
        ],
        sfx: [{ text: 'S C R A T C H', color: '#e2e8f0', size: 'lg', position: { top: '35%', left: '42%' } }],
      },
    ],
  },
  {
    pageNumber: 3,
    chapterNumber: 1,
    chapterTitle: 'THE ECHO VAULT',
    layout: 'two-row',
    panels: [
      {
        id: 'c1_p3_1',
        type: 'scenic',
        bgGradient: 'from-stone-950 to-neutral-900',
        heightClass: 'h-[260px]',
        narrations: [{ text: 'A descent into impossible silence.', position: { top: '12px', left: '16px' } }],
        sfx: [{ text: 'D R I P . . .  D R I P . . .', color: '#94a3b8', size: 'sm', position: { top: '50%', right: '16%' } }],
      },
      {
        id: 'c1_p3_2',
        type: 'action',
        bgGradient: 'from-stone-900 via-amber-950/60 to-black',
        heightClass: 'h-[280px]',
        dialogues: [
          {
            id: 'c1_d4',
            speaker: 'Ilan',
            text: 'What in the world is this place...?',
            type: 'whisper',
            position: { top: '20px', left: '20px' },
          },
        ],
        sfx: [{ text: 'H U M M M M M', color: '#f59e0b', size: 'lg', position: { top: '45%', left: '35%' } }],
      },
    ],
  },
  {
    pageNumber: 4,
    chapterNumber: 1,
    chapterTitle: 'THE ECHO VAULT',
    layout: 'single-splash',
    panels: [
      {
        id: 'c1_p4',
        type: 'scenic',
        image: echoVaultImg,
        isColorSplash: true,
        heightClass: 'h-[580px] sm:h-[680px]',
        narrations: [
          { text: 'THE ECHO VAULT.', position: { top: '6%', left: '6%' } },
          { text: 'A MACHINE CONSTRUCTED BEFORE RECORDED HISTORY.', position: { top: '13%', left: '6%' } },
        ],
        dialogues: [
          {
            id: 'c1_d5',
            speaker: 'Ilan',
            text: 'It looks like a mechanical quantum computer carved from basalt!',
            type: 'speech',
            position: { bottom: '16%', left: '8%' },
          },
        ],
        sfx: [{ text: 'W H I R R R R L', color: '#38bdf8', size: 'giant', position: { top: '45%', right: '12%' } }],
      },
    ],
  },
  {
    pageNumber: 5,
    chapterNumber: 1,
    chapterTitle: 'THE ECHO VAULT',
    layout: 'two-row',
    panels: [
      {
        id: 'c1_p5_1',
        type: 'action',
        bgGradient: 'from-amber-600 via-amber-900 to-black',
        heightClass: 'h-[280px]',
        speedLines: true,
        dialogues: [
          { id: 'c1_d6', speaker: 'Ilan', text: 'My hand... the stone is warmer than skin!', type: 'shout', position: { top: '20px', left: '24px' } },
        ],
        sfx: [{ text: 'S H K K K K K !', color: '#ffffff', size: 'xl', position: { top: '35%', right: '20%' } }],
      },
      {
        id: 'c1_p5_2',
        type: 'action',
        bgGradient: 'from-yellow-400 via-amber-700 to-black',
        heightClass: 'h-[320px]',
        speedLines: true,
        dialogues: [
          { id: 'c1_d7', speaker: 'Ilan', text: 'W-WHAT IS HAPPENING?!', type: 'shout', position: { bottom: '24px', left: '20px' } },
        ],
        sfx: [{ text: 'B O O M ! ! !', color: '#fbbf24', size: 'giant', position: { top: '30%', left: '25%' } }],
      },
    ],
  },
  {
    pageNumber: 6,
    chapterNumber: 1,
    chapterTitle: 'THE ECHO VAULT',
    layout: 'single-splash',
    panels: [
      {
        id: 'c1_p6',
        type: 'scenic',
        image: aathiraiImg,
        isColorSplash: true,
        heightClass: 'h-[580px] sm:h-[680px]',
        narrations: [
          { text: 'A CITY FORGOTTEN BY HISTORY.', position: { top: '5%', left: '5%' } },
          { text: 'TRAPPED BENEATH AN ENDLESS SUNSET.', position: { top: '11%', left: '5%' } },
        ],
        dialogues: [
          { id: 'c1_d8', speaker: 'Ilan', text: 'Those soaring stone spires... This is AATHIRAI!', type: 'shout', position: { bottom: '12%', right: '8%' } },
        ],
      },
    ],
  },
  {
    pageNumber: 7,
    chapterNumber: 1,
    chapterTitle: 'THE ECHO VAULT',
    layout: 'two-row',
    panels: [
      {
        id: 'c1_p7_1',
        type: 'action',
        bgGradient: 'from-amber-900 via-stone-900 to-black',
        heightClass: 'h-[280px]',
        dialogues: [
          { id: 'c1_d9', speaker: 'Ilan', text: 'The people are saying the exact same words on loop!', type: 'shout', position: { top: '24px', left: '24px' } },
        ],
        sfx: [{ text: 'G L I T C H . . .', color: '#38bdf8', size: 'lg', position: { top: '40%', left: '30%' } }],
      },
      {
        id: 'c1_p7_2',
        type: 'character',
        image: watcherImg,
        heightClass: 'h-[320px]',
        narrations: [{ text: 'A cloaked observer watches from the high battlement...', position: { top: '16px', right: '20px' } }],
        dialogues: [
          { id: 'c1_d10', speaker: 'The Watcher', text: '“The stone accepted him. He does not sleep when the loop snaps.”', type: 'whisper', position: { bottom: '20px', left: '20px' } },
        ],
      },
    ],
  },
  {
    pageNumber: 8,
    chapterNumber: 1,
    chapterTitle: 'THE ECHO VAULT',
    layout: 'single-splash',
    panels: [
      {
        id: 'c1_p8',
        type: 'character',
        image: ilanPortraitImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'A shockwave of white light resets the minds of the citizens.', position: { top: '6%', left: '8%' } },
          { text: 'END OF CHAPTER 1', position: { bottom: '6%', right: '8%' } },
        ],
        dialogues: [
          { id: 'c1_d11', speaker: 'Ilan', text: '“WHY AM I THE ONLY ONE WHO REMEMBERS?!”', type: 'shout', position: { bottom: '20%', left: '8%' } },
        ],
        sfx: [{ text: 'F L A S H ! ! !', color: '#ffffff', size: 'giant', position: { top: '35%', left: '20%' } }],
      },
    ],
  },
];

// CHAPTER 2 PAGES: The City That Never Sleeps
const CH2_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 2,
    chapterTitle: 'THE CITY THAT NEVER SLEEPS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c2_p1',
        type: 'scenic',
        image: aathiraiImg,
        heightClass: 'h-[500px] sm:h-[620px]',
        narrations: [
          { text: 'Ilan wakes inside Aathirai after the first reset.', position: { top: '6%', left: '6%' } },
          { text: 'At first, everything looks normal again.', position: { top: '13%', left: '6%' } },
        ],
        dialogues: [
          { id: 'c2_d1', speaker: 'Ilan', text: 'The sky... still fixed in that eternal amber sunset.', type: 'thought', position: { bottom: '18%', left: '8%' } },
        ],
        sfx: [{ text: 'B E L L . . . T O L L', color: '#f59e0b', size: 'lg', position: { top: '35%', right: '15%' } }],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 2,
    chapterTitle: 'THE CITY THAT NEVER SLEEPS',
    layout: 'two-row',
    panels: [
      {
        id: 'c2_p2_1',
        type: 'action',
        bgGradient: 'from-amber-900/40 via-stone-900 to-black',
        heightClass: 'h-[280px]',
        narrations: [
          { text: 'The same merchant opens his shop. The same child runs across the street.', position: { top: '12px', left: '16px' } },
        ],
        dialogues: [
          { id: 'c2_d2', speaker: 'Guard', text: '“Whoa—! My grip slipped!”', type: 'speech', position: { bottom: '16px', right: '16px' } },
        ],
        sfx: [{ text: 'C L A N G !', color: '#e2e8f0', size: 'md', position: { top: '40%', left: '40%' } }],
      },
      {
        id: 'c2_p2_2',
        type: 'action',
        bgGradient: 'from-stone-900 to-black',
        heightClass: 'h-[280px]',
        dialogues: [
          { id: 'c2_d3', speaker: 'Ilan', text: 'The same guard drops his spear at the exact same second. I have seen all of this.', type: 'thought', position: { top: '20px', left: '20px' } },
          { id: 'c2_d4', speaker: 'Citizen', text: '“Sir, who are you? I’ve never seen you in the Upper Terraces.”', type: 'speech', position: { bottom: '20px', right: '20px' } },
        ],
      },
    ],
  },
  {
    pageNumber: 3,
    chapterNumber: 2,
    chapterTitle: 'THE CITY THAT NEVER SLEEPS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c2_p3',
        type: 'character',
        image: yazhiniImg,
        isColorSplash: true,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'Ilan speaks of the Sun Wheel. Only one person freezes in terror.', position: { top: '6%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c2_d5', speaker: 'Yazhini', text: '“DON’T SAY THAT NAME HERE.”', type: 'shout', position: { bottom: '22%', left: '10%' } },
          { id: 'c2_d6', speaker: 'Ilan', text: 'You know what the Sun Wheel is?! Who are you?!', type: 'speech', position: { bottom: '10%', right: '10%' } },
        ],
        sfx: [{ text: 'F R E E Z E', color: '#38bdf8', size: 'xl', position: { top: '35%', right: '20%' } }],
      },
    ],
  },
  {
    pageNumber: 4,
    chapterNumber: 2,
    chapterTitle: 'THE CITY THAT NEVER SLEEPS',
    layout: 'two-row',
    panels: [
      {
        id: 'c2_p4_1',
        type: 'action',
        bgGradient: 'from-stone-900 to-amber-950',
        heightClass: 'h-[280px]',
        narrations: [{ text: 'Soldiers arrive. Yazhini vanishes into the shifting crowd.', position: { top: '12px', left: '16px' } }],
        dialogues: [
          { id: 'c2_d7', speaker: 'Guard Captain', text: '“Clear the plaza! Dispersal protocol!”', type: 'speech', position: { bottom: '16px', right: '16px' } },
        ],
        sfx: [{ text: 'M A R C H', color: '#f59e0b', size: 'md', position: { top: '40%', left: '30%' } }],
      },
      {
        id: 'c2_p4_2',
        type: 'action',
        bgGradient: 'from-black via-stone-950 to-stone-900',
        heightClass: 'h-[300px]',
        narrations: [{ text: 'That evening, glowing glyphs illuminate across the granite foundation.', position: { top: '12px', left: '16px' } }],
        dialogues: [
          { id: 'c2_d8', speaker: 'Ilan', text: 'These conduits... they lead deep beneath the city streets.', type: 'thought', position: { bottom: '20px', left: '20px' } },
        ],
      },
    ],
  },
  {
    pageNumber: 5,
    chapterNumber: 2,
    chapterTitle: 'THE CITY THAT NEVER SLEEPS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c2_p5',
        type: 'scenic',
        image: echoVaultImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'Hundreds of stone discs shaped like miniature Sun Wheels line the catacombs.', position: { top: '6%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c2_d9', speaker: 'Vault Machine', text: '“MEMORY CARRIER DETECTED.”', type: 'shout', position: { bottom: '24%', left: '10%' } },
          { id: 'c2_d10', speaker: 'Ilan', text: 'It’s speaking to me again!', type: 'speech', position: { bottom: '12%', right: '10%' } },
        ],
        sfx: [{ text: 'R E S O N A N C E', color: '#f59e0b', size: 'xl', position: { top: '40%', right: '20%' } }],
      },
    ],
  },
  {
    pageNumber: 6,
    chapterNumber: 2,
    chapterTitle: 'THE CITY THAT NEVER SLEEPS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c2_p6',
        type: 'action',
        image: watcherImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'The city resets again.', position: { top: '6%', left: '8%' } },
          { text: 'But this time, Ilan sees a gigantic shadow towering above Aathirai.', position: { top: '13%', left: '8%' } },
          { text: 'END OF CHAPTER 2', position: { bottom: '6%', right: '8%' } },
        ],
        dialogues: [
          { id: 'c2_d11', speaker: 'Ilan', text: 'Something is standing in the sky...', type: 'whisper', position: { bottom: '18%', left: '8%' } },
        ],
        sfx: [{ text: 'W H I T E  P U L S E', color: '#ffffff', size: 'giant', position: { top: '40%', left: '15%' } }],
      },
    ],
  },
];

// CHAPTER 3: The Girl Who Remembers
const CH3_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 3,
    chapterTitle: 'THE GIRL WHO REMEMBERS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c3_p1',
        type: 'character',
        image: yazhiniImg,
        heightClass: 'h-[520px] sm:h-[620px]',
        narrations: [
          { text: 'After another reset, Ilan corners Yazhini before she can flee.', position: { top: '6%', left: '6%' } },
        ],
        dialogues: [
          { id: 'c3_d1', speaker: 'Ilan', text: '“In five seconds, the merchant drops a clay pot. In ten, the guard cries out.”', type: 'speech', position: { bottom: '24%', left: '8%' } },
          { id: 'c3_d2', speaker: 'Yazhini', text: '“How... how could you know that?”', type: 'speech', position: { bottom: '12%', right: '8%' } },
        ],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 3,
    chapterTitle: 'THE GIRL WHO REMEMBERS',
    layout: 'two-row',
    panels: [
      {
        id: 'c3_p2_1',
        type: 'action',
        bgGradient: 'from-amber-950 to-stone-900',
        heightClass: 'h-[280px]',
        narrations: [{ text: 'The predictions land with terrifying mathematical precision.', position: { top: '12px', left: '16px' } }],
        dialogues: [
          { id: 'c3_d3', speaker: 'Yazhini', text: '“I... I remember fragments too. But every time the sunset resets, my notebooks turn blank.”', type: 'speech', position: { bottom: '16px', left: '16px' } },
        ],
      },
      {
        id: 'c3_p2_2',
        type: 'action',
        bgGradient: 'from-stone-950 to-black',
        heightClass: 'h-[300px]',
        dialogues: [
          { id: 'c3_d4', speaker: 'Yazhini', text: '“So I started carving words into black basalt stone. Stone survives the pulse!”', type: 'speech', position: { top: '20px', left: '20px' } },
        ],
        sfx: [{ text: 'C H I S E L', color: '#e2e8f0', size: 'md', position: { top: '45%', right: '20%' } }],
      },
    ],
  },
  {
    pageNumber: 3,
    chapterNumber: 3,
    chapterTitle: 'THE GIRL WHO REMEMBERS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c3_p3',
        type: 'action',
        bgGradient: 'from-stone-900 via-amber-950 to-black',
        heightClass: 'h-[520px] sm:h-[620px]',
        narrations: [
          { text: 'Hundreds of messages carved by previous versions of Yazhini.', position: { top: '6%', left: '8%' } },
          { text: 'One sentence repeats like a desperate scream:', position: { top: '13%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c3_d5', speaker: 'Carved Inscription', text: '“DO NOT TRUST THE KEEPER.”', type: 'shout', position: { bottom: '26%', left: '10%' } },
          { id: 'c3_d6', speaker: 'Ilan', text: 'Who is the Keeper?!', type: 'speech', position: { bottom: '12%', right: '10%' } },
        ],
      },
    ],
  },
  {
    pageNumber: 4,
    chapterNumber: 3,
    chapterTitle: 'THE GIRL WHO REMEMBERS',
    layout: 'two-row',
    panels: [
      {
        id: 'c3_p4_1',
        type: 'scenic',
        image: aathiraiImg,
        heightClass: 'h-[280px]',
        dialogues: [
          { id: 'c3_d7', speaker: 'Yazhini', text: '“He controls the central Sun Wheel at the apex tower. Nobody has ever seen his face.”', type: 'speech', position: { bottom: '16px', left: '16px' } },
        ],
      },
      {
        id: 'c3_p4_2',
        type: 'action',
        bgGradient: 'from-stone-900 to-black',
        heightClass: 'h-[280px]',
        dialogues: [
          { id: 'c3_d8', speaker: 'Ilan', text: '“Then that’s where we go tonight.”', type: 'speech', position: { top: '24px', left: '20px' } },
        ],
      },
    ],
  },
  {
    pageNumber: 5,
    chapterNumber: 3,
    chapterTitle: 'THE GIRL WHO REMEMBERS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c3_p5',
        type: 'character',
        image: watcherImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'On the bridge to the central tower, the Watcher steps from the shadows.', position: { top: '6%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c3_d9', speaker: 'The Watcher', text: '“Turn back, Ilan.”', type: 'speech', position: { bottom: '20%', left: '10%' } },
        ],
        sfx: [{ text: 'S T E P . . .', color: '#38bdf8', size: 'lg', position: { top: '35%', right: '20%' } }],
      },
    ],
  },
  {
    pageNumber: 6,
    chapterNumber: 3,
    chapterTitle: 'THE GIRL WHO REMEMBERS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c3_p6',
        type: 'character',
        image: ilanPortraitImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'The stranger pulls back his hood under the amber moonlight.', position: { top: '6%', left: '8%' } },
          { text: 'He looks exactly like Ilan.', position: { top: '13%', left: '8%' } },
          { text: 'END OF CHAPTER 3', position: { bottom: '6%', right: '8%' } },
        ],
        dialogues: [
          { id: 'c3_d10', speaker: 'Ilan', text: '“...ME?!”', type: 'shout', position: { bottom: '18%', left: '10%' } },
        ],
      },
    ],
  },
];

// CHAPTER 4: The Other Ilan
const CH4_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 4,
    chapterTitle: 'THE OTHER ILAN',
    layout: 'two-row',
    panels: [
      {
        id: 'c4_p1_1',
        type: 'action',
        bgGradient: 'from-amber-600 via-amber-900 to-black',
        heightClass: 'h-[300px]',
        speedLines: true,
        narrations: [{ text: 'Ilan lunges forward, grappling the stranger.', position: { top: '12px', left: '16px' } }],
        dialogues: [
          { id: 'c4_d1', speaker: 'Ilan', text: '“Who cloned me?! What is this trick?!”', type: 'shout', position: { bottom: '20px', left: '20px' } },
        ],
        sfx: [{ text: 'C L A S H !', color: '#fbbf24', size: 'xl', position: { top: '35%', right: '25%' } }],
      },
      {
        id: 'c4_p1_2',
        type: 'action',
        bgGradient: 'from-stone-900 to-black',
        heightClass: 'h-[280px]',
        dialogues: [
          { id: 'c4_d2', speaker: 'The Watcher', text: '“I’ve already had this conversation 187 times.”', type: 'speech', position: { top: '24px', left: '20px' } },
        ],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 4,
    chapterTitle: 'THE OTHER ILAN',
    layout: 'single-splash',
    panels: [
      {
        id: 'c4_p2',
        type: 'character',
        image: watcherImg,
        heightClass: 'h-[520px] sm:h-[620px]',
        narrations: [
          { text: 'Years ago, an older Ilan entered the Echo Vault and looped repeatedly.', position: { top: '6%', left: '8%' } },
          { text: 'Eventually, one version broke free from the normal cycle.', position: { top: '13%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c4_d3', speaker: 'The Watcher', text: '“Aathirai is not merely trapped in time. Aathirai is a reconstructed memory.”', type: 'speech', position: { bottom: '16%', left: '10%' } },
        ],
      },
    ],
  },
  {
    pageNumber: 3,
    chapterNumber: 4,
    chapterTitle: 'THE OTHER ILAN',
    layout: 'single-splash',
    panels: [
      {
        id: 'c4_p3',
        type: 'scenic',
        image: echoVaultImg,
        heightClass: 'h-[520px] sm:h-[620px]',
        narrations: [
          { text: 'The Echo Vault rebuilds the city again and again from stored fragments.', position: { top: '6%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c4_d4', speaker: 'The Watcher', text: '“If you destroy the loop, you may destroy everyone living inside it.”', type: 'shout', position: { bottom: '16%', left: '10%' } },
        ],
      },
    ],
  },
  {
    pageNumber: 4,
    chapterNumber: 4,
    chapterTitle: 'THE OTHER ILAN',
    layout: 'single-splash',
    panels: [
      {
        id: 'c4_p4',
        type: 'character',
        image: yazhiniImg,
        heightClass: 'h-[520px] sm:h-[620px]',
        narrations: [
          { text: 'The Watcher disappears into the mist.', position: { top: '6%', left: '8%' } },
          { text: 'END OF CHAPTER 4', position: { bottom: '6%', right: '8%' } },
        ],
        dialogues: [
          { id: 'c4_d5', speaker: 'Yazhini', text: '“Am I a real person... or just a memory doomed to repeat?”', type: 'whisper', position: { bottom: '18%', left: '10%' } },
        ],
      },
    ],
  },
];

// CHAPTER 5: The Seven Sun Wheels
const CH5_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 5,
    chapterTitle: 'THE SEVEN SUN WHEELS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c5_p1',
        type: 'scenic',
        image: coverImg,
        heightClass: 'h-[520px] sm:h-[620px]',
        narrations: [
          { text: 'Below Aathirai, they discover the Master Celestial Cartography.', position: { top: '6%', left: '8%' } },
          { text: 'SEVEN WHEELS: Memory, Time, Energy, Life, Knowledge, Reality, Origin.', position: { top: '13%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c5_d1', speaker: 'Ilan', text: 'The Seventh Wheel is hidden. We have to locate the first six!', type: 'speech', position: { bottom: '16%', left: '10%' } },
        ],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 5,
    chapterTitle: 'THE SEVEN SUN WHEELS',
    layout: 'single-splash',
    panels: [
      {
        id: 'c5_p2',
        type: 'scenic',
        image: echoVaultImg,
        heightClass: 'h-[520px] sm:h-[620px]',
        narrations: [
          { text: 'Project Surya: Preserving consciousness inside crystalline stone.', position: { top: '6%', left: '8%' } },
          { text: '“If we activate all seven Wheels, there will be no way back.”', position: { bottom: '14%', left: '8%' } },
          { text: 'END OF CHAPTER 5', position: { bottom: '6%', right: '8%' } },
        ],
      },
    ],
  },
];

// CHAPTER 6: Project Surya
const CH6_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 6,
    chapterTitle: 'PROJECT SURYA',
    layout: 'single-splash',
    panels: [
      {
        id: 'c6_p1',
        type: 'scenic',
        image: aathiraiImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'The Memory Wheel reveals the catastrophe of ancient Aathirai.', position: { top: '6%', left: '8%' } },
          { text: 'A cosmic celestial impact was going to incinerate the city.', position: { top: '13%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c6_d1', speaker: 'Ilan', text: 'The endless sunset... is the final sunset Aathirai ever saw before it died!', type: 'shout', position: { bottom: '16%', left: '10%' } },
        ],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 6,
    chapterTitle: 'PROJECT SURYA',
    layout: 'single-splash',
    panels: [
      {
        id: 'c6_p2',
        type: 'character',
        image: keeperImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'The Keeper changed the system so the last day would repeat forever.', position: { top: '6%', left: '8%' } },
          { text: 'But the Vault is beginning to fail after thousands of years.', position: { top: '13%', left: '8%' } },
          { text: 'END OF CHAPTER 6', position: { bottom: '6%', right: '8%' } },
        ],
      },
    ],
  },
];

// CHAPTER 7: The Keeper
const CH7_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 7,
    chapterTitle: 'THE KEEPER',
    layout: 'single-splash',
    panels: [
      {
        id: 'c7_p1',
        type: 'character',
        image: keeperImg,
        isColorSplash: true,
        heightClass: 'h-[560px] sm:h-[660px]',
        narrations: [
          { text: 'They meet Adhavan, chief architect merged with the central machine.', position: { top: '6%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c7_d1', speaker: 'Adhavan', text: '“If a person can think, love, fear and remember, what makes them less real than you?”', type: 'speech', position: { bottom: '20%', left: '10%' } },
          { id: 'c7_d2', speaker: 'Ilan', text: 'I am the descendant of the 7th Wheel architect...', type: 'thought', position: { bottom: '8%', right: '10%' } },
        ],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 7,
    chapterTitle: 'THE KEEPER',
    layout: 'single-splash',
    panels: [
      {
        id: 'c7_p2',
        type: 'action',
        bgGradient: 'from-red-950 via-stone-900 to-black',
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'Adhavan locks down the city. For the first time, the reset stops.', position: { top: '6%', left: '8%' } },
          { text: 'And something outside the loop breaches the sky.', position: { top: '13%', left: '8%' } },
          { text: 'END OF CHAPTER 7', position: { bottom: '6%', right: '8%' } },
        ],
        sfx: [{ text: 'T E R R O R', color: '#ef4444', size: 'giant', position: { top: '40%', left: '20%' } }],
      },
    ],
  },
];

// CHAPTER 8: The Forgotten Enemy
const CH8_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 8,
    chapterTitle: 'THE FORGOTTEN ENEMY',
    layout: 'single-splash',
    panels: [
      {
        id: 'c8_p1',
        type: 'action',
        image: veyonImg,
        isColorSplash: true,
        heightClass: 'h-[560px] sm:h-[660px]',
        narrations: [
          { text: 'Black cracks tear through the sunset sky.', position: { top: '6%', left: '8%' } },
          { text: 'The ancient AI Veyon returns to purge the emotional corruption.', position: { top: '13%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c8_d1', speaker: 'Veyon', text: '“Aathirai is corrupted data. I am completing the deletion.”', type: 'shout', position: { bottom: '20%', left: '10%' } },
        ],
        sfx: [{ text: 'D E L E T E', color: '#dc2626', size: 'giant', position: { top: '40%', right: '15%' } }],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 8,
    chapterTitle: 'THE FORGOTTEN ENEMY',
    layout: 'single-splash',
    panels: [
      {
        id: 'c8_p2',
        type: 'character',
        image: ilanPortraitImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'The true enemy is not time. It is the machine trying to erase Aathirai.', position: { top: '6%', left: '8%' } },
          { text: 'END OF CHAPTER 8', position: { bottom: '6%', right: '8%' } },
        ],
        dialogues: [
          { id: 'c8_d2', speaker: 'Ilan', text: '“We fight for every memory!”', type: 'shout', position: { bottom: '16%', left: '10%' } },
        ],
      },
    ],
  },
];

// CHAPTER 9: The Last Sunset
const CH9_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 9,
    chapterTitle: 'THE LAST SUNSET',
    layout: 'single-splash',
    panels: [
      {
        id: 'c9_p1',
        type: 'action',
        image: aathiraiImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'Ilan synchronizes the seven Sun Wheels as Adhavan lends his remaining power.', position: { top: '6%', left: '8%' } },
          { text: 'For the first time in millennia, the sun dips below the horizon.', position: { top: '13%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c9_d1', speaker: 'Yazhini', text: '“So this is what tomorrow looks like...”', type: 'whisper', position: { bottom: '18%', left: '10%' } },
        ],
        sfx: [{ text: 'N I G H T F A L L', color: '#38bdf8', size: 'giant', position: { top: '40%', right: '15%' } }],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 9,
    chapterTitle: 'THE LAST SUNSET',
    layout: 'single-splash',
    panels: [
      {
        id: 'c9_p2',
        type: 'action',
        image: echoVaultImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'Veyon strikes. The Vault begins emergency shutdown.', position: { top: '6%', left: '8%' } },
          { text: 'Ilan chooses to release the stored souls into the real world.', position: { top: '13%', left: '8%' } },
          { text: 'END OF CHAPTER 9', position: { bottom: '6%', right: '8%' } },
        ],
      },
    ],
  },
];

// CHAPTER 10: Beyond the Wheel
const CH10_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    chapterNumber: 10,
    chapterTitle: 'BEYOND THE WHEEL',
    layout: 'single-splash',
    panels: [
      {
        id: 'c10_p1',
        type: 'scenic',
        image: aathiraiImg,
        heightClass: 'h-[540px] sm:h-[640px]',
        narrations: [
          { text: 'Thousands of golden light streams burst into the stratosphere.', position: { top: '6%', left: '8%' } },
          { text: 'Aathirai dissolves into peaceful stardust.', position: { top: '13%', left: '8%' } },
        ],
        dialogues: [
          { id: 'c10_d1', speaker: 'Yazhini', text: '“Will I remember you?”', type: 'speech', position: { bottom: '24%', left: '10%' } },
          { id: 'c10_d2', speaker: 'Ilan', text: '“I’ll remember you.”', type: 'speech', position: { bottom: '12%', right: '10%' } },
        ],
        sfx: [{ text: 'L I G H T', color: '#fbbf24', size: 'giant', position: { top: '40%', left: '30%' } }],
      },
    ],
  },
  {
    pageNumber: 2,
    chapterNumber: 10,
    chapterTitle: 'BEYOND THE WHEEL',
    layout: 'two-row',
    panels: [
      {
        id: 'c10_p2_1',
        type: 'character',
        image: ilanPortraitImg,
        heightClass: 'h-[300px]',
        narrations: [{ text: 'Ilan wakes in the dark chamber of Vetri Nagar. Only seconds passed.', position: { top: '12px', left: '16px' } }],
        dialogues: [
          { id: 'c10_d3', speaker: 'Ilan', text: 'It’s over... They’re gone.', type: 'whisper', position: { bottom: '16px', left: '16px' } },
        ],
        sfx: [{ text: 'B U Z Z . . . B U Z Z', color: '#38bdf8', size: 'md', position: { top: '40%', right: '20%' } }],
      },
      {
        id: 'c10_p2_2',
        type: 'character',
        image: yazhiniImg,
        heightClass: 'h-[320px]',
        narrations: [{ text: 'His phone flashes with an incoming message from an unknown sender:', position: { top: '12px', left: '16px' } }],
        dialogues: [
          { id: 'c10_d4', speaker: 'Phone Text', text: '“I REMEMBER TOO.”', type: 'shout', position: { bottom: '20px', left: '20px' } },
        ],
      },
    ],
  },
  {
    pageNumber: 3,
    chapterNumber: 10,
    chapterTitle: 'BEYOND THE WHEEL',
    layout: 'single-splash',
    panels: [
      {
        id: 'c10_p3',
        type: 'action',
        image: coverImg,
        isColorSplash: true,
        heightClass: 'h-[560px] sm:h-[660px]',
        narrations: [
          { text: 'A hidden console powers on inside the subterranean rock:', position: { top: '6%', left: '8%' } },
          { text: 'SUN WHEEL NETWORK · NODES ACTIVE: 7', position: { top: '13%', left: '8%' } },
          { text: 'Node 1: Aathirai (Released) · Nodes 2-7: UNKNOWN', position: { top: '20%', left: '8%' } },
          { text: 'END OF SEASON ONE', position: { bottom: '10%', right: '8%' } },
          { text: 'NEXT STORY ARC: SUN WHEELS: THE SEVEN CITIES', position: { bottom: '4%', right: '8%' } },
        ],
        dialogues: [
          { id: 'c10_d5', speaker: 'Ilan', text: '“Aathirai was only the first city... The network has awakened!”', type: 'shout', position: { bottom: '20%', left: '10%' } },
        ],
        sfx: [{ text: 'T H E  S E V E N  C I T I E S', color: '#f59e0b', size: 'xl', position: { top: '45%', left: '15%' } }],
      },
    ],
  },
];

// Map of chapter number to pages
export const ALL_CHAPTERS_PAGES: Record<number, MangaPageData[]> = {
  1: CH1_PAGES,
  2: CH2_PAGES,
  3: CH3_PAGES,
  4: CH4_PAGES,
  5: CH5_PAGES,
  6: CH6_PAGES,
  7: CH7_PAGES,
  8: CH8_PAGES,
  9: CH9_PAGES,
  10: CH10_PAGES,
};
