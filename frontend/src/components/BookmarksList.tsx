'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark as BookmarkIcon, ExternalLink, Trash2, Calendar, BookOpen } from 'lucide-react';
import { getBookmarks, deleteBookmark, type Bookmark } from '@/lib/bookmarks';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

interface BookmarksListProps {
  className?: string;
}

export default function BookmarksList({ className = '' }: BookmarksListProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const data = await getBookmarks();
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [isAuthenticated]);

  const handleDeleteBookmark = async (bookmark: Bookmark) => {
    if (!confirm(`Are you sure you want to delete the bookmark "${bookmark.title}"?`)) {
      return;
    }

    setDeletingId(bookmark.id);

    try {
      await deleteBookmark(bookmark.id);
      setBookmarks(prev => prev.filter(b => b.id !== bookmark.id));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      alert('Failed to delete bookmark. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <BookmarkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to view your bookmarks
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading bookmarks...</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <BookmarkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No bookmarks yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Start adding bookmarks to important lesson sections to access them quickly later.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <BookmarkIcon className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {bookmark.title}
                  </h3>
                </div>
                
                {bookmark.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {bookmark.description}
                  </p>
                )}

                {bookmark.sectionText && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "{bookmark.sectionText}"
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>
                      Week {bookmark.lesson.week.weekNumber}: {bookmark.lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(bookmark.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/courses/${bookmark.lesson.week.course.id}/week/${bookmark.lesson.week.weekNumber}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Lesson
                </Link>
                
                <button
                  onClick={() => handleDeleteBookmark(bookmark)}
                  disabled={deletingId === bookmark.id}
                  className="inline-flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 disabled:opacity-50 transition-colors"
                  title="Delete bookmark"
                >
                  <Trash2 className="w-3 h-3" />
                  {deletingId === bookmark.id ? '...' : ''}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookmarks.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} total
        </div>
      )}
    </div>
  );
}