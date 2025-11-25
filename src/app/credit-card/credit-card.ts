export interface CreditCard {
  id: number;
  userId: number;
  cardNumber: string;
  cardHolderName: string;
  cardType: CardType;
  expiryDate: string;
  cvv: string;
  creditLimit: number;
  availableCredit: number;
  currentBalance: number;
  minimumPayment: number;
  status: CardStatus;
  issueDate: string;
  lastPaymentDate?: string;
  annualFee: number;
  interestRate: number;
  rewardsPoints: number;
  createdAt: string;
  updatedAt: string;
}

export enum CardType {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX',
  DISCOVER = 'DISCOVER'
}

export enum CardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  EXPIRED = 'EXPIRED'
}

export interface CreateCardRequest {
  userId: number;
  cardType: CardType;
  creditLimit: number;
  cardHolderName: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
