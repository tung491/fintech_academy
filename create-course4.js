const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createCourse4() {
  try {
    console.log('🚀 Creating Course 4: Bookkeeping Fundamentals for Tech Businesses...');

    // Get or create the Accounting & Bookkeeping category
    let category = await prisma.courseCategory.findFirst({
      where: {
        slug: 'accounting-bookkeeping'
      }
    });

    if (!category) {
      console.log('Creating Accounting & Bookkeeping category...');
      category = await prisma.courseCategory.create({
        data: {
          name: 'Accounting & Bookkeeping',
          slug: 'accounting-bookkeeping',
          description: 'Master accounting fundamentals and bookkeeping skills for tech businesses',
          color: '#10B981',
          icon: '📊',
          orderIndex: 2,
          isActive: true
        }
      });
      console.log('✅ Category created');
    }

    // Check if course already exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        slug: 'bookkeeping-fundamentals-tech'
      }
    });

    if (existingCourse) {
      console.log('⚠️ Course already exists. Skipping creation.');
      return;
    }

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
    console.log(`📚 Course ID: ${course4.id}`);
    
    // Create Week 1: Chart of Accounts Setup
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

    // Week 1 Lesson 1
    await prisma.lesson.create({
      data: {
        weekId: week1.id,
        title: 'Chart of Accounts Fundamentals',
        slug: 'chart-of-accounts-fundamentals',
        content: `# Chart of Accounts Fundamentals

## Understanding the Foundation of Your Bookkeeping System

A chart of accounts (COA) is the backbone of your business's financial management. For tech businesses, having a well-organized COA is crucial for tax optimization, business analysis, and professional financial reporting.

## The Five Main Account Categories

### 1. Assets (1000-1999)
- **Current Assets**: Cash, bank accounts, accounts receivable
- **Fixed Assets**: Equipment, software licenses, furniture
- **Intangible Assets**: Patents, trademarks, copyrights

### 2. Liabilities (2000-2999)  
- **Current Liabilities**: Accounts payable, credit cards, taxes owed
- **Long-term Liabilities**: Loans, mortgages

### 3. Equity (3000-3999)
- Owner's equity, retained earnings, distributions

### 4. Revenue (4000-4999)
- Different income streams (SaaS, consulting, development)

### 5. Expenses (5000-9999)
- Operating expenses and cost of goods sold

## Account Numbering Best Practices

- Use consistent numbering with gaps for expansion
- Group related accounts together
- Keep the system simple but comprehensive
- Document what goes in each account

## Software Business Specific Accounts

### Revenue Accounts
- 4000 - SaaS Subscription Revenue
- 4010 - Custom Development Revenue  
- 4020 - Consulting Services
- 4030 - Support and Maintenance

### Technology Expenses
- 5200 - Software Subscriptions
- 5210 - Development Tools
- 5220 - Cloud Services
- 5230 - Security Software

### Cost of Goods Sold
- 7000 - Hosting and Infrastructure
- 7010 - Third-party APIs
- 7020 - Payment Processing Fees

Setting up your chart of accounts correctly from the beginning will save time and ensure accurate financial reporting throughout your business growth.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 90
      }
    });

    // Week 1 Lesson 2
    await prisma.lesson.create({
      data: {
        weekId: week1.id,
        title: 'Software Business Account Structure Setup',
        slug: 'software-business-account-structure',
        content: `# Software Business Account Structure Setup

## Creating Your Complete Account Structure

Now let's build a practical chart of accounts specifically for software businesses, whether you're a solo developer, small agency, or growing SaaS company.

## Complete Software Business Chart of Accounts

### ASSETS (1000-1999)

#### Current Assets (1000-1199)
- 1000 - Business Checking Account
- 1010 - Business Savings Account  
- 1020 - PayPal Business Account
- 1030 - Stripe Account
- 1100 - Accounts Receivable
- 1110 - Unbilled Revenue (Work in Progress)

#### Fixed Assets (1200-1399)
- 1200 - Computer Equipment
- 1210 - Office Equipment
- 1300 - Software Licenses (Long-term)
- 1310 - Domain Names
- 1330 - Accumulated Depreciation

### LIABILITIES (2000-2999)

#### Current Liabilities (2000-2199)
- 2000 - Accounts Payable
- 2010 - Business Credit Card
- 2020 - Payroll Taxes Payable
- 2030 - Sales Tax Payable
- 2060 - Deferred Revenue (for SaaS)

### EQUITY (3000-3999)
- 3000 - Owner's Equity
- 3010 - Retained Earnings
- 3020 - Owner's Draws/Distributions

### REVENUE (4000-4999)
- 4000 - SaaS Subscription Revenue
- 4010 - Custom Development Revenue
- 4020 - Consulting Services
- 4030 - Training and Education
- 4200 - Affiliate Commissions

### COST OF GOODS SOLD (7000-7999)
- 7000 - Hosting and Infrastructure
- 7010 - Cloud Services (AWS, Azure, GCP)
- 7030 - Third-party APIs
- 7040 - Payment Processing Fees

### OPERATING EXPENSES (5000-6999)

#### Personnel (5000-5199)
- 5000 - Salaries and Wages
- 5010 - Contractor Payments (1099)
- 5020 - Payroll Taxes

#### Technology (5200-5399)
- 5200 - Software Subscriptions
- 5210 - Development Tools
- 5220 - Design Software
- 5230 - Communication Tools

#### Marketing (5400-5599)
- 5400 - Advertising and Promotion
- 5410 - Content Marketing
- 5420 - Social Media Marketing
- 5430 - SEO Tools

#### Office and Admin (5600-5799)
- 5600 - Rent and Utilities
- 5610 - Internet and Phone
- 5620 - Office Supplies
- 5660 - Accounting and Bookkeeping

## Implementation Guidelines

1. Start with core accounts for your main business activities
2. Add accounts as needed when categories become significant
3. Use consistent numbering with gaps for future expansion
4. Document what goes in each account for consistency
5. Review and refine quarterly

Your chart of accounts should make bookkeeping easier and provide valuable insights for business decisions.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 105
      }
    });

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
              questionText: 'For a SaaS business, "AWS hosting costs" would be categorized as:',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Operating Expense',
                'Cost of Goods Sold',
                'Asset',
                'Liability'
              ]),
              correctAnswer: 'Cost of Goods Sold',
              explanation: 'AWS hosting costs are directly related to delivering your software service and should be categorized as Cost of Goods Sold.',
              orderIndex: 3
            }
          ]
        }
      }
    });

    console.log('✅ Week 1 created with 2 lessons and 1 quiz');

    // Create Week 2: Recording Revenue  
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

    // Week 2 Lesson 1
    await prisma.lesson.create({
      data: {
        weekId: week2.id,
        title: 'Revenue Recognition Fundamentals',
        slug: 'revenue-recognition-fundamentals',
        content: `# Revenue Recognition Fundamentals for Tech Businesses

## Understanding When to Record Revenue

Revenue recognition determines **when** you record revenue, not just **how much**. For tech businesses, this is crucial due to various revenue streams and payment structures.

## The Revenue Recognition Principle

Revenue should be recognized when it is **earned**, not necessarily when cash is received.

### Key Questions:
- When have you fulfilled your obligation to the customer?
- What performance obligations do you have?
- Over what period should revenue be recognized?

## Revenue Recognition by Business Model

### 1. SaaS (Software as a Service)

#### Monthly Subscriptions
Customer pays $100/month for your software.
- January payment of $100 = $100 revenue in January
- Revenue is earned as you provide the service each month

**Journal Entry:**
\`\`\`
Debit: Cash                     $100
Credit: SaaS Subscription Revenue  $100
\`\`\`

#### Annual Subscriptions Paid Upfront
Customer pays $1,200 for a full year upfront.
- Revenue must be spread over 12 months ($100/month)

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
$50,000 website development project, 3-month timeline.

**Percentage of Completion Method:**
- Month 1: 30% complete = $15,000 revenue
- Month 2: 60% complete = $15,000 revenue  
- Month 3: 100% complete = $20,000 revenue

#### Time and Materials Projects
$150/hour consulting, bill monthly.
- Revenue recognized as hours are worked

### 3. Retainer Arrangements

#### Monthly Retainer
Client pays $5,000/month for ongoing support.
- Recognized monthly as service is provided

#### Prepaid Retainer  
Client pays $15,000 for 3 months upfront.
- Initially record as deferred revenue
- Recognize $5,000 per month as services provided

## Key Accounting Concepts

### Deferred Revenue (Unearned Revenue)
- Money received for services not yet provided
- Listed as a liability on balance sheet
- Common in: Annual subscriptions, project deposits

### Accounts Receivable
- Money owed for services already provided
- Listed as an asset on balance sheet
- Common in: Monthly billing, completed projects

### Accrued Revenue
- Revenue earned but not yet billed
- Listed as an asset on balance sheet
- Common in: Time-based billing, work in progress

## Practical Examples

### Example 1: SaaS Business Mixed Billing
Task management software: $29/month or $290/year

**January Transactions:**
- 100 monthly subscribers: $2,900 (immediate recognition)
- 20 annual subscribers: $5,800 total, $483.33/month recognition

### Example 2: Development Agency
Current projects:
1. E-commerce site: $40,000, 60% complete = $24,000 revenue
2. Mobile app: $25,000, completed = $25,000 revenue
3. Monthly retainer: $2,000 = $2,000 revenue

## Special Situations

### Refunds and Credits
Customer requests $100 refund:
\`\`\`
Debit: SaaS Subscription Revenue  $100
Credit: Cash                      $100
\`\`\`

### Payment Processing Fees
Stripe charges 2.9% + $0.30 on $100 payment:
\`\`\`
Debit: Cash                     $96.80
Debit: Payment Processing Fees  $3.20
Credit: SaaS Revenue           $100.00
\`\`\`

Proper revenue recognition ensures accurate financial reporting and helps you understand your true business performance.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 95
      }
    });

    // Week 2 Lesson 2
    await prisma.lesson.create({
      data: {
        weekId: week2.id,
        title: 'Practical Revenue Recording and Invoice Management',
        slug: 'practical-revenue-recording',
        content: `# Practical Revenue Recording and Invoice Management

## Setting Up Your Revenue Recording System

Let's implement a practical system for recording revenue that handles multiple streams while maintaining accuracy and compliance.

## Invoice Management Workflow

### 1. SaaS Subscription Billing

**Monthly Recurring Setup in QuickBooks:**
1. Go to Sales → Recurring Transactions
2. Create template with customer details
3. Set frequency and dates

**Sample Invoice:**
\`\`\`
Customer: TechCorp Inc.
Date: January 1, 2024

- Project Management Software (Monthly) - $100.00
- Additional Users (5 × $20) - $100.00  
- Advanced Analytics Add-on - $50.00

Total: $250.00
Terms: Due on receipt
\`\`\`

### 2. Project-Based Invoicing

**Development Project Invoice:**
\`\`\`
Project: E-commerce Platform Development
Customer: StartupXYZ

Phase 1: Design (Complete)
- UI/UX Design (40 hours × $125) - $5,000
- Project Planning (8 hours × $150) - $1,200

Phase 2: Development (50% Complete)  
- Frontend (60 hours × $125) - $7,500
- Backend (40 hours × $135) - $5,400

Total: $19,100
Terms: Net 30
\`\`\`

## Revenue Recognition Entries

### Immediate Recognition
For completed work and monthly subscriptions:

**QuickBooks automatically creates:**
\`\`\`
Debit: Accounts Receivable    $250
Credit: SaaS Revenue         $250
\`\`\`

**When payment received:**
\`\`\`
Debit: Cash                  $250
Credit: Accounts Receivable  $250
\`\`\`

### Deferred Revenue Handling

**Annual subscription $2,400 paid upfront:**

**Step 1: Create invoice and receive payment**
**Step 2: Defer revenue with journal entry**
\`\`\`
Debit: Revenue Account       $2,400
Credit: Deferred Revenue     $2,400
\`\`\`

**Step 3: Monthly recognition**
\`\`\`
Debit: Deferred Revenue      $200
Credit: SaaS Revenue        $200
\`\`\`

## Revenue Tracking by Stream

### Revenue Accounts Setup
- 4000 - Basic Subscription Revenue
- 4010 - Premium Subscription Revenue  
- 4020 - Enterprise Subscription Revenue
- 4100 - Custom Development Revenue
- 4120 - Maintenance Revenue

### Monthly Revenue Dashboard

**Key SaaS Metrics:**
- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- New MRR vs. Churned MRR
- Average Revenue Per User (ARPU)

**Sample Report:**
\`\`\`
JANUARY 2024 REVENUE SUMMARY

SaaS Subscriptions:
- Basic Plans (50 × $50)        $2,500
- Premium Plans (25 × $150)     $3,750  
- Enterprise (5 × $500)         $2,500
Total MRR                       $8,750

One-time Services:
- Setup Fees                    $1,200
- Custom Development           $15,000
- Training                      $2,500
Total One-time                 $18,700

TOTAL REVENUE                  $27,450
\`\`\`

## Payment Processing Integration

### Automated Recording with Stripe
When customer pays $100 subscription:
\`\`\`
Debit: Stripe Account           $97.10
Debit: Payment Processing Fees  $2.90
Credit: SaaS Revenue           $100.00
\`\`\`

### PayPal Integration
Customer pays $500 invoice:
\`\`\`
Debit: PayPal Account          $485.50
Debit: Processing Fees         $14.50
Credit: Consulting Revenue     $500.00
\`\`\`

## Work-in-Progress Tracking

For ongoing projects:

**Time Entry System:**
- Track hours by project and task
- Set billing rates by role
- Generate progress reports

**Monthly WIP Entry:**
\`\`\`
Work completed but not billed:
Developer hours: 40 × $125 = $5,000
Design hours: 15 × $100 = $1,500
Total WIP: $6,500

Journal Entry:
Debit: Work in Progress Asset   $6,500
Credit: Development Revenue     $6,500
\`\`\`

## Quality Control Procedures

### Monthly Revenue Review
- [ ] All monthly subscriptions billed
- [ ] Annual subscriptions properly deferred  
- [ ] Project progress updated
- [ ] WIP calculations accurate
- [ ] All payments reconciled

### Revenue Validation Questions
1. Does revenue match cash flow expectations?
2. Are deferred revenue balances reasonable?
3. Have all completed milestones been billed?
4. Are recognition policies followed consistently?

## Revenue Forecasting

### SaaS Projections
\`\`\`
Current MRR: $10,000
New customers: 10/month × $50 = $500
Churn: 5% monthly = ($500)
Net growth: $0

Projected MRR remains stable at $10,000
\`\`\`

### Project Pipeline
\`\`\`
Pipeline Analysis:
- Proposals: $75,000 (30% close rate)
- Negotiations: $45,000 (60% close rate)  
- Contracts: $25,000 (90% close rate)

Expected Revenue: $72,000
\`\`\`

A well-organized revenue system provides accurate data for decision-making and ensures accounting compliance.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 110
      }
    });

    console.log('✅ Week 2 created with 2 lessons');
    console.log('✅ Course 4 Phase 1 completed successfully!');
    console.log(`📚 Total content created: 2 weeks, 4 lessons, 1 quiz`);
    console.log('🎯 Ready for Phase 2: Complete remaining weeks');

  } catch (error) {
    console.error('❌ Error creating Course 4:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCourse4();