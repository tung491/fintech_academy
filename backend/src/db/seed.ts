import pool from './pool'
import bcrypt from 'bcryptjs'

const seedData = async () => {
  try {
    console.log('Starting database seeding...')

    // Create main course
    const courseResult = await pool.query(`
      INSERT INTO courses (title, slug, description, order_index, is_published)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `, [
      'Financial & Accounting Fundamentals for Developers',
      'finance-accounting-fundamentals',
      'A comprehensive 12-week course covering essential financial and accounting knowledge needed to run your own business as a developer. From basic bookkeeping to financial analysis and business strategy.',
      1,
      true
    ])

    const courseId = courseResult.rows[0].id

    // Week 1: Financial Literacy Basics
    const week1Result = await pool.query(`
      INSERT INTO weeks (course_id, week_number, title, overview, learning_objectives, estimated_hours)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [
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

    const week1Id = week1Result.rows[0].id

    // Week 1 Lessons
    await pool.query(`
      INSERT INTO lessons (week_id, title, slug, content, order_index, lesson_type, duration_minutes)
      VALUES 
      ($1, 'Introduction to Financial Thinking', 'intro-financial-thinking', $2, 1, 'lecture', 60),
      ($1, 'Time Value of Money', 'time-value-money', $3, 2, 'lecture', 90),
      ($1, 'Revenue, Costs, and Profit', 'revenue-costs-profit', $4, 3, 'lecture', 75),
      ($1, 'Cash Flow Basics', 'cash-flow-basics', $5, 4, 'lecture', 90),
      ($1, 'Business Models for Developers', 'business-models', $6, 5, 'lecture', 60)
    `, [
      week1Id,
      `# Introduction to Financial Thinking

## Why Developers Need Financial Knowledge

As a developer, you possess unique skills that can create tremendous value. However, turning that value into a sustainable business requires financial literacy. This lesson introduces you to thinking like a business owner, not just a technician.

### Key Concepts

**1. Value Creation vs Value Capture**
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
      
      `# Time Value of Money

## The Foundation of Financial Decision Making

The time value of money (TVM) is the concept that money available today is worth more than the same amount in the future. This principle underlies every financial decision in business.

### Why Money Today is Worth More

**1. Opportunity Cost**
- Money today can be invested to earn returns
- Delaying payment means losing potential earnings
- Example: $1,000 today invested at 10% becomes $1,100 in a year

**2. Inflation**
- Purchasing power decreases over time
- $1,000 today buys more than $1,000 next year
- Average inflation: 2-3% annually in developed economies

**3. Risk and Uncertainty**
- Future payments carry risk of non-payment
- Business conditions may change
- Counterparty risk exists

### Present Value and Future Value

**Present Value (PV)**: What a future payment is worth today
Formula: PV = FV / (1 + r)^n

**Future Value (FV)**: What a current amount will be worth in the future
Formula: FV = PV × (1 + r)^n

Where:
- r = interest rate or discount rate
- n = number of periods

### Practical Applications for Developers

**1. Pricing SaaS Products**
- Annual vs. monthly billing
- Offer 15-20% discount for annual payments
- Example: $100/month or $1,000/year (2 months free)

**2. Client Payment Terms**
- Net 30 vs. immediate payment
- Early payment discounts (2/10 net 30)
- Late payment penalties

**3. Investment Decisions**
- Building vs. buying software tools
- Hiring vs. contracting
- Marketing spend ROI calculations

### Discounted Cash Flow (DCF) Analysis

For evaluating projects or businesses:

1. **Project future cash flows**
2. **Choose appropriate discount rate** (usually 10-15% for small businesses)
3. **Calculate present value** of each cash flow
4. **Sum to get Net Present Value (NPV)**

### Real-World Example: Evaluating a Project

Project: Building a SaaS tool
- Initial investment: $50,000
- Expected monthly revenue: $5,000 starting month 3
- Monthly costs: $1,000
- Time horizon: 2 years

Month 0: -$50,000 (investment)
Months 1-2: -$1,000 (costs only)
Months 3-24: $4,000 (revenue - costs)

Using 12% annual discount rate (1% monthly):
NPV = -50,000 - 1,000/(1.01) - 1,000/(1.01)² + Σ(4,000/(1.01)^n) for n=3 to 24
NPV ≈ $19,847 (Positive NPV = Good investment)

### Key Takeaways
- Always consider the time value of money in financial decisions
- Prefer money sooner rather than later
- Use TVM to evaluate investment opportunities
- Structure payment terms to your advantage`,

      `# Revenue, Costs, and Profit

## Understanding the Financial Engine of Your Business

Revenue is not profit. This fundamental distinction is crucial for business success. Many developers focus on top-line revenue without understanding the costs that erode their bottom line.

### Revenue Types

**1. One-Time Revenue**
- Project-based work
- Product sales
- Setup or installation fees
- Characteristics: Unpredictable, requires constant sales effort

**2. Recurring Revenue**
- SaaS subscriptions
- Retainer agreements
- Maintenance contracts
- Characteristics: Predictable, compounds over time

**3. Usage-Based Revenue**
- API calls
- Storage/bandwidth consumption
- Transaction fees
- Characteristics: Scales with customer success

### Cost Categories

**1. Direct Costs (Cost of Goods Sold - COGS)**
- Hosting and infrastructure
- Third-party APIs and services
- Direct labor (if service business)
- Payment processing fees

**2. Operating Expenses (OpEx)**
- Salaries and contractors
- Marketing and advertising
- Office and equipment
- Software subscriptions
- Professional services (legal, accounting)

**3. Hidden Costs Developers Often Miss**
- Your own time (opportunity cost)
- Technical debt interest
- Customer support time
- Failed experiments and pivots
- Learning and training time

### Profit Margins

**Gross Profit = Revenue - COGS**
**Gross Margin % = (Gross Profit / Revenue) × 100**

**Operating Profit = Gross Profit - Operating Expenses**
**Operating Margin % = (Operating Profit / Revenue) × 100**

**Net Profit = Operating Profit - Taxes - Interest**
**Net Margin % = (Net Profit / Revenue) × 100**

### Industry Benchmarks for Software Businesses

**SaaS Companies:**
- Gross Margin: 70-85%
- Operating Margin: 15-25% (mature)
- Net Margin: 10-20%

**Consulting/Freelancing:**
- Gross Margin: 40-60%
- Operating Margin: 15-30%
- Net Margin: 10-25%

### Unit Economics

Understanding profitability per customer:

**Customer Acquisition Cost (CAC)**
= Total Sales & Marketing Costs / New Customers Acquired

**Lifetime Value (LTV)**
= Average Revenue per Customer × Customer Lifetime

**LTV:CAC Ratio**
- Should be at least 3:1
- Below 1:1 means losing money on each customer
- Above 5:1 might mean underinvesting in growth

### Pricing Strategies

**1. Cost-Plus Pricing**
- Calculate total costs
- Add desired profit margin
- Simple but ignores market value

**2. Value-Based Pricing**
- Price based on value delivered
- Can achieve higher margins
- Requires understanding customer ROI

**3. Competitive Pricing**
- Match or undercut competitors
- Easy to implement
- May lead to race to bottom

### Improving Profitability

**Increase Revenue:**
- Raise prices (easiest for existing customers)
- Upsell/cross-sell
- Reduce churn
- Expand market

**Reduce Costs:**
- Automate repetitive tasks
- Negotiate better rates with suppliers
- Optimize infrastructure spending
- Eliminate low-value activities

### Real-World Example: SaaS Profitability

Monthly figures for a developer's SaaS:
- Revenue: $10,000 (100 customers × $100)
- Hosting/Infrastructure: $1,000
- Payment processing (2.9%): $290
- Customer support tool: $100
- Marketing: $2,000
- Founder salary: $5,000

Gross Profit: $10,000 - $1,390 = $8,610 (86% margin)
Operating Profit: $8,610 - $7,100 = $1,510 (15% margin)

### Action Items
1. Calculate your true gross margin
2. List all hidden costs in your business
3. Determine your break-even point
4. Set profit margin targets for next quarter`,

      `# Cash Flow Basics

## The Lifeblood of Your Business

You can be profitable on paper and still go bankrupt. Cash flow is the actual movement of money in and out of your business, and it's what keeps the lights on.

### Cash Flow vs. Profit

**Profit (Accrual Basis)**
- Revenue recorded when earned
- Expenses recorded when incurred
- Shows business performance

**Cash Flow (Cash Basis)**
- Money recorded when received
- Expenses recorded when paid
- Shows business survival ability

### Example: The Profitable Business That Failed

A developer wins a $100,000 project:
- Month 1: Does the work (expenses: $30,000)
- Month 2: Delivers project, sends invoice
- Month 3: Client pays NET 60
- Month 4: Finally receives payment

Profit: $70,000 ✓
Cash Flow: Negative for 3 months ✗
Result: Can't pay bills, business fails

### Types of Cash Flow

**1. Operating Cash Flow**
- Cash from core business operations
- Collections from customers
- Payments to suppliers and employees
- The most important metric for sustainability

**2. Investing Cash Flow**
- Purchase of equipment or software
- Investment in product development
- Acquisition of other businesses

**3. Financing Cash Flow**
- Loans and credit lines
- Investment from investors
- Dividend payments

### The Cash Flow Cycle

**For Service Businesses:**
1. Win project/client
2. Do the work (cash out)
3. Invoice client
4. Wait for payment
5. Receive payment (cash in)

**For Product Businesses:**
1. Develop product (cash out)
2. Market product (cash out)
3. Make sale
4. Deliver product
5. Receive payment (cash in)

### Managing Cash Flow

**1. Accelerate Inflows**
- Require deposits (25-50% upfront)
- Offer early payment discounts
- Accept credit cards (despite fees)
- Invoice immediately upon delivery
- Follow up on overdue payments

**2. Delay Outflows**
- Negotiate payment terms with suppliers
- Use 0% interest credit cards wisely
- Pay bills on due date, not early
- Lease instead of buy when appropriate

**3. Create Cash Reserves**
- Maintain 3-6 months operating expenses
- Set aside tax reserves (25-30% of profit)
- Build emergency fund before growth fund

### Cash Flow Forecasting

**Weekly Cash Flow Forecast Template:**

Starting Cash: $X

**Inflows:**
- Expected client payments
- New sales (probability adjusted)
- Other income

**Outflows:**
- Payroll
- Rent/utilities
- Suppliers/contractors
- Marketing spend
- Loan payments
- Owner draws

Ending Cash = Starting + Inflows - Outflows

### Warning Signs of Cash Flow Problems

1. Consistently late paying bills
2. Using credit cards for operating expenses
3. Delaying owner compensation
4. Turning down work due to cash constraints
5. Stressed about making payroll

### Cash Flow Best Practices for Developers

**1. Recurring Revenue is King**
- Prioritize subscription models
- Convert project clients to retainers
- Build products with recurring value

**2. Payment Terms Matter**
- NET 15 instead of NET 30
- 50% upfront for projects
- Monthly billing for ongoing work
- Automated billing for subscriptions

**3. Monitor Key Metrics**
- Days Sales Outstanding (DSO)
- Cash conversion cycle
- Burn rate (if not profitable)
- Runway (months of cash available)

### Tools for Cash Flow Management

1. **Accounting Software**: QuickBooks, Xero, Wave
2. **Forecasting Tools**: Float, Pulse, Fluidly
3. **Invoice Management**: FreshBooks, Invoice2go
4. **Payment Processing**: Stripe, Square, PayPal

### Real-World Scenario: Improving Cash Flow

**Before:**
- Project-based work
- NET 30 payment terms
- No deposits
- Cash crunches every month

**After:**
- 40% recurring revenue from retainers
- 50% deposits on projects
- NET 15 terms with 2% early payment discount
- 4 months cash reserves

Result: Stress-free operations and ability to invest in growth

### Action Items
1. Create a 13-week cash flow forecast
2. Calculate your current cash runway
3. Identify three ways to accelerate cash inflows
4. Set up automated invoice reminders`,

      `# Business Models for Developers

## Choosing the Right Model for Sustainable Success

Your business model determines how you create, deliver, and capture value. As a developer, you have unique advantages in several models, but each comes with distinct financial implications.

### Freelancing/Consulting Model

**How it Works:**
- Sell your time and expertise
- Direct client relationships
- Project or hourly-based pricing

**Financial Characteristics:**
- Revenue: $75-300/hour
- Gross Margin: 80-90%
- Scalability: Limited (time constraint)
- Cash Flow: Irregular, depends on pipeline

**Pros:**
- Low startup costs
- High initial margins
- Direct control
- Fast cash generation

**Cons:**
- Income ceiling (hours × rate)
- Feast or famine cycles
- No passive income
- Difficult to sell business

**Financial Optimization:**
- Move from hourly to value pricing
- Productize services (fixed packages)
- Build retainer relationships
- Raise rates annually (10-20%)

### SaaS (Software as a Service) Model

**How it Works:**
- Build once, sell many times
- Subscription-based pricing
- Continuous value delivery

**Financial Characteristics:**
- Revenue: $10-500/user/month typical
- Gross Margin: 70-85%
- Scalability: Very high
- Cash Flow: Predictable after scale

**Key Metrics:**
- MRR (Monthly Recurring Revenue)
- Churn Rate (target <5% monthly)
- CAC Payback Period (<12 months)
- LTV:CAC Ratio (>3:1)

**Pros:**
- Recurring revenue
- High margins at scale
- Predictable growth
- High valuation multiples (3-10x revenue)

**Cons:**
- Upfront investment needed
- Long path to profitability
- Continuous development required
- Customer support burden

**Financial Optimization:**
- Annual plans (10-20% discount)
- Tiered pricing (capture more value)
- Reduce churn (biggest lever)
- Optimize CAC channels

### Productized Service Model

**How it Works:**
- Standardized service offerings
- Fixed scope and price
- Repeatable delivery process

**Examples:**
- Website audits: $2,000
- Performance optimization: $5,000
- Security assessment: $3,000

**Financial Characteristics:**
- Revenue: $1,000-10,000 per package
- Gross Margin: 60-75%
- Scalability: Medium (can hire/outsource)
- Cash Flow: More predictable than consulting

**Pros:**
- Higher margins than hourly work
- Easier to sell (clear value)
- Can build team/processes
- Gateway to products

**Cons:**
- Still trading time for money
- Scope creep risks
- Competition on price
- Customer acquisition needed

### Digital Products Model

**How it Works:**
- Create once, sell forever
- Courses, templates, tools, plugins
- One-time or subscription pricing

**Financial Characteristics:**
- Revenue: $20-2,000 per sale typical
- Gross Margin: 85-95%
- Scalability: Very high
- Cash Flow: Sporadic without marketing

**Pros:**
- True passive income potential
- No fulfillment after creation
- Can validate before building
- Multiple distribution channels

**Cons:**
- Requires audience or marketing
- Piracy and competition
- May become outdated
- Support expectations

### Agency/Development Shop Model

**How it Works:**
- Build team of developers
- Take on larger projects
- You manage, they execute

**Financial Characteristics:**
- Revenue: Project-based or retainers
- Gross Margin: 30-50%
- Scalability: Medium-high
- Cash Flow: Depends on contracts

**Key Metrics:**
- Utilization rate (target 75-85%)
- Effective hourly rate
- Project margin
- Employee efficiency ratio

**Pros:**
- Can handle bigger projects
- Business value beyond yourself
- Recurring client relationships
- Can eventually sell business

**Cons:**
- Management overhead
- Lower margins
- HR and culture challenges
- Cash flow complexity

### Hybrid Models

**The Evolution Path:**
Many successful developers combine models:

1. **Start**: Freelancing (immediate income)
2. **Stabilize**: Add retainers (predictable income)
3. **Scale**: Launch SaaS or products (passive income)
4. **Optimize**: Keep best of each model

**Example Portfolio:**
- 40% Consulting (high-value projects)
- 40% SaaS (growing MRR)
- 20% Courses (passive income)

### Choosing Your Model

**Consider:**
1. **Your Goals**
   - Lifestyle business vs. growth startup
   - Income needs vs. wealth building
   - Work-life balance preferences

2. **Your Resources**
   - Available time
   - Starting capital
   - Risk tolerance
   - Existing skills

3. **Market Opportunity**
   - Problem severity
   - Market size
   - Competition
   - Pricing potential

### Financial Comparison Table

| Model | Startup Cost | Time to Revenue | Time to $10k/mo | Max Revenue Potential | Exit Multiple |
|-------|--------------|-----------------|------------------|----------------------|---------------|
| Freelancing | <$1,000 | Immediate | 2-6 months | $300k/year | 0.5-1x revenue |
| SaaS | $5,000-50,000 | 3-6 months | 12-24 months | Unlimited | 3-10x revenue |
| Products | $1,000-10,000 | 1-3 months | 6-18 months | $1M+/year | 2-4x revenue |
| Agency | $10,000+ | 1-2 months | 6-12 months | $10M+/year | 1-2x revenue |

### Action Items
1. Evaluate your current model's financial performance
2. Identify constraints limiting your growth
3. Design a transition plan if changing models
4. Set 12-month revenue goals for chosen model`
    ])

    // Week 1 Quiz
    const quiz1Result = await pool.query(`
      INSERT INTO quizzes (week_id, title, description, passing_score, max_attempts, time_limit_minutes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [
      week1Id,
      'Week 1: Financial Fundamentals Assessment',
      'Test your understanding of basic financial concepts and business models',
      70,
      3,
      30
    ])

    const quiz1Id = quiz1Result.rows[0].id

    // Week 1 Quiz Questions
    await pool.query(`
      INSERT INTO questions (quiz_id, question_text, question_type, options, correct_answer, explanation, points, order_index)
      VALUES 
      ($1, 'What is the primary reason money today is worth more than money in the future?', 'multiple_choice', $2, $3, $4, 2, 1),
      ($1, 'If a SaaS business has a CAC of $1,000 and an LTV of $2,500, what is their LTV:CAC ratio and is it healthy?', 'multiple_choice', $5, $6, $7, 3, 2),
      ($1, 'What is the difference between gross margin and net margin?', 'multiple_choice', $8, $9, $10, 2, 3),
      ($1, 'Which business model typically has the highest gross margins?', 'multiple_choice', $11, $12, $13, 2, 4),
      ($1, 'What is the most important type of cash flow for business sustainability?', 'multiple_choice', $14, $15, $16, 2, 5)
    `, [
      quiz1Id,
      JSON.stringify(['Inflation only', 'Opportunity cost, inflation, and risk', 'Government regulations', 'Market volatility']),
      JSON.stringify('Opportunity cost, inflation, and risk'),
      'Money today can be invested to earn returns, loses purchasing power over time due to inflation, and future payments carry uncertainty.',
      JSON.stringify(['2.5:1 - Healthy', '2.5:1 - Unhealthy', '0.4:1 - Healthy', '0.4:1 - Unhealthy']),
      JSON.stringify('2.5:1 - Healthy'),
      'LTV:CAC = $2,500/$1,000 = 2.5:1. While positive, this is below the ideal 3:1 ratio, indicating room for improvement in unit economics.',
      JSON.stringify(['Gross margin includes all expenses, net margin only includes COGS', 'Gross margin only subtracts COGS, net margin includes all expenses and taxes', 'They are the same thing', 'Gross margin is always lower than net margin']),
      JSON.stringify('Gross margin only subtracts COGS, net margin includes all expenses and taxes'),
      'Gross margin = (Revenue - COGS)/Revenue, while Net margin = (Revenue - All Expenses - Taxes)/Revenue. Net margin is the true bottom-line profitability.',
      JSON.stringify(['Freelancing/Consulting', 'Agency/Development Shop', 'Digital Products/SaaS', 'Physical Products']),
      JSON.stringify('Digital Products/SaaS'),
      'Digital products and SaaS typically achieve 85-95% gross margins due to near-zero marginal costs of distribution.',
      JSON.stringify(['Investing cash flow', 'Financing cash flow', 'Operating cash flow', 'All are equally important']),
      JSON.stringify('Operating cash flow'),
      'Operating cash flow from core business activities determines whether a business can sustain itself without external funding.'
    ])

    // Continue with more weeks...
    // Week 2: Bookkeeping and Accounting Basics
    await pool.query(`
      INSERT INTO weeks (course_id, week_number, title, overview, learning_objectives, estimated_hours)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [
      courseId,
      2,
      'Bookkeeping and Accounting Fundamentals',
      'Learn double-entry bookkeeping, understand financial statements, and master the accounting equation.',
      JSON.stringify([
        'Master double-entry bookkeeping',
        'Understand debits and credits',
        'Read and interpret financial statements',
        'Apply the accounting equation',
        'Set up a chart of accounts'
      ]),
      10
    ])

    // Create additional weeks (3-12) with comprehensive content
    const weekTopics = [
      { number: 3, title: 'Financial Statements Deep Dive', hours: 10 },
      { number: 4, title: 'Tax Planning and Compliance', hours: 12 },
      { number: 5, title: 'Pricing Strategies and Cost Analysis', hours: 8 },
      { number: 6, title: 'Financial Planning and Budgeting', hours: 10 },
      { number: 7, title: 'Investment and Funding Strategies', hours: 10 },
      { number: 8, title: 'Financial Analysis and KPIs', hours: 9 },
      { number: 9, title: 'Legal Structures and Contracts', hours: 8 },
      { number: 10, title: 'Risk Management and Insurance', hours: 7 },
      { number: 11, title: 'Scaling and Growth Finance', hours: 10 },
      { number: 12, title: 'Exit Strategies and Valuation', hours: 8 }
    ]

    for (const week of weekTopics) {
      await pool.query(`
        INSERT INTO weeks (course_id, week_number, title, overview, learning_objectives, estimated_hours)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        courseId,
        week.number,
        week.title,
        `Comprehensive coverage of ${week.title.toLowerCase()} for developer-entrepreneurs.`,
        JSON.stringify([
          `Master ${week.title.toLowerCase()} concepts`,
          'Apply knowledge to real business scenarios',
          'Understand common pitfalls and best practices',
          'Build practical tools and templates',
          'Analyze case studies from tech companies'
        ]),
        week.hours
      ])
    }

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    await pool.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5)
    `, ['admin@finacademy.com', adminPassword, 'Admin', 'User', 'admin'])

    // Create test student
    const studentPassword = await bcrypt.hash('student123', 10)
    await pool.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5)
    `, ['student@example.com', studentPassword, 'Test', 'Student', 'student'])

    console.log('Database seeded successfully!')
    console.log('Admin login: admin@finacademy.com / admin123')
    console.log('Student login: student@example.com / student123')

  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await pool.end()
  }
}

seedData()