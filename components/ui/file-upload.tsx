"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useUploadStore } from "@/store/uploadStore";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface FileUploadProps {
  onChange?: (file: File | null) => void;
  file?: File | null;
  onSubmit?: (file: File | null) => void;
}

export const FileUpload = ({
  onChange,
  file: externalFiles,
  onSubmit,
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(externalFiles || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setIsProcessing = useUploadStore((state) => state.setIsProcessing);
  // Update local file when external file prop changes
  useEffect(() => {
    if (externalFiles) {
      setFile(externalFiles);
    }
  }, [externalFiles]);

  const handleFileChange = (newFiles: File[]) => {
    const newFile = newFiles[0];
    if (newFile) {
      setFile(newFile);
      onChange?.(newFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setIsProcessing(false);
    setFile(null);
    onChange?.(null);
  };

  const handleSubmit = () => {
    onSubmit?.(file ?? null);
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full flex flex-col bg-transparent">
      <div className="w-full" {...getRootProps()}>
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
        >
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            accept="audio/*"
            type="file"
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-sans font-bold text-primary text-4xl">
              Upload file
            </p>
            <p className="relative z-20 font-sans font-normal text-muted-foreground text-2xl mt-2">
              Drag or drop your file here or click to upload
            </p>
            <div className="relative w-full mt-2 max-w-xl mx-auto">
              {file ? (
                <motion.div
                  layoutId="file-upload"
                  key={"file" + file.name}
                  className={cn(
                    "relative overflow-hidden z-40 bg-card flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-primary truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-muted-foreground">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ) : null}
              {!file && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-card flex items-center justify-center h-32 mt-4 w-full mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Drop it
                      <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <IconUpload className="h-4 w-4 text-primary" />
                  )}
                </motion.div>
              )}

              {!file && (
                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-primary inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full mx-auto rounded-md"
                ></motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end gap-4 mt-4 w-full mx-auto p-2">
        <Button
          size={"lg"}
          variant="outline"
          onClick={handleClear}
          className="text-muted-foreground"
        >
          Clear
        </Button>
        <Button
          onClick={handleSubmit}
          size={"lg"}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
