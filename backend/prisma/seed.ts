import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@finacademy.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
  })

  // Create student user
  const studentPassword = await bcrypt.hash('student123', 10)
  const student = await prisma.user.create({
    data: {
      email: 'student@example.com',
      passwordHash: studentPassword,
      firstName: 'Test',
      lastName: 'Student',
      role: 'student',
    },
  })

  // Create course
  const course = await prisma.course.create({
    data: {
      title: 'Financial and Accounting Knowledge for Developers',
      slug: 'finacademy-for-developers',
      description: 'A comprehensive course teaching financial and accounting knowledge specifically for developers to run their own businesses.',
      orderIndex: 1,
      isPublished: true,
    },
  })

  // Create Week 1
  const week1 = await prisma.week.create({
    data: {
      courseId: course.id,
      weekNumber: 1,
      title: 'Financial Literacy Basics & Business Mindset',
      overview: 'Introduction to financial thinking for developers. Understanding money, value creation, and the entrepreneurial mindset.',
      learningObjectives: JSON.stringify([
        'Understand the time value of money',
        'Learn basic financial terminology',
        'Develop a business-oriented mindset',
        'Understand revenue vs profit',
        'Learn about cash flow fundamentals'
      ]),
      estimatedHours: 8,
    },
  })

  // Create lessons for Week 1
  const lesson1 = await prisma.lesson.create({
    data: {
      weekId: week1.id,
      title: 'Introduction to Financial Mindset for Developers',
      slug: 'financial-mindset-intro',
      content: `# Introduction to Financial Mindset for Developers

## The Developer's Financial Journey

As a developer, you possess valuable technical skills, but transitioning from employee to entrepreneur requires a fundamental shift in how you think about money, value, and business.

### Why Financial Literacy Matters for Developers

**1. The Value Creation vs Value Capture Gap**
- Creating value: Building great products and services
- Capturing value: Converting that into revenue and profit
- The gap between the two is where many developer businesses fail

**2. The Developer's Advantage**
- Low capital requirements for software businesses
- High scalability potential
- Recurring revenue opportunities
- Global market access

**3. Common Financial Pitfalls for Developers**
- Underpricing services
- Not tracking time and costs
- Mixing personal and business finances
- Ignoring cash flow management
- Not planning for taxes

### The Business Mindset Shift

Moving from employee to entrepreneur requires fundamental shifts:

1. **From Hours to Value**: Stop thinking about hourly rates, start thinking about value delivered
2. **From Technical to Strategic**: Balance technical excellence with business strategy
3. **From Individual to Systems**: Build processes and systems, not just code
4. **From Present to Future**: Consider long-term financial implications of decisions

### Financial Metrics That Matter

As a developer-entrepreneur, focus on:
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Gross Margin
- Burn Rate (if funded) or Profit Margin (if bootstrapped)

### Setting Financial Goals

Start with clear, measurable financial objectives:
- Revenue targets (monthly/annual)
- Profit margins to maintain
- Emergency fund goals (3-6 months expenses)
- Investment in growth vs. personal income

### Action Items
1. Define your financial goals for the next 12 months
2. Identify your current revenue streams
3. Calculate your true hourly cost (including all overheads)
4. Set up separate business and personal bank accounts`,
      orderIndex: 1,
      lessonType: 'lecture',
      durationMinutes: 45,
    },
  })

  const lesson2 = await prisma.lesson.create({
    data: {
      weekId: week1.id,
      title: 'Time Value of Money',
      slug: 'time-value-of-money',
      content: `# Time Value of Money

## Understanding Present vs Future Value

The time value of money is one of the most fundamental concepts in finance. Simply put: money available today is worth more than the same amount in the future.

### Why Money Today is Worth More

**1. Investment Opportunity**
- Money today can be invested to earn returns
- Even risk-free investments (government bonds) provide positive returns
- Example: $1,000 today at 5% annual return = $1,050 in one year

**2. Inflation Effect**
- General price levels increase over time
- Your purchasing power decreases
- $1,000 today buys more than $1,000 will buy next year

**3. Risk and Uncertainty**
- Future payments carry uncertainty
- Business might fail, client might not pay
- "A bird in the hand is worth two in the bush"

### Present Value Calculations

Formula: PV = FV / (1 + r)^n
- PV = Present Value
- FV = Future Value  
- r = Interest rate
- n = Number of periods

Example: What's $1,000 in one year worth today at 8% discount rate?
PV = $1,000 / (1 + 0.08)^1 = $925.93

### Applications for Developers

**1. Pricing Decisions**
- Should you take $5,000 upfront or $6,000 in 6 months?
- Factor in opportunity cost of capital

**2. Investment Decisions**
- Server infrastructure: lease vs buy
- Education/training: cost today vs future income increase
- Hiring decisions: salary cost vs productivity gain

**3. Client Payment Terms**
- Offer discounts for upfront payment
- Factor time value into contract negotiations
- Understanding when to factor or not

### Practical Exercise

Calculate scenarios:
1. Client offers $10,000 today or $11,000 in 8 months (assume 10% annual rate)
2. Server costs $2,000 to buy or $200/month to lease for 12 months
3. Course costs $500 today but could increase income by $200/month

### Key Takeaways

- Always consider the time dimension in financial decisions
- Account for opportunity costs in pricing
- Use present value calculations for major business decisions
- Factor in risk when determining appropriate discount rates`,
      orderIndex: 2,
      lessonType: 'lecture',
      durationMinutes: 30,
    },
  })

  // Create quiz for Week 1
  const quiz1 = await prisma.quiz.create({
    data: {
      weekId: week1.id,
      title: 'Week 1: Financial Fundamentals Assessment',
      description: 'Test your understanding of basic financial concepts and business models',
      passingScore: 70,
      maxAttempts: 3,
      timeLimitMinutes: 30,
    },
  })

  // Create questions for the quiz
  await prisma.question.createMany({
    data: [
      {
        quizId: quiz1.id,
        questionText: 'What is the primary reason money today is worth more than money in the future?',
        questionType: 'multiple_choice',
        options: JSON.stringify(['Inflation only', 'Opportunity cost, inflation, and risk', 'Government regulations', 'Market volatility']),
        correctAnswer: 'Opportunity cost, inflation, and risk',
        explanation: 'Money today can be invested to earn returns, loses purchasing power over time due to inflation, and future payments carry uncertainty.',
        points: 2,
        orderIndex: 1,
      },
      {
        quizId: quiz1.id,
        questionText: 'If a SaaS business has a CAC of $1,000 and an LTV of $2,500, what is their LTV:CAC ratio and is it healthy?',
        questionType: 'multiple_choice',
        options: JSON.stringify(['2.5:1 - Healthy', '2.5:1 - Unhealthy', '0.4:1 - Healthy', '0.4:1 - Unhealthy']),
        correctAnswer: '2.5:1 - Healthy',
        explanation: 'LTV:CAC = $2,500/$1,000 = 2.5:1. While positive, this is below the ideal 3:1 ratio, indicating room for improvement in unit economics.',
        points: 3,
        orderIndex: 2,
      },
      {
        quizId: quiz1.id,
        questionText: 'What is the difference between gross margin and net margin?',
        questionType: 'multiple_choice',
        options: JSON.stringify(['Gross margin includes all expenses, net margin only includes COGS', 'Gross margin only subtracts COGS, net margin includes all expenses and taxes', 'They are the same thing', 'Gross margin is always lower than net margin']),
        correctAnswer: 'Gross margin only subtracts COGS, net margin includes all expenses and taxes',
        explanation: 'Gross margin = (Revenue - COGS)/Revenue, while Net margin = (Revenue - All Expenses - Taxes)/Revenue. Net margin is the true bottom-line profitability.',
        points: 2,
        orderIndex: 3,
      },
      {
        quizId: quiz1.id,
        questionText: 'Which business model typically has the highest gross margins?',
        questionType: 'multiple_choice',
        options: JSON.stringify(['Freelancing/Consulting', 'Agency/Development Shop', 'Digital Products/SaaS', 'Physical Products']),
        correctAnswer: 'Digital Products/SaaS',
        explanation: 'Digital products and SaaS typically achieve 85-95% gross margins due to near-zero marginal costs of distribution.',
        points: 2,
        orderIndex: 4,
      },
      {
        quizId: quiz1.id,
        questionText: 'What is the most important type of cash flow for business sustainability?',
        questionType: 'multiple_choice',
        options: JSON.stringify(['Investing cash flow', 'Financing cash flow', 'Operating cash flow', 'All are equally important']),
        correctAnswer: 'Operating cash flow',
        explanation: 'Operating cash flow from core business activities determines whether a business can sustain itself without external funding.',
        points: 2,
        orderIndex: 5,
      },
    ],
  })

  // Create additional weeks (2-12) with basic structure
  for (let weekNum = 2; weekNum <= 12; weekNum++) {
    await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: weekNum,
        title: `Week ${weekNum}: Advanced Financial Concepts`,
        overview: `Comprehensive coverage of advanced financial topics for developer-entrepreneurs.`,
        learningObjectives: JSON.stringify([
          `Master Week ${weekNum} concepts`,
          'Apply knowledge to real business scenarios',
          'Understand common pitfalls and best practices'
        ]),
        estimatedHours: 8,
      },
    })
  }

  // Enroll student in course
  await prisma.userEnrollment.create({
    data: {
      userId: student.id,
      courseId: course.id,
      progressPercentage: 0,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('🔐 Admin login: admin@finacademy.com / admin123')
  console.log('👤 Student login: student@example.com / student123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })