import { BasePackageForm } from "../components/forms/base-package-form";
import { usePackageUpload } from "../hooks/upload-package";
import { usePackageFormController } from "../hooks/package-form-controller";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useState } from "react";
import type { BasePackageSchema } from "../validations/base-package-schema";

export default function BasePackageCreateFormPage() {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [pendingData, setPendingData] = useState<BasePackageSchema | null>(
    null,
  );

  const { handleFormSubmit, isPending } = usePackageUpload();
  const { handlePublish, handleDraft } =
    usePackageFormController(handleFormSubmit);

  const handlePublishRequest = (data: BasePackageSchema) => {
    setPendingData(data);
    setConfirmOpen(true);
  };

  const handleConfirmPublish = async () => {
    if (!pendingData) return;

    await handlePublish(pendingData);
    setConfirmOpen(false);
    setPendingData(null);
  };

  return (
    <main>
      <BasePackageForm
        mode={"create"}
        onPublish={handlePublishRequest}
        onDraft={handleDraft}
        isLoading={isPending}
      />
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="CONFIRM PUBLISH"
        description="Are you sure you want to publish this package?
         Once published, cannot be edited ."
        onConfirm={handleConfirmPublish}
        confirmText="Yes, Publish"
      />
    </main>
  );
}
