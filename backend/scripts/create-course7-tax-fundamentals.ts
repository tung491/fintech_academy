import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse7() {
  try {
    console.log('🚀 Creating Course 7: Tax Fundamentals for Freelance Developers...');

    // Check if the course already exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        slug: 'tax-fundamentals-freelance-developers'
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

    // Get or create the Tax Specialization category
    let category = await prisma.courseCategory.findFirst({
      where: {
        slug: 'tax-specialization'
      }
    });

    if (!category) {
      console.log('🏷️ Creating Tax Specialization category...');
      category = await prisma.courseCategory.create({
        data: {
          name: 'Tax Specialization',
          slug: 'tax-specialization',
          description: 'Specialized tax courses for freelancers, business owners, and high earners',
          color: '#10B981', // Emerald green
          icon: 'tax',
          orderIndex: 3,
          isActive: true
        }
      });
      console.log('✅ Tax Specialization category created');
    } else {
      console.log('✅ Using existing Tax Specialization category');
    }

    // Create Course 7: Tax Fundamentals for Freelance Developers
    const course7 = await prisma.course.create({
      data: {
        title: 'Tax Fundamentals for Freelance Developers',
        slug: 'tax-fundamentals-freelance-developers',
        description: 'Master essential tax concepts for freelance developers including 1099 classification, business deductions, quarterly payments, and home office deductions.',
        shortDescription: 'Essential tax knowledge for freelance developers and 1099 contractors',
        categoryId: category.id,
        level: 'intermediate',
        duration: '4 weeks',
        estimatedHours: 32,
        price: 19700, // $197
        originalPrice: 29700, // $297
        instructor: 'Sarah Martinez, CPA, EA',
        instructorBio: 'Enrolled Agent with 15+ years specializing in freelancer and contractor tax issues. Former IRS Revenue Agent with expertise in small business tax compliance and planning.',
        thumbnailUrl: '/images/courses/tax-fundamentals-freelance-developers.jpg',
        orderIndex: 7,
        isPublished: true,
        isFeatured: true,
        skillsLearned: JSON.stringify([
          'Understand 1099 vs W-2 classification and tax implications',
          'Maximize business expense deductions for developers',
          'Calculate and manage quarterly estimated tax payments',
          'Claim home office deduction and equipment depreciation',
          'Navigate IRS requirements for freelance income',
          'Implement tax-efficient business structures'
        ]),
        targetAudience: 'Freelance developers, 1099 contractors, independent consultants, and developers transitioning from W-2 employment to freelance work.',
      }
    });

    console.log('✅ Course 7 created successfully');

    // Week 1: 1099 vs W-2 Classification and Implications
    const week1 = await prisma.week.create({
      data: {
        courseId: course7.id,
        weekNumber: 1,
        title: '1099 vs W-2 Classification and Implications',
        overview: 'Understand the critical differences between 1099 contractor and W-2 employee status, including tax implications, benefits, and compliance requirements.',
        learningObjectives: JSON.stringify([
          'Distinguish between independent contractor and employee classifications',
          'Understand tax implications of 1099 vs W-2 status',
          'Learn IRS tests for worker classification',
          'Navigate misclassification risks and consequences',
          'Optimize tax strategy based on employment status'
        ]),
        estimatedHours: 8
      }
    });

    const week1lessons = [
      {
        title: 'Understanding 1099 vs W-2: Classification Fundamentals',
        slug: 'understanding-1099-vs-w2-classification-fundamentals',
        content: `# Understanding 1099 vs W-2: Classification Fundamentals

## Introduction to Worker Classification

For developers, understanding the difference between 1099 contractor and W-2 employee status is crucial for tax planning, legal compliance, and financial success. This classification affects everything from tax obligations to benefits eligibility and business deductions.

## The Fundamental Difference

### W-2 Employee Status
**Definition:** An individual who performs services under the control and direction of an employer.

**Key Characteristics:**
- Employer controls how, when, and where work is performed
- Employer provides tools, equipment, and resources
- Regular salary or hourly wages with payroll taxes withheld
- Eligible for employer benefits (health insurance, 401k, PTO)
- Limited business expense deductions

**Tax Implications:**
\`\`\`
W-2 Employee Tax Structure:
Gross Wages: $100,000
Federal Income Tax: ~$18,000 (varies by filing status)
Social Security Tax: $6,200 (6.2% up to wage base)
Medicare Tax: $1,450 (1.45%)
State Income Tax: Varies by state
Employee Share of Payroll Taxes: $7,650
Employer Share of Payroll Taxes: $7,650 (paid by employer)

Net Tax Burden: ~$27,100 (excluding state taxes)
After-Tax Income: ~$72,900
\`\`\`

### 1099 Independent Contractor Status
**Definition:** An individual who provides services to a business while maintaining independence and control over their work methods.

**Key Characteristics:**
- Control over how work is performed and completed
- Provide own tools, equipment, and workspace
- Payment typically per project or contracted amount
- No employer-provided benefits
- Responsible for all business expenses and taxes
- Extensive business expense deductions available

**Tax Implications:**
\`\`\`
1099 Contractor Tax Structure:
Gross Income: $100,000
Business Expenses: $15,000 (equipment, office, etc.)
Net Business Income: $85,000

Self-Employment Tax: $12,006 (15.3% on net income)
Federal Income Tax: ~$13,600 (on net income after 50% SE tax deduction)
State Income Tax: Varies by state

Total Tax Burden: ~$25,600 (excluding state taxes)
After-Tax Income: ~$59,400

Note: Lower after-tax income offset by business deductions and tax benefits
\`\`\`

## IRS Classification Tests

The IRS uses three main categories to determine worker classification:

### 1. Behavioral Control
**Questions to Consider:**
- Does the company control or have the right to control what you do and how you do your job?
- Are you required to follow specific procedures or processes?
- Do you receive training from the company?
- Are you required to work specific hours or at specific locations?

**Developer Examples:**
\`\`\`
W-2 Employee Indicators:
- Required to work 9 AM - 5 PM in company office
- Must follow company coding standards and review processes
- Attend mandatory team meetings and training sessions
- Use company-provided laptop and development tools
- Subject to performance reviews and management oversight

1099 Contractor Indicators:
- Set your own schedule and work location
- Choose your own development methodologies
- Provide deliverables on agreed timeline
- Use your own equipment and software tools
- Minimal oversight once project requirements are established
\`\`\`

### 2. Financial Control
**Questions to Consider:**
- Do you have unreimbursed business expenses?
- Do you have a significant investment in tools/equipment?
- Can you realize a profit or loss from your work?
- Do you make services available to other clients?
- How are you paid (salary vs. project-based)?

**Developer Examples:**
\`\`\`
W-2 Employee Indicators:
- Company provides all necessary equipment
- Regular salary with guaranteed income
- Minimal unreimbursed expenses
- Exclusive relationship with employer
- Limited opportunity for profit/loss

1099 Contractor Indicators:
- Significant investment in development equipment
- Project-based payment with profit/loss potential
- Unreimbursed business expenses (office, software licenses)
- Multiple clients and revenue streams
- Can subcontract work to others
\`\`\`

### 3. Relationship Type
**Questions to Consider:**
- Are there written contracts describing the relationship?
- Does the company provide employee benefits?
- How permanent is the working relationship?
- Are your services a key activity of the business?

**Developer Examples:**
\`\`\`
W-2 Employee Indicators:
- Indefinite employment relationship
- Eligible for health insurance, PTO, 401k
- Core member of development team
- Integrated into company culture and processes

1099 Contractor Indicators:
- Project-based contracts with defined end dates
- No employee benefits provided
- Specialized services not core to business
- Limited integration with internal team
\`\`\`

## Common Misclassification Scenarios

### Scenario 1: The "Contractor" in Disguise
\`\`\`
Situation:
A startup hires a "contractor" to save on payroll taxes and benefits.
Reality: Developer works full-time, uses company equipment, follows company processes.

Red Flags:
- Works exclusively for one client
- Required to work specific hours
- Uses company email and tools
- Attends all team meetings
- Functions identically to employees

Risk: IRS reclassification with penalties and back taxes
\`\`\`

### Scenario 2: The Legitimate Freelancer
\`\`\`
Situation:
Experienced developer provides specialized services to multiple clients.

Indicators:
- Multiple active clients
- Project-based engagements
- Own business entity (LLC/Corp)
- Significant business expenses
- Control over work methods

Result: Legitimate 1099 contractor status
\`\`\`

## Tax Advantages and Disadvantages

### 1099 Contractor Advantages
**Business Deductions:**
- Home office expenses
- Equipment and software purchases
- Professional development and training
- Business travel and meals
- Internet and phone bills
- Professional memberships and subscriptions

**Tax Planning Flexibility:**
- Income timing control
- Business structure optimization
- Retirement plan options (SEP-IRA, Solo 401k)
- Health savings account eligibility

**Example Deductions for Developers:**
\`\`\`
Annual Business Expenses:
Home Office: $3,600 (300 sq ft × $12/sq ft)
Equipment: $2,500 (laptop, monitor, peripherals)
Software Licenses: $1,200 (development tools, subscriptions)
Internet/Phone: $1,800 (business portion)
Training/Conferences: $2,000
Professional Memberships: $500
Total Deductions: $11,600

Tax Savings (22% bracket): $2,552 annually
\`\`\`

### 1099 Contractor Disadvantages
**Higher Tax Burden:**
- Self-employment tax (15.3% on net earnings)
- Quarterly estimated tax payments required
- No employer contribution to Social Security/Medicare

**No Employee Benefits:**
- Must purchase own health insurance
- No employer 401k match
- No paid time off or unemployment benefits
- No workers' compensation coverage

**Administrative Burden:**
- Detailed record keeping required
- Business license and permits may be needed
- Professional liability insurance considerations
- Invoice and payment management

### W-2 Employee Advantages
**Lower Tax Burden:**
- Employer pays half of payroll taxes
- Automatic tax withholding
- No quarterly payment requirements

**Employee Benefits:**
- Health insurance (often subsidized)
- Employer 401k matching
- Paid time off and sick leave
- Unemployment benefits eligibility
- Workers' compensation coverage

**Simplicity:**
- Minimal tax complexity
- No business record keeping
- Steady, predictable income

### W-2 Employee Disadvantages
**Limited Deductions:**
- Unreimbursed employee expenses not deductible (post-2017)
- No home office deduction
- Limited tax planning opportunities

**Less Control:**
- Fixed salary regardless of productivity
- Limited flexibility in work arrangements
- Subject to employer policies and procedures

## Making the Right Choice

### Consider 1099 Status If:
- You value flexibility and control over your work
- You have multiple clients or want to develop multiple income streams
- You have significant business expenses to deduct
- You're comfortable with variable income and tax complexity
- You want to build a business brand and reputation

### Consider W-2 Status If:
- You prefer steady, predictable income
- You want employer-provided benefits
- You prefer minimal tax complexity
- You value job security and stability
- You don't want administrative business responsibilities

## Legal Compliance and Risk Management

### Avoiding Misclassification
**For Contractors:**
- Maintain multiple clients when possible
- Use written contracts clearly defining the relationship
- Invoice for services rather than submit timesheets
- Maintain separate business entity and bank accounts
- Document business expenses and maintain professional records

**Documentation Essentials:**
\`\`\`
Required Records:
1. Written contracts for all projects
2. Business expense receipts and records
3. Business bank account statements
4. Professional correspondence
5. Marketing materials and business cards
6. Client testimonials and project portfolios
\`\`\`

### Consequences of Misclassification
**For the Business:**
- Back payroll taxes plus penalties and interest
- Employment tax assessments
- Workers' compensation claims
- Unemployment benefit claims
- Potential labor law violations

**For the Worker:**
- Loss of business deductions if reclassified
- Potential audit and examination
- Professional reputation concerns

## Strategic Tax Planning

### Quarterly Payment Strategy
\`\`\`
Example: $80,000 Annual Net Income
Self-Employment Tax: $11,304
Income Tax (22% bracket): $12,000
Total Annual Tax: $23,304

Quarterly Payments: $5,826 each
Due Dates: April 15, June 15, September 15, January 15
\`\`\`

### Business Structure Optimization
**Sole Proprietorship (Schedule C):**
- Simplest structure
- All income subject to self-employment tax
- Unlimited personal liability

**Single-Member LLC:**
- Same tax treatment as sole proprietorship
- Limited liability protection
- Professional credibility

**S-Corporation Election:**
- Potential self-employment tax savings
- Additional complexity and costs
- Reasonable salary requirement

## Key Takeaways

- Worker classification affects tax obligations, benefits, and business deductions
- IRS uses behavioral, financial, and relationship tests to determine status
- 1099 contractors have more deductions but higher administrative burden
- W-2 employees have simpler taxes but fewer deduction opportunities
- Proper documentation is essential for maintaining contractor status
- Strategic planning can optimize tax outcomes for either classification

Understanding your classification status is the foundation for effective tax planning and compliance as a developer. The choice between 1099 and W-2 status involves balancing control, benefits, tax implications, and personal preferences.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 90
      },
      {
        title: 'Tax Implications and Strategic Planning for Different Classifications',
        slug: 'tax-implications-strategic-planning-classifications',
        content: `# Tax Implications and Strategic Planning for Different Classifications

## Deep Dive into Tax Implications

Understanding the tax implications of your worker classification is crucial for effective financial planning and maximizing your after-tax income as a developer.

## Self-Employment Tax: The Hidden Cost

### Understanding Self-Employment Tax
Self-employment tax is the 1099 contractor's equivalent of Social Security and Medicare taxes, but with a crucial difference: you pay both the employee AND employer portions.

**Tax Breakdown:**
\`\`\`
Self-Employment Tax Components:
Social Security: 12.4% (on income up to $160,200 in 2023)
Medicare: 2.9% (on all income)
Additional Medicare: 0.9% (on income over $200,000 single/$250,000 married)
Total: 15.3% on net self-employment income

Calculation Example - $75,000 Net Income:
Social Security: $75,000 × 12.4% = $9,300
Medicare: $75,000 × 2.9% = $2,175
Total SE Tax: $11,475

Deduction: 50% of SE tax = $5,738 (deductible from income)
Net Income for Income Tax: $75,000 - $5,738 = $69,262
\`\`\`

### The W-2 Comparison
\`\`\`
W-2 Employee - $75,000 Salary:
Employee Social Security: $4,650 (6.2%)
Employee Medicare: $1,088 (1.45%)
Total Employee Payroll Tax: $5,738

Employer Social Security: $4,650 (6.2%)
Employer Medicare: $1,088 (1.45%)
Total Employer Payroll Tax: $5,738 (invisible to employee)

Key Insight: W-2 employees see only half the payroll tax cost
\`\`\`

## Income Tax Calculations

### 1099 Contractor Tax Calculation
\`\`\`
Comprehensive Example - Freelance Developer:

Gross 1099 Income: $120,000
Business Expenses:
  Home Office: $4,800
  Equipment: $3,000
  Software Subscriptions: $1,800
  Professional Development: $2,500
  Business Internet/Phone: $2,100
  Professional Insurance: $1,200
Total Business Expenses: $15,400

Net Business Income (Schedule C): $104,600
Self-Employment Tax: $14,769
50% SE Tax Deduction: $7,385
Adjusted Gross Income: $97,215

Federal Income Tax (Single, Standard Deduction):
Taxable Income: $97,215 - $13,850 = $83,365

Tax Calculation:
10% on first $11,000 = $1,100
12% on next $33,725 = $4,047
22% on remaining $38,640 = $8,501
Total Income Tax: $13,648

Total Federal Tax Burden:
Self-Employment Tax: $14,769
Income Tax: $13,648
Total: $28,417

After-Tax Income: $120,000 - $28,417 = $91,583
\`\`\`

### W-2 Employee Tax Calculation
\`\`\`
Equivalent W-2 Employee - $120,000 Salary:

Gross W-2 Income: $120,000
Payroll Taxes:
  Employee Social Security: $7,440
  Employee Medicare: $1,740
Total Payroll Taxes: $9,180

Federal Income Tax:
Taxable Income: $120,000 - $13,850 = $106,150

Tax Calculation:
10% on first $11,000 = $1,100
12% on next $33,725 = $4,047
22% on remaining $61,425 = $13,514
Total Income Tax: $18,661

Total Federal Tax Burden:
Payroll Taxes: $9,180
Income Tax: $18,661
Total: $27,841

After-Tax Income: $120,000 - $27,841 = $92,159

Comparison:
W-2 After-Tax: $92,159
1099 After-Tax: $91,583
Difference: $576 in favor of W-2

However, this doesn't include the value of business deductions and flexibility!
\`\`\`

## Advanced Tax Strategies for 1099 Contractors

### Timing Income and Expenses

**Income Timing:**
\`\`\`
Year-End Strategy:
December invoicing options:
1. Invoice December 31, receive payment in January (defer income)
2. Invoice November 30, receive payment in December (accelerate income)

Tax Planning Consideration:
If expecting higher tax rate next year: Accelerate income
If expecting lower tax rate next year: Defer income
If need deductions this year: Accelerate income to offset
\`\`\`

**Expense Timing:**
\`\`\`
Equipment Purchase Timing:
Section 179 Deduction allows immediate expensing up to $1,160,000 (2023)

Example:
Purchase $8,000 laptop in December:
- Immediate deduction: $8,000
- Tax savings (22% bracket): $1,760
- Net cost: $6,240

Alternative: Purchase in January of next year if prefer deduction then
\`\`\`

### Business Structure Optimization

**S-Corporation Election Benefits:**
\`\`\`
LLC with S-Corp Election - $100,000 Net Income:

Strategy: Pay yourself reasonable salary, distribute profits

Reasonable Salary (W-2): $60,000
Distribution (1099-DIV): $40,000

Tax on Salary:
Self-Employment Tax: $8,478 (on $60,000)
Income Tax: Same calculation as before

Tax on Distribution:
Self-Employment Tax: $0 (distributions not subject to SE tax)
Income Tax: Taxed as ordinary income

Savings:
SE Tax on $40,000 distribution: $5,652
Minus additional S-Corp costs: ~$2,000
Net Annual Savings: ~$3,652
\`\`\`

**When S-Corp Makes Sense:**
- Net income consistently above $60,000
- Willing to handle payroll compliance
- Reasonable salary requirement can be met
- Additional administrative costs justified by savings

### Retirement Planning Advantages

**SEP-IRA for Contractors:**
\`\`\`
SEP-IRA Contribution Limits (2023):
Up to 25% of net self-employment income
Maximum: $66,000 annually

Example - $80,000 Net SE Income:
Maximum Contribution: $20,000 (25% of $80,000)
Tax Savings (22% bracket): $4,400
Net Contribution Cost: $15,600

Benefits:
- High contribution limits
- Tax deduction reduces current year taxes
- Tax-deferred growth until retirement
\`\`\`

**Solo 401(k) for Higher Earners:**
\`\`\`
Solo 401(k) Limits (2023):
Employee Deferral: Up to $22,500 ($30,000 if 50+)
Employer Contribution: Up to 25% of net SE income
Total Maximum: $66,000 ($73,500 if 50+)

Example - $120,000 Net SE Income:
Employee Deferral: $22,500
Employer Contribution: $30,000 (25% of $120,000)
Total Contribution: $52,500
Tax Savings (24% bracket): $12,600
\`\`\`

## State Tax Considerations

### State Income Tax Impact
\`\`\`
High Tax States (CA, NY, NJ):
Additional state income tax: 8-13%
Total marginal rate can exceed 35-40%
Business deductions more valuable

No Income Tax States (TX, FL, WA):
Focus on federal tax optimization
Self-employment tax becomes larger portion
Consider residency for tax planning
\`\`\`

### Multi-State Issues
**Remote Work Complications:**
- Client in different state may trigger tax obligations
- Nexus rules vary by state
- Professional tax advice recommended for multi-state work

## Health Insurance and Healthcare Costs

### Self-Employed Health Insurance Deduction
\`\`\`
Health Insurance Premiums:
Monthly Premium: $800
Annual Premium: $9,600

Tax Benefits:
- 100% deductible above-the-line (not itemized)
- Reduces both income tax and self-employment tax
- Tax savings (30% effective rate): $2,880
- Net annual cost: $6,720

HSA Eligibility:
High-Deductible Health Plan + HSA:
Maximum Contribution (2023): $3,850 individual/$7,750 family
Triple tax advantage: Deductible, growth tax-free, withdrawals tax-free for medical
\`\`\`

## Record Keeping and Documentation

### Essential Records for 1099 Contractors
\`\`\`
Financial Records:
1. Business bank account statements
2. Credit card statements (business expenses)
3. Invoice copies and payment records
4. 1099-NEC forms from clients
5. Quarterly estimated tax payment records

Expense Documentation:
1. Receipt or cancelled check
2. Business purpose explanation
3. Date and amount
4. Client or project if applicable

Home Office Records:
1. Home square footage measurements
2. Office space square footage
3. Utility bills and mortgage/rent statements
4. Home maintenance and repair receipts
\`\`\`

### Bookkeeping Systems
**Recommended Software:**
- QuickBooks Self-Employed: $15-35/month
- FreshBooks: $15-50/month  
- Wave Accounting: Free basic plan
- Xero: $13-70/month

**Key Features to Track:**
- Income categorization by client
- Expense categorization by type
- Mileage tracking
- Time tracking for projects
- Invoice generation and management
- Tax form preparation

## Common Tax Mistakes to Avoid

### Mistake 1: Inadequate Quarterly Payments
\`\`\`
Problem: Underpaying quarterly estimates
Consequence: Penalties and interest charges

Safe Harbor Rule:
Pay 100% of prior year tax (110% if AGI > $150K)
or 90% of current year tax

Example Penalty:
Underpayment: $5,000
Penalty rate: ~6% annually
Quarterly penalty: ~$75 per quarter
Annual penalty: ~$300
\`\`\`

### Mistake 2: Poor Record Keeping
- Missing deductions due to lack of documentation
- Audit risk from inadequate substantiation
- Mixing personal and business expenses

### Mistake 3: Misunderstanding Business vs. Personal
\`\`\`
Business Expense (Deductible):
- Laptop used 100% for client work
- Software licenses for development
- Client meeting meals (50% deductible)
- Home office space used exclusively for business

Personal Expense (Not Deductible):
- Laptop used for personal gaming
- Netflix subscription
- Personal commuting costs
- Personal portion of home expenses
\`\`\`

## Year-End Tax Planning Checklist

### December Actions
\`\`\`
Income Management:
□ Delay invoicing to defer income (if beneficial)
□ Collect outstanding receivables
□ Consider Roth conversion opportunities

Expense Acceleration:
□ Purchase needed equipment before year-end
□ Pay business expenses due in January
□ Make charitable contributions
□ Pay state estimated taxes

Retirement Contributions:
□ Maximize SEP-IRA or Solo 401(k) contributions
□ Consider Roth IRA conversions
□ Review beneficiary designations

Documentation:
□ Organize receipts and records
□ Update mileage logs
□ Prepare tax documents for accountant
\`\`\`

## Working with Tax Professionals

### When to Hire a Tax Professional
- First year as 1099 contractor
- Income exceeding $75,000
- Multiple income streams
- Complex business deductions
- Multi-state tax issues
- S-Corporation considerations

### Questions to Ask Your Tax Preparer
1. Experience with freelancer/contractor taxes?
2. Familiarity with developer business expenses?
3. Proactive tax planning services?
4. Quarterly consultation availability?
5. Audit representation included?

### Cost-Benefit Analysis
\`\`\`
Tax Professional Costs:
Preparation: $500-2,000
Planning consultations: $200-500/hour
Audit representation: $300-600/hour

Potential Benefits:
Additional deductions found: $2,000-5,000
Tax planning savings: $1,000-3,000 annually
Audit protection: Priceless
Time savings: 10-20 hours annually

ROI typically 3:1 to 5:1 for contractors earning $75K+
\`\`\`

## Key Takeaways

- Self-employment tax is the biggest difference between 1099 and W-2 taxation
- Business deductions can significantly reduce taxable income for contractors
- Timing strategies for income and expenses provide tax planning flexibility
- Retirement plan options offer substantial tax advantages for high earners
- S-Corporation election can provide self-employment tax savings
- Proper record keeping is essential for maximizing deductions
- Professional tax help often pays for itself through optimization opportunities

Strategic tax planning for 1099 contractors involves balancing current year tax minimization with long-term financial goals, while maintaining proper compliance and documentation.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 110
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
        title: '1099 vs W-2 Classification Mastery Quiz',
        description: 'Test your understanding of worker classification rules, tax implications, and strategic planning',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'What is the total self-employment tax rate for 1099 contractors in 2023?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '7.65%',
                '15.3%',
                '12.4%',
                '22%'
              ]),
              correctAnswer: '15.3%',
              explanation: 'Self-employment tax is 15.3% total: 12.4% for Social Security and 2.9% for Medicare, representing both employee and employer portions.',
              orderIndex: 1
            },
            {
              questionText: 'Which IRS test category focuses on who controls HOW the work is performed?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Financial Control',
                'Behavioral Control',
                'Relationship Type',
                'Economic Reality'
              ]),
              correctAnswer: 'Behavioral Control',
              explanation: 'Behavioral Control examines whether the company controls or has the right to control what the worker does and how the worker does the job.',
              orderIndex: 2
            },
            {
              questionText: 'A developer has $80,000 net self-employment income. What is 50% of their self-employment tax (deductible amount)?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$5,652',
                '$6,120',
                '$11,304',
                '$12,240'
              ]),
              correctAnswer: '$5,652',
              explanation: 'SE tax on $80,000 = $11,304 (15.3%). The deductible portion is 50% = $5,652, which reduces adjusted gross income.',
              orderIndex: 3
            },
            {
              questionText: 'Which business structure can help reduce self-employment tax for high-earning contractors?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Sole Proprietorship',
                'Single-Member LLC',
                'LLC with S-Corp Election',
                'General Partnership'
              ]),
              correctAnswer: 'LLC with S-Corp Election',
              explanation: 'S-Corp election allows paying reasonable salary (subject to payroll tax) while taking remaining income as distributions (not subject to self-employment tax).',
              orderIndex: 4
            },
            {
              questionText: 'What is a key indicator that suggests true independent contractor status?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Working exclusively for one client',
                'Using company-provided equipment',
                'Having multiple clients and business expenses',
                'Required to work specific hours in company office'
              ]),
              correctAnswer: 'Having multiple clients and business expenses',
              explanation: 'Multiple clients and significant business expenses indicate financial independence and entrepreneurial activity typical of true contractors.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 1 created with 2 lessons and 1 quiz');

    // Week 2: Business Expense Deductions for Developers
    const week2 = await prisma.week.create({
      data: {
        courseId: course7.id,
        weekNumber: 2,
        title: 'Business Expense Deductions for Developers',
        overview: 'Master the art of maximizing legitimate business deductions including equipment, software, professional development, and operational expenses.',
        learningObjectives: JSON.stringify([
          'Identify all deductible business expenses for developers',
          'Understand documentation requirements for expense claims',
          'Learn strategies to maximize legitimate deductions',
          'Navigate IRS rules for business vs. personal expenses',
          'Implement expense tracking systems and best practices'
        ]),
        estimatedHours: 8
      }
    });

    const week2lessons = [
      {
        title: 'Essential Business Deductions Every Developer Should Know',
        slug: 'essential-business-deductions-every-developer-should-know',
        content: `# Essential Business Deductions Every Developer Should Know

## Introduction to Business Deductions

As a freelance developer or 1099 contractor, business deductions are one of your most powerful tools for reducing taxable income and maximizing after-tax earnings. Understanding what you can deduct, how to document it properly, and when to claim it can save thousands of dollars annually.

## The Business Purpose Test

**Fundamental Rule:** To be deductible, an expense must be:
1. **Ordinary** - Common and accepted in your trade or business
2. **Necessary** - Helpful and appropriate for your business
3. **Reasonable** - Not lavish or extravagant

**Example Applications:**
\`\`\`
Deductible: $3,000 MacBook Pro for iOS development
- Ordinary: Standard tool for mobile developers
- Necessary: Required for iOS app development
- Reasonable: Appropriate cost for professional equipment

Not Deductible: $8,000 gaming setup for "testing games"
- Ordinary: Not typical business expense for web developers
- Necessary: Questionable business purpose
- Reasonable: Excessive for claimed purpose
\`\`\`

## Technology and Equipment Deductions

### Computer Hardware and Equipment
\`\`\`
Fully Deductible Equipment (100% business use):
- Development laptops and desktops: $2,000-5,000
- Monitors and displays: $300-1,500 each
- Keyboards and mice: $100-300
- External storage drives: $100-500
- Networking equipment: $200-800
- Backup power supplies: $150-400

Annual Deduction Example:
MacBook Pro: $3,500
Dell UltraSharp Monitor: $800
Mechanical keyboard: $200
External SSD: $300
Total Equipment Deduction: $4,800

Tax Savings (22% bracket): $1,056
Net Equipment Cost: $3,744
\`\`\`

### Software and Subscriptions
\`\`\`
Development Software (Annual Subscriptions):
- Adobe Creative Suite: $600-1,200
- JetBrains IntelliJ: $200-700
- Visual Studio Professional: $540
- Sketch/Figma Pro: $100-300
- Cloud hosting (AWS/Azure): $1,200-6,000
- Database licenses: $500-2,000

Productivity Software:
- Microsoft Office 365: $100
- Project management tools: $300-1,200
- Time tracking software: $200-500
- Accounting software: $200-600

Total Software Deductions: $3,000-12,000+ annually
\`\`\`

### Section 179 vs. Depreciation
\`\`\`
Section 179 Election (Immediate Deduction):
- Up to $1,160,000 in equipment purchases (2023)
- Must be placed in service during tax year
- Reduces current year taxable income

Example - $8,000 Equipment Purchase:
Section 179: $8,000 immediate deduction
Tax savings (24% bracket): $1,920
Net cost: $6,080

Depreciation Alternative:
5-year MACRS depreciation for computer equipment
Year 1: $1,600 (20%)
Years 2-5: Various percentages
\`\`\`

## Home Office Deduction

### Simplified Method
\`\`\`
Office Space: Up to 300 square feet
Rate: $5 per square foot
Maximum deduction: $1,500

Example:
Home office: 200 square feet
Deduction: 200 × $5 = $1,000
Tax savings (22% bracket): $220
\`\`\`

### Actual Expense Method
\`\`\`
Home Details:
Total home: 2,000 square feet
Office space: 300 square feet
Business percentage: 15%

Annual Home Expenses:
Mortgage interest: $15,000
Property taxes: $8,000
Utilities: $3,600
Insurance: $1,200
Maintenance: $2,400
Total: $30,200

Home Office Deduction: $30,200 × 15% = $4,530
Tax savings (22% bracket): $996

Comparison:
Simplified method: $1,500 deduction
Actual method: $4,530 deduction
Better choice: Actual method (saves additional $666)
\`\`\`

### Home Office Requirements
**Exclusive Use Test:**
- Space used ONLY for business
- Cannot be dining room table used occasionally
- Separate room or clearly defined area

**Regular Use Test:**
- Used for business on regular, ongoing basis
- Not just occasional or incidental use

**Principal Place of Business:**
- Primary location where business is conducted
- OR used regularly for administrative/management activities

## Professional Development and Education

### Deductible Education Expenses
\`\`\`
Professional Development:
- Technical conferences: $2,000-5,000
- Online courses (Udemy, Coursera): $500-2,000
- Professional certifications: $300-1,500
- Technical books and publications: $200-800
- Workshop and bootcamp fees: $1,000-10,000

Example Conference Deduction:
Registration: $1,500
Flight: $600
Hotel (3 nights): $450
Meals (50% deductible): $150
Total Deduction: $2,700

Requirements:
- Maintains or improves skills for current business
- Required by employer/client or helps maintain income
- Cannot be for new trade or business
\`\`\`

### Books, Publications, and Research
\`\`\`
Deductible Publications:
- Technical books and ebooks: $50-200 each
- Professional magazine subscriptions: $50-200
- Online documentation access: $100-500
- Research database subscriptions: $200-1,000

Annual Education Budget:
Books: $800
Subscriptions: $400
Online courses: $1,200
Conferences: $3,000
Total: $5,400

Tax savings (24% bracket): $1,296
Net cost: $4,104
\`\`\`

## Business Communication and Networking

### Internet and Phone Expenses
\`\`\`
Business Percentage Method:
Monthly internet bill: $100
Business use: 80%
Monthly deduction: $80
Annual deduction: $960

Cell Phone:
Monthly bill: $150
Business use: 60%
Monthly deduction: $90
Annual deduction: $1,080

Total Communication: $2,040 annually
\`\`\`

### Professional Memberships and Networking
\`\`\`
Deductible Memberships:
- Professional associations: $100-500
- Local business groups: $200-800
- Industry organizations: $300-1,000
- Coworking space membership: $1,200-3,600
- Professional LinkedIn Premium: $300

Networking Events:
- Meetup fees: $200-600
- Networking dinner costs: $500-1,500 (50% deductible)
- Business card printing: $100-300
\`\`\`

## Travel and Transportation

### Business Travel
\`\`\`
Deductible Travel Expenses:
- Flights for client meetings: 100% deductible
- Hotel accommodation: 100% deductible
- Rental cars: 100% deductible
- Meals while traveling: 50% deductible
- Conference travel: 100% deductible

Example Client Trip:
Round-trip flight: $800
Hotel (2 nights): $300
Car rental: $150
Meals: $200 (50% = $100 deductible)
Total deduction: $1,350
\`\`\`

### Vehicle Expenses
\`\`\`
Mileage Method (2023):
Business mileage rate: $0.655 per mile
Annual business miles: 8,000
Deduction: 8,000 × $0.655 = $5,240

Actual Expense Method:
Business percentage of total miles: 25%
Annual vehicle costs: $15,000
Deduction: $15,000 × 25% = $3,750

Choose higher deduction (mileage method)
\`\`\`

## Marketing and Business Promotion

### Website and Online Presence
\`\`\`
Deductible Website Costs:
- Domain registration: $15-50
- Web hosting: $100-500
- Website design and development: $1,000-10,000
- SEO tools and services: $500-3,000
- Social media management tools: $200-1,000

Portfolio and Marketing:
- Professional photography: $500-2,000
- Business card design and printing: $200-800
- Portfolio website development: $2,000-8,000
- LinkedIn Premium: $300
- Marketing automation tools: $1,200-3,600
\`\`\`

### Advertising and Promotion
\`\`\`
Business Advertising:
- Google Ads campaigns: $1,000-10,000
- Social media advertising: $500-5,000
- Professional directory listings: $200-1,000
- Industry publication ads: $500-3,000
- Promotional materials: $300-1,500
\`\`\`

## Professional Services and Consulting

### Legal and Professional Fees
\`\`\`
Deductible Professional Services:
- Accountant and tax preparer: $500-2,500
- Business attorney: $200-500/hour
- Business consultant: $150-400/hour
- Contract review services: $300-1,500
- Intellectual property attorney: $400-800/hour

Business Formation Costs:
- LLC formation: $500-1,500
- Operating agreement drafting: $800-2,000
- EIN application: $0 (DIY) or $200-500 (service)
- Business license fees: $50-500
\`\`\`

### Insurance Premiums
\`\`\`
Business Insurance (Fully Deductible):
- Professional liability (E&O): $800-3,000
- General liability: $400-1,200
- Cyber liability: $500-2,000
- Business property insurance: $300-1,000

Health Insurance:
- Self-employed health insurance: 100% deductible
- HSA contributions: Additional tax advantage
- Dental/vision premiums: Deductible if self-employed
\`\`\`

## Office Supplies and Materials

### General Office Expenses
\`\`\`
Deductible Supplies:
- Paper, pens, notebooks: $100-300
- Printer ink and maintenance: $200-500
- Filing cabinets and storage: $200-800
- Desk accessories: $100-400
- Office furniture: $500-3,000

Software and Apps:
- Productivity apps: $200-800
- Design software subscriptions: $600-2,400
- Cloud storage: $100-600
- Password managers: $50-200
\`\`\`

## Record Keeping and Documentation

### Documentation Requirements
\`\`\`
Required Records for Each Expense:
1. Receipt or canceled check
2. Date of expense
3. Amount of expense
4. Business purpose
5. Business relationship (if entertainment)

Digital Record Keeping:
- Expense tracking apps: Receipt Bank, Expensify
- Cloud storage: Google Drive, Dropbox
- Accounting software integration
- Photo documentation of receipts
\`\`\`

### Expense Tracking Systems
\`\`\`
Monthly Expense Review Process:
1. Categorize all business expenses
2. Separate business vs. personal
3. Calculate business-use percentages
4. Document business purpose
5. Store receipts and records

Recommended Categories:
- Equipment and software
- Home office expenses
- Professional development
- Travel and transportation
- Marketing and advertising
- Professional services
- Insurance premiums
- Communication expenses
\`\`\`

## Common Deduction Mistakes to Avoid

### Mistake 1: Personal vs. Business Confusion
\`\`\`
Not Deductible (Personal):
- Laptop used 50% for gaming
- Home internet for family use
- Meals not related to business
- Commuting to regular office
- Personal education unrelated to business

Deductible (Business):
- Laptop used exclusively for client work
- Business percentage of home internet
- Client meeting meals (50%)
- Travel between business locations
- Professional development in your field
\`\`\`

### Mistake 2: Inadequate Documentation
- Missing receipts for expenses
- No business purpose documentation
- Unclear business vs. personal use
- Failure to track mileage contemporaneously

### Mistake 3: Excessive Claims
- Claiming 100% business use when partially personal
- Unreasonable expense amounts for income level
- Claiming inappropriate expenses as business

## Advanced Deduction Strategies

### Timing Strategies
\`\`\`
Year-End Acceleration:
- Purchase equipment before December 31
- Pay January expenses in December
- Prepay annual software subscriptions
- Schedule professional development

Benefits:
- Immediate Section 179 deduction
- Accelerate tax savings
- Reduce current year taxable income
\`\`\`

### Business Structure Optimization
\`\`\`
Sole Proprietorship:
- All business expenses on Schedule C
- Reduces both income tax and self-employment tax

S-Corporation:
- Some expenses paid by corporation
- Some expenses reimbursed to owner
- Different tax treatment for each
\`\`\`

## Key Takeaways

- Business deductions can significantly reduce taxable income for developers
- Documentation is crucial - maintain detailed records and receipts
- Equipment purchases offer immediate tax benefits through Section 179
- Home office deduction can provide substantial savings for remote workers
- Professional development investments are fully deductible
- Communication and networking expenses support business growth
- Travel expenses must have clear business purpose
- Avoid common mistakes by clearly separating business and personal expenses
- Strategic timing of expenses can optimize tax benefits
- Regular expense tracking prevents missed deductions

Maximizing legitimate business deductions is essential for optimizing the tax benefits of freelance developer status while maintaining proper compliance with IRS requirements.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 95
      },
      {
        title: 'Advanced Expense Strategies and Documentation Best Practices',
        slug: 'advanced-expense-strategies-documentation-best-practices',
        content: `# Advanced Expense Strategies and Documentation Best Practices

## Advanced Deduction Strategies

Maximizing your business deductions goes beyond knowing what's deductible - it requires strategic planning, proper timing, and sophisticated record-keeping systems.

## Equipment Purchase Strategies

### Section 179 vs. Depreciation Analysis
\`\`\`
Equipment Purchase Decision: $15,000 Development Setup

Option 1: Section 179 (Immediate Deduction)
Year 1 deduction: $15,000
Tax savings (24% bracket): $3,600
Cash flow benefit: Immediate

Option 2: 5-Year MACRS Depreciation
Year 1: $3,000 (20%)
Year 2: $4,800 (32%)
Year 3: $2,880 (19.2%)
Year 4: $1,728 (11.52%)
Year 5: $1,728 (11.52%)
Year 6: $864 (5.76%)

Present Value Analysis (6% discount rate):
Section 179 PV: $3,600
Depreciation PV: $3,298
Advantage: Section 179 saves $302 in present value
\`\`\`

### Equipment Timing Strategies
\`\`\`
Year-End Equipment Purchase Strategy:

Scenario: December equipment purchase
Equipment cost: $8,000
Expected 2024 tax rate: 22%
Expected 2025 tax rate: 24%

Purchase December 2024:
Tax savings: $8,000 × 22% = $1,760
Net cost: $6,240

Purchase January 2025:
Tax savings: $8,000 × 24% = $1,920
Net cost: $6,080
Additional savings: $160

Decision factors:
- Cash flow needs
- Expected rate changes
- Income timing
- Equipment availability
\`\`\`

### Lease vs. Buy Analysis
\`\`\`
Equipment Decision: $12,000 Server Setup

Purchase Option:
Initial cost: $12,000
Section 179 deduction: $12,000
Tax savings: $2,880 (24%)
Net cost: $9,120
Residual value (3 years): $3,000
Total net cost: $6,120

Lease Option:
Monthly payment: $400
Annual payment: $4,800
3-year total: $14,400
Annual deduction: $4,800
Tax savings per year: $1,152
Net annual cost: $3,648
3-year net cost: $10,944

Analysis: Purchase saves $4,824 over 3 years
\`\`\`

## Home Office Optimization

### Advanced Home Office Strategies
\`\`\`
Multi-Use Space Strategy:

Total home: 3,000 sq ft
Dedicated office: 250 sq ft (8.3%)
Multi-use room: 400 sq ft, business use 60% of time

Calculation:
Dedicated office: 250 sq ft × 100% = 250 sq ft business
Multi-use room: 400 sq ft × 60% = 240 sq ft business
Total business space: 490 sq ft
Business percentage: 490 ÷ 3,000 = 16.3%

Annual home expenses: $35,000
Home office deduction: $35,000 × 16.3% = $5,705
Tax savings (24%): $1,369
\`\`\`

### Home Office Documentation
\`\`\`
Required Documentation:
1. Floor plan with measurements
2. Photos of business areas
3. Utility bills and home expenses
4. Calculation worksheets
5. Business activity logs

Sample Business Use Log:
Date: January 1-31
Office hours: 160 hours business use
Personal use: 20 hours (family computer use)
Business percentage: 160 ÷ 180 = 89%
\`\`\`

### Utilities and Home Expenses Allocation
\`\`\`
Detailed Home Expense Allocation:

Direct Business Expenses (100% deductible):
- Business phone line: $600
- Office internet upgrade: $240
- Business security system: $800

Indirect Business Expenses (allocated by percentage):
Mortgage interest: $18,000 × 16.3% = $2,934
Property taxes: $12,000 × 16.3% = $1,956
Utilities: $4,800 × 16.3% = $782
Insurance: $2,400 × 16.3% = $391
Maintenance: $3,600 × 16.3% = $587

Total Home Office Deduction: $7,290
\`\`\`

## Professional Development Investment Strategy

### Education ROI Analysis
\`\`\`
Professional Development Investment Plan:

Investment Options:
1. AWS Certification Program: $2,500
2. Full-Stack Bootcamp: $8,000
3. Conference Circuit (3 events): $6,000
4. Online Course Bundle: $1,200

ROI Analysis - AWS Certification:
Cost: $2,500
Tax deduction: $2,500
Tax savings (22%): $550
Net cost: $1,950

Expected income increase: $15,000 annually
Payback period: 1.56 months
5-year ROI: 3,746%

Training Investment Matrix:
Investment < 10% of annual income: Generally worthwhile
Investment 10-20% of annual income: Requires ROI analysis
Investment > 20% of annual income: High-risk, detailed justification needed
\`\`\`

### Continuing Education Strategy
\`\`\`
Annual Professional Development Budget:

Tier 1 (Essential): $3,000
- Industry certifications: $1,200
- Technical books and courses: $800
- Professional memberships: $400
- Local meetups and events: $600

Tier 2 (Growth): $3,000-6,000
- Major conferences: $2,500
- Advanced training programs: $2,000
- Coaching or mentoring: $1,500

Tier 3 (Investment): $6,000+
- Intensive bootcamps: $8,000-15,000
- University courses: $5,000-20,000
- International conferences: $4,000-8,000

Strategic Approach:
- Tier 1: Annual commitment
- Tier 2: Based on income growth
- Tier 3: Major career transitions
\`\`\`

## Travel and Entertainment Deductions

### Business Travel Optimization
\`\`\`
Multi-Purpose Trip Strategy:

Trip Details:
Primary purpose: Client meeting (3 days)
Extended stay: Personal vacation (4 days)
Total trip: 7 days

Allocation Rules:
Transportation: 100% deductible (primary purpose business)
Lodging: 3 days deductible (business portion)
Meals: 3 days at 50% deductible (business portion)

Cost Breakdown:
Flight: $800 (100% deductible)
Hotel: $200/night × 7 nights = $1,400 (3 nights deductible = $600)
Meals: $100/day × 7 days = $700 (3 days at 50% = $150 deductible)
Total deduction: $1,550 of $2,900 expenses

Tax savings (24%): $372
Effective vacation subsidy: 13%
\`\`\`

### Vehicle Expense Optimization
\`\`\`
Vehicle Strategy Analysis:

Current Situation:
Annual business miles: 15,000
Annual total miles: 20,000
Business percentage: 75%

Option 1: Mileage Method
Deduction: 15,000 × $0.655 = $9,825
Tax savings (22%): $2,161

Option 2: Actual Expense Method
Total vehicle costs: $18,000
Business deduction: $18,000 × 75% = $13,500
Tax savings (22%): $2,970
Additional savings: $809

Records Required for Actual Method:
- All vehicle expenses with receipts
- Detailed mileage logs
- Business purpose for each trip
- Beginning/ending odometer readings

Breakeven Analysis:
Mileage method better when: Total costs < $0.655 × business miles
Actual method better when: Total costs > $0.655 × business miles
\`\`\`

## Technology and Software Deduction Strategies

### Software Subscription Optimization
\`\`\`
Software Portfolio Strategy:

Essential Tools (100% business use):
- Development IDE: $500
- Cloud hosting: $3,600
- Project management: $800
- Time tracking: $300
- Accounting software: $400
Total: $5,600

Mixed-Use Tools (business percentage):
- Adobe Creative Suite: $600 (80% business = $480)
- Microsoft Office: $100 (90% business = $90)
- Dropbox Pro: $120 (70% business = $84)
Total deductible: $654

Optimization Strategy:
1. Separate business and personal accounts when possible
2. Document business use percentage
3. Consider annual vs. monthly billing for cash flow
4. Time renewals for tax optimization

Annual vs. Monthly Decision:
Adobe Creative Suite:
Monthly: $52.99 × 12 = $635.88
Annual: $599.88 (prepaid)
Savings: $36 plus immediate tax deduction
\`\`\`

### Equipment Refresh Strategy
\`\`\`
Technology Refresh Cycle:

3-Year Equipment Cycle:
Year 1: Purchase $8,000 equipment (Section 179)
Year 2: Minor upgrades $1,500
Year 3: Sell equipment $2,000, purchase new $10,000

Tax Impact Analysis:
Year 1: $8,000 deduction, save $1,920
Year 2: $1,500 deduction, save $360
Year 3: $10,000 deduction, $2,000 income, net $8,000 deduction, save $1,920

3-Year tax savings: $4,200
Equipment net cost: $15,500 - $2,000 - $4,200 = $9,300
Average annual equipment cost: $3,100

Benefits:
- Always current technology
- Maximum productivity
- Predictable tax deductions
- Professional image
\`\`\`

## Documentation and Record-Keeping Systems

### Digital Documentation Strategy
\`\`\`
Record Keeping Technology Stack:

Receipt Capture:
- Receipt Bank or Expensify app
- Automatic photo-to-expense conversion
- Integration with accounting software
- Cloud storage backup

Mileage Tracking:
- MileIQ or TripLog app
- GPS automatic tracking
- Business purpose classification
- IRS-compliant reporting

Time Tracking:
- Toggle or Harvest for project time
- Automatic classification
- Client billing integration
- Tax deduction documentation

Document Management:
- Google Drive or Dropbox organization
- Year-based folder structure
- Automatic backup systems
- Access from multiple devices
\`\`\`

### Audit-Proof Documentation
\`\`\`
IRS Audit Documentation Requirements:

For Each Expense Claim:
1. Cancelled check or receipt
2. Date of expenditure
3. Amount of expenditure
4. Business purpose
5. Business relationship (if applicable)

Documentation Checklist:
□ Receipts organized by category and date
□ Bank statements with business expenses highlighted
□ Mileage logs with business purpose
□ Home office measurements and photos
□ Equipment purchase documentation
□ Business use percentages calculated and supported
□ Calendar entries supporting business activities

Sample Expense Documentation:
Date: March 15, 2024
Amount: $1,247.99
Vendor: Apple Store
Description: iPad Pro for client presentations
Business Purpose: Mobile device for showing designs to clients
Supporting docs: Receipt, email chain about client presentation needs
\`\`\`

### Record Retention Requirements
\`\`\`
IRS Record Retention Rules:

Income Tax Returns: 7 years minimum
Supporting Documents: 7 years from filing date
Employment Tax Records: 4 years after due date
Asset Records: 3 years after asset disposed

Digital Storage Strategy:
- Scan all physical receipts
- Organize by tax year and category
- Maintain backups in multiple locations
- Use IRS-acceptable digital format
- Keep audit trail of digital processing

Annual Organization Process:
January: Set up new year folders
Quarterly: Review and categorize expenses
Year-end: Final categorization and backup
January (following year): Archive previous year records
\`\`\`

## Expense Allocation and Apportionment

### Mixed-Use Asset Allocation
\`\`\`
Business Use Percentage Calculation:

Smartphone Example:
Total monthly bill: $150
Business calls/data: 180 hours
Personal calls/data: 120 hours
Total usage: 300 hours
Business percentage: 180 ÷ 300 = 60%
Monthly business deduction: $150 × 60% = $90

Internet Service Example:
Monthly cost: $100
Business hours online: 160 hours
Personal hours online: 40 hours
Total hours: 200 hours
Business percentage: 160 ÷ 200 = 80%
Monthly business deduction: $100 × 80% = $80

Documentation Required:
- Usage logs or tracking apps
- Business activity schedules
- Time tracking records
- Purpose documentation
\`\`\`

### Shared Expense Strategies
\`\`\`
Co-working Space Allocation:

Shared Office Scenario:
Monthly rent: $2,000
Your business use: 40%
Partner's business use: 40%
Personal use: 20%

Your deduction calculation:
Total business use: 80%
Your portion of business use: 40% ÷ 80% = 50%
Your deductible amount: $2,000 × 40% = $800

Alternative: Formal Business Partnership
- Each partner reports 50% of expenses
- Each partner gets 50% of deductions
- Simplified allocation method
- Partnership tax return required
\`\`\`

## State and Local Considerations

### State-Specific Deduction Rules
\`\`\`
State Variation Examples:

California:
- Generally follows federal rules
- Additional depreciation limitations
- Stricter documentation requirements

New York:
- Different depreciation schedules
- Additional limitations on certain expenses
- Separate state forms required

Texas (No Income Tax):
- Focus on federal optimization
- Sales tax considerations
- Property tax implications

Multi-State Considerations:
- Client locations affect deductibility
- Travel between states
- Nexus rules for business presence
- Professional licensing requirements
\`\`\`

## Advanced Planning Strategies

### Income and Expense Matching
\`\`\`
Timing Strategy Example:

December Decision Points:
Current year income: $95,000
Expected next year income: $120,000
Current marginal rate: 22%
Expected next year rate: 24%

Strategies:
1. Accelerate expenses into current year
2. Defer income to next year (if possible)
3. Make equipment purchases before year-end
4. Prepay business expenses

Equipment Purchase Timing:
Purchase in December: 22% tax savings
Purchase in January: 24% tax savings
Difference: 2% = $200 on $10,000 purchase

Income Deferral Strategy:
December invoice: Receive payment January 1
Tax benefit: $25,000 × 2% rate difference = $500
Cash flow impact: Interest on $25,000 for 1 month
\`\`\`

### Business Structure Optimization for Deductions
\`\`\`
Entity Structure Impact:

Sole Proprietorship (Schedule C):
- All business expenses reduce income tax and self-employment tax
- Simple reporting structure
- Direct flow-through of deductions

Single-Member LLC:
- Same tax treatment as sole proprietorship
- Additional legal protection
- Professional credibility

S-Corporation Election:
- Some expenses paid by corporation
- Some expenses reimbursed to employee-owner
- Potential self-employment tax savings on distributions
- Additional complexity and cost

Deduction Optimization by Entity:
- Schedule C: Maximize all business expenses
- S-Corp: Balance salary vs. distribution strategy
- Consider accountable plan for employee reimbursements
\`\`\`

## Key Takeaways

- Strategic timing of equipment purchases maximizes tax benefits
- Section 179 election provides immediate deductions vs. depreciation
- Home office deduction can be optimized through actual expense method
- Mixed-use assets require careful documentation of business percentage
- Professional development investments provide immediate deductions and long-term ROI
- Digital record-keeping systems ensure audit-ready documentation
- Multi-purpose trips require careful allocation between business and personal
- Vehicle expense optimization depends on actual costs vs. mileage rates
- State-specific rules may affect federal deduction strategies
- Business entity structure impacts deduction optimization strategies

Advanced expense management combines tax knowledge, strategic planning, and meticulous documentation to maximize legitimate business deductions while maintaining full IRS compliance.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 105
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
        title: 'Business Expense Deductions Mastery Quiz',
        description: 'Test your knowledge of business deductions, documentation requirements, and optimization strategies',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'What is the maximum annual deduction for equipment purchases under Section 179 in 2023?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$500,000',
                '$1,160,000',
                '$2,000,000',
                'No limit'
              ]),
              correctAnswer: '$1,160,000',
              explanation: 'Section 179 allows immediate deduction of up to $1,160,000 in equipment purchases for 2023, phasing out when purchases exceed $2.89 million.',
              orderIndex: 1
            },
            {
              questionText: 'A developer uses their home internet for business 70% of the time. The monthly bill is $120. What is the annual business deduction?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$840',
                '$1,008',
                '$1,200',
                '$1,440'
              ]),
              correctAnswer: '$1,008',
              explanation: 'Business percentage: $120 × 70% = $84 monthly. Annual deduction: $84 × 12 = $1,008.',
              orderIndex: 2
            },
            {
              questionText: 'Which home office deduction method typically provides a higher deduction for larger office spaces?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Simplified method',
                'Actual expense method',
                'Both provide the same amount',
                'Neither is deductible'
              ]),
              correctAnswer: 'Actual expense method',
              explanation: 'The actual expense method allows deduction of actual home expenses based on business percentage, often exceeding the simplified method\'s $1,500 maximum.',
              orderIndex: 3
            },
            {
              questionText: 'What percentage of business meal expenses is typically deductible?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '100%',
                '75%',
                '50%',
                '25%'
              ]),
              correctAnswer: '50%',
              explanation: 'Business meals are generally 50% deductible, though there are exceptions for certain employee meals and entertainment.',
              orderIndex: 4
            },
            {
              questionText: 'Which of these is NOT a requirement for a home office deduction?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Exclusive use for business',
                'Regular use for business',
                'Principal place of business OR administrative use',
                'Separate entrance to the office space'
              ]),
              correctAnswer: 'Separate entrance to the office space',
              explanation: 'A separate entrance is not required. The space must be used exclusively and regularly for business, and be either the principal place of business or used for administrative activities.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 2 created with 2 lessons and 1 quiz');

    // Week 3: Quarterly Estimated Tax Payments
    const week3 = await prisma.week.create({
      data: {
        courseId: course7.id,
        weekNumber: 3,
        title: 'Quarterly Estimated Tax Payments',
        overview: 'Master the requirements and strategies for quarterly estimated tax payments, including calculation methods, safe harbor rules, and penalty avoidance.',
        learningObjectives: JSON.stringify([
          'Understand quarterly estimated tax payment requirements',
          'Calculate accurate quarterly payment amounts',
          'Apply safe harbor rules to avoid penalties',
          'Manage cash flow for tax payment obligations',
          'Navigate IRS payment systems and procedures'
        ]),
        estimatedHours: 8
      }
    });

    const week3lessons = [
      {
        title: 'Understanding Quarterly Estimated Tax Requirements',
        slug: 'understanding-quarterly-estimated-tax-requirements',
        content: `# Understanding Quarterly Estimated Tax Requirements

## Introduction to Quarterly Estimated Taxes

For freelance developers and 1099 contractors, quarterly estimated tax payments are not optional - they're a legal requirement. Unlike W-2 employees who have taxes withheld automatically, self-employed individuals must proactively pay taxes throughout the year.

## Who Must Pay Quarterly Estimated Taxes

### Basic Requirements
You must make quarterly estimated tax payments if you expect to owe $1,000 or more in taxes when you file your return, after subtracting withholding and refundable credits.

**Calculation Test:**
\`\`\`
Example 1: Freelance Developer
Expected total tax liability: $15,000
Withholding from spouse's W-2 job: $8,000
Net amount owed: $7,000

Result: Must make quarterly payments (exceeds $1,000)

Example 2: Part-Time Freelancer
Expected total tax liability: $12,000
Withholding from W-2 job: $11,200
Net amount owed: $800

Result: Quarterly payments not required (under $1,000)
\`\`\`

### Common Scenarios Requiring Quarterly Payments
\`\`\`
Scenario 1: Full-Time Freelancer
1099 income: $80,000
Business expenses: $15,000
Net income: $65,000
Self-employment tax: $9,180
Income tax: ~$8,500
Total tax: ~$17,680
Required quarterly payments: Yes

Scenario 2: Side Business
W-2 income: $60,000 (taxes withheld: $9,000)
Freelance income: $25,000
Net freelance income: $20,000
Additional SE tax: $2,826
Additional income tax: ~$4,400
Total additional tax: ~$7,226
Required quarterly payments: Yes (exceeds $1,000)

Scenario 3: Minimal Side Income
W-2 income: $75,000 (taxes withheld: $15,000)
Freelance income: $5,000
Net freelance income: $4,000
Additional tax: ~$1,100
Required quarterly payments: Yes (exceeds $1,000)
\`\`\`

## Understanding the Tax Components

### Self-Employment Tax
\`\`\`
Self-Employment Tax Calculation:
Rate: 15.3% (12.4% Social Security + 2.9% Medicare)
Applied to: Net self-employment income
Adjustment: Multiply net income by 92.35% first

Example:
Net business income: $70,000
SE income: $70,000 × 0.9235 = $64,645
SE tax: $64,645 × 0.153 = $9,891

Quarterly SE tax: $9,891 ÷ 4 = $2,473
\`\`\`

### Income Tax
\`\`\`
Income Tax Considerations:
- Progressive tax rates apply
- Business income adds to other income
- Consider standard/itemized deductions
- Account for tax credits

Example Calculation:
Other income (W-2): $50,000
Business income: $60,000
Less: SE tax deduction: $4,946
Adjusted Gross Income: $105,054
Less: Standard deduction: $13,850
Taxable income: $91,204

Tax calculation:
10%: $11,000 × 0.10 = $1,100
12%: $33,725 × 0.12 = $4,047
22%: $46,479 × 0.22 = $10,225
Total income tax: $15,372

Quarterly income tax: $15,372 ÷ 4 = $3,843
Plus quarterly SE tax: $2,473
Total quarterly payment: $6,316
\`\`\`

## Safe Harbor Rules

### Prior Year Safe Harbor
The safest method to avoid penalties is to pay at least 100% of last year's tax liability (110% if your prior year AGI exceeded $150,000).

\`\`\`
Safe Harbor Example:
2023 total tax liability: $18,000
2024 required safe harbor: $18,000 ÷ 4 = $4,500 quarterly

Benefits:
- No penalties regardless of current year income
- Predictable payment amounts
- Simple calculation
- Protection against income spikes

High-Income Safe Harbor:
2023 AGI: $200,000
2023 total tax: $35,000
2024 required safe harbor: $35,000 × 1.10 ÷ 4 = $9,625 quarterly
\`\`\`

### Current Year Safe Harbor
Pay 90% of the current year's tax liability to avoid penalties.

\`\`\`
Current Year Method:
2024 projected tax: $22,000
Required payments: $22,000 × 0.90 = $19,800
Quarterly payments: $19,800 ÷ 4 = $4,950

Risk: If income exceeds projections, penalties may apply
Benefit: Lower payments if income decreased from prior year
\`\`\`

### Comparison and Strategy
\`\`\`
Decision Matrix:

Use Prior Year Safe Harbor When:
- Income is volatile or unpredictable
- First year with significant 1099 income
- Want certainty and simplicity
- Prior year income was lower

Use Current Year Method When:
- Income decreased significantly from prior year
- Confident in income projections
- Need to minimize cash flow impact
- Have good tracking systems

Example Comparison:
Prior year tax: $25,000 (safe harbor: $6,250 quarterly)
Current year projection: $18,000 (90% method: $4,050 quarterly)
Savings with current year method: $2,200 quarterly
Risk: If actual tax exceeds $20,000, penalties apply
\`\`\`

## Payment Due Dates and Deadlines

### Quarterly Due Dates
\`\`\`
2024 Tax Year Payment Schedule:
Q1 (Jan-Mar): Due April 15, 2024
Q2 (Apr-May): Due June 17, 2024 (June 15 falls on Saturday)
Q3 (Jun-Aug): Due September 16, 2024
Q4 (Sep-Dec): Due January 15, 2025

Key Notes:
- Due dates are firm (no extensions for estimated taxes)
- If due date falls on weekend/holiday, payment due next business day
- Must pay by 11:59 PM ET on due date (online payments)
- Postmark rule applies for mailed payments
\`\`\`

### Late Payment Consequences
\`\`\`
Penalty Calculation:
Current penalty rate: ~8% annually (varies quarterly)
Applied separately to each quarter's underpayment
Calculated from due date to payment date

Example Penalty:
Required Q1 payment: $5,000
Actual Q1 payment: $3,000
Underpayment: $2,000
Days late: 90 days
Penalty: $2,000 × 8% × (90÷365) = $39

Annual impact of $2,000 underpayment per quarter: ~$160
\`\`\`

## Calculation Methods and Examples

### Basic Calculation Method
\`\`\`
Step-by-Step Calculation:

Step 1: Project Annual Income
1099 income estimate: $90,000
Business expenses: $18,000
Net business income: $72,000

Step 2: Calculate Self-Employment Tax
SE income: $72,000 × 0.9235 = $66,492
SE tax: $66,492 × 0.153 = $10,173

Step 3: Calculate Income Tax
Other income: $30,000
Net business income: $72,000
Less: SE tax deduction (50%): $5,087
AGI: $96,913
Less: Standard deduction: $13,850
Taxable income: $83,063

Income tax: $1,100 + $4,047 + $4,594 = $9,741

Step 4: Total Tax and Quarterly Payment
Total tax: $10,173 + $9,741 = $19,914
Quarterly payment: $19,914 ÷ 4 = $4,979
Round up for safety: $5,000
\`\`\`

### Variable Income Calculation
\`\`\`
Seasonal Business Example:

Q1 income: $15,000
Q2 income: $25,000
Q3 income: $35,000
Q4 income: $20,000
Total: $95,000

Option 1: Equal Quarterly Payments
Annual tax estimate: $21,000
Equal payments: $5,250 quarterly

Option 2: Annualized Income Method
Q1: ($15,000 × 4) × tax rate ÷ 4 = based on $60,000 annual
Q2: ($40,000 × 2) × tax rate ÷ 2 - Q1 payment
Q3: ($75,000 × 4/3) × tax rate × 3/4 - Q1&Q2 payments
Q4: Actual annual tax - Q1, Q2, Q3 payments

Benefits of Annualized Method:
- Lower early payments if income starts slow
- More accurate match to actual income timing
- Avoids penalties from uneven income
- More complex calculations required
\`\`\`

## Payment Methods and Systems

### Online Payment Options
\`\`\`
IRS Direct Pay (Free):
- Bank transfers (ACH)
- Same-day processing if before 8 PM ET
- Confirmation number provided
- No fees

Electronic Federal Tax Payment System (EFTPS):
- Government-operated system
- Batch payments possible
- Historical payment tracking
- Requires enrollment

Third-Party Processors:
- Credit/debit cards accepted (fees apply)
- Fees: 1.87% - 3.93% of payment
- Immediate confirmation
- Convenience vs. cost consideration

Example Fee Comparison:
$5,000 quarterly payment:
IRS Direct Pay: $0
EFTPS: $0
Credit card: $95-$197 (1.9%-3.9%)
Annual fees for credit cards: $380-$788
\`\`\`

### Payment Vouchers and Mail
\`\`\`
Form 1040ES Payment Vouchers:
- Include name, SSN, tax year, quarter
- Send with check or money order
- Mail to address based on state
- Allow 7-10 business days processing

Check Requirements:
- Payable to "United States Treasury"
- Include SSN and tax year in memo
- Use blue or black ink
- Ensure account has sufficient funds

Mailing Timeline:
Due date: January 15
Recommended mail date: January 8
Certified mail option: $3-5 extra cost
Provides proof of timely mailing
\`\`\`

## Record Keeping and Documentation

### Payment Tracking System
\`\`\`
Essential Records:
- Payment confirmations/receipts
- Bank statements showing withdrawals
- Form 1040ES vouchers (if mailed)
- Calculation worksheets
- Income projection documentation

Spreadsheet Tracking Example:
Date       Quarter  Amount   Method      Confirmation
4/15/2024  Q1      $5,000   Direct Pay  123456789
6/17/2024  Q2      $5,000   EFTPS      987654321
9/16/2024  Q3      $5,200   Direct Pay  456789123
1/15/2025  Q4      $4,800   Check      Check #1234

Running Total: $20,000
Safe Harbor Met: Yes (2023 tax was $18,000)
\`\`\`

### Integration with Business Accounting
\`\`\`
Chart of Accounts Setup:
- Tax Payable - Federal Income
- Tax Payable - Self Employment
- Estimated Tax Payments (Asset account)

Monthly Journal Entries:
Dr. Income Tax Expense: $1,667
Dr. Self-Employment Tax Expense: $833
Cr. Tax Payable - Federal: $1,667
Cr. Tax Payable - SE: $833

Quarterly Payment Entry:
Dr. Tax Payable - Federal: $3,333
Dr. Tax Payable - SE: $1,667
Cr. Cash: $5,000
\`\`\`

## Common Mistakes and How to Avoid Them

### Mistake 1: Underestimating Income
\`\`\`
Problem: Conservative income estimates leading to underpayment
Example:
Projected income: $70,000
Actual income: $95,000
Underpayment penalty: ~$200-400

Solution: Add 10-15% buffer to projections
Projected income: $80,000 (15% buffer)
Result: Overpayment becomes refund, no penalties
\`\`\`

### Mistake 2: Ignoring State Estimated Taxes
\`\`\`
Many developers focus only on federal taxes:
Federal quarterly payment: $5,000
State quarterly payment: $1,200
Total quarterly obligation: $6,200

Overlooking state taxes can result in:
- State penalty charges
- Interest on underpayments
- Last-minute cash flow problems
\`\`\`

### Mistake 3: Poor Cash Flow Management
\`\`\`
Cash Flow Planning:
Set aside taxes immediately when income received:
Invoice payment: $10,000
Tax withholding (30%): $3,000
Available for expenses: $7,000

Separate Tax Savings Account:
- Transfer tax portion immediately
- Earn interest until payment due
- Prevents spending tax money
- Simplifies quarterly payments
\`\`\`

## Advanced Strategies

### Timing Strategy for Year-End
\`\`\`
December Income Management:
High-income year: Defer income to January
- Reduces current year tax obligation
- Lowers Q4 estimated payment
- May reduce safe harbor requirement

Low-income year: Accelerate income to December
- Increases current year income
- May benefit from lower tax bracket
- Reduces following year estimates
\`\`\`

### Multiple Business Coordination
\`\`\`
Multiple Income Streams:
Freelance development: $60,000
Consulting business: $40,000
Rental income: $20,000
Total: $120,000

Combined tax planning:
- Single quarterly calculation
- Consider all income sources
- Coordinate business expenses
- Optimize entity structures
\`\`\`

## Key Takeaways

- Quarterly estimated taxes are required when owing $1,000+ after withholding
- Safe harbor rules provide penalty protection (100%/110% of prior year)
- Current year 90% method can reduce payments but increases risk
- Payment due dates are fixed and cannot be extended
- Online payment systems are free and provide immediate confirmation
- Proper record keeping is essential for tax filing and audit protection
- Buffer projections by 10-15% to avoid underpayment penalties
- Coordinate federal and state estimated tax requirements
- Cash flow management requires setting aside taxes when income is received
- Year-end income timing can optimize quarterly payment requirements

Mastering quarterly estimated taxes ensures compliance, avoids penalties, and provides predictable cash flow management for your freelance development business.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 85
      },
      {
        title: 'Payment Strategies and Cash Flow Management',
        slug: 'payment-strategies-cash-flow-management',
        content: `# Payment Strategies and Cash Flow Management

## Strategic Approach to Quarterly Tax Payments

Effective quarterly tax payment management goes beyond basic compliance - it involves strategic planning, cash flow optimization, and risk management to minimize tax liability while maintaining adequate liquidity.

## Cash Flow Planning for Tax Payments

### The Tax Reserve System
\`\`\`
Automated Tax Reserve Strategy:

Every Payment Received:
Invoice amount: $8,000
Immediate tax reserve (30%): $2,400
Available for business: $5,600

Tax Reserve Account Structure:
- Separate high-yield savings account
- Automatic transfer on payment receipt
- Earn interest until tax payment due
- Never touched for business expenses

Annual Interest Benefit:
Average quarterly balance: $12,000
Interest rate: 4.5% APY
Annual interest earned: $540
Effective tax payment reduction: $540
\`\`\`

### Variable Income Cash Flow Management
\`\`\`
Seasonal Business Example:

Monthly Income Pattern:
Jan: $3,000    Jul: $12,000
Feb: $4,000    Aug: $15,000
Mar: $6,000    Sep: $10,000
Apr: $8,000    Oct: $8,000
May: $10,000   Nov: $5,000
Jun: $12,000   Dec: $4,000

Quarterly Income:
Q1: $13,000
Q2: $30,000
Q3: $37,000
Q4: $17,000

Tax Reserve Management:
Q1 reserve: $3,900 (30% of $13,000)
Q2 reserve: $9,000 (30% of $30,000)
Q3 reserve: $11,100 (30% of $37,000)
Q4 reserve: $5,100 (30% of $17,000)

Payment Strategy:
Q1 payment due April 15: Use Q1 reserve ($3,900) + buffer
Q2 payment due June 17: Use Q2 reserve ($9,000)
Q3 payment due Sep 16: Use Q3 reserve ($11,100)
Q4 payment due Jan 15: Use Q4 reserve ($5,100) + year-end adjustment
\`\`\`

## Advanced Payment Timing Strategies

### Safe Harbor Optimization
\`\`\`
Strategy Selection Matrix:

Scenario 1: Income Growth
Prior year tax: $15,000
Current year projected: $25,000

Option A - Prior Year Safe Harbor:
Quarterly payments: $3,750
Annual total: $15,000
Underpayment at filing: $10,000
No penalties, but large year-end payment

Option B - Current Year 90%:
Quarterly payments: $5,625
Annual total: $22,500
Underpayment at filing: $2,500
Risk of penalties if projection wrong

Recommendation: Hybrid approach
Q1-Q2: Use prior year safe harbor ($7,500)
Q3-Q4: Adjust to current year estimates ($11,250)
Total: $18,750, minimizes penalties and cash outlay
\`\`\`

### Income Averaging Strategy
\`\`\`
Annualized Income Method Benefits:

Traditional Equal Payments:
Annual income: $100,000 (uneven throughout year)
Equal quarterly payments: $5,500 each
Total: $22,000

Annualized Income Method:
Q1: Income $8,000 × 4 = $32,000 annualized
Q1 payment based on $32,000: $2,200

Q2: Income $28,000 × 2 = $56,000 annualized
Q2 payment: $4,200 - $2,200 = $2,000

Q3: Income $60,000 × 4/3 = $80,000 annualized
Q3 payment: $5,800 - $4,200 = $1,600

Q4: Final reconciliation: $22,000 - $7,800 = $14,200

Cash Flow Benefits:
Lower early payments when cash is tight
Higher payments when income is strong
Matches payment timing to income timing
Reduces borrowing needs for tax payments
\`\`\`

## Payment Method Optimization

### Cost-Benefit Analysis of Payment Methods
\`\`\`
Payment Method Comparison ($5,000 quarterly payment):

IRS Direct Pay:
Cost: $0
Processing: Same day (before 8 PM ET)
Convenience: High (online, 24/7)
Record keeping: Automatic confirmation

EFTPS:
Cost: $0
Processing: Next business day
Convenience: Medium (requires enrollment)
Record keeping: Comprehensive history

Credit Card:
Cost: $95-$197 per payment (1.9%-3.9%)
Processing: Immediate
Convenience: High
Benefits: Rewards points/cash back
Record keeping: Credit card statement

Annual Analysis - Credit Card Strategy:
Annual fees: $380-$788
Cash back (2%): $400 ($20,000 in payments)
Net cost: -$20 to $388
Additional benefit: Extended payment float (30 days)
\`\`\`

### Strategic Credit Card Usage
\`\`\`
Credit Card Tax Payment Strategy:

Benefits:
- 30-45 day payment float
- Rewards/cash back potential
- Emergency cash flow buffer
- Simplified record keeping

Optimal Scenario:
High rewards card: 2% cash back
Annual tax payments: $20,000
Cash back earned: $400
Processing fees: $380
Net benefit: $20

Plus float benefit:
$5,000 × 4 payments × 30 days float
Opportunity cost saved: $200 (at 4% money market rate)
Total benefit: $220 annually

Risk Management:
Only use if you have cash available
Pay card balance immediately when due
Don't rely on credit for tax obligations
Monitor cash flow carefully
\`\`\`

## Multi-State Tax Considerations

### Coordination of State and Federal Payments
\`\`\`
Multi-State Example: Remote Developer

Resident State: California
Client States: New York, Texas
Work State: California (remote)

Tax Obligations:
Federal: $18,000 annually
California: $4,200 annually
New York: $800 (nonresident filing)
Texas: $0 (no income tax)

Quarterly Payment Schedule:
Federal: $4,500 per quarter
California: $1,050 per quarter
New York: $200 per quarter
Total: $5,750 per quarter

Cash Flow Impact:
Federal and California coordinated due dates
New York separate due dates may differ
Plan for potential double taxation (resolved at filing)
Keep detailed records for credit calculations
\`\`\`

### State-Specific Considerations
\`\`\`
High Tax States (CA, NY, NJ):
- Higher quarterly payments required
- More complex calculation rules
- Separate safe harbor requirements
- Additional penalties and interest

No Income Tax States (TX, FL, WA):
- Focus on federal optimization
- Consider relocation for tax planning
- Sales tax implications for services
- Simplified quarterly planning

Example - California vs. Texas:
Same $100,000 income:
Texas resident: $22,000 federal tax
California resident: $22,000 federal + $6,000 state
Annual savings: $6,000 by relocating
Quarterly payment reduction: $1,500
\`\`\`

## Technology and Automation Tools

### Automated Payment Systems
\`\`\`
Tax Payment Automation Setup:

Bank Account Structure:
Operating account: Daily business transactions
Tax reserve account: Automatic transfers
Payment account: Dedicated for tax payments

Automation Rules:
1. Invoice payment received → 30% to tax reserve
2. 5 days before due date → Transfer to payment account
3. Due date → Automatic payment to IRS
4. Confirmation → Update accounting system

Software Integration:
QuickBooks: Automatic tax calculation and reserve
FreshBooks: Tax percentage settings and transfers
Wave: Simple percentage-based reserves
Xero: Advanced tax planning and payments

Benefits:
- Never miss payment due dates
- Automatic cash reserve management
- Reduced manual calculation errors
- Integrated accounting records
\`\`\`

### Cash Flow Forecasting Tools
\`\`\`
Cash Flow Projection Model:

Input Variables:
- Monthly income projections
- Business expense timing
- Tax payment due dates
- Capital expenditure plans
- Personal draw requirements

Output Analysis:
- Monthly cash flow forecast
- Tax payment funding status
- Potential cash shortage alerts
- Optimal payment timing recommendations

Example Projection:
Month     Income    Expenses   Tax Pmts   Net Cash   Balance
Jan       $8,000    $3,000     $0         $5,000     $25,000
Feb       $6,000    $3,500     $0         $2,500     $27,500
Mar       $10,000   $4,000     $0         $6,000     $33,500
Apr       $12,000   $3,000     $5,500     $3,500     $37,000
May       $9,000    $3,500     $0         $5,500     $42,500
Jun       $11,000   $4,000     $5,500     $1,500     $44,000

Analysis: Adequate cash flow for tax payments
Alert: None required
\`\`\`

## Risk Management and Contingency Planning

### Underpayment Risk Mitigation
\`\`\`
Risk Scenarios and Mitigation:

Scenario 1: Income Exceeds Projections
Original projection: $80,000
Actual income: $105,000
Additional tax owed: $5,500

Mitigation Strategies:
- Quarterly income review and adjustment
- 15% buffer in payment calculations
- Mid-year payment increases
- Year-end estimated payment

Scenario 2: Unexpected Large Contract
Surprise contract: $50,000 (Q4)
Tax impact: $14,000 additional
Q4 payment adjustment needed: $10,000

Mitigation Strategies:
- Immediate tax reserve (30% of contract)
- Revised Q4 estimated payment
- Possible voluntary Q5 payment (by Jan 31)
- Form 2210 annualized income method

Scenario 3: Business Expense Reduction
Projected expenses: $25,000
Actual expenses: $15,000
Taxable income increase: $10,000
Additional tax: $3,000

Mitigation Strategies:
- Conservative expense projections
- Quarterly expense tracking
- Equipment purchase timing
- Year-end expense acceleration
\`\`\`

### Emergency Cash Flow Management
\`\`\`
Cash Flow Crisis Management:

Short-term Liquidity Solutions:
- Business line of credit: 1-2% above prime
- Invoice factoring: 2-5% fee
- Equipment financing: 5-8% APR
- Personal credit cards: 15-25% APR (last resort)

Tax Payment Emergency Options:
- IRS installment agreement: Setup fee + interest
- Credit card payment: Processing fees
- Borrowing from retirement accounts: Penalties/taxes
- Family/personal loans: Document properly

Cost Comparison (Q4 payment $6,000 shortage):
Line of credit (3 months): $6,000 × 7% × 3/12 = $105
Credit card (3 months): $6,000 × 18% × 3/12 = $270
IRS installment: $6,000 × 8% + $149 setup = $269
Invoice factoring: $6,000 × 3% = $180

Recommendation: Line of credit (lowest cost)
\`\`\`

## Year-End Planning and Reconciliation

### Fourth Quarter Optimization
\`\`\`
Q4 Planning Checklist:

Income Timing:
□ Evaluate December invoicing vs. January
□ Consider bonus/project completion timing
□ Assess impact on current year vs. next year taxes
□ Review client payment schedules

Expense Timing:
□ Accelerate planned equipment purchases
□ Pay January expenses in December
□ Consider Section 179 election timing
□ Review deductible expense opportunities

Tax Payment Adjustments:
□ Calculate actual year-to-date tax liability
□ Compare to paid quarterly payments
□ Adjust Q4 payment accordingly
□ Consider voluntary additional payment

Example Q4 Adjustment:
Actual annual tax: $24,000
Q1-Q3 payments: $16,500
Required Q4 payment: $7,500
Safe harbor requirement: $5,000
Additional payment recommended: $2,500
\`\`\`

### Annual Reconciliation Process
\`\`\`
Tax Filing Reconciliation:

Step 1: Calculate Actual Tax Liability
Total tax per return: $23,500
Less: Quarterly payments: $20,000
Balance due: $3,500

Step 2: Analyze Payment Adequacy
Safe harbor requirement: $18,000 (100% prior year)
Actual payments: $20,000
Safe harbor met: Yes (no penalties)
Overpayment: $2,000

Step 3: Plan Following Year
Current year tax: $23,500
Next year safe harbor: $23,500
Quarterly requirement: $5,875
Increase from current: $875 per quarter

Step 4: Document Lessons Learned
Income projection accuracy: +15% actual vs. projected
Expense projection accuracy: -8% actual vs. projected
Payment strategy effectiveness: Successful
Adjustments for next year: Improve income forecasting
\`\`\`

## Advanced Strategies for High Earners

### Progressive Tax Planning
\`\`\`
High-Income Considerations ($200,000+ net income):

Tax Rate Planning:
Regular rates: 24%-32%-35%-37%
Self-employment: 15.3% (on first $160,200)
State taxes: 0%-13.3% (varies by state)
Total marginal rate: 40%-50%+

Payment Strategies:
- Maximize prior year safe harbor (110% rule)
- Consider income deferral strategies
- Optimize business structure (S-corp election)
- Implement retirement plan contributions

Example - S-Corp Election Impact:
Traditional 1099: $200,000 income
SE tax: $27,000 (15.3% on $160,200 + 2.9% on remainder)
Income tax: ~$35,000
Total: ~$62,000

S-Corp Election:
Reasonable salary: $120,000
Payroll taxes: $9,180 (employee) + $9,180 (employer)
Distribution: $80,000 (no SE tax)
Income tax: Similar to above
Total: ~$53,000
Savings: ~$9,000 annually
\`\`\`

## Key Takeaways

- Automate tax reserves (30% of each payment) to separate accounts
- Coordinate quarterly payment timing with seasonal income patterns
- Use safe harbor rules strategically based on income growth trends
- Consider payment method costs vs. benefits (credit cards for rewards)
- Plan for multi-state tax obligations and coordination
- Implement technology solutions for automation and forecasting
- Maintain contingency plans for underpayment scenarios
- Optimize Q4 timing for income and expense recognition
- Document payment strategies and reconcile annually for improvement
- High earners should consider business structure optimization

Effective quarterly tax payment management combines compliance with strategic cash flow optimization, ensuring you meet obligations while minimizing both tax liability and cash flow disruption to your business operations.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 100
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

    // Week 3 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week3.id,
        title: 'Quarterly Estimated Tax Payments Quiz',
        description: 'Test your knowledge of quarterly tax requirements, safe harbor rules, and payment strategies',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'What is the minimum amount you must expect to owe (after withholding) to require quarterly estimated tax payments?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$500',
                '$1,000',
                '$1,500',
                '$2,000'
              ]),
              correctAnswer: '$1,000',
              explanation: 'You must make quarterly estimated tax payments if you expect to owe $1,000 or more when you file your return, after subtracting withholding and refundable credits.',
              orderIndex: 1
            },
            {
              questionText: 'For high-income taxpayers (prior year AGI > $150,000), what percentage of prior year tax must be paid to meet safe harbor requirements?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '100%',
                '105%',
                '110%',
                '115%'
              ]),
              correctAnswer: '110%',
              explanation: 'High-income taxpayers must pay 110% of the prior year\'s tax liability to meet safe harbor requirements and avoid penalties.',
              orderIndex: 2
            },
            {
              questionText: 'What are the 2024 quarterly estimated tax payment due dates?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'March 15, June 15, September 15, December 15',
                'April 15, June 15, September 15, January 15',
                'April 15, July 15, October 15, January 15',
                'March 31, June 30, September 30, December 31'
              ]),
              correctAnswer: 'April 15, June 15, September 15, January 15',
              explanation: 'The quarterly due dates are April 15, June 15, September 15, and January 15 of the following year.',
              orderIndex: 3
            },
            {
              questionText: 'If a developer has $80,000 net self-employment income, approximately how much self-employment tax do they owe?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$10,640',
                '$11,304',
                '$12,240',
                '$12,960'
              ]),
              correctAnswer: '$11,304',
              explanation: 'SE tax = ($80,000 × 0.9235) × 0.153 = $73,880 × 0.153 = $11,304. The 0.9235 factor accounts for the employer-equivalent portion.',
              orderIndex: 4
            },
            {
              questionText: 'What is the main advantage of using the annualized income method for quarterly payments?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'It eliminates the need for quarterly payments',
                'It matches payment amounts to income timing throughout the year',
                'It reduces the total tax owed',
                'It extends the payment due dates'
              ]),
              correctAnswer: 'It matches payment amounts to income timing throughout the year',
              explanation: 'The annualized income method allows lower payments early in the year when income is lower and higher payments when income increases, matching cash flow to payment obligations.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 3 created with 2 lessons and 1 quiz');

    // Week 4: Home Office Deduction and Equipment Depreciation
    const week4 = await prisma.week.create({
      data: {
        courseId: course7.id,
        weekNumber: 4,
        title: 'Home Office Deduction and Equipment Depreciation',
        overview: 'Master home office deduction rules, equipment depreciation strategies, and maximize tax benefits from your home-based development business.',
        learningObjectives: JSON.stringify([
          'Understand home office deduction eligibility requirements',
          'Calculate home office deductions using both methods',
          'Navigate equipment depreciation vs. immediate expensing',
          'Optimize tax benefits from home office setup',
          'Maintain proper documentation for audit protection'
        ]),
        estimatedHours: 8
      }
    });

    const week4lessons = [
      {
        title: 'Mastering the Home Office Deduction',
        slug: 'mastering-home-office-deduction',
        content: `# Mastering the Home Office Deduction

## Introduction to Home Office Deduction

The home office deduction is one of the most valuable tax benefits available to freelance developers, yet it's also one of the most misunderstood. Properly claiming this deduction can save thousands of dollars annually while creating a legitimate business expense for space you're already paying for.

## Eligibility Requirements

### The Three-Part Test

To qualify for the home office deduction, your home office must meet ALL three requirements:

**1. Exclusive Use Test**
Your office space must be used ONLY for business purposes.

\`\`\`
Qualifying Examples:
✅ Spare bedroom used only for development work
✅ Converted garage used exclusively for business
✅ Separate room with door that closes
✅ Basement area partitioned off for business only

Non-Qualifying Examples:
❌ Kitchen table where family also eats
❌ Living room corner with personal TV nearby
❌ Bedroom where you also sleep
❌ Shared space with personal activities

Gray Area Example:
Bedroom with business desk and personal dresser:
- If desk area is clearly defined and never used personally: May qualify
- If entire room has mixed use: Does not qualify
- Solution: Physical separation or dedicated room
\`\`\`

**2. Regular Use Test**
The space must be used for business on a regular, ongoing basis.

\`\`\`
Regular Use Examples:
✅ Daily use for client work (even if not full-time)
✅ Consistent schedule (e.g., 20 hours/week)
✅ Primary location for administrative tasks
✅ Regular client meetings or calls

Irregular Use Examples:
❌ Occasional weekend work
❌ Storage of business equipment only
❌ Infrequent or sporadic use
❌ Emergency backup workspace only

Documentation Strategy:
- Keep calendar of business activities
- Track hours worked from home office
- Maintain client meeting logs
- Document project work completed
\`\`\`

**3. Principal Place of Business Test**
Your home office must be either:
- Your main place of business, OR
- Used regularly for administrative or management activities

\`\`\`
Principal Place of Business:
✅ Freelance developer working primarily from home
✅ Consultant meeting clients at their offices but doing work at home
✅ Developer who codes at home but meets clients elsewhere

Administrative Use:
✅ Bookkeeping and accounting activities
✅ Client communication and project management
✅ Billing and invoice generation
✅ Business planning and strategy

Not Administrative:
❌ Casual email checking
❌ Occasional phone calls
❌ Minor business tasks
❌ Personal financial management
\`\`\`

## Calculation Methods

### Simplified Method
\`\`\`
Simplified Method Overview:
- Maximum 300 square feet
- $5 per square foot
- Maximum deduction: $1,500
- No depreciation of home
- No actual expense tracking required

Calculation Example:
Home office: 200 square feet
Deduction: 200 × $5 = $1,000

Benefits:
- Simple calculation
- Minimal record keeping
- No complex depreciation
- Safe from audit challenges

Drawbacks:
- Limited deduction amount
- May be less than actual method
- No depreciation benefits
- Cannot deduct actual expenses
\`\`\`

### Actual Expense Method
\`\`\`
Actual Expense Calculation Process:

Step 1: Measure Office and Home
Total home square footage: 2,500
Office square footage: 350
Business percentage: 350 ÷ 2,500 = 14%

Step 2: Identify Home Expenses
Mortgage interest: $18,000
Property taxes: $8,500
Insurance: $2,400
Utilities: $3,600
Maintenance/repairs: $2,800
Depreciation: $4,200
Total expenses: $39,500

Step 3: Calculate Deduction
Direct business expenses: 100% deductible
Indirect business expenses: 14% deductible

Direct Expenses (100%):
Business phone line: $600
Office renovations: $3,200
Security system (business portion): $800
Total direct: $4,600

Indirect Expenses (14%):
Mortgage interest: $18,000 × 14% = $2,520
Property taxes: $8,500 × 14% = $1,190
Insurance: $2,400 × 14% = $336
Utilities: $3,600 × 14% = $504
Maintenance: $2,800 × 14% = $392
Depreciation: $4,200 × 14% = $588
Total indirect: $5,530

Total Home Office Deduction: $4,600 + $5,530 = $10,130

Tax Savings (24% bracket): $10,130 × 24% = $2,431
\`\`\`

### Method Comparison Analysis
\`\`\`
Decision Matrix:

Simplified Method Better When:
- Office space < 300 square feet
- Home expenses are relatively low
- Want maximum simplicity
- Concerned about audit risk
- First year claiming deduction

Actual Method Better When:
- Office space > 300 square feet
- High home expenses (large mortgage, utilities)
- Significant direct business expenses
- Comfortable with detailed record keeping
- Maximum tax benefit desired

Example Comparison:
Office size: 400 square feet
Home expenses: $35,000
Business percentage: 16%

Simplified Method:
Maximum office considered: 300 sq ft
Deduction: 300 × $5 = $1,500

Actual Method:
Deduction: $35,000 × 16% = $5,600
Plus direct expenses: $2,000
Total: $7,600

Benefit of Actual Method: $6,100 additional deduction
Tax savings difference: $1,464 (24% bracket)
\`\`\`

## Home Ownership vs. Rental

### Homeowners
\`\`\`
Deductible Expenses for Homeowners:

Mortgage Interest:
- Interest portion of payments
- Points paid on mortgage
- Home equity loan interest (if used for business)

Property Taxes:
- Real estate taxes
- Special assessments
- Local improvement taxes

Insurance:
- Homeowner's insurance premiums
- Liability insurance
- Natural disaster coverage

Utilities:
- Electric and gas
- Water and sewer
- Trash collection
- Internet and cable (business portion)

Maintenance and Repairs:
- Painting and decorating
- Plumbing and electrical repairs
- HVAC maintenance
- Lawn care and landscaping

Home Depreciation:
- Basis in home (purchase price + improvements - land value)
- Depreciated over 39 years (nonresidential) or 27.5 years (residential)
- Straight-line depreciation method

Depreciation Example:
Home purchase price: $400,000
Land value: $80,000
Depreciable basis: $320,000
Annual depreciation: $320,000 ÷ 39 = $8,205
Business portion: $8,205 × 15% = $1,231
\`\`\`

### Renters
\`\`\`
Deductible Expenses for Renters:

Rent:
- Monthly rent payments
- Security deposits (when applied to rent)
- Late fees (if business-related)

Utilities (if paid separately):
- Electric and gas
- Water and sewer
- Internet and cable (business portion)
- Phone service

Maintenance (if tenant responsibility):
- Minor repairs and upkeep
- Cleaning supplies and services
- Pest control

Renter's Insurance:
- Property coverage for business equipment
- Liability coverage

Example Calculation:
Monthly rent: $2,000
Annual rent: $24,000
Office percentage: 12%
Rent deduction: $24,000 × 12% = $2,880

Additional utilities: $1,800 × 12% = $216
Renter's insurance: $600 × 12% = $72
Total renter deduction: $3,168
\`\`\`

## Special Considerations and Advanced Strategies

### Multi-Use Spaces
\`\`\`
Handling Partially Qualified Spaces:

Scenario: Large room with office area and exercise equipment

Option 1: Partial Room Method
Total room: 400 square feet
Office area: 250 square feet (clearly defined)
Business percentage of room: 250 ÷ 400 = 62.5%
Home percentage: Total room ÷ home
Final percentage: (400 ÷ 2,500) × 62.5% = 10%

Option 2: Time-Based Allocation
Room used for business: 40 hours/week
Room used for personal: 10 hours/week
Business percentage: 40 ÷ 50 = 80%
Apply to room percentage: 16% × 80% = 12.8%

Documentation Requirements:
- Floor plan showing business area
- Photos of space layout
- Time logs of business vs. personal use
- Clear physical separation markers
\`\`\`

### Home Improvements and Renovations
\`\`\`
Business-Related Home Improvements:

Direct Business Improvements (100% deductible):
- Office built-ins and custom shelving
- Business-specific lighting fixtures
- Sound-proofing for recording/calls
- Network wiring for office area
- Security system for business protection

Indirect Business Improvements (percentage deductible):
- New HVAC system
- Roof replacement
- Windows and doors
- Flooring throughout home
- Electrical upgrades

Improvement vs. Repair:
Repair (currently deductible):
- Fixing broken window in office
- Repainting office walls
- Replacing office carpet
- Repairing office electrical outlet

Improvement (depreciated):
- Adding new window to office
- Installing hardwood floors
- Upgrading electrical panel
- Adding central air conditioning

Timing Strategy:
Plan improvements before claiming home office:
- Increases depreciable basis
- Maximizes long-term deductions
- Avoids mid-year complications

Example:
Office renovation: $15,000
100% business improvement: Immediately deductible
Tax savings: $15,000 × 24% = $3,600
Net cost: $11,400
\`\`\`

### Depreciation Recapture on Sale
\`\`\`
Understanding Depreciation Recapture:

The Downside Risk:
When you sell your home, depreciation claimed must be "recaptured"

Example:
Home office claimed: 5 years
Annual depreciation: $2,000
Total depreciation claimed: $10,000

Upon sale:
Gain on home sale: $50,000
Less: Primary residence exclusion: $250,000 (single)
Taxable gain: $0

BUT: Depreciation recapture: $10,000
Taxed at 25% rate: $2,500

Mitigation Strategies:
1. Use simplified method (no depreciation)
2. Stop claiming home office before sale
3. Convert to rental before sale
4. Consider Section 121 exclusion timing

Break-Even Analysis:
Annual tax savings: $2,000 × 24% = $480
Future recapture cost: $10,000 × 25% = $2,500
Years to break-even: $2,500 ÷ $480 = 5.2 years
Recommendation: If planning to sell within 5 years, consider simplified method
\`\`\`

## Documentation and Record Keeping

### Essential Documentation
\`\`\`
IRS Audit-Ready Documentation:

Physical Measurements:
- Detailed floor plan with measurements
- Photos of office space showing exclusive business use
- Photos showing clear separation from personal areas
- Square footage calculations and worksheets

Financial Records:
- All home-related receipts and invoices
- Mortgage statements and property tax bills
- Utility bills with business percentage calculations
- Insurance policies and payment records
- Repair and maintenance receipts

Business Activity Logs:
- Daily or weekly office usage logs
- Client meeting records and locations
- Project work completed from home office
- Administrative activities performed

Example Documentation File:
- 2024 Home Office folder
  - Floor plan and photos
  - Expense receipts by category
  - Calculation worksheets
  - Usage logs and calendars
  - Form 8829 preparation documents
\`\`\`

### Record Keeping Systems
\`\`\`
Digital Organization Strategy:

Cloud Storage Structure:
/Tax Records/2024/Home Office/
  /Measurements/
  /Photos/
  /Receipts/
    /Mortgage-Property Tax/
    /Utilities/
    /Insurance/
    /Repairs-Maintenance/
  /Usage Logs/
  /Calculations/

Expense Tracking Apps:
- Receipt Bank: Photo receipt capture
- Expensify: Automatic categorization
- Shoeboxed: Mailed receipt processing
- QuickBooks: Integrated expense tracking

Monthly Reconciliation:
- Review and categorize home expenses
- Calculate business percentages
- Update usage logs
- Photograph any office changes
- Backup digital records

Annual Preparation:
- Compile all documentation
- Complete Form 8829 calculations
- Verify measurement accuracy
- Update photos if office changed
- Prepare audit defense file
\`\`\`

## Common Mistakes and Pitfalls

### Mistake 1: Failing Exclusive Use Test
\`\`\`
Problem Examples:
- Using office computer for personal gaming
- Family members doing homework in office
- Guests sleeping in office occasionally
- Personal storage in office closets

Solution:
- Physical barriers or separate rooms
- Clear family rules about office use
- Move personal items completely out
- Document exclusive business use

Audit Defense:
- Photos showing only business items
- Family testimonials about office rules
- Calendar showing consistent business use
- No personal items in expense receipts
\`\`\`

### Mistake 2: Inadequate Documentation
\`\`\`
Common Documentation Failures:
- No photos of office space
- Missing measurement calculations
- Incomplete expense records
- No business activity logs

IRS Audit Consequences:
- Disallowance of entire deduction
- Penalties and interest on underpayment
- Expanded audit of other deductions
- Professional reputation concerns

Prevention Strategy:
- Annual documentation review
- Professional photo documentation
- Detailed measurement records
- Contemporary business logs
\`\`\`

### Mistake 3: Mixing Business and Personal
\`\`\`
Problematic Scenarios:
- Personal items stored in office
- Family computer used for business
- Kids' toys in office area
- Personal bills paid from office

Clean Separation Strategy:
- Dedicated business equipment only
- Clear physical boundaries
- Separate business and personal supplies
- Professional office appearance

Example - Computer Usage:
Problem: Personal gaming on business computer
Solution: Separate user accounts or dedicated business laptop
Documentation: Purchase receipt showing business purpose
\`\`\`

## Advanced Optimization Strategies

### Year-End Planning
\`\`\`
December Optimization Checklist:

Expense Timing:
□ Pay January utilities in December
□ Prepay property tax if beneficial
□ Complete planned office improvements
□ Purchase needed office equipment

Documentation Updates:
□ Take current photos of office setup
□ Update measurement records if changed
□ Compile year-end expense totals
□ Review and organize receipt files

Method Evaluation:
□ Calculate both simplified and actual methods
□ Determine optimal method for current year
□ Plan method for following year
□ Consider multi-year impact of choice

Improvement Planning:
□ Plan office improvements for next year
□ Research depreciation vs. current deduction
□ Consider timing relative to home sale plans
□ Evaluate business expansion needs
\`\`\`

### Multi-Year Strategy
\`\`\`
Long-Term Home Office Planning:

5-Year Analysis:
Year 1: Establish office, use simplified method
Year 2: Switch to actual method after improvements
Years 3-4: Maximize actual method benefits
Year 5: Consider stopping if planning home sale

Business Growth Considerations:
- Start with smaller dedicated space
- Expand office as business grows
- Consider separate office rental at scale
- Plan for equipment and improvement needs

Exit Strategy:
- Stop claiming 2-3 years before home sale
- Consider conversion to rental property
- Evaluate depreciation recapture impact
- Plan primary residence exclusion timing
\`\`\`

## Key Takeaways

- Home office deduction requires exclusive, regular business use
- Actual expense method often provides larger deduction than simplified method
- Proper documentation is essential for IRS audit protection
- Depreciation recapture applies when home is sold
- Business improvements can be immediately deductible
- Method choice affects complexity and audit risk
- Multi-year planning optimizes total tax benefits
- Clean separation between business and personal use is critical
- Professional measurement and photo documentation recommended
- Annual review ensures continued compliance and optimization

The home office deduction represents one of the most significant tax benefits available to freelance developers when properly claimed with appropriate documentation and compliance with IRS requirements.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 95
      },
      {
        title: 'Equipment Depreciation and Section 179 Strategies',
        slug: 'equipment-depreciation-section-179-strategies',
        content: `# Equipment Depreciation and Section 179 Strategies

## Introduction to Business Equipment Tax Treatment

Equipment purchases represent significant business investments for developers, and the tax treatment of these assets can dramatically impact your cash flow and tax liability. Understanding depreciation, Section 179, and bonus depreciation rules enables strategic planning that maximizes tax benefits.

## Overview of Equipment Tax Treatment Options

### Three Main Approaches
\`\`\`
Option 1: Section 179 Election (Immediate Expensing)
- Deduct full cost in year of purchase
- Subject to annual and business income limits
- Recapture rules apply on sale/disposal

Option 2: Bonus Depreciation
- 100% first-year depreciation (through 2022, phasing down)
- No annual dollar limit
- Applies to new and used qualifying property

Option 3: Regular Depreciation (MACRS)
- Spread deduction over asset's useful life
- Provides consistent annual deductions
- Lower first-year tax benefit
\`\`\`

## Section 179 Election Deep Dive

### Eligibility and Limits (2023)
\`\`\`
Section 179 Limits:
Maximum deduction: $1,160,000
Investment threshold: $2,890,000
Phase-out: Dollar-for-dollar above threshold
Business income limit: Cannot exceed business taxable income

Qualifying Property:
✅ Computers and software
✅ Office furniture and equipment
✅ Machinery and tools
✅ Vehicles (with limitations)
✅ Some building improvements

Non-Qualifying Property:
❌ Real estate (with limited exceptions)
❌ Investment property
❌ Property held for production of income
❌ Property used outside the US
\`\`\`

### Strategic Planning Examples
\`\`\`
Example 1: Full Section 179 Benefit
Business income: $150,000
Equipment purchases: $25,000
Section 179 election: $25,000 (full amount)
Tax savings (24% bracket): $6,000
Net equipment cost: $19,000

Example 2: Business Income Limitation
Business income: $80,000
Equipment purchases: $100,000
Section 179 limit: $80,000 (limited by income)
Remaining $20,000: Subject to regular depreciation
Immediate tax savings: $19,200 (24% bracket)
Future depreciation benefits: $20,000 over 5 years

Example 3: High-Investment Phase-out
Equipment purchases: $3,000,000
Phase-out threshold: $2,890,000
Excess investment: $110,000
Section 179 reduction: $110,000
Available Section 179: $1,160,000 - $110,000 = $1,050,000
Remaining equipment: Regular depreciation
\`\`\`

## Bonus Depreciation Strategy

### Current Bonus Depreciation Rules
\`\`\`
Bonus Depreciation Schedule:
2021-2022: 100%
2023: 80%
2024: 60%
2025: 40%
2026: 20%
2027 and after: 0%

Benefits of Bonus Depreciation:
- No annual dollar limit (unlike Section 179)
- No business income limit
- Applies to both new and used property
- Can be combined with Section 179

Example - Large Equipment Purchase:
Equipment cost: $2,000,000
Business income: $500,000
Section 179: $500,000 (limited by income)
Remaining: $1,500,000
Bonus depreciation (2023): $1,500,000 × 80% = $1,200,000
Regular depreciation: $300,000 over 5 years
First-year deduction: $1,700,000
\`\`\`

### Strategic Timing Considerations
\`\`\`
2023 vs. 2024 Purchase Decision:

Equipment cost: $100,000
Business income: $200,000

2023 Purchase:
Section 179: $100,000 (immediate)
Tax savings: $24,000 (24% bracket)
Net cost: $76,000

2024 Purchase:
Section 179: $100,000 (immediate, same limit)
Bonus depreciation: Not needed
Tax savings: $24,000 (same rate assumed)
Net cost: $76,000

Decision Factors:
- Current vs. future tax rates
- Cash flow considerations
- Business income limitations
- Equipment needs timing
\`\`\`

## MACRS Depreciation System

### Asset Classification and Recovery Periods
\`\`\`
Common Developer Equipment:

3-Year Property:
- Software (off-the-shelf)
- Some computer peripherals
- Research equipment

5-Year Property:
- Computers and laptops
- Printers and scanners
- Office equipment
- Automobiles

7-Year Property:
- Office furniture
- Fixtures
- Some business equipment

Recovery Period Examples:
5-year MACRS percentages:
Year 1: 20.00%
Year 2: 32.00%
Year 3: 19.20%
Year 4: 11.52%
Year 5: 11.52%
Year 6: 5.76%
\`\`\`

### Depreciation Calculation Examples
\`\`\`
Example: $10,000 Laptop (5-year property, no Section 179)

Year 1: $10,000 × 20.00% = $2,000
Year 2: $10,000 × 32.00% = $3,200
Year 3: $10,000 × 19.20% = $1,920
Year 4: $10,000 × 11.52% = $1,152
Year 5: $10,000 × 11.52% = $1,152
Year 6: $10,000 × 5.76% = $576

Total depreciation: $10,000
Tax savings over 6 years: $2,400 (24% bracket)

Present Value Analysis (6% discount):
$2,000 × 0.943 = $1,886
$3,200 × 0.890 = $2,848
$1,920 × 0.840 = $1,613
$1,152 × 0.792 = $912
$1,152 × 0.747 = $861
$576 × 0.705 = $406
Total PV of tax savings: $8,526

Section 179 PV: $10,000 × 24% = $2,400
Section 179 advantage: $2,400 - $2,043 = $357
\`\`\`

## Vehicle Depreciation Special Rules

### Business Vehicle Limitations
\`\`\`
Luxury Car Limitations (2023):

Year 1 Maximum (with bonus depreciation):
- $20,200 + bonus depreciation amount
- Actual bonus varies by year placed in service

Year 2-6 Maximum:
Year 2: $19,500
Year 3: $11,700
Year 4 and later: $6,960 per year

Example - $80,000 Business Vehicle:
Regular MACRS without limits:
Year 1: $80,000 × 20% = $16,000
Year 2: $80,000 × 32% = $25,600

With luxury car limits:
Year 1: $20,200 + bonus (varies)
Year 2: $19,500
Additional years: $6,960 until fully depreciated

Impact: Extends depreciation period significantly
Alternative: Section 179 may provide better treatment
\`\`\`

### Vehicle Business Use Percentage
\`\`\`
Mixed Use Vehicle Strategy:

Total annual miles: 20,000
Business miles: 15,000
Personal miles: 5,000
Business percentage: 75%

Vehicle cost: $50,000
Business portion: $50,000 × 75% = $37,500
Depreciable basis: $37,500

Depreciation options apply to business portion only:
Section 179: Up to $37,500 (subject to limits)
Bonus depreciation: $37,500 × 80% (2023)
MACRS: $37,500 over recovery period

Documentation Requirements:
- Detailed mileage logs
- Business purpose for each trip
- Beginning/ending odometer readings
- Regular contemporaneous records
\`\`\`

## Software and Intangible Assets

### Software Classification
\`\`\`
Off-the-Shelf Software (3-year property):
- Microsoft Office
- Adobe Creative Suite
- Development tools and IDEs
- Antivirus and security software

Custom Software:
- Internally developed: Immediate deduction or 3-year
- Contract developed: Usually 3-year depreciation
- Specific business application software

Example - Software Portfolio:
Adobe Creative Suite: $2,400 annually
Microsoft Office: $400 annually
Development tools: $1,800 annually
Total software: $4,600

Section 179 Election: $4,600 immediate
Tax savings (24%): $1,104
Net annual cost: $3,496

Alternative - 3-Year Depreciation:
Year 1: $4,600 × 33.33% = $1,533
Year 2: $4,600 × 44.45% = $2,045
Year 3: $4,600 × 14.81% = $681
Year 4: $4,600 × 7.41% = $341
\`\`\`

## Strategic Decision Framework

### Cash Flow vs. Tax Optimization
\`\`\`
Decision Matrix:

Immediate Cash Flow Needs:
- Use Section 179 for maximum first-year deduction
- Benefit from immediate tax savings
- Reduce cash outlay for equipment

Future Income Growth Expected:
- Consider regular depreciation
- Spread deductions over higher-income years
- Match deductions to tax rate optimization

Stable Income Pattern:
- Section 179 generally preferred
- Simplifies tax planning
- Maximizes present value of deductions

Variable Income:
- Coordinate with business income limitations
- Plan purchases in high-income years
- Consider carryforward implications

Example Analysis:
Equipment: $30,000
Current tax rate: 12%
Expected future rate: 24%

Section 179 now: $30,000 × 12% = $3,600 savings
Depreciation later: $30,000 × 24% average = $7,200 savings
Strategy: If confident in rate increase, consider depreciation
\`\`\`

### Multi-Asset Portfolio Strategy
\`\`\`
Comprehensive Equipment Plan:

High-Priority Equipment (Section 179):
- Essential computers and servers: $15,000
- Critical software licenses: $5,000
- Core business tools: $8,000
Subtotal: $28,000

Medium-Priority Equipment (Bonus Depreciation):
- Backup equipment: $10,000
- Networking gear: $6,000
- Office furniture: $12,000
Subtotal: $28,000

Lower-Priority Equipment (Regular Depreciation):
- Upgrade equipment: $15,000
- Convenience items: $8,000
- Future replacement items: $10,000
Subtotal: $33,000

Strategy Rationale:
- Section 179 for immediate needs and cash flow
- Bonus depreciation for substantial investments
- Regular depreciation for long-term planning
- Total optimization across all assets
\`\`\`

## Record Keeping and Compliance

### Essential Documentation
\`\`\`
Asset Purchase Records:
- Purchase invoices and receipts
- Delivery confirmations and dates
- Business purpose documentation
- Installation and setup costs

Depreciation Records:
- Asset register with all details
- Method elections (Section 179, bonus, MACRS)
- Annual depreciation calculations
- Form 4562 filings

Business Use Documentation:
- Percentage of business vs. personal use
- Log of business activities performed
- Changes in use over time
- Disposition records and dates

Sample Asset Register:
Asset          Date      Cost    Method    Year1 Depr  Basis
MacBook Pro    3/15/24   $3,500  Sec 179   $3,500      $0
Office Desk    3/20/24   $1,200  MACRS     $171        $1,029
Software       4/1/24    $2,400  Sec 179   $2,400      $0
\`\`\`

### IRS Form Requirements
\`\`\`
Form 4562 - Depreciation and Amortization:
Required when:
- Claiming Section 179 deduction
- Claiming bonus depreciation
- Depreciating property placed in service
- Claiming vehicle depreciation

Key Sections:
Part I: Section 179 election
Part II: Special depreciation (bonus)
Part III: MACRS depreciation
Part V: Listed property (vehicles, computers)

Annual Filing Requirements:
- File Form 4562 in first year for all elections
- Continue filing if claiming vehicle depreciation
- Maintain supporting schedules and records
- Integrate with Schedule C calculations
\`\`\`

## Disposal and Recapture Rules

### Asset Disposition Considerations
\`\`\`
Depreciation Recapture Rules:

Section 179 Recapture:
Occurs when: Business use drops below 50%
Recapture amount: Excess depreciation taken
Tax treatment: Ordinary income rates

Example:
Computer cost: $4,000
Section 179 claimed: $4,000 (Year 1)
Year 3: Business use drops to 40%
Recapture: $4,000 - (3 × $800 MACRS) = $1,600
Tax impact: $1,600 × current rate = additional tax

Sale of Depreciated Assets:
Asset cost: $10,000
Depreciation taken: $6,000
Adjusted basis: $4,000
Sale price: $7,000
Gain: $3,000
Depreciation recapture: $3,000 (ordinary income)
\`\`\`

### Strategic Disposal Planning
\`\`\`
Optimal Disposal Timing:

Tax Rate Considerations:
- Time disposals in low-income years
- Coordinate with other income/deductions
- Consider installment sale treatment

Business Use Maintenance:
- Monitor business use percentages
- Document continued business purpose
- Plan upgrades to maintain compliance

Replacement Strategy:
- Like-kind exchanges (limited for equipment)
- Trade-in vs. separate sale decisions
- Timing of replacement purchases

Example - Equipment Refresh Strategy:
Year 1: Purchase $20,000 equipment (Section 179)
Year 4: Equipment worth $5,000, need $30,000 upgrade
Options:
A) Sell old ($5,000), buy new ($30,000) = $25,000 net
B) Trade-in old for $3,000 credit, pay $27,000 cash
Decision factors: Recapture, cash flow, tax timing
\`\`\`

## Advanced Planning Strategies

### Year-End Timing Optimization
\`\`\`
December Planning Checklist:

Equipment Needs Assessment:
□ Inventory current equipment status
□ Identify replacement/upgrade needs
□ Evaluate business growth requirements
□ Plan for next year's equipment budget

Tax Optimization Decisions:
□ Calculate current year business income
□ Determine available Section 179 capacity
□ Evaluate bonus depreciation benefits
□ Consider multi-year depreciation planning

Purchase Timing Strategy:
□ Place orders for December delivery
□ Confirm in-service dates before year-end
□ Document business use commencement
□ Prepare Form 4562 elections

Cash Flow Coordination:
□ Align equipment purchases with cash availability
□ Coordinate with quarterly tax payments
□ Plan for immediate tax savings impact
□ Consider financing vs. cash purchase options
\`\`\`

### Business Structure Considerations
\`\`\`
Entity Type Impact on Equipment Deductions:

Sole Proprietorship/Single-Member LLC:
- All deductions flow through to Schedule C
- Subject to business income limitations
- Recapture at individual rates

Partnership:
- Equipment allocated among partners
- Section 179 limited by partner's share
- Basis adjustments for distributed assets

S-Corporation:
- Corporation claims depreciation
- Shareholder basis adjustments
- Potential for shareholder loans for equipment

Decision Factors:
- Business income levels and limitations
- Planned equipment investment levels
- Tax rate optimization strategies
- Administrative complexity preferences
\`\`\`

## Key Takeaways

- Section 179 provides immediate expensing up to $1,160,000 (2023) subject to business income limits
- Bonus depreciation offers additional first-year benefits without dollar limits
- MACRS depreciation spreads deductions over asset useful life with predictable timing
- Vehicle depreciation has special luxury car limitations and mixed-use rules
- Software generally qualifies for 3-year depreciation or Section 179 election
- Strategic timing of purchases and disposals optimizes total tax benefits
- Proper documentation is essential for depreciation elections and recapture avoidance
- Multi-year planning considers changing tax rates and business income patterns
- Asset disposal triggers recapture rules requiring careful timing consideration
- Business entity structure affects depreciation strategy and limitations

Equipment depreciation and Section 179 strategies provide powerful tools for managing tax liability while building the technology infrastructure necessary for a successful development business.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 110
      }
    ];

    for (const lessonData of week4lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          weekId: week4.id
        }
      });
    }

    // Week 4 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week4.id,
        title: 'Home Office and Equipment Depreciation Quiz',
        description: 'Test your understanding of home office deductions, equipment depreciation, and Section 179 strategies',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 30,
        questions: {
          create: [
            {
              questionText: 'What is the maximum home office deduction using the simplified method?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$1,000',
                '$1,500',
                '$2,000',
                '$2,500'
              ]),
              correctAnswer: '$1,500',
              explanation: 'The simplified method allows up to 300 square feet at $5 per square foot, for a maximum deduction of $1,500.',
              orderIndex: 1
            },
            {
              questionText: 'Which test is NOT required for home office deduction eligibility?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Exclusive use test',
                'Regular use test',
                'Principal place of business test',
                'Separate entrance test'
              ]),
              correctAnswer: 'Separate entrance test',
              explanation: 'A separate entrance is not required. The home office must pass the exclusive use, regular use, and principal place of business tests.',
              orderIndex: 2
            },
            {
              questionText: 'What is the maximum Section 179 deduction for 2023?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '$500,000',
                '$1,080,000',
                '$1,160,000',
                '$2,890,000'
              ]),
              correctAnswer: '$1,160,000',
              explanation: 'The Section 179 maximum deduction for 2023 is $1,160,000, with a phase-out beginning at $2,890,000 of equipment purchases.',
              orderIndex: 3
            },
            {
              questionText: 'Under MACRS, computer equipment is typically depreciated over how many years?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '3 years',
                '5 years',
                '7 years',
                '10 years'
              ]),
              correctAnswer: '5 years',
              explanation: 'Computer equipment is classified as 5-year property under MACRS and is depreciated over 5 years using the half-year convention.',
              orderIndex: 4
            },
            {
              questionText: 'What happens to Section 179 deductions when business use of an asset falls below 50%?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Nothing, the deduction is permanent',
                'Depreciation recapture applies',
                'The asset must be sold immediately',
                'A new depreciation schedule begins'
              ]),
              correctAnswer: 'Depreciation recapture applies',
              explanation: 'When business use falls below 50%, Section 179 recapture applies, requiring the excess depreciation to be included in income as ordinary income.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 4 created with 2 lessons and 1 quiz');
    console.log('✅ Course 7: Tax Fundamentals for Freelance Developers created successfully!');
    console.log(`📚 Course ID: ${course7.id}`);
    console.log(`🎯 Course 7 Complete: 4 weeks, 8 lessons, 4 quizzes, 32 estimated hours`);

  } catch (error) {
    console.error('❌ Error creating Course 7:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCourse7();