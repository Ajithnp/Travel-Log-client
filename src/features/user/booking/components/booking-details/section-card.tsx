import { AnimatePresence , motion} from "framer-motion";
import { ChevronDown, ChevronUp, Plane } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function SectionCard({ title, icon: Icon, children, defaultOpen = true }: { title: string; icon: typeof Plane; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-premium">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <Icon className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <span className="text-sm font-semibold text-gray-800">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <Separator className="bg-gray-100" />
            <div className="px-4 sm:px-5 py-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}