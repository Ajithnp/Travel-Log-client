import { motion } from "framer-motion";
import { CreditCard, ShieldCheck } from "lucide-react";
import SectionCard from "./section-card";
import Row from "./row-field";
import type { FinancialsDTO } from "../../types";

interface PricingProps {
  pricing: FinancialsDTO;
  transactionId: string;
}

const Pricing = ({ pricing, transactionId }: PricingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.14 }}
    >
      <SectionCard title="Payment" icon={CreditCard}>
        <div className="space-y-1.5 mb-3">
          <Row
            label="Method"
            value={<span className="text-emerald-600 text-sm">{"online"}</span>}
          />
          <Row label="Subtotal" value={`₹ ${pricing?.grossAmount}`} />
          <Row
            label="Wallet"
            value={
              pricing?.walletAmountUsed ? pricing?.walletAmountUsed : "- - -"
            }
          />
          <Row
            label="Discount(coupon + offer)"
            value={
              <span className="text-emerald-600">
                {pricing?.discountAmount}
              </span>
            }
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
          <span className="text-sm font-bold text-gray-800">Total</span>
          <span className="text-base font-bold text-indigo-600">{`₹ ${pricing?.finalAmount}`}</span>
        </div>
        <div className="flex items-start justify-between gap-2 mt-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span className="text-[14px] text-emerald-600 font-medium">
              Transaction Id
            </span>
          </div>
          <span className="text-sm font-mono text-gray-500 text-right break-all">
            {transactionId}
          </span>
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default Pricing;
