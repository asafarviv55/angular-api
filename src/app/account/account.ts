export interface Account {
  id: number;
  userId: number;
  accountNumber: string;
  accountType: AccountType;
  balance: number;
  currency: string;
  status: AccountStatus;
  openedDate: string;
  closedDate?: string;
  interestRate?: number;
  overdraftLimit?: number;
  createdAt: string;
  updatedAt: string;
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  BUSINESS = 'BUSINESS',
  MONEY_MARKET = 'MONEY_MARKET'
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED'
}

export interface CreateAccountRequest {
  userId: number;
  accountType: AccountType;
  initialDeposit: number;
  currency: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
