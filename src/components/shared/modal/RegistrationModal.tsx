import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, ChevronRight, Sparkles, Globe, Building2, Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectOption: (option: 'traveler' | 'business') => void
}

export default function RegistrationModal({ isOpen, onClose, onSelectOption }: RegistrationModalProps) {
  const [hovered, setHovered] = useState<'traveler' | 'business' | null>(null)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] p-0 overflow-hidden border-0 bg-white rounded-3xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.05)] font-sans">
  
        <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500" />

        {/* Header */}
        <DialogHeader className="text-center pt-10 pb-6 px-8">
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/80 shadow-sm flex items-center justify-center mb-1">
              <Sparkles className="w-6 h-6 text-violet-500" strokeWidth={1.8} />
            </div>

            <DialogTitle className="text-[26px] font-bold tracking-tight text-slate-900 text-center leading-tight">
              Create your account
            </DialogTitle>
            <p className="text-slate-500 text-[15px] text-center leading-relaxed max-w-[280px]">
              Choose the account type that best fits your needs
            </p>
          </motion.div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-3">

          {/* Traveler Option */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.985 }}
            onHoverStart={() => setHovered('traveler')}
            onHoverEnd={() => setHovered(null)}
            onClick={() => onSelectOption("traveler")}
            className="w-full relative group text-left rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-250 p-5 flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 overflow-hidden shadow-premium"
          >
  
            <AnimatePresence>
              {hovered === 'traveler' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.04] to-indigo-500/[0.06] pointer-events-none"
                />
              )}
            </AnimatePresence>

            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_4px_12px_rgba(59,130,246,0.35)] flex items-center justify-center group-hover:shadow-[0_6px_20px_rgba(59,130,246,0.45)] transition-shadow duration-300">
                <Globe className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
            </div>


            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-slate-900 text-[15px] leading-tight">
                  Traveler Account
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                  <Star className="w-2.5 h-2.5 fill-blue-500 text-blue-500" />
                  Popular
                </span>
              </div>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Book trips, explore destinations, manage travel experiences
              </p>
            </div>

            <motion.div
              animate={{ x: hovered === 'traveler' ? 2 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
            </motion.div>
          </motion.button>

          {/* Business Option */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.985 }}
            onHoverStart={() => setHovered('business')}
            onHoverEnd={() => setHovered(null)}
            onClick={() => onSelectOption("business")}
            className="w-full relative group text-left rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40 transition-all duration-250 p-5 flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 overflow-hidden shadow-premium"
          >

            <AnimatePresence>
              {hovered === 'business' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.04] to-teal-500/[0.06] pointer-events-none"
                />
              )}
            </AnimatePresence>

            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_4px_12px_rgba(16,185,129,0.35)] flex items-center justify-center group-hover:shadow-[0_6px_20px_rgba(16,185,129,0.45)] transition-shadow duration-300">
                <Building2 className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-slate-900 text-[15px] leading-tight">
                  Travel Business
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                  <Briefcase className="w-2.5 h-2.5 text-emerald-500" />
                  For companies
                </span>
              </div>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                List services, manage bookings, grow your travel business
              </p>
            </div>

            <motion.div
              animate={{ x: hovered === 'business' ? 2 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors duration-200" />
            </motion.div>
          </motion.button>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="px-6 pb-7 text-center"
        >
          <p className="text-[12px] text-slate-400">
          
            <span className="text-slate-600 font-medium cursor-pointer hover:text-slate-900 transition-colors">
           
            </span>
          </p>
        </motion.div>

      </DialogContent>
    </Dialog>
  )
}