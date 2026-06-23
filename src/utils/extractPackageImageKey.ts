import type { IPackage } from "@/features/vendor/package/base-package/type/package";

export const extractPackageImageKeys = (packages: IPackage[]) =>
  packages
    .flatMap(pkg => pkg.imageUrl || [])
    .map(img => img.key)
    .filter((key): key is string => Boolean(key));
