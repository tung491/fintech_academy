import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../db/prisma';

const router = Router();

// Get course prerequisites
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const prerequisites = await prisma.coursePrerequisite.findMany({
      where: {
        courseId: courseId
      },
      include: {
        prerequisite: {
          select: {
            id: true,
            title: true,
            slug: true,
            level: true,
            duration: true,
            estimatedHours: true,
            instructor: true,
            isPublished: true
          }
        }
      }
    });

    res.json(prerequisites);
  } catch (error) {
    console.error('Error fetching course prerequisites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get learning path for a course (courses that depend on this one)
router.get('/learning-path/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Get courses that have this course as a prerequisite
    const dependentCourses = await prisma.coursePrerequisite.findMany({
      where: {
        prerequisiteId: courseId
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            level: true,
            duration: true,
            estimatedHours: true,
            instructor: true,
            isPublished: true,
            category: {
              select: {
                name: true,
                color: true,
                icon: true
              }
            }
          }
        }
      }
    });

    res.json(dependentCourses);
  } catch (error) {
    console.error('Error fetching learning path:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check if user meets prerequisites for a course
router.get('/check/:courseId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;
    
    // Get all prerequisites for this course
    const prerequisites = await prisma.coursePrerequisite.findMany({
      where: {
        courseId: courseId
      },
      include: {
        prerequisite: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      }
    });

    if (prerequisites.length === 0) {
      return res.json({
        canEnroll: true,
        missingPrerequisites: [],
        completedPrerequisites: []
      });
    }

    // Check which prerequisites the user has completed
    const prerequisiteIds = prerequisites.map(p => p.prerequisiteId);
    
    const completedEnrollments = await prisma.userEnrollment.findMany({
      where: {
        userId: userId,
        courseId: {
          in: prerequisiteIds
        },
        completedAt: {
          not: null
        }
      },
      select: {
        courseId: true,
        completedAt: true
      }
    });

    const completedCourseIds = completedEnrollments.map(e => e.courseId);
    
    const completedPrerequisites = prerequisites.filter(p => 
      completedCourseIds.includes(p.prerequisiteId)
    );
    
    const missingPrerequisites = prerequisites.filter(p => 
      !completedCourseIds.includes(p.prerequisiteId)
    );

    const canEnroll = missingPrerequisites.length === 0;

    res.json({
      canEnroll,
      missingPrerequisites: missingPrerequisites.map(p => ({
        id: p.prerequisiteId,
        title: p.prerequisite.title,
        slug: p.prerequisite.slug,
        isRequired: p.isRequired
      })),
      completedPrerequisites: completedPrerequisites.map(p => ({
        id: p.prerequisiteId,
        title: p.prerequisite.title,
        slug: p.prerequisite.slug,
        isRequired: p.isRequired
      }))
    });
  } catch (error) {
    console.error('Error checking prerequisites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get recommended learning path based on user's completed courses
router.get('/recommended', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    
    // Get user's completed courses
    const completedEnrollments = await prisma.userEnrollment.findMany({
      where: {
        userId: userId,
        completedAt: {
          not: null
        }
      },
      select: {
        courseId: true,
        course: {
          select: {
            id: true,
            title: true,
            level: true,
            category: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    const completedCourseIds = completedEnrollments.map(e => e.courseId);

    // Find courses that the user can now access (prerequisites met)
    const availableCourses = await prisma.course.findMany({
      where: {
        isPublished: true,
        id: {
          notIn: completedCourseIds
        }
      },
      include: {
        prerequisites: {
          include: {
            prerequisite: {
              select: {
                id: true,
                title: true
              }
            }
          }
        },
        category: {
          select: {
            name: true,
            color: true,
            icon: true
          }
        }
      }
    });

    // Filter courses where all prerequisites are met
    const recommendedCourses = availableCourses.filter(course => {
      if (course.prerequisites.length === 0) return true;
      
      const prerequisiteIds = course.prerequisites.map(p => p.prerequisiteId);
      return prerequisiteIds.every(id => completedCourseIds.includes(id));
    });

    // Sort by level (beginner -> intermediate -> advanced)
    const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 };
    recommendedCourses.sort((a, b) => {
      const aLevel = levelOrder[a.level as keyof typeof levelOrder] || 0;
      const bLevel = levelOrder[b.level as keyof typeof levelOrder] || 0;
      return aLevel - bLevel;
    });

    res.json({
      completedCourses: completedEnrollments.length,
      recommendedCourses: recommendedCourses.slice(0, 6), // Limit to top 6 recommendations
      totalAvailable: recommendedCourses.length
    });
  } catch (error) {
    console.error('Error getting recommended learning path:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;