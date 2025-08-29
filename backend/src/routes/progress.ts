import express from 'express';
import pool from '../db/pool';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/dashboard', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const enrollmentsResult = await pool.query(
      `SELECT e.*, c.title, c.slug, c.description
       FROM user_enrollments e
       JOIN courses c ON c.id = e.course_id
       WHERE e.user_id = $1
       ORDER BY e.enrolled_at DESC`,
      [userId]
    );

    const recentActivityResult = await pool.query(
      `SELECT 
         l.title as lesson_title,
         l.id as lesson_id,
         w.week_number,
         c.title as course_title,
         up.completed_at,
         up.time_spent_minutes
       FROM user_progress up
       JOIN lessons l ON l.id = up.lesson_id
       JOIN weeks w ON w.id = l.week_id
       JOIN courses c ON c.id = w.course_id
       WHERE up.user_id = $1 AND up.completed = true
       ORDER BY up.completed_at DESC
       LIMIT 10`,
      [userId]
    );

    const statsResult = await pool.query(
      `SELECT 
         COUNT(DISTINCT up.lesson_id) as completed_lessons,
         SUM(up.time_spent_minutes) as total_time_spent,
         COUNT(DISTINCT e.course_id) as enrolled_courses,
         COUNT(DISTINCT CASE WHEN e.progress_percentage = 100 THEN e.course_id END) as completed_courses
       FROM user_enrollments e
       LEFT JOIN user_progress up ON up.user_id = e.user_id
       WHERE e.user_id = $1`,
      [userId]
    );

    res.json({
      enrollments: enrollmentsResult.rows,
      recentActivity: recentActivityResult.rows,
      stats: statsResult.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

router.get('/course/:courseId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const progressResult = await pool.query(
      `SELECT 
         w.id as week_id,
         w.week_number,
         w.title as week_title,
         COUNT(DISTINCT l.id) as total_lessons,
         COUNT(DISTINCT up.lesson_id) as completed_lessons,
         SUM(up.time_spent_minutes) as time_spent
       FROM weeks w
       LEFT JOIN lessons l ON l.week_id = w.id
       LEFT JOIN user_progress up ON up.lesson_id = l.id 
         AND up.user_id = $1 
         AND up.completed = true
       WHERE w.course_id = $2
       GROUP BY w.id, w.week_number, w.title
       ORDER BY w.week_number`,
      [userId, courseId]
    );

    const quizProgressResult = await pool.query(
      `SELECT 
         q.id as quiz_id,
         q.title as quiz_title,
         w.week_number,
         MAX(qa.score) as best_score,
         COUNT(qa.id) as attempts,
         MAX(CASE WHEN qa.passed THEN 1 ELSE 0 END) as passed
       FROM quizzes q
       JOIN weeks w ON w.id = q.week_id
       LEFT JOIN quiz_attempts qa ON qa.quiz_id = q.id AND qa.user_id = $1
       WHERE w.course_id = $2
       GROUP BY q.id, q.title, w.week_number
       ORDER BY w.week_number`,
      [userId, courseId]
    );

    res.json({
      weekProgress: progressResult.rows,
      quizProgress: quizProgressResult.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch course progress' });
  }
});

export default router;