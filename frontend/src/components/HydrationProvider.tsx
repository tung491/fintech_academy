'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

interface HydrationProviderProps {
  children: React.ReactNode
}

export default function HydrationProvider({ children }: HydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false)
  const setHasHydrated = useAuthStore(state => state.setHasHydrated)

  useEffect(() => {
    // Give a brief moment for proper hydration then mark as complete
    const timer = setTimeout(() => {
      setHasHydrated(true)
      setIsHydrated(true)
    }, 100) // Very short delay to allow proper hydration

    return () => clearTimeout(timer)
  }, [setHasHydrated])

  // Only show loading for a very brief moment during initial hydration
  if (!isHydrated) {
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