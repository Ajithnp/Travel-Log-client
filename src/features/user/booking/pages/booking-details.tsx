import { motion } from "framer-motion";
import {
  MessageSquare,
  MapPin,
  Clock,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCancelBookingRequestMutation, useUserBookingDeatailsQuery } from "../hooks/api.hooks";
import DetailsNav from "../components/booking-details/details-nav";
import DetailsHeroCard from "../components/booking-details/details-hero-card";
import TravelersCard from "../components/booking-details/travellers-card";
import ItinerarySection from "../components/booking-details/itinerary-section";
import Pricing from "../components/booking-details/pricing";
import Included from "../components/booking-details/included";
import SectionCard from "../components/booking-details/section-card";
import CancellationPolicy from "../components/booking-details/cancellation-policy";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { formatTimeToAMPM } from "@/utils/format-time-to-ampm";
import CancelBookingModal from "../components/cancelation-modal";
import { useState } from "react";
import { toast } from "sonner";
import { BOOKING_STATUS } from "../constants";
import { getLastCancellationDate, isCancellationAllowed } from "@/utils/cancellation/cancellation-window";
import { useDownloadTicketMutation } from "@/hooks/app/api.hooks";



export default function BookingDetail() {
  const [showModal, setShowModal] = useState(false);
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } =
    useUserBookingDeatailsQuery(bookingId);

  const cancelMutation = useCancelBookingRequestMutation(bookingId);
   const booking = data?.data;

   const { mutate: downloadTicket, isPending } = useDownloadTicketMutation();
   
   const handleDownloadTicket = () => {
    if (bookingId) {
      downloadTicket(bookingId);
    }
  };

  const handleCancelBooking = ( payload: { bookingId: string; reason: string; details: string }) => {
  cancelMutation.mutate(payload,{
    onSuccess: (res) => {
      toast.success(res.message)
      setShowModal(false);
    },
  });
};


  if (!bookingId) return <Error message="Invalid booking ID." />;
  if (isLoading) return <Loader message="Loading booking details..." />;
  if (isError)
    return <Error onRetry={refetch} message={error?.response?.data?.message} />;
  if (!booking) return <Error onRetry={refetch} message="Booking not found." />;

  const canCancel = isCancellationAllowed(booking?.schedule.startDate, booking?.cancellationPolicy?.rules ||[]);
  const lastDate = getLastCancellationDate(booking?.schedule.startDate, booking?.cancellationPolicy?.rules || []);

  const handleOperatorView = (operatorId: string) => {
    navigate(`/packages/vendor/${operatorId}/profile`);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 bg-[#f7f7fb] font-['Inter'] sm:py-8 mt-20">
      <div className="max-w-[97rem] mx-auto">
        <DetailsNav 
        status={booking.bookingStatus}
        cancelationStatus={booking.cancellationStatus}
        canCancel={canCancel}
        lastDate={lastDate}
        openCancelModal={() => setShowModal(true)} 
        downloadTicket={handleDownloadTicket}
        isDownloading={isPending}
         />
        <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-6 space-y-4">
          <DetailsHeroCard
            basePackage={booking.package}
            schedule={booking.schedule}
            totalAmount={booking.financials.finalAmount}
            travelersCount={booking.travelerCount}
            bookingCode={booking.bookingCode}
            bookedDate={booking.createdAt}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 }}
              >
                <SectionCard title="Meeting Point" icon={MapPin}>
                  <div className="flex flex-col gap-3">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-indigo-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                          Location
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {booking.schedule?.reportingLocation ||
                            "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-indigo-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                          Time
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatTimeToAMPM(booking.schedule?.reportingTime) || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </motion.div>

              <TravelersCard travelers={booking.travelers} />
 
              <ItinerarySection itinerary={booking.package.itinerary} />
            </div>
   
            <div className="space-y-4">

              <Pricing
                pricing={booking.financials}
                transactionId={booking.bookingCode}
              />
              <Included />
              <CancellationPolicy policy={booking.cancellationPolicy} />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.22 }}
                className="space-y-2"
              >
                <Button
                  className="w-full h-9 text-xs bg-indigo-500 hover:bg-indigo-600 text-white border-0 gap-2"
                  onClick={() => navigate("/user/chat", {
                    state: {
                      chatId: booking.chatId as string
                    }
                  })}
                  disabled={!booking.chatId || booking.bookingStatus === BOOKING_STATUS.CANCELLED_BY_USER}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Chat Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-9 text-sm border-gray-200 text-gray-600 hover:bg-gray-50 gap-2"
                  onClick={() => handleOperatorView(booking.vendor.id)}
                >
                  <UserCheck className="w-3.5 h-3.5 " /> Tour Operator
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <CancelBookingModal
        show={showModal}
        onClose={() => setShowModal(false)} 
        onCancelBooking={handleCancelBooking}
        isPending={cancelMutation.isPending}
        error={cancelMutation.error?.response?.data?.message || null}
        bookingId={booking.id}
        packageTittle={booking.package.title}
        bookingStartDate={booking.schedule.startDate}
        cancellationPolicy={booking.cancellationPolicy}
        finalAmount={booking.financials.finalAmount}
         />
    </div>
  );
}
