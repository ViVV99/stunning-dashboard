import { Box, Container, VStack, Heading, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <Container maxW="container.sm" py={{ base: 8, md: 12 }}>
      <VStack gap={8} align="stretch">
        <VStack gap={2} textAlign="center">
          <Heading size={{ base: 'xl', md: '2xl' }} color="blue.600">
            Sales Dashboard
          </Heading>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
            {subtitle || 'Welcome back! Please sign in to continue.'}
          </Text>
        </VStack>

        <Box
          bg="white"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor="gray.100"
        >
          <VStack gap={6} align="stretch">
            <Heading size={{ base: 'md', md: 'lg' }} textAlign="center">
              {title}
            </Heading>
            {children}
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default AuthLayout
