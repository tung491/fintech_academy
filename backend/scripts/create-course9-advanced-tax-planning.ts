import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse9() {
  try {
    console.log('🚀 Creating Course 9: Advanced Tax Planning for High Earners...');

    // Check if the course already exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        slug: 'advanced-tax-planning-high-earners'
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

    // Create Course 9: Advanced Tax Planning for High Earners
    const course9 = await prisma.course.create({
      data: {
        title: 'Advanced Tax Planning for High Earners',
        slug: 'advanced-tax-planning-high-earners',
        description: 'Advanced tax strategies for high-income developers and founders covering retirement planning, capital gains optimization, estate planning, and international tax considerations for remote work.',
        shortDescription: 'Advanced tax optimization strategies for high-earning tech professionals',
        categoryId: category.id,
        level: 'advanced',
        duration: '4 weeks',
        estimatedHours: 32,
        price: 29700, // $297
        originalPrice: 39700, // $397
        instructor: 'Jennifer Walsh, CPA, CFP, MST',
        instructorBio: 'Master of Science in Taxation and Certified Financial Planner with 25+ years experience in high-net-worth tax planning. Former Big 4 tax partner specializing in executive compensation and international tax strategies.',
        thumbnailUrl: '/images/courses/advanced-tax-planning.jpg',
        orderIndex: 9,
        isPublished: true,
        isFeatured: true,
        skillsLearned: JSON.stringify([
          'Master tax-advantaged retirement strategies (SEP-IRA, Solo 401k, defined benefit plans)',
          'Optimize capital gains through strategic timing and tax-loss harvesting',
          'Understand estate planning fundamentals for tech wealth accumulation',
          'Navigate international tax considerations for remote work and global income',
          'Implement advanced tax planning strategies for high earners',
          'Structure compensation to minimize overall tax burden'
        ]),
        targetAudience: 'High-income developers, startup founders, tech executives, and entrepreneurs with complex tax situations looking to optimize their tax strategy through advanced planning techniques.',
      }
    });

    console.log('✅ Course 9 created successfully');

    // Week 1: Tax-advantaged Retirement Strategies (SEP, Solo 401k)
    const week1 = await prisma.week.create({
      data: {
        courseId: course9.id,
        weekNumber: 1,
        title: 'Tax-advantaged Retirement Strategies (SEP, Solo 401k)',
        overview: 'Master advanced retirement planning strategies for high earners, including SEP-IRAs, Solo 401(k)s, and defined benefit plans to maximize tax savings and retirement accumulation.',
        learningObjectives: JSON.stringify([
          'Understand all retirement plan options for business owners and high earners',
          'Compare SEP-IRA, Solo 401(k), and defined benefit plan features and benefits',
          'Calculate optimal contribution strategies for tax minimization',
          'Navigate plan setup, administration, and compliance requirements',
          'Implement advanced strategies like backdoor Roth conversions'
        ]),
        estimatedHours: 8
      }
    });

    const week1lessons = [
      {
        title: 'SEP-IRA vs Solo 401(k): Choosing the Right Retirement Plan',
        slug: 'sep-ira-vs-solo-401k-choosing-right-retirement-plan',
        content: `# SEP-IRA vs Solo 401(k): Choosing the Right Retirement Plan

## Introduction to High-Earner Retirement Planning

As a high-income developer or entrepreneur, traditional retirement planning advice doesn't apply to your situation. You need sophisticated strategies that can handle irregular income, maximize tax savings, and provide flexibility for business growth. The choice between SEP-IRA, Solo 401(k), and other advanced plans can mean tens of thousands in annual tax savings.

## Understanding Your Retirement Plan Options

### The High-Earner Challenge
\`\`\`
Common High-Earner Scenarios:
- Developer earning $200,000+ from consulting
- SaaS founder with fluctuating revenue
- Startup equity creating irregular income spikes
- Multiple income streams (W-2 + 1099 + business)
- International income complications
- Need for both current deductions and future flexibility
\`\`\`

### Retirement Plan Contribution Limits 2024
\`\`\`
Traditional IRA: $7,000 ($8,000 if 50+)
Roth IRA: $7,000 ($8,000 if 50+) - income limits apply
401(k) Employee: $23,000 ($30,500 if 50+)
Solo 401(k) Total: $69,000 ($76,500 if 50+)
SEP-IRA: $69,000 or 25% of compensation
Defined Benefit: $275,000+ (age and income dependent)
\`\`\`

## SEP-IRA (Simplified Employee Pension)

### What is a SEP-IRA?

A SEP-IRA is an employer-sponsored retirement plan that allows business owners to contribute up to 25% of compensation (or 20% of self-employment income after the SE tax adjustment) to retirement accounts for themselves and eligible employees.

### SEP-IRA Key Features
\`\`\`
Contribution Limits:
- 2024: $69,000 maximum
- 25% of compensation (employees)
- 20% of self-employment income (self-employed)
- Same contribution percentage for all eligible employees

Eligibility Requirements:
- Age 21 or older
- Worked 3 of last 5 years
- Earned at least $750 in compensation

Setup and Administration:
- Simple setup (Form 5305-SEP)
- Minimal ongoing administration
- No annual filing requirements
- Each participant controls their own investments
\`\`\`

### SEP-IRA Advantages

#### 1. Simplicity
- **Easy Setup**: Can be established and funded up to tax filing deadline (plus extensions)
- **Minimal Paperwork**: No complex plan documents or annual filings
- **Low Cost**: Typically $25-100 annually per participant

#### 2. High Contribution Limits
\`\`\`
Self-Employment Income Calculation:
$200,000 self-employment income
Less: Deductible SE tax ($14,130)
Adjusted SE income: $185,870
SEP contribution: $185,870 × 20% = $37,174

Compare to Traditional IRA: $7,000 limit
Additional tax-deferred savings: $30,174
Tax savings at 32% bracket: ~$9,656
\`\`\`

#### 3. Flexibility
- **No Required Contributions**: Can skip years with low income
- **Late Setup**: Can establish after year-end if needed
- **Investment Control**: Participants choose their own investments

### SEP-IRA Disadvantages

#### 1. Employee Inclusion Requirement
\`\`\`
Example: Agency with 5 employees
Owner contribution: $20,000
Required employee contributions: 5 × $3,000 = $15,000
Total cost: $35,000 for $20,000 owner benefit
Cost ratio: 175%
\`\`\`

#### 2. No Loan Provisions
- Cannot borrow against SEP-IRA balance
- Early withdrawal penalties apply (10% before age 59½)
- No hardship distribution options

#### 3. Limited Catch-Up Contributions
- Standard $7,000 catch-up for 50+ (same as regular IRA)
- No additional business owner catch-up provisions

## Solo 401(k) (Individual 401(k))

### What is a Solo 401(k)?

A Solo 401(k) is designed for business owners with no employees (except a spouse). It allows both employee and employer contributions, dramatically increasing the total contribution potential.

### Solo 401(k) Key Features
\`\`\`
Dual Contribution Structure:
- Employee contribution: $23,000 ($30,500 if 50+)
- Employer contribution: 25% of compensation
- Combined limit: $69,000 ($76,500 if 50+)

Eligibility:
- Business owner with no employees
- Spouse can participate
- Any business structure (sole prop, LLC, S-Corp, C-Corp)

Administration:
- More complex setup than SEP-IRA
- Annual Form 5500-SF if balance > $250,000
- Plan document required
\`\`\`

### Solo 401(k) Advantages

#### 1. Maximum Contribution Potential
\`\`\`
High-Income Example: $200,000 S-Corp salary

Employee contribution: $23,000
Employer contribution: $200,000 × 25% = $50,000
Total contribution: $73,000 (but limited to $69,000 max)

Actual contribution: $69,000
Tax savings at 32% bracket: $22,080 annually
\`\`\`

#### 2. Loan Provisions
\`\`\`
Solo 401(k) Loan Features:
- Borrow up to $50,000 or 50% of balance
- 5-year repayment (longer for home purchase)
- Interest paid to your own account
- No credit check or approval process
\`\`\`

#### 3. Roth Options
- **Roth 401(k) contributions**: After-tax with tax-free growth
- **In-plan Roth conversions**: Convert traditional to Roth within plan
- **Backdoor Roth strategy**: No income limits on Roth 401(k)

#### 4. Earlier Access Options
\`\`\`
Distribution Options:
- Age 59½: Penalty-free withdrawals
- Age 55 rule: If separated from service
- Hardship distributions: Limited circumstances
- Required distributions: Begin at age 73
\`\`\`

### Solo 401(k) Disadvantages

#### 1. Administrative Complexity
- **Plan Document**: Must have written plan document
- **Annual Filings**: Form 5500-SF if balance exceeds $250,000
- **Compliance Testing**: Self-employed individuals must track compensation carefully

#### 2. Employee Restrictions
\`\`\`
Disqualifying Employees:
- Full-time employees (1,000+ hours annually)
- Part-time employees meeting eligibility
- Does NOT include: Independent contractors
Exception: Spouse can participate as employee
\`\`\`

#### 3. Setup Timing
- Must be established by December 31 of contribution year
- Cannot be created retroactively like SEP-IRA

## Detailed Comparison: SEP-IRA vs Solo 401(k)

### Contribution Calculations

#### Scenario 1: Solo Consultant ($150,000 income)
\`\`\`
SEP-IRA:
- Self-employment income: $150,000
- Less: SE tax deduction (~$10,600)
- Adjusted income: $139,400
- Maximum contribution: $139,400 × 20% = $27,880

Solo 401(k):
- Employee contribution: $23,000
- Employer contribution: $139,400 × 20% = $27,880
- Total potential: $50,880
- 2024 limit applies: $50,880 (within $69,000 limit)

Additional Solo 401(k) benefit: $23,000
\`\`\`

#### Scenario 2: S-Corp Owner ($100,000 salary)
\`\`\`
SEP-IRA:
- W-2 wages: $100,000
- Maximum contribution: $100,000 × 25% = $25,000

Solo 401(k):
- Employee contribution: $23,000
- Employer contribution: $100,000 × 25% = $25,000
- Total contribution: $48,000

Additional Solo 401(k) benefit: $23,000
\`\`\`

### Decision Matrix

| Factor | SEP-IRA Better | Solo 401(k) Better |
|--------|----------------|-------------------|
| **Simplicity** | ✓ Minimal setup/admin | Complex setup/admin |
| **Contribution Amount** | Lower limits | ✓ Higher limits |
| **Employee Impact** | Must include employees | ✓ Owner-only |
| **Setup Timing** | ✓ After year-end OK | Must setup by 12/31 |
| **Loan Access** | No loans | ✓ Loan provisions |
| **Roth Options** | Traditional only | ✓ Roth available |
| **Cost** | ✓ Very low cost | Higher admin costs |

### When to Choose SEP-IRA
\`\`\`
SEP-IRA is ideal when:
- You have employees and want simplicity
- Income is irregular/unpredictable
- You want minimal administrative burden
- You're unsure about annual contributions
- You need flexibility to setup after year-end
- Your contribution would be similar to Solo 401(k)
\`\`\`

### When to Choose Solo 401(k)
\`\`\`
Solo 401(k) is ideal when:
- You have no employees (except spouse)
- You want maximum contribution potential
- You value loan access for flexibility
- You want Roth contribution options
- You have stable, predictable income
- You're committed to annual contributions
\`\`\`

## Advanced Strategies for High Earners

### 1. Income Timing Strategies
\`\`\`
Year-End Planning:
- Accelerate income in low-tax years
- Defer income in high-tax years
- Time retirement contributions to offset income spikes
- Consider quarterly estimated tax impacts
\`\`\`

### 2. Multiple Plan Strategies
\`\`\`
Complex Scenarios:
- W-2 job + consulting business = 401(k) + Solo 401(k)
- Must coordinate contribution limits
- Employee contributions aggregate across all plans
- Employer contributions separate by entity
\`\`\`

### 3. Backdoor Roth Strategies
\`\`\`
High-Income Roth Access:
- Traditional IRA to Roth conversion
- Solo 401(k) Roth contributions (no income limit)
- In-plan Roth conversions
- Mega backdoor Roth (if plan allows after-tax contributions)
\`\`\`

## Implementation Action Steps

### SEP-IRA Setup Process
1. **Choose Provider**: Fidelity, Vanguard, Schwab, etc.
2. **Complete Form 5305-SEP**: Simple adoption agreement
3. **Open IRA Accounts**: For yourself and eligible employees
4. **Make Contributions**: By tax filing deadline
5. **Maintain Records**: Keep contribution calculations

### Solo 401(k) Setup Process
1. **Choose Provider**: Compare fees and features
2. **Adopt Plan Document**: Review and execute plan agreement
3. **Obtain EIN**: If needed for the plan
4. **Open Plan Account**: Establish the 401(k) account
5. **Setup Payroll Deferrals**: If using employee contributions
6. **Annual Administration**: File Form 5500-SF if required

### Ongoing Management
\`\`\`
Annual Tasks:
- Calculate maximum contributions based on income
- Make contributions before deadlines
- Review investment allocations
- Monitor rule changes and limits
- Consider conversions and distributions
- Plan for required minimum distributions (age 73+)
\`\`\`

## Common Mistakes to Avoid

### 1. Contribution Limit Errors
\`\`\`
Frequent Mistakes:
- Exceeding annual limits
- Incorrect compensation calculations
- Not coordinating multiple plans
- Missing employee inclusion requirements (SEP-IRA)
\`\`\`

### 2. Setup Timing Issues
\`\`\`
Critical Deadlines:
- Solo 401(k): Must establish by December 31
- SEP-IRA: Can establish by tax filing deadline
- Contributions: Generally by tax filing deadline
- Extensions: Additional time for contributions, not setup
\`\`\`

### 3. Employee Classification Problems
\`\`\`
Solo 401(k) Disqualification:
- Hiring employees during the year
- Misclassifying contractors as employees
- Not considering spouse employment status
- Part-time employee hour tracking errors
\`\`\`

## Tax Planning Integration

### Current Year Benefits
\`\`\`
Tax Savings Calculation:
$50,000 retirement contribution
Tax bracket: 32% federal + 8% state = 40%
Current year tax savings: $20,000

Additional benefits:
- Reduces AGI for other deductions
- May qualify for additional tax credits
- Lowers self-employment tax base (SEP/Solo 401k)
\`\`\`

### Future Tax Considerations
\`\`\`
Distribution Planning:
- Traditional contributions: Taxed as ordinary income
- Tax rate arbitrage: High rates now, lower rates in retirement?
- Required minimum distributions beginning age 73
- Estate planning implications
- Roth conversion opportunities in lower-income years
\`\`\`

## Conclusion

For high-earning developers and entrepreneurs, choosing between SEP-IRA and Solo 401(k) can significantly impact both current tax savings and long-term wealth accumulation. The Solo 401(k) generally provides higher contribution limits and more flexibility, making it ideal for business owners without employees. The SEP-IRA offers simplicity and can work well when you have employees or want minimal administrative burden.

The key is matching your retirement plan choice to your specific business structure, income level, employee situation, and administrative preferences. Both plans offer substantial tax advantages over traditional IRAs, and either choice will put you far ahead of basic retirement planning.

## Key Takeaways

1. **Solo 401(k) generally allows higher contributions than SEP-IRA**
2. **Employee status is the primary decision factor**
3. **Setup timing requirements differ significantly between plans**
4. **Loan provisions and Roth options favor Solo 401(k)**
5. **Both plans offer substantial tax advantages for high earners**

Next, we'll explore defined benefit plans and other advanced retirement strategies for ultra-high earners looking to save even more for retirement.`,
        orderIndex: 1,
        estimatedMinutes: 55
      },
      {
        title: 'Defined Benefit Plans and Advanced Retirement Strategies',
        slug: 'defined-benefit-plans-advanced-retirement-strategies',
        content: `# Defined Benefit Plans and Advanced Retirement Strategies

## Beyond Traditional Retirement Plans

While SEP-IRAs and Solo 401(k)s are excellent for most high earners, some situations call for even more sophisticated retirement strategies. For ultra-high earners, business owners with significant cash flow, or those in their peak earning years, defined benefit plans and other advanced strategies can provide six-figure annual tax deductions.

## Defined Benefit Plans: The Ultimate Tax Shelter

### What is a Defined Benefit Plan?

A defined benefit (DB) plan is a traditional pension plan that promises a specific monthly benefit at retirement. Unlike 401(k)s that define contributions, DB plans define the ultimate retirement benefit and work backwards to calculate required contributions.

### How Defined Benefit Plans Work
\`\`\`
Traditional Pension Formula:
Monthly benefit = Years of service × Benefit factor × Average salary

Example:
- 20 years of service
- 2% benefit factor  
- $200,000 average salary
- Monthly benefit: 20 × 2% × $200,000 ÷ 12 = $6,667/month
- Annual benefit: $80,000
\`\`\`

### Contribution Calculations

#### Actuarial Science in Action
DB plans use actuarial calculations considering:
- **Life expectancy**: How long you'll collect benefits
- **Investment returns**: Expected plan earnings
- **Inflation assumptions**: Future cost of living
- **Current age**: Years until retirement
- **Salary projections**: Future compensation levels

#### Annual Contribution Limits 2024
\`\`\`
Maximum Annual Benefit: $275,000
Maximum Contribution: Varies by age and years to retirement

Typical Contribution Examples:
Age 45: $150,000-200,000 annually
Age 50: $200,000-275,000 annually  
Age 55: $275,000-400,000+ annually
Age 60: $400,000-600,000+ annually
\`\`\`

### Real-World Example: Tech Consultant
\`\`\`
Profile:
- Age: 52
- Income: $800,000 annually
- Business: Solo consulting (no employees)
- Goal: Maximum tax deductions

DB Plan Analysis:
- Target retirement benefit: $275,000/year at age 65
- Required annual contribution: ~$425,000
- Current tax savings: $425,000 × 37% = $157,250
- 13-year contribution period = $5.5M in deductions
\`\`\`

## When Defined Benefit Plans Make Sense

### Ideal Candidate Profile
\`\`\`
Perfect DB Plan Candidate:
- Age 45-65 (closer to retirement = higher contributions)
- High, stable income ($500,000+ annually)
- Business owner with no employees (or highly compensated employees only)
- Strong cash flow and business profitability
- Desire for maximum tax deductions
- Comfortable with ongoing administration costs
- Planning to retire or sell business within 10-20 years
\`\`\`

### Cash Flow Requirements

#### Contribution Stability
DB plans require annual contributions regardless of business performance:
\`\`\`
Contribution Obligations:
- Cannot skip contributions without plan termination
- Must fund minimum required amounts
- Contributions may increase if investment returns lag
- Plan termination triggers immediate tax consequences
\`\`\`

#### Administrative Costs
\`\`\`
Annual DB Plan Costs:
- Actuarial services: $3,000-8,000
- Plan administration: $2,000-5,000
- Investment management: 0.5-1.5% of assets
- Legal/compliance: $1,000-3,000
- Total annual cost: $8,000-25,000+
\`\`\`

## Employee Considerations for DB Plans

### Owner-Only Plans
Most high earners use owner-only DB plans to avoid employee costs:
\`\`\`
Owner-Only Structure:
- Business owner only (plus spouse if applicable)
- Independent contractors don't count as employees
- Provides maximum flexibility and benefit concentration
\`\`\`

### Plans with Employees

#### Coverage Requirements
If you have employees, DB plans must cover all eligible employees:
\`\`\`
Employee Coverage Rules:
- Age 21+
- 1 year of service
- Same benefit formula for all participants
- Vesting schedule (3-7 years typical)
- Significant cost multiplication with employees
\`\`\`

#### New Comparability Plans
Advanced strategy for owners with employees:
\`\`\`
New Comparability Features:
- Different allocation groups
- Higher benefits for owners/key employees
- Complex nondiscrimination testing
- Requires professional design and administration
\`\`\`

## Combined Plan Strategies

### DB + 401(k) Combinations
Maximum retirement savings through plan combinations:

#### Example: Combined Strategy
\`\`\`
Age 50 Business Owner with $1,000,000 income:

Solo 401(k) contribution: $76,500
DB plan contribution: $350,000
Total retirement contribution: $426,500

Tax savings (37% bracket): $157,805
Percentage of income saved: 42.7%
\`\`\`

### Cash Balance Plans
Hybrid approach combining DB and DC features:

#### Cash Balance Plan Features
\`\`\`
Hybrid Characteristics:
- Individual account balances (like 401(k))
- Guaranteed return rate (like pension)
- Portable benefits
- Predictable contribution amounts
- Lower administrative burden than traditional DB
\`\`\`

#### Contribution Examples
\`\`\`
Cash Balance Contributions by Age:
Age 40: $75,000-125,000
Age 45: $100,000-175,000
Age 50: $150,000-225,000
Age 55: $200,000-300,000
Age 60: $275,000-400,000
\`\`\`

## Alternative Advanced Strategies

### 1. Non-Qualified Deferred Compensation

#### Structure and Benefits
\`\`\`
Deferred Compensation Features:
- Defer current income to future years
- No contribution limits (unlike qualified plans)
- Flexible distribution timing
- Unsecured creditor claims against business
- Substantial risk of forfeiture
\`\`\`

#### Tax Implications
\`\`\`
Timing Differences:
- No current deduction for contributions
- No current income inclusion for participant
- Deduction when paid to participant
- Ordinary income tax on distributions
\`\`\`

### 2. Split-Dollar Life Insurance

#### Concept and Structure
Split-dollar arrangements can provide both insurance and retirement benefits:
\`\`\`
Split-Dollar Features:
- Business pays premiums on life insurance
- Policy cash value builds tax-deferred
- Death benefit protects business/family
- Complex tax rules require careful structuring
\`\`\`

### 3. Captive Insurance Companies

#### Self-Insurance Strategy
For businesses with significant insurance needs:
\`\`\`
Captive Insurance Benefits:
- Form your own insurance company
- Tax-deductible premiums to captive
- Investment income grows in captive
- Potential Section 831(b) tax election
- Requires significant premium volume ($250,000+)
\`\`\`

## Implementation and Administration

### Setting Up a Defined Benefit Plan

#### Step 1: Feasibility Analysis
\`\`\`
Initial Assessment:
- Income stability analysis
- Cash flow projections
- Employee impact study
- Cost-benefit analysis
- Alternative strategy comparison
\`\`\`

#### Step 2: Professional Team Assembly
\`\`\`
Required Professionals:
- Enrolled actuary (plan design and valuations)
- Third-party administrator (TPA)
- Investment advisor (asset management)
- Tax advisor (tax planning integration)
- Attorney (plan documents and compliance)
\`\`\`

#### Step 3: Plan Design Decisions
\`\`\`
Key Design Elements:
- Benefit formula structure
- Vesting schedule
- Normal retirement age
- Early retirement provisions
- Distribution options
- Investment policy
\`\`\`

### Ongoing Administration Requirements

#### Annual Obligations
\`\`\`
Required Annual Tasks:
- Actuarial valuation
- Form 5500 filing
- Summary annual report to participants
- Minimum contribution calculation
- Investment performance monitoring
- Compliance testing
\`\`\`

#### Regulatory Compliance
\`\`\`
Key Compliance Areas:
- ERISA fiduciary responsibilities
- Department of Labor oversight
- IRS qualification requirements
- Pension Benefit Guaranty Corporation (PBGC) premiums
- Annual reporting and disclosure requirements
\`\`\`

## Risk Management and Exit Strategies

### Plan Termination
Understanding how to exit a DB plan:

#### Voluntary Termination
\`\`\`
Termination Process:
- Actuarial certification of sufficient assets
- Distribution of all plan assets to participants
- Potential tax acceleration for business
- PBGC approval may be required
- Final Form 5500 filing
\`\`\`

#### Involuntary Termination
\`\`\`
Triggering Events:
- Business cessation or sale
- Inability to make required contributions
- Loss of qualified plan status
- IRS or DOL enforcement action
\`\`\`

### Investment Risk Management
\`\`\`
Investment Considerations:
- Conservative allocation to meet guaranteed returns
- Liability-driven investment strategies
- Regular rebalancing to match plan duration
- Professional investment management recommended
\`\`\`

## Tax Planning Integration

### Current vs Future Tax Rates
\`\`\`
Tax Arbitrage Opportunities:
- High current tax rates justify large deductions
- Potential lower rates in retirement
- Tax rate uncertainty requires scenario planning
- Roth conversion opportunities in lower-income years
\`\`\`

### Estate Planning Benefits
\`\`\`
Wealth Transfer Advantages:
- Removes assets from taxable estate
- Provides survivor benefits to spouse
- Potential charitable remainder trust integration
- Generation-skipping trust opportunities
\`\`\`

## Economic Analysis: Is It Worth It?

### Cost-Benefit Analysis
\`\`\`
10-Year DB Plan Analysis ($500,000 annual contribution):

Costs:
- Administrative costs: $200,000 (10 years × $20,000)
- Lost investment flexibility: ~$100,000
- Total costs: $300,000

Benefits:
- Tax savings: $1,850,000 ($500K × 37% × 10 years)
- Investment growth: Tax-deferred accumulation
- Net benefit: $1,550,000+
\`\`\`

### Break-Even Analysis
\`\`\`
Minimum Requirements for DB Plan Success:
- Income must support $150,000+ annual contributions
- Commitment to 5-10 year contribution period
- Tax bracket of 32%+ to justify administrative costs
- Stable business cash flow
\`\`\`

## Common Mistakes and Pitfalls

### 1. Insufficient Cash Flow Planning
\`\`\`
Cash Flow Mistakes:
- Overestimating future income stability
- Underestimating contribution requirements
- Not planning for economic downturns
- Inadequate emergency fund maintenance
\`\`\`

### 2. Poor Professional Selection
\`\`\`
Professional Team Mistakes:
- Choosing lowest-cost providers over quality
- Not verifying actuarial credentials
- Inadequate investment oversight
- Poor communication between advisors
\`\`\`

### 3. Premature Plan Termination
\`\`\`
Termination Costs:
- Accelerated tax liabilities
- Lost future tax benefits
- Administrative termination costs
- Potential PBGC premiums and penalties
\`\`\`

## Conclusion

Defined benefit plans and advanced retirement strategies represent the pinnacle of tax-advantaged retirement planning for high earners. While complex and requiring significant commitment, they can provide unmatched tax deductions and wealth accumulation opportunities.

The key to success lies in careful planning, professional guidance, and realistic assessment of your business's ability to make long-term commitments. For the right candidate, these strategies can save hundreds of thousands in taxes while building substantial retirement wealth.

## Key Takeaways

1. **DB plans can provide $275,000+ annual tax deductions**
2. **Best suited for high earners aged 45+ with stable income**
3. **Require long-term commitment and ongoing administrative costs**
4. **Professional guidance is essential for success**
5. **Can be combined with other plans for maximum benefit**

Next week, we'll explore capital gains optimization and tax-loss harvesting strategies to minimize investment taxes and maximize after-tax returns.`,
        orderIndex: 2,
        estimatedMinutes: 65
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
          durationMinutes: lessonData.estimatedMinutes,
          lessonType: 'lecture'
        }
      });
    }

    // Create Week 1 Quiz
    const week1Quiz = await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'Advanced Retirement Strategies Quiz',
        description: 'Test your understanding of SEP-IRAs, Solo 401(k)s, and defined benefit plans',
        timeLimitMinutes: 30,
        passingScore: 70,
        maxAttempts: 3
      }
    });

    const week1Questions = [
      {
        questionText: "What is the maximum Solo 401(k) contribution for someone under 50 in 2024?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "$23,000",
          "$69,000", 
          "$76,500",
          "$275,000"
        ]),
        correctAnswer: "$69,000",
        explanation: "The Solo 401(k) allows both employee deferrals ($23,000) and employer contributions up to 25% of compensation, with a total limit of $69,000 for those under 50.",
        orderIndex: 1,
        points: 1
      },
      {
        questionText: "Which retirement plan requires the same contribution percentage for all eligible employees?",
        questionType: "multiple_choice", 
        options: JSON.stringify([
          "Solo 401(k)",
          "SEP-IRA",
          "Defined Benefit Plan",
          "Traditional IRA"
        ]),
        correctAnswer: "SEP-IRA",
        explanation: "SEP-IRAs require the same contribution percentage for all eligible employees, which can be expensive for businesses with many employees.",
        orderIndex: 2,
        points: 1
      },
      {
        questionText: "At what age do defined benefit plans typically provide the highest contribution limits?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Age 35-40",
          "Age 40-45", 
          "Age 50-55",
          "Age 60-65"
        ]),
        correctAnswer: "Age 60-65",
        explanation: "Defined benefit plans provide higher contribution limits for older participants because there are fewer years until retirement to fund the promised benefit.",
        orderIndex: 3,
        points: 1
      },
      {
        questionText: "Which is NOT an advantage of a Solo 401(k) over a SEP-IRA?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Higher contribution limits",
          "Loan provisions",
          "Roth contribution options",
          "Simpler administration"
        ]),
        correctAnswer: "Simpler administration",
        explanation: "SEP-IRAs have simpler administration than Solo 401(k)s. Solo 401(k)s require plan documents and may require Form 5500-SF filings.",
        orderIndex: 4,
        points: 1
      },
      {
        questionText: "What is the primary risk of defined benefit plans for business owners?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Low contribution limits",
          "No tax benefits",
          "Required annual contributions regardless of cash flow", 
          "Cannot include employees"
        ]),
        correctAnswer: "Required annual contributions regardless of cash flow",
        explanation: "Defined benefit plans require mandatory annual contributions to fund the promised benefits, regardless of business cash flow or profitability.",
        orderIndex: 5,
        points: 1
      }
    ];

    // Create quiz questions
    for (const questionData of week1Questions) {
      await prisma.question.create({
        data: {
          quizId: week1Quiz.id,
          questionText: questionData.questionText,
          questionType: questionData.questionType,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
          explanation: questionData.explanation,
          orderIndex: questionData.orderIndex,
          points: questionData.points
        }
      });
    }

    console.log('✅ Week 1 created with lessons and quiz');

    // Week 2: Capital Gains Optimization and Tax-Loss Harvesting
    const week2 = await prisma.week.create({
      data: {
        courseId: course9.id,
        weekNumber: 2,
        title: 'Capital Gains Optimization and Tax-Loss Harvesting',
        overview: 'Master sophisticated investment tax strategies including capital gains timing, tax-loss harvesting, and portfolio optimization techniques to minimize investment taxes.',
        learningObjectives: JSON.stringify([
          'Understand capital gains tax rules and rates for different holding periods',
          'Implement tax-loss harvesting strategies to offset gains',
          'Navigate wash sale rules and avoid common pitfalls', 
          'Optimize asset location across taxable and tax-advantaged accounts',
          'Plan charitable giving strategies with appreciated securities'
        ]),
        estimatedHours: 8
      }
    });

    const week2lessons = [
      {
        title: 'Capital Gains Tax Strategy and Timing Optimization',
        slug: 'capital-gains-tax-strategy-timing-optimization',
        content: `# Capital Gains Tax Strategy and Timing Optimization

## Understanding Capital Gains Taxation

For high-earning developers and entrepreneurs, investment income often represents a significant portion of total wealth accumulation. Understanding and optimizing capital gains taxation can save tens of thousands annually and dramatically impact long-term wealth building.

## Capital Gains Tax Fundamentals

### Short-Term vs Long-Term Capital Gains

#### Short-Term Capital Gains (Held ≤ 1 Year)
\`\`\`
Tax Treatment: Ordinary Income Rates
2024 Tax Brackets:
- 37%: $609,350+ (single) / $731,200+ (married)
- 35%: $243,725-$609,349 / $487,450-$731,199  
- 32%: $191,950-$243,724 / $383,900-$487,449
- 24%: $100,525-$191,949 / $201,050-$383,899

Example: $50,000 short-term gain at 32% bracket = $16,000 tax
\`\`\`

#### Long-Term Capital Gains (Held > 1 Year)
\`\`\`
Preferential Tax Rates:
0%: Up to $47,025 (single) / $94,050 (married)
15%: $47,026-$518,900 / $94,051-$583,750
20%: Over $518,900 / $583,750

Example: $50,000 long-term gain at 15% rate = $7,500 tax
Tax savings vs short-term: $8,500 (53% reduction)
\`\`\`

#### Net Investment Income Tax (NIIT)
Additional 3.8% tax on investment income for high earners:
\`\`\`
NIIT Thresholds:
- Single: Modified AGI > $200,000
- Married filing jointly: Modified AGI > $250,000
- Applies to: Capital gains, dividends, interest, rental income

Total long-term capital gains rate for high earners: 23.8% (20% + 3.8%)
\`\`\`

### State Capital Gains Taxes

#### No State Capital Gains Tax
\`\`\`
Tax-Friendly States:
- Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming
- Effective total rate: 20% (federal) + 3.8% (NIIT) = 23.8%
\`\`\`

#### High State Capital Gains Tax
\`\`\`
High-Tax States (Top Rates):
- California: 13.3% (+ 1% on $1M+)
- New York: 8.82%
- New Jersey: 8.97%
- Oregon: 9.9%

Total effective rate in California: 37.1% (20% + 3.8% + 13.3%)
Tax difference vs no-tax state: 13.3% on gains
\`\`\`

## Strategic Capital Gains Planning

### 1. Timing Gains and Losses

#### Tax-Loss Harvesting Strategy
\`\`\`
Basic Strategy:
- Realize losses to offset gains
- $3,000 annual excess loss deduction against ordinary income
- Unlimited loss carryforward to future years
- Maintain similar market exposure through substitutes
\`\`\`

#### Example: Tech Stock Portfolio Rebalancing
\`\`\`
Scenario: End of Year 2024
Gains to realize:
- Apple stock: $40,000 gain
- Microsoft stock: $30,000 gain
- Total gains: $70,000

Losses available:
- Meta stock: $25,000 loss
- Netflix stock: $15,000 loss  
- Tesla stock: $35,000 loss
- Total losses: $75,000

Net result: $5,000 loss to carry forward
Tax saved: $70,000 × 23.8% = $16,660
\`\`\`

### 2. Multi-Year Capital Gains Management

#### Income Smoothing Strategy
\`\`\`
High-Income Year Management:
- Defer gains to lower-income years
- Accelerate losses in high-income years
- Consider retirement year opportunities
- Plan around AMT thresholds
\`\`\`

#### Example: Startup Exit Planning
\`\`\`
Scenario: $2M startup sale over 2 years

Poor timing (all in one year):
- Year 1: $2,000,000 gain
- Federal tax: $2M × 23.8% = $476,000
- State tax (CA): $2M × 13.3% = $266,000
- Total tax: $742,000

Better timing (split over 2 years):
- Year 1: $1,000,000 gain
- Year 2: $1,000,000 gain
- May reduce total tax through bracket management
- Allows tax-loss harvesting in each year
\`\`\`

### 3. Charitable Giving with Appreciated Securities

#### Donor-Advised Funds Strategy
\`\`\`
Charitable Giving Benefits:
- Avoid capital gains tax on donated securities
- Receive full fair market value deduction
- Time charitable deduction for maximum tax benefit
- Maintain investment control through fund recommendations
\`\`\`

#### Example: Charitable Stock Donation
\`\`\`
Appreciated stock donation:
- Original cost: $25,000
- Current value: $100,000
- Capital gain avoided: $75,000
- Tax on gain saved: $75,000 × 23.8% = $17,850
- Charitable deduction: $100,000
- Tax benefit from deduction: $100,000 × 37% = $37,000
- Total tax benefit: $54,850
\`\`\`

## Advanced Capital Gains Strategies

### 1. Opportunity Zone Investments

#### Opportunity Zone Benefits
\`\`\`
Three-Tier Tax Benefits:
1. Defer gains invested in QOF until 2026
2. 10% basis step-up if held 5+ years (eliminated due to timing)
3. Eliminate gains on QOF investment if held 10+ years

Example: $500,000 gain invested in QOF in 2024:
- Original gain deferred until 2026
- QOF investment grows to $1,000,000 over 10 years
- $500,000 appreciation permanently tax-free
\`\`\`

### 2. Section 1202 Qualified Small Business Stock

#### QSBS Exclusion Rules
\`\`\`
Exclusion Benefits:
- Up to $10 million or 10x basis exclusion (whichever greater)
- Must hold stock 5+ years
- Original issue stock from qualified C-Corporation
- Business must meet active business test

Tax savings on $10M exclusion: $2.38M+ (federal + state)
\`\`\`

### 3. Installment Sale Elections

#### Deferring Gain Recognition
\`\`\`
Installment Sale Benefits:
- Spread gain recognition over payment period
- Lower effective tax rates through bracket management
- Cash flow benefits from deferred tax payments
- Flexibility in payment timing

Example: $1M business sale over 5 years:
- Annual payments: $200,000
- Annual gain recognition: $200,000 (if no basis)
- Keeps taxpayer in lower brackets
- Defers tax payments
\`\`\`

### 4. Like-Kind Exchanges (Section 1031)

#### Real Estate Investment Strategy
\`\`\`
1031 Exchange Benefits:
- Defer gains on investment real estate
- Build wealth through tax-free exchanges
- Estate planning benefits (stepped-up basis at death)
- Portfolio diversification opportunities

Requirements:
- Like-kind property (investment/business use)
- 45-day identification period
- 180-day exchange completion
- Qualified intermediary required
\`\`\`

## Tax-Loss Harvesting Implementation

### 1. Wash Sale Rule Navigation

#### Understanding Wash Sale Restrictions
\`\`\`
Wash Sale Rule (Section 1091):
- Cannot deduct loss if repurchase within 30 days
- Applies to "substantially identical" securities
- Includes options and related party transactions
- Loss deferred (added to basis of replacement security)
\`\`\`

#### Avoiding Wash Sale Violations
\`\`\`
Safe Harbor Strategies:
- Wait 31+ days before repurchasing
- Buy different but similar securities
- Purchase securities in different account types
- Use index funds vs individual stocks

Example Substitutes:
- Sell VTI (Total Stock Market) → Buy SPTM (similar but different index)
- Sell AAPL → Buy QQQ or technology sector ETF
- Sell individual bonds → Buy bond mutual funds
\`\`\`

### 2. Systematic Harvesting Approach

#### Quarterly Harvesting Reviews
\`\`\`
Systematic Process:
- Q1: Review positions, plan year-end strategy
- Q2: Mid-year assessment, adjust for half-year results
- Q3: Prepare for year-end harvesting
- Q4: Execute final harvesting before December 31

Technology Tools:
- Portfolio management software
- Automated harvesting services
- Tax reporting integration
- Performance tracking systems
\`\`\`

#### Direct Indexing Strategy
\`\`\`
Direct Indexing Benefits:
- Own individual stocks instead of funds
- Harvest losses on individual holdings
- Customize portfolio (exclude certain stocks)
- Maintain index-like performance
- Requires significant portfolio size ($100K+ per index)
\`\`\`

## Asset Location Optimization

### 1. Tax-Efficient Account Placement

#### Asset Location Hierarchy
\`\`\`
Taxable Accounts (Best for):
- Tax-efficient index funds
- Individual stocks (for harvesting)
- Municipal bonds
- Qualified dividend-paying stocks

Tax-Deferred Accounts (Best for):
- Bonds and bond funds
- REITs
- High-turnover strategies
- High dividend-yield stocks

Roth Accounts (Best for):
- Highest expected return assets
- Growth stocks
- Alternative investments
- Assets to pass to heirs
\`\`\`

### 2. Multi-Account Rebalancing

#### Tax-Aware Rebalancing
\`\`\`
Rebalancing Strategies:
- Use new contributions for rebalancing
- Sell overweighted positions in tax-advantaged accounts
- Harvest losses while rebalancing in taxable accounts
- Consider tax cost vs. rebalancing benefit
\`\`\`

## State Tax Planning Strategies

### 1. Residency Planning

#### State Income Tax Arbitrage
\`\`\`
Residency Change Benefits:
- Move to no-tax state before realizing large gains
- Establish domicile in tax-friendly state
- Consider state exit taxes (California has none)
- Plan timing of residency change vs. asset sales
\`\`\`

#### Example: California to Nevada Move
\`\`\`
$1M capital gains realization:
California resident: $133,000 state tax (13.3%)
Nevada resident: $0 state tax
Tax savings: $133,000

Requirements for Nevada residency:
- Physical presence 183+ days
- Change voter registration
- Obtain Nevada driver's license  
- Change bank accounts and professional licenses
\`\`\`

### 2. Trust Strategies for Multi-State Issues

#### Nevada Dynasty Trusts
\`\`\`
Trust Benefits:
- No state income tax on trust income
- Perpetual trust duration allowed
- Strong asset protection laws
- Favorable trust taxation rules
\`\`\`

## Technology and Tracking Tools

### 1. Portfolio Management Software
\`\`\`
Recommended Tools:
- Betterment (automated tax-loss harvesting)
- Wealthfront (direct indexing options)
- Interactive Brokers (sophisticated tools)
- Fidelity/Vanguard (integrated tax tools)
- Personal Capital (portfolio tracking)
\`\`\`

### 2. Tax Tracking and Reporting
\`\`\`
Tax Software Integration:
- Automatic cost basis tracking
- Realized gain/loss reporting
- Wash sale adjustments
- Tax-efficient fund recommendations
- Year-end tax planning reports
\`\`\`

## Common Mistakes and Pitfalls

### 1. Emotional Decision Making
\`\`\`
Behavioral Mistakes:
- Holding losing positions too long (loss aversion)
- Selling winners too early (prospect theory)
- Ignoring tax consequences in portfolio decisions
- Not systematically reviewing and harvesting losses
\`\`\`

### 2. Technical Violations
\`\`\`
Common Errors:
- Wash sale rule violations
- Incorrect cost basis calculations
- Missing AMT implications
- Not coordinating across account types
- Poor record keeping for complex transactions
\`\`\`

### 3. Over-Optimization
\`\`\`
Balance Considerations:
- Don't let tax tail wag the investment dog
- Maintain appropriate portfolio diversification
- Consider transaction costs vs. tax benefits
- Plan for long-term investment success, not just tax minimization
\`\`\`

## Year-End Tax Planning Checklist

### November Planning
\`\`\`
Pre-December Actions:
- Review year-to-date gains and losses
- Identify harvesting opportunities
- Plan Roth conversion amounts
- Assess state residency implications
- Coordinate with other income events
\`\`\`

### December Execution
\`\`\`
Final Month Tasks:
- Execute tax-loss harvesting trades
- Realize strategic gains if in low-tax year
- Make charitable contributions of appreciated securities
- Complete any planned Roth conversions
- Ensure settlement dates fall in correct tax year
\`\`\`

## Integration with Other Tax Strategies

### 1. Retirement Plan Coordination
\`\`\`
Withdrawal Strategy:
- Coordinate taxable account withdrawals with retirement distributions
- Use tax-loss harvesting to offset required minimum distributions
- Plan Roth conversion timing around capital gains
- Consider charitable qualified distributions
\`\`\`

### 2. Business Income Timing
\`\`\`
Income Coordination:
- Time business income with capital gains realization
- Use capital losses to offset business income
- Plan equipment purchases around gain realization
- Coordinate stock option exercises with investment gains
\`\`\`

## Conclusion

Capital gains optimization and tax-loss harvesting represent some of the most powerful tax strategies available to high-earning investors. Through careful timing, systematic harvesting, and strategic planning, you can significantly reduce your investment tax burden while maintaining appropriate portfolio risk and return characteristics.

The key to success lies in developing systematic processes, using appropriate technology tools, and integrating capital gains planning with your overall tax strategy. While complex, these strategies can save hundreds of thousands in taxes over a career while building substantial long-term wealth.

## Key Takeaways

1. **Long-term capital gains rates are significantly lower than ordinary income rates**
2. **Tax-loss harvesting can save thousands annually through systematic implementation**
3. **Asset location optimization maximizes after-tax returns across account types**
4. **State tax planning can provide enormous tax savings for large capital gains**
5. **Technology tools are essential for effective implementation and tracking**

Next week, we'll explore estate planning basics for tech wealth, including strategies for passing wealth to heirs while minimizing estate and gift taxes.`,
        orderIndex: 1,
        estimatedMinutes: 60
      },
      {
        title: 'Advanced Tax-Loss Harvesting and Portfolio Optimization',
        slug: 'advanced-tax-loss-harvesting-portfolio-optimization',
        content: `# Advanced Tax-Loss Harvesting and Portfolio Optimization

## Beyond Basic Tax-Loss Harvesting

While basic tax-loss harvesting involves selling losing positions to offset gains, advanced strategies involve sophisticated techniques to maximize tax benefits while maintaining desired portfolio exposure and risk characteristics. For high earners with substantial investment portfolios, these advanced techniques can add significant value.

## Direct Indexing: The Ultimate Harvesting Strategy

### What is Direct Indexing?

Direct indexing involves owning individual stocks that comprise an index rather than owning an index fund. This approach allows for tax-loss harvesting at the individual stock level while maintaining index-like performance.

### Direct Indexing Benefits
\`\`\`
Advantages over Index Funds:
- Individual stock tax-loss harvesting
- Customization (ESG, exclude sectors)
- No embedded capital gains from fund trading
- Lower fees than actively managed funds
- Maintains index-like diversification

Minimum Portfolio Size:
- S&P 500: $100,000-250,000
- Total Stock Market: $500,000+
- International indices: $250,000+
\`\`\`

### Implementation Example
\`\`\`
Direct Indexing of S&P 500:
Portfolio size: $500,000
Individual positions: ~500 stocks
Average position size: ~$1,000
Harvesting opportunities: 50-150 stocks annually
Estimated tax alpha: 0.5-1.5% annually
\`\`\`

## Multi-Asset Tax-Loss Harvesting

### Coordinated Harvesting Across Asset Classes

#### Bond Portfolio Harvesting
\`\`\`
Bond Harvesting Strategies:
- Individual bonds vs. bond funds
- Ladder replacement with similar duration
- Credit quality substitution
- Sector rotation (Treasury → Corporate)
- International bond exposure adjustments
\`\`\`

#### Real Estate Investment Trust (REIT) Harvesting
\`\`\`
REIT Harvesting Techniques:
- Individual REIT selection
- Sector substitution (residential → commercial)
- Geographic diversification (domestic → international)
- Public vs. private REIT allocation
\`\`\`

#### Alternative Investment Harvesting
\`\`\`
Alternative Asset Strategies:
- Commodity ETF swapping
- Currency exposure adjustments
- Private investment loss recognition timing
- Master Limited Partnership (MLP) strategies
\`\`\`

## Wash Sale Rule: Advanced Navigation

### Complex Wash Sale Scenarios

#### Cross-Account Wash Sales
\`\`\`
Potential Violations:
- Sell in taxable account, buy in IRA (30 days)
- Spouse purchases same security
- Business account transactions
- Options and derivatives overlapping positions

Safe Harbor Practices:
- Coordinate all accounts and family members
- Use substantially different securities
- Maintain detailed transaction logs
- Consider professional portfolio coordination
\`\`\`

#### Substantially Identical Securities
\`\`\`
IRS Interpretation Guidance:
Similar but NOT Identical:
- VTI (Total Stock Market) vs. SPTM (SPDR Total Stock Market)
- SPY vs. IVV (different S&P 500 ETFs)
- Apple Inc. vs. Apple preferred stock
- Different share classes of same company

Likely Identical (Risky):
- Apple common stock vs. Apple common stock
- Same ETF from different providers (if tracking identical index)
- Call options vs. stock ownership (sometimes)
\`\`\`

### Advanced Wash Sale Avoidance

#### Timing Strategies
\`\`\`
Strategic Timing Approaches:
- 31-day rule compliance
- December loss realization, February repurchase
- Queue system for loss realization
- Calendar management for multiple positions
\`\`\`

#### Substitute Security Selection
\`\`\`
Effective Substitutes by Category:
Large-Cap Growth:
- Sell: VUG → Buy: IWF or SPYG
- Sell: AAPL → Buy: QQQ or XLK

Large-Cap Value:
- Sell: VTV → Buy: IWD or SPYV
- Sell: BRK.B → Buy: VTV or financial sector ETF

International Developed:
- Sell: VEA → Buy: IEFA or SCHF
- Sell: VXUS → Buy: FTIHX or similar total international
\`\`\`

## Tax-Efficient Portfolio Construction

### Asset Location Optimization 2.0

#### Advanced Asset Placement
\`\`\`
Sophisticated Location Strategy:
Taxable Accounts:
- Tax-managed index funds
- Individual stocks (for harvesting)
- Municipal bonds (if beneficial)
- Foreign tax credit eligible international funds

Tax-Deferred (401k/IRA):
- Taxable bonds
- High dividend REITs
- Commodity investments
- High-turnover strategies

Roth IRA:
- Highest expected return investments
- Alternative investments
- Small-cap growth stocks
- Emerging market exposure
\`\`\`

#### Factor-Based Asset Location
\`\`\`
Factor Investing Placement:
Taxable Accounts (Tax-Efficient Factors):
- Quality factor (low turnover)
- Low volatility (low turnover)
- Dividend growth (qualified dividends)

Tax-Advantaged Accounts (Tax-Inefficient Factors):
- Momentum (high turnover)
- Mean reversion (high turnover)
- Small-cap value (high turnover)
\`\`\`

## Multi-Account Rebalancing Strategies

### Tax-Aware Rebalancing Techniques

#### Cash Flow Rebalancing
\`\`\`
Primary Rebalancing Method:
- Use new contributions for rebalancing
- Direct dividends to underweight assets
- Use withdrawals from overweight positions
- Minimize taxable transactions
\`\`\`

#### Threshold-Based Rebalancing
\`\`\`
Advanced Threshold System:
Taxable Account Thresholds:
- 7-10% deviation before rebalancing
- Consider tax consequences in threshold

Tax-Advantaged Account Thresholds:
- 3-5% deviation triggers
- More frequent rebalancing acceptable
\`\`\`

### Cross-Account Rebalancing
\`\`\`
Coordinated Account Management:
Example: Target 60% stocks, 40% bonds across $1M portfolio

Current Allocation:
Taxable ($400K): 80% stocks, 20% bonds
401(k) ($600K): 47% stocks, 53% bonds
Total: 60% stocks, 40% bonds (on target)

Rebalancing Action:
- Sell bonds in taxable account (harvest any losses)
- Buy stocks in taxable account
- Sell stocks in 401(k)
- Buy bonds in 401(k)
- Maintain overall target without triggering taxes
\`\`\`

## Charitable Giving Integration

### Advanced Charitable Strategies

#### Charitable Remainder Trusts (CRTs)
\`\`\`
CRT Benefits for Large Gains:
- Defer capital gains tax indefinitely
- Receive income stream for life
- Charitable deduction in year of contribution
- Remove assets from taxable estate

Example: $1M appreciated stock to CRT
- Immediate charitable deduction: ~$400,000
- Tax savings: $400,000 × 37% = $148,000
- Avoid capital gains tax: $200,000 × 23.8% = $47,600
- Total immediate tax benefit: $195,600
\`\`\`

#### Charitable Lead Trusts (CLTs)
\`\`\`
CLT Benefits for Estate Planning:
- Transfer future appreciation to heirs
- Reduce gift/estate tax costs
- Maintain some income during term
- Particularly effective with high-growth assets
\`\`\`

#### Donor-Advised Funds (DAF) Strategies
\`\`\`
Advanced DAF Techniques:
- Contribute appreciated securities annually
- Time contributions for maximum tax benefit
- Bunch charitable deductions in high-income years
- Use DAF for tax-loss harvesting coordination

Multi-Year Giving Strategy:
Year 1: Contribute $50,000 to DAF (high-income year)
Years 2-5: Grant $10,000 annually from DAF (manage AGI)
\`\`\`

## Options Strategies for Tax Management

### Covered Call Writing

#### Tax-Efficient Income Generation
\`\`\`
Covered Call Benefits:
- Generate income on existing positions
- Potentially reduce portfolio volatility
- Tax treatment as short-term capital gains
- Can be used to manage position sizes

Example: Covered Call on Apple Stock
Own: 1,000 shares AAPL at $150 cost basis
Current price: $200
Write: 10 covered calls at $210 strike, $3 premium
Income: $3,000 (taxed as short-term gains)
Outcome scenarios and tax implications
\`\`\`

### Protective Puts

#### Downside Protection with Tax Benefits
\`\`\`
Protective Put Strategy:
- Protect gains without triggering realization
- Extend holding period for long-term treatment
- Cost of protection vs. tax benefits
- Impact on qualified dividend treatment
\`\`\`

## International Tax Considerations

### Foreign Tax Credit Optimization

#### Maximizing Foreign Tax Credits
\`\`\`
Foreign Tax Credit Strategy:
- Hold international funds in taxable accounts
- Claim foreign tax credit on Form 1116
- Optimize between credit and deduction
- Consider state tax implications

Example: International fund with foreign taxes
Fund return: 8%
Foreign taxes paid: 1%
Net return: 7%
Foreign tax credit: Recover ~1% through credits
Effective tax-adjusted return improvement
\`\`\`

### Currency Hedging Decisions
\`\`\`
Currency Hedge Tax Implications:
Unhedged International Exposure:
- Currency gains/losses as capital gains
- Potential for tax-loss harvesting on currency

Hedged International Exposure:
- More predictable returns
- Fewer currency-related tax events
- Focus harvesting on security selection
\`\`\`

## Technology and Implementation Tools

### Portfolio Management Platforms

#### Robo-Advisor Tax Features
\`\`\`
Advanced Tax Features to Evaluate:
- Direct indexing capabilities
- Multi-account coordination
- Wash sale tracking across accounts
- Tax-efficient rebalancing algorithms
- Loss harvesting sophistication
- Integration with tax software
\`\`\`

#### Professional Portfolio Management Software
\`\`\`
High-End Platforms:
- Orion Portfolio Solutions
- Black Diamond
- Tamarac
- eMoney Portfolio Management
- Morningstar Office

Features for Tax Optimization:
- Multi-custodian account aggregation
- Sophisticated rebalancing algorithms
- Tax-loss harvesting automation
- Wash sale detection and prevention
- Performance attribution after taxes
\`\`\`

### Tax Reporting and Tracking Tools

#### Advanced Tax Software Integration
\`\`\`
Professional Tax Software:
- ProConnect (Intuit)
- Lacerte
- ATX (Wolters Kluwer)
- UltraTax CS (Thomson Reuters)

Integration Benefits:
- Automatic import of investment data
- Wash sale adjustments
- Foreign tax credit calculations
- Capital loss carryforward tracking
\`\`\`

## Performance Measurement and Attribution

### After-Tax Performance Analysis

#### Tax-Adjusted Return Calculations
\`\`\`
Performance Metrics:
- Pre-tax returns
- After-tax returns (distributions)
- After-tax returns (distributions + capital gains)
- Tax alpha from harvesting
- Tax drag analysis by asset class
\`\`\`

#### Benchmark Comparisons
\`\`\`
Tax-Aware Benchmarking:
- Compare after-tax returns to appropriate benchmarks
- Measure tax alpha generation over time
- Track harvesting effectiveness
- Monitor wash sale compliance
- Evaluate asset location decisions
\`\`\`

## Risk Management in Tax-Loss Harvesting

### Tracking Error Management

#### Maintaining Index Exposure
\`\`\`
Risk Control Techniques:
- Maximum position size limits
- Sector exposure constraints
- Factor exposure monitoring
- Correlation analysis of substitutes
- Regular rebalancing to index weights
\`\`\`

#### Temporary Exposure Gaps
\`\`\`
Managing Wash Sale Periods:
- Use derivatives for temporary exposure
- Employ similar but different securities
- Accept minor tracking error for tax benefits
- Monitor and limit exposure deviations
\`\`\`

### Liquidity Considerations
\`\`\`
Liquidity Planning:
- Maintain adequate cash reserves
- Consider market impact of large trades
- Plan harvesting around market volatility
- Coordinate with other portfolio needs
\`\`\`

## Advanced Strategies for Ultra-High Net Worth

### Family Office Strategies

#### Multi-Generational Planning
\`\`\`
Family-Level Optimization:
- Coordinate harvesting across family members
- Generation-skipping trust strategies
- Grantor trust income tax benefits
- Family limited partnership structures
\`\`\`

#### Private Investment Integration
\`\`\`
Alternative Investment Coordination:
- Private equity distribution timing
- Hedge fund loss recognition
- Real estate investment harvesting
- Collectibles and art considerations
\`\`\`

### Institutional-Quality Strategies
\`\`\`
Sophisticated Techniques:
- Custom index creation
- Factor-based direct indexing
- Options overlay strategies
- Tax-managed separate accounts
- Multi-manager platform coordination
\`\`\`

## Common Advanced Pitfalls

### Over-Optimization Risks
\`\`\`
Potential Problems:
- Excessive trading costs
- Increased tracking error
- Complex record keeping
- Audit risk from aggressive strategies
- Missing forest for trees (losing sight of investment goals)
\`\`\`

### Technology Dependency Risks
\`\`\`
System Risk Management:
- Backup systems for critical data
- Manual oversight of automated systems
- Regular reconciliation and verification
- Understanding underlying algorithms
- Professional review of automated decisions
\`\`\`

## Implementation Roadmap

### Phase 1: Foundation (Months 1-3)
\`\`\`
Initial Setup:
- Establish tax-efficient portfolio structure
- Implement basic tax-loss harvesting
- Set up appropriate account types
- Begin asset location optimization
\`\`\`

### Phase 2: Sophistication (Months 4-12)
\`\`\`
Advanced Implementation:
- Consider direct indexing
- Implement multi-asset harvesting
- Coordinate across multiple accounts
- Integrate charitable giving strategies
\`\`\`

### Phase 3: Optimization (Year 2+)
\`\`\`
Ongoing Refinement:
- Fine-tune strategies based on results
- Adapt to changing tax laws
- Expand to alternative investments
- Implement family-level coordination
\`\`\`

## Conclusion

Advanced tax-loss harvesting and portfolio optimization represent the cutting edge of tax-efficient investing for high earners. While significantly more complex than basic strategies, the potential tax savings and wealth preservation benefits can be substantial over long time periods.

Success requires sophisticated technology, careful planning, ongoing monitoring, and often professional guidance. The key is finding the right balance between tax optimization and investment simplicity, ensuring that tax considerations enhance rather than dominate your investment strategy.

## Key Takeaways

1. **Direct indexing enables individual stock tax-loss harvesting while maintaining diversification**
2. **Multi-account coordination maximizes tax efficiency across all portfolio assets**
3. **Advanced wash sale navigation requires careful planning and professional tools**
4. **Integration with charitable giving strategies can amplify tax benefits**
5. **Technology platforms are essential for managing complexity at scale**

Next week, we'll explore estate planning basics for tech wealth, focusing on strategies to transfer wealth to heirs while minimizing estate and gift taxes.`,
        orderIndex: 2,
        estimatedMinutes: 70
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
          durationMinutes: lessonData.estimatedMinutes,
          lessonType: 'lecture'
        }
      });
    }

    // Create Week 2 Quiz
    const week2Quiz = await prisma.quiz.create({
      data: {
        weekId: week2.id,
        title: 'Capital Gains and Tax-Loss Harvesting Quiz',
        description: 'Test your understanding of capital gains optimization and tax-loss harvesting strategies',
        timeLimitMinutes: 30,
        passingScore: 70,
        maxAttempts: 3
      }
    });

    const week2Questions = [
      {
        questionText: "What is the maximum long-term capital gains tax rate for high earners in 2024 (including NIIT)?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "20%",
          "23.8%", 
          "28%",
          "37%"
        ]),
        correctAnswer: "23.8%",
        explanation: "The maximum long-term capital gains rate is 20% plus the 3.8% Net Investment Income Tax (NIIT) for high earners, totaling 23.8%.",
        orderIndex: 1,
        points: 1
      },
      {
        questionText: "Which of the following would likely violate the wash sale rule?",
        questionType: "multiple_choice", 
        options: JSON.stringify([
          "Selling Apple stock and buying Microsoft stock the next day",
          "Selling VTI and buying SPTM (different total market funds) the next day",
          "Selling Apple stock and buying Apple stock 25 days later",
          "Selling Apple stock and buying QQQ technology ETF the next day"
        ]),
        correctAnswer: "Selling Apple stock and buying Apple stock 25 days later",
        explanation: "The wash sale rule prohibits repurchasing substantially identical securities within 30 days. Buying Apple stock 25 days after selling it violates the rule.",
        orderIndex: 2,
        points: 1
      },
      {
        questionText: "What is the primary benefit of direct indexing over traditional index fund investing?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Lower investment fees",
          "Better investment returns", 
          "Individual stock tax-loss harvesting opportunities",
          "Reduced market risk"
        ]),
        correctAnswer: "Individual stock tax-loss harvesting opportunities",
        explanation: "Direct indexing allows you to own individual stocks within an index, enabling tax-loss harvesting at the individual security level while maintaining index-like performance.",
        orderIndex: 3,
        points: 1
      },
      {
        questionText: "In which type of account should you typically hold high dividend-paying REITs?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Taxable brokerage account",
          "Traditional IRA or 401(k)",
          "Roth IRA",
          "Health Savings Account"
        ]),
        correctAnswer: "Traditional IRA or 401(k)",
        explanation: "High dividend-paying REITs are tax-inefficient and should be held in tax-deferred accounts to avoid current taxation on the dividend income.",
        orderIndex: 4,
        points: 1
      },
      {
        questionText: "What is the annual limit on capital losses that can be deducted against ordinary income?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "$1,500",
          "$3,000", 
          "$5,000",
          "No limit"
        ]),
        correctAnswer: "$3,000",
        explanation: "The IRS allows up to $3,000 of net capital losses to be deducted against ordinary income annually, with excess losses carried forward to future years.",
        orderIndex: 5,
        points: 1
      }
    ];

    // Create Week 2 quiz questions
    for (const questionData of week2Questions) {
      await prisma.question.create({
        data: {
          quizId: week2Quiz.id,
          questionText: questionData.questionText,
          questionType: questionData.questionType,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
          explanation: questionData.explanation,
          orderIndex: questionData.orderIndex,
          points: questionData.points
        }
      });
    }

    console.log('✅ Week 2 created with lessons and quiz');

    // Week 3: Estate Planning Basics for Tech Wealth
    const week3 = await prisma.week.create({
      data: {
        courseId: course9.id,
        weekNumber: 3,
        title: 'Estate Planning Basics for Tech Wealth',
        overview: 'Learn essential estate planning strategies for high-net-worth tech professionals, including wills, trusts, gift strategies, and wealth transfer techniques.',
        learningObjectives: JSON.stringify([
          'Understand estate and gift tax thresholds and implications',
          'Learn about different types of trusts and their applications',
          'Master annual gift tax exclusions and lifetime exemption strategies',
          'Explore advanced wealth transfer techniques for business owners',
          'Plan for succession of business interests and stock options'
        ]),
        estimatedHours: 8
      }
    });

    // Week 4: International Tax Considerations for Remote Work
    const week4 = await prisma.week.create({
      data: {
        courseId: course9.id,
        weekNumber: 4,
        title: 'International Tax Considerations for Remote Work',
        overview: 'Navigate the complex world of international taxation for remote workers, digital nomads, and global business owners.',
        learningObjectives: JSON.stringify([
          'Understand U.S. tax obligations for foreign income and assets',
          'Learn about Foreign Earned Income Exclusion and Foreign Tax Credit',
          'Navigate tax treaty benefits and foreign reporting requirements',
          'Plan for state tax implications of international remote work',
          'Understand the tax implications of foreign business structures'
        ]),
        estimatedHours: 8
      }
    });

    console.log('✅ All weeks created for Course 9');

    console.log('🎉 Course 9: Advanced Tax Planning for High Earners created successfully!');
    console.log('📚 Course includes:');
    console.log('   - 4 comprehensive weeks');
    console.log('   - 4 professional lessons (Week 1 & 2 complete)');
    console.log('   - 2 assessment quizzes (Week 1 & 2 complete)'); 
    console.log('   - Tax Specialization category');
    console.log('   - Advanced-level content for high earners');
    console.log('');
    console.log('🔧 Next steps:');
    console.log('   - Complete Week 3 and 4 lesson content');
    console.log('   - Add quizzes for Week 3 and 4');
    console.log('   - Test course functionality in browser');
    console.log('   - Commit and deploy changes');

  } catch (error) {
    console.error('❌ Error creating Course 9:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createCourse9();