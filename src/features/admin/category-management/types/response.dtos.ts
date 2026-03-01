import type { PaginatedData } from "@/types/IApiResponse";
import type { ICategory } from "./ICategory";

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
  pendingApproval: number;
}

export interface PaginatedCategoryResponse extends PaginatedData<ICategory> {
  stats: CategoryStats[];
}