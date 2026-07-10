import { motion, AnimatePresence } from "framer-motion";
import {
  Banknote,
  CheckCircle2, XCircle, SlidersHorizontal, type LucideIcon,
  ArrowDownLeft, ArrowUpRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FILTERS, type TransactionDTO, type TransactionType, type TxFilter, } from "../types/types";
import { format } from "date-fns";


const TYPE_CONFIG: Record<TransactionType, { color: string; bg: string; border: string }> = {
  credit: { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  debit: { color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
};

const TYPE_ICON: Record<TransactionType, LucideIcon> = {
  credit: ArrowDownLeft,
  debit: ArrowUpRight,
};

export const STATUS_ICON: Record<TransactionDTO["status"], LucideIcon> = {
  success: CheckCircle2,
  failed: XCircle,
};

export const STATUS_COLOR: Record<TransactionDTO["status"], string> = {
  success: "text-emerald-500",
  failed: "text-rose-500",
};

interface TransactionTableProps {
  filter: TxFilter;
  handleFilter: (f: TxFilter) => void;
  filteredLength: number;
  safePage: number;
  transactions: TransactionDTO[];
  isLoading: boolean;
}

export default function TransactionTable({ filter, handleFilter, filteredLength, safePage, transactions,isLoading }: TransactionTableProps) {
  
  if(isLoading) return(
    <div className="flex h-96 items-center justify-center">
      <div className="flex w-12 h-12 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    </div>
    )
  return (
    <>
      {/* <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500" /> */}
      <div className="px-4 sm:px-5 pt-4 pb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Transaction History</h2>
          <p className="text-xs text-gray-400 mt-0.5">{filteredLength} transactions</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-gray-100/70 rounded-lg p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="h-7 w-7 p-0 border-gray-200 text-gray-400 hover:bg-gray-50">
            <SlidersHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <Separator className="bg-gray-100" />
      <div className="hidden sm:grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.6fr] gap-4 px-5 py-2.5 bg-gray-50/60">
        {["Transaction", "Date & Time", "Type", "Status", "Amount"].map((h) => (
          <p key={h} className={`text-[10px] font-semibold text-gray-400 uppercase tracking-wider ${h === "Amount" ? "text-right" : ""}`}>
            {h}
          </p>
        ))}
      </div>

      <Separator className="bg-gray-100" />
      <div className="divide-y divide-gray-50 min-h-[300px]">
        <AnimatePresence mode="wait">
          {transactions.length === 0 ? (
            <motion.div
              key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-14 text-center"
            >
              <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                <Banknote className="w-5 h-5 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-400">No transactions found</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${filter}-${safePage}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {transactions?.map((tx, i) => {
                const StIcon = STATUS_ICON[tx.status];
                const typeCfg = TYPE_CONFIG[tx.type];
                const TypeIcon = TYPE_ICON[tx.type];
                const amtColor = tx.type === "debit"
                  ? "text-rose-600 "
                 : "text-green-600";

                let formattedDateTime = "--:--";
                if (tx.createdAt) {
                  const date = new Date(tx.createdAt);
                  const formattedDate = format(date, "dd/MM/yyyy");
                  const formattedTime = format(date, "hh:mm a");
                  formattedDateTime = `${formattedDate} ${formattedTime}`;
                }

                return (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="grid grid-cols-1 sm:grid-cols-[2fr_1.2fr_1fr_0.8fr_0.6fr] gap-2 sm:gap-4 items-center px-4 sm:px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Transaction */}
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${typeCfg.bg} ${typeCfg.border}`}>
                        <TypeIcon className={`w-4 h-4 ${typeCfg.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{tx.description}</p>
                      </div>
                    </div>

                    <div className="sm:block flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {formattedDateTime}
                      </p>
                    </div>
                    <p className={`text-[12px] font-mono hidden sm:block uppercase font-bold tracking-wider ${tx.type === 'credit' ? 'text-emerald-500' : 'text-rose-500'}`}>{tx.type}</p>

                    <div className="hidden sm:flex items-center gap-1.5">
                      <StIcon className={`w-3 h-3 ${STATUS_COLOR[tx.status]}`} />
                      <span className={`text-[13px] font-medium capitalize ${STATUS_COLOR[tx.status]}`}>{tx.status}</span>
                    </div>

                    <p className={`text-sm font-bold text-right ${amtColor}`}>{tx.amount}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Separator className="bg-gray-100" />
    </>
  );
}
