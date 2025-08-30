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
```
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
```

## Risk Management for Concentrated Wealth

### Managing Employer Stock Concentration

**The Tech Professional's Dilemma:**
- Stock options and RSUs create concentration risk
- Company performance tied to industry and individual employer
- Emotional attachment to "winning" stocks

**De-concentration Strategies:**
1. **Systematic Selling:** Sell 25% of vested options quarterly
2. **Dollar-Cost Averaging Out:** Reduce position over 12-18 months
3. **Hedging Strategies:** Use options to protect large positions while maintaining upside
4. **Tax Optimization:** Time sales to manage tax brackets

### Geographic and Sector Diversification

**Tech Hub Real Estate Risk:**
- High correlation between tech stocks and local real estate
- Consider out-of-state real estate investment
- Geographic diversification in investment accounts

**Industry Concentration Management:**
- Actively avoid additional tech stock investments
- Overweight other sectors (healthcare, consumer staples, energy)
- International diversification beyond tech

## Implementation Strategy for High Earners

### The High-Earner Investment Timeline

**Phase 1: Foundation Building (First $100K)**
- Focus on tax-advantaged account maximization
- Simple three-fund portfolio
- Emergency fund completion
- Debt elimination

**Phase 2: Wealth Acceleration ($100K - $500K)**
- Taxable account development
- Tax-loss harvesting implementation
- Individual stock selection
- Alternative investment consideration

**Phase 3: Wealth Optimization ($500K+)**
- Advanced tax strategies
- Private investment access
- Estate planning integration
- Professional management consideration

### Rebalancing Strategy for Busy Tech Professionals

**Quarterly Rebalancing System:**
1. **Calendar Reminders:** First day of each quarter
2. **Threshold Rebalancing:** Act when allocation exceeds 5% target
3. **Tax Optimization:** Use new contributions to rebalance before selling
4. **Automation Tools:** Use robo-advisors for smaller accounts

**Sample Quarterly Checklist:**
- [ ] Review asset allocation vs. targets
- [ ] Identify tax-loss harvesting opportunities  
- [ ] Rebalance using new contributions first
- [ ] Consider Roth conversion opportunities
- [ ] Review and update investment thesis

## Common Investment Mistakes for High Earners

### Over-Concentration in Growth Stocks

**Problem:** Tech professionals often over-invest in growth stocks
**Solution:** Force diversification into value, international, and defensive sectors

### Timing the Market

**Problem:** High intelligence can lead to overconfidence in market timing
**Solution:** Systematic investing with predetermined rules

### Ignoring Tax Implications

**Problem:** Focus on pre-tax returns instead of after-tax returns
**Solution:** Tax-aware investing with professional consultation

### Lifestyle Inflation Without Investment Scaling

**Problem:** Increasing expenses without proportional investment increases
**Solution:** Automatic investment scaling with salary increases

## Case Study: Alex, Senior Software Engineer

**Situation:**
- Salary: $180,000 + $50,000 annual RSUs
- Age: 32, single
- Current savings: $75,000 (all in savings account)
- 401(k): $125,000 (100% in company stock)
- Goals: Financial independence by 50

**Investment Strategy Implementation:**

**Year 1: Foundation**
- Max 401(k): $23,000 (diversify into target-date fund)
- Max Roth IRA: $7,000 (total stock market index)
- Taxable account: $3,000/month into three-fund portfolio
- Emergency fund: $20,000 in high-yield savings

**Year 2-3: Acceleration**  
- Continue max contributions
- Implement tax-loss harvesting
- Begin individual stock investments (5% allocation)
- Consider mega backdoor Roth if available

**Year 4-5: Optimization**
- Evaluate alternative investments
- Consider real estate investment
- Implement more sophisticated tax strategies
- Regular rebalancing and optimization

**Target Portfolio Allocation:**
- 70% Stocks (35% US, 25% International, 10% Emerging)
- 15% Bonds (Municipal focus given high tax bracket)
- 10% REITs  
- 5% Alternatives (Commodities, Individual stocks)

## Advanced Tax Strategies

### Municipal Bond Strategy for High Earners

**Tax-Equivalent Yield Calculation:**
```
Tax-Equivalent Yield = Municipal Yield ÷ (1 - Tax Rate)

Example: 4% Municipal Bond for 37% Tax Bracket
Tax-Equivalent Yield = 4% ÷ (1 - 0.37) = 6.35%
```

**When Municipal Bonds Make Sense:**
- Federal tax bracket of 32% or higher
- State with high income taxes
- Taxable account investments
- Stable income and low risk tolerance

### Backdoor Roth IRA Strategy

**High-Earner Roth Access:**
1. Contribute $7,000 to traditional IRA (non-deductible)
2. Convert to Roth IRA immediately
3. Pay taxes on gains during conversion period
4. Avoid pro-rata rule complications

**Mega Backdoor Roth (if available):**
1. After-tax 401(k) contributions up to $70,000 total limit
2. In-service distributions to Roth IRA
3. Potential $37,000+ additional Roth space annually

## Key Takeaways

1. **Diversification is critical**: Tech professionals must actively diversify beyond technology
2. **Tax efficiency matters**: High earners benefit significantly from tax-aware investing
3. **Systematic beats emotional**: Predetermined rules prevent behavioral mistakes
4. **Start early and automate**: Time in market beats timing the market
5. **Professional guidance helps**: Complex tax situations benefit from expert advice
6. **Regular review and rebalancing**: Quarterly check-ins maintain target allocations

Your high income provides incredible wealth-building opportunities. Focus on tax-efficient, diversified investing while avoiding the common pitfalls of over-concentration and market timing. The strategies outlined here provide a framework for building substantial wealth over your tech career.`,
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
```
Annual Tax-Advantaged Capacity (2024):
- 401(k): $23,000 ($30,500 if 50+)
- Roth IRA: $7,000 ($8,000 if 50+) [income limits apply]
- HSA: $4,300 individual, $8,550 family
- Total: $34,300+ per year tax-advantaged
```

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
```
Example: California Tech Professional
- Federal Tax Rate: 37%
- California Tax Rate: 13.3%
- Combined Marginal Rate: ~45%

4% Municipal Bond Tax-Equivalent Yield:
4% ÷ (1 - 0.45) = 7.27% taxable equivalent
```

**Municipal Bond Fund Selection:**
- **National:** Vanguard Intermediate-Term Tax-Exempt (VWITX)
- **California:** Vanguard CA Intermediate-Term Tax-Exempt (VCAIX)  
- **New York:** Vanguard NY Tax-Exempt (VNYUX)
- **High-Yield Munis:** Consider for highest earners

## Tax-Loss Harvesting for Tech Professionals

### Systematic Tax-Loss Harvesting Approach

**The Tech Professional's Opportunity:**
High earners often have significant tax-loss harvesting potential:
- RSU vesting creates ordinary income tax liability
- Stock option exercises create AMT situations
- High marginal rates make losses more valuable

**Annual Tax-Loss Harvesting Strategy:**

**Q1 Review (March):**
- Identify positions with unrealized losses
- Calculate potential tax benefits
- Plan harvest timing around RSU vests

**Q2 Implementation (June):**
- Execute loss harvesting before mid-year RSU vest
- Reinvest in similar (not identical) securities
- Document wash sale compliance

**Q4 Optimization (December):**
- Final harvest opportunities
- Balance gains and losses for tax year
- Plan January reinvestments

### Advanced Tax-Loss Harvesting Techniques

**Direct Indexing for High Earners:**
- Own individual stocks instead of index funds
- Harvest losses on individual holdings
- Maintain index-like returns
- Minimum investment typically $250,000+

**ETF Tax-Loss Harvesting Pairs:**
```
Primary Holding → Substitute During Wash Sale
VTI (Total Stock) → SWTSX or FZROX
SPY (S&P 500) → VOO or IVV  
VEA (Developed International) → IEFA or FTIHX
VWO (Emerging Markets) → IEMG or FPADX
VNQ (REITs) → SCHH or FREL
```

**Tax Alpha Generation:**
Studies show tax-loss harvesting can add 0.5-1.0% annually to after-tax returns for high earners - significant over long time periods.

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

**Pro-Rata Rule Management:**
If you have existing traditional IRA balances, the conversion is proportionally taxable. Solutions:
- Roll existing IRAs into 401(k) before conversion
- Convert entire traditional IRA balance
- Consider timing of strategy implementation

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

**Tax Implications:**
- After-tax contributions: No immediate tax
- Conversion: Taxed on earnings only
- Growth: Tax-free forever

## International Investment Tax Considerations

### Foreign Tax Credit Optimization

**Strategy:** Hold international funds in taxable accounts to claim foreign tax credits

**Eligible Funds:**
- Vanguard Total International Stock (VTIAX)
- Vanguard Developed Markets (VTMGX)  
- iShares MSCI EAFE (EFA)
- Any fund with foreign tax withholdings

**Tax Benefit:**
Foreign taxes paid by the fund can be claimed as credits against US taxes, but only in taxable accounts.

### Currency Hedged vs Unhedged

**Unhedged International (Default Choice):**
- Full currency exposure
- Higher volatility but better diversification
- No hedging costs

**Currency Hedged (Conservative Choice):**
- Reduces currency volatility
- Focus on foreign stock returns only
- Annual hedging costs (~0.10-0.20%)

## Estate Tax Planning for High Earners

### Federal Estate Tax Considerations

**2024 Estate Tax Exemption:** $13.61 million per person
**Sunset Provision:** Reduces to ~$7 million in 2026

**Strategies for Tech Wealth:**
- **Annual Gifting:** $18,000 per recipient (2024)
- **Lifetime Exemption:** Use before 2026 reduction
- **Grantor Trusts:** Advanced wealth transfer strategies
- **Charitable Strategies:** CRTs, CLTs for tax efficiency

### Generation-Skipping Transfer Tax

For tech professionals building substantial wealth:
- **GST Exemption:** $13.61 million (2024)
- **Planning Opportunity:** Use exemption before sunset
- **Dynasty Trust Strategies:** Multi-generational wealth transfer

## Advanced Investment Vehicle Access

### Private Investment Opportunities

**Accredited Investor Status (Income Test):**
- Individual: $200,000+ annual income
- Joint: $300,000+ annual income
- Net Worth: $1 million+ (excluding primary residence)

**Investment Opportunities:**
- Private equity funds
- Hedge funds
- Private REITs
- Angel investing
- Venture capital funds

**Due Diligence Requirements:**
- Higher minimum investments ($25,000-$1,000,000+)
- Limited liquidity
- Higher fees
- Complex tax reporting

### Qualified Small Business Stock (QSBS)

**Tax Benefit:** Up to $10 million or 10x basis gain exclusion
**Requirements:**
- C-Corporation stock
- $50 million or less gross assets when issued
- Active business (not passive investment)
- 5-year holding period

**Tech Professional Application:**
- Early-stage startup investments
- Angel investing opportunities
- Potential tax-free gains on successful exits

## Technology Tools for Tax-Efficient Investing

### Portfolio Management Software

**Professional Tools:**
- **Riskalyze:** Risk tolerance and portfolio optimization
- **Morningstar Direct:** Advanced fund analysis
- **Orion Advisor Tech:** Professional portfolio management
- **BlackRock Aladdin:** Institutional risk management

**Consumer Tools:**
- **Personal Capital:** Free portfolio analysis
- **Betterment:** Automated tax-loss harvesting
- **Wealthfront:** Direct indexing for high balances
- **M1 Finance:** Automated rebalancing and pie investing

### Tax Planning Software

**Professional Grade:**
- **BNA Income Tax Planner:** Comprehensive tax planning
- **Lacerte Tax:** Professional tax preparation
- **CCH Axcess:** Integrated tax and planning

**Consumer Options:**
- **TurboTax:** Premium version for complex situations
- **FreeTaxUSA:** Lower cost for straightforward returns
- **Credit Karma Tax:** Free option with investment support

## Implementation Timeline for High Earners

### Year 1: Foundation Setting
**Quarter 1:**
- Open and max fund Roth IRA (backdoor if needed)
- Increase 401(k) to maximum contribution
- Set up automated investing in taxable account

**Quarter 2:**
- Implement basic three-fund portfolio
- Begin tax-loss harvesting tracking
- Research municipal bonds for tax situation

**Quarters 3-4:**
- Execute first tax-loss harvesting
- Review and optimize asset location
- Plan for upcoming year contributions

### Year 2-3: Strategy Refinement
- Implement mega backdoor Roth if available
- Add international funds to taxable accounts
- Begin more sophisticated tax-loss harvesting
- Consider municipal bond allocation

### Year 4+: Advanced Optimization
- Evaluate direct indexing opportunities
- Consider alternative investments
- Implement estate planning strategies
- Professional tax planning consultation

## Common Tax-Efficiency Mistakes

### Mistake 1: Ignoring Asset Location
**Problem:** Holding tax-inefficient investments in taxable accounts
**Solution:** Use asset location hierarchy for optimal tax treatment

### Mistake 2: Over-Trading in Taxable Accounts
**Problem:** Short-term capital gains taxed as ordinary income
**Solution:** Buy and hold strategy for taxable investments

### Mistake 3: Missing Backdoor Roth Opportunities
**Problem:** Leaving Roth capacity unused due to income limits
**Solution:** Systematic backdoor Roth implementation

### Mistake 4: Emotional Tax-Loss Harvesting
**Problem:** Making investment decisions based on tax considerations alone
**Solution:** Tax tail should never wag the investment dog

## Case Study: Maria, Tech Executive

**Situation:**
- Salary: $275,000 + $100,000 RSU
- Federal: 35% bracket, California: 9.3% state
- Combined marginal rate: ~42%
- Age: 38, married filing jointly

**Tax-Efficient Strategy:**

**Account Optimization:**
- Max 401(k): $23,000 in traditional (tax deferral at 42%)
- Mega backdoor Roth: $37,000 annually if available
- Taxable: Focus on municipal bonds and tax-efficient funds

**Investment Selection:**
- **Taxable Account:** 60% CA municipal bonds, 40% tax-efficient equity
- **401(k):** High-yield bonds, REITs, active strategies  
- **Roth IRA:** Growth stocks, emerging markets, alternatives

**Tax-Loss Harvesting:**
- Systematic quarterly review
- Target $50,000+ annual loss harvesting
- Use to offset RSU vesting taxes

**Results After 5 Years:**
- Tax alpha: ~0.8% annually from optimization
- Additional wealth: $75,000+ from tax efficiency
- Retirement accounts: 40% higher than unoptimized approach

## Key Takeaways

1. **After-tax returns matter most**: Focus on what you keep, not what you earn
2. **Asset location is crucial**: Right investment in the right account
3. **Systematic tax-loss harvesting**: Can add 0.5-1.0% annually for high earners
4. **Backdoor Roth strategies**: Access tax-free growth despite income limits
5. **Municipal bonds for high brackets**: Often superior after-tax returns
6. **Professional guidance valuable**: Complex situations benefit from expert advice

Tax-efficient investing becomes increasingly important as your income rises. The strategies outlined here can add significant value to your long-term wealth building, often worth more than picking the "best" investments while ignoring tax implications.`,
        durationMinutes: 80,
        orderIndex: 2
      }
    });

    // Create Lesson 3: Risk Management and Advanced Strategies
    const lesson3 = await prisma.lesson.create({
      data: {
        weekId: week2.id,
        title: 'Risk Management and Advanced Investment Strategies',
        slug: 'risk-management-advanced-strategies',
        content: `# Risk Management and Advanced Investment Strategies

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

### Factor-Based Investing for Tech Professionals

**Value Factor:**
- Historically outperforms over long periods
- Provides diversification from growth-heavy tech exposure
- Consider international value funds for diversification

**Quality Factor:**
- Companies with strong balance sheets
- Consistent profitability and low debt
- Defensive characteristics during downturns

**Momentum Factor:**
- Trend-following investment approach
- Can be high-turnover (consider in tax-deferred accounts)
- Provides diversification from value strategies

**Low Volatility Factor:**
- Lower risk, competitive returns
- Useful for high earners with low risk tolerance
- Consider for portion of conservative allocation

### Global Diversification Strategies

**US Market Concentration Risk:**
The US represents ~60% of global market cap but tech professionals are often 90%+ US-focused in careers and investments.

**International Allocation Framework:**
```
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
```

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

### Commodity and Inflation Protection

**Commodity Exposure Benefits:**
- Inflation hedge
- Portfolio diversification
- Crisis performance (sometimes)

**Implementation Options:**
- Commodity ETFs (DBC, PDBC)
- Individual commodity futures
- Commodity-focused mutual funds
- Natural resource stocks

### Cryptocurrency Considerations

**Portfolio Allocation Guidelines:**
- Maximum 5-10% of total portfolio
- Treat as speculative/alternative asset
- Consider tax implications (ordinary income treatment)
- Understand regulatory risks

**Implementation Approaches:**
- Direct ownership (Bitcoin, Ethereum)
- Cryptocurrency ETFs (when available)
- Blockchain technology stocks
- DeFi protocols (advanced/high-risk)

## Advanced Risk Management Techniques

### Hedging Strategies for Concentrated Stock Positions

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

**Life Insurance Strategies:**
- Term life for income replacement needs
- Permanent life for estate planning (high net worth)
- Consider increasing coverage with wealth accumulation

### Behavioral Risk Management

**Systematic Investment Rules:**
Create and follow predetermined investment rules:
- Automatic rebalancing triggers
- Maximum position sizes
- Systematic profit-taking rules
- Loss-cutting guidelines

**Emotional Decision Framework:**
- Separate investment decisions from market emotions
- Dollar-cost averaging during volatility
- Pre-commitment to investment strategy
- Regular review and adjustment schedule

## Advanced Tax-Aware Risk Management

### Tax-Loss Harvesting as Risk Management

**Volatility Buffer Strategy:**
- Maintain slightly higher equity allocation
- Use tax-loss harvesting to reduce tax burden
- Effectively increases after-tax returns
- Creates flexibility for risk management

**Systematic Rebalancing:**
- Use tax-loss harvesting during rebalancing
- Maintain target allocations while managing taxes
- Consider tax implications in rebalancing decisions

### Municipal Bond Laddering

**Risk Management Benefits:**
- Predictable income stream
- Protection against interest rate risk
- State-specific tax benefits
- Flexibility for reinvestment

**Implementation Strategy:**
```
5-Year Municipal Ladder Example:
Year 1: $20,000 maturity (reinvest or adjust)
Year 2: $20,000 maturity  
Year 3: $20,000 maturity
Year 4: $20,000 maturity
Year 5: $20,000 maturity
Total: $100,000 over 5 years
```

## Technology Integration and Automation

### Robo-Advisor Integration

**Benefits for Busy Tech Professionals:**
- Automated rebalancing
- Tax-loss harvesting automation
- Low fees and minimum involvement
- Professional-level optimization

**Top Platforms for High Earners:**
- **Wealthfront:** Direct indexing at higher levels
- **Betterment:** Goal-based investing approach
- **Schwab Intelligent:** No advisory fees
- **Vanguard Personal Advisor:** Hybrid model

### Portfolio Management Tools

**Professional-Grade Software:**
- **Portfolio Visualizer:** Backtesting and analysis
- **FidSafe:** Document management and planning
- **YCharts:** Investment research and analysis
- **Morningstar Direct:** Professional investment data

**APIs and Data Integration:**
- Personal Capital API for account aggregation
- Plaid integration for automated data collection
- Custom spreadsheet solutions
- Investment tracking applications

## Crisis Management and Black Swan Events

### Portfolio Stress Testing

**Scenario Analysis:**
Test portfolio performance under various stress scenarios:
- 2008 Financial Crisis (-50% equity decline)
- Tech Bubble Burst (-80% growth stock decline)
- Inflation spike (1970s-style stagflation)
- Personal job loss (income disruption)

**Stress Test Results Application:**
- Adjust asset allocation based on stress test comfort
- Maintain higher emergency fund for volatile scenarios
- Consider insurance and hedging strategies
- Plan for various economic environments

### Black Swan Event Preparation

**Portfolio Resilience Strategies:**
- Maintain some allocation to defensive assets
- Geographic and currency diversification
- Avoid excessive leverage
- Maintain liquid emergency reserves

**Career Risk Mitigation:**
- Skill diversification and continuous learning
- Network development outside immediate company
- Emergency fund sized for extended job search
- Consider sabbatical planning for skill updates

## Case Study: David, Principal Engineer at FAANG Company

**Situation:**
- Base Salary: $220,000
- Annual RSUs: $300,000 (vesting over 4 years)
- Stock Options: $500,000 unvested
- Age: 29, single
- Current Net Worth: $450,000
- Risk: 85% net worth in employer stock

**Advanced Risk Management Strategy:**

**Phase 1: Immediate De-risking (6 months)**
- Sell 25% of vested RSUs quarterly
- Diversify into broad market index funds
- Build 6-month emergency fund
- Implement systematic selling plan for future vests

**Phase 2: Systematic Diversification (Years 1-2)**
- Continue quarterly RSU sales (25% rule)
- Build international and bond allocations
- Consider protective put options for remaining position
- Maximize 401(k) and IRA contributions

**Phase 3: Advanced Strategies (Years 3-5)**
- Explore exchange fund opportunities
- Consider collar strategies for remaining concentration
- Build alternative investment allocation
- Estate planning for growing wealth

**Target End-State Allocation:**
- 40% Diversified Equity (25% US, 15% International)
- 15% Employer Stock (down from 85%)
- 20% Bonds/Fixed Income
- 15% Alternatives (REITs, Commodities)
- 10% Cash/Emergency Fund

**Risk Management Results:**
- Reduced single-stock risk from 85% to 15%
- Maintained wealth building through diversified growth
- Added defensive positioning for market downturns
- Created flexibility for future opportunities

## Advanced Estate Planning Considerations

### Generation-Skipping Strategies

**Dynasty Trust Structures:**
- Perpetual wealth transfer
- Generation-skipping tax optimization
- Professional trustee management
- State selection for favorable laws

**Grantor Trust Strategies:**
- Intentionally Defective Grantor Trusts (IDGTs)
- Grantor pays income taxes (gift to beneficiaries)
- Leveraged wealth transfer
- Complex but powerful for high net worth

### Charitable Giving Strategies

**Charitable Remainder Trusts (CRTs):**
- Tax deduction for charitable contribution
- Income stream for life/term of years
- Diversification of concentrated positions
- Estate tax reduction

**Donor Advised Funds:**
- Immediate tax deduction
- Flexible giving timeline
- Professional investment management
- Lower complexity than private foundation

## Key Implementation Guidelines

### Risk Assessment Checklist
- [ ] Calculate total employer stock concentration
- [ ] Assess geographic risk concentration
- [ ] Evaluate income diversification
- [ ] Review insurance coverage adequacy
- [ ] Analyze tax concentration risk

### Portfolio Construction Steps
1. **Define risk tolerance and capacity**
2. **Set target asset allocation**
3. **Implement core holdings first**
4. **Add satellite positions systematically**
5. **Automate rebalancing and contributions**
6. **Monitor and adjust quarterly**

### Advanced Strategy Timeline
- **Years 1-2:** Focus on de-risking and foundation building
- **Years 3-5:** Implement advanced strategies and alternatives
- **Years 5+:** Sophisticated tax planning and estate strategies

## Key Takeaways

1. **Risk management is personal**: Your unique situation requires customized approaches
2. **Diversification beyond investing**: Career, geographic, and income diversification matter
3. **Systematic approaches win**: Predetermined rules prevent emotional decisions
4. **Professional guidance valuable**: Complex strategies benefit from expert implementation
5. **Technology enhances execution**: Use tools to automate and optimize strategies
6. **Regular review essential**: Risk profiles change as wealth and life circumstances evolve

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