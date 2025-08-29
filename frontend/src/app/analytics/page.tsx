'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Calendar,
  BookOpen,
  Trophy,
  Activity,
  Brain,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface AnalyticsData {
  totalStudyTime: number
  currentStreak: number
  longestStreak: number
  completedLessons: number
  totalLessons: number
  averageSessionTime: number
  weeklyProgress: Array<{
    week: string
    lessons: number
    time: number
  }>
  subjectProgress: Array<{
    subject: string
    progress: number
    timeSpent: number
  }>
  learningVelocity: Array<{
    date: string
    lessonsCompleted: number
    timeSpent: number
  }>
}

export default function AnalyticsPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()

  useEffect(() => {
    if (!user || !token) {
      router.push('/login')
      return
    }
  }, [user, token, router])

  const { data: analyticsData } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      try {
        const response = await api.get('/analytics/detailed')
        return response.data
      } catch (error) {
        // Return mock data if endpoint doesn't exist yet
        return {
          totalStudyTime: 0,
          currentStreak: 0,
          longestStreak: 0,
          completedLessons: 0,
          totalLessons: 24, // Assuming 24 total lessons across all weeks
          averageSessionTime: 0,
          weeklyProgress: Array.from({ length: 12 }, (_, i) => ({
            week: `Week ${i + 1}`,
            lessons: 0,
            time: 0
          })),
          subjectProgress: [
            { subject: 'Financial Fundamentals', progress: 0, timeSpent: 0 },
            { subject: 'Business Model Analysis', progress: 0, timeSpent: 0 },
            { subject: 'Cash Flow Management', progress: 0, timeSpent: 0 },
            { subject: 'Investment Strategies', progress: 0, timeSpent: 0 }
          ],
          learningVelocity: []
        } as AnalyticsData
      }
    },
    enabled: !!user && !!token
  })

  // Show loading while checking authentication
  if (!user || !token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Redirecting...</h1>
          <p className="text-gray-600 dark:text-gray-400">Please log in to access your analytics.</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading Analytics...</h1>
        </div>
      </div>
    )
  }

  const completionRate = Math.round((analyticsData.completedLessons / Math.max(analyticsData.totalLessons, 1)) * 100)
  const studyHours = Math.round(analyticsData.totalStudyTime / 60)

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Analytics</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Study Time</p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{studyHours}h</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Avg: {Math.round(analyticsData.averageSessionTime)} min/session
              </p>
            </div>
            <Clock className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Current Streak</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">{analyticsData.currentStreak}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                Best: {analyticsData.longestStreak} days
              </p>
            </div>
            <Trophy className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Completion Rate</p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{completionRate}%</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                {analyticsData.completedLessons} of {analyticsData.totalLessons} lessons
              </p>
            </div>
            <Target className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Learning Pace</p>
              <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                {analyticsData.learningVelocity.length > 0 ? 
                  Math.round(analyticsData.learningVelocity.slice(-7).reduce((acc, day) => acc + day.lessonsCompleted, 0) / 7 * 10) / 10 : 
                  '0'
                }
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                lessons/week avg
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Progress */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold">Weekly Progress</h2>
          </div>
          
          <div className="space-y-4">
            {analyticsData.weeklyProgress.map((week, index) => (
              <div key={week.week} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {week.week}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {week.lessons} lessons
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.round(week.time / 60)}h {week.time % 60}m
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((week.lessons / 2) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Mastery */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold">Subject Mastery</h2>
          </div>
          
          <div className="space-y-4">
            {analyticsData.subjectProgress.map((subject) => (
              <div key={subject.subject}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {subject.subject}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(subject.timeSpent / 60)}h
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400 w-12">
                    {subject.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Insights */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold">Learning Insights</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
              <ArrowUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Strong Areas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {analyticsData.subjectProgress
                .filter(s => s.progress > 50)
                .map(s => s.subject.split(' ')[0])
                .join(', ') || 'Keep learning to identify strengths'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-3">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Focus Areas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {analyticsData.subjectProgress
                .filter(s => s.progress < 25)
                .map(s => s.subject.split(' ')[0])
                .join(', ') || 'All areas progressing well'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Next Milestone</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {completionRate < 25 ? 'Complete Week 3' :
               completionRate < 50 ? 'Halfway Point' :
               completionRate < 75 ? 'Three Quarters Done' :
               completionRate < 100 ? 'Course Completion' :
               'Mastery Achieved!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}