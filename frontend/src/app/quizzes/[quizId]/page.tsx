'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { 
  Clock, 
  Award, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  BarChart3
} from 'lucide-react'

interface Question {
  id: string
  question_text: string
  question_type: 'multiple_choice' | 'true_false' | 'essay'
  options: string[] | string
  correct_answer: string
  explanation: string
}

interface Quiz {
  id: string
  week_id: string
  title: string
  description: string
  question_count: number
  time_limit_minutes: number
  passing_score: number
  questions: Question[]
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.quizId as string
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  
  // Handle redirect on client side
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      router.push('/login')
    }
  }, [user, router])
  
  // Don't render anything if not logged in
  if (!user) {
    return null
  }

  const { data: quiz, isLoading, error } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      try {
        const response = await api.get(`/quizzes/${quizId}`)
        return response.data as Quiz
      } catch (error: any) {
        console.error('Failed to fetch quiz:', error)
        throw error
      }
    },
    enabled: !!quizId && !!user,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const submitQuizMutation = useMutation({
    mutationFn: (submissionData: { answers: Record<string, string> }) => 
      api.post(`/quizzes/${quizId}/submit`, submissionData),
    onSuccess: (response) => {
      console.log('Quiz submission successful:', response.data)
      setShowResults(true)
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
    onError: (error: any) => {
      console.error('Quiz submission failed:', error)
      console.error('Error response:', error?.response?.data)
      const errorMessage = error?.response?.data?.error || error?.message || 'Unknown error'
      alert(`Failed to submit quiz: ${errorMessage}`)
    }
  })

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmitQuiz = () => {
    console.log('handleSubmitQuiz called')
    console.log('Current answers:', answers)
    console.log('Quiz questions length:', quiz?.questions.length)
    console.log('Answers length:', Object.keys(answers).length)
    
    if (Object.keys(answers).length < (quiz?.questions.length || 0)) {
      alert('Please answer all questions before submitting.')
      return
    }
    
    console.log('Submitting quiz with data:', { answers })
    submitQuizMutation.mutate({ answers })
    setIsSubmitted(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  // Debug logging
  console.log('Quiz loading state:', isLoading)
  console.log('Quiz data:', quiz)
  console.log('Quiz error:', error)

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading quiz...</p>
      </div>
    )
  }

  if (error) {
    const errorMessage = (error as any)?.response?.data?.error || (error as any)?.message
    const isNotFound = (error as any)?.response?.status === 404
    
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {isNotFound ? 'Quiz Not Found' : 'Unable to Load Quiz'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {isNotFound 
            ? 'This quiz doesn\'t exist or you may not have access to it.'
            : 'There was an error loading this quiz. Please try again.'
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
              onClick={() => typeof window !== 'undefined' && window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          )}
          <button 
            onClick={() => router.back()} 
            className="btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quiz Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This quiz doesn't exist or you don't have access to it.
        </p>
        <button 
          onClick={() => router.back()} 
          className="btn-primary"
        >
          Go Back
        </button>
      </div>
    )
  }

  if (showResults) {
    const result = submitQuizMutation.data?.data
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="mb-6">
            {result?.passed ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            ) : (
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Quiz {result?.passed ? 'Passed!' : 'Not Passed'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You scored {result?.score}% ({result?.correctAnswers}/{result?.totalQuestions})
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result?.score}%
              </div>
              <div className="text-sm text-gray-500">Your Score</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {quiz.passing_score}%
              </div>
              <div className="text-sm text-gray-500">Passing Score</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result?.timeSpent || 'N/A'}
              </div>
              <div className="text-sm text-gray-500">Time Spent</div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => router.back()} 
              className="btn-primary"
            >
              Continue Learning
            </button>
            {!result?.passed && (
              <button 
                onClick={() => typeof window !== 'undefined' && window.location.reload()} 
                className="btn-secondary"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()} 
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {quiz.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {quiz.description}
          </p>
        </div>
        {quiz.time_limit_minutes && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4" />
            <span>{quiz.time_limit_minutes} min</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {currentQuestion.question_text}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.question_type === 'multiple_choice' && (
              (Array.isArray(currentQuestion.options) ? currentQuestion.options : JSON.parse(currentQuestion.options || '[]')).map((option, index) => (
                <label key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="text-primary-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))
            )}
            
            {currentQuestion.question_type === 'true_false' && (
              ['True', 'False'].map((option) => (
                <label key={option} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="text-primary-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))
            )}
            
            {currentQuestion.question_type === 'essay' && (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder="Enter your answer..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={5}
              />
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex gap-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium ${
                index === currentQuestionIndex
                  ? 'bg-primary-600 text-white'
                  : answers[quiz.questions[index].id]
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={isSubmitted || submitQuizMutation.isPending}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitQuizMutation.isPending ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === quiz.questions.length - 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}