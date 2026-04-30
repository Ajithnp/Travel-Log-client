import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ShieldOff,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import PolicyCard from "../components/policy-card";
import type { Policy } from "../types";
import { CreatePolicyModal, type PolicyFormValues } from "../components/create-policy-modal";
import { Label } from "@radix-ui/react-label";
import { usePolicyCreateMutation, usePoliciesQuery } from "../hooks/api.hooks";
import { toast } from "sonner";
import { SpinnerLoading } from "@/components/common/spinner";


const policies: Policy[] = [
  {
    id: "1",
    key: "flexible",
    label: "Flexible",
    description:
      "Most lenient policy. Best for travellers who might need to change plans.",
    isActive: true,
    rules: [
      { daysBeforeTrip: 5, refundPercent: 90 },
      { daysBeforeTrip: 3, refundPercent: 50 },
      { daysBeforeTrip: 0, refundPercent: 0 },
    ],
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z",
  },

  {
    id: "2",
    key: "moderate",
    label: "Moderate",
    description:
      "Balanced refund policy with a reasonable cancellation window.",
    isActive: true,
    rules: [
      { daysBeforeTrip: 7, refundPercent: 80 },
      { daysBeforeTrip: 5, refundPercent: 50 },
      { daysBeforeTrip: 0, refundPercent: 0 },
    ],
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z",
  },

  {
    id: "3",
    key: "strict",
    label: "Strict",
    description:
      "Stricter cancellation terms with lower refund percentages.",
    isActive: true,
    rules: [
      { daysBeforeTrip: 12, refundPercent: 70 },
      { daysBeforeTrip: 7, refundPercent: 30 },
      { daysBeforeTrip: 0, refundPercent: 0 },
    ],
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z",
  },

  {
    id: "4",
    key: "non_refundable",
    label: "Non-Refundable",
    description: "No refunds issued under any circumstance.",
    isActive: false,
    rules: [
      { daysBeforeTrip: 0, refundPercent: 0 },
    ],
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z",
  },
];



export default function CancellationPolicies() {
  const [showDisabled, setShowDisabled] = useState(false);
  const [items, setItems] = useState<Policy[]>(policies);
  const [open, setOpen] = useState(false);
  const { mutate: createPolicy, isPending } = usePolicyCreateMutation();
  const { data: policiesData, isLoading } = usePoliciesQuery();

  const visible = useMemo(() => {
    const data = policiesData?.data ?? [];

    return showDisabled
      ? data
      : data.filter((p) => p.isActive);
  }, [showDisabled, policiesData?.data]);

  const toggleActive = (id: string) => {
    console.log("Toggling active for policy ID:", id);
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.isActive } : p))
    );
  };

  const handleCreate = (data: PolicyFormValues) => {
    createPolicy(data, {
      onSuccess: (response) => {
        const newPolicy = response.data;
        setItems((prev) => [newPolicy, ...prev]);
        toast.success("Policy created successfully!");
      },
      onError: (error) => {
        console.error("Failed to create policy:", error);
        toast.error(error.response?.data?.message || "Failed to create policy.");
      },
    });
  }

  if (isLoading) {
    return <SpinnerLoading title="Loading.." />;
  }

  return (
    <div className="min-h-screen bg-[#f7f7fb] font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cancellation Policies</h1>
            <p className="text-sm text-slate-400 mt-1">Manage refund tiers for bookings</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle: show disabled */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <Switch
                id="show-disabled"
                checked={showDisabled}
                onCheckedChange={setShowDisabled}
                className="data-[state=checked]:bg-violet-500"
              />
              <Label
                htmlFor="show-disabled"
                className="text-xs font-semibold text-slate-600 cursor-pointer select-none whitespace-nowrap"
              >
                Show disabled
              </Label>
            </div>

            {/* Create new */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md hover:opacity-90 transition-opacity whitespace-nowrap"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4" />
              New Policy
            </motion.button>
          </div>
        </motion.div>


        <motion.div
          layout
          className="flex items-center gap-2 mb-5"
        >
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Showing
          </span>
          <Badge className="bg-violet-50 text-violet-700 border border-violet-200 text-xs px-2 py-0.5">
            {visible.length} {visible.length === 1 ? "policy" : "policies"}
          </Badge>
          {!showDisabled && items.some((p) => !p.isActive) && (
            <span className="text-xs text-slate-400">
              ({items.filter((p) => !p.isActive).length} hidden)
            </span>
          )}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {visible.map((policy, i) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                index={i}
                onToggleActive={toggleActive}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {visible.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                <ShieldOff className="w-7 h-7 text-slate-400" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-700 mb-1">No active policies</p>
                <p className="text-sm text-slate-400">Toggle "Show disabled" to see all policies.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <CreatePolicyModal
        isOpen={open || isPending}
        onClose={() => setOpen(false)}
        isLoading={isPending}
        onSubmit={(values) => {
          handleCreate(values);
          setOpen(false);
        }}
      />
    </div>
  );
}