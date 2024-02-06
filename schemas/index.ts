import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(6, 'Minimum of 6 characters required'),
})

export const ResetSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email({
    message: 'Please enter a valid email',
  }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, 'Minimum of 6 characters required'),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().min(1, 'Please enter your email').email({
    message: 'Please enter a valid email',
  }),
  password: z
    .string()
    .min(6, 'Please enter a password with at least 6 characters'),
})
