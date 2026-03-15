import React from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  RotateCw,
  CheckCircle2,
  Circle,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useVendorProfileQuery } from "../../hooks/api.hooks";



const checklistItems = [
  {
    id: 1,
    title: "Documents are clear and fully legible",
    description: "No blur, glare, or cut-off edges",
    status: "pending"
  },
  {
    id: 2,
    title: "GSTIN matches the registered business name",
    description: "Must be consistent across all uploaded docs",
    status: "pending"
  },
  {
    id: 3,
    title: "Business PAN card is valid",
    description: "Must be the business PAN, not personal",
    status: "pending"
  },
  {
    id: 4,
    title: "Identity proof is government-issued",
    description: "Aadhaar / Passport / Driving Licence",
    status: "pending"
  }
];

export default function ApplicationRejected() {

  const { data: profile } = useVendorProfileQuery();
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4 py-10 bg-zinc-50/50 dark:bg-zinc-950">
      <Card className="w-full max-w-6xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* 3D-effect Icon Container */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative mb-10 flex justify-center items-center">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-[2] animate-pulse" />

            <motion.div
              initial={{ scale: 0.8, rotateX: 45, rotateY: -15 }}
              animate={{ scale: 1, rotateX: 0, rotateY: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                delay: 0.1
              }}
              className="relative perspective-1000"
            >
              {/* Base shadow layer for 3D effect */}
              <div className="absolute -inset-2 bg-red-900/10 dark:bg-red-900/40 rounded-full blur-md translate-y-4" />
              {/* Main 3D Icon Body */}
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-white to-red-50 dark:from-zinc-800 dark:to-red-950/30 shadow-[inset_0_-8px_20px_rgba(0,0,0,0.1),0_10px_25px_rgba(239,68,68,0.3)] border border-red-100 dark:border-red-900/50 ring-8 ring-red-50 dark:ring-red-950/20 overflow-hidden transform-gpu preserve-3d">
                {/* Inner glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50" />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.4 }}
                >
                  <XCircle className="w-10 h-10 text-red-500 drop-shadow-md" strokeWidth={2} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Header Text */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Verification <span className="text-red-500 font-serif italic font-normal">not approved</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto mb-10 leading-relaxed text-sm md:text-base">
            We couldn't verify your business with the information provided. Review the feedback below, make the necessary corrections, and resubmit.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 z-10" />
            <Card className="w-full p-6 sm:p-8 bg-red-50/50 dark:bg-red-500/5 border-red-100 dark:border-red-900/30 text-left shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" strokeWidth={2} />
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                  Reason for Rejection
                </h3>
              </div>
              <p className="text-sm sm:text-base text-red-900/80 dark:text-red-200/80 leading-relaxed font-medium">
              {profile?.data.reasonForReject}
              </p>
            </Card>
          </motion.div>

        </div>

        <div className="flex flex-col">
          {/* Checklist Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full mb-10"
          >
            <Card className="w-full p-6 sm:p-8 bg-white dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800/60 shadow-xl shadow-zinc-200/30 dark:shadow-none text-left lg:mt-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                Before resubmitting, confirm these
              </h3>

              <div className="space-y-0 divide-y divide-zinc-100 dark:divide-zinc-800/60 ">
                {checklistItems.map((item, index) => {
                  const isPassed = item.status === "passed";

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isPassed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/30" strokeWidth={2} />
                        ) : (
                          <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" strokeWidth={2} />
                        )}
                      </div>

                      <div className={cn(
                        "transition-opacity duration-300",
                        isPassed ? "opacity-60" : "opacity-100"
                      )}>
                        <h4 className={cn(
                          "text-sm font-bold mb-0.5",
                          isPassed ? "text-zinc-600 dark:text-zinc-400 line-through decoration-zinc-300 dark:decoration-zinc-600" : "text-zinc-900 dark:text-zinc-50"
                        )}>
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto lg:mt-5"
          >
            <Button
                className="w-full sm:w-auto h-12 px-8 rounded-xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 transition-all hover:-translate-y-0.5 border-none"
                onClick={() => navigate('/vendor/verification')}
            >
              <RotateCw className="mr-2 w-4 h-4" />
              Resubmit Verification
            </Button>
          </motion.div>
        </div>

        </motion.div>
        </Card>
    </div>
  );
}