import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

interface AuthStore {
  user: User | null
  token: string | null
  hasHydrated: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      hasHydrated: false,
      setAuth: (user: User, token: string) => {
        // Store token in localStorage for API calls
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token)
        }
        set({ user, token })
      },
      logout: () => {
        // Remove token from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
        }
        set({ user: null, token: null })
      },
      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => {
        // Ensure localStorage is available
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          }
        }
        return localStorage
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Auth store rehydration failed:', error)
          return
        }
        
        // Set hydration state after successful rehydration
        if (state && state.setHasHydrated) {
          state.setHasHydrated(true)
          
          // Check if token exists in localStorage but not in store
          if (typeof window !== 'undefined') {
            const localToken = localStorage.getItem('token')
            
            if (localToken && !state.token) {
              // Token exists in localStorage but not in store - need to restore user data
              fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${localToken}`,
                  'Content-Type': 'application/json'
                }
              })
              .then(response => {
                if (response.ok) {
                  return response.json()
                }
                throw new Error('Token validation failed')
              })
              .then(data => {
                // Restore user and token to store
                state.setAuth(data.user, localToken)
              })
              .catch(error => {
                console.error('Failed to restore user session:', error)
                // Token is invalid, remove it
                localStorage.removeItem('token')
              })
            } else if (state.token && !localToken) {
              // Token exists in store but not localStorage - sync it
              localStorage.setItem('token', state.token)
            }
          }
        }
      },
    }
  )
)

// Custom hook for authentication status
export const useAuth = () => {
  const { user, token, hasHydrated } = useAuthStore()
  const isAuthenticated = hasHydrated && !!(user && token)
  
  return {
    user,
    token, 
    hasHydrated,
    isAuthenticated,
    setAuth: useAuthStore(state => state.setAuth),
    logout: useAuthStore(state => state.logout)
  }
}