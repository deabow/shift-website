import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { logger } from "@/lib/logger";
import { requireAuth } from "@/lib/auth";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".mp4",
  ".webm",
  ".ogg",
  ".mov",
  ".avi",
];

export async function POST(request: NextRequest) {
  const auth = requireAuth();
  if (!auth.ok) return auth.response;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      logger.warn("upload", "No file in request");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      logger.warn("upload", `File too large: ${file.size} bytes`);
      return NextResponse.json(
        { error: "File size exceeds 50MB limit." },
        { status: 400 },
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      logger.warn("upload", `Invalid file extension: ${ext}`);
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}` },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `vid_${Date.now()}${ext}`;
    const publicDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(path.join(publicDir, filename), buffer);

    logger.info("upload", `Uploaded: ${filename} (${buffer.length} bytes)`);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    logger.error("upload", "Upload failed", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
