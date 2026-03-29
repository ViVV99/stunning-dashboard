import { authService } from '../authService'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('login', () => {
    it('should return user data and token on successful login', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = await authService.login(credentials)

      expect(result).toHaveProperty('user')
      expect(result).toHaveProperty('token')
      expect(result.user.email).toBe(credentials.email)
      expect(result.user.name).toBe('John Doe')
      expect(result.token).toMatch(/^mock-jwt-token-/)
    })

    it('should store token and user in localStorage', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      await authService.login(credentials)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'auth_token',
        expect.stringMatching(/^mock-jwt-token-/)
      )
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'auth_user',
        expect.stringContaining(credentials.email)
      )
    })

    it('should return user with correct structure', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = await authService.login(credentials)

      expect(result.user).toEqual({
        id: '1',
        companyId: 'company-1',
        name: 'John Doe',
        email: credentials.email,
        photoUrl: 'https://via.placeholder.com/150',
      })
    })

    it('should simulate API delay', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      }

      const startTime = Date.now()
      await authService.login(credentials)
      const endTime = Date.now()

      // Should take at least 500ms (with some tolerance)
      expect(endTime - startTime).toBeGreaterThanOrEqual(400)
    })
  })

  describe('forgotPassword', () => {
    it('should log password reset email', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      const data = { email: 'test@example.com' }

      await authService.forgotPassword(data)

      expect(consoleSpy).toHaveBeenCalledWith(
        'Password reset email sent to: test@example.com'
      )
      consoleSpy.mockRestore()
    })

    it('should simulate API delay', async () => {
      const data = { email: 'test@example.com' }

      const startTime = Date.now()
      await authService.forgotPassword(data)
      const endTime = Date.now()

      // Should take at least 500ms (with some tolerance)
      expect(endTime - startTime).toBeGreaterThanOrEqual(400)
    })
  })

  describe('logout', () => {
    it('should remove token and user from localStorage', () => {
      authService.logout()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_user')
    })
  })

  describe('getCurrentUser', () => {
    it('should return null when no token exists', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = await authService.getCurrentUser()

      expect(result).toBeNull()
    })

    it('should return null when no user data exists', async () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'auth_token') return 'mock-token'
        return null
      })

      const result = await authService.getCurrentUser()

      expect(result).toBeNull()
    })

    it('should return user when valid token and user data exist', async () => {
      const mockUser = {
        id: '1',
        companyId: 'company-1',
        name: 'John Doe',
        email: 'test@example.com',
        photoUrl: 'https://via.placeholder.com/150',
      }

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'auth_token') return 'mock-token'
        if (key === 'auth_user') return JSON.stringify(mockUser)
        return null
      })

      const result = await authService.getCurrentUser()

      expect(result).toEqual(mockUser)
    })

    it('should return null and clear storage when user data is invalid JSON', async () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'auth_token') return 'mock-token'
        if (key === 'auth_user') return 'invalid-json'
        return null
      })

      const result = await authService.getCurrentUser()

      expect(result).toBeNull()
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_user')
    })

    it('should simulate API delay', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      const startTime = Date.now()
      await authService.getCurrentUser()
      const endTime = Date.now()

      // Should take at least 200ms (with some tolerance)
      expect(endTime - startTime).toBeGreaterThanOrEqual(150)
    })
  })

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('mock-token')

      const result = authService.getToken()

      expect(result).toBe('mock-token')
      expect(localStorageMock.getItem).toHaveBeenCalledWith('auth_token')
    })

    it('should return null when no token exists', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = authService.getToken()

      expect(result).toBeNull()
    })
  })
})
