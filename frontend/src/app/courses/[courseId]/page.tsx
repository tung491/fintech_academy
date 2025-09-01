'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, Clock, PlayCircle, CheckCircle, Users, Award, User, Star, Tag, DollarSign } from 'lucide-react'

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const { user } = useAuthStore()
  
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => api.get(`/courses/${courseId}`).then(res => res.data),
    enabled: !!courseId
  })

  const formatPrice = (priceInCents: number | null) => {
    if (!priceInCents) return 'Free'
    return `$${(priceInCents / 100).toFixed(0)}`
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
        <p className="text-gray-600 dark:text-gray-400 mb-6">The course you're looking for doesn't exist.</p>
        <Link href="/courses" className="btn-primary">
          Back to Courses
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Course Header */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/courses" className="hover:text-primary-600 dark:hover:text-primary-400">
            Courses
          </Link>
          <span>•</span>
          <span className="text-gray-900 dark:text-white">{course.title}</span>
        </nav>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            {/* Course Category and Level */}
            <div className="flex items-center gap-4 mb-4">
              {course.category && (
                <span 
                  className="px-3 py-1 text-sm font-medium rounded-full text-white"
                  style={{ backgroundColor: course.category.color }}
                >
                  {course.category.icon} {course.category.name}
                </span>
              )}
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                <Star className="w-4 h-4 inline mr-1" />
                {course.level || 'Beginner'}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {course.shortDescription || course.description}
            </p>
            
            {/* Instructor Info */}
            {course.instructor && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {course.instructor}
                  </div>
                  {course.instructorBio && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {course.instructorBio.substring(0, 100)}...
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration || `${course.weeks?.length || 0} weeks`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{course.totalEstimatedHours || course.estimatedHours || 32}h total</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Self-paced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Certificate included</span>
              </div>
            </div>

            {/* Target Audience */}
            {course.targetAudience && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Who this course is for:
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  {course.targetAudience}
                </p>
              </div>
            )}
          </div>

          {/* Course Action Card */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <div className="text-center mb-6">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl"
                  style={{ backgroundColor: course.category?.color || '#3B82F6' }}
                >
                  {course.category?.icon || <BookOpen className="w-10 h-10" />}
                </div>
                
                {/* Pricing */}
                <div className="mb-4">
                  {course.originalPrice && course.originalPrice !== course.price ? (
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        {formatPrice(course.price)}
                      </div>
                      <div className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        {formatPrice(course.originalPrice)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {formatPrice(course.price)}
                    </div>
                  )}
                  
                  {course.originalPrice && course.originalPrice !== course.price && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Save {formatPrice(course.originalPrice - course.price)}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {course.price ? 'One-time purchase' : 'Full access to all course materials'}
                </p>
              </div>
              
              {user ? (
                <div className="space-y-3">
                  <Link 
                    href={`/courses/${courseId}/enroll`}
                    className="w-full btn-primary text-center inline-block"
                  >
                    Start Learning
                  </Link>
                  <Link 
                    href="/dashboard"
                    className="w-full btn-secondary text-center inline-block"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/register" className="w-full btn-primary text-center inline-block">
                    Sign Up to Start
                  </Link>
                  <Link href="/login" className="w-full btn-secondary text-center inline-block">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Course Curriculum */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Course Curriculum
          </h2>
          
          <div className="space-y-4">
            {course.weeks?.map((week: any, index: number) => (
              <div key={week.id} className="card">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      {week.weekNumber}
                    </span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {week.title.startsWith('Week') ? week.title : `Week ${week.weekNumber}: ${week.title}`}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {week.overview}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        <span>{week.lessonCount || 0} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{week.estimatedHours || 8} hours</span>
                      </div>
                    </div>
                  </div>
                  
                  {user ? (
                    <Link 
                      href={`/courses/${courseId}/week/${week.weekNumber}`}
                      className="btn-secondary text-sm flex-shrink-0 w-24"
                    >
                      Start Week
                    </Link>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Features */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* What You'll Learn */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What You'll Learn
              </h3>
              <div className="space-y-3">
                {course.skillsLearned && course.skillsLearned.length > 0 ? (
                  course.skillsLearned.map((skill: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {skill}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Master financial fundamentals for tech businesses
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Learn to read and analyze financial statements
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Understand cash flow and working capital management
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Make informed investment and funding decisions
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Prerequisites
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  • Basic understanding of business concepts
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • No prior finance experience required
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Willingness to learn and apply concepts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}