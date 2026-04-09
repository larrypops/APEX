import { NextRequest } from "next/server";

const allowedHosts = new Set(["laserigniter.com", "www.laserigniter.com"]);

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");

  if (!src) {
    return new Response("Missing src", { status: 400 });
  }

  let parsed: URL;

  try {
    parsed = new URL(src);
  } catch {
    return new Response("Invalid src", { status: 400 });
  }

  if (parsed.protocol !== "https:" || !allowedHosts.has(parsed.hostname)) {
    return new Response("Unsupported image host", { status: 400 });
  }

  const upstream = await fetch(parsed.toString(), {
    headers: {
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Unable to fetch image", { status: 502 });
  }

  const headers = new Headers();
  headers.set("content-type", upstream.headers.get("content-type") || "image/jpeg");
  headers.set(
    "cache-control",
    upstream.headers.get("cache-control") || "public, max-age=86400, s-maxage=86400",
  );

  const contentLength = upstream.headers.get("content-length");
  if (contentLength) {
    headers.set("content-length", contentLength);
  }

  return new Response(upstream.body, {
    status: 200,
    headers,
  });
}
