'use client'

import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import FinancialCalculators from '@/components/FinancialCalculators'

export default function CalculatorsPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()

  useEffect(() => {
    if (!user || !token) {
      router.push('/login')
      return
    }
  }, [user, token, router])

  if (!user || !token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Redirecting...</h1>
          <p className="text-gray-600 dark:text-gray-400">Please log in to access the calculators.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FinancialCalculators />
    </div>
  )
}