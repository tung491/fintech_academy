const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRecords() {
  try {
    console.log('🔍 Checking database records...');
    
    // Check if user exists
    const userId = 'cmewvfle00001vbp4szh7x8d9';
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    console.log('User exists:', !!user, user ? user.email : 'NOT FOUND');
    
    // Check if lesson exists
    const lessonId = 'cmexeuw1x0006vb2a52pu4c5h';
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });
    console.log('Lesson exists:', !!lesson, lesson ? lesson.title : 'NOT FOUND');
    
    // Check existing user progress for this combination
    const existingProgress = await prisma.userProgress.findMany({
      where: {
        userId: userId,
        lessonId: lessonId
      }
    });
    console.log('Existing progress records:', existingProgress.length);
    
    // List all users
    const allUsers = await prisma.user.findMany();
    console.log('\n📋 All users in database:');
    allUsers.forEach(u => console.log(`- ${u.id}: ${u.email}`));
    
    // List all lessons  
    const allLessons = await prisma.lesson.findMany({
      take: 5
    });
    console.log('\n📚 First 5 lessons in database:');
    allLessons.forEach(l => console.log(`- ${l.id}: ${l.title}`));
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRecords();