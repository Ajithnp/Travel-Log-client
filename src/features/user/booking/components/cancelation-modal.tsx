import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ban,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Send,
  IndianRupee,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { calculateRefund } from "@/utils/cancellation/calculate-refund";
import type { CancellationPolicyDTO } from "../types";
import { formatISODate } from "@/utils/iso-date-format";
import { AppAlert } from "@/components/common/app-alert";

const REASONS = [
  "Change of plans",
  "Health / medical emergency",
  "Bad weather conditions",
  "Work or schedule conflict",
  "Family emergency",
  "Financial reasons",
  "Other reason",
];

interface CancelBookingModalProps {
  show: boolean;
  onClose: () => void;
  onCancelBooking: (payload: {
    bookingId: string;
    reason: string;
    details: string;
  }) => void;
  isPending: boolean;
  error: string | null;
  bookingId: string;
  packageTittle: string;
  bookingStartDate: string | null;
  cancellationPolicy: CancellationPolicyDTO | null;
  finalAmount: number;
}

export default function CancelBookingModal({
  show,
  onClose,
  bookingStartDate,
  cancellationPolicy,
  finalAmount,
  packageTittle,
  bookingId,
  onCancelBooking,
  isPending,
  error,
}: CancelBookingModalProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [touched, setTouched] = useState(false);

  if (!cancellationPolicy || !bookingStartDate) return null;

  const refundInfo = calculateRefund({
    finalAmount,
    tripStartDate: bookingStartDate,
    cancellationPolicy,
  });

  const reasonError = touched && !reason;
  const isOtherReason = reason === "Other reason";
  const detailsError = touched && isOtherReason && details.trim().length < 20;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (isOtherReason && details.trim().length < 20) {
      return;
    }
    onCancelBooking({ bookingId, reason, details });
  }

  return (
    
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40"
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-7 space-y-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                    <Ban className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Request Cancellation
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      You're requesting to cancel{" "}
                      <span className="font-semibold text-gray-700">
                        {packageTittle}
                      </span>{" "}
                      on {formatISODate(bookingStartDate)}. Our admin team will
                      review your request.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Reason for Cancellation{" "}
                    <span className="text-rose-500">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className={`w-full h-10 pl-3 pr-9 rounded-lg border text-sm appearance-none outline-none transition-colors ${
                        reasonError
                          ? "border-red-300 text-gray-700 focus:border-red-400"
                          : "border-gray-200 text-gray-700 focus:border-rose-400"
                      } ${!reason ? "text-gray-400" : ""}`}
                    >
                      <option value="" disabled>
                        Select a reason…
                      </option>
                      {REASONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <AnimatePresence>
                    {reasonError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-1 text-xs text-red-500"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        Please select a reason.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    {isOtherReason ? (
                      <span className="text-rose-500"> *</span>
                    ) : (
                      <span className="font-normal normal-case text-gray-400">
                        {" "}
                        (optional)
                      </span>
                    )}
                  </Label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                    maxLength={500}
                    placeholder="Tell us more about your reason…"
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm resize-none outline-none transition-colors placeholder:text-gray-300 ${
                      detailsError
                        ? "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-rose-400"
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <AnimatePresence>
                      {detailsError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1 text-xs text-red-500"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          Minimum 20 characters ({details.length}/20).
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span
                      className={`ml-auto text-[11px] tabular-nums ${details.length > 0 && details.length < 20 ? "text-amber-500" : "text-gray-300"}`}
                    >
                      {details.length}/500
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 flex items-start gap-2.5">
                  <IndianRupee className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-emerald-500" />
                    Estimated refund:{" "}
                    <strong>
                      ₹{refundInfo.refundAmount} ({refundInfo.refundPercentage}%
                      — {refundInfo.daysUntilTrip} days before trip)
                    </strong>
                    . Credited to wallet after approval.
                  </p>
                </div>
                {error && (
                       <AppAlert icon={<X className="w-4 h-4"/>} variant="error" message={error}/>
                )}
        

                <div className="flex gap-3 pt-1">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={onClose}
                    className="flex items-center gap-1.5 h-10 px-5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    disabled={
                      isPending ||
                      !show ||
                      !reason ||
                      (isOtherReason && details.trim().length < 20)
                    }
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  );
}
