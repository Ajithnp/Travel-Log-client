import type { Paginated} from "@/types/IApiResponse"

export type ScheduleFormValues = {
  startDate:         string
  endDate:           string
  reportingTime:     string
  reportingLocation: string
  pricing: {
    solo:  number
    duo:   number
    group: number
  }
  totalSeats: number
  notes?:     string
}

export interface PricingTierDTO {
  type: 'SOLO' | 'DUO' | 'GROUP';
  peopleCount: number;
  price: number;
}

export interface ScheduleListItemResponse {
  scheduleId: string;
  packageId: string;
  packageTitle: string;
  packageDays: string;
  difficultyLevel: string;
  startDate: string;
  endDate: string;
  reportingTime: string;
  reportingLocation: string;
  pricing: PricingTierDTO[];
  soloPricing: number | null;
  totalSeats: number;
  seatsBooked: number;
  seatsRemaining: number;
  status: string;

}
export interface ScheduleStatusCounts {
  upcoming: number;
  ongoing: number;
  completed: number;
  cancelled: number;
  soldOut: number;
}

export interface PaginatedScheduleResponse extends Paginated<ScheduleListItemResponse> {
  statusCounts: ScheduleStatusCounts;
}