export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data: T;
  error?: {
    code: string;
    message?: string;
    details?: string;
  };
}


export interface PaginatedData<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}