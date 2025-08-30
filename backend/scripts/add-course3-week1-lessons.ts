import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCourse3Week1Lessons() {
  try {
    // Find Course 3
    const course = await prisma.course.findFirst({
      where: { slug: 'personal-finance-tech' }
    });

    if (!course) {
      throw new Error('Course 3 not found');
    }

    // Find Week 1 of Course 3
    const week1 = await prisma.week.findFirst({
      where: { 
        courseId: course.id,
        weekNumber: 1
      }
    });

    if (!week1) {
      throw new Error('Week 1 not found for Course 3');
    }

    console.log('Adding lessons to Week 1 of Course 3:', week1.title);

    // Create Lesson 1
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
Emergency Fund = Monthly Expenses × Coverage Months × Risk Factor

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
Paycheck → 70% Checking | 20% Emergency Fund | 10% Investments

**Percentage-based Savings:**
- Junior Developer (60k-80k): 15-20% to emergency fund
- Mid-level (80k-120k): 10-15% to emergency fund
- Senior/Principal (120k+): 8-12% to emergency fund

## Key Takeaways

1. **Size matters**: Tech professionals need larger emergency funds due to industry volatility
2. **Tier your approach**: Use multiple account types for optimal access and returns
3. **Automate everything**: Set up systems that build your emergency fund without thinking
4. **Debt balance**: High-interest debt trumps emergency fund building
5. **Regular reviews**: Quarterly assessments ensure your emergency fund stays relevant

Your emergency fund is the foundation of financial security in a volatile industry. Master this foundation before moving to more advanced investment strategies.`,
        durationMinutes: 65,
        orderIndex: 1
      }
    });

    // Create Lesson 2
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

## The Debt Prioritization Framework

### The Developer's Debt Avalanche Method

**Step 1: List all debts with interest rates**
Example Developer Debt Profile:
1. Credit Card A: $5,000 at 22% APR
2. Credit Card B: $3,000 at 18% APR  
3. Auto Loan: $25,000 at 5% APR
4. Student Loans: $60,000 at 4.5% APR
5. Mortgage: $400,000 at 3.5% APR

**Step 2: Rank by interest rate (highest first)**
**Step 3: Pay minimums on all, extra payments to highest rate**

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

## Key Takeaways

1. **Prioritize by interest rate**: Mathematics beats emotions in debt payoff
2. **Automate everything**: Set up systems that work without daily decisions
3. **Consider your career**: Debt strategy should align with career goals
4. **Maintain credit health**: Your credit score affects more than just loans
5. **Plan for windfalls**: Have a strategy for bonuses and stock options

Strategic debt management creates the foundation for wealth building. Master these principles to accelerate your path to financial independence in the tech industry.`,
        durationMinutes: 70,
        orderIndex: 2
      }
    });

    // Create Lesson 3
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
Optimal Utilization = (Total Monthly Spending ÷ Total Credit Limits) × 100
Target: < 10% overall, < 30% individual cards

## Key Takeaways

1. **Credit is a tool**: Use it strategically to support career and business goals
2. **Automation wins**: Set up systems that maintain excellent credit automatically
3. **Business credit matters**: Separate business credit opens entrepreneurial opportunities
4. **Monitor constantly**: Regular monitoring prevents problems and identifies opportunities
5. **Think long-term**: Credit decisions today affect opportunities for years

Excellent credit is the foundation for accessing capital, optimizing cash flow, and building wealth in the technology industry. Master these systems to unlock opportunities throughout your career.`,
        durationMinutes: 60,
        orderIndex: 3
      }
    });

    // Create Week 1 Quiz
    const week1Quiz = await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'Emergency Funds and Debt Management Quiz',
        description: 'Test your understanding of emergency fund planning and strategic debt management for tech professionals.'
      }
    });

    // Create Quiz Questions
    const questions = [
      {
        questionText: 'What emergency fund multiplier should a startup employee with equity compensation typically use?',
        options: JSON.stringify([
          '1.0x (standard 3-6 months)',
          '1.5x (4.5-9 months)',
          '2.0x (6-12 months)',
          '0.5x (1.5-3 months)'
        ]),
        correctAnswer: '1',
        explanation: 'Startup employees face higher volatility and should use a 1.5x multiplier due to company risk and equity concentration, resulting in 4.5-9 months of expenses.'
      },
      {
        questionText: 'In the debt avalanche method, which debt should be prioritized first?',
        options: JSON.stringify([
          'Largest balance debt',
          'Smallest balance debt',
          'Highest interest rate debt',
          'Most recent debt'
        ]),
        correctAnswer: '2',
        explanation: 'The debt avalanche method prioritizes debts by interest rate, paying off the highest interest rate debt first to minimize total interest paid.'
      },
      {
        questionText: 'What is the optimal credit utilization ratio for excellent credit scores?',
        options: JSON.stringify([
          'Under 30%',
          'Under 20%',
          'Under 10%',
          'Under 5%'
        ]),
        correctAnswer: '2',
        explanation: 'For excellent credit scores, keeping total credit utilization under 10% is optimal, with individual cards also staying below 30%.'
      },
      {
        questionText: 'Which emergency fund tier should provide immediate access to funds?',
        options: JSON.stringify([
          'Tier 1: High-yield savings (1 month expenses)',
          'Tier 2: CDs and T-bills (2-3 months expenses)',
          'Tier 3: Conservative investments (3-6 months expenses)',
          'All tiers should have equal access speed'
        ]),
        correctAnswer: '0',
        explanation: 'Tier 1 funds should be in high-yield savings or money market accounts for immediate access to cover urgent expenses.'
      },
      {
        questionText: 'When should a tech professional prioritize debt payoff over emergency fund building?',
        options: JSON.stringify([
          'All debt should be paid before building emergency funds',
          'Only when debt interest rates exceed 8% APR',
          'Never - emergency funds always come first',
          'Only for student loan debt'
        ]),
        correctAnswer: '1',
        explanation: 'High-interest debt (typically over 8% APR) should be prioritized after establishing a mini emergency fund of $1,000-2,500, as the guaranteed return exceeds most investment options.'
      }
    ];

    for (let i = 0; i < questions.length; i++) {
      await prisma.question.create({
        data: {
          quizId: week1Quiz.id,
          questionText: questions[i].questionText,
          questionType: 'multiple_choice',
          options: questions[i].options,
          correctAnswer: questions[i].correctAnswer,
          explanation: questions[i].explanation,
          points: 1,
          orderIndex: i + 1
        }
      });
    }

    console.log('Course 3 Week 1 lessons and quiz added successfully');
    console.log(`- Week 1: ${week1.title}`);
    console.log(`- Lessons: ${lesson1.title}, ${lesson2.title}, ${lesson3.title}`);
    console.log(`- Quiz: ${week1Quiz.title}`);

  } catch (error) {
    console.error('Error adding Course 3 Week 1 lessons:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addCourse3Week1Lessons();