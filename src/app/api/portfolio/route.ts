import { createProject, getAllProjects, getPublishedProjects } from "@/lib/portfolio-store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const publishedOnly = request.nextUrl.searchParams.get("published") === "true";
  const data = publishedOnly ? await getPublishedProjects() : await getAllProjects();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    title?: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string;
    published?: boolean;
  };

  if (
    !body.title?.trim() ||
    !body.description?.trim() ||
    !body.imageUrl?.trim() ||
    !body.videoUrl?.trim()
  ) {
    return NextResponse.json(
      { error: "Title, description, imageUrl, and videoUrl are required." },
      { status: 400 },
    );
  }

  const created = await createProject({
    title: body.title.trim(),
    description: body.description.trim(),
    imageUrl: body.imageUrl.trim(),
    videoUrl: body.videoUrl.trim(),
    published: Boolean(body.published),
  });

  return NextResponse.json(created, { status: 201 });
}
