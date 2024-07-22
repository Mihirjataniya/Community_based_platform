import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import Button from './Button';

const ProfileButton = () => {
    const { data: session, status } = useSession();
    const name = session?.user?.name;

    return (
        <div>
            {status === "authenticated" ?
                <Link href={'/userprofile'} className="flex gap-5 items-center px-4 py-2 bg-gray-800 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110">
                    <p className="text-lg font-semibold text-gray-200">
                        {name}
                    </p>
                    <div className="bg-green-500 text-white p-3 rounded-full flex items-center justify-center w-10 h-10 text-xl font-bold">
                        {name?.slice(0, 1).toUpperCase()}
                    </div>
                </Link> :
                <div className="space-x-5">
                    <Link href={'/signin'}>
                        <Button buttonlabel='Log In' />
                    </Link>
                    <Link href={'/signup'}>
                        <Button buttonlabel='Sign Up' />
                    </Link>
                </div>
            }
        </div>
    )
}

export default ProfileButton
