'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, Clock, Trophy, TrendingUp, BarChart3, ArrowRight, PlayCircle, CheckCircle } from 'lucide-react'
import LearningPathProgress from '@/components/LearningPathProgress'

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

  const { data: lastAccessedData } = useQuery({
    queryKey: ['last-accessed'],
    queryFn: () => api.get('/progress/last-accessed').then(res => res.data),
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

      {/* Continue Learning Section */}
      {lastAccessedData?.lastAccessed && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Continue Learning</h2>
            <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
              {lastAccessedData.lastAccessed.completed ? 'Ready to Review' : 'In Progress'}
            </div>
          </div>
          <div className="relative card bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-300">
            {/* Enhanced visual accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l"></div>
            
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0 relative">
                  {lastAccessedData.lastAccessed.completed ? (
                    <div className="relative">
                      <CheckCircle className="w-14 h-14 text-green-500 drop-shadow-sm" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <PlayCircle className="w-14 h-14 text-blue-500 drop-shadow-sm animate-pulse" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">▶</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {lastAccessedData.lastAccessed.lesson_title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    {lastAccessedData.lastAccessed.course_title} • Week {lastAccessedData.lastAccessed.week_number}
                  </p>
                  
                  {/* Enhanced Progress indicator */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 shadow-sm ${
                          lastAccessedData.lastAccessed.completed 
                            ? 'bg-gradient-to-r from-green-400 to-green-500' 
                            : 'bg-gradient-to-r from-blue-400 to-purple-500'
                        }`}
                        style={{ width: `${Math.min(100, lastAccessedData.lastAccessed.progress_percentage)}%` }}
                      />
                    </div>
                    <div className={`text-sm font-medium px-2 py-1 rounded ${
                      lastAccessedData.lastAccessed.completed
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {lastAccessedData.lastAccessed.completed ? '100%' : `${Math.round(lastAccessedData.lastAccessed.progress_percentage)}%`}
                    </div>
                  </div>

                  {/* Enhanced metadata with better visual hierarchy */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-xs block">Time Spent</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{lastAccessedData.lastAccessed.time_spent_minutes} min</span>
                      </div>
                    </div>
                    {lastAccessedData.lastAccessed.duration_minutes && (
                      <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-lg">
                        <span className="w-4 h-4 text-purple-500 text-center">📚</span>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400 text-xs block">Total Duration</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{lastAccessedData.lastAccessed.duration_minutes} min</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-lg">
                      <span className="w-4 h-4 text-indigo-500 text-center">📅</span>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-xs block">Last Accessed</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{new Date(lastAccessedData.lastAccessed.last_accessed_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                href={lastAccessedData.lastAccessed.continue_url}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ml-4 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                  lastAccessedData.lastAccessed.completed
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                }`}
              >
                {lastAccessedData.lastAccessed.completed ? (
                  <>
                    Review Again
                    <span className="text-lg">🔄</span>
                  </>
                ) : (
                  <>
                    Continue Learning
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Learning Path Progress */}
      {enrollments?.length > 0 && (
        <LearningPathProgress 
          courseId={enrollments[0].course_id} 
          className="mt-8"
        />
      )}

      <div className="grid md:grid-cols-2 gap-8 mt-8">
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