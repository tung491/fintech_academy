'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ShoppingCart, Users, CheckCircle, AlertTriangle, BookOpen, Clock } from 'lucide-react'

interface BulkEnrollmentProps {
  courses?: Array<{
    id: string
    title: string
    level: string
    duration: string
    estimatedHours: number
    instructor: string
  }>
  trackId?: string
  trackName?: string
}

interface EnrollmentResult {
  message: string
  enrollments: Array<{
    courseId: string
    course: {
      title: string
      level: string
      estimatedHours: number
    }
  }>
  skippedCourses?: {
    count: number
    message: string
  }
  prerequisiteWarnings?: {
    count: number
    message: string
  }
}

interface PrerequisiteIssue {
  courseId: string
  courseTitle: string
  missingPrerequisites: Array<{
    id: string
    title: string
  }>
}

export function BulkEnrollment({ courses, trackId, trackName }: BulkEnrollmentProps) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [prerequisiteIssues, setPrerequisiteIssues] = useState<PrerequisiteIssue[]>([])
  const [showPrerequisiteWarning, setShowPrerequisiteWarning] = useState(false)
  const queryClient = useQueryClient()

  // Get enrollment status for courses
  const { data: enrollmentStatus } = useQuery({
    queryKey: ['enrollment-status', courses?.map(c => c.id)],
    queryFn: () => api.post('/enrollment/status', { 
      courseIds: courses?.map(c => c.id) || [] 
    }).then(res => res.data),
    enabled: !!courses && courses.length > 0
  })

  // Bulk enrollment mutation
  const bulkEnrollMutation = useMutation({
    mutationFn: (data: { courseIds: string[], ignorePrerequisites?: boolean }) => 
      api.post('/enrollment/bulk', data).then(res => res.data),
    onSuccess: (data: EnrollmentResult) => {
      queryClient.invalidateQueries({ queryKey: ['enrollment-status'] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      setSelectedCourses([])
      setPrerequisiteIssues([])
      setShowPrerequisiteWarning(false)
    },
    onError: (error: any) => {
      if (error.response?.data?.prerequisiteIssues) {
        setPrerequisiteIssues(error.response.data.prerequisiteIssues)
        setShowPrerequisiteWarning(true)
      }
    }
  })

  // Track enrollment mutation
  const trackEnrollMutation = useMutation({
    mutationFn: (trackId: string) => 
      api.post(`/enrollment/track/${trackId}`).then(res => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['enrollment-status'] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    }
  })

  const handleCourseSelect = (courseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses([...selectedCourses, courseId])
    } else {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId))
    }
  }

  const handleSelectAll = () => {
    if (!courses) return
    
    const availableCourses = courses.filter(course => {
      const status = enrollmentStatus?.enrollmentStatus?.find(s => s.courseId === course.id)
      return !status?.isEnrolled
    })
    
    if (selectedCourses.length === availableCourses.length) {
      setSelectedCourses([])
    } else {
      setSelectedCourses(availableCourses.map(c => c.id))
    }
  }

  const handleBulkEnroll = () => {
    bulkEnrollMutation.mutate({ 
      courseIds: selectedCourses,
      ignorePrerequisites: false
    })
  }

  const handleEnrollWithPrerequisites = () => {
    bulkEnrollMutation.mutate({
      courseIds: selectedCourses,
      ignorePrerequisites: true
    })
  }

  const handleTrackEnrollment = () => {
    if (trackId) {
      trackEnrollMutation.mutate(trackId)
    }
  }

  if (!courses || courses.length === 0) {
    return null
  }

  const availableCourses = courses.filter(course => {
    const status = enrollmentStatus?.enrollmentStatus?.find(s => s.courseId === course.id)
    return !status?.isEnrolled
  })

  const enrolledCount = courses.length - availableCourses.length

  return (
    <div className="space-y-6">
      {/* Track Enrollment Option */}
      {trackId && trackName && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Enroll in Complete {trackName}
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
                  Get the full learning experience by enrolling in all {courses.length} courses in this track.
                  Perfect for structured learning with proper skill progression.
                </p>
                
                <div className="flex items-center gap-4 text-sm text-blue-700 dark:text-blue-300">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{courses.length} courses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{courses.reduce((sum, c) => sum + c.estimatedHours, 0)} hours total</span>
                  </div>
                  {enrolledCount > 0 && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{enrolledCount} already enrolled</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleTrackEnrollment}
              disabled={trackEnrollMutation.isPending || availableCourses.length === 0}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
            >
              {trackEnrollMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                  Enrolling...
                </div>
              ) : availableCourses.length === 0 ? (
                'All Enrolled'
              ) : (
                `Enroll in ${availableCourses.length} Courses`
              )}
            </button>
          </div>
        </div>
      )}

      {/* Individual Course Selection */}
      {availableCourses.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Individual Courses
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {selectedCourses.length === availableCourses.length ? 'Deselect All' : 'Select All'}
              </button>
              
              {selectedCourses.length > 0 && (
                <button
                  onClick={handleBulkEnroll}
                  disabled={bulkEnrollMutation.isPending}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                >
                  {bulkEnrollMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                      Enrolling...
                    </div>
                  ) : (
                    `Enroll in ${selectedCourses.length} Selected`
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {availableCourses.map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  id={course.id}
                  checked={selectedCourses.includes(course.id)}
                  onChange={(e) => handleCourseSelect(course.id, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                
                <label htmlFor={course.id} className="flex-1 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {course.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>by {course.instructor}</span>
                        <span>{course.duration}</span>
                        <span>{course.estimatedHours}h</span>
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
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {selectedCourses.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Selected {selectedCourses.length} out of {availableCourses.length} available courses
              </p>
            </div>
          )}
        </div>
      )}

      {/* Prerequisite Warning Modal */}
      {showPrerequisiteWarning && prerequisiteIssues.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                Prerequisites Not Met
              </h4>
              <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-4">
                Some courses have unmet prerequisites. You can still enroll, but you may find the content challenging without the foundational knowledge.
              </p>

              <div className="space-y-3 mb-4">
                {prerequisiteIssues.map((issue) => (
                  <div key={issue.courseId} className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-3">
                    <h5 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                      {issue.courseTitle}
                    </h5>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                      Missing prerequisites:
                    </p>
                    <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300">
                      {issue.missingPrerequisites.map((prereq) => (
                        <li key={prereq.id}>{prereq.title}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPrerequisiteWarning(false)}
                  className="px-4 py-2 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnrollWithPrerequisites}
                  disabled={bulkEnrollMutation.isPending}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors disabled:bg-yellow-400 disabled:cursor-not-allowed"
                >
                  {bulkEnrollMutation.isPending ? 'Enrolling...' : 'Enroll Anyway'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {bulkEnrollMutation.isSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-200 font-medium">
              {bulkEnrollMutation.data.message}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {bulkEnrollMutation.isError && !showPrerequisiteWarning && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-red-800 dark:text-red-200 font-medium">
              Failed to enroll in courses. Please try again.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}