import type { IPackageImage } from "@/types/types";
import { getUploadSignedUrl, uploadToS3 } from "@/services/sharedService";

export const imageUploadSync = async (images: IPackageImage[]) => {
  // 1. Separate: Who is already in S3 and who is a new local file?
  const existingImages = images.filter((img) => img.status === 'UPLOADED'  && img.key);
  const newImages = images.filter((img) => img.status === 'PENDING_UPLOAD' && img.file);

  if (newImages.length === 0) {
    return existingImages.map((img) => ({ url: img.url, key: img.key }));
  }
  // 2. Prepare payload
  const payload = newImages.map((img) => ({
    fileName: img.file!.name,
    contentType: img.file!.type,
    fieldName: "package_images",
  }));

  // 3. Get Signed URLs
  try {
    const response = await getUploadSignedUrl(payload);
    const presignedData = response.data;

    // 4. Parallel Upload to S3
    const uploadPromises = newImages.map(async (img, index) => {
      const targetS3 = presignedData[index];

      // uploadToS3 logic
      await uploadToS3(targetS3.url, img.file!);

      return {
        url: targetS3.url.split("?")[0], 
        key: targetS3.key,
      };
    });

    const newlyUploaded = await Promise.all(uploadPromises);
    // 5. Combine and Return
    return [
      ...existingImages.map((img) => ({ url: img.url!, key: img.key!,})),
      ...newlyUploaded,
    ];
  } catch (error) {
    console.error("S3 Sync Error:", error);
    throw new Error("Image upload failed. Please try again.");
  }
};
