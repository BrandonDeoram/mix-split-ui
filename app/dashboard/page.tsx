"use client";
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
    <div>
      Dashboard
      <span>Current User {session?.user.name}</span>
    </div>
  );
}
