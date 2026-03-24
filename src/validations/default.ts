import type { TravellerInfo } from "@/types/booking.types";

export function emptyTraveller(): TravellerInfo {
  return {
    fullName:         "",
    idType:           "Aadhaar",
    idNumber:         "",
    phoneNumber:      "",
    emailAddress:     "",
    emergencyContact: "",
    relation:         "Parent",
  };
}