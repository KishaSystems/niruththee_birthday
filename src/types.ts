export interface MemoryPhoto {
  id: string;
  src: string;
  caption?: string;
  source: 'assets' | 'uploaded';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    teaseResponse?: string;
  }[];
  note?: string;
}

export interface AwardItem {
  id: string;
  icon: string;
  title: string;
  quote: string;
  accent: string;
  badge: string;
}

export interface StoryChapter {
  id: string;
  badge: string;
  chapterNumber: string;
  title: string;
  content: string;
  icon: string;
  date?: string;
}
