import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { LayoutGrid, Sparkles, ArrowRight } from "lucide-react";
import userLogin from "@/assets/package-thumb1.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryForm } from "../validations";
import { useEffect } from "react";

export function CreateCategoryModal({
  onCreation,
  open,
  onOpenChange,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreation: (data: CategoryForm) => void;
  isLoading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const onSubmit = (data: CategoryForm) => {
    onCreation(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
    w-full
    max-w-[95vw]
    h-auto
    sm:max-w-[90vw]
    lg:max-w-[700px]
    lg:h-[min(700px,90vh)]
    p-0
    gap-0
    border-none
    shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)]
    rounded-3xl
    overflow-hidden"
      >
        <div className="flex h-full w-full overflow-hidden">
          {/* Left Side: Illustration & Brand */}
          <div className="hidden md:flex w-[40%] bg-zinc-900 relative flex-col justify-between p-10 overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full animate-pulse" />

            <div className="relative z-10 flex items-center gap-2 text-white/90">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <LayoutGrid className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-lg">Traveo</span>
            </div>

            <div className="relative z-10 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img
                  src={userLogin}
                  alt="Category Illustration"
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-110"
                />
              </motion.div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  Organize your <span className="text-muted">destinations</span>{" "}
                  effortlessly.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Categories help travelers find exactly what they're looking
                  for. Make yours stand out.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 flex items-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-widest">
              <span></span>
              <div className="h-px flex-grow bg-zinc-800" />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 bg-white dark:bg-zinc-950 p-8 md:p-12 flex flex-col relative overflow-y-auto">
            <div className="mb-10">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Sparkles className="h-4 w-4 fill-current" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  New Category
                </span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                Create Category
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Define a new collection for your travel packages.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-grow flex flex-col space-y-8"
            >
              <div className="space-y-6">
                <div className="space-y-2 group">
                  <Label
                    htmlFor="name"
                    className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-focus-within:text-primary transition-colors"
                  >
                    Category Name
                  </Label>
                  <Input
                    {...register("name")}
                    placeholder="e.g. Winter Expeditions"
                    className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-base shadow-premium"
                    data-testid="input-category-name"
                  />
                  {errors.name && (
                    <p className="text-[12px] text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                  <p className="text-[13px] text-zinc-400 font-medium">
                    Clear and concise names work best for navigation.
                  </p>
                </div>

                <div className="space-y-2 group">
                  <Label
                    htmlFor="description"
                    className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-focus-within:text-primary transition-colors"
                  >
                    Description
                  </Label>
                  <Textarea
                    {...register("description")}
                    placeholder="Describe what kind of experiences fall into this category..."
                    className="min-h-[160px] bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-base resize-none py-4 shadow-premium"
                    data-testid="textarea-category-description"
                  />
                  {errors.description && (
                    <p className="text-[12px] text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="h-12 rounded-xl text-zinc-500 hover:text-zinc-900 font-bold shadow-premium"
                  disabled={isLoading}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  className="h-12 flex-1 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group shadow-premium"
                  data-testid="button-submit-category"
                  disabled={isLoading}
                >
                  {isLoading ? "CreateTracing..." : "Create Category"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
