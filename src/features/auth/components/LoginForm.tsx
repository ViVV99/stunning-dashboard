import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, VStack, Text, Field } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { loginSchema, type LoginFormData } from '../validation/auth.schema'

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
  isLoading: boolean
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4}>
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

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input
            {...register('password')}
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          colorPalette="blue"
          width="full"
          loading={isLoading}
          loadingText="Signing in..."
        >
          Sign In
        </Button>

        <Text fontSize="sm" color="gray.600" textAlign="center">
          <RouterLink to="/forgot-password">
            <Text as="span" color="blue.500" fontWeight="medium">
              Forgot your password?
            </Text>
          </RouterLink>
        </Text>
      </VStack>
    </form>
  )
}

export default LoginForm
