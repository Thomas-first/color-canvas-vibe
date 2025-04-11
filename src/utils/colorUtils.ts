
import ColorThief from 'colorthief';

export type ColorType = 'primary' | 'secondary' | 'accent' | 'background' | 'text';
export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface Color {
  type: ColorType;
  hex: string;
  rgb: string;
  hsl: string;
  locked: boolean;
}

export const defaultColors: Color[] = [
  { type: 'primary', hex: '#3B82F6', rgb: 'rgb(59, 130, 246)', hsl: 'hsl(217, 91%, 60%)', locked: false },
  { type: 'secondary', hex: '#10B981', rgb: 'rgb(16, 185, 129)', hsl: 'hsl(160, 84%, 39%)', locked: false },
  { type: 'accent', hex: '#F97316', rgb: 'rgb(249, 115, 22)', hsl: 'hsl(24, 95%, 53%)', locked: false },
  { type: 'background', hex: '#F9FAFB', rgb: 'rgb(249, 250, 251)', hsl: 'hsl(210, 20%, 98%)', locked: false },
  { type: 'text', hex: '#111827', rgb: 'rgb(17, 24, 39)', hsl: 'hsl(222, 47%, 11%)', locked: false },
];

export const extractColorsFromImage = async (imageElement: HTMLImageElement): Promise<Color[]> => {
  try {
    const colorThief = new ColorThief();
    const palette = await colorThief.getPalette(imageElement, 8);
    
    return palette.slice(0, 5).map((color, index) => {
      const [r, g, b] = color;
      return {
        type: ['primary', 'secondary', 'accent', 'background', 'text'][index] as ColorType,
        hex: rgbToHex(r, g, b),
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: rgbToHsl(r, g, b),
        locked: false
      };
    });
  } catch (error) {
    console.error('Error extracting colors:', error);
    return defaultColors;
  }
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export const hexToRgb = (hex: string): { r: number, g: number, b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

export const rgbToHsl = (r: number, g: number, b: number): string => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

export const getColorMood = (colors: Color[]): string => {
  // Simple mood detection based on hues and saturation
  const hues: number[] = colors.map(color => {
    const hsl = color.hsl;
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    return match ? parseInt(match[1]) : 0;
  });
  
  const avgHue = hues.reduce((sum, hue) => sum + hue, 0) / hues.length;
  
  if (avgHue < 30 || avgHue > 330) return 'Passionate';
  if (avgHue >= 30 && avgHue < 70) return 'Energetic';
  if (avgHue >= 70 && avgHue < 150) return 'Natural';
  if (avgHue >= 150 && avgHue < 210) return 'Calm';
  if (avgHue >= 210 && avgHue < 270) return 'Professional';
  if (avgHue >= 270 && avgHue < 330) return 'Creative';
  
  return 'Balanced';
};

export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const luminance1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const luminance2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const ratio = luminance1 > luminance2
    ? (luminance1 + 0.05) / (luminance2 + 0.05)
    : (luminance2 + 0.05) / (luminance1 + 0.05);
  
  return ratio;
};

const getLuminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const shuffleColors = (colors: Color[]): Color[] => {
  return colors.map(color => {
    if (color.locked) return color;
    
    // Generate a new random color
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    return {
      ...color,
      hex: rgbToHex(r, g, b),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: rgbToHsl(r, g, b)
    };
  });
};

export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};

export const downloadPalette = (colors: Color[]): void => {
  const colorData = colors.map(color => `${color.type}: ${color.hex} / ${color.rgb} / ${color.hsl}`).join('\n');
  const blob = new Blob([colorData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'colorvibe-palette.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
