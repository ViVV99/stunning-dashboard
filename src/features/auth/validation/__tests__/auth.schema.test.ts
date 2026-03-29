import { loginSchema, forgotPasswordSchema } from '../auth.schema'

describe('auth.schema', () => {
  describe('loginSchema', () => {
    it('should validate valid login credentials', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      }

      await expect(loginSchema.validate(validData)).resolves.toEqual(validData)
    })

    it('should reject invalid email format', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      }

      await expect(loginSchema.validate(invalidData)).rejects.toThrow(
        'Please enter a valid email address'
      )
    })

    it('should reject empty email', async () => {
      const invalidData = {
        email: '',
        password: 'password123',
      }

      await expect(loginSchema.validate(invalidData)).rejects.toThrow(
        'Email is required'
      )
    })

    it('should reject password shorter than 6 characters', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
      }

      await expect(loginSchema.validate(invalidData)).rejects.toThrow(
        'Password must be at least 6 characters'
      )
    })

    it('should reject empty password', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: '',
      }

      await expect(loginSchema.validate(invalidData)).rejects.toThrow(
        'Password must be at least 6 characters'
      )
    })

    it('should reject missing email field', async () => {
      const invalidData = {
        password: 'password123',
      }

      await expect(loginSchema.validate(invalidData)).rejects.toThrow(
        'Email is required'
      )
    })

    it('should reject missing password field', async () => {
      const invalidData = {
        email: 'test@example.com',
      }

      await expect(loginSchema.validate(invalidData)).rejects.toThrow(
        'Password is required'
      )
    })

    it('should accept password with exactly 6 characters', async () => {
      const validData = {
        email: 'test@example.com',
        password: '123456',
      }

      await expect(loginSchema.validate(validData)).resolves.toEqual(validData)
    })

    it('should accept password with more than 6 characters', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'verylongpassword123',
      }

      await expect(loginSchema.validate(validData)).resolves.toEqual(validData)
    })
  })

  describe('forgotPasswordSchema', () => {
    it('should validate valid email', async () => {
      const validData = {
        email: 'test@example.com',
      }

      await expect(forgotPasswordSchema.validate(validData)).resolves.toEqual(
        validData
      )
    })

    it('should reject invalid email format', async () => {
      const invalidData = {
        email: 'invalid-email',
      }

      await expect(forgotPasswordSchema.validate(invalidData)).rejects.toThrow(
        'Please enter a valid email address'
      )
    })

    it('should reject empty email', async () => {
      const invalidData = {
        email: '',
      }

      await expect(forgotPasswordSchema.validate(invalidData)).rejects.toThrow(
        'Email is required'
      )
    })

    it('should reject missing email field', async () => {
      const invalidData = {}

      await expect(forgotPasswordSchema.validate(invalidData)).rejects.toThrow(
        'Email is required'
      )
    })

    it('should accept various valid email formats', async () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.com',
        'user@subdomain.example.com',
      ]

      for (const email of validEmails) {
        await expect(
          forgotPasswordSchema.validate({ email })
        ).resolves.toEqual({ email })
      }
    })
  })
})
