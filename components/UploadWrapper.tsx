"use client";
import { FileProcessingStepper } from "./FileProcessingStepper";
import AudioFileUpload from "@/components/FileUpload";
import { useUploadStore } from "@/store/uploadStore";

export default function UploadWrapper() {
  const isProcessing = useUploadStore((state) => state.isProcessing);

  console.log("Uplaod Component Wrapper re-rendeinrg");
  console.log("is finished", isProcessing);
  return (
    <>
      <div className="w-full mx-auto min-h-60 border border-dashed bg-transparent border-neutral-400 rounded-lg">
        <AudioFileUpload />
      </div>
      {isProcessing && (
        <div className="flex flex-col justify-center gap-2 p-4 items-center bg-accent-foreground rounded-xl mt-2">
          <h1 className="text-2xl">Processing Status</h1>
          <FileProcessingStepper />
        </div>
      )}
    </>
  );
}
