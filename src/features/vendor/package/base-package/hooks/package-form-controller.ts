import { useCallback } from "react";
import { imageUploadSync } from "@/utils/image-upload-sync";
import type {
  PublishPackagePayload,
  DraftPackagePayload,
  IPackageImage,
} from "@/types/types";
import type {
  BasePackageSchema,
} from "../validations/base-package-schema";
import type {
  BasePackageDraftSchema,
} from "../validations/draft-base-package-schema";

type PackageSubmissionPayload =
  | PublishPackagePayload
  | DraftPackagePayload;

export const usePackageFormController = (
  submitHandler: (payload: PackageSubmissionPayload) => void
) => {
  const processImages = useCallback(
    async (images?: IPackageImage[]): Promise<IPackageImage[]> => {
      if (!images || images.length === 0) return [];
      return await imageUploadSync(images);
    },
    []
  );

  const handlePublish = useCallback(
    async (data: BasePackageSchema) => {
      const uploadedImages = await processImages(data.images);

      const payload: PublishPackagePayload = {
        ...data,
        images: uploadedImages,
        status: "PUBLISHED",
      };

      submitHandler(payload);
    },
    [processImages, submitHandler]
  );

  const handleDraft = useCallback(
    async (data: BasePackageDraftSchema) => {
      const uploadedImages = await processImages(data.images);

      const payload: DraftPackagePayload = {
        ...data,
        images: uploadedImages,
        status: "DRAFT",
      };

      submitHandler(payload);
    },
    [processImages, submitHandler]
  );

  return { handlePublish, handleDraft };
};
