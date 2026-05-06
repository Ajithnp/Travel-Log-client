import React from 'react'
import { motion } from "framer-motion";
import SectionCard from './section-card';
import { Car, Luggage, Utensils, Wifi } from 'lucide-react';
const Included = () => {
  return (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.18 }}>
              <SectionCard title="Included Services" icon={Luggage} defaultOpen={false}>
                {[
                  { icon: Utensils, label: "Breakfast included daily" },
                  { icon: Wifi,     label: "High-speed WiFi throughout" },
                  { icon: Car,      label: "Airport transfers (both ways)" },
                  { icon: Luggage,  label: "Luggage assistance on arrival" },
                ].map(({ icon: I, label }) => (
                  <div key={label} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0">
                    <I className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span className="text-xs text-gray-600">{label}</span>
                  </div>
                ))}
              </SectionCard>
            </motion.div>
  )
}

export default Included
