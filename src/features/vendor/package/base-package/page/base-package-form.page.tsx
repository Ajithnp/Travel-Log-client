
import { BasePackageForm } from "../components/forms/base-package-form"
import { imageUploadSync } from "@/utils/image-upload-sync";
import { usePackageUpload } from "../hooks/upload-package";
import type { PublishPackagePayload, DraftPackagePayload } from "@/types/types";
import type { BasePackageSchema } from "../validations/base-package-schema";
import type { BasePackageDraftSchema } from "../validations/draft-base-package-schema";

export default function BasePackageFormPage() {

  const { handleFormSubmit, isPending } = usePackageUpload();

  const handleSubmit = async (data: BasePackageSchema) => {
    const uploadedImages = await imageUploadSync(data?.images);

    const finalPayload: PublishPackagePayload = {
      ...data,
      images: uploadedImages,
      status: "PUBLISH"

    };
    handleFormSubmit(finalPayload)
  }

  const handleDraftSubmit = async (data: BasePackageDraftSchema) => {

    const images = data.images ?? [];
    let uploadedImages = images;

    if (images.length > 0) {
       uploadedImages = await imageUploadSync(images);
    }
    
    const payload: DraftPackagePayload = {
      ...data,
      images: uploadedImages,
      status: "DRAFT",
    };
    handleFormSubmit(payload)
  }

  return (
    <main>
      <BasePackageForm
        mode={"create"}
        onPublish={handleSubmit}
        onDraft={handleDraftSubmit}
        isLoading={isPending}
      />
    </main>
  )
}