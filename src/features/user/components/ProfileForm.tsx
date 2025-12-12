import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileSchemaType,
} from "../validations/usese-profile-schema";
import { item } from "@/features/vendor/animations/vendorProfile.animations";
import type { IVendorInfo } from "@/types/IVendorInfo";

interface ProfileFormProps {
  user: Partial<IVendorInfo>;
  onEmailChangeClick: () => void;
  onPasswordChangeClick: () => void;
  prepareUpdate: (data: ProfileSchemaType) => void;
}
const ProfileForm = ({
  user,
  prepareUpdate,
  onEmailChangeClick,
  onPasswordChangeClick,
}: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  return (
    <motion.form
      onSubmit={handleSubmit(prepareUpdate)}
      className="lg:col-span-2"
      variants={item}
    >
      <Card className="rounded-xl border border-border p-6 h-full">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Name</Label>
            <Input
              id="name"
              {...register("name", {
                setValueAs: (value) => value.trim(),
              })}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              placeholder="you@example.com"
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone", {
                setValueAs: (value) => value.trim(),
              })}
              placeholder="(000) 000-0000"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone.message as string}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer hover:scale-105 hover:bg-gray-200 transition-all duration-300"
              onClick={onEmailChangeClick}
            >
              Change Email
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer bg-gray-100 text-black hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-300"
              onClick={onPasswordChangeClick}
            >
              Change Password
            </Button>

            <div className="ms-auto flex items-center gap-2">
              <Button
                variant={"default"}
                type="submit"
                className="cursor-pointer hover:scale-105 hover:brightness-110"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.form>
  );
};

export default ProfileForm;
