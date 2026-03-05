import { BasePackageForm } from "../components/forms/base-package-form";
import { usePackageUpload } from "../hooks/upload-package";
import { usePackageFormController } from "../hooks/package-form-controller";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useState } from "react";
import type { BasePackageSchema } from "../validations/base-package-schema";
import { PageHeader } from "@/components/shared/page-header";

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
    <div className="bg-gradient-premium selection:bg-foreground/10 selection:text-foreground">
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
        <PageHeader
          title="Create Base Package"
          description=" Build a new travel package by filling in the details below"
          primaryAction={{
            label: "← Back",
            onClick: () => window.history.back(),
          }}
        />
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
      </div>
    </div>
  );
}
