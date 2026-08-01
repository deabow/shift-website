import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { requireAuth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

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

    const filename = file.name || "upload";
    const ext = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    const extWithDot = `.${ext}`;

    if (!ALLOWED_EXTENSIONS.includes(extWithDot)) {
      logger.warn("upload", `Invalid file extension: ${extWithDot}`);
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}` },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadToCloudinary(buffer, filename, "shift-portfolio");

    logger.info("upload", `Uploaded file: ${filename} -> ${uploadResult.url.slice(0, 40)}...`);

    return NextResponse.json({ url: uploadResult.url });
  } catch (error) {
    logger.error("upload", "Upload failed", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

