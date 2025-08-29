'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, Clock, Trophy, TrendingUp, BarChart3, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()

  useEffect(() => {
    if (!user || !token) {
      router.push('/login')
      return
    }
  }, [user, token, router])

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/progress/dashboard').then(res => res.data),
    enabled: !!user && !!token
  })

  // Show loading while checking authentication
  if (!user || !token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Redirecting...</h1>
          <p className="text-gray-600 dark:text-gray-400">Please log in to access your dashboard.</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return <div>Loading...</div>
  }

  const { enrollments, recentActivity, stats } = dashboardData

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Your Learning Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Enrolled Courses</p>
              <p className="text-2xl font-bold">{stats.enrolled_courses || 0}</p>
            </div>
            <BookOpen className="w-10 h-10 text-primary-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Lessons</p>
              <p className="text-2xl font-bold">{stats.completed_lessons || 0}</p>
            </div>
            <Trophy className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Hours</p>
              <p className="text-2xl font-bold">{Math.round((stats.total_time_spent || 0) / 60)}</p>
            </div>
            <Clock className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Courses</p>
              <p className="text-2xl font-bold">{stats.completed_courses || 0}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          {enrollments?.length > 0 ? (
            <div className="space-y-4">
              {enrollments.map((enrollment: any) => (
                <div key={enrollment.id} className="card">
                  <h3 className="font-semibold mb-2">{enrollment.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{enrollment.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${enrollment.progress_percentage || 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.round(enrollment.progress_percentage || 0)}%
                    </span>
                  </div>
                  <Link 
                    href={`/courses/${enrollment.course_id}`}
                    className="mt-3 inline-block text-primary-600 hover:underline"
                  >
                    Continue Learning →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
              <Link href="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {recentActivity?.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((activity: any, index: number) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{activity.lesson_title}</p>
                      <p className="text-sm text-gray-600">
                        {activity.course_title} - Week {activity.weekNumber}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time_spent_minutes} minutes • {new Date(activity.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Trophy className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8">
              <p className="text-gray-600">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Analytics Preview */}
      <div className="mt-8">
        <div className="card bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Detailed Analytics Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your learning patterns, streaks, and skill development progress
                </p>
              </div>
            </div>
            <Link 
              href="/analytics" 
              className="btn-primary flex items-center gap-2 hover:bg-primary-700 dark:hover:bg-primary-600"
            >
              View Analytics
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Quick stats preview */}
          <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary-200 dark:border-primary-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {Math.round((stats.total_time_spent || 0) / 60)} hrs
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.current_streak || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(((stats.completed_lessons || 0) / Math.max(stats.total_lessons || 1, 1)) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}