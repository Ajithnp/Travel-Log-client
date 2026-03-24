import { policies } from "@/lib/constants/cancellation-policies";

export const policyMap = Object.fromEntries(
  policies.map((p) => [p.value, p])
) as Record<(typeof policies)[number]["value"], (typeof policies)[number]>;