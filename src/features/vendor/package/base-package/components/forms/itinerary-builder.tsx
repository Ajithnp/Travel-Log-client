import { useFormContext, useFieldArray } from "react-hook-form"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DayCard } from "./day-card"
import { basePackageSchema } from "../../validations/base-package-schema"
import type { z } from "zod";

type FormInput = z.input<typeof basePackageSchema>;

export function ItineraryBuilder() {
  const { control } = useFormContext<FormInput>();

  const {
    fields: dayFields,
    append: appendDay,
    remove: removeDay,
  } = useFieldArray({
    control,
    name: "itinerary",
  })

  const handleAddDay = () => {
    appendDay({
      title: "",
      dayNumber: dayFields.length + 1,
      activities: [
        {
          title: "",
          location: "",
          specials: [""],
          description: "",
          endTime: "",
          startTime: "",
          included: false,
        }
      ]
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Itinerary
            <span className="text-destructive ml-1">*</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Plan your package day by day</p>
        </div>

        <Button type="button" onClick={handleAddDay} className="gap-1">
          <Plus className="w-4 h-4" />
          Add Day
        </Button>
      </div>

      {dayFields.map((day, dayIndex) => (
        <DayCard
          key={day.id}
          dayIndex={dayIndex}
          onRemove={() => removeDay(dayIndex)}
        />
      ))}
    </div>
  )
}
