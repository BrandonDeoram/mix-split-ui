import { create } from "zustand";

type UploadState = {
  currentStep: number;
  error: string | null;
  isProcessing: boolean;
  isFinished: boolean;
  processingTime: number;

  setStep: (step: number) => void;
  setError: (error: string | null) => void;
  setIsProcessing: (val: boolean) => void;
  setIsFinished: (val: boolean) => void;
};

export const useUploadStore = create<UploadState>((set) => ({
  currentStep: -1,
  error: null,
  isProcessing: false,
  isFinished: false,
  processingTime: 10,

  setStep: (step) => set(() => ({ currentStep: step })),
  setError: (error) => set(() => ({ error })),
  setIsProcessing: (val) => set(() => ({ isProcessing: val })),
  setIsFinished: (val) => set(() => ({ isFinished: val })),
}));
