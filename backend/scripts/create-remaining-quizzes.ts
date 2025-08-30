import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createRemainingQuizzes() {
  console.log('🚀 Creating Remaining Quizzes for Weeks 8-12...')

  try {
    // Get the existing course
    const course = await prisma.course.findFirst({
      where: { slug: 'finacademy-for-developers' }
    })

    if (!course) {
      throw new Error('Course not found')
    }

    // Get weeks 8-12
    const weeks = await prisma.week.findMany({
      where: { 
        courseId: course.id,
        weekNumber: { in: [8, 9, 10, 11, 12] }
      },
      orderBy: { weekNumber: 'asc' }
    })

    // Week 8 Quiz: Tax Optimization and Planning
    const week8 = weeks.find(w => w.weekNumber === 8)
    if (week8) {
      console.log('📝 Creating Week 8 Quiz: Tax Optimization...')
      
      const quiz8 = await prisma.quiz.create({
        data: {
          weekId: week8.id,
          title: 'Week 8: Tax Optimization & Planning Assessment',
          description: 'Test your understanding of tax strategies, deductions, and business tax planning',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 30,
        },
      })

      await prisma.question.createMany({
        data: [
          {
            quizId: quiz8.id,
            questionText: 'Which business expense is typically the largest tax deduction for developer businesses?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Office supplies', 'Home office expenses', 'Business meals', 'Software subscriptions and tools']),
            correctAnswer: 'Software subscriptions and tools',
            explanation: 'For developers, software subscriptions and tools are typically the largest category of deductible business expenses.',
            points: 2,
            orderIndex: 1,
          },
          {
            quizId: quiz8.id,
            questionText: 'What percentage of your home can typically be deducted for a home office?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['The percentage of square footage used exclusively for business', '50% automatically', '25% maximum', 'The full home if you work from home']),
            correctAnswer: 'The percentage of square footage used exclusively for business',
            explanation: 'Home office deduction is based on the percentage of your home used exclusively and regularly for business purposes.',
            points: 2,
            orderIndex: 2,
          },
          {
            quizId: quiz8.id,
            questionText: 'What is the annual contribution limit for SEP-IRA in 2024?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['$6,500', '$23,000', '25% of income up to $69,000', '$66,000']),
            correctAnswer: '25% of income up to $69,000',
            explanation: 'SEP-IRA allows contributions up to 25% of compensation or $69,000 in 2024, whichever is less.',
            points: 3,
            orderIndex: 3,
          },
          {
            quizId: quiz8.id,
            questionText: 'When should quarterly estimated tax payments be made?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['January, April, July, October', 'March, June, September, December', 'April, June, September, January', 'Every three months from business start date']),
            correctAnswer: 'April, June, September, January',
            explanation: 'Quarterly estimated tax payments are due April 15, June 15, September 15, and January 15.',
            points: 2,
            orderIndex: 4,
          },
        ],
      })
    }

    // Week 9 Quiz: Risk Management and Insurance
    const week9 = weeks.find(w => w.weekNumber === 9)
    if (week9) {
      console.log('📝 Creating Week 9 Quiz: Risk Management...')
      
      const quiz9 = await prisma.quiz.create({
        data: {
          weekId: week9.id,
          title: 'Week 9: Risk Management & Insurance Assessment',
          description: 'Test your understanding of business risks, insurance coverage, and risk mitigation strategies',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 25,
        },
      })

      await prisma.question.createMany({
        data: [
          {
            quizId: quiz9.id,
            questionText: 'What type of insurance is most critical for developer consultants?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['General Liability', 'Professional Liability (E&O)', 'Property Insurance', 'Workers Compensation']),
            correctAnswer: 'Professional Liability (E&O)',
            explanation: 'Professional Liability (Errors & Omissions) insurance protects against claims related to professional services and mistakes.',
            points: 2,
            orderIndex: 1,
          },
          {
            quizId: quiz9.id,
            questionText: 'What is the primary purpose of cyber liability insurance?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Protect against hardware theft', 'Cover data breaches and cyber attacks', 'Insure software development costs', 'Protect against power outages']),
            correctAnswer: 'Cover data breaches and cyber attacks',
            explanation: 'Cyber liability insurance covers costs related to data breaches, cyber attacks, and privacy violations.',
            points: 2,
            orderIndex: 2,
          },
          {
            quizId: quiz9.id,
            questionText: 'Which risk management strategy involves sharing risk with another party?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Risk Avoidance', 'Risk Retention', 'Risk Transfer', 'Risk Reduction']),
            correctAnswer: 'Risk Transfer',
            explanation: 'Risk transfer involves shifting risk to another party, such as through insurance or contractual agreements.',
            points: 2,
            orderIndex: 3,
          },
          {
            quizId: quiz9.id,
            questionText: 'What should be included in a business continuity plan?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Only data backup procedures', 'Communication protocols and recovery procedures', 'Just insurance information', 'Only financial reserves']),
            correctAnswer: 'Communication protocols and recovery procedures',
            explanation: 'A comprehensive business continuity plan includes communication protocols, recovery procedures, backup systems, and contingency plans.',
            points: 2,
            orderIndex: 4,
          },
        ],
      })
    }

    // Week 10 Quiz: Scaling and Growth Finance
    const week10 = weeks.find(w => w.weekNumber === 10)
    if (week10) {
      console.log('📝 Creating Week 10 Quiz: Scaling & Growth...')
      
      const quiz10 = await prisma.quiz.create({
        data: {
          weekId: week10.id,
          title: 'Week 10: Scaling & Growth Finance Assessment',
          description: 'Test your understanding of growth financing, team building costs, and scaling strategies',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 30,
        },
      })

      await prisma.question.createMany({
        data: [
          {
            quizId: quiz10.id,
            questionText: 'What is the typical total cost of hiring an employee (including benefits and overhead)?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Salary only', '1.25x to 1.4x salary', '2x to 3x salary', '1.1x salary']),
            correctAnswer: '1.25x to 1.4x salary',
            explanation: 'The total cost of an employee typically ranges from 1.25x to 1.4x their salary when including benefits, taxes, and overhead.',
            points: 2,
            orderIndex: 1,
          },
          {
            quizId: quiz10.id,
            questionText: 'Which metric is most important when scaling a SaaS business?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Total customers', 'Revenue growth rate', 'Unit economics (LTV/CAC)', 'Market share']),
            correctAnswer: 'Unit economics (LTV/CAC)',
            explanation: 'Unit economics ensure that each new customer acquired is profitable and sustainable at scale.',
            points: 2,
            orderIndex: 2,
          },
          {
            quizId: quiz10.id,
            questionText: 'What is working capital, and why does it increase during rapid growth?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Fixed assets; they increase with expansion', 'Current assets minus current liabilities; growth requires more inventory and receivables', 'Only cash; you need more reserves', 'Total revenue; it grows with sales']),
            correctAnswer: 'Current assets minus current liabilities; growth requires more inventory and receivables',
            explanation: 'Working capital needs increase during growth as you need more cash for operations, higher receivables, and larger inventory.',
            points: 3,
            orderIndex: 3,
          },
          {
            quizId: quiz10.id,
            questionText: 'When scaling rapidly, what financial control becomes most critical?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Inventory management', 'Cash flow monitoring and forecasting', 'Fixed asset tracking', 'Long-term debt management']),
            correctAnswer: 'Cash flow monitoring and forecasting',
            explanation: 'During rapid scaling, cash flow monitoring becomes critical as growth often consumes cash faster than it generates it.',
            points: 2,
            orderIndex: 4,
          },
        ],
      })
    }

    // Week 11 Quiz: Exit Strategies and Valuation
    const week11 = weeks.find(w => w.weekNumber === 11)
    if (week11) {
      console.log('📝 Creating Week 11 Quiz: Exit Strategies...')
      
      const quiz11 = await prisma.quiz.create({
        data: {
          weekId: week11.id,
          title: 'Week 11: Exit Strategies & Valuation Assessment',
          description: 'Test your understanding of business valuation, exit planning, and succession strategies',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 30,
        },
      })

      await prisma.question.createMany({
        data: [
          {
            quizId: quiz11.id,
            questionText: 'Which valuation method is most commonly used for SaaS businesses?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Asset-based valuation', 'Revenue multiple (ARR multiple)', 'Book value', 'Replacement cost']),
            correctAnswer: 'Revenue multiple (ARR multiple)',
            explanation: 'SaaS businesses are typically valued using Annual Recurring Revenue (ARR) multiples, often 3-10x ARR depending on growth and metrics.',
            points: 2,
            orderIndex: 1,
          },
          {
            quizId: quiz11.id,
            questionText: 'What is the typical timeline for preparing a business for sale?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['1-3 months', '6-12 months', '2-3 years', '5+ years']),
            correctAnswer: '2-3 years',
            explanation: 'Properly preparing a business for sale typically takes 2-3 years to optimize financials, operations, and documentation.',
            points: 2,
            orderIndex: 2,
          },
          {
            quizId: quiz11.id,
            questionText: 'Which factor most significantly increases business valuation?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['High revenue', 'Predictable recurring revenue and growth', 'Large team size', 'Expensive office location']),
            correctAnswer: 'Predictable recurring revenue and growth',
            explanation: 'Predictable recurring revenue with consistent growth is the most valuable factor for business valuation.',
            points: 2,
            orderIndex: 3,
          },
          {
            quizId: quiz11.id,
            questionText: 'What is an earnout in a business acquisition?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['The total purchase price', 'Additional payment based on future performance', 'The down payment amount', 'The closing costs']),
            correctAnswer: 'Additional payment based on future performance',
            explanation: 'An earnout is additional payment to the seller based on the business achieving certain performance metrics after the sale.',
            points: 2,
            orderIndex: 4,
          },
        ],
      })
    }

    // Week 12 Quiz: Advanced Topics and Case Studies
    const week12 = weeks.find(w => w.weekNumber === 12)
    if (week12) {
      console.log('📝 Creating Week 12 Quiz: Advanced Topics...')
      
      const quiz12 = await prisma.quiz.create({
        data: {
          weekId: week12.id,
          title: 'Week 12: Advanced Topics & Integration Assessment',
          description: 'Test your comprehensive understanding of advanced financial topics and real-world application',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 35,
        },
      })

      await prisma.question.createMany({
        data: [
          {
            quizId: quiz12.id,
            questionText: 'When expanding internationally, what is the primary financial consideration?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Currency exchange rates and hedging', 'Local marketing costs', 'Time zone differences', 'Cultural preferences']),
            correctAnswer: 'Currency exchange rates and hedging',
            explanation: 'Currency exchange rate fluctuations can significantly impact revenue and costs, making hedging strategies crucial for international business.',
            points: 2,
            orderIndex: 1,
          },
          {
            quizId: quiz12.id,
            questionText: 'Which fintech integration provides the most comprehensive financial management for developer businesses?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Payment processing only', 'Accounting software with bank feeds and automation', 'Social media management', 'Email marketing tools']),
            correctAnswer: 'Accounting software with bank feeds and automation',
            explanation: 'Integrated accounting software with automated bank feeds provides comprehensive financial tracking and reporting.',
            points: 2,
            orderIndex: 2,
          },
          {
            quizId: quiz12.id,
            questionText: 'In financial modeling, what does "sensitivity analysis" help determine?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Exact future revenues', 'How changes in key variables affect outcomes', 'Historical performance only', 'Fixed costs breakdown']),
            correctAnswer: 'How changes in key variables affect outcomes',
            explanation: 'Sensitivity analysis tests how changes in key assumptions (pricing, growth rates, costs) impact financial projections.',
            points: 3,
            orderIndex: 3,
          },
          {
            quizId: quiz12.id,
            questionText: 'What is the most important factor for long-term financial success as a developer entrepreneur?',
            questionType: 'multiple_choice',
            options: JSON.stringify(['Having the latest technology', 'Systematic financial planning and regular review', 'Working long hours', 'Minimizing all expenses']),
            correctAnswer: 'Systematic financial planning and regular review',
            explanation: 'Consistent financial planning, monitoring, and regular review of performance against goals is crucial for long-term success.',
            points: 2,
            orderIndex: 4,
          },
        ],
      })
    }

    console.log('✅ All remaining quizzes created successfully!')
    console.log('📊 Curriculum is now complete with lessons and assessments for all 12 weeks')

  } catch (error) {
    console.error('❌ Error creating remaining quizzes:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

createRemainingQuizzes().catch(console.error)