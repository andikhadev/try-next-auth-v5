import { v4 as uuid } from 'uuid'

import {
  createVerificationToken,
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from '@/data/verification-token'
import {
  createPasswordResetToken,
  deletePasswordResetTokenById,
  getPasswordResetTokenByEmail,
} from '@/data/password-reset-token'

export const generateVerificationToken = async (email: string) => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id)
  }

  const verificationToken = await createVerificationToken({
    email,
    token,
    expires,
  })

  return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await deletePasswordResetTokenById(existingToken.id)
  }

  const verificationToken = await createPasswordResetToken({
    email,
    token,
    expires,
  })

  return verificationToken
}
