import type { IPackageImage } from "@/types/types";
import { getUploadSignedUrl, uploadToS3 } from "@/services/sharedService";

export const imageUploadSync = async (images: IPackageImage[]) => {

  const existingImages = images.filter(
    (img) => img.status === "UPLOADED" && img.key,
  );
  const removedImages = images.filter(
    (img) => img.status === "REMOVED" && !img.file,
  );
  const newImages = images.filter(
    (img) => img.status === "PENDING_UPLOAD" && img.file,
  );

  if (newImages.length === 0) {
    return [
      ...existingImages.map((img) => ({
        key: img.key,
        status: "UPLOADED" as const,
      })),
      ...removedImages.map((img) => ({
        key: img.key,
        status: "REMOVED" as const,
      })),
    ];
  }
  // 2. Prepare payload
  const payload = newImages.map((img) => ({
    fileName: img.file!.name,
    contentType: img.file!.type,
    fieldName: "package_images",
  }));

  // Get Signed URLs
  try {
    const response = await getUploadSignedUrl(payload);
    const presignedData = response.data;

    // 4. Parallel Upload to S3
    const uploadPromises = newImages.map(async (img, index) => {
      const targetS3 = presignedData[index];

      await uploadToS3(targetS3.url, img.file!);

      return {
        key: targetS3.key,
        status: "UPLOADED" as const,
      };
    });

    const newlyUploaded = await Promise.all(uploadPromises);
    // 5. Combine and Return
    return [
      ...existingImages.map((img) => ({
        key: img.key,
        status: "UPLOADED" as const,
      })),
      ...newlyUploaded,
      ...removedImages.map((img) => ({
        key: img.key,
        status: "REMOVED" as const,
      })),
    ];
  } catch (error) {
    console.error("S3 Sync Error:", error);
    throw new Error("Image upload failed. Please try again.");
  }
};
