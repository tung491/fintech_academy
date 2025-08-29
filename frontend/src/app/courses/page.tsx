'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, Clock, Users, Star, ArrowRight } from 'lucide-react'

export default function CoursesPage() {
  const { user } = useAuthStore()
  
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get('/courses').then(res => res.data)
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Financial Education Courses
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Master the financial skills you need to successfully run your own business. 
          Each course is designed specifically for developers and tech professionals.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        {courses?.map((course: any) => (
          <div key={course.id} className="card hover:shadow-lg dark:hover:shadow-gray-900/25 transition-all duration-200">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Course Icon/Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Course Content */}
              <div className="flex-grow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                  
                  {/* Course Stats */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.week_count} weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Self-paced</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Beginner</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What you'll learn:</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      <span>Financial fundamentals for developers</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      <span>Business model analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      <span>Cash flow management</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      <span>Investment and funding strategies</span>
                    </div>
                  </div>
                </div>

                {/* Course Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">Free</span>
                    <span className="text-gray-500 dark:text-gray-400">• No prerequisites</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/courses/${course.id}`}
                      className="btn-secondary flex items-center gap-2"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    
                    {user ? (
                      <Link 
                        href={`/courses/${course.id}/enroll`}
                        className="btn-primary flex items-center gap-2"
                      >
                        Start Learning
                        <BookOpen className="w-4 h-4" />
                      </Link>
                    ) : (
                      <Link 
                        href="/register"
                        className="btn-primary flex items-center gap-2"
                      >
                        Sign Up to Start
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="text-center card bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Master Business Finance?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Join thousands of developers who have transformed their technical skills into successful businesses. 
          Start your financial education journey today.
        </p>
        {!user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary">
              Create Free Account
            </Link>
            <Link href="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
        ) : (
          <Link href="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  )
}