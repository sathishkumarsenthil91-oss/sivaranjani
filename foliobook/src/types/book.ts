export type ReadingTheme = 'parchment' | 'ivory' | 'midnight';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type FontStyle = 'serif' | 'elegant' | 'sans';
export type LineSpacing = 'compact' | 'relaxed' | 'spacious';

export interface PageContent {
  id: number;
  pageNumber: number;
  chapterIndex: number;
  chapterNumber: number;
  chapterTitle: string;
  chapterSubtitle?: string;
  isChapterOpening?: boolean;
  illustration?: string;
  illustrationCaption?: string;
  paragraphs: string[];
  pullQuote?: {
    text: string;
    attribution?: string;
  };
  footnote?: string;
}

export interface Chapter {
  chapterNumber: number;
  title: string;
  subtitle: string;
  startPage: number;
  endPage: number;
  summary: string;
  illustration?: string;
}

export interface StoryBook {
  title: string;
  subtitle: string;
  author: string;
  authorBio: string;
  coverImage: string;
  description: string;
  genre: string;
  publishedYear: string;
  estimatedTotalReadMinutes: number;
  totalWords: number;
  chapters: Chapter[];
  pages: PageContent[];
}

export interface Bookmark {
  pageNumber: number;
  chapterTitle: string;
  timestamp: number;
  previewText: string;
}

export interface ReaderSettings {
  theme: ReadingTheme;
  fontSize: FontSize;
  fontStyle: FontStyle;
  lineSpacing: LineSpacing;
  soundEffects: boolean;
  ambientSound: boolean;
  twoPageSpread: boolean; // desktop spread
}
