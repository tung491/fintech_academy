const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createCourse11() {
  console.log('🚀 Creating Course 11: Startup Finance and Fundraising...');

  try {
    // Create instructor
    const instructor = await prisma.instructor.upsert({
      where: { id: 11 },
      update: {},
      create: {
        id: 11,
        name: "Robert Chen",
        title: "Serial Entrepreneur & Former VC Partner",
        bio: "Robert Chen is a serial entrepreneur and former partner at Andreessen Horowitz with 15+ years of experience in startup finance and fundraising. He has led over 50 investment deals totaling $500M+ and founded three successful startups, including one unicorn exit. Robert holds an MBA from Stanford GSB and serves as an advisor to numerous high-growth startups.",
        profileImage: "/api/placeholder/150/150",
        credentials: ["MBA Stanford Graduate School of Business", "Former Partner at Andreessen Horowitz", "3x Successful Entrepreneur", "50+ Investment Deals ($500M+)"],
        expertise: ["Startup Fundraising", "Financial Modeling", "Valuation", "Term Sheet Negotiation", "VC Relations", "Growth Finance"]
      }
    });

    // Create course category  
    const category = await prisma.category.upsert({
      where: { name: "Advanced Finance" },
      update: {},
      create: {
        name: "Advanced Finance",
        description: "Advanced financial strategies for scaling businesses and raising capital"
      }
    });

    // Create course
    const course = await prisma.course.upsert({
      where: { id: 11 },
      update: {},
      create: {
        id: 11,
        title: "Startup Finance and Fundraising",
        description: "Master the complete startup fundraising process from financial modeling to post-funding management. Learn valuation methods, navigate the VC ecosystem, negotiate term sheets, and manage investor relations. Essential for founders ready to raise capital.",
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
        thumbnailUrl: "/api/placeholder/400/250",
        weekCount: 6,
        totalHours: 48,
        difficulty: "Advanced",
        price: 297,
        published: true,
        featured: true,
        instructorId: instructor.id,
        categoryId: category.id
      }
    });

    console.log(`✅ Course created: ${course.title}`);

    // Week 1: Financial Modeling and Projections
    const week1 = await prisma.week.create({
      data: {
        weekNumber: 1,
        title: "Financial Modeling and Projections",
        description: "Build professional financial models that attract investors and accurately project your startup's growth trajectory.",
        learningObjectives: [
          "Understand the key components of startup financial models",
          "Build comprehensive 3-statement financial models",
          "Create compelling revenue projections and unit economics",
          "Model different growth scenarios and sensitivities",
          "Present financial projections effectively to investors"
        ],
        estimatedHours: 8,
        orderIndex: 1,
        courseId: course.id,
        published: true
      }
    });

    // Week 1 Lessons
    await prisma.lesson.createMany({
      data: [
        {
          title: "Foundation of Startup Financial Modeling",
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
          slug: "foundation-startup-financial-modeling",
          weekId: week1.id,
          orderIndex: 1,
          estimatedMinutes: 75,
          published: true
        },
        {
          title: "Advanced Financial Model Architecture",
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
          slug: "advanced-financial-model-architecture",
          weekId: week1.id,
          orderIndex: 2,
          estimatedMinutes: 105,
          published: true
        }
      ]
    });

    // Week 1 Quiz
    await prisma.quiz.create({
      data: {
        title: "Financial Modeling and Projections Mastery",
        description: "Test your understanding of startup financial modeling, three-statement integration, unit economics, and scenario analysis.",
        weekId: week1.id,
        timeLimit: 30,
        passingScore: 70,
        questions: {
          create: [
            {
              questionText: "What is the most important principle when building startup financial models?",
              questionType: "multiple-choice",
              options: [
                "Making the most optimistic projections possible",
                "Clearly documenting all assumptions and their sources",
                "Using the most sophisticated modeling software",
                "Copying competitor financial models exactly"
              ],
              correctAnswer: "Clearly documenting all assumptions and their sources",
              explanation: "Clear assumption documentation is crucial because it allows investors to understand your reasoning, makes the model updateable, and demonstrates thoughtful analysis rather than wishful thinking.",
              orderIndex: 1
            },
            {
              questionText: "In a SaaS financial model, which metric is typically the best predictor of future revenue?",
              questionType: "multiple-choice",
              options: [
                "Total number of website visitors",
                "Monthly Recurring Revenue (MRR) and churn rate",
                "One-time setup fees",
                "Number of sales calls made"
              ],
              correctAnswer: "Monthly Recurring Revenue (MRR) and churn rate",
              explanation: "MRR and churn rate together provide the clearest picture of recurring revenue sustainability and growth potential, which is the foundation of SaaS valuation.",
              orderIndex: 2
            },
            {
              questionText: "What is the primary purpose of scenario analysis in startup financial models?",
              questionType: "multiple-choice",
              options: [
                "To confuse investors with too many options",
                "To show only the best-case scenario",
                "To demonstrate range of possible outcomes and test sensitivity",
                "To make the model look more complex"
              ],
              correctAnswer: "To demonstrate range of possible outcomes and test sensitivity",
              explanation: "Scenario analysis helps founders and investors understand the range of possible outcomes, identify key risks and opportunities, and make better strategic decisions.",
              orderIndex: 3
            },
            {
              questionText: "Which statement best describes the relationship between Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC)?",
              questionType: "multiple-choice",
              options: [
                "LTV should be exactly equal to CAC",
                "CAC should be higher than LTV for growth",
                "LTV should be at least 3x higher than CAC",
                "The relationship doesn't matter for startups"
              ],
              correctAnswer: "LTV should be at least 3x higher than CAC",
              explanation: "A healthy LTV:CAC ratio of 3:1 or higher indicates that you're acquiring customers profitably with sufficient margin for other costs and profit. Lower ratios suggest unsustainable unit economics.",
              orderIndex: 4
            },
            {
              questionText: "When modeling cash burn rate, which approach provides the most accurate runway calculation?",
              questionType: "multiple-choice",
              options: [
                "Using average historical burn rate for all future periods",
                "Modeling monthly cash flows with expected changes in burn rate",
                "Assuming burn rate will decrease automatically over time",
                "Using only the current month's burn rate"
              ],
              correctAnswer: "Modeling monthly cash flows with expected changes in burn rate",
              explanation: "Monthly cash flow modeling accounts for planned changes in hiring, marketing spend, and revenue growth, providing a more accurate picture of future cash needs than simple averages.",
              orderIndex: 5
            }
          ]
        },
        published: true
      }
    });

    // Week 2: Valuation Methods and Cap Tables
    const week2 = await prisma.week.create({
      data: {
        weekNumber: 2,
        title: "Valuation Methods and Cap Tables",
        description: "Master startup valuation methodologies and understand cap table dynamics essential for fundraising negotiations.",
        learningObjectives: [
          "Understand different valuation methodologies for startups",
          "Learn to create and manage cap tables effectively", 
          "Calculate pre-money and post-money valuations",
          "Analyze dilution and ownership implications",
          "Benchmark valuations against market comparables"
        ],
        estimatedHours: 8,
        orderIndex: 2,
        courseId: course.id,
        published: true
      }
    });

    // Week 2 Lessons
    await prisma.lesson.createMany({
      data: [
        {
          title: "Startup Valuation Methodologies",
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
          slug: "startup-valuation-methodologies",
          weekId: week2.id,
          orderIndex: 1,
          estimatedMinutes: 90,
          published: true
        },
        {
          title: "Cap Table Management and Ownership Dynamics",
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
          slug: "cap-table-management-ownership-dynamics",
          weekId: week2.id,
          orderIndex: 2,
          estimatedMinutes: 95,
          published: true
        }
      ]
    });

    // Week 2 Quiz  
    await prisma.quiz.create({
      data: {
        title: "Valuation and Cap Table Mastery",
        description: "Test your understanding of startup valuation methods, cap table dynamics, and ownership calculations.",
        weekId: week2.id,
        timeLimit: 30,
        passingScore: 70,
        questions: {
          create: [
            {
              questionText: "A startup has a pre-money valuation of $12M and raises $3M. What is the investor's ownership percentage?",
              questionType: "multiple-choice",
              options: [
                "20%",
                "25%",
                "30%", 
                "33%"
              ],
              correctAnswer: "20%",
              explanation: "Post-money valuation = $12M + $3M = $15M. Investor ownership = $3M ÷ $15M = 20%. The investor owns 20% of the company after the investment.",
              orderIndex: 1
            },
            {
              questionText: "Which valuation method is most appropriate for a pre-revenue startup with strong team and large market opportunity?",
              questionType: "multiple-choice",
              options: [
                "Discounted Cash Flow (DCF)",
                "Revenue multiple analysis",
                "Venture Capital Method combined with market comparables",
                "Asset-based valuation"
              ],
              correctAnswer: "Venture Capital Method combined with market comparables",
              explanation: "For pre-revenue startups, the VC method (working backward from exit value) combined with market comparables provides the most relevant framework since there's no revenue to analyze and limited cash flows to discount.",
              orderIndex: 2
            },
            {
              questionText: "What is the typical size of the employee option pool for a Series A startup?",
              questionType: "multiple-choice",
              options: [
                "5-10%",
                "15-20%",
                "25-30%",
                "35-40%"
              ],
              correctAnswer: "15-20%",
              explanation: "Series A startups typically reserve 15-20% of the company for employee stock options to attract and retain key talent during the growth phase.",
              orderIndex: 3
            },
            {
              questionText: "What does a 1x liquidation preference mean for preferred shareholders?",
              questionType: "multiple-choice",
              options: [
                "They get paid back 1x their investment before common shareholders",
                "They get 1% additional dividend annually",
                "They have 1x voting rights per share",
                "They can convert to 1x common shares"
              ],
              correctAnswer: "They get paid back 1x their investment before common shareholders",
              explanation: "A 1x liquidation preference means preferred shareholders receive their original investment amount back before any proceeds are distributed to common shareholders in a liquidity event.",
              orderIndex: 4
            },
            {
              questionText: "How does weighted average anti-dilution protection work?",
              questionType: "multiple-choice",
              options: [
                "It prevents any future dilution of investor ownership",
                "It adjusts the conversion price based on the weighted average of new and old prices",
                "It guarantees investors maintain exactly the same ownership percentage",
                "It only applies to down rounds below 50% of previous valuation"
              ],
              correctAnswer: "It adjusts the conversion price based on the weighted average of new and old prices",
              explanation: "Weighted average anti-dilution adjusts the preferred stock conversion price based on both the price and size of the new issuance, providing partial protection against dilution in down rounds.",
              orderIndex: 5
            }
          ]
        },
        published: true
      }
    });

    // Additional weeks 3-6 can be added following the same pattern
    console.log('✅ Course 11: Startup Finance and Fundraising created successfully!');
    console.log('📚 Course includes:');
    console.log('   • 2 weeks completed with comprehensive content');
    console.log('   • 4 professional lessons');
    console.log('   • Weekly assessment quizzes');
    console.log('   • Expert instructor: Robert Chen');
    console.log('   • Target: Startup founders');
    console.log('   • Duration: 48 hours planned');

  } catch (error) {
    console.error('❌ Error creating Course 11:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  createCourse11()
    .then(() => {
      console.log('✅ Course 11 creation completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Course 11 creation failed:', error);
      process.exit(1);
    });
}

module.exports = createCourse11;