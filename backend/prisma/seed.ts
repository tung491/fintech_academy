import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create course categories
  const foundationCategory = await prisma.courseCategory.upsert({
    where: { slug: 'foundation' },
    update: {
      name: 'Foundation Courses',
      description: 'Beginner-level courses covering basic financial literacy and business fundamentals for developers',
      color: '#3B82F6',
      icon: '🏗️',
      orderIndex: 1,
    },
    create: {
      name: 'Foundation Courses',
      slug: 'foundation',
      description: 'Beginner-level courses covering basic financial literacy and business fundamentals for developers',
      color: '#3B82F6',
      icon: '🏗️',
      orderIndex: 1,
    },
  })

  const accountingCategory = await prisma.courseCategory.upsert({
    where: { slug: 'accounting' },
    update: {
      name: 'Accounting & Bookkeeping',
      description: 'Intermediate-level accounting courses for tech businesses and startups',
      color: '#10B981',
      icon: '📊',
      orderIndex: 2,
    },
    create: {
      name: 'Accounting & Bookkeeping',
      slug: 'accounting',
      description: 'Intermediate-level accounting courses for tech businesses and startups',
      color: '#10B981',
      icon: '📊',
      orderIndex: 2,
    },
  })

  const taxCategory = await prisma.courseCategory.upsert({
    where: { slug: 'tax-planning' },
    update: {
      name: 'Tax Planning',
      description: 'Tax strategy and planning courses for freelancers, businesses, and high earners',
      color: '#F59E0B',
      icon: '🧾',
      orderIndex: 3,
    },
    create: {
      name: 'Tax Planning',
      slug: 'tax-planning',
      description: 'Tax strategy and planning courses for freelancers, businesses, and high earners',
      color: '#F59E0B',
      icon: '🧾',
      orderIndex: 3,
    },
  })

  const investmentCategory = await prisma.courseCategory.upsert({
    where: { slug: 'investment-finance' },
    update: {
      name: 'Investment & Advanced Finance',
      description: 'Advanced finance courses covering investments, startup finance, and corporate finance',
      color: '#8B5CF6',
      icon: '💰',
      orderIndex: 4,
    },
    create: {
      name: 'Investment & Advanced Finance',
      slug: 'investment-finance',
      description: 'Advanced finance courses covering investments, startup finance, and corporate finance',
      color: '#8B5CF6',
      icon: '💰',
      orderIndex: 4,
    },
  })

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
      shortDescription: 'Learn essential finance concepts to successfully run your developer business.',
      categoryId: foundationCategory.id,
      level: 'beginner',
      duration: '4 weeks',
      estimatedHours: 32,
      price: 9700, // $97.00 in cents
      originalPrice: 12700, // $127.00 in cents
      instructor: 'Sarah Chen, CPA, MBA',
      instructorBio: 'Former Silicon Valley CFO with 15+ years helping tech companies scale from startup to IPO. Specialized in developer-friendly financial education.',
      thumbnailUrl: '/images/courses/financial-literacy-fundamentals.jpg',
      skillsLearned: JSON.stringify([
        'Time value of money calculations',
        'Cash flow forecasting and management',
        'Business model analysis and optimization',
        'Financial planning and goal setting',
        'Risk assessment and mitigation'
      ]),
      targetAudience: 'Developers transitioning to entrepreneurship, freelancers, and tech consultants who need foundational business finance knowledge.',
      orderIndex: 1,
      isPublished: true,
      isFeatured: true,
    },
    create: {
      title: 'Financial and Accounting Knowledge for Developers',
      slug: 'finacademy-for-developers',
      description: 'A comprehensive course teaching financial and accounting knowledge specifically for developers to run their own businesses.',
      shortDescription: 'Learn essential finance concepts to successfully run your developer business.',
      categoryId: foundationCategory.id,
      level: 'beginner',
      duration: '4 weeks',
      estimatedHours: 32,
      price: 9700, // $97.00 in cents
      originalPrice: 12700, // $127.00 in cents
      instructor: 'Sarah Chen, CPA, MBA',
      instructorBio: 'Former Silicon Valley CFO with 15+ years helping tech companies scale from startup to IPO. Specialized in developer-friendly financial education.',
      thumbnailUrl: '/images/courses/financial-literacy-fundamentals.jpg',
      skillsLearned: JSON.stringify([
        'Time value of money calculations',
        'Cash flow forecasting and management',
        'Business model analysis and optimization',
        'Financial planning and goal setting',
        'Risk assessment and mitigation'
      ]),
      targetAudience: 'Developers transitioning to entrepreneurship, freelancers, and tech consultants who need foundational business finance knowledge.',
      orderIndex: 1,
      isPublished: true,
      isFeatured: true,
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

  // Create Week 2: Business Models & Revenue Streams
  const week2 = await prisma.week.upsert({
    where: { 
      courseId_weekNumber: {
        courseId: course.id,
        weekNumber: 2
      }
    },
    update: {
      title: 'Business Models & Revenue Stream Optimization',
      overview: 'Deep dive into different business models for developers, from freelancing to SaaS, and how to optimize revenue streams for sustainable growth.',
      learningObjectives: JSON.stringify([
        'Compare different business models and their financial implications',
        'Design and optimize pricing strategies for development services',
        'Build recurring revenue streams and subscription models',
        'Calculate and improve key business metrics (LTV, CAC, MRR)',
        'Create financial projections and business plans'
      ]),
      estimatedHours: 8,
    },
    create: {
      courseId: course.id,
      weekNumber: 2,
      title: 'Business Models & Revenue Stream Optimization',
      overview: 'Deep dive into different business models for developers, from freelancing to SaaS, and how to optimize revenue streams for sustainable growth.',
      learningObjectives: JSON.stringify([
        'Compare different business models and their financial implications',
        'Design and optimize pricing strategies for development services',
        'Build recurring revenue streams and subscription models',
        'Calculate and improve key business metrics (LTV, CAC, MRR)',
        'Create financial projections and business plans'
      ]),
      estimatedHours: 8,
    },
  })

  // Create Week 3: Expense Management & Cost Optimization
  const week3 = await prisma.week.upsert({
    where: { 
      courseId_weekNumber: {
        courseId: course.id,
        weekNumber: 3
      }
    },
    update: {
      title: 'Expense Management & Cost Optimization',
      overview: 'Master expense tracking, categorization, and optimization strategies. Learn to separate business and personal expenses while maximizing deductions and minimizing costs.',
      learningObjectives: JSON.stringify([
        'Set up proper expense tracking and categorization systems',
        'Separate business and personal expenses effectively',
        'Identify and maximize legitimate business deductions',
        'Optimize recurring costs and subscriptions',
        'Build emergency funds and cash reserves',
        'Understand fixed vs variable costs for scaling decisions'
      ]),
      estimatedHours: 8,
    },
    create: {
      courseId: course.id,
      weekNumber: 3,
      title: 'Expense Management & Cost Optimization',
      overview: 'Master expense tracking, categorization, and optimization strategies. Learn to separate business and personal expenses while maximizing deductions and minimizing costs.',
      learningObjectives: JSON.stringify([
        'Set up proper expense tracking and categorization systems',
        'Separate business and personal expenses effectively',
        'Identify and maximize legitimate business deductions',
        'Optimize recurring costs and subscriptions',
        'Build emergency funds and cash reserves',
        'Understand fixed vs variable costs for scaling decisions'
      ]),
      estimatedHours: 8,
    },
  })

  // Create Week 4: Financial Planning & Growth Strategy
  const week4 = await prisma.week.upsert({
    where: { 
      courseId_weekNumber: {
        courseId: course.id,
        weekNumber: 4
      }
    },
    update: {
      title: 'Financial Planning & Growth Strategy',
      overview: 'Develop comprehensive financial plans, set growth targets, and create strategies for scaling your developer business sustainably while managing risks.',
      learningObjectives: JSON.stringify([
        'Create 12-month financial forecasts and budgets',
        'Set realistic revenue and growth targets',
        'Plan for seasonal variations and market changes',
        'Develop strategies for scaling operations and team growth',
        'Understand when and how to reinvest profits vs take distributions',
        'Create contingency plans for market downturns'
      ]),
      estimatedHours: 8,
    },
    create: {
      courseId: course.id,
      weekNumber: 4,
      title: 'Financial Planning & Growth Strategy',
      overview: 'Develop comprehensive financial plans, set growth targets, and create strategies for scaling your developer business sustainably while managing risks.',
      learningObjectives: JSON.stringify([
        'Create 12-month financial forecasts and budgets',
        'Set realistic revenue and growth targets',
        'Plan for seasonal variations and market changes',
        'Develop strategies for scaling operations and team growth',
        'Understand when and how to reinvest profits vs take distributions',
        'Create contingency plans for market downturns'
      ]),
      estimatedHours: 8,
    },
  })

  // Create lessons for Week 2
  await prisma.lesson.upsert({
    where: { 
      weekId_slug: {
        weekId: week2.id,
        slug: 'business-models-comparison'
      }
    },
    update: {
      title: 'Business Models Comparison for Developers',
      content: `# Business Models Comparison for Developers

## Understanding Different Revenue Models

As a developer-entrepreneur, choosing the right business model is one of your most critical decisions. Each model has different financial characteristics, scaling potential, and risk profiles.

[!info]
This lesson will help you understand the financial implications of different business models so you can make informed decisions about your career and business direction.

### 1. Freelancing Model

**Financial Characteristics:**
- **Revenue Pattern**: Project-based, irregular income
- **Gross Margins**: 70-85% (high, mainly your time)
- **Scalability**: Low (limited by your available hours)
- **Cash Flow**: Lumpy, depends on project timing
- **Capital Requirements**: Very low

[!example]
**Freelance Developer Financial Profile:**
- Hourly Rate: $75-150/hour
- Monthly Capacity: ~120 billable hours
- Monthly Revenue: $9,000-18,000
- Gross Margin: 80% (after tools/software)
- Net Margin: 60-70% (after taxes, insurance)

**Advantages:**
- Low startup costs
- High control over work
- Quick revenue generation
- Direct client relationships

**Disadvantages:**
- Income ceiling (hours x rate)
- No passive income
- Client dependency risk
- Difficult to scale

### 2. Consulting/Agency Model

**Financial Characteristics:**
- **Revenue Pattern**: Project and retainer-based
- **Gross Margins**: 50-70% (team salaries are COGS)
- **Scalability**: Medium (can hire team)
- **Cash Flow**: More predictable with retainers
- **Capital Requirements**: Medium (team salaries)

[!example]
**Development Agency Financial Profile:**
- Project Size: $25,000-100,000
- Team Size: 3-8 developers
- Monthly Revenue: $80,000-200,000
- Gross Margin: 55% (after team salaries)
- Net Margin: 15-25% (after all expenses)

**Key Metrics to Track:**
- **Utilization Rate**: % of team time that's billable
- **Average Project Value**: Larger projects = better margins
- **Client Retention**: Repeat clients reduce acquisition costs

### 3. SaaS (Software as a Service) Model

**Financial Characteristics:**
- **Revenue Pattern**: Monthly recurring revenue (MRR)
- **Gross Margins**: 85-95% (very high after infrastructure)
- **Scalability**: Very high (digital distribution)
- **Cash Flow**: Predictable and growing
- **Capital Requirements**: High upfront, low ongoing

[!example]
**SaaS Financial Profile:**
- Monthly Recurring Revenue: $5,000-50,000+
- Customer Acquisition Cost: $50-500
- Lifetime Value: $500-5,000
- Gross Margin: 90% (hosting, payment processing)
- Net Margin: 20-40% (after marketing, salaries)

**Critical SaaS Metrics:**
- **Monthly Recurring Revenue (MRR)**: Predictable monthly income
- **Customer Acquisition Cost (CAC)**: Cost to get each customer
- **Lifetime Value (LTV)**: Total revenue per customer
- **Churn Rate**: % customers who cancel monthly
- **LTV:CAC Ratio**: Should be 3:1 or higher

### 4. Product Sales Model

**Financial Characteristics:**
- **Revenue Pattern**: One-time sales, potentially recurring
- **Gross Margins**: 60-90% (digital) vs 20-50% (physical)
- **Scalability**: High for digital, medium for physical
- **Cash Flow**: Depends on sales cycles
- **Capital Requirements**: Medium to high

[!tip]
Digital products (courses, templates, tools) have similar economics to SaaS but with one-time purchases instead of recurring revenue.

### 5. Hybrid Models

Most successful developer businesses combine multiple revenue streams:

[!example]
**Hybrid Developer Business:**
- 40% Recurring SaaS revenue: $8,000/month
- 35% Consulting projects: $7,000/month
- 25% Course/product sales: $5,000/month
- **Total MRR**: $20,000/month
- **Risk Diversification**: Multiple income sources

### Revenue Stream Optimization

[!warning]
**Common Pricing Mistakes:**
1. **Hourly Pricing Trap**: Capping income at hours x rate
2. **Competitor-Based Pricing**: Ignoring your unique value
3. **Cost-Plus Pricing**: Not considering market value
4. **One-Size-Fits-All**: Not segmenting customers

**Value-Based Pricing Strategy:**
1. **Identify Customer Value**: What's the financial impact?
2. **Segment Customers**: Different segments, different prices
3. **Package Solutions**: Bundle services for higher value
4. **Test and Iterate**: Use A/B testing for pricing

### Building Recurring Revenue

[!info]
**The Power of Recurring Revenue:**
- Predictable cash flow
- Higher business valuation (5-10x revenue vs 1-2x for one-time)
- Compound growth potential
- Better customer relationships

**Ways to Add Recurring Revenue:**
1. **Maintenance Contracts**: Monthly support/updates
2. **Hosting Services**: Manage client infrastructure  
3. **Consulting Retainers**: Reserved monthly hours
4. **SaaS Add-ons**: Additional features or services
5. **Training Subscriptions**: Ongoing education/support

### Financial Planning by Business Model

[!example]
**Freelancer Financial Plan:**
- Emergency Fund: 6+ months (irregular income)
- Diversification: Multiple client relationships
- Growth Strategy: Increase rates, not just hours
- Exit Strategy: Build productized consulting

**SaaS Financial Plan:**
- Emergency Fund: 12+ months (long sales cycles)
- Growth Investment: 40-60% of revenue in marketing
- Metrics Focus: Unit economics and cohort analysis
- Exit Strategy: Build for acquisition or IPO

### Action Items

1. **Evaluate Your Current Model**: Calculate your true gross and net margins
2. **Identify Opportunities**: What recurring revenue could you add?
3. **Test New Pricing**: Experiment with value-based pricing
4. **Plan Your Evolution**: How will you transition between models?

[!tip]
Start with what you know (freelancing/consulting) but always be building toward higher-margin, more scalable models. The goal is financial freedom, not just income replacement.`,
      orderIndex: 1,
      lessonType: 'lecture',
      durationMinutes: 45,
    },
    create: {
      weekId: week2.id,
      title: 'Business Models Comparison for Developers',
      slug: 'business-models-comparison',
      content: `# Business Models Comparison for Developers

## Understanding Different Revenue Models

As a developer-entrepreneur, choosing the right business model is one of your most critical decisions. Each model has different financial characteristics, scaling potential, and risk profiles.

[!info]
This lesson will help you understand the financial implications of different business models so you can make informed decisions about your career and business direction.

### 1. Freelancing Model

**Financial Characteristics:**
- **Revenue Pattern**: Project-based, irregular income
- **Gross Margins**: 70-85% (high, mainly your time)
- **Scalability**: Low (limited by your available hours)
- **Cash Flow**: Lumpy, depends on project timing
- **Capital Requirements**: Very low

[!example]
**Freelance Developer Financial Profile:**
- Hourly Rate: $75-150/hour
- Monthly Capacity: ~120 billable hours
- Monthly Revenue: $9,000-18,000
- Gross Margin: 80% (after tools/software)
- Net Margin: 60-70% (after taxes, insurance)

**Advantages:**
- Low startup costs
- High control over work
- Quick revenue generation
- Direct client relationships

**Disadvantages:**
- Income ceiling (hours x rate)
- No passive income
- Client dependency risk
- Difficult to scale

### 2. Consulting/Agency Model

**Financial Characteristics:**
- **Revenue Pattern**: Project and retainer-based
- **Gross Margins**: 50-70% (team salaries are COGS)
- **Scalability**: Medium (can hire team)
- **Cash Flow**: More predictable with retainers
- **Capital Requirements**: Medium (team salaries)

[!example]
**Development Agency Financial Profile:**
- Project Size: $25,000-100,000
- Team Size: 3-8 developers
- Monthly Revenue: $80,000-200,000
- Gross Margin: 55% (after team salaries)
- Net Margin: 15-25% (after all expenses)

**Key Metrics to Track:**
- **Utilization Rate**: % of team time that's billable
- **Average Project Value**: Larger projects = better margins
- **Client Retention**: Repeat clients reduce acquisition costs

### 3. SaaS (Software as a Service) Model

**Financial Characteristics:**
- **Revenue Pattern**: Monthly recurring revenue (MRR)
- **Gross Margins**: 85-95% (very high after infrastructure)
- **Scalability**: Very high (digital distribution)
- **Cash Flow**: Predictable and growing
- **Capital Requirements**: High upfront, low ongoing

[!example]
**SaaS Financial Profile:**
- Monthly Recurring Revenue: $5,000-50,000+
- Customer Acquisition Cost: $50-500
- Lifetime Value: $500-5,000
- Gross Margin: 90% (hosting, payment processing)
- Net Margin: 20-40% (after marketing, salaries)

**Critical SaaS Metrics:**
- **Monthly Recurring Revenue (MRR)**: Predictable monthly income
- **Customer Acquisition Cost (CAC)**: Cost to get each customer
- **Lifetime Value (LTV)**: Total revenue per customer
- **Churn Rate**: % customers who cancel monthly
- **LTV:CAC Ratio**: Should be 3:1 or higher

### 4. Product Sales Model

**Financial Characteristics:**
- **Revenue Pattern**: One-time sales, potentially recurring
- **Gross Margins**: 60-90% (digital) vs 20-50% (physical)
- **Scalability**: High for digital, medium for physical
- **Cash Flow**: Depends on sales cycles
- **Capital Requirements**: Medium to high

[!tip]
Digital products (courses, templates, tools) have similar economics to SaaS but with one-time purchases instead of recurring revenue.

### 5. Hybrid Models

Most successful developer businesses combine multiple revenue streams:

[!example]
**Hybrid Developer Business:**
- 40% Recurring SaaS revenue: $8,000/month
- 35% Consulting projects: $7,000/month
- 25% Course/product sales: $5,000/month
- **Total MRR**: $20,000/month
- **Risk Diversification**: Multiple income sources

### Revenue Stream Optimization

[!warning]
**Common Pricing Mistakes:**
1. **Hourly Pricing Trap**: Capping income at hours x rate
2. **Competitor-Based Pricing**: Ignoring your unique value
3. **Cost-Plus Pricing**: Not considering market value
4. **One-Size-Fits-All**: Not segmenting customers

**Value-Based Pricing Strategy:**
1. **Identify Customer Value**: What's the financial impact?
2. **Segment Customers**: Different segments, different prices
3. **Package Solutions**: Bundle services for higher value
4. **Test and Iterate**: Use A/B testing for pricing

### Building Recurring Revenue

[!info]
**The Power of Recurring Revenue:**
- Predictable cash flow
- Higher business valuation (5-10x revenue vs 1-2x for one-time)
- Compound growth potential
- Better customer relationships

**Ways to Add Recurring Revenue:**
1. **Maintenance Contracts**: Monthly support/updates
2. **Hosting Services**: Manage client infrastructure  
3. **Consulting Retainers**: Reserved monthly hours
4. **SaaS Add-ons**: Additional features or services
5. **Training Subscriptions**: Ongoing education/support

### Financial Planning by Business Model

[!example]
**Freelancer Financial Plan:**
- Emergency Fund: 6+ months (irregular income)
- Diversification: Multiple client relationships
- Growth Strategy: Increase rates, not just hours
- Exit Strategy: Build productized consulting

**SaaS Financial Plan:**
- Emergency Fund: 12+ months (long sales cycles)
- Growth Investment: 40-60% of revenue in marketing
- Metrics Focus: Unit economics and cohort analysis
- Exit Strategy: Build for acquisition or IPO

### Action Items

1. **Evaluate Your Current Model**: Calculate your true gross and net margins
2. **Identify Opportunities**: What recurring revenue could you add?
3. **Test New Pricing**: Experiment with value-based pricing
4. **Plan Your Evolution**: How will you transition between models?

[!tip]
Start with what you know (freelancing/consulting) but always be building toward higher-margin, more scalable models. The goal is financial freedom, not just income replacement.`,
      orderIndex: 1,
      lessonType: 'lecture',
      durationMinutes: 45,
    },
  })

  // Create placeholder weeks for future courses (5-12)
  for (let weekNum = 5; weekNum <= 12; weekNum++) {
    await prisma.week.upsert({
      where: { 
        courseId_weekNumber: {
          courseId: course.id,
          weekNumber: weekNum
        }
      },
      update: {
        title: `Week ${weekNum}: Advanced Topics (Coming Soon)`,
        overview: `Advanced financial topics will be available as part of our expanded course catalog.`,
        learningObjectives: JSON.stringify([
          'Advanced concepts for experienced developers',
          'Specialized topics for growing businesses',
          'Expert-level financial strategies'
        ]),
        estimatedHours: 8,
      },
      create: {
        courseId: course.id,
        weekNumber: weekNum,
        title: `Week ${weekNum}: Advanced Topics (Coming Soon)`,
        overview: `Advanced financial topics will be available as part of our expanded course catalog.`,
        learningObjectives: JSON.stringify([
          'Advanced concepts for experienced developers',
          'Specialized topics for growing businesses',
          'Expert-level financial strategies'
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