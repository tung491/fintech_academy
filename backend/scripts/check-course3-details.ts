import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCourse3Details() {
  try {
    const course3 = await prisma.course.findFirst({
      where: { slug: 'personal-finance-tech' },
      include: {
        weeks: {
          include: {
            lessons: true,
            quizzes: true
          }
        }
      }
    });

    if (!course3) {
      console.log('Course 3 not found');
      return;
    }

    console.log(`Course: ${course3.title}`);
    console.log(`Weeks: ${course3.weeks.length}`);
    
    course3.weeks.forEach(week => {
      console.log(`\nWeek ${week.weekNumber}: ${week.title}`);
      console.log(`  Lessons: ${week.lessons.length}`);
      console.log(`  Quizzes: ${week.quizzes.length}`);
      
      week.lessons.forEach(lesson => {
        console.log(`    - ${lesson.title}`);
      });
    });

  } catch (error) {
    console.error('Error checking course 3 details:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCourse3Details();