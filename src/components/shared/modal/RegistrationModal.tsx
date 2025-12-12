"use client"

import { motion } from "framer-motion"
import { User, Briefcase, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectOption: (option: 'traveler' | 'business') => void
}

export default function RegistrationModal({ isOpen, onClose, onSelectOption }: RegistrationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-0 bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl">
        {/* Gradient background accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" />

        <DialogHeader className="text-center pt-12 pb-8 px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <DialogTitle className="text-4xl text-center font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              Choose Registration
            </DialogTitle>
            <p className="text-gray-500 text-lg text-center">Select your account type to begin your journey</p>
          </motion.div>
        </DialogHeader>

        {/* Registration options */}
        <div className="px-15 pb-8 space-y-4">
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectOption("traveler")}
            className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 hover:border-blue-300 rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center space-x-5 relative z-10">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:shadow-blue-200 group-hover:scale-110 transition-all duration-300">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 text-xl mb-1">Traveler Account</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Book amazing trips and manage your travel experiences
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 relative z-10" />
          </motion.button>

          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectOption("business")}
            className="w-full bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100 hover:border-green-300 rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center space-x-5 relative z-10">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg group-hover:shadow-green-200 group-hover:scale-110 transition-all duration-300">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 text-xl mb-1">Travel Business</h3>
                <p className="text-gray-600 text-sm leading-relaxed">List your services and manage customer bookings</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-green-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300 relative z-10" />
          </motion.button>
        </div>

        <div className="px-8 pb-6">
          <div className="text-center">
            <p className="text-xs text-gray-400">Choose the option that best fits your needs</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
