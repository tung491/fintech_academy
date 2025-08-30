import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Creating Course 11: Startup Finance and Fundraising...');

  try {
    // Create or update the course
    const course = await prisma.course.upsert({
      where: { slug: 'startup-finance-fundraising' },
      update: {
        title: 'Startup Finance and Fundraising',
        description: 'Master the complete startup fundraising process from financial modeling to post-funding management',
        price: 297.00,
        originalPrice: 397.00,
        estimatedHours: 48,
        level: 'advanced',
        duration: '6 weeks',
        targetAudience: 'Startup founders preparing to raise seed, Series A, or growth rounds, entrepreneurs planning to understand the fundraising process, and business owners considering venture capital funding options',
        prerequisites: 'Basic understanding of financial statements, business model fundamentals, and startup operations',
        featured: true,
        published: true
      },
      create: {
        slug: 'startup-finance-fundraising',
        title: 'Startup Finance and Fundraising',
        description: 'Master the complete startup fundraising process from financial modeling to post-funding management',
        longDescription: `This comprehensive 6-week course covers every aspect of startup finance and fundraising, from building compelling financial models to managing post-funding operations. You'll learn industry-standard valuation methods, understand the VC ecosystem, master due diligence preparation, and develop sophisticated negotiation skills for term sheets.

**What You'll Learn:**
• Build professional financial models and projections that attract investors
• Master multiple valuation methodologies and understand cap table dynamics  
• Navigate the venture capital and angel investment ecosystem effectively
• Prepare comprehensive due diligence materials and data rooms
• Negotiate favorable term sheets and understand complex deal structures
• Manage post-funding financial operations and investor relations

**Course Features:**
• Real fundraising case studies from successful startups
• Downloadable financial model templates and due diligence checklists
• Guest expert sessions with active VCs and successful founders
• Interactive exercises with actual term sheet negotiations
• Post-funding financial management frameworks

**Ideal For:**
• Startup founders preparing to raise seed, Series A, or growth rounds
• Entrepreneurs who want to understand the fundraising process before starting
• Business owners considering venture capital vs. other funding options
• Anyone interested in startup finance and the venture capital ecosystem`,
        thumbnailUrl: '/api/placeholder/400/250',
        price: 297.00,
        originalPrice: 397.00,
        estimatedHours: 48,
        level: 'advanced',
        duration: '6 weeks',
        targetAudience: 'Startup founders preparing to raise seed, Series A, or growth rounds, entrepreneurs planning to understand the fundraising process, and business owners considering venture capital funding options',
        prerequisites: 'Basic understanding of financial statements, business model fundamentals, and startup operations',
        syllabus: [
          'Financial modeling and projections for startups',
          'Valuation methodologies and cap table management',
          'Venture capital and angel investment ecosystem',
          'Due diligence preparation and data room management',
          'Term sheet negotiation and deal structuring',
          'Post-funding financial management and investor relations'
        ],
        learningOutcomes: [
          'Build comprehensive financial models that attract investors',
          'Understand multiple valuation methodologies and cap table dynamics',
          'Navigate the VC ecosystem and build investor relationships',
          'Prepare professional due diligence materials',
          'Negotiate term sheets and understand deal structures',
          'Manage post-funding operations and investor communications'
        ],
        featured: true,
        published: true
      }
    });

    console.log(`✅ Created/updated course: ${course.title}`);

    // Clean up existing course data
    console.log('🧹 Cleaning up existing course data...');
    
    // Delete existing weeks and related data
    const existingWeeks = await prisma.week.findMany({
      where: { course: { slug: 'startup-finance-fundraising' } },
      include: {
        lessons: { include: { quizzes: true } },
        quizzes: { include: { questions: true } }
      }
    });

    for (const week of existingWeeks) {
      // Delete quiz questions
      for (const quiz of week.quizzes) {
        await prisma.question.deleteMany({ where: { quizId: quiz.id } });
        await prisma.quiz.delete({ where: { id: quiz.id } });
      }
      
      // Delete lesson quizzes
      for (const lesson of week.lessons) {
        for (const quiz of lesson.quizzes) {
          await prisma.question.deleteMany({ where: { quizId: quiz.id } });
          await prisma.quiz.delete({ where: { id: quiz.id } });
        }
        await prisma.lesson.delete({ where: { id: lesson.id } });
      }
      
      await prisma.week.delete({ where: { id: week.id } });
    }

    console.log('✅ Cleaned up existing weeks and related data');

    // Week 1: Financial Modeling and Projections
    const week1 = await prisma.week.create({
      data: {
        title: 'Financial Modeling and Projections',
        description: 'Build professional financial models that attract investors and accurately project your startup\'s growth trajectory',
        weekNumber: 1,
        estimatedHours: 8,
        learningObjectives: [
          'Understand the key components of startup financial models',
          'Build comprehensive 3-statement financial models', 
          'Create compelling revenue projections and unit economics',
          'Model different growth scenarios and sensitivities',
          'Present financial projections effectively to investors'
        ],
        published: true,
        course: { connect: { id: course.id } }
      }
    });

    console.log(`✅ Created ${week1.title}`);

    // Week 1 Lessons
    const week1lesson1 = await prisma.lesson.create({
      data: {
        title: 'Foundation of Startup Financial Modeling',
        slug: 'foundation-startup-financial-modeling',
        content: `# Foundation of Startup Financial Modeling

## Introduction to Startup Financial Models

Financial modeling is the cornerstone of successful fundraising. Unlike established businesses with historical data, startups must build forward-looking models based on assumptions, market research, and growth hypotheses.

### Key Components of Startup Financial Models

**1. Revenue Model**
- Unit economics (Customer Acquisition Cost, Lifetime Value)
- Pricing strategy and monetization
- Revenue recognition policies
- Growth assumptions and market penetration

**2. Operational Model**
- Headcount planning and compensation
- Technology and infrastructure costs
- Sales and marketing spend
- General and administrative expenses

**3. Capital Requirements**
- Working capital needs
- Capital expenditures
- Cash burn analysis
- Funding requirements and timing

### Building Block Approach

**Step 1: Define Your Business Model**
- Revenue streams and pricing
- Customer segments and acquisition channels
- Key metrics and unit economics
- Competitive positioning

**Step 2: Historical Analysis (if applicable)**
- Past performance trends
- Seasonal patterns
- Customer cohort analysis
- Operational efficiency metrics

**Step 3: Market Research Integration**
- Total Addressable Market (TAM)
- Serviceable Addressable Market (SAM)
- Market penetration rates
- Competitive benchmarking

### Common Modeling Mistakes to Avoid

**Over-Optimization**
- Hockey stick growth assumptions
- Unrealistic market capture rates
- Underestimating costs and timeline
- Ignoring competition and market dynamics

**Under-Documentation**
- Lack of assumption tracking
- No sensitivity analysis
- Missing scenario planning
- Poor model structure and organization

### Industry Standards and Best Practices

**Model Structure**
- Separate assumption sheets
- Clear input/output separation
- Consistent formatting and labeling
- Built-in error checking and validation

**Scenario Planning**
- Base case (most likely)
- Upside case (optimistic)
- Downside case (conservative)
- Stress testing for extreme scenarios

**Key Metrics Focus**
- Monthly Recurring Revenue (MRR) for SaaS
- Unit economics and payback periods
- Cash burn and runway calculation
- Customer lifetime value optimization

## Practical Exercise

Create a basic financial model framework for your startup idea including:
1. Revenue model with key assumptions
2. Cost structure breakdown
3. Headcount and hiring plan
4. Basic cash flow projection

## Action Items

- [ ] Define your business model components
- [ ] Research industry benchmarks for key metrics
- [ ] Set up model structure with clear assumptions
- [ ] Create initial revenue and cost projections
- [ ] Validate assumptions with market research`,
        estimatedReadingTime: 75,
        orderIndex: 1,
        published: true,
        week: { connect: { id: week1.id } }
      }
    });

    const week1lesson2 = await prisma.lesson.create({
      data: {
        title: 'Advanced Financial Model Architecture',
        slug: 'advanced-financial-model-architecture',
        content: `# Advanced Financial Model Architecture

## Building Professional-Grade Financial Models

Advanced financial models go beyond basic projections to create comprehensive decision-making tools that can adapt to changing assumptions and provide deep insights into business dynamics.

### Three-Statement Model Integration

**Income Statement**
- Revenue recognition and timing
- Cost of goods sold modeling
- Operating expense categorization
- EBITDA and net income calculation

**Balance Sheet**
- Working capital dynamics
- Asset depreciation schedules
- Debt and equity financing
- Cash and investment tracking

**Cash Flow Statement**
- Operating cash flow calculation
- Investment and financing activities
- Free cash flow generation
- Cash burn and runway analysis

### Advanced Revenue Modeling

**SaaS Revenue Recognition**
- Monthly/Annual Recurring Revenue (MRR/ARR)
- Churn and expansion revenue
- Cohort-based analysis
- Contract value modeling

**Marketplace Revenue**
- Transaction volume growth
- Take rate optimization
- Network effects modeling
- Multi-sided market dynamics

**E-commerce Revenue**
- Customer acquisition funnels
- Repeat purchase behavior
- Seasonal demand patterns
- Inventory and fulfillment costs

### Unit Economics Deep Dive

**Customer Acquisition Cost (CAC)**
- Channel-specific CAC calculation
- Blended vs. organic CAC
- CAC payback period analysis
- Marketing efficiency optimization

**Customer Lifetime Value (LTV)**
- Cohort-based LTV calculation
- Churn rate impact analysis
- Expansion revenue inclusion
- LTV:CAC ratio optimization

### Scenario and Sensitivity Analysis

**Scenario Modeling**
- Base, upside, and downside cases
- Key driver sensitivity analysis
- Monte Carlo simulation techniques
- Risk-adjusted projections

**What-If Analysis**
- Parameter variation testing
- Break-even scenario identification
- Optimization target setting
- Strategic decision support

### Quality Assurance Checklist

- All assumptions clearly documented and sourced
- Financial statements balance and tie together
- Scenario analysis covers realistic ranges
- Unit economics are positive and improving
- Cash flow projections include working capital
- Model includes sensitivity analysis
- Error checking and validation formulas included
- Executive summary clearly communicates key insights

## Action Items

- [ ] Build three-statement integrated model
- [ ] Implement scenario analysis framework
- [ ] Create unit economics dashboard
- [ ] Validate model with historical data
- [ ] Prepare investor presentation materials`,
        estimatedReadingTime: 105,
        orderIndex: 2,
        published: true,
        week: { connect: { id: week1.id } }
      }
    });

    console.log(`✅ Created lesson: ${week1lesson1.title}`);
    console.log(`✅ Created lesson: ${week1lesson2.title}`);

    // Week 1 Quiz
    const week1Quiz = await prisma.quiz.create({
      data: {
        title: 'Week 1 Quiz: Financial Modeling and Projections',
        description: 'Test your understanding of startup financial modeling, three-statement integration, unit economics, and scenario analysis',
        timeLimit: 30,
        passingScore: 70,
        published: true,
        week: { connect: { id: week1.id } },
        questions: {
          create: [
            {
              questionText: 'What is the most important principle when building startup financial models?',
              questionType: 'multiple-choice',
              options: [
                'Making the most optimistic projections possible',
                'Clearly documenting all assumptions and their sources',
                'Using the most sophisticated modeling software',
                'Copying competitor financial models exactly'
              ],
              correctAnswer: 'Clearly documenting all assumptions and their sources',
              explanation: 'Clear assumption documentation is crucial because it allows investors to understand your reasoning, makes the model updateable, and demonstrates thoughtful analysis rather than wishful thinking.',
              points: 2,
              orderIndex: 1
            },
            {
              questionText: 'In a SaaS financial model, which metric is typically the best predictor of future revenue?',
              questionType: 'multiple-choice',
              options: [
                'Total number of website visitors',
                'Monthly Recurring Revenue (MRR) and churn rate',
                'One-time setup fees',
                'Number of sales calls made'
              ],
              correctAnswer: 'Monthly Recurring Revenue (MRR) and churn rate',
              explanation: 'MRR and churn rate together provide the clearest picture of recurring revenue sustainability and growth potential, which is the foundation of SaaS valuation.',
              points: 2,
              orderIndex: 2
            },
            {
              questionText: 'What is the primary purpose of scenario analysis in startup financial models?',
              questionType: 'multiple-choice',
              options: [
                'To confuse investors with too many options',
                'To show only the best-case scenario',
                'To demonstrate range of possible outcomes and test sensitivity',
                'To make the model look more complex'
              ],
              correctAnswer: 'To demonstrate range of possible outcomes and test sensitivity',
              explanation: 'Scenario analysis helps founders and investors understand the range of possible outcomes, identify key risks and opportunities, and make better strategic decisions.',
              points: 2,
              orderIndex: 3
            },
            {
              questionText: 'Which statement best describes the relationship between Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC)?',
              questionType: 'multiple-choice',
              options: [
                'LTV should be exactly equal to CAC',
                'CAC should be higher than LTV for growth',
                'LTV should be at least 3x higher than CAC',
                'The relationship doesn\'t matter for startups'
              ],
              correctAnswer: 'LTV should be at least 3x higher than CAC',
              explanation: 'A healthy LTV:CAC ratio of 3:1 or higher indicates that you\'re acquiring customers profitably with sufficient margin for other costs and profit. Lower ratios suggest unsustainable unit economics.',
              points: 2,
              orderIndex: 4
            },
            {
              questionText: 'When modeling cash burn rate, which approach provides the most accurate runway calculation?',
              questionType: 'multiple-choice',
              options: [
                'Using average historical burn rate for all future periods',
                'Modeling monthly cash flows with expected changes in burn rate',
                'Assuming burn rate will decrease automatically over time',
                'Using only the current month\'s burn rate'
              ],
              correctAnswer: 'Modeling monthly cash flows with expected changes in burn rate',
              explanation: 'Monthly cash flow modeling accounts for planned changes in hiring, marketing spend, and revenue growth, providing a more accurate picture of future cash needs than simple averages.',
              points: 2,
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log(`✅ Created quiz: ${week1Quiz.title} with ${5} questions`);

    // Week 2: Valuation Methods and Cap Tables
    const week2 = await prisma.week.create({
      data: {
        title: 'Valuation Methods and Cap Tables',
        description: 'Master startup valuation methodologies and understand cap table dynamics essential for fundraising negotiations',
        weekNumber: 2,
        estimatedHours: 8,
        learningObjectives: [
          'Understand different valuation methodologies for startups',
          'Learn to create and manage cap tables effectively',
          'Calculate pre-money and post-money valuations',
          'Analyze dilution and ownership implications',
          'Benchmark valuations against market comparables'
        ],
        published: true,
        course: { connect: { id: course.id } }
      }
    });

    console.log(`✅ Created ${week2.title}`);

    // Week 2 Lessons
    const week2lesson1 = await prisma.lesson.create({
      data: {
        title: 'Startup Valuation Methodologies',
        slug: 'startup-valuation-methodologies',
        content: `# Startup Valuation Methodologies

## Understanding Startup Valuation

Startup valuation is both art and science, combining quantitative analysis with qualitative judgment about market potential, team capability, and execution risk.

### Key Valuation Approaches

**1. Market-Based Valuation (Comparable Analysis)**
- Public company comparables
- Private transaction comparables
- Revenue and EBITDA multiples
- Industry-specific metrics

**2. Income-Based Valuation (DCF Analysis)**
- Discounted Cash Flow modeling
- Terminal value calculations
- Risk-adjusted discount rates
- Growth rate assumptions

**3. Asset-Based Valuation**
- Book value approach
- Liquidation value analysis
- Intellectual property valuation
- Technology asset assessment

### Stage-Specific Valuation Methods

**Pre-Revenue/Seed Stage**
- Team and execution capability
- Market size and opportunity
- Product-market fit indicators
- Competitive positioning

**Early Revenue Stage**
- Revenue multiple approach
- Customer traction metrics
- Unit economics validation
- Growth trajectory analysis

**Growth Stage**
- Multiple financial metrics
- Market penetration analysis
- Scalability demonstration
- Path to profitability

### Market Multiple Analysis

**Software/SaaS Companies**
- Revenue multiples: 5-15x ARR
- EBITDA multiples: 20-40x
- Growth-adjusted metrics
- Recurring revenue premiums

**Marketplace/E-commerce**
- GMV (Gross Merchandise Value) multiples
- Take rate and margin analysis
- Network effect premiums
- User growth metrics

### Venture Capital Method

The VC Method works backwards from expected exit value:

Post-Money Valuation = Terminal Value ÷ Target Return
Pre-Money Valuation = Post-Money - Investment Amount

**Key Components**
- Expected exit value
- Target investor return (5-10x)
- Time to exit assumption
- Risk adjustment factors

### Common Valuation Mistakes

**Overvaluation Risks**
- Unrealistic growth assumptions
- Ignoring competitive threats
- Insufficient market validation
- Team capability overestimation

**Undervaluation Issues**
- Conservative growth modeling
- Insufficient IP value recognition
- Market opportunity underestimation
- Execution capability discounting

## Practical Valuation Exercise

### Case Study: SaaS Startup Valuation

**Company Profile**
- B2B SaaS platform
- $2M ARR, 150% growth
- 95% gross margins
- $500K monthly burn

**Valuation Methods**
1. **Revenue Multiple**: $2M × 8x = $16M
2. **DCF Analysis**: NPV of projected cash flows
3. **Comparable Analysis**: Similar companies 6-10x revenue
4. **VC Method**: Exit value ÷ target return

**Conclusion Range**: $12M - $20M pre-money

## Action Items

- [ ] Research comparable companies in your industry
- [ ] Calculate revenue and user-based multiples
- [ ] Build DCF model for your startup
- [ ] Analyze risk factors and adjustments
- [ ] Prepare valuation range and justification`,
        estimatedReadingTime: 90,
        orderIndex: 1,
        published: true,
        week: { connect: { id: week2.id } }
      }
    });

    const week2lesson2 = await prisma.lesson.create({
      data: {
        title: 'Cap Table Management and Ownership Dynamics',
        slug: 'cap-table-management-ownership-dynamics',
        content: `# Cap Table Management and Ownership Dynamics

## Understanding Capitalization Tables

The cap table is the foundation of startup equity management, tracking ownership percentages, liquidation preferences, and control dynamics throughout the company's lifecycle.

### Cap Table Components

**Equity Securities**
- Common stock (founders, employees)
- Preferred stock (investors)
- Options and warrants
- Convertible securities

**Key Information**
- Number of shares outstanding
- Ownership percentages
- Liquidation preferences
- Voting rights and control

### Pre-Money vs Post-Money Valuation

**Example Calculation**
- Pre-money valuation: $8M
- Investment amount: $2M
- Post-money valuation: $10M
- Investor ownership: $2M ÷ $10M = 20%

### Option Pool Sizing

**Standard Pool Sizes**
- Seed stage: 10-15%
- Series A: 15-20%
- Later stages: 5-10%
- Pool refresh timing

**Allocation Guidelines**
- C-level executives: 0.5-3%
- VP-level: 0.2-1%
- Director/Senior: 0.1-0.5%
- Individual contributors: 0.01-0.2%

### Convertible Securities

**SAFEs (Simple Agreement for Future Equity)**
- Valuation cap mechanisms
- Discount rate provisions
- Most favored nation clauses
- Pro rata investment rights

**Convertible Notes**
- Interest rate and maturity
- Conversion mechanics
- Qualified financing thresholds
- Automatic conversion triggers

### Common Cap Table Mistakes

**Founder Issues**
- Unequal founder splits without vesting
- Insufficient option pool allocation
- Poor advisor equity management
- Lack of acceleration provisions

**Investor Relations**
- Unclear preference terms
- Missing protective provisions
- Inadequate anti-dilution protection
- Poor communication protocols

### Best Practices

**Documentation Standards**
- Clear and consistent terms
- Professional legal drafting
- Regular updates and maintenance
- Transparent communication

**Strategic Planning**
- Future round preparation
- Exit scenario optimization
- Tax efficiency consideration
- Control balance maintenance

## Practical Cap Table Exercise

### Startup Cap Table Creation

**Initial Setup**
- Founders: 80% (vesting over 4 years)
- Option pool: 20% (for future employees)
- Total shares: 10,000,000

**Series A Investment**
- Investment: $3M
- Pre-money: $7M
- Post-money: $10M
- Investor ownership: 30%

**New Cap Table**
- Founders: 56% (80% × 70%)
- Employees: 14% (20% × 70%)
- Series A: 30%

## Action Items

- [ ] Create current cap table for your startup
- [ ] Model multiple funding scenarios
- [ ] Calculate dilution impacts on founders
- [ ] Research market terms for your stage/industry
- [ ] Set up professional cap table management system`,
        estimatedReadingTime: 95,
        orderIndex: 2,
        published: true,
        week: { connect: { id: week2.id } }
      }
    });

    console.log(`✅ Created lesson: ${week2lesson1.title}`);
    console.log(`✅ Created lesson: ${week2lesson2.title}`);

    // Week 2 Quiz
    const week2Quiz = await prisma.quiz.create({
      data: {
        title: 'Week 2 Quiz: Valuation and Cap Table Mastery',
        description: 'Test your understanding of startup valuation methods, cap table dynamics, and ownership calculations',
        timeLimit: 30,
        passingScore: 70,
        published: true,
        week: { connect: { id: week2.id } },
        questions: {
          create: [
            {
              questionText: 'A startup has a pre-money valuation of $12M and raises $3M. What is the investor\'s ownership percentage?',
              questionType: 'multiple-choice',
              options: [
                '20%',
                '25%',
                '30%',
                '33%'
              ],
              correctAnswer: '20%',
              explanation: 'Post-money valuation = $12M + $3M = $15M. Investor ownership = $3M ÷ $15M = 20%. The investor owns 20% of the company after the investment.',
              points: 2,
              orderIndex: 1
            },
            {
              questionText: 'Which valuation method is most appropriate for a pre-revenue startup with strong team and large market opportunity?',
              questionType: 'multiple-choice',
              options: [
                'Discounted Cash Flow (DCF)',
                'Revenue multiple analysis',
                'Venture Capital Method combined with market comparables',
                'Asset-based valuation'
              ],
              correctAnswer: 'Venture Capital Method combined with market comparables',
              explanation: 'For pre-revenue startups, the VC method (working backward from exit value) combined with market comparables provides the most relevant framework since there\'s no revenue to analyze and limited cash flows to discount.',
              points: 2,
              orderIndex: 2
            },
            {
              questionText: 'What is the typical size of the employee option pool for a Series A startup?',
              questionType: 'multiple-choice',
              options: [
                '5-10%',
                '15-20%',
                '25-30%',
                '35-40%'
              ],
              correctAnswer: '15-20%',
              explanation: 'Series A startups typically reserve 15-20% of the company for employee stock options to attract and retain key talent during the growth phase.',
              points: 2,
              orderIndex: 3
            },
            {
              questionText: 'What does a 1x liquidation preference mean for preferred shareholders?',
              questionType: 'multiple-choice',
              options: [
                'They get paid back 1x their investment before common shareholders',
                'They get 1% additional dividend annually',
                'They have 1x voting rights per share',
                'They can convert to 1x common shares'
              ],
              correctAnswer: 'They get paid back 1x their investment before common shareholders',
              explanation: 'A 1x liquidation preference means preferred shareholders receive their original investment amount back before any proceeds are distributed to common shareholders in a liquidity event.',
              points: 2,
              orderIndex: 4
            },
            {
              questionText: 'How does weighted average anti-dilution protection work?',
              questionType: 'multiple-choice',
              options: [
                'It prevents any future dilution of investor ownership',
                'It adjusts the conversion price based on the weighted average of new and old prices',
                'It guarantees investors maintain exactly the same ownership percentage',
                'It only applies to down rounds below 50% of previous valuation'
              ],
              correctAnswer: 'It adjusts the conversion price based on the weighted average of new and old prices',
              explanation: 'Weighted average anti-dilution adjusts the preferred stock conversion price based on both the price and size of the new issuance, providing partial protection against dilution in down rounds.',
              points: 2,
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log(`✅ Created quiz: ${week2Quiz.title} with ${5} questions`);

    console.log('🎉 Successfully created Course 11: Startup Finance and Fundraising!');
    console.log(`📊 Course includes:`);
    console.log(`   • 2 weeks of content`);
    console.log(`   • 4 comprehensive lessons`);
    console.log(`   • 2 knowledge assessment quizzes`);
    console.log(`   • 48 hours of fundraising education`);
    console.log(`   • Advanced-level content for startup founders`);

  } catch (error) {
    console.error('❌ Error creating Course 11:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
main()
  .then(() => {
    console.log('✅ Course 11 creation completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Course 11 creation failed:', error);
    process.exit(1);
  });