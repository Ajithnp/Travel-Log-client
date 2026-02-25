import type { ImageStatus, IPackageImage } from "@/types/types";
import type { BasePackageSchema } from "../base-package-schema";
import type { BasePackageDraftSchema } from "../draft-base-package-schema";

export function buildBasePackageDefaults(
  mode: "create" | "edit",
  data?: BasePackageDraftSchema | null,
): BasePackageSchema {
  if (mode === "edit" && !data) {
    throw new Error("Edit mode requires initial data");
  }

  const transformedImages =
    data?.images?.map((img: IPackageImage) => ({
      url: img.url,
      key: img.key,
      file: undefined,
      status: (img.key ? "UPLOADED" : "PENDING_UPLOAD") as ImageStatus,
    })) || [];

  return {
    title: data?.title ?? "",
    location: data?.location ?? "",
    pickupLocation: data?.pickupLocation ?? "",
    usp: data?.usp ?? "",
    description: data?.description ?? "",
    category: data?.category ?? undefined,
    difficultyLevel: data?.difficultyLevel ?? undefined,
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
                type: activity.type ?? undefined,
                description: activity.description ?? "",
                startTime: activity.startTime ?? "",
                endTime: activity.endTime ?? "",
                included: activity.included ?? false,
              }))
            : [
                {
                  title: "",
                  location: "",
                  type: undefined,
                  description: "",
                  startTime: "",
                  endTime: "",
                  included: false,
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
                type: undefined,
                description: "",
                startTime: "",
                endTime: "",
                included: false,
              },
            ],
          },
        ],

    inclusions: data?.inclusions ?? [],
    exclusions: data?.exclusions ?? [],
    packingList: data?.packingList ?? [],
    // cancellationPolicy: data?.cancellationPolicy ?? "",
    cancellationPolicy: data?.cancellationPolicy ?? undefined,
    isActive: data?.isActive ?? true,
  };
}
