import { Box, Container, Heading, Text, Button, VStack, HStack, Avatar } from '@chakra-ui/react'
import { useAuth } from '../../auth/hooks/useAuth'

export function DashboardPage() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <HStack justify="space-between" align="center">
          <VStack align="start" gap={1}>
            <Heading size="lg">Sales Dashboard</Heading>
            <Text color="gray.600">Welcome back, {user?.name || 'User'}!</Text>
          </VStack>

          <HStack gap={4}>
            <HStack gap={3}>
              <Avatar.Root>
                <Avatar.Fallback name={user?.name || 'User'} />
              </Avatar.Root>
              <VStack align="start" gap={0}>
                <Text fontWeight="medium">{user?.name}</Text>
                <Text fontSize="sm" color="gray.600">{user?.email}</Text>
              </VStack>
            </HStack>
            <Button variant="outline" colorPalette="red" onClick={handleLogout}>
              Logout
            </Button>
          </HStack>
        </HStack>

        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <VStack gap={4} align="center" py={12}>
            <Heading size="md" color="gray.500">
              Dashboard Coming Soon
            </Heading>
            <Text color="gray.400" textAlign="center" maxW="md">
              This is a placeholder for the sales dashboard. The full implementation
              will include sales metrics, charts, and real-time data updates.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default DashboardPage
