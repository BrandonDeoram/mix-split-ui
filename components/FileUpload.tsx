"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { useUploadStore } from "@/store/uploadStore";
import { useState } from "react";

export default function AudioFileUpload() {
  // Store
  const setStep = useUploadStore((s) => s.setStep);
  const setError = useUploadStore((s) => s.setError);
  const setIsProcessing = useUploadStore((s) => s.setIsProcessing);
  const processingTime = useUploadStore((s) => s.processingTime);

  // Local state
  const [file, setFile] = useState<File | null>(null);
  const startProcessing = async () => {
    if (!file) return;

    setIsProcessing(true);
    setStep(0);
    setError(null);

    try {
      // Step 1: Generate presigned URL
      setStep(0);
      const presignedUrl = await generatePresignedUrl(file.name);

      // Step 2: Upload file
      setStep(1);
      await uploadFile(presignedUrl, file);

      // Step 3: Process data
      setStep(2);
      const data = await processData(file.name);

      // Set results
      setStep(3);
    } catch (err: any) {
      setError(err.message || "An error occurred during processing");
    } finally {
      // setIsProcessing(false);
    }
  };

  // Simulate generating a presigned URL
  const generatePresignedUrl = async (fileName: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://example.com/upload/${fileName}?token=abc123`);
      }, 2000); // 2 seconds delay
    });
  };

  // Simulate uploading a file
  const uploadFile = async (url: string, file: File): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000); // 3 seconds delay
    });
  };

  // Simulate processing data (with configurable time)
  const processData = async (fileName: string): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          fileName: fileName,
          duration: "3:45",
          transcription:
            "This is a sample transcription of the audio file. It contains multiple sentences that would represent the content of the uploaded audio.",
          sentiment: "positive",
          keywords: ["sample", "audio", "transcription", "analysis"],
          confidence: 0.89,
          language: "en-US",
          timestamp: new Date().toISOString(),
        });
      }, processingTime * 1000); // Convert seconds to milliseconds
    });
  };
  const handleFileUpload = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (file: File | null) => {
    startProcessing();
    console.log("Submitting files:", file);
    alert(`Submitting ${file?.name} file(s)`);
  };

  return (
    <>
      <div className="w-full mx-auto bg-transparent">
        <FileUpload onChange={handleFileUpload} onSubmit={handleSubmit} />
      </div>
    </>
  );
}
