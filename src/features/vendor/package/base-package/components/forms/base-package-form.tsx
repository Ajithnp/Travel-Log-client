import {
  useForm,
  Controller,
  FormProvider,
  type FieldPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  basePackageSchema,
  CATEGORY_ENUM,
  DIFFICULTY_ENUM,
  type BasePackageSchema,
} from "../../validations/base-package-schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadSection } from "./image-upload-selection";
import { ItineraryBuilder } from "./itinerary-builder";
import { InclusionsExclusions } from "./inclusions-exclusions";
import { Input } from "@/components/ui/input";
import { buildBasePackageDefaults } from "../../validations/default/base-package.defaults";
import z from "zod";
import { createPackageSchema } from "../../validations/create-base-package.schema";
import {
  draftPackageSchema,
  type BasePackageDraftSchema,
} from "../../validations/draft-base-package-schema";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import { CancellationPolicyBlock } from "./cancellation-policies";
import { AppAlert } from "@/components/common/app-alert";
import { SpinnerLoading } from "@/components/common/spinner";

type FormInput = z.input<typeof basePackageSchema>;
type InitialDataType = z.input<typeof draftPackageSchema>;

interface BasePackageFormProps {
  mode: "create" | "edit";
  onPublish: (data: BasePackageSchema) => Promise<void> | void;
  onDraft: (data: BasePackageDraftSchema) => Promise<void> | void;
  isLoading?: boolean;
  initialData?: InitialDataType | null;
}

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1 },
  }),
};

export function BasePackageForm({
  onPublish,
  onDraft,
  isLoading,
  mode,
  initialData,
}: BasePackageFormProps) {

  const defaultValues = useMemo(() => {
    return buildBasePackageDefaults(mode, initialData);
  }, [mode, initialData]);

  const form = useForm<FormInput>({
    resolver: zodResolver(basePackageSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    getValues,
    reset,
    formState: { isDirty, isValid },
  } = form;

  useEffect(() => {
    if (initialData) {
      form.reset(defaultValues);
    }
  }, [initialData, defaultValues, reset]);

  


  const days = Number(form.watch("days"));
  const itinerary = form.watch("itinerary");

  const showDaysWarning =
    Array.isArray(itinerary) &&
    itinerary.length > 0 &&
    days !== itinerary.length;

  const submitHandler = (data: FormInput) => {
    const validation = createPackageSchema.safeParse(data);
    if (!validation.success) {
      validation.error.issues.forEach((err) => {
        const fieldPath = err.path.join(".") as FieldPath<FormInput>;

        form.setError(fieldPath, { message: err.message });
      });
      return;
    }
    onPublish(data);
  };

  const handleSaveDraft = () => {
    if (!isDirty) {
      toast.info("No changes to save");

      return;
    }

    const data = getValues();
    const result = draftPackageSchema.safeParse(data);

    if (!result.success) {
      console.error("Broken draft shape", result.error);
      return;
    }
    onDraft(data);
  };

  if (isLoading) return <SpinnerLoading title="Loading package details..." />;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(submitHandler, (errors) => {
          console.log("Submit Blocked", errors);
        })}
        className="max-w-7xl mx-auto"
      >
        {/* Page Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div
            variants={SECTION_VARIANTS}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4"
          >
            {/* Left side */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground m-0">
                Create Base Package
              </h1>
              <p className="text-muted-foreground">
                Build a new travel package by filling in the details below
              </p>
            </div>

            {/* Right side */}
            <Button
              variant={"outline"}
              type="button"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-input bg-background hover:bg-muted transition"
            >
              ← Back
            </Button>
          </motion.div>

          {/* Section 1: Basic Package Info */}
          <motion.section
            variants={SECTION_VARIANTS}
            initial="hidden"
            animate="visible"
            custom={1}
            className="bg-card border-[2px] border-border rounded-lg p-6 space-y-5 shadow-md"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Basic Package Info
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Provide essential details about your package
              </p>
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g. Bali Tropical Paradise"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Nepal, Himalayas"
                      {...field}
                      className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {CATEGORY_ENUM.map((category) => (
                              <SelectItem key={category} value={category} className="cursor-pointer hover:bg-primary/20 focus:bg-primary/20">
                                {category.charAt(0).toUpperCase() +
                                  category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Difficulty Level */}
              <FormField
                control={form.control}
                name="difficultyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select difficulty level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Difficulty</SelectLabel>
                            {DIFFICULTY_ENUM.map((difficulty) => (
                              <SelectItem key={difficulty} value={difficulty} className="cursor-pointer hover:bg-primary/20 focus:bg-primary/20">
                                {difficulty.charAt(0).toUpperCase() +
                                  difficulty.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pick-up location */}
              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting point / Pickup Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g.Shimla ISBT Bus Stand, Gate 2 — 05:00 AM sharp"
                        {...field}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* USP */}
              <FormField
                control={form.control}
                name="usp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What Makes It Special (USP)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., India's last snow leopard habitat — a rare winter crossing"
                        {...field}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your package in detail..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.section>

          {/* Section 2: Duration & Pricing */}
          <motion.section
            variants={SECTION_VARIANTS}
            initial="hidden"
            animate="visible"
            custom={2}
            className="bg-card border-[2px] border-border rounded-lg p-6 space-y-5 shadow-md"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Duration & Pricing
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Set the duration and price for your package
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Days */}
              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        // onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nights */}
              <FormField
                control={form.control}
                name="nights"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nights</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        // onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Base Price */}
              <FormField
                control={form.control}
                name="basePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        // onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors?.days && showDaysWarning && (
              <AppAlert
                message="Days should match the number of itinerary days"
                variant="warning" />
            )}
          </motion.section>

          {/* Section 3: Image Upload */}
          <motion.section
            variants={SECTION_VARIANTS}
            initial="hidden"
            animate="visible"
            custom={3}
            className="bg-card border-[2px] border-border rounded-lg p-6 space-y-5 shadow-md"
          >
            <Controller
              name="images"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <ImageUploadSection
                  images={value ?? []}
                  onImagesChange={onChange}
                />
              )}
            />
          </motion.section>

          {/* Section 4: Itinerary Builder */}
          <motion.section
            variants={SECTION_VARIANTS}
            initial="hidden"
            animate="visible"
            custom={4}
            className="bg-card border-[2px] border-border rounded-lg p-6 space-y-5 shadow-md"
          >
            <ItineraryBuilder />
          </motion.section>

          {/* Section 5: Inclusions & Exclusions */}
          <motion.section
            variants={SECTION_VARIANTS}
            initial="hidden"
            animate="visible"
            custom={5}
            className="bg-card border-[2px] border-border rounded-lg p-6 space-y-6 shadow-md"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Inclusions, Exclusions & Packing List
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Help customers understand what comes with this package and bring
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <InclusionsExclusions type="inclusions" label="Inclusions" />
              <InclusionsExclusions type="exclusions" label="Exclusions" />
              <InclusionsExclusions type="packingList" label="Things to Carry" />
            </div>
            <AppAlert message="Please ensure all inclusions, exclusions, and packing list items are filled in before publishing your package." />
          </motion.section>

          {/* Cancellatrion policy */}
          <CancellationPolicyBlock animationDelay={2} />

          {/* Submit Button */}
          <motion.div
            variants={SECTION_VARIANTS}
            initial="hidden"
            animate="visible"
            custom={6}
            className="flex gap-3 justify-end sticky bottom-0 bg-background py-4 border-t  border-border -mx-6 px-6"
          >
            <Button type="button" variant="outline" disabled={isLoading}>
              Cancel
            </Button>

            <Button
              type="button"
              variant={"outline"}
              onClick={handleSaveDraft}
              className="gap-2 transition-all"
              disabled={!isDirty}
            >
              Save Draft
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isLoading}
              // className={cn(
              //   "gap-2 transition-all",
              //   (!isValid || isLoading) && "opacity-50 cursor-not-allowed",
              // )}
               className="gap-2 transition-all"
              title={"Publish your package"}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Publishing Package..." : "Publish Package"}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </FormProvider>
  );
}
