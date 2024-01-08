import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from './auth.config'
import { db } from './lib/db'
import { getUserById } from './data/user'
import { ExtendedUser } from './next-auth'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ account, user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
      console.log('linkAccount', { account, user })
    },
  },
  callbacks: {
    async signIn({ user }) {
      // const existingUser = await getUserById(user.id)

      // if (!existingUser || !existingUser.emailVerified) {
      //   return false
      // }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as ExtendedUser['role']
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token
      }

      const existingUser = await getUserById(token.sub)
      if (!existingUser) {
        return token
      }

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
