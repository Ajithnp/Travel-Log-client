import type { S3FileObject, ExtractedKeys, SignedUrlMap } from '@/types/signed-urls';

//Check if value is an S3 file object with a key

export const isS3FileObject = (value: unknown): value is S3FileObject => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'key' in value &&
    typeof (value as S3FileObject).key === 'string'
  );
};

//Check if value is an array of S3 file objects
export const isS3FileArray = (value: unknown): value is S3FileObject[] => {
  return Array.isArray(value) && value.every(isS3FileObject);
};

// ==================== Key Extraction Functions ====================
//Extract S3 keys from array fields (e.g., Package.images)
export const extractKeysFromArrayFields = <T extends Record<string, unknown>>(
  data: T,
  arrayFields: (keyof T)[]
): ExtractedKeys => {
  const keys: string[] = [];
  const fieldMap = new Map<string, string[]>();

  arrayFields.forEach((fieldName) => {
    const fieldValue = data[fieldName];
    
    if (isS3FileArray(fieldValue)) {
      const fieldKeys = fieldValue
        .map((file) => file.key)
        .filter((key) => key && key.trim() !== ''); 
      
      if (fieldKeys.length > 0) {
        keys.push(...fieldKeys);
        fieldMap.set(String(fieldName), fieldKeys);
      }
    }
  });

  return { keys: [...new Set(keys)], fieldMap }; 
};

//Extract S3 keys from object fields (e.g., VendorInfo.profileLogo)

export const extractKeysFromObjectFields = <T extends Record<string, unknown>>(
  data: T,
  objectFields: (keyof T)[]
): ExtractedKeys => {
  const keys: string[] = [];
  const fieldMap = new Map<string, string[]>();

  objectFields.forEach((fieldName) => {
    const fieldValue = data[fieldName];
    
    if (isS3FileObject(fieldValue)) {
      const key = fieldValue.key;
      
      if (key && key.trim() !== '') {
        keys.push(key);
        fieldMap.set(String(fieldName), [key]);
      }
    }
  });

  return { keys: [...new Set(keys)], fieldMap };
};


//Extract keys from multiple data items (for list/array responses)
export const extractKeysFromMultipleItems = <T extends Record<string, unknown>>(
  dataArray: T[],
  arrayFields: (keyof T)[]
): ExtractedKeys => {
  const allKeys: string[] = [];
  const combinedFieldMap = new Map<string, string[]>();

  dataArray.forEach((item) => {
    const { keys, fieldMap } = extractKeysFromArrayFields(item, arrayFields);
    allKeys.push(...keys);
    
    fieldMap.forEach((keys, fieldName) => {
      const existing = combinedFieldMap.get(fieldName) || [];
      combinedFieldMap.set(fieldName, [...existing, ...keys]);
    });
  });

  return { keys: [...new Set(allKeys)], fieldMap: combinedFieldMap };
};


//Create a map of S3 key to signed URL from API response

export const createSignedUrlMap = (
  signedUrlsResponse: { key: string; url: string }[]
): SignedUrlMap => {
  const urlMap = new Map<string, string>();
  
  signedUrlsResponse.forEach(({ key, url }) => {
    if (key && url) {
      urlMap.set(key, url);
    }
  });
  
  return urlMap;
};