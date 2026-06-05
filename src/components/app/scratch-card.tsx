import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  IndianRupee,
  Gift,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import type { RewardResponse } from "@/services/app-service";


interface ScratchCardProps {
    isOpen: boolean;
    onClose: () => void;
    reward: RewardResponse | undefined;
    onReveal: (rewardId:string) => void;
    isPending: boolean;
}

export default function ScratchCard({ isOpen, onClose, reward, onReveal, isPending }: ScratchCardProps) {
//   const [copied, setCopied] = useState(false);
 const [opened, setOpened] = useState(false);
//   const copyCode = () => {
//     navigator.clipboard.writeText(CARD.code).catch(() => {});
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

  if(!isOpen && !reward) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
          <div className="w-full max-w-xs sm:max-w-sm relative">
            
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur-sm text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/50 border border-violet-100/60 bg-white"
            >

          <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-500 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">Cashback Coupon</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-violet-200 text-[11px]">
              {/* <Timer className="w-3 h-3" /> */}
              
            </div>
          </div>

          <div className="flex items-center bg-white">
            <div className="w-4 h-4 rounded-full bg-slate-100 -ml-2 flex-shrink-0" />
            <div className="flex-1 border-t-2 border-dashed border-slate-100 mx-1" />
            <div className="w-4 h-4 rounded-full bg-slate-100 -mr-2 flex-shrink-0" />
          </div>

          <div className="bg-white px-5 pt-4 pb-5 min-h-[200px] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <AnimatePresence mode="wait">

              {!opened && (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center gap-5 py-4 w-full relative z-10"
                >
       
                  <div className="relative">
                     <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 border border-violet-200/60 flex items-center justify-center">
                       <span className="text-4xl select-none">🎁</span>
                     </div>
                     <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
                       <Sparkles className="w-3 h-3 text-white" />
                     </div>
                   </div>

                  <div className="text-center">
                    <p className="text-base font-bold text-slate-800">You have a reward!</p>
                    <p className="text-xs text-slate-400 mt-0.5">Tap open to reveal your cashback</p>
                  </div>

                  <Button
                    onClick={() => {
                      if (reward?.id) {
                        onReveal(reward.id);
                        setOpened(true);
                      }
                    }}
                    disabled={isPending}
                    className="w-full h-11 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-bold text-sm gap-2 shadow-lg shadow-violet-300/50 border-0"
                  >
                    Open Reward
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}

        
              {opened && reward && (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.88, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="flex flex-col items-center gap-4 py-4 w-full relative z-10"
                >
             
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1"
                  >
                    <span className="text-base">🎉</span>
                    <span className="text-xs font-bold text-emerald-600">Congratulations!</span>
                  </motion.div>

      
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.18 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-0.5">
                      <IndianRupee className="w-7 h-7 text-violet-600 mb-1" strokeWidth={3} />
                      <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-indigo-500 leading-none">
                        {reward.rewardValue}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">Cashback credited to your Wallet</p>
                  </motion.div>

                
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                    className="w-full flex items-center justify-center bg-slate-50 border border-slate-200 hover:border-violet-300 rounded-xl px-4 py-3 transition-colors group"
                  >
                    <div className="text-center">
                      <p className="text-[10px] text-center text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Cash Back</p>
                      {/* <p className="font-mono text-sm font-bold text-slate-800 tracking-widest">{CARD.code}</p> */}
                    </div>
                    <AnimatePresence mode="wait">
               
                        <motion.div key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          {/* <Copy className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors" /> */}
                        </motion.div>
                      
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom strip */}
          <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            </div>
          </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}