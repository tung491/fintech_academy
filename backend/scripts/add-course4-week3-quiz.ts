import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addWeek3Quiz() {
  try {
    console.log('🎯 Adding missing quiz for Course 4, Week 3...');

    // Find Week 3 of Course 4
    const week3 = await prisma.week.findFirst({
      where: {
        course: {
          slug: 'bookkeeping-fundamentals-tech'
        },
        weekNumber: 3
      }
    });

    if (!week3) {
      throw new Error('Week 3 of Course 4 not found');
    }

    // Check if quiz already exists
    const existingQuiz = await prisma.quiz.findFirst({
      where: {
        weekId: week3.id
      }
    });

    if (existingQuiz) {
      console.log('⚠️ Quiz already exists for Week 3');
      return;
    }

    // Create Week 3 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week3.id,
        title: 'Expense Management Mastery Quiz',
        description: 'Test your understanding of expense categorization, tracking systems, and tax optimization strategies',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'Which of the following would be classified as Cost of Goods Sold (COGS) for a SaaS business?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Office rent and utilities',
                'AWS hosting and cloud infrastructure costs',
                'Marketing and advertising expenses',
                'Salaries for administrative staff'
              ]),
              correctAnswer: 'AWS hosting and cloud infrastructure costs',
              explanation: 'Cloud hosting and infrastructure costs are directly related to delivering your software service and should be classified as COGS, not operating expenses.',
              orderIndex: 1
            },
            {
              questionText: 'What is the maximum amount that can be deducted using the Section 179 deduction in 2023?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$500,000',
                '$1,160,000',
                '$25,000',
                'No limit'
              ]),
              correctAnswer: '$1,160,000',
              explanation: 'The Section 179 deduction allows businesses to immediately deduct up to $1,160,000 (2023 limit) for qualifying equipment purchases.',
              orderIndex: 2
            },
            {
              questionText: 'For home office expenses, what is the maximum deduction allowed under the simplified method?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$1,000 per year',
                '$1,500 per year',
                '$2,000 per year',
                '$2,500 per year'
              ]),
              correctAnswer: '$1,500 per year',
              explanation: 'The simplified home office method allows $5 per square foot up to 300 square feet, for a maximum of $1,500 per year.',
              orderIndex: 3
            },
            {
              questionText: 'Business meals are typically what percentage deductible?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '100% deductible',
                '75% deductible',
                '50% deductible',
                '25% deductible'
              ]),
              correctAnswer: '50% deductible',
              explanation: 'Business meals are generally 50% deductible, though there was a temporary 100% deduction for restaurant meals in 2021-2022.',
              orderIndex: 4
            },
            {
              questionText: 'What is the standard mileage rate for business use of a vehicle in 2024?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$0.58 per mile',
                '$0.62 per mile',
                '$0.67 per mile',
                '$0.70 per mile'
              ]),
              correctAnswer: '$0.67 per mile',
              explanation: 'The IRS standard mileage rate for business use of a vehicle is $0.67 per mile for 2024.',
              orderIndex: 5
            },
            {
              questionText: 'Which expense tracking practice is most important for tax compliance?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Using the most expensive software available',
                'Maintaining detailed documentation of business purpose for all expenses',
                'Only tracking expenses over $100',
                'Waiting until tax season to organize receipts'
              ]),
              correctAnswer: 'Maintaining detailed documentation of business purpose for all expenses',
              explanation: 'Proper documentation of business purpose is essential for tax compliance and maximizing deductions. The IRS requires clear business justification for all deductions.',
              orderIndex: 6
            },
            {
              questionText: 'Software subscriptions for business use should be categorized as:',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Cost of Goods Sold',
                'Operating Expenses',
                'Assets',
                'Equity'
              ]),
              correctAnswer: 'Operating Expenses',
              explanation: 'Software subscriptions are recurring operating expenses that support business operations, not direct costs of goods sold or capital assets.',
              orderIndex: 7
            },
            {
              questionText: 'When using expense management software, what is the most important integration to set up?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Social media integration',
                'Email marketing integration',
                'Bookkeeping software integration',
                'Customer support integration'
              ]),
              correctAnswer: 'Bookkeeping software integration',
              explanation: 'Integrating expense management software with your bookkeeping system automates data entry and ensures accurate financial records.',
              orderIndex: 8
            }
          ]
        }
      }
    });

    console.log('✅ Week 3 quiz added successfully!');

  } catch (error) {
    console.error('❌ Error adding Week 3 quiz:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addWeek3Quiz();