'use client'
import React, { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "../modules/auth/store/auth.store"

interface AppProvidersProps {
    children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {

    const initialize = useAuthStore((s) => s.initialize)
    useEffect(() => {
        initialize()
    }, [initialize])
    return (
        <>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </>
    )
}
