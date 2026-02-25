export interface S3FileObject {
  key: string;
  url?: string; // Added after signed URL merge
}

export interface SignedUrlViewResponseType {
  key: string;
  url: string;
}

export type SignedUrlStatus = 'idle' | 'loading' | 'success' | 'error';

//  * Configuration for hooks that process array fields (like Package.images)
export interface ArrayFieldConfig<T> {
  userId: string; // ID for S3 access control
  imageFields: (keyof T)[]; // Array fields that contain images
  enabled?: boolean; // Optional: control when to fetch signed URLs
}

//  * Configuration for hooks that process object fields (like VendorInfo.profileLogo)

export interface ObjectFieldsConfig<T> {
  userId: string; // ID for S3 access control
  imageFields: (keyof T)[]; // Object fields that are images
  enabled?: boolean; // Optional: control when to fetch signed URLs
}

// ==================== Hook Return Types ====================

//  * Extended return type for data with signed URLs

export interface DataWithSignedUrls<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  signedUrlsStatus: SignedUrlStatus;
  signedUrlsError: Error | null;
  refetchSignedUrls: () => void; // Allow manual retry of signed URLs
}

// ==================== Utility Function Types ====================

//  * Map of S3 key to signed URL

export type SignedUrlMap = Map<string, string>;

//  * Result of key extraction
export interface ExtractedKeys {
  keys: string[];
  fieldMap: Map<string, string[]>; // fieldName -> keys mapping
}