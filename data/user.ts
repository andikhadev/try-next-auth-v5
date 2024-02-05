import { db } from '@/lib/db'
import { User } from '@prisma/client'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    })

    return user
  } catch (error) {
    return null
  }
}

export const createUser = async (payload: Partial<User>) => {
  try {
    const user = await db.user.create({
      data: payload,
    })

    return user
  } catch (error) {
    return null
  }
}

export const updateUserById = async (id: string, payload: Partial<User>) => {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: payload,
    })

    return user
  } catch (error) {
    return null
  }
}
