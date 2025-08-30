import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set required environment variables for tests
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key_for_testing_only';
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';
process.env.NODE_ENV = 'test';

// Initialize test database
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./test.db'
    }
  }
});

// Global test setup
beforeAll(async () => {
  // Setup test database
  console.log('Setting up test database...');
});

// Global test teardown  
afterAll(async () => {
  // Clean up test database
  console.log('Cleaning up test database...');
  await prisma.$disconnect();
});

// Clean up between tests
afterEach(async () => {
  // Clean up any test data if needed
});

export { prisma };