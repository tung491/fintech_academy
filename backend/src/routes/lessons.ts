import express from 'express';
import pool from '../db/pool';
import prisma from '../db/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Search lessons endpoint
router.get('/search/:query', authenticate, async (req: AuthRequest, res) => {
  try {
    const { query } = req.params;
    const userId = req.user!.id;
    
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }
    
    const searchQuery = `%${query.toLowerCase()}%`;
    
    // Search in lesson titles and content
    const searchResults = await pool.query(
      `SELECT 
        l.id,
        l.title,
        l.slug,
        l.duration_minutes,
        l.order_index,
        w.week_number,
        w.title as week_title,
        c.id as course_id,
        c.title as course_title,
        c.slug as course_slug,
        up.completed,
        up.time_spent_minutes,
        -- Snippet of content around the match
        CASE 
          WHEN LOWER(l.title) LIKE ? THEN 'Title Match'
          WHEN LOWER(l.content) LIKE ? THEN 
            SUBSTR(l.content, 
              MAX(1, INSTR(LOWER(l.content), LOWER(?)) - 50),
              200
            )
          ELSE ''
        END as content_snippet,
        -- Relevance score
        CASE 
          WHEN LOWER(l.title) LIKE ? THEN 10
          WHEN LOWER(l.content) LIKE ? THEN 5
          ELSE 0
        END as relevance_score
       FROM lessons l
       JOIN weeks w ON w.id = l.week_id
       JOIN courses c ON c.id = w.course_id
       LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = ?
       WHERE (LOWER(l.title) LIKE ? OR LOWER(l.content) LIKE ?)
         AND c.is_published = 1
       ORDER BY relevance_score DESC, w.week_number ASC, l.order_index ASC
       LIMIT 50`,
      [
        searchQuery, searchQuery, query, 
        searchQuery, searchQuery,
        userId,
        searchQuery, searchQuery
      ]
    );

    const results = searchResults.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      duration_minutes: row.duration_minutes,
      order_index: row.order_index,
      week_number: row.week_number,
      week_title: row.week_title,
      course_id: row.course_id,
      course_title: row.course_title,
      course_slug: row.course_slug,
      completed: row.completed === 1,
      time_spent_minutes: row.time_spent_minutes || 0,
      content_snippet: row.content_snippet,
      relevance_score: row.relevance_score,
      url: `/courses/${row.course_id}/week/${row.week_number}`,
      lesson_url: `/lessons/${row.id}`
    }));

    return res.json({
      query: query,
      results: results,
      total_results: results.length
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Failed to search lessons' });
  }
});

router.get('/:lessonId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user!.id;

    const lessonResult = await pool.query(
      `SELECT l.*, w.week_number, w.course_id, c.title as course_title
       FROM lessons l
       JOIN weeks w ON w.id = l.week_id
       JOIN courses c ON c.id = w.course_id
       WHERE l.id = ?`,
      [lessonId]
    );

    if (lessonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const progressResult = await pool.query(
      `SELECT * FROM user_progress 
       WHERE user_id = ? AND lesson_id = ?`,
      [userId, lessonId]
    );

    return res.json({
      ...lessonResult.rows[0],
      progress: progressResult.rows[0] || null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// Track lesson access (when user views a lesson)
router.post('/:lessonId/access', authenticate, async (req: AuthRequest, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user!.id;
    const { timeSpent } = req.body;

    // Check if progress already exists using Prisma
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: userId,
          lessonId: lessonId
        }
      }
    });

    if (existingProgress) {
      // Update existing - just update the access time and add time spent
      await prisma.userProgress.update({
        where: {
          userId_lessonId: {
            userId: userId,
            lessonId: lessonId
          }
        },
        data: {
          timeSpentMinutes: {
            increment: timeSpent || 0
          },
          updatedAt: new Date()
        }
      });
    } else {
      // Insert new progress record (not completed yet) using Prisma
      await prisma.userProgress.create({
        data: {
          userId: userId,
          lessonId: lessonId,
          completed: false,
          timeSpentMinutes: timeSpent || 0
        }
      });
    }

    return res.json({
      user_id: userId,
      lesson_id: lessonId,
      accessed: true,
      time_spent_minutes: timeSpent || 0
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to track lesson access' });
  }
});

router.post('/:lessonId/complete', authenticate, async (req: AuthRequest, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user!.id;
    const { timeSpent } = req.body;

    // Check if progress already exists
    const existingProgress = await pool.query(
      `SELECT * FROM user_progress WHERE user_id = ? AND lesson_id = ?`,
      [userId, lessonId]
    );

    if (existingProgress.rows.length > 0) {
      // Update existing
      await pool.query(
        `UPDATE user_progress SET 
           completed = 1, 
           completed_at = datetime('now'),
           time_spent_minutes = time_spent_minutes + ?,
           updated_at = datetime('now')
         WHERE user_id = ? AND lesson_id = ?`,
        [timeSpent || 0, userId, lessonId]
      );
    } else {
      // Insert new
      const progressId = Math.random().toString(36).substr(2, 9);
      await pool.query(
        `INSERT INTO user_progress (id, user_id, lesson_id, completed, completed_at, time_spent_minutes, created_at, updated_at)
         VALUES (?, ?, ?, 1, datetime('now'), ?, datetime('now'), datetime('now'))`,
        [progressId, userId, lessonId, timeSpent || 0]
      );
    }

    await updateCourseProgress(userId, lessonId);

    return res.json({
      user_id: userId,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
      time_spent_minutes: timeSpent || 0
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update progress' });
  }
});

async function updateCourseProgress(userId: string, lessonId: string) {
  try {
    const courseResult = await pool.query(
      `SELECT c.id FROM courses c
       JOIN weeks w ON w.course_id = c.id
       JOIN lessons l ON l.week_id = w.id
       WHERE l.id = ?`,
      [lessonId]
    );

    if (courseResult.rows.length === 0) return;

    const courseId = courseResult.rows[0].id;

    const progressResult = await pool.query(
      `SELECT 
         COUNT(DISTINCT l.id) as total_lessons,
         COUNT(DISTINCT CASE WHEN up.completed = 1 THEN up.lesson_id END) as completed_lessons
       FROM lessons l
       JOIN weeks w ON w.id = l.week_id
       LEFT JOIN user_progress up ON up.lesson_id = l.id AND up.user_id = ?
       WHERE w.course_id = ?`,
      [userId, courseId]
    );

    const { total_lessons, completed_lessons } = progressResult.rows[0];
    const progressPercentage = (completed_lessons / total_lessons) * 100;

    await pool.query(
      `UPDATE user_enrollments 
       SET progress_percentage = ?,
           completed_at = CASE WHEN ? = 100 THEN datetime('now') ELSE NULL END
       WHERE user_id = ? AND course_id = ?`,
      [progressPercentage, progressPercentage, userId, courseId]
    );
  } catch (error) {
    console.error('Error updating course progress:', error);
  }
}

export default router;