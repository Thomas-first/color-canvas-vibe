
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import DropZone from '../components/DropZone';
import ColorPicker from '../components/ColorPicker';
import FontPicker from '../components/FontPicker';
import ThemePreview from '../components/ThemePreview';
import { Color, ColorType, defaultColors, extractColorsFromImage, getColorMood, downloadPalette, shuffleColors } from '../utils/colorUtils';
import { Font, getRandomFont } from '../utils/fontUtils';
import { Badge } from '../components/ui/badge';
import { RefreshCw, Download, Upload, Palette } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Index = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<Color[]>(defaultColors);
  const [selectedFont, setSelectedFont] = useState<Font>(getRandomFont());
  const [isLoading, setIsLoading] = useState(false);
  const [colorMood, setColorMood] = useState('');
  const [selectedAnimation, setSelectedAnimation] = useState('none');
  
  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    
    try {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
      
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = async () => {
        setImage(img);
        
        try {
          const extractedColors = await extractColorsFromImage(img);
          setColors(extractedColors);
          setColorMood(getColorMood(extractedColors));
          
          toast({
            title: 'Colors extracted',
            description: 'We\'ve generated a palette based on your image'
          });
        } catch (error) {
          console.error('Error extracting colors:', error);
          toast({
            title: 'Error extracting colors',
            description: 'Please try with a different image',
            variant: 'destructive'
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      img.onerror = () => {
        toast({
          title: 'Error loading image',
          description: 'Please try with a different image',
          variant: 'destructive'
        });
        setIsLoading(false);
      };
      
      img.src = fileUrl;
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: 'Error processing image',
        description: 'Please try again or use a different image',
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  }, [toast]);
  
  const handleColorChange = useCallback((newColor: Color) => {
    setColors(prevColors => 
      prevColors.map(color => 
        color.type === newColor.type ? newColor : color
      )
    );
  }, []);
  
  const handleLockChange = useCallback((colorType: string, locked: boolean) => {
    setColors(prevColors => 
      prevColors.map(color => 
        color.type === colorType ? { ...color, locked } : color
      )
    );
  }, []);
  
  const handleShuffleColors = useCallback(() => {
    setColors(prevColors => shuffleColors(prevColors));
  }, []);
  
  const handleDownloadPalette = useCallback(() => {
    downloadPalette(colors);
  }, [colors]);
  
  const handleRandomFont = useCallback(() => {
    setSelectedFont(getRandomFont());
  }, []);
  
  const handleReset = useCallback(() => {
    setImage(null);
    setImageUrl(null);
    setColors(defaultColors);
    setSelectedFont(getRandomFont());
    setColorMood('');
    setSelectedAnimation('none');
  }, []);
  
  const handleAnimationChange = useCallback((animation: string) => {
    setSelectedAnimation(animation);
  }, []);
  
  useEffect(() => {
    if (colors) {
      setColorMood(getColorMood(colors));
    }
  }, [colors]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 md:px-8 border-b w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            <h1 className="font-bold text-2xl">ColorVibe</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow py-8 px-4 md:px-8 w-full">
        <div className="container mx-auto max-w-full">
          {!image ? (
            <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">
                  Generate website themes from your images
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  Upload an image and we'll extract colors to create a beautiful, cohesive website theme.
                </p>
              </div>
              
              <DropZone 
                onImageUpload={handleImageUpload}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Your Theme</h2>
                  {colorMood && (
                    <div className="flex items-center mt-1">
                      <Badge variant="outline">{colorMood} Mood</Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleShuffleColors}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span className="hidden sm:inline">Shuffle Colors</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleDownloadPalette}
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download Palette</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleReset}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="hidden sm:inline">New Image</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-9">
                  <Tabs defaultValue="preview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="preview">Theme Preview</TabsTrigger>
                      <TabsTrigger value="image">Source Image</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview" className="animate-fade-in">
                      <ThemePreview 
                        colors={colors}
                        selectedFont={selectedFont}
                        animation={selectedAnimation}
                      />
                    </TabsContent>
                    
                    <TabsContent value="image" className="animate-fade-in">
                      {imageUrl && (
                        <div className="w-full rounded-lg overflow-hidden border shadow-sm">
                          <img 
                            src={imageUrl} 
                            alt="Uploaded image" 
                            className="w-full h-[500px] object-contain"
                          />
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="lg:col-span-3 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Color Palette</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {colors.map((color) => (
                        <ColorPicker
                          key={color.type}
                          color={color}
                          onColorChange={handleColorChange}
                          onLockChange={handleLockChange}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <FontPicker
                    selectedFont={selectedFont}
                    onFontChange={setSelectedFont}
                    onRandomFont={handleRandomFont}
                    selectedAnimation={selectedAnimation}
                    onAnimationChange={handleAnimationChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 px-4 md:px-8 border-t w-full">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>ColorVibe - Generate beautiful themes from your images</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
