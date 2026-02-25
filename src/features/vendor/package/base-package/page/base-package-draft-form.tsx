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
import type { BasePackageResponseDTO } from "../validations/draft-base-package-schema";
import { Loader } from "@/components/common/loader";


export default function BasePackageDraftFormPage() {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [pendingData, setPendingData] = useState<BasePackageSchema | null>(null);

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

  if (!packageId) {
    return <div>Invalid package ID</div>;
  }

  if (isLoading || isPending || !data) {
    return <Loader message="Loading package data..." />;
  }

  if (error) {
    return <div>Failed to load package</div>;
  }

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
        mode={"edit"}
        initialData={data}
        onPublish={handlePublishRequest}
        onDraft={handleDraft}
      />
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="CONFIRM PUBLISH"
        description={
          <>
          Are you sure you want to publish this package?
          <br />
          Once published, cannot be edited.
        </>}
        onConfirm={handleConfirmPublish}
        confirmText="Yes, Publish"
      />
    </main>
  );
}
