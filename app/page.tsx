import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div>
      <Nav />
      <main className="container text-foreground mx-auto w-full min-h-screen bg-background mt-20 gap-2 flex flex-col">
        <div className="absolute inset-0 bg-dots pointer-events-none z-0" />
        <section className="mx-3">
          <div className="mx-auto w-full relative max-w-[1200px] gap-8 overflow-clip rounded-xl py-6 md:py-20 bg-background px-1 md:px-1">
            <div className="flex flex-col pb-3.5 items-center text-center">
              <h1 className="font-cal !leading-xs md:!leading-h1 text-[32px] lg:text-5xl pb-3 font-bold">
                Transform Your Mix into Individual Tracks
              </h1>
              <p>
                Upload your mix, and we'll break it down into separate songs
                with precise timestamps. Whether you're a DJ, music producer, or
                just a fan of mixed sets, our tool makes it easy to extract and
                organize each track, complete with Spotify links for easy
                access.
              </p>
            </div>
            <Button variant={"default"}>Sign in</Button>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
