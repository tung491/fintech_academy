'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Calendar, Target, Award, Clock, BookOpen, Brain } from 'lucide-react'

interface ProgressAnalyticsProps {
  stats: any
  recentActivity: any[]
  enrollments: any[]
}

interface ChartData {
  label: string
  value: number
  color: string
}

function SimpleBarChart({ data, title }: { data: ChartData[], title: string }) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        {title}
      </h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LearningStreak({ stats }: { stats: any }) {
  // Mock streak data - in real app this would come from API
  const currentStreak = stats.current_streak || 0
  const longestStreak = stats.longest_streak || 0
  const daysThisWeek = stats.active_days_this_week || 0
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        Learning Streaks
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{currentStreak}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Current</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{longestStreak}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Longest</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{daysThisWeek}/7</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">This Week</div>
        </div>
      </div>
      
      {/* Weekly progress dots */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>This Week</span>
          <span>{daysThisWeek} days active</span>
        </div>
        <div className="flex gap-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <div key={index} className="flex-1 text-center">
              <div className="text-xs text-gray-400 mb-1">{day}</div>
              <div className={`w-3 h-3 mx-auto rounded-full ${
                index < daysThisWeek 
                  ? 'bg-green-500 dark:bg-green-400' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillProgress({ enrollments }: { enrollments: any[] }) {
  const skills = [
    { name: 'Financial Literacy', progress: 75, color: '#3B82F6' },
    { name: 'Business Analysis', progress: 45, color: '#10B981' },
    { name: 'Investment Planning', progress: 30, color: '#F59E0B' },
    { name: 'Tax Planning', progress: 15, color: '#EF4444' }
  ]
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Skill Development
      </h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{skill.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${skill.progress}%`,
                  backgroundColor: skill.color
                }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {skill.progress < 25 ? 'Beginner' : 
               skill.progress < 50 ? 'Learning' :
               skill.progress < 75 ? 'Intermediate' : 'Advanced'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StudyTimeAnalysis({ recentActivity, stats }: { recentActivity: any[], stats: any }) {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week')
  
  // Mock data for time analysis
  const weeklyData = [
    { label: 'Mon', value: 45, color: '#3B82F6' },
    { label: 'Tue', value: 30, color: '#3B82F6' },
    { label: 'Wed', value: 60, color: '#3B82F6' },
    { label: 'Thu', value: 0, color: '#3B82F6' },
    { label: 'Fri', value: 75, color: '#3B82F6' },
    { label: 'Sat', value: 90, color: '#3B82F6' },
    { label: 'Sun', value: 30, color: '#3B82F6' }
  ]
  
  const monthlyData = [
    { label: 'Week 1', value: 240, color: '#10B981' },
    { label: 'Week 2', value: 180, color: '#10B981' },
    { label: 'Week 3', value: 300, color: '#10B981' },
    { label: 'Week 4', value: 210, color: '#10B981' }
  ]
  
  const data = timeframe === 'week' ? weeklyData : monthlyData
  const totalTime = data.reduce((sum, item) => sum + item.value, 0)
  const avgTime = Math.round(totalTime / data.length)
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Study Time Analysis
        </h3>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              timeframe === 'week' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              timeframe === 'month' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{totalTime}m</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{avgTime}m</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Average</div>
        </div>
      </div>
      
      <SimpleBarChart data={data} title="" />
    </div>
  )
}

function Achievements({ stats }: { stats: any }) {
  const achievements = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'First Lesson',
      description: 'Completed your first lesson',
      earned: true,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Week Warrior',
      description: 'Complete 7 lessons in a week',
      earned: (stats.completed_lessons || 0) >= 7,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Time Master',
      description: 'Study for 10 hours total',
      earned: (stats.total_time_spent || 0) >= 600,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Course Completer',
      description: 'Complete your first course',
      earned: (stats.completed_courses || 0) >= 1,
      color: 'text-yellow-600 dark:text-yellow-400'
    }
  ]
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        Achievements
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border-2 transition-all ${
              achievement.earned 
                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'
            }`}
          >
            <div className={`${achievement.earned ? achievement.color : 'text-gray-400 dark:text-gray-600'} mb-2`}>
              {achievement.icon}
            </div>
            <h4 className={`font-medium text-sm ${
              achievement.earned 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {achievement.title}
            </h4>
            <p className={`text-xs ${
              achievement.earned 
                ? 'text-gray-600 dark:text-gray-300' 
                : 'text-gray-400 dark:text-gray-500'
            }`}>
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProgressAnalytics({ stats, recentActivity, enrollments }: ProgressAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Analytics</h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Track your progress and build better learning habits
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <LearningStreak stats={stats} />
        <SkillProgress enrollments={enrollments} />
        <StudyTimeAnalysis recentActivity={recentActivity} stats={stats} />
        <Achievements stats={stats} />
      </div>
    </div>
  )
}