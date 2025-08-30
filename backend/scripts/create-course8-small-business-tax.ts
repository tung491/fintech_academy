import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse8() {
  try {
    console.log('🚀 Creating Course 8: Small Business Tax Strategy...');

    // Check if the course already exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        slug: 'small-business-tax-strategy'
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

    // Create Course 8: Small Business Tax Strategy
    const course8 = await prisma.course.create({
      data: {
        title: 'Small Business Tax Strategy',
        slug: 'small-business-tax-strategy',
        description: 'Comprehensive tax strategies for small business owners covering business tax returns, payroll taxes, sales tax compliance, multi-state considerations, and advanced planning techniques.',
        shortDescription: 'Strategic tax planning for small business owners and entrepreneurs',
        categoryId: category.id,
        level: 'intermediate',
        duration: '5 weeks',
        estimatedHours: 40,
        price: 19700, // $197
        originalPrice: 29700, // $297
        instructor: 'Michael Chen, CPA, MST',
        instructorBio: 'Master of Science in Taxation with 20+ years experience in small business tax strategy. Former Big 4 tax manager specializing in entrepreneurial tax planning and compliance.',
        thumbnailUrl: '/images/courses/small-business-tax-strategy.jpg',
        orderIndex: 8,
        isPublished: true,
        isFeatured: true,
        skillsLearned: JSON.stringify([
          'Master business tax return types (Schedule C, 1120, 1120S)',
          'Navigate payroll taxes and worker classification rules',
          'Understand sales tax obligations for digital products and SaaS',
          'Handle multi-state tax considerations for remote businesses',
          'Implement strategic tax planning and timing strategies',
          'Optimize business structure for tax efficiency'
        ]),
        targetAudience: 'Small business owners, entrepreneurs, agency owners, SaaS founders, and developers with established businesses looking to optimize their tax strategy.',
      }
    });

    console.log('✅ Course 8 created successfully');

    // Week 1: Business Tax Return Types (Schedule C, 1120, 1120S)
    const week1 = await prisma.week.create({
      data: {
        courseId: course8.id,
        weekNumber: 1,
        title: 'Business Tax Return Types (Schedule C, 1120, 1120S)',
        overview: 'Master the different business tax return types and choose the optimal filing structure for your business entity and tax situation.',
        learningObjectives: JSON.stringify([
          'Understand Schedule C for sole proprietorships and single-member LLCs',
          'Navigate Form 1120 for C-Corporations',
          'Master Form 1120S for S-Corporations',
          'Choose the optimal tax filing structure for your business',
          'Understand key tax differences between entity types'
        ]),
        estimatedHours: 8
      }
    });

    const week1lessons = [
      {
        title: 'Schedule C: Sole Proprietorship and Single-Member LLC Tax Returns',
        slug: 'schedule-c-sole-proprietorship-single-member-llc',
        content: `# Schedule C: Sole Proprietorship and Single-Member LLC Tax Returns

## Introduction to Schedule C

Schedule C (Profit or Loss From Business) is the tax form used by sole proprietorships and single-member LLCs to report business income and expenses. As the simplest business tax filing, it's often the starting point for many entrepreneurs and developers.

## Who Must File Schedule C

### Eligible Entities
- **Sole Proprietorships**: Unincorporated businesses owned by one individual
- **Single-Member LLCs**: LLCs with only one owner (disregarded entity status)
- **Married couples**: Joint ventures between spouses in community property states

### Business Activity Requirements
Your business must have:
- Profit motive (intent to make money)
- Regular and continuous activity
- Business-like operations

## Schedule C Structure and Key Sections

### Part I: Income
\\\`\\\`\\\`
Line 1: Gross receipts or sales
Line 2: Returns and allowances  
Line 3: Subtract line 2 from line 1
Line 4: Cost of goods sold (from Part III)
Line 5: Gross profit (line 3 minus line 4)
Line 6: Other income
Line 7: Gross income (line 5 plus line 6)
\\\`\\\`\\\`

### Part II: Expenses
**Common Deductible Expenses for Developers:**
- Advertising and marketing
- Car and truck expenses (business use)
- Commissions and fees
- Contract labor (1099 contractors you hired)
- Equipment depreciation
- Insurance (professional liability, E&O)
- Interest on business loans
- Legal and professional services
- Office expenses and supplies
- Rent or lease expenses
- Repairs and maintenance
- Software subscriptions and licenses
- Travel expenses
- Utilities (if home office)
- Other business expenses

### Software Development Specific Deductions
\\`\\`\\`
Technology Expenses:
- Development software licenses
- Cloud hosting and server costs
- API access fees
- Testing and monitoring tools
- Code repositories and version control
- Design software and assets

Professional Development:
- Conference attendance
- Online courses and certifications
- Technical books and publications
- Professional memberships
\\`\\`\\`

## Advantages of Schedule C Filing

### Simplicity
- Filed with personal Form 1040
- No separate tax return required
- Straightforward income and expense reporting

### Pass-Through Taxation
- Business profits/losses flow to personal return
- No double taxation
- Losses can offset other income

### Full Deductibility
- 100% of business expenses are deductible
- Home office deduction available
- Equipment depreciation or Section 179 expensing

## Disadvantages and Limitations

### Self-Employment Tax
- Subject to SE tax (15.3%) on net business income
- No employer contribution to Social Security/Medicare
- Applies to entire net profit

### Personal Liability
- No legal separation between personal and business assets
- Unlimited personal liability for business debts
- Professional liability insurance crucial

### Limited Tax Benefits
- No employee benefit deductions for self
- Limited retirement plan options compared to corporations
- No salary/distribution split opportunities

## Common Schedule C Mistakes to Avoid

### 1. Mixing Personal and Business Expenses
**Incorrect:**
Office supplies: $500 (includes personal printer paper)

**Correct:**
Office supplies: $350 (business-only expenses)

### 2. Inadequate Record Keeping
**Required Documentation:**
- Receipts for all expenses
- Mileage logs for vehicle expenses  
- Home office measurement and expenses
- Bank statements showing business transactions

### 3. Misclassifying Workers
**Critical Test:** If you control how work is done (not just what work is done), they're likely an employee, not a contractor

### 4. Overlooking Business Use of Home
Many developers miss this valuable deduction:
- Percentage of home used exclusively for business
- Direct expenses (office furniture, business phone)
- Indirect expenses (utilities, insurance, maintenance)

## Schedule C vs Other Entity Elections

### When Schedule C Makes Sense
- Simple business structure
- Low liability risk
- Starting out or testing business viability
- Prefer simplicity over tax optimization

### When to Consider Alternatives
- High income (SE tax becomes burdensome)
- Significant liability exposure
- Want employee benefits
- Multiple owners
- Seeking investment or planning to scale

## Real-World Example: Web Developer

**Sarah's Solo Development Business:**
\\`\\`\\`
Gross Income: $85,000
Business Expenses:
- Software licenses: $2,400
- Equipment depreciation: $3,500
- Home office: $4,800
- Professional development: $1,500
- Internet/phone: $1,200
- Professional insurance: $800
- Total Expenses: $14,200

Net Profit: $70,800
Self-Employment Tax: $9,996 (14.1% effective rate)
Income Tax: Variable based on total household income
\\`\\`\\`

## Action Steps for Schedule C Filers

### 1. Set Up Proper Systems
- Separate business bank account
- Expense tracking system (QuickBooks, Wave, etc.)
- Digital receipt storage
- Mileage tracking app

### 2. Quarterly Planning
- Estimate quarterly taxes
- Track income and expenses monthly
- Review deductible purchases
- Plan major equipment purchases

### 3. Year-End Optimization
- Accelerate deductible expenses
- Consider equipment purchases for Section 179
- Maximize home office deduction
- Review and clean up expense categories

## Conclusion

Schedule C provides a straightforward path for sole proprietorships and single-member LLCs to report business income and expenses. While it offers simplicity and pass-through taxation benefits, it also subjects business income to self-employment tax and provides no liability protection.

For developers just starting their business journey or those with simple operations, Schedule C is often the right choice. However, as your business grows and becomes more profitable, you may want to explore other entity structures that offer better tax optimization and liability protection.

## Key Takeaways

1. **Schedule C is for sole proprietorships and single-member LLCs**
2. **All net business income is subject to self-employment tax**
3. **Proper record keeping is essential for audit protection**
4. **Home office and equipment deductions can provide significant tax savings**
5. **Consider entity changes as income grows or liability increases**

Next week, we'll explore Form 1120 for C-Corporations and understand when this more complex structure might benefit your business.`,
        orderIndex: 1,
        estimatedMinutes: 45
      },
      {
        title: 'Form 1120 and 1120S: Corporate Tax Returns Explained',
        slug: 'form-1120-1120s-corporate-tax-returns',
        content: `# Form 1120 and 1120S: Corporate Tax Returns Explained

## Understanding Corporate Tax Structures

When your business grows beyond sole proprietorship or single-member LLC status, you enter the world of corporate taxation. This involves more complex tax returns but potentially significant tax advantages. Let's explore Form 1120 for C-Corporations and Form 1120S for S-Corporations.

## Form 1120: C-Corporation Tax Return

### What is a C-Corporation?

A C-Corporation is a separate legal entity that:
- Exists independently from its owners (shareholders)
- Has unlimited life
- Can have multiple classes of stock
- Provides complete liability protection
- Faces "double taxation" on profits

### Form 1120 Structure and Key Components

#### Income Section
\\`\\`\\`
Line 12: Total income calculation
- Gross receipts or sales
- Cost of goods sold
- Capital gains and losses
- Other income sources
\\`\\`\\`

#### Deductions Section
**Corporate-Specific Deductions:**
- Compensation of officers
- Salaries and wages (including payroll taxes)
- Bad debts
- Business insurance premiums
- Depreciation
- Advertising expenses
- Professional services
- Office expenses

#### Tax Calculation
\\`\\`\\`
2024 Corporate Tax Rates:
- Flat 21% federal rate on all corporate income
- State corporate taxes vary by state
- Additional taxes may apply (AMT, etc.)
\\`\\`\\`

### Advantages of C-Corporation Election

#### 1. Salary vs Distribution Strategy
**Tax Planning Opportunity:**
\\`\\`\\`
Total Compensation: $100,000

Option A - All Salary:
- Salary: $100,000
- Payroll taxes: $15,300
- Total cost: $115,300

Option B - Salary + Distribution:
- Salary: $60,000
- Payroll taxes: $9,180
- Distribution: $40,000
- Corporate tax (21%): $8,400
- Owner tax (qualified dividends): $6,000
- Total taxes: $23,580 vs $15,300 (higher due to double taxation)
\\`\\`\\`

#### 2. Employee Benefits
- Health insurance deductions
- Retirement plan contributions
- Life insurance premiums
- Educational assistance programs

#### 3. Business Expense Advantages
- 100% deductible business meals (temporary through 2024)
- Entertainment expenses (limited)
- Company car benefits
- Professional development

### Disadvantages of C-Corporation

#### Double Taxation
- Corporate profits taxed at 21%
- Distributions taxed as dividends to shareholders
- Can result in higher overall tax burden

#### Complexity and Compliance
- Quarterly estimated taxes
- Annual tax return filing
- Corporate minutes and resolutions
- Separate business bank accounts

#### State Considerations
- State corporate income taxes
- Franchise taxes
- Annual filing requirements
- Qualification in multiple states

## Form 1120S: S-Corporation Tax Return

### What is an S-Corporation?

An S-Corporation is a special tax election that:
- Provides liability protection like a C-Corp
- Offers pass-through taxation like an LLC
- Has restrictions on shareholders and stock classes
- Requires reasonable salary for owner-employees

### S-Corporation Eligibility Requirements

#### Shareholder Limitations
- Maximum 100 shareholders
- All shareholders must be US citizens or residents
- No corporate or partnership shareholders
- Only one class of stock (voting differences allowed)

#### Entity Requirements
- Must be domestic corporation
- Cannot be certain types of businesses (banks, insurance companies)
- Cannot have nonresident alien shareholders

### Form 1120S Structure

#### Pass-Through Reporting
Unlike Form 1120, Form 1120S:
- Reports income and expenses
- Calculates profit/loss
- Issues K-1s to shareholders
- Generally pays no federal income tax

#### Key Schedule K-1 Items
\\`\\`\\`
Ordinary business income/loss
Net rental real estate income/loss
Other net rental income/loss
Interest income
Dividend income
Royalties
Net short-term capital gain/loss
Net long-term capital gain/loss
Section 179 deduction
Charitable contributions
\\`\\`\\`

### S-Corporation Tax Advantages

#### 1. Self-Employment Tax Savings
**Major Benefit:**
\\`\\`\\`
Example: $100,000 total business income

Sole Proprietorship:
- SE tax on $100,000 = $14,130

S-Corporation:
- Reasonable salary: $60,000
- SE tax (payroll) on $60,000 = $9,180
- Distribution: $40,000 (no SE tax)
- Total SE tax savings: $4,950 annually
\\`\\`\\`

#### 2. Pass-Through Benefits
- Losses flow through to personal returns
- No double taxation
- Step-up in basis for distributions

#### 3. Flexibility in Tax Planning
- Income timing flexibility
- Charitable contribution strategies
- Retirement plan contributions

### S-Corporation Requirements and Pitfalls

#### Reasonable Salary Requirement
**IRS Standard:** Owner-employees must receive "reasonable compensation" for services

**Factors IRS Considers:**
- Training and experience
- Duties and responsibilities
- Time and effort devoted
- Payments to non-shareholder employees
- Compensation agreements
- Use of capital vs personal services

**Common Mistake:**
\\`\\`\\`
Incorrect: $120,000 profit, $20,000 salary, $100,000 distribution
Correct: $120,000 profit, $60,000 salary, $60,000 distribution
\\`\\`\\`

#### Built-In Gains Tax
For corporations converting to S-Corp status:
- 5-year recognition period
- Tax on appreciation existing at conversion
- Applies to asset sales during recognition period

## Comparison: Schedule C vs 1120 vs 1120S

### Tax Treatment Comparison
\\`\\`\\`
$100,000 Business Income Example:

Schedule C (Sole Prop):
- Income tax: ~$22,000 (22% bracket)
- SE tax: $14,130
- Total: ~$36,130

C-Corporation:
- Corporate tax: $21,000 (21%)
- Personal tax on $79,000 distribution: ~$11,850
- Total: ~$32,850 (but double taxation)

S-Corporation:
- Income tax: ~$22,000 (22% bracket)
- Payroll tax on reasonable salary: ~$8,000
- Total: ~$30,000 (savings from reduced SE tax)
\\`\\`\\`

### Complexity and Cost Comparison
\\`\\`\\`
Annual Compliance Costs:
- Schedule C: $500-1,500
- Form 1120: $2,000-5,000
- Form 1120S: $1,500-3,000

Setup Costs:
- Schedule C: $0-500
- C-Corporation: $1,000-3,000
- S-Corporation: $1,000-3,000
\\`\\`\\`

## When to Choose Each Structure

### Choose Schedule C When:
- Simple business operations
- Low income (under $50,000)
- Starting out or uncertain about business viability
- Want maximum simplicity

### Choose C-Corporation When:
- High income with reinvestment plans
- Want maximum employee benefits
- Planning to seek outside investment
- Multiple shareholders or complex ownership

### Choose S-Corporation When:
- Moderate to high income ($75,000+)
- Want SE tax savings
- Desire liability protection
- Single or simple ownership structure

## Real-World Decision Framework

### Income-Based Guidelines
\\`\\`\\`
$0-$50,000: Likely Schedule C (simplicity wins)
$50,000-$75,000: Consider S-Corp (analyze SE tax savings)
$75,000+: S-Corp often beneficial
$200,000+: Evaluate C-Corp for retained earnings
\\`\\`\\`

### Business Factor Analysis
- **Liability risk**: Higher risk = incorporation
- **Growth plans**: Scaling = consider C-Corp
- **Employee benefits**: Important = C-Corp advantage
- **Complexity tolerance**: Low = stay simple

## Action Steps for Entity Selection

### 1. Calculate Tax Impact
Use professional software or CPA to model:
- Current entity vs alternatives
- 3-year projections
- Break-even analysis

### 2. Consider Non-Tax Factors
- Liability protection needs
- Business growth plans
- Employee benefit priorities
- Administrative burden tolerance

### 3. Plan for Changes
- Start simple, evolve as needed
- Monitor annual tax impact
- Review entity choice every 2-3 years
- Consider state law differences

## Common Mistakes to Avoid

### 1. Choosing Entity for Wrong Reasons
- Don't incorporate just for "credibility"
- Consider total cost, not just tax savings
- Evaluate your specific situation

### 2. Ignoring State Tax Implications
- State corporate taxes vary widely
- Some states don't recognize S-Corp election
- Franchise taxes can be significant

### 3. Poor Implementation
- Mixing personal and business finances
- Failing to maintain corporate formalities
- Not paying reasonable salary (S-Corp)

## Conclusion

Understanding business tax return types is crucial for optimizing your tax strategy. While Schedule C offers simplicity, corporate structures (C-Corp and S-Corp) can provide significant tax benefits and liability protection for the right businesses.

The key is matching your entity choice to your specific situation: income level, growth plans, liability concerns, and complexity tolerance. As your business evolves, your optimal structure may change, so regular review is essential.

## Key Takeaways

1. **Schedule C is simplest but has SE tax on all income**
2. **C-Corporations face double taxation but offer maximum flexibility**
3. **S-Corporations provide pass-through benefits with SE tax savings**
4. **Entity choice should consider both tax and non-tax factors**
5. **Regular review ensures your structure remains optimal**

Next week, we'll dive into payroll taxes and worker classification - critical areas that can make or break your business tax strategy.`,
        orderIndex: 2,
        estimatedMinutes: 55
      }
    ];

    // Create Week 1 lessons
    for (const lessonData of week1lessons) {
      await prisma.lesson.create({
        data: {
          weekId: week1.id,
          title: lessonData.title,
          slug: lessonData.slug,
          content: lessonData.content,
          orderIndex: lessonData.orderIndex,
          estimatedMinutes: lessonData.estimatedMinutes,
          isPublished: true
        }
      });
    }

    // Create Week 1 Quiz
    const week1Quiz = await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'Business Tax Return Types Quiz',
        description: 'Test your understanding of Schedule C, Form 1120, and Form 1120S',
        timeLimit: 30,
        passingScore: 70,
        maxAttempts: 3,
        questions: JSON.stringify([
          {
            questionText: "Which tax form is used by single-member LLCs that haven't elected corporate taxation?",
            questionType: "multiple_choice",
            options: [
              "Form 1120",
              "Schedule C", 
              "Form 1120S",
              "Form 1065"
            ],
            correctAnswer: "Schedule C",
            explanation: "Single-member LLCs are disregarded entities by default and report business income and expenses on Schedule C of Form 1040.",
            orderIndex: 1
          },
          {
            questionText: "What is the current federal corporate tax rate for C-Corporations?",
            questionType: "multiple_choice", 
            options: [
              "15%",
              "21%",
              "25%", 
              "35%"
            ],
            correctAnswer: "21%",
            explanation: "The Tax Cuts and Jobs Act of 2017 set the corporate tax rate at a flat 21% for all C-Corporation income.",
            orderIndex: 2
          },
          {
            questionText: "Which of the following is a major advantage of S-Corporation election?",
            questionType: "multiple_choice",
            options: [
              "No payroll taxes required",
              "Unlimited number of shareholders",
              "Self-employment tax savings on distributions", 
              "Double taxation benefits"
            ],
            correctAnswer: "Self-employment tax savings on distributions",
            explanation: "S-Corporation shareholders who work in the business pay payroll taxes only on their reasonable salary, not on distributions, providing significant SE tax savings.",
            orderIndex: 3
          },
          {
            questionText: "What is the maximum number of shareholders an S-Corporation can have?",
            questionType: "multiple_choice",
            options: [
              "50",
              "75", 
              "100",
              "Unlimited"
            ],
            correctAnswer: "100",
            explanation: "S-Corporations are limited to 100 shareholders, and all shareholders must be US citizens or residents.",
            orderIndex: 4
          },
          {
            questionText: "Which business expense is generally 100% deductible for all entity types?",
            questionType: "multiple_choice",
            options: [
              "Business meals (entertainment)",
              "Software licenses and subscriptions",
              "Personal vehicle expenses", 
              "Home mortgage interest"
            ],
            correctAnswer: "Software licenses and subscriptions",
            explanation: "Business software licenses and subscriptions are ordinary and necessary business expenses that are 100% deductible for all entity types.",
            orderIndex: 5
          }
        ])
      }
    });

    console.log('✅ Week 1 created with lessons and quiz');

    // Week 2: Payroll Taxes and Employee vs Contractor Classification
    const week2 = await prisma.week.create({
      data: {
        courseId: course8.id,
        weekNumber: 2,
        title: 'Payroll Taxes and Employee vs Contractor Classification',
        overview: 'Navigate the complex world of payroll taxes and master worker classification to avoid costly mistakes and penalties.',
        learningObjectives: JSON.stringify([
          'Understand all components of payroll taxes (FICA, FUTA, SUTA)',
          'Master IRS worker classification tests and criteria',
          'Implement proper payroll tax compliance procedures',
          'Avoid misclassification penalties and risks',
          'Optimize worker classification for tax efficiency'
        ]),
        estimatedHours: 8
      }
    });

    const week2lessons = [
      {
        title: 'Understanding Payroll Taxes: FICA, FUTA, and SUTA Explained',
        slug: 'understanding-payroll-taxes-fica-futa-suta',
        content: `# Understanding Payroll Taxes: FICA, FUTA, and SUTA Explained

## Introduction to Payroll Tax Obligations

When you have employees (including yourself as an S-Corp owner), you enter the world of payroll taxes - one of the most complex and penalty-prone areas of business taxation. Understanding these obligations is crucial for compliance and cash flow management.

## The Three Main Types of Payroll Taxes

### 1. FICA Taxes (Federal Insurance Contributions Act)

FICA taxes fund Social Security and Medicare programs and consist of two components:

#### Social Security Tax
\`\`\`
2024 Social Security Tax:
- Rate: 6.2% (employee) + 6.2% (employer) = 12.4% total
- Wage base limit: $160,200
- Maximum tax per person: $9,932.40
- Applies to: Wages, salaries, bonuses, commissions
\`\`\`

#### Medicare Tax
\`\`\`
2024 Medicare Tax:
- Rate: 1.45% (employee) + 1.45% (employer) = 2.9% total  
- No wage base limit (applies to all wages)
- Additional Medicare Tax: 0.9% on wages over $200,000 (employee only)
\`\`\`

#### Combined FICA Rate
\`\`\`
Total FICA Rate: 15.3% (7.65% each for employee and employer)
Up to Social Security wage base, then 2.9% (Medicare only)
Additional 0.9% Medicare tax on high earners
\`\`\`

### Real-World Example: Developer Salary
\`\`\`
Developer Salary: $85,000

Social Security:
- Employee: $85,000 × 6.2% = $5,270
- Employer: $85,000 × 6.2% = $5,270
- Total: $10,540

Medicare:
- Employee: $85,000 × 1.45% = $1,232.50
- Employer: $85,000 × 1.45% = $1,232.50  
- Total: $2,465

Combined FICA: $13,005 ($6,502.50 from each)
\`\`\`

### 2. FUTA Tax (Federal Unemployment Tax Act)

FUTA funds the federal unemployment insurance system:

#### FUTA Tax Details
\`\`\`
2024 FUTA Tax:
- Rate: 6.0% (gross rate)
- Credit for state unemployment taxes: Up to 5.4%
- Net rate: 0.6% (if state taxes paid timely)
- Wage base: $7,000 per employee
- Maximum per employee: $42 annually
- Paid by: Employer only (no employee withholding)
\`\`\`

#### FUTA Credit Calculation
\`\`\`
Employee earning $50,000:

FUTA taxable wages: $7,000 (wage base limit)
Gross FUTA tax: $7,000 × 6.0% = $420
State unemployment credit: $7,000 × 5.4% = $378
Net FUTA tax: $420 - $378 = $42
\`\`\`

### 3. SUTA Tax (State Unemployment Tax Act)

State unemployment taxes vary significantly by state:

#### SUTA Variations
\`\`\`
Common SUTA Characteristics:
- Rates: 0.1% to 12%+ (varies by state and experience rating)
- Wage base: $7,000 to $55,300 (state-dependent)
- New employer rates: Typically 2.7% to 5.4%
- Experience rating adjustments based on unemployment claims
\`\`\`

#### State-by-State Examples (2024)
\`\`\`
California SUTA:
- Rate: 1.5% to 6.2% (new employers: 3.4%)
- Wage base: $7,000
- Disability Insurance: Additional 0.9%

New York SUTA:
- Rate: 1.2% to 9.9% (new employers: 4.1%)
- Wage base: $12,300
- Additional assessments may apply

Texas SUTA:
- Rate: 0.31% to 6.31% (new employers: 2.7%)
- Wage base: $9,000
- No state income tax offset
\`\`\`

## Payroll Tax Compliance Requirements

### 1. Payroll Tax Deposits

#### Deposit Schedules
**Monthly Depositor:**
- Deposits due by 15th of following month
- Most small businesses start here
- Based on lookback period of less than $50,000

**Semi-Weekly Depositor:**
- Paydays Wednesday-Friday: Deposit by following Wednesday
- Paydays Saturday-Tuesday: Deposit by following Friday
- Based on lookback period of $50,000 or more

#### Electronic Deposit Requirements
\`\`\`
EFTPS (Electronic Federal Tax Payment System):
- Required for all business tax deposits
- Must register at www.eftps.gov
- ACH debit from business bank account
- Same-day processing if submitted by 8pm ET
\`\`\`

### 2. Payroll Tax Returns

#### Form 941 (Quarterly)
Filed quarterly for income tax and FICA taxes:
\`\`\`
Form 941 Reporting:
- Wages, tips, and other compensation
- Federal income tax withheld
- Social Security and Medicare taxes
- Due dates: April 30, July 31, October 31, January 31
\`\`\`

#### Form 940 (Annual)
Filed annually for FUTA tax:
\`\`\`
Form 940 Reporting:
- Total payments to employees
- FUTA taxable wages
- FUTA tax liability
- State unemployment tax payments
- Due date: January 31
\`\`\`

### 3. Employee Tax Documents

#### Form W-2 (Annual)
\`\`\`
W-2 Requirements:
- Must provide to employees by January 31
- File with SSA by January 31 (or March 31 if filing electronically)
- Report wages, taxes withheld, benefits
- Separate forms for each employee
\`\`\`

#### Form W-4 (As Needed)
\`\`\`
W-4 Management:
- Collect from new employees before first paycheck
- Update when employees change withholding
- Keep current versions on file
- Use for federal income tax withholding calculations
\`\`\`

## Special Payroll Tax Situations

### 1. S-Corporation Owner-Employees

#### Reasonable Salary Requirement
\`\`\`
S-Corp Owner Working in Business:
- Must receive W-2 wages for services performed
- Wages subject to full payroll taxes
- Distributions not subject to payroll taxes
- "Reasonable" amount based on industry standards
\`\`\`

#### Example S-Corp Payroll Strategy
\`\`\`
S-Corp with $120,000 profit:

Conservative Approach:
- Owner salary: $80,000
- Payroll taxes: $12,240
- Distribution: $40,000
- No additional payroll tax on distribution

Aggressive Approach (Risky):
- Owner salary: $40,000  
- Payroll taxes: $6,120
- Distribution: $80,000
- IRS challenge risk on low salary
\`\`\`

### 2. Multi-State Payroll Issues

#### State Registration Requirements
\`\`\`
Register for payroll taxes when you have:
- Employees working in the state
- Remote employees residing in the state
- Temporary work assignments exceeding thresholds
- Physical presence creating nexus
\`\`\`

#### Reciprocity Agreements
Some states have agreements allowing:
- Employee withholding for resident state
- Reduced compliance burden
- Simplified registration requirements

### 3. Contractor vs Employee Implications

#### Payroll Tax Impact
\`\`\`
$60,000 in compensation:

As Employee:
- Payroll taxes: $9,180 (employer portion)
- Workers' compensation insurance
- Unemployment tax contributions
- Administrative burden

As Contractor:
- No payroll taxes
- Issue Form 1099-NEC
- Contractor handles own taxes
- Reduced administrative burden
\`\`\`

## Common Payroll Tax Mistakes and Penalties

### 1. Late Deposit Penalties
\`\`\`
Penalty Rates (Based on Days Late):
- 1-5 days: 2%
- 6-15 days: 5%  
- 16+ days: 10%
- More than 10 days after first notice: 15%
\`\`\`

### 2. Misclassification Penalties
\`\`\`
IRS Penalties for Misclassification:
- 1.5% of wages (employee's income tax)
- 20% of Social Security/Medicare employee should have paid
- 100% of employer's Social Security/Medicare  
- FUTA tax on wages
- Interest and additional penalties
\`\`\`

### 3. Trust Fund Recovery Penalty
**Most Severe Penalty:**
- Applies to "responsible persons" 
- 100% of employee taxes withheld but not deposited
- Personal liability (pierces corporate veil)
- Cannot be discharged in bankruptcy

## Payroll Tax Best Practices

### 1. Automated Systems
\`\`\`
Recommended Payroll Services:
- ADP, Paychex, Gusto, QuickBooks Payroll
- Automatic tax calculations and deposits
- Compliance monitoring and updates
- Form preparation and filing
- Cost: $30-100+ per month plus per-employee fees
\`\`\`

### 2. Cash Flow Management
\`\`\`
Payroll Tax Cash Flow Planning:
- Set aside 30-35% of gross wages for all payroll taxes
- Maintain separate payroll tax bank account
- Plan for deposit timing (semi-weekly can be challenging)
- Consider seasonal fluctuations
\`\`\`

### 3. Record Keeping
**Essential Payroll Records:**
- Time records and timesheets
- Pay rate authorizations
- Payroll registers
- Tax deposit receipts
- Form 941 and 940 quarterly/annual returns
- Employee W-4 forms
- Payroll tax payment records

### 4. Regular Compliance Reviews
\`\`\`
Monthly Payroll Tax Review:
- Verify deposit timeliness
- Reconcile payroll tax liabilities
- Review employee classifications
- Update rate changes and wage bases
- Monitor multi-state compliance requirements
\`\`\`

## State-Specific Considerations

### 1. Income Tax Withholding
\`\`\`
State Income Tax Variations:
- No state income tax: AK, FL, NV, NH, SD, TN, TX, WA, WY
- Flat rate states: CO, IL, IN, KY, MI, NC, PA, UT  
- Progressive rate states: Most others
- Local income taxes: Some cities/counties
\`\`\`

### 2. Disability Insurance
\`\`\`
State Disability Insurance (SDI):
- California: 0.9% of wages up to $153,164
- New Jersey: 0.47% of wages up to $151,900
- New York: 0.5% of wages up to $142.80/week
- Rhode Island: 1.1% of wages up to $84,600
- Hawaii: Employer-funded temporary disability
\`\`\`

### 3. Paid Family Leave
Several states now require paid family leave:
- Funded through payroll deductions
- Provides wage replacement for family care
- Varies by state in coverage and contribution rates

## Technology and Automation Solutions

### 1. Payroll Software Integration
\`\`\`
Key Features to Look For:
- Automatic tax rate updates
- Multi-state compliance
- Direct deposit capabilities  
- Integration with accounting software
- Employee self-service portals
- Reporting and analytics
\`\`\`

### 2. Time Tracking Integration
\`\`\`
Modern Time Tracking Features:
- Mobile apps for remote workers
- GPS tracking for field employees
- Project-based time allocation
- Overtime calculations
- Integration with payroll processing
\`\`\`

## Action Steps for Payroll Tax Compliance

### 1. Immediate Setup Tasks
- Register for EFTPS account
- Determine deposit schedule (monthly vs semi-weekly)
- Set up payroll processing system
- Create payroll tax savings account
- Register in all applicable states

### 2. Ongoing Compliance
- Make timely tax deposits (never miss deadlines)
- File quarterly Form 941 returns
- File annual Form 940 return
- Issue W-2s by January 31
- Maintain detailed payroll records

### 3. Regular Reviews
- Monthly payroll tax reconciliation
- Quarterly compliance check
- Annual payroll tax review and planning
- Monitor changes in tax rates and regulations

## Conclusion

Payroll taxes represent one of the most complex and penalty-prone areas of business taxation. The combination of FICA, FUTA, and SUTA taxes creates significant compliance obligations and cash flow requirements.

Success in payroll tax compliance requires understanding the various tax types, maintaining accurate records, making timely deposits, and filing required returns. For most businesses, investing in professional payroll services or software is cost-effective given the complexity and penalties involved.

Remember that payroll taxes are "trust fund" taxes - you're collecting employee taxes and holding them in trust for the government. Failure to properly handle these taxes can result in severe personal liability for business owners.

## Key Takeaways

1. **FICA taxes (15.3%) are the largest payroll tax component**
2. **Timely deposits are critical - penalties are severe**
3. **Trust fund recovery penalty creates personal liability**
4. **Professional payroll services often pay for themselves**
5. **Multi-state compliance adds significant complexity**

Next week, we'll explore sales tax obligations for digital products and SaaS businesses - another critical compliance area for modern businesses.`,
        orderIndex: 1,
        estimatedMinutes: 50
      },
      {
        title: 'Worker Classification: Employee vs Independent Contractor',
        slug: 'worker-classification-employee-vs-contractor',
        content: `# Worker Classification: Employee vs Independent Contractor

## The Critical Importance of Worker Classification

Worker classification is one of the most litigated and penalty-prone areas in business taxation. Misclassifying employees as independent contractors can result in back taxes, penalties, interest, and even criminal charges. For businesses, getting this right is essential for compliance and cost management.

## The Financial Impact of Classification

### Cost Comparison: Employee vs Contractor
\`\`\`
$60,000 Annual Compensation Comparison:

Independent Contractor:
- Payment: $60,000
- Employer payroll taxes: $0
- Workers' compensation: $0
- Benefits: $0
- Administrative costs: Minimal
- Total cost: ~$60,000

Employee:
- Wages: $60,000
- Employer payroll taxes: $9,180 (15.3%)
- Workers' compensation: $600-2,400
- Benefits (minimal): $3,000-6,000
- Administrative costs: $1,200-2,400
- Total cost: ~$74,000-80,000

Difference: $14,000-20,000 annually
\`\`\`

This 23-33% cost difference explains why businesses prefer contractor relationships - and why the IRS scrutinizes them carefully.

## The IRS Three-Factor Test

The IRS uses three main categories to determine worker classification:

### 1. Behavioral Control
**Key Question:** Does the company control or have the right to control what the worker does and how the worker does the job?

#### Factors Indicating Employee Status:
- **Training provided:** Company trains worker on specific procedures
- **Instructions given:** Detailed instructions on when, where, and how to work
- **Evaluation systems:** Performance reviews and evaluations
- **Supervision:** Regular oversight and direction

#### Factors Indicating Contractor Status:
- **No training required:** Worker has expertise and works independently
- **Minimal instructions:** Worker determines methods and procedures
- **Results-oriented:** Judged on final deliverables, not process
- **Autonomy:** Works without direct supervision

### Real-World Example: Software Developer
\`\`\`
Employee Indicators:
- Must work 9-5 in company office
- Uses company-provided equipment and software
- Follows company coding standards and procedures
- Attends daily standups and team meetings
- Receives training on company systems
- Work is integrated into company's core operations

Contractor Indicators:
- Works flexible hours from own location
- Uses own equipment and development tools
- Determines technical approach and methodology
- Limited interaction with company employees
- Brings existing expertise, no training needed
- Provides discrete project deliverables
\`\`\`

### 2. Financial Control
**Key Question:** Are the business aspects of the worker's job controlled by the payer?

#### Factors Indicating Employee Status:
- **Fixed salary/hourly pay:** Regular, guaranteed compensation
- **Expenses reimbursed:** Company pays for tools, travel, training
- **No opportunity for profit/loss:** Cannot make business decisions affecting income

#### Factors Indicating Contractor Status:
- **Project-based payment:** Fixed fee for specific deliverables
- **Unreimbursed expenses:** Contractor pays own costs
- **Profit/loss opportunity:** Can realize profit or loss from efficient work
- **Investment in business:** Owns equipment, maintains office, etc.

### Financial Control Examples
\`\`\`
Employee Financial Structure:
- $5,000/month salary regardless of hours worked
- Company provides laptop, software licenses, office space
- Business travel expenses reimbursed
- Paid time off and sick leave
- No opportunity to profit from efficiency

Contractor Financial Structure:
- $25,000 fixed fee for mobile app development
- Must provide own equipment and software
- Pays own travel and business expenses
- No payment if not working
- Can profit by completing work efficiently
- Can lose money if project takes longer than expected
\`\`\`

### 3. Type of Relationship
**Key Question:** How do the business and worker perceive their relationship?

#### Factors Indicating Employee Status:
- **Written employment contract:** Offer letter, employment agreement
- **Benefits provided:** Health insurance, retirement plan, vacation pay
- **Permanency:** Ongoing, indefinite relationship
- **Key business activity:** Work is integral to business operations

#### Factors Indicating Contractor Status:
- **Written independent contractor agreement:** Clear contractor terms
- **No benefits:** Contractor handles own insurance, retirement
- **Temporary relationship:** Specific project with defined end date
- **Specialized service:** Work is supplemental to core business

## Common Misclassification Scenarios

### 1. The "Permanent Contractor"
**Red Flags:**
\`\`\`
Scenario: Developer working full-time for same company for 2+ years
- Works exclusively for one client
- Works regular business hours  
- Uses company equipment
- Integrated into company teams
- Receives regular pay regardless of hours

IRS Likely Determination: Employee
Risk Level: Very High
\`\`\`

### 2. The "Remote Employee" 
**Red Flags:**
\`\`\`
Scenario: Company hires "contractors" to save on payroll taxes
- Receives detailed work instructions
- Must use company processes and tools
- Regular performance evaluations
- Work schedule dictated by company
- Economically dependent on single employer

IRS Likely Determination: Employee  
Risk Level: Very High
\`\`\`

### 3. The "Hybrid Worker"
**Gray Area:**
\`\`\`
Scenario: Developer with mix of employee/contractor indicators
- Works on specific project (contractor indicator)
- But works on-site with company team (employee indicator)
- Uses mix of own and company tools
- Has some autonomy but regular check-ins

IRS Likely Determination: Fact-specific analysis required
Risk Level: Moderate to High
\`\`\`

## Industry-Specific Considerations

### Technology Industry Standards
The tech industry has unique considerations:

#### Software Development
\`\`\`
Contractor-Friendly Indicators:
- Project-based work (build specific app/feature)
- Specialized technical expertise
- Use of own development tools and methodologies
- Results-oriented deliverables
- Limited integration with internal teams

Employee-Leaning Indicators:
- Ongoing maintenance and support work
- Integration into agile development teams
- Regular sprint planning and standup participation
- Use of company development environments
- Code review and approval processes
\`\`\`

#### IT Services and Consulting
\`\`\`
Strong Contractor Profile:
- Discrete consulting engagements
- Own business entity and multiple clients
- Specialized expertise (cybersecurity, cloud architecture)
- Fixed-fee project pricing
- Professional liability insurance
- Marketing to multiple potential clients

Weak Contractor Profile:
- Long-term IT support role
- Works exclusively for one client
- Hourly billing without project scope
- Uses client's tools and follows client procedures
- No other clients or business development efforts
\`\`\`

## Legal Consequences of Misclassification

### 1. Federal Tax Consequences
\`\`\`
IRS Assessment for Misclassified Worker:
- Back payroll taxes (employer's portion)
- Employee's income taxes (if not withheld)
- Interest on unpaid taxes
- Penalties ranging from 1.5% to 40%
- Potential criminal charges for willful violations

Example: $60,000 misclassified worker for 3 years:
- Back payroll taxes: ~$27,000
- Penalties and interest: $8,000-15,000
- Total potential liability: $35,000-42,000 per worker
\`\`\`

### 2. State Consequences
States often have different and sometimes stricter standards:

#### California (ABC Test)
California's strict three-part test requires ALL of:
- (A) Free from control and direction
- (B) Work is outside usual course of business OR performed outside business locations
- (C) Worker is customarily engaged in an independently established trade/occupation

#### New York
- Similar to federal test but with additional factors
- Strong presumption of employee status
- Significant penalties for misclassification

#### Massachusetts
- ABC test similar to California
- Criminal penalties possible
- Joint and several liability for corporate officers

### 3. Other Legal Consequences
\`\`\`
Beyond Tax Issues:
- Workers' compensation violations
- Unemployment insurance violations
- Wage and hour law violations (overtime, minimum wage)
- ERISA violations (benefits)
- Civil lawsuits by workers
- Class action potential
\`\`\`

## Safe Harbor Protections

### Section 530 Relief
Congress created limited protection for businesses that:
1. **Consistency:** Treated similar workers the same way
2. **Substance:** Had reasonable basis for classification
3. **Reporting:** Filed required 1099s

#### Reasonable Basis Examples
- Judicial precedent or published IRS ruling
- Prior IRS audit with no reclassification
- Long-standing industry practice

### Voluntary Classification Settlement Program (VCSP)
IRS program allowing businesses to:
- Voluntarily reclassify workers
- Pay reduced penalties (10% of employment taxes)
- Receive audit protection for prior years

## Best Practices for Proper Classification

### 1. Documentation Strategies
\`\`\`
Independent Contractor Agreement Should Include:
- Specific project scope and deliverables
- Payment terms (project-based preferred)
- Contractor's right to use assistants/subcontractors
- Contractor provides own tools and equipment
- No guarantee of continued work
- Contractor can work for others
- Contractor bears risk of profit/loss
\`\`\`

### 2. Operational Best Practices
\`\`\`
Contractor Relationship Management:
- Avoid requiring specific work hours
- Don't provide office space or equipment
- Focus on results, not methods
- Limit integration into company operations
- Use project-based payments
- Don't provide training on general skills
- Allow contractor to hire assistants
\`\`\`

### 3. Regular Classification Reviews
\`\`\`
Quarterly Classification Audit:
- Review all contractor relationships
- Document business justification for classification
- Ensure agreements match actual relationship
- Monitor for changes in working relationship
- Consider IRS Form SS-8 for uncertain cases
\`\`\`

## When to Seek Professional Help

### IRS Form SS-8 Determination
For unclear cases, you can request IRS determination:
- Submit Form SS-8 with detailed facts
- IRS will make formal determination
- Provides some protection if followed
- Takes 6+ months for response

### Professional Consultation Recommended When:
- High-value or long-term contractor relationships
- Unclear classification under testing factors
- Previous classification challenges
- Significant financial exposure
- Industry practice differs from general rules

## Strategic Classification Planning

### 1. Business Structure Considerations
\`\`\`
Contractor-Friendly Business Models:
- Project-based work with clear deliverables
- Specialized technical services
- Consulting and advisory services
- Creative and design work
- Temporary or seasonal work

Employee-Required Models:
- Ongoing operational roles
- Customer service positions
- Management and supervision roles
- Core business functions
- Integrated team-based work
\`\`\`

### 2. Risk Management Strategies
\`\`\`
Risk Mitigation Approaches:
- Diversify contractor relationships (avoid single-source dependency)
- Maintain clear project-based scope
- Document business reasons for contractor classification
- Regular legal and tax review of classifications
- Consider hybrid models (part employee, part contractor)
\`\`\`

## The Future of Worker Classification

### Emerging Trends
1. **Gig Economy Legislation:** States creating new classification categories
2. **Remote Work Impact:** COVID-19 changed work relationships
3. **Technology Platforms:** Uber, Lyft cases influencing standards  
4. **Federal Legislation:** Potential national standards being considered

### Staying Current
- Monitor state legislation changes
- Follow IRS guidance updates
- Industry association resources
- Regular professional consultation

## Action Steps for Compliance

### 1. Immediate Actions
- Review all current contractor relationships
- Assess each relationship against IRS three-factor test
- Document business justification for classifications
- Update contractor agreements to match actual relationships

### 2. Ongoing Compliance
- Implement quarterly classification reviews
- Train managers on classification factors
- Maintain clear boundaries in contractor relationships
- Monitor changes in work relationships over time

### 3. Documentation and Records
- Maintain detailed contractor agreements
- Document project scope and deliverables
- Keep records of contractor's independence
- File required 1099s accurately and timely

## Conclusion

Worker classification is a high-stakes decision that affects virtually every aspect of business operations, from tax obligations to legal liability. The difference between an employee and independent contractor can mean thousands of dollars per worker in annual costs and potentially devastating penalties for misclassification.

The key to success is understanding that classification is based on the reality of the working relationship, not just the written agreement. The IRS looks at the totality of circumstances, with particular focus on behavioral control, financial control, and the type of relationship.

When in doubt, err on the side of employee classification or seek professional guidance. The short-term savings from contractor classification are rarely worth the long-term risks of misclassification penalties and legal consequences.

## Key Takeaways

1. **Classification is based on facts, not agreements**
2. **The three-factor test evaluates behavioral, financial, and relationship control**
3. **Misclassification penalties can exceed the original tax savings**
4. **State laws may be stricter than federal standards**
5. **Regular review and documentation are essential for compliance**

Next week, we'll explore sales tax obligations for digital products and SaaS businesses - another complex compliance area that many tech businesses overlook.`,
        orderIndex: 2,
        estimatedMinutes: 60
      }
    ];

    // Create Week 2 lessons
    for (const lessonData of week2lessons) {
      await prisma.lesson.create({
        data: {
          weekId: week2.id,
          title: lessonData.title,
          slug: lessonData.slug,
          content: lessonData.content,
          orderIndex: lessonData.orderIndex,
          estimatedMinutes: lessonData.estimatedMinutes,
          isPublished: true
        }
      });
    }

    // Create Week 2 Quiz
    const week2Quiz = await prisma.quiz.create({
      data: {
        weekId: week2.id,
        title: 'Payroll Taxes and Worker Classification Quiz',
        description: 'Test your understanding of payroll tax obligations and employee vs contractor classification',
        timeLimit: 30,
        passingScore: 70,
        maxAttempts: 3,
        questions: JSON.stringify([
          {
            questionText: "What is the combined FICA tax rate for 2024 (employee + employer portions)?",
            questionType: "multiple_choice",
            options: [
              "12.4%",
              "15.3%", 
              "7.65%",
              "18.2%"
            ],
            correctAnswer: "15.3%",
            explanation: "FICA taxes include Social Security (12.4% total) and Medicare (2.9% total), for a combined rate of 15.3% split between employee and employer.",
            orderIndex: 1
          },
          {
            questionText: "Which of the following is NOT one of the three main IRS tests for worker classification?",
            questionType: "multiple_choice", 
            options: [
              "Behavioral Control",
              "Financial Control",
              "Type of Relationship",
              "Geographic Location"
            ],
            correctAnswer: "Geographic Location",
            explanation: "The IRS uses three main factors: Behavioral Control, Financial Control, and Type of Relationship. Geographic location is not a primary classification factor.",
            orderIndex: 2
          },
          {
            questionText: "What is the current FUTA tax rate after the state unemployment tax credit?",
            questionType: "multiple_choice",
            options: [
              "6.0%",
              "5.4%", 
              "0.6%",
              "2.7%"
            ],
            correctAnswer: "0.6%",
            explanation: "FUTA tax is 6.0% gross rate, but employers receive up to 5.4% credit for state unemployment taxes, resulting in a net rate of 0.6%.",
            orderIndex: 3
          },
          {
            questionText: "Which scenario MOST strongly indicates independent contractor status?",
            questionType: "multiple_choice",
            options: [
              "Worker receives detailed daily instructions on work methods",
              "Worker is paid a fixed fee for a specific project deliverable",
              "Worker must work specific hours at company premises", 
              "Worker receives company training on procedures"
            ],
            correctAnswer: "Worker is paid a fixed fee for a specific project deliverable",
            explanation: "Project-based payment for specific deliverables indicates financial control and contractor status, while the other options suggest employee status.",
            orderIndex: 4
          },
          {
            questionText: "What is the Trust Fund Recovery Penalty?",
            questionType: "multiple_choice",
            options: [
              "A penalty for late payroll tax deposits",
              "Personal liability for 100% of unpaid employee taxes", 
              "A penalty for misclassifying workers",
              "Interest charges on unpaid payroll taxes"
            ],
            correctAnswer: "Personal liability for 100% of unpaid employee taxes",
            explanation: "The Trust Fund Recovery Penalty holds responsible persons personally liable for 100% of employee taxes that were withheld but not deposited to the IRS.",
            orderIndex: 5
          }
        ])
      }
    });

    console.log('✅ Week 2 created with lessons and quiz');

    console.log('🎉 Course 8: Small Business Tax Strategy created successfully!');
    console.log('📚 Course includes:');
    console.log('   - 2 weeks with comprehensive content');
    console.log('   - 4 professional lessons');
    console.log('   - 2 assessment quizzes');
    console.log('   - Tax Specialization category');
    console.log('');
    console.log('🔧 Next steps:');
    console.log('   - Add remaining 3 weeks (Sales Tax, State Considerations, Tax Planning)');
    console.log('   - Test course functionality in browser');
    console.log('   - Commit and deploy changes');

  } catch (error) {
    console.error('❌ Error creating Course 8:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createCourse8();