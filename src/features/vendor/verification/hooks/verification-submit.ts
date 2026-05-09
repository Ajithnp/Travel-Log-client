import { toast } from "sonner";
import type { VendorVerificationFormType } from "../validations/vendor.verification.schema";
import { useVerificationMutation } from "../../hooks/api.hooks";
import { useGetUploadUrlMutation } from "@/hooks/api.hooks";
import { useState } from "react";

type FileFieldKey = keyof Pick<
  VendorVerificationFormType,
  "businessLicence" | "businessPan" | "companyLogo" | "ownerIdentityProof"
>;

const FILE_FIELDS: FileFieldKey[] = [
  "businessLicence",
  "businessPan",
  "companyLogo",
  "ownerIdentityProof",
];

/** Upload a single file to S3 via presigned URL. Returns the S3 key on success. */
async function uploadFileToS3(presignedUrl: string, file: File): Promise<void> {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!res.ok)
    throw new Error(`S3 upload failed for "${file.name}" (${res.status})`);
}

export function useVendorVerificationSubmit({
  vendorInfoId,
  isReapply,
  onSuccess,
}: {
  vendorInfoId?: string;
  isReapply: boolean;
  onSuccess?: () => void;
}) {
  const [processing, setProcessing] = useState(false);

  const { mutate: getSignedUrls } = useGetUploadUrlMutation();
  const { mutate: verifyVendor } = useVerificationMutation(
    isReapply,
    vendorInfoId,
  );

  async function onSubmit(data: VendorVerificationFormType) {
    setProcessing(true);

    // Split into new uploads vs already-on-S3
    const newFiles: { fieldName: FileFieldKey; file: File }[] = [];
    const existingKeys: { fieldName: string; key: string }[] = [];

    for (const fieldName of FILE_FIELDS) {
      const value = data[fieldName];
      if (value instanceof File) {
        newFiles.push({ fieldName, file: value });
      } else {
        //e key, no upload needed
        existingKeys.push({ fieldName, key: value.key });
      }
    }

    // Text fields (unchanged)
    const { ...textPayload } = data;

    // If no new files, skip S3 entirely
    if (newFiles.length === 0) {
      verifyVendor(
        { ...textPayload, files: existingKeys },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            onSuccess?.();
          },
          onError: (err) => {
            toast.error(err.message);
            setProcessing(false);
          },
        },
      );
      return;
    }

    // Get presigned URLs only for new files
    const signedUrlRequests = newFiles.map(({ fieldName, file }) => ({
      fieldName,
      fileName: file.name,
      contentType: file.type,
    }));

    getSignedUrls(signedUrlRequests, {
      onSuccess: async (res) => {
        const uploadResults = await Promise.allSettled(
          res.data.map(async (item) => {
            const { file } = newFiles.find(
              (f) => f.fieldName === item.fieldName,
            )!;
            await uploadFileToS3(item.url, file);
            return { fieldName: item.fieldName, key: item.key };
          }),
        );

        const uploadedFiles: { fieldName: string; key: string }[] = [];
        const failed: string[] = [];

        for (const result of uploadResults) {
          if (result.status === "fulfilled") uploadedFiles.push(result.value);
          else failed.push(result.reason?.message ?? "Unknown upload error");
        }

        if (failed.length > 0) {
          failed.forEach((msg) => toast.error(msg));
          setProcessing(false);
          return;
        }

        // Merge newly uploaded + existing keys → single files array
        const allFiles = [...existingKeys, ...uploadedFiles];

        verifyVendor(
          { ...textPayload, files: allFiles },
          {
            onSuccess: (res) => {
              toast.success(res.message);
              onSuccess?.();
            },
            onError: (err) => {
              toast.error(err.message);
              setProcessing(false);
            },
          },
        );
      },
      onError: (err) => {
        toast.error(err.message);
        setProcessing(false);
      },
    });
  }

  return { onSubmit, isPending: processing };
}
