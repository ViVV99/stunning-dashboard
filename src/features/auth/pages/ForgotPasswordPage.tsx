import { useState } from 'react'
import { toast } from 'react-toastify'
import AuthLayout from '../components/AuthLayout'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import { useAuth } from '../hooks/useAuth'
import type { ForgotPasswordFormData } from '../validation/auth.schema'

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { forgotPassword } = useAuth()

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      await forgotPassword(data)
      setIsSuccess(true)
      toast.success('Password reset email sent!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send reset email. Please try again.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="Reset your password">
      <ForgotPasswordForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </AuthLayout>
  )
}

export default ForgotPasswordPage
