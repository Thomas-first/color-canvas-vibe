
import React, { useState, useRef, useEffect } from 'react';
import { Color, ColorFormat, copyToClipboard } from '../utils/colorUtils';
import { Button } from './ui/button';
import { Copy, Lock, Unlock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface ColorPickerProps {
  color: Color;
  onColorChange: (newColor: Color) => void;
  onLockChange: (id: string, locked: boolean) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color, 
  onColorChange,
  onLockChange,
}) => {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>('hex');
  const [pickerColor, setPickerColor] = useState(color.hex);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  
  // Update the local picker color when the color prop changes
  useEffect(() => {
    setPickerColor(color.hex);
  }, [color.hex]);
  
  const handleCopy = async () => {
    await copyToClipboard(color[selectedFormat]);
    toast({
      title: 'Copied to clipboard',
      description: `${color[selectedFormat]} has been copied to your clipboard.`
    });
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (color.locked) return;
    
    const newValue = e.target.value;
    if (selectedFormat === 'hex') {
      // Update color based on hex input
      onColorChange({
        ...color,
        hex: newValue,
      });
    }
  };
  
  const handleLockClick = () => {
    onLockChange(color.type, !color.locked);
  };
  
  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (color.locked) return;
    
    const newColor = e.target.value;
    setPickerColor(newColor);
    onColorChange({
      ...color,
      hex: newColor,
    });
  };
  
  return (
    <div className="glass p-4 rounded-lg transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="capitalize font-medium text-sm">{color.type}</span>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={handleLockClick}
          >
            {color.locked ? (
              <Lock className="h-4 w-4" />
            ) : (
              <Unlock className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <div 
            className={`w-full h-16 rounded mb-3 shadow-inner transition-colors duration-300 cursor-pointer ${color.locked ? 'opacity-80' : ''}`}
            style={{ backgroundColor: color.hex }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="space-y-2">
            <p className="text-sm font-medium">Pick a color</p>
            <input
              ref={colorPickerRef}
              type="color"
              value={pickerColor}
              onChange={handleColorPickerChange}
              disabled={color.locked}
              className="w-32 h-32"
            />
          </div>
        </PopoverContent>
      </Popover>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <Label htmlFor={`color-${color.type}-value`}>Value</Label>
            <div className="flex text-xs bg-muted rounded-md overflow-hidden">
              {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map(format => (
                <button
                  key={format}
                  className={`px-2 py-1 uppercase ${selectedFormat === format ? 'bg-primary text-primary-foreground' : 'hover:bg-muted-foreground/10'}`}
                  onClick={() => setSelectedFormat(format)}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
          <Input
            id={`color-${color.type}-value`}
            value={color[selectedFormat]}
            onChange={handleColorChange}
            className="font-mono text-sm"
            readOnly={selectedFormat !== 'hex' || color.locked}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
