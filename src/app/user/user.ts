export interface User {
  id: number;
  email: string;
  birthDate: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
