export interface Transaction {
  id: number;
  accountId: number;
  transactionType: TransactionType;
  amount: number;
  currency: string;
  description: string;
  status: TransactionStatus;
  transactionDate: string;
  balanceAfter: number;
  category?: string;
  merchantName?: string;
  merchantLocation?: string;
  createdAt: string;
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
  FEE = 'FEE',
  INTEREST = 'INTEREST'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export interface CreateTransactionRequest {
  accountId: number;
  transactionType: TransactionType;
  amount: number;
  description: string;
  merchantName?: string;
  category?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
