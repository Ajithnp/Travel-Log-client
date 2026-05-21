import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { BasePackageSchema } from "../../validations/base-package-schema";
import { AppAlert } from "@/components/common/app-alert";
import { usePoliciesQuery } from "@/features/admin/cancellation-policy/hooks/api.hooks";
import { Loader2 } from "lucide-react";
import { generatePoints } from "@/utils/cancellation/generate-points.helper";
import { cancellationPolicyColorMap } from "@/lib/constants/ui/mapping-ui";

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay * 0.1, duration: 0.5 },
  }),
};

interface CancellationPolicyBlockProps {
  sectionNumber?: number;
  animationDelay?: number;
}

export function CancellationPolicyBlock({
  animationDelay = 6,
}: CancellationPolicyBlockProps) {
  const { control } = useFormContext<BasePackageSchema>();
  const { data: policiesData, isLoading } = usePoliciesQuery(false);
  const policies = policiesData?.data || [];

  const getColorForKey = (key: string): keyof typeof cancellationPolicyColorMap => {
    switch (key.toLowerCase()) {
      case "flexible": return "green";
      case "moderate": return "amber";
      case "strict": return "red";
      case "non_refundable": return "crimson";
      default: return "amber";
    }
  };
  
  return (
    <motion.section
      variants={SECTION_VARIANTS}
      initial="hidden"
      animate="visible"
      custom={animationDelay}
      className="bg-card border-[2px] border-border rounded-lg p-6 space-y-6 shadow-md"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-semibold text-foreground">
            Cancellation Policy
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Users see this prominently before booking. Choose carefully.
        </p>
      </div>

      <FormField
        control={control}
        name="cancellationPolicy"
        render={({ field }) => (
          <FormItem>
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {policies.map((policy) => {
                  const colorKey = getColorForKey(policy.key);
                  const c = cancellationPolicyColorMap[colorKey] || cancellationPolicyColorMap.amber;
                  const isSelected = field.value === policy.id;

                  return (
                    <div
                      key={policy.id}
                      onClick={() => field.onChange(policy.id)}
                      className={cn(
                        "p-6 rounded-xl border-2 cursor-pointer transition-all",
                        isSelected ? c.selected : `border-border bg-background ${c.hover}`
                      )}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className={cn("w-6 h-6 rounded-full flex-shrink-0", c.dot)} />
                        <h3 className="font-semibold text-foreground">{policy.label}</h3>
                      </div>
                      <p className={cn("text-sm font-medium mb-3 min-h-[40px]", c.text)}>
                        {policy.description}
                      </p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {generatePoints(policy.rules).map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className={cn("mt-0.5", c.bullet)}>•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      {isSelected && (
                        <div className={cn("mt-4 pt-4 border-t flex items-center justify-center", c.border)}>
                          <span className={cn("text-sm font-semibold", c.text)}>
                            ✓ Selected
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
      <AppAlert
        message="Choosing the right cancellation policy is crucial. Flexible offers the most traveler-friendly terms, while Strict and Non-Refundable provide less flexibility but may attract more price-sensitive customers. Consider your target audience and the nature of your package when making your selection."
        variant="warning"
      />
    </motion.section>
  );
}
