import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get user profile
router.get('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { firstName, lastName, email } = req.body;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: userId }
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user stats
router.get('/stats', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // Get enrolled courses count
    const enrolledCoursesCount = await prisma.userEnrollment.count({
      where: { userId }
    });

    // Get completed lessons count
    const completedLessonsCount = await prisma.userProgress.count({
      where: { 
        userId,
        completed: true
      }
    });

    // Get total hours from completed lessons
    const completedLessons = await prisma.userProgress.findMany({
      where: { 
        userId,
        completed: true
      },
      include: {
        lesson: {
          select: {
            durationMinutes: true
          }
        }
      }
    });

    const totalMinutes = completedLessons.reduce((total, progress) => {
      return total + (progress.lesson.durationMinutes || 0);
    }, 0);

    const totalHours = Math.round(totalMinutes / 60 * 10) / 10; // Round to 1 decimal

    // Get completed courses count
    const completedCoursesCount = await prisma.userEnrollment.count({
      where: { 
        userId,
        completedAt: {
          not: null
        }
      }
    });

    res.json({
      enrolledCourses: enrolledCoursesCount,
      completedLessons: completedLessonsCount,
      totalHours,
      completedCourses: completedCoursesCount
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

export default router;