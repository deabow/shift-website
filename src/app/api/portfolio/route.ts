import { createProject, getAllProjects, getPublishedProjects } from "@/lib/portfolio-store";
import { checkRateLimit, applyRateLimitHeaders } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 30 };

export async function GET(request: NextRequest) {
  const publishedOnly = request.nextUrl.searchParams.get("published") === "true";

  logger.info("portfolio", `GET ${publishedOnly ? "(published)" : "(all)"}`);

  try {
    const data = publishedOnly ? await getPublishedProjects() : await getAllProjects();
    logger.info("portfolio", `Returned ${data.length} projects`);
    return NextResponse.json(data);
  } catch (error) {
    logger.error("portfolio", "Failed to read projects", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAuth();
  if (!auth.ok) return auth.response;

  const rateResult = checkRateLimit(request, RATE_LIMIT);

  if (!rateResult.allowed) {
    logger.warn("portfolio", "Rate limit exceeded for POST");
    const response = NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    );
    applyRateLimitHeaders(response, rateResult);
    return response;
  }

  let body: {
    title?: string;
    category?: string;
    clientType?: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string;
    gallery?: { type: "image" | "video"; url: string; caption?: string }[];
    liveUrl?: string;
    challenge?: string;
    solution?: string;
    results?: string;
    keyFeatures?: string[];
    published?: boolean;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    logger.warn("portfolio", "POST with invalid JSON body");
    return NextResponse.json(
      { error: "Request body is not valid JSON." },
      { status: 400 },
    );
  }

  if (!body.title?.trim() || !body.description?.trim()) {
    logger.warn("portfolio", "POST with missing required fields", {
      title: !!body.title,
      description: !!body.description,
    });
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 },
    );
  }

  const defaultImageUrl =
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
  const defaultVideoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  try {
    const created = await createProject({
      title: body.title.trim(),
      category: body.category?.trim() || "web-dev",
      clientType: body.clientType?.trim() || "Enterprise Client",
      description: body.description.trim(),
      imageUrl: body.imageUrl?.trim() || defaultImageUrl,
      videoUrl: body.videoUrl?.trim() || defaultVideoUrl,
      gallery: body.gallery,
      liveUrl: body.liveUrl?.trim(),
      challenge: body.challenge?.trim(),
      solution: body.solution?.trim(),
      results: body.results?.trim(),
      keyFeatures: body.keyFeatures,
      published: Boolean(body.published),
    });


    logger.info("portfolio", `Created project: ${created.id} (${created.slug})`);

    const response = NextResponse.json(created, { status: 201 });
    applyRateLimitHeaders(response, rateResult);
    return response;
  } catch (error) {
    logger.error("portfolio", "Failed to create project", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }

}
