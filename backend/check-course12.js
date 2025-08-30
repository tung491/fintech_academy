const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCourse12() {
  console.log('🔍 Checking Course 12 status...');

  try {
    // Check all courses
    const allCourses = await prisma.course.findMany({
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        orderIndex: true,
        isPublished: true,
        _count: {
          select: {
            weeks: true,
            enrollments: true
          }
        }
      }
    });

    console.log('\n📚 All Courses:');
    allCourses.forEach(course => {
      console.log(`- ${course.orderIndex}: ${course.title} (${course.slug})`);
      console.log(`  Published: ${course.isPublished}, Weeks: ${course._count.weeks}, Enrollments: ${course._count.enrollments}`);
    });

    // Check Course 12 specifically
    const course12 = await prisma.course.findUnique({
      where: { slug: 'corporate-finance-scale-ups' },
      include: {
        weeks: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                slug: true,
                orderIndex: true
              }
            },
            quizzes: {
              select: {
                id: true,
                title: true,
                _count: {
                  select: {
                    questions: true
                  }
                }
              }
            }
          },
          orderBy: { weekNumber: 'asc' }
        }
      }
    });

    if (course12) {
      console.log('\n🎯 Course 12: Corporate Finance for Scale-ups Details:');
      console.log(`- Title: ${course12.title}`);
      console.log(`- Instructor: ${course12.instructor}`);
      console.log(`- Duration: ${course12.duration}`);
      console.log(`- Price: $${course12.price}`);
      console.log(`- Published: ${course12.isPublished}`);
      console.log(`- Weeks: ${course12.weeks.length}`);
      
      console.log('\n📖 Weeks and Content:');
      course12.weeks.forEach(week => {
        console.log(`\nWeek ${week.weekNumber}: ${week.title}`);
        console.log(`  Lessons: ${week.lessons.length}`);
        week.lessons.forEach(lesson => {
          console.log(`    - ${lesson.title}`);
        });
        console.log(`  Quizzes: ${week.quizzes.length}`);
        week.quizzes.forEach(quiz => {
          console.log(`    - ${quiz.title} (${quiz._count.questions} questions)`);
        });
      });
    } else {
      console.log('\n❌ Course 12 not found in database!');
    }

  } catch (error) {
    console.error('❌ Error checking Course 12:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCourse12();