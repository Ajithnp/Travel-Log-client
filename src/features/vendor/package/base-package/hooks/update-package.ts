import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { BasePackageDraftSchema } from "../validations/draft-base-package-schema";
import { useUpdatePackageMutation } from "./api.hooks";
import { toast } from "sonner";

export const useUpdatePackageHandler = (packageId: string) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdatePackageMutation();

  const handleFormSubmit = useCallback(
    (data: BasePackageDraftSchema) => {
      mutate(
        { packageId, payload: data },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            navigate("/vendor/packages");
          },
          onError: (error) => {
            toast.error(
              error?.response?.data?.message || error.message
            );
          },
        }
      );
    },
    [mutate, navigate, packageId]
  );

  return { handleFormSubmit, isPending };
};
