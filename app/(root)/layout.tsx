import Navbar from '@/components/shared/Navbar'
import { isAuthenticated } from '@/lib/actions/auth.actions'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    return redirect("/sign-in");
  }
  return (
    <div className='root-layout'>
      <Navbar />
      {children}
    </div>
  )
}

export default RootLayout