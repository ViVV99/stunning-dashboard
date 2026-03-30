import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, VStack, Text, Field, Box } from '@chakra-ui/react'
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
      <VStack gap={6} align="center">
        <Box
          w={16}
          h={16}
          bg="green.100"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="3xl">✓</Text>
        </Box>
        <VStack gap={2}>
          <Text color="green.600" textAlign="center" fontWeight="semibold" fontSize="lg">
            Password reset email sent successfully!
          </Text>
          <Text fontSize="sm" color="gray.600" textAlign="center">
            Please check your inbox and follow the instructions to reset your password.
          </Text>
        </VStack>
        <RouterLink to="/login">
          <Button
            variant="outline"
            size="lg"
            colorPalette="purple"
            borderRadius="xl"
            fontWeight="semibold"
            _hover={{
              bg: 'purple.50',
            }}
            transition="all 0.2s ease"
          >
            Back to Login
          </Button>
        </RouterLink>
      </VStack>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={5}>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        <Field.Root invalid={!!errors.email}>
          <Field.Label fontWeight="medium" color="gray.700">
            Email
          </Field.Label>
          <Input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            size="lg"
            bg="gray.50"
            border="2px"
            borderColor="gray.200"
            borderRadius="xl"
            _hover={{
              borderColor: 'purple.300',
            }}
            _focus={{
              borderColor: 'purple.500',
              bg: 'white',
              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            }}
            _invalid={{
              borderColor: 'red.400',
              bg: 'red.50',
            }}
            transition="all 0.2s ease"
          />
          <Field.ErrorText color="red.500" fontSize="sm" mt={1}>
            {errors.email?.message}
          </Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          size="lg"
          width="full"
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white"
          fontWeight="semibold"
          borderRadius="xl"
          loading={isLoading}
          loadingText="Sending..."
          _hover={{
            bg: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s ease"
        >
          Send Reset Link
        </Button>

        <Box textAlign="center" pt={2}>
          <RouterLink to="/login">
            <Text
              as="span"
              color="purple.600"
              fontWeight="medium"
              fontSize="sm"
              _hover={{
                color: 'purple.700',
                textDecoration: 'underline',
              }}
              transition="color 0.2s ease"
            >
              Back to Login
            </Text>
          </RouterLink>
        </Box>
      </VStack>
    </form>
  )
}

export default ForgotPasswordForm
