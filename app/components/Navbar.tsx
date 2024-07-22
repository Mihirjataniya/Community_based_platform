'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Logo from './ui/Logo';
import Button from './ui/Button';
import Sidebar from './Sidebar';
import { AlignJustify } from 'lucide-react';
import ProfileButton from './ui/ProfileButton';


interface NavItem {
  href: string;
  label: string;
}

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const name = session?.user?.name;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: '/home', label: 'Home' },
    { href: '/questions', label: 'Questions' },
    { href: '/events', label: 'Events' },
    { href: '/blogs', label: 'Blogs' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-gray-800">
      <div className="py-6 px-10 flex items-center justify-between">
        <Logo />

        <div className="flex items-center space-x-8 border border-green-400 bg-gray-700 py-2 px-6 rounded-3xl max-sm:hidden">
          {navItems.map((item) => (
            <Link className={`text-lg font-semibold transition duration-300 ${pathname.startsWith(item.href) ? 'text-green-400' : 'text-gray-200 hover:text-green-400'
              }`} key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className='max-sm:hidden'>
          <ProfileButton />
        </div>

        <button
          className="hidden max-sm:block text-gray-200 focus:outline-none ml-4"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <AlignJustify size={30} />
        </button>
      </div>
      <Sidebar isOpen={isDropdownOpen} closeSidebar={() => setIsDropdownOpen(false)} />

    </div>
  );
};

export default Navbar;
