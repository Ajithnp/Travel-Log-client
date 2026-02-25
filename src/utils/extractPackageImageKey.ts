import type { Package } from "@/features/vendor/package/base-package/components/package-list";

export const extractPackageImageKeys = (packages: Package[]) =>
  packages
    .map(pkg => pkg.imageUrl)
    .filter((key): key is string => Boolean(key));
