'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import Link from 'next/link'
import { Download, ExternalLink, Award, Calendar, Clock, User } from 'lucide-react'

interface Certificate {
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
  }
}

export default function CertificatesPage() {
  const { data: certificates, isLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => api.get('/certificates').then(res => res.data)
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Certificates
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your earned course completion certificates
        </p>
      </div>

      {!certificates || certificates.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            No certificates yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Complete courses to earn certificates and showcase your achievements
          </p>
          <Link
            href="/courses"
            className="btn-primary inline-flex items-center gap-2"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {certificates.map((certificate: Certificate) => (
            <div
              key={certificate.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/25 p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {certificate.course.title}
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="w-4 h-4" />
                          <span>{certificate.course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{certificate.course.estimatedHours} hours</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Earned {new Date(certificate.issuedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          certificate.course.level === 'beginner' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : certificate.course.level === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {certificate.course.level.charAt(0).toUpperCase() + certificate.course.level.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Verification: {certificate.verificationCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => window.open(`/certificates/view/${certificate.id}`, '_blank')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}