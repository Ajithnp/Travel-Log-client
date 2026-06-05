import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useCreateOfferMutation } from "../hooks/api.hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Package,
  Percent,
  Users,
  CalendarRange,
  CalendarX2,
  X,
  BadgePercent,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { OfferFormValues, PackageForOfferResponseDTO } from "../types/types";

interface OfferFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packages: PackageForOfferResponseDTO[];
}


function FieldIcon({ icon: Icon, error }: { icon: React.ComponentType<{ className?: string }>; error?: boolean }) {
  return (
    <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none`}>
      <Icon className={`w-4 h-4 ${error ? "text-destructive/60" : "text-muted-foreground/60"}`} />
    </div>
  );
}

export function OfferFormDialog({ open, onOpenChange, packages }: OfferFormDialogProps) {

  const {mutate: createOffer, isPending} = useCreateOfferMutation();

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
      usageLimit: undefined,
      validUntil: "",
    },
  });

  const onSubmit = async (values: OfferFormValues) => {
     createOffer({
      packageId: values.packageId,
      scheduleId: values.scheduleId || undefined,
      name: values.name,
      discountType: "percentage",
      discountValue: Number(values.discountValue),
      usageLimit: values.usageLimit ? Number(values.usageLimit) : undefined,
      validUntil: values.validUntil,
    },{
      onSuccess : ()=> {
        onOpenChange(false);
        reset();
      }
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => { if (!isPending) { reset(); onOpenChange(false); } }}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

  
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 310, damping: 28 }}
        className="relative z-10 w-full sm:max-w-[540px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-slate-900/20 max-h-[92dvh] flex flex-col overflow-hidden"
      >
  
        <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

  
        <div className="flex items-start justify-between px-5 sm:px-6 pt-4 sm:pt-5 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-md shadow-violet-200 flex-shrink-0">
              <BadgePercent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[15px] sm:text-base font-bold text-slate-900 leading-tight">
                Create Offer
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Percentage discount on a package
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { if (!isPending) { reset(); onOpenChange(false); } }}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <Separator />


        <div className="overflow-y-auto flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-5 sm:px-6 py-5 space-y-4"
            noValidate
          >
     
            <div className="space-y-1.5">
              <Label htmlFor="offer-name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Offer Name <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <FieldIcon icon={Tag} error={!!errors.name} />
                <Input
                  id="offer-name"
                  placeholder="e.g. Early Bird Discount"
                  className={`pl-9 rounded-xl bg-slate-50/70 border-slate-200 focus-visible:ring-violet-300 focus-visible:border-violet-300 placeholder:text-slate-300 text-sm ${errors.name ? "border-destructive/50 focus-visible:ring-destructive/30" : ""}`}
                  {...register("name", { required: "Offer name is required" })}
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>


            <div className="space-y-1.5">
              <Label htmlFor="offer-package" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Package <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                  <Package className={`w-4 h-4 ${errors.packageId ? "text-destructive/60" : "text-muted-foreground/60"}`} />
                </div>
                <Controller
                  name="packageId"
                  control={control}
                  rules={{ required: "Please select a package" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id="offer-package"
                        className={`pl-9 rounded-xl bg-slate-50/70 border-slate-200 focus:ring-violet-300 text-sm ${errors.packageId ? "border-destructive/50" : ""}`}
                      >
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id} className="text-sm">
                            {pkg.title}
                            {pkg.hasOffer && pkg.offerValue ? (
                              <span className="ml-2 text-xs text-emerald-600 font-semibold">
                                ({pkg.offerValue}% active)
                              </span>
                            ) : null}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <AnimatePresence>
                {errors.packageId && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.packageId.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <Label htmlFor="offer-discount" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Discount <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <FieldIcon icon={Percent} error={!!errors.discountValue} />
                  <Input
                    id="offer-discount"
                    type="number"
                    min={1}
                    max={100}
                    placeholder="e.g. 10"
                    className={`pl-9 pr-8 rounded-xl bg-slate-50/70 border-slate-200 focus-visible:ring-violet-300 focus-visible:border-violet-300 placeholder:text-slate-300 text-sm ${errors.discountValue ? "border-destructive/50" : ""}`}
                    {...register("discountValue", {
                      required: "Discount is required",
                      min: { value: 1, message: "Min 1%" },
                      max: { value: 100, message: "Max 100%" },
                    })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    %
                  </span>
                </div>
                <AnimatePresence>
                  {errors.discountValue && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive">
                      {errors.discountValue.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="offer-usage" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Usage Limit{" "}
                  <span className="text-slate-400 text-[10px] normal-case font-normal">optional</span>
                </Label>
                <div className="relative">
                  <FieldIcon icon={Users} error={!!errors.usageLimit} />
                  <Input
                    id="offer-usage"
                    type="number"
                    min={1}
                    placeholder="Unlimited"
                    className={`pl-9 rounded-xl bg-slate-50/70 border-slate-200 focus-visible:ring-violet-300 focus-visible:border-violet-300 placeholder:text-slate-300 text-sm ${errors.usageLimit ? "border-destructive/50" : ""}`}
                    {...register("usageLimit", {
                      min: { value: 1, message: "Min 1 use" },
                    })}
                  />
                </div>
                <AnimatePresence>
                  {errors.usageLimit && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive">
                      {errors.usageLimit.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

  
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <CalendarRange className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Validity Period
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="offer-until" className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <CalendarX2 className="w-3.5 h-3.5 text-rose-400" />
                    Until <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="offer-until"
                    type="date"
                    className={`rounded-xl bg-white border-slate-200 focus-visible:ring-violet-300 focus-visible:border-violet-300 text-sm ${errors.validUntil ? "border-destructive/50" : ""}`}
                    {...register("validUntil", { required: "End date is required" })}
                  />
                  <AnimatePresence>
                    {errors.validUntil && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive">
                        {errors.validUntil.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="pt-1 pb-1">
              <Separator className="mb-4" />
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => { reset(); onOpenChange(false); }}
                  disabled={isPending}
                  className="h-9 rounded-xl text-sm text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-9 rounded-xl text-sm bg-violet-600 hover:bg-violet-700 text-white font-semibold gap-2 shadow-sm shadow-violet-200 min-w-[130px]"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) :
                    "Create Offer"
                  }
                </Button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
