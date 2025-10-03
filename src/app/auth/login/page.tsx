import AuthForm from '@/components/auth/auth-form'
import { signInSchema } from '@/lib/validations'
import authService from '@/services/auth.service'
import React from 'react'

const Login = () => {
  return (
    <div className='bg-[#0f172a]'>
        <AuthForm 
        type='SIGNIN'
        schema={signInSchema}
        defaultValues={{ identifier: "", password: "" }}
        onSubmit={authService.login}
        />
    </div>
  )
}

export default Login