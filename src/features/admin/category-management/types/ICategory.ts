import type { CategoryStatus } from "@/lib/constants/constants";

export interface ICategory {
    id:string
    name: string;
    logo?:string
    description?: string;
    status: CategoryStatus
};

