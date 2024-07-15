'use client'
import Button from '@/app/components/ui/Button'
import Input from '@/app/components/ui/Input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handlesubmit = async () => {
    const response = await axios.post('/api/auth/signup', {
      name: name,
      email: email,
      password: password
    })
    if (response.status == 200) {
      const response = await signIn('credentials', {
        email: email,
        password: password
      })
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-500 mb-6">Sign Up</h2>
        <p className="text-center text-gray-400 mb-6">
          Join our community today! Create an account to unlock exclusive features and personalized experiences.
        </p>
        <div className='space-y-6'>
          <Input placeholder='Enter your Name' type='text' onChange={(e) => {
            setName(e.target.value)
          }} />
          <Input placeholder='Enter your Email' type='text' onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <Input placeholder='Enter your password' type='password' onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <div className='flex items-center justify-center'>
          <Button buttonlabel={'Sign Up'} onClick={handlesubmit} />
          </div>
          <div className="text-center mt-4">
            <Link href={'/signin'} className="text-gray-400 hover:underline">Already have an account? Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
