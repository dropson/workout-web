'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Sidebar } from '@/components/layout/Sidebar'

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {

    return <>
        <Header />
        <main className='flex-1 overflow-auto flex flex-col px-2 sm:px-6 mt-4'>
            {children}
        </main>
        <Sidebar/>
        <Footer />
    </>
}
