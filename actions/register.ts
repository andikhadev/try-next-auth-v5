'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@/schemas'
import { createUser, getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/email'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already exists!' }
  }

  await createUser({
    name,
    email,
    password: hashedPassword,
  })

  const verificationToken = await generateVerificationToken(email)

  if (!verificationToken) {
    return { error: 'Generate verification token failed' }
  }

  const emailId = await sendVerificationEmail(email, verificationToken.token)

  if (!emailId) {
    return { error: 'Send confirmation email failed' }
  }

  return { success: 'Confirmation email sent!' }
}
