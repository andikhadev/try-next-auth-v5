'use server'

import bcrypt from 'bcryptjs'
import { z } from 'zod'

import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByToken,
} from '@/data/password-reset-token'
import { getUserByEmail, updateUserById } from '@/data/user'
import { NewPasswordSchema } from '@/schemas'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string
) => {
  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Ivalid fields' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email not found' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await updateUserById(existingUser.id, {
    password: hashedPassword,
  })

  await deletePasswordResetTokenById(existingToken.id)

  return { success: 'Password updated' }
}
