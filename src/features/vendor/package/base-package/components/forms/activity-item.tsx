import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { basePackageSchema } from "../../validations/base-package-schema";
import { useFormContext } from "react-hook-form";

type FormInput = z.input<typeof basePackageSchema>;

interface ActivityItemProps {
  dayIndex: number;
  activityIndex: number;
  onRemove: () => void;
}

export function ActivityItem({
  dayIndex,
  activityIndex,
  onRemove,
}: ActivityItemProps) {
  const { control, watch, setValue } = useFormContext<FormInput>();

  const specials =
    watch(`itinerary.${dayIndex}.activities.${activityIndex}.specials`) ?? [];
  const appendSpecial = () => {
    const cleaned = specials.filter((s) => s.trim() !== "");
    setValue(`itinerary.${dayIndex}.activities.${activityIndex}.specials`, [
      ...cleaned,
      "",
    ]);
  };
  const removeSpecial = (i: number) =>
    setValue(
      `itinerary.${dayIndex}.activities.${activityIndex}.specials`,
      specials.filter((_, idx) => idx !== i),
    );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-muted/40 p-4 rounded-lg space-y-3 border border-border"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="inline-block text-sm font-medium text-foreground bg-primary/10 px-2 py-0.5 rounded">
          Activity {activityIndex + 1}
        </h4>
        <Button
          type="button"
          onClick={onRemove}
          className="p-1 hover:bg-destructive/10 rounded transition-colors"
          title={"Remove Activity"}
          size={"icon"}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>

      {/* Time Range */}
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name={`itinerary.${dayIndex}.activities.${activityIndex}.startTime`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-s">Start Time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  className="h-8 text-xs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`itinerary.${dayIndex}.activities.${activityIndex}.endTime`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-s">End Time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  className="h-8 text-xs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`itinerary.${dayIndex}.activities.${activityIndex}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-s">Activity Tittle</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Location */}
        <FormField
          control={control}
          name={`itinerary.${dayIndex}.activities.${activityIndex}.location`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-s">Location</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Type and Included */}
      <div className="grid grid-cols-2 gap-3">
        <FormItem>
          <div className="flex items-center justify-between mb-1">
            <label className="text-s text-sm font-medium leading-none">
              Specials
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-6 px-2 text-xs gap-1 bg-orange-100 hover:bg-black hover:text-white"
              onClick={appendSpecial}
            >
              <Plus className="w-3 h-3" />
              Add
            </Button>
          </div>

          <div className="space-y-2">
            <AnimatePresence>
              {specials.length === 0 && (
                <p className="text-xs text-muted-foreground italic">
                  No specials added yet.
                </p>
              )}
              {specials.map((_, specialIndex) => (
                <motion.div
                  key={specialIndex}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2"
                >
                  <FormField
                    control={control}
                    name={`itinerary.${dayIndex}.activities.${activityIndex}.specials.${specialIndex}`}
                    render={({ field }) => (
                      <FormItem className="flex-1 mb-0">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Special ${specialIndex + 1}`}
                            className="h-8 text-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0 hover:bg-destructive/10"
                    onClick={() => removeSpecial(specialIndex)}
                  >
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </FormItem>
        <div className="flex items-end">
          <FormField
            control={control}
            name={`itinerary.${dayIndex}.activities.${activityIndex}.included`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-s">Included</FormLabel>
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Description (Optional) */}
      <FormField
        control={control}
        name={`itinerary.${dayIndex}.activities.${activityIndex}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-s">Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Additional details" {...field} rows={2} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}
