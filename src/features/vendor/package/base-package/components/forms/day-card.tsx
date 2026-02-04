import { useFormContext, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActivityItem } from "./activity-item";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DayErrorSummary } from "./day-section-error";
import { z } from "zod";
import type { basePackageSchema } from "../../validations/base-package-schema";

type FormInput = z.input<typeof basePackageSchema>;

interface DayCardProps {
  dayIndex: number;
  onRemove: () => void;
}

export function DayCard({ dayIndex, onRemove }: DayCardProps) {
  const { control, unregister } = useFormContext<FormInput>();
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    fields: activityFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `itinerary.${dayIndex}.activities`,
    // shouldUnregister: true,
  });

  const handleAddActivity = () => {
    append({
      startTime: "",
      endTime: "",
      title: "",
      description: "",
      location: "",
      type: "tour",
      included: true,
    });
  };
  const handleRemoveActivity = (index: number) => {
    unregister(`itinerary.${dayIndex}.activities.${index}`);
    remove(index);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <motion.button
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        type="button"
        className="w-full bg-card hover:bg-muted/50 transition-colors px-4 py-3 flex items-center justify-between"
      >
        <div className="text-left flex-1">
          <h3 className="font-semibold text-foreground">Day {dayIndex + 1}</h3>
          <p className="text-xs text-muted-foreground">
            {activityFields.length} activities
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>
      </motion.button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-4 space-y-4 bg-muted/20">
              {/* Section Errors */}
              <DayErrorSummary dayIndex={dayIndex} />

              {/* Day Title */}
              <FormField
                control={control}
                name={`itinerary.${dayIndex}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Day Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-8 text-xs"
                        placeholder="e.g., Mountain Adventure"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Activities */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-foreground">
                    Activities
                  </h4>
                  <Button
                    type="button"
                    onClick={handleAddActivity}
                    size="sm"
                    variant="outline"
                    className="gap-1 bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                    Add Activity
                  </Button>
                </div>

                {/* <AnimatePresence mode="popLayout"> */}
                {activityFields.map((field, activityIndex) => (
                  <ActivityItem
                    key={field.id}
                    dayIndex={dayIndex}
                    activityIndex={activityIndex}
                    onRemove={() => handleRemoveActivity(activityIndex)}
                  />
                ))}
                {/* </AnimatePresence> */}
              </div>

              {/* Remove Day Button */}
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="sm"
                className="w-full gap-1"
              >
                <X className="w-4 h-4" />
                Remove Day
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
