import { Box, Heading, Text, VStack, HStack, SimpleGrid, Card } from '@chakra-ui/react'
import DashboardLayout from '../components/DashboardLayout'

export function DashboardPage() {
  return (
    <DashboardLayout>
      <VStack gap={8} align="stretch">
        {/* Page Header */}
        <VStack align="start" gap={1}>
          <Heading size="xl" color="gray.800" fontWeight="bold">
            Dashboard Overview
          </Heading>
          <Text color="gray.500" fontSize="md">
            Welcome back! Here's what's happening with your sales today.
          </Text>
        </VStack>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
          <Card.Root
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
            _hover={{
              boxShadow: 'md',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.3s ease"
          >
            <Card.Body p={6}>
              <VStack align="start" gap={3}>
                <HStack justify="space-between" w="full">
                  <Box
                    w={12}
                    h={12}
                    bg="blue.100"
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="2xl">💰</Text>
                  </Box>
                  <Text fontSize="sm" color="green.500" fontWeight="semibold">
                    +12.5%
                  </Text>
                </HStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Total Revenue
                  </Text>
                  <Heading size="lg" color="gray.800" fontWeight="bold">
                    $45,231.89
                  </Heading>
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
            _hover={{
              boxShadow: 'md',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.3s ease"
          >
            <Card.Body p={6}>
              <VStack align="start" gap={3}>
                <HStack justify="space-between" w="full">
                  <Box
                    w={12}
                    h={12}
                    bg="green.100"
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="2xl">📦</Text>
                  </Box>
                  <Text fontSize="sm" color="green.500" fontWeight="semibold">
                    +8.2%
                  </Text>
                </HStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Total Orders
                  </Text>
                  <Heading size="lg" color="gray.800" fontWeight="bold">
                    1,234
                  </Heading>
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
            _hover={{
              boxShadow: 'md',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.3s ease"
          >
            <Card.Body p={6}>
              <VStack align="start" gap={3}>
                <HStack justify="space-between" w="full">
                  <Box
                    w={12}
                    h={12}
                    bg="purple.100"
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="2xl">👥</Text>
                  </Box>
                  <Text fontSize="sm" color="green.500" fontWeight="semibold">
                    +5.3%
                  </Text>
                </HStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Active Customers
                  </Text>
                  <Heading size="lg" color="gray.800" fontWeight="bold">
                    573
                  </Heading>
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
            _hover={{
              boxShadow: 'md',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.3s ease"
          >
            <Card.Body p={6}>
              <VStack align="start" gap={3}>
                <HStack justify="space-between" w="full">
                  <Box
                    w={12}
                    h={12}
                    bg="orange.100"
                    borderRadius="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="2xl">📈</Text>
                  </Box>
                  <Text fontSize="sm" color="red.500" fontWeight="semibold">
                    -2.1%
                  </Text>
                </HStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Conversion Rate
                  </Text>
                  <Heading size="lg" color="gray.800" fontWeight="bold">
                    3.24%
                  </Heading>
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Charts Section */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
          <Card.Root
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
          >
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                <Heading size="md" color="gray.800" fontWeight="semibold">
                  Sales Overview
                </Heading>
                <Box
                  h="300px"
                  bg="gray.50"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="2px dashed"
                  borderColor="gray.200"
                >
                  <VStack gap={2}>
                    <Text fontSize="4xl">📊</Text>
                    <Text color="gray.500" fontWeight="medium">
                      Sales Chart Coming Soon
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      Interactive charts will be displayed here
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
          >
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                <Heading size="md" color="gray.800" fontWeight="semibold">
                  Recent Activity
                </Heading>
                <VStack align="stretch" gap={3}>
                  {[
                    { icon: '🛒', text: 'New order #1234 received', time: '2 minutes ago', color: 'blue' },
                    { icon: '💳', text: 'Payment processed for order #1233', time: '15 minutes ago', color: 'green' },
                    { icon: '📦', text: 'Order #1232 shipped', time: '1 hour ago', color: 'purple' },
                    { icon: '👤', text: 'New customer registered', time: '2 hours ago', color: 'orange' },
                  ].map((activity, index) => (
                    <HStack
                      key={index}
                      p={3}
                      bg="gray.50"
                      borderRadius="xl"
                      _hover={{
                        bg: 'gray.100',
                      }}
                      transition="background 0.2s ease"
                    >
                      <Box
                        w={10}
                        h={10}
                        bg={`${activity.color}.100`}
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="lg">{activity.icon}</Text>
                      </Box>
                      <VStack align="start" gap={0} flex={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          {activity.text}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {activity.time}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Quick Actions */}
        <Card.Root
          bg="white"
          borderRadius="2xl"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Card.Body p={6}>
            <VStack align="stretch" gap={4}>
              <Heading size="md" color="gray.800" fontWeight="semibold">
                Quick Actions
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
                {[
                  { icon: '➕', label: 'New Order', color: 'blue' },
                  { icon: '📊', label: 'View Reports', color: 'green' },
                  { icon: '👥', label: 'Customers', color: 'purple' },
                  { icon: '⚙️', label: 'Settings', color: 'gray' },
                ].map((action, index) => (
                  <VStack
                    key={index}
                    p={4}
                    bg="gray.50"
                    borderRadius="xl"
                    cursor="pointer"
                    _hover={{
                      bg: `${action.color}.50`,
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s ease"
                  >
                    <Box
                      w={12}
                      h={12}
                      bg={`${action.color}.100`}
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="2xl">{action.icon}</Text>
                    </Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      {action.label}
                    </Text>
                  </VStack>
                ))}
              </SimpleGrid>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </DashboardLayout>
  )
}

export default DashboardPage
