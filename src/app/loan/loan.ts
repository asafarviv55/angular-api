export interface Loan {
  id: number;
  userId: number;
  loanType: LoanType;
  amount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  status: LoanStatus;
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  outstandingBalance: number;
  purpose: string;
  collateral?: string;
  createdAt: string;
  updatedAt: string;
}

export enum LoanType {
  PERSONAL = 'PERSONAL',
  MORTGAGE = 'MORTGAGE',
  AUTO = 'AUTO',
  BUSINESS = 'BUSINESS',
  STUDENT = 'STUDENT'
}

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  PAID_OFF = 'PAID_OFF',
  DEFAULTED = 'DEFAULTED'
}

export interface CreateLoanRequest {
  userId: number;
  loanType: LoanType;
  amount: number;
  termMonths: number;
  purpose: string;
  annualIncome: number;
  employmentStatus: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
