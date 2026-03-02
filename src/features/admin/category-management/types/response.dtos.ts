import type { PaginatedData } from "@/types/IApiResponse";
import type { ICategory } from "./ICategory";
import type { CategoryStatus } from "@/lib/constants/constants";

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
  pendingApproval: number;
}

export interface PaginatedCategoryResponse extends PaginatedData<ICategory> {
  stats: CategoryStats[];
}

export interface CategoryRequestResponse {
  id: string;
  name: string;
  requested: {
    name: string;
    email: string;
  } | null;
  vendorNote: string | null;
  date: string;
  status: CategoryStatus;
}

export interface CategoryRequestReviewedResponse {
  id: string;
  name: string;
  requested: {
    name: string;
    email: string;
  } | null;
  adminNote: string | null;
  updatedDate: string;
  status: CategoryStatus;
}


