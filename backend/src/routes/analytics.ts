import express from 'express';
import prisma from '../db/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/detailed', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // Get user's progress data
    const userProgress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            week: true
          }
        }
      }
    });

    // Get user's quiz attempts
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId },
      include: {
        quiz: {
          include: {
            week: true
          }
        }
      }
    });

    // Get all lessons for total count
    const totalLessons = await prisma.lesson.count();

    // Calculate completed lessons
    const completedLessons = userProgress.filter(p => p.completed).length;

    // Calculate total study time (in minutes)
    const totalStudyTime = userProgress.reduce((acc, p) => {
      return acc + (p.timeSpent || 0);
    }, 0);

    // Calculate average session time
    const sessionsWithTime = userProgress.filter(p => p.timeSpent && p.timeSpent > 0);
    const averageSessionTime = sessionsWithTime.length > 0 
      ? Math.round(sessionsWithTime.reduce((acc, p) => acc + (p.timeSpent || 0), 0) / sessionsWithTime.length)
      : 0;

    // Calculate streaks (simplified - based on consecutive days with progress)
    const progressDates = userProgress
      .map(p => p.completedAt)
      .filter(date => date)
      .map(date => date!.toDateString())
      .sort();

    const uniqueDates = [...new Set(progressDates)];
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Simple streak calculation (consecutive days)
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
      currentStreak = 1; // Simplified for demo
    }
    longestStreak = Math.max(currentStreak, uniqueDates.length > 0 ? 1 : 0);

    // Weekly progress
    const weeklyProgress = [];
    for (let i = 1; i <= 12; i++) {
      const weekProgress = userProgress.filter(p => 
        p.lesson.week.weekNumber === i && p.completed
      );
      const weekTime = weekProgress.reduce((acc, p) => acc + (p.timeSpent || 0), 0);
      
      weeklyProgress.push({
        week: `Week ${i}`,
        lessons: weekProgress.length,
        time: weekTime
      });
    }

    // Subject progress (simplified mapping)
    const subjectProgress = [
      {
        subject: 'Financial Fundamentals',
        progress: Math.round((completedLessons / Math.max(totalLessons, 1)) * 100),
        timeSpent: Math.round(totalStudyTime / 60) // Convert to hours
      },
      {
        subject: 'Business Model Analysis',
        progress: Math.round((completedLessons / Math.max(totalLessons, 1)) * 100),
        timeSpent: Math.round(totalStudyTime / 60 / 4) // Distribute across subjects
      },
      {
        subject: 'Cash Flow Management',
        progress: Math.round((completedLessons / Math.max(totalLessons, 1)) * 100),
        timeSpent: Math.round(totalStudyTime / 60 / 4)
      },
      {
        subject: 'Investment Strategies',
        progress: Math.round((completedLessons / Math.max(totalLessons, 1)) * 100),
        timeSpent: Math.round(totalStudyTime / 60 / 4)
      }
    ];

    // Learning velocity (last 7 days)
    const learningVelocity = [];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dayProgress = userProgress.filter(p => 
        p.completedAt && 
        p.completedAt.toDateString() === date.toDateString() &&
        p.completed
      );
      
      learningVelocity.push({
        date: date.toISOString().split('T')[0],
        lessonsCompleted: dayProgress.length,
        timeSpent: dayProgress.reduce((acc, p) => acc + (p.timeSpent || 0), 0)
      });
    }

    const analyticsData = {
      totalStudyTime,
      currentStreak,
      longestStreak,
      completedLessons,
      totalLessons,
      averageSessionTime,
      weeklyProgress,
      subjectProgress,
      learningVelocity
    };

    res.json(analyticsData);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

export default router;