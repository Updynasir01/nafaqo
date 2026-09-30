"use client";

import { youtubeId } from "@/lib/content-schema";

export default function HeroVideo({ video }: { video: string }) {
  const id = youtubeId(video);
  if (!id) return null;
  const src =
    "https://www.youtube.com/embed/" +
    id +
    "?autoplay=1&mute=1&loop=1&playlist=" +
    id +
    "&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <iframe
        src={src}
        title=""
        tabIndex={-1}
        allow="autoplay; encrypted-media"
        className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[100vw] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0"
      />
    </div>
  );
}
