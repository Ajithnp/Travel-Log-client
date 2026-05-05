import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import SectionCard from "./section-card";
import type { TravelerDTO } from "../../types";
import { Badge } from "@/components/ui/badge";

interface TravelersCardProps {
  travelers: TravelerDTO[];
}

const TravelersCard = ({ travelers }: TravelersCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.12 }}
    >
      <SectionCard title="Travelers" icon={Users}>
        <div className="space-y-3">
          {travelers?.map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/70 border border-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {t.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {t.fullName}
                  </p>
                  <Badge className="text-[10px] font-bold bg-amber-50 border-gray-200 text-gray-500 px-2">
                    {t.isLead ? "Lead" : ""}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 sm:gap-x-4 sm:gap-y-2">
                  <span className="text-xs text-gray-400">
                    Id Type:{" "}
                    <span className="text-gray-600 font-mono">{t.idType}</span>
                  </span>
                  <span className="text-xs text-gray-400">
                    Relation:{" "}
                    <span className="text-gray-600">{t.relation}</span>
                  </span>
                  <span className="text-xs text-gray-400">
                    Id Number:{" "}
                    <span className="text-gray-600">{t.idNumber}</span>
                  </span>
                  <span className="text-xs text-gray-400 ">
                    Phone No:{" "}
                    <span className="text-gray-600 font-mono sm:text-[8px] lg:text-[12px]">
                      {t.phoneNumber}
                    </span>
                  </span>
                  <span className="text-xs text-gray-400">
                    Emergency Contact:{" "}
                    <span className="text-gray-600">{t.emergencyContact}</span>
                  </span>
                  <span className="text-xs text-gray-400">
                    Email:{" "}
                    <span className="text-[12px] sm:text-[13px] text-gray-600 font-mono break-all">
                      {t.emailAddress}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default TravelersCard;
