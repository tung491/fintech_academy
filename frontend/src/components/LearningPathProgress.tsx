'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { CheckCircle, Circle, Lock, Star, Award, Clock } from 'lucide-react'
import Link from 'next/link'

interface WeekProgress {
  weekNumber: number
  title: string
  description: string
  estimatedHours: number
  lessonCount: number
  completedLessons: number
  quizCompleted: boolean
  quizScore?: number
  isUnlocked: boolean
  courseId: string
}

interface LearningPathProgressProps {
  courseId: string
  className?: string
}

export default function LearningPathProgress({ courseId, className = '' }: LearningPathProgressProps) {
  const { user } = useAuthStore()

  const { data: progressData, isLoading } = useQuery({
    queryKey: ['learning-path-progress', courseId],
    queryFn: async () => {
      const response = await api.get(`/courses/${courseId}/progress`)
      return response.data as WeekProgress[]
    },
    enabled: !!user && !!courseId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!progressData) {
    return null
  }

  const totalWeeks = progressData.length
  const completedWeeks = progressData.filter(week => 
    week.completedLessons === week.lessonCount && week.quizCompleted
  ).length
  const overallProgress = (completedWeeks / totalWeeks) * 100

  const getWeekStatus = (week: WeekProgress) => {
    if (!week.isUnlocked) return 'locked'
    if (week.completedLessons === week.lessonCount && week.quizCompleted) return 'completed'
    if (week.completedLessons > 0) return 'in-progress'
    return 'available'
  }

  const getStatusIcon = (status: string, quizScore?: number) => {
    switch (status) {
      case 'completed':
        const hasExcellentScore = quizScore && quizScore >= 90
        return hasExcellentScore ? 
          <Award className="w-5 h-5 text-yellow-500" /> : 
          <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <div className="w-5 h-5 border-2 border-blue-500 border-dashed rounded-full animate-pulse" />
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />
      default:
        return <Circle className="w-5 h-5 text-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'in-progress':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 'locked':
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700'
      default:
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Progress Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Learning Path Progress
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {completedWeeks} of {totalWeeks} weeks completed
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
              {Math.round(overallProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Week Progress Grid */}
      <div className="space-y-3">
        {progressData.map((week, index) => {
          const status = getWeekStatus(week)
          const isClickable = status !== 'locked'
          
          const content = (
            <div className={`
              flex items-center p-4 rounded-lg border transition-all duration-200
              ${getStatusColor(status)}
              ${isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed opacity-60'}
            `}>
              {/* Week Icon and Number */}
              <div className="flex items-center space-x-3 min-w-0">
                <div className="flex-shrink-0">
                  {getStatusIcon(status, week.quizScore)}
                </div>
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                    {week.weekNumber}
                  </span>
                </div>
              </div>

              {/* Week Info */}
              <div className="flex-1 ml-4 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {week.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {week.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4 text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {week.completedLessons}/{week.lessonCount} lessons
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {week.estimatedHours}h
                    </div>
                  </div>
                </div>

                {/* Lesson Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`
                        h-2 rounded-full transition-all duration-300
                        ${status === 'completed' 
                          ? 'bg-green-500' 
                          : status === 'in-progress' 
                          ? 'bg-blue-500' 
                          : 'bg-gray-300'
                        }
                      `}
                      style={{ 
                        width: `${(week.completedLessons / week.lessonCount) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Quiz Status */}
                {week.quizCompleted && (
                  <div className="mt-2 flex items-center text-xs">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Quiz completed
                      {week.quizScore && ` - ${week.quizScore}%`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )

          if (isClickable) {
            return (
              <Link
                key={week.weekNumber}
                href={`/courses/${week.courseId}/week/${week.weekNumber}`}
                className="block"
              >
                {content}
              </Link>
            )
          }

          return (
            <div key={week.weekNumber}>
              {content}
            </div>
          )
        })}
      </div>

      {/* Achievement Section */}
      {completedWeeks > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">
                Great Progress! 🎉
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                You've completed {completedWeeks} week{completedWeeks !== 1 ? 's' : ''} of financial education. 
                Keep up the excellent work!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}