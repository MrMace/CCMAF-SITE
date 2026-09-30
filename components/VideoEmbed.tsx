/** Plays a YouTube link (embed) or a direct video file. */
export default function VideoEmbed({ url, poster, title }: { url: string; poster?: string; title: string }) {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return (
    <div className="aspect-video overflow-hidden rounded-3xl border border-line bg-surface">
      {yt ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <video src={url} poster={poster} controls preload="none" playsInline className="h-full w-full object-cover" />
      )}
    </div>
  );
}
