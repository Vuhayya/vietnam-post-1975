import type { MediaAsset } from "@vnr/shared";

/** Hien thi anh / video / audio cho cau hoi (dung cho ca Screen va Player). */
export default function Media({ media, className = "" }: { media?: MediaAsset; className?: string }) {
  if (!media?.url) return null;
  const base = `max-h-[40vh] max-w-full mx-auto rounded-xl ${className}`;
  if (media.kind === "image") return <img src={media.url} className={base} alt="" />;
  if (media.kind === "video")
    return <video src={media.url} controls className={base} playsInline />;
  if (media.kind === "audio") return <audio src={media.url} controls className="w-full mt-2" />;
  return null;
}
