'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Award, Download, ExternalLink } from 'lucide-react'
import { useParams } from 'next/navigation'

interface CertificateData {
  id: string
  issuedAt: string
  verificationCode: string
  course: {
    id: string
    title: string
    instructor: string
    duration: string
    estimatedHours: number
    level: string
    description: string
  }
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

export default function CertificateViewPage() {
  const params = useParams()
  const certificateId = params?.certificateId as string

  const { data: certificate, isLoading } = useQuery({
    queryKey: ['certificate', certificateId],
    queryFn: () => api.get(`/certificates/${certificateId}`).then(res => res.data),
    enabled: !!certificateId
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Certificate Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested certificate could not be found.
          </p>
        </div>
      </div>
    )
  }

  const cert = certificate as CertificateData
  const issuedDate = new Date(cert.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // This would generate a PDF in a real implementation
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .certificate-container { 
            box-shadow: none !important;
            border: 2px solid #d1d5db !important;
          }
        }
        @media screen {
          .print-only { display: none; }
        }
      `}</style>

      {/* Control Bar - Hidden in print */}
      <div className="no-print bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Certificate View
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Print/Download
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="certificate-container bg-white shadow-2xl rounded-lg p-12 border-4 border-gray-200">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Certificate of Completion
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
            </div>

            {/* Main Content */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-6">
                This is to certify that
              </p>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2 inline-block">
                {cert.user.firstName} {cert.user.lastName}
              </h2>
              
              <p className="text-lg text-gray-700 mb-4">
                has successfully completed the course
              </p>
              
              <h3 className="text-2xl font-semibold text-blue-600 mb-6">
                {cert.course.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
                <div className="text-left">
                  <p className="text-gray-600 mb-1"><strong>Instructor:</strong></p>
                  <p className="text-gray-900">{cert.course.instructor}</p>
                </div>
                <div className="text-left">
                  <p className="text-gray-600 mb-1"><strong>Duration:</strong></p>
                  <p className="text-gray-900">{cert.course.estimatedHours} hours</p>
                </div>
                <div className="text-left">
                  <p className="text-gray-600 mb-1"><strong>Level:</strong></p>
                  <p className="text-gray-900 capitalize">{cert.course.level}</p>
                </div>
                <div className="text-left">
                  <p className="text-gray-600 mb-1"><strong>Date Completed:</strong></p>
                  <p className="text-gray-900">{issuedDate}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-8">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <div className="border-b border-gray-400 w-48 mb-2"></div>
                  <p className="text-sm text-gray-600">FinAcademy</p>
                  <p className="text-xs text-gray-500">Financial Education Platform</p>
                </div>
                
                <div className="text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Official Seal</p>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-2">Verification Code:</p>
                  <p className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {cert.verificationCode}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Verify at finacademy.com/verify
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Note - Hidden in print */}
          <div className="no-print text-center mt-8 text-sm text-gray-500">
            <p>This certificate can be verified using the verification code above.</p>
            <p className="mt-2">
              <a href={`/certificates/verify/${cert.verificationCode}`} className="text-blue-600 hover:underline">
                Click here to verify this certificate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}