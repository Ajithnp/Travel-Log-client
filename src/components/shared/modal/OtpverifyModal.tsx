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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import useOtpTimer from "@/features/auth/hooks/otp.timer.hook";
import useResentOtp from "@/features/auth/hooks/useResentOtp";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { getStorageitem} from "@/utils/StorageUtils";
import { useState } from "react";
import { toast } from "sonner";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, otp: string) => void;
  isLoading?: boolean;
}

export default function VerifyOtpModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ChangeEmailModalProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

 
  const { timer, setTimer } = useOtpTimer(isOpen);
  const {resendOTP, isLoadingOtp} = useResentOtp(setTimer)

  if (!isOpen) return null;

  const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL) || {};
  if (!data?.email) return null;

  const handleSubmit = () => {
    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }
    if (otp.length !== 6) {
      setError("Enter valid OTP");
      return;
    }
    const email = data?.email;
    if (!email) return;

    onSubmit(otp, email);
  };



  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (timer === 0) {
            onClose();
          } else {
            toast.info("Please wait until timer ends before closing.");
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">One Time Password </Label>

            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {timer > 0 ? (
              <p className="text-sm text-muted-foreground text-center">
                {timer} seconds
              </p>
            ) : (
              <Button
                type="button"
                className="flex text-blue cursor-pointer rounded"
                variant={"link"}
                disabled={timer > 0 || isLoadingOtp}
                onClick={resendOTP}
              >
                Resend OTP
              </Button>
            )}
          </div>
        </div>
        <DialogFooter>
          {timer === 0 && (
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DialogClose>
          )}
          <Button onClick={handleSubmit} disabled={isLoading || timer <= 0}>
            {isLoading ? "...." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
