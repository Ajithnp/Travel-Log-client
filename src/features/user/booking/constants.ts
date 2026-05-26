import { AlertCircle, CalendarCheck, CheckCircle2, Clock, CreditCard, UserX, XCircle } from "lucide-react";
import type { BookingFilterTab, BookingStatus } from "./types";

export const tabs: { key: BookingFilterTab; label: string }[] = [
        { key: "all" as BookingFilterTab, label: "All Bookings" },
        { key: "confirmed" as BookingFilterTab, label: "Upcoming" },
        { key: "completed" as BookingFilterTab, label: "Completed" },
        { key: "cancelled_by_user" as BookingFilterTab, label: "Cancelled" },
];
    
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED_BY_USER: 'cancelled_by_user',
  CANCELLED_BY_VENDOR: 'cancelled_by_vendor',
  ATTENDED: 'attended',
  COMPLETED: 'completed',
  PAYMENT_FAILED: 'payment_failed',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  PARTIALLY_REFUNDED: 'partially_refunded',
} as const;



export const STATUS_CONFIG = {
  [BOOKING_STATUS.PENDING]: {
    label: "Pending",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: Clock,
  },
  [BOOKING_STATUS.CONFIRMED]: {
    label: "Confirmed",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    icon: CalendarCheck,
  },
  [BOOKING_STATUS.CANCELLED_BY_USER]: {
    label: "Cancelled by You",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    icon: XCircle,
  },
  [BOOKING_STATUS.CANCELLED_BY_VENDOR]: {
    label: "Cancelled by Vendor",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: UserX,
  },
  [BOOKING_STATUS.ATTENDED]: {
    label: "Attended",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    icon: AlertCircle,
  },
  [BOOKING_STATUS.COMPLETED]: {
    label: "Completed",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
  [BOOKING_STATUS.PAYMENT_FAILED]: {
    label: "Payment Failed",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: CreditCard,
  },
} satisfies Record<BookingStatus, { label: string; color: string; bg: string; border: string; icon: typeof CheckCircle2 }>;


export const FALLBACK_STATUS = {
  label: "Unknown",
  color: "text-gray-500",
  bg: "bg-gray-50",
  border: "border-gray-200",
  icon: Clock,
};