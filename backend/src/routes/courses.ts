import express from 'express';
import prisma from '../db/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true
      },
      include: {
        weeks: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        orderIndex: 'asc'
      }
    });

    const coursesWithWeekCount = courses.map(course => ({
      ...course,
      weekCount: course.weeks.length,
      weeks: undefined
    }));

    res.json(coursesWithWeekCount);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

router.get('/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true
      },
      include: {
        weeks: {
          include: {
            lessons: {
              select: {
                id: true
              }
            }
          },
          orderBy: {
            weekNumber: 'asc'
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const weeksWithLessonCount = course.weeks.map(week => ({
      ...week,
      lessonCount: week.lessons.length,
      lessons: undefined
    }));

    res.json({
      ...course,
      weeks: weeksWithLessonCount
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch course' });
  }
});

router.post('/:courseId/enroll', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user!.id;

    const existingEnrollment = await prisma.userEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    const enrollment = await prisma.userEnrollment.create({
      data: {
        userId,
        courseId,
        progressPercentage: 0
      }
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to enroll in course' });
  }
});

router.get('/:courseId/week/:weekNumber', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseId, weekNumber } = req.params;
    const userId = req.user!.id;
    
    console.log('Fetching week:', { courseId, weekNumber, userId });
    
    const week = await prisma.week.findFirst({
      where: {
        courseId,
        weekNumber: parseInt(weekNumber)
      },
      include: {
        lessons: {
          include: {
            progress: {
              where: {
                userId
              }
            }
          },
          orderBy: {
            orderIndex: 'asc'
          }
        },
        quizzes: {
          include: {
            questions: {
              select: {
                id: true
              }
            }
          }
        }
      }
    });

    if (!week) {
      console.log('Week not found:', { courseId, weekNumber });
      return res.status(404).json({ error: 'Week not found' });
    }

    console.log('Found week:', week);

    // Transform lessons to include progress in the expected format
    const lessons = week.lessons.map(lesson => ({
      ...lesson,
      progress: lesson.progress[0] ? {
        completed: lesson.progress[0].completed,
        completedAt: lesson.progress[0].completedAt,
        timeSpentMinutes: lesson.progress[0].timeSpentMinutes
      } : null,
      // Remove the progress array from the response
      progress: lesson.progress[0] ? lesson.progress[0] : null
    }));

    const quiz = week.quizzes[0] ? {
      ...week.quizzes[0],
      questionCount: week.quizzes[0].questions.length,
      questions: undefined
    } : null;

    res.json({
      ...week,
      lessons,
      quiz,
      quizzes: undefined
    });
  } catch (error) {
    console.error('Error fetching week content:', error);
    return res.status(500).json({ error: 'Failed to fetch week content' });
  }
});

export default router;