import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { useAuth } from '../useAuth'
import { AuthProvider } from '../../context/AuthProvider'

// Mock authService
jest.mock('../../services/authService', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    logout: jest.fn(),
    forgotPassword: jest.fn(),
    getCurrentUser: jest.fn(),
    getToken: jest.fn(),
  },
}))

import authService from '../../services/authService'

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(authService.getCurrentUser as jest.Mock).mockResolvedValue(null)
  })

  it('should throw error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within an AuthProvider')
  })

  it('should return initial state with no user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should return user when authenticated', async () => {
    const mockUser = {
      id: '1',
      companyId: 'company-1',
      name: 'John Doe',
      email: 'test@example.com',
      photoUrl: 'https://via.placeholder.com/150',
    }

    ;(authService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser)

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
    })
  })

  it('should provide login function', async () => {
    const mockUser = {
      id: '1',
      companyId: 'company-1',
      name: 'John Doe',
      email: 'test@example.com',
      photoUrl: 'https://via.placeholder.com/150',
    }

    ;(authService.login as jest.Mock).mockResolvedValue({
      user: mockUser,
      token: 'mock-token',
    })

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(typeof result.current.login).toBe('function')
    })

    await result.current.login({
      email: 'test@example.com',
      password: 'password123',
    })

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
    })

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should provide logout function', async () => {
    const mockUser = {
      id: '1',
      companyId: 'company-1',
      name: 'John Doe',
      email: 'test@example.com',
      photoUrl: 'https://via.placeholder.com/150',
    }

    ;(authService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser)

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true)
    })

    result.current.logout()

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })

    expect(authService.logout).toHaveBeenCalled()
  })

  it('should provide forgotPassword function', async () => {
    ;(authService.forgotPassword as jest.Mock).mockResolvedValue(undefined)

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(typeof result.current.forgotPassword).toBe('function')
    })

    await result.current.forgotPassword({ email: 'test@example.com' })

    expect(authService.forgotPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
    })
  })

  it('should show loading state while checking authentication', async () => {
    ;(authService.getCurrentUser as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(null), 100))
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should handle login failure', async () => {
    ;(authService.login as jest.Mock).mockRejectedValue(new Error('Login failed'))

    const { result } = renderHook(() => useAuth(), { wrapper })

    await expect(
      result.current.login({
        email: 'test@example.com',
        password: 'password123',
      })
    ).rejects.toThrow('Login failed')

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })
  })

  it('should handle getCurrentUser error gracefully', async () => {
    ;(authService.getCurrentUser as jest.Mock).mockRejectedValue(
      new Error('Failed to get user')
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.isLoading).toBe(false)
    })
  })
})
