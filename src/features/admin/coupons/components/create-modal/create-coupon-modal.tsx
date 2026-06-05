import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Ticket,
  Type,
  IndianRupee,
  Percent,
  Zap,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fieldV, modalV, overlayV } from "@/animation/variants";
import { SuccessState, toPercent } from "./creation-success-modal";
import { ProbabilityGauge } from "./probability";
import { FieldError } from "./field-error";
import type { CreateCouponResponse } from "../../services/api.services";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

type Errors = { title?: string; rewardValue?: string; probability?: string };
export type Fields = { title: string; rewardValue: string; probability: string };

interface CreateCouponModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Fields) => void;
  submitting:boolean;
  submitted:boolean;
  createdCoupon: CreateCouponResponse | null;
}
export default function CreateCouponModal({ open, onClose, onSubmit,submitting,submitted,createdCoupon }: CreateCouponModalProps) {
  const [fields, setFields] = useState<Fields>({ title: "", rewardValue: "", probability: "" });
  const [errors, setErrors] = useState<Errors>({});
 

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Errors = {};
    if (!fields.title.trim()) {
      errs.title = "Title is required.";
    } else if (fields.title.trim().length < 3) {
      errs.title = "Title must be at least 3 characters.";
    }

    const rv = parseFloat(fields.rewardValue);
    if (!fields.rewardValue.trim()) {
      errs.rewardValue = "Reward value is required.";
    } else if (isNaN(rv) || rv <= 0) {
      errs.rewardValue = "Enter a positive reward value.";
    } else if (rv > 1_00_000) {
      errs.rewardValue = "Reward value cannot exceed ₹1,00,000.";
    }

    const pr = parseFloat(fields.probability);
    if (!fields.probability.trim()) {
      errs.probability = "Probability is required.";
    } else if (isNaN(pr) || pr < 0 || pr > 1) {
      errs.probability = "Must be between 0.00 and 1.00.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
     onSubmit(fields);
    
  };

  // const reset = () => {
  //   setFields({ title: "", rewardValue: "", probability: "" });
  //   setErrors({});
  // };

  const handleClose = () => {
    onClose();
  };

  const probPct = toPercent(fields.probability);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-violet-50/40 flex items-center justify-center p-4">

      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlayV}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              variants={modalV}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden max-h-[95dvh] flex flex-col"
            >

              <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>

              <div className="flex items-center gap-3 px-5 sm:px-6 pt-3 sm:pt-5 pb-4 flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-4.5 h-4.5 text-violet-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-[17px] font-bold text-slate-900 leading-tight">
                    New Scratch Coupon
                  </h2>
                  <p className="text-xs text-slate-400">Configure and publish your coupon</p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <Separator />

              <div className="overflow-y-auto flex-1">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <SuccessState fields={createdCoupon} onClose={handleClose} />
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="px-5 sm:px-6 py-5 space-y-5"
                    >
      
                      <motion.div custom={0} variants={fieldV} initial="hidden" animate="show">
                        <Label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                          Coupon Title <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <Type className={`w-4 h-4 ${errors.title ? "text-red-400" : "text-slate-400"}`} />
                          </div>
                          <Input
                            type="text"
                            value={fields.title}
                            onChange={set("title")}
                            placeholder="Cash Back"
                            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-slate-50/60 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                              errors.title
                                ? "border-red-300 focus:ring-red-200"
                                : "border-slate-200 focus:ring-violet-200 focus:border-violet-300"
                            }`}
                          />
                        </div>
                        <FieldError msg={errors.title} />
                      </motion.div>

   
                      <motion.div custom={1} variants={fieldV} initial="hidden" animate="show">
                        <Label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                          Reward Value <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <IndianRupee className={`w-4 h-4 ${errors.rewardValue ? "text-red-400" : "text-slate-400"}`} />
                          </div>
                          <Input
                            type="number"
                            min="1"
                            max="100000"
                            value={fields.rewardValue}
                            onChange={set("rewardValue")}
                            placeholder="e.g., 500"
                            className={`w-full pl-10 pr-16 py-2.5 text-sm rounded-xl border bg-slate-50/60 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                              errors.rewardValue
                                ? "border-red-300 focus:ring-red-200"
                                : "border-slate-200 focus:ring-violet-200 focus:border-violet-300"
                            }`}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">INR</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5">Cash equivalent that the user will receive upon winning.</p>
                        <FieldError msg={errors.rewardValue} />
                      </motion.div>

                      <motion.div custom={2} variants={fieldV} initial="hidden" animate="show">
                        <Label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                          Winning Probability{" "}
                          {probPct !== null && (
                            <span className="normal-case font-bold text-violet-600">({probPct}% chance)</span>
                          )}{" "}
                          <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <Percent className={`w-4 h-4 ${errors.probability ? "text-red-400" : "text-slate-400"}`} />
                          </div>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            value={fields.probability}
                            onChange={set("probability")}
                            placeholder="e.g., 0.15 for 15% chance"
                            className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-slate-50/60 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                              errors.probability
                                ? "border-red-300 focus:ring-red-200"
                                : "border-slate-200 focus:ring-violet-200 focus:border-violet-300"
                            }`}
                          />
                        </div>
                        <ProbabilityGauge value={probPct} />

                        <div className="flex items-start gap-1.5 mt-2">
                          <Info className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
                          <p className="text-[11px] text-slate-400">
                            Decimal between 0.00 and 1.00 — e.g., <span className="font-semibold text-slate-500">0.15</span> = 15% win rate.
                          </p>
                        </div>
                        <FieldError msg={errors.probability} />
                      </motion.div>

   
                      <AnimatePresence>
                        {fields.title && fields.rewardValue && fields.probability &&
                          !errors.title && !errors.rewardValue && !errors.probability && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            className="rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50/60 p-3.5 flex items-center gap-3"
                          >
                            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                              <Ticket className="w-4 h-4 text-violet-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-violet-800 truncate">{fields.title}</p>
                              <p className="text-[11px] text-violet-500 mt-0.5">
                                ₹{Number(fields.rewardValue).toLocaleString("en-IN")} reward ·{" "}
                                {probPct}% win chance
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="text-[10px] font-bold bg-violet-500 text-white px-2 py-0.5 rounded-full">
                                Preview
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="pt-1 pb-1">
                        <Separator className="mb-4" />
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="flex-1 h-9 rounded-xl text-sm border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 h-9 rounded-xl text-sm bg-violet-600 hover:bg-violet-700 text-white font-semibold gap-2 shadow-sm shadow-violet-200 disabled:opacity-70"
                          >
                            <AnimatePresence mode="wait">
                              {submitting ? (
                                <motion.div
                                  key="spin"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-2"
                                >
                                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                  </svg>
                                  Creating…
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="idle"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-2"
                                >
                                  <Zap className="w-3.5 h-3.5" />
                                  Create Coupon
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}