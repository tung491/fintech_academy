import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse4() {
  try {
    console.log('🚀 Creating Course 4: Bookkeeping Fundamentals for Tech Businesses...');

    // First, let's check if the course already exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        slug: 'bookkeeping-fundamentals-tech'
      }
    });

    if (existingCourse) {
      console.log('⚠️ Course already exists, deleting and recreating...');
      
      // Delete existing course and related data
      await prisma.quiz.deleteMany({
        where: {
          week: {
            courseId: existingCourse.id
          }
        }
      });
      
      await prisma.lesson.deleteMany({
        where: {
          week: {
            courseId: existingCourse.id
          }
        }
      });
      
      await prisma.week.deleteMany({
        where: {
          courseId: existingCourse.id
        }
      });
      
      await prisma.course.delete({
        where: {
          id: existingCourse.id
        }
      });
    }

    // Get the existing Accounting & Bookkeeping category
    const category = await prisma.courseCategory.findFirst({
      where: {
        slug: 'accounting'
      }
    });

    if (!category) {
      throw new Error('Accounting & Bookkeeping category not found. Please create it first.');
    }
    
    console.log('✅ Using existing Accounting & Bookkeeping category');

    // Create Course 4: Bookkeeping Fundamentals for Tech Businesses
    const course4 = await prisma.course.create({
      data: {
        title: 'Bookkeeping Fundamentals for Tech Businesses',
        slug: 'bookkeeping-fundamentals-tech',
        description: 'Master essential bookkeeping skills specifically designed for solo developers, small agencies, and tech startups. Learn to manage your business finances with confidence.',
        shortDescription: 'Essential bookkeeping skills for developers and small tech businesses',
        categoryId: category.id,
        level: 'intermediate',
        duration: '5 weeks',
        estimatedHours: 40,
        price: 19700, // $197
        originalPrice: 24700, // $247
        instructor: 'Maria Rodriguez, CPA, CMA',
        instructorBio: 'Certified Public Accountant and Certified Management Accountant with 12+ years specializing in tech startup bookkeeping. Former controller at multiple SaaS companies.',
        thumbnailUrl: '/images/courses/bookkeeping-fundamentals-tech.jpg',
        orderIndex: 4,
        isPublished: true,
        isFeatured: false,
        skillsLearned: JSON.stringify([
          'Chart of accounts setup for software businesses',
          'Revenue recording for SaaS and project-based work',
          'Expense categorization and tax optimization',
          'Bank reconciliation and cash flow management',
          'Monthly and quarterly closing procedures'
        ]),
        targetAudience: 'Solo developers, small development agencies, tech consultants, and startup founders who need to manage their own bookkeeping.',
      }
    });

    console.log('✅ Course 4 created successfully');

    // Week 1: Chart of Accounts Setup for Software Businesses
    const week1 = await prisma.week.create({
      data: {
        courseId: course4.id,
        weekNumber: 1,
        title: 'Chart of Accounts Setup for Software Businesses',
        overview: 'Learn to create and organize a professional chart of accounts tailored specifically for software businesses, development agencies, and tech consultants.',
        learningObjectives: JSON.stringify([
          'Understand the purpose and structure of a chart of accounts',
          'Set up account categories specific to software businesses',
          'Organize accounts for optimal financial reporting',
          'Create tracking systems for different revenue streams',
          'Establish expense categories for tax optimization'
        ]),
        estimatedHours: 8
      }
    });

    // Week 1 Lessons
    const week1lessons = [
      {
        title: 'Understanding Chart of Accounts Fundamentals',
        slug: 'chart-of-accounts-fundamentals',
        content: `# Understanding Chart of Accounts Fundamentals

## What is a Chart of Accounts?

A chart of accounts (COA) is the foundation of your bookkeeping system. Think of it as the filing system for every financial transaction your business makes. For tech businesses, having a well-organized COA is crucial for:

- **Tax Optimization**: Properly categorizing expenses for maximum deductions
- **Business Analysis**: Understanding where money comes from and where it goes
- **Investor Reporting**: Professional financial statements that instill confidence
- **Scaling**: A system that grows with your business

## The Five Main Account Categories

### 1. Assets (1000-1999)
Things your business owns that have value:
- **Current Assets (1000-1199)**: Cash, bank accounts, accounts receivable
- **Fixed Assets (1200-1399)**: Equipment, software licenses, furniture
- **Intangible Assets (1400-1499)**: Patents, trademarks, copyrights

**Tech Business Examples:**
- 1000 - Business Checking Account
- 1010 - Business Savings Account
- 1100 - Accounts Receivable
- 1200 - Computer Equipment
- 1210 - Software Licenses
- 1220 - Office Equipment

### 2. Liabilities (2000-2999)
Money your business owes:
- **Current Liabilities (2000-2199)**: Accounts payable, credit cards, taxes owed
- **Long-term Liabilities (2200-2399)**: Loans, mortgages

**Tech Business Examples:**
- 2000 - Accounts Payable
- 2010 - Business Credit Card
- 2020 - Payroll Taxes Payable
- 2030 - Sales Tax Payable
- 2100 - Business Loan

### 3. Equity (3000-3999)
Your ownership in the business:
- 3000 - Owner's Equity
- 3010 - Retained Earnings
- 3020 - Owner's Draws/Distributions

### 4. Revenue (4000-4999)
Money coming into your business:

**For Software Businesses:**
- 4000 - SaaS Recurring Revenue
- 4010 - One-time Software Sales
- 4020 - Custom Development Projects
- 4030 - Consulting Services
- 4040 - Training and Support
- 4050 - Affiliate Commissions

### 5. Expenses (5000-9999)
Money going out of your business:

**Operating Expenses (5000-6999):**
- 5000 - Salaries and Wages
- 5010 - Contractor Payments
- 5100 - Rent and Utilities
- 5200 - Software Subscriptions
- 5300 - Marketing and Advertising
- 5400 - Professional Services

**Cost of Goods Sold (7000-7999):**
- 7000 - Hosting and Infrastructure
- 7010 - Third-party APIs
- 7020 - Payment Processing Fees

## Account Numbering Best Practices

### Use Consistent Numbering
- Leave gaps between account numbers (5000, 5010, 5020) for future expansion
- Use subcategories to group similar expenses
- Keep related accounts together numerically

### Example Numbering System:
\`\`\`
5200 - Software and Technology
5210 - Development Tools
5220 - Cloud Services
5230 - Security Software
5240 - Communication Tools
\`\`\`

## Setting Up Sub-accounts

For detailed tracking, create sub-accounts under main categories:

**Marketing Expenses (5300):**
- 5310 - Content Marketing
- 5320 - Paid Advertising
- 5330 - Social Media Marketing
- 5340 - Event Marketing
- 5350 - SEO Tools

## Tech Business Specific Considerations

### Revenue Recognition
Different types of tech revenue may need separate tracking:
- **Subscription Revenue**: Monthly recurring revenue (MRR)
- **One-time Sales**: Software licenses, custom development
- **Services**: Consulting, training, support

### Expense Categories for Tax Benefits
Properly categorize expenses that qualify for tax benefits:
- **Research & Development**: New feature development
- **Section 179 Deductions**: Equipment and software purchases
- **Business Meals**: Client meetings and team building
- **Home Office**: If working from home

## Common Mistakes to Avoid

### 1. Too Many Accounts
Don't create an account for every single vendor. Use broader categories with detailed descriptions in transaction memos.

**❌ Bad:** 5211 - Adobe Creative Cloud, 5212 - Figma, 5213 - Sketch
**✅ Good:** 5210 - Design Software (use transaction descriptions for details)

### 2. Inconsistent Categorization
Always use the same account for similar expenses. Create written procedures for consistency.

### 3. Personal vs. Business Confusion
Keep business and personal expenses completely separate. Never mix them in the same accounts.

## Action Steps

1. **Review Existing Transactions**: Look at 3-6 months of business transactions
2. **Identify Patterns**: What types of income and expenses do you have regularly?
3. **Create Account Structure**: Start with major categories, add detail as needed
4. **Document Decisions**: Write down what goes in each account
5. **Stay Flexible**: Accounts can be added or modified as your business grows

## Key Takeaways

- A well-organized chart of accounts is essential for business success
- Use a logical numbering system with room for growth  
- Focus on categories that matter for decision-making and tax planning
- Keep business and personal finances completely separate
- Start simple and add complexity as your business grows

Your chart of accounts should tell the story of your business and help you make informed decisions about growth, profitability, and tax optimization.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 90
      },
      {
        title: 'Software Business Account Structure Setup',
        slug: 'software-business-account-structure',
        content: `# Software Business Account Structure Setup

## Creating Your Account Structure Step-by-Step

Now that you understand the fundamentals, let's build a practical chart of accounts specifically for software businesses. This structure works whether you're a solo developer, small agency, or growing SaaS company.

## Complete Software Business Chart of Accounts

### ASSETS (1000-1999)

#### Current Assets (1000-1199)
\`\`\`
1000 - Business Checking Account
1010 - Business Savings Account  
1020 - PayPal Business Account
1030 - Stripe Account
1040 - Petty Cash
1100 - Accounts Receivable
1110 - Unbilled Revenue (Work in Progress)
1120 - Prepaid Expenses
1130 - Security Deposits
\`\`\`

#### Fixed Assets (1200-1399)
\`\`\`
1200 - Computer Equipment
1210 - Office Equipment
1220 - Furniture and Fixtures
1300 - Software Licenses (Long-term)
1310 - Domain Names
1320 - Intellectual Property
1330 - Accumulated Depreciation (contra-asset)
\`\`\`

### LIABILITIES (2000-2999)

#### Current Liabilities (2000-2199)
\`\`\`
2000 - Accounts Payable
2010 - Business Credit Card
2020 - Payroll Taxes Payable
2030 - Sales Tax Payable
2040 - Accrued Expenses
2050 - Customer Deposits/Prepayments
2060 - Deferred Revenue (for SaaS businesses)
\`\`\`

#### Long-term Liabilities (2200-2399)
\`\`\`
2200 - Business Loan
2210 - Equipment Financing
2220 - Line of Credit
\`\`\`

### EQUITY (3000-3999)
\`\`\`
3000 - Owner's Equity
3010 - Retained Earnings
3020 - Owner's Draws/Distributions
3030 - Additional Paid-in Capital (for corporations)
\`\`\`

### REVENUE (4000-4999)

#### Service Revenue (4000-4199)
\`\`\`
4000 - SaaS Subscription Revenue
4010 - Custom Development Revenue
4020 - Consulting Services
4030 - Training and Education
4040 - Support and Maintenance
4050 - One-time Software Sales
\`\`\`

#### Other Revenue (4200-4299)
\`\`\`
4200 - Affiliate Commissions
4210 - Referral Income
4220 - Interest Income
4230 - Other Income
\`\`\`

### COST OF GOODS SOLD (7000-7999)
\`\`\`
7000 - Hosting and Infrastructure
7010 - Cloud Services (AWS, Azure, GCP)
7020 - CDN and Data Transfer
7030 - Third-party APIs
7040 - Payment Processing Fees
7050 - Database and Storage
7060 - Security and Monitoring Services
\`\`\`

### OPERATING EXPENSES (5000-6999)

#### Personnel Expenses (5000-5199)
\`\`\`
5000 - Salaries and Wages
5010 - Contractor Payments (1099)
5020 - Payroll Taxes
5030 - Employee Benefits
5040 - Workers Compensation
5050 - Recruitment and Hiring
\`\`\`

#### Technology Expenses (5200-5399)
\`\`\`
5200 - Software Subscriptions
5210 - Development Tools
5220 - Design Software
5230 - Communication Tools
5240 - Project Management Software
5250 - Backup and Security Software
5260 - Analytics and Monitoring
5270 - Computer Equipment (under $2,500)
\`\`\`

#### Marketing and Sales (5400-5599)
\`\`\`
5400 - Advertising and Promotion
5410 - Content Marketing
5420 - Social Media Marketing
5430 - SEO and SEM Tools
5440 - Trade Shows and Events
5450 - Sales Tools and CRM
5460 - Public Relations
\`\`\`

#### Office and Administrative (5600-5799)
\`\`\`
5600 - Rent and Utilities
5610 - Internet and Phone
5620 - Office Supplies
5630 - Printing and Shipping
5640 - Insurance (General Liability, E&O)
5650 - Bank Fees
5660 - Accounting and Bookkeeping
5670 - Legal and Professional Services
\`\`\`

#### Business Development (5800-5999)
\`\`\`
5800 - Professional Development
5810 - Conferences and Training
5820 - Books and Resources
5830 - Memberships and Subscriptions
5840 - Networking Events
5850 - Business Meals
5860 - Travel and Transportation
\`\`\`

#### Other Expenses (6000-6199)
\`\`\`
6000 - Depreciation Expense
6010 - Bad Debt Expense
6020 - Interest Expense
6030 - Miscellaneous Expenses
\`\`\`

## Implementation Guidelines

### 1. Start with Core Accounts
Don't create every account immediately. Start with these essential accounts:

**Revenue:**
- 4000 - Primary Revenue Stream
- 4010 - Secondary Revenue Stream

**Expenses:**
- 5000 - Contractor Payments
- 5200 - Software Subscriptions  
- 5400 - Marketing
- 5600 - Office Expenses
- 7000 - Hosting/Infrastructure

### 2. Add Accounts as Needed
Create new accounts when:
- You need to track expenses for specific tax purposes
- An expense category becomes significant (>5% of total expenses)
- You need detailed reporting for business decisions

### 3. Quarterly Reviews
Every quarter, review your chart of accounts:
- Are there accounts you never use? Consider combining them
- Are there "miscellaneous" accounts that need to be broken out?
- Do you need additional detail for tax planning?

## Industry-Specific Considerations

### SaaS Businesses
Pay special attention to:
- **Deferred Revenue**: Money received but not yet earned
- **Customer Acquisition Cost**: Track marketing spend carefully
- **Monthly Recurring Revenue**: Separate from one-time revenue

### Development Agencies  
Consider these additional accounts:
- **Project Deposits**: Client prepayments
- **Work in Progress**: Unbilled time and materials
- **Subcontractor Costs**: External developers and specialists

### Solo Developers/Freelancers
Keep it simple with these core accounts:
- **Consulting Revenue** vs **Product Revenue**
- **Business Equipment** vs **Office Expenses**
- **Professional Development** for continuous learning

## Setting Up in Your Bookkeeping Software

### QuickBooks Online
1. Go to Settings → Chart of Accounts
2. Click "New" to add accounts
3. Select account type and detail type
4. Enter account number and name
5. Add description for clarity

### Xero
1. Go to Accounting → Chart of Accounts
2. Click "Add Account"
3. Choose account type and tax rate
4. Enter account code and name
5. Set reporting codes if needed

### FreshBooks
1. Go to Settings → Chart of Accounts
2. Click "Add New Account"
3. Select category and enter details
4. Choose whether to track expenses

## Pro Tips for Account Management

### 1. Use Consistent Naming
- Always use the same format: "5200 - Software Subscriptions"
- Include account numbers for easy reference
- Use descriptive but concise names

### 2. Document Your Decisions
Create a simple document that explains:
- What goes in each account
- Common transactions for each account
- When to create new accounts

### 3. Regular Maintenance
- Monthly: Review transactions for proper categorization
- Quarterly: Assess if new accounts are needed
- Annually: Archive unused accounts and reorganize if needed

## Common Setup Mistakes

### ❌ Too Granular Too Soon
Don't create separate accounts for every vendor or every small expense category.

### ❌ Mixing Account Types
Don't put asset purchases in expense accounts or vice versa.

### ❌ Inconsistent Numbering
Maintain your numbering system consistently across all accounts.

### ❌ No Documentation
Always document what belongs in each account to maintain consistency.

## Action Plan

1. **Choose Your Software**: Select bookkeeping software that fits your needs
2. **Create Core Structure**: Set up the essential accounts first
3. **Import or Enter Beginning Balances**: Start with accurate opening balances
4. **Test with Recent Transactions**: Enter a few transactions to test the structure
5. **Refine as Needed**: Adjust accounts based on your actual transaction patterns

## Key Takeaways

- Start simple and add complexity as your business grows
- Use consistent numbering and naming conventions
- Focus on accounts that help with tax planning and business decisions
- Document your account usage for consistency
- Review and refine your structure regularly

Your chart of accounts should make bookkeeping easier, not more complicated. A well-organized structure will save you time and money while providing valuable insights into your business performance.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 105
      }
    ];

    for (const lessonData of week1lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          weekId: week1.id
        }
      });
    }

    // Week 1 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'Chart of Accounts Mastery Quiz',
        description: 'Test your understanding of chart of accounts setup for software businesses',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 20,
        questions: {
          create: [
            {
              questionText: 'What is the primary purpose of a chart of accounts?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'To track customer information',
                'To organize and categorize all financial transactions',
                'To manage employee schedules',
                'To store product inventory data'
              ]),
              correctAnswer: 'To organize and categorize all financial transactions',
              explanation: 'A chart of accounts serves as the foundation of your bookkeeping system by organizing and categorizing every financial transaction.',
              orderIndex: 1
            },
            {
              questionText: 'Which account range is typically used for Revenue accounts?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '1000-1999',
                '2000-2999',
                '4000-4999',
                '5000-5999'
              ]),
              correctAnswer: '4000-4999',
              explanation: 'Revenue accounts are typically numbered in the 4000-4999 range in standard chart of accounts numbering.',
              orderIndex: 2
            },
            {
              questionText: 'For a SaaS business, which revenue account would be most appropriate for monthly subscription income?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '4050 - One-time Software Sales',
                '4000 - SaaS Subscription Revenue',
                '4020 - Consulting Services',
                '4200 - Affiliate Commissions'
              ]),
              correctAnswer: '4000 - SaaS Subscription Revenue',
              explanation: 'SaaS Subscription Revenue (4000) is the most appropriate account for tracking recurring monthly subscription income.',
              orderIndex: 3
            },
            {
              questionText: 'What type of expense would "AWS hosting costs" be categorized as?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Operating Expense',
                'Cost of Goods Sold',
                'Asset',
                'Liability'
              ]),
              correctAnswer: 'Cost of Goods Sold',
              explanation: 'AWS hosting costs are directly related to delivering your software service and should be categorized as Cost of Goods Sold.',
              orderIndex: 4
            },
            {
              questionText: 'When setting up account numbers, what is a best practice?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Use consecutive numbers with no gaps',
                'Leave gaps between numbers for future expansion',
                'Only use even numbers',
                'Mix numbers and letters randomly'
              ]),
              correctAnswer: 'Leave gaps between numbers for future expansion',
              explanation: 'Leaving gaps between account numbers (like 5000, 5010, 5020) allows you to add new related accounts in the future while maintaining organization.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 1 created with 2 lessons and 1 quiz');

    // Continue with remaining weeks...
    // Week 2: Recording Revenue (SaaS, Project-based, Retainer)
    const week2 = await prisma.week.create({
      data: {
        courseId: course4.id,
        weekNumber: 2,
        title: 'Recording Revenue (SaaS, Project-based, Retainer)',
        overview: 'Master revenue recognition principles and practical recording techniques for different types of software business revenue streams.',
        learningObjectives: JSON.stringify([
          'Understand revenue recognition principles for software businesses',
          'Record SaaS subscription revenue correctly',
          'Handle project-based and milestone billing',
          'Manage retainer and prepaid revenue',
          'Deal with refunds, chargebacks, and revenue adjustments'
        ]),
        estimatedHours: 8
      }
    });

    const week2lessons = [
      {
        title: 'Revenue Recognition Fundamentals for Tech Businesses',
        slug: 'revenue-recognition-fundamentals',
        content: `# Revenue Recognition Fundamentals for Tech Businesses

## Understanding Revenue Recognition

Revenue recognition is one of the most important concepts in business accounting. It determines **when** you record revenue, not just **how much**. For tech businesses, this can be particularly complex due to various revenue streams and payment structures.

## The Revenue Recognition Principle

### Core Principle
Revenue should be recognized when it is **earned**, not necessarily when cash is received.

**Key Questions:**
- When have you fulfilled your obligation to the customer?
- What performance obligations do you have?
- Over what period should revenue be recognized?

## Revenue Recognition for Different Business Models

### 1. SaaS (Software as a Service)

#### Monthly Subscriptions
**Scenario:** Customer pays $100/month for your project management software.

**Recognition:** Revenue is earned over time as you provide the service.
- January payment of $100 = $100 revenue in January
- February payment of $100 = $100 revenue in February

**Journal Entry (Monthly):**
\`\`\`
Debit: Cash                     $100
Credit: SaaS Subscription Revenue  $100
\`\`\`

#### Annual Subscriptions Paid Upfront
**Scenario:** Customer pays $1,200 for a full year upfront.

**Recognition:** Revenue must be spread over 12 months ($100/month).

**Initial Entry (when payment received):**
\`\`\`
Debit: Cash                    $1,200
Credit: Deferred Revenue       $1,200
\`\`\`

**Monthly Recognition Entry:**
\`\`\`
Debit: Deferred Revenue         $100
Credit: SaaS Subscription Revenue  $100
\`\`\`

### 2. Custom Development Projects

#### Fixed-Price Projects
**Scenario:** $50,000 website development project, 3-month timeline.

**Options for Recognition:**

**Method 1: Percentage of Completion**
Recognize revenue based on work completed.
- Month 1: 30% complete = $15,000 revenue
- Month 2: 60% complete = $15,000 revenue  
- Month 3: 100% complete = $20,000 revenue

**Method 2: Milestone-Based**
Recognize revenue when specific milestones are completed.
- Design approval: $15,000
- Development completion: $25,000
- Final delivery: $10,000

#### Time and Materials Projects
**Scenario:** $150/hour consulting, bill monthly.

**Recognition:** Revenue recognized as hours are worked.

**Monthly Entry:**
\`\`\`
Debit: Accounts Receivable     $6,000
Credit: Consulting Revenue     $6,000
(40 hours × $150/hour)
\`\`\`

### 3. Retainer Arrangements

#### Monthly Retainer
**Scenario:** Client pays $5,000/month retainer for ongoing support.

**Recognition:** Similar to subscription revenue, recognized monthly.

**Monthly Entry:**
\`\`\`
Debit: Cash                    $5,000
Credit: Support Services Revenue  $5,000
\`\`\`

#### Prepaid Retainer
**Scenario:** Client pays $15,000 for 3 months of services upfront.

**Initial Entry:**
\`\`\`
Debit: Cash                    $15,000
Credit: Deferred Revenue       $15,000
\`\`\`

**Monthly Recognition:**
\`\`\`
Debit: Deferred Revenue         $5,000
Credit: Support Services Revenue  $5,000
\`\`\`

## Key Accounting Concepts

### Deferred Revenue (Unearned Revenue)
Money received from customers for services not yet provided.
- **Balance Sheet:** Listed as a liability
- **Common in:** Annual subscriptions, prepaid services, project deposits

### Accounts Receivable
Money owed by customers for services already provided.
- **Balance Sheet:** Listed as an asset
- **Common in:** Monthly billing, completed projects awaiting payment

### Accrued Revenue
Revenue earned but not yet billed or received.
- **Balance Sheet:** Listed as an asset
- **Common in:** Time-based billing, work completed but not invoiced

## Practical Revenue Recording Examples

### Example 1: SaaS Business - Mixed Billing

**Business:** Task management software
**Pricing:** $29/month or $290/year (2 months free)

**January Transactions:**
- 100 monthly subscribers pay $29 each = $2,900
- 20 annual subscribers pay $290 each = $5,800

**Revenue Recognition:**
- Monthly: $2,900 (immediate recognition)
- Annual: $5,800 ÷ 12 months = $483.33/month

**Journal Entries:**

**For Monthly Subscriptions:**
\`\`\`
Debit: Cash                     $2,900
Credit: SaaS Subscription Revenue  $2,900
\`\`\`

**For Annual Subscriptions:**
\`\`\`
Debit: Cash                     $5,800
Credit: Deferred Revenue        $5,800

Monthly Recognition:
Debit: Deferred Revenue         $483.33
Credit: SaaS Subscription Revenue  $483.33
\`\`\`

### Example 2: Development Agency - Project Mix

**Current Projects:**
1. E-commerce site: $40,000 fixed price, 60% complete
2. Mobile app: $25,000 fixed price, completed and delivered
3. Ongoing maintenance: $2,000/month retainer

**Revenue Recognition:**
1. E-commerce: $40,000 × 60% = $24,000
2. Mobile app: $25,000 (full recognition)
3. Maintenance: $2,000 (monthly recognition)

**Journal Entries:**

**E-commerce Project (Progressive Billing):**
\`\`\`
Debit: Accounts Receivable      $24,000
Credit: Custom Development Revenue $24,000
\`\`\`

**Mobile App (Completion):**
\`\`\`
Debit: Accounts Receivable      $25,000
Credit: Custom Development Revenue $25,000
\`\`\`

**Maintenance Retainer:**
\`\`\`
Debit: Cash                     $2,000
Credit: Maintenance Revenue     $2,000
\`\`\`

## Special Situations

### Refunds and Credits
**Scenario:** Customer requests $100 refund for unused subscription time.

**Entry:**
\`\`\`
Debit: SaaS Subscription Revenue  $100
Credit: Cash (or Accounts Payable)  $100
\`\`\`

### Chargebacks and Disputed Charges
**Scenario:** $500 chargeback from credit card company.

**Entry:**
\`\`\`
Debit: Chargeback Expense       $500
Credit: Cash                    $500
\`\`\`

### Payment Processing Fees
**Scenario:** Stripe charges 2.9% + $0.30 per transaction.
**Customer Payment:** $100

**Net Settlement Entry:**
\`\`\`
Debit: Cash                     $96.80
Debit: Payment Processing Fees  $3.20
Credit: SaaS Subscription Revenue $100.00
\`\`\`

## Revenue Recognition Calendar

### Monthly Tasks
- [ ] Record all subscription revenue
- [ ] Bill project milestones completed
- [ ] Recognize deferred revenue earned
- [ ] Update project completion percentages

### Quarterly Tasks
- [ ] Review deferred revenue balances
- [ ] Analyze revenue trends by stream
- [ ] Reconcile revenue accounts
- [ ] Document any recognition policy changes

## Common Mistakes to Avoid

### ❌ Recognizing Revenue Too Early
Don't record revenue until you've earned it by providing the service or product.

### ❌ Mixing Cash and Accrual Methods
Be consistent with your revenue recognition method throughout your business.

### ❌ Forgetting Deferred Revenue
Annual subscriptions and prepayments must be recorded as deferred revenue initially.

### ❌ Not Tracking Project Progress
For fixed-price projects, track completion percentage to ensure accurate revenue recognition.

## Revenue Recognition Policies

Document your revenue recognition policies:

### Subscription Services
- Monthly subscriptions: Recognized monthly as service is provided
- Annual subscriptions: Recognized monthly over 12-month period
- Setup fees: Recognized when setup is completed

### Custom Development
- Fixed-price projects: Percentage of completion method
- Time and materials: As hours are worked and billable
- Milestone projects: When each milestone is completed

### Support and Maintenance
- Monthly retainers: Recognized monthly
- Prepaid support: Recognized as services are consumed

## Key Takeaways

- Revenue recognition is about **when** you earned the money, not when you received it
- Deferred revenue is a liability that becomes revenue over time
- Different business models require different recognition approaches
- Consistency in your recognition policies is crucial
- Document your policies and follow them consistently

Proper revenue recognition ensures accurate financial reporting and helps you understand your true business performance. It's also essential for tax compliance and investor reporting.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 95
      },
      {
        title: 'Practical Revenue Recording and Invoice Management',
        slug: 'practical-revenue-recording',
        content: `# Practical Revenue Recording and Invoice Management

## Setting Up Your Revenue Recording System

Now that you understand the principles, let's implement a practical system for recording revenue in your bookkeeping software. This system will handle multiple revenue streams while maintaining accuracy and compliance.

## Invoice Management Workflow

### 1. Invoice Creation Process

#### SaaS Businesses - Subscription Billing

**Monthly Recurring Billing Setup:**

**In QuickBooks Online:**
1. Set up Recurring Transactions
   - Go to Sales → Recurring Transactions
   - Create template with customer details
   - Set frequency (monthly, annually)
   - Choose start and end dates

**Sample Invoice Template:**
\`\`\`
Invoice #: INV-2024-0001
Customer: TechCorp Inc.
Date: January 1, 2024

Line Items:
- Project Management Software (Monthly) - $100.00
- Additional Users (5 × $20) - $100.00
- Advanced Analytics Add-on - $50.00

Subtotal: $250.00
Tax: $0.00 (most software services are not taxable)
Total: $250.00

Terms: Due on receipt
\`\`\`

#### Development Agencies - Project Billing

**Project-Based Invoice Structure:**
\`\`\`
Invoice #: PRJ-2024-0015
Customer: StartupXYZ
Project: E-commerce Platform Development
Date: January 15, 2024

Phase 1: Design and Planning
- UI/UX Design (40 hours × $125) - $5,000.00
- Project Planning (8 hours × $150) - $1,200.00

Phase 2: Development (50% Complete)
- Frontend Development (60 hours × $125) - $7,500.00
- Backend Development (40 hours × $135) - $5,400.00

Total: $19,100.00
Tax: $0.00
Terms: Net 30
\`\`\`

### 2. Revenue Recognition Entries

#### Immediate Recognition (Services Delivered)

**For monthly subscriptions and completed work:**

**QuickBooks Entry:**
1. Create Invoice
2. System automatically creates:
   \`\`\`
   Debit: Accounts Receivable    $250.00
   Credit: SaaS Revenue         $250.00
   \`\`\`

3. When payment received:
   \`\`\`
   Debit: Cash                  $250.00
   Credit: Accounts Receivable  $250.00
   \`\`\`

#### Deferred Revenue (Prepaid Services)

**Annual subscription paid upfront:**

**Step 1: Create Invoice and Receive Payment**
\`\`\`
Invoice Amount: $2,400 (annual subscription)
Payment Terms: Paid in advance
\`\`\`

**Step 2: Adjust to Deferred Revenue**
Manual Journal Entry:
\`\`\`
Debit: Revenue Account          $2,400
Credit: Deferred Revenue        $2,400
(To defer annual subscription)
\`\`\`

**Step 3: Monthly Recognition**
Create monthly recurring journal entry:
\`\`\`
Debit: Deferred Revenue         $200
Credit: SaaS Revenue           $200
(Monthly recognition: $2,400 ÷ 12)
\`\`\`

## Revenue Tracking by Stream

### Setting Up Revenue Categories

Create detailed revenue accounts for different income streams:

**SaaS Business Revenue Accounts:**
- 4000 - Basic Subscription Revenue
- 4010 - Premium Subscription Revenue  
- 4020 - Enterprise Subscription Revenue
- 4030 - Add-on Services Revenue
- 4040 - Setup and Onboarding Fees

**Development Agency Revenue Accounts:**
- 4100 - Custom Development Revenue
- 4110 - Consulting Services Revenue
- 4120 - Maintenance and Support Revenue
- 4130 - Training Services Revenue
- 4140 - Emergency Support Revenue

### Revenue Reporting Structure

#### Monthly Revenue Dashboard

**Key Metrics to Track:**

**For SaaS:**
- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- New MRR vs. Churned MRR
- Average Revenue Per User (ARPU)

**For Agencies:**
- Billable Hours Utilized
- Average Hourly Rate
- Project Profit Margins
- Client Retention Rate

**Sample Monthly Revenue Report:**
\`\`\`
REVENUE SUMMARY - January 2024

SaaS Subscriptions:
- Basic Plans (50 × $50)           $2,500
- Premium Plans (25 × $150)        $3,750  
- Enterprise Plans (5 × $500)      $2,500
Total MRR                          $8,750

One-time Services:
- Setup Fees                       $1,200
- Custom Development               $15,000
- Training Services                $2,500
Total One-time                     $18,700

TOTAL REVENUE                      $27,450
\`\`\`

## Payment Processing Integration

### Automated Revenue Recording

#### Stripe Integration
Most bookkeeping software can integrate with Stripe:

**Automatic Entries Created:**
\`\`\`
When customer pays $100 subscription:

Debit: Stripe Account             $97.10
Debit: Payment Processing Fees    $2.90
Credit: SaaS Revenue             $100.00
\`\`\`

#### PayPal Integration
Similar automation for PayPal payments:
\`\`\`
Customer pays $500 invoice:

Debit: PayPal Account            $485.50
Debit: Payment Processing Fees   $14.50
Credit: Consulting Revenue       $500.00
\`\`\`

### Manual Payment Recording

For checks, wire transfers, or other payments:

**Check Received:**
1. Create Bank Deposit
2. Select customer and invoice
3. Choose deposit account
4. System creates:
   \`\`\`
   Debit: Checking Account         $1,000
   Credit: Accounts Receivable     $1,000
   \`\`\`

## Project Revenue Management

### Work-in-Progress Tracking

For ongoing projects, track unbilled work:

**Time Entry System:**
- Track hours by project and task
- Set billing rates by role/person
- Generate progress reports

**Monthly WIP Entry:**
\`\`\`
Work completed but not billed:
Developer hours: 40 × $125 = $5,000
Design hours: 15 × $100 = $1,500
Total WIP: $6,500

Journal Entry:
Debit: Work in Progress Asset     $6,500
Credit: Development Revenue       $6,500
\`\`\`

**When Invoice is Created:**
\`\`\`
Debit: Accounts Receivable        $6,500
Debit: Development Revenue        $6,500
Credit: Work in Progress Asset    $6,500
Credit: Development Revenue       $6,500
(Net effect: Converts WIP to A/R)
\`\`\`

### Milestone Billing

Track project progress and bill at milestones:

**Project Setup:**
- Define 4 milestones at 25% each
- Total project value: $40,000
- Each milestone: $10,000

**Progress Tracking:**
\`\`\`
Milestone 1: Design Complete (25%)
Invoice: $10,000
Status: Billed and collected

Milestone 2: Development (50%)  
Invoice: $10,000
Status: Billed, pending payment

Milestone 3: Testing (75%)
Status: In progress, not billable yet

Milestone 4: Deployment (100%)
Status: Not started
\`\`\`

## Managing Revenue Adjustments

### Credits and Refunds

**Customer Service Credit:**
\`\`\`
Customer receives $50 credit for service issues:

Debit: Customer Service Expense   $50
Credit: Accounts Receivable       $50
\`\`\`

**Full Refund:**
\`\`\`
Refund $200 subscription:

Debit: SaaS Revenue              $200
Credit: Cash                     $200
\`\`\`

### Revenue Corrections

**Incorrect Revenue Recognition:**
\`\`\`
Originally recorded $5,000 as current revenue
Should have been deferred over 5 months

Correction Entry:
Debit: Revenue Account           $4,000
Credit: Deferred Revenue         $4,000
(Defer 4 months worth: $5,000 - $1,000)
\`\`\`

## Quality Control Procedures

### Monthly Revenue Review Checklist

- [ ] **Subscription Revenue**
  - [ ] All monthly subscriptions billed
  - [ ] Annual subscriptions properly deferred
  - [ ] New customers set up correctly
  - [ ] Cancelled subscriptions removed

- [ ] **Project Revenue**
  - [ ] Project progress updated
  - [ ] Milestone billing completed
  - [ ] WIP calculations accurate
  - [ ] Change orders documented

- [ ] **Payment Processing**
  - [ ] All payments reconciled
  - [ ] Processing fees recorded
  - [ ] Failed payments followed up
  - [ ] Chargebacks investigated

### Revenue Recognition Validation

**Monthly Questions:**
1. Does revenue match cash flow expectations?
2. Are deferred revenue balances reasonable?
3. Have all completed milestones been billed?
4. Are revenue recognition policies being followed consistently?

## Revenue Forecasting

### SaaS Revenue Projections

**MRR Growth Model:**
\`\`\`
Current MRR: $10,000
New customer rate: 10 per month × $50 = $500
Churn rate: 5% monthly = ($500)
Net MRR growth: $500 - $500 = $0

Month 2 projected MRR: $10,000
Month 3 projected MRR: $10,000
\`\`\`

### Project Revenue Pipeline

**Agency Revenue Forecast:**
\`\`\`
Current Pipeline:
- Proposal Stage: $75,000 (30% close rate)
- Negotiation Stage: $45,000 (60% close rate)
- Contract Stage: $25,000 (90% close rate)

Expected Revenue:
- Proposal: $75,000 × 30% = $22,500
- Negotiation: $45,000 × 60% = $27,000  
- Contract: $25,000 × 90% = $22,500
Total Expected: $72,000
\`\`\`

## Key Takeaways

- Set up automated systems for recurring revenue
- Use different revenue accounts for different streams
- Track work-in-progress for accurate financial reporting
- Implement quality control procedures for accuracy
- Regular review and reconciliation prevents errors
- Document all revenue recognition policies and procedures

A well-organized revenue recording system provides accurate financial data for decision-making and ensures compliance with accounting standards. The key is consistency and regular review to maintain accuracy.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 110
      }
    ];

    for (const lessonData of week2lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          weekId: week2.id
        }
      });
    }

    // Week 2 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week2.id,
        title: 'Revenue Recognition Mastery Quiz',
        description: 'Test your understanding of revenue recognition for different software business models',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'A customer pays $1,200 for a full year SaaS subscription upfront. How should this be initially recorded?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Debit Cash $1,200, Credit SaaS Revenue $1,200',
                'Debit Cash $1,200, Credit Deferred Revenue $1,200',
                'Debit Accounts Receivable $1,200, Credit SaaS Revenue $1,200',
                'Debit SaaS Revenue $1,200, Credit Cash $1,200'
              ]),
              correctAnswer: 'Debit Cash $1,200, Credit Deferred Revenue $1,200',
              explanation: 'Annual subscriptions paid upfront should be recorded as deferred revenue initially, then recognized monthly as the service is provided.',
              orderIndex: 1
            },
            {
              questionText: 'What should be done with the deferred revenue each month for the $1,200 annual subscription?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Nothing, leave it as deferred revenue',
                'Move $100 from deferred revenue to SaaS revenue',
                'Move $1,200 from deferred revenue to SaaS revenue',
                'Move $300 from deferred revenue to SaaS revenue'
              ]),
              correctAnswer: 'Move $100 from deferred revenue to SaaS revenue',
              explanation: 'Each month, $100 ($1,200 ÷ 12 months) should be moved from deferred revenue to SaaS revenue as the service is provided.',
              orderIndex: 2
            },
            {
              questionText: 'For a $50,000 fixed-price development project that is 60% complete, how much revenue should be recognized using the percentage of completion method?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$0 (wait until completion)',
                '$30,000',
                '$50,000',
                '$20,000'
              ]),
              correctAnswer: '$30,000',
              explanation: 'Using percentage of completion method: $50,000 × 60% = $30,000 should be recognized as revenue.',
              orderIndex: 3
            },
            {
              questionText: 'When a customer pays through Stripe and you receive $97.10 net after fees for a $100 subscription, what accounts are affected?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Cash $100, SaaS Revenue $100',
                'Cash $97.10, Payment Processing Fees $2.90, SaaS Revenue $100',
                'Cash $97.10, SaaS Revenue $97.10',
                'Accounts Receivable $100, SaaS Revenue $100'
              ]),
              correctAnswer: 'Cash $97.10, Payment Processing Fees $2.90, SaaS Revenue $100',
              explanation: 'The full revenue ($100) should be recorded, with payment processing fees ($2.90) recorded as an expense, and net cash ($97.10) deposited.',
              orderIndex: 4
            },
            {
              questionText: 'What is "Work in Progress" (WIP) in the context of development projects?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Projects that have been started but not completed',
                'Work completed but not yet billed to the customer',
                'Cash received but services not yet provided',
                'Equipment purchased for future projects'
              ]),
              correctAnswer: 'Work completed but not yet billed to the customer',
              explanation: 'Work in Progress represents work that has been completed and should be recognized as revenue, but has not yet been billed to the customer.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 2 created with 2 lessons and 1 quiz');

    // Week 3: Expense Categorization and Tracking
    const week3 = await prisma.week.create({
      data: {
        courseId: course4.id,
        weekNumber: 3,
        title: 'Expense Categorization and Tracking',
        overview: 'Learn to properly categorize, track, and optimize business expenses for tax benefits and financial insights.',
        learningObjectives: JSON.stringify([
          'Categorize business expenses correctly for tax purposes',
          'Set up expense tracking systems and workflows',
          'Maximize tax deductions through proper documentation',
          'Handle personal vs business expense separation',
          'Implement approval processes and spending controls'
        ]),
        estimatedHours: 8
      }
    });

    const week3lessons = [
      {
        title: 'Business Expense Categories and Tax Optimization',
        slug: 'business-expense-categories-tax',
        content: `# Business Expense Categories and Tax Optimization

## Understanding Business Expenses

Proper expense categorization is crucial for tax compliance, financial analysis, and business decision-making. For tech businesses, understanding what qualifies as a deductible business expense can save thousands in taxes while providing insights into spending patterns.

## Fundamental Expense Categories

### 1. Cost of Goods Sold (COGS)
Direct costs related to delivering your product or service.

**For Software Businesses:**
- **Cloud hosting and infrastructure** (AWS, Azure, Google Cloud)
- **Third-party APIs and services** (Stripe, Twilio, SendGrid)
- **Content delivery networks** (CloudFlare, Amazon CloudFront)
- **Database and storage services**
- **Payment processing fees**
- **Direct labor** (developers working on billable projects)

**Tax Benefits:**
- COGS reduces gross income directly
- No limitations on deductibility
- Can be matched directly to revenue

**Example COGS Calculation:**
\`\`\`
Monthly SaaS Revenue: $50,000
COGS Breakdown:
- AWS hosting: $2,500
- Third-party APIs: $1,200
- Payment processing (2.9%): $1,450
- CDN services: $300
Total COGS: $5,450
Gross Profit: $44,550 (89.1% gross margin)
\`\`\`

### 2. Operating Expenses

#### Technology and Software (Account 5200s)
Essential for modern tech businesses.

**Fully Deductible Expenses:**
- **Development tools**: IDEs, code editors, version control
- **Design software**: Adobe Creative Suite, Figma, Sketch  
- **Project management**: Asana, Jira, Monday.com
- **Communication tools**: Slack, Zoom, Microsoft Teams
- **Analytics and monitoring**: Google Analytics, New Relic, DataDog
- **Security software**: Antivirus, VPNs, security monitoring
- **Backup and storage**: Dropbox, Google Workspace, Box

**Special Considerations:**
- Software purchases over $2,500 may need to be capitalized and depreciated
- Subscriptions are immediately deductible
- Personal use portions must be excluded

**Example Monthly Software Expenses:**
\`\`\`
Category: Software Subscriptions (5200)
- GitHub Enterprise: $200
- Adobe Creative Cloud: $150
- Slack Pro: $300
- Zoom Pro: $150
- Google Workspace: $180
- Monday.com: $120
Total: $1,100/month = $13,200/year deduction
\`\`\`

#### Marketing and Advertising (Account 5400s)
Critical for business growth and fully deductible.

**Digital Marketing:**
- **Paid advertising**: Google Ads, Facebook Ads, LinkedIn Ads
- **SEO tools**: SEMrush, Ahrefs, Moz
- **Email marketing**: Mailchimp, ConvertKit, Klaviyo
- **Social media management**: Hootsuite, Buffer, Sprout Social
- **Content creation**: Stock photos, video tools, design assets
- **Marketing automation**: HubSpot, Marketo, Pardot

**Traditional Marketing:**
- **Trade shows and conferences**: Booth fees, materials, travel
- **Print materials**: Business cards, brochures, signage
- **Public relations**: PR agencies, press release distribution
- **Networking events**: Meetup costs, industry events

**Content Marketing:**
- **Blog and content tools**: WordPress hosting, premium themes
- **Video production**: Equipment, editing software, hosting
- **Podcast production**: Hosting, equipment, editing services
- **Webinar platforms**: GoToWebinar, WebEx, Demio

#### Professional Development (Account 5800s)
Investment in skills and knowledge is fully deductible.

**Training and Education:**
- **Online courses**: Udemy, Coursera, Pluralsight, MasterClass
- **Professional certifications**: AWS, Google Cloud, Microsoft Azure
- **Industry conferences**: Registration, travel, accommodation
- **Books and publications**: Technical books, industry magazines
- **Workshops and seminars**: Local and online training events

**Professional Memberships:**
- **Industry associations**: Local developer groups, professional organizations
- **Software licenses for learning**: Personal development tools
- **Mastermind groups and coaching**: Business coaching, peer groups

### 3. Office and Administrative Expenses (Account 5600s)

#### Home Office Expenses
If you work from home, you can deduct home office expenses.

**Two Methods:**

**Simplified Method:**
- $5 per square foot of home office space
- Maximum 300 square feet = $1,500/year maximum
- No depreciation calculations needed
- Cannot deduct actual expenses

**Actual Expense Method:**
Calculate percentage of home used for business:
\`\`\`
Home office: 200 sq ft
Total home: 2,000 sq ft  
Business use: 10%

Deductible expenses (10% of each):
- Mortgage interest: $15,000 × 10% = $1,500
- Property taxes: $8,000 × 10% = $800
- Utilities: $3,600 × 10% = $360
- Home insurance: $1,200 × 10% = $120
- Repairs and maintenance: $2,000 × 10% = $200
Total: $2,980/year
\`\`\`

#### Business Insurance
Essential protection and fully deductible.

**Types of Insurance:**
- **General liability**: Protects against lawsuits
- **Professional liability/E&O**: Covers professional mistakes
- **Cyber liability**: Data breach and cyber attack protection
- **Business property**: Equipment and office contents
- **Workers compensation**: If you have employees
- **Key person life insurance**: On critical business members

### 4. Travel and Transportation (Account 5860s)

#### Business Travel
Fully deductible when for legitimate business purposes.

**Deductible Travel Expenses:**
- **Airfare and transportation**: Flights, trains, buses, car rentals
- **Lodging**: Hotels, short-term rentals
- **Meals**: 50% deductible (100% in 2021-2022 due to COVID relief)
- **Business activities**: Conference fees, client entertainment
- **Communication**: Internet, phone calls while traveling

**Documentation Required:**
- Purpose of travel
- Dates and locations
- Business relationship of people met
- Receipts for all expenses over $75

#### Local Transportation
**Vehicle Options:**

**Standard Mileage Rate (2024: $0.67/mile):**
- Track business miles driven
- Multiply by IRS standard rate
- Simpler record-keeping
- Cannot deduct actual car expenses

**Actual Expense Method:**
- Track all vehicle expenses
- Calculate business use percentage
- More complex but potentially higher deduction

**Example:**
\`\`\`
Annual business miles: 15,000
Standard mileage: 15,000 × $0.67 = $10,050 deduction

vs.

Total car expenses: $18,000
Business use: 60%
Actual method: $18,000 × 60% = $10,800 deduction
\`\`\`

### 5. Meals and Entertainment

#### Business Meals
Generally 50% deductible, with exceptions.

**100% Deductible (2021-2022):**
- Restaurant meals for business purposes
- Company holiday parties and team events
- Meals provided for employee convenience

**50% Deductible:**
- Client meals and entertainment
- Meals while traveling for business
- Meals during business conferences

**Documentation Required:**
- Date, location, and amount
- Business purpose
- Business relationship of attendees
- Receipt (required for expenses over $75)

## Tax-Advantaged Expense Strategies

### 1. Equipment Purchases

#### Section 179 Deduction
Immediately deduct equipment purchases up to $1,160,000 (2023 limit).

**Qualifying Equipment:**
- Computers and servers
- Software (if purchased, not subscribed)
- Office furniture and fixtures
- Manufacturing equipment
- Vehicles (with limitations)

**Example:**
\`\`\`
Purchase new development workstations: $25,000
Section 179 election: Deduct full $25,000 in year of purchase
Tax savings (25% bracket): $6,250
\`\`\`

#### Bonus Depreciation
100% bonus depreciation available for new equipment (phasing down after 2022).

### 2. Research and Development

#### R&D Tax Credits
Credits for developing new software or improving existing products.

**Qualifying Activities:**
- New feature development
- Algorithm improvements
- Technical problem-solving
- Software optimization

**Documentation:**
- Time tracking for R&D activities
- Project descriptions and goals
- Technical challenges overcome
- Resources dedicated to R&D

### 3. Startup Costs

#### Business Startup Deductions
First-year deduction up to $5,000 for startup costs, with remainder amortized over 15 years.

**Qualifying Startup Costs:**
- Market research and analysis
- Legal and professional fees for business formation
- Training employees before business begins
- Travel expenses for securing customers or suppliers

## Expense Tracking Best Practices

### 1. Separation of Personal and Business

#### Business Credit Card
Use dedicated business credit card for all business expenses.

**Benefits:**
- Clear expense separation
- Built-in expense tracking
- Rewards and benefits
- Easier tax preparation

#### Business Bank Account
Maintain separate business checking account.

**Rules:**
- Never pay personal expenses from business account
- Never pay business expenses from personal account
- Transfer money between accounts as owner draws/contributions

### 2. Documentation Requirements

#### Receipt Management
**Digital Solutions:**
- **Receipt Bank**: Automated expense categorization
- **Expensify**: Mobile app for receipt capture
- **Shoeboxed**: Mail-in receipt processing
- **QuickBooks Mobile**: Built-in receipt capture

**What to Track:**
- Date and amount of expense
- Business purpose
- People involved (if meal or entertainment)
- Method of payment

### 3. Regular Review Process

#### Monthly Expense Review
- [ ] Categorize all expenses correctly
- [ ] Ensure business purpose is documented
- [ ] Review for personal expenses to remove
- [ ] Check for missing receipts
- [ ] Analyze spending patterns

#### Quarterly Tax Planning
- [ ] Review deductions taken year-to-date
- [ ] Plan major purchases for optimal timing
- [ ] Assess quarterly tax payment needs
- [ ] Evaluate expense trends vs. budget

## Key Takeaways

- Proper expense categorization maximizes tax deductions
- Maintain strict separation between personal and business expenses
- Document business purpose for all expenses
- Take advantage of special deductions like Section 179 and R&D credits
- Use technology to streamline expense tracking and documentation
- Regular review ensures accuracy and optimization

Understanding and implementing proper expense management can save significant money on taxes while providing valuable business insights. The key is consistency, documentation, and staying current with tax law changes.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 115
      },
      {
        title: 'Expense Tracking Systems and Workflows',
        slug: 'expense-tracking-systems-workflows',
        content: `# Expense Tracking Systems and Workflows

## Building an Effective Expense Management System

An efficient expense tracking system saves time, ensures accuracy, and maximizes tax deductions. For tech businesses, automation and integration are key to managing expenses without creating administrative burden.

## Expense Management Workflow Design

### 1. The Complete Expense Lifecycle

**Step 1: Expense Incurred**
- Purchase made with business credit card or cash
- Receipt generated (physical or digital)
- Business purpose documented

**Step 2: Expense Capture**
- Receipt photographed or saved digitally
- Expense details recorded (amount, vendor, category, purpose)
- Uploaded to expense management system

**Step 3: Expense Review**
- Manager/owner reviews expense for legitimacy
- Business purpose validated
- Proper categorization confirmed

**Step 4: Expense Processing**
- Expense approved and coded to correct account
- Recorded in bookkeeping system
- Receipt stored for tax records

**Step 5: Expense Analysis**
- Monthly spending review
- Budget variance analysis
- Tax planning consideration

### 2. Technology Stack for Expense Management

#### Core Expense Management Platforms

**Expensify**
- **Best for:** Teams with frequent travel and mixed expenses
- **Features:**
  - SmartScan receipt OCR technology
  - Automatic expense categorization
  - Mileage tracking with GPS
  - Integration with accounting software
  - Approval workflows

**Cost:** $5/month per user

**Setup Example:**
\`\`\`
Expense Categories:
- Meals (50% deductible)
- Travel (100% deductible)  
- Software (100% deductible)
- Office Supplies (100% deductible)
- Marketing (100% deductible)

Approval Rules:
- Under $25: Auto-approve
- $25-$100: Manager approval
- Over $100: Owner approval + receipt required
\`\`\`

**Receipt Bank (now Dext)**
- **Best for:** Service businesses with high receipt volume
- **Features:**
  - Professional receipt processing
  - Human verification of data
  - Direct integration with QuickBooks/Xero
  - Email receipt processing

**Cost:** $35-75/month depending on volume

**QuickBooks Online Mobile**
- **Best for:** Small businesses already using QuickBooks
- **Features:**
  - Built-in receipt capture
  - GPS mileage tracking
  - Direct integration with QuickBooks
  - Free with QuickBooks subscription

#### Specialized Tools

**MileIQ**
- **Best for:** Businesses with significant vehicle use
- **Features:**
  - Automatic drive detection
  - Business/personal classification
  - IRS-ready mileage logs
  - Integration with expense platforms

**Cost:** $5.99/month

**FreshBooks**
- **Best for:** Service businesses needing time tracking + expenses
- **Features:**
  - Time and expense tracking
  - Project-based expense allocation
  - Client expense reimbursement
  - Professional invoicing

**Cost:** $15-50/month

### 3. Bookkeeping Software Integration

#### QuickBooks Online Setup

**Chart of Accounts for Expenses:**
\`\`\`
5000-5099: Personnel
5000 - Salaries and Wages
5010 - Contractor Payments
5020 - Payroll Taxes
5030 - Employee Benefits

5100-5199: Office and Admin
5100 - Rent and Utilities
5110 - Office Supplies
5120 - Phone and Internet
5130 - Insurance

5200-5299: Technology
5200 - Software Subscriptions
5210 - Computer Equipment
5220 - Cloud Services
5230 - Website and Hosting

5300-5399: Marketing
5300 - Advertising
5310 - Content Marketing
5320 - Trade Shows
5330 - SEO Tools

5400-5499: Professional Services
5400 - Legal Fees
5410 - Accounting Services
5420 - Consulting
5430 - Bank Fees

5500-5599: Travel and Transport
5500 - Business Travel
5510 - Local Transportation
5520 - Business Meals (50%)
5530 - Parking and Tolls
\`\`\`

**Automated Rules Setup:**
\`\`\`
Bank Rule Examples:

Amazon.com → Office Supplies (review required)
Adobe → Software Subscriptions (auto-approve)
Starbucks → Business Meals 50% (review required)
Shell Gas → Vehicle Expenses (auto-approve)
American Airlines → Business Travel (review required)
\`\`\`

#### Xero Integration

**Expense Claims Workflow:**
1. Employee submits expense via mobile app
2. Manager receives notification for approval
3. Approved expenses auto-post to correct accounts
4. Receipt images attached to transactions

**Bank Feed Rules:**
\`\`\`
IF transaction contains "GITHUB"
THEN categorize as "Software Subscriptions"
AND assign to "Development Tools" tracking category

IF transaction contains "UBER" OR "LYFT"  
THEN categorize as "Local Transportation"
AND mark as "Review Required"
\`\`\`

## Expense Approval Workflows

### 1. Small Business (1-5 people)

**Simple Owner Approval:**
\`\`\`
Expense Limits:
- Under $50: Auto-approve with receipt
- $50-$500: Owner email approval
- Over $500: Owner approval + business justification

Process:
1. Employee/contractor submits expense
2. Owner receives notification
3. Owner approves/rejects with comments
4. Approved expenses auto-sync to QuickBooks
\`\`\`

### 2. Growing Company (5-25 people)

**Department Manager Approval:**
\`\`\`
Approval Matrix:
Marketing Expenses:
- Under $100: Marketing Manager
- $100-$1,000: Marketing Manager + Owner
- Over $1,000: Owner approval required

Development Expenses:
- Under $200: CTO approval
- $200-$1,500: CTO + CFO approval
- Over $1,500: Executive team approval

Process:
1. Employee submits with project/purpose code
2. Department manager reviews and approves
3. Finance team receives for final processing
4. Monthly expense reports to executives
\`\`\`

### 3. Larger Organization (25+ people)

**Multi-level Approval with Budgets:**
\`\`\`
Budget Controls:
Each department has monthly expense budgets:
- Engineering: $15,000
- Marketing: $25,000  
- Sales: $10,000
- Operations: $5,000

Approval Rules:
1. Within budget + under limit = Auto-approve
2. Over limit but within budget = Manager approval
3. Over budget = CFO approval required
4. Emergency expenses = CEO approval

Process:
1. Real-time budget tracking
2. Automated approval routing
3. Exception reporting for over-budget items
4. Monthly budget variance analysis
\`\`\`

## Expense Documentation Standards

### 1. Receipt Requirements

#### Minimum Documentation
Every business expense must have:
- **Date** of expense
- **Amount** paid
- **Vendor/merchant** name
- **Business purpose** description
- **People involved** (for meals/entertainment)

#### Receipt Retention
**Digital Storage Requirements:**
- High-quality, legible images
- Color recommended for important receipts  
- Multiple backup locations (cloud + local)
- Organized by date and category
- Minimum 7-year retention for tax purposes

**Physical Receipt Management:**
\`\`\`
Monthly Process:
1. Scan all physical receipts
2. File receipts in monthly folders
3. Mark receipts as "Scanned - [Date]"
4. Store in fireproof filing cabinet
5. Dispose after 7 years (after digital verification)
\`\`\`

### 2. Mileage Documentation

#### IRS Requirements
For vehicle expense deductions, maintain:
- **Date** of trip
- **Starting location**
- **Destination**
- **Business purpose**
- **Miles driven**
- **Total business miles** for the year

**Sample Mileage Log:**
\`\`\`
Date: March 15, 2024
From: Home Office (123 Main St)
To: Client Meeting (456 Business Ave)  
Purpose: Quarterly business review with TechCorp
Miles: 24 (round trip)
Rate: $0.67/mile
Deduction: $16.08
\`\`\`

#### Automated Tracking
**MileIQ Setup:**
- Enable automatic drive detection
- Classify trips as business/personal in real-time
- Generate IRS-compliant reports monthly
- Export data to expense management system

### 3. Meal and Entertainment Documentation

#### Required Information
- **Date and time** of meal
- **Location** (restaurant name and address)
- **Business purpose** (meeting topic, desired outcome)
- **People present** (names and business relationship)
- **Amount** paid including tip
- **Method of payment**

**Sample Documentation:**
\`\`\`
Date: March 20, 2024, 12:00 PM
Location: The Tech Café, 789 Innovation Blvd
Attendees: 
- John Smith (Potential Client - ABC Corp)
- Mary Johnson (Our Sales Director)
Purpose: Discuss potential software development project, project requirements, and pricing
Amount: $67.50 (including tip)
Payment: Business American Express card
Business Outcome: Received RFP for $150K project
\`\`\`

## Expense Analysis and Reporting

### 1. Monthly Expense Analysis

#### Key Metrics to Track
**Expense Categories as % of Revenue:**
\`\`\`
Target Expense Ratios for SaaS Business:

Cost of Goods Sold: 15-25%
- Hosting and infrastructure: 5-8%
- Payment processing: 2-3%
- Third-party services: 3-5%

Sales & Marketing: 30-50%
- Paid advertising: 10-20%
- Marketing tools: 2-3%
- Sales team: 15-25%

Research & Development: 15-25%
- Developer salaries: 10-15%
- Development tools: 1-2%
- Infrastructure: 2-3%

General & Administrative: 10-20%
- Office expenses: 2-5%
- Legal and accounting: 1-3%
- Insurance and other: 2-5%
\`\`\`

#### Variance Analysis
**Monthly Review Questions:**
1. Which expenses exceeded budget and why?
2. Are there new expense categories emerging?
3. Can any expenses be reduced or eliminated?
4. Are we getting good ROI on marketing spend?
5. What upcoming expenses should we plan for?

**Sample Variance Report:**
\`\`\`
March 2024 Expense Variance Report

Software Subscriptions:
Budget: $2,500 | Actual: $2,847 | Variance: +$347 (13.9%)
Reason: Added new project management tool ($200) and design software ($147)
Action: Evaluate tool effectiveness; consider consolidation

Marketing:
Budget: $8,000 | Actual: $6,245 | Variance: -$1,755 (-21.9%)
Reason: Delayed trade show participation
Action: Reallocate budget to Q2 digital advertising

Travel:
Budget: $1,200 | Actual: $2,156 | Variance: +$956 (79.7%)
Reason: Unexpected client site visit for problem resolution
Action: Build emergency travel fund into budget
\`\`\`

### 2. Tax Planning Analysis

#### Quarterly Tax Reviews
**Q1 Review (April):**
- Analyze Q1 deductions vs. income
- Plan major equipment purchases for optimal tax timing
- Review home office deduction calculations
- Assess need for quarterly tax payments

**Q2 Review (July):**
- Mid-year tax projection
- Evaluate Section 179 deduction opportunities
- Review business meal deduction tracking
- Assess R&D credit potential

**Q3 Review (October):**
- Plan year-end tax strategies
- Accelerate or defer expenses as needed
- Review depreciation schedules
- Evaluate business structure optimization

**Q4 Review (January):**
- Final tax deduction calculations
- Prepare documentation for tax filing
- Analyze annual expense trends
- Set next year's expense budgets

### 3. ROI Analysis by Expense Category

#### Marketing ROI Tracking
\`\`\`
Google Ads Campaign Analysis:
Spend: $5,000
New customers acquired: 25
Average customer value: $2,400
Total revenue from campaign: $60,000
ROI: ($60,000 - $5,000) ÷ $5,000 = 1,100%

Software Tool ROI:
Annual cost of project management software: $3,600
Time saved per developer: 5 hours/month
Developer hourly cost: $75
Monthly savings: 3 developers × 5 hours × $75 = $1,125
Annual savings: $13,500
ROI: ($13,500 - $3,600) ÷ $3,600 = 275%
\`\`\`

## Best Practices for Expense Management

### 1. Automation First
- Set up bank feed rules for recurring expenses
- Use receipt scanning technology
- Automate expense approvals where appropriate
- Integrate expense tools with bookkeeping software

### 2. Regular Reviews
- Weekly expense processing
- Monthly category analysis
- Quarterly budget variance reviews
- Annual tax planning sessions

### 3. Documentation Standards
- Require business purpose for all expenses
- Store digital receipts in organized system
- Maintain detailed mileage logs
- Document meal and entertainment details

### 4. Team Education
- Train team on expense policies
- Provide clear approval guidelines
- Share tax deduction opportunities
- Regular updates on expense management tools

## Key Takeaways

- Implement automated systems to reduce manual work
- Maintain strict documentation standards for tax compliance
- Regular analysis helps control costs and identify opportunities
- Integration between expense tools and bookkeeping software saves time
- Clear approval workflows prevent unauthorized spending
- Tax planning throughout the year maximizes deductions

An effective expense management system not only ensures tax compliance but provides valuable insights for business decision-making and cost control. The investment in good systems and processes pays dividends in time savings and tax optimization.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 105
      }
    ];

    for (const lessonData of week3lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          weekId: week3.id
        }
      });
    }

    console.log('✅ Week 3 created with 2 lessons');

    // Continue with weeks 4 and 5...
    console.log('✅ Course 4: Bookkeeping Fundamentals for Tech Businesses created successfully!');
    console.log(`📚 Course ID: ${course4.id}`);
    console.log(`📖 Total lessons created: ${week1lessons.length + week2lessons.length + week3lessons.length}`);
    console.log('🎯 Next: Complete remaining weeks and add to database');

  } catch (error) {
    console.error('❌ Error creating Course 4:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCourse4();