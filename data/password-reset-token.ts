import { db } from '@/lib/db'

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    })

    return passwordResetToken
  } catch (error) {
    return null
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    })

    return passwordResetToken
  } catch (error) {
    return null
  }
}

export const createPasswordResetToken = async (payload: {
  email: string
  token: string
  expires: Date
}) => {
  try {
    const data = await db.passwordResetToken.create({
      data: payload,
    })

    return data
  } catch (error) {
    return null
  }
}

export const deletePasswordResetTokenById = async (id: string) => {
  try {
    await db.passwordResetToken.delete({
      where: { id },
    })

    return true
  } catch (error) {
    return null
  }
}
