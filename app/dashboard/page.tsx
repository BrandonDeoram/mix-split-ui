"use client";
import UploadWrapper from "@/components/UploadWrapper";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function Dashboard() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  console.log("Dashoard Re-rendering");
  return (
    <div className="container text-foreground mx-auto w-full min-h-screen bg-transparent mt-10 gap-2 flex flex-col">
      Dashboard
      <div className="w-full mx-auto min-h-60 bg-transparent border-neutral-400 rounded-lg">
        <UploadWrapper />
      </div>
    </div>
  );
}
