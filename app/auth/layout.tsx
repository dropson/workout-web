'use client'

import { ReactNode } from 'react'
import { useAuthRedirect } from '../modules/auth/hooks/use-auth-redirect'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Sidebar } from '@/components/layout/Sidebar'

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const isInitialized = useAuthRedirect(false)

    if (!isInitialized) return null

    return <>
        <Header />
        <main className='flex-1 overflow-auto flex flex-col'>
            {children}
        </main>
        <Sidebar/>
        <Footer />
    </>
}
