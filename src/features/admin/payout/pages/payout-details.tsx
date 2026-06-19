import { useSchedulePayoutDetailsQuery } from "../hooks/api.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { PayoutDetailsHeader } from "../components/payout-details-header";
import { PayoutInformation } from "../components/payout-information";
import { PayoutFinancialBreakdown } from "../components/payout-financial-breakdown";
import { PayoutIncludedBookings } from "../components/payout-included-bookings";

const statusConfig = {
    completed: { label: "Completed", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    pending: { label: "Pending", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
    failed: { label: "Failed", dot: "bg-red-400", badge: "bg-red-50 text-red-600 border-red-200" },
};

export default function PayoutDetails() {

    const navigate = useNavigate();
    const { scheduleId } = useParams();

    const payoutDetailsQuery = useSchedulePayoutDetailsQuery(scheduleId as string);
    const overViewStats = payoutDetailsQuery.data?.data.bookingOverViewStats;
    const bookingsData = payoutDetailsQuery.data?.data.bookingsData ?? [];
    const bookingStats = payoutDetailsQuery.data?.data.bookingStats;
    
    const getStatusKey = (status?: string): keyof typeof statusConfig => {
        if (status === 'paid') return 'completed';
        if (status === 'pending') return 'pending';
        return 'failed';
    };
    const status = statusConfig[getStatusKey(bookingStats?.schedulePayoutStatus)];


    if (payoutDetailsQuery.isLoading) {
        return <Loader message="Loading payout details..." />
    };
    if (payoutDetailsQuery.isError) {
        return <Error title="Failed to fetch payout details" onRetry={payoutDetailsQuery.refetch} />
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 p-3 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-5">

                <PayoutDetailsHeader 
                    onBack={() => navigate(-1)}
                    status={status}
                />

                <PayoutInformation 
                    vendorName={bookingStats?.vendorName}
                    scheduleStartDate={bookingStats?.scheduleStartDate}
                    scheduleEndDate={bookingStats?.scheduleEndDate}
                    packageTitle={bookingStats?.packageTitle}
                />

                <PayoutFinancialBreakdown
                    totalBookingsCount={bookingStats?.totalBookingsCount}
                    totalBookingGross={bookingStats?.totalBookingGross}
                    totalPlatformCommission={bookingStats?.totalPlatformCommission}
                    totalVendorEarnings={bookingStats?.totalVendorEarnings}
                    totalCancellationsCount={bookingStats?.totalCancellationsCount}
                    totalRefundedAmount={bookingStats?.totalRefundedAmount}
                />

                <PayoutIncludedBookings 
                    bookingsData={bookingsData}
                    overViewStats={overViewStats}
                />

            </div>
        </div>
    );
}