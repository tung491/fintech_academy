import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse3() {
  try {
    // Find the Foundation Courses category
    const foundationCategory = await prisma.courseCategory.findFirst({
      where: { slug: 'foundation' }
    });

    if (!foundationCategory) {
      throw new Error('Foundation course category not found');
    }

    // Create Course 3: Personal Finance for Tech Professionals
    const course = await prisma.course.create({
      data: {
        title: 'Personal Finance for Tech Professionals',
        slug: 'personal-finance-tech',
        description: 'Master personal financial management tailored specifically for developers and tech employees. Learn to optimize your high-income potential through strategic financial planning.',
        shortDescription: 'Build wealth through strategic financial planning designed for tech professionals.',
        categoryId: foundationCategory.id,
        level: 'beginner',
        duration: '4 weeks',
        estimatedHours: 32,
        price: 9700, // $97
        originalPrice: 12700, // $127
        instructor: 'Sarah Johnson, CFP, CPA',
        instructorBio: 'Certified Financial Planner and CPA with 15+ years specializing in financial planning for high-income tech professionals. Former financial advisor at major tech companies.',
        thumbnailUrl: '/images/courses/personal-finance-tech.jpg',
        orderIndex: 3,
        isPublished: true,
        isFeatured: false,
        skillsLearned: JSON.stringify([
          'Emergency fund optimization for tech careers',
          'Strategic debt management and credit optimization',
          'Investment strategies for high earners',
          'Stock options and equity compensation planning',
          'Advanced retirement planning and tax strategies'
        ]),
        targetAudience: 'Individual developers and tech employees looking to optimize their personal financial management and build long-term wealth.'
      }
    });

    console.log('Course 3 created:', course.title);

    // Create Week 1: Emergency Funds and Debt Management
    const week1 = await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: 1,
        title: 'Emergency Funds and Debt Management',
        overview: 'Build a solid financial foundation with proper emergency planning and strategic debt management tailored for tech professionals.',
        learningObjectives: JSON.stringify([
          'Calculate appropriate emergency fund size for tech careers',
          'Develop debt prioritization and payoff strategies',
          'Understand credit optimization techniques',
          'Create automated savings and debt payment systems'
        ]),
        estimatedHours: 8
      }
    });

    // Create Lessons for Week 1
    const lesson1 = await prisma.lesson.create({
      data: {
        weekId: week1.id,
        title: 'Emergency Fund Essentials for Tech Professionals',
        slug: 'emergency-fund-essentials',
        content: `# Emergency Fund Essentials for Tech Professionals

## Introduction: Why Emergency Funds Matter in Tech

The technology industry offers incredible earning potential, but it also comes with unique financial risks. From startup volatility to rapid industry changes, tech professionals face income fluctuations that make emergency funds absolutely critical.

## The Tech Professional's Emergency Fund Formula

### Standard vs. Tech-Specific Considerations

Traditional advice suggests 3-6 months of expenses, but tech professionals should consider:
- **Industry volatility**: Tech layoffs and company closures
- **Stock option dependencies**: Concentrated wealth in company equity
- **Contract/freelance income**: Irregular payment schedules
- **Rapid skill depreciation**: Need for continuous learning investments

### Calculating Your Emergency Fund Target

**Basic Formula:**
\`\`\`
Emergency Fund = Monthly Expenses × Coverage Months × Risk Factor
\`\`\`

**Risk Factors for Tech Professionals:**
- Stable W-2 at established company: 1.0x (3-6 months)
- Startup employee with equity: 1.5x (4.5-9 months)
- Contract/freelance developer: 2.0x (6-12 months)
- Multiple income dependencies: 1.25x (4-7.5 months)

## Building Your Emergency Fund Strategically

### The 3-Tier Emergency Fund System

**Tier 1: Immediate Access (1 month expenses)**
- High-yield savings account
- Money market account
- Bank sweep accounts

**Tier 2: Short-term Access (2-3 months expenses)**
- Certificate of Deposits (CDs) with laddering
- Treasury bills (T-bills)
- High-grade bond funds

**Tier 3: Medium-term Buffer (3-6 months expenses)**
- Conservative investment accounts
- Stable value funds
- I-bonds (inflation-protected)

### Automation Strategies

**Direct Deposit Splitting:**
\`\`\`
Paycheck → 70% Checking | 20% Emergency Fund | 10% Investments
\`\`\`

**Percentage-based Savings:**
- Junior Developer (60k-80k): 15-20% to emergency fund
- Mid-level (80k-120k): 10-15% to emergency fund
- Senior/Principal (120k+): 8-12% to emergency fund

## Common Emergency Fund Mistakes in Tech

### Over-reliance on Stock Options
- **Problem**: Counting unvested equity as emergency funds
- **Solution**: Only count liquid, vested assets

### Lifestyle Inflation Oversight
- **Problem**: Not adjusting emergency fund for increased expenses
- **Solution**: Quarterly emergency fund reviews

### Crypto Confusion
- **Problem**: Treating cryptocurrency as emergency funds
- **Solution**: Maximum 5% of emergency fund in stable crypto

## Emergency Fund vs. Debt: The Tech Professional's Dilemma

### The Priority Matrix

**High-Interest Debt (>8% APR):**
1. Build mini emergency fund ($1,000-2,500)
2. Attack high-interest debt aggressively
3. Build full emergency fund

**Low-Interest Debt (<5% APR):**
1. Build full emergency fund first
2. Make minimum payments on low-interest debt
3. Focus on investments after emergency fund is complete

### Special Considerations for Student Loans

Tech professionals often carry substantial student loan debt. Consider:
- Federal loan protections (forbearance, income-based repayment)
- Employer loan assistance programs
- Tax deductibility of student loan interest

## Advanced Emergency Fund Strategies

### The Graduated Emergency Fund

Instead of keeping all emergency funds in low-yield accounts:

**Month 1-2 expenses**: High-yield savings (immediate access)
**Month 3-4 expenses**: Conservative bond funds (3-7 day access)
**Month 5-6 expenses**: Stable value funds (1-2 week access)

### Credit Line Backup Strategy

Maintain a home equity line of credit (HELOC) or business line of credit as additional backup, but never as primary emergency funds.

### Tax Considerations

- Emergency fund withdrawals are not taxable (principal)
- Interest earned on emergency funds is taxable income
- Consider tax-loss harvesting in taxable investment accounts used for emergency funds

## Practical Implementation Steps

### Week 1 Action Items:
1. Calculate monthly essential expenses
2. Determine appropriate emergency fund target
3. Open high-yield savings account if needed
4. Set up automatic transfers
5. Review and optimize current debt payments

### Monthly Review Checklist:
- [ ] Emergency fund balance vs. target
- [ ] Monthly expense changes
- [ ] Income stability assessment
- [ ] Interest rate optimization opportunities
- [ ] Debt balance and payment progress

## Case Study: Sarah, Senior Frontend Developer

**Situation:**
- Salary: $130,000
- Monthly expenses: $5,000
- Student loans: $45,000 at 4.5%
- Credit card debt: $8,000 at 18%
- Current savings: $2,000

**Strategy:**
1. Maintain $2,000 mini emergency fund
2. Attack $8,000 credit card debt with $2,000/month
3. Build $30,000 full emergency fund (6 months × $5,000)
4. Continue minimum student loan payments during debt payoff

**Timeline:**
- Months 1-4: Eliminate credit card debt
- Months 5-18: Build full emergency fund
- Month 19+: Aggressive student loan payoff and investing

## Key Takeaways

1. **Size matters**: Tech professionals need larger emergency funds due to industry volatility
2. **Tier your approach**: Use multiple account types for optimal access and returns
3. **Automate everything**: Set up systems that build your emergency fund without thinking
4. **Debt balance**: High-interest debt trumps emergency fund building
5. **Regular reviews**: Quarterly assessments ensure your emergency fund stays relevant

Your emergency fund is the foundation of financial security in a volatile industry. Master this foundation before moving to more advanced investment strategies.`,
        videoUrl: null,
        duration: 65,
        orderIndex: 1
      }
    });

    const lesson2 = await prisma.lesson.create({
      data: {
        weekId: week1.id,
        title: 'Strategic Debt Management for Developers',
        slug: 'strategic-debt-management',
        content: `# Strategic Debt Management for Developers

## The Developer's Debt Landscape

Technology professionals often face a unique debt profile compared to other industries. Understanding how to strategically manage this debt can dramatically accelerate your path to financial independence.

## Common Debt Types for Tech Professionals

### Student Loans: The Universal Challenge
- **Average debt**: $35,000-$85,000 for computer science graduates
- **Interest rates**: 3.73%-6.28% (federal), higher for private loans
- **Repayment terms**: 10-25 years standard

### Credit Cards: The Lifestyle Inflation Trap
- **Common scenario**: Upgrading lifestyle before establishing savings
- **Average tech worker credit card debt**: $12,000-$18,000
- **Interest rates**: 15%-25% APR

### Auto Loans: The Commute Necessity
- **Tech hub reality**: Often required for commuting to offices
- **Average loan**: $25,000-$40,000
- **Interest rates**: 3%-8% depending on credit

### Mortgage Debt: The HCOL Challenge
- **High cost of living areas**: SF, Seattle, NYC, Austin
- **Down payment challenges**: $100,000+ down payments common
- **Jumbo loan territory**: Often exceeding conventional loan limits

## The Debt Prioritization Framework

### The Developer's Debt Avalanche Method

**Step 1: List all debts with interest rates**
\`\`\`
Example Developer Debt Profile:
1. Credit Card A: $5,000 at 22% APR
2. Credit Card B: $3,000 at 18% APR  
3. Auto Loan: $25,000 at 5% APR
4. Student Loans: $60,000 at 4.5% APR
5. Mortgage: $400,000 at 3.5% APR
\`\`\`

**Step 2: Rank by interest rate (highest first)**
**Step 3: Pay minimums on all, extra payments to highest rate**

### The Psychological Alternative: Debt Snowball

For developers who prefer systematic completion:
1. Rank debts by balance (smallest first)
2. Attack smallest balance while paying minimums on others
3. Roll completed payments into next smallest debt

## Advanced Debt Strategies for High Earners

### The Tech Professional's Debt Consolidation

**Balance Transfer Strategy:**
- Use 0% APR promotions (12-21 months)
- Calculate transfer fees vs. interest savings
- Automatic payment setup to avoid promotional rate loss

**Personal Loan Consolidation:**
- Lower rates than credit cards (6%-15%)
- Fixed payments and terms
- Simplified payment management

### Student Loan Optimization

**Federal Loan Strategies:**
- Income-Driven Repayment (IDR) plans
- Public Service Loan Forgiveness (if applicable)
- Tax implications of forgiveness programs

**Refinancing Considerations:**
- Private refinancing rates: 3%-7%
- Loss of federal protections
- Credit score and income requirements

**The Tech Professional's Calculation:**
\`\`\`
Monthly payment reduction × 12 months = Annual savings
vs.
Lost federal benefits value = ?
\`\`\`

## Credit Score Optimization for Developers

### Understanding Credit Impact on Tech Careers

**Background checks**: Many tech companies check credit
**Security clearances**: Government contracts require good credit
**Entrepreneurial plans**: Business credit depends on personal credit

### The Developer's Credit Strategy

**Credit Utilization Management:**
- Keep total utilization below 10%
- Individual card utilization below 30%
- Consider multiple cards for utilization spreading

**Credit Age Optimization:**
- Keep oldest accounts open
- Consider downgrading cards instead of closing
- Authorized user strategies for building credit

**Credit Mix for Tech Professionals:**
- Revolving credit: Credit cards
- Installment credit: Auto loans, personal loans
- Mortgage credit: Home loans
- Avoid: Store cards, payday loans, rent-to-own

## Debt and Career Strategy Integration

### Stock Option Considerations

**Vesting Schedule Impact:**
- Don't count unvested options for debt payoff
- Consider tax implications of option exercises
- Diversification vs. debt payoff decisions

**IPO/Acquisition Scenarios:**
- Prepare debt payoff strategy for liquidity events
- Understand tax implications of lump sum payments
- Estate planning considerations

### Career Transition Planning

**Job Change Buffer:**
- Maintain minimum debt payments during transition
- Avoid taking on new debt before career moves
- Build relationships with multiple lenders

**Freelance/Contract Transition:**
- Debt-to-income ratios with variable income
- Business credit establishment
- Separate business and personal debt strategies

## Tech-Specific Debt Scenarios

### The Startup Employee Dilemma

**Scenario**: Startup equity vs. debt payoff
**Analysis Framework:**
1. Startup success probability assessment
2. Debt interest rate vs. potential equity returns
3. Risk tolerance and family situation
4. Liquidity timeline considerations

**Recommended Approach:**
- Pay off high-interest debt (>8%) regardless
- Balance moderate debt with equity retention
- Maintain emergency fund for startup volatility

### The Freelancer's Debt Management

**Irregular Income Challenges:**
- Variable monthly income
- Seasonal work patterns
- Client payment delays

**Solutions:**
- Income smoothing with separate account
- Percentage-based debt payments
- Multiple smaller debts vs. large consolidated debt

### The Remote Worker's Opportunity

**Geographic Arbitrage:**
- Lower cost of living areas
- Reduced commuting expenses
- Home office tax deductions

**Debt Acceleration Strategy:**
- Maintain high-salary, reduce living costs
- Direct cost savings to debt elimination
- Avoid lifestyle inflation despite savings

## Advanced Payment Strategies

### The Developer's Automated System

**Bi-weekly Payments:**
\`\`\`
Monthly payment ÷ 2 = Bi-weekly amount
Result: 26 payments per year = 13 monthly payments
Extra payment goes directly to principal
\`\`\`

**Dollar-Cost Averaging for Debt:**
- Set percentage of income for debt payments
- Automatically scales with raises and bonuses
- Maintains consistent debt reduction regardless of income changes

### Bonus and Windfall Strategy

**Tech Bonus Allocation:**
- 50% to highest interest debt
- 25% to emergency fund (if not fully funded)
- 25% to investments/goals

**Stock Option Exercise Strategy:**
- Use proceeds strategically for debt elimination
- Consider tax implications timing
- Don't exercise options solely for debt payoff

## Common Debt Mistakes in Tech

### Over-leveraging on Future Income
- Assuming promotions and raises
- Not accounting for industry volatility
- Lifestyle inflation ahead of income growth

### Ignoring Tax Implications
- Student loan interest deduction phase-outs
- Mortgage interest deduction changes
- State tax considerations for remote work

### Emotional Debt Decisions
- Keeping "good debt" for psychological reasons
- Avoiding debt consolidation due to complexity
- Not considering opportunity costs

## Debt-Free Timeline Planning

### The Aggressive Developer Timeline

**Years 1-2: Foundation**
- Emergency fund establishment
- High-interest debt elimination
- Credit score optimization

**Years 3-5: Acceleration**
- Moderate debt payoff
- Investment account building
- Career advancement focus

**Years 6+: Optimization**
- Strategic debt retention
- Tax optimization strategies
- Wealth building acceleration

## Case Study: Mike, Full-Stack Developer

**Initial Situation:**
- Salary: $95,000
- Credit cards: $15,000 at 20% average
- Student loans: $50,000 at 5.5%
- Auto loan: $20,000 at 4%
- Rent: $2,000/month

**18-Month Debt Elimination Plan:**

**Phase 1 (Months 1-6): Credit Card Focus**
- Emergency fund: $3,000 (mini fund)
- Credit card payments: $2,500/month
- Result: Credit cards eliminated

**Phase 2 (Months 7-12): Emergency Fund Building**
- Emergency fund target: $15,000 (full fund)
- Monthly contribution: $2,000
- Result: Full emergency fund established

**Phase 3 (Months 13-18): Strategic Decision**
- Option A: Aggressive student loan payoff
- Option B: Begin investing while making minimum payments
- Decision factors: Interest rates, tax benefits, investment opportunities

## Key Takeaways

1. **Prioritize by interest rate**: Mathematics beats emotions in debt payoff
2. **Automate everything**: Set up systems that work without daily decisions
3. **Consider your career**: Debt strategy should align with career goals
4. **Maintain credit health**: Your credit score affects more than just loans
5. **Plan for windfalls**: Have a strategy for bonuses and stock options
6. **Review regularly**: Debt strategy should evolve with income and life changes

Strategic debt management creates the foundation for wealth building. Master these principles to accelerate your path to financial independence in the tech industry.`,
        videoUrl: null,
        duration: 70,
        orderIndex: 2
      }
    });

    const lesson3 = await prisma.lesson.create({
      data: {
        weekId: week1.id,
        title: 'Credit Optimization and Financial Systems',
        slug: 'credit-optimization-systems',
        content: `# Credit Optimization and Financial Systems

## The Developer's Guide to Credit Mastery

Credit optimization for tech professionals goes beyond simple score improvement. It's about creating systems that support your career goals, entrepreneurial ambitions, and long-term wealth building strategies.

## Understanding Credit in the Tech Ecosystem

### Why Credit Matters More for Tech Professionals

**Employment Implications:**
- Background checks for senior positions
- Security clearance requirements
- International assignment eligibility
- Startup founding and business credit

**Entrepreneurial Considerations:**
- Business loan approvals
- Equipment financing
- Office space leasing
- Investor due diligence processes

### Credit Score Ranges and Tech Career Impact

**Exceptional (800+):**
- Best loan rates available
- Premium credit card approvals
- Business credit establishment
- International banking relationships

**Very Good (740-799):**
- Excellent loan rates
- Most credit card approvals
- Standard business credit options
- Minor rate differences

**Good (670-739):**
- Decent rates with shopping around
- Some premium card limitations
- Business credit with higher deposits
- Rate shopping becomes important

**Fair (580-669):**
- Limited options, higher rates
- Secured credit cards needed
- Business credit challenges
- Employment background check concerns

## Advanced Credit Optimization Strategies

### The Tech Professional's Credit Card Strategy

**The Three-Card System:**

**Card 1: Daily Driver (2-5% cashback)**
- High limit for low utilization
- Excellent rewards on tech purchases
- Business expense separation

**Card 2: Travel/Premium Benefits**
- Airport lounge access
- Travel insurance coverage
- International transaction fee waivers
- Extended warranty on tech equipment

**Card 3: Balance Management**
- 0% promotional rates
- Large credit limit for utilization management
- Emergency access to credit

### Credit Utilization Mastery

**The Developer's Utilization Formula:**
\`\`\`
Optimal Utilization = (Total Monthly Spending ÷ Total Credit Limits) × 100
Target: < 10% overall, < 30% individual cards
\`\`\`

**Advanced Utilization Techniques:**

**Multiple Payment Strategy:**
- Pay before statement closes
- Make multiple payments per month
- Keep reported utilization low while using cards actively

**Credit Limit Optimization:**
- Request increases every 6 months
- Use automatic increase programs
- Business card limit improvements

## Building Business Credit as a Tech Professional

### Separating Personal and Business Credit

**Legal Structure Requirements:**
- LLC or Corporation establishment
- Separate EIN (Employer Identification Number)
- Business banking relationships
- Legal address separation

**Business Credit Building Steps:**

**Phase 1: Foundation (Months 1-6)**
1. Register business with major databases (D&B, Experian Business)
2. Establish business bank accounts
3. Apply for business credit cards
4. Build vendor trade lines

**Phase 2: Growth (Months 7-18)**
1. Increase credit limits regularly
2. Add multiple business cards
3. Establish business loans
4. Monitor business credit reports

**Phase 3: Optimization (18+ Months)**
1. Qualify for unsecured business loans
2. Equipment financing approvals
3. Commercial real estate financing
4. Investor-ready credit profile

### Tech-Specific Business Credit Strategies

**Equipment Financing:**
- Computer and server equipment
- Software licensing agreements
- Office technology purchases
- Home office setup financing

**SaaS Business Considerations:**
- Recurring revenue impact on credit
- Subscription-based business models
- Customer acquisition cost financing
- Working capital for growth

## Credit Monitoring and Optimization Systems

### Automated Credit Management

**Monthly Credit Tasks (Automated):**
- Credit report monitoring (all three bureaus)
- Score tracking and trend analysis
- Utilization optimization
- Payment automation setup

**Quarterly Credit Reviews:**
- Detailed report analysis
- Dispute filing for inaccuracies
- Credit limit increase requests
- Strategy adjustment based on goals

**Annual Credit Optimization:**
- Comprehensive credit portfolio review
- Card product changes and upgrades
- Business credit expansion
- Long-term strategy planning

### Credit Monitoring Tools for Developers

**Free Monitoring Options:**
- Credit Karma (TransUnion, Equifax)
- Chase Credit Journey
- Capital One CreditWise
- Annual free reports from annualcreditreport.com

**Premium Monitoring Services:**
- myFICO (all FICO score variants)
- Experian IdentityWorks
- Identity Guard
- LifeLock comprehensive monitoring

**Developer-Specific Tools:**
- API access for credit monitoring (where available)
- Automated alert systems
- Credit score tracking spreadsheets
- Integration with personal finance apps

## Credit Repair and Dispute Strategies

### The Developer's Systematic Dispute Process

**Step 1: Data Gathering**
- Obtain all three credit reports
- Document all inaccuracies
- Gather supporting documentation
- Create dispute tracking system

**Step 2: Dispute Filing Strategy**
- Online disputes for simple errors
- Certified mail for complex disputes
- Follow up within 30-day windows
- Document all communications

**Step 3: Follow-up and Persistence**
- Escalate unresolved disputes
- Contact original creditors directly
- Consider professional assistance for complex cases
- Monitor results and re-dispute if necessary

### Common Credit Issues for Tech Professionals

**Student Loan Reporting Problems:**
- Multiple servicer transfers
- Payment history inaccuracies
- Consolidation reporting errors
- Forbearance/deferment mistakes

**Employment-Related Credit Issues:**
- Identity verification problems with remote work
- Address changes with frequent moves
- Income verification complications
- International credit history gaps

## Advanced Credit Strategies

### The Credit Builder's Investment Approach

**Secured Card Graduation:**
1. Start with secured cards if needed
2. Graduate to unsecured cards
3. Product change to premium cards
4. Maintain long-term relationships

**Credit Age Optimization:**
- Keep oldest accounts open indefinitely
- Consider downgrading instead of closing
- Add authorized users strategically
- Maintain inactive accounts with small purchases

### International Credit Considerations

**Global Mobility Planning:**
- Establish relationships with global banks
- Understand credit transfer programs
- Maintain US credit while abroad
- Build local credit in new countries

**Cross-Border Credit Strategies:**
- HSBC Expat programs
- CitiBank global transfers
- American Express international transfers
- Local bank relationship building

## Financial System Integration

### Connecting Credit to Overall Financial Health

**Cash Flow Optimization:**
- Credit cards for float management
- Business credit for working capital
- Personal credit for emergency access
- Strategic debt utilization

**Investment Account Integration:**
- Margin account access with good credit
- Portfolio-secured lending options
- Real estate investment financing
- Alternative investment access

### Technology Tools for Credit Management

**Personal Finance Apps Integration:**
- Mint, YNAB, Personal Capital connections
- Automatic categorization of credit payments
- Credit utilization tracking
- Score monitoring integration

**Developer-Specific Solutions:**
- Custom tracking spreadsheets
- API integrations where available
- Automated alert systems
- Credit score modeling and prediction

## Case Study: Sarah, DevOps Engineer

**Initial Credit Profile:**
- Credit Score: 650
- Student loans with late payments
- High credit card utilization (85%)
- One credit card, $2,000 limit

**12-Month Credit Optimization Plan:**

**Months 1-3: Foundation Building**
- Dispute late payment inaccuracies
- Pay down credit card to <10% utilization
- Request credit limit increase
- Apply for second credit card

**Months 4-6: System Implementation**
- Set up automated payments
- Implement multi-payment utilization strategy
- Begin business credit building
- Monitor progress monthly

**Months 7-9: Expansion Phase**
- Apply for premium credit card
- Increase limits on existing cards
- Establish business credit relationships
- Optimize credit mix

**Months 10-12: Advanced Strategies**
- Implement international credit planning
- Optimize for real estate purchase
- Build investor-ready credit profile
- Plan for entrepreneurial transition

**Results After 12 Months:**
- Credit Score: 780
- Total available credit: $45,000
- Business credit established
- Qualified for premium financial products

## Key Implementation Steps

### Week 1 Action Items:
1. Obtain all three credit reports
2. Calculate current utilization ratios
3. Set up credit monitoring
4. Create credit optimization timeline
5. Automate all current payments

### Monthly Credit Habits:
- Monitor credit reports and scores
- Optimize credit utilization
- Request credit limit increases
- Review and dispute inaccuracies
- Adjust strategy based on goals

### Quarterly Reviews:
- Comprehensive credit analysis
- Strategy adjustment
- Product changes and upgrades
- Business credit development
- Goal reassessment

## Key Takeaways

1. **Credit is a tool**: Use it strategically to support career and business goals
2. **Automation wins**: Set up systems that maintain excellent credit automatically
3. **Business credit matters**: Separate business credit opens entrepreneurial opportunities
4. **Monitor constantly**: Regular monitoring prevents problems and identifies opportunities
5. **Think long-term**: Credit decisions today affect opportunities for years
6. **Integrate holistically**: Credit strategy should align with overall financial goals

Excellent credit is the foundation for accessing capital, optimizing cash flow, and building wealth in the technology industry. Master these systems to unlock opportunities throughout your career.`,
        videoUrl: null,
        duration: 60,
        orderIndex: 3
      }
    });

    // Create Week 1 Quiz
    const week1Quiz = await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'Emergency Funds and Debt Management Quiz',
        description: 'Test your understanding of emergency fund planning and strategic debt management for tech professionals.',
        questions: [
          {
            question: 'What emergency fund multiplier should a startup employee with equity compensation typically use?',
            options: [
              '1.0x (standard 3-6 months)',
              '1.5x (4.5-9 months)',
              '2.0x (6-12 months)',
              '0.5x (1.5-3 months)'
            ],
            correctAnswer: 1,
            explanation: 'Startup employees face higher volatility and should use a 1.5x multiplier due to company risk and equity concentration, resulting in 4.5-9 months of expenses.'
          },
          {
            question: 'In the debt avalanche method, which debt should be prioritized first?',
            options: [
              'Largest balance debt',
              'Smallest balance debt',
              'Highest interest rate debt',
              'Most recent debt'
            ],
            correctAnswer: 2,
            explanation: 'The debt avalanche method prioritizes debts by interest rate, paying off the highest interest rate debt first to minimize total interest paid.'
          },
          {
            question: 'What is the optimal credit utilization ratio for excellent credit scores?',
            options: [
              'Under 30%',
              'Under 20%',
              'Under 10%',
              'Under 5%'
            ],
            correctAnswer: 2,
            explanation: 'For excellent credit scores, keeping total credit utilization under 10% is optimal, with individual cards also staying below 30%.'
          },
          {
            question: 'Which emergency fund tier should provide immediate access to funds?',
            options: [
              'Tier 1: High-yield savings (1 month expenses)',
              'Tier 2: CDs and T-bills (2-3 months expenses)',
              'Tier 3: Conservative investments (3-6 months expenses)',
              'All tiers should have equal access speed'
            ],
            correctAnswer: 0,
            explanation: 'Tier 1 funds should be in high-yield savings or money market accounts for immediate access to cover urgent expenses.'
          },
          {
            question: 'When should a tech professional prioritize debt payoff over emergency fund building?',
            options: [
              'All debt should be paid before building emergency funds',
              'Only when debt interest rates exceed 8% APR',
              'Never - emergency funds always come first',
              'Only for student loan debt'
            ],
            correctAnswer: 1,
            explanation: 'High-interest debt (typically over 8% APR) should be prioritized after establishing a mini emergency fund of $1,000-2,500, as the guaranteed return exceeds most investment options.'
          }
        ]
      }
    });

    console.log('Course 3 created successfully with Week 1 content');
    console.log(`- Course: ${course.title}`);
    console.log(`- Week 1: ${week1.title}`);
    console.log(`- Lessons: ${lesson1.title}, ${lesson2.title}, ${lesson3.title}`);
    console.log(`- Quiz: ${week1Quiz.title}`);

  } catch (error) {
    console.error('Error creating Course 3:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createCourse3();