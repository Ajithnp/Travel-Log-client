
import type { BasePackageDraftSchema } from "@/features/vendor/package/base-package/validations/draft-base-package-schema";
import type{ BasePackageSchema } from "@/features/vendor/package/base-package/validations/base-package-schema";
export type ImageStatus = "PENDING_UPLOAD" | "UPLOADED" | "REMOVED"

export interface IPackageImage {        // Local unique ID for UI keys
  url?: string;      // S3 URL (present if already uploaded)
  key: string;      // S3 Key (present if already uploaded)
  file?: File;       // Local File object (present if not yet uploaded)
  status?: ImageStatus; 
}

export type DraftPackagePayload = Partial<BasePackageDraftSchema> & {
  status: "DRAFT";
};

export type PublishPackagePayload = BasePackageSchema & {
  status: "PUBLISHED";
};


