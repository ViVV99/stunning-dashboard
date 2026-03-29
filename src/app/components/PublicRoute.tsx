import { Navigate, Outlet } from 'react-router-dom'
import { Box, Spinner, Center } from '@chakra-ui/react'
import { useAuth } from '../../features/auth/hooks/useAuth'

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export default PublicRoute
