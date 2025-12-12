import type { IUser } from "@/types/IUser";
import { useCallback, useState } from "react";
import type { ProfileSchemaType } from "../validations/usese-profile-schema";
import { getChangedFields } from "@/utils/getChangedFields";
import { toast } from "sonner";
import type { IVendorInfo } from "@/types/IVendorInfo";


interface UseProfileUpdateParams {
  user: Partial<IVendorInfo>;
  onProfileUpdate: (data: Partial<IUser>) => void;
}

interface UseProfileUpdateReturn {
  showConfirm: boolean;
  prepareUpdate: (data: ProfileSchemaType) => void;
  confirmUpdate: () => void;
  closeConfirm: () => void;
}

const useProfileUpdate = ({
  user,
  onProfileUpdate,
}: UseProfileUpdateParams): UseProfileUpdateReturn => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<IUser> | null>(null);

  const prepareUpdate = useCallback(
    (data: ProfileSchemaType) => {
      const updated = getChangedFields(user, data);

      if (!Object.keys(updated).length) return toast.info("No changes");
      setFormData(updated);
      setShowConfirm(true);
    },
    [user]
  );

  const confirmUpdate = useCallback(() => {
    if (!formData) {
      toast.error("Nothing to update");
      return;
    }
    onProfileUpdate(formData);
    setShowConfirm(false);
  }, [formData, onProfileUpdate]);

  const closeConfirm = useCallback(() => {
      setShowConfirm(false);
      setFormData(null);
  }, []);

  return { showConfirm, prepareUpdate, confirmUpdate, closeConfirm };
};

export default useProfileUpdate;
