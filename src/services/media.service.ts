import { apiFetch } from "./api";

export type MediaFolder =
  | "products/images"
  | "products/videos"
  | "categories"
  | "banners"
  | "vendors/documents"
  | "users";

export interface PresignedResponse {
  uploadUrl: string;
  fileUrl: string;
  key: string;
}

/**
 * Uploads a file to S3 storage via a secure backend-generated presigned URL.
 * Falls back to local dev mock upload if AWS is not configured.
 * 
 * @param file The file to upload
 * @param folder Target folder prefix
 */
export async function uploadFile(file: File, folder: MediaFolder): Promise<string> {
  // 1. Get the presigned upload URL from our NestJS backend
  const data = await apiFetch<PresignedResponse>("/api/media/presigned-url", {
    method: "POST",
    body: JSON.stringify({
      folder,
      filename: file.name,
      contentType: file.type,
    }),
  });

  // 2. Perform the PUT request directly to S3 (or mock upload)
  const response = await fetch(data.uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file to storage: ${response.statusText}`);
  }

  // 3. Return the public file URL
  return data.fileUrl;
}
