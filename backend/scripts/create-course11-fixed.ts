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
        instructor: 'Robert Chen, Serial Entrepreneur & Former VC Partner',
        instructorBio: 'Robert Chen is a serial entrepreneur and former partner at Andreessen Horowitz with 15+ years of experience in startup finance and fundraising. He has led over 50 investment deals totaling $500M+ and founded three successful startups, including one unicorn exit. Robert holds an MBA from Stanford GSB.',
        isPublished: true,
        isFeatured: true,
        orderIndex: 10 // This is the 11th course (0-indexed)
      },
      create: {
        title: 'Startup Finance and Fundraising',
        description: 'Master the complete startup fundraising process from financial modeling to post-funding management',
        slug: 'startup-finance-fundraising',
        price: 297.00,
        originalPrice: 397.00,
        estimatedHours: 48,
        level: 'advanced',
        duration: '6 weeks',
        targetAudience: 'Startup founders preparing to raise seed, Series A, or growth rounds, entrepreneurs planning to understand the fundraising process, and business owners considering venture capital funding options',
        instructor: 'Robert Chen, Serial Entrepreneur & Former VC Partner',
        instructorBio: 'Robert Chen is a serial entrepreneur and former partner at Andreessen Horowitz with 15+ years of experience in startup finance and fundraising. He has led over 50 investment deals totaling $500M+ and founded three successful startups, including one unicorn exit. Robert holds an MBA from Stanford GSB.',
        isPublished: true,
        isFeatured: true,
        orderIndex: 10 // This is the 11th course (0-indexed)
      }
    });

    console.log(`✅ Created/updated course: ${course.title}`);

    // Clean up existing weeks and related data for this course
    console.log('🧹 Cleaning up existing course data...');
    await prisma.week.deleteMany({
      where: { courseId: course.id }
    });
    console.log('✅ Cleaned up existing weeks and related data');

    // Create 6 weeks
    const weeks = [
      {
        weekNumber: 1,
        title: 'Financial Modeling and Projections',
        overview: 'Build professional financial models that attract investors and accurately project your startup\'s growth trajectory',
        learningObjectives: 'Understand the key components of startup financial models; Build comprehensive 3-statement financial models; Create compelling revenue projections and unit economics; Model different growth scenarios and sensitivities; Present financial projections effectively to investors'
      },
      {
        weekNumber: 2,
        title: 'Valuation Methods and Cap Tables',
        overview: 'Master startup valuation methodologies and understand cap table dynamics essential for fundraising negotiations',
        learningObjectives: 'Understand different valuation methodologies for startups; Learn to create and manage cap tables effectively; Calculate pre-money and post-money valuations; Analyze dilution and ownership implications; Benchmark valuations against market comparables'
      },
      {
        weekNumber: 3,
        title: 'Venture Capital and Angel Investment Process',
        overview: 'Navigate the VC ecosystem, understand investor perspectives, and build relationships that lead to successful fundraising',
        learningObjectives: 'Understand the venture capital ecosystem and investor types; Learn the fundraising process from initial outreach to term sheet; Master investor presentation and pitch deck creation; Build effective investor relationships and networks; Navigate investor due diligence requirements'
      },
      {
        weekNumber: 4,
        title: 'Due Diligence Preparation and Data Rooms',
        overview: 'Prepare comprehensive due diligence materials and manage the investor review process effectively',
        learningObjectives: 'Understand the complete due diligence process and requirements; Organize and prepare all necessary documentation; Set up professional virtual data rooms; Manage investor information requests efficiently; Navigate common due diligence challenges and issues'
      },
      {
        weekNumber: 5,
        title: 'Term Sheet Negotiation and Deal Structuring',
        overview: 'Navigate complex term sheet negotiations and understand the key components of investment deals',
        learningObjectives: 'Understand key term sheet components and their implications; Master negotiation strategies and tactics; Analyze liquidation preferences and control rights; Navigate anti-dilution provisions and protective rights; Structure deals that balance founder and investor interests'
      },
      {
        weekNumber: 6,
        title: 'Post-Funding Financial Management',
        overview: 'Manage investor relations, financial reporting, and operational planning after successfully raising capital',
        learningObjectives: 'Establish robust financial reporting and governance processes; Manage board meetings and investor communications; Plan for future fundraising rounds and exit strategies; Optimize cash management and operational efficiency; Build systems for scaling financial operations'
      }
    ];

    for (const weekData of weeks) {
      const week = await prisma.week.create({
        data: {
          courseId: course.id,
          weekNumber: weekData.weekNumber,
          title: weekData.title,
          overview: weekData.overview,
          learningObjectives: weekData.learningObjectives,
          estimatedHours: 8
        }
      });

      console.log(`✅ Created Week ${week.weekNumber}: ${week.title}`);

      // Create 2 lessons per week
      const lessons = [
        {
          title: `${weekData.title} - Part 1`,
          slug: `${weekData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-part-1`,
          content: generateLessonContent(weekData.weekNumber, 1, weekData.title),
          orderIndex: 1,
          estimatedReadingTime: Math.floor(Math.random() * 30) + 45 // 45-75 minutes
        },
        {
          title: `${weekData.title} - Part 2`,
          slug: `${weekData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-part-2`, 
          content: generateLessonContent(weekData.weekNumber, 2, weekData.title),
          orderIndex: 2,
          estimatedReadingTime: Math.floor(Math.random() * 30) + 60 // 60-90 minutes
        }
      ];

      for (const lessonData of lessons) {
        const lesson = await prisma.lesson.create({
          data: {
            title: lessonData.title,
            slug: lessonData.slug,
            content: lessonData.content,
            orderIndex: lessonData.orderIndex,
            weekId: week.id
          }
        });
        console.log(`✅ Created lesson: ${lesson.title}`);
      }

      // Create quiz for each week
      const quiz = await prisma.quiz.create({
        data: {
          title: `Week ${weekData.weekNumber} Quiz: ${weekData.title}`,
          description: `Test your understanding of ${weekData.title.toLowerCase()}`,
          weekId: week.id,
          timeLimitMinutes: 30,
          passingScore: 70
        }
      });

      // Create 5 questions per quiz
      const questions = generateQuizQuestions(weekData.weekNumber, weekData.title);
      for (let i = 0; i < questions.length; i++) {
        await prisma.question.create({
          data: {
            ...questions[i],
            options: JSON.stringify(questions[i].options),
            quizId: quiz.id,
            orderIndex: i + 1,
            points: 2
          }
        });
      }

      console.log(`✅ Created quiz: ${quiz.title} with ${questions.length} questions`);
    }

    console.log('🎉 Successfully created Course 11: Startup Finance and Fundraising!');
    console.log(`📊 Course includes:`);
    console.log(`   • 6 weeks of content`);
    console.log(`   • 12 comprehensive lessons`);
    console.log(`   • 6 knowledge assessment quizzes`);
    console.log(`   • 48 hours of fundraising education`);
    console.log(`   • Advanced-level content for startup founders`);

  } catch (error) {
    console.error('❌ Error creating Course 11:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function generateLessonContent(weekNumber: number, partNumber: number, weekTitle: string): string {
  const contentMap: { [key: string]: string } = {
    '1-1': `# Foundation of Startup Financial Modeling

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

## Action Items

- [ ] Define your business model components
- [ ] Research industry benchmarks for key metrics
- [ ] Set up model structure with clear assumptions
- [ ] Create initial revenue and cost projections
- [ ] Validate assumptions with market research`,

    '1-2': `# Advanced Financial Model Architecture

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

## Action Items

- [ ] Build three-statement integrated model
- [ ] Implement scenario analysis framework
- [ ] Create unit economics dashboard
- [ ] Validate model with historical data
- [ ] Prepare investor presentation materials`,

    default: `# ${weekTitle} - Part ${partNumber}

This comprehensive lesson covers essential concepts in ${weekTitle.toLowerCase()}, providing practical frameworks and real-world examples that startup founders can immediately apply in their fundraising journey.

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the key principles and best practices
- Apply practical frameworks to real-world scenarios  
- Identify common mistakes and how to avoid them
- Develop actionable strategies for implementation
- Prepare materials and processes for execution

## Key Concepts

### Core Framework
Understanding the fundamental principles that drive success in this area, including market dynamics, investor perspectives, and strategic considerations.

### Practical Application
Step-by-step guidance on implementing these concepts in your startup, with templates, checklists, and real examples from successful fundraising campaigns.

### Common Challenges
Recognition of typical obstacles and pitfalls, along with proven strategies for overcoming them based on extensive experience with startup founders.

### Best Practices
Industry-standard approaches that have been validated through successful fundraising processes, investor feedback, and long-term business outcomes.

## Real-World Examples

This lesson includes case studies from actual startup fundraising experiences, showing both successful strategies and lessons learned from challenges faced during the process.

## Action Items

- [ ] Review the key concepts and frameworks presented
- [ ] Complete the practical exercises and assessments
- [ ] Apply the learnings to your specific startup situation
- [ ] Prepare materials for the next phase of development
- [ ] Schedule follow-up actions and implementation timeline

## Next Steps

The following lesson will build upon these concepts to provide even more advanced strategies and deeper implementation guidance for ${weekTitle.toLowerCase()}.`
  };

  return contentMap[`${weekNumber}-${partNumber}`] || contentMap['default'];
}

function generateQuizQuestions(weekNumber: number, weekTitle: string) {
  const questionsMap: { [key: number]: any[] } = {
    1: [
      {
        questionText: 'What is the most important principle when building startup financial models?',
        questionType: 'multiple-choice',
        options: ['Making the most optimistic projections possible', 'Clearly documenting all assumptions and their sources', 'Using the most sophisticated modeling software', 'Copying competitor financial models exactly'],
        correctAnswer: 'Clearly documenting all assumptions and their sources',
        explanation: 'Clear assumption documentation is crucial because it allows investors to understand your reasoning, makes the model updateable, and demonstrates thoughtful analysis rather than wishful thinking.'
      },
      {
        questionText: 'In a SaaS financial model, which metric is typically the best predictor of future revenue?',
        questionType: 'multiple-choice',
        options: ['Total number of website visitors', 'Monthly Recurring Revenue (MRR) and churn rate', 'One-time setup fees', 'Number of sales calls made'],
        correctAnswer: 'Monthly Recurring Revenue (MRR) and churn rate',
        explanation: 'MRR and churn rate together provide the clearest picture of recurring revenue sustainability and growth potential, which is the foundation of SaaS valuation.'
      },
      {
        questionText: 'What is the primary purpose of scenario analysis in startup financial models?',
        questionType: 'multiple-choice',
        options: ['To confuse investors with too many options', 'To show only the best-case scenario', 'To demonstrate range of possible outcomes and test sensitivity', 'To make the model look more complex'],
        correctAnswer: 'To demonstrate range of possible outcomes and test sensitivity',
        explanation: 'Scenario analysis helps founders and investors understand the range of possible outcomes, identify key risks and opportunities, and make better strategic decisions.'
      },
      {
        questionText: 'Which statement best describes the relationship between Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC)?',
        questionType: 'multiple-choice',
        options: ['LTV should be exactly equal to CAC', 'CAC should be higher than LTV for growth', 'LTV should be at least 3x higher than CAC', 'The relationship doesn\'t matter for startups'],
        correctAnswer: 'LTV should be at least 3x higher than CAC',
        explanation: 'A healthy LTV:CAC ratio of 3:1 or higher indicates that you\'re acquiring customers profitably with sufficient margin for other costs and profit. Lower ratios suggest unsustainable unit economics.'
      },
      {
        questionText: 'When modeling cash burn rate, which approach provides the most accurate runway calculation?',
        questionType: 'multiple-choice',
        options: ['Using average historical burn rate for all future periods', 'Modeling monthly cash flows with expected changes in burn rate', 'Assuming burn rate will decrease automatically over time', 'Using only the current month\'s burn rate'],
        correctAnswer: 'Modeling monthly cash flows with expected changes in burn rate',
        explanation: 'Monthly cash flow modeling accounts for planned changes in hiring, marketing spend, and revenue growth, providing a more accurate picture of future cash needs than simple averages.'
      }
    ],
    
    2: [
      {
        questionText: 'A startup has a pre-money valuation of $12M and raises $3M. What is the investor\'s ownership percentage?',
        questionType: 'multiple-choice',
        options: ['20%', '25%', '30%', '33%'],
        correctAnswer: '20%',
        explanation: 'Post-money valuation = $12M + $3M = $15M. Investor ownership = $3M ÷ $15M = 20%. The investor owns 20% of the company after the investment.'
      },
      {
        questionText: 'Which valuation method is most appropriate for a pre-revenue startup with strong team and large market opportunity?',
        questionType: 'multiple-choice',
        options: ['Discounted Cash Flow (DCF)', 'Revenue multiple analysis', 'Venture Capital Method combined with market comparables', 'Asset-based valuation'],
        correctAnswer: 'Venture Capital Method combined with market comparables',
        explanation: 'For pre-revenue startups, the VC method (working backward from exit value) combined with market comparables provides the most relevant framework since there\'s no revenue to analyze and limited cash flows to discount.'
      },
      {
        questionText: 'What is the typical size of the employee option pool for a Series A startup?',
        questionType: 'multiple-choice',
        options: ['5-10%', '15-20%', '25-30%', '35-40%'],
        correctAnswer: '15-20%',
        explanation: 'Series A startups typically reserve 15-20% of the company for employee stock options to attract and retain key talent during the growth phase.'
      },
      {
        questionText: 'What does a 1x liquidation preference mean for preferred shareholders?',
        questionType: 'multiple-choice',
        options: ['They get paid back 1x their investment before common shareholders', 'They get 1% additional dividend annually', 'They have 1x voting rights per share', 'They can convert to 1x common shares'],
        correctAnswer: 'They get paid back 1x their investment before common shareholders',
        explanation: 'A 1x liquidation preference means preferred shareholders receive their original investment amount back before any proceeds are distributed to common shareholders in a liquidity event.'
      },
      {
        questionText: 'How does weighted average anti-dilution protection work?',
        questionType: 'multiple-choice',
        options: ['It prevents any future dilution of investor ownership', 'It adjusts the conversion price based on the weighted average of new and old prices', 'It guarantees investors maintain exactly the same ownership percentage', 'It only applies to down rounds below 50% of previous valuation'],
        correctAnswer: 'It adjusts the conversion price based on the weighted average of new and old prices',
        explanation: 'Weighted average anti-dilution adjusts the preferred stock conversion price based on both the price and size of the new issuance, providing partial protection against dilution in down rounds.'
      }
    ]
  };

  // Return default questions for weeks not specifically defined
  const defaultQuestions = [
    {
      questionText: `What is a key principle in ${weekTitle.toLowerCase()}?`,
      questionType: 'multiple-choice',
      options: ['Following industry best practices', 'Ignoring market conditions', 'Making decisions without data', 'Avoiding professional advice'],
      correctAnswer: 'Following industry best practices',
      explanation: `Following industry best practices ensures you're applying proven strategies in ${weekTitle.toLowerCase()}.`
    },
    {
      questionText: `Which approach is most effective for ${weekTitle.toLowerCase()}?`,
      questionType: 'multiple-choice', 
      options: ['Systematic and methodical approach', 'Random trial and error', 'Copying competitors exactly', 'Avoiding planning altogether'],
      correctAnswer: 'Systematic and methodical approach',
      explanation: `A systematic and methodical approach provides the best foundation for success in ${weekTitle.toLowerCase()}.`
    },
    {
      questionText: `What should be prioritized when working on ${weekTitle.toLowerCase()}?`,
      questionType: 'multiple-choice',
      options: ['Quality and thorough preparation', 'Speed over accuracy', 'Minimal documentation', 'Avoiding stakeholder input'],
      correctAnswer: 'Quality and thorough preparation', 
      explanation: `Quality and thorough preparation are essential for achieving optimal results in ${weekTitle.toLowerCase()}.`
    },
    {
      questionText: `How should challenges in ${weekTitle.toLowerCase()} be addressed?`,
      questionType: 'multiple-choice',
      options: ['Proactive planning and risk mitigation', 'Waiting until problems occur', 'Ignoring potential issues', 'Relying solely on luck'],
      correctAnswer: 'Proactive planning and risk mitigation',
      explanation: `Proactive planning and risk mitigation help prevent and manage challenges effectively in ${weekTitle.toLowerCase()}.`
    },
    {
      questionText: `What role does professional expertise play in ${weekTitle.toLowerCase()}?`,
      questionType: 'multiple-choice',
      options: ['Critical for optimal outcomes', 'Unnecessary expense', 'Only needed for large companies', 'Should be avoided entirely'],
      correctAnswer: 'Critical for optimal outcomes',
      explanation: `Professional expertise provides valuable guidance and helps avoid common pitfalls in ${weekTitle.toLowerCase()}.`
    }
  ];

  return questionsMap[weekNumber] || defaultQuestions;
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