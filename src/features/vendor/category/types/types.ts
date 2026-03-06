import type { CategoryStatus } from "@/lib/constants/constants";

export interface VendorRequestedCategoryResponse {
  id: string;
  name: string;
  adminNote: string | null;
  note: string | null;
  createdAt: string;
  status: CategoryStatus;
}

export interface RequestCategoryPayload { 
    name: string;
    vendorNote: string;
}

export interface AvtiveCategoriesResponse { 
  id: string;  
  name: string;
}