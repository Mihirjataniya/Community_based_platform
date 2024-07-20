// 'use client' is a directive to indicate that this module should run only in the client environment
'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '../lib/edgestore';


export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <EdgeStoreProvider>
        {children}
      </EdgeStoreProvider>
    </SessionProvider>
  );
};
