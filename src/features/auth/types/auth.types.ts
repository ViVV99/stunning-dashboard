import type User from '../../../interfaces/User'

export interface LoginCredentials {
  email: string
  password: string
}

export interface ForgotPasswordData {
  email: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  forgotPassword: (data: ForgotPasswordData) => Promise<void>
}
