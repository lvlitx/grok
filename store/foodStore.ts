import { create } from 'zustand';

interface FoodState {
  imageUri: string | null;
  analysis: any | null;
  isAnalyzing: boolean;
  error: string | null;
  setImageUri: (uri: string | null) => void;
  setAnalysis: (analysis: any | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useFoodStore = create<FoodState>((set) => ({
  imageUri: null,
  analysis: null,
  isAnalyzing: false,
  error: null,
  setImageUri: (uri) => set({ imageUri: uri }),
  setAnalysis: (analysis) => set({ analysis }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    imageUri: null, 
    analysis: null, 
    isAnalyzing: false, 
    error: null 
  }),
}));