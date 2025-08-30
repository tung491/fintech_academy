import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCourses() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        categoryId: true
      }
    });

    console.log('Existing courses:');
    courses.forEach(course => {
      console.log(`- ${course.title} (${course.slug}) - ID: ${course.id}`);
    });

    console.log(`\nTotal courses: ${courses.length}`);

  } catch (error) {
    console.error('Error checking courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCourses();