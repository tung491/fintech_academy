const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient({
    datasourceUrl: 'file:./finacademy.db'
  });

  const courses = await prisma.courses.findMany({
    select: {
      id: true,
      title: true,
      skillsLearned: true
    },
    take: 3
  });

  console.log('Sample courses with skillsLearned:');
  courses.forEach(course => {
    console.log(`\nCourse: ${course.title}`);
    console.log(`Skills Type: ${typeof course.skillsLearned}`);
    console.log(`Skills Value: ${JSON.stringify(course.skillsLearned)}`);
    if (course.skillsLearned) {
      console.log(`First 50 chars: ${course.skillsLearned.substring(0, 50)}...`);
    }
  });

  await prisma.$disconnect();
}

main().catch(console.error);