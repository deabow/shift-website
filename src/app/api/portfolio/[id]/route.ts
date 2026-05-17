import { deleteProject, updateProject } from "@/lib/portfolio-store";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const body = (await request.json()) as {
    title?: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string;
    published?: boolean;
  };

  const updated = await updateProject(context.params.id, {
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    videoUrl: body.videoUrl,
    published: body.published,
  });

  if (!updated) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const deleted = await deleteProject(context.params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
