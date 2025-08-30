import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create or update admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@finacademy.com' },
    update: {},
    create: {
      email: 'admin@finacademy.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
  })

  // Create or update student user
  const studentPassword = await bcrypt.hash('student123', 10)
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      passwordHash: studentPassword,
      firstName: 'Test',
      lastName: 'Student',
      role: 'student',
    },
  })

  // Create or update course
  const course = await prisma.course.upsert({
    where: { slug: 'finacademy-for-developers' },
    update: {
      title: 'Financial and Accounting Knowledge for Developers',
      description: 'A comprehensive course teaching financial and accounting knowledge specifically for developers to run their own businesses.',
      orderIndex: 1,
      isPublished: true,
    },
    create: {
      title: 'Financial and Accounting Knowledge for Developers',
      slug: 'finacademy-for-developers',
      description: 'A comprehensive course teaching financial and accounting knowledge specifically for developers to run their own businesses.',
      orderIndex: 1,
      isPublished: true,
    },
  })

  // Create or update Week 1
  const week1 = await prisma.week.upsert({
    where: { 
      courseId_weekNumber: {
        courseId: course.id,
        weekNumber: 1
      }
    },
    update: {
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
    create: {
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

  // Create or update lessons for Week 1
  const lesson1 = await prisma.lesson.upsert({
    where: { 
      weekId_slug: {
        weekId: week1.id,
        slug: 'financial-mindset-intro'
      }
    },
    update: {
      title: 'Introduction to Financial Mindset for Developers',
      content: `# Introduction to Financial Mindset for Developers

## The Developer's Financial Journey

As a developer, you possess valuable technical skills, but transitioning from employee to entrepreneur requires a fundamental shift in how you think about money, value, and business.

[!info]
This lesson will transform your perspective on business finances and set the foundation for all future financial decisions in your developer journey.

### Why Financial Literacy Matters for Developers

**1. The Value Creation vs Value Capture Gap**
- Creating value: Building great products and services
- Capturing value: Converting that into revenue and profit
- The gap between the two is where many developer businesses fail

[!warning]
Many technically excellent developers fail in business not due to poor coding skills, but because they cannot effectively capture the value they create. Understanding finance bridges this critical gap.

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

[!tip]
The most common mistake developer-entrepreneurs make is pricing their services based on employee salary expectations rather than business value delivered. Your hourly rate as a business owner should be 2-3x your desired employee hourly rate to account for business expenses, taxes, and profit.

### The Business Mindset Shift

Moving from employee to entrepreneur requires fundamental shifts:

1. **From Hours to Value**: Stop thinking about hourly rates, start thinking about value delivered
2. **From Technical to Strategic**: Balance technical excellence with business strategy  
3. **From Individual to Systems**: Build processes and systems, not just code
4. **From Present to Future**: Consider long-term financial implications of decisions

### Financial Metrics That Matter

As a developer-entrepreneur, focus on these critical metrics:

- **Monthly Recurring Revenue (MRR)**: Predictable monthly income
- **Customer Acquisition Cost (CAC)**: What you spend to get each customer
- **Lifetime Value (LTV)**: Total revenue from average customer relationship
- **Gross Margin vs Net Margin**: (detailed analysis below)
- **Burn Rate or Profit Margin**: Monthly cash consumption or generation

### Understanding Gross vs Net Margin

[!example]
**Gross Margin Analysis**
- Formula: (Revenue - Cost of Goods Sold) / Revenue × 100
- Only subtracts direct costs to produce/deliver the service
- For software: hosting, payment processing, direct customer support
- **Example**: SaaS with 95% gross margin after hosting and payment fees

[!example]  
**Net Margin Analysis**
- Formula: (Revenue - All Expenses - Taxes) / Revenue × 100
- Includes ALL business expenses: salaries, marketing, office, legal, etc.
- True bottom-line profitability after everything
- **Example**: Same SaaS with 25% net margin after all expenses

**Why Both Matter:**
- Gross margin shows business model efficiency
- Net margin shows overall profitability and sustainability
- High gross margin with low net margin indicates high operational costs

### Business Model Comparison: Gross Margins

Different business models have varying gross margin potential:

**1. Digital Products/SaaS (85-95%)**
- Near-zero marginal distribution costs
- Highly scalable with low COGS
- Best gross margins but requires significant upfront investment

**2. Freelancing/Consulting (60-80%)**
- Time-based service delivery
- Main costs: your time and tools
- Limited scalability due to time constraints

**3. Agency/Development Shop (50-70%)**
- Team-based service delivery
- Costs: salaries, project management, overhead
- More scalable than freelancing but with higher costs

**4. Physical Products (20-50%)**
- Manufacturing, inventory, shipping costs
- Lowest gross margins but tangible value
- Complex supply chain management required

### Understanding Cash Flow Types

Understanding the three types of cash flow is crucial for business sustainability:

[!info]
**1. Operating Cash Flow (Most Important)**
- Cash from core business activities
- Revenue minus operating expenses  
- Indicates business sustainability without external funding
- **Positive operating cash flow = self-sustaining business**

**2. Investing Cash Flow**
- Cash spent on/received from investments
- Equipment purchases, property, securities
- Usually negative for growing businesses
- Shows investment in future growth

**3. Financing Cash Flow**
- Cash from/to investors and creditors
- Loans, equity investments, dividends
- Can be positive (raising funds) or negative (paying back)
- Shows external funding activities

[!tip]
Operating cash flow is the most critical metric for bootstrap developers. Focus on achieving positive operating cash flow before scaling or taking investments.

### Setting Financial Goals

Start with clear, measurable financial objectives:

- Revenue targets (monthly/annual)
- Profit margins to maintain
- Emergency fund goals (3-6 months expenses)
- Investment in growth vs. personal income

[!example]
**Sample Financial Goals for Year 1:**
- Achieve $10,000/month in operating cash flow
- Maintain 70%+ gross margins
- Build 6-month emergency fund
- Reinvest 30% of profits into growth

### Action Items

1. Define your financial goals for the next 12 months
2. Identify your current revenue streams
3. Calculate your true hourly cost (including all overheads)
4. Set up separate business and personal bank accounts

[!warning]
Never mix personal and business finances. This creates tax complications, makes financial analysis impossible, and can pierce the corporate veil if you're incorporated.`,
      orderIndex: 1,
      lessonType: 'lecture',
      durationMinutes: 45,
    },
    create: {
      weekId: week1.id,
      title: 'Introduction to Financial Mindset for Developers',
      slug: 'financial-mindset-intro',
      content: `# Introduction to Financial Mindset for Developers

## The Developer's Financial Journey

As a developer, you possess valuable technical skills, but transitioning from employee to entrepreneur requires a fundamental shift in how you think about money, value, and business.

[!info]
This lesson will transform your perspective on business finances and set the foundation for all future financial decisions in your developer journey.

### Why Financial Literacy Matters for Developers

**1. The Value Creation vs Value Capture Gap**
- Creating value: Building great products and services
- Capturing value: Converting that into revenue and profit
- The gap between the two is where many developer businesses fail

[!warning]
Many technically excellent developers fail in business not due to poor coding skills, but because they cannot effectively capture the value they create. Understanding finance bridges this critical gap.

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

[!tip]
The most common mistake developer-entrepreneurs make is pricing their services based on employee salary expectations rather than business value delivered. Your hourly rate as a business owner should be 2-3x your desired employee hourly rate to account for business expenses, taxes, and profit.

### The Business Mindset Shift

Moving from employee to entrepreneur requires fundamental shifts:

1. **From Hours to Value**: Stop thinking about hourly rates, start thinking about value delivered
2. **From Technical to Strategic**: Balance technical excellence with business strategy  
3. **From Individual to Systems**: Build processes and systems, not just code
4. **From Present to Future**: Consider long-term financial implications of decisions

### Financial Metrics That Matter

As a developer-entrepreneur, focus on these critical metrics:

- **Monthly Recurring Revenue (MRR)**: Predictable monthly income
- **Customer Acquisition Cost (CAC)**: What you spend to get each customer
- **Lifetime Value (LTV)**: Total revenue from average customer relationship
- **Gross Margin vs Net Margin**: (detailed analysis below)
- **Burn Rate or Profit Margin**: Monthly cash consumption or generation

### Understanding Gross vs Net Margin

[!example]
**Gross Margin Analysis**
- Formula: (Revenue - Cost of Goods Sold) / Revenue × 100
- Only subtracts direct costs to produce/deliver the service
- For software: hosting, payment processing, direct customer support
- **Example**: SaaS with 95% gross margin after hosting and payment fees

[!example]  
**Net Margin Analysis**
- Formula: (Revenue - All Expenses - Taxes) / Revenue × 100
- Includes ALL business expenses: salaries, marketing, office, legal, etc.
- True bottom-line profitability after everything
- **Example**: Same SaaS with 25% net margin after all expenses

**Why Both Matter:**
- Gross margin shows business model efficiency
- Net margin shows overall profitability and sustainability
- High gross margin with low net margin indicates high operational costs

### Business Model Comparison: Gross Margins

Different business models have varying gross margin potential:

**1. Digital Products/SaaS (85-95%)**
- Near-zero marginal distribution costs
- Highly scalable with low COGS
- Best gross margins but requires significant upfront investment

**2. Freelancing/Consulting (60-80%)**
- Time-based service delivery
- Main costs: your time and tools
- Limited scalability due to time constraints

**3. Agency/Development Shop (50-70%)**
- Team-based service delivery
- Costs: salaries, project management, overhead
- More scalable than freelancing but with higher costs

**4. Physical Products (20-50%)**
- Manufacturing, inventory, shipping costs
- Lowest gross margins but tangible value
- Complex supply chain management required

### Understanding Cash Flow Types

Understanding the three types of cash flow is crucial for business sustainability:

[!info]
**1. Operating Cash Flow (Most Important)**
- Cash from core business activities
- Revenue minus operating expenses  
- Indicates business sustainability without external funding
- **Positive operating cash flow = self-sustaining business**

**2. Investing Cash Flow**
- Cash spent on/received from investments
- Equipment purchases, property, securities
- Usually negative for growing businesses
- Shows investment in future growth

**3. Financing Cash Flow**
- Cash from/to investors and creditors
- Loans, equity investments, dividends
- Can be positive (raising funds) or negative (paying back)
- Shows external funding activities

[!tip]
Operating cash flow is the most critical metric for bootstrap developers. Focus on achieving positive operating cash flow before scaling or taking investments.

### Setting Financial Goals

Start with clear, measurable financial objectives:

- Revenue targets (monthly/annual)
- Profit margins to maintain
- Emergency fund goals (3-6 months expenses)
- Investment in growth vs. personal income

[!example]
**Sample Financial Goals for Year 1:**
- Achieve $10,000/month in operating cash flow
- Maintain 70%+ gross margins
- Build 6-month emergency fund
- Reinvest 30% of profits into growth

### Action Items

1. Define your financial goals for the next 12 months
2. Identify your current revenue streams
3. Calculate your true hourly cost (including all overheads)
4. Set up separate business and personal bank accounts

[!warning]
Never mix personal and business finances. This creates tax complications, makes financial analysis impossible, and can pierce the corporate veil if you're incorporated.`,
      orderIndex: 1,
      lessonType: 'lecture',
      durationMinutes: 45,
    },
  })

  const lesson2 = await prisma.lesson.upsert({
    where: { 
      weekId_slug: {
        weekId: week1.id,
        slug: 'time-value-cash-flow'
      }
    },
    update: {
      title: 'Time Value of Money & Cash Flow Fundamentals',
      content: `# Time Value of Money & Cash Flow Fundamentals

## Understanding Present vs Future Value

The time value of money is one of the most fundamental concepts in finance. Simply put: **money available today is worth more than the same amount in the future.**

[!info]
This concept affects every business decision you make, from pricing to investment choices to client payment terms. Mastering it will dramatically improve your financial decision-making as a developer-entrepreneur.

### Why Money Today is Worth More

[!tip]
**The Three Pillars of Time Value:**
1. **Investment Opportunity** - Money today can be invested to earn returns
2. **Inflation Effect** - Your purchasing power decreases over time  
3. **Risk and Uncertainty** - Future payments carry uncertainty

**1. Investment Opportunity**
- Money today can be invested to earn returns
- Even risk-free investments (government bonds) provide positive returns
- **Example**: $1,000 today at 5% annual return = $1,050 in one year

**2. Inflation Effect**
- General price levels increase over time
- Your purchasing power decreases
- $1,000 today buys more than $1,000 will buy next year
- **Historical Average**: US inflation averages ~3% annually

**3. Risk and Uncertainty**
- Future payments carry uncertainty
- Business might fail, client might not pay
- "A bird in the hand is worth two in the bush"

### Present Value Calculations

[!example]
**Present Value Formula:**
\`PV = FV / (1 + r)^n\`

Where:
- **PV** = Present Value (what future money is worth today)
- **FV** = Future Value (amount to be received in future)
- **r** = Interest/discount rate (annual)
- **n** = Number of periods (years)

**Example**: What's $1,000 in one year worth today at 8% discount rate?
\`PV = $1,000 / (1 + 0.08)^1 = $925.93\`

This means receiving $1,000 in one year is equivalent to receiving $925.93 today.

### Real-World Applications for Developers

[!example]
**1. Pricing Decisions**
Client offers: $5,000 upfront vs $6,000 in 6 months

At 10% annual rate:
- $6,000 in 6 months = $6,000 / (1.10)^0.5 = $5,714 today
- **Decision**: Take the $6,000 future payment (worth $714 more in present value)

[!example]
**2. Investment Decisions**
Server infrastructure: $2,000 to buy vs $200/month lease for 12 months

- Purchase: $2,000 today
- Lease: $200 × 12 = $2,400 total, but paid over time
- Present value of lease payments at 8% annual rate ≈ $2,270
- **Decision**: Buying is $270 cheaper in present value terms

**3. Client Payment Terms**
- Offer 2% discount for payments within 10 days
- Net 30 terms otherwise
- This is equivalent to 36.5% annual interest rate!
- Formula: (2% / 98%) × (365 / 20 days) = 37.2%

### Cash Flow Fundamentals

Understanding cash flow patterns is critical for business survival:

[!warning]
**Cash Flow vs Profit - The Critical Difference**
- **Profit**: Revenue minus expenses on paper (accounting perspective)
- **Cash Flow**: Actual cash coming in minus cash going out (survival perspective)
- You can be profitable on paper but still run out of cash!

**Example**: 
- Sold $10,000 project (profitable)
- Client pays in 60 days
- You need cash today for rent and expenses
- This is a cash flow problem, not a profit problem

### Types of Cash Flow Analysis

[!info]
**1. Operating Cash Flow (Core Business)**
- Cash from main business activities
- Revenue collections minus operating expenses paid
- Most important for day-to-day sustainability
- **Target**: Positive and growing month-over-month

**2. Investing Cash Flow**
- Equipment, software, education purchases
- Usually negative for growing businesses
- Investments in future earning capacity
- **Target**: Strategic investments that increase future operating cash flow

**3. Financing Cash Flow**
- Loans, investments, owner contributions
- Can bridge gaps in operating cash flow
- Should not be primary source long-term
- **Target**: Minimize dependence over time

### Cash Flow Forecasting for Developers

[!example]
**4-Week Cash Flow Forecast Template:**

**Week 1:**
- Starting Cash: $5,000
- Collections: $8,000 (previous project)
- Expenses: $3,500 (salary, tools, marketing)
- Ending Cash: $9,500

**Week 2:**
- Starting Cash: $9,500
- Collections: $2,000 (monthly retainer)
- Expenses: $3,500
- Ending Cash: $8,000

**Week 3:**
- Starting Cash: $8,000
- Collections: $0 (between projects)
- Expenses: $3,500
- Ending Cash: $4,500

**Week 4:**
- Starting Cash: $4,500
- Collections: $12,000 (new project milestone)
- Expenses: $3,500
- Ending Cash: $13,000

[!tip]
Always forecast your cash flow at least 8-12 weeks ahead. This gives you time to take action before running into problems.

### Common Cash Flow Mistakes

**1. The Revenue Recognition Trap**
- Booking revenue when contract is signed
- Reality: Revenue when cash is collected
- Solution: Track cash collections, not just invoices sent

**2. Lumpy Income Syndrome**  
- Large payments followed by dry periods
- Creates feast-or-famine cycles
- Solution: Diversify income streams, build recurring revenue

**3. Expense Timing Mismanagement**
- All expenses due at month-end
- Collections spread throughout month
- Solution: Negotiate staggered expense due dates

### Practical Exercises

[!example]
**Exercise 1: Present Value Decision**
A client offers two payment options:
- Option A: $15,000 today
- Option B: $8,000 today + $8,000 in 6 months

Using a 12% annual discount rate, which option is better?

**Solution:**
- Option A: $15,000 (already present value)
- Option B: $8,000 + ($8,000 / 1.12^0.5) = $8,000 + $7,527 = $15,527
- **Choose Option B** - worth $527 more in present value

**Exercise 2: Cash Flow Gap**
You have a cash flow gap in Week 6:
- Needed: $5,000
- Available: $2,000
- Gap: $3,000

Solutions to consider:
1. Accelerate collections (offer early payment discount)
2. Negotiate delayed vendor payments
3. Take a short-term loan/line of credit
4. Use personal funds (last resort)

### Key Takeaways

[!warning]
**Critical Success Factors:**
- Always consider the time dimension in financial decisions
- Cash flow timing is often more important than total profitability
- Use present value calculations for major business decisions
- Forecast cash flow regularly and take early action on problems
- Build cash reserves for unexpected gaps

### Action Items

1. **Calculate your monthly cash burn rate** (fixed expenses you must pay regardless of income)
2. **Set up a 12-week rolling cash flow forecast** in a spreadsheet
3. **Negotiate payment terms** that favor faster collection (net 15 instead of net 30)
4. **Build a cash reserve** of 3-6 months of operating expenses

[!tip]
The most successful developer-entrepreneurs are those who master cash flow management early. It's not about how much you make - it's about having cash when you need it.`,
      orderIndex: 2,
      lessonType: 'lecture', 
      durationMinutes: 50,
    },
    create: {
      weekId: week1.id,
      title: 'Time Value of Money & Cash Flow Fundamentals',
      slug: 'time-value-cash-flow',
      content: `# Time Value of Money & Cash Flow Fundamentals

## Understanding Present vs Future Value

The time value of money is one of the most fundamental concepts in finance. Simply put: **money available today is worth more than the same amount in the future.**

[!info]
This concept affects every business decision you make, from pricing to investment choices to client payment terms. Mastering it will dramatically improve your financial decision-making as a developer-entrepreneur.

### Why Money Today is Worth More

[!tip]
**The Three Pillars of Time Value:**
1. **Investment Opportunity** - Money today can be invested to earn returns
2. **Inflation Effect** - Your purchasing power decreases over time  
3. **Risk and Uncertainty** - Future payments carry uncertainty

**1. Investment Opportunity**
- Money today can be invested to earn returns
- Even risk-free investments (government bonds) provide positive returns
- **Example**: $1,000 today at 5% annual return = $1,050 in one year

**2. Inflation Effect**
- General price levels increase over time
- Your purchasing power decreases
- $1,000 today buys more than $1,000 will buy next year
- **Historical Average**: US inflation averages ~3% annually

**3. Risk and Uncertainty**
- Future payments carry uncertainty
- Business might fail, client might not pay
- "A bird in the hand is worth two in the bush"

### Present Value Calculations

[!example]
**Present Value Formula:**
\`PV = FV / (1 + r)^n\`

Where:
- **PV** = Present Value (what future money is worth today)
- **FV** = Future Value (amount to be received in future)
- **r** = Interest/discount rate (annual)
- **n** = Number of periods (years)

**Example**: What's $1,000 in one year worth today at 8% discount rate?
\`PV = $1,000 / (1 + 0.08)^1 = $925.93\`

This means receiving $1,000 in one year is equivalent to receiving $925.93 today.

### Real-World Applications for Developers

[!example]
**1. Pricing Decisions**
Client offers: $5,000 upfront vs $6,000 in 6 months

At 10% annual rate:
- $6,000 in 6 months = $6,000 / (1.10)^0.5 = $5,714 today
- **Decision**: Take the $6,000 future payment (worth $714 more in present value)

[!example]
**2. Investment Decisions**
Server infrastructure: $2,000 to buy vs $200/month lease for 12 months

- Purchase: $2,000 today
- Lease: $200 × 12 = $2,400 total, but paid over time
- Present value of lease payments at 8% annual rate ≈ $2,270
- **Decision**: Buying is $270 cheaper in present value terms

**3. Client Payment Terms**
- Offer 2% discount for payments within 10 days
- Net 30 terms otherwise
- This is equivalent to 36.5% annual interest rate!
- Formula: (2% / 98%) × (365 / 20 days) = 37.2%

### Cash Flow Fundamentals

Understanding cash flow patterns is critical for business survival:

[!warning]
**Cash Flow vs Profit - The Critical Difference**
- **Profit**: Revenue minus expenses on paper (accounting perspective)
- **Cash Flow**: Actual cash coming in minus cash going out (survival perspective)
- You can be profitable on paper but still run out of cash!

**Example**: 
- Sold $10,000 project (profitable)
- Client pays in 60 days
- You need cash today for rent and expenses
- This is a cash flow problem, not a profit problem

### Types of Cash Flow Analysis

[!info]
**1. Operating Cash Flow (Core Business)**
- Cash from main business activities
- Revenue collections minus operating expenses paid
- Most important for day-to-day sustainability
- **Target**: Positive and growing month-over-month

**2. Investing Cash Flow**
- Equipment, software, education purchases
- Usually negative for growing businesses
- Investments in future earning capacity
- **Target**: Strategic investments that increase future operating cash flow

**3. Financing Cash Flow**
- Loans, investments, owner contributions
- Can bridge gaps in operating cash flow
- Should not be primary source long-term
- **Target**: Minimize dependence over time

### Cash Flow Forecasting for Developers

[!example]
**4-Week Cash Flow Forecast Template:**

**Week 1:**
- Starting Cash: $5,000
- Collections: $8,000 (previous project)
- Expenses: $3,500 (salary, tools, marketing)
- Ending Cash: $9,500

**Week 2:**
- Starting Cash: $9,500
- Collections: $2,000 (monthly retainer)
- Expenses: $3,500
- Ending Cash: $8,000

**Week 3:**
- Starting Cash: $8,000
- Collections: $0 (between projects)
- Expenses: $3,500
- Ending Cash: $4,500

**Week 4:**
- Starting Cash: $4,500
- Collections: $12,000 (new project milestone)
- Expenses: $3,500
- Ending Cash: $13,000

[!tip]
Always forecast your cash flow at least 8-12 weeks ahead. This gives you time to take action before running into problems.

### Common Cash Flow Mistakes

**1. The Revenue Recognition Trap**
- Booking revenue when contract is signed
- Reality: Revenue when cash is collected
- Solution: Track cash collections, not just invoices sent

**2. Lumpy Income Syndrome**  
- Large payments followed by dry periods
- Creates feast-or-famine cycles
- Solution: Diversify income streams, build recurring revenue

**3. Expense Timing Mismanagement**
- All expenses due at month-end
- Collections spread throughout month
- Solution: Negotiate staggered expense due dates

### Practical Exercises

[!example]
**Exercise 1: Present Value Decision**
A client offers two payment options:
- Option A: $15,000 today
- Option B: $8,000 today + $8,000 in 6 months

Using a 12% annual discount rate, which option is better?

**Solution:**
- Option A: $15,000 (already present value)
- Option B: $8,000 + ($8,000 / 1.12^0.5) = $8,000 + $7,527 = $15,527
- **Choose Option B** - worth $527 more in present value

**Exercise 2: Cash Flow Gap**
You have a cash flow gap in Week 6:
- Needed: $5,000
- Available: $2,000
- Gap: $3,000

Solutions to consider:
1. Accelerate collections (offer early payment discount)
2. Negotiate delayed vendor payments
3. Take a short-term loan/line of credit
4. Use personal funds (last resort)

### Key Takeaways

[!warning]
**Critical Success Factors:**
- Always consider the time dimension in financial decisions
- Cash flow timing is often more important than total profitability
- Use present value calculations for major business decisions
- Forecast cash flow regularly and take early action on problems
- Build cash reserves for unexpected gaps

### Action Items

1. **Calculate your monthly cash burn rate** (fixed expenses you must pay regardless of income)
2. **Set up a 12-week rolling cash flow forecast** in a spreadsheet
3. **Negotiate payment terms** that favor faster collection (net 15 instead of net 30)
4. **Build a cash reserve** of 3-6 months of operating expenses

[!tip]
The most successful developer-entrepreneurs are those who master cash flow management early. It's not about how much you make - it's about having cash when you need it.`,
      orderIndex: 2,
      lessonType: 'lecture', 
      durationMinutes: 50,
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

  // Create or update additional weeks (2-12) with basic structure
  for (let weekNum = 2; weekNum <= 12; weekNum++) {
    await prisma.week.upsert({
      where: { 
        courseId_weekNumber: {
          courseId: course.id,
          weekNumber: weekNum
        }
      },
      update: {
        title: `Week ${weekNum}: Advanced Financial Concepts`,
        overview: `Comprehensive coverage of advanced financial topics for developer-entrepreneurs.`,
        learningObjectives: JSON.stringify([
          `Master Week ${weekNum} concepts`,
          'Apply knowledge to real business scenarios',
          'Understand common pitfalls and best practices'
        ]),
        estimatedHours: 8,
      },
      create: {
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
  await prisma.userEnrollment.upsert({
    where: { 
      userId_courseId: {
        userId: student.id,
        courseId: course.id
      }
    },
    update: {
      progressPercentage: 0,
    },
    create: {
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