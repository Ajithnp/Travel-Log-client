import { BasePackageForm } from "../components/forms/base-package-form";
import { usePackageUpload } from "../hooks/upload-package";
import { usePackageFormController } from "../hooks/package-form-controller";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useState } from "react";
import type { BasePackageSchema } from "../validations/base-package-schema";
import { PageHeader } from "@/components/shared/page-header";
import { useFetchCategories } from "@/features/vendor/category/hooks/api.hooks";
import { Loader } from "@/components/common/loader";
import type { BasePackageDraftSchema } from "../validations/draft-base-package-schema";

export default function BasePackageCreateFormPage() {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [pendingData, setPendingData] = useState<BasePackageDraftSchema |BasePackageSchema | null>(null);
  const [pendingAction, setPendingAction] = useState<"publish" | "draft" | null>(null);

  const { handleFormSubmit, isPending } = usePackageUpload();
  const { handlePublish, handleDraft } = usePackageFormController(handleFormSubmit);
  const { data: categories, isLoading } = useFetchCategories();

  const handlePublishRequest = (data: BasePackageSchema) => {
    setPendingData(data);
    setPendingAction("publish");
    setConfirmOpen(true);
  };

  const handleDraftRequest = (data: BasePackageDraftSchema) => {
    setPendingData(data);
    setPendingAction("draft");
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingData || !pendingAction) return;

    try {
      if (pendingAction === "publish") {
        await handlePublish(pendingData as BasePackageSchema);
      }
      if (pendingAction === "draft") {
        await handleDraft(pendingData as BasePackageDraftSchema);
      }
    } finally {
      setConfirmOpen(false);
      setPendingData(null);
      setPendingAction(null);
    }

  };

  if(isLoading || !categories?.data) return <Loader />

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
          categories={categories?.data}
          mode={"create"}
          onPublish={handlePublishRequest}
          onDraft={handleDraftRequest}
        />
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={(open) => {
            if (isPending) return
             setConfirmOpen(open);
          }}
          title={pendingAction === "publish" ? "CONFIRM PUBLISH" : "CONFIRM SAVE DRAFT"}
          description={
            pendingAction === "publish"
              ? "Are you sure you want to publish this package? Once published, cannot be edited."
              : "Are you sure you want to save this as a draft?"
          }
          onConfirm={handleConfirm}
          confirmText={pendingAction === "publish" ? "Yes, Publish" : "Yes, Save Draft"}
          loading={isPending}
        />
      </div>
    </div>
  );
}
