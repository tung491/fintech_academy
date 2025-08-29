import express from 'express';
import pool from '../db/pool';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

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

    res.json({
      ...lessonResult.rows[0],
      progress: progressResult.rows[0] || null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch lesson' });
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

    let result;
    if (existingProgress.rows.length > 0) {
      // Update existing
      result = await pool.query(
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
      result = await pool.query(
        `INSERT INTO user_progress (id, user_id, lesson_id, completed, completed_at, time_spent_minutes, created_at, updated_at)
         VALUES (?, ?, ?, 1, datetime('now'), ?, datetime('now'), datetime('now'))`,
        [progressId, userId, lessonId, timeSpent || 0]
      );
    }

    await updateCourseProgress(userId, lessonId);

    res.json({
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