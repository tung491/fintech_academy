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

    // Week 6: Investment and Funding Strategies
    const week6Result = await pool.query(`
      INSERT INTO weeks (course_id, week_number, title, overview, learning_objectives, estimated_hours)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [
      courseId,
      6,
      'Investment and Funding Strategies',
      'Understand different funding options for tech businesses, from bootstrapping to venture capital, and learn how to make smart investment decisions.',
      JSON.stringify([
        'Evaluate different funding sources and their trade-offs',
        'Understand equity dilution and valuation basics',
        'Learn to pitch to investors effectively',
        'Make informed decisions about when and how much to raise',
        'Understand investment principles for business owners'
      ]),
      10
    ])

    const week6Id = week6Result.rows[0].id

    // Week 6 Lessons
    await pool.query(`
      INSERT INTO lessons (week_id, title, slug, content, order_index, lesson_type, duration_minutes)
      VALUES 
      ($1, 'Bootstrapping vs External Funding', 'bootstrapping-vs-funding', $2, 1, 'lecture', 75),
      ($1, 'Understanding Equity and Valuation', 'equity-and-valuation', $3, 2, 'lecture', 90),
      ($1, 'Angel Investors and VCs', 'angel-investors-vcs', $4, 3, 'lecture', 85),
      ($1, 'Alternative Funding Sources', 'alternative-funding', $5, 4, 'lecture', 80),
      ($1, 'Investment Principles for Entrepreneurs', 'investment-principles', $6, 5, 'lecture', 70)
    `, [
      week6Id,
      `# Bootstrapping vs External Funding

## The Funding Decision Framework

Choosing how to fund your business is one of the most critical strategic decisions you'll make. Each approach has profound implications for control, growth trajectory, and ultimate outcomes.

### Bootstrapping: Building with Your Own Resources

**Definition:** Self-funding through personal savings, revenue reinvestment, and organic growth.

**Advantages:**
- **Full Control:** You make all decisions without investor input
- **No Dilution:** You own 100% of your business
- **No Debt:** No loans to repay or interest payments
- **Focus on Profitability:** Forces sustainable business practices
- **Flexibility:** Pivot quickly without investor approval

**Disadvantages:**
- **Limited Resources:** Growth constrained by available cash
- **Slower Growth:** May miss market opportunities
- **Personal Risk:** Your money is at stake
- **Resource Limitations:** Can't hire top talent or invest in marketing at scale
- **Competitive Disadvantage:** Funded competitors may outspend you

**Best For:**
- Service-based businesses (consulting, agencies)
- SaaS products with low initial costs
- Businesses with quick path to profitability
- Entrepreneurs who value control over growth speed

### External Funding: Accessing Outside Capital

**Definition:** Raising money from investors, lenders, or other external sources in exchange for equity, debt, or revenue sharing.

**Advantages:**
- **Accelerated Growth:** Access to capital for rapid scaling
- **Expertise and Networks:** Investors bring knowledge and connections
- **Risk Sharing:** Others share in the financial risk
- **Competitive Advantage:** Outspend bootstrapped competitors
- **Talent Acquisition:** Can hire experienced team members

**Disadvantages:**
- **Equity Dilution:** You give up ownership percentage
- **Loss of Control:** Investors have say in major decisions
- **Pressure for Growth:** Must deliver returns on investor timeline
- **Complexity:** Legal, reporting, and governance overhead
- **Exit Pressure:** Investors need liquidity events

**Best For:**
- Capital-intensive businesses
- Winner-take-all markets
- Businesses requiring significant upfront investment
- Markets where speed to scale is critical

### Hybrid Approaches

**Revenue-Based Financing (RBF)**
- Repay based on percentage of monthly revenue
- No equity dilution
- Higher cost of capital than traditional debt

**Convertible Debt**
- Initially structured as debt, converts to equity later
- Common for early-stage funding
- Delays valuation discussion

**SAFE (Simple Agreement for Future Equity)**
- Not debt, not equity initially
- Popular with Y Combinator companies
- Converts during next priced round

### Financial Comparison

**Bootstrapped SaaS Example:**
- Year 1: $0 → $50k revenue
- Year 2: $50k → $200k revenue  
- Year 3: $200k → $500k revenue
- Founder owns: 100%
- Time to $1M ARR: 4-5 years

**VC-Funded SaaS Example:**
- Raise $1M seed round (give up 20%)
- Year 1: $0 → $200k revenue
- Year 2: $200k → $1M revenue
- Year 3: $1M → $3M revenue
- Founder owns: 80% (before future dilution)
- Time to $1M ARR: 18-24 months

### The Dilution Math

**Seed Round Example:**
- Pre-money valuation: $4M
- Investment: $1M
- Post-money valuation: $5M
- Dilution: 20% ($1M ÷ $5M)
- Founder ownership: 80%

**Series A Example (18 months later):**
- Pre-money valuation: $9M
- Investment: $3M
- Post-money valuation: $12M
- New dilution: 25% ($3M ÷ $12M)
- Original founder ownership: 80% × 75% = 60%

### Decision Criteria

**Choose Bootstrapping If:**
- You can achieve profitability quickly (6-18 months)
- Market doesn't require first-mover advantage
- You have sufficient personal resources
- You value control over growth speed
- Your business model has strong margins

**Choose External Funding If:**
- Market opportunity is massive and time-sensitive
- Significant upfront investment required
- Network effects or winner-take-all dynamics
- You need specific expertise investors can provide
- Personal resources are insufficient

### Bootstrapping Strategies for Developers

**1. Client-Funded Development**
- Build products while doing consulting
- Use client projects to fund product development
- Validate ideas with paying customers first

**2. Pre-Sales and Crowdfunding**
- Sell before you build
- Use platforms like Kickstarter, Indiegogo
- Validate demand and raise capital simultaneously

**3. Revenue Optimization**
- Focus on high-margin services initially
- Reinvest all profits into product development
- Gradually transition from services to products

**4. Lean Operations**
- Work from home/co-working spaces
- Use open-source tools where possible
- Outsource non-core activities

### Common Bootstrapping Mistakes

1. **Lifestyle Creep:** Increasing personal expenses as revenue grows
2. **Under-Investment in Marketing:** Not spending enough on customer acquisition
3. **Poor Cash Flow Management:** Not maintaining adequate reserves
4. **Perfectionism:** Over-engineering before market validation
5. **Underpricing:** Not raising prices as value is proven

### When to Consider Funding

**Positive Indicators:**
- Strong product-market fit demonstrated
- Clear path to 10x+ growth
- Competitive landscape requires speed
- Team ready to scale operations
- Clear use of funds with measurable outcomes

**Warning Signs:**
- Seeking funding to solve fundamental business problems
- No clear plan for using the capital
- Unrealistic growth projections
- Team inexperienced with managing investors
- Personal motivation is just having more cash

### Action Items
1. Calculate how much personal runway you have for bootstrapping
2. Research 5 companies in your space and how they were funded
3. Create a 3-year financial projection for both scenarios
4. List the trade-offs that matter most to you personally`,

      `# Understanding Equity and Valuation

## Equity Fundamentals for Developers

Equity represents ownership in your company. As a founder, understanding how equity works is crucial whether you're bootstrapping, bringing on co-founders, or raising investment.

### What is Equity?

**Equity = Ownership Percentage of Company Value**

If your company is worth $1,000,000 and you own 50% equity, your stake is worth $500,000 (on paper).

**Key Components:**
- **Common Stock:** What founders and employees typically receive
- **Preferred Stock:** What investors typically receive (with special rights)
- **Options/Warrants:** Rights to purchase shares at set prices
- **Convertible Securities:** Debt or preferred that converts to equity

### Pre-Money vs Post-Money Valuation

**Pre-Money Valuation:** Company value before investment
**Post-Money Valuation:** Company value after investment

**Example:**
- Pre-money valuation: $4M
- Investment: $1M
- Post-money valuation: $5M
- Investor owns: $1M ÷ $5M = 20%
- Founder dilution: 20%

### Valuation Methods for Early-Stage Companies

**1. Comparable Company Analysis**
- Look at similar companies' valuations
- Adjust for differences in stage, market, team
- Common in later-stage valuations

**2. Revenue Multiples**
- SaaS: 5-15x Annual Recurring Revenue
- Marketplaces: 10-20x Revenue
- E-commerce: 2-6x Revenue
- Varies greatly by growth rate and margins

**3. Risk-Adjusted Net Present Value**
- Discount future cash flows to present value
- Apply high discount rates (30-50%) for risk
- Complex but most theoretically sound

**4. Berkus Method (Dave Berkus)**
- Pre-revenue valuation framework
- Assigns value to different risk factors:
  - Sound idea: $0-$500k
  - Prototype: $0-$500k
  - Quality management team: $0-$500k
  - Strategic relationships: $0-$500k
  - Product rollout/sales: $0-$500k
- Maximum pre-money: $2.5M

**5. First Chicago Method**
- Create three scenarios: worst, base, best
- Assign probabilities to each
- Calculate weighted average valuation

### Startup Valuation by Stage

**Pre-Seed/Idea Stage:**
- Valuation: $1M-$5M
- Based on team, market size, initial traction
- Primarily qualitative assessment

**Seed Stage:**
- Valuation: $3M-$15M
- Some revenue/user traction
- Product-market fit signals

**Series A:**
- Valuation: $10M-$50M
- Proven business model
- Clear growth metrics and path to scale

**Series B and Beyond:**
- Valuation: $25M-$500M+
- Strong revenue growth
- Path to profitability or exit

### Cap Tables and Equity Distribution

**Typical Cap Table Progression:**

**At Founding:**
- Founder 1: 60%
- Founder 2: 40%
- Employee option pool: 0%

**Pre-Seed ($200k SAFE):**
- Founders: 80% (diluted from fundraise)
- Employee options: 15%
- SAFE investors: 5%

**Seed Round ($1M):**
- Founders: 60%
- Employees: 12%
- Seed investors: 20%
- SAFE investors: 8%

**Series A ($5M):**
- Founders: 45%
- Employees: 15%
- Series A: 25%
- Earlier investors: 15%

### Founder Equity Splits

**Equal Split (50/50, 33/33/33):**
- Pros: Simple, shows commitment to partnership
- Cons: Doesn't reflect different contributions
- When to use: Co-founders contributing equally

**Unequal Split:**
- Based on: Idea origination, capital contribution, time commitment, relevant experience, risk taken
- More complex but potentially fairer
- Use frameworks like the Founder Equity Calculator

**Vesting Schedules:**
- Standard: 4 years with 1-year cliff
- Protects company if founder leaves early
- Both co-founders should be subject to vesting

### Employee Equity (Stock Options)

**Option Pool Size:**
- Pre-seed: 10-15%
- Seed: 15-20%
- Series A: 15-25%

**Individual Grants:**
- Early employees: 0.1-2.0%
- Senior hires: 0.25-1.0%
- C-level executives: 1-5%

**Option Pricing:**
- Strike price = Fair Market Value at grant
- 409A valuations required for private companies
- ISOs vs NSOs have different tax implications

### Dilution Protection and Anti-Dilution

**Pro-Rata Rights:** Investors can maintain ownership percentage in future rounds

**Anti-Dilution Provisions:**
- **Full Ratchet:** Conversion price adjusts to lowest price in down round
- **Weighted Average:** More founder-friendly adjustment based on amount raised

**Example of Anti-Dilution:**
- Investor pays $10/share in Series A
- Series B raises at $5/share (down round)
- Full ratchet: Series A converts at $5/share
- Weighted average: Might convert at $7/share

### Liquidation Preferences

**Non-Participating Preferred:**
- Investor gets back investment amount first
- Then participates in remaining proceeds based on ownership

**Participating Preferred:**
- Investor gets back investment AND participates in upside
- "Double dipping" - less founder friendly

**Example ($10M exit, $2M invested for 20%):**
- Non-participating: $2M preference + 20% of remaining $8M = $3.6M total
- Participating: $2M preference + 20% of total $10M = $4M total

### Valuation Negotiation Strategies

**For Founders:**
1. **Build leverage:** Multiple interested investors
2. **Show traction:** Revenue, users, partnerships
3. **Demonstrate team strength:** Previous successes, relevant experience
4. **Highlight market opportunity:** Large, growing market
5. **Minimize dilution:** Raise only what you need

**Red Flags in Term Sheets:**
- Excessive liquidation preferences (2x+ or participating)
- Unfavorable anti-dilution (full ratchet)
- High option pool requirements
- Onerous control provisions
- Personal guarantees

### Common Valuation Mistakes

**Overvaluing Early:**
- Makes future fundraising difficult
- Creates unrealistic expectations
- May deter experienced investors

**Undervaluing Significantly:**
- Excessive dilution
- Undervalues founder contributions
- Sets low benchmark for employees

**Ignoring Terms for Valuation:**
- High valuation with bad terms may be worse than lower valuation with good terms
- Liquidation preferences can eliminate upside

### Tax Considerations

**83(b) Election:**
- Pay taxes on equity value at grant, not vesting
- Critical for founder shares
- Must file within 30 days

**ISOs vs NSOs:**
- ISOs have preferential tax treatment but limitations
- NSOs more flexible but higher tax burden

**QSBS (Qualified Small Business Stock):**
- Potential to exclude up to $10M from federal taxes
- Requires holding stock for 5+ years
- Specific requirements must be met

### Action Items
1. Create a simple cap table model in Excel/Google Sheets
2. Research valuations of 5 companies similar to yours
3. Calculate your personal equity value under different exit scenarios
4. Understand the tax implications of your equity structure`,

      `# Angel Investors and VCs: Understanding the Ecosystem

## The Investment Landscape for Tech Startups

Understanding different types of investors, their motivations, and investment criteria is crucial for successfully raising capital and choosing the right partners for your business.

### Angel Investors: Your First Institutional Capital

**Who They Are:**
- High-net-worth individuals who invest personal funds
- Often successful entrepreneurs or executives
- Typically invest $25k-$250k per deal
- More relationship-driven than institutional

**What They Bring:**
- **Capital:** Usually smaller amounts than VCs
- **Expertise:** Often domain-specific knowledge
- **Networks:** Connections to customers, partners, talent
- **Mentorship:** Hands-on guidance and support

**Investment Criteria:**
- Strong founding team (most important factor)
- Large market opportunity
- Defensible business model
- Personal connection/interest in the space
- Potential for 10x+ returns

**Angel Groups:**
- Angels who pool resources and share due diligence
- More structured process than individual angels
- Examples: Band of Angels, New York Angels, Tech Coast Angels

### Venture Capital: Scaling with Institutional Money

**VC Fund Economics:**
- Manage other people's money (pension funds, endowments, wealthy individuals)
- Typically 2% management fee + 20% carry
- Expected 3-5x returns to LPs (limited partners)
- Need 10x+ returns on investments to achieve fund returns

**VC Investment Stages:**

**Seed VCs:**
- Investment size: $500k-$3M
- Stage: MVP to early traction
- Examples: First Round, Precursor Ventures, Homebrew

**Series A VCs:**
- Investment size: $3M-$15M
- Stage: Product-market fit, scaling revenue
- Examples: Greylock, Sequoia, Benchmark

**Growth Stage VCs:**
- Investment size: $15M-$100M+
- Stage: Proven business model, scaling operations
- Examples: Tiger Global, Insight Partners, General Atlantic

### What VCs Look for: The Investment Framework

**1. Market Size and Opportunity**
- Total Addressable Market (TAM) >$1B
- Growing market with tailwinds
- Potential for market disruption

**2. Team Quality**
- Relevant domain expertise
- Previous startup experience (preferred)
- Ability to execute and scale
- Coachability and learning mindset

**3. Product and Traction**
- Strong product-market fit signals
- Compelling unit economics
- Defensible competitive moats
- Clear path to scale

**4. Business Model**
- High gross margins (>70% for software)
- Recurring revenue preferred
- Network effects or winner-take-all dynamics
- Clear monetization strategy

**5. Financial Metrics**
- Rule of 40 (Growth Rate + Profit Margin ≥ 40%)
- Strong cohort retention and LTV/CAC ratios
- Efficient growth (reasonable burn rate)

### The Fundraising Process

**1. Preparation Phase (2-4 weeks)**
- Create compelling pitch deck
- Prepare detailed financial model
- Gather supporting materials (demo, references)
- Research target investors thoroughly

**2. Initial Outreach (2-3 weeks)**
- Warm introductions preferred (5x higher success rate)
- Craft personalized outreach emails
- Target 20-30 relevant investors initially

**3. First Meetings (3-4 weeks)**
- 30-60 minute initial pitch meetings
- Focus on telling compelling story
- Expect 50%+ rejection rate at this stage

**4. Due Diligence (3-6 weeks)**
- Deep dive on market, team, product
- Reference calls with customers and team
- Financial and legal review
- Technical/security assessment

**5. Term Sheet and Negotiation (1-2 weeks)**
- Non-binding terms outline
- Negotiate key terms (valuation, board seats, etc.)
- Legal documentation follows

**6. Closing (2-4 weeks)**
- Final legal documentation
- Investor onboarding
- Capital deployment

### Pitch Deck Essentials

**The 10-15 Slide Structure:**

1. **Problem:** Clear, relatable problem statement
2. **Solution:** Your unique approach to solving it
3. **Market:** Size and growth of opportunity
4. **Product:** Demo or detailed product overview
5. **Traction:** Key metrics and growth
6. **Business Model:** How you make money
7. **Competition:** Competitive landscape and differentiation
8. **Team:** Why you're the right team to execute
9. **Financials:** Revenue projections and key metrics
10. **Funding:** How much and what you'll use it for

**Key Principles:**
- Tell a story, don't just present facts
- Keep slides simple and visual
- Practice until you can pitch without slides
- Be prepared for deep technical questions

### Common Fundraising Mistakes

**1. Fundraising Too Early**
- No clear traction or product-market fit
- Weak metrics or story
- Results in lower valuation or rejection

**2. Fundraising Too Late**
- Running out of cash during process
- Desperate positioning weakens negotiation
- May have to accept unfavorable terms

**3. Poor Investor Selection**
- Pitching to investors who don't invest in your stage/sector
- Not researching investor backgrounds and portfolios
- Focusing only on brand names vs. best fit

**4. Inadequate Preparation**
- Weak financial model or projections
- Can't answer basic questions about business
- No clear use of funds or milestones

**5. Unrealistic Expectations**
- Overvaluing company significantly
- Expecting immediate responses or decisions
- Not understanding investor decision timelines

### Working with VCs Post-Investment

**Board Management:**
- Typically 1-3 investor board seats depending on round
- Monthly board meetings with prepared materials
- Focus on key metrics, challenges, and asks for help

**Investor Communications:**
- Monthly investor updates (even if not required)
- Quarterly metrics reviews
- Annual strategy sessions

**Leveraging Investor Value-Add:**
- Recruiting: Help finding key hires
- Customer introductions and partnerships
- Strategic guidance on key decisions
- Next round fundraising support

### Alternative Investment Sources

**Corporate VCs:**
- Strategic investors from large companies
- Bring potential partnerships and exits
- May have strategic agenda beyond returns
- Examples: GV (Google), Intel Capital, Salesforce Ventures

**Government Programs:**
- SBIR grants for R&D focused companies
- State and local economic development programs
- Generally dilution-free but competitive

**Accelerators:**
- 3-6 month programs with demo day
- Typically invest $25k-$250k for 6-10% equity
- Provide mentorship, networks, and structure
- Examples: Y Combinator, Techstars, 500 Startups

### International Considerations

**Global VC Markets:**
- Silicon Valley: Largest, most competitive
- New York: Strong fintech and enterprise focus
- London: European hub, growing ecosystem
- Southeast Asia: Rapidly expanding market

**Cross-Border Implications:**
- Tax and legal complexity
- Currency and political risks
- Different investor expectations and norms

### Action Items
1. Research 20 investors who invest in your stage/sector
2. Identify mutual connections for warm introductions
3. Create a target list with investment thesis for each
4. Practice your pitch with advisors and other founders
5. Prepare comprehensive data room materials`,

      `# Alternative Funding Sources

## Beyond Traditional VC: Exploring Creative Capital Options

While venture capital gets most of the attention, many successful tech businesses have been built using alternative funding sources that offer different trade-offs in terms of control, cost, and complexity.

### Revenue-Based Financing (RBF)

**How It Works:**
- Investors provide capital in exchange for a percentage of future revenue
- Repayment continues until a pre-agreed multiple is reached (typically 1.5x-3x)
- No equity dilution or board seats

**Example Structure:**
- Raise: $500k
- Revenue share: 4% of monthly revenue
- Repayment cap: $1.5M (3x multiple)
- If monthly revenue = $100k, monthly payment = $4k
- Payback period varies based on growth

**Best For:**
- SaaS companies with recurring revenue
- Businesses with predictable cash flows
- Founders who want to maintain control
- Companies that don't fit traditional VC model

**Providers:**
- Lighter Capital
- Clearbanc (now Clearco)
- Foundry Group's Next Wave
- Bigfoot Capital

**Pros:**
- No equity dilution
- No board seats or control loss
- Flexible repayment (tied to performance)
- Faster process than VC fundraising

**Cons:**
- Higher cost of capital (12-20% IRR)
- Revenue share can constrain cash flow
- Limited funding amounts ($10k-$10M typical)
- Requires consistent revenue

### Debt Financing Options

**Traditional Bank Loans:**
- Difficult for early-stage startups
- Requires personal guarantees and collateral
- Lower cost but strict repayment terms

**SBA Loans:**
- Government-backed loans for small businesses
- 7(a) loans up to $5M
- Lower down payments and longer terms
- Extensive paperwork and approval process

**Equipment Financing:**
- Loans for specific business equipment
- Equipment serves as collateral
- Good for hardware startups or office buildouts

**Lines of Credit:**
- Flexible access to capital up to limit
- Interest only on amounts used
- Good for managing cash flow fluctuations

### Crowdfunding Platforms

**Reward-Based Crowdfunding:**

**Kickstarter:**
- All-or-nothing funding model
- Backers receive products or rewards
- Great for consumer products and hardware
- Average successful project: $25k-$50k

**Indiegogo:**
- Flexible funding options
- Keep funds even if goal not met
- Good for niche or specialized products

**Success Strategies:**
- Professional video and campaign page
- Early community building
- Press and influencer outreach
- Compelling reward tiers

**Equity Crowdfunding:**

**Republic:**
- Accredited and non-accredited investors
- SEC-compliant equity offerings
- Community building features

**SeedInvest:**
- Focus on accredited investors
- Professional due diligence process
- Higher minimum investments

**Regulation CF:**
- Raise up to $5M from general public
- Extensive disclosure requirements
- 12-month fundraising period limit

### Grants and Competitions

**Federal Grants:**

**SBIR (Small Business Innovation Research):**
- Phase I: Up to $256k for feasibility
- Phase II: Up to $1.65M for development
- Phase III: Commercial applications
- No equity dilution
- Highly competitive (5-15% acceptance)

**STTR (Small Business Technology Transfer):**
- Similar to SBIR but requires university partnership
- Good for research-heavy projects

**State and Local Grants:**
- Economic development incentives
- Industry-specific programs
- Often smaller amounts but easier process

**Private Grants:**
- Foundation grants for social impact
- Corporate innovation challenges
- Industry association programs

**Startup Competitions:**
- Cash prizes ranging from $10k-$100k+
- Often include mentorship and networking
- Examples: TechCrunch Disrupt, RISE, local pitch competitions

### Strategic Partnerships and Joint Ventures

**Corporate Development:**
- Large companies investing in strategic suppliers
- Access to distribution channels and customers
- Potential acquisition path
- May limit independence and flexibility

**Revenue Sharing Partnerships:**
- Partner provides upfront capital for revenue share
- Common in affiliate marketing and e-commerce
- Aligns incentives between partners

**Joint Ventures:**
- Shared ownership of new entity
- Combines resources and expertise
- Complex legal and operational structure

### Personal and Friends/Family Funding

**Bootstrap Financing:**
- Credit cards (0% promotional rates)
- Home equity lines of credit
- Personal savings and assets
- Maintaining full control

**Friends and Family:**
- Typically $5k-$100k total
- Simple terms and quick decisions
- Risk of straining relationships
- Important to formalize with proper documentation

**Best Practices:**
- Clear written agreements
- Regular communication and updates
- Professional approach despite personal relationships
- Plan for different outcome scenarios

### Invoice Factoring and Asset-Based Lending

**Invoice Factoring:**
- Sell outstanding invoices for immediate cash
- Receive 70-90% of invoice value upfront
- Factor collects payment from customers
- Cost: 1-5% per month

**Asset-Based Lending:**
- Borrow against business assets (inventory, equipment, receivables)
- Higher borrowing capacity than traditional loans
- Complex structure and covenants

### Cryptocurrency and Token Sales

**Initial Coin Offerings (ICOs):**
- Largely replaced by other mechanisms
- Significant regulatory uncertainty
- High risk and complexity

**Security Token Offerings (STOs):**
- SEC-compliant token sales
- Tokens represent equity or debt
- Still emerging market

**Utility Tokens:**
- Tokens that provide access to platform or service
- Must have clear utility beyond investment
- Complex regulatory landscape

### Vendor Financing and Trade Credit

**Supplier Credit:**
- Extended payment terms with suppliers
- Equipment lease programs
- Deferred payment arrangements

**Customer Financing:**
- Advance payments from customers
- Pre-orders and deposits
- Revenue sharing agreements

### Choosing the Right Funding Mix

**Evaluation Criteria:**

1. **Cost of Capital**
   - Interest rates and fees
   - Opportunity cost of equity dilution
   - Hidden costs and complexity

2. **Control and Flexibility**
   - Decision-making autonomy
   - Operational restrictions
   - Exit requirements

3. **Amount and Timing**
   - Capital requirements and timing
   - Funding availability and speed
   - Future funding implications

4. **Strategic Value**
   - Beyond capital benefits
   - Network and expertise access
   - Market validation

**Common Funding Progressions:**

**Bootstrap → Angel → VC:**
- Traditional startup path
- Maintains investor interest and momentum

**Bootstrap → RBF → VC:**
- Good for businesses with early revenue
- Maintains more equity for VC round

**Grant → Crowdfunding → Traditional:**
- Good for hardware or social impact ventures
- Builds market validation early

### Due Diligence for Alternative Funding

**Key Questions:**
1. What are all costs (fees, interest, penalties)?
2. What happens if I can't meet payment obligations?
3. Are there personal guarantees required?
4. How does this affect my ability to raise future capital?
5. What are the reporting and compliance requirements?

### Action Items
1. Map your funding needs over the next 18 months
2. Research 3-5 alternative funding sources that fit your business
3. Calculate the true cost of capital for each option
4. Prepare materials required for alternative funding applications
5. Consider combining multiple funding sources for optimal mix`,

      `# Investment Principles for Entrepreneurs

## Building Wealth While Building Your Business

As an entrepreneur, you're building a business and need to think about personal wealth building. Understanding investment principles helps you make better decisions about business finances and personal wealth management.

### The Entrepreneur's Investment Mindset

**Key Differences from Traditional Investors:**

**1. Concentration vs Diversification**
- Entrepreneurs have concentrated risk in their business
- Need diversification in other investments
- Balance business investment with personal portfolio

**2. Liquidity Considerations**
- Most wealth tied up in illiquid business equity
- Need more liquid emergency funds
- Consider liquidity when making investment decisions

**3. Tax Optimization**
- Business ownership creates unique tax situations
- Investment timing can optimize tax outcomes
- Coordination between business and personal tax planning

**4. Time Horizon Variability**
- Business success timeline uncertain
- Investment horizon may change with business outcomes
- Need flexibility in investment approach

### Core Investment Principles

**1. Start Early and Be Consistent**
- Time in market beats timing the market
- Compound interest is most powerful over long periods
- Even small amounts early make huge difference

**Example:**
- Start at 25: $500/month → $1.37M at 65 (7% return)
- Start at 35: $500/month → $611k at 65 (7% return)
- 10-year delay costs over $750k

**2. Diversification Reduces Risk**
- Don't put all eggs in one basket
- Spread risk across asset classes, geographies, time
- Your business is already one big bet

**3. Keep Costs Low**
- Investment fees compound against you
- 1% annual fee costs 20%+ of returns over time
- Index funds typically have lowest costs

**4. Stay Disciplined**
- Emotions are the biggest enemy of investment returns
- Stick to systematic approach
- Don't chase hot investments or panic sell

### Asset Allocation for Entrepreneurs

**The 120 Rule Modified for Entrepreneurs:**
Traditional: Stock allocation = 120 - Your Age
Entrepreneur: Stock allocation = 100 - Your Age (more conservative due to business concentration)

**Sample Allocations:**

**Age 30 Entrepreneur:**
- Stocks: 70% (vs 90% traditional)
- Bonds: 20%
- Cash/Emergency Fund: 10%

**Age 50 Entrepreneur:**
- Stocks: 50%
- Bonds: 35%
- Cash/Emergency Fund: 15%

**Three-Fund Portfolio (Simple & Effective):**
- Total Stock Market Index: 60%
- International Stock Index: 20%
- Bond Index: 20%

### Investment Vehicles for Entrepreneurs

**Tax-Advantaged Accounts:**

**Solo 401(k) / SEP-IRA:**
- High contribution limits for self-employed
- Solo 401(k): Up to $66k annually (2023)
- SEP-IRA: Up to 25% of compensation
- Great for high-income entrepreneurs

**Backdoor Roth IRA:**
- For high earners above income limits
- Contribute to traditional IRA, convert to Roth
- Tax-free growth and withdrawals in retirement

**HSA (Health Savings Account):**
- Triple tax advantage (deductible, growth, withdrawals)
- Can invest funds after minimum balance
- Becomes additional retirement account after 65

**Taxable Investment Accounts:**
- More flexibility than retirement accounts
- Important for entrepreneurs who may need access
- Tax-efficient investing strategies important

### Dollar-Cost Averaging vs Lump Sum

**Dollar-Cost Averaging (DCA):**
- Invest fixed amount regularly regardless of price
- Reduces timing risk
- Good for systematic saving from business income

**Lump Sum Investing:**
- Invest large amounts when available
- Historically better returns due to time in market
- Good when selling business assets or windfalls

**For Entrepreneurs: Hybrid Approach**
- DCA from regular income
- Lump sum from business profits or exits
- Maintain cash reserves for opportunities

### Business vs Personal Investment Decisions

**When to Invest in Business vs Markets:**

**Invest in Business When:**
- Expected ROI significantly higher than market (>15-20%)
- Clear competitive moats and advantages
- Strong product-market fit demonstrated
- You have unique ability to impact outcomes

**Invest in Markets When:**
- Business returns uncertain or lower
- Need diversification from business risk
- Business doesn't need additional capital
- Personal wealth building independent of business

**Example Decision Framework:**
- Business expansion ROI: 25% expected
- Stock market historical: 10%
- Risk-adjusted business return: 20% (accounting for higher risk)
- Decision: Invest in business, but also maintain market investments for diversification

### Emergency Funds for Entrepreneurs

**Standard Advice:** 3-6 months expenses
**Entrepreneur Reality:** 6-12 months expenses

**Why Entrepreneurs Need More:**
- Irregular income patterns
- Business downturns affect personal income
- May need to invest personal funds in business
- Harder to get traditional employment quickly

**Where to Keep Emergency Funds:**
- High-yield savings accounts (currently 4-5%)
- Money market funds
- Short-term CDs or Treasury bills
- NOT in stocks or business investments

### Investment Mistakes Entrepreneurs Make

**1. Over-Concentration in Own Business**
- All wealth tied to business success
- No diversification if business fails
- Solution: Regular portfolio contributions regardless of business performance

**2. Chasing High Returns**
- Looking for "10x" returns in everything
- Taking unnecessary risks outside business
- Solution: Boring, consistent index fund investing

**3. Poor Liquidity Management**
- All money locked in business or long-term investments
- Can't handle emergencies or opportunities
- Solution: Maintain adequate liquid reserves

**4. Tax Inefficiency**
- Not using tax-advantaged accounts
- Poor timing of capital gains
- Solution: Coordinate with tax professional

**5. Emotional Decision Making**
- Making investment decisions based on business stress
- Panic buying or selling
- Solution: Systematic approach and rules-based investing

### Real Estate Investment for Entrepreneurs

**Primary Residence:**
- Often good investment for entrepreneurs
- Mortgage interest deduction
- Forced savings through principal payments
- Hedge against inflation

**Rental Property:**
- Can provide steady cash flow
- Tax advantages through depreciation
- Requires active management or property manager
- Concentration risk if local to your business

**REITs (Real Estate Investment Trusts):**
- Liquid real estate exposure
- Professional management
- Diversification across property types
- Good alternative to direct ownership

### Exit Planning and Investment Strategy

**Preparing for Business Exit:**

**Years Before Exit:**
- Maximize tax-advantaged retirement accounts
- Build diversified investment portfolio
- Plan for large tax bill from sale
- Consider installment sales or other structures

**After Exit:**
- Don't rush to invest large windfall
- Consider "bucket strategy" for different time horizons
- Work with fee-only financial advisor
- Maintain some higher-risk investments (you can afford it)

**Wealth Preservation Strategies:**
- Asset protection structures
- Tax optimization through charitable giving
- Estate planning considerations
- Maintaining appropriate liquidity

### Investment Resources and Tools

**Low-Cost Brokers:**
- Vanguard, Fidelity, Charles Schwab
- No-fee stock and ETF trades
- Low expense ratio index funds

**Robo-Advisors:**
- Betterment, Wealthfront, Vanguard Personal Advisor
- Automated portfolio management
- Good for busy entrepreneurs
- Reasonable fees for full service

**Education Resources:**
- Bogleheads community and wiki
- "A Random Walk Down Wall Street" by Burton Malkiel
- "The Bogleheads' Guide to Investing"
- Morningstar.com for research

### Action Items
1. Calculate your current asset allocation including business equity
2. Set up tax-advantaged investment accounts if not done
3. Automate monthly investments to index funds
4. Build emergency fund to 6-12 months expenses
5. Review and rebalance portfolio quarterly`
    ])

    // Create additional weeks (3-5 and 7-12) with basic structure for now
    const remainingWeeks = [
      { number: 3, title: 'Financial Statements Deep Dive', hours: 10 },
      { number: 4, title: 'Tax Planning and Compliance', hours: 12 },
      { number: 5, title: 'Pricing Strategies and Cost Analysis', hours: 8 },
      { number: 7, title: 'Performance Metrics and KPIs', hours: 10 },
      { number: 8, title: 'Financial Analysis and Risk Management', hours: 9 },
      { number: 9, title: 'Legal Structures and Contracts', hours: 8 },
      { number: 10, title: 'Scaling and Growth Finance', hours: 7 },
      { number: 11, title: 'Business Valuation and Exit Planning', hours: 10 },
      { number: 12, title: 'Advanced Topics and Case Studies', hours: 8 }
    ]

    for (const week of remainingWeeks) {
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