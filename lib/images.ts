export function proxiedImageSrc(src: string) {
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("/api/image?src=")) {
    return src;
  }

  return `/api/image?src=${encodeURIComponent(src)}`;
}
