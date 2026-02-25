// import { useState} from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// import type{ BasePackageSchema } from "../../validations/base-package-schema";
// import { useFormContext } from "react-hook-form";

// const SECTION_VARIANTS = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (delay: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: delay * 0.1, duration: 0.5 },
//   }),
// };

// interface CancellationPolicyBlockProps {
//   onSelect?: (policy: "flexible" | "moderate" | "strict") => void;
//   sectionNumber?: number;
//   animationDelay?: number;
// }

// export function CancellationPolicyBlock({
//   onSelect,
//   sectionNumber = 5,
//   animationDelay = 6,
// }: CancellationPolicyBlockProps) {

//     useFormContext<BasePackageSchema>();

//   const [selectedCancellation, setSelectedCancellation] = useState<"flexible" | "moderate" | "strict" | null>(null);


//   const handleSelect = (policy: "flexible" | "moderate" | "strict") => {
//     setSelectedCancellation(policy);
//     onSelect?.(policy);
//   };

//   return (
//     <motion.section
//       variants={SECTION_VARIANTS}
//       initial="hidden"
//       animate="visible"
//       custom={animationDelay}
//       className="bg-card border-[2px] border-border rounded-lg p-6 space-y-6 shadow-md"
//     >
//       <div>
//         <div className="flex items-center gap-3 mb-2">
//           <div className="flex items-center justify-center w-8 h-8 bg-foreground rounded-full text-background font-semibold text-sm">
//             {sectionNumber}
//           </div>
//           <h2 className="text-xl font-semibold text-foreground">
//             Cancellation Policy
//           </h2>
//         </div>
//         <p className="text-sm text-muted-foreground">
//           Users see this prominently before booking. Choose carefully.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Flexible Option */}
//         <div
//           onClick={() => handleSelect("flexible")}
//           className={cn(
//             "p-6 rounded-xl border-2 cursor-pointer transition-all",
//             selectedCancellation === "flexible"
//               ? "border-green-400 bg-green-50"
//               : "border-border bg-background hover:border-green-300"
//           )}
//         >
//           <div className="flex items-start gap-3 mb-4">
//             <div className="w-6 h-6 bg-green-400 rounded-full flex-shrink-0"></div>
//             <div>
//               <h3 className="font-semibold text-foreground">Flexible</h3>
//             </div>
//           </div>
//           <p className="text-sm font-medium text-green-600 mb-3">
//             Full refund available
//           </p>
//           <ul className="space-y-2 text-xs text-muted-foreground">
//             <li className="flex items-start gap-2">
//               <span className="text-green-600 mt-0.5">•</span>
//               <span>100% refund if cancelled 7+ days before</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-green-600 mt-0.5">•</span>
//               <span>50% refund 3-7 days before</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-green-600 mt-0.5">•</span>
//               <span>No refund within 3 days</span>
//             </li>
//           </ul>
//           {selectedCancellation === "flexible" && (
//             <div className="mt-4 pt-4 border-t border-green-200 flex items-center justify-center">
//               <span className="text-sm font-semibold text-green-600">
//                 ✓ Selected
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Moderate Option */}
//         <div
//           onClick={() => handleSelect("moderate")}
//           className={cn(
//             "p-6 rounded-xl border-2 cursor-pointer transition-all",
//             selectedCancellation === "moderate"
//               ? "border-amber-400 bg-amber-50"
//               : "border-border bg-background hover:border-amber-300"
//           )}
//         >
//           <div className="flex items-start gap-3 mb-4">
//             <div className="w-6 h-6 bg-amber-400 rounded-full flex-shrink-0"></div>
//             <div>
//               <h3 className="font-semibold text-foreground">Moderate</h3>
//             </div>
//           </div>
//           <p className="text-sm font-medium text-amber-600 mb-3">
//             Partial refund
//           </p>
//           <ul className="space-y-2 text-xs text-muted-foreground">
//             <li className="flex items-start gap-2">
//               <span className="text-amber-600 mt-0.5">•</span>
//               <span>50% refund if cancelled 7+ days before</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-amber-600 mt-0.5">•</span>
//               <span>25% refund 3-7 days before</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-amber-600 mt-0.5">•</span>
//               <span>No refund within 3 days</span>
//             </li>
//           </ul>
//           {selectedCancellation === "moderate" && (
//             <div className="mt-4 pt-4 border-t border-amber-200 flex items-center justify-center">
//               <span className="text-sm font-semibold text-amber-600">
//                 ✓ Selected
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Strict Option */}
//         <div
//           onClick={() => handleSelect("strict")}
//           className={cn(
//             "p-6 rounded-xl border-2 cursor-pointer transition-all",
//             selectedCancellation === "strict"
//               ? "border-red-400 bg-red-50"
//               : "border-border bg-background hover:border-red-300"
//           )}
//         >
//           <div className="flex items-start gap-3 mb-4">
//             <div className="w-6 h-6 bg-red-400 rounded-full flex-shrink-0"></div>
//             <div>
//               <h3 className="font-semibold text-foreground">Strict</h3>
//             </div>
//           </div>
//           <p className="text-sm font-medium text-red-600 mb-3">No refund</p>
//           <ul className="space-y-2 text-xs text-muted-foreground">
//             <li className="flex items-start gap-2">
//               <span className="text-red-600 mt-0.5">•</span>
//               <span>No refund at any point</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-red-600 mt-0.5">•</span>
//               <span>One-time reschedule (7+ days before)</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-red-600 mt-0.5">•</span>
//               <span>Trip credit in exceptional cases</span>
//             </li>
//           </ul>
//           {selectedCancellation === "strict" && (
//             <div className="mt-4 pt-4 border-t border-red-200 flex items-center justify-center">
//               <span className="text-sm font-semibold text-red-600">
//                 ✓ Selected
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { BasePackageSchema } from "../../validations/base-package-schema";
import { policies } from "@/lib/constants/cancellation-policies";
import { AppAlert } from "@/components/common/app-alert";

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



const colorMap = {
  green: {
    selected: "border-green-500 bg-green-50",
    hover: "hover:border-green-400",
    dot: "bg-green-500",
    text: "text-green-700",
    border: "border-green-200",
    bullet: "text-green-600",
  },

  amber: {
    selected: "border-amber-500 bg-amber-50",
    hover: "hover:border-amber-400",
    dot: "bg-amber-500",
    text: "text-amber-700",
    border: "border-amber-200",
    bullet: "text-amber-600",
  },

  red: {
    selected: "border-red-400 bg-red-50",
    hover: "hover:border-red-400",
    dot: "bg-red-500",
    text: "text-red-700",
    border: "border-red-200",
    bullet: "text-red-600",
  },

  crimson: {
    selected: "border-rose-600 bg-rose-100",
    hover: "hover:border-rose-500",
    dot: "bg-rose-600",
    text: "text-rose-800",
    border: "border-rose-300",
    bullet: "text-rose-700",
  },
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {policies.map((policy) => {
                const c = colorMap[policy.color];
                const isSelected = field.value === policy.value;

                return (
                  <div
                    key={policy.value}
                    onClick={() => field.onChange(policy.value)}
                    className={cn(
                      "p-6 rounded-xl border-2 cursor-pointer transition-all",
                      isSelected ? c.selected : `border-border bg-background ${c.hover}`
                    )}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className={cn("w-6 h-6 rounded-full flex-shrink-0", c.dot)} />
                      <h3 className="font-semibold text-foreground">{policy.label}</h3>
                    </div>
                    <p className={cn("text-sm font-medium mb-3", c.text)}>
                      {policy.tagline}
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {policy.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
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
