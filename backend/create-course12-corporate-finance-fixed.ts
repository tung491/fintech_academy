import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse12() {
  console.log('🚀 Creating Course 12: Corporate Finance for Scale-ups...');

  try {
    // Check if course already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug: 'corporate-finance-scale-ups' }
    });

    if (existingCourse) {
      console.log('⚠️ Course 12 already exists. Skipping creation.');
      return;
    }

    // Find or create Advanced Finance category
    let advancedFinanceCategory = await prisma.courseCategory.findUnique({
      where: { slug: 'advanced-finance' }
    });

    if (!advancedFinanceCategory) {
      advancedFinanceCategory = await prisma.courseCategory.create({
        data: {
          name: 'Advanced Finance',
          slug: 'advanced-finance',
          description: 'Advanced financial strategies for scaling businesses and raising capital',
          color: '#8B5CF6',
          icon: 'trending-up',
          orderIndex: 4,
          isActive: true
        }
      });
      console.log('✅ Created Advanced Finance category');
    } else {
      console.log('✅ Using existing Advanced Finance category');
    }

    // Create Course 12: Corporate Finance for Scale-ups
    const course12 = await prisma.course.create({
      data: {
        title: 'Corporate Finance for Scale-ups',
        slug: 'corporate-finance-scale-ups',
        description: 'Master advanced corporate finance for growing tech companies from Series A to IPO. Learn FP&A, budget management, working capital optimization, debt financing, and public company preparation.',
        shortDescription: 'Advanced corporate finance for Series A+ tech companies',
        categoryId: advancedFinanceCategory.id,
        level: 'advanced',
        duration: '5 weeks',
        estimatedHours: 40,
        price: 297,
        originalPrice: 397,
        instructor: 'Patricia Williams',
        instructorBio: 'Former CFO & Corporate Finance Expert with 20+ years of experience scaling tech companies from Series A to IPO. As former CFO of three successful tech companies (including two IPOs), Patricia has deep expertise in corporate finance, FP&A, and public company requirements. She holds an MBA from Wharton and CPA certification.',
        thumbnailUrl: '/api/placeholder/400/250',
        orderIndex: 12,
        isPublished: true,
        isFeatured: true,
        skillsLearned: 'FP&A processes, Budget management, Working capital optimization, Debt financing, IPO preparation, Public company finance',
        targetAudience: 'Finance teams at Series A+ tech companies, CFOs and finance leaders, Controllers and FP&A professionals, Entrepreneurs preparing for growth capital'
      }
    });

    console.log(`✅ Course created: ${course12.title}`);

    // Week 1: Financial Planning and Analysis (FP&A)
    const week1 = await prisma.week.create({
      data: {
        courseId: course12.id,
        weekNumber: 1,
        title: 'Financial Planning and Analysis (FP&A)',
        overview: 'Build comprehensive FP&A processes, create financial models for decision-making, and establish reporting systems for scaling tech companies.',
        learningObjectives: JSON.stringify([
          'Understand the role of FP&A in scaling organizations',
          'Build comprehensive financial planning processes',
          'Create dynamic financial models for decision support',
          'Establish KPI frameworks and reporting systems',
          'Implement scenario planning and sensitivity analysis'
        ]),
        estimatedHours: 8
      }
    });

    // Week 1 Lessons
    await prisma.lesson.createMany({
      data: [
        {
          weekId: week1.id,
          title: 'Building FP&A Foundations for Scale-ups',
          slug: 'building-fpa-foundations-scale-ups',
          content: `# Building FP&A Foundations for Scale-ups

## The Strategic Role of FP&A in Growing Tech Companies

Financial Planning and Analysis (FP&A) transforms from a support function to a strategic driver as tech companies scale from Series A through IPO. This lesson establishes the foundation for building world-class FP&A capabilities.

### Understanding FP&A Evolution by Stage

**Series A Stage (10-50 employees)**
- Basic financial reporting and cash management
- Simple budget creation and tracking
- Founder-led financial decision making
- Limited financial systems and processes
- Focus on runway extension and growth metrics

**Series B/C Stage (50-200 employees)**
- Dedicated FP&A function establishment
- Advanced financial modeling and forecasting
- Board-level financial reporting and analysis
- Department-level budget management
- Investor reporting and compliance

**Pre-IPO/Growth Stage (200+ employees)**
- Sophisticated FP&A organization
- Real-time financial analytics and dashboards
- Complex scenario modeling and planning
- Integration with operational systems
- Public company reporting preparation

### Core FP&A Functions

**1. Financial Planning**
- Annual operating plans and budgets
- Long-term strategic planning (3-5 years)
- Scenario analysis and contingency planning
- Capital allocation and investment decisions
- Resource planning and headcount modeling

**2. Performance Analysis**
- Variance analysis and explanations
- KPI monitoring and trend analysis
- Business driver identification and tracking
- Competitive benchmarking and analysis
- Root cause analysis of performance gaps

**3. Forecasting and Projections**
- Rolling forecasts (quarterly/monthly updates)
- Cash flow projections and management
- Revenue and expense modeling
- Seasonal and cyclical pattern analysis
- Risk-adjusted probability modeling

**4. Decision Support**
- Investment evaluation and ROI analysis
- Pricing strategy and margin analysis
- Make-vs-buy and build-vs-partner decisions
- Market entry and expansion analysis
- M&A financial modeling and integration

### Building Your FP&A Team

**Organizational Structure**

**Small Team (1-3 people):**
- FP&A Manager/Director (generalist)
- Financial Analyst (modeling focus)
- Part-time Controller support

**Medium Team (4-8 people):**
- VP/Director of FP&A
- Senior Manager FP&A
- Financial Analysts (2-3)
- Business Intelligence Analyst
- FP&A Operations Specialist

**Large Team (8+ people):**
- VP Finance & Strategy
- Director FP&A
- Senior Managers (Revenue, OpEx, Strategic)
- Financial Analysts (specialized by function)
- Business Intelligence team
- Corporate Development support

### Key Takeaways

- FP&A evolves from basic reporting to strategic decision-making as companies scale
- Technology stack and automation become critical for efficiency and accuracy
- Team structure should match company stage and complexity
- Focus on business drivers and forward-looking insights rather than just historical reporting
- Strong FP&A capabilities enable better capital allocation and strategic planning

FP&A excellence provides competitive advantage through better decision-making, resource allocation, and strategic planning for scaling tech companies.`,
          orderIndex: 1,
          durationMinutes: 90
        },
        {
          weekId: week1.id,
          title: 'Advanced Financial Modeling for Corporate Decision Making',
          slug: 'advanced-financial-modeling-corporate-decisions',
          content: `# Advanced Financial Modeling for Corporate Decision Making

## Strategic Financial Models for Scaling Organizations

Corporate financial modeling for scale-ups requires sophisticated approaches that can handle complex business dynamics, multiple scenarios, and strategic decision support at the executive level.

### Corporate Model Architecture

**Integrated Planning Model Structure**
- Executive Summary Dashboard
- Revenue Planning Module
- Headcount and Compensation Planning
- Expense Planning by Department
- Capital Expenditure Planning
- Cash Flow and Working Capital
- Scenario Analysis Framework
- Sensitivity Testing Tools

### Revenue Modeling for Complex Businesses

**Multi-Product Revenue Streams**

**SaaS Product Lines**
- Product A Revenue = Customers × Price × (1 - Churn Rate)
- Product B Revenue = Usage × Unit Price × Growth Factor
- Product C Revenue = Seats × Price per Seat × Expansion Rate

**Revenue Recognition Complexity**
- ASC 606 compliance for multi-element arrangements
- Deferred revenue calculation and tracking
- Professional services vs. product revenue
- International revenue recognition standards
- Performance obligation allocation

### Operating Expense Modeling

**Headcount Planning Sophistication**

**Department-Level Modeling**
- Role-based hiring plans with ramp times
- Geographic compensation variations
- Equity compensation dilution impact
- Benefits and tax burden calculations
- Contractor vs. employee cost analysis

**Sales Team Modeling**
- Sales Headcount = (Revenue Target ÷ Average Rep Productivity)
- Ramping Factor = (% of Reps at Full Productivity)
- Total Capacity = (Mature Reps × Full Quota) + (Ramping Reps × Partial Quota)

### Advanced Modeling Techniques

**Monte Carlo Simulation**
- Revenue range probability analysis
- Cost uncertainty quantification
- Cash flow risk assessment
- Investment return distributions
- Strategic option valuation

**Technology and Tools**

**Enterprise Planning Platforms**
- Anaplan: Advanced modeling and scenario analysis
- Adaptive Insights: Integrated planning and reporting
- Pigment: Modern FP&A platform with collaboration
- Oracle Planning: Enterprise-scale planning suite

### Key Takeaways

- Integrated planning models enable sophisticated decision-making
- Multi-dimensional scenario analysis provides strategic insights
- Technology platforms are essential for scalable financial modeling
- Driver-based models adapt better to changing business dynamics
- Model governance and validation ensure accuracy and reliability

Advanced financial modeling transforms business intuition into quantified analysis, enabling developer entrepreneurs to build more valuable, resilient businesses through data-driven decision-making.`,
          orderIndex: 2,
          durationMinutes: 95
        }
      ]
    });

    // Week 1 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'FP&A Foundations and Financial Modeling',
        description: 'Test your understanding of FP&A processes, organizational structure, and advanced financial modeling for corporate decision making.',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 30,
        questions: {
          create: [
            {
              questionText: 'What is the primary role of FP&A in Series B/C stage companies compared to Series A?',
              questionType: 'multiple-choice',
              options: JSON.stringify([
                'Basic cash management and simple budgets',
                'Dedicated FP&A function with advanced modeling and board reporting',
                'Founder-led financial decisions only',
                'Focus solely on fundraising support'
              ]),
              correctAnswer: 'Dedicated FP&A function with advanced modeling and board reporting',
              explanation: 'Series B/C companies establish dedicated FP&A functions with advanced modeling, forecasting, board-level reporting, and department-level budget management, moving beyond the basic financial management of Series A stage.',
              orderIndex: 1
            },
            {
              questionText: 'Which technology is most essential for building scalable FP&A processes?',
              questionType: 'multiple-choice',
              options: JSON.stringify([
                'Basic Excel spreadsheets only',
                'Planning software integrated with BI/Analytics platforms',
                'Manual reporting processes',
                'Simple accounting software'
              ]),
              correctAnswer: 'Planning software integrated with BI/Analytics platforms',
              explanation: 'Scalable FP&A requires planning software (Anaplan, Adaptive) integrated with BI platforms (Tableau, Looker) to handle complex modeling, real-time data, and automated reporting.',
              orderIndex: 2
            },
            {
              questionText: 'What is the "Rule of 40" metric used to evaluate?',
              questionType: 'multiple-choice',
              options: JSON.stringify([
                'Customer acquisition cost efficiency',
                'Overall business health combining growth rate and profit margin',
                'Employee productivity ratios',
                'Working capital management'
              ]),
              correctAnswer: 'Overall business health combining growth rate and profit margin',
              explanation: 'The Rule of 40 states that a company\'s growth rate plus profit margin should exceed 40%, providing a balanced view of growth efficiency and profitability for tech scale-ups.',
              orderIndex: 3
            }
          ]
        }
      }
    });

    // Week 2: Budget Creation and Variance Analysis
    const week2 = await prisma.week.create({
      data: {
        courseId: course12.id,
        weekNumber: 2,
        title: 'Budget Creation and Variance Analysis',
        overview: 'Master comprehensive budgeting processes, variance analysis techniques, and performance management systems for scaling tech companies.',
        learningObjectives: JSON.stringify([
          'Develop comprehensive budgeting frameworks and processes',
          'Implement zero-based and driver-based budgeting methods',
          'Create sophisticated variance analysis and reporting systems',
          'Build rolling forecast processes and dynamic planning',
          'Establish budget governance and accountability frameworks'
        ]),
        estimatedHours: 8
      }
    });

    // Week 3: Working Capital Management
    const week3 = await prisma.week.create({
      data: {
        courseId: course12.id,
        weekNumber: 3,
        title: 'Working Capital Management',
        overview: 'Optimize working capital, cash flow, and liquidity management for scaling operations and sustainable growth.',
        learningObjectives: JSON.stringify([
          'Master working capital components and optimization strategies',
          'Implement advanced cash flow forecasting and management',
          'Develop accounts receivable and payable optimization systems',
          'Create inventory and supply chain finance strategies',
          'Build liquidity management and short-term financing frameworks'
        ]),
        estimatedHours: 8
      }
    });

    // Week 4: Debt Financing and Credit Facilities
    const week4 = await prisma.week.create({
      data: {
        courseId: course12.id,
        weekNumber: 4,
        title: 'Debt Financing and Credit Facilities',
        overview: 'Navigate debt financing options, structure credit facilities, and optimize capital structure for growth and operational efficiency.',
        learningObjectives: JSON.stringify([
          'Understand various debt financing options for tech companies',
          'Structure and negotiate optimal credit facility terms',
          'Implement debt covenant management and compliance systems',
          'Develop capital structure optimization strategies',
          'Create debt capacity planning and refinancing frameworks'
        ]),
        estimatedHours: 8
      }
    });

    // Week 5: IPO Preparation and Public Company Requirements
    const week5 = await prisma.week.create({
      data: {
        courseId: course12.id,
        weekNumber: 5,
        title: 'IPO Preparation and Public Company Requirements',
        overview: 'Master IPO readiness requirements, public company financial reporting, and compliance frameworks for scaling to public markets.',
        learningObjectives: JSON.stringify([
          'Understand IPO readiness requirements and preparation timeline',
          'Implement public company financial reporting standards',
          'Develop SOX compliance and internal control frameworks',
          'Master investor relations and public market communication',
          'Create post-IPO corporate governance and compliance systems'
        ]),
        estimatedHours: 8
      }
    });

    // Add simplified lessons for weeks 2-5 to complete the structure
    await prisma.lesson.createMany({
      data: [
        // Week 2 Lessons
        {
          weekId: week2.id,
          title: 'Strategic Budget Planning and Development',
          slug: 'strategic-budget-planning-development',
          content: `# Strategic Budget Planning and Development

## Advanced Budgeting for Scaling Tech Companies

Strategic budgeting transforms from simple expense tracking to comprehensive resource allocation and performance management as tech companies scale. This lesson covers sophisticated budgeting methodologies essential for corporate finance excellence.

### Budgeting Methodologies

**Zero-Based Budgeting (ZBB)**
- Start from zero for each budget cycle
- Justify every expense and investment
- Link spending to strategic priorities
- Challenge existing assumptions
- Focus on value creation and ROI

**Driver-Based Budgeting**
- Identify key business and operational drivers
- Establish relationships between drivers and costs
- Create driver-based budget formulas
- Build scenario models based on driver changes

### Budget Components

**Revenue Planning**
- Sales team capacity modeling
- Marketing investment planning
- Product development budgeting

**Operating Expense Categories**
- People costs (60-70% of total)
- Technology costs (15-25% of total)  
- Facilities and operations (5-15% of total)

### Key Takeaways

- Zero-based budgeting forces strategic thinking and eliminates ineffective spending
- Driver-based models adapt better to changing business conditions
- Technology platforms enable sophisticated budgeting and scenario analysis
- Regular budget reviews and updates improve accuracy and relevance`,
          orderIndex: 1,
          durationMinutes: 90
        },
        // Week 3 Lessons
        {
          weekId: week3.id,
          title: 'Working Capital Optimization Strategies',
          slug: 'working-capital-optimization-strategies',
          content: `# Working Capital Optimization Strategies

## Strategic Working Capital Management for Scaling Tech Companies

Working capital management becomes increasingly critical as tech companies scale, impacting cash flow, growth funding requirements, and operational efficiency.

### Working Capital Components

**Working Capital Formula**
- Working Capital = Current Assets - Current Liabilities
- Cash Conversion Cycle = DSO + DIO - DPO

### Optimization Strategies

**Accounts Receivable Optimization**
- Credit policy and terms management
- Collection strategy framework
- Invoice financing and factoring

**Accounts Payable Optimization**
- Vendor relationship management
- Payment terms negotiation
- Supply chain finance programs

### Key Takeaways

- Optimizing the cash conversion cycle improves cash flow and reduces financing needs
- Technology enables automated collections and payment optimization
- Strategic supplier relationships can extend payment terms while maintaining partnerships
- Working capital optimization directly impacts growth funding requirements`,
          orderIndex: 1,
          durationMinutes: 85
        },
        // Week 4 Lessons
        {
          weekId: week4.id,
          title: 'Debt Financing Strategies and Structuring',
          slug: 'debt-financing-strategies-structuring',
          content: `# Debt Financing Strategies and Structuring

## Strategic Debt Financing for Scaling Tech Companies

Debt financing becomes increasingly important as tech companies scale, offering growth capital without equity dilution while building corporate credit profiles.

### Types of Debt Financing

**Traditional Bank Lending**
- Term loans for specific purposes
- Lines of credit for operational flexibility
- Asset-based lending
- SBA lending with government guarantees

**Alternative Financing**
- Revenue-based financing
- Venture debt from specialized lenders
- Marketplace lending
- Invoice factoring and receivable financing

### Credit Facility Structuring

**Revolving Credit Facilities**
- Available credit that can be borrowed and repaid
- Interest charged only on outstanding balances
- Financial covenant requirements

**Term Loans**
- Fixed principal with scheduled repayments
- Fixed vs. floating interest rates
- Security requirements and collateral

### Key Takeaways

- Debt financing preserves equity while providing growth capital
- Credit facility structure should match business cash flow patterns
- Covenant compliance requires ongoing monitoring and management
- Building banking relationships early enables better terms and flexibility`,
          orderIndex: 1,
          durationMinutes: 80
        },
        // Week 5 Lessons
        {
          weekId: week5.id,
          title: 'IPO Readiness and Preparation Framework',
          slug: 'ipo-readiness-preparation-framework',
          content: `# IPO Readiness and Preparation Framework

## Strategic IPO Preparation for Tech Companies

IPO preparation requires comprehensive organizational, financial, and operational readiness typically taking 2-3 years to complete effectively.

### IPO Readiness Assessment

**Financial Readiness Criteria**
- Revenue scale and growth trajectory ($100M+ ARR typical)
- Profitability path and margin demonstration
- Financial reporting systems and controls
- Revenue predictability and visibility

**Organizational Readiness**
- Public company leadership team
- Board composition and independence
- Corporate governance structure
- Risk management and compliance systems

### SOX Compliance Framework

**Internal Control Requirements**
- Internal control over financial reporting (ICFR)
- Management assessment and testing
- External auditor attestation
- Ongoing monitoring and maintenance

### Post-IPO Considerations

**Public Company Operations**
- Quarterly earnings process and calls
- Investor relations and communication
- SEC reporting and disclosure requirements
- Corporate governance and compliance

### Key Takeaways

- IPO preparation requires 2-3 years of systematic organizational development
- SOX compliance and internal controls are critical foundation elements
- Public company governance requires board independence and oversight
- Investor relations becomes a strategic capability for public companies`,
          orderIndex: 1,
          durationMinutes: 85
        }
      ]
    });

    // Add quizzes for remaining weeks
    await prisma.quiz.createMany({
      data: [
        {
          weekId: week2.id,
          title: 'Budget Planning and Variance Analysis',
          description: 'Test your understanding of strategic budgeting methods and variance analysis techniques.',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 30
        },
        {
          weekId: week3.id,
          title: 'Working Capital and Cash Flow Management',
          description: 'Test your understanding of working capital optimization and cash flow management strategies.',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 30
        },
        {
          weekId: week4.id,
          title: 'Debt Financing and Credit Facilities',
          description: 'Test your understanding of debt financing strategies and credit facility management.',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 30
        },
        {
          weekId: week5.id,
          title: 'IPO Preparation and Public Company Requirements',
          description: 'Test your understanding of IPO readiness and public company governance requirements.',
          passingScore: 70,
          maxAttempts: 3,
          timeLimitMinutes: 30
        }
      ]
    });

    console.log('🎉 Course 12: Corporate Finance for Scale-ups created successfully!');
    console.log(`📚 Course includes:`);
    console.log(`   • 5 comprehensive weeks`);
    console.log(`   • 6 professional lessons (Week 1 fully developed, others with foundation content)`);
    console.log(`   • 5 assessment quizzes`);
    console.log(`   • Expert instructor: Patricia Williams`);
    console.log(`   • Target: Series A+ tech companies`);
    console.log(`   • Duration: 40 hours total`);

  } catch (error) {
    console.error('❌ Error creating Course 12:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  createCourse12()
    .then(() => {
      console.log('✅ Course 12 creation completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Course 12 creation failed:', error);
      process.exit(1);
    });
}

export default createCourse12;