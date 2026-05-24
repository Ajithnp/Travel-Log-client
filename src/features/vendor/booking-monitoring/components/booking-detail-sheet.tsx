import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/loader";
import type { ScheduleBookingSingleDetailDTO } from "../services/api.services";
import { Phone, PhoneCall, ScrollText } from "lucide-react";

interface BookingDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingDetail?: ScheduleBookingSingleDetailDTO;
  isLoading: boolean;
}

export function BookingDetailSheet({ open, onOpenChange, bookingDetail, isLoading }: BookingDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto bg-white border-l">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader message="Loading details..." />
          </div>
        ) : !bookingDetail ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No details found.
          </div>
        ) : (
          <div className="flex flex-col gap-6 pt-4 pb-10">
            <SheetHeader className="text-left space-y-1">
              <SheetTitle className="text-2xl font-bold font-serif">Booking Detail</SheetTitle>
              <div className="text-sm text-muted-foreground">{bookingDetail.bookingCode}</div>
            </SheetHeader>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 capitalize">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {bookingDetail.bookingStatus}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {bookingDetail.paymentStatus}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Booking Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Code</span>
                  <span className="font-semibold">{bookingDetail.bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Group Type</span>
                  <span className="font-semibold">{bookingDetail.groupType} &middot; {bookingDetail.travelers?.length || 0} travelers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-semibold text-emerald-600">₹{bookingDetail.finalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-semibold">{bookingDetail.paymentMethod || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booked On</span>
                  <span className="font-semibold">
                    {bookingDetail.bookedOn ? format(new Date(bookingDetail.bookedOn), "MMM d, yyyy") : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Travelers</h3>
              <div className="space-y-3">
                {bookingDetail.travelers?.map((traveler, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    {traveler.isLead && (
                      <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wide mb-1">
                        ⭐ Lead Traveler
                      </span>
                    )}
                    <h4 className="font-bold text-slate-800">{traveler.fullName}</h4>

                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="flex items-center gap-1"><ScrollText className="w-3.5 h-3.5" /> {traveler.idType} #{traveler.idNumber}</span>
                      {traveler.relation && <span>&middot; {traveler.relation}</span>}
                    </div>
                    {traveler.phoneNumber && (
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {traveler.phoneNumber}</span>
                      </div>
                    )}
                    {traveler.emergencyContact && (
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="flex items-center gap-1 text-red-500"><PhoneCall className="w-3.5 h-3.5" /> Emergency:</span> {traveler.emergencyContact}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={() => onOpenChange(false)}>
              &mdash; Back to List
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
