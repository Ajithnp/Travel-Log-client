import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"


import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStorageitem } from "@/utils/StorageUtils";
import { toast } from "sonner";
import useOtpTimer from "../hooks/otp.timer.hook";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import useResentOtp from "../hooks/useResentOtp";
interface OtpFormProps {
  otpReceiver: (otp: string) => void;
  buttonText: React.ReactNode;
}

const OtpForm = (
  {
    otpReceiver,
    buttonText
  }: OtpFormProps) => {

  const [otp, setOtp] = useState<string>("");
  const { timer, setTimer } = useOtpTimer();
  const {resendOTP, isLoadingOtp} = useResentOtp(setTimer)

  // const { mutate: sendOtp, isPending: isLoading } = useResendOtpMutation();
    
  const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
  if (!data.email) return;


  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast.error(ERROR_MESSAGES.ENTER_VALID_OTP);
      return;
    }
    otpReceiver(otp);
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleOtpSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>

            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <div className="grid gap-3">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant={"default"}
              disabled={timer <= 0}
            >
              {buttonText}
            </Button>

          </div>
          <div className="flex justify-between relative ">
            {timer > 0 ? (
              <span>{timer} seconds</span>
            ) : (

              <div className="grid w-full max-w-xl items-start gap-4">
                <Alert variant={"error"}>
                  <AlertTitle className="text-gray-600">
                    OTP Expired
                  </AlertTitle>
                </Alert>
                <Button
                  type="button"
                  className="flex text-blue cursor-pointer rounded"
                  variant={"link"}
                  disabled={timer > 0 || isLoadingOtp}
                  onClick={resendOTP}
                >
                  Resend OTP
                </Button>
              </div>
            )}
          </div>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2"></span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2"></div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default OtpForm;
