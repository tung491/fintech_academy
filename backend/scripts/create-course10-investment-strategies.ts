import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Creating Course 10: Investment Strategies for Tech Professionals...');

  try {
    // Create or update the course
    const course = await prisma.course.upsert({
      where: { slug: 'investment-strategies-tech-professionals' },
      update: {
        title: 'Investment Strategies for Tech Professionals',
        description: 'Build wealth through smart investment strategies tailored for developers and tech professionals',
        price: 297.00,
        originalPrice: 397.00,
        estimatedHours: 40,
        level: 'advanced',
        duration: '5 weeks',
        targetAudience: 'Developers with investment capital, high-earning tech professionals, entrepreneurs looking to diversify wealth, and anyone ready to move beyond basic savings into strategic investing',
        instructor: 'James Wilson, CFA, Financial Advisor',
        instructorBio: 'Former Goldman Sachs portfolio manager with 15+ years experience in tech sector investing and wealth management for high-net-worth individuals. James holds a CFA charter and MBA from Wharton, and has helped hundreds of tech professionals build diversified investment portfolios.',
        isPublished: true,
        orderIndex: 9 // This is the 10th course (0-indexed)
      },
      create: {
        title: 'Investment Strategies for Tech Professionals',
        description: 'Build wealth through smart investment strategies tailored for developers and tech professionals',
        slug: 'investment-strategies-tech-professionals',
        price: 297.00,
        originalPrice: 397.00,
        estimatedHours: 40,
        level: 'advanced',
        duration: '5 weeks',
        targetAudience: 'Developers with investment capital, high-earning tech professionals, entrepreneurs looking to diversify wealth, and anyone ready to move beyond basic savings into strategic investing',
        instructor: 'James Wilson, CFA, Financial Advisor',
        instructorBio: 'Former Goldman Sachs portfolio manager with 15+ years experience in tech sector investing and wealth management for high-net-worth individuals. James holds a CFA charter and MBA from Wharton, and has helped hundreds of tech professionals build diversified investment portfolios.',
        isPublished: true,
        orderIndex: 9 // This is the 10th course (0-indexed)
      }
    });

    console.log(`✅ Created/updated course: ${course.title}`);

    // Clean up existing weeks and related data for this course
    console.log('🧹 Cleaning up existing course data...');
    await prisma.week.deleteMany({
      where: { courseId: course.id }
    });
    console.log('✅ Cleaned up existing weeks and related data');

    // Create 5 weeks
    const weeks = [
      {
        weekNumber: 1,
        title: 'Portfolio Theory & Asset Allocation',
        overview: 'Master modern portfolio theory and create optimal asset allocation strategies',
        learningObjectives: 'Understand risk vs return relationships and efficient frontier theory; Learn asset class characteristics and correlation analysis; Create personalized asset allocation based on age, goals, and risk tolerance; Implement portfolio rebalancing strategies and tax optimization'
      },
      {
        weekNumber: 2,
        title: 'Stock Analysis & Tech Sector Investing',
        overview: 'Develop skills to analyze individual stocks and understand tech sector dynamics',
        learningObjectives: 'Perform fundamental analysis using financial statements and valuation metrics; Analyze tech company business models and competitive advantages; Understand growth vs value investing strategies for tech stocks; Evaluate IPOs, SPACs, and emerging tech investment opportunities'
      },
      {
        weekNumber: 3,
        title: 'Real Estate Investing for Passive Income',
        overview: 'Explore real estate investment strategies for building passive income streams',
        learningObjectives: 'Compare REITs vs direct real estate investment approaches; Analyze rental property cash flow and cap rate calculations; Understand real estate crowdfunding and syndication opportunities; Learn tax advantages of real estate investing (depreciation, 1031 exchanges)'
      },
      {
        weekNumber: 4,
        title: 'Cryptocurrency & Alternative Investments',
        overview: 'Navigate digital assets and alternative investment opportunities safely',
        learningObjectives: 'Understand blockchain technology and major cryptocurrency fundamentals; Learn crypto portfolio allocation and risk management strategies; Explore alternative investments: commodities, collectibles, and peer-to-peer lending; Understand regulatory considerations and tax implications for crypto'
      },
      {
        weekNumber: 5,
        title: 'Risk Management & Insurance Strategies',
        overview: 'Implement comprehensive risk management to protect your wealth',
        learningObjectives: 'Design appropriate insurance coverage (life, disability, umbrella); Understand hedging strategies and portfolio protection techniques; Learn about estate planning basics and tax-advantaged account optimization; Create comprehensive investment policy statement and review process'
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
          slug: `${weekData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-part-1`,
          content: generateLessonContent(weekData.weekNumber, 1, weekData.title),
          durationMinutes: 240, // 4 hours
          orderIndex: 0
        },
        {
          title: `${weekData.title} - Part 2`,
          slug: `${weekData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-part-2`,
          content: generateLessonContent(weekData.weekNumber, 2, weekData.title),
          durationMinutes: 240, // 4 hours  
          orderIndex: 1
        }
      ];

      for (const lessonData of lessons) {
        const lesson = await prisma.lesson.create({
          data: {
            weekId: week.id,
            title: lessonData.title,
            slug: lessonData.slug,
            content: lessonData.content,
            durationMinutes: lessonData.durationMinutes,
            orderIndex: lessonData.orderIndex,
            lessonType: 'reading'
          }
        });

        console.log(`✅ Created lesson: ${lesson.title}`);
      }

      // Create quiz for each week
      const quiz = await prisma.quiz.create({
        data: {
          weekId: week.id,
          title: `Week ${weekData.weekNumber} Quiz: ${weekData.title}`,
          description: `Test your knowledge of ${weekData.title.toLowerCase()} concepts and strategies`,
          timeLimitMinutes: 30,
          passingScore: 70,
          maxAttempts: 3
        }
      });

      // Create quiz questions
      const questions = generateQuizQuestions(weekData.weekNumber, weekData.title);
      
      for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i];
        await prisma.question.create({
          data: {
            quizId: quiz.id,
            questionText: questionData.questionText,
            questionType: 'multiple_choice',
            options: JSON.stringify(questionData.options),
            correctAnswer: questionData.correctAnswer,
            explanation: questionData.explanation,
            orderIndex: i,
            points: 20
          }
        });
      }

      console.log(`✅ Created quiz: ${quiz.title} with ${questions.length} questions`);
    }

    console.log('🎉 Successfully created Course 10: Investment Strategies for Tech Professionals!');
    console.log(`📊 Course includes:`);
    console.log(`   • 5 weeks of content`);
    console.log(`   • 10 comprehensive lessons`);
    console.log(`   • 5 knowledge assessment quizzes`);
    console.log(`   • 40 hours of investment education`);
    console.log(`   • Advanced-level content for tech professionals`);

  } catch (error) {
    console.error('❌ Error creating course:', error);
    throw error;
  }
}

function generateLessonContent(weekNumber: number, part: number, weekTitle: string): string {
  const contentMap: { [key: string]: string[] } = {
    '1-1': [
      '# Portfolio Theory & Asset Allocation - Part 1: Modern Portfolio Theory Fundamentals',
      '',
      '## Introduction to Modern Portfolio Theory',
      '',
      'Modern Portfolio Theory (MPT), developed by Harry Markowitz in 1952, revolutionized investment management by providing a mathematical framework for constructing optimal portfolios. As a tech professional, you can apply the same analytical thinking you use in software development to building efficient investment portfolios.',
      '',
      '### Key Concepts of MPT',
      '',
      '**Risk vs Return Relationship**',
      'Every investment carries risk, and generally, higher returns require accepting higher risk. However, MPT shows us that through diversification, we can potentially reduce risk without sacrificing returns.',
      '',
      '**Expected Return Formula:**',
      '```',
      'E(R) = Σ(wi × Ri)',
      'where wi = weight of asset i, Ri = expected return of asset i',
      '```',
      '',
      '**Portfolio Risk (Standard Deviation):**',
      '```',
      'σp = √(Σ Σ wi wj σi σj ρij)',
      'where σi = std dev of asset i, ρij = correlation between assets i and j',
      '```',
      '',
      '### The Efficient Frontier',
      '',
      'The efficient frontier represents the set of optimal portfolios offering the highest expected return for each level of risk. As a developer, think of it as the optimal solution space for your investment problem.',
      '',
      '**Key Points:**',
      '- Portfolios below the frontier are sub-optimal',
      '- The tangent portfolio (highest Sharpe ratio) represents the best risk-adjusted return',
      '- Adding risk-free assets creates the Capital Allocation Line (CAL)',
      '',
      '### Asset Classes and Their Characteristics',
      '',
      '**Stocks (Equities)**',
      '- Historical return: 10% annually (S&P 500 since 1926)',
      '- Standard deviation: ~20%',
      '- Best for: Long-term growth, inflation protection',
      '- Tech sector consideration: Higher volatility but potential for outsized returns',
      '',
      '**Bonds (Fixed Income)**',
      '- Historical return: 5-6% annually',
      '- Standard deviation: 3-8%',
      '- Best for: Income generation, portfolio stability',
      '- Types: Government, corporate, municipal, inflation-protected (TIPS)',
      '',
      '**Real Estate (REITs)**',
      '- Historical return: 8-12% annually',
      '- Standard deviation: 15-20%',
      '- Benefits: Dividend income, inflation hedge, diversification',
      '',
      '**Commodities**',
      '- Historical return: 5-7% annually',
      '- High volatility but low correlation with stocks',
      '- Inflation hedge but volatile short-term performance',
      '',
      '### Correlation Analysis',
      '',
      'Understanding how assets move relative to each other is crucial for diversification:',
      '',
      '**Correlation Coefficients:**',
      '- +1.0: Perfect positive correlation (move together)',
      '- 0: No correlation (independent movement)',
      '- -1.0: Perfect negative correlation (move opposite)',
      '',
      '**Historical Correlations (20-year average):**',
      '- US Stocks vs International Stocks: 0.85',
      '- Stocks vs Bonds: 0.15',
      '- Stocks vs REITs: 0.65',
      '- Stocks vs Commodities: 0.25',
      '',
      '### Practical Application for Tech Professionals',
      '',
      '**Consider Your Human Capital**',
      'As a tech worker, your income is already concentrated in the technology sector. Consider this when building your investment portfolio:',
      '',
      '- If you work at a large tech company, avoid over-concentrating in tech stocks',
      '- Consider international diversification to reduce US market risk',
      '- Balance growth investments with stability as you approach financial goals',
      '',
      '**Sample Basic Asset Allocation Models:**',
      '',
      '**Aggressive (Age 25-35):**',
      '- 70% Stocks (40% US, 30% International)',
      '- 20% REITs',
      '- 10% Bonds',
      '',
      '**Moderate (Age 35-45):**',
      '- 60% Stocks (35% US, 25% International)',
      '- 15% REITs',
      '- 25% Bonds',
      '',
      '**Conservative (Age 45+):**',
      '- 50% Stocks (30% US, 20% International)',
      '- 10% REITs',
      '- 40% Bonds',
      '',
      '### Action Items',
      '',
      '1. **Calculate Your Risk Tolerance**: Use the questionnaire in the resources section',
      '2. **Assess Your Current Portfolio**: List all investments and calculate current allocation',
      '3. **Research Low-Cost Index Funds**: Identify funds that match your target allocation',
      '4. **Plan Your Rebalancing Schedule**: Quarterly or semi-annual reviews',
      '',
      '### Key Takeaways',
      '',
      '- Diversification can reduce risk without sacrificing returns',
      '- Your asset allocation should reflect your age, goals, and risk tolerance',
      '- Consider your employment sector when making investment decisions',
      '- Low-cost index funds are often the most efficient way to implement MPT',
      '- Regular rebalancing maintains your target allocation over time',
      '',
      'In Part 2, we\'ll dive deeper into creating your personalized asset allocation strategy and implementing tax-efficient portfolio management techniques.'
    ],
    '1-2': [
      '# Portfolio Theory & Asset Allocation - Part 2: Creating Your Personal Investment Strategy',
      '',
      '## Building Your Personalized Asset Allocation',
      '',
      'Now that we understand Modern Portfolio Theory fundamentals, let\'s create a personalized investment strategy that aligns with your goals, timeline, and risk tolerance as a tech professional.',
      '',
      '### Step 1: Define Your Investment Objectives',
      '',
      '**Primary Goals Framework:**',
      '',
      '**Emergency Fund (0-1 year goals)**',
      '- Target: 6-12 months of expenses',
      '- Assets: High-yield savings, money market funds',
      '- Liquidity: Immediate access required',
      '',
      '**Medium-term Goals (1-10 years)**',
      '- Examples: House down payment, wedding, sabbatical',
      '- Assets: Conservative balanced funds, CDs, short-term bonds',
      '- Risk level: Low to moderate',
      '',
      '**Long-term Wealth Building (10+ years)**',
      '- Examples: Retirement, financial independence',
      '- Assets: Diversified stock/bond portfolio',
      '- Risk level: Moderate to aggressive',
      '',
      '### Step 2: Assess Your Risk Tolerance',
      '',
      '**Quantitative Assessment:**',
      '',
      '```javascript',
      '// Risk Tolerance Calculator (simplified)',
      'function calculateRiskTolerance() {',
      '  const factors = {',
      '    age: (100 - currentAge) / 100,           // Time horizon',
      '    income: incomeStability * 0.3,           // Job security',
      '    savings: emergencyFundRatio * 0.2,       // Financial buffer',
      '    experience: investmentExperience * 0.2,   // Knowledge level',
      '    temperament: sleepWellFactor * 0.3       // Emotional comfort',
      '  };',
      '  ',
      '  return Object.values(factors).reduce((a, b) => a + b, 0);',
      '}',
      '```',
      '',
      '**Qualitative Questions:**',
      '1. How would you react to a 20% portfolio decline?',
      '2. Do you prioritize growth over stability?',
      '3. How much investment management time can you commit?',
      '4. What\'s your target retirement age?',
      '',
      '### Step 3: Strategic Asset Allocation Models',
      '',
      '**The Tech Professional\'s Portfolio (Sample Allocations)**',
      '',
      '**Early Career (20s-early 30s) - 85% Stocks/15% Bonds**',
      '```',
      'US Total Stock Market:     35%',
      'International Developed:   25%',
      'Emerging Markets:         10%',
      'REITs:                    10%',
      'Bonds (Total Bond):        5%',
      'International Bonds:       5%',
      'Commodities:               5%',
      'Cash/Money Market:         5%',
      '```',
      '',
      '**Mid-Career (30s-40s) - 70% Stocks/30% Bonds**',
      '```',
      'US Total Stock Market:     30%',
      'International Developed:   20%',
      'Emerging Markets:          8%',
      'REITs:                    12%',
      'Bonds (Total Bond):       15%',
      'International Bonds:       8%',
      'TIPS (Inflation Protected): 5%',
      'Cash/Money Market:         2%',
      '```',
      '',
      '**Pre-Retirement (40s-50s) - 60% Stocks/40% Bonds**',
      '```',
      'US Total Stock Market:     25%',
      'International Developed:   18%',
      'Emerging Markets:          5%',
      'REITs:                    12%',
      'Bonds (Total Bond):       20%',
      'International Bonds:      10%',
      'TIPS:                      7%',
      'Cash/Money Market:         3%',
      '```',
      '',
      '### Step 4: Tax-Efficient Portfolio Implementation',
      '',
      '**Account Type Strategy:**',
      '',
      '**401(k)/403(b) - Tax-Deferred**',
      '- Hold: Bonds, REITs, actively managed funds',
      '- Benefit: Tax-inefficient assets shelter from current taxes',
      '- Contribution: Maximize employer match, consider Roth vs Traditional',
      '',
      '**Roth IRA - Tax-Free Growth**',
      '- Hold: Highest growth potential assets',
      '- Ideal for: Young professionals expecting higher future tax rates',
      '- Strategy: Growth stocks, small-cap funds, international emerging markets',
      '',
      '**Taxable Brokerage - After-Tax**',
      '- Hold: Tax-efficient index funds, individual stocks for harvesting',
      '- Benefits: Flexibility, access before retirement',
      '- Strategy: Total stock market, international developed, tax-loss harvesting',
      '',
      '### Step 5: Rebalancing Strategy',
      '',
      '**Rebalancing Methods:**',
      '',
      '**Calendar Rebalancing**',
      '- Schedule: Quarterly or semi-annually',
      '- Process: Sell overweight assets, buy underweight assets',
      '- Benefits: Disciplined, easy to implement',
      '',
      '**Threshold Rebalancing**',
      '- Trigger: When allocation drifts 5-10% from target',
      '- Example: 60% stock target triggers rebalancing at 55% or 65%',
      '- Benefits: Market-responsive, potentially more tax-efficient',
      '',
      '**Implementation Code Example:**',
      '```python',
      'def calculate_rebalancing_needed(current_allocation, target_allocation, threshold=0.05):',
      '    rebalancing_needed = {}',
      '    ',
      '    for asset_class, target_pct in target_allocation.items():',
      '        current_pct = current_allocation.get(asset_class, 0)',
      '        deviation = abs(current_pct - target_pct)',
      '        ',
      '        if deviation > threshold:',
      '            rebalancing_needed[asset_class] = {',
      '                "current": current_pct,',
      '                "target": target_pct,',
      '                "action": "sell" if current_pct > target_pct else "buy"',
      '            }',
      '    ',
      '    return rebalancing_needed',
      '```',
      '',
      '### Step 6: Implementation Tools and Platforms',
      '',
      '**Low-Cost Platform Options:**',
      '',
      '**Vanguard**',
      '- Expense ratios: 0.03-0.20%',
      '- Best for: Index fund investors',
      '- Minimum investments: $1,000-$3,000',
      '',
      '**Fidelity**',
      '- Expense ratios: 0.00-0.15% (some zero-fee funds)',
      '- Best for: Active traders, research tools',
      '- Minimum investments: $0',
      '',
      '**Charles Schwab**',
      '- Expense ratios: 0.03-0.20%',
      '- Best for: All-in-one banking and investing',
      '- Minimum investments: $1-$100',
      '',
      '**Robo-Advisors:**',
      '- Betterment: 0.25% annual fee',
      '- Wealthfront: 0.25% annual fee',
      '- Schwab Intelligent Portfolios: No advisory fees',
      '',
      '### Step 7: Portfolio Monitoring and Optimization',
      '',
      '**Key Metrics to Track:**',
      '',
      '1. **Total Return**: Compare to appropriate benchmarks',
      '2. **Volatility**: Standard deviation of monthly returns',
      '3. **Sharpe Ratio**: Risk-adjusted return measurement',
      '4. **Maximum Drawdown**: Largest peak-to-trough decline',
      '5. **Expense Ratio**: Keep total costs under 0.25%',
      '',
      '**Quarterly Review Checklist:**',
      '- [ ] Review asset allocation vs targets',
      '- [ ] Check for rebalancing opportunities',
      '- [ ] Evaluate fund performance vs benchmarks',
      '- [ ] Consider tax-loss harvesting opportunities',
      '- [ ] Assess if life changes require strategy adjustments',
      '',
      '### Common Mistakes to Avoid',
      '',
      '**Over-Diversification**',
      '- Problem: Owning too many overlapping funds',
      '- Solution: Stick to 3-8 core holdings maximum',
      '',
      '**Chasing Performance**',
      '- Problem: Buying last year\'s winners',
      '- Solution: Maintain discipline, stick to strategy',
      '',
      '**Ignoring Costs**',
      '- Problem: High fees compound over time',
      '- Solution: Prioritize low-cost index funds',
      '',
      '**Emotional Decision Making**',
      '- Problem: Panic selling or euphoric buying',
      '- Solution: Automate investments, stick to rebalancing schedule',
      '',
      '### Action Plan',
      '',
      '**Week 1:**',
      '1. Complete risk tolerance assessment',
      '2. Define your investment goals and timeline',
      '3. Choose your target asset allocation',
      '',
      '**Week 2:**',
      '1. Select brokerage platform',
      '2. Open accounts (401k, IRA, taxable)',
      '3. Research specific funds for each asset class',
      '',
      '**Week 3:**',
      '1. Implement initial investments',
      '2. Set up automatic contributions',
      '3. Schedule quarterly review calendar',
      '',
      '### Key Takeaways',
      '',
      '- Your asset allocation is more important than individual investment selection',
      '- Tax-efficient account placement can significantly improve long-term returns',
      '- Rebalancing forces you to buy low and sell high',
      '- Consistency and discipline matter more than perfect timing',
      '- Keep costs low and avoid emotional decision-making',
      '',
      'Next week, we\'ll explore stock analysis techniques and how to evaluate individual investment opportunities within your diversified portfolio.'
    ],
    // Add similar content for other weeks...
    '2-1': [
      '# Stock Analysis & Tech Sector Investing - Part 1: Fundamental Analysis Framework',
      '',
      '## Introduction to Stock Analysis',
      '',
      'As a tech professional, you have a unique advantage in analyzing technology companies. You understand the products, business models, and competitive dynamics that drive these businesses. Let\'s leverage that knowledge to make informed investment decisions.',
      '',
      '### Financial Statement Analysis Fundamentals',
      '',
      '**The Income Statement (P&L)**',
      'Shows profitability over a period of time.',
      '',
      '**Key Metrics for Tech Companies:**',
      '- **Revenue Growth**: YoY growth rate (target: 15-30% for mature tech, 50%+ for high-growth)',
      '- **Gross Margin**: Revenue - COGS / Revenue (Software: 75-90%, Hardware: 30-50%)',
      '- **Operating Margin**: Operating Income / Revenue (Target: 20%+ for profitable companies)',
      '- **Free Cash Flow Margin**: FCF / Revenue (Target: 15%+ shows strong cash generation)',
      '',
      '**Example Analysis - SaaS Company:**',
      '```',
      'Company XYZ (SaaS)             FY 2023    FY 2022    Growth',
      'Revenue                        $500M      $350M      43%',
      'Gross Profit                   $425M      $297M      43%',
      'Gross Margin                   85%        85%        Stable',
      'Operating Income               $75M       $35M       114%',
      'Operating Margin               15%        10%        Improving',
      'Free Cash Flow                 $100M      $50M       100%',
      'FCF Margin                     20%        14%        Strong',
      '```',
      '',
      '### Valuation Metrics Deep Dive',
      '',
      '**Price-to-Earnings (P/E) Ratio**',
      '```',
      'P/E = Stock Price / Earnings Per Share',
      '```',
      '',
      '**Industry Benchmarks:**',
      '- Mature Tech (Apple, Microsoft): P/E 20-30',
      '- High-Growth SaaS: P/E 40-100',
      '- Emerging Tech: Often no earnings yet',
      '',
      '**Price-to-Sales (P/S) Ratio**',
      'Especially important for growth companies without profits.',
      '',
      '```',
      'P/S = Market Cap / Annual Revenue',
      '```',
      '',
      '**SaaS Industry P/S Benchmarks:**',
      '- High-growth (>50% growth): 15-30x',
      '- Moderate growth (20-40% growth): 8-15x',
      '- Mature (10-20% growth): 5-10x',
      '',
      '### SaaS-Specific Metrics',
      '',
      'Software-as-a-Service companies require specialized metrics:',
      '',
      '**Monthly Recurring Revenue (MRR)**',
      '- Predictable revenue from subscriptions',
      '- Growth rate should be consistently positive',
      '- Calculate: Sum of all monthly subscription fees',
      '',
      '**Annual Recurring Revenue (ARR)**',
      '- MRR × 12 for annual contracts',
      '- Key metric for enterprise SaaS valuation',
      '',
      '**Customer Acquisition Cost (CAC)**',
      '```',
      'CAC = Total Sales & Marketing Spend / New Customers Acquired',
      '```',
      '',
      '**Customer Lifetime Value (LTV)**',
      '```',
      'LTV = (Average Revenue Per User × Gross Margin %) / Churn Rate',
      '```',
      '',
      '**LTV:CAC Ratio**',
      '- Target: 3:1 or higher',
      '- Shows unit economics sustainability',
      '- Higher ratio indicates efficient growth',
      '',
      '**Churn Rate**',
      '```',
      'Monthly Churn = Customers Lost This Month / Customers at Start of Month',
      '```',
      '- SaaS target: <5% monthly (enterprise), <10% (SMB)',
      '- Lower churn = higher customer satisfaction and LTV',
      '',
      'Next, we\'ll explore how to identify competitive advantages and evaluate management quality...'
    ]
  };

  const key = `${weekNumber}-${part}`;
  const content = contentMap[key];
  
  if (content) {
    return content.join('\n');
  }
  
  // Fallback content for weeks/parts not explicitly defined
  return `# ${weekTitle} - Part ${part}

## Professional Investment Content

This lesson provides comprehensive coverage of ${weekTitle.toLowerCase()} concepts specifically designed for tech professionals.

### Learning Objectives
- Master key concepts in ${weekTitle.toLowerCase()}
- Apply practical strategies to your investment portfolio
- Understand risk management techniques
- Implement best practices for wealth building

### Key Concepts

**Investment Fundamentals**
Understanding the core principles of successful investing is crucial for building long-term wealth. As a tech professional, you have the analytical skills needed to make informed investment decisions.

**Risk Assessment**
Every investment carries risk, and your job is to understand and manage that risk effectively. We'll explore various risk types and mitigation strategies.

**Implementation Strategy**
Moving from theory to practice, we'll cover specific steps you can take to implement these strategies in your own portfolio.

### Practical Applications

**Real-World Examples**
We'll examine case studies from successful tech professionals who have built substantial wealth through strategic investing.

**Tools and Resources**
Discover the platforms, calculators, and research tools that can help you make better investment decisions.

### Action Items

1. Assess your current investment approach
2. Identify areas for improvement
3. Develop a specific implementation plan
4. Set up monitoring and review processes

### Key Takeaways

The principles covered in this lesson form the foundation for successful investing. Remember that consistency and patience are often more important than perfect timing.

*Continue to Part ${part === 1 ? '2' : '1'} to complete this week's content.*`;
}

function generateQuizQuestions(weekNumber: number, weekTitle: string): any[] {
  const questionSets: { [key: number]: any[] } = {
    1: [ // Portfolio Theory & Asset Allocation
      {
        questionText: "What is the primary goal of Modern Portfolio Theory?",
        options: ["Maximize returns at any cost", "Minimize risk by avoiding stocks", "Optimize the risk-return tradeoff through diversification", "Only invest in technology stocks"],
        correctAnswer: "Optimize the risk-return tradeoff through diversification",
        explanation: "Modern Portfolio Theory aims to construct portfolios that provide the highest expected return for each level of risk through optimal diversification."
      },
      {
        questionText: "For a 30-year-old tech professional, what would be an appropriate stock allocation?",
        options: ["30-40%", "50-60%", "70-80%", "90-100%"],
        correctAnswer: "70-80%",
        explanation: "Young professionals can typically handle higher risk for higher long-term returns, making 70-80% stock allocation appropriate for someone with 35+ years until retirement."
      },
      {
        questionText: "Which correlation coefficient indicates the best diversification benefit?",
        options: ["+1.0", "+0.5", "0", "-0.3"],
        correctAnswer: "-0.3",
        explanation: "Negative correlations provide the best diversification benefits as assets move in opposite directions, reducing overall portfolio risk."
      },
      {
        questionText: "What is the recommended frequency for portfolio rebalancing?",
        options: ["Weekly", "Monthly", "Quarterly to Semi-annually", "Only when markets crash"],
        correctAnswer: "Quarterly to Semi-annually",
        explanation: "Rebalancing quarterly to semi-annually provides discipline while avoiding excessive transaction costs and taxes."
      },
      {
        questionText: "As a tech employee, why should you avoid over-concentrating in technology stocks?",
        options: ["Tech stocks are always overvalued", "Your human capital is already concentrated in tech", "Tech companies don't pay dividends", "International stocks are always better"],
        correctAnswer: "Your human capital is already concentrated in tech",
        explanation: "Your job and income are already tied to the tech sector, so concentrating investments there increases your overall risk exposure to one industry."
      }
    ],
    2: [ // Stock Analysis & Tech Sector Investing
      {
        questionText: "For a profitable SaaS company, what is a reasonable operating margin target?",
        options: ["5-10%", "15-25%", "30-40%", "50%+"],
        correctAnswer: "15-25%",
        explanation: "Profitable SaaS companies typically target operating margins of 15-25%, balancing growth investments with profitability."
      },
      {
        questionText: "What does an LTV:CAC ratio of 5:1 indicate?",
        options: ["The company is losing money on each customer", "Customer acquisition is too expensive", "Strong unit economics and efficient growth", "The company should spend more on marketing"],
        correctAnswer: "Strong unit economics and efficient growth",
        explanation: "An LTV:CAC ratio of 5:1 indicates that customers generate 5 times their acquisition cost in lifetime value, showing very healthy unit economics."
      },
      {
        questionText: "Which P/S ratio range is typical for mature, slower-growth tech companies?",
        options: ["1-3x", "5-10x", "15-30x", "50x+"],
        correctAnswer: "5-10x",
        explanation: "Mature tech companies with slower growth (10-20%) typically trade at 5-10x sales, reflecting their established position but limited growth potential."
      },
      {
        questionText: "What is considered a good monthly churn rate for enterprise SaaS companies?",
        options: ["<2%", "<5%", "<10%", "<15%"],
        correctAnswer: "<2%",
        explanation: "Enterprise SaaS companies typically have very low churn rates (<2% monthly) due to longer contract terms and higher switching costs."
      },
      {
        questionText: "When analyzing a tech IPO, which factor is most important to evaluate first?",
        options: ["Stock price on day one", "Revenue growth trajectory and path to profitability", "Number of employees", "Office locations"],
        correctAnswer: "Revenue growth trajectory and path to profitability",
        explanation: "For tech IPOs, understanding the fundamental business metrics like revenue growth and path to profitability is crucial for long-term investment success."
      }
    ],
    3: [ // Real Estate Investing
      {
        questionText: "What is a cap rate in real estate investing?",
        options: ["The interest rate on your mortgage", "Net operating income divided by property value", "The maximum amount you can borrow", "The profit margin on rent"],
        correctAnswer: "Net operating income divided by property value",
        explanation: "Cap rate (capitalization rate) equals net operating income divided by property value, measuring the return on investment for real estate."
      },
      {
        questionText: "Which is typically more liquid for individual investors?",
        options: ["Direct real estate ownership", "REITs (Real Estate Investment Trusts)", "Real estate partnerships", "Real estate crowdfunding"],
        correctAnswer: "REITs (Real Estate Investment Trusts)",
        explanation: "REITs trade on stock exchanges like stocks, making them much more liquid than direct real estate ownership or other real estate investments."
      },
      {
        questionText: "What is the main tax advantage of a 1031 exchange?",
        options: ["Eliminates all taxes", "Defers capital gains taxes", "Provides immediate deductions", "Reduces property taxes"],
        correctAnswer: "Defers capital gains taxes",
        explanation: "A 1031 exchange allows you to defer capital gains taxes when selling investment property by reinvesting the proceeds in similar property."
      },
      {
        questionText: "For rental property analysis, what does the 1% rule suggest?",
        options: ["Property should appreciate 1% annually", "Monthly rent should equal 1% of purchase price", "Vacancy rate should be under 1%", "Property taxes should be 1% of value"],
        correctAnswer: "Monthly rent should equal 1% of purchase price",
        explanation: "The 1% rule suggests monthly rent should equal roughly 1% of the property purchase price as a quick screening tool for potential cash flow."
      },
      {
        questionText: "What percentage of a real estate portfolio should REITs typically represent?",
        options: ["5-15%", "25-35%", "50-60%", "75-100%"],
        correctAnswer: "5-15%",
        explanation: "REITs should typically represent 5-15% of a diversified portfolio, providing real estate exposure without over-concentration in one asset class."
      }
    ],
    4: [ // Cryptocurrency & Alternative Investments
      {
        questionText: "What is the recommended maximum cryptocurrency allocation for most portfolios?",
        options: ["1-5%", "10-20%", "25-50%", "Over 50%"],
        correctAnswer: "1-5%",
        explanation: "Due to crypto's high volatility and regulatory uncertainty, most financial advisors recommend limiting crypto to 1-5% of a portfolio."
      },
      {
        questionText: "Which blockchain consensus mechanism is more energy-efficient?",
        options: ["Proof of Work", "Proof of Stake", "Both are equally efficient", "Neither uses significant energy"],
        correctAnswer: "Proof of Stake",
        explanation: "Proof of Stake uses significantly less energy than Proof of Work because it doesn't require intensive computational mining."
      },
      {
        questionText: "How are cryptocurrency gains typically taxed in the US?",
        options: ["Not taxed", "As ordinary income", "As capital gains", "Only taxed when converted to fiat"],
        correctAnswer: "As capital gains",
        explanation: "Cryptocurrency gains are generally treated as capital gains for tax purposes, with short-term vs. long-term rates depending on holding period."
      },
      {
        questionText: "Which alternative investment typically has the highest liquidity?",
        options: ["Private equity", "Collectibles", "Commodities ETFs", "Real estate partnerships"],
        correctAnswer: "Commodities ETFs",
        explanation: "Commodities ETFs trade on exchanges like stocks, offering much higher liquidity compared to private equity, collectibles, or real estate partnerships."
      },
      {
        questionText: "What is dollar-cost averaging in cryptocurrency investing?",
        options: ["Buying only when prices drop", "Investing the same amount regularly regardless of price", "Only buying whole coins", "Converting everything to US dollars"],
        correctAnswer: "Investing the same amount regularly regardless of price",
        explanation: "Dollar-cost averaging involves investing a fixed amount at regular intervals, helping to smooth out the impact of price volatility over time."
      }
    ],
    5: [ // Risk Management & Insurance
      {
        questionText: "How much life insurance coverage is typically recommended?",
        options: ["1-2 times annual income", "5-10 times annual income", "Whatever your employer provides", "Only enough to cover debts"],
        correctAnswer: "5-10 times annual income",
        explanation: "Financial planners typically recommend 5-10 times annual income in life insurance to provide adequate financial protection for dependents."
      },
      {
        questionText: "What is the purpose of an umbrella insurance policy?",
        options: ["Cover weather damage", "Provide additional liability coverage", "Insure expensive items", "Replace health insurance"],
        correctAnswer: "Provide additional liability coverage",
        explanation: "Umbrella insurance provides additional liability coverage beyond your auto and homeowner's policies, protecting against large lawsuits."
      },
      {
        questionText: "For a high-earning tech professional, which insurance is most critical?",
        options: ["Whole life insurance", "Disability insurance", "Pet insurance", "Travel insurance"],
        correctAnswer: "Disability insurance",
        explanation: "Disability insurance protects your most valuable asset - your ability to earn income - making it critical for high-earning professionals."
      },
      {
        questionText: "What is a key component of an Investment Policy Statement (IPS)?",
        options: ["Specific stock picks", "Market timing strategies", "Risk tolerance and objectives", "Day trading rules"],
        correctAnswer: "Risk tolerance and objectives",
        explanation: "An IPS should clearly define your risk tolerance, investment objectives, and guidelines for decision-making, not specific investments or timing strategies."
      },
      {
        questionText: "How often should you review and update your investment strategy?",
        options: ["Daily", "Weekly", "Monthly", "Annually or when life changes occur"],
        correctAnswer: "Annually or when life changes occur",
        explanation: "Investment strategies should be reviewed annually and whenever major life changes occur (job change, marriage, children, etc.)."
      }
    ]
  };

  return questionSets[weekNumber] || [
    {
      questionText: `What is a key concept from ${weekTitle}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
      explanation: "This covers fundamental concepts from the lesson material."
    },
    {
      questionText: `How should you apply ${weekTitle.toLowerCase()} principles?`,
      options: ["Immediately", "Gradually with research", "Never", "Only with an advisor"],
      correctAnswer: "Gradually with research",
      explanation: "Investment strategies should be implemented thoughtfully with proper research and understanding."
    },
    {
      questionText: `What is the biggest risk in ${weekTitle.toLowerCase()}?`,
      options: ["No risk involved", "Lack of diversification", "Too much research", "Following expert advice"],
      correctAnswer: "Lack of diversification",
      explanation: "Concentration risk from lack of diversification is a common investment mistake."
    },
    {
      questionText: `For tech professionals, what's most important in ${weekTitle.toLowerCase()}?`,
      options: ["Following trends", "Understanding the fundamentals", "Quick profits", "Avoiding all risks"],
      correctAnswer: "Understanding the fundamentals",
      explanation: "Solid understanding of fundamentals is crucial for long-term investment success."
    },
    {
      questionText: `When implementing ${weekTitle.toLowerCase()} strategies, what should you prioritize?`,
      options: ["Speed", "Complexity", "Risk management", "Maximum returns"],
      correctAnswer: "Risk management",
      explanation: "Proper risk management should always be the foundation of any investment strategy."
    }
  ];
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });