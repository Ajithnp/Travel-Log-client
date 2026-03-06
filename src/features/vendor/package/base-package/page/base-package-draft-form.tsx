import { BasePackageForm } from "../components/forms/base-package-form";
import { useParams } from "react-router-dom";
import { useUpdatePackageHandler } from "../hooks/update-package";
import { usePackageFormController } from "../hooks/package-form-controller";
import { useState } from "react";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import type { BasePackageSchema } from "../validations/base-package-schema";
import { useDataWithSignedUrls } from "@/hooks/s3/data-with-signed-urls";
import { useVendorId } from "@/features/vendor/hooks/vendor-id";
import { usePackagesFetchWithId } from "../hooks/api.hooks";
import type { BasePackageDraftSchema, BasePackageResponseDTO } from "../validations/draft-base-package-schema";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { useFetchCategories } from "@/features/vendor/category/hooks/api.hooks";
import { PageHeader } from "@/components/shared/page-header";


export default function BasePackageDraftFormPage() {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [pendingData, setPendingData] = useState<BasePackageSchema | BasePackageDraftSchema | null>(null);
  const [pendingAction, setPendingAction] = useState<"publish" | "draft" | null>(null);

  const { packageId } = useParams<{ packageId: string }>();
  const vendorId = useVendorId();

  const { data, isLoading, error } =
    useDataWithSignedUrls<BasePackageResponseDTO>(
      usePackagesFetchWithId(packageId ?? "", { enabled: !!packageId }),
      {
        userId: vendorId ?? '',
        imageFields: ['images'],

      }
    );

  const { handleFormSubmit, isPending } = useUpdatePackageHandler(
    packageId ?? "",
  );
  const { handlePublish, handleDraft, } = usePackageFormController(handleFormSubmit);
  const { data: categories, isLoading: isCategoryFetching, isError } = useFetchCategories();

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

  if (!packageId) {
    return <div>Invalid package ID</div>;
  }

  if (isLoading || isPending || !data || isCategoryFetching || !categories?.data) {
    return <Loader message="Loading package data..." />;
  }

  if (error || isError) {
    return <Error message={"Failed to load package"} />
  }

  return (
    <div className="bg-gradient-premium selection:bg-foreground/10 selection:text-foreground">
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
        <PageHeader
          title="Draft Base Package"
          description=" Build a new travel package by filling in the details below"
          primaryAction={{
            label: "← Back",
            onClick: () => window.history.back(),
          }}
        />
        <BasePackageForm
          categories={categories?.data}
          mode={"edit"}
          initialData={data}
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
