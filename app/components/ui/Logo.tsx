import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  const {data:session,status} = useSession()

  return (
    <Link href={`${status==="authenticated" ? '/home' : '/'}`} className="text-3xl font-bold text-green-400 cursor-pointer">
      <div>Campus Crew</div>
    </Link>
  )
}

export default Logo
