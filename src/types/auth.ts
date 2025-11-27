export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'patient' | 'doctor' | 'admin';
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
}