'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import Link from 'next/link'
import { CheckCircle, Lock, ArrowRight, BookOpen, Clock, User } from 'lucide-react'

interface LearningPathProps {
  courseId?: string
  showRecommended?: boolean
}

interface Course {
  id: string
  title: string
  slug: string
  level: string
  duration: string
  estimatedHours: number
  instructor: string
  isPublished: boolean
  category?: {
    name: string
    color: string
    icon: string
  }
}

interface PrerequisiteCheck {
  canEnroll: boolean
  missingPrerequisites: Array<{
    id: string
    title: string
    slug: string
    isRequired: boolean
  }>
  completedPrerequisites: Array<{
    id: string
    title: string
    slug: string
    isRequired: boolean
  }>
}

interface RecommendedPath {
  completedCourses: number
  recommendedCourses: Course[]
  totalAvailable: number
}

export function LearningPath({ courseId, showRecommended = false }: LearningPathProps) {
  // Get prerequisites for specific course
  const { data: prerequisites } = useQuery({
    queryKey: ['course-prerequisites', courseId],
    queryFn: () => api.get(`/prerequisites/course/${courseId}`).then(res => res.data),
    enabled: !!courseId && !showRecommended
  })

  // Check prerequisite completion status
  const { data: prerequisiteCheck } = useQuery({
    queryKey: ['prerequisite-check', courseId],
    queryFn: () => api.get(`/prerequisites/check/${courseId}`).then(res => res.data),
    enabled: !!courseId && !showRecommended
  })

  // Get recommended learning path
  const { data: recommended } = useQuery({
    queryKey: ['recommended-learning-path'],
    queryFn: () => api.get('/prerequisites/recommended').then(res => res.data),
    enabled: showRecommended
  })

  if (showRecommended) {
    const recData = recommended as RecommendedPath
    
    if (!recData || recData.recommendedCourses.length === 0) {
      return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No recommendations available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete some courses to get personalized recommendations for your learning path.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Your Learning Journey
          </h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
            You've completed {recData.completedCourses} courses. Here are {recData.recommendedCourses.length} recommended next steps based on your progress.
          </p>
          
          <div className="grid gap-4">
            {recData.recommendedCourses.map((course, index) => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {course.title}
                        </h4>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{course.instructor}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{course.estimatedHours}h</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            course.level === 'beginner' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : course.level === 'intermediate'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {course.level}
                          </span>
                        </div>

                        {course.category && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            📂 {course.category.name}
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/courses/${course.id}`}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        View Course
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recData.totalAvailable > recData.recommendedCourses.length && (
            <div className="mt-4 text-center">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {recData.totalAvailable - recData.recommendedCourses.length} more courses available
              </p>
              <Link href="/courses" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View all courses
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Course-specific prerequisites view
  if (!prerequisites || prerequisites.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-green-800 dark:text-green-200 font-medium">
            No prerequisites required
          </span>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm mt-1">
          This course is open to all students regardless of prior experience.
        </p>
      </div>
    )
  }

  const check = prerequisiteCheck as PrerequisiteCheck
  const canEnroll = check?.canEnroll ?? false

  return (
    <div className="space-y-4">
      <div className={`rounded-lg p-4 ${
        canEnroll 
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
          : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
      }`}>
        <div className="flex items-start gap-3">
          {canEnroll ? (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
          ) : (
            <Lock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          )}
          
          <div>
            <h4 className={`font-semibold mb-2 ${
              canEnroll 
                ? 'text-green-900 dark:text-green-100' 
                : 'text-yellow-900 dark:text-yellow-100'
            }`}>
              {canEnroll ? 'Prerequisites Met' : 'Prerequisites Required'}
            </h4>
            
            <p className={`text-sm mb-3 ${
              canEnroll 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-yellow-800 dark:text-yellow-200'
            }`}>
              {canEnroll 
                ? 'You have completed all required prerequisites for this course.'
                : 'Complete the following courses before enrolling in this course.'
              }
            </p>

            {check?.completedPrerequisites && check.completedPrerequisites.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                  ✅ Completed Prerequisites:
                </p>
                <ul className="space-y-1">
                  {check.completedPrerequisites.map((prereq) => (
                    <li key={prereq.id} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <Link 
                        href={`/courses/${prereq.id}`}
                        className="text-green-700 dark:text-green-300 hover:underline"
                      >
                        {prereq.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {check?.missingPrerequisites && check.missingPrerequisites.length > 0 && (
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  📚 Required Prerequisites:
                </p>
                <ul className="space-y-2">
                  {check.missingPrerequisites.map((prereq) => (
                    <li key={prereq.id} className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-yellow-600" />
                      <Link 
                        href={`/courses/${prereq.id}`}
                        className="text-yellow-700 dark:text-yellow-300 hover:underline text-sm flex-1"
                      >
                        {prereq.title}
                      </Link>
                      <Link
                        href={`/courses/${prereq.id}`}
                        className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-xs font-medium transition-colors"
                      >
                        Start Course
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}