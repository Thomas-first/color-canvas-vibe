
import React, { useCallback } from 'react';
import { useToast } from '../hooks/use-toast';
import { UploadCloud, X } from 'lucide-react';

interface DropZoneProps {
  onImageUpload: (image: File) => void;
  isLoading: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ onImageUpload, isLoading }) => {
  const { toast } = useToast();
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    const files = Array.from(event.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPG, PNG, or WebP)',
        variant: 'destructive'
      });
    }
  }, [onImageUpload, toast]);
  
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);
  
  return (
    <div 
      className="w-full h-64 border-2 border-dashed rounded-lg relative overflow-hidden transition-all duration-300 group cursor-pointer glass"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input 
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-300">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-muted-foreground">Processing image...</p>
          </div>
        ) : (
          <>
            <UploadCloud size={40} className="text-primary/70 group-hover:text-primary transition-colors duration-300" />
            <div className="text-center">
              <p className="font-medium text-base">Drag & drop an image</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
              <p className="text-xs text-muted-foreground mt-4">
                Supports JPG, PNG, and WebP
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropZone;
