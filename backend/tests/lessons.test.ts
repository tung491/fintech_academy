import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import lessonsRoutes from '../src/routes/lessons';
import authRoutes from '../src/routes/auth';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonsRoutes);

// Test database setup
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./test-lessons.db'
    }
  }
});

describe('Lessons API', () => {
  let authToken: string;
  let testLessonId: string;

  beforeAll(async () => {
    await prisma.$connect();
    
    // Create test user and get auth token
    const testUser = {
      email: 'test-lessons@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'Lessons'
    };

    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    authToken = registerResponse.body.token;

    // Create test data structure
    const testCourse = await prisma.course.create({
      data: {
        title: 'Financial Basics Course',
        description: 'A course about financial fundamentals',
        slug: 'financial-basics',
        isPublished: true,
        orderIndex: 1,
        weeks: {
          create: {
            title: 'Financial Fundamentals Week',
            overview: 'Learn about financial concepts',
            weekNumber: 1,
            estimatedHours: 8,
            lessons: {
              create: [
                {
                  title: 'Introduction to Financial Planning',
                  content: 'This lesson covers basic financial planning concepts including budgeting, saving, and investment fundamentals.',
                  slug: 'intro-financial-planning',
                  orderIndex: 1,
                  durationMinutes: 45
                },
                {
                  title: 'Understanding Financial Statements',
                  content: 'Learn about balance sheets, income statements, and cash flow statements. These are essential financial documents.',
                  slug: 'understanding-financial-statements',
                  orderIndex: 2,
                  durationMinutes: 60
                }
              ]
            }
          }
        }
      }
    });

    // Get the first lesson ID for testing
    const lessons = await prisma.lesson.findMany({
      where: {
        week: {
          courseId: testCourse.id
        }
      }
    });
    testLessonId = lessons[0].id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.userProgress.deleteMany({});
    await prisma.lesson.deleteMany({});
    await prisma.week.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.user.deleteMany({
      where: { email: 'test-lessons@example.com' }
    });
    await prisma.$disconnect();
  });

  describe('GET /api/lessons/search/:query', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/lessons/search/financial')
        .expect(401);

      expect(response.body.error).toBe('Access token required');
    });

    it('should return search results for authenticated user', async () => {
      const response = await request(app)
        .get('/api/lessons/search/financial')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      // Check search result structure
      const result = response.body[0];
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('week_title');
      expect(result).toHaveProperty('course_title');
      
      // Verify that results contain the search term
      const containsSearchTerm = response.body.some((lesson: any) => 
        lesson.title.toLowerCase().includes('financial') ||
        lesson.snippet?.toLowerCase().includes('financial')
      );
      expect(containsSearchTerm).toBe(true);
    });

    it('should return empty array for non-matching search', async () => {
      const response = await request(app)
        .get('/api/lessons/search/nonexistentterm')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('should reject short search queries', async () => {
      const response = await request(app)
        .get('/api/lessons/search/a')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      expect(response.body.error).toBe('Search query must be at least 2 characters');
    });

    it('should handle search with special characters', async () => {
      const response = await request(app)
        .get('/api/lessons/search/financial%20planning')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/lessons/:id/access', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .post(`/api/lessons/${testLessonId}/access`)
        .expect(401);

      expect(response.body.error).toBe('Access token required');
    });

    it('should track lesson access for authenticated user', async () => {
      const response = await request(app)
        .post(`/api/lessons/${testLessonId}/access`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success');
      expect(response.body.success).toBe(true);
    });

    it('should handle multiple access tracking calls', async () => {
      // First access
      await request(app)
        .post(`/api/lessons/${testLessonId}/access`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Second access (should update existing record)
      const response = await request(app)
        .post(`/api/lessons/${testLessonId}/access`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should return 404 for non-existent lesson', async () => {
      const response = await request(app)
        .post('/api/lessons/non-existent-id/access')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.error).toBe('Lesson not found');
    });
  });

  describe('GET /api/lessons/:id', () => {
    it('should return lesson details', async () => {
      const response = await request(app)
        .get(`/api/lessons/${testLessonId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('content');
      expect(response.body).toHaveProperty('durationMinutes');
      expect(response.body.id).toBe(testLessonId);
    });

    it('should return 404 for non-existent lesson', async () => {
      const response = await request(app)
        .get('/api/lessons/non-existent-id')
        .expect(404);

      expect(response.body.error).toBe('Lesson not found');
    });
  });
});