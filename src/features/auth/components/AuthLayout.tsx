import { Box, Container, VStack, Heading, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: 4, md: 8 }}
    >
      <Container maxW="container.sm">
        <VStack gap={8} align="stretch">
          {/* Logo and Branding */}
          <VStack gap={3} textAlign="center">
            <Box
              w={{ base: 16, md: 20 }}
              h={{ base: 16, md: 20 }}
              bg="white"
              borderRadius="2xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="xl"
              mx="auto"
            >
              <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" color="purple.600">
                📊
              </Text>
            </Box>
            <Heading
              size={{ base: 'xl', md: '2xl' }}
              color="white"
              fontWeight="bold"
              textShadow="0 2px 4px rgba(0,0,0,0.1)"
            >
              Sales Dashboard
            </Heading>
            <Text
              color="whiteAlpha.900"
              fontSize={{ base: 'sm', md: 'md' }}
              maxW="md"
              mx="auto"
            >
              {subtitle || 'Welcome back! Please sign in to continue.'}
            </Text>
          </VStack>

          {/* Form Card */}
          <Box
            bg="white"
            p={{ base: 6, md: 10 }}
            borderRadius="3xl"
            boxShadow="2xl"
            border="1px"
            borderColor="whiteAlpha.200"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              bg: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <VStack gap={6} align="stretch">
              <Heading
                size={{ base: 'md', md: 'lg' }}
                textAlign="center"
                color="gray.800"
                fontWeight="semibold"
              >
                {title}
              </Heading>
              {children}
            </VStack>
          </Box>

          {/* Footer */}
          <Text
            textAlign="center"
            color="whiteAlpha.800"
            fontSize="xs"
          >
            © 2024 Sales Dashboard. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default AuthLayout
