"use client";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const handleSubmit = (files: File[]) => {
    // Process the files here
    console.log("Submitting files:", files);
    // You could add form submission logic here
    alert(`Submitting ${files.length} file(s)`);
  };

  return (
    <>
      <div className="w-full mx-auto">
        <FileUpload onChange={handleFileUpload} onSubmit={handleSubmit} />
      </div>
    </>
  );
}
