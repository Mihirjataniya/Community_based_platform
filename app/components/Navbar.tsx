'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Logo from './ui/Logo';
import Button from './ui/Button';



const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const name = session?.user?.name;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
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
        {status === "authenticated" ? <div className="max-sm:hidden flex gap-5 items-center px-4 py-2  bg-gray-800 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110">
          <p className="text-lg font-semibold text-gray-200">
            {name}
          </p>
          <div className="bg-green-500 text-white p-3 rounded-full flex items-center justify-center w-10 h-10 text-xl font-bold">
            {name?.slice(0, 1).toUpperCase()}
          </div>
        </div> :
          <div className="max-sm:mt-4 space-x-5">
            <Link href={'/signin'}>
              <Button buttonlabel='Log In' />
            </Link>
            <Link href={'/signup'}>
            <Button buttonlabel='Sign Up' />
            </Link>
          </div>
        }

        <button
          className="hidden max-sm:block text-gray-200 focus:outline-none ml-4"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default Navbar;


// //non sticky
// 'use client'

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// const Logo = () => (
//   <div className="text-2xl font-bold text-green-400">Campus Crew</div>
// );

// const Navbar = () => {
//   const { data: session, status } = useSession();
//   const pathname = usePathname();
//   const name = session?.user?.name;
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const navItems = [
//     { href: '/home', label: 'Home' },
//     { href: '/questions', label: 'Questions' },
//     { href: '/events', label: 'Events' },
//     { href: '/blogs', label: 'Blogs' },
//   ];

//   return (
//     <div>
//       <div className="py-6 px-10 bg-gray-800 sticky flex items-center justify-between">
//         <Logo />
//         <div className="flex items-center space-x-8 border border-green-400 bg-gray-700 py-2 px-6 rounded-3xl max-sm:hidden">
//           {navItems.map((item) => (
//             <Link className={`text-lg font-semibold transition duration-300 ${
//               pathname === item.href ? 'text-green-400' : 'text-gray-200 hover:text-green-400'
//             }`} key={item.href} href={item.href}>
//                 {item.label}
//             </Link>
//           ))}
//         </div>
//         <div className="max-sm:hidden flex gap-5 items-center px-4 py-2  bg-gray-800 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110">
//           <p className="text-lg font-semibold text-gray-200">
//             {name}
//           </p>
//           <div className="bg-green-500 text-white p-3 rounded-full flex items-center justify-center w-10 h-10 text-xl font-bold">
//             {name?.slice(0, 1).toUpperCase()}
//           </div>
//         </div>
//         <button
//           className="hidden max-sm:block text-gray-200 focus:outline-none ml-4"
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         >
//           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//           </svg>
//         </button>
//       </div>
//       {isDropdownOpen && (
//         <div className="bg-gray-800 hidden max-sm:flex items-center pb-3 px-4 justify-end w-full animate-fade-in-down">
//           <div className="hidden max-sm:flex gap-5 items-center px-4 py-2 bg-gray-800 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110">
//             <p className="text-lg font-semibold text-gray-200">
//               {name}
//             </p>
//             <div className="bg-green-500 text-white p-3 rounded-full flex items-center justify-center w-10 h-10 text-xl font-bold">
//               {name?.slice(0, 1).toUpperCase()}
//             </div>
//           </div>
//         </div>
//       )}
//       <div className={`hidden max-sm:flex border border-green-500 mt-4 w-full bg-gray-700 rounded-lg shadow-lg py-2 transition-all duration-300 ease-in-out ${isDropdownOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
//         {navItems.map((item) => (
//           <Link key={item.href} href={item.href} passHref>
//             <span
//               className={`block text-lg font-semibold transition duration-300 cursor-pointer py-2 px-4 ${
//                 pathname === item.href ? 'text-green-400' : 'text-gray-200 hover:text-green-400'
//               }`}
//             >
//               {item.label}
//             </span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
