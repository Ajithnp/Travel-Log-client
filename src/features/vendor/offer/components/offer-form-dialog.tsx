import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { Loader2, Sparkles } from "lucide-react";
import { useCreateOfferMutation } from "../hooks/api.hooks";
import type { OfferFormValues, PackageForOfferResponseDTO } from "../types/types";

interface OfferFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packages: PackageForOfferResponseDTO[];
}

export function OfferFormDialog({ open, onOpenChange, packages }: OfferFormDialogProps) {
  const { mutateAsync: createOffer, isPending } = useCreateOfferMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<OfferFormValues>({
    defaultValues: {
      packageId: "",
      scheduleId: "",
      name: "",
      discountValue: undefined,
      maxDiscountCap: undefined,
      minBookingAmount: undefined,
      usageLimit: undefined,
      validFrom: "",
      validUntil: "",
    },
  });

  const onSubmit = async (values: OfferFormValues) => {
    await createOffer({
      packageId: values.packageId,
      scheduleId: values.scheduleId || undefined,
      name: values.name,
      discountType: "percentage",
      discountValue: Number(values.discountValue),
      maxDiscountCap: values.maxDiscountCap ? Number(values.maxDiscountCap) : undefined,
      minBookingAmount: values.minBookingAmount ? Number(values.minBookingAmount) : undefined,
      usageLimit: values.usageLimit ? Number(values.usageLimit) : undefined,
      validFrom: values.validFrom,
      validUntil: values.validUntil,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!isPending) { reset(); onOpenChange(v); } }}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold font-heading flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Create Offer
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Create a percentage discount offer on one of your packages.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1" noValidate>
       
          <div className="space-y-1.5">
            <Label htmlFor="offer-name">
              Offer Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="offer-name"
              placeholder="e.g. Early Bird Discount"
              {...register("name", { required: "Offer name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

       
          <div className="space-y-1.5">
            <Label htmlFor="offer-package">
              Package <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="packageId"
              control={control}
              rules={{ required: "Please select a package" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="offer-package">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.title}
                        {pkg.hasOffer && pkg.offerValue ? (
                          <span className="ml-2 text-xs text-emerald-600 font-medium">
                            (Active: {pkg.offerValue}%)
                          </span>
                        ) : null}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.packageId && (
              <p className="text-xs text-destructive">{errors.packageId.message}</p>
            )}
          </div>

       
          <div className="space-y-1.5">
            <Label htmlFor="offer-discount">
              Discount (%) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="offer-discount"
                type="number"
                min={1}
                max={100}
                placeholder="e.g. 10"
                className="pr-8"
                {...register("discountValue", {
                  required: "Discount value is required",
                  min: { value: 1, message: "Minimum discount is 1%" },
                  max: { value: 100, message: "Maximum discount is 100%" },
                })}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                %
              </span>
            </div>
            {errors.discountValue && (
              <p className="text-xs text-destructive">{errors.discountValue.message}</p>
            )}
          </div>

         
          <div className="space-y-1.5">
            <Label htmlFor="offer-cap">
              Max Discount Cap (₹){" "}
              <span className="text-muted-foreground text-xs font-normal">Optional</span>
            </Label>
            <Input
              id="offer-cap"
              type="number"
              min={0}
              placeholder="e.g. 1000"
              {...register("maxDiscountCap", {
                min: { value: 0, message: "Cap must be a positive number" },
              })}
            />
            <p className="text-xs text-muted-foreground">
              Max INR off even if percentage is higher.
            </p>
            {errors.maxDiscountCap && (
              <p className="text-xs text-destructive">{errors.maxDiscountCap.message}</p>
            )}
          </div>


          <div className="space-y-1.5">
            <Label htmlFor="offer-min">
              Min Booking Amount (₹){" "}
              <span className="text-muted-foreground text-xs font-normal">Optional</span>
            </Label>
            <Input
              id="offer-min"
              type="number"
              min={0}
              placeholder="e.g. 2000"
              {...register("minBookingAmount", {
                min: { value: 0, message: "Amount must be a positive number" },
              })}
            />
            {errors.minBookingAmount && (
              <p className="text-xs text-destructive">{errors.minBookingAmount.message}</p>
            )}
          </div>

    
          <div className="space-y-1.5">
            <Label htmlFor="offer-usage">
              Usage Limit{" "}
              <span className="text-muted-foreground text-xs font-normal">Optional — leave blank for unlimited</span>
            </Label>
            <Input
              id="offer-usage"
              type="number"
              min={1}
              placeholder="e.g. 50"
              {...register("usageLimit", {
                min: { value: 1, message: "Usage limit must be at least 1" },
              })}
            />
            {errors.usageLimit && (
              <p className="text-xs text-destructive">{errors.usageLimit.message}</p>
            )}
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="offer-from">
                Valid From <span className="text-destructive">*</span>
              </Label>
              <Input
                id="offer-from"
                type="date"
                {...register("validFrom", { required: "Start date is required" })}
              />
              {errors.validFrom && (
                <p className="text-xs text-destructive">{errors.validFrom.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="offer-until">
                Valid Until <span className="text-destructive">*</span>
              </Label>
              <Input
                id="offer-until"
                type="date"
                {...register("validUntil", { required: "End date is required" })}
              />
              {errors.validUntil && (
                <p className="text-xs text-destructive">{errors.validUntil.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => { reset(); onOpenChange(false); }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="gap-2">
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Offer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
