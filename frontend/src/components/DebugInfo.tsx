'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { api } from '@/lib/api'

export function DebugInfo() {
  const { user, token } = useAuthStore()
  const [apiTest, setApiTest] = useState<any>(null)

  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await api.get('/health')
        setApiTest({ success: true, data: response.data })
      } catch (error: any) {
        setApiTest({ success: false, error: error.message })
      }
    }
    
    if (user) {
      testApi()
    }
  }, [user])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2">Debug Info</h4>
      <div className="space-y-1">
        <div>User: {user ? `${user.firstName} ${user.lastName}` : 'Not logged in'}</div>
        <div>Token: {token ? '✅ Present' : '❌ Missing'}</div>
        <div>Local Storage Token: {typeof window !== 'undefined' && localStorage.getItem('token') ? '✅ Present' : '❌ Missing'}</div>
        <div>API Test: {apiTest ? (apiTest.success ? '✅ Success' : `❌ ${apiTest.error}`) : '⏳ Testing...'}</div>
      </div>
    </div>
  )
}