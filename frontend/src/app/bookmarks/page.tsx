'use client';

import React from 'react';
import BookmarksList from '@/components/BookmarksList';
import { BookmarkIcon } from 'lucide-react';

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <BookmarkIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Bookmarks
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Quick access to your saved lesson sections and important content
              </p>
            </div>
          </div>
        </div>

        {/* Bookmarks List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <BookmarksList />
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 How to use bookmarks
          </h2>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Click the bookmark button in any lesson to save important sections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Use bookmarks to quickly return to key concepts when reviewing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Organize your learning by bookmarking formulas, examples, and action items</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Access your bookmarks anytime from the main navigation menu</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}