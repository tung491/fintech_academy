'use client'

import { LearningPath } from '@/components/LearningPath'
import { BulkEnrollment } from '@/components/BulkEnrollment'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Map, BookOpen, Award, TrendingUp } from 'lucide-react'

interface CourseCategory {
  id: string
  name: string
  slug: string
  color: string
  icon: string
  courses: Course[]
}

interface Course {
  id: string
  title: string
  level: string
  duration: string
  estimatedHours: number
  prerequisites: Array<{
    prerequisite: {
      title: string
    }
  }>
}

export default function LearningPathsPage() {
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get('/courses').then(res => res.data)
  })

  const { data: categories } = useQuery({
    queryKey: ['course-categories'],
    queryFn: () => api.get('/courses/categories').then(res => res.data)
  })

  // Define learning track courses
  const foundationTrackCourses = [
    {
      id: 'cmexeuw0v0002vb2ampmo9m5w',
      title: 'Financial and Accounting Knowledge for Developers',
      level: 'beginner',
      duration: '12 weeks',
      estimatedHours: 96,
      instructor: 'Sarah Chen, CPA, MBA'
    },
    {
      id: 'cmeyamssd0001vb5k8bihvwz2',
      title: 'Business Structure & Legal Foundations',
      level: 'beginner',
      duration: '3 weeks',
      estimatedHours: 24,
      instructor: 'Michael Chen, JD, MBA'
    },
    {
      id: 'cmeyb9ts40001vbp4wq1pp0ca',
      title: 'Personal Finance for Tech Professionals',
      level: 'beginner',
      duration: '4 weeks',
      estimatedHours: 40,
      instructor: 'Sarah Johnson, CFP, CPA'
    }
  ]

  const accountingTrackCourses = [
    {
      id: 'cmeyix5330001vbn4gdv7g3rg',
      title: 'Bookkeeping Fundamentals for Tech Businesses',
      level: 'intermediate',
      duration: '5 weeks',
      estimatedHours: 40,
      instructor: 'Maria Rodriguez, CPA, CMA'
    },
    {
      id: 'cmeyjz5rl0001vbb1ywfcpg9n',
      title: 'Financial Statement Analysis for Founders',
      level: 'intermediate',
      duration: '4 weeks',
      estimatedHours: 32,
      instructor: 'Jennifer Chen, CPA, CFA'
    },
    {
      id: 'cmeyk9sd50001vbg6er1wrq9i',
      title: 'Advanced Accounting for SaaS Businesses',
      level: 'advanced',
      duration: '6 weeks',
      estimatedHours: 8,
      instructor: 'David Kim, CPA, MBA'
    }
  ]

  const taxTrackCourses = [
    {
      id: 'cmeykv5bp0002vbzuzov1uk0c',
      title: 'Tax Fundamentals for Freelance Developers',
      level: 'intermediate',
      duration: '4 weeks',
      estimatedHours: 32,
      instructor: 'Sarah Martinez, CPA, EA'
    },
    {
      id: 'cmeylq3lc0001vbzv007rb9qv',
      title: 'Small Business Tax Strategy',
      level: 'intermediate',
      duration: '5 weeks',
      estimatedHours: 8,
      instructor: 'Michael Chen, CPA, MST'
    },
    {
      id: 'cmeym4zgj0001vby0jb9ytajs',
      title: 'Advanced Tax Planning for High Earners',
      level: 'advanced',
      duration: '4 weeks',
      estimatedHours: 32,
      instructor: 'Jennifer Walsh, CPA, CFP, MST'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Map className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Paths
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover structured learning journeys tailored to your goals and experience level
        </p>
      </div>

      {/* Recommended Path Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recommended for You
          </h2>
        </div>
        <LearningPath showRecommended={true} />
      </div>

      {/* Learning Tracks */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Learning Tracks
          </h2>
        </div>
        
        <div className="grid gap-8">
          {/* Foundation Track */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Foundation Track
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Perfect for beginners - start your financial education journey
                </p>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Financial and Accounting Knowledge for Developers
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    12 weeks • Beginner • No prerequisites
                  </p>
                </div>
                <div className="text-green-600 dark:text-green-400">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Business Structure & Legal Foundations
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    3 weeks • Beginner • No prerequisites
                  </p>
                </div>
                <div className="text-green-600 dark:text-green-400">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Personal Finance for Tech Professionals
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    4 weeks • Beginner • No prerequisites
                  </p>
                </div>
                <div className="text-green-600 dark:text-green-400">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            {/* Foundation Track Enrollment */}
            <BulkEnrollment 
              courses={foundationTrackCourses}
              trackId="foundation"
              trackName="Foundation Track"
            />
          </div>

          {/* Accounting Track */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Accounting & Bookkeeping Track
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Build expertise in business accounting and financial management
                </p>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-sm font-semibold text-green-600 dark:text-green-400">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Bookkeeping Fundamentals for Tech Businesses
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    5 weeks • Intermediate • Requires Foundation knowledge
                  </p>
                </div>
                <div className="text-orange-500">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-sm font-semibold text-green-600 dark:text-green-400">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Financial Statement Analysis for Founders
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    4 weeks • Intermediate • Requires Bookkeeping Fundamentals
                  </p>
                </div>
                <div className="text-orange-500">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-sm font-semibold text-green-600 dark:text-green-400">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Advanced Accounting for SaaS Businesses
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    6 weeks • Advanced • Requires Financial Statement Analysis
                  </p>
                </div>
                <div className="text-red-500">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            {/* Accounting Track Enrollment */}
            <BulkEnrollment 
              courses={accountingTrackCourses}
              trackId="accounting"
              trackName="Accounting & Bookkeeping Track"
            />
          </div>

          {/* Tax Track */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tax Specialization Track
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Master tax strategies for freelancers, businesses, and high earners
                </p>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Tax Fundamentals for Freelance Developers
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    4 weeks • Intermediate • Requires Personal Finance knowledge
                  </p>
                </div>
                <div className="text-orange-500">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Small Business Tax Strategy
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    5 weeks • Intermediate • Requires Tax Fundamentals
                  </p>
                </div>
                <div className="text-orange-500">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Advanced Tax Planning for High Earners
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    4 weeks • Advanced • Requires Business Tax Strategy
                  </p>
                </div>
                <div className="text-red-500">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            {/* Tax Track Enrollment */}
            <BulkEnrollment 
              courses={taxTrackCourses}
              trackId="tax"
              trackName="Tax Specialization Track"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Ready to Start Your Learning Journey?</h3>
        <p className="text-blue-100 mb-6">
          Choose a track that matches your goals or get personalized recommendations based on your current knowledge.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/courses" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Browse All Courses
          </a>
          <a href="/dashboard" className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg font-semibold transition-colors">
            View Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}