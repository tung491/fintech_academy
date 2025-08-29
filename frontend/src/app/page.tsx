'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { api } from '@/lib/api'
import { BookOpen, Clock, TrendingUp, Users } from 'lucide-react'

export default function HomePage() {
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get('/courses').then(res => res.data)
  })

  return (
    <div>
      <section className="text-center py-16 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white rounded-2xl mb-12">
        <h1 className="text-5xl font-bold mb-4">Master Finance & Accounting</h1>
        <p className="text-xl mb-8 text-primary-100 dark:text-primary-200">
          Comprehensive financial education designed specifically for developers
        </p>
        <Link href="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200 transition-colors inline-block">
          Start Learning Free
        </Link>
      </section>

      <section className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="card text-center">
          <BookOpen className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">12 Weeks</h3>
          <p className="text-gray-600 dark:text-gray-400">University-level content</p>
        </div>
        <div className="card text-center">
          <Clock className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Self-Paced</h3>
          <p className="text-gray-600 dark:text-gray-400">Learn at your own speed</p>
        </div>
        <div className="card text-center">
          <TrendingUp className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Practical</h3>
          <p className="text-gray-600 dark:text-gray-400">Real business applications</p>
        </div>
        <div className="card text-center">
          <Users className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">For Developers</h3>
          <p className="text-gray-600 dark:text-gray-400">Tailored for tech professionals</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Available Courses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {courses?.map((course: any) => (
            <div key={course.id} className="card hover:shadow-lg dark:hover:shadow-gray-900/25 transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-500">{course.week_count} weeks</span>
                <Link href={`/courses/${course.id}`} className="btn-primary">
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}