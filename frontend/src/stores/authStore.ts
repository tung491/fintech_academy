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
          
          // Simple token sync without blocking API calls
          if (typeof window !== 'undefined') {
            const localToken = localStorage.getItem('token')
            
            if (localToken && !state.token) {
              // Just store the token, validate it later asynchronously
              console.log('Found token in localStorage, will validate asynchronously')
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