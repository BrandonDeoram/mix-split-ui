"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const router = useRouter();
  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
  }
  return (
    <nav className="bg-transparent rounded-2xl container mx-auto w-full mt-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              Mix Split<sup className="text-xs">®</sup>
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          {session && !isPending ? (
            <Button variant={"default"} onClick={handleSignOut}>
              Sign out
            </Button>
          ) : (
            <Button variant={"default"} onClick={handleSignIn}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
