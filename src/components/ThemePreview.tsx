
import React, { useEffect, useRef } from 'react';
import { Color } from '../utils/colorUtils';
import { Font } from '../utils/fontUtils';
import { Laptop, Mail, Menu, MessageCircle, ShoppingCart, Star, Users, X, CheckCircle, Phone, MapPin, Calendar, Coffee, Book, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface ThemePreviewProps {
  colors: Color[];
  selectedFont: Font;
  animation?: string;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ 
  colors, 
  selectedFont,
  animation = 'none',
}) => {
  // Ref to force component re-render when animation changes
  const key = useRef(0);
  
  // Update the key when animation changes to force a re-render
  useEffect(() => {
    key.current += 1;
  }, [animation]);
  
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

  // Build element class with appropriate animation
  const getElementClass = (baseClass: string) => {
    const classes = [baseClass];
    
    // Add animation class if specified and not 'none'
    if (animation && animation !== 'none') {
      classes.push(`animate-${animation}`);
    }
    
    return classes.join(' ');
  };

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
      key={key.current}
      className="w-full h-auto rounded-lg overflow-hidden shadow-xl border flex flex-col animate-fade-in transition-all"
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
          <div className={getElementClass("w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110")}>
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
            className={getElementClass("transition-transform")}
            style={{ 
              backgroundColor: 'white',
              color: 'var(--preview-primary)'
            }}
          >
            Get Started
          </Button>
          <Menu className="md:hidden hover:text-white/80 transition-colors cursor-pointer" />
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
            className={getElementClass("text-3xl md:text-4xl font-bold")}
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
              className={getElementClass("transition-transform hover:shadow-md")}
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
              className={getElementClass("transition-colors hover:bg-secondary/20")}
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
        className="p-6"
        style={{ 
          backgroundColor: 'var(--preview-secondary)',
          color: 'var(--preview-text)',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Feature One', icon: <Star className="h-6 w-6" style={{ color: 'var(--preview-accent)' }} /> },
              { title: 'Feature Two', icon: <Users className="h-6 w-6" style={{ color: 'var(--preview-primary)' }} /> },
              { title: 'Feature Three', icon: <MessageCircle className="h-6 w-6" style={{ color: 'var(--preview-accent)' }} /> },
            ].map((feature, index) => (
              <div 
                key={index} 
                className={getElementClass("p-4 rounded-lg glass flex flex-col items-center text-center transition-all")}
              >
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
        </div>
      </section>
      
      {/* About Section */}
      <section 
        className="p-6"
        style={{ 
          backgroundColor: 'var(--preview-background)',
          color: 'var(--preview-text)',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <div className={getElementClass("rounded-lg h-48 w-full")} style={{ backgroundColor: 'var(--preview-accent)', opacity: 0.7 }}></div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold">About Us</h2>
            <p className="text-sm text-muted-foreground">
              This section would include information about your company, mission, or the purpose of your website. 
              The styling matches the colors from your uploaded image.
            </p>
            <Button 
              className={getElementClass("transition-colors hover:opacity-90")}
              style={{ 
                backgroundColor: 'var(--preview-accent)', 
                color: 'white' 
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section 
        className="p-6"
        style={{ 
          backgroundColor: 'var(--preview-secondary)',
          color: 'var(--preview-text)',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Our Services</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
            We offer a range of professional services to help your business succeed.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <CheckCircle />, title: 'Service 1' },
              { icon: <Coffee />, title: 'Service 2' },
              { icon: <Book />, title: 'Service 3' },
              { icon: <Gift />, title: 'Service 4' },
            ].map((service, index) => (
              <Card 
                key={index} 
                className={getElementClass("flex flex-col items-center p-4 text-center shadow-sm border transition-all")}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}
                >
                  {service.icon}
                </div>
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Short description of this service and how it benefits customers.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        className="p-6"
        style={{ 
          backgroundColor: 'var(--preview-primary)',
          color: 'white',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((testimonial) => (
              <div 
                key={testimonial} 
                className={getElementClass("p-4 rounded-lg glass flex flex-col transition-all")}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <p className="italic mb-4">"This product has completely transformed how I work. Highly recommended!"</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--preview-accent)' }}></div>
                  <span className="font-medium">Customer Name</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section 
        className="p-6"
        style={{ 
          backgroundColor: 'var(--preview-background)',
          color: 'var(--preview-text)',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Pricing Plans</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
            Choose the perfect plan that fits your needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Basic', price: '$19', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
              { title: 'Pro', price: '$49', featured: true, features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'] },
              { title: 'Enterprise', price: '$99', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
            ].map((plan, index) => (
              <div 
                key={index}
                className={getElementClass(
                  `p-6 rounded-lg border flex flex-col transition-all ${plan.featured ? 'scale-105 shadow-lg' : 'shadow-sm'}`
                )}
                style={plan.featured ? { 
                  borderColor: 'var(--preview-primary)', 
                  backgroundColor: 'var(--preview-primary)',
                  color: 'white'
                } : {}}
              >
                <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                <div className="text-3xl font-bold mb-4">{plan.price}<span className="text-sm font-normal">/mo</span></div>
                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0" /> 
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={getElementClass("w-full transition-all")}
                  variant={plan.featured ? "default" : "outline"}
                  style={plan.featured ? { 
                    backgroundColor: 'white',
                    color: 'var(--preview-primary)'
                  } : {
                    borderColor: 'var(--preview-primary)',
                    color: 'var(--preview-primary)'
                  }}
                >
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        className="p-6"
        style={{ 
          backgroundColor: 'var(--preview-secondary)',
          color: 'var(--preview-text)',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Get In Touch</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
            Have questions? Contact us using the information below or fill out the form.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Our Location</h3>
                  <p className="text-sm text-muted-foreground">123 Business Avenue, Suite 100, New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div
                  className="mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone Number</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div
                  className="mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}
                >
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Address</h3>
                  <p className="text-sm text-muted-foreground">contact@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div
                  className="mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}
                >
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9AM - 5PM</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">First Name</label>
                    <div className="h-9 bg-white/50 rounded border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Last Name</label>
                    <div className="h-9 bg-white/50 rounded border" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm">Email</label>
                  <div className="h-9 bg-white/50 rounded border" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm">Message</label>
                  <div className="h-28 bg-white/50 rounded border" />
                </div>
                
                <Button 
                  className={getElementClass("w-full transition-transform")}
                  style={{ 
                    backgroundColor: 'var(--preview-primary)', 
                    color: 'white' 
                  }}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-10 px-6"
        style={{ 
          backgroundColor: 'var(--preview-accent)',
          color: 'white',
          fontFamily: 'var(--preview-font)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8 max-w-lg mx-auto">
            Join thousands of satisfied customers who have already made the switch.
          </p>
          <Button 
            size="lg"
            className={getElementClass("transition-all")}
            style={{ 
              backgroundColor: 'white',
              color: 'var(--preview-accent)'
            }}
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer 
        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
        style={{ 
          backgroundColor: 'var(--preview-primary)',
          color: '#ffffff'
        }}
      >
        <div className="text-sm">
          &copy; 2025 BrandName. All rights reserved.
        </div>
        <div className="flex gap-3">
          <a href="#" className="text-white/80 hover:text-white transition-colors"><Mail size={16} /></a>
          <a href="#" className="text-white/80 hover:text-white transition-colors"><Laptop size={16} /></a>
          <a href="#" className="text-white/80 hover:text-white transition-colors"><ShoppingCart size={16} /></a>
        </div>
      </footer>
    </div>
  );
};

export default ThemePreview;
