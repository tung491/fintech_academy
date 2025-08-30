import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function completeCourse4() {
  try {
    console.log('🚀 Completing Course 4 with Weeks 4-5...');

    // Find Course 4
    const course4 = await prisma.course.findFirst({
      where: {
        slug: 'bookkeeping-fundamentals-tech'
      }
    });

    if (!course4) {
      throw new Error('Course 4 not found. Please create it first.');
    }

    console.log('✅ Found Course 4:', course4.title);

    // Check if weeks 4 and 5 already exist
    const existingWeeks = await prisma.week.findMany({
      where: {
        courseId: course4.id,
        weekNumber: {
          in: [4, 5]
        }
      }
    });

    if (existingWeeks.length > 0) {
      console.log('⚠️ Some weeks already exist. Deleting and recreating...');
      
      // Delete existing quizzes first
      await prisma.quiz.deleteMany({
        where: {
          week: {
            courseId: course4.id,
            weekNumber: {
              in: [4, 5]
            }
          }
        }
      });
      
      // Delete existing lessons
      await prisma.lesson.deleteMany({
        where: {
          week: {
            courseId: course4.id,
            weekNumber: {
              in: [4, 5]
            }
          }
        }
      });
      
      // Delete existing weeks
      await prisma.week.deleteMany({
        where: {
          courseId: course4.id,
          weekNumber: {
            in: [4, 5]
          }
        }
      });
    }

    // Week 4: Bank Reconciliation and Cash Flow Statements
    const week4 = await prisma.week.create({
      data: {
        courseId: course4.id,
        weekNumber: 4,
        title: 'Bank Reconciliation and Cash Flow Statements',
        overview: 'Master bank reconciliation procedures and cash flow statement preparation to maintain accurate financial records and monitor business liquidity.',
        learningObjectives: JSON.stringify([
          'Perform monthly bank reconciliation procedures',
          'Identify and resolve common reconciliation discrepancies',
          'Prepare cash flow statements for business analysis',
          'Monitor cash flow patterns and trends',
          'Implement cash management strategies for tech businesses'
        ]),
        estimatedHours: 8
      }
    });

    // Week 4 Lesson 1
    await prisma.lesson.create({
      data: {
        weekId: week4.id,
        title: 'Bank Reconciliation Fundamentals and Procedures',
        slug: 'bank-reconciliation-fundamentals',
        content: `# Bank Reconciliation Fundamentals and Procedures

## Understanding Bank Reconciliation

Bank reconciliation is the process of comparing your internal financial records with your bank statements to ensure accuracy and identify discrepancies. For tech businesses managing multiple revenue streams and payment processors, regular reconciliation is crucial for financial accuracy.

## Why Bank Reconciliation Matters

### Financial Accuracy
- Identifies recording errors in your books
- Catches bank errors (they do happen!)
- Ensures your cash balance is correct
- Prevents overdrafts and cash flow issues

### Business Intelligence
- Reveals spending patterns and trends
- Identifies unauthorized transactions quickly
- Helps with cash flow forecasting
- Provides accurate data for decision-making

### Compliance and Audit
- Required for accurate tax reporting
- Essential for investor due diligence
- Maintains clean audit trail
- Prevents fraud and embezzlement

## The Bank Reconciliation Process

### Step 1: Gather Your Documents
**Bank Statement Information:**
- Beginning balance from previous reconciliation
- All deposits and credits during the period
- All checks and debits during the period
- Bank fees, interest, and other charges
- Ending balance from bank statement

**Your Records:**
- Beginning cash balance in your books
- All recorded deposits and income
- All recorded checks and expenses
- Any pending transactions not yet recorded

### Step 2: Compare Deposits
**Match Each Deposit:**
- Compare bank statement deposits to your recorded income
- Identify any deposits in transit (recorded by you but not yet shown on bank statement)
- Note any direct deposits you may not have recorded
- Check for any bank deposits that don't match your records

**Common Discrepancies:**
- **Deposits in Transit**: You deposited on the last day of the month, but bank processed next month
- **Direct Payments**: Customer paid directly to bank (wire transfers, ACH)
- **Interest Income**: Bank credited interest you haven't recorded
- **Refunds**: Vendor refunds processed directly by bank

**Example:**
\`\`\`
Your Records Show:
- 3/28: Client Payment - $5,000
- 3/29: Stripe Deposit - $2,847  
- 3/30: Check Deposit - $1,500

Bank Statement Shows:
- 3/28: Deposit - $5,000 ✓
- 3/29: Stripe - $2,847 ✓
- 4/2: Check Deposit - $1,500 (Deposit in Transit)

Action: Add $1,500 to "Deposits in Transit" for reconciliation
\`\`\`

### Step 3: Compare Withdrawals and Checks
**Match Each Withdrawal:**
- Compare checks cleared by bank to your check register
- Verify electronic payments and withdrawals
- Account for automatic payments and transfers
- Check for any bank fees or charges

**Outstanding Checks:**
Checks you've written but bank hasn't processed yet.

\`\`\`
Outstanding Checks Example:
Check #1034 - Office Supplies - $245.67 (issued 3/30)
Check #1035 - Legal Fees - $1,200.00 (issued 3/31)
Check #1036 - Marketing - $500.00 (issued 3/31)

Total Outstanding: $1,945.67
\`\`\`

**Common Issues:**
- **Voided Checks**: Remove from outstanding check list
- **Stale Checks**: Checks over 6 months old, may need to be voided
- **Bank Fees**: Monthly fees, overdraft fees, wire fees not recorded
- **Automatic Payments**: Recurring payments you forgot to record

### Step 4: Account for Bank Fees and Charges
**Typical Bank Fees for Businesses:**
- Monthly maintenance fees
- Transaction fees (over limit charges)
- Wire transfer fees
- Stop payment fees  
- NSF (insufficient funds) fees
- Credit card processing fees (if bank processes)

**Recording Bank Fees:**
\`\`\`
Journal Entry for $25 monthly bank fee:
Debit: Bank Fees (Expense)     $25.00
Credit: Checking Account       $25.00
\`\`\`

### Step 5: Identify and Resolve Discrepancies

#### Timing Differences (Normal)
- **Deposits in Transit**: Will clear next period
- **Outstanding Checks**: Will clear when presented
- **Bank Processing Delays**: End-of-month timing differences

#### Errors Requiring Action
- **Bank Errors**: Contact bank immediately
- **Recording Errors**: Correct in your books with journal entries
- **Missing Transactions**: Add to your records
- **Duplicate Entries**: Remove duplicates

## Technology Tools for Reconciliation

### Built-in Bank Reconciliation Features

#### QuickBooks Online
**Bank Feeds Setup:**
1. Connect your bank accounts
2. Download transactions automatically
3. Match downloaded transactions to existing entries
4. Reconcile through Banking → Reconcile

**Reconciliation Workflow:**
1. Start new reconciliation
2. Enter statement ending balance and date
3. Check off cleared transactions
4. Resolve differences
5. Finish reconciliation

#### Xero Integration
**Bank Reconciliation Features:**
- Automatic bank feeds
- AI-powered transaction matching
- Bulk reconciliation options
- Mobile reconciliation capability

### Advanced Reconciliation Tools

#### Receipt Bank/Dext Integration
- Automatically categorizes bank transactions
- Matches receipts to bank transactions
- Reduces manual reconciliation time
- Provides audit trail for all transactions

#### Multiple Account Management
For businesses with multiple bank accounts:

\`\`\`
Account Structure:
- Operating Account (main business checking)
- Savings Account (emergency fund)
- Payroll Account (employee payments)
- Tax Account (quarterly tax savings)
- Client Trust Account (if applicable)

Each account requires separate reconciliation
\`\`\`

## Reconciliation Schedule and Best Practices

### Monthly Reconciliation Calendar
**Week 1 of New Month:**
- Day 1-3: Wait for bank statement
- Day 4-5: Download statement and begin reconciliation
- Day 6-7: Resolve discrepancies and complete

**Never Skip Months:**
- Missed reconciliations compound errors
- Makes year-end much more difficult
- Increases chance of fraud going undetected

### Documentation Requirements
**Save for Each Reconciliation:**
- Bank statement (PDF copy)
- Reconciliation report from accounting software
- Notes on any adjustments made
- Supporting documents for discrepancies

**File Organization:**
\`\`\`
Reconciliation Files/
  2024/
    January/
      - Bank_Statement_Jan_2024.pdf
      - Reconciliation_Report_Jan_2024.pdf
      - Reconciliation_Notes_Jan_2024.txt
    February/
      - Bank_Statement_Feb_2024.pdf
      - Reconciliation_Report_Feb_2024.pdf
\`\`\`

## Common Reconciliation Problems and Solutions

### Problem 1: Can't Balance
**Symptoms:** Your adjusted balance doesn't match bank balance
**Common Causes:**
- Math error in outstanding checks or deposits
- Missing bank fee or interest
- Transposition error in amount entry
- Duplicate transaction recorded

**Solution Process:**
1. Re-add outstanding checks and deposits
2. Check for unrecorded bank fees
3. Look for transactions in wrong amounts
4. Search for duplicate entries

### Problem 2: Missing Transactions
**Symptoms:** Bank shows transactions not in your records
**Common Sources:**
- Automatic payments you forgot about
- Bank fees not recorded
- Customer payments directly to bank
- Refunds or chargebacks

**Resolution:**
\`\`\`
Example: Found $50 bank fee not recorded
Journal Entry:
Debit: Bank Fees          $50.00
Credit: Checking Account   $50.00
\`\`\`

### Problem 3: Timing Issues
**Symptoms:** Transactions recorded in wrong periods
**Common Causes:**
- Recording transactions when paid vs. when cleared
- Credit card payments vs. charges
- Deposits recorded when made vs. when cleared

**Best Practice:** Be consistent with timing method

## Cash Flow Impact Analysis

### Understanding Your Cash Patterns
**Weekly Cash Flow:**
- Monitor for seasonal patterns
- Identify high and low cash periods
- Plan major expenses around cash availability

**Monthly Trends:**
\`\`\`
Sample Cash Flow Pattern:
Week 1: High (monthly subscriptions collect)
Week 2: Moderate (project payments come in)  
Week 3: Low (monthly expenses paid)
Week 4: Moderate (quarter-end collections)
\`\`\`

### Cash Management Strategies
**Build Cash Reserves:**
- Maintain 3-6 months operating expenses
- Separate emergency fund from operating cash
- Consider high-yield business savings accounts

**Optimize Collection and Payment Timing:**
- Accelerate receivables with payment terms
- Take advantage of vendor payment terms
- Use credit cards for better cash flow timing

## Key Takeaways

- Reconcile bank accounts monthly without exception
- Use technology tools to streamline the process
- Document all reconciliations and save supporting files
- Address discrepancies immediately, don't let them accumulate
- Use reconciliation insights to improve cash flow management
- Maintain clean separation between business and personal accounts

Regular bank reconciliation is not just about balancing your books—it's a critical tool for understanding your business's financial health and catching problems before they become crises.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 105
      }
    });

    // Week 4 Lesson 2
    await prisma.lesson.create({
      data: {
        weekId: week4.id,
        title: 'Cash Flow Statement Preparation and Analysis',
        slug: 'cash-flow-statement-preparation',
        content: `# Cash Flow Statement Preparation and Analysis

## Understanding Cash Flow Statements

A cash flow statement tracks the actual movement of cash in and out of your business over a specific period. Unlike profit and loss statements that include non-cash items, cash flow statements show your true liquidity position—critical for tech businesses managing varying payment cycles and growth investments.

## The Three Categories of Cash Flow

### 1. Operating Activities (Cash from Core Business)
Money flowing from your main business operations.

**Cash Inflows:**
- Customer payments for services
- SaaS subscription collections
- Project milestone payments
- Interest received on business accounts

**Cash Outflows:**
- Payments to suppliers and contractors
- Employee salaries and benefits
- Office rent and utilities
- Marketing and advertising spend
- Professional services fees

### 2. Investing Activities (Cash from Long-term Assets)
Money flowing from buying or selling long-term assets.

**Cash Outflows (Usually):**
- Computer equipment purchases
- Software license acquisitions
- Office furniture and fixtures
- Domain name and intellectual property purchases
- Investment in other businesses

**Cash Inflows (Sometimes):**
- Sale of old equipment
- Returns from business investments
- Sale of intellectual property

### 3. Financing Activities (Cash from Owners and Creditors)
Money flowing from or to business owners and lenders.

**Cash Inflows:**
- Owner capital contributions
- Business loan proceeds
- Line of credit draws
- Investor funding rounds

**Cash Outflows:**
- Owner draws/distributions
- Loan principal payments
- Line of credit payments
- Interest payments on loans

## Cash Flow Statement Formats

### Direct Method (Easier to Understand)
Shows actual cash receipts and payments.

\`\`\`
TECHSTARTUP LLC
CASH FLOW STATEMENT - DIRECT METHOD
For the Month Ended March 31, 2024

CASH FLOWS FROM OPERATING ACTIVITIES:
Cash Receipts:
  Collections from customers           $45,000
  Interest received                       $125
    Total Cash Receipts                $45,125

Cash Payments:
  Payments to suppliers                ($8,500)
  Employee salaries                   ($15,000)
  Rent payment                         ($3,500)
  Utilities and phone                    ($450)
  Insurance                              ($800)
  Professional services                ($2,200)
    Total Cash Payments               ($30,450)
    
  Net Cash from Operations             $14,675

CASH FLOWS FROM INVESTING ACTIVITIES:
  Purchase of computer equipment       ($5,200)
  Software license purchase              ($900)
    Net Cash from Investing            ($6,100)

CASH FLOWS FROM FINANCING ACTIVITIES:  
  Owner contribution                    $10,000
  Business loan repayment              ($1,200)
    Net Cash from Financing             $8,800

NET INCREASE IN CASH                   $17,375
CASH AT BEGINNING OF MONTH              $8,250
CASH AT END OF MONTH                   $25,625
\`\`\`

### Indirect Method (More Common)
Starts with net income and adjusts for non-cash items.

\`\`\`
CASH FLOWS FROM OPERATING ACTIVITIES:
Net Income                             $12,500
Adjustments:
  Depreciation expense                  $1,200
  Increase in accounts receivable      ($3,500)
  Increase in accounts payable          $2,800
  Decrease in prepaid expenses            $400
    Net Cash from Operations           $13,400
\`\`\`

## Preparing Your Cash Flow Statement

### Method 1: Using Bank Statement Analysis

**Step 1: Categorize All Bank Transactions**
Go through your bank statement and categorize each transaction:

\`\`\`
March Bank Statement Analysis:

OPERATING CASH FLOWS:
+ Customer payments: $28,500
+ Stripe deposits: $16,800
+ PayPal deposits: $3,200
- Contractor payments: ($8,500)
- Salary payments: ($12,000)
- Rent payment: ($3,500)
- Software subscriptions: ($1,200)
- Marketing spend: ($2,400)
Net Operating Cash Flow: $20,900

INVESTING CASH FLOWS:
- New MacBook Pro: ($2,800)
- Office desk purchase: ($600)
Net Investing Cash Flow: ($3,400)

FINANCING CASH FLOWS:
+ Owner contribution: $5,000
- Business loan payment: ($800)
Net Financing Cash Flow: $4,200

NET CASH CHANGE: $21,700
\`\`\`

**Step 2: Verify Against Beginning and Ending Balances**
Your calculated net change should match the difference between your beginning and ending cash balances.

### Method 2: Using Accounting Software

#### QuickBooks Online Cash Flow Reports
**Generate Statement of Cash Flows:**
1. Go to Reports → Standard Reports → Business Overview
2. Select "Statement of Cash Flows"
3. Choose date range
4. Customize to show monthly periods

**Customization Options:**
- Show columns by month/quarter
- Include accounts receivable aging
- Add budget comparisons
- Export to Excel for further analysis

#### Xero Cash Flow Reporting
**Dashboard Cash Flow:**
- Real-time cash flow position
- 30-day cash flow forecast
- Visual cash flow trends
- Integration with bank feeds

## Cash Flow Analysis and Insights

### Key Metrics to Monitor

#### 1. Operating Cash Flow Ratio
\`\`\`
Operating Cash Flow Ratio = Operating Cash Flow / Net Sales

Target: 15-25% for healthy tech businesses

Example:
Monthly Operating Cash Flow: $15,000
Monthly Revenue: $60,000  
Ratio: 25% (Excellent)
\`\`\`

#### 2. Cash Flow to Debt Ratio
\`\`\`
Cash Flow to Debt = Operating Cash Flow / Total Debt

Target: Higher is better, minimum 20%

Example:
Annual Operating Cash Flow: $180,000
Total Business Debt: $50,000
Ratio: 360% (Very Strong)
\`\`\`

#### 3. Free Cash Flow
\`\`\`
Free Cash Flow = Operating Cash Flow - Capital Expenditures

Shows cash available for growth, debt repayment, or owner distributions

Example:
Operating Cash Flow: $15,000
Capital Expenditures: ($2,000)
Free Cash Flow: $13,000
\`\`\`

### Cash Flow Pattern Analysis

#### SaaS Business Cash Flow Patterns
**Predictable Monthly Inflows:**
- Recurring subscription revenue
- Consistent collection timing
- Predictable churn patterns

**Growth Investment Outflows:**
- Customer acquisition costs
- Product development expenses
- Infrastructure scaling costs

\`\`\`
Typical SaaS Cash Flow Profile:
Month 1: -$5,000 (customer acquisition heavy)
Month 2: +$8,000 (subscriptions collect)
Month 3: +$12,000 (growth in MRR)
Month 4: +$15,000 (retention improving)
\`\`\`

#### Development Agency Cash Flow Patterns
**Project-Based Volatility:**
- Large inflows at project completion
- Uneven revenue timing
- Seasonal client budget cycles

**Managing Agency Cash Flow:**
- Require project deposits (30-50%)
- Invoice at regular milestones
- Maintain retainer relationships
- Build cash reserves for slow periods

### Cash Flow Forecasting

#### 13-Week Rolling Forecast
Create a rolling 13-week cash flow forecast updated weekly:

\`\`\`
CASH FLOW FORECAST TEMPLATE

Week Starting: [Date]

CASH RECEIPTS:
  SaaS subscriptions (predictable)
  Project payments (milestone-based)  
  New client deposits
    Total Receipts

CASH PAYMENTS:
  Payroll (fixed)
  Rent and utilities (fixed)
  Software subscriptions (fixed)
  Marketing spend (variable)
  Equipment purchases (planned)
    Total Payments

NET CASH FLOW
CUMULATIVE CASH POSITION
\`\`\`

#### Scenario Planning
Create three scenarios for cash flow planning:

**Conservative (75% probability):**
- Lower revenue assumptions
- Higher expense assumptions
- Delayed payment collections

**Base Case (50% probability):**
- Current trend projections
- Normal collection patterns
- Planned expense levels

**Optimistic (25% probability):**
- Accelerated growth scenarios
- Faster payment collections
- Expense efficiencies

## Cash Management Strategies

### 1. Accelerate Cash Inflows
**Payment Terms Optimization:**
- Net 15 instead of Net 30 terms
- Early payment discounts (2/10 net 30)
- Automatic payment incentives
- Late payment penalties

**Collection Process:**
- Automated invoicing systems
- Payment reminders (7, 14, 21 days)
- Multiple payment options (ACH, credit cards)
- Personal follow-up on large amounts

### 2. Optimize Cash Outflows
**Payment Timing:**
- Take full advantage of vendor terms
- Use business credit cards for float
- Time large purchases strategically
- Negotiate better payment terms

**Expense Management:**
- Regular expense reviews
- Eliminate underused subscriptions
- Negotiate volume discounts
- Consider equipment leasing vs. buying

### 3. Build Cash Reserves
**Emergency Fund Guidelines:**
- Solo developers: 6 months expenses
- Small agencies: 4-6 months expenses
- Growing SaaS: 3-4 months expenses
- Well-funded startups: 12-18 months runway

**Reserve Account Structure:**
\`\`\`
Account Structure for Cash Management:
- Operating Account: Day-to-day expenses
- Tax Reserve: 25-30% of profit quarterly
- Emergency Fund: 3-6 months expenses
- Growth Fund: Equipment and expansion
- Opportunity Fund: Strategic investments
\`\`\`

## Technology and Automation

### Automated Cash Flow Monitoring
**Daily Dashboards:**
- Current cash position
- Today's receipts and payments
- Week-to-date performance vs. forecast
- Alerts for low balance situations

**Integration Options:**
- Bank APIs for real-time balances
- Accounting software webhooks
- Payment processor integrations
- Custom dashboard solutions

### Cash Flow Apps and Tools

#### Float (cash flow forecasting)
- 13-week rolling forecasts
- Scenario planning capabilities
- Bank integration
- Team collaboration features

#### Pulse (cash flow visualization)
- Simple cash flow projections
- Visual timeline interface
- Import from accounting software
- What-if scenario modeling

#### CashAnalytics (advanced analysis)
- AI-powered cash flow predictions
- Trend analysis and insights
- Industry benchmarking
- Custom reporting

## Warning Signs and Red Flags

### Immediate Concerns (Address This Week)
- Negative operating cash flow for 2+ months
- Unable to meet current obligations
- Borrowing to pay routine expenses
- Customers extending payment times

### Medium-term Concerns (Address This Month)
- Declining cash conversion cycle
- Increasing days sales outstanding
- Growing accounts receivable aging
- Seasonal cash flow not improving

### Long-term Concerns (Strategic Issues)
- Operating cash flow not growing with revenue
- Free cash flow consistently negative
- High customer acquisition costs
- Business model not generating positive unit economics

## Key Takeaways

- Monitor cash flow weekly, not just monthly
- Operating cash flow is more important than net income for survival
- Build cash reserves before you need them
- Use cash flow analysis to make better business decisions
- Automate monitoring and forecasting where possible
- Plan for seasonal and cyclical variations
- Address cash flow problems early before they become crises

Understanding and managing cash flow is often the difference between a business that survives and thrives versus one that fails despite being profitable on paper. Make cash flow monitoring a weekly habit, not a monthly chore.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 115
      }
    });

    // Week 4 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week4.id,
        title: 'Bank Reconciliation and Cash Flow Quiz',
        description: 'Test your understanding of bank reconciliation procedures and cash flow analysis',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'What are "deposits in transit" in a bank reconciliation?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Deposits that were returned by the bank',
                'Deposits recorded in your books but not yet shown on the bank statement',
                'Deposits that were made to the wrong account',
                'Deposits that are still being processed by your customers'
              ]),
              correctAnswer: 'Deposits recorded in your books but not yet shown on the bank statement',
              explanation: 'Deposits in transit are amounts you have recorded as deposits in your books but have not yet appeared on your bank statement, typically due to timing differences.',
              orderIndex: 1
            },
            {
              questionText: 'Which of the following would be classified as an Operating Cash Flow in a cash flow statement?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Purchase of new computer equipment',
                'Owner capital contribution',
                'Customer payments for services',
                'Business loan proceeds'
              ]),
              correctAnswer: 'Customer payments for services',
              explanation: 'Customer payments for services are part of your core business operations and would be classified as Operating Cash Flow.',
              orderIndex: 2
            },
            {
              questionText: 'If your bank statement shows a $25 monthly service fee that you have not recorded in your books, what journal entry should you make?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Debit: Cash $25, Credit: Bank Fees $25',
                'Debit: Bank Fees $25, Credit: Cash $25',
                'Debit: Accounts Payable $25, Credit: Cash $25',
                'No entry needed - bank fees are not recorded'
              ]),
              correctAnswer: 'Debit: Bank Fees $25, Credit: Cash $25',
              explanation: 'Bank fees are expenses that reduce your cash balance, so you debit the expense account (Bank Fees) and credit your cash account.',
              orderIndex: 3
            },
            {
              questionText: 'What is the main difference between the Direct Method and Indirect Method of cash flow statements?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Direct Method is more accurate than Indirect Method',
                'Direct Method shows actual cash receipts and payments, Indirect Method starts with net income',
                'Indirect Method includes more categories than Direct Method',
                'Direct Method is required by law, Indirect Method is optional'
              ]),
              correctAnswer: 'Direct Method shows actual cash receipts and payments, Indirect Method starts with net income',
              explanation: 'The Direct Method shows actual cash inflows and outflows, while the Indirect Method starts with net income and adjusts for non-cash items.',
              orderIndex: 4
            },
            {
              questionText: 'For a healthy tech business, what should the Operating Cash Flow Ratio (Operating Cash Flow / Net Sales) typically be?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '5-10%',
                '15-25%',
                '35-45%',
                '55-65%'
              ]),
              correctAnswer: '15-25%',
              explanation: 'A healthy tech business should typically have an Operating Cash Flow Ratio of 15-25%, indicating good cash generation from operations.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 4 created with 2 lessons and 1 quiz');

    // Week 5: Monthly/Quarterly Closing Procedures
    const week5 = await prisma.week.create({
      data: {
        courseId: course4.id,
        weekNumber: 5,
        title: 'Monthly/Quarterly Closing Procedures',
        overview: 'Learn systematic procedures for monthly and quarterly book closing, financial reporting, and performance analysis to maintain accurate records and support business decisions.',
        learningObjectives: JSON.stringify([
          'Implement systematic monthly closing procedures',
          'Prepare accurate monthly financial statements',
          'Perform quarterly closing tasks and adjustments',
          'Generate management reports for decision-making',
          'Establish quality control and review processes'
        ]),
        estimatedHours: 8
      }
    });

    // Week 5 Lesson 1  
    await prisma.lesson.create({
      data: {
        weekId: week5.id,
        title: 'Monthly Closing Procedures and Checklist',
        slug: 'monthly-closing-procedures',
        content: `# Monthly Closing Procedures and Checklist

## The Importance of Monthly Closing

Monthly closing is the systematic process of reviewing, adjusting, and finalizing your books at the end of each month. For tech businesses, consistent monthly closing provides accurate financial data for decision-making, investor reporting, and tax planning.

## Benefits of Systematic Monthly Closing

### Business Management
- **Accurate Performance Metrics**: Real-time understanding of profitability
- **Cash Flow Monitoring**: Early warning of potential cash issues
- **Trend Analysis**: Month-over-month and year-over-year comparisons
- **Budget Variance Analysis**: Actual vs. planned performance

### Compliance and Reporting
- **Tax Preparation**: Clean books make tax filing easier and less expensive
- **Investor Relations**: Professional financial reporting builds confidence
- **Audit Readiness**: Well-maintained books reduce audit costs and time
- **Loan Applications**: Banks require accurate financial statements

### Operational Efficiency
- **Error Detection**: Catch mistakes while transactions are still fresh
- **Process Improvement**: Identify recurring issues and fix root causes
- **Time Management**: Monthly work is faster than annual cleanup
- **Staff Training**: Regular procedures build bookkeeping competency

## Monthly Closing Timeline

### Days 1-2: Initial Setup
**Preparation Tasks:**
- [ ] Ensure all bank statements are received
- [ ] Download credit card statements
- [ ] Gather receipts and documentation
- [ ] Update accounting software to latest transactions
- [ ] Backup accounting data

### Days 3-5: Transaction Processing
**Core Activities:**
- [ ] Complete bank reconciliations
- [ ] Reconcile credit card accounts
- [ ] Process expense reports and reimbursements  
- [ ] Record any missing transactions
- [ ] Categorize uncategorized transactions

### Days 6-8: Review and Adjustments
**Quality Control:**
- [ ] Review all accounts for accuracy
- [ ] Make necessary adjusting journal entries
- [ ] Verify revenue recognition
- [ ] Confirm expense categorization
- [ ] Check for duplicate entries

### Days 9-10: Reporting and Analysis
**Final Steps:**
- [ ] Generate financial statements
- [ ] Prepare management reports
- [ ] Analyze key performance indicators
- [ ] Document any issues or observations
- [ ] Close the month in accounting software

## Detailed Monthly Closing Checklist

### Bank and Cash Management

#### Bank Reconciliations
- [ ] **Primary Operating Account**
  - Download bank statement
  - Compare deposits to recorded income
  - Verify all cleared checks and payments
  - Account for outstanding items
  - Record any bank fees or interest
  
- [ ] **Savings Accounts**  
  - Reconcile balances
  - Record interest income
  - Verify any transfers between accounts

- [ ] **Payment Processor Accounts**
  - Stripe account reconciliation
  - PayPal account reconciliation  
  - Square/other processor reconciliation
  - Verify fee calculations

#### Credit Card Reconciliations
- [ ] **Business Credit Cards**
  - Match all charges to receipts
  - Verify expense categorization
  - Check for personal charges to remove
  - Confirm payment processing

\`\`\`
Credit Card Reconciliation Process:
1. Download statement from credit card company
2. Match each charge to receipt/documentation
3. Verify proper expense categorization
4. Remove any personal charges
5. Record any missing charges
6. Confirm payment entry in books
\`\`\`

### Revenue and Accounts Receivable

#### Revenue Recognition Review
- [ ] **Subscription Revenue**
  - Verify all monthly subscriptions billed
  - Confirm annual subscription deferrals
  - Check for any cancelled subscriptions
  - Validate new customer setup

- [ ] **Project Revenue**
  - Update project completion percentages
  - Bill completed milestones
  - Review work-in-progress calculations
  - Process any change orders

- [ ] **Other Revenue Streams**
  - Training and consulting revenue
  - One-time software sales
  - Affiliate commissions
  - Interest and other income

#### Accounts Receivable Management
\`\`\`
A/R Aging Analysis:
Current (0-30 days): Should be 70-80% of total A/R
31-60 days: Should be 15-20% of total A/R  
61-90 days: Should be 5-10% of total A/R
Over 90 days: Should be less than 5% of total A/R

Actions Required:
- Send payment reminders for 30+ day invoices
- Make phone calls for 60+ day invoices
- Consider collection actions for 90+ day invoices
\`\`\`

### Expenses and Accounts Payable

#### Expense Review and Categorization
- [ ] **Personnel Expenses**
  - Verify payroll accuracy
  - Record contractor payments
  - Check payroll tax liabilities
  - Confirm benefit deductions

- [ ] **Technology and Software**
  - Review software subscriptions for accuracy
  - Verify cloud service bills
  - Check equipment purchases
  - Confirm license and maintenance fees

- [ ] **Marketing and Sales**
  - Review advertising spend
  - Confirm lead generation costs
  - Check event and conference expenses
  - Verify sales tool subscriptions

- [ ] **General and Administrative**
  - Office rent and utilities
  - Professional services (legal, accounting)
  - Insurance payments
  - Banking and other fees

#### Accounts Payable Review
- [ ] **Outstanding Invoices**
  - Review all unpaid vendor invoices
  - Confirm payment due dates
  - Plan cash flow for upcoming payments
  - Take advantage of early payment discounts

### Inventory and Assets (If Applicable)

#### Fixed Asset Management
- [ ] **Equipment and Software**
  - Record new equipment purchases
  - Calculate monthly depreciation
  - Update fixed asset register
  - Check for disposals or sales

- [ ] **Intangible Assets**
  - Software licenses and subscriptions
  - Domain names and trademarks
  - Patents and intellectual property
  - Amortization calculations

### Accruals and Prepaid Expenses

#### Monthly Accruals
Common accruals for tech businesses:

\`\`\`
Accrued Expenses (services received but not billed):
- Legal services for ongoing matters
- Accounting services for monthly work
- Utilities for current month usage
- Interest on loans and lines of credit

Journal Entry Example:
Debit: Legal Expense           $1,500
Credit: Accrued Expenses      $1,500
(To record estimated legal fees for work completed)
\`\`\`

#### Prepaid Expense Amortization
\`\`\`
Common Prepaid Expenses:
- Annual software licenses
- Insurance premiums  
- Rent paid in advance
- Marketing services contracts

Monthly Amortization Example:
Annual software license: $2,400
Monthly amortization: $200

Journal Entry:
Debit: Software Expense        $200
Credit: Prepaid Software       $200
\`\`\`

## Quality Control Procedures

### Account Review Process

#### Balance Sheet Review
**Asset Accounts:**
- [ ] Cash balances match bank statements
- [ ] A/R aging is reasonable and collectible
- [ ] Prepaid expenses are being amortized correctly
- [ ] Fixed assets are recorded at correct values

**Liability Accounts:**
- [ ] A/P balances match vendor statements
- [ ] Accrued expenses are reasonable
- [ ] Payroll liabilities are accurate
- [ ] Tax liabilities are up to date

**Equity Accounts:**
- [ ] Owner draws/distributions are correct
- [ ] Retained earnings roll forward properly
- [ ] Capital contributions are recorded

#### P&L Review
**Revenue Analysis:**
- [ ] Revenue trends make sense
- [ ] Revenue recognition is appropriate
- [ ] No unusual spikes or dips without explanation

**Expense Analysis:**
- [ ] Expenses are in correct categories
- [ ] No personal expenses in business accounts
- [ ] Expense levels are consistent with expectations
- [ ] All expenses have proper documentation

### Common Error Checks

#### Data Entry Errors
\`\`\`
Common Mistakes to Check:
- Transposed numbers (typing 156 instead of 165)
- Wrong decimal places ($150.00 vs $1,500.00)  
- Negative numbers that should be positive
- Transactions in wrong months
- Duplicate entries
- Wrong account classifications
\`\`\`

#### Reconciliation Errors
- Outstanding items not properly tracked
- Timing differences not identified
- Bank fees not recorded
- Credit card payments to wrong accounts

### Documentation Requirements

#### Monthly Closing Documentation
**Required Files for Each Month:**
- Bank statements (PDF copies)
- Credit card statements
- Reconciliation reports from software
- Trial balance before and after adjustments
- Adjusting journal entries with explanations
- Financial statements generated

**File Organization:**
\`\`\`
Monthly_Closing/
  2024/
    January/
      Bank_Statements/
      Credit_Card_Statements/
      Reconciliation_Reports/
      Journal_Entries/
      Financial_Statements/
      Supporting_Documentation/
\`\`\`

## Automation and Technology

### Accounting Software Features

#### QuickBooks Online Closing Tools
**Month-End Procedures:**
- Closing date restrictions
- Automatic recurring transactions
- Bank rule automation
- Multi-user access controls
- Backup and restore functions

#### Xero Month-End Features
**Built-in Workflows:**
- Bank reconciliation workflows
- Automatic expense categorization
- Multi-currency support
- Real-time collaboration
- Mobile access for approvals

### Third-Party Integration Tools

#### Receipt Bank/Dext
**Automated Processing:**
- Receipt capture and processing
- Automatic expense categorization
- Integration with accounting software
- Approval workflows
- Audit trails

#### Bill Payment Automation
**Bill.com Integration:**
- Automated invoice processing
- Electronic payments
- Approval workflows
- Integration with accounting software

### Time-Saving Tips

#### Batch Processing
**Group Similar Tasks:**
- Process all bank transactions together
- Categorize expenses in batches
- Review similar account types together
- Make all adjusting entries at once

#### Automation Setup
**Recurring Transactions:**
- Set up recurring income entries
- Automate regular expense entries
- Create bank rules for common transactions
- Use electronic payments where possible

## Key Performance Indicators (KPIs)

### Financial KPIs to Track Monthly

#### Revenue Metrics
\`\`\`
SaaS Business KPIs:
- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Monthly churn rate
- Average Revenue Per User (ARPU)

Service Business KPIs:
- Billable hour utilization
- Average hourly rate  
- Project profit margins
- Client retention rate
- Pipeline value
- Collection period
\`\`\`

#### Cash Flow Metrics
- Operating cash flow
- Free cash flow
- Days Sales Outstanding (DSO)
- Days Payable Outstanding (DPO)
- Cash conversion cycle
- Cash runway (months)

#### Profitability Metrics  
- Gross profit margin
- Operating profit margin
- EBITDA margin
- Net profit margin
- Expense ratios by category

## Troubleshooting Common Issues

### When Numbers Don't Balance
**Systematic Approach:**
1. Check basic math calculations
2. Look for transposed numbers
3. Search for missing transactions
4. Review timing differences
5. Check for duplicate entries
6. Verify account classifications

### When Software Issues Occur
**Problem Resolution:**
- Update to latest software version
- Check internet connectivity
- Review user permissions
- Contact software support
- Restore from backup if necessary

### When Time is Limited
**Priority Focus:**
1. Bank reconciliations (must do)
2. Revenue recognition (critical for accuracy)
3. Expense categorization (for tax purposes)
4. Basic financial statements (for management)
5. Detailed analysis (if time allows)

## Key Takeaways

- Establish a consistent monthly closing schedule and stick to it
- Use checklists to ensure nothing is missed
- Automate repetitive tasks where possible
- Focus on accuracy over speed - errors cost more time later
- Document all adjustments and unusual items
- Review key metrics and trends monthly
- Build in quality control checks throughout the process
- Keep good records of your closing procedures for consistency

Monthly closing is an investment in your business's financial health. The time spent each month on systematic procedures pays dividends in accurate reporting, better decision-making, and reduced stress during tax season or audits.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 120
      }
    });

    // Week 5 Lesson 2
    await prisma.lesson.create({
      data: {
        weekId: week5.id,
        title: 'Financial Reporting and Management Analysis',
        slug: 'financial-reporting-management-analysis',
        content: `# Financial Reporting and Management Analysis

## Building Effective Financial Reports

Financial reporting transforms your bookkeeping data into actionable business intelligence. For tech businesses, the right reports help you understand unit economics, cash flow patterns, and growth trends that drive strategic decisions.

## Core Financial Statements

### 1. Profit & Loss Statement (Income Statement)

#### Standard P&L Structure for Tech Businesses

\`\`\`
TECHSTARTUP LLC
PROFIT & LOSS STATEMENT
For the Month Ended March 31, 2024

REVENUE:
  SaaS Subscription Revenue              $45,000
  Custom Development Revenue             $28,000  
  Consulting Services                    $12,000
  Training Revenue                        $5,000
    Total Revenue                        $90,000

COST OF GOODS SOLD:
  Cloud Hosting (AWS)                     $3,200
  Third-party APIs                        $1,800
  Payment Processing Fees                 $2,600
  Direct Labor (Billable Hours)         $15,000
    Total COGS                          $22,600
    
  GROSS PROFIT                          $67,400
  Gross Profit Margin                    74.9%

OPERATING EXPENSES:
  Salaries and Benefits                  $25,000
  Contractor Payments                    $8,500
  Software and Tools                     $3,200
  Marketing and Advertising              $6,800
  Office and Administrative              $4,200
  Professional Services                  $2,800
    Total Operating Expenses            $50,500

  OPERATING INCOME                      $16,900
  Operating Margin                       18.8%

OTHER INCOME/EXPENSE:
  Interest Income                           $125
  Interest Expense                         ($400)
    Total Other Income                     ($275)

  NET INCOME                            $16,625
  Net Margin                             18.5%
\`\`\`

#### Key P&L Metrics for Analysis

**Gross Profit Margin Targets by Business Type:**
\`\`\`
SaaS Businesses: 75-90%
- High margins due to low variable costs
- Scale efficiently with growth

Development Agencies: 50-70%  
- Lower margins due to labor intensity
- Efficiency gains through process improvement

Consulting Businesses: 60-80%
- Variable based on seniority of consultants
- Premium services command higher margins
\`\`\`

**Operating Expense Ratios:**
\`\`\`
Personnel (40-60% of revenue):
- Largest expense category for most tech businesses
- Should scale with revenue growth

Marketing (10-30% of revenue):
- Higher for growth-stage companies  
- Should generate positive ROI

Technology (5-15% of revenue):
- Essential but should be optimized regularly
- Look for unused subscriptions and tools
\`\`\`

### 2. Balance Sheet Analysis

#### Tech Business Balance Sheet Structure

\`\`\`
TECHSTARTUP LLC  
BALANCE SHEET
As of March 31, 2024

ASSETS:
Current Assets:
  Checking Account                       $35,400
  Savings Account                        $25,000
  Accounts Receivable                    $42,300
  Prepaid Expenses                        $4,200
    Total Current Assets                $106,900

Fixed Assets:
  Computer Equipment                     $28,500
  Office Equipment                        $8,200
  Software Licenses                       $5,500
  Less: Accumulated Depreciation        ($12,800)
    Total Fixed Assets                   $29,400

    TOTAL ASSETS                        $136,300

LIABILITIES:
Current Liabilities:
  Accounts Payable                       $15,600
  Credit Card Payable                     $8,200
  Accrued Expenses                        $6,400
  Deferred Revenue                       $18,500
    Total Current Liabilities            $48,700

Long-term Liabilities:
  Business Loan                          $25,000
    Total Liabilities                    $73,700

EQUITY:
  Owner's Equity                         $45,000
  Retained Earnings                      $17,600
    Total Equity                         $62,600

    TOTAL LIABILITIES & EQUITY          $136,300
\`\`\`

#### Balance Sheet Health Indicators

**Liquidity Ratios:**
\`\`\`
Current Ratio = Current Assets / Current Liabilities
Target: 1.5 - 3.0

Example: $106,900 / $48,700 = 2.20 (Good)

Quick Ratio = (Current Assets - Inventory) / Current Liabilities  
Target: 1.0 - 2.0 (Tech businesses rarely have inventory)

Example: $106,900 / $48,700 = 2.20 (Excellent)
\`\`\`

**Working Capital:**
\`\`\`
Working Capital = Current Assets - Current Liabilities
Example: $106,900 - $48,700 = $58,200

Positive working capital indicates ability to meet short-term obligations
\`\`\`

### 3. Cash Flow Statement Insights

#### Operating Cash Flow Analysis
\`\`\`
Key Questions for Operating Cash Flow:
1. Is operating cash flow positive and growing?
2. How does it compare to net income?
3. Are receivables growing faster than sales?
4. Is inventory (if any) turning efficiently?
5. Are payment terms being managed effectively?
\`\`\`

**Cash Flow Quality Metrics:**
\`\`\`
Operating Cash Flow to Net Income Ratio:
Target: 1.0 or higher
Ratio > 1.0: Strong cash generation
Ratio < 1.0: Investigate receivables and timing

Example:
Operating Cash Flow: $18,500
Net Income: $16,625  
Ratio: 1.11 (Good quality earnings)
\`\`\`

## Management Reporting Dashboard

### Key Performance Indicators (KPIs) by Business Model

#### SaaS Business Dashboard
\`\`\`
MONTHLY SaaS METRICS DASHBOARD

GROWTH METRICS:
Monthly Recurring Revenue (MRR):        $85,000
MRR Growth Rate:                         8.5%
Annual Recurring Revenue (ARR):       $1,020,000
New MRR:                               $12,000
Churned MRR:                           ($4,200)
Net New MRR:                            $7,800

CUSTOMER METRICS:
Total Customers:                           847
New Customers:                              67
Churned Customers:                          23
Net Customer Growth:                        44
Monthly Churn Rate:                       2.7%
Customer Lifetime Value (LTV):         $3,850
Customer Acquisition Cost (CAC):         $425

FINANCIAL METRICS:
Gross Revenue Retention:                  97.3%
Net Revenue Retention:                   108.2%
Average Revenue Per User (ARPU):         $100
LTV/CAC Ratio:                             9.1
Months to Recover CAC:                      4.2
\`\`\`

#### Development Agency Dashboard
\`\`\`
MONTHLY AGENCY METRICS DASHBOARD

UTILIZATION METRICS:
Billable Hours:                           1,240
Total Available Hours:                    1,600  
Utilization Rate:                        77.5%
Average Hourly Rate:                      $135
Blended Rate (all staff):                 $118

PROJECT METRICS:
Active Projects:                            12
Projects Completed:                          4
Pipeline Value:                       $285,000
Win Rate:                               65%
Average Project Size:                  $42,000

FINANCIAL METRICS:
Monthly Revenue:                      $165,000
Gross Margin:                           68.5%
Project Profit Margin:                  22.3%
Collection Period (DSO):              28 days
Client Retention Rate:                    92%
\`\`\`

### Revenue Analysis Reports

#### Revenue Trend Analysis
\`\`\`
QUARTERLY REVENUE TREND ANALYSIS

                Q1 2024   Q4 2023   Change   % Change
Total Revenue   $275,000  $245,000  $30,000    12.2%

By Category:
SaaS Revenue    $165,000  $135,000  $30,000    22.2%
Services        $85,000   $92,000   ($7,000)   -7.6%
Training        $25,000   $18,000   $7,000     38.9%

By Month:
January         $88,000
February        $91,500
March           $95,500
Growth Trend:    +4.3% monthly average
\`\`\`

#### Customer Analysis Report
\`\`\`
CUSTOMER REVENUE ANALYSIS

Customer Segmentation by Revenue:
Enterprise (>$1000/month):     12 customers = $48,000 (55%)
Mid-Market ($250-999/month):   45 customers = $28,500 (32%)  
SMB (<$250/month):           165 customers = $11,500 (13%)

Top 10 Customers: $35,200 (40% of total revenue)
Customer Concentration Risk: Moderate

Cohort Analysis (12-month retention):
Jan 2023 Cohort: 78% retained, 125% revenue retention
Feb 2023 Cohort: 82% retained, 132% revenue retention  
Mar 2023 Cohort: 85% retained, 118% revenue retention
\`\`\`

### Expense Analysis Reports

#### Operating Expense Analysis
\`\`\`
OPERATING EXPENSE ANALYSIS

                Current   Budget   Variance   % Var
Personnel       $45,000   $48,000   $3,000    6.3%
Technology      $8,200    $7,500   ($700)   -9.3%  
Marketing       $12,400   $15,000   $2,600   17.3%
Office          $6,800    $7,200     $400    5.6%
Professional    $4,200    $3,500   ($700)  -20.0%

Expense per Dollar of Revenue:
Personnel:       $0.50
Technology:      $0.09
Marketing:       $0.14
Office:          $0.08
Professional:    $0.05
Total OpEx:      $0.86
\`\`\`

#### Cost Analysis by Project/Customer
\`\`\`
PROJECT PROFITABILITY ANALYSIS

Project Alpha:
Revenue:         $45,000
Direct Costs:    $28,000
Indirect Costs:  $8,100
Net Profit:      $8,900
Margin:          19.8%

Project Beta:
Revenue:         $32,000
Direct Costs:    $18,500  
Indirect Costs:  $5,800
Net Profit:      $7,700
Margin:          24.1%

Customer Profitability:
Top Quartile:    35% margin average
Second Quartile: 22% margin average
Third Quartile:  18% margin average  
Bottom Quartile: 8% margin average
\`\`\`

## Financial Forecasting and Budgeting

### Rolling 12-Month Forecast

#### SaaS Revenue Forecasting Model
\`\`\`
REVENUE FORECAST MODEL

Base Assumptions:
Current MRR:              $85,000
Monthly Growth Rate:      5.0%
Churn Rate:              2.5%
Average Deal Size:       $150

12-Month Projection:
Month 4:   $87,125 MRR
Month 6:   $91,453 MRR
Month 8:   $95,983 MRR
Month 10:  $100,734 MRR
Month 12:  $105,715 MRR

Year-End ARR:            $1,268,580
Growth Rate:             24.4%
\`\`\`

#### Expense Forecasting
\`\`\`
OPERATING EXPENSE FORECAST

Fixed Costs (predictable):
Personnel:               85% of total
Office/Admin:            10% of total
Professional Services:    5% of total

Variable Costs (scale with revenue):
Technology:              8% of revenue
Marketing:               15% of revenue
Customer Success:        5% of revenue

Break-even Analysis:
Fixed Costs:             $52,000/month
Variable Cost %:         28% of revenue
Break-even Revenue:      $72,222/month
Current Revenue:         $90,000/month
Safety Margin:           24.7%
\`\`\`

### Scenario Planning

#### Conservative, Base, and Optimistic Scenarios
\`\`\`
12-MONTH REVENUE SCENARIOS

Conservative (25% probability):
- 3% monthly growth rate
- 3.5% churn rate  
- Year-end revenue: $1,150,000

Base Case (50% probability):
- 5% monthly growth rate
- 2.5% churn rate
- Year-end revenue: $1,270,000

Optimistic (25% probability):  
- 8% monthly growth rate
- 2.0% churn rate
- Year-end revenue: $1,450,000

Cash Flow Impact:
Conservative: 6 months runway  
Base Case: 12 months runway
Optimistic: 24+ months runway
\`\`\`

## Business Performance Analysis

### Profitability Analysis

#### Unit Economics
\`\`\`
SaaS UNIT ECONOMICS

Customer Acquisition:
Cost per Lead:           $25
Lead to Trial Rate:      15%
Trial to Paid Rate:      28%
Customer Acquisition Cost: $595

Customer Value:
Average Monthly Revenue: $125
Gross Margin:            85%
Monthly Gross Profit:    $106.25
Average Customer Life:   42 months
Customer Lifetime Value: $4,463

Unit Economics Health:
LTV/CAC Ratio:          7.5 (Target: >3.0)
Payback Period:         5.6 months (Target: <12)
Monthly Cohort ROI:     650%
\`\`\`

#### Margin Analysis by Product/Service
\`\`\`
PRODUCT PROFITABILITY ANALYSIS

SaaS Platform:
Revenue:                 $165,000
Direct Costs:            $24,750
Gross Margin:            84.9%
Contribution Margin:     $140,250

Custom Development:
Revenue:                 $85,000  
Direct Costs:            $51,000
Gross Margin:            40.0%
Contribution Margin:     $34,000

Consulting Services:
Revenue:                 $25,000
Direct Costs:            $12,500
Gross Margin:            50.0%  
Contribution Margin:     $12,500

Total Blended Margin:    67.5%
\`\`\`

### Operational Efficiency Metrics

#### Productivity Indicators
\`\`\`
OPERATIONAL EFFICIENCY DASHBOARD

Revenue per Employee:    $22,500/month
Revenue per Dollar Spent: $1.85
Customer Support Ratio:  1:175 (agents:customers)
Development Velocity:    24 story points/sprint
Sales Cycle Length:      45 days average
Feature Development Cost: $2,850/feature

Quality Metrics:
Customer Satisfaction:   4.6/5.0
Bug Report Rate:        2.3/1000 users/month
Support Ticket Rate:    8.5/100 users/month  
First Response Time:    2.3 hours average
\`\`\`

## Technology and Automation

### Reporting Tool Integration

#### Business Intelligence Platforms
**Tableau Integration:**
- Connect to QuickBooks, CRM, and other data sources
- Create interactive dashboards
- Automated report generation
- Mobile access for executives

**Power BI Integration:**  
- Real-time data connections
- Custom KPI dashboards
- Collaborative report sharing
- Cost-effective for small businesses

#### Custom Dashboard Solutions
**Google Data Studio:**
- Free visualization tool
- Connects to Google Analytics, AdWords
- Custom metrics and dimensions
- Shareable with stakeholders

**ChartIO/Sisense:**
- Purpose-built for SaaS metrics
- Automated cohort analysis
- Churn prediction modeling
- Benchmark comparisons

### Automated Reporting Workflows

#### Monthly Report Automation
\`\`\`
Automated Monthly Report Package:

1. Financial Statements (PDF)
   - P&L with prior period comparison
   - Balance Sheet with ratios
   - Cash Flow with 13-week forecast

2. KPI Dashboard (Interactive)
   - Revenue metrics and trends  
   - Customer acquisition and retention
   - Operational efficiency indicators

3. Management Commentary (Document)
   - Key highlights and lowlights
   - Variance explanations  
   - Action items and priorities

4. Distribution List:
   - Owners/Founders
   - Department Heads
   - Board Members
   - Key Advisors
\`\`\`

## Best Practices for Financial Reporting

### Report Design Principles

#### Clarity and Focus
- **Lead with Key Metrics**: Most important KPIs first
- **Use Visual Elements**: Charts and graphs for trends
- **Consistent Formatting**: Same layout and style monthly
- **Executive Summary**: One-page overview for busy executives

#### Actionable Insights
- **Variance Analysis**: Always explain significant changes
- **Trend Commentary**: What patterns are emerging?
- **Forward-Looking**: What do metrics suggest for next period?
- **Recommendations**: Specific actions based on data

### Quality Control for Reports

#### Review Checklist
- [ ] All numbers tie to source systems
- [ ] Calculations are accurate  
- [ ] Trends make business sense
- [ ] Variances are explained
- [ ] Formatting is consistent
- [ ] Charts and graphs are clear
- [ ] Executive summary tells the story

#### Validation Process
1. **Automated Checks**: Built-in formulas and validations
2. **Peer Review**: Second set of eyes on all reports
3. **Management Review**: Business context and reasonableness
4. **Stakeholder Feedback**: Regular input on report usefulness

## Key Takeaways

- Build a standard reporting package that tells your business story
- Focus on metrics that drive decision-making, not just compliance
- Automate report generation where possible to ensure consistency  
- Include trend analysis and forward-looking insights, not just historical data
- Customize reports for different audiences (board vs. operational team)
- Use visualization to make complex data understandable
- Establish quality control processes to maintain accuracy
- Regular review and refinement of reports based on user feedback

Financial reporting should be a strategic asset that helps you run your business better, not just a compliance exercise. The time invested in building good reporting systems pays dividends in better decision-making and business performance.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 125
      }
    });

    // Week 5 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week5.id,
        title: 'Monthly Closing and Financial Reporting Quiz',
        description: 'Test your understanding of monthly closing procedures and financial reporting for management',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 30,
        questions: {
          create: [
            {
              questionText: 'What is the recommended timeline for completing monthly closing procedures?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Within 5 business days of month end',
                'Within 10 business days of month end',
                'Within 15 business days of month end',
                'By the end of the following month'
              ]),
              correctAnswer: 'Within 10 business days of month end',
              explanation: 'Best practice is to complete monthly closing within 10 business days to ensure timely and accurate financial reporting.',
              orderIndex: 1
            },
            {
              questionText: 'For a SaaS business, what is a healthy gross profit margin target?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '40-60%',
                '60-75%',
                '75-90%',
                '90-95%'
              ]),
              correctAnswer: '75-90%',
              explanation: 'SaaS businesses typically achieve 75-90% gross profit margins due to low variable costs and high scalability.',
              orderIndex: 2
            },
            {
              questionText: 'What does a Current Ratio of 2.2 indicate about a business?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'The business is struggling with cash flow',
                'The business has good liquidity to meet short-term obligations',
                'The business is overleveraged',
                'The business needs more inventory'
              ]),
              correctAnswer: 'The business has good liquidity to meet short-term obligations',
              explanation: 'A Current Ratio of 2.2 (Current Assets ÷ Current Liabilities) indicates good liquidity, as the business has 2.2 times more current assets than current liabilities.',
              orderIndex: 3
            },
            {
              questionText: 'In SaaS metrics, what does LTV/CAC ratio measure?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'How long it takes to acquire a customer',
                'The relationship between customer value and acquisition cost',
                'The monthly churn rate',
                'The average revenue per user'
              ]),
              correctAnswer: 'The relationship between customer value and acquisition cost',
              explanation: 'LTV/CAC ratio compares Customer Lifetime Value to Customer Acquisition Cost, indicating the return on investment for customer acquisition. A ratio above 3.0 is generally considered healthy.',
              orderIndex: 4
            },
            {
              questionText: 'What should be included in monthly accruals during the closing process?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Only cash transactions that occurred during the month',
                'Services received but not yet billed or paid',
                'Future expenses that will be incurred next month',
                'Only expenses that have been paid but not recorded'
              ]),
              correctAnswer: 'Services received but not yet billed or paid',
              explanation: 'Accruals include expenses for services received during the month but not yet billed or paid, such as legal services, utilities, or interest on loans.',
              orderIndex: 5
            },
            {
              questionText: 'For effective financial reporting, what should be the focus of management reports?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Historical compliance data only',
                'Detailed transaction listings',
                'Key performance indicators and actionable insights',
                'Tax preparation information'
              ]),
              correctAnswer: 'Key performance indicators and actionable insights',
              explanation: 'Management reports should focus on KPIs and actionable insights that help drive business decisions, not just historical compliance data.',
              orderIndex: 6
            }
          ]
        }
      }
    });

    console.log('✅ Week 5 created with 2 lessons and 1 quiz');

    console.log('🎉 Course 4: Bookkeeping Fundamentals for Tech Businesses completed successfully!');
    console.log(`📚 Course ID: ${course4.id}`);
    console.log('📖 Complete course structure:');
    console.log('   Week 1: Chart of Accounts Setup (2 lessons + quiz)');
    console.log('   Week 2: Recording Revenue (2 lessons + quiz)');  
    console.log('   Week 3: Expense Categorization (2 lessons)');
    console.log('   Week 4: Bank Reconciliation & Cash Flow (2 lessons + quiz)');
    console.log('   Week 5: Monthly Closing & Reporting (2 lessons + quiz)');
    console.log('🎯 Total: 5 weeks, 10 lessons, 4 quizzes, 40 estimated hours');
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error completing Course 4:', error);
    throw error;
  }
}

completeCourse4();