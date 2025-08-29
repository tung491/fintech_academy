import pool from './pool'
import bcrypt from 'bcryptjs'

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Generate UUIDs for SQLite (using random strings)
    const generateId = () => Math.random().toString(36).substr(2, 9)

    // Create main course
    const courseId = generateId()
    await pool.query(`
      INSERT INTO courses (id, title, slug, description, order_index, is_published)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      courseId,
      'Financial & Accounting Fundamentals for Developers',
      'finance-accounting-fundamentals',
      'A comprehensive 12-week course covering essential financial and accounting knowledge needed to run your own business as a developer. From basic bookkeeping to financial analysis and business strategy.',
      1,
      1
    ])

    // Week 1: Financial Literacy Basics
    const week1Id = generateId()
    await pool.query(`
      INSERT INTO weeks (id, course_id, week_number, title, overview, learning_objectives, estimated_hours)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      week1Id,
      courseId,
      1,
      'Financial Literacy Basics & Business Mindset',
      'Introduction to financial thinking for developers. Understanding money, value creation, and the entrepreneurial mindset.',
      JSON.stringify([
        'Understand the time value of money',
        'Learn basic financial terminology',
        'Develop a business-oriented mindset',
        'Understand revenue vs profit',
        'Learn about cash flow fundamentals'
      ]),
      8
    ])

    // Week 1 Lessons
    const lesson1Id = generateId()
    await pool.query(`
      INSERT INTO lessons (id, week_id, title, slug, content, order_index, lesson_type, duration_minutes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      lesson1Id,
      week1Id,
      'Introduction to Financial Thinking',
      'intro-financial-thinking',
      `# Introduction to Financial Thinking

## Why Developers Need Financial Knowledge

As a developer, you possess unique skills that can create tremendous value. However, turning that value into a sustainable business requires financial literacy.

### Key Concepts

**1. Value Creation vs Value Capture**
- Creating value: Building great products and services
- Capturing value: Converting that into revenue and profit

**2. The Developer's Advantage**
- Low capital requirements for software businesses
- High scalability potential
- Recurring revenue opportunities
- Global market access

### Financial Metrics That Matter

As a developer-entrepreneur, focus on:
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)  
- Lifetime Value (LTV)
- Gross Margin
- Burn Rate or Profit Margin`,
      1,
      'lecture',
      60
    ])

    // Week 1 Quiz
    const quiz1Id = generateId()
    await pool.query(`
      INSERT INTO quizzes (id, week_id, title, description, passing_score, max_attempts, time_limit_minutes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      quiz1Id,
      week1Id,
      'Week 1: Financial Fundamentals Assessment',
      'Test your understanding of basic financial concepts and business models',
      70,
      3,
      30
    ])

    // Week 1 Quiz Questions
    const question1Id = generateId()
    const question2Id = generateId()
    const question3Id = generateId()
    const question4Id = generateId()
    const question5Id = generateId()
    
    await pool.query(`
      INSERT INTO questions (id, quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      question1Id,
      quiz1Id,
      'What is the primary reason money today is worth more than money in the future?',
      'multiple_choice',
      JSON.stringify(['Inflation only', 'Opportunity cost, inflation, and risk', 'Government regulations', 'Market volatility']),
      'Opportunity cost, inflation, and risk',
      'Money today can be invested to earn returns, loses purchasing power over time due to inflation, and future payments carry uncertainty.',
      2,
      1
    ])
    
    await pool.query(`
      INSERT INTO questions (id, quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      question2Id,
      quiz1Id,
      'If a SaaS business has a CAC of $1,000 and an LTV of $2,500, what is their LTV:CAC ratio and is it healthy?',
      'multiple_choice',
      JSON.stringify(['2.5:1 - Healthy', '2.5:1 - Unhealthy', '0.4:1 - Healthy', '0.4:1 - Unhealthy']),
      '2.5:1 - Healthy',
      'LTV:CAC = $2,500/$1,000 = 2.5:1. While positive, this is below the ideal 3:1 ratio, indicating room for improvement in unit economics.',
      3,
      2
    ])
    
    await pool.query(`
      INSERT INTO questions (id, quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      question3Id,
      quiz1Id,
      'What is the difference between gross margin and net margin?',
      'multiple_choice',
      JSON.stringify(['Gross margin includes all expenses, net margin only includes COGS', 'Gross margin only subtracts COGS, net margin includes all expenses and taxes', 'They are the same thing', 'Gross margin is always lower than net margin']),
      'Gross margin only subtracts COGS, net margin includes all expenses and taxes',
      'Gross margin = (Revenue - COGS)/Revenue, while Net margin = (Revenue - All Expenses - Taxes)/Revenue. Net margin is the true bottom-line profitability.',
      2,
      3
    ])
    
    await pool.query(`
      INSERT INTO questions (id, quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      question4Id,
      quiz1Id,
      'Which business model typically has the highest gross margins?',
      'multiple_choice',
      JSON.stringify(['Freelancing/Consulting', 'Agency/Development Shop', 'Digital Products/SaaS', 'Physical Products']),
      'Digital Products/SaaS',
      'Digital products and SaaS typically achieve 85-95% gross margins due to near-zero marginal costs of distribution.',
      2,
      4
    ])
    
    await pool.query(`
      INSERT INTO questions (id, quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      question5Id,
      quiz1Id,
      'What is the most important type of cash flow for business sustainability?',
      'multiple_choice',
      JSON.stringify(['Investing cash flow', 'Financing cash flow', 'Operating cash flow', 'All are equally important']),
      'Operating cash flow',
      'Operating cash flow from core business activities determines whether a business can sustain itself without external funding.',
      2,
      5
    ])

    // Create additional weeks (2-12)
    for (let weekNum = 2; weekNum <= 12; weekNum++) {
      const weekId = generateId()
      await pool.query(`
        INSERT INTO weeks (id, course_id, week_number, title, overview, learning_objectives, estimated_hours)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        weekId,
        courseId,
        weekNum,
        `Week ${weekNum}: Advanced Financial Concepts`,
        `Comprehensive coverage of advanced financial topics for developer-entrepreneurs.`,
        JSON.stringify([
          `Master Week ${weekNum} concepts`,
          'Apply knowledge to real business scenarios',
          'Understand common pitfalls and best practices'
        ]),
        8
      ])
    }

    // Create admin user
    const adminId = generateId()
    const adminPassword = await bcrypt.hash('admin123', 10)
    await pool.query(`
      INSERT INTO users (id, email, password_hash, first_name, last_name, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [adminId, 'admin@finacademy.com', adminPassword, 'Admin', 'User', 'admin'])

    // Create test student
    const studentId = generateId()
    const studentPassword = await bcrypt.hash('student123', 10)
    await pool.query(`
      INSERT INTO users (id, email, password_hash, first_name, last_name, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [studentId, 'student@example.com', studentPassword, 'Test', 'Student', 'student'])

    console.log('✅ Database seeded successfully!')
    console.log('🔐 Admin login: admin@finacademy.com / admin123')
    console.log('👤 Student login: student@example.com / student123')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

export default seedData

// Run if called directly
if (require.main === module) {
  seedData().then(() => {
    console.log('🎉 Seeding complete')
    process.exit(0)
  }).catch((error) => {
    console.error('💥 Seeding failed:', error)
    process.exit(1)
  })
}