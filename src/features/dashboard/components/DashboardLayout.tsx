import { Box, Container, Heading, Text, Button, VStack, HStack, Avatar, Flex, Spacer } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        position="sticky"
        top={0}
        zIndex={10}
        boxShadow="sm"
      >
        <Container maxW="container.xl" py={4}>
          <Flex align="center" justify="space-between">
            {/* Logo and Brand */}
            <HStack gap={3}>
              <Box
                w={10}
                h={10}
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="md"
              >
                <Text fontSize="xl" fontWeight="bold" color="white">
                  📊
                </Text>
              </Box>
              <Heading size="lg" color="gray.800" fontWeight="bold">
                Sales Dashboard
              </Heading>
            </HStack>

            <Spacer />

            {/* User Info and Logout */}
            <HStack gap={4}>
              <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
                <Avatar.Root size="md">
                  <Avatar.Fallback name={user?.name || 'User'} bg="purple.100" color="purple.600" />
                </Avatar.Root>
                <VStack align="start" gap={0}>
                  <Text fontWeight="semibold" color="gray.800">
                    {user?.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {user?.email}
                  </Text>
                </VStack>
              </HStack>
              <Button
                variant="outline"
                colorPalette="red"
                size="sm"
                borderRadius="xl"
                fontWeight="medium"
                onClick={handleLogout}
                _hover={{
                  bg: 'red.50',
                  borderColor: 'red.300',
                }}
                transition="all 0.2s ease"
              >
                Logout
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  )
}

export default DashboardLayout
