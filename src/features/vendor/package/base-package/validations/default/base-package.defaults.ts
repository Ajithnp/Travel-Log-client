import type { ImageStatus, IPackageImage } from "@/types/types";
import type { BasePackageSchema } from "../base-package-schema";

export function buildBasePackageDefaults(
  mode: "create" | "edit",
  data?: Partial<BasePackageSchema> | null,
): BasePackageSchema {
  if (mode === "edit" && !data) {
    throw new Error("Edit mode requires initial data");
  }

  const transformedImages =
    data?.images?.map((img: IPackageImage) => ({
      url: img.url,
      key: img.key,
      file: undefined, // Existing images don't have a File object
      status: (img.key ? "UPLOADED" : "PENDING_UPLOAD") as ImageStatus,
    })) || [];

  return {
    title: data?.title ?? "",
    location: data?.location ?? "",
    description: data?.description ?? "",
    category: data?.category ?? "adventure",
    difficultyLevel: data?.difficultyLevel ?? "easy",
    days: data?.days ?? "",
    nights: data?.nights ?? "",
    basePrice: data?.basePrice ?? "",

    images: transformedImages,

    itinerary: data?.itinerary?.length
      ? data.itinerary.map((day, dayIndex) => ({
          title: day.title ?? "",
          dayNumber: dayIndex + 1,

          activities: day.activities?.length
            ? day.activities.map((activity) => ({
                title: activity.title ?? "",
                location: activity.location ?? "",
                type: activity.type ?? "tour",
                description: activity.description ?? "",
                startTime: activity.startTime ?? "",
                endTime: activity.endTime ?? "",
                included: activity.included ?? true,
              }))
            : [
                {
                  title: "",
                  location: "",
                  type: "tour",
                  description: "",
                  startTime: "",
                  endTime: "",
                  included: true,
                },
              ],
        }))
      : [
          {
            title: "",
            dayNumber: 1,
            activities: [
              {
                title: "",
                location: "",
                type: "tour",
                description: "",
                startTime: "",
                endTime: "",
                included: true,
              },
            ],
          },
        ],

    inclusions: data?.inclusions ?? [],
    exclusions: data?.exclusions ?? [],
    isActive: data?.isActive ?? true,
  };
}
