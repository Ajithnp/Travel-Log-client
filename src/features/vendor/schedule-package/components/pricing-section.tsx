import { Input } from "@/components/ui/input";
import { User, Users, UsersRound } from "lucide-react";
import SectionWrapper from "./section-wrapper";
import { AppAlert } from "@/components/common/app-alert";
import { type ScheduleFormValues } from "../validations/validation schemas";
import { useFormContext } from "react-hook-form";

const PRICING_TIERS = [
  {
    key: "solo" as const,
    icon: User,
    label: "Solo",
    description: "1 person",
    perHead: "per head",
    required: true,
  },
  {
    key: "duo" as const,
    icon: Users,
    label: "Duo",
    description: "2 people — total price",
    perHead: "total for 2",
    required: false,
  },
  {
    key: "group" as const,
    icon: UsersRound,
    label: "Group",
    description: "4 people — total price",
    perHead: "total for group",
    required: false,
  },
];
const PricingSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ScheduleFormValues>();
  return (
    <SectionWrapper
      number={2}
      title="Pricing"
      subtitle="Set price per group type. All amounts in INR (₹)."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {PRICING_TIERS.map(
          ({ key, icon: Icon, label, description, perHead, required }) => (
            <div key={key} className="bg-secondary/100 rounded-lg p-4">
              {/* Tier header */}
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-5 h-5 text-destructive" />
                <span className="font-semibold text-primary text-medium">
                  {label}
                  {!required && (
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                      (Optional)
                    </span>
                  )}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {description}
              </p>

              {/* Price input */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  ₹
                </span>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  placeholder={required ? "Required" : "Optional"}
                  className="pl-7 bg-card shadow-premium"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  {...register(`pricing.${key}`, {
                    setValueAs: (v) =>
                      v === "" || v === null ? undefined : Number(v),
                  })}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">{perHead}</p>

              {/* Field error */}
              {errors.pricing?.[key] && (
                <p className="text-xs text-destructive mt-1">
                  {errors.pricing[key]?.message}
                </p>
              )}
            </div>
          ),
        )}
      </div>

      <AppAlert
        message="Pricing is locked once the first booking is made,  Set carefully — you can always create a new schedule with updated pricing."
        variant="warning"
      />
    </SectionWrapper>
  );
};

export default PricingSection;
