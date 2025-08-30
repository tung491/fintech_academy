'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Clock, BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  slug: string
  duration_minutes: number
  order_index: number
  week_number: number
  week_title: string
  course_id: string
  course_title: string
  course_slug: string
  completed: boolean
  time_spent_minutes: number
  content_snippet: string
  relevance_score: number
  url: string
  lesson_url: string
}

interface SearchResponse {
  query: string
  results: SearchResult[]
  total_results: number
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState('')
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Search function with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query.trim())
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [query])
  
  const performSearch = async (searchQuery: string) => {
    setIsSearching(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/lessons/search/${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Search failed')
      }
      
      const data: SearchResponse = await response.json()
      setResults(data.results)
      setShowResults(true)
    } catch (err) {
      console.error('Search error:', err)
      setError('Search failed. Please try again.')
      setResults([])
      setShowResults(false)
    } finally {
      setIsSearching(false)
    }
  }
  
  const handleResultClick = () => {
    setShowResults(false)
    setQuery('')
    inputRef.current?.blur()
  }
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}m` : ''}`
  }
  
  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery || text === 'Title Match') return text
    
    const regex = new RegExp(`(${searchQuery})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search lessons..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                   placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
      
      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-2 w-96 max-h-96 overflow-y-auto 
                      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                      rounded-lg shadow-xl">
          {error && (
            <div className="p-4 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
          
          {results.length === 0 && !error && !isSearching && (
            <div className="p-4 text-gray-500 dark:text-gray-400 text-sm">
              No lessons found for "{query}"
            </div>
          )}
          
          {results.length > 0 && (
            <>
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    onClick={handleResultClick}
                    className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <BookOpen className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {highlightText(result.title, query)}
                          </h4>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>Week {result.week_number}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDuration(result.duration_minutes || 30)}</span>
                          </span>
                          {result.completed && (
                            <>
                              <span>•</span>
                              <span className="text-green-600 dark:text-green-400 font-medium">
                                ✓ Completed
                              </span>
                            </>
                          )}
                        </div>
                        
                        {result.content_snippet && result.content_snippet !== 'Title Match' && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            ...{highlightText(result.content_snippet, query)}...
                          </p>
                        )}
                        
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                          {result.course_title} → {result.week_title}
                        </div>
                      </div>
                      
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}