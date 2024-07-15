// 'use client' is a directive to indicate that this module should run only in the client environment
'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
      <SessionProvider>
        {children}
      </SessionProvider>
  );
};
