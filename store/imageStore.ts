import { create } from 'zustand';
import { Platform } from 'react-native';

interface ImageState {
  imageUri: string | null;
  description: string | null;
  isAnalyzing: boolean;
  error: string | null;
  setImageUri: (uri: string | null) => void;
  setDescription: (description: string | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useImageStore = create<ImageState>((set) => ({
  imageUri: null,
  description: null,
  isAnalyzing: false,
  error: null,
  setImageUri: (uri) => set({ imageUri: uri }),
  setDescription: (description) => set({ description }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    imageUri: null, 
    description: null, 
    isAnalyzing: false, 
    error: null 
  }),
}));