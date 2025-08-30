'use client'

import ReactMarkdown from 'react-markdown'
import { useState, useEffect, useRef } from 'react'
import { Copy, CheckCircle, ExternalLink, BookOpen, Lightbulb, AlertTriangle, Target, Clock, BarChart } from 'lucide-react'

interface LessonContentProps {
  content: string
  title: string
  lessonType: string
}

interface CodeBlockProps {
  children: string
  className?: string
}

function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const language = className?.replace('language-', '') || 'text'

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-gray-300 px-4 py-2 text-sm rounded-t-lg">
        <span className="font-medium">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

interface CustomBlockProps {
  children: React.ReactNode
  type: 'tip' | 'warning' | 'info' | 'example'
  title?: string
}

function CustomBlock({ children, type, title }: CustomBlockProps) {
  const configs = {
    tip: {
      icon: <Lightbulb className="w-5 h-5" />,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      titleColor: 'text-yellow-800 dark:text-yellow-200',
      title: title || '💡 Tip'
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      iconColor: 'text-red-600 dark:text-red-400',
      titleColor: 'text-red-800 dark:text-red-200',
      title: title || '⚠️ Warning'
    },
    info: {
      icon: <BookOpen className="w-5 h-5" />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
      titleColor: 'text-blue-800 dark:text-blue-200',
      title: title || 'ℹ️ Information'
    },
    example: {
      icon: <Target className="w-5 h-5" />,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
      titleColor: 'text-green-800 dark:text-green-200',
      title: title || '📝 Example'
    }
  }

  const config = configs[type]

  return (
    <div className={`p-4 rounded-lg border-l-4 ${config.bgColor} ${config.borderColor} my-6`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={config.iconColor}>
          {config.icon}
        </div>
        <h4 className={`font-semibold ${config.titleColor}`}>
          {config.title}
        </h4>
      </div>
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  )
}

export default function LessonContent({ content, title, lessonType }: LessonContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [estimatedReadTime, setEstimatedReadTime] = useState(0)
  const [isReading, setIsReading] = useState(false)

  // Calculate estimated reading time (average 200 words per minute)
  useEffect(() => {
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)
    setEstimatedReadTime(readTime)
  }, [content])

  // Track reading progress with scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const element = contentRef.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress based on how much of the content is visible/passed
      const elementTop = rect.top
      const elementHeight = rect.height
      const elementBottom = rect.bottom

      // If element is above viewport, progress is 100%
      if (elementBottom < 0) {
        setReadingProgress(100)
        setIsReading(false)
        return
      }

      // If element is below viewport, progress is 0%
      if (elementTop > windowHeight) {
        setReadingProgress(0)
        setIsReading(false)
        return
      }

      // Element is in viewport - calculate progress
      setIsReading(true)
      const visibleHeight = Math.min(windowHeight, elementBottom) - Math.max(0, elementTop)
      const scrolledPastTop = Math.max(0, -elementTop)
      const totalScrollableHeight = elementHeight - windowHeight
      
      if (totalScrollableHeight <= 0) {
        // Content fits in viewport
        setReadingProgress(100)
      } else {
        // Content requires scrolling
        const progress = Math.min(100, Math.max(0, (scrolledPastTop / totalScrollableHeight) * 100))
        setReadingProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Enhanced content processing to handle custom blocks
  const processContent = (content: string) => {
    // Add support for custom block syntax like [!tip], [!warning], [!info], [!example]
    let processed = content
    
    // Process tip blocks
    processed = processed.replace(
      /\[!tip\]([\s\S]*?)(?=\[!|\n\n|$)/g,
      (match, content) => `<CustomBlock type="tip">${content.trim()}</CustomBlock>`
    )
    
    // Process warning blocks
    processed = processed.replace(
      /\[!warning\]([\s\S]*?)(?=\[!|\n\n|$)/g,
      (match, content) => `<CustomBlock type="warning">${content.trim()}</CustomBlock>`
    )
    
    // Process info blocks
    processed = processed.replace(
      /\[!info\]([\s\S]*?)(?=\[!|\n\n|$)/g,
      (match, content) => `<CustomBlock type="info">${content.trim()}</CustomBlock>`
    )
    
    // Process example blocks
    processed = processed.replace(
      /\[!example\]([\s\S]*?)(?=\[!|\n\n|$)/g,
      (match, content) => `<CustomBlock type="example">${content.trim()}</CustomBlock>`
    )
    
    return processed
  }

  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      
      if (!inline && match) {
        return <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>
      }
      
      return (
        <code 
          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      )
    },
    
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        {children}
      </h1>
    ),
    
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
        {children}
      </h2>
    ),
    
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
        {children}
      </h3>
    ),
    
    p: ({ children }: any) => (
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    
    li: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
    
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">
        {children}
      </blockquote>
    ),
    
    a: ({ href, children }: any) => (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 underline inline-flex items-center gap-1"
      >
        {children}
        <ExternalLink className="w-3 h-3" />
      </a>
    ),
    
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),
    
    thead: ({ children }: any) => (
      <thead className="bg-gray-50 dark:bg-gray-800">
        {children}
      </thead>
    ),
    
    th: ({ children }: any) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
        {children}
      </th>
    ),
    
    td: ({ children }: any) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {children}
      </td>
    )
  }

  return (
    <div className="max-w-none">
      {/* Reading Progress Bar */}
      <div className="sticky top-0 z-10 mb-6">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{estimatedReadTime} min read</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <BarChart className="w-4 h-4" />
                <span>{Math.round(readingProgress)}% completed</span>
              </div>
              {isReading && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Reading...</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{lessonType}</span>
          </div>
        </div>
      </div>
      
      <div ref={contentRef} className="prose prose-gray dark:prose-invert max-w-none">
        <ReactMarkdown components={components}>
          {content}
        </ReactMarkdown>
      </div>
      
      {/* Add some sample custom blocks for demonstration */}
      <div className="mt-8 space-y-4">
        <CustomBlock type="tip">
          This lesson covers fundamental concepts that will be built upon in future lessons. Take notes on key terms and formulas.
        </CustomBlock>
        
        <CustomBlock type="example">
          Try applying these concepts to your own business scenario. Consider how the ROI calculation might work for a software project you're planning.
        </CustomBlock>
      </div>
    </div>
  )
}