
import '@fontsource-variable/inter';
import '@fontsource-variable/montserrat';
import '@fontsource/playfair-display';

export interface Font {
  name: string;
  family: string;
  category: 'serif' | 'sans-serif' | 'display' | 'monospace';
  className: string;
}

export const fontOptions: Font[] = [
  {
    name: 'Inter',
    family: 'Inter, sans-serif',
    category: 'sans-serif',
    className: 'font-inter'
  },
  {
    name: 'Montserrat',
    family: 'Montserrat, sans-serif',
    category: 'sans-serif',
    className: 'font-montserrat'
  },
  {
    name: 'Playfair Display',
    family: 'Playfair Display, serif',
    category: 'serif',
    className: 'font-playfair'
  }
];

export const getRandomFont = (): Font => {
  const randomIndex = Math.floor(Math.random() * fontOptions.length);
  return fontOptions[randomIndex];
};

export const getFontsByCategory = (category: 'serif' | 'sans-serif' | 'display' | 'monospace'): Font[] => {
  return fontOptions.filter(font => font.category === category);
};
