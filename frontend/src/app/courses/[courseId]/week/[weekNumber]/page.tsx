'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  ArrowLeft, 
  ArrowRight,
  FileText,
  Award,
  BarChart3
} from 'lucide-react'

export default function WeekPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const weekNumber = params.weekNumber as string
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [activeLesson, setActiveLesson] = useState<string | null>(null)
  
  // Redirect if not logged in
  if (!user) {
    router.push('/login')
    return null
  }

  const { data: weekData, isLoading, error } = useQuery({
    queryKey: ['week', courseId, weekNumber],
    queryFn: async () => {
      try {
        const response = await api.get(`/courses/${courseId}/week/${weekNumber}`)
        return response.data
      } catch (error: any) {
        console.error('Failed to fetch week data:', error)
        throw error
      }
    },
    enabled: !!courseId && !!weekNumber && !!user,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const { data: course } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      try {
        const response = await api.get(`/courses/${courseId}`)
        return response.data
      } catch (error: any) {
        console.error('Failed to fetch course data:', error)
        throw error
      }
    },
    enabled: !!courseId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const completeLessonMutation = useMutation({
    mutationFn: (lessonId: string) => 
      api.post(`/lessons/${lessonId}/complete`, { timeSpent: 30 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week', courseId, weekNumber] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    }
  })

  const handleCompleteLesson = (lessonId: string) => {
    completeLessonMutation.mutate(lessonId)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading week content...</p>
      </div>
    )
  }

  if (error) {
    const errorMessage = (error as any)?.response?.data?.error || (error as any)?.message
    const isNotFound = (error as any)?.response?.status === 404
    
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {isNotFound ? 'Week Not Found' : 'Unable to Load Week Content'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {isNotFound 
            ? 'This week doesn\'t exist or you may need to enroll in the course first.'
            : 'There was an error loading this week. Please try again.'
          }
        </p>
        {errorMessage && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-6">
            Error: {errorMessage}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          {!isNotFound && (
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          )}
          <Link href={`/courses/${courseId}/enroll`} className="btn-primary">
            Enroll in Course
          </Link>
          <Link href={`/courses/${courseId}`} className="btn-secondary">
            Back to Course
          </Link>
        </div>
      </div>
    )
  }

  if (!weekData) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Week Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This week doesn't exist or you don't have access to it.
        </p>
        <Link href={`/courses/${courseId}`} className="btn-primary">
          Back to Course
        </Link>
      </div>
    )
  }

  const currentWeekNum = parseInt(weekNumber)
  const totalWeeks = course?.weeks?.length || 12

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/courses" className="hover:text-primary-600 dark:hover:text-primary-400">
          Courses
        </Link>
        <span>•</span>
        <Link href={`/courses/${courseId}`} className="hover:text-primary-600 dark:hover:text-primary-400">
          {course?.title || 'Course'}
        </Link>
        <span>•</span>
        <span className="text-gray-900 dark:text-white">Week {weekNumber}</span>
      </nav>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Week Header */}
          <div className="card mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Week {weekData.weekNumber}: {weekData.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {weekData.overview}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{weekData.estimated_hours || 8}h</span>
              </div>
            </div>

            {/* Learning Objectives */}
            {weekData.learning_objectives && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Learning Objectives
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {JSON.parse(weekData.learning_objectives).map((objective: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {objective}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lessons */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Lessons ({weekData.lessons?.length || 0})
            </h2>
            
            {weekData.lessons?.map((lesson: any, index: number) => (
              <div key={lesson.id} className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      {index + 1}
                    </span>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{lesson.lesson_type}</span>
                          </div>
                          {lesson.duration_minutes && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.duration_minutes} min</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {lesson.progress?.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                        ) : (
                          <button
                            onClick={() => handleCompleteLesson(lesson.id)}
                            className="btn-secondary text-sm"
                            disabled={completeLessonMutation.isPending}
                          >
                            {completeLessonMutation.isPending ? 'Completing...' : 'Mark Complete'}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {activeLesson === lesson.id && lesson.content && (
                      <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300">
                          <ReactMarkdown>{lesson.content}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
                      className="mt-3 flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      <PlayCircle className="w-4 h-4" />
                      {activeLesson === lesson.id ? 'Hide Content' : 'View Lesson Content'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quiz Section */}
          {weekData.quiz && (
            <div className="card mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {weekData.quiz.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {weekData.quiz.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{weekData.quiz.question_count} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      <span>{weekData.quiz.passing_score}% to pass</span>
                    </div>
                    {weekData.quiz.time_limit_minutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{weekData.quiz.time_limit_minutes} min</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link 
                  href={`/quizzes/${weekData.quiz.id}`}
                  className="btn-primary"
                >
                  Take Quiz
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Week Navigation */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Week Navigation
              </h3>
              <div className="flex flex-col gap-2">
                {currentWeekNum > 1 && (
                  <Link 
                    href={`/courses/${courseId}/week/${currentWeekNum - 1}`}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous Week
                  </Link>
                )}
                {currentWeekNum < totalWeeks && (
                  <Link 
                    href={`/courses/${courseId}/week/${currentWeekNum + 1}`}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    Next Week
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link 
                  href={`/courses/${courseId}`}
                  className="btn-secondary text-center"
                >
                  Back to Course
                </Link>
              </div>
            </div>

            {/* Progress */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Progress
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Lessons Completed</span>
                    <span className="text-gray-900 dark:text-white">
                      {weekData.lessons?.filter((l: any) => l.progress?.completed).length || 0}/{weekData.lessons?.length || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full"
                      style={{ 
                        width: `${((weekData.lessons?.filter((l: any) => l.progress?.completed).length || 0) / (weekData.lessons?.length || 1)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center pt-2">
                  <Link href="/dashboard" className="text-primary-600 dark:text-primary-400 hover:underline text-sm">
                    View Full Progress
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}