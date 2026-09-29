export type ReadingMode = 'page' | 'webtoon';
export type ReaderBackground = 'dark' | 'oled' | 'sepia' | 'light';

export interface DialogueBubble {
  id: string;
  speaker?: string;
  text: string;
  type: 'speech' | 'thought' | 'shout' | 'whisper';
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  tailPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'none';
}

export interface NarrationBoxData {
  text: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export interface SoundEffect {
  text: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
  rotation?: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export interface ComicPanelData {
  id: string;
  title?: string;
  type: 'image' | 'scenic' | 'character' | 'action';
  image?: string;
  aspect?: string; // e.g. '16/9', '4/3', '1/1', '21/9', 'auto'
  heightClass?: string;
  bgGradient?: string;
  customIllustration?: React.ReactNode;
  speedLines?: boolean;
  dialogues?: DialogueBubble[];
  narrations?: NarrationBoxData[];
  sfx?: SoundEffect[];
  isColorSplash?: boolean;
}

export interface MangaPageData {
  pageNumber: number;
  chapterNumber: number;
  chapterTitle: string;
  isDoublePage?: boolean;
  layout: 'single-splash' | 'two-row' | 'three-panel-action' | 'vertical-stack' | 'panoramic';
  panels: ComicPanelData[];
}

export interface CharacterProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  role: string;
  status: 'Active' | 'Unknown' | 'Locked';
  description: string;
  abilities: string[];
  quote: string;
}

export interface ChapterMeta {
  chapterNumber: number;
  title: string;
  subtitle: string;
  releaseStatus: 'Available' | 'Coming Soon';
  totalPages: number;
  coverImage: string;
  synopsis: string;
}

export interface ReaderSettings {
  readingMode: ReadingMode;
  background: ReaderBackground;
  soundEffects: boolean;
  zoomLevel: number;
}
