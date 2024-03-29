import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:4000/auth/new-verification?token=${token}`

  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  })

  return result.data
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:4000/auth/new-password?token=${token}`

  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  })

  return result.data
}
