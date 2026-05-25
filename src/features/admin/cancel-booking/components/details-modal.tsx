import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    User,
    Mail,
    Phone,
    FileText,
    CalendarDays,
    Users,
    Store,
    Hash,
    Clock,
    AlertTriangle,
    IndianRupee,
    CheckCircle2,
    XCircle,
    ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { DetailedCancellationRequestResponse } from "../services/api.service";
import { format } from "date-fns";
import { Loader } from "@/components/common/loader";

function InfoRow({
    icon,
    label,
    value,
    accent,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="space-y-0.5">
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-400">
                {icon}
                {label}
            </p>
            <p className={`text-sm font ${accent ? "text-rose-500" : "text-gray-800"}`}>
                {value}
            </p>
        </div>
    );
}

function RefundRow({
    label,
    value,
    bold,
    accent,
}: {
    label: string;
    value: string;
    bold?: boolean;
    accent?: boolean;
}) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className={bold ? "font-semibold text-gray-800" : "text-gray-500"}>{label}</span>
            <span
                className={`tabular-nums ${accent ? "font-bold text-emerald-600 text-base" : bold ? "font-semibold text-gray-800" : "text-gray-700"
                    }`}
            >
                {value}
            </span>
        </div>
    );
}

interface Props {
    open: boolean;
    data?: DetailedCancellationRequestResponse;
    isLoading?: boolean;
    onOpenChange: (open: boolean) => void;
    bookingId: string;
    onApprove: (id: string) => void;
    onReject: (id: string, reason: string) => void;
    isApproving: boolean;
    isRejecting: boolean;
}

export default function BookingCancellationDetails({ open, data,isLoading, onOpenChange, bookingId, onApprove, onReject, isApproving, isRejecting }: Props) {
    const [rejectReason, setRejectReason] = useState("");
    const [decision, setDecision] = useState<"pending" | "approved" | "rejected">("pending");


    function handleApprove() {
        onApprove(bookingId);
    }
    function handleReject() {
        if (!rejectReason.trim()) return;
        onReject(bookingId, rejectReason);
    }
    function handleClose() {
        onOpenChange(false);
    }

    if (isLoading) {
        return (
           <div className="p-8 flex justify-center items-center min-h-[200px]">
               <Loader message="Loading details..." />
           </div>
        );
    }

     if (!data) {
        return (
          <div className="p-8 text-center text-gray-500">No details available.</div>
        );
    }
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    />
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto"
                    >
                        <div className="w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100">
                            <div className="flex items-center justify-between px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h2 className="text-lg font-bold text-gray-900">Cancellation Request</h2>
                                    <Badge className="bg-amber-50 text-amber-600 border border-amber-200 font-medium text-xs px-2.5 py-0.5 rounded-full">
                                        ● {data?.cancellationStatus}
                                    </Badge>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-0">
                                <div className="flex-1 px-5 sm:px-7 py-5 space-y-5">
                                    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5" /> User
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                                                {data?.userName[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{data?.userName}</p>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Mail className="w-3 h-3" /> {data?.email}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Phone className="w-3 h-3" /> {data?.phoneNo}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reason */}
                                        <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                                                <FileText className="w-3.5 h-3.5" /> Reason for Cancellation
                                            </p>
                                            <p className="text-sm text-gray-700 leading-relaxed">{data?.cancellationReason}</p>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <Clock className="w-3.5 h-3.5" />
                                            Submitted: {data?.updatedAt?.toString()}
                                        </div>
                                    </div>

                                    {/* Booking details */}
                                    <div className="rounded-xl border border-gray-100 p-4 space-y-4">
                                        <p className="text-sm font-semibold text-gray-900">Booking Details</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <InfoRow
                                                icon={<CalendarDays className="w-3 h-3" />}
                                                label="Package"
                                                value={data?.packageName}
                                            />
                                            <div className="space-y-0.5">
                                                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                                    <CalendarDays className="w-3 h-3" /> Trip Date
                                                </p>
                                                <p className="text-sm text-gray-800">  {data?.startDate
                                                    ? format(new Date(data.startDate), "dd/MM/yyyy")
                                                    : "-"}</p>
                                                <p className="text-xs text-rose-500 font-medium">{data?.calculation?.daysUntilTrip} days away</p>
                                            </div>
                                            <InfoRow
                                                icon={<Hash className="w-3 h-3" />}
                                                label="Booking ID"
                                                value={data?.bookingCode}
                                            />
                                            <InfoRow
                                                icon={<Users className="w-3 h-3" />}
                                                label="Travelers"
                                                value={data?.travelersCount.toString() + " " + data?.groupType}
                                            />
                                            <InfoRow
                                                icon={<Store className="w-3 h-3" />}
                                                label="Vendor"
                                                value={data?.vendorName}
                                            />
                                        </div>
                                    </div>

                                    {/* Cancellation Policy */}
                                    <div className="rounded-xl border border-gray-100 p-4 space-y-3">
                                        <p className="text-sm font-semibold text-gray-900">Cancellation Policy Applied</p>
                                        <div className="rounded-lg bg-amber-50 border border-amber-100 p-4 space-y-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                                                    <ShieldAlert className="w-3 h-3 text-white" />
                                                </div>
                                                <p className="text-sm font-bold text-amber-600">{data?.cancellationPolicyLabel}</p>
                                            </div>
                                            <ul className="space-y-1">
                                                {data?.rules.map((item) => (
                                                    <li key={item.daysBeforeTrip} className="flex items-center gap-2 text-xs text-gray-700">
                                                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                                                        {item.daysBeforeTrip} days+ →{" "}
                                                        <span className="font-semibold">{item.refundPercent}%</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-64 xl:w-72 px-5 sm:px-7 lg:px-5 py-5 lg:border-l border-t lg:border-t-0 border-gray-100 space-y-4 shrink-0">
                                    <div className="rounded-xl border border-gray-100 p-4 space-y-3">
                                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                                            <IndianRupee className="w-4 h-4 text-gray-400" /> Refund Calculation
                                        </p>
                                        <div className="space-y-2">
                                            <RefundRow label="Amount paid" value={`₹${data?.finalAmount.toLocaleString()}`} />
                                            <RefundRow label="Days before trip" value={`${data?.calculation?.daysUntilTrip} days`} />
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Applicable rate</span>
                                                <span className="font-semibold text-indigo-600">
                                                    {data?.calculation?.appliedRule.refundPercent}%{" "}
                                                    <span className="text-xs text-gray-400">({data?.calculation?.appliedRule.daysBeforeTrip} days+)</span>
                                                </span>
                                            </div>
                                            <Separator />
                                            <RefundRow
                                                label={`Deduction`}
                                                value={`₹${data?.calculation?.deductionAmount.toLocaleString()}`}
                                                bold
                                            />
                                            <RefundRow
                                                label="Refund to wallet"
                                                value={`₹${data?.cancellationRefundAmount ? data?.cancellationRefundAmount.toLocaleString() : 0}`}
                                                bold
                                                accent
                                            />
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-gray-100 p-4 space-y-3">
                                        <p className="text-sm font-semibold text-gray-900">Admin Decision</p>
                                        <AnimatePresence mode="wait">
                                            {data?.cancellationStatus === "approved" && (
                                                <motion.div
                                                    key="approved"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 flex items-center gap-2"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-emerald-700">Approved</p>
                                                        <p className="text-xs text-emerald-600">₹{data?.cancellationRefundAmount?.toLocaleString() ?? 0} will be refunded</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                            {data?.cancellationStatus === "rejected" && (
                                                <motion.div
                                                    key="rejected"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="rounded-lg bg-red-50 border border-red-200 p-3 flex items-center gap-2"
                                                >
                                                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-red-700">Request Rejected</p>
                                                        <p className="text-xs text-red-500 line-clamp-2">{data?.cancellationRejectedReason}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                            {data?.cancellationStatus === "pending" && (
                                                <motion.div
                                                    key="actions"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="space-y-3"
                                                >
                                                    <button
                                                        onClick={handleApprove}
                                                        className="w-full h-9 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                                        disabled={isApproving || isRejecting}
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        Approve — Refund ₹{data?.cancellationRefundAmount?.toLocaleString() ?? 0}
                                                    </button>

                                                    <div className="flex items-center gap-2">
                                                        <Separator className="flex-1" />
                                                        <span className="text-xs text-gray-400">or</span>
                                                        <Separator className="flex-1" />
                                                    </div>

                                                    <Textarea
                                                        value={rejectReason}
                                                        onChange={(e) => setRejectReason(e.target.value)}
                                                        placeholder="Reason for rejection (required)…"
                                                        rows={2}
                                                        className="text-xs resize-none rounded-lg border-gray-200 focus:border-red-300 placeholder:text-gray-300"
                                                    />

                                                    <button
                                                        onClick={handleReject}
                                                        className="w-full h-9 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                                                        disabled={!rejectReason.trim() || isApproving || isRejecting}
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Reject Request
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    {!decision && (
                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                                            Decision is final. Refund will be processed within 5–7 business days.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
