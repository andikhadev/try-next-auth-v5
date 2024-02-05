import { AuthError, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import { generateVerificationToken } from './lib/tokens'
import { sendVerificationEmail } from './lib/email'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (!validatedFields.success) {
          throw new Error('Invalid credentials')
        }

        const { email, password } = validatedFields.data

        const user = await getUserByEmail(email)
        if (!user || !user.email || !user.password) {
          throw new Error('User not found')
        }

        const matchedPassword = await bcrypt.compare(password, user.password)
        if (!matchedPassword) {
          throw new Error('Your password is incorrect')
        }

        if (!user.emailVerified) {
          const verificationToken = await generateVerificationToken(user.email)

          if (!verificationToken) {
            throw new Error('Generate verification token failed')
          }

          const emailId = await sendVerificationEmail(
            email,
            verificationToken.token
          )

          if (!emailId) {
            throw new Error('Send confirmation email failed')
          }

          throw new Error('Confirmation email has sent!')
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
