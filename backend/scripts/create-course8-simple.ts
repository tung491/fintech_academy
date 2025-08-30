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

    // Week 1 Lesson 1
    const week1lesson1 = await prisma.lesson.create({
      data: {
        weekId: week1.id,
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

Schedule C is divided into several parts that capture your business income and expenses for the tax year.

### Part I: Income
This section reports your gross business income:
- Line 1: Gross receipts or sales
- Line 2: Returns and allowances  
- Line 3: Subtract line 2 from line 1
- Line 4: Cost of goods sold (from Part III)
- Line 5: Gross profit (line 3 minus line 4)
- Line 6: Other income
- Line 7: Gross income (line 5 plus line 6)

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
Only business expenses are deductible. Personal expenses cannot be claimed.

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
- Gross Income: $85,000
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

## Key Takeaways

1. **Schedule C is for sole proprietorships and single-member LLCs**
2. **All net business income is subject to self-employment tax**
3. **Proper record keeping is essential for audit protection**
4. **Home office and equipment deductions can provide significant tax savings**
5. **Consider entity changes as income grows or liability increases**

Next lesson, we'll explore Form 1120 and 1120S for corporations and understand when these more complex structures might benefit your business.`,
        orderIndex: 1,
        durationMinutes: 45
      }
    });

    // Week 1 Lesson 2
    const week1lesson2 = await prisma.lesson.create({
      data: {
        weekId: week1.id,
        title: 'Form 1120 and 1120S: Corporate Tax Returns Explained',
        slug: 'form-1120-1120s-corporate-tax-returns',
        content: `# Form 1120 and 1120S: Corporate Tax Returns Explained

## Understanding Corporate Tax Structures

When your business grows beyond sole proprietorship or single-member LLC status, you enter the world of corporate taxation. This involves more complex tax returns but potentially significant tax advantages.

## Form 1120: C-Corporation Tax Return

### What is a C-Corporation?

A C-Corporation is a separate legal entity that:
- Exists independently from its owners (shareholders)
- Has unlimited life
- Can have multiple classes of stock
- Provides complete liability protection
- Faces "double taxation" on profits

### Form 1120 Structure and Key Components

**Income Section**
- Gross receipts or sales
- Cost of goods sold
- Capital gains and losses
- Other income sources

**Deductions Section - Corporate-Specific Deductions:**
- Compensation of officers
- Salaries and wages (including payroll taxes)
- Bad debts
- Business insurance premiums
- Depreciation
- Advertising expenses
- Professional services
- Office expenses

**Tax Calculation**
2024 Corporate Tax Rates:
- Flat 21% federal rate on all corporate income
- State corporate taxes vary by state
- Additional taxes may apply (AMT, etc.)

### Advantages of C-Corporation Election

#### 1. Salary vs Distribution Strategy
Total Compensation Example: $100,000

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

## Form 1120S: S-Corporation Tax Return

### What is an S-Corporation?

An S-Corporation is a special tax election that:
- Provides liability protection like a C-Corp
- Offers pass-through taxation like an LLC
- Has restrictions on shareholders and stock classes
- Requires reasonable salary for owner-employees

### S-Corporation Eligibility Requirements

**Shareholder Limitations**
- Maximum 100 shareholders
- All shareholders must be US citizens or residents
- No corporate or partnership shareholders
- Only one class of stock (voting differences allowed)

**Entity Requirements**
- Must be domestic corporation
- Cannot be certain types of businesses (banks, insurance companies)
- Cannot have nonresident alien shareholders

### Form 1120S Structure

Unlike Form 1120, Form 1120S:
- Reports income and expenses
- Calculates profit/loss
- Issues K-1s to shareholders
- Generally pays no federal income tax

**Key Schedule K-1 Items**
- Ordinary business income/loss
- Net rental real estate income/loss
- Other net rental income/loss
- Interest income
- Dividend income
- Royalties
- Net short-term capital gain/loss
- Net long-term capital gain/loss
- Section 179 deduction
- Charitable contributions

### S-Corporation Tax Advantages

#### 1. Self-Employment Tax Savings
Example: $100,000 total business income

Sole Proprietorship:
- SE tax on $100,000 = $14,130

S-Corporation:
- Reasonable salary: $60,000
- SE tax (payroll) on $60,000 = $9,180
- Distribution: $40,000 (no SE tax)
- Total SE tax savings: $4,950 annually

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
Incorrect: $120,000 profit, $20,000 salary, $100,000 distribution
Correct: $120,000 profit, $60,000 salary, $60,000 distribution

## Comparison: Schedule C vs 1120 vs 1120S

### Tax Treatment Comparison
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

## Key Takeaways

1. **Schedule C is simplest but has SE tax on all income**
2. **C-Corporations face double taxation but offer maximum flexibility**
3. **S-Corporations provide pass-through benefits with SE tax savings**
4. **Entity choice should consider both tax and non-tax factors**
5. **Regular review ensures your structure remains optimal**

Next week, we'll dive into payroll taxes and worker classification - critical areas that can make or break your business tax strategy.`,
        orderIndex: 2,
        durationMinutes: 55
      }
    });

    // Week 1 Quiz
    const week1Quiz = await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'Business Tax Return Types Quiz',
        description: 'Test your understanding of Schedule C, Form 1120, and Form 1120S',
        timeLimitMinutes: 30,
        passingScore: 70,
        maxAttempts: 3
      }
    });

    // Create Week 1 Quiz Questions
    const week1Questions = [
      {
        questionText: "Which tax form is used by single-member LLCs that haven't elected corporate taxation?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Form 1120",
          "Schedule C", 
          "Form 1120S",
          "Form 1065"
        ]),
        correctAnswer: "Schedule C",
        explanation: "Single-member LLCs are disregarded entities by default and report business income and expenses on Schedule C of Form 1040.",
        orderIndex: 1
      },
      {
        questionText: "What is the current federal corporate tax rate for C-Corporations?",
        questionType: "multiple_choice", 
        options: JSON.stringify([
          "15%",
          "21%",
          "25%", 
          "35%"
        ]),
        correctAnswer: "21%",
        explanation: "The Tax Cuts and Jobs Act of 2017 set the corporate tax rate at a flat 21% for all C-Corporation income.",
        orderIndex: 2
      },
      {
        questionText: "Which of the following is a major advantage of S-Corporation election?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "No payroll taxes required",
          "Unlimited number of shareholders",
          "Self-employment tax savings on distributions", 
          "Double taxation benefits"
        ]),
        correctAnswer: "Self-employment tax savings on distributions",
        explanation: "S-Corporation shareholders who work in the business pay payroll taxes only on their reasonable salary, not on distributions, providing significant SE tax savings.",
        orderIndex: 3
      },
      {
        questionText: "What is the maximum number of shareholders an S-Corporation can have?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "50",
          "75", 
          "100",
          "Unlimited"
        ]),
        correctAnswer: "100",
        explanation: "S-Corporations are limited to 100 shareholders, and all shareholders must be US citizens or residents.",
        orderIndex: 4
      },
      {
        questionText: "Which business expense is generally 100% deductible for all entity types?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Business meals (entertainment)",
          "Software licenses and subscriptions",
          "Personal vehicle expenses", 
          "Home mortgage interest"
        ]),
        correctAnswer: "Software licenses and subscriptions",
        explanation: "Business software licenses and subscriptions are ordinary and necessary business expenses that are 100% deductible for all entity types.",
        orderIndex: 5
      }
    ];

    // Create questions
    for (const questionData of week1Questions) {
      await prisma.question.create({
        data: {
          quizId: week1Quiz.id,
          ...questionData
        }
      });
    }

    console.log('✅ Week 1 created with lessons and quiz');
    console.log('🎉 Course 8: Small Business Tax Strategy - Week 1 created successfully!');
    console.log('📚 Week 1 includes:');
    console.log('   - Business Tax Return Types overview');
    console.log('   - 2 comprehensive lessons');
    console.log('   - 1 assessment quiz with 5 questions');
    console.log('');
    console.log('🔧 Next steps:');
    console.log('   - Add remaining 4 weeks');
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