'use client'
import Button from '@/app/components/ui/Button'
import Input from '@/app/components/ui/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-500 mb-6">Sign In</h2>
        <div className='space-y-6'>
          <Input placeholder='Enter your Email' type='text' onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <Input placeholder='Enter your password' type='password' onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <div className='flex items-center justify-center'>
          <Button buttonlabel={'Sign in'}  onClick={() => {
              signIn("credentials", {
                email: email,
                password: password
              },
              )
            }} />
          </div>
         
          <div className="text-center mt-4">
            <Link className="text-gray-400 hover:underline" href={'/signup'}>Don't have an account? Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
