import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addCourse2Week3() {
  console.log('Creating Week 3: Business Registration and Compliance Requirements...')

  try {
    // Get Course 2
    const course = await prisma.course.findFirst({
      where: { slug: 'business-structure-legal' }
    })

    if (!course) {
      throw new Error('Course 2: Business Structure & Legal Foundations not found')
    }

    // Create Week 3: Business Registration and Compliance Requirements
    const week3 = await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: 3,
        title: 'Business Registration and Compliance Requirements',
        overview: 'Navigate the essential business registration processes, licensing requirements, tax obligations, and ongoing compliance responsibilities for developer businesses.',
        learningObjectives: JSON.stringify([
          'Complete business registration processes efficiently',
          'Understand licensing and permit requirements',
          'Master tax registration and obligations',
          'Implement ongoing compliance systems',
          'Manage regulatory requirements for different business types'
        ]),
        estimatedHours: 8
      }
    })

    // Create Week 3 Lessons
    const lesson1 = await prisma.lesson.create({
      data: {
        weekId: week3.id,
        title: 'Business Registration Essentials',
        slug: 'business-registration-essentials',
        content: '# Business Registration Essentials\\n\\nThis lesson covers the essential steps for registering your developer business, from EIN registration to state filing requirements. You will learn about federal registration requirements, state-specific processes, and local business license applications.\\n\\n## Key Topics\\n\\n- Federal EIN registration process\\n- State entity formation requirements\\n- Local business license applications\\n- Multi-state registration considerations\\n- Registration timeline and planning\\n\\n## Learning Outcomes\\n\\nBy the end of this lesson, you will understand how to navigate the business registration process efficiently and avoid common pitfalls that can delay your business launch.',
        orderIndex: 1,
        lessonType: 'lecture',
        durationMinutes: 65
      }
    })

    const lesson2 = await prisma.lesson.create({
      data: {
        weekId: week3.id,
        title: 'Licensing and Permits for Developer Businesses',
        slug: 'licensing-permits-developer-businesses',
        content: '# Licensing and Permits for Developer Businesses\\n\\nUnderstand the licensing landscape for developer businesses, from general business licenses to industry-specific permits. Learn when professional licenses are required and how to maintain compliance.\\n\\n## Key Topics\\n\\n- General business license requirements\\n- Professional licensing for software development\\n- Industry-specific permits (FinTech, Healthcare, etc.)\\n- Sales tax permits and compliance\\n- International business licensing\\n\\n## Learning Outcomes\\n\\nYou will be able to identify all required licenses for your business type, understand the application process, and implement systems for ongoing compliance monitoring.',
        orderIndex: 2,
        lessonType: 'lecture',
        durationMinutes: 60
      }
    })

    const lesson3 = await prisma.lesson.create({
      data: {
        weekId: week3.id,
        title: 'Tax Obligations and Ongoing Compliance',
        slug: 'tax-obligations-ongoing-compliance',
        content: '# Tax Obligations and Ongoing Compliance\\n\\nMaster the complex world of business tax obligations, from federal requirements to state and local compliance. Learn about record-keeping, quarterly payments, and ongoing compliance management.\\n\\n## Key Topics\\n\\n- Federal tax obligations by entity type\\n- Self-employment tax considerations\\n- Quarterly estimated tax payments\\n- State and local tax requirements\\n- Record-keeping requirements\\n- Ongoing compliance management\\n\\n## Learning Outcomes\\n\\nYou will understand your specific tax obligations, implement proper record-keeping systems, and develop strategies for managing ongoing tax and regulatory compliance.',
        orderIndex: 3,
        lessonType: 'lecture',
        durationMinutes: 75
      }
    })

    console.log('Created lesson:', lesson1.title)
    console.log('Created lesson:', lesson2.title)
    console.log('Created lesson:', lesson3.title)

    // Create Week 3 Quiz
    const week3Quiz = await prisma.quiz.create({
      data: {
        weekId: week3.id,
        title: 'Week 3: Business Registration and Compliance Assessment',
        description: 'Test your understanding of business registration, licensing, and ongoing tax compliance requirements',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 35
      }
    })

    // Create Week 3 Quiz Questions
    const questions = [
      {
        questionText: 'Which federal registration is required for all LLCs, even single-member LLCs?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['Business license', 'EIN (Employer Identification Number)', 'Sales tax permit', 'Professional license']),
        correctAnswer: 'EIN (Employer Identification Number)',
        explanation: 'All LLCs must obtain an EIN from the IRS, even single-member LLCs, for tax filing purposes and to open business bank accounts.',
        points: 1,
        orderIndex: 1
      },
      {
        questionText: 'At what annual income level do sole proprietors typically need to make quarterly estimated tax payments?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['$400', '$1,000', '$5,000', '$10,000']),
        correctAnswer: '$1,000',
        explanation: 'Sole proprietors who expect to owe $1,000 or more in taxes annually are generally required to make quarterly estimated tax payments to avoid underpayment penalties.',
        points: 1,
        orderIndex: 2
      },
      {
        questionText: 'What is the current self-employment tax rate for developers operating as sole proprietors?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['12.4%', '15.3%', '21%', '28%']),
        correctAnswer: '15.3%',
        explanation: 'Self-employment tax is 15.3% (12.4% for Social Security + 2.9% for Medicare) on net earnings from self-employment, though 50% of the SE tax is deductible as a business expense.',
        points: 1,
        orderIndex: 3
      },
      {
        questionText: 'True or False: Software development services are typically subject to state sales tax.',
        questionType: 'true-false',
        options: JSON.stringify(['True', 'False']),
        correctAnswer: 'False',
        explanation: 'Software development services (custom programming, consulting) are generally not subject to state sales tax, though digital products and SaaS subscriptions often are taxable. This varies by state.',
        points: 1,
        orderIndex: 4
      },
      {
        questionText: 'How long should businesses generally keep tax records according to IRS requirements?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['1 year', '3 years', '7 years', '10 years']),
        correctAnswer: '3 years',
        explanation: 'The IRS generally requires businesses to keep tax records for 3 years from the filing date, though this extends to 6 years if income is understated by 25% or more, and indefinitely for fraudulent returns or non-filed returns.',
        points: 1,
        orderIndex: 5
      }
    ]

    for (const questionData of questions) {
      await prisma.question.create({
        data: {
          quizId: week3Quiz.id,
          ...questionData
        }
      })
    }

    console.log('✅ Successfully created Week 3: Business Registration and Compliance Requirements')
    console.log('📚 Week 3 Content Summary:')
    console.log('   - 3 comprehensive lessons covering registration, licensing, and tax compliance')
    console.log('   - 1 assessment quiz with 5 questions')
    console.log('   - Total duration: ~200 minutes of content')
    
    console.log('')
    console.log('🎉 COURSE 2 COMPLETION SUMMARY:')
    console.log('📚 Course 2: Business Structure & Legal Foundations - COMPLETE')
    console.log('   - Duration: 3 weeks')
    console.log('   - Total Lessons: 9 comprehensive lessons')
    console.log('   - Total Quizzes: 3 assessment quizzes (15 questions total)')
    console.log('   - Total Content Time: ~560 minutes (9+ hours)')
    console.log('   - Coverage: Entity formation, contracts, IP, registration, compliance')
    console.log('   - Target Audience: Developers starting businesses')

  } catch (error) {
    console.error('Error creating Week 3:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

addCourse2Week3()
  .catch((error) => {
    console.error('Failed to create Week 3:', error)
    process.exit(1)
  })