import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthLayout from '../components/AuthLayout'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'
import type { LoginFormData } from '../validation/auth.schema'

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await login(data)
      toast.success('Login successful!')
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed. Please try again.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Sign In">
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </AuthLayout>
  )
}

export default LoginPage
