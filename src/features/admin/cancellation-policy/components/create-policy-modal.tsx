import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  X,
  ShieldCheck,
  ArrowRight,
  Loader2,
  GripVertical,
  Info,
  AlertCircle,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  policyBackdropVariants,
  policyModalVariants,
  policyRuleRowVariants,
} from "@/animation/variants";
import { policySchema, defaultValues } from "../validation";

export type PolicyFormValues = z.infer<typeof policySchema>;

interface CreatePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: PolicyFormValues) => void;
  isLoading?: boolean;
}

export function CreatePolicyModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CreatePolicyModalProps) {
  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues,
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rules",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, form]);

  // Auto-generate key from label
  const handleLabelChange = (val: string) => {
    const autoKey = val
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    form.setValue("key", autoKey, {
      shouldValidate: form.formState.touchedFields.key,
    });
  };

  const handleClose = () => {
    form.reset(defaultValues);
    onClose();
  };

  const handleSubmit = (values: PolicyFormValues) => {
    onSubmit?.(values);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          variants={policyBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{
            background: "rgba(15,15,25,0.52)",
            backdropFilter: "blur(6px)",
          }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            key="modal"
            variants={policyModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_32px_80px_-8px_rgba(0,0,0,0.24)] overflow-hidden my-4"
          >
            {/* Gradient top stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />

            {/* Header */}
            <div className="px-7 pt-6 pb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                    New Cancellation Policy
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Define refund rules for bookings
                  </p>
                </div>
              </div>
              <Button
                onClick={handleClose}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
              </Button>
            </div>

            <Separator />

            {/* Scrollable body */}
            <div className="px-7 py-5 overflow-y-auto max-h-[70vh]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  id="policy-form"
                  className="space-y-5"
                >
                  {/* Label */}
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Label
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Flexible"
                            className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleLabelChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs flex items-center gap-1">
                          {form.formState.errors.label && (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {form.formState.errors.label?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  {/* Key */}
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Key{" "}
                          <span className="text-slate-400 font-normal normal-case">
                            (unique identifier)
                          </span>
                        </FormLabel>
                        <FormDescription className="text-[11px] text-slate-400 -mt-1">
                          Lowercase, no spaces. Used in code.
                        </FormDescription>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g. flexible"
                              className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm font-mono pr-8"
                              {...field}
                            />
                            <code className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-300">
                              _key
                            </code>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs flex items-center gap-1">
                          {form.formState.errors.key && (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {form.formState.errors.key?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Description{" "}
                          <span className="text-slate-400 font-normal normal-case">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe this policy..."
                            rows={3}
                            className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* Refund rules */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Refund Rules
                        </p>
                        {form.formState.errors.rules?.root?.message && (
                          <p className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {form.formState.errors.rules.root.message}
                          </p>
                        )}
                        {form.formState.errors.rules?.message && (
                          <p className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {form.formState.errors.rules.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        onClick={() =>
                          append({ daysBeforeTrip: 0, refundPercent: 0 })
                        }
                        className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-xl transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add rule
                      </Button>
                    </div>

                    {/* Table header */}
                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                      <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 px-4 py-2.5 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Days Before Trip ≥</span>
                        <span>Refund %</span>
                        <span className="w-5" />
                        <span className="w-6" />
                      </div>

                      <div className="divide-y divide-slate-100">
                        <AnimatePresence initial={false}>
                          {fields.map((fieldItem, index) => (
                            <motion.div
                              key={fieldItem.id}
                              variants={policyRuleRowVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 px-4 py-3 items-start"
                            >
                              {/* Days */}
                              <FormField
                                control={form.control}
                                name={`rules.${index}.daysBeforeTrip`}
                                render={({ field }) => (
                                  <FormItem className="space-y-1">
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min={0}
                                        placeholder="0"
                                        className="rounded-xl border-slate-200 bg-slate-50 text-sm h-9 text-center font-mono"
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(e.target.valueAsNumber)
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage className="text-[10px] text-red-500" />
                                  </FormItem>
                                )}
                              />

                              {/* Refund % */}
                              <FormField
                                control={form.control}
                                name={`rules.${index}.refundPercent`}
                                render={({ field }) => (
                                  <FormItem className="space-y-1">
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          type="number"
                                          min={0}
                                          max={100}
                                          placeholder="0"
                                          className="rounded-xl border-slate-200 bg-slate-50 text-sm h-9 pr-7 text-center font-mono"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              e.target.valueAsNumber,
                                            )
                                          }
                                        />
                                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                                          %
                                        </span>
                                      </div>
                                    </FormControl>
                                    <FormMessage className="text-[10px] text-red-500" />
                                  </FormItem>
                                )}
                              />

                              {/* Drag handle (decorative) */}
                              <div className="w-5 h-9 flex items-center justify-center text-slate-200">
                                <GripVertical className="w-3.5 h-3.5" />
                              </div>

                              {/* Remove */}
                              <Button
                                type="button"
                                variant={"outline"}
                                onClick={() =>
                                  fields.length > 1 && remove(index)
                                }
                                disabled={fields.length === 1}
                                className="w-6 h-9 flex items-center justify-center text-slate-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Hint */}
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Info className="w-3 h-3 flex-shrink-0" />
                      Rules matched by highest days first. Add a{" "}
                      <Badge className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] px-1.5 py-0 font-mono">
                        0‑day
                      </Badge>{" "}
                      rule as the final fallback.
                    </p>
                  </div>
                </form>
              </Form>
            </div>

            <Separator />

            {/* Footer */}
            <div className="px-7 py-4 flex items-center justify-between gap-3 bg-slate-50/60">
              <p className="text-[11px] text-slate-400">
                {fields.length} rule{fields.length !== 1 ? "s" : ""} defined
              </p>
              <div className="flex items-center gap-2.5">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant={"outline"}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="policy-form"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold shadow-md hover:opacity-90 disabled:opacity-70 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    <>
                      Create Policy
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
