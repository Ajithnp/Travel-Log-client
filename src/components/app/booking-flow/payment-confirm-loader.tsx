import { useEffect, useState } from "react";
import { motion } from "framer-motion";



function Spinner() {
  return (
    <svg className="w-full h-full" viewBox="0 0 80 80" fill="none">

      <circle cx="40" cy="40" r="34" stroke="#e5e7eb" strokeWidth="5" />

      <motion.circle
        cx="40" cy="40" r="34"
        stroke="url(#spinGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="213.6"
        strokeDashoffset="160"
        style={{ rotate: -90, transformOrigin: "40px 40px" }}
        animate={{ rotate: ["-90deg", "270deg"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
      <defs>
        <linearGradient id="spinGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function PaymentLoader() {
 
  const [dots, setDots] = useState("");

  /* Animate the ellipsis */
  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 420);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-3 py-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-indigo-100/50 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-violet-100/50 blur-[100px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-200/70 overflow-hidden">

          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">

            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-7">
              <Spinner />
            </div>

            {/* Heading */}
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 tracking-tight">
              Processing Payment{dots}
            </h2>
            <p className="text-sm text-gray-400 mb-6 sm:mb-7 max-w-xs">
              Please keep this page open. This usually takes a few seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}