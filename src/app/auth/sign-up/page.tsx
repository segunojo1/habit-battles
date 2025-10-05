'use client'

import AuthForm from '@/components/auth/auth-form'
import { signUpSchema } from '@/lib/validations'
import authService from '@/services/auth.service'
import React from 'react'

const SignUp = () => {
  return (
    <div>
        <AuthForm
        type='SIGNIN'
        schema={signUpSchema}
        defaultValues={{ username: "", email: "", password: "" }}
        onSubmit={authService.signup}
        />
    </div>
  )
}

export default SignUp