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

export interface ActivityDTO {
  startTime:   string | null
  endTime:     string | null
  title:       string | null
  description: string | null
  location:    string | null
  specials:    string[]
  included:    boolean
}
 
export interface ItineraryDayDTO {
  dayNumber:  number
  title:      string | null
  activities: ActivityDTO[]
}
 
export interface CategoryDTO {
  id:   string
  name: string
}
 
export interface PackageDTO {
  id:                 string
  title:              string
  location:           string
  state:              string
  usp:                string
  days:               string     
  nights:             string      
  difficultyLevel:    string
  cancellationPolicy: string
  inclusions:         string[]
  exclusions:         string[]
  packingList:        string[]
  itinerary:          ItineraryDayDTO[]
  category:           CategoryDTO | null
}
 
export interface ScheduleDTO {
  id:                string
  startDate:         string     
  endDate:           string      
  reportingTime:     string     
  reportingLocation: string
  notes:             string | null
}
 
export interface VendorDTO {
  id:   string
  name: string
}
 
export interface TravelerDTO {
  fullName:         string
  idType:           string
  idNumber:         string
  isLead:           boolean
  phoneNumber:      string | null
  emailAddress:     string | null
  emergencyContact: string | null
  relation:         string | null
}
 
export interface FinancialsDTO {
  grossAmount:      number
  discountAmount:   number
  walletAmountUsed: number
  finalAmount:      number
}

export type CancelStatus = "pending" | "approved" | "rejected";
 
export interface CancellationRuleDTO {
  daysBeforeTrip: number;
  refundPercent: number;
}

export interface CancellationPolicyDTO {
  id: string;
  key: string;
  label: string;
  rules: CancellationRuleDTO[];
  isActive: boolean;
}
 
export interface BookingDetailDTO {
  id:          string
  bookingCode: string    
  userId:      string
 
  package:  PackageDTO
  schedule: ScheduleDTO
  vendor:   VendorDTO
 
  groupType:     'SOLO' | 'DUO' | 'GROUP'
  travelerCount: number
  travelers:     TravelerDTO[]   
 
  financials: FinancialsDTO
  cancellationPolicy: CancellationPolicyDTO | null;
 
  paymentStatus: string
  paymentMethod: string | null
  transactionId: string | null
 
  bookingStatus:     BookingStatus
  cancellationReason: string | null
  cancelledAt:        string | null   
  cancelledBy:        string | null
  cancellationStatus: CancelStatus | null
 
  isAttended:  boolean
  attendedAt:  string | null         
  hasReviewed: boolean
  ticketUrl: string | null
  chatId?: string;
 
  createdAt: string                   
  updatedAt: string                  
}


export type BookingFilterTab =
    | "all"
    | "confirmed"
    | "completed"
    | "cancelled_by_user";

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];