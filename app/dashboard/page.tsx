"use client";
import FileUploadDemo from "@/components/FileUpload";
import { FileUpload } from "@/components/ui/file-upload";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function Dashboard() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  console.log("Current Session", session);
  return (
    <div className="container text-foreground mx-auto w-full min-h-screen bg-transparent mt-10 gap-2 flex flex-col">
      Dashboard
      <div className="w-full max-w-4xl mx-auto min-h-60 border border-dashed bg-accent-foreground border-neutral-400 rounded-lg">
        <FileUploadDemo />
      </div>
    </div>
  );
}
