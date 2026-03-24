import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Date",       description: "Pick a batch"   },
  { id: 2, label: "Travellers", description: "Who's coming"   },
  { id: 3, label: "Add-ons",    description: "Extras & deals" },
  { id: 4, label: "Payment",    description: "Confirm & pay"  },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full px-1 py-3">
      <div className="flex items-start justify-between relative">

        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive    = currentStep === step.id;
          const isLast      = index === STEPS.length - 1;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative"
              style={{ flex: isLast ? "0 0 auto" : 1 }}
            >
              {/* Connector line — sits between this step and the next */}
              {!isLast && (
                <div
                  className="absolute top-[17px] left-[calc(50%+20px)] right-0"
                  style={{ width: "calc(100% - 40px)", left: "calc(50% + 20px)" }}
                >
                  {/* Track */}
                  <div className="h-[2px] w-full bg-gray-100 rounded-full overflow-hidden">
                    {/* Fill */}
                    <div
                      className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: isCompleted ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              )}

              {/* Circle */}
              <div
                className={`
                  relative z-10 w-9 h-9 rounded-full flex items-center justify-center
                  text-sm font-semibold transition-all duration-300 select-none
                  ${isCompleted
                    ? "bg-gray-900 text-white shadow-sm"
                    : isActive
                    ? "bg-white text-gray-900 ring-2 ring-gray-900 ring-offset-2 shadow-md"
                    : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <span>{step.id}</span>
                )}

                {/* Active pulse ring */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full ring-2 ring-gray-900/20 animate-ping" />
                )}
              </div>

              {/* Labels */}
              <div className="mt-2 flex flex-col items-center gap-0.5">
                <span
                  className={`text-xs font-semibold tracking-wide transition-colors duration-200
                    ${isActive    ? "text-gray-900"
                    : isCompleted ? "text-gray-500"
                    :               "text-gray-400"}
                  `}
                >
                  {step.label}
                </span>
                <span
                  className={`text-[10px] whitespace-nowrap transition-colors duration-200 hidden sm:block
                    ${isActive    ? "text-gray-500"
                    : isCompleted ? "text-gray-400"
                    :               "text-gray-300"}
                  `}
                >
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}