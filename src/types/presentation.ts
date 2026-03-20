import type { Block } from './blocks';

export interface SlideData {
  id: string;
  order: number;
  blocks: Block[];
  background: {
    type: 'color' | 'gradient' | 'image';
    value: string;
  };
  notes: string;
  template?: string;
}

export interface PresentationTheme {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  darkMode: boolean;
}

export interface Presentation {
  id: string;
  title: string;
  slides: SlideData[];
  theme: PresentationTheme;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
