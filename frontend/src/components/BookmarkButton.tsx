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
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isBookmarked
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${className}`}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <BookmarkIcon className="w-4 h-4" />
      )}
      {isLoading ? 'Saving...' : isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}