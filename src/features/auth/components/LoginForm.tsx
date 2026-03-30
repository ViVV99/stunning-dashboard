import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, VStack, Text, Field, Box } from '@chakra-ui/react'
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
      <VStack gap={5}>
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

        <Field.Root invalid={!!errors.password}>
          <Field.Label fontWeight="medium" color="gray.700">
            Password
          </Field.Label>
          <Input
            {...register('password')}
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
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
            {errors.password?.message}
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
          loadingText="Signing in..."
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
          Sign In
        </Button>

        <Box textAlign="center" pt={2}>
          <RouterLink to="/forgot-password">
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
              Forgot your password?
            </Text>
          </RouterLink>
        </Box>
      </VStack>
    </form>
  )
}

export default LoginForm
