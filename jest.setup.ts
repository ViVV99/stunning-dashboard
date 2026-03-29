import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder

// Polyfill for structuredClone
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj: unknown) => {
    if (obj === undefined) return undefined
    if (obj === null || typeof obj !== 'object') return obj

    if (obj instanceof Date) return new Date(obj.getTime())
    if (obj instanceof Array) return obj.map(item => global.structuredClone?.(item))
    if (obj instanceof Object) {
      const clonedObj: Record<string, unknown> = {}
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          clonedObj[key] = global.structuredClone?.((obj as Record<string, unknown>)[key])
        }
      }
      return clonedObj
    }

    return obj
  }
}

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})

// Mock ResizeObserver
class ResizeObserverMock {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
})

// Suppress console errors during tests
const originalError = console.error
const originalLog = console.log
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Login failed') ||
       args[0].includes('Error: Login failed'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
  
  console.log = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Login failed') ||
       args[0].includes('Password reset') ||
       args[0].includes('Error'))
    ) {
      return
    }
    originalLog.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.log = originalLog
})

// Suppress unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  if (reason instanceof Error && reason.message.includes('Login failed')) {
    return
  }
})
