
import type { PaginatedData } from "@/types/IApiResponse";

export const FILTERS = ["All", "Credits", "Debits",] as const;
export type TxFilter = typeof FILTERS[number];

export type TransactionType = "credit" | "debit";
export type TransactionStatus = "success" | "failed";

export type WalletFilter = "all" | "credit" | "debit";

export const PAGE_SIZE = 10;

export const TRANSACTION_TYPE = {
  CREDIT:"credit",
  DEBIT:"debit",
}as const

export interface TransactionDTO {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: string;
  description: string;
  referenceId: string;
  createdAt: string;
}

export interface WalletDetailsResponse {
  balance: number;
  totalCredit: number;
  totalDebit: number;
  totalReward:number;
  transactions: PaginatedData<TransactionDTO>;
}