import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Compass,
  Send,
  Sparkles,
  Palmtree,
  Mountain,
  Globe2,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  type RequestCategoryForm,
  requestCategorySchema,
} from "../validations";

interface CategoryRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RequestCategoryForm) => void;
  isSubmitting: boolean;
}

export function CategoryRequestModal({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: CategoryRequestModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestCategoryForm>({
    resolver: zodResolver(requestCategorySchema),
  });
  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const submitForm = (data: RequestCategoryForm) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none bg-white focus:outline-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-white dark:bg-zinc-950 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/20 dark:border-zinc-800/50 overflow-hidden"
        >
          <div className="relative p-8 md:p-10">
            <header className="mb-8 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex -space-x-2">
                  <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-sm text-blue-500">
                    <Palmtree className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-sm text-emerald-500">
                    <Mountain className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-sm text-amber-500">
                    <Globe2 className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4 fill-current" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]"></span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Request New Category
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[280px]">
                  Share your new travel category idea. Our team will review it
                  and get back to you soon..
                </p>
              </div>
            </header>

            <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
              <div className="space-y-5">
                {/* Category Name Input */}
                <div className="space-y-2.5">
                  <Label
                    htmlFor="categoryName"
                    className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1"
                  >
                    Category Concept
                  </Label>
                  <div className="relative group">
                    <Compass className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      {...register("name")}
                      placeholder="e.g. Desert Glamping"
                      className="h-14 pl-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-base font-medium shadow-premium"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-[12px] text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Note/Description Area */}
                <div className="space-y-2.5">
                  <Label
                    htmlFor="note"
                    className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1"
                  >
                    Your Note
                  </Label>
                  <Textarea
                    {...register("vendorNote")}
                    placeholder="Why should we add this? Who is it for?"
                    className="min-h-[120px] bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-base py-4 px-5 resize-none shadow-premium"
                    disabled={isSubmitting}
                  />
                  {errors.vendorNote && (
                    <p className="text-[12px] text-destructive">
                      {errors.vendorNote.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full h-14 rounded-2xl font-bold text-base transition-all duration-300 group",
                    "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 active:translate-y-0",
                    "disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none",
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Submit Proposal</span>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  )}
                </Button>
                <p className="text-center mt-4 text-[10px] text-zinc-400 font-medium uppercase tracking-[0.15em]">
                  Expected response within 24-48 hours
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
