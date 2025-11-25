export interface Branch {
  id: number;
  branchCode: string;
  branchName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  managerName: string;
  openingHours: string;
  closingHours: string;
  services: BranchService[];
  latitude: number;
  longitude: number;
  status: BranchStatus;
  createdAt: string;
  updatedAt: string;
}

export enum BranchStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  TEMPORARILY_CLOSED = 'TEMPORARILY_CLOSED'
}

export enum BranchService {
  ATM = 'ATM',
  DEPOSIT_BOX = 'DEPOSIT_BOX',
  LOAN_SERVICES = 'LOAN_SERVICES',
  MORTGAGE = 'MORTGAGE',
  WEALTH_MANAGEMENT = 'WEALTH_MANAGEMENT',
  CURRENCY_EXCHANGE = 'CURRENCY_EXCHANGE',
  BUSINESS_BANKING = 'BUSINESS_BANKING'
}

export interface SearchBranchRequest {
  city?: string;
  state?: string;
  zipCode?: string;
  service?: BranchService;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
