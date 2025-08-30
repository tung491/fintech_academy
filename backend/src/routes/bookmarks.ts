import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, AuthRequest } from '../middleware/auth';
import { prisma } from '../db/prisma';

const router = express.Router();

// Get all bookmarks for authenticated user
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            week: {
              include: {
                course: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

// Create a new bookmark
router.post('/', 
  authenticate,
  [
    body('lessonId').notEmpty().withMessage('Lesson ID is required'),
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
    body('description').optional().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('sectionText').optional().isLength({ max: 500 }).withMessage('Section text must be less than 500 characters'),
    body('position').optional().isInt({ min: 0 }).withMessage('Position must be a non-negative integer'),
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user!.id;
      const { lessonId, title, description, sectionText, position } = req.body;

      // Check if lesson exists and user has access
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

      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }

      // Check if bookmark already exists at this position
      const existingBookmark = await prisma.bookmark.findUnique({
        where: {
          userId_lessonId_position: {
            userId,
            lessonId,
            position: position || 0
          }
        }
      });

      if (existingBookmark) {
        return res.status(409).json({ error: 'Bookmark already exists at this position' });
      }

      const bookmark = await prisma.bookmark.create({
        data: {
          userId,
          lessonId,
          title,
          description,
          sectionText,
          position: position || 0
        },
        include: {
          lesson: {
            include: {
              week: {
                include: {
                  course: true
                }
              }
            }
          }
        }
      });

      res.status(201).json(bookmark);
    } catch (error) {
      console.error('Error creating bookmark:', error);
      res.status(500).json({ error: 'Failed to create bookmark' });
    }
  }
);

// Update a bookmark
router.put('/:id',
  authenticate,
  [
    body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
    body('description').optional().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('sectionText').optional().isLength({ max: 500 }).withMessage('Section text must be less than 500 characters'),
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user!.id;
      const bookmarkId = req.params.id;
      const { title, description, sectionText } = req.body;

      // Check if bookmark exists and belongs to user
      const existingBookmark = await prisma.bookmark.findFirst({
        where: { 
          id: bookmarkId,
          userId 
        }
      });

      if (!existingBookmark) {
        return res.status(404).json({ error: 'Bookmark not found' });
      }

      const updatedBookmark = await prisma.bookmark.update({
        where: { id: bookmarkId },
        data: {
          title: title || existingBookmark.title,
          description,
          sectionText,
        },
        include: {
          lesson: {
            include: {
              week: {
                include: {
                  course: true
                }
              }
            }
          }
        }
      });

      res.json(updatedBookmark);
    } catch (error) {
      console.error('Error updating bookmark:', error);
      res.status(500).json({ error: 'Failed to update bookmark' });
    }
  }
);

// Delete a bookmark
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const bookmarkId = req.params.id;

    // Check if bookmark exists and belongs to user
    const existingBookmark = await prisma.bookmark.findFirst({
      where: { 
        id: bookmarkId,
        userId 
      }
    });

    if (!existingBookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    await prisma.bookmark.delete({
      where: { id: bookmarkId }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});

// Get bookmarks for a specific lesson
router.get('/lesson/:lessonId', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const lessonId = req.params.lessonId;

    const bookmarks = await prisma.bookmark.findMany({
      where: { 
        userId,
        lessonId 
      },
      orderBy: { position: 'asc' }
    });

    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching lesson bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch lesson bookmarks' });
  }
});

export default router;