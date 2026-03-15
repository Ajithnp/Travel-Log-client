import React from "react";
import { motion } from "framer-motion";
import { Clock, Check, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Documents Submitted",
    description: "Received successfully",
    status: "completed",
    icon: Check,
  },
  {
    title: "Admin Review",
    description: "Currently being reviewed by our team",
    status: "in-progress",
    icon: Clock,
  },
  {
    title: "Decision",
    description: "Approval or feedback sent via email",
    status: "pending",
    stepNumber: 3,
  },
  {
    title: "Account Activated",
    description: "Start listing packages & accepting bookings",
    status: "pending",
    stepNumber: 4,
  },
];

export default function ApplicationReview() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-zinc-50/50 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card className="w-full max-w-6xl rounded-3xl border border-zinc-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Icon */}
              <div className="relative mb-8 flex justify-start">
                <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full scale-[2]" />
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-zinc-900 shadow-lg border border-amber-100 dark:border-amber-900/30">
                  <Clock className="w-7 h-7 text-amber-500" />
                </div>
              </div>

              {/* Header */}
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Application{" "}
                <span className="text-amber-600 font-serif italic font-normal">
                  under review
                </span>
              </h1>

              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                Our team is carefully reviewing your submitted documents. You'll
                receive an email once the review process is complete.
              </p>

              {/* Time badge */}
              <Badge className="mb-6 flex items-center gap-2 py-1.5 px-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs text-red-600 font-medium max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />

                <span className="leading-tight break-words">
                  Estimated time:{" "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    2–3 business days
                  </span>
                </span>
              </Badge>

              {/* Warning */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 rounded-xl p-4 flex gap-3 text-sm text-amber-800 dark:text-amber-200">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                Do not resubmit while your application is under review — this
                may delay the process.
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-zinc-200/60 dark:border-zinc-800">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
                Application Progress
              </h3>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-4 bottom-8 w-px bg-zinc-200 dark:bg-zinc-800" />

                <div className="space-y-8">
                  {steps.map((step) => {
                    const isCompleted = step.status === "completed";
                    const isInProgress = step.status === "in-progress";
                    const isPending = step.status === "pending";

                    return (
                      <div
                        key={step.title}
                        className="relative flex gap-5 items-start"
                      >
                        {/* Indicator */}
                        <div className="relative z-10 flex-shrink-0 bg-white dark:bg-zinc-900 py-1">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center border-2",
                              isCompleted &&
                                "border-emerald-500 bg-emerald-50 text-emerald-500",
                              isInProgress &&
                                "border-amber-500 bg-amber-50 text-amber-500",
                              isPending &&
                                "border-zinc-200 text-zinc-400 bg-zinc-50",
                            )}
                          >
                            {step.icon ? (
                              <step.icon className="w-5 h-5" />
                            ) : (
                              <span className="text-sm font-bold">
                                {step.stepNumber}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Text */}
                        <div
                          className={cn(
                            "pt-1.5 pb-2",
                            isPending ? "opacity-50" : "",
                          )}
                        >
                          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                            {step.title}
                          </h4>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
