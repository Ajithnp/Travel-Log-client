export interface VendorVerificationUpdatePayload {
  id: string
  status: "Approved" | "Rejected" | "Pending" 
  reasonForReject?: string
}

export interface UsersStatusPayload {
  id: string;
  blockUser: boolean;
  reason: string | undefined;
}