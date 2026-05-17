type ProjectVideoPlayerProps = {
  videoUrl: string;
  title: string;
  className?: string;
};

function getYouTubeEmbed(url: string) {
  const match =
    url.match(/youtube\.com\/watch\?v=([^&]+)/) ??
    url.match(/youtu\.be\/([^?&]+)/) ??
    url.match(/youtube\.com\/embed\/([^?&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getVimeoEmbed(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/) ?? url.match(/player\.vimeo\.com\/video\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : null;
}

export function ProjectVideoPlayer({ videoUrl, title, className }: ProjectVideoPlayerProps) {
  const normalized = videoUrl.trim();
  const youtube = getYouTubeEmbed(normalized);
  const vimeo = getVimeoEmbed(normalized);
  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(normalized);

  if (youtube || vimeo) {
    const src = youtube ?? vimeo ?? "";
    return (
      <iframe
        src={src}
        title={`${title} video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={className}
      />
    );
  }

  if (isDirectVideo) {
    return (
      <video
        src={normalized}
        controls
        playsInline
        preload="metadata"
        className={className}
      />
    );
  }

  return (
    <div
      className={`${className} flex items-center justify-center bg-black/40 text-sm text-zinc-300`}
    >
      Unsupported video URL
    </div>
  );
}
