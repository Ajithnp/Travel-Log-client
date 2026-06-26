
import type { SignedUrlMap } from "@/types/signed-urls";
import { isS3FileObject, isS3FileArray } from "./extract-keys";

//Merge signed URLs into array OR single-object fields (e.g., Package.images or Package.image)
export const mergeSignedUrlsToArrayFields = <T extends Record<string, unknown>>(
  data: T,
  arrayFields: (keyof T)[],
  signedUrlMap: SignedUrlMap,
): T => {
  const mergedData = { ...data };

  arrayFields.forEach((fieldName) => {
    const fieldValue = data[fieldName];

    if (isS3FileArray(fieldValue)) {
      
      const updatedArray = fieldValue.map((file) => {
        const signedUrl = signedUrlMap.get(file.key);
        return {
          ...file,
          url: signedUrl || undefined,
        };
      })
      mergedData[fieldName] = updatedArray as T[keyof T];
    } else if (isS3FileObject(fieldValue)) {
      // Handle single object: e.g. image: { key, url }
      const signedUrl = signedUrlMap.get(fieldValue.key);
      mergedData[fieldName] = {
        ...fieldValue,
        url: signedUrl || undefined,
      } as T[keyof T];
    }
  });

  return mergedData;
};

//Merge signed URLs into object fields (e.g., VendorInfo.profileLogo)

export const mergeSignedUrlsToObjectFields = <
  T extends Record<string, unknown>,
>(
  data: T,
  objectFields: (keyof T)[],
  signedUrlMap: SignedUrlMap,
): T => {
  const mergedData = { ...data };

  objectFields.forEach((fieldName) => {
    const fieldValue = data[fieldName];

    if (isS3FileObject(fieldValue)) {
      const signedUrl = signedUrlMap.get(fieldValue.key);

      mergedData[fieldName] = {
        ...fieldValue,
        url: signedUrl || undefined,
      } as T[keyof T];
    }
  });

  return mergedData;
};

//Merge signed URLs into multiple data items (for list/array responses)
export const mergeSignedUrlsToMultipleItems = <
  T extends Record<string, unknown>,
>(
  dataArray: T[],
  arrayFields: (keyof T)[],
  signedUrlMap: SignedUrlMap,
): T[] => {
  return dataArray.map((item) =>
    mergeSignedUrlsToArrayFields(item, arrayFields, signedUrlMap),
  );
};

// ==================== Helper Functions ====================

export const hasMissingSignedUrls = <T extends Record<string, unknown>>(
  data: T,
  imageFields: (keyof T)[],
): boolean => {
  for (const fieldName of imageFields) {
    const fieldValue = data[fieldName];

    if (isS3FileArray(fieldValue)) {
      const hasMissing = fieldValue.some((file) => !file.url);
      if (hasMissing) return true;
    }

    if (isS3FileObject(fieldValue)) {
      if (!fieldValue.url) return true;
    }
  }

  return false;
};


export const getSignedUrlStats = <T extends Record<string, unknown>>(
  data: T,
  imageFields: (keyof T)[],
): { total: number; loaded: number } => {
  let total = 0;
  let loaded = 0;

  imageFields.forEach((fieldName) => {
    const fieldValue = data[fieldName];

    if (isS3FileArray(fieldValue)) {
      total += fieldValue.length;
      loaded += fieldValue.filter((file) => file.url).length;
    }
    if (isS3FileObject(fieldValue)) {
      total += 1;
      loaded += fieldValue.url ? 1 : 0;
    }
  });

  return { total, loaded };
};
