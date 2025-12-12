 import equal from "fast-deep-equal";
import type { IUser } from "@/types/IUser";
import type { IVendorInfo } from "@/types/IVendorInfo";

export function getChangedFields(
  initial: Partial<IVendorInfo>,
  current: Partial<IVendorInfo>
): Partial<IUser> {
  const changed: Partial<IUser> = {};

  (Object.keys(current) as (keyof IVendorInfo)[]).forEach((key) => {
    if (!equal(current[key], initial[key])) {
      (changed as Record<keyof IVendorInfo, unknown>)[key] = current[key];
    }
  });

  return changed;
}

