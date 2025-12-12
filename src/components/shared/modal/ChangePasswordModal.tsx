import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPassword: string, oldPassword: string) => void;
  isLoading?: boolean;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ChangeEmailModalProps) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();


  const onFormSubmit = (data: FormValues) => {
    onSubmit(data.newPassword, data.oldPassword);
  };

  if (!isOpen) return null;
  const newPasswordValue = watch("newPassword");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Enter old password</Label>

              <Input
                type="password"
                {...register("oldPassword", { required: "Old password is required", minLength: { value: 6, message: "Minimum 6 characters required" } })}
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
              )}

            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Enter new Password</Label>
              <Input
                type="password"
                {...register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Minimum 6 characters required" } })}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPasswordValue || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "...." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
