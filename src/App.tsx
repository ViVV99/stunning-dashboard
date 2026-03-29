import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { AuthProvider } from './features/auth/context/AuthProvider'
import { router } from './app/router'
import './App.css'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
