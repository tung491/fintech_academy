const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function setupTestDatabases() {
  const testDatabases = [
    'test-auth.db',
    'test-courses.db', 
    'test-lessons.db',
    'test.db'
  ];

  for (const dbFile of testDatabases) {
    console.log(`Setting up ${dbFile}...`);
    
    // Create empty database file
    if (fs.existsSync(dbFile)) {
      fs.unlinkSync(dbFile);
    }
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: `file:./${dbFile}`
        }
      }
    });

    try {
      // Create all tables by trying to run a simple query that will trigger schema creation
      await prisma.$executeRaw`PRAGMA foreign_keys = ON`;
      
      // Create tables using raw SQL based on the schema
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "email" TEXT NOT NULL UNIQUE,
          "password_hash" TEXT NOT NULL,
          "first_name" TEXT NOT NULL,
          "last_name" TEXT NOT NULL,
          "role" TEXT NOT NULL DEFAULT 'student',
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "courses" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "title" TEXT NOT NULL,
          "slug" TEXT NOT NULL UNIQUE,
          "description" TEXT NOT NULL,
          "order_index" INTEGER NOT NULL,
          "is_published" BOOLEAN NOT NULL DEFAULT false,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "weeks" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "course_id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "week_number" INTEGER NOT NULL,
          "overview" TEXT NOT NULL,
          "learning_objectives" TEXT,
          "estimated_hours" INTEGER NOT NULL,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "lessons" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "week_id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "slug" TEXT NOT NULL,
          "content" TEXT NOT NULL,
          "order_index" INTEGER NOT NULL,
          "lesson_type" TEXT NOT NULL DEFAULT 'lecture',
          "duration_minutes" INTEGER,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("week_id") REFERENCES "weeks"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          UNIQUE("week_id", "slug")
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "quizzes" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "week_id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "passing_score" INTEGER NOT NULL,
          "max_attempts" INTEGER NOT NULL,
          "time_limit_minutes" INTEGER,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("week_id") REFERENCES "weeks"("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "questions" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "quiz_id" TEXT NOT NULL,
          "question_text" TEXT NOT NULL,
          "question_type" TEXT NOT NULL,
          "options" TEXT NOT NULL,
          "correct_answer" TEXT NOT NULL,
          "explanation" TEXT,
          "order_index" INTEGER NOT NULL,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "quiz_attempts" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "user_id" TEXT NOT NULL,
          "quiz_id" TEXT NOT NULL,
          "score" INTEGER NOT NULL,
          "answers" TEXT NOT NULL,
          "started_at" DATETIME NOT NULL,
          "completed_at" DATETIME,
          "time_taken_minutes" INTEGER,
          FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "user_enrollments" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "user_id" TEXT NOT NULL,
          "course_id" TEXT NOT NULL,
          "enrolled_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "completed_at" DATETIME,
          "progress_percentage" INTEGER NOT NULL DEFAULT 0,
          FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          UNIQUE("user_id", "course_id")
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "user_progress" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "user_id" TEXT NOT NULL,
          "lesson_id" TEXT NOT NULL,
          "completed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "time_spent_minutes" INTEGER,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          UNIQUE("user_id", "lesson_id")
        );
      `;

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "bookmarks" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "user_id" TEXT NOT NULL,
          "lesson_id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "description" TEXT,
          "section_text" TEXT,
          "position" INTEGER,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          UNIQUE("user_id", "lesson_id", "position")
        );
      `;

      console.log(`✅ ${dbFile} setup completed`);
    } catch (error) {
      console.error(`❌ Error setting up ${dbFile}:`, error.message);
    } finally {
      await prisma.$disconnect();
    }
  }
}

setupTestDatabases().catch(console.error);