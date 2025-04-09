import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import React from "react";

export default async function Dashboard() {
  const users: User[] = await prisma.user.findMany();
  return (
    <div>
      Dashboard
      {users ? users[0].email : ""}
    </div>
  );
}
