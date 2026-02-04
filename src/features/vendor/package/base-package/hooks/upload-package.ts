import { toast } from "sonner";

import { useUploadPackageMutation } from "./api.hooks";
import { useNavigate } from "react-router-dom";

import { useCallback } from "react";
import type { BasePackageDraftSchema } from "../validations/draft-base-package-schema";

export const usePackageUpload = () => {
  // const navigate = useNavigate();
  const { mutate: uploadPackage, isPending } = useUploadPackageMutation();
  
  const handleFormSubmit = useCallback(
    (data: BasePackageDraftSchema) => {
      uploadPackage(data, {
        onSuccess: (res) => {
          toast.success(res.message);
          
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || error.message);
        },
      });
    },
    [uploadPackage] 
  );

  return { handleFormSubmit, isPending };
};
