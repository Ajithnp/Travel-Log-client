import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { basePackageSchema } from "../../validations/base-package-schema";
import { useFormContext } from "react-hook-form";
import { ACTIVITY_TYPE_ENUM } from "../../validations/base-package-schema";

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
  const { control } = useFormContext<FormInput>();

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
        <FormField
          control={control}
          name={`itinerary.${dayIndex}.activities.${activityIndex}.type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Activity Type</SelectLabel>
                      {ACTIVITY_TYPE_ENUM.map((activity) => (
                        <SelectItem key={activity} value={activity} className="cursor-pointer hover:bg-primary/20 focus:bg-primary/20">
                          {activity.charAt(0).toUpperCase() + activity.slice(1)}
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
