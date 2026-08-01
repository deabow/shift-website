import { logger } from "@/lib/logger";

export type UploadResult = {
  url: string;
  publicId?: string;
};

/**
 * Serverless-ready Cloudinary Media Uploader.
 * Uploads media buffers directly via Cloudinary REST API.
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


    if (unsignedPreset) {
      formData.append("upload_preset", unsignedPreset);
    }
    formData.append("folder", folder);

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
