import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../db/prisma';

const router = Router();

// Bulk enrollment in multiple courses
router.post('/bulk', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseIds } = req.body;
    const userId = req.user?.id;

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({ message: 'Course IDs array is required' });
    }

    // Check if courses exist and are published
    const courses = await prisma.course.findMany({
      where: {
        id: { in: courseIds },
        isPublished: true
      },
      select: {
        id: true,
        title: true,
        prerequisites: {
          include: {
            prerequisite: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    });

    if (courses.length !== courseIds.length) {
      return res.status(400).json({ 
        message: 'Some courses were not found or are not published' 
      });
    }

    // Check existing enrollments
    const existingEnrollments = await prisma.userEnrollment.findMany({
      where: {
        userId: userId,
        courseId: { in: courseIds }
      },
      select: { courseId: true }
    });

    const existingCourseIds = existingEnrollments.map(e => e.courseId);
    const newCourseIds = courseIds.filter(id => !existingCourseIds.includes(id));

    if (newCourseIds.length === 0) {
      return res.status(400).json({ 
        message: 'Already enrolled in all specified courses',
        alreadyEnrolled: existingCourseIds
      });
    }

    // Check prerequisites for new enrollments
    const prerequisiteIssues = [];
    const completedEnrollments = await prisma.userEnrollment.findMany({
      where: {
        userId: userId,
        completedAt: { not: null }
      },
      select: { courseId: true }
    });
    const completedCourseIds = completedEnrollments.map(e => e.courseId);

    for (const course of courses) {
      if (!newCourseIds.includes(course.id)) continue;

      const unmetPrerequisites = course.prerequisites.filter(
        p => !completedCourseIds.includes(p.prerequisiteId) && !newCourseIds.includes(p.prerequisiteId)
      );

      if (unmetPrerequisites.length > 0) {
        prerequisiteIssues.push({
          courseId: course.id,
          courseTitle: course.title,
          missingPrerequisites: unmetPrerequisites.map(p => ({
            id: p.prerequisiteId,
            title: p.prerequisite.title
          }))
        });
      }
    }

    // If there are prerequisite issues, return them for user decision
    if (prerequisiteIssues.length > 0 && !req.body.ignorePrerequisites) {
      return res.status(400).json({
        message: 'Some courses have unmet prerequisites',
        prerequisiteIssues,
        canProceed: true,
        hint: 'Add ignorePrerequisites: true to enroll anyway'
      });
    }

    // Create enrollments
    const enrollmentData = newCourseIds.map(courseId => ({
      userId: userId,
      courseId: courseId,
      enrolledAt: new Date()
    }));

    const newEnrollments = await prisma.userEnrollment.createMany({
      data: enrollmentData
    });

    // Get the created enrollments with course details
    const enrollments = await prisma.userEnrollment.findMany({
      where: {
        userId: userId,
        courseId: { in: newCourseIds }
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            duration: true,
            estimatedHours: true,
            level: true,
            instructor: true
          }
        }
      }
    });

    res.status(201).json({
      message: `Successfully enrolled in ${newCourseIds.length} courses`,
      enrollments,
      skippedCourses: existingCourseIds.length > 0 ? {
        count: existingCourseIds.length,
        message: 'Already enrolled in some courses'
      } : null,
      prerequisiteWarnings: prerequisiteIssues.length > 0 ? {
        count: prerequisiteIssues.length,
        message: 'Enrolled despite unmet prerequisites'
      } : null
    });

  } catch (error) {
    console.error('Bulk enrollment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's enrollment status for multiple courses
router.post('/status', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseIds } = req.body;
    const userId = req.user?.id;

    if (!courseIds || !Array.isArray(courseIds)) {
      return res.status(400).json({ message: 'Course IDs array is required' });
    }

    const enrollments = await prisma.userEnrollment.findMany({
      where: {
        userId: userId,
        courseId: { in: courseIds }
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            level: true,
            duration: true,
            estimatedHours: true
          }
        }
      }
    });

    const enrollmentStatus = courseIds.map(courseId => {
      const enrollment = enrollments.find(e => e.courseId === courseId);
      return {
        courseId,
        isEnrolled: !!enrollment,
        enrolledAt: enrollment?.enrolledAt || null,
        completedAt: enrollment?.completedAt || null,
        progressPercentage: enrollment?.progressPercentage || 0,
        isCompleted: !!enrollment?.completedAt,
        course: enrollment?.course || null
      };
    });

    res.json({
      enrollmentStatus,
      summary: {
        total: courseIds.length,
        enrolled: enrollments.length,
        completed: enrollments.filter(e => e.completedAt).length,
        inProgress: enrollments.filter(e => !e.completedAt).length
      }
    });

  } catch (error) {
    console.error('Enrollment status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Enroll in all courses in a learning track
router.post('/track/:trackId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { trackId } = req.params;
    const userId = req.user?.id;

    // Define learning tracks
    const learningTracks = {
      'foundation': [
        'cmexeuw0v0002vb2ampmo9m5w', // Financial and Accounting Knowledge for Developers
        'cmeyamssd0001vb5k8bihvwz2', // Business Structure & Legal Foundations
        'cmeyb9ts40001vbp4wq1pp0ca'  // Personal Finance for Tech Professionals
      ],
      'accounting': [
        'cmeyix5330001vbn4gdv7g3rg', // Bookkeeping Fundamentals for Tech Businesses
        'cmeyjz5rl0001vbb1ywfcpg9n', // Financial Statement Analysis for Founders
        'cmeyk9sd50001vbg6er1wrq9i'  // Advanced Accounting for SaaS Businesses
      ],
      'tax': [
        'cmeykv5bp0002vbzuzov1uk0c', // Tax Fundamentals for Freelance Developers
        'cmeylq3lc0001vbzv007rb9qv', // Small Business Tax Strategy
        'cmeym4zgj0001vby0jb9ytajs'  // Advanced Tax Planning for High Earners
      ]
    };

    const courseIds = learningTracks[trackId as keyof typeof learningTracks];
    
    if (!courseIds) {
      return res.status(404).json({ message: 'Learning track not found' });
    }

    // Use bulk enrollment with the track's courses
    req.body = { courseIds, ignorePrerequisites: false };
    
    // Call bulk enrollment logic
    const courses = await prisma.course.findMany({
      where: {
        id: { in: courseIds },
        isPublished: true
      },
      select: {
        id: true,
        title: true,
        orderIndex: true
      },
      orderBy: {
        orderIndex: 'asc'
      }
    });

    // Check existing enrollments
    const existingEnrollments = await prisma.userEnrollment.findMany({
      where: {
        userId: userId,
        courseId: { in: courseIds }
      }
    });

    const existingCourseIds = existingEnrollments.map(e => e.courseId);
    const newCourseIds = courseIds.filter(id => !existingCourseIds.includes(id));

    if (newCourseIds.length > 0) {
      const enrollmentData = newCourseIds.map(courseId => ({
        userId: userId,
        courseId: courseId,
        enrolledAt: new Date()
      }));

      await prisma.userEnrollment.createMany({
        data: enrollmentData
      });
    }

    const allEnrollments = await prisma.userEnrollment.findMany({
      where: {
        userId: userId,
        courseId: { in: courseIds }
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            level: true,
            duration: true,
            estimatedHours: true,
            orderIndex: true
          }
        }
      },
      orderBy: {
        course: {
          orderIndex: 'asc'
        }
      }
    });

    res.status(201).json({
      message: `Successfully enrolled in ${trackId} learning track`,
      trackId,
      trackName: trackId.charAt(0).toUpperCase() + trackId.slice(1) + ' Track',
      totalCourses: courseIds.length,
      newEnrollments: newCourseIds.length,
      existingEnrollments: existingCourseIds.length,
      enrollments: allEnrollments
    });

  } catch (error) {
    console.error('Track enrollment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;