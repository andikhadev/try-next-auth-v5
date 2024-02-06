'use server'

import * as z from 'zod'

import { getUserByEmail } from '@/data/user'
import { ResetSchema } from '@/schemas'
import { generatePasswordResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/email'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email not found' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  if (!passwordResetToken) {
    return { error: 'Generate password reset token failed' }
  }

  const emailId = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  if (!emailId) {
    return { error: 'Send password reset email failed' }
  }

  return { success: 'Reset email sent' }
}
