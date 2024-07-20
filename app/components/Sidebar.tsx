import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Button from './ui/Button';
import { CircleX } from 'lucide-react';

// Define types for props
interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const name = session?.user?.name;

  const navItems = [
    { href: '/home', label: 'Home' },
    { href: '/questions', label: 'Questions' },
    { href: '/events', label: 'Events' },
    { href: '/blogs', label: 'Blogs' },
  ];

  return (
    <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="absolute px-5 top-0 right-0 w-64 bg-gray-800 h-full shadow-lg">
        <button
          className="absolute top-4 left-4 text-gray-200"
          onClick={closeSidebar}
        >
         <CircleX size={26} />
        </button>
        <div className="mt-20 flex flex-col rounded-2xl p-5 items-center gap-5 border ">
          {navItems.map((item) => (
            <Link className={`text-lg font-semibold transition duration-300 ${pathname.startsWith(item.href) ? 'text-green-400' : 'text-gray-200 hover:text-green-400'
            }`} key={item.href} href={item.href}>
            {item.label}
          </Link>
          ))}
        </div>
        <div className="mt-auto px-6 py-4">
          {status === "authenticated" ? (
            <div className="flex gap-5 items-center px-4 py-2 bg-gray-800 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110">
              <p className="text-lg font-semibold text-gray-200">
                {name}
              </p>
              <div className="bg-green-500 text-white p-3 rounded-full flex items-center justify-center w-10 h-10 text-xl font-bold">
                {name?.slice(0, 1).toUpperCase()}
              </div>
            </div>
          ) : (
            <div className="space-x-5">
              <Link href={'/signin'}>
                <Button buttonlabel='Log In' />
              </Link>
              <Link href={'/signup'}>
                <Button buttonlabel='Sign Up' />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
