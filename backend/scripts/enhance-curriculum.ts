import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const weekData = [
  {
    number: 2,
    title: 'Business Models & Revenue Streams',
    overview: 'Understanding different business models available to developers and how to choose the right revenue streams.',
    learningObjectives: [
      'Understand different business models for developers',
      'Learn about subscription vs one-time revenue',
      'Explore marketplace and affiliate models',
      'Analyze pricing strategies',
      'Understand unit economics'
    ],
    lessons: [
      {
        title: 'Business Models for Developers',
        slug: 'business-models-overview',
        content: `# Business Models for Developers

## Overview of Developer Business Models

As a developer, you have several distinct advantages when choosing a business model. Your technical skills open doors that others can't access, but success requires understanding which model fits your goals and resources.

### 1. Freelancing/Consulting Model

**Characteristics:**
- Direct time-for-money exchange
- Typically project-based or hourly billing
- High control over work and clients

**Pros:**
- Quick to start
- Predictable income once established
- High hourly rates possible
- Direct client relationships

**Cons:**
- Limited scalability
- Income stops when you stop working
- Difficulty taking vacations
- Constant client acquisition needed

**Unit Economics:**
- Revenue = Hours × Rate
- Gross margin: 90-95% (minimal COGS)
- Net margin varies widely based on overhead

### 2. Agency/Development Shop

**Characteristics:**
- Team-based service delivery
- Focus on higher-value, longer-term projects
- Mix of strategy and execution

**Pros:**
- Higher project values
- More strategic relationships
- Team can work while you're not
- Recurring client relationships

**Cons:**
- Team management complexity
- Higher overhead costs
- Difficult to maintain quality at scale
- Still largely time-based revenue

**Unit Economics:**
- Revenue = (Team Hours × Blended Rate) - Team Costs
- Gross margin: 40-60%
- Net margin: 10-25%

### 3. Digital Products/SaaS

**Characteristics:**
- Build once, sell many times
- Recurring revenue potential
- Global market reach

**Pros:**
- Highly scalable
- Passive income potential
- High gross margins
- 24/7 revenue generation

**Cons:**
- High upfront investment
- Marketing challenges
- Support and maintenance ongoing
- Competitive markets

**Unit Economics:**
- Revenue = Subscribers × Average Revenue Per User (ARPU)
- Gross margin: 85-95%
- Net margin varies based on scale

### 4. Courses/Education

**Characteristics:**
- Knowledge productization
- One-to-many teaching model
- Community building opportunities

**Pros:**
- Leverage your expertise
- Recurring cohort income
- Personal branding benefits
- Help others succeed

**Cons:**
- Content creation intensive
- Marketing required
- Support and community management
- Regular content updates needed

### 5. Marketplace/Platform

**Characteristics:**
- Connect buyers and sellers
- Take percentage of transactions
- Network effects drive value

**Pros:**
- Revenue scales with usage
- High switching costs
- Network effects create moat
- Multiple revenue streams possible

**Cons:**
- Chicken-and-egg problem
- High development complexity
- Regulatory considerations
- Long time to profitability

### Choosing the Right Model

Consider these factors:
1. **Time to Revenue**: How quickly do you need income?
2. **Scalability Goals**: Do you want passive income?
3. **Risk Tolerance**: How much uncertainty can you handle?
4. **Capital Requirements**: How much can you invest upfront?
5. **Skills and Interests**: What energizes you?

### Hybrid Approaches

Many successful developer entrepreneurs combine models:
- Consulting → Product (fund development with services)
- Course → Community → SaaS
- Open Source → Consulting → Enterprise product

### Action Items

1. Assess your current model's pros/cons
2. Calculate your unit economics
3. Identify which model aligns with your 5-year vision
4. Plan a transition strategy if needed`,
        orderIndex: 1,
        durationMinutes: 60
      },
      {
        title: 'Revenue Streams and Pricing Strategies',
        slug: 'revenue-streams-pricing',
        content: `# Revenue Streams and Pricing Strategies

## Understanding Revenue Streams

Revenue streams are the various sources from which a business earns money. As a developer, you have unique opportunities to create multiple streams and optimize pricing.

### Primary Revenue Stream Types

**1. One-time Sales**
- Project fees
- Product purchases
- Setup/implementation fees

*Best for:* High-touch services, premium products
*Pros:* Immediate cash flow, simpler to understand
*Cons:* Revenue cliffs, constant sales pressure

**2. Recurring Revenue**
- Subscriptions (SaaS)
- Maintenance contracts
- Membership fees

*Best for:* Ongoing services, software products
*Pros:* Predictable income, higher valuations
*Cons:* Customer retention critical, slower growth

**3. Usage-based Revenue**
- API calls
- Storage/bandwidth
- Transaction fees

*Best for:* Infrastructure services, marketplaces
*Pros:* Scales with customer success
*Cons:* Unpredictable, requires monitoring

**4. Commission-based Revenue**
- Affiliate marketing
- Marketplace transactions
- Referral fees

*Best for:* Platforms, recommendation engines
*Pros:* No upfront customer cost
*Cons:* Lower margins, dependency on partners

### Pricing Psychology and Strategies

**Value-Based Pricing**
Price based on value delivered, not cost

Example: Save client $100K/year with automation
→ Price at $30K (30% of value)

**Competitive Pricing**
Price relative to market alternatives

Research: What do competitors charge?
Position: Premium, parity, or discount?

**Cost-Plus Pricing**
Price based on costs + desired margin

Less effective but useful for baseline
Costs + (Costs × Markup %) = Price

**Psychological Pricing Tactics**

*Anchoring:* Show expensive option first
*Decoy Effect:* Add option that makes target look good
*Charm Pricing:* $99 vs $100 (less effective B2B)
*Bundle Pricing:* Package related services

### SaaS Pricing Models

**Per User Pricing**
- $10/user/month
- Simple to understand
- Scales with team size
- May discourage adoption

**Feature-Based Tiers**
- Basic/Pro/Enterprise
- Clear value progression
- Allows for upselling
- Can be complex

**Usage-Based Pricing**
- Pay for what you use
- Aligns cost with value
- Can be unpredictable
- Requires good tracking

### Consulting/Service Pricing

**Hourly Rates**
- Easy to track and bill
- Predictable for small projects
- Caps earning potential
- Commoditizes your time

**Project-Based Pricing**
- Better for larger projects
- Allows for efficiency gains
- Risk if scope creeps
- Requires good estimation

**Value-Based Pricing**
- Price on outcomes
- Highest profit potential
- Harder to justify
- Requires deep client understanding

**Retainer Model**
- Guaranteed monthly income
- Smooths cash flow
- May include unused hours
- Limits project flexibility

### Pricing Research Methods

**1. Competitor Analysis**
- Direct competitors
- Indirect alternatives
- Industry standards
- Value proposition gaps

**2. Customer Research**
- Price sensitivity surveys
- A/B testing
- Customer interviews
- Willingness to pay studies

**3. Economic Value Modeling**
- Calculate customer ROI
- Identify cost savings
- Measure productivity gains
- Assess risk reduction

### Common Pricing Mistakes

1. **Pricing too low** (most common for developers)
2. **Not testing prices** (set and forget)
3. **Ignoring value perception** (focusing on features)
4. **One-size-fits-all** (no segments)
5. **Not raising prices** (inflation adjustment)

### Price Optimization Process

1. **Research** market and customers
2. **Test** different price points
3. **Measure** conversion and retention
4. **Adjust** based on data
5. **Repeat** regularly

### Action Items

1. Calculate your current price per hour of value
2. Research competitor pricing
3. Survey existing customers about price sensitivity
4. Test one pricing change this month
5. Set calendar reminder to review pricing quarterly`,
        orderIndex: 2,
        durationMinutes: 45
      }
    ]
  },
  {
    number: 3,
    title: 'Financial Statements and Bookkeeping',
    overview: 'Understanding how to read and create financial statements, and establishing proper bookkeeping practices.',
    learningObjectives: [
      'Understand the three core financial statements',
      'Learn basic bookkeeping principles',
      'Set up a chart of accounts',
      'Understand accrual vs cash accounting',
      'Learn to track business metrics'
    ],
    lessons: [
      {
        title: 'Understanding Financial Statements',
        slug: 'financial-statements-basics',
        content: `# Understanding Financial Statements

Financial statements are the scorecards of your business. As a developer-entrepreneur, you must understand these documents to make informed decisions and communicate with investors, lenders, and partners.

## The Three Core Financial Statements

### 1. Profit & Loss Statement (P&L / Income Statement)

Shows your business performance over a period (monthly, quarterly, annually).

**Structure:**
\`\`\`
Revenue
- Cost of Goods Sold (COGS)
= Gross Profit
- Operating Expenses
= Operating Income (EBITDA)
- Interest, Taxes, Depreciation, Amortization
= Net Income
\`\`\`

**For Developer Businesses:**
- Revenue: Project fees, subscriptions, licenses
- COGS: Direct costs (hosting, third-party APIs, subcontractors)
- Operating Expenses: Salaries, rent, marketing, software licenses
- Net Income: What you actually keep

**Key Metrics:**
- Gross Margin: (Revenue - COGS) / Revenue
- Operating Margin: Operating Income / Revenue
- Net Margin: Net Income / Revenue

### 2. Balance Sheet

Shows what you own, owe, and your ownership stake at a specific point in time.

**Structure:**
\`\`\`
Assets = Liabilities + Equity
\`\`\`

**Assets (What you own):**
- Current Assets: Cash, accounts receivable, inventory
- Fixed Assets: Equipment, software, intellectual property

**Liabilities (What you owe):**
- Current Liabilities: Accounts payable, short-term debt
- Long-term Liabilities: Loans, mortgages

**Equity (Your ownership):**
- Initial investment plus retained earnings

**For Developers:**
- Assets: Cash, computers, software licenses, outstanding invoices
- Liabilities: Credit cards, equipment loans, unpaid bills
- Equity: Your investment plus profits retained in business

### 3. Cash Flow Statement

Shows how cash moved in and out of your business over a period.

**Three Sections:**

**Operating Cash Flow:**
- Cash from core business operations
- Most important for sustainability

**Investing Cash Flow:**
- Cash spent on/received from investments
- Equipment purchases, selling assets

**Financing Cash Flow:**
- Cash from/to owners and lenders
- Loans, equity investments, dividends

**Why Cash Flow Matters:**
- You can be profitable but cash-poor
- Many businesses fail due to cash flow, not profitability
- Timing differences between earning and collecting revenue

## Reading Financial Statements

### Red Flags to Watch For

**P&L Statement:**
- Declining gross margins (increasing costs)
- Growing expenses faster than revenue
- Irregular or lumpy revenue patterns

**Balance Sheet:**
- High accounts receivable (collection issues)
- Growing accounts payable (cash flow problems)
- Too much or too little cash

**Cash Flow:**
- Negative operating cash flow
- Heavy dependence on financing
- Large gaps between profit and cash generation

### Key Financial Ratios

**Profitability Ratios:**
- Gross Margin: Measures pricing power and cost control
- Net Margin: Overall profitability
- Return on Assets: Efficiency of asset usage

**Liquidity Ratios:**
- Current Ratio: Current Assets / Current Liabilities
- Quick Ratio: (Current Assets - Inventory) / Current Liabilities
- Cash Ratio: Cash / Current Liabilities

**Efficiency Ratios:**
- Days Sales Outstanding: How quickly you collect revenue
- Inventory Turnover: How efficiently you use inventory
- Asset Turnover: Revenue generation per asset dollar

## Creating Your First Financial Statements

### Monthly P&L Template for Developers

\`\`\`
REVENUE
  Project Revenue: $X,XXX
  Recurring Revenue: $X,XXX
  Other Income: $XXX
Total Revenue: $X,XXX

COST OF GOODS SOLD
  Hosting/Infrastructure: $XXX
  Third-party APIs: $XXX
  Subcontractors: $X,XXX
Total COGS: $X,XXX

GROSS PROFIT: $X,XXX
Gross Margin: X%

OPERATING EXPENSES
  Marketing: $XXX
  Software/Tools: $XXX
  Professional Services: $XXX
  Travel: $XXX
  Equipment: $XXX
  Office/Coworking: $XXX
Total OpEx: $X,XXX

OPERATING INCOME: $X,XXX

OTHER EXPENSES
  Interest: $XXX
  Taxes: $XXX
Total Other: $XXX

NET INCOME: $X,XXX
Net Margin: X%
\`\`\`

### Simple Balance Sheet for Solo Developers

\`\`\`
ASSETS
Current Assets:
  Checking Account: $X,XXX
  Savings Account: $X,XXX
  Accounts Receivable: $X,XXX
Total Current: $X,XXX

Fixed Assets:
  Computer Equipment: $X,XXX
  Software (net): $XXX
Total Fixed: $X,XXX

TOTAL ASSETS: $X,XXX

LIABILITIES
Current Liabilities:
  Credit Cards: $X,XXX
  Accounts Payable: $XXX
Total Current: $X,XXX

Long-term Liabilities:
  Equipment Loans: $X,XXX
Total Long-term: $X,XXX

TOTAL LIABILITIES: $X,XXX

EQUITY: $X,XXX
TOTAL LIAB + EQUITY: $X,XXX
\`\`\`

## Tools and Software

**For Beginners:**
- QuickBooks Online
- FreshBooks
- Wave (free)
- Excel/Google Sheets

**For Growth:**
- NetSuite
- Sage Intacct
- QuickBooks Enterprise
- Custom solutions

### Action Items

1. Create a simple P&L for your last month of business
2. List all your assets and liabilities
3. Set up monthly financial statement preparation
4. Choose accounting software that fits your needs
5. Establish monthly review meetings with yourself or advisor`,
        orderIndex: 1,
        durationMinutes: 50
      },
      {
        title: 'Bookkeeping Fundamentals and Chart of Accounts',
        slug: 'bookkeeping-fundamentals',
        content: `# Bookkeeping Fundamentals and Chart of Accounts

Good bookkeeping is the foundation of financial management. As a developer, you need systems that are both accurate and efficient, allowing you to focus on your core business while maintaining financial clarity.

## Double-Entry Bookkeeping Basics

### The Fundamental Equation
\`\`\`
Assets = Liabilities + Equity
\`\`\`

Every transaction affects at least two accounts, and the equation must always balance.

### Account Types and Normal Balances

**Assets (Things you own):**
- Normal balance: Debit
- Increases with debits, decreases with credits
- Examples: Cash, equipment, accounts receivable

**Liabilities (Things you owe):**
- Normal balance: Credit
- Increases with credits, decreases with debits
- Examples: Loans, credit cards, accounts payable

**Equity (Your ownership):**
- Normal balance: Credit
- Increases with credits, decreases with debits
- Examples: Owner's investment, retained earnings

**Revenue (Money coming in):**
- Normal balance: Credit
- Increases equity through credits
- Examples: Sales, service fees, interest income

**Expenses (Money going out):**
- Normal balance: Debit
- Decreases equity through debits
- Examples: Rent, utilities, salaries, marketing

### Transaction Examples

**Example 1: Client pays $5,000 invoice**
- Cash (Asset) increases by $5,000 → Debit
- Accounts Receivable (Asset) decreases by $5,000 → Credit

**Example 2: Pay $1,200 for annual software license**
- Software Expense increases by $1,200 → Debit
- Cash (Asset) decreases by $1,200 → Credit

**Example 3: Buy $2,000 computer with credit card**
- Computer Equipment (Asset) increases by $2,000 → Debit
- Credit Card (Liability) increases by $2,000 → Credit

## Chart of Accounts for Developers

Your chart of accounts is the foundation of your bookkeeping system. It should be detailed enough to provide useful information but simple enough to maintain.

### Recommended Account Structure

**ASSETS (1000-1999)**

*Current Assets (1000-1099):*
- 1010: Checking Account
- 1020: Savings Account
- 1030: PayPal
- 1040: Stripe
- 1050: Accounts Receivable
- 1060: Prepaid Expenses

*Fixed Assets (1100-1199):*
- 1110: Computer Equipment
- 1120: Software (net of amortization)
- 1130: Office Furniture
- 1140: Accumulated Depreciation

**LIABILITIES (2000-2999)**

*Current Liabilities (2000-2099):*
- 2010: Accounts Payable
- 2020: Credit Cards
- 2030: Accrued Expenses
- 2040: Short-term Loans

*Long-term Liabilities (2100-2199):*
- 2110: Equipment Loans
- 2120: Line of Credit

**EQUITY (3000-3999)**
- 3010: Owner's Investment
- 3020: Retained Earnings
- 3030: Owner's Draw/Distributions

**REVENUE (4000-4999)**
- 4010: Development Services
- 4020: Consulting Revenue
- 4030: SaaS Subscriptions
- 4040: Course Sales
- 4050: Affiliate Income
- 4060: Interest Income

**EXPENSES (5000-9999)**

*Cost of Goods Sold (5000-5999):*
- 5010: Hosting/Infrastructure
- 5020: Third-party APIs
- 5030: Payment Processing Fees
- 5040: Subcontractors

*Operating Expenses (6000-8999):*

*Marketing & Sales (6000-6099):*
- 6010: Advertising
- 6020: Content Marketing
- 6030: Conference/Events
- 6040: Sales Tools

*Technology (6100-6199):*
- 6110: Software Subscriptions
- 6120: Domain/Hosting (non-COGS)
- 6130: Equipment < $500
- 6140: Technology Training

*Professional Services (6200-6299):*
- 6210: Legal Fees
- 6220: Accounting/Bookkeeping
- 6230: Consulting
- 6240: Banking Fees

*Office & Administrative (6300-6399):*
- 6310: Rent/Coworking
- 6320: Utilities
- 6330: Insurance
- 6340: Office Supplies
- 6350: Telecommunications

*Travel & Entertainment (6400-6499):*
- 6410: Business Travel
- 6420: Meals & Entertainment
- 6430: Lodging
- 6440: Transportation

*Other Expenses (6500-6999):*
- 6510: Depreciation
- 6520: Interest Expense
- 6530: Tax Preparation
- 6540: Business Licenses

## Best Practices for Developer Bookkeeping

### 1. Separate Business and Personal

**Never mix business and personal expenses**
- Separate bank accounts
- Separate credit cards
- Clear documentation for any shared expenses

### 2. Track Everything in Real-Time

**Don't batch at month-end**
- Use mobile apps for receipt capture
- Connect bank accounts to accounting software
- Set up automatic rules for recurring transactions

### 3. Categorize Consistently

**Establish clear rules:**
- Hosting for client projects = COGS
- Hosting for your own products = Operating Expense
- Software used directly for client work = COGS
- General productivity software = Operating Expense

### 4. Document Transactions

**Keep supporting documentation:**
- Receipts and invoices
- Contracts and agreements
- Bank and credit card statements
- Explanatory notes for unusual transactions

## Common Bookkeeping Mistakes

### 1. Poor Categorization
- Everything goes to "Business Expenses"
- No distinction between COGS and OpEx
- Personal items mixed with business

### 2. Timing Issues
- Not recording transactions when they occur
- Mixing cash and accrual methods
- Not adjusting for prepaid expenses

### 3. Missing Transactions
- Skipping small expenses
- Not recording owner contributions
- Forgetting about automatic payments

### 4. No Reconciliation
- Not matching bank statements
- Ignoring discrepancies
- No regular review process

## Monthly Bookkeeping Checklist

### Week 1:
- [ ] Enter all transactions from previous month
- [ ] Categorize uncategorized items
- [ ] Upload receipts and supporting documents

### Week 2:
- [ ] Reconcile all bank accounts
- [ ] Reconcile credit card accounts
- [ ] Review accounts receivable aging

### Week 3:
- [ ] Generate and review financial statements
- [ ] Identify and investigate any anomalies
- [ ] Update cash flow projections

### Week 4:
- [ ] File receipts and documents
- [ ] Backup accounting data
- [ ] Prepare for tax obligations

## Automation Tools and Tips

### Bank Feeds
- Connect all accounts to your accounting software
- Set up automatic categorization rules
- Review and approve transactions weekly

### Receipt Capture
- Use apps like Receipt Bank, Shoeboxed, or built-in features
- Photograph receipts immediately
- Include context notes for complex transactions

### Recurring Transactions
- Set up automatic entries for predictable items
- Review monthly for accuracy
- Update when pricing changes

### Reporting Automation
- Schedule monthly financial statement generation
- Set up key metric dashboards
- Create alerts for unusual transactions

### Action Items

1. Set up your chart of accounts in your chosen software
2. Create rules for categorizing common transactions
3. Establish a weekly bookkeeping routine
4. Connect bank accounts and set up automatic feeds
5. Create a monthly financial review process`,
        orderIndex: 2,
        durationMinutes: 55
      }
    ]
  },
  {
    number: 4,
    title: 'Cash Flow Management',
    overview: 'Master the art of cash flow forecasting, management, and optimization for sustainable business growth.',
    learningObjectives: [
      'Understand cash flow vs profit',
      'Create cash flow forecasts',
      'Manage accounts receivable and payable',
      'Build cash reserves and working capital',
      'Handle seasonal variations and growth funding'
    ],
    lessons: [
      {
        title: 'Cash Flow Fundamentals',
        slug: 'cash-flow-fundamentals',
        content: `# Cash Flow Fundamentals

Cash flow is the lifeblood of any business. You can be profitable on paper but still go out of business if you can't pay your bills. Understanding and managing cash flow is critical for developer-entrepreneurs.

## Cash vs. Profit: The Critical Difference

### Profit (Accounting)
- Revenue minus expenses over a period
- Based on when revenue is earned and expenses incurred
- Can include non-cash items (depreciation, accrued expenses)

### Cash Flow (Reality)
- Actual money moving in and out
- Based on when money is received and paid
- Only includes actual cash transactions

### Example: The Profitable but Cash-Poor Business

**Scenario:** You complete a $50,000 project in December
- P&L shows $50,000 revenue in December
- You incurred $10,000 in expenses (paid immediately)
- Accounting profit: $40,000

**But if the client pays net-60 terms:**
- You won't receive cash until February
- December cash flow: -$10,000 (only expenses paid)
- You need working capital to bridge the gap

## The Three Types of Cash Flow

### 1. Operating Cash Flow
**Money from core business activities**

*Positive Contributors:*
- Customer payments
- Service revenue
- Product sales

*Negative Contributors:*
- Supplier payments
- Payroll
- Rent and utilities
- Marketing expenses

**For Developers:**
- Project payments from clients
- SaaS subscription collections
- Hosting and API costs
- Software subscriptions
- Marketing spend

### 2. Investing Cash Flow
**Money spent on/received from investments**

*Outflows:*
- Equipment purchases
- Software development tools
- Business acquisitions
- Office setup

*Inflows:*
- Selling equipment
- Investment returns
- Asset disposals

**For Developers:**
- Computer and equipment purchases
- Major software licenses
- Course creation investments
- Product development costs

### 3. Financing Cash Flow
**Money from/to owners and lenders**

*Inflows:*
- Owner investments
- Loan proceeds
- Investor funding
- Line of credit draws

*Outflows:*
- Loan payments
- Owner withdrawals/salaries
- Investor returns
- Interest payments

**For Developers:**
- Initial business investment
- Equipment financing
- Revenue-based financing
- Owner salary/draws

## Cash Flow Timing Challenges

### Common Developer Cash Flow Gaps

**1. Project-Based Work**
- Large gaps between projects
- Clients with long payment terms
- Scope creep without additional payment
- Seasonal client budget cycles

**2. SaaS Business**
- High upfront development costs
- Monthly revenue with annual expenses
- Customer churn affecting predictable revenue
- Growth requiring increased infrastructure spend

**3. Product Development**
- Long development cycles with no revenue
- Marketing costs before product launch
- Inventory costs for physical products
- Platform fees and payment processing delays

### Managing Timing Mismatches

**1. Payment Terms Optimization**
- Require deposits or milestone payments
- Offer discounts for faster payment
- Use payment terms that match your cash needs
- Factor or finance receivables when necessary

**2. Expense Timing Control**
- Negotiate favorable payment terms with vendors
- Use credit cards strategically for 30-day float
- Time large purchases with cash inflows
- Consider leasing vs. purchasing equipment

**3. Revenue Smoothing**
- Develop recurring revenue streams
- Offer retainer arrangements
- Create subscription versions of services
- Build a pipeline of overlapping projects

## Building Cash Reserves

### How Much Cash to Keep

**Minimum Reserve:** 3-6 months of operating expenses

**Growth Reserve:** Additional 3-6 months for:
- Opportunity investments
- Market downturns
- Unexpected expenses
- Revenue shortfalls

**Calculate Your Number:**

Monthly Operating Expenses:
- Rent/coworking: $X,XXX
- Utilities/internet: $XXX
- Software subscriptions: $XXX
- Insurance: $XXX
- Marketing: $XXX
- Professional services: $XXX
- Personal salary/draw: $X,XXX

Total Monthly OpEx: $X,XXX
Minimum Reserve (6x): $X,XXX

### Where to Keep Cash Reserves

**Operating Account (1-2 months):**
- High liquidity
- Easy access for daily operations
- Low/no return acceptable

**High-Yield Savings (3-4 months):**
- FDIC insured
- Better interest rates
- Same-day or next-day access
- Examples: Marcus, Ally, Capital One 360

**Short-term CDs/Money Market (2+ months):**
- Slightly higher returns
- 3-12 month terms
- Acceptable for excess reserves
- Consider laddering for liquidity

**Don't Use for Reserves:**
- Stocks or volatile investments
- Crypto or speculative assets
- Long-term CDs
- Illiquid investments

## Working Capital Management

### Understanding Working Capital

**Working Capital = Current Assets - Current Liabilities**

*Current Assets:*
- Cash
- Accounts receivable
- Inventory (if applicable)
- Prepaid expenses

*Current Liabilities:*
- Accounts payable
- Accrued expenses
- Short-term debt
- Credit card balances

### Optimizing Working Capital

**1. Accelerate Receivables**
- Invoice immediately upon completion
- Offer early payment discounts
- Use electronic invoicing
- Follow up on overdue accounts
- Consider factoring for large amounts

**2. Optimize Payables**
- Take advantage of vendor payment terms
- Don't pay early unless there's a discount
- Use business credit cards for 30-day float
- Negotiate better terms with key suppliers

**3. Minimize Inventory**
- Just-in-time purchasing
- Vendor drop-shipping
- Digital product focus
- Subscription models vs. one-time purchases

### Working Capital Ratios

**Current Ratio:** Current Assets ÷ Current Liabilities
- Good: 1.5-3.0
- Below 1.0: Potential liquidity problems
- Above 3.0: May indicate inefficient cash use

**Quick Ratio:** (Current Assets - Inventory) ÷ Current Liabilities
- Good: 1.0-2.0
- More conservative than current ratio
- Better for service businesses

**Cash Ratio:** Cash ÷ Current Liabilities
- Good: 0.5-1.0
- Most conservative liquidity measure
- Important during uncertain times

## Common Cash Flow Problems and Solutions

### Problem 1: Feast or Famine Cycles

**Symptoms:**
- Irregular income patterns
- High stress during low-revenue periods
- Difficulty planning and budgeting

**Solutions:**
- Build recurring revenue streams
- Maintain larger cash reserves
- Develop multiple income sources
- Create predictable project pipelines

### Problem 2: Growing but Cash-Strapped

**Symptoms:**
- Revenue growing but cash declining
- Difficulty funding growth
- Delayed payments to suppliers

**Solutions:**
- Improve payment terms and collection
- Consider revenue-based financing
- Slow growth to match cash generation
- Raise equity or debt capital

### Problem 3: Seasonal Revenue Patterns

**Symptoms:**
- Predictable busy and slow seasons
- Cash shortfalls during slow periods
- Inability to invest in growth during peak times

**Solutions:**
- Build reserves during peak periods
- Develop counter-seasonal revenue streams
- Use seasonal credit lines
- Plan expenses around revenue cycles

### Action Items

1. Calculate your monthly operating expenses
2. Determine your minimum cash reserve target
3. Analyze your current working capital position
4. Identify your biggest cash flow timing challenges
5. Create an action plan to address the top 2 issues`,
        orderIndex: 1,
        durationMinutes: 45
      },
      {
        title: 'Cash Flow Forecasting and Management',
        slug: 'cash-flow-forecasting',
        content: `# Cash Flow Forecasting and Management

Accurate cash flow forecasting is your crystal ball for business success. It helps you anticipate problems, plan for opportunities, and sleep better at night knowing what's coming.

## Building Your First Cash Flow Forecast

### The 13-Week Rolling Forecast

**Why 13 weeks?**
- Quarterly visibility
- Weekly detail for near-term accuracy
- Rolling forward maintains constant horizon
- Balances detail with manageability

### Basic Forecast Structure

\`\`\`
                Week 1  Week 2  Week 3  ... Week 13
Beginning Cash    $X      $X      $X          $X
                  
INFLOWS
  Collections     $X      $X      $X          $X
  New Sales       $X      $X      $X          $X
  Other Income    $X      $X      $X          $X
Total Inflows     $X      $X      $X          $X

OUTFLOWS  
  Payroll         $X      $X      $X          $X
  Rent            $X      $X      $X          $X
  Marketing       $X      $X      $X          $X
  Suppliers       $X      $X      $X          $X
  Other Expenses  $X      $X      $X          $X
Total Outflows    $X      $X      $X          $X

Net Cash Flow     $X      $X      $X          $X
Ending Cash       $X      $X      $X          $X
\`\`\`

### Forecasting Methodology

**1. Start with Known Items**
- Existing contracts and invoices
- Recurring subscriptions
- Fixed monthly expenses
- Scheduled payments

**2. Add Probable Items**
- Pipeline deals with high probability
- Seasonal patterns from historical data
- Recurring client work
- Regular business development activities

**3. Include Possible Items**
- New prospect conversations
- Seasonal upswings
- One-time opportunities
- Variable expenses based on activity

### Developer-Specific Forecasting Considerations

**Revenue Forecasting:**

*Project-Based Work:*
- Weight pipeline by probability (10%, 25%, 50%, 75%, 90%)
- Consider typical sales cycle length
- Account for scope changes and delays
- Include milestone payment schedules

*SaaS Revenue:*
- Start with existing monthly recurring revenue (MRR)
- Apply churn rate (monthly cancellations)
- Add new customer acquisition projections
- Include expansion revenue from existing customers

*Course/Product Sales:*
- Consider launch dates and marketing campaigns
- Account for seasonal patterns
- Include affiliate and partner channel timing
- Factor in conversion rates from lead generation

**Expense Forecasting:**

*Variable Costs:*
- Hosting costs that scale with usage
- Payment processing fees (% of revenue)
- Contractor costs tied to project volume
- Marketing spend that varies with activity

*Fixed Costs:*
- Software subscriptions
- Office rent or coworking
- Insurance payments
- Loan payments

*Seasonal/Periodic:*
- Annual software renewals
- Quarterly tax payments
- Conference and training costs
- Equipment replacement cycles

## Advanced Forecasting Techniques

### Scenario Planning

**Best Case (20% probability):**
- All pipeline deals close early
- Higher-than-expected pricing
- Lower churn than normal
- Unexpected opportunities arise

**Most Likely (60% probability):**
- Historical conversion rates
- Normal pricing and timing
- Expected churn and growth rates
- Standard business patterns

**Worst Case (20% probability):**
- Pipeline deals delayed or lost
- Price pressure from competition
- Higher than normal churn
- Unexpected expenses or economic downturn

### Rolling Forecast Process

**Weekly Updates:**
1. Compare actual vs. forecast for completed week
2. Analyze variances and understand causes
3. Update forecasts based on new information
4. Add new Week 13 and remove completed week
5. Identify any cash flow alerts or concerns

### Cash Flow KPIs to Track

**Collection Metrics:**
- Days Sales Outstanding (DSO)
- Collection rate by aging bucket
- Bad debt as % of revenue
- Average time to collect

**Payment Metrics:**
- Days Payable Outstanding (DPO)
- Early payment discounts captured
- Late payment penalties incurred
- Supplier payment terms utilization

**Cash Efficiency:**
- Cash conversion cycle
- Operating cash flow margin
- Free cash flow (operating cash flow - capex)
- Cash burn rate (for growing businesses)

## Cash Flow Management Tools

### Software Options

**For Solo Developers:**
- Float (dedicated cash flow forecasting)
- QuickBooks Cash Flow Planner
- Excel/Google Sheets templates
- Wave Money (free)

**For Growing Businesses:**
- Pulse (cash flow management)
- Dryrun (scenario planning)
- Fluidly (AI-powered forecasting)
- PlanGuru (comprehensive planning)

**Enterprise Solutions:**
- Adaptive Insights
- Workday Planning
- Oracle Planning & Budgeting
- Custom solutions

### Excel/Google Sheets Template

**Monthly Cash Flow Template:**
\`\`\`
BEGINNING CASH BALANCE: $X,XXX

CASH INFLOWS
  Accounts Receivable Collections:
    Current (0-30 days): $X,XXX
    Past Due (31-60 days): $X,XXX
    Past Due (61+ days): $X,XXX
  
  New Sales Cash:
    Project Payments: $X,XXX
    Subscription Revenue: $X,XXX
    Product Sales: $X,XXX
  
  Other Inflows:
    Interest Income: $XXX
    Asset Sales: $XXX
    Loan Proceeds: $X,XXX
  
TOTAL CASH INFLOWS: $X,XXX

CASH OUTFLOWS
  Operating Expenses:
    Payroll/Owner Draw: $X,XXX
    Rent/Office: $X,XXX
    Marketing: $X,XXX
    Software/Tools: $X,XXX
    Professional Services: $XXX
    Hosting/Infrastructure: $XXX
    Travel: $XXX
    Other OpEx: $XXX
  
  Capital Expenditures:
    Equipment: $XXX
    Software Development: $XXX
  
  Debt Service:
    Loan Payments: $XXX
    Interest Payments: $XXX
  
  Taxes and Fees:
    Income Taxes: $XXX
    Business Licenses: $XXX
  
TOTAL CASH OUTFLOWS: $X,XXX

NET CASH FLOW: $X,XXX
ENDING CASH BALANCE: $X,XXX

CASH POSITION ANALYSIS:
  Months of Expenses Covered: X.X
  Minimum Operating Balance: $X,XXX
  Excess/(Shortfall): $X,XXX
\`\`\`

## Managing Cash Flow Challenges

### When Cash Gets Tight

**Immediate Actions (0-30 days):**
1. Call all customers with outstanding invoices
2. Offer early payment discounts
3. Delay discretionary expenses
4. Use available credit lines
5. Consider factoring receivables

**Short-term Solutions (30-90 days):**
1. Negotiate extended payment terms with suppliers
2. Accelerate collection processes
3. Reduce inventory or prepaid expenses
4. Consider short-term financing
5. Implement more aggressive collection procedures

**Medium-term Strategies (90+ days):**
1. Restructure pricing and payment terms
2. Develop more predictable revenue streams
3. Improve operational efficiency
4. Consider strategic partnerships
5. Raise additional capital if needed

### Building Cash Flow Resilience

**Diversification Strategies:**
- Multiple revenue streams
- Different payment terms and cycles
- Various customer segments
- Geographic diversification
- Product/service mix optimization

**Operational Improvements:**
- Faster invoicing processes
- Electronic payment options
- Automated collection sequences
- Better project scoping and pricing
- Improved vendor relationships

**Financial Structure:**
- Adequate cash reserves
- Available credit facilities
- Diversified banking relationships
- Conservative debt levels
- Appropriate insurance coverage

## Action Items for Implementation

### Week 1: Assessment
- [ ] Gather 12 months of historical cash flow data
- [ ] Identify seasonal patterns and trends
- [ ] Calculate key cash flow metrics
- [ ] Assess current cash position vs. needs

### Week 2: Forecasting
- [ ] Create 13-week cash flow forecast
- [ ] Build best/most likely/worst case scenarios
- [ ] Identify potential cash flow gaps
- [ ] Determine financing needs or opportunities

### Week 3: Process Setup
- [ ] Choose forecasting tools and templates
- [ ] Establish weekly updating routine
- [ ] Create early warning indicators
- [ ] Set up regular review meetings

### Week 4: Optimization
- [ ] Implement improved collection processes
- [ ] Negotiate better payment terms where possible
- [ ] Establish credit lines before you need them
- [ ] Create cash flow management policies

### Ongoing Management
- [ ] Update forecast weekly
- [ ] Monitor key performance indicators
- [ ] Review and refine forecasting accuracy
- [ ] Adjust strategies based on results
- [ ] Plan for seasonal variations and growth needs

Remember: Cash flow forecasting is both an art and a science. Start simple, be consistent, and improve your accuracy over time. The goal isn't perfection—it's preparation and peace of mind.`,
        orderIndex: 2,
        durationMinutes: 60
      }
    ]
  },
  {
    number: 5,
    title: 'Taxation and Legal Structure',
    overview: 'Understanding business taxes, choosing the right legal structure, and maintaining compliance.',
    learningObjectives: [
      'Understand different business entity types',
      'Learn about tax implications for developers',
      'Understand self-employment taxes',
      'Learn about business deductions',
      'Understand international tax considerations'
    ],
    lessons: [
      {
        title: 'Business Entity Types and Tax Implications',
        slug: 'business-entities-taxes',
        content: `# Business Entity Types and Tax Implications

Choosing the right business structure is one of the most important decisions you'll make as a developer-entrepreneur. It affects your taxes, liability, and how you can raise capital.`,
        orderIndex: 1,
        durationMinutes: 45
      }
    ]
  }
]

async function enhanceCurriculum() {
  console.log('🚀 Enhancing curriculum with comprehensive lessons...')

  try {
    // Get the existing course
    const course = await prisma.course.findFirst({
      where: { slug: 'finacademy-for-developers' }
    })

    if (!course) {
      throw new Error('Course not found')
    }

    // Process each week
    for (const weekInfo of weekData) {
      console.log(`📚 Processing Week ${weekInfo.number}...`)

      // Find existing week
      const existingWeek = await prisma.week.findFirst({
        where: {
          courseId: course.id,
          weekNumber: weekInfo.number
        }
      })

      if (!existingWeek) {
        console.log(`❌ Week ${weekInfo.number} not found, skipping...`)
        continue
      }

      // Update week with better title and details
      await prisma.week.update({
        where: { id: existingWeek.id },
        data: {
          title: weekInfo.title,
          overview: weekInfo.overview,
          learningObjectives: JSON.stringify(weekInfo.learningObjectives)
        }
      })

      // Delete existing lessons for this week (to avoid duplicates)
      await prisma.lesson.deleteMany({
        where: { weekId: existingWeek.id }
      })

      // Add new lessons
      for (const lessonInfo of weekInfo.lessons) {
        await prisma.lesson.create({
          data: {
            weekId: existingWeek.id,
            title: lessonInfo.title,
            slug: lessonInfo.slug,
            content: lessonInfo.content,
            orderIndex: lessonInfo.orderIndex,
            lessonType: 'lecture',
            durationMinutes: lessonInfo.durationMinutes
          }
        })
        console.log(`  ✅ Added lesson: ${lessonInfo.title}`)
      }

      console.log(`✅ Completed Week ${weekInfo.number}: ${weekInfo.title}`)
    }

    console.log('🎉 Curriculum enhancement completed successfully!')
    
  } catch (error) {
    console.error('❌ Error enhancing curriculum:', error)
    throw error
  }
}

enhanceCurriculum()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })