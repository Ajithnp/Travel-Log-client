import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Download, ArrowRight, Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { useRevealRewardMutation, useUnrevealedRewardQuery } from "@/hooks/app/api.hooks";
import ScratchCard from "@/components/app/scratch-card";


export default function PaymentSuccess() {
  const [visible, setVisible] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showScratchCard, setShowScratchCard] = useState(false);

  const { data: reward} = useUnrevealedRewardQuery()
  const { mutate: revealReward, isPending: revealRewardLoading } = useRevealRewardMutation();
  
  const rewardData = reward?.data;

  useEffect(() => {
    if (rewardData) {
      setShowScratchCard(true);
    }
  }, [rewardData]);
  
  const bookingCode = state?.bookingCode;
  const amount = state?.amount;

  const handleReveal: (rewardId: string) => void = (rewardId) => {
    revealReward(rewardId);

  }

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dashboard-bg via-background to-muted px-3 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-orange-100/60 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-orange-200/60 blur-[100px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-20 w-full max-w-lg"
          >
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xl shadow-gray-200/80">

              <div className="h-1 w-full bg-gradient-to-r from-green-500 via-green-500 to-cyan-400" />

              <div className="p-5 sm:p-8">

                <div className="text-center mb-6 sm:mb-8">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
                    className="relative inline-flex mb-4 sm:mb-5"
                  >
                    <div className="absolute inset-0 rounded-full bg-emerald-100 blur-xl scale-150" />
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Badge className="mb-2 sm:mb-3 bg-emerald-50 text-emerald-600 border-emerald-200 text-xs tracking-widest uppercase px-3 py-1">
                      Payment Confirmed
                    </Badge>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 tracking-tight">
                      Your trip is booked!
                    </h1>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                      We've sent your itinerary and e-tickets to your email. Get ready to explore.
                    </p>
                  </motion.div>
                </div>


                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 p-4 mb-5 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-md text-gray-400 mb-0.5">Total Charged</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{amount?.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-md text-gray-400 mb-0.5">Booking ID</p>
                    <p className="text-xs sm:text-sm font-mono text-indigo-600 font-semibold">{bookingCode}</p>
                  </div>
                </motion.div>

                <Separator className="bg-gray-100 mb-5 sm:mb-6" />

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="flex flex-col gap-2.5 sm:gap-3"
                >
                  <Button 
                  className="w-full h-10 sm:h-11 bg-gradient-to-r from-orange-500 to-violet-600 hover:from-orange-400 hover:to-orange-500 text-white text-sm font-semibold border-0 shadow-md shadow-orange-200 transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => navigate("/user/bookings")}
                  >
                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                    <span>View Bookings</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-10 sm:h-11 border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200"
                    onClick={() => navigate("/")}
                  >
                    <Home className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Back to Home</span>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="mt-4 text-center"
                >
                  <button className="text-xs text-indigo-500/80 hover:text-indigo-600 flex items-center gap-1.5 mx-auto transition-colors">
                    <Download className="w-3 h-3 flex-shrink-0" />
                    <span>Download booking confirmation (PDF)</span>
                  </button>
                </motion.div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      <ScratchCard
        isOpen={showScratchCard}
        onClose={() => setShowScratchCard(false)}
        reward={rewardData}
        onReveal={handleReveal}
        isPending={revealRewardLoading}
      />
    </div>
  );
}
