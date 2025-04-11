
import React, { useState } from 'react';
import { Color, ColorFormat, copyToClipboard } from '../utils/colorUtils';
import { Button } from './ui/button';
import { Copy, Lock, Unlock, Paintbrush } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Toggle } from './ui/toggle';

interface ColorPickerProps {
  color: Color;
  onColorChange: (newColor: Color) => void;
  onLockChange: (id: string, locked: boolean) => void;
  onHoverEffectChange?: (colorType: string, hoverEffect: string) => void;
  selectedHoverEffect?: string;
}

const hoverEffects = [
  { value: 'none', label: 'None' },
  { value: 'hover-scale', label: 'Scale' },
  { value: 'hover-elevate', label: 'Elevate' },
  { value: 'hover-glow', label: 'Glow' },
  { value: 'hover-bright', label: 'Brighten' },
];

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color, 
  onColorChange,
  onLockChange,
  onHoverEffectChange,
  selectedHoverEffect = 'none'
}) => {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>('hex');
  
  const handleCopy = async () => {
    await copyToClipboard(color[selectedFormat]);
    toast({
      title: 'Copied to clipboard',
      description: `${color[selectedFormat]} has been copied to your clipboard.`
    });
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleHoverEffectChange = (effect: string) => {
    if (onHoverEffectChange) {
      onHoverEffectChange(color.type, effect);
    }
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
      
      <div 
        className="w-full h-16 rounded mb-3 shadow-inner transition-colors duration-300" 
        style={{ backgroundColor: color.hex }}
      />
      
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
            readOnly={selectedFormat !== 'hex'}
          />
        </div>

        {onHoverEffectChange && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor={`hover-effect-${color.type}`}>Hover Effect</Label>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Paintbrush className="h-3.5 w-3.5" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 p-2">
                  <div className="text-xs text-muted-foreground">
                    Apply hover effects to elements using this color
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            {/* Remove the id prop from the Select component since it's not allowed by the component's type definition */}
            <Select
              value={selectedHoverEffect}
              onValueChange={handleHoverEffectChange}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select hover effect" />
              </SelectTrigger>
              <SelectContent>
                {hoverEffects.map(effect => (
                  <SelectItem 
                    key={effect.value} 
                    value={effect.value}
                    className="text-xs"
                  >
                    {effect.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
