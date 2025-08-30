'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

interface HydrationProviderProps {
  children: React.ReactNode
}

export default function HydrationProvider({ children }: HydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false)
  const { hasHydrated, setHasHydrated } = useAuthStore()

  useEffect(() => {
    // Ensure the auth store is hydrated
    if (!hasHydrated) {
      setHasHydrated(true)
    }
    setIsHydrated(true)
  }, [hasHydrated, setHasHydrated])

  // Show a loading state until hydration is complete
  if (!isHydrated || !hasHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}