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
          }
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
    console.error('Error tracking lesson access:', error);
    return res.status(500).json({ error: 'Failed to track lesson access' });
  }
});

router.post('/:lessonId/complete', authenticate, async (req: AuthRequest, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user!.id;
    const { timeSpent } = req.body;

    console.log(`Attempting lesson completion - User: ${userId}, Lesson: ${lessonId}`);

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });
    
    if (!lesson) {
      console.error(`Lesson not found in database: ${lessonId}`);
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    // Verify user exists  
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      console.error(`User not found in database: ${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log(`Found user: ${user.email} and lesson: ${lesson.title}`);

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
      // Update existing - mark as completed
      await prisma.userProgress.update({
        where: {
          userId_lessonId: {
            userId: userId,
            lessonId: lessonId
          }
        },
        data: {
          completed: true,
          completedAt: new Date(),
          timeSpentMinutes: {
            increment: timeSpent || 0
          }
        }
      });
    } else {
      // Insert new progress record as completed using Prisma
      await prisma.userProgress.create({
        data: {
          userId: userId,
          lessonId: lessonId,
          completed: true,
          completedAt: new Date(),
          timeSpentMinutes: timeSpent || 0
        }
      });
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
    console.error('Error completing lesson:', error);
    return res.status(500).json({ error: 'Failed to update progress' });
  }
});

async function updateCourseProgress(userId: string, lessonId: string) {
  try {
    // Find the course ID for this lesson using Prisma
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        week: {
          include: {
            course: true
          }
        }
      }
    });

    if (!lesson) return;

    const courseId = lesson.week.course.id;

    // Get all lessons in this course
    const totalLessons = await prisma.lesson.count({
      where: {
        week: {
          courseId: courseId
        }
      }
    });

    // Get completed lessons for this user in this course
    const completedLessons = await prisma.userProgress.count({
      where: {
        userId: userId,
        completed: true,
        lesson: {
          week: {
            courseId: courseId
          }
        }
      }
    });

    const progressPercentage = (completedLessons / totalLessons) * 100;

    // Update user enrollment progress
    await prisma.userEnrollment.updateMany({
      where: {
        userId: userId,
        courseId: courseId
      },
      data: {
        progressPercentage: progressPercentage,
        completedAt: progressPercentage === 100 ? new Date() : null
      }
    });
  } catch (error) {
    console.error('Error updating course progress:', error);
  }
}

export default router;