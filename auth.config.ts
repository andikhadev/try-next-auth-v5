import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (!validatedFields.success) {
          throw new Error('Invalid credentials')
        }

        const { email, password } = validatedFields.data

        const user = await getUserByEmail(email)
        if (!user || !user.password) {
          throw new Error('User not found')
        }

        const matchedPassword = await bcrypt.compare(password, user.password)
        if (!matchedPassword) {
          throw new Error('Your password is incorrect')
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
