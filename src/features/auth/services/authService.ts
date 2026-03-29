import type { LoginCredentials, ForgotPasswordData, AuthResponse } from '../types/auth.types'
import type User from '../../../interfaces/User'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

const mockUser: User = {
  id: '1',
  companyId: 'company-1',
  name: 'John Doe',
  email: '',
  photoUrl: 'https://via.placeholder.com/150',
}

const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(500)

    const user: User = {
      ...mockUser,
      email: credentials.email,
    }

    const token = `mock-jwt-token-${Date.now()}`

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    return { user, token }
  },

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    await delay(500)
    console.log(`Password reset email sent to: ${data.email}`)
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(200)

    const token = localStorage.getItem(TOKEN_KEY)
    const userStr = localStorage.getItem(USER_KEY)

    if (!token || !userStr) {
      return null
    }

    try {
      const user = JSON.parse(userStr) as User
      return user
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      return null
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
}

export default authService
