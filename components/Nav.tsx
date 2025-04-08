"use client";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="bg-background rounded-2xl container mx-auto w-full mt-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              Mix Split<sup className="text-xs">®</sup>
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <Button variant={"default"}>Sign in</Button>
        </div>
      </div>
    </nav>
  );
}
