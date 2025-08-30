import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCourse3Week2() {
  try {
    // Find Course 3
    const course = await prisma.course.findFirst({
      where: { slug: 'personal-finance-tech' }
    });

    if (!course) {
      throw new Error('Course 3 not found');
    }

    console.log('Adding Week 2 to Course 3:', course.title);

    // Create Week 2: Investment Strategies for High-Income Earners
    const week2 = await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: 2,
        title: 'Investment Strategies for High-Income Earners',
        overview: 'Build wealth through advanced investment strategies designed for high-earning tech professionals.',
        learningObjectives: JSON.stringify([
          'Develop tax-efficient investment portfolios',
          'Master asset allocation for high-income situations',
          'Understand advanced investment vehicles and strategies',
          'Implement risk management techniques for concentrated wealth'
        ]),
        estimatedHours: 10
      }
    });

    // Create Lesson 1: Portfolio Theory and Asset Allocation
    const lesson1 = await prisma.lesson.create({
      data: {
        weekId: week2.id,
        title: 'Portfolio Theory and Asset Allocation for Tech Professionals',
        slug: 'portfolio-theory-asset-allocation',
        content: `# Portfolio Theory and Asset Allocation for Tech Professionals

## Introduction: Building Wealth Through Strategic Investing

High-income tech professionals have unique investment opportunities and challenges. Your earning potential allows for aggressive wealth building, but concentrated tech exposure requires strategic diversification and risk management.

## Modern Portfolio Theory for High Earners

### Core Principles for Tech Wealth Building

**Diversification Beyond Tech Stocks**
Most tech professionals have significant exposure to technology through:
- Employer stock options and RSUs
- 401(k) investments in company stock
- Industry knowledge leading to tech stock concentration
- Real estate in tech hubs

**Strategic Asset Allocation Framework:**

Conservative Tech Professional (Age 50+):
- 60% Stocks (30% US, 20% International, 10% Emerging Markets)  
- 30% Bonds (20% US, 10% International)
- 10% Alternatives (REITs, Commodities)

Moderate Tech Professional (Age 35-50):
- 70% Stocks (35% US, 25% International, 10% Emerging Markets)
- 20% Bonds (15% US, 5% International)  
- 10% Alternatives (REITs, Commodities, Private equity)

Aggressive Tech Professional (Age 25-35):
- 80% Stocks (40% US, 30% International, 10% Emerging Markets)
- 10% Bonds (5% US, 5% International)
- 10% Alternatives (REITs, Commodities, Crypto, Angel investing)

### Tax-Location Strategy for High Earners

**Account Type Optimization:**

**Taxable Accounts:**
- Tax-efficient index funds
- Municipal bonds (for high tax brackets)
- Individual stocks for tax-loss harvesting
- International funds (foreign tax credits)

**401(k)/403(b) (Traditional):**
- High-growth, tax-inefficient investments
- Small-cap value funds
- REITs and bond funds
- Active trading strategies

**Roth IRA/401(k):**
- Highest growth potential investments
- Emerging markets
- Small-cap growth stocks
- Alternative investments

## Advanced Investment Vehicles for Tech Professionals

### Exchange-Traded Funds (ETFs) Strategy

**Core Holdings (60-70% of equity allocation):**
- Total Stock Market Index (VTI): 25%
- S&P 500 Index (SPY): 20% 
- International Developed Markets (VXUS): 15%
- Emerging Markets (VWO): 10%

**Tactical Holdings (20-30% of equity allocation):**
- Technology Sector ETF (VGT): 5-10% (be mindful of concentration)
- Small Cap Value (VBR): 5%
- REITs (VNQ): 5%
- Commodities (DBC): 5%

### Individual Stock Strategy for Tech Professionals

**The 5% Rule:** Never hold more than 5% of your portfolio in any single stock (including employer stock)

**Stock Selection Framework:**
1. **Quality Companies:** Strong financials, competitive moats, consistent profitability
2. **Dividend Growth:** Companies with 10+ year dividend growth history
3. **International Exposure:** Foreign companies in familiar sectors
4. **Value Opportunities:** Undervalued companies in sectors you understand

### Alternative Investment Considerations

**Real Estate Investment Trusts (REITs):**
- Provide real estate exposure without property management
- Geographic diversification (especially important for tech hub residents)
- Target allocation: 5-10% of total portfolio

**Commodity Exposure:**
- Hedge against inflation
- Diversification from growth stocks
- Consider: Precious metals, energy, agricultural commodities
- Target allocation: 2-5% of total portfolio

## Tax-Efficient Investing Strategies

### Tax-Loss Harvesting for High Earners

**Systematic Approach:**
1. **Quarterly Review:** Identify positions with unrealized losses
2. **Wash Sale Avoidance:** Wait 31 days or use similar (not identical) securities
3. **Loss Limitation:** $3,000 annual limit on ordinary income offset
4. **Carryforward Strategy:** Unused losses carry forward indefinitely

**Tech Professional Tax-Loss Harvesting Example:**
- Sell losing position in VTI, buy SWTSX (similar but not identical)
- Harvest $50,000 loss to offset RSU vesting gains
- Maintain similar market exposure while realizing tax benefits

### Asset Location Optimization

**High-Tax-Bracket Strategy:**
Taxable Account (After-tax money):
- Municipal bonds (tax-free interest)
- Tax-managed index funds
- Individual stocks (qualified dividends, long-term gains)
- International funds (foreign tax credit eligible)

Pre-tax 401(k) (Deferred taxation):
- High-yield bonds (taxed as ordinary income)
- REITs (high ordinary income distributions)  
- Small-cap value (less tax-efficient)
- Active trading strategies

Roth IRA (Tax-free growth):
- Highest growth potential assets
- Most volatile investments
- Alternative investments
- International small-cap growth

## Key Takeaways

1. **Diversification is critical**: Tech professionals must actively diversify beyond technology
2. **Tax efficiency matters**: High earners benefit significantly from tax-aware investing
3. **Systematic beats emotional**: Predetermined rules prevent behavioral mistakes
4. **Start early and automate**: Time in market beats timing the market
5. **Professional guidance helps**: Complex tax situations benefit from expert advice
6. **Regular review and rebalancing**: Quarterly check-ins maintain target allocations

Your high income provides incredible wealth-building opportunities. Focus on tax-efficient, diversified investing while avoiding the common pitfalls of over-concentration and market timing.`,
        durationMinutes: 75,
        orderIndex: 1
      }
    });

    // Create Lesson 2: Tax-Efficient Investment Strategies
    const lesson2 = await prisma.lesson.create({
      data: {
        weekId: week2.id,
        title: 'Tax-Efficient Investment Strategies for High Earners',
        slug: 'tax-efficient-investment-strategies',
        content: `# Tax-Efficient Investment Strategies for High Earners

## The High Earner's Tax Challenge

As a high-income tech professional, you likely face federal tax rates of 32-37%, plus state taxes that can push your marginal rate above 50% in some locations. Every investment decision must consider after-tax returns, not just pre-tax performance.

## Understanding Tax-Efficient Investments

### Investment Tax Categories

**Tax-Advantaged (Tax-Free Growth):**
- Roth IRA and Roth 401(k) contributions
- Municipal bonds (federal and sometimes state tax-free)
- HSA investments (triple tax advantage)
- 529 education savings plans

**Tax-Deferred Growth:**
- Traditional 401(k) and IRA
- Annuities (limited situations)
- Series I and EE Savings Bonds
- Life insurance cash value growth

**Tax-Efficient Taxable Investments:**
- Index funds (low turnover, qualified dividends)
- Tax-managed funds
- Individual stocks (long-term capital gains)
- Municipal bonds

**Tax-Inefficient Investments (Shelter in Tax-Deferred):**
- High-yield bonds (ordinary income)
- REITs (ordinary income distributions)
- Actively managed funds (high turnover)
- Commodities and futures

## Advanced Account Optimization Strategies

### The Asset Location Decision Framework

**Priority 1: Tax-Advantaged Account Maximization**
Annual Tax-Advantaged Capacity (2024):
- 401(k): $23,000 ($30,500 if 50+)
- Roth IRA: $7,000 ($8,000 if 50+) [income limits apply]
- HSA: $4,300 individual, $8,550 family
- Total: $34,300+ per year tax-advantaged

**Priority 2: Asset Placement Strategy**

**Roth Accounts (Tax-Free Growth Forever):**
- Highest growth potential investments
- Most volatile assets (cushions against losses)
- International small-cap growth
- Emerging markets
- Individual growth stocks
- Alternative investments

**Traditional 401(k) (Tax-Deferred):**
- Tax-inefficient investments
- High-yield bonds and bond funds
- REITs
- Actively traded strategies
- Commodities

**Taxable Accounts (After-Tax Money):**
- Tax-efficient index funds
- Individual stocks (long-term holding)
- Municipal bonds
- International funds (foreign tax credit)
- Tax-managed funds

### Municipal Bond Strategy for Tech Professionals

**When Munis Make Sense:**
- Federal tax bracket 32% or higher
- High state income tax (CA, NY, NJ)
- Stable income and conservative risk tolerance
- Need for portfolio ballast

**Municipal Bond Tax Calculation:**
Example: California Tech Professional
- Federal Tax Rate: 37%
- California Tax Rate: 13.3%
- Combined Marginal Rate: ~45%

4% Municipal Bond Tax-Equivalent Yield:
4% ÷ (1 - 0.45) = 7.27% taxable equivalent

## Backdoor Roth Strategies for High Earners

### Traditional Backdoor Roth IRA

**Income Limits (2024):**
- Roth IRA phase-out: $138,000-$153,000 (single)
- Most tech professionals exceed these limits

**Step-by-Step Process:**
1. **Contribute:** $7,000 to traditional IRA (non-deductible)
2. **Convert:** Traditional IRA to Roth IRA (immediately)
3. **Pay Taxes:** On any gains during conversion window
4. **Invest:** Roth IRA funds in high-growth investments

### Mega Backdoor Roth Strategy

**Requirements:**
- 401(k) plan allows after-tax contributions
- 401(k) plan allows in-service distributions
- Annual contribution limit: $70,000 total (2024)

**Process:**
1. **Max regular 401(k):** $23,000 traditional/Roth
2. **Add after-tax contributions:** Up to $70,000 total limit
3. **Convert to Roth:** Through in-service distribution
4. **Result:** Up to $47,000 additional Roth space annually

## Key Takeaways

1. **After-tax returns matter most**: Focus on what you keep, not what you earn
2. **Asset location is crucial**: Right investment in the right account
3. **Systematic tax-loss harvesting**: Can add 0.5-1.0% annually for high earners
4. **Backdoor Roth strategies**: Access tax-free growth despite income limits
5. **Municipal bonds for high brackets**: Often superior after-tax returns
6. **Professional guidance valuable**: Complex situations benefit from expert advice

Tax-efficient investing becomes increasingly important as your income rises. The strategies outlined here can add significant value to your long-term wealth building.`,
        durationMinutes: 80,
        orderIndex: 2
      }
    });

    // Create Lesson 3: Risk Management and Advanced Strategies
    const lesson3 = await prisma.lesson.create({
      data: {
        weekId: week2.id,
        title: 'Risk Management and Portfolio Optimization',
        slug: 'risk-management-portfolio-optimization',
        content: `# Risk Management and Portfolio Optimization

## Introduction: Protecting and Growing High-Tech Wealth

High-income tech professionals face unique risks and opportunities. Your concentrated exposure to technology, high marginal tax rates, and volatile income streams require sophisticated risk management approaches that go beyond traditional investment advice.

## Understanding Risk in High-Tech Careers

### The Tech Professional's Risk Profile

**Concentration Risks:**
- Employer stock options and RSUs
- Industry-specific career skills
- Geographic concentration in tech hubs
- Real estate correlated with tech sector

**Income Volatility Risks:**
- Startup failure and layoffs
- Industry cycle sensitivity
- Rapid skill obsolescence
- Bonus and equity compensation variability

**Lifestyle Inflation Risks:**
- High cost of living areas
- Golden handcuffs (unvested equity)
- Peer pressure spending
- Delayed gratification challenges

### Risk Capacity vs Risk Tolerance

**Risk Capacity (Objective):**
- High income and savings rate
- Long investment timeline
- Flexible expense structure
- Strong earning potential

**Risk Tolerance (Subjective):**
- Personal comfort with volatility
- Experience with market downturns
- Family situation and responsibilities
- Sleep-at-night factor

**The Tech Professional Paradox:**
High risk capacity but often lower risk tolerance due to tech industry volatility exposure.

## Advanced Portfolio Construction Strategies

### Core-Satellite Portfolio Approach

**Core Holdings (60-80% of portfolio):**
- Low-cost, broad market index funds
- Provides market return with minimal effort
- Tax-efficient and predictable

**Satellite Holdings (20-40% of portfolio):**
- Targeted sector/geographic exposure
- Individual stock picks
- Alternative investments
- Factor tilts (value, momentum, quality)

### Global Diversification Strategies

**US Market Concentration Risk:**
The US represents ~60% of global market cap but tech professionals are often 90%+ US-focused in careers and investments.

**International Allocation Framework:**

Aggressive Global Allocation:
- 50% US Stocks
- 30% Developed International
- 15% Emerging Markets
- 5% Frontier/Alternatives

Moderate Global Allocation:
- 60% US Stocks  
- 25% Developed International
- 10% Emerging Markets
- 5% Alternatives

Conservative Global Allocation:
- 70% US Stocks
- 20% Developed International
- 5% Emerging Markets
- 5% Cash/Bonds

## Alternative Investment Strategies

### Real Estate Investment Options

**REITs (Real Estate Investment Trusts):**
- Public market liquidity
- Professional management
- Diversification across property types
- Tax considerations (ordinary income distributions)

**Direct Real Estate Investment:**
- Potential for higher returns
- Direct control over investment
- Tax advantages (depreciation, 1031 exchanges)
- Requires significant time and expertise

**Real Estate Crowdfunding:**
- Lower minimum investments
- Access to institutional-quality deals
- Limited liquidity
- Higher fees than REITs

### Advanced Risk Management Techniques

**Hedging Strategies for Concentrated Stock Positions:**

**Protective Put Strategy:**
- Buy put options on concentrated holdings
- Provides downside protection
- Cost reduces returns but limits losses
- Tax implications for hedging transactions

**Collar Strategy:**
- Buy protective puts, sell covered calls
- Reduces hedging cost but limits upside
- Useful for pre-IPO lockup periods
- Complex tax treatment

**Exchange Funds:**
- Pool concentrated positions with others
- Diversification without tax consequences
- High minimums ($1M+) and fees
- 7-year lock-up periods typical

### Insurance as Risk Management

**Disability Insurance:**
Critical for high-earning tech professionals:
- Group coverage often insufficient (caps at $5,000-10,000/month)
- Individual policies can cover up to 60-70% of income
- Consider increasing limits as income grows

**Umbrella Liability Insurance:**
- Minimum $1M coverage recommended
- Higher limits for substantial net worth
- Protects against lawsuit risks
- Relatively inexpensive protection

## Implementation Guidelines

### The 5% Rule for Concentration Risk

**Maximum Single Stock Allocation:** Never hold more than 5% of your portfolio in any single stock (including employer stock)

**De-concentration Strategy:**
1. **Systematic Selling:** Sell 25% of vested options quarterly
2. **Dollar-Cost Averaging Out:** Reduce position over 12-18 months
3. **Hedging Strategies:** Use options to protect large positions while maintaining upside
4. **Tax Optimization:** Time sales to manage tax brackets

### Rebalancing Strategy for Busy Tech Professionals

**Quarterly Rebalancing System:**
1. **Calendar Reminders:** First day of each quarter
2. **Threshold Rebalancing:** Act when allocation exceeds 5% target
3. **Tax Optimization:** Use new contributions to rebalance before selling
4. **Automation Tools:** Use robo-advisors for smaller accounts

## Case Study: Sarah, Senior Software Engineer

**Situation:**
- Salary: $180,000 + $50,000 annual RSUs
- Age: 32, single
- Current savings: $75,000 (all in savings account)
- 401(k): $125,000 (100% in company stock)
- Goals: Financial independence by 50

**Risk Management Strategy Implementation:**

**Year 1: Foundation**
- Max 401(k): $23,000 (diversify into target-date fund)
- Max Roth IRA: $7,000 (total stock market index)
- Taxable account: $3,000/month into three-fund portfolio
- Emergency fund: $20,000 in high-yield savings

**Target Portfolio Allocation:**
- 70% Stocks (35% US, 25% International, 10% Emerging)
- 15% Bonds (Municipal focus given high tax bracket)
- 10% REITs  
- 5% Alternatives (Commodities, Individual stocks)

## Key Takeaways

1. **Risk management is personal**: Your unique situation requires customized approaches
2. **Diversification beyond investing**: Career, geographic, and income diversification matter
3. **Systematic approaches win**: Predetermined rules prevent emotional decisions
4. **Professional guidance valuable**: Complex strategies benefit from expert implementation
5. **Regular review essential**: Risk profiles change as wealth and life circumstances evolve

Advanced risk management for high-earning tech professionals requires balancing wealth growth with risk mitigation. The strategies outlined here provide a framework for building substantial wealth while protecting against the unique risks faced by technology professionals.`,
        durationMinutes: 70,
        orderIndex: 3
      }
    });

    // Create Week 2 Quiz
    const week2Quiz = await prisma.quiz.create({
      data: {
        weekId: week2.id,
        title: 'Investment Strategies for High Earners Quiz',
        description: 'Test your understanding of advanced investment strategies, tax-efficient investing, and risk management for high-income tech professionals.'
      }
    });

    // Create Quiz Questions
    const questions = [
      {
        questionText: 'What is the recommended maximum allocation to any single stock (including employer stock) for a diversified portfolio?',
        options: JSON.stringify([
          '10%',
          '5%',
          '15%',
          '20%'
        ]),
        correctAnswer: '1',
        explanation: 'The 5% rule recommends never holding more than 5% of your portfolio in any single stock to avoid concentration risk, including employer stock.'
      },
      {
        questionText: 'For a tech professional in the 37% federal tax bracket, what would be the tax-equivalent yield of a 4% municipal bond?',
        options: JSON.stringify([
          '5.44%',
          '6.35%',
          '7.27%',
          '8.11%'
        ]),
        correctAnswer: '1',
        explanation: 'Tax-equivalent yield = 4% ÷ (1 - 0.37) = 6.35%. Municipal bonds become attractive for high earners due to their tax-free status.'
      },
      {
        questionText: 'Which investment should typically be held in a Roth IRA for tax optimization?',
        options: JSON.stringify([
          'Municipal bonds',
          'High-yield bonds',
          'Emerging market stocks',
          'REIT funds'
        ]),
        correctAnswer: '2',
        explanation: 'Emerging market stocks (highest growth potential) should be in Roth IRAs for tax-free growth, while tax-inefficient assets like REITs and high-yield bonds belong in tax-deferred accounts.'
      },
      {
        questionText: 'What is the annual contribution limit for the mega backdoor Roth strategy in 2024?',
        options: JSON.stringify([
          '$23,000',
          '$37,000',
          '$47,000',
          '$70,000'
        ]),
        correctAnswer: '2',
        explanation: 'The mega backdoor Roth allows up to $47,000 in additional Roth contributions ($70,000 total 401k limit minus $23,000 regular contribution).'
      },
      {
        questionText: 'Which risk management strategy is most appropriate for a tech professional with 80% net worth in employer stock?',
        options: JSON.stringify([
          'Hold the position due to insider knowledge',
          'Systematic selling of 25% of vested shares quarterly',
          'Wait for the stock to double before selling',
          'Sell everything immediately'
        ]),
        correctAnswer: '1',
        explanation: 'Systematic selling of 25% of vested shares quarterly provides a disciplined approach to reducing concentration risk while maintaining some upside participation.'
      }
    ];

    for (let i = 0; i < questions.length; i++) {
      await prisma.question.create({
        data: {
          quizId: week2Quiz.id,
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

    console.log('Course 3 Week 2 added successfully');
    console.log(`- Week 2: ${week2.title}`);
    console.log(`- Lessons: ${lesson1.title}, ${lesson2.title}, ${lesson3.title}`);
    console.log(`- Quiz: ${week2Quiz.title}`);

  } catch (error) {
    console.error('Error adding Course 3 Week 2:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addCourse3Week2();