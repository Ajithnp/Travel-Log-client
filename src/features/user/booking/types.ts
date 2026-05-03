import type { BOOKING_STATUS } from "./constants";

export interface BookingPackage {
  title: string;
  location: string;
  state: string;
}

export interface BookingSchedule {
  startDate: string;
  endDate: string;
  reportingLocation: string;
}


export interface BookingListItem {
  _id: string;
  packageId: BookingPackage;
  scheduleId: BookingSchedule | null;
  travelerCount: number;
   bookingStatus: BookingStatus;
    grossAmount: number;
    bookingCode:string
    createdAt: string;
}


export interface IPaginatedBookingResponse {
  bookings: BookingListItem[];

  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

//========= component types==========
export type BookingFilterTab =
    | "all"
    | "confirmed"
    | "completed"
    | "cancelled_by_user";

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];