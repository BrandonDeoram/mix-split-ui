"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Progress } from "./ui/progress";
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from "./ui/stepper";
import { useUploadStore } from "@/store/uploadStore";

export function FileProcessingStepper() {
  const currentStep = useUploadStore((state) => state.currentStep);
  const setIsProcessing = useUploadStore((state) => state.setIsProcessing);

  const error = useUploadStore((state) => state.error);

  const [progressValue, setProgressValue] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (currentStep === 2) {
      // Start the progress timer when we're in the processing step
      setStartTime(Date.now());
      setElapsedTime(0);
      setProgressValue(0);
      setIsProcessing(true);

      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (currentStep === 3) {
      // Reset when complete
      console.log("Reset when complete");
      setProgressValue(100);
    } else {
      setStartTime(null);
      setElapsedTime(0);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 2) {
      // Slowly increase progress, but never reach 100% until complete
      setProgressValue(Math.min(95, elapsedTime / 3));
    }
  }, [elapsedTime, currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <Stepper
        value={currentStep}
        className="mb-8 gap-6 flex flex-col flex-wrap"
        orientation="horizontal"
      >
        <StepperItem
          step={0}
          completed={currentStep > 0}
          loading={currentStep === 0}
        >
          <StepperIndicator />
          <div className="ml-2">
            <StepperTitle>Generating presigned URL</StepperTitle>
            <StepperDescription>
              Preparing secure upload location
            </StepperDescription>
          </div>
          <StepperSeparator />
        </StepperItem>

        <StepperItem
          step={1}
          completed={currentStep > 1}
          loading={currentStep === 1}
        >
          <StepperIndicator />
          <div className="ml-2">
            <StepperTitle>Uploading audio</StepperTitle>
            <StepperDescription>Transferring file to server</StepperDescription>
          </div>
          <StepperSeparator />
        </StepperItem>

        <StepperItem
          step={2}
          completed={currentStep > 2}
          loading={currentStep === 2}
        >
          <StepperIndicator />
          <div className="ml-2">
            <StepperTitle>Processing data</StepperTitle>
            <StepperDescription>Analyzing audio content</StepperDescription>
          </div>
        </StepperItem>
      </Stepper>

      {currentStep === 2 && (
        <div className="space-y-2">
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Processing... {formatTime(elapsedTime)} elapsed</span>
            <span>{progressValue.toFixed(0)}%</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            This may take 3-5 minutes to complete. Please don't close this page.
          </p>
        </div>
      )}

      {currentStep === 3 && (
        <div className="bg-green-50 text-green-800 rounded-md p-4 flex items-center">
          <div className="mr-2 bg-green-100 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span>Processing complete! Results are displayed below.</span>
        </div>
      )}
    </div>
  );
}
