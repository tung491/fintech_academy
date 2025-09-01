'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Award, CheckCircle, XCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

interface VerificationResult {
  valid: boolean
  certificate?: {
    id: string
    issuedAt: string
    verificationCode: string
    course: {
      title: string
      instructor: string
      duration: string
      estimatedHours: number
      level: string
    }
    student: {
      name: string
    }
  }
}

export default function CertificateVerificationPage() {
  const params = useParams()
  const verificationCode = params?.verificationCode as string

  const { data: result, isLoading, error } = useQuery({
    queryKey: ['verify-certificate', verificationCode],
    queryFn: () => api.get(`/certificates/verify/${verificationCode}`).then(res => res.data),
    enabled: !!verificationCode,
    retry: false
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Verifying certificate...
          </p>
        </div>
      </div>
    )
  }

  const verification = result as VerificationResult
  const isValid = verification?.valid && verification?.certificate

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Certificate Verification
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Verification Code: <span className="font-mono font-semibold">{verificationCode}</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {error || !isValid ? (
            <div className="text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                Invalid Certificate
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The verification code provided is not valid or the certificate could not be found.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-700 dark:text-red-400">
                  Please check the verification code and try again. If you believe this is an error, 
                  please contact our support team.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  Valid Certificate
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  This certificate has been successfully verified.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {verification.certificate.course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Course completion certificate
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Student</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {verification.certificate.student.name}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Instructor</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {verification.certificate.course.instructor}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Duration</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {verification.certificate.course.estimatedHours} hours
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Level</h4>
                    <p className="text-gray-600 dark:text-gray-400 capitalize">
                      {verification.certificate.course.level}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Date Issued</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(verification.certificate.issuedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Verification Code</h4>
                    <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                      {verification.certificate.verificationCode}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>This certificate was issued by FinAcademy and is officially verified.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Return to FinAcademy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}