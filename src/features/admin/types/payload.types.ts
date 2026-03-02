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

export interface CategoryTogglePayload {
  id: string;
  action: 'approve' | 'reject';
}

export interface CategoryreviewPayload {
  id: string;
  action: 'approve' | 'rejected';
  rejectionReason?: string
}

