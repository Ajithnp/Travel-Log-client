import { toast } from "sonner";
import type{ VendorVerificationFormType } from "../validations/vendor.verification.schema";
import { useVerificationMutation } from "../../hooks/api.hooks";
import { useGetUploadUrlMutation } from "@/hooks/api.hooks";
import { useState } from "react";


type FileFieldKey = keyof Pick<
  VendorVerificationFormType,
  "businessLicence" | "businessPan" | "companyLogo" | "ownerIdentityProof"
>;

type TextPayload = Omit<
  VendorVerificationFormType,
  "businessLicence" | "businessPan" | "companyLogo" | "ownerIdentityProof"
>;

interface UploadedFile {
  fieldName: string;
  key: string;
}

const FILE_FIELDS: FileFieldKey[] = [
  "businessLicence",
  "businessPan",
  "companyLogo",
  "ownerIdentityProof",
];

function splitFormData(data: VendorVerificationFormType): {
  textPayload: TextPayload;
  fileMap: Record<FileFieldKey, File>;
} {
  const { businessLicence, businessPan, companyLogo, ownerIdentityProof, ...textPayload } = data;

  return {
    textPayload,
    fileMap: { businessLicence, businessPan, companyLogo, ownerIdentityProof },
  };
}

/** Upload a single file to S3 via presigned URL. Returns the S3 key on success. */
async function uploadFileToS3(
  presignedUrl: string,
  file: File,
): Promise<void> {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!res.ok) throw new Error(`S3 upload failed for "${file.name}" (${res.status})`);

}



export function useVendorVerificationSubmit(
  onSuccessCallback?: () => void
) {
 
  const [processing, setProcessing] = useState(false);
  
  const { mutate: getSignedUrls} = useGetUploadUrlMutation();
  const { mutate: verifyVendor } = useVerificationMutation();
  

  async function onSubmit(data: VendorVerificationFormType) {
    setProcessing(true);
    const { textPayload, fileMap } = splitFormData(data);

    const signedUrlRequests = FILE_FIELDS.map((fieldName) => ({
      fieldName,
      fileName: fileMap[fieldName].name,
      contentType: fileMap[fieldName].type,
    }));

    getSignedUrls(signedUrlRequests, {
      onSuccess: async (res) => {
        // ──  Upload all files to S3 in parallel
        const uploadResults = await Promise.allSettled(
          res.data.map(async (item) => {
            const file = fileMap[item.fieldName as FileFieldKey];

            if (!file) throw new Error(`No file found for field "${item.fieldName}"`);

            await uploadFileToS3(item.url, file);
            return {
              fieldName: item.fieldName,
              key: item.key,
            } satisfies UploadedFile;
          }),
        );

        const uploadedFiles: UploadedFile[] = [];
        const failedUploads: string[] = [];

        for (const result of uploadResults) {
          if (result.status === "fulfilled") {
            uploadedFiles.push(result.value);
          } else {
            console.error("Upload failed:", result.reason);
            failedUploads.push(result.reason?.message ?? "Unknown upload error");
          }
        }

        if (failedUploads.length > 0) {
          failedUploads.forEach((msg) => toast.error(msg));
          return; 
        }

        //  Submit final payload with S3 keys 
        verifyVendor(
          { ...textPayload, files: uploadedFiles },
          {
            onSuccess: (res) => {
              toast.success(res.message ?? "Verification submitted successfully");
              setProcessing(false);
              onSuccessCallback?.();
            },
            onError: (err) => {
              toast.error(err.message ?? "Verification submission failed");
                setProcessing(false);
            },
          },
        );
      },

      onError: (err) => {
        toast.error(err.message ?? "Failed to get upload URLs");
      },
    });
  }

  return { onSubmit, isPending: processing };
}