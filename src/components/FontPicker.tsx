
import React from 'react';
import { Font, fontOptions } from '../utils/fontUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

interface FontPickerProps {
  selectedFont: Font;
  onFontChange: (font: Font) => void;
  onRandomFont: () => void;
}

const FontPicker: React.FC<FontPickerProps> = ({ 
  selectedFont, 
  onFontChange,
  onRandomFont
}) => {
  const handleFontChange = (value: string) => {
    const newFont = fontOptions.find(font => font.name === value);
    if (newFont) {
      onFontChange(newFont);
    }
  };
  
  return (
    <div className="glass p-4 rounded-lg transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Typography</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRandomFont}
          className="gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Randomize</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="font-family" className="text-sm mb-1.5 block">
            Font Family
          </label>
          <Select
            value={selectedFont.name}
            onValueChange={handleFontChange}
          >
            <SelectTrigger id="font-family">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map(font => (
                <SelectItem 
                  key={font.name} 
                  value={font.name}
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm mb-1.5 block">Preview</label>
          <div 
            className="p-3 bg-background/50 rounded-md border" 
            style={{ fontFamily: selectedFont.family }}
          >
            <h2 className="text-xl font-bold mb-1">The quick brown fox</h2>
            <p className="text-sm text-muted-foreground">
              Jumps over the lazy dog. 1234567890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontPicker;
