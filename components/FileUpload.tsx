"use client";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileUploadDemo() {
  const [file, setFile] = useState<File | null>();

  const handleFileUpload = (file: File | null) => {
    setFile(file);
    console.log(file);
  };

  const handleSubmit = (file: File | null) => {
    // Process the files here
    console.log("Submitting files:", file);
    // You could add form submission logic here
    alert(`Submitting ${file?.name} file(s)`);
  };

  return (
    <>
      <div className="w-full mx-auto">
        <FileUpload onChange={handleFileUpload} onSubmit={handleSubmit} />
      </div>
    </>
  );
}
