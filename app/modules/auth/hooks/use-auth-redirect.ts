'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './use-auth'

export function useAuthRedirect(protect: boolean) {
  const { isInitialized, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isInitialized) return

    if (protect && !isAuthenticated) {
      router.replace('/auth/login')
    }
    console.log('1')
    if (!protect && isAuthenticated) {
        console.log('2')
      router.replace('/')
    }
  }, [isInitialized, isAuthenticated, protect, router])

  return isInitialized
}
