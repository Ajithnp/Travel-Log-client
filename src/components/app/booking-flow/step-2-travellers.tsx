import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TIER_META,
  type PricingTierType,
  type Schedule,
  type TravellerInfo,
} from "@/types/booking.types";
import { TravellerForm } from "./travallers-form";
import {
  formSchema,
  type FormValues,
} from "@/validations/travllers-form.schema";
import { emptyTraveller } from "@/validations/default";
import { ICON_MAP } from "@/types/booking.types";

interface Step2TravellersProps {
  schedule: Schedule;
  selectedTierType: PricingTierType;
  travellers: TravellerInfo[];
  onTierChange: (type: PricingTierType) => void;
  onSubmit: (travellers: TravellerInfo[]) => void;
  onBack: () => void;
}

export function Step2Travellers({
  schedule,
  selectedTierType,
  travellers,
  onTierChange,
  onSubmit,
  onBack,
}: Step2TravellersProps) {
  const availableTierTypes = new Set(schedule.pricing.map((p) => p.type));

  const selectedPricing = schedule.pricing.find(
    (p) => p.type === selectedTierType,
  );
  const travellersCount = selectedPricing?.peopleCount ?? 1;
  const pricePerHead = selectedPricing
    ? Math.round(selectedPricing.price / selectedPricing.peopleCount)
    : 0;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travellers:
        travellers.length === travellersCount
          ? travellers
          : Array.from({ length: travellersCount }, () => emptyTraveller()),
    },
  });

  const watchedTravellers = watch("travellers");

  useEffect(() => {
    reset({
      travellers: Array.from({ length: travellersCount }, (_, i) => ({
        ...emptyTraveller(),
        ...(watchedTravellers?.[i] ?? {}),
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTierType]);

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data.travellers as TravellerInfo[]);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
        {/* HEADER */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between bg-accent-foreground/80">
          <h3 className="text-sm font-semibold uppercase text-card">
            Group Type
          </h3>
          <span className="text-xs font-semi-bold text-card">Choose tier</span>
        </div>

        <div className="px-5 pb-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TIER_META.map((meta) => {
              const Icon = ICON_MAP[meta.type as keyof typeof ICON_MAP];
              const pricingEntry = schedule.pricing.find(
                (p) => p.type === meta.type,
              );
              const isAvailable = availableTierTypes.has(meta.type);
              const isSelected = selectedTierType === meta.type;
              const perHead = pricingEntry
                ? Math.round(pricingEntry.price / pricingEntry.peopleCount)
                : null;

              return (
                <button
                  key={meta.type}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => isAvailable && onTierChange(meta.type)}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-4 transition-all
              ${
                !isAvailable
                  ? "opacity-40 cursor-not-allowed border-gray-100 bg-gray-50"
                  : "cursor-pointer"
              }
              ${
                isSelected && isAvailable
                  ? "border-gray-900 bg-white shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? "text-gray-900" : "text-gray-500"
                    }`}
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    {meta.label}
                  </span>

                  <span className="text-xs text-gray-500 text-center">
                    {perHead != null
                      ? `₹${perHead.toLocaleString("en-IN")}/head`
                      : "Unavailable"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* ── Traveller forms ── */}
      <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
        <div className="px-5 pt-5 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 bg-accent-foreground/80">
          <h3 className="text-sm font-semibold uppercase text-card">
            Traveller Details
          </h3>

          <span className="text-xs text-card">
            {travellersCount} traveller{travellersCount > 1 ? "s" : ""} · ₹
            {pricePerHead.toLocaleString("en-IN")}/head
          </span>
        </div>
        <div className="border-t border-gray-100 mx-5" />
        <div className="px-5 py-5 space-y-6">
          {Array.from({ length: travellersCount }, (_, i) => (
            <TravellerForm
              key={i}
              index={i}
              isLead={i === 0}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-xl py-6 text-base font-semibold border-gray-300"
        >
          ← Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gray-600 text-white rounded-xl py-6 text-base font-semibold
             transition-all duration-200 ease-out
           hover:bg-gray-800 hover:-translate-y-[1px] hover:shadow-md
             active:translate-y-0 active:shadow-sm
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
             group"
        >
          <span className="flex items-center justify-center gap-1.5">
            Continue
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Button>
      </div>
    </form>
  );
}
