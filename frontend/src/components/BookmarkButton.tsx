'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark as BookmarkIcon, BookmarkCheck } from 'lucide-react';
import { createBookmark, deleteBookmark, getLessonBookmarks, type Bookmark } from '@/lib/bookmarks';
import { useAuth } from '@/stores/authStore';

interface BookmarkButtonProps {
  lessonId: string;
  title: string;
  description?: string;
  sectionText?: string;
  position?: number;
  className?: string;
}

export default function BookmarkButton({
  lessonId,
  title,
  description,
  sectionText,
  position = 0,
  className = ''
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !lessonId) return;

    const checkBookmarkStatus = async () => {
      try {
        const bookmarks = await getLessonBookmarks(lessonId);
        const existingBookmark = bookmarks.find(b => b.position === position);
        
        if (existingBookmark) {
          setIsBookmarked(true);
          setBookmarkId(existingBookmark.id);
        }
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };

    checkBookmarkStatus();
  }, [lessonId, position, isAuthenticated]);

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated) {
      alert('Please log in to use bookmarks');
      return;
    }

    setIsLoading(true);

    try {
      if (isBookmarked && bookmarkId) {
        await deleteBookmark(bookmarkId);
        setIsBookmarked(false);
        setBookmarkId(null);
      } else {
        const newBookmark = await createBookmark({
          lessonId,
          title,
          description,
          sectionText,
          position
        });
        setIsBookmarked(true);
        setBookmarkId(newBookmark.id);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to update bookmark. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={handleBookmarkToggle}
      disabled={isLoading}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform overflow-hidden ${
        isBookmarked
          ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white shadow-lg shadow-yellow-200/50 dark:shadow-yellow-900/50 hover:from-yellow-500 hover:via-amber-600 hover:to-orange-600'
          : 'bg-gradient-to-r from-gray-50 via-gray-100 to-gray-150 text-gray-700 hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 hover:text-blue-700 dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 dark:text-gray-300 dark:hover:from-blue-900/30 dark:hover:via-indigo-900/30 dark:hover:to-purple-900/30 dark:hover:text-blue-300 border border-gray-200 dark:border-gray-700'
      } ${
        isLoading 
          ? 'opacity-75 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-lg active:scale-95 hover:-translate-y-0.5'
      } ${className}`}
    >
      {/* Animated background effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ${
        isBookmarked 
          ? 'bg-gradient-to-r from-yellow-300/30 via-amber-400/30 to-orange-400/30' 
          : 'bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20'
      } animate-pulse`} />
      
      {/* Sparkle/shine effect for bookmarked state */}
      {isBookmarked && !isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine" />
      )}

      {/* Enhanced bookmark icon with animations */}
      <div className="relative z-10 flex items-center">
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isBookmarked ? (
          <div className="relative">
            <BookmarkCheck className="w-4 h-4 transition-all duration-300 scale-110 drop-shadow-sm" />
            {/* Success sparkle */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75" />
          </div>
        ) : (
          <BookmarkIcon className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-yellow-500" />
        )}
      </div>

      {/* Enhanced text with animated loading */}
      <span className="relative z-10 transition-all duration-300">
        {isLoading ? (
          <span className="inline-flex items-center gap-1">
            <span>Saving</span>
            <span className="inline-flex">
              <span className="animate-bounce delay-0">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          </span>
        ) : isBookmarked ? (
          <span className="flex items-center gap-1.5">
            <span>Bookmarked</span>
            <span className="text-xs opacity-90 animate-pulse">✓</span>
          </span>
        ) : (
          <span className="group-hover:tracking-wider transition-all duration-300">
            Bookmark
          </span>
        )}
      </span>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 transform scale-0 bg-white/25 rounded-full transition-transform duration-300 group-active:scale-150" />
      </div>
    </button>
  );
}