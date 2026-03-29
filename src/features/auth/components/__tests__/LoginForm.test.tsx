import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { LoginForm } from '../LoginForm'

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>{component}</BrowserRouter>
    </ChakraProvider>
  )
}

describe('LoginForm', () => {
  let mockOnSubmit: jest.Mock

  const getDefaultProps = () => ({
    onSubmit: mockOnSubmit,
    isLoading: false,
  })

  beforeEach(() => {
    mockOnSubmit = jest.fn().mockResolvedValue(undefined)
  })

  it('should render email and password fields', () => {
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('should render submit button', () => {
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should render forgot password link', () => {
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument()
  })

  it('should show validation error for empty email on submit', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })
  })

  it('should show validation error for password shorter than 6 characters on submit', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, '12345')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    })
  })

  it('should not call onSubmit when form is invalid', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'invalid-email')
    await user.type(passwordInput, '12345')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  it('should show loading state when isLoading is true', () => {
    renderWithRouter(<LoginForm {...getDefaultProps()} isLoading={true} />)

    const submitButton = screen.getByRole('button', { name: /signing in/i })
    expect(submitButton).toBeDisabled()
  })

  it('should have correct input types', () => {
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should have autocomplete attributes', () => {
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    expect(emailInput).toHaveAttribute('autocomplete', 'email')
    expect(passwordInput).toHaveAttribute('autocomplete', 'current-password')
  })

  it('should have placeholder text', () => {
    renderWithRouter(<LoginForm {...getDefaultProps()} />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email')
    expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password')
  })
})
