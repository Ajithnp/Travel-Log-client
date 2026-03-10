import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  scheduleFormSchema,
  type ScheduleFormValues,
} from "../validations/validation schemas";
import { useSchedulePackageMutation } from "../hooks/api.hooks";

export const useSchedulePackageForm = (packageId: string) => {
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formPayload, setFormPayload] = useState<ScheduleFormValues | null>(
    null,
  );

  const methods = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      reportingTime: "",
      reportingLocation: "",
      pricing: {
        solo: undefined,
        duo: undefined,
        group: undefined,
      },
      totalSeats: 0,
      notes: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { mutate: schedule, isPending } = useSchedulePackageMutation(packageId);

  const onSubmit: SubmitHandler<ScheduleFormValues> = (data) => {
    setFormPayload(data);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!formPayload) return;

    const payload = {
      ...formPayload,
      startDate: new Date(formPayload.startDate).toISOString(),
      endDate: new Date(formPayload.endDate).toISOString(),
    };

    schedule(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        setConfirmOpen(false);
        navigate("/vendor/scheduled-trips");
      },
      onError: (error) => {
        toast.error(error.response?.data.message);
      },
    });
  };

  return {
    methods,
    confirmOpen,
    setConfirmOpen,
    onSubmit,
    handleConfirm,
    isPending,
  };
};
