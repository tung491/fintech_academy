'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/stores/authStore'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

// Define which routes should be public (no authentication required)
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/courses', // Make courses browsable for everyone
  '/courses/[courseId]', // Course details viewable by everyone
  '/learning-paths' // Learning paths browsable for everyone
]

// Define which routes require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile', 
  '/bookmarks',
  '/analytics',
  '/certificates',
  '/quizzes',
  '/calculators',
  '/courses/[courseId]/enroll',
  '/courses/[courseId]/week'
]

export default function RouteGuard({ 
  children, 
  requireAuth = false,
  redirectTo = '/login' 
}: RouteGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, hasHydrated, user, token } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  // Check if current route requires authentication
  const routeRequiresAuth = requireAuth || PROTECTED_ROUTES.some(route => {
    if (route.includes('[')) {
      // Handle dynamic routes
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+')
      const regex = new RegExp(`^${routePattern}(/.*)?$`)
      return regex.test(pathname)
    }
    return pathname.startsWith(route)
  })

  // Check if current route is public
  const routeIsPublic = PUBLIC_ROUTES.some(route => {
    if (route.includes('[')) {
      // Handle dynamic routes  
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+')
      const regex = new RegExp(`^${routePattern}(/.*)?$`)
      return regex.test(pathname)
    }
    return pathname === route || (route !== '/' && pathname.startsWith(route))
  })

  useEffect(() => {
    // Wait for auth store to hydrate
    if (!hasHydrated) {
      return
    }

    setIsLoading(false)

    // If route requires auth but user is not authenticated
    if (routeRequiresAuth && !isAuthenticated) {
      console.log(`🔒 Route ${pathname} requires authentication, redirecting to ${redirectTo}`)
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    // If user is authenticated but trying to access login/register, redirect to dashboard
    if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
      console.log(`✅ User already authenticated, redirecting from ${pathname} to /dashboard`)
      router.push('/dashboard')
      return
    }

  }, [isAuthenticated, hasHydrated, pathname, routeRequiresAuth, router, redirectTo])

  // Show loading while auth is hydrating
  if (!hasHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Loading...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Checking authentication status
          </p>
        </div>
      </div>
    )
  }

  // Show login prompt for protected routes when not authenticated
  if (routeRequiresAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md mx-auto text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be logged in to access this page.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname)}`)}
              className="w-full btn-primary"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/register')}
              className="w-full btn-secondary"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render children for all other cases
  return <>{children}</>
}

// Higher-order component for easy page wrapping
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: { requireAuth?: boolean; redirectTo?: string } = {}
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <RouteGuard {...options}>
        <Component {...props} />
      </RouteGuard>
    )
  }
}