import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, RefreshCw, ArrowRight, Home, BookOpen, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { useRetryPayment } from "@/features/user/booking/hooks/retry-payment";

const possibleReasons = [
  "Insufficient funds or card limit reached",
  "Card details may be incorrect — double-check and retry",
  "Your bank may have blocked an international transaction",
  "Session timeout — your cart is still saved",
];

export default function PaymentFailed() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { state } = useLocation();
  const bookingId = state?.bookingId as string;
  const amount = state?.amount as number;

  const navigate = useNavigate();

  const {retryPayment, isLoading} = useRetryPayment();
  const handleRetryPayment = ()=>{
    retryPayment(bookingId)
  }
  

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dashboard-bg via-background to-muted px-3 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-rose-100/50 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-orange-100/50 blur-[100px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#f87171 1px, transparent 1px), linear-gradient(90deg, #f87171 1px, transparent 1px)",
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

              <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400" />

              <div className="p-5 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
                    className="relative inline-flex mb-4 sm:mb-5"
                  >
                    <div className="absolute inset-0 rounded-full bg-rose-100 blur-xl scale-150" />
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-200">
                      <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Badge className="mb-2 sm:mb-3 bg-rose-50 text-rose-600 border-rose-200 text-xs tracking-widest uppercase px-3 py-1">
                      Payment Failed
                    </Badge>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 tracking-tight">
                      Transaction declined
                    </h1>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                      Your payment could not be processed.
                      {/* Your booking is held for{" "} */}
                      {/* <span className="text-amber-500 font-medium">15 minutes</span>. */}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="rounded-xl bg-rose-50 border border-rose-100 p-4 mb-5 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Amount Attempted</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-400 line-through decoration-rose-400/60">{amount.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Error Code</p>
                    <p className="text-xs sm:text-sm font-mono text-rose-500 font-semibold">CARD_DECLINED</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="mb-5"
                >
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
                  >
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      Why did this happen?
                    </span>
                    {showDetails ? <ChevronUp className="w-3.5 h-3.5 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 mt-1 space-y-1.5">
                          {possibleReasons.map((r, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-500">
                              <span className="text-amber-400 mt-0.5 flex-shrink-0">·</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <Separator className="bg-gray-100 mb-5" />

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="flex flex-col gap-2.5 sm:gap-3"
                >
                  <Button disabled={isLoading} onClick={handleRetryPayment} className="w-full h-10 sm:h-11 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white text-sm font-semibold border-0 shadow-md shadow-rose-200 transition-colors duration-200">
                    <RefreshCw className={`w-4 h-4 mr-2 flex-shrink-0 ${isLoading ? "animate-spin" : ""}`} />
                    <span className="truncate">{isLoading ? "Retrying..." : "Retry Payment"}</span>
                    <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0" />
                  </Button>


                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="h-10 border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200 w-full"
                       onClick={() => navigate("/user/bookings")}
                    >
                      <BookOpen className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                      <span className="truncate">View Bookings</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-10 border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200 w-full"
                      onClick={() => navigate("/")}
                    >
                      <Home className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                      <span className="truncate">Back to Home</span>
                    </Button>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
