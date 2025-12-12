import { toast } from "sonner";
import {
  useGetUploadUrlMutation,
  useUploadToS3Mutation,
} from "@/hooks/api.hooks";

import { useUpdateProfileLogoMutation } from "./api.hooks";
import { AxiosError } from "axios";

type UseProfileLogoUpdateParams = {
  userId:string
}
export const useProfileLogoUpdate = ({userId}:UseProfileLogoUpdateParams) => {
  const { mutateAsync: getSignedUrls } = useGetUploadUrlMutation();
  const { mutateAsync: uploadToS3 } = useUploadToS3Mutation();
  const { mutateAsync: updateProfileLogo } = useUpdateProfileLogoMutation();

  const uploadProfilePhoto = async (file: File) => {
    try {
      const fields = [
        {
          fieldName: "ProfileLogo",
          fileName: file.name,
          contentType: file.type,
        },
      ];
      //get signed url
      const res = await getSignedUrls(fields);
      const { url, key } = res.data[0];
      // upload to s3
      await uploadToS3({ url, file });
      // update DB
      await updateProfileLogo({
        vendorInfoId: userId,
        files: [{ fieldName: "profileLogo", key }],
      });
      toast.success("Profile photo updated!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Upload failed");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Upload failed");
      }
    }
  };

  return { uploadProfilePhoto };
};
