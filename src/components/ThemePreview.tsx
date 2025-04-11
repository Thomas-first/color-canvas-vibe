
import React from 'react';
import { Color } from '../utils/colorUtils';
import { Font } from '../utils/fontUtils';
import { Laptop, Mail, Menu, MessageCircle, ShoppingCart, Star, Users, X } from 'lucide-react';
import { Button } from './ui/button';

interface ThemePreviewProps {
  colors: Color[];
  selectedFont: Font;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ colors, selectedFont }) => {
  // Get colors by type for easier access
  const getColor = (type: string): string => {
    const color = colors.find(c => c.type === type);
    return color ? color.hex : '#000000';
  };
  
  const primary = getColor('primary');
  const secondary = getColor('secondary');
  const accent = getColor('accent');
  const background = getColor('background');
  const text = getColor('text');

  // Create CSS variables for the preview
  const previewStyle = {
    '--preview-primary': primary,
    '--preview-secondary': secondary,
    '--preview-accent': accent,
    '--preview-background': background,
    '--preview-text': text,
    '--preview-font': selectedFont.family,
  } as React.CSSProperties;
  
  return (
    <div 
      className="w-full h-[500px] rounded-lg overflow-hidden shadow-xl border flex flex-col animate-fade-in transition-all"
      style={previewStyle}
    >
      {/* Navbar */}
      <header 
        className="p-4 flex items-center justify-between shadow-sm"
        style={{ 
          backgroundColor: 'var(--preview-primary)',
          color: '#ffffff'
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span style={{ color: 'var(--preview-primary)', fontWeight: 'bold' }}>CV</span>
          </div>
          <h2 className="font-bold text-lg" style={{ fontFamily: 'var(--preview-font)' }}>
            BrandName
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6">
            <a href="#" className="text-white/90 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">About</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">Contact</a>
          </div>
          <Button 
            size="sm"
            style={{ 
              backgroundColor: 'white',
              color: 'var(--preview-primary)'
            }}
          >
            Get Started
          </Button>
          <Menu className="md:hidden" />
        </div>
      </header>
      
      {/* Hero Section */}
      <section 
        className="p-6 flex-grow flex flex-col items-center justify-center text-center"
        style={{ 
          backgroundColor: 'var(--preview-background)',
          color: 'var(--preview-text)',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 
            className="text-3xl md:text-4xl font-bold"
            style={{ 
              color: 'var(--preview-text)'
            }}
          >
            Your Brand Message Goes Here
          </h1>
          <p className="text-muted-foreground md:text-lg max-w-md mx-auto">
            This is a preview of how your website could look with the colors extracted from your image.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              size="lg"
              style={{ 
                backgroundColor: 'var(--preview-primary)', 
                color: 'white' 
              }}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              style={{ 
                borderColor: 'var(--preview-secondary)', 
                color: 'var(--preview-text)' 
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section 
        className="p-6 flex items-center justify-center"
        style={{ 
          backgroundColor: 'var(--preview-secondary)',
          color: 'var(--preview-text)',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: 'Feature One', icon: <Star style={{ color: 'var(--preview-accent)' }} /> },
            { title: 'Feature Two', icon: <Users style={{ color: 'var(--preview-primary)' }} /> },
            { title: 'Feature Three', icon: <MessageCircle style={{ color: 'var(--preview-secondary)' }} /> },
          ].map((feature, index) => (
            <div key={index} className="p-4 rounded-lg glass flex flex-col items-center text-center">
              <div className="p-3 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                A short description of what this feature does and why it's useful.
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer 
        className="p-4 flex items-center justify-between shadow-sm"
        style={{ 
          backgroundColor: 'var(--preview-accent)',
          color: '#ffffff'
        }}
      >
        <div className="text-sm">
          &copy; 2025 BrandName. All rights reserved.
        </div>
        <div className="flex gap-3">
          <a href="#" className="text-white/80 hover:text-white"><Mail size={16} /></a>
          <a href="#" className="text-white/80 hover:text-white"><Laptop size={16} /></a>
          <a href="#" className="text-white/80 hover:text-white"><ShoppingCart size={16} /></a>
        </div>
      </footer>
    </div>
  );
};

export default ThemePreview;
