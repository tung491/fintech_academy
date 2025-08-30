import { api } from './api';

export interface Bookmark {
  id: string;
  userId: string;
  lessonId: string;
  title: string;
  description?: string;
  sectionText?: string;
  position?: number;
  createdAt: string;
  updatedAt: string;
  lesson: {
    id: string;
    title: string;
    slug: string;
    week: {
      id: string;
      weekNumber: number;
      title: string;
      course: {
        id: string;
        title: string;
        slug: string;
      };
    };
  };
}

export interface CreateBookmarkData {
  lessonId: string;
  title: string;
  description?: string;
  sectionText?: string;
  position?: number;
}

export interface UpdateBookmarkData {
  title?: string;
  description?: string;
  sectionText?: string;
}

// Get all bookmarks for the authenticated user
export async function getBookmarks(): Promise<Bookmark[]> {
  const response = await api.get('/bookmarks');
  return response.data;
}

// Create a new bookmark
export async function createBookmark(data: CreateBookmarkData): Promise<Bookmark> {
  const response = await api.post('/bookmarks', data);
  return response.data;
}

// Update an existing bookmark
export async function updateBookmark(id: string, data: UpdateBookmarkData): Promise<Bookmark> {
  const response = await api.put(`/bookmarks/${id}`, data);
  return response.data;
}

// Delete a bookmark
export async function deleteBookmark(id: string): Promise<void> {
  await api.delete(`/bookmarks/${id}`);
}

// Get bookmarks for a specific lesson
export async function getLessonBookmarks(lessonId: string): Promise<Bookmark[]> {
  const response = await api.get(`/bookmarks/lesson/${lessonId}`);
  return response.data;
}