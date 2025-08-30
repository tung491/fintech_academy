'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, Clock, Users, Star, ArrowRight, Tag, DollarSign, User, Award } from 'lucide-react'
import { useState } from 'react'

export default function CoursesPage() {
  const { user } = useAuthStore()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get('/courses').then(res => res.data)
  })

  const { data: categories } = useQuery({
    queryKey: ['course-categories'],
    queryFn: () => api.get('/courses/categories').then(res => res.data)
  })

  // Filter courses by selected category
  const filteredCourses = selectedCategory 
    ? courses?.filter((course: any) => course.category?.slug === selectedCategory)
    : courses

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

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Financial Education for Developers
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Transform your technical skills into business success with courses designed specifically for developers, 
          freelancers, and tech entrepreneurs.
        </p>
      </div>

      {/* Category Filter */}
      {categories && categories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              All Courses
            </button>
            {categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-8 mb-12">
        {filteredCourses?.map((course: any) => (
          <div key={course.id} className="card hover:shadow-lg dark:hover:shadow-gray-900/25 transition-all duration-200">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Course Icon/Image */}
              <div className="flex-shrink-0">
                <div 
                  className="w-24 h-24 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: course.category?.color || '#3B82F6' }}
                >
                  {course.category?.icon || <BookOpen className="w-12 h-12" />}
                </div>
              </div>

              {/* Course Content */}
              <div className="flex-grow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    {/* Course Category Badge */}
                    {course.category && (
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="px-2 py-1 text-xs font-medium rounded-full text-white"
                          style={{ backgroundColor: course.category.color }}
                        >
                          {course.category.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {course.level}
                        </span>
                      </div>
                    )}
                    
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {course.shortDescription || course.description}
                    </p>
                    
                    {/* Instructor Info */}
                    {course.instructor && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <User className="w-4 h-4" />
                        <span>by {course.instructor}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Course Stats */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration || `${course.weekCount} weeks`}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{course.totalEstimatedHours}h total</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="capitalize">{course.level}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Skills */}
                {course.skillsLearned && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What you'll learn:</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {(() => {
                        // Parse skillsLearned if it's a string
                        let skills = [];
                        try {
                          if (typeof course.skillsLearned === 'string') {
                            skills = JSON.parse(course.skillsLearned);
                          } else if (Array.isArray(course.skillsLearned)) {
                            skills = course.skillsLearned;
                          }
                        } catch (error) {
                          console.error('Error parsing skillsLearned:', error);
                          skills = [];
                        }
                        
                        return skills.slice(0, 4).map((skill: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm">{skill}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* Course Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {course.originalPrice && course.originalPrice !== course.price ? (
                        <>
                          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {formatPrice(course.price)}
                          </span>
                          <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                            {formatPrice(course.originalPrice)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {formatPrice(course.price)}
                        </span>
                      )}
                    </div>
                    
                    {course.targetAudience && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 hidden lg:block">
                        • {course.targetAudience.split(',')[0]}
                      </span>
                    )}
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

      {/* Course Statistics */}
      {courses && courses.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {courses.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Expert-Designed Courses
            </div>
          </div>
          
          <div className="text-center card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {courses.reduce((total: number, course: any) => total + (course.totalEstimatedHours || 0), 0)}h
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Total Learning Content
            </div>
          </div>
          
          <div className="text-center card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {categories?.length || 4}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Specialized Tracks
            </div>
          </div>
        </div>
      )}

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