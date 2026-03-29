import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, VStack, Text, Field } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../validation/auth.schema'

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
}

export function ForgotPasswordForm({ onSubmit, isLoading, isSuccess }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  })

  if (isSuccess) {
    return (
      <VStack gap={4}>
        <Text color="green.600" textAlign="center" fontWeight="medium">
          Password reset email sent successfully!
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Please check your inbox and follow the instructions to reset your password.
        </Text>
        <RouterLink to="/login">
          <Button variant="outline" colorPalette="blue">
            Back to Login
          </Button>
        </RouterLink>
      </VStack>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          colorPalette="blue"
          width="full"
          loading={isLoading}
          loadingText="Sending..."
        >
          Send Reset Link
        </Button>

        <Text fontSize="sm" color="gray.600" textAlign="center">
          <RouterLink to="/login">
            <Text as="span" color="blue.500" fontWeight="medium">
              Back to Login
            </Text>
          </RouterLink>
        </Text>
      </VStack>
    </form>
  )
}

export default ForgotPasswordForm
