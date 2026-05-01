import { motion, AnimatePresence } from "framer-motion";
import { Plus, ShieldOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import PolicyCard from "../components/policy-card";
import { CreatePolicyModal } from "../components/create-policy-modal";
import { Label } from "@radix-ui/react-label";
import { SpinnerLoading } from "@/components/common/spinner";
import { ConfirmToggleModal } from "../components/confirm-modal";
import { useCancellationPolicies } from "../hooks/cancellation-policy";

export default function CancellationPolicies() {
  const {
    showDisabled,
    setShowDisabled,
    openCreate,
    openCreateModal,
    closeCreateModal,
    active,
    requestToggle,
    cancelToggle,
    confirmToggle,
    visible,
    hiddenCount,
    isLoading,
    isCreatePending,
    isTogglePending,
    handleCreate,
  } = useCancellationPolicies();

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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Cancellation Policies
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage refund tiers for bookings
            </p>
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
              onClick={openCreateModal}
            >
              <Plus className="w-4 h-4" />
              New Policy
            </motion.button>
          </div>
        </motion.div>

        <motion.div layout className="flex items-center gap-2 mb-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Showing
          </span>
          <Badge className="bg-violet-50 text-violet-700 border border-violet-200 text-xs px-2 py-0.5">
            {visible.length} {visible.length === 1 ? "policy" : "policies"}
          </Badge>
          {!showDisabled && hiddenCount > 0 && (
            <span className="text-xs text-slate-400">
              ({hiddenCount} hidden)
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
                onToggleActive={requestToggle}
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
                <p className="font-semibold text-slate-700 mb-1">
                  No active policies
                </p>
                <p className="text-sm text-slate-400">
                  Toggle "Show disabled" to see all policies.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <CreatePolicyModal
        isOpen={openCreate || isCreatePending}
        onClose={closeCreateModal}
        isLoading={isCreatePending}
        onSubmit={(values) => {
          handleCreate(values);
          closeCreateModal();
        }}
      />

      {active && (
        <ConfirmToggleModal
          isOpen
          action={active.isActive ? "enable" : "disable"}
          policyName={active.name}
          onConfirm={confirmToggle}
          onCancel={cancelToggle}
          isLoading={isTogglePending}
        />
      )}
    </div>
  );
}
