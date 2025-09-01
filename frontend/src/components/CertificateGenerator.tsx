'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Award, Download, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface CertificateGeneratorProps {
  courseId: string
  courseName: string
  onGenerated?: (certificateId: string) => void
}

interface CertificateEligibility {
  enrolled: boolean
  completed: boolean
  hasExistingCertificate: boolean
  canGenerateCertificate: boolean
  completedAt: string | null
  progressPercentage: number
}

export function CertificateGenerator({ courseId, courseName, onGenerated }: CertificateGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const queryClient = useQueryClient()

  // Check certificate eligibility
  const { data: eligibility, isLoading } = useQuery({
    queryKey: ['certificate-eligibility', courseId],
    queryFn: () => api.get(`/certificates/check/${courseId}`).then(res => res.data)
  })

  // Generate certificate mutation
  const generateCertificate = useMutation({
    mutationFn: () => api.post(`/certificates/generate/${courseId}`).then(res => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] })
      queryClient.invalidateQueries({ queryKey: ['certificate-eligibility', courseId] })
      onGenerated?.(data.certificate.id)
      setIsGenerating(false)
    },
    onError: (error) => {
      console.error('Error generating certificate:', error)
      setIsGenerating(false)
    }
  })

  const handleGenerateCertificate = async () => {
    setIsGenerating(true)
    generateCertificate.mutate()
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
        </div>
      </div>
    )
  }

  const elig = eligibility as CertificateEligibility

  if (!elig.enrolled) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <AlertCircle className="w-5 h-5" />
          <span>You need to be enrolled in this course to earn a certificate.</span>
        </div>
      </div>
    )
  }

  if (!elig.completed) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Certificate Available Upon Completion
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
              Complete all course requirements to earn your certificate for "{courseName}".
            </p>
            <div className="bg-blue-100 dark:bg-blue-800 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${elig.progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-xs">
              Progress: {Math.round(elig.progressPercentage)}% complete
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (elig.hasExistingCertificate) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              Certificate Earned!
            </h4>
            <p className="text-green-800 dark:text-green-200 text-sm mb-4">
              You have already earned a certificate for "{courseName}".
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => window.open('/certificates', '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                View Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (elig.canGenerateCertificate) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              Congratulations! 🎉
            </h4>
            <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-4">
              You have successfully completed "{courseName}" on {' '}
              {elig.completedAt && new Date(elig.completedAt).toLocaleDateString()}.
              Generate your certificate to showcase this achievement!
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={handleGenerateCertificate}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white rounded-lg transition-colors text-sm font-medium disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    Generate Certificate
                  </>
                )}
              </button>
            </div>

            {generateCertificate.error && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-400 text-sm">
                  Error generating certificate. Please try again.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
        <AlertCircle className="w-5 h-5" />
        <span>Certificate not available at this time.</span>
      </div>
    </div>
  )
}