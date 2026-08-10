import { createHash } from "crypto";
import { logger } from "@/lib/logger";

export type UploadResult = {
  url: string;
  publicId?: string;
};

/**
 * Serverless-ready Cloudinary Media Uploader.
 * Uploads media buffers directly via Cloudinary REST API.
 *
 * Supports two modes:
 *   1. **Unsigned upload** — when CLOUDINARY_UPLOAD_PRESET is set
 *   2. **Signed upload**  — when CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET are set
 *      (generates SHA-1 signature per Cloudinary docs)
 *
 * If Cloudinary environment variables are missing, provides a clean Data URI fallback.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  fileName: string,
  folder: string = "shift-agency",
): Promise<UploadResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const unsignedPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  // Determine mime type from file extension
  const ext = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
  const isVideo = ["mp4", "webm", "ogg", "mov", "avi"].includes(ext);
  const mimeType = isVideo
    ? `video/${ext === "mov" ? "mp4" : ext}`
    : `image/${ext === "svg" ? "svg+xml" : ext === "jpg" ? "jpeg" : ext}`;

  // If Cloudinary credentials are missing, use Base64 Data URI fallback (Vercel-safe, non-filesystem)
  if (!cloudName || (!unsignedPreset && (!apiKey || !apiSecret))) {
    logger.warn(
      "cloudinary",
      "Cloudinary credentials missing (CLOUDINARY_CLOUD_NAME / CLOUDINARY_UPLOAD_PRESET / API keys). Using Data URI fallback.",
    );
    const base64 = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64}`;
    return { url: dataUri };
  }

  try {
    const resourceType = isVideo ? "video" : "image";
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const formData = new FormData();
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: mimeType });
    formData.append("file", blob, fileName);
    formData.append("folder", folder);

    if (unsignedPreset) {
      // ── Unsigned upload mode ──
      formData.append("upload_preset", unsignedPreset);
    } else if (apiKey && apiSecret) {
      // ── Signed upload mode ──
      // Cloudinary requires: api_key, timestamp, signature
      // signature = SHA1("folder=<folder>&timestamp=<ts><api_secret>")
      const timestamp = Math.floor(Date.now() / 1000).toString();

      // Parameters that affect the signature must be sorted alphabetically
      const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = createHash("sha1").update(signaturePayload).digest("hex");

      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
    }

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Cloudinary API upload failed");
    }

    const data = (await response.json()) as { secure_url: string; public_id: string };
    logger.info("cloudinary", `Successfully uploaded ${fileName} to Cloudinary: ${data.secure_url}`);

    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    logger.error("cloudinary", "Cloudinary upload failed, falling back to Data URI", error);
    const base64 = buffer.toString("base64");
    return { url: `data:${mimeType};base64,${base64}` };
  }
}
