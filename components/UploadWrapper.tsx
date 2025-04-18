"use client";
import React, { useState } from "react";
import { FileProcessingStepper } from "./FileProcessingStepper";
import AudioFileUpload from "@/components/FileUpload";

export default function UploadWrapper() {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);

  console.log("Uplaod Component Wrapper re-rendeinrg");
  return (
    <>
      <div className="w-full mx-auto min-h-60 border border-dashed bg-transparent border-neutral-400 rounded-lg">
        <AudioFileUpload
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setError={setError}
        />
      </div>
      {(currentStep >= 0 || error) && (
        <div className="flex flex-col justify-center gap-2 p-4 items-center bg-accent-foreground rounded-xl mt-2">
          <h1 className="text-2xl">Processing Status</h1>
          <FileProcessingStepper currentStep={currentStep} error={error} />
        </div>
      )}
    </>
  );
}
