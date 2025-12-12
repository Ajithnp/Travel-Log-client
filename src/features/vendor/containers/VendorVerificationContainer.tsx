import { toast } from "sonner";
import { type VendorVerificationFormType } from "../validations/vendor.verification.schema";
import { useVerificationMutation } from "../hooks/api.hooks";
import { VendorVerificationForm } from "../componenets/VendorVerificationForm";
import { useNavigate } from "react-router-dom";
import { useGetUploadUrlMutation } from "@/hooks/api.hooks";

const VendorVerificationContainer = () => {
  const navigate = useNavigate();
  const { mutate: verifyVendor, isPending: isLoading } =
    useVerificationMutation();
  const { mutate: getSignedUrls, isPending } = useGetUploadUrlMutation();

  const onSubmit = (data: VendorVerificationFormType) => {
    const textData: Partial<Record<keyof VendorVerificationFormType, string>> =
      {};
    const fileFields: Partial<
      Record<keyof VendorVerificationFormType, File[]>
    > = {};

    for (const key in data) {
      const field = key as keyof VendorVerificationFormType;
      const value = data[field];

      if (value instanceof FileList) {
        fileFields[field] = Array.from(value);
      } else {
        textData[field] = value as string;
      }
    }


    // Combine all files from all file fields
    const allFiles = Object.entries(fileFields).flatMap(([fieldName, files]) =>
      files.map((file) => ({
        fieldName,
        fileName: file.name,
        contentType: file.type,
      }))
    );

    getSignedUrls(allFiles, {
      onSuccess: async (res) => {

        const uploadData = res.data;
        const uploadPromises = uploadData.map(async (item) => {
          try {
            const files = fileFields[item.fieldName as keyof VendorVerificationFormType];

            if (!files) return undefined;

            const file = files.find((f: File) => f.name === item.name);
            if (!file) {
              toast.error(`File not found for ${item.name}`);
              return undefined;
            }

            const uploadResponse = await fetch(item.url, {
              method: "PUT",
              headers: {
                "Content-Type": file.type,
              },
              body: file,
            });

            if (!uploadResponse.ok) {
              toast.error(`Failed to upload ${item.name}`);
              return undefined;
            };

            return { fieldName: item.fieldName, key: item.key };
          } catch (err) {
            console.error("Error during file upload for item:", item, err); // <<-- ADD THIS
            toast.error(`Upload error for ${item.name || item.fieldName}`);
            return undefined;
          }
        });

        // Wait for all uploads to complete
        const uploadedFiles = (await Promise.all(uploadPromises)).filter(Boolean);
        // Now Stage 2: save everything to DB
        const uploadedFileArray = uploadedFiles.filter(Boolean);
        const payload = {
          ...textData,
          files:uploadedFileArray
        }
        
       
        verifyVendor(
          payload,

          {
            onSuccess: (res) => {
              toast.success(
                res.message || "Verification form sent successfully"
              );
              navigate("/vendor/profile");
            },
            onError: () => toast.error("Verification form submission failed"),
          }
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }
  
  return <VendorVerificationForm
    onSubmit={onSubmit}
    isPending={isPending} />;
};

export default VendorVerificationContainer;
