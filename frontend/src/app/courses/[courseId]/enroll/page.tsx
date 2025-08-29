'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { CheckCircle, BookOpen, Clock, Users, Award, ArrowLeft } from 'lucide-react'

export default function EnrollPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [isEnrolling, setIsEnrolling] = useState(false)
  
  // Redirect if not logged in
  if (!user) {
    router.push('/login')
    return null
  }

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => api.get(`/courses/${courseId}`).then(res => res.data),
    enabled: !!courseId
  })

  const enrollMutation = useMutation({
    mutationFn: () => api.post(`/courses/${courseId}/enroll`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
      router.push(`/courses/${courseId}/week/1`)
    },
    onError: (error: any) => {
      console.error('Enrollment failed:', error)
    }
  })

  const handleEnroll = async () => {
    setIsEnrolling(true)
    try {
      await enrollMutation.mutateAsync()
    } catch (error) {
      setIsEnrolling(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The course you're trying to enroll in doesn't exist.</p>
        <Link href="/courses" className="btn-primary">
          Back to Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/courses" className="hover:text-primary-600 dark:hover:text-primary-400">
          Courses
        </Link>
        <span>•</span>
        <Link href={`/courses/${courseId}`} className="hover:text-primary-600 dark:hover:text-primary-400">
          {course.title}
        </Link>
        <span>•</span>
        <span className="text-gray-900 dark:text-white">Enroll</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Enroll in Course
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          You're about to start your financial education journey!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Course Summary */}
        <div>
          <div className="card mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {course.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {course.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{course.weeks?.length || 0} weeks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>Self-paced</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Award className="w-4 h-4" />
                <span>Certificate</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <BookOpen className="w-4 h-4" />
                <span>Free Course</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Course Includes:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {course.weeks?.length || 0} weeks of comprehensive content
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Interactive quizzes and assessments
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Progress tracking and certificates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Lifetime access to course materials
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Mobile and desktop compatibility
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Card */}
        <div>
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Learning?
            </h2>
            
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span className="font-semibold text-green-800 dark:text-green-300">
                  Free Enrollment
                </span>
              </div>
              <p className="text-green-700 dark:text-green-400 text-sm">
                This course is completely free. No credit card required.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                What happens after enrollment:
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• Instant access to all course materials</p>
                <p>• Your progress will be automatically tracked</p>
                <p>• You can start with Week 1 immediately</p>
                <p>• Course will appear in your dashboard</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleEnroll}
                disabled={isEnrolling || enrollMutation.isPending}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEnrolling || enrollMutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Enrolling...
                  </div>
                ) : (
                  'Enroll Now - Free'
                )}
              </button>

              <Link 
                href={`/courses/${courseId}`}
                className="w-full btn-secondary text-center inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Course Details
              </Link>
            </div>

            {enrollMutation.isError && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm">
                Enrollment failed. You may already be enrolled in this course.
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="card mt-6 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Enrolling as:
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}