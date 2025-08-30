// Use the standard test database as configured in .env.test

import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from '../src/routes/auth';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Test database setup - use same database as .env.test
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./test.db'
    }
  }
});

describe('Authentication API', () => {
  beforeAll(async () => {
    // Ensure test database is clean
    await prisma.$connect();
    
    // Clean up any existing test users
    await prisma.user.deleteMany({
      where: {
        OR: [
          { email: { startsWith: 'test' } },
          { email: { contains: '@example.com' } }
        ]
      }
    });
  });

  afterAll(async () => {
    // Clean up test database
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  afterEach(async () => {
    // Clean up test users after each test
    await prisma.user.deleteMany({
      where: {
        OR: [
          { email: { startsWith: 'test' } },
          { email: { contains: '@example.com' } }
        ]
      }
    });
  });

  describe('POST /api/auth/register', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    it('should register a new user successfully', async () => {
      // Check if user exists before attempting registration
      const existingUser = await prisma.user.findUnique({
        where: { email: validUser.email }
      });
      console.log('Existing user check:', existingUser ? 'User exists' : 'No user found');

      const response = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      if (response.status !== 201) {
        console.log('Registration failed with status:', response.status);
        console.log('Response body:', JSON.stringify(response.body, null, 2));
      }

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(validUser.email);
      expect(response.body.user.firstName).toBe(validUser.firstName);
      expect(response.body.user.lastName).toBe(validUser.lastName);
      expect(response.body.user).not.toHaveProperty('passwordHash');
    });

    it('should reject registration with invalid email', async () => {
      const invalidUser = { ...validUser, email: 'invalid-email' };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });

    it('should reject registration with short password', async () => {
      const invalidUser = { ...validUser, password: '123' };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });

    it('should reject registration with missing required fields', async () => {
      const invalidUser = { email: validUser.email, password: validUser.password };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });

    it('should reject duplicate email registration', async () => {
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send(validUser)
        .expect(201);

      // Duplicate registration
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUser)
        .expect(400);

      expect(response.body.error).toBe('Email already registered');
    });
  });

  describe('POST /api/auth/login', () => {
    const testUser = {
      email: 'test-login@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'Login'
    };

    beforeEach(async () => {
      // Register user for login tests
      await request(app)
        .post('/api/auth/register')
        .send(testUser);
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user).not.toHaveProperty('passwordHash');
    });

    it('should reject login with invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password
        })
        .expect(401);

      expect(response.body.error).toBe('Invalid credentials');
    });

    it('should reject login with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.error).toBe('Invalid credentials');
    });

    it('should reject login with malformed email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'invalid-email',
          password: testUser.password
        })
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/auth/me', () => {
    let authToken: string;
    const testUser = {
      email: 'test-me@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'Me'
    };

    beforeEach(async () => {
      // Register and get auth token
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      authToken = registerResponse.body.token;
    });

    it('should return user data for authenticated user', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.email).toBe(testUser.email);
      expect(response.body.firstName).toBe(testUser.firstName);
      expect(response.body.lastName).toBe(testUser.lastName);
      expect(response.body).not.toHaveProperty('passwordHash');
    });

    it('should reject request without auth token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.error).toBe('Please authenticate');
    });

    it('should reject request with invalid auth token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.error).toBe('Please authenticate');
    });
  });
});