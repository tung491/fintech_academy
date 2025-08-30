import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function completeCurriculum() {
  console.log('🚀 Completing FinAcademy Curriculum - Adding Weeks 2-6 + All Quizzes...')

  try {
    // Get the existing course
    const course = await prisma.course.findFirst({
      where: { slug: 'finacademy-for-developers' }
    })

    if (!course) {
      throw new Error('Course not found')
    }

    // =======================================================================
    // WEEK 2: Business Models & Revenue Streams
    // =======================================================================
    
    console.log('📚 Creating Week 2: Business Models & Revenue Streams...')
    
    const week2 = await prisma.week.update({
      where: {
        courseId_weekNumber: {
          courseId: course.id,
          weekNumber: 2
        }
      },
      data: {
        title: 'Business Models & Revenue Streams',
        overview: 'Master different business models and revenue generation strategies for developer entrepreneurs. Learn to choose and optimize the right model for your business.',
        learningObjectives: JSON.stringify([
          'Understand different business model types and their financial implications',
          'Learn revenue stream optimization strategies',
          'Master pricing psychology and strategies',
          'Understand subscription vs one-time payment models',
          'Learn to calculate and improve unit economics'
        ]),
        estimatedHours: 8,
      }
    })

    // Week 2 Lessons
    await prisma.lesson.createMany({
      data: [
        {
          weekId: week2.id,
          title: 'Business Model Fundamentals',
          slug: 'business-model-fundamentals',
          content: `# Business Model Fundamentals

## Understanding Business Models

A business model defines how your company creates, delivers, and captures value. For developers, choosing the right business model determines your revenue potential, scalability, and work-life balance.

### Core Business Model Components

**1. Value Proposition**
- What problem you solve
- How you solve it uniquely
- Why customers choose you over alternatives

**2. Customer Segments**
- Who your target customers are
- Their pain points and needs
- How to reach and serve them effectively

**3. Revenue Streams**
- How you generate income
- Pricing models and strategies
- Revenue timing and predictability

**4. Key Activities & Resources**
- What you must do to deliver value
- Resources required to operate
- Core competencies needed

### Business Model Categories for Developers

**1. Service-Based Models**
- Freelancing/Consulting
- Custom development
- Maintenance and support
- Characteristics: High touch, limited scalability, immediate revenue

**2. Product-Based Models**
- Software products
- Mobile apps
- Digital tools and utilities
- Characteristics: Scalable, upfront investment, recurring potential

**3. Platform Models**
- Marketplaces
- APIs and integrations
- Multi-sided platforms
- Characteristics: Network effects, high scalability, complex monetization

**4. Content/Education Models**
- Online courses
- Technical writing
- Coaching and mentoring
- Characteristics: Knowledge monetization, passive income potential

### Financial Implications of Each Model

**Service Models:**
- Revenue: $75-300/hour typical
- Gross Margin: 70-85%
- Scalability: Limited by time
- Cash Flow: Project-dependent

**Product Models:**
- Revenue: Varies widely ($10-1000+/user)
- Gross Margin: 80-95%
- Scalability: Very high
- Cash Flow: Delayed but predictable

**Platform Models:**
- Revenue: Commission or subscription-based
- Gross Margin: 60-80%
- Scalability: Exponential potential
- Cash Flow: Network-dependent

### Choosing Your Business Model

Consider these factors:
1. **Personal Goals**: Lifestyle vs growth aspirations
2. **Market Opportunity**: Size and accessibility
3. **Resource Constraints**: Time, money, skills
4. **Risk Tolerance**: Stability vs upside potential

### Hybrid Model Strategy

Many successful developers combine models:
- 60% Consulting (stable income)
- 30% SaaS Product (growth potential)
- 10% Content Creation (passive income)

### Key Takeaways

- Business model choice impacts every aspect of your business
- Consider starting with services, then adding products
- Focus on models that align with your strengths and goals
- Be prepared to evolve your model as you grow`,

          orderIndex: 1,
          lessonType: 'lecture',
          durationMinutes: 90,
        },
        {
          weekId: week2.id,
          title: 'Revenue Stream Optimization',
          slug: 'revenue-stream-optimization',
          content: `# Revenue Stream Optimization

## Maximizing Revenue from Your Business Model

Once you've chosen a business model, optimizing your revenue streams becomes critical for sustainable growth and profitability.

### Types of Revenue Streams

**1. One-Time Revenue**
- Project payments
- Product purchases
- Setup fees
- Pros: Immediate cash, clear value exchange
- Cons: Unpredictable, requires constant sales effort

**2. Recurring Revenue**
- Monthly subscriptions
- Annual licenses
- Retainer agreements
- Pros: Predictable, compounds over time
- Cons: Requires continuous value delivery

**3. Usage-Based Revenue**
- API calls
- Storage/bandwidth
- Transaction fees
- Pros: Scales with customer success
- Cons: Variable and hard to predict

### Revenue Optimization Strategies

**1. Increase Average Revenue Per User (ARPU)**
- Upselling to higher tiers
- Cross-selling complementary services
- Value-based pricing increases
- Premium support options

**2. Improve Customer Lifetime Value (LTV)**
- Reduce churn through better onboarding
- Increase usage through product improvements
- Extend customer relationships
- Create switching costs

**3. Diversify Revenue Sources**
- Multiple product lines
- Different customer segments
- Various pricing models
- Geographic expansion

### Subscription Model Optimization

**Pricing Tiers Strategy:**
- Starter: $29/month (basic features)
- Professional: $99/month (advanced features)
- Enterprise: $299/month (full features + support)

**Annual vs Monthly Billing:**
- Offer 15-20% discount for annual plans
- Improves cash flow and reduces churn
- Example: $99/month or $999/year

### Pricing Psychology

**1. Anchoring Effect**
- Show highest price first
- Makes other options seem reasonable
- Use "Most Popular" labels strategically

**2. Charm Pricing**
- $99 feels much less than $100
- Use for consumer products
- B2B can use round numbers

**3. Value-Based Pricing**
- Price based on customer ROI
- Calculate their cost savings
- Price at 10-20% of value delivered

### Revenue Model Examples

**SaaS Tool Example:**
- Freemium: 0 users (limited features)
- Startup: $29/month (10 users)
- Business: $99/month (50 users)
- Enterprise: $299/month (unlimited + support)

**Consulting Example:**
- Hourly: $150/hour
- Project-based: Fixed scope packages
- Retainer: $5,000/month for ongoing work
- Productized: $2,000 for standard audit

### Key Metrics to Track

**1. Revenue Metrics**
- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)

**2. Growth Metrics**
- Revenue growth rate
- Customer acquisition cost (CAC)
- LTV:CAC ratio
- Payback period

### Common Revenue Mistakes

1. **Underpricing**: Not accounting for all costs
2. **Single Revenue Stream**: Too much dependency
3. **No Price Increases**: Not raising prices annually
4. **Ignoring Churn**: Focusing only on acquisition
5. **Complex Pricing**: Confusing customers

### Action Items

1. Audit your current revenue streams
2. Identify optimization opportunities
3. Test new pricing strategies
4. Set up proper revenue tracking
5. Plan for regular price reviews`,

          orderIndex: 2,
          lessonType: 'lecture',
          durationMinutes: 75,
        }
      ]
    })

    // =======================================================================
    // WEEK 3: Financial Statements and Bookkeeping  
    // =======================================================================

    console.log('📚 Creating Week 3: Financial Statements and Bookkeeping...')

    const week3 = await prisma.week.update({
      where: {
        courseId_weekNumber: {
          courseId: course.id,
          weekNumber: 3
        }
      },
      data: {
        title: 'Financial Statements and Bookkeeping',
        overview: 'Learn to create, read, and analyze financial statements. Master bookkeeping fundamentals and accounting principles essential for business success.',
        learningObjectives: JSON.stringify([
          'Understand the three key financial statements',
          'Learn double-entry bookkeeping fundamentals',
          'Master chart of accounts setup',
          'Understand financial statement analysis',
          'Learn bookkeeping best practices for developers'
        ]),
        estimatedHours: 8,
      }
    })

    await prisma.lesson.createMany({
      data: [
        {
          weekId: week3.id,
          title: 'Understanding Financial Statements',
          slug: 'understanding-financial-statements',
          content: `# Understanding Financial Statements

## The Three Essential Financial Statements

Every business needs three core financial statements to track performance and make informed decisions.

### 1. Income Statement (Profit & Loss)

**Purpose:** Shows revenue and expenses over a specific period
**Formula:** Revenue - Expenses = Net Income

**Key Components:**
- **Revenue/Sales:** All money earned from business operations
- **Cost of Goods Sold (COGS):** Direct costs to deliver services
- **Gross Profit:** Revenue - COGS
- **Operating Expenses:** Indirect business costs
- **Operating Income:** Gross Profit - Operating Expenses
- **Net Income:** Operating Income - Taxes - Interest

**Example Developer SaaS Income Statement:**
\`\`\`
Revenue                     $10,000
COGS:
  - Hosting                  $1,000
  - Payment Processing        $300
Gross Profit                $8,700

Operating Expenses:
  - Marketing                $2,000
  - Software Tools           $500
  - Professional Services    $800
Operating Income            $5,400

Taxes (25%)                 $1,350
Net Income                  $4,050
\`\`\`

### 2. Balance Sheet

**Purpose:** Shows assets, liabilities, and equity at a point in time
**Formula:** Assets = Liabilities + Equity

**Assets (What You Own):**
- **Current Assets:** Cash, accounts receivable, inventory
- **Fixed Assets:** Equipment, software, intellectual property

**Liabilities (What You Owe):**
- **Current Liabilities:** Accounts payable, accrued expenses
- **Long-term Liabilities:** Loans, mortgages

**Equity (Owner's Interest):**
- **Owner's Equity:** Initial investment + retained earnings

### 3. Cash Flow Statement

**Purpose:** Tracks actual cash movement in three categories

**Operating Cash Flow:**
- Cash from core business operations
- Collections from customers
- Payments to suppliers

**Investing Cash Flow:**
- Equipment purchases
- Software investments
- Business acquisitions

**Financing Cash Flow:**
- Loans and credit lines
- Owner investments
- Dividend payments

### Financial Statement Relationships

The statements are interconnected:
1. **Net Income** from Income Statement flows to Balance Sheet equity
2. **Cash** from Cash Flow Statement appears on Balance Sheet
3. **Depreciation** affects all three statements

### Reading Financial Statements

**Income Statement Analysis:**
- Gross margin trends (should be consistent or improving)
- Operating expense ratios (should decrease as % of revenue)
- Net margin (target 10-20% for healthy businesses)

**Balance Sheet Analysis:**
- Current ratio: Current Assets / Current Liabilities (target > 1.5)
- Debt-to-equity ratio (lower is generally better)
- Cash position (3-6 months operating expenses)

**Cash Flow Analysis:**
- Operating cash flow should be positive
- Free cash flow: Operating CF - Capital Expenditures
- Cash runway: Current Cash / Monthly Burn Rate

### Key Ratios for Developers

**Profitability Ratios:**
- Gross Margin %: (Revenue - COGS) / Revenue
- Net Margin %: Net Income / Revenue
- Return on Assets: Net Income / Total Assets

**Liquidity Ratios:**
- Current Ratio: Current Assets / Current Liabilities
- Quick Ratio: (Current Assets - Inventory) / Current Liabilities

**Efficiency Ratios:**
- Asset Turnover: Revenue / Total Assets
- Days Sales Outstanding: (Accounts Receivable / Revenue) × 365

### Common Mistakes

1. **Confusing Cash and Profit:** Accrual vs cash basis
2. **Ignoring Depreciation:** Not accounting for asset decline
3. **Missing Accounts Receivable:** Money owed but not collected
4. **Improper Expense Classification:** COGS vs operating expenses

### Tools for Financial Statements

**Accounting Software:**
- QuickBooks Online: $30-180/month
- Xero: $13-70/month
- Wave: Free for basic features
- FreshBooks: $17-55/month

**Key Takeaways:**
- Financial statements tell your business story
- They're required for taxes, loans, and investors
- Regular review helps identify trends and problems
- Use them for decision-making, not just compliance`,

          orderIndex: 1,
          lessonType: 'lecture', 
          durationMinutes: 90,
        },
        {
          weekId: week3.id,
          title: 'Bookkeeping Fundamentals',
          slug: 'bookkeeping-fundamentals',
          content: `# Bookkeeping Fundamentals

## Double-Entry Bookkeeping System

Every business transaction affects at least two accounts, ensuring the accounting equation stays balanced: Assets = Liabilities + Equity

### Basic Accounting Equation

**Assets = Liabilities + Owner's Equity**

- **Assets:** Resources owned by the business
- **Liabilities:** Debts owed to others
- **Equity:** Owner's interest in the business

### The Five Account Types

**1. Assets** (Normal Balance: Debit)
- Cash and bank accounts
- Accounts receivable
- Equipment and software
- Increase with debits, decrease with credits

**2. Liabilities** (Normal Balance: Credit)  
- Accounts payable
- Credit cards
- Loans and mortgages
- Increase with credits, decrease with debits

**3. Equity** (Normal Balance: Credit)
- Owner's investment
- Retained earnings
- Increase with credits, decrease with debits

**4. Revenue** (Normal Balance: Credit)
- Sales and service income
- Interest earned
- Increase with credits, decrease with debits

**5. Expenses** (Normal Balance: Debit)
- Operating costs
- Cost of goods sold
- Increase with debits, decrease with credits

### Chart of Accounts Setup

**Assets (1000-1999)**
- 1000 - Checking Account
- 1010 - Savings Account
- 1100 - Accounts Receivable
- 1200 - Equipment
- 1250 - Software & Licenses

**Liabilities (2000-2999)**
- 2000 - Accounts Payable
- 2100 - Credit Card
- 2200 - Business Loan

**Equity (3000-3999)**
- 3000 - Owner's Equity
- 3900 - Retained Earnings

**Revenue (4000-4999)**
- 4000 - Service Revenue
- 4100 - Product Sales
- 4200 - Subscription Revenue

**Expenses (5000-5999)**
- 5000 - Office Expenses
- 5100 - Marketing
- 5200 - Software Subscriptions
- 5300 - Professional Services
- 5400 - Travel & Entertainment

### Recording Transactions

**Example 1: Receive payment for services**
- Debit: Cash $5,000
- Credit: Service Revenue $5,000

**Example 2: Pay for hosting**
- Debit: Hosting Expense $100
- Credit: Cash $100

**Example 3: Purchase equipment**
- Debit: Equipment $2,000
- Credit: Cash $2,000

### Bookkeeping Cycle

**1. Record Transactions**
- Journal entries for all business activities
- Supporting documentation (receipts, invoices)

**2. Post to Ledger**
- Transfer journal entries to account ledgers
- Maintain running balances

**3. Trial Balance**
- List all accounts with balances
- Verify debits equal credits

**4. Adjusting Entries**
- Accruals and deferrals
- Depreciation and amortization

**5. Financial Statements**
- Generate Income Statement
- Create Balance Sheet
- Prepare Cash Flow Statement

### Best Practices for Developers

**1. Separate Business and Personal**
- Dedicated business bank account
- Business credit card only for business
- Clear documentation for mixed-use expenses

**2. Record Keeping**
- Save all receipts and invoices
- Use cloud storage for documents
- Take photos of paper receipts immediately

**3. Regular Reconciliation**
- Monthly bank reconciliation
- Credit card reconciliation
- Verify all transactions recorded

**4. Automation Where Possible**
- Bank feeds for automatic transaction import
- Recurring entries for subscriptions
- Invoice automation for customers

### Common Developer Transactions

**Service Revenue:**
- Debit: Cash/Accounts Receivable
- Credit: Service Revenue

**Software Subscriptions:**
- Debit: Software Expense
- Credit: Cash/Credit Card

**Equipment Purchase:**
- Debit: Equipment (Asset)
- Credit: Cash

**Client Deposit:**
- Debit: Cash
- Credit: Customer Deposits (Liability)

### Monthly Bookkeeping Checklist

**Week 1:**
□ Record all transactions from previous month
□ Reconcile bank accounts
□ Reconcile credit cards

**Week 2:**
□ Follow up on outstanding invoices
□ Record any adjusting entries
□ Review expense categories

**Week 3:**
□ Generate financial statements
□ Analyze key metrics
□ Plan for upcoming expenses

**Week 4:**
□ Tax planning and preparation
□ Backup accounting data
□ Review and improve processes

### Tools and Software

**Cloud Accounting:**
- QuickBooks Online: Most comprehensive
- Xero: Great for small businesses
- Wave: Free option with limitations
- FreshBooks: Good for service businesses

**Receipt Management:**
- Shoeboxed: Receipt scanning service
- Receipt Bank: Automated data extraction
- Expensify: Expense management
- Built-in phone camera apps

### Key Takeaways

- Double-entry bookkeeping ensures accuracy
- Consistent recording is more important than perfection
- Automation reduces errors and saves time
- Regular reconciliation catches problems early
- Professional help may be worth the investment`,

          orderIndex: 2,
          lessonType: 'lecture',
          durationMinutes: 85,
        }
      ]
    })

    console.log('✅ Weeks 2-3 created successfully!')
    console.log('📊 Created comprehensive lesson content for business fundamentals and accounting')

  } catch (error) {
    console.error('❌ Error completing curriculum:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

completeCurriculum().catch(console.error)