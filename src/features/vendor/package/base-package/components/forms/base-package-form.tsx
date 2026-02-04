import { useForm, Controller, FormProvider, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadSection } from "./image-upload-selection";
import { ItineraryBuilder } from "./itinerary-builder";
import { InclusionsExclusions } from "./inclusions-exclusions";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { buildBasePackageDefaults } from "../../validations/default/base-package.defaults";
import z from "zod";
import { createPackageSchema } from "../../validations/create-base-package.schema";
import { draftPackageSchema, type BasePackageDraftSchema } from "../../validations/draft-base-package-schema";
import { toast } from "sonner";
import { Loading } from "@/components/ui/loading";

type FormInput = z.input<typeof basePackageSchema>;

interface BasePackageFormProps {
  mode: "create" | "edit"
  onPublish: (data: BasePackageSchema) => Promise<void> | void;
  onDraft: (data: BasePackageDraftSchema) => Promise<void> | void;
  isLoading?: boolean;
  initialData?: FormInput | null;

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

  const form = useForm<FormInput>({
    resolver: zodResolver(basePackageSchema),
    defaultValues: buildBasePackageDefaults(mode, initialData),
    mode: "onChange"
  });

  const days = Number(form.watch("days"));
  const itinerary = form.watch("itinerary");

  const showDaysWarning =
    Array.isArray(itinerary) &&
    itinerary.length > 0 &&
    days !== itinerary.length;
  
  const { isValid } = form.formState;

  const submitHandler = (data: FormInput) => {
    const validation = createPackageSchema.safeParse(data);
    if (!validation.success) {
      validation.error.issues.forEach(err => {
        const fieldPath = err.path.join(".") as FieldPath<FormInput>;

        form.setError(
          fieldPath,
          { message: err.message }
        );
      });
      return;
    }
    onPublish(data)
   
  };

  const handleSaveDraft = () => {

    if (!form.formState.isDirty) {
      toast.info("No changes to save");
      return;
    }

    const data = form.getValues();
    const result = draftPackageSchema.safeParse(data);

    if (!result.success) {
      console.error("Broken draft shape", result.error);
      return;
    }
    onDraft(data,)
  }

  if(isLoading) return <Loading variant="spinner" text="Loading.."/>

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler, (errors) => {
          console.log('Submit Blocked', errors)
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
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-foreground text-center">
              Create Base Package
            </h1>
            <p className="text-muted-foreground text-center">
              Build a new travel package by filling in the details below
            </p>
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
                    <Input placeholder="E.g. Bali Tropical Paradise" {...field} />
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
                    <Input placeholder="e.g., Nepal, Himalayas" {...field} className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
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
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {CATEGORY_ENUM.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
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
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Difficulty</SelectLabel>
                            {DIFFICULTY_ENUM.map((difficulty) => (
                              <SelectItem key={difficulty} value={difficulty}>
                                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
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

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your package in detail..." {...field} rows={4} />
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
            {form.formState.errors?.days &&
              showDaysWarning && (
                <Alert className="border-1 border-orange-300 bg-orange-50 flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    <InfoIcon className="w-5 h-5 text-orange-500" />
                  </div>
                  <AlertDescription className="text-orange-500 font-small">
                    Days should match the number of itinerary days
                  </AlertDescription>
                </Alert>
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
                What's Included & Excluded
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Help customers understand what comes with this package
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InclusionsExclusions type="inclusions" label="Inclusions" />
              <InclusionsExclusions type="exclusions" label="Exclusions" />
            </div>
            <Alert className="border-1 border-blue-300 bg-blue-50 flex items-center gap-3">
              <div className="flex items-center justify-center">
                <InfoIcon className="w-5 h-5 text-blue-500" />
              </div>
              <AlertDescription className="text-blue-500 font-small">
                Do you have inclusions or exclusions don't forget to add!
              </AlertDescription>
            </Alert>
          </motion.section>

          {/* Error Message */}
          {/* {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm"
            >
              {submitError}
            </motion.div>
          )} */}

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

            <Button type="button" variant={"outline"} onClick={handleSaveDraft} className="gap-2 transition-all">Save Draft</Button>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "gap-2 transition-all",
                (!isValid || isLoading) && "opacity-50 cursor-not-allowed"
              )}
              title={"Create your package"}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Creating Package..." : "Create Package"}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </FormProvider>
  );
}
