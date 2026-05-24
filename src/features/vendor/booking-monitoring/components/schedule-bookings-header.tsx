import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "../../schedule-package/components/status-badge";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, PinIcon } from "lucide-react";
import type { VendorScheduleBookingSummaryDTO } from "../services/api.services";
import { formatTimeToAMPM } from "@/utils/format-time-to-ampm";
import Bar from "@/components/shared/bar";

interface ScheduleBookingsHeaderProps {
    bookingData: Partial<VendorScheduleBookingSummaryDTO> | undefined;
}

export default function ScheduleBookingsHeader({
    bookingData,
}: ScheduleBookingsHeaderProps) {
    if (!bookingData) return null;

    return (
        <Card className="mb-6 animate-[fade-in_0.5s_ease-out] shadow-premium">
            <CardContent className="p-5 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                    <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <StatusBadge status={bookingData.scheduleStatus || ""} />
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
                            {bookingData.packageTitle} —{" "}
                            {format(new Date(bookingData.startDate || ""), "dd MMM")}
                        </h1>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">

                            <span className="inline-flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                {format(
                                    new Date(bookingData.startDate || ""),
                                    "dd MMM yyyy"
                                )}{" "}
                                –
                                {format(
                                    new Date(bookingData.endDate || ""),
                                    "dd MMM yyyy"
                                )}
                            </span>

                            <span className="hidden sm:inline text-muted-foreground/30">
                                ·
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                                <PinIcon className="w-4 h-4 text-destructive" />
                                {bookingData.packageLocation}-
                                {bookingData.packageState}
                            </span>

                            <span className="hidden sm:inline text-muted-foreground/30">
                                ·
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-red-500" />
                                Reporting Time:
                                <span className="font-semibold">
                                    {formatTimeToAMPM(
                                        bookingData.reportingTime || ""
                                    )}
                                </span>
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-red-500" />
                                Reporting Location:
                                <span className="font-semibold">
                                    {bookingData.reportingLocation}
                                </span>
                            </span>
                            <p className="text-xs text-foreground/60">
                                <span className="text-blue-400">
                                    {bookingData.totalConfirmedBookings}
                                </span>{" "}
                                bookings,

                                {" "}Total Gross{" "}
                                <span className="text-green-400">
                                    ₹{bookingData.totalConfirmedAmount}
                                </span>

                                {" "}• Platform Commission 15%{" "}
                                <span className="text-red-400">
                                    ₹{bookingData.totalPlatformCommission}
                                </span>

                                {" "}• You will get{" "}
                                <span className="text-orange-400">
                                    ₹{bookingData.totalVendorEarning}
                                </span>
                            </p>

                        </div>
                    </div>
                    <div className="w-full lg:w-[220px] flex justify-end">
                        <div className="w-full max-w-[220px] flex flex-col gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                                Seats Filled
                            </span>
                            <Bar
                                filled={bookingData.totalConfirmedBookings ?? 0}
                                total={bookingData.totalSeats ?? 0}
                                color="bg-orange-500"
                            />
                            <span className="text-xs text-muted-foreground">
                                {bookingData.totalConfirmedBookings ?? 0}/
                                {bookingData.totalSeats ?? 0} booked
                            </span>

                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}