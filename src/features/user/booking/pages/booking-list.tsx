import { motion, AnimatePresence } from "framer-motion";
import { Luggage } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import BookingCard from "../components/booking-card";
import BookingHeader from "../components/booking-header";
import BookingFilterWithSearch from "../components/booking-filter-search";
import BookingPagination from "../components/booking-pagination";
import { EmptyData } from "@/components/common/empty";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { useBookingList } from "../hooks/booking-list";
import { tabs } from "../constants";

export default function BookingList() {
  const {
    activeTab,
    search,
    page,
    bookings,
    total,
    totalPages,
    LIMIT,
    isLoading,
    isError,
    error,
    setActiveTab,
    setSearch,
    setPage,
    refetch,
    handleNavigateToDetails,
  } = useBookingList();

  if (isLoading) {
    return <Loader message="Loading your bookings..." />;
  }
  if (isError) {
    return <Error onRetry={refetch} message={error?.response?.data.message} />;
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 bg-orange-50/30 font-['Inter'] sm:py-8 mt-20">
      <div className="max-w-[97rem] mx-auto">

        <BookingHeader total={total} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm shadow-gray-100/80 overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <BookingFilterWithSearch
              tab={activeTab}
              tabs={tabs}
              search={search}
              onSearchChange={setSearch}
              onTabChange={setActiveTab}
            />

            <Separator className="bg-gray-100 mb-5" />
            <div className="space-y-3 min-h-[260px]">
              <AnimatePresence mode="wait">
                {bookings.length > 0 ? (
                  <motion.div
                    key={`${activeTab}-${page}-${search}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3"
                  >
                    {bookings.map((booking, i) => (
                      <BookingCard
                        key={booking._id}
                        booking={booking}
                        index={i}
                        onClick={() => handleNavigateToDetails(booking._id)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <EmptyData
                    heading="No bookings Found"
                    description="Try adjusting your filters or search term"
                    icon={<Luggage className="!w-15 !h-15 text-gray-300" />}
                  />
                )}
              </AnimatePresence>
            </div>

            {total > LIMIT && (
              <BookingPagination
                page={page}
                total={total}
                totalPages={totalPages}
                limit={LIMIT}
                setPage={setPage}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
