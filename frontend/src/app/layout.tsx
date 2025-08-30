import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/Header'
import { DebugInfo } from '@/components/DebugInfo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinAcademy - Financial Education for Developers',
  description: 'Learn financial and accounting knowledge to run your own business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme-storage');
                if (theme) {
                  const { state } = JSON.parse(theme);
                  const root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  
                  if (state.theme === 'system') {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    root.classList.add(systemTheme);
                  } else {
                    root.classList.add(state.theme);
                  }
                } else {
                  // Default to light theme if no preference stored
                  document.documentElement.classList.add('light');
                }
              } catch (e) {
                // Fallback to light theme on any error
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <DebugInfo />
          </div>
        </Providers>
      </body>
    </html>
  )
}