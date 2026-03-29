import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../AuthProvider'
import { useAuth } from '../../hooks/useAuth'

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

const TestComponent = () => {
  const { user, isAuthenticated, isLoading, login, logout, forgotPassword } = useAuth()

  return (
    <div>
      <div data-testid="user">{user ? user.email : 'no-user'}</div>
      <div data-testid="is-authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <button onClick={() => login({ email: 'test@example.com', password: 'password123' })}>
        Login
      </button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => forgotPassword({ email: 'test@example.com' })}>
        Forgot Password
      </button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(authService.getCurrentUser as jest.Mock).mockResolvedValue(null)
  })

  it('should provide initial state with no user', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no-user')
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false')
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
    })
  })

  it('should load user from localStorage on mount', async () => {
    const mockUser = {
      id: '1',
      companyId: 'company-1',
      name: 'John Doe',
      email: 'test@example.com',
      photoUrl: 'https://via.placeholder.com/150',
    }

    ;(authService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true')
    })
  })

  it('should handle login successfully', async () => {
    const user = userEvent.setup()
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

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginButton = screen.getByText('Login')
    await user.click(loginButton)

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true')
    })

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should handle logout', async () => {
    const user = userEvent.setup()
    const mockUser = {
      id: '1',
      companyId: 'company-1',
      name: 'John Doe',
      email: 'test@example.com',
      photoUrl: 'https://via.placeholder.com/150',
    }

    ;(authService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true')
    })

    const logoutButton = screen.getByText('Logout')
    await user.click(logoutButton)

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no-user')
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false')
    })

    expect(authService.logout).toHaveBeenCalled()
  })

  it('should handle forgot password', async () => {
    const user = userEvent.setup()
    ;(authService.forgotPassword as jest.Mock).mockResolvedValue(undefined)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const forgotPasswordButton = screen.getByText('Forgot Password')
    await user.click(forgotPasswordButton)

    await waitFor(() => {
      expect(authService.forgotPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
    })
  })

  it('should show loading state while checking authentication', async () => {
    ;(authService.getCurrentUser as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(null), 100))
    )

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('is-loading')).toHaveTextContent('true')

    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
    })
  })

  it('should handle getCurrentUser error gracefully', async () => {
    ;(authService.getCurrentUser as jest.Mock).mockRejectedValue(
      new Error('Failed to get user')
    )

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no-user')
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false')
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
    })
  })
})
