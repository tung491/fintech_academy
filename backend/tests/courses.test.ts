import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import coursesRoutes from '../src/routes/courses';
import authRoutes from '../src/routes/auth';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);

// Test database setup
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./test-courses.db'
    }
  }
});

describe('Courses API', () => {
  let authToken: string;
  let testCourseId: string;

  beforeAll(async () => {
    await prisma.$connect();
    
    // Create test user and get auth token
    const testUser = {
      email: 'test-courses@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'Courses'
    };

    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    authToken = registerResponse.body.token;

    // Create test course
    const testCourse = await prisma.course.create({
      data: {
        title: 'Test Course',
        description: 'A test course for API testing',
        slug: 'test-course',
        isPublished: true,
        orderIndex: 1,
        weeks: {
          create: [
            {
              title: 'Week 1',
              overview: 'First week',
              weekNumber: 1,
              estimatedHours: 8,
              lessons: {
                create: [
                  {
                    title: 'Test Lesson 1',
                    content: 'This is test lesson content',
                    slug: 'test-lesson-1',
                    orderIndex: 1,
                    durationMinutes: 30
                  },
                  {
                    title: 'Test Lesson 2',
                    content: 'This is another test lesson',
                    slug: 'test-lesson-2',
                    orderIndex: 2,
                    durationMinutes: 45
                  }
                ]
              }
            },
            {
              title: 'Week 2',
              overview: 'Second week',
              weekNumber: 2,
              estimatedHours: 6,
              lessons: {
                create: [
                  {
                    title: 'Test Lesson 3',
                    content: 'Third test lesson',
                    slug: 'test-lesson-3',
                    orderIndex: 1,
                    durationMinutes: 60
                  }
                ]
              }
            }
          ]
        }
      }
    });

    testCourseId = testCourse.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.lesson.deleteMany({});
    await prisma.week.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.user.deleteMany({
      where: { email: 'test-courses@example.com' }
    });
    await prisma.$disconnect();
  });

  describe('GET /api/courses', () => {
    it('should return all published courses', async () => {
      const response = await request(app)
        .get('/api/courses')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      const course = response.body.find((c: any) => c.id === testCourseId);
      expect(course).toBeDefined();
      expect(course.title).toBe('Test Course');
      expect(course.weekCount).toBe(2);
      expect(course.isPublished).toBe(true);
    });

    it('should include week count but not week details', async () => {
      const response = await request(app)
        .get('/api/courses')
        .expect(200);

      const course = response.body[0];
      expect(course).toHaveProperty('weekCount');
      expect(course.weeks).toBeUndefined();
    });
  });

  describe('GET /api/courses/:id', () => {
    it('should return specific course with weeks and lessons', async () => {
      const response = await request(app)
        .get(`/api/courses/${testCourseId}`)
        .expect(200);

      expect(response.body.id).toBe(testCourseId);
      expect(response.body.title).toBe('Test Course');
      expect(response.body.weeks).toBeDefined();
      expect(Array.isArray(response.body.weeks)).toBe(true);
      expect(response.body.weeks.length).toBe(2);
      
      // Check week structure
      const week1 = response.body.weeks[0];
      expect(week1.title).toBe('Week 1');
      expect(week1.lessons).toBeDefined();
      expect(week1.lessons.length).toBe(2);
      
      // Check lesson structure
      const lesson1 = week1.lessons[0];
      expect(lesson1.title).toBe('Test Lesson 1');
      expect(lesson1.durationMinutes).toBe(30);
    });

    it('should return 404 for non-existent course', async () => {
      const response = await request(app)
        .get('/api/courses/non-existent-id')
        .expect(404);

      expect(response.body.error).toBe('Course not found');
    });
  });

  describe('GET /api/courses/:courseId/progress', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get(`/api/courses/${testCourseId}/progress`)
        .expect(401);

      expect(response.body.error).toBe('Please authenticate');
    });

    it('should return progress data for authenticated user', async () => {
      const response = await request(app)
        .get(`/api/courses/${testCourseId}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('weeks');
      expect(Array.isArray(response.body.weeks)).toBe(true);
      expect(response.body.weeks.length).toBe(2);
      
      // Check progress structure
      const week1Progress = response.body.weeks[0];
      expect(week1Progress).toHaveProperty('weekId');
      expect(week1Progress).toHaveProperty('weekTitle');
      expect(week1Progress).toHaveProperty('isCompleted');
      expect(week1Progress).toHaveProperty('lessonsCompleted');
      expect(week1Progress).toHaveProperty('totalLessons');
    });

    it('should return 404 for non-existent course progress', async () => {
      const response = await request(app)
        .get('/api/courses/non-existent-id/progress')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.error).toBe('Course not found');
    });
  });

  describe('GET /api/courses/:courseId/week/:weekNumber', () => {
    it('should return specific week with lessons', async () => {
      const response = await request(app)
        .get(`/api/courses/${testCourseId}/week/1`)
        .expect(200);

      expect(response.body.weekNumber).toBe(1);
      expect(response.body.title).toBe('Week 1');
      expect(response.body.lessons).toBeDefined();
      expect(response.body.lessons.length).toBe(2);
      
      const lesson = response.body.lessons[0];
      expect(lesson.title).toBe('Test Lesson 1');
      expect(lesson.content).toBe('This is test lesson content');
    });

    it('should return 404 for non-existent week', async () => {
      const response = await request(app)
        .get(`/api/courses/${testCourseId}/week/999`)
        .expect(404);

      expect(response.body.error).toBe('Week not found');
    });

    it('should return 404 for non-existent course', async () => {
      const response = await request(app)
        .get('/api/courses/non-existent-id/week/1')
        .expect(404);

      expect(response.body.error).toBe('Week not found');
    });
  });
});