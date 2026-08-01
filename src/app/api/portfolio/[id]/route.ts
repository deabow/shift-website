import { deleteProject, updateProject } from "@/lib/portfolio-store";
import { checkRateLimit, applyRateLimitHeaders } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    id: string;
  };
};

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 30 };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = requireAuth();
  if (!auth.ok) return auth.response;

  const rateResult = checkRateLimit(request, RATE_LIMIT);

  if (!rateResult.allowed) {
    logger.warn("portfolio/[id]", "Rate limit exceeded for PATCH");
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
    logger.warn("portfolio/[id]", "PATCH with invalid JSON body");
    return NextResponse.json(
      { error: "Request body is not valid JSON." },
      { status: 400 },
    );
  }

  try {
    const updated = await updateProject(context.params.id, {
      title: body.title,
      category: body.category,
      clientType: body.clientType,
      description: body.description,
      imageUrl: body.imageUrl,
      videoUrl: body.videoUrl,
      gallery: body.gallery,
      liveUrl: body.liveUrl,
      challenge: body.challenge,
      solution: body.solution,
      results: body.results,
      keyFeatures: body.keyFeatures,
      published: body.published,
    });



    if (!updated) {
      logger.warn("portfolio/[id]", `Project not found: ${context.params.id}`);
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    logger.info("portfolio/[id]", `Updated project: ${updated.id}`);
    const response = NextResponse.json(updated);
    applyRateLimitHeaders(response, rateResult);
    return response;
  } catch (error) {
    logger.error("portfolio/[id]", "Failed to update project", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const auth = requireAuth();
  if (!auth.ok) return auth.response;

  try {
    const deleted = await deleteProject(context.params.id);
    if (!deleted) {
      logger.warn("portfolio/[id]", `Project not found for delete: ${context.params.id}`);
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    logger.info("portfolio/[id]", `Deleted project: ${context.params.id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("portfolio/[id]", "Failed to delete project", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
