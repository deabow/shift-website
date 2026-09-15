type ProjectVideoPlayerProps = {
  videoUrl: string;
  title: string;
  className?: string;
};

function getYouTubeEmbed(url: string) {
  const match =
    url.match(/youtube\.com\/watch\?v=([^&]+)/) ??
    url.match(/youtu\.be\/([^?&]+)/) ??
    url.match(/youtube\.com\/embed\/([^?&]+)/) ??
    url.match(/youtube\.com\/shorts\/([^?&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getVimeoEmbed(url: string) {
  // Check for unlisted format: vimeo.com/123456789/abcdef or ?h=abcdef
  const unlistedMatch = url.match(/vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/);
  if (unlistedMatch) {
    return `https://player.vimeo.com/video/${unlistedMatch[1]}?h=${unlistedMatch[2]}`;
  }
  const match =
    url.match(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)(?:[?&].*h=([a-zA-Z0-9]+))?/);
  if (match) {
    const id = match[1];
    const hash = match[2];
    return hash
      ? `https://player.vimeo.com/video/${id}?h=${hash}`
      : `https://player.vimeo.com/video/${id}`;
  }
  return null;
}

function getGoogleDriveEmbed(url: string) {
  const match =
    url.match(/drive\.google\.com\/file\/d\/([^/]+)/) ??
    url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
}

export function ProjectVideoPlayer({ videoUrl, title, className }: ProjectVideoPlayerProps) {
  const normalized = videoUrl.trim();
  const youtube = getYouTubeEmbed(normalized);
  const vimeo = getVimeoEmbed(normalized);
  const gdrive = getGoogleDriveEmbed(normalized);
  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(normalized);

  if (youtube || vimeo || gdrive) {
    const src = youtube ?? vimeo ?? gdrive ?? "";
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

