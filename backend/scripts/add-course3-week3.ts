import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCourse3Week3() {
  try {
    // Find Course 3
    const course = await prisma.course.findFirst({
      where: { slug: 'personal-finance-tech' }
    });

    if (!course) {
      throw new Error('Course 3 not found');
    }

    console.log('Adding Week 3 to Course 3:', course.title);

    // Create Week 3: Stock Options, RSUs, and Equity Compensation
    const week3 = await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: 3,
        title: 'Stock Options, RSUs, and Equity Compensation',
        overview: 'Master the complexities of equity compensation and optimize your stock option and RSU strategies for maximum wealth building.',
        learningObjectives: JSON.stringify([
          'Understand different types of equity compensation (ISO, NQ, RSU, ESPP)',
          'Develop tax-optimal exercise and sale strategies',
          'Manage concentration risk from employer stock',
          'Plan for liquidity events (IPO, acquisition) and tax implications'
        ]),
        estimatedHours: 12
      }
    });

    // Create Lesson 1: Understanding Equity Compensation Types
    const lesson1 = await prisma.lesson.create({
      data: {
        weekId: week3.id,
        title: 'Understanding Equity Compensation: ISOs, NQSOs, RSUs, and ESPP',
        slug: 'understanding-equity-compensation-types',
        content: `# Understanding Equity Compensation: ISOs, NQSOs, RSUs, and ESPP

## Introduction: The Tech Professional's Golden Handcuffs

Equity compensation is often the largest component of total compensation for tech professionals. Understanding the different types, tax implications, and strategic considerations can mean the difference between financial success and costly mistakes.

## Types of Equity Compensation

### Incentive Stock Options (ISOs)

**Key Characteristics:**
- Favorable tax treatment for long-term holding
- Alternative Minimum Tax (AMT) implications
- $100,000 annual exercise limit
- Must be exercised within 10 years

**Tax Treatment:**
- **Exercise:** No regular income tax, but AMT may apply
- **Sale (Qualifying Disposition):** Capital gains only
- **Sale (Disqualifying Disposition):** Ordinary income + capital gains

**Qualifying Disposition Requirements:**
- Hold for 2 years from grant date
- Hold for 1 year from exercise date
- Both conditions must be met

**AMT Calculation:**
AMT Income = (Fair Market Value - Exercise Price) × Shares Exercised

**Example:**
Grant: 1,000 ISOs at $10 strike price
Exercise: FMV = $50 per share
AMT Income: ($50 - $10) × 1,000 = $40,000

### Non-Qualified Stock Options (NQSOs)

**Key Characteristics:**
- No special tax benefits
- More flexible than ISOs
- No AMT implications at exercise
- No $100,000 limit

**Tax Treatment:**
- **Exercise:** Ordinary income tax on spread
- **Sale:** Capital gains/losses on post-exercise appreciation

**Calculation:**
Ordinary Income = (FMV at Exercise - Exercise Price) × Shares

**Example:**
Grant: 1,000 NQSOs at $15 strike price
Exercise: FMV = $45 per share
Ordinary Income: ($45 - $15) × 1,000 = $30,000

### Restricted Stock Units (RSUs)

**Key Characteristics:**
- No upfront cost or exercise required
- Vest over time based on schedule
- Taxed as ordinary income at vest
- Common at public companies

**Tax Treatment:**
- **Vesting:** Full fair market value taxed as ordinary income
- **Sale:** Capital gains/losses from vest price

**Vesting Schedule Examples:**
- **25% Annual:** 25% each year for 4 years
- **Cliff + Monthly:** 25% after 1 year, then monthly
- **Backloaded:** 10%, 20%, 30%, 40% over 4 years

**Tax Planning Considerations:**
- Cannot defer taxation at vest (unlike options)
- Withholding often insufficient for high earners
- Consider tax-loss harvesting to offset gains

### Employee Stock Purchase Plan (ESPP)

**Key Characteristics:**
- Purchase company stock at discount
- Look-back provision common (best price)
- Holding period requirements for favorable tax

**Tax Treatment:**
- **Qualifying Disposition:** Ordinary income + capital gains
- **Disqualifying Disposition:** All ordinary income

**Calculation Example:**
Purchase Price: Lower of:
- 85% of price at beginning of offering period
- 85% of price at end of offering period

**Strategic Considerations:**
- Immediate sale often optimal (guaranteed 15% return)
- Consider concentration risk
- Factor in tax implications

## Equity Compensation Decision Framework

### Exercise Timing Strategy

**For ISOs:**
**Early Exercise Considerations:**
- Lower AMT exposure when FMV = strike price
- Start capital gains holding period
- Risk of forfeiture if company fails
- Cash flow impact

**Traditional Exercise:**
- Wait until closer to expiration
- More certainty about company value
- Higher AMT exposure
- Less time for capital gains treatment

**For NQSOs:**
- Generally exercise when you need liquidity
- Consider tax bracket timing
- Monitor expiration dates
- Factor in opportunity cost of capital

### Sale Strategy Framework

**Diversification vs. Concentration:**

**The 5% Rule:** Maximum 5% of net worth in any single stock

**Systematic Selling Approach:**
- Sell 25% of vested equity each quarter
- Reduces concentration risk gradually
- Smooths tax impact over time
- Maintains some upside participation

**Tax-Optimal Timing:**
- Consider current year tax situation
- Plan for RSU vesting spikes
- Use tax-loss harvesting to offset gains
- Consider charitable giving for appreciated stock

## Advanced Tax Planning Strategies

### AMT Management for ISOs

**AMT Avoidance Strategies:**
- Spread exercises over multiple years
- Monitor AMT crossover point
- Consider state AMT implications
- Plan with tax professional

**AMT Credit Recovery:**
- AMT paid creates credit for future years
- Credit can offset regular tax
- Track AMT credit carryforward
- Accelerate recovery through Roth conversions

### Section 83(b) Election

**When Available:**
- Early exercise of unvested options
- Restricted stock grants
- Must file within 30 days

**Benefits:**
- Lock in current tax basis
- Convert future appreciation to capital gains
- Useful when FMV = exercise price

**Risks:**
- Pay tax on unvested shares
- No refund if shares are forfeited
- Cash flow impact

### Charitable Giving Strategies

**Donating Appreciated Company Stock:**
- Avoid capital gains tax
- Full fair market value deduction
- Effective for concentrated positions
- Consider donor-advised funds

**Requirements:**
- Must own shares for 1+ years
- Limited to 30% of AGI annually
- Carryforward available for excess

## Managing Concentration Risk

### The Tech Professional's Dilemma

**Common Concentration Levels:**
- Early employees: 70-90% of net worth in company stock
- Mid-career: 40-60% in company stock
- Late career: 20-40% in company stock

**Risks:**
- Single company failure
- Industry downturn
- Correlation with career/salary
- Lack of diversification

### De-concentration Strategies

**Systematic Approach:**
1. **Set Target:** Maximum 10-15% in company stock
2. **Create Timeline:** 2-3 year reduction plan
3. **Automate Sales:** Quarterly or monthly selling
4. **Reinvest:** Diversified portfolio

**10b5-1 Plans:**
- Pre-planned selling program
- Avoid insider trading issues
- Systematic execution
- Can be modified or cancelled

**Tax Considerations:**
- Spread sales across tax years
- Coordinate with other income
- Use tax-loss harvesting
- Consider state tax implications

## Liquidity Event Planning

### IPO Preparation

**Pre-IPO Considerations:**
- Exercise options while private (lower AMT)
- File 83(b) elections if applicable
- Build cash reserves for taxes
- Plan for lockup period

**Lockup Period Strategy:**
- Typically 90-180 days post-IPO
- Cannot sell during lockup
- Plan for tax payments
- Consider hedging strategies (collars, puts)

**Post-Lockup Planning:**
- Systematic selling plan
- Tax-loss harvesting opportunities
- Estate planning considerations
- Charitable giving strategies

### Acquisition Planning

**Types of Acquisitions:**
- **Cash Deal:** Immediate tax liability
- **Stock Deal:** May defer taxation
- **Mixed Deal:** Combination of cash and stock

**Tax Planning:**
- Accelerated vesting often occurs
- Large tax liability in acquisition year
- Consider installment sale treatment
- Plan for estimated tax payments

## Case Studies

### Case Study 1: Maria, Senior Engineer at Pre-IPO Startup

**Situation:**
- 10,000 ISOs at $2 strike price
- Current FMV: $25 per share
- Company planning IPO in 18 months
- Annual income: $150,000

**Strategy:**
- Exercise 2,500 options now (AMT planning)
- File 83(b) election for early exercise
- Exercise remaining options post-IPO
- Plan for 25% quarterly selling post-lockup

**Tax Implications:**
- Current AMT: ($25 - $2) × 2,500 = $57,500
- Post-IPO ordinary income on remaining options
- Capital gains treatment on early exercised shares

### Case Study 2: David, Engineering Manager with RSUs

**Situation:**
- 400 RSUs vesting over 4 years (100/year)
- Current stock price: $180
- Annual RSU vest value: $18,000
- Total compensation: $220,000

**Strategy:**
- Sell 50% of RSUs at vest (tax planning)
- Hold 50% for potential appreciation
- Use tax-loss harvesting to offset gains
- Rebalance portfolio to maintain diversification

**Tax Planning:**
- Annual ordinary income: $18,000
- Consider Roth IRA contributions
- Plan for tax bracket management
- Quarterly estimated tax payments

### Case Study 3: Sarah, Staff Engineer with ESPP

**Situation:**
- ESPP with 15% discount
- Look-back provision
- $25,000 annual contribution limit
- Stock volatility: 30%

**Strategy:**
- Maximize ESPP contribution
- Immediate sale strategy (guaranteed return)
- Reinvest proceeds in diversified portfolio
- Monitor for tax-loss harvesting opportunities

**Expected Returns:**
- Minimum return: 17.6% (1/0.85 - 1)
- Look-back potential: Additional upside
- Annual benefit: ~$4,400 minimum

## Implementation Checklist

### Immediate Actions:
- [ ] Inventory all equity compensation grants
- [ ] Understand vesting schedules and expiration dates
- [ ] Calculate AMT exposure for ISO exercises
- [ ] Set up systematic selling plan
- [ ] Build cash reserves for tax payments

### Annual Review Items:
- [ ] Assess concentration risk levels
- [ ] Update exercise and sale strategies
- [ ] Review AMT planning opportunities
- [ ] Coordinate with overall tax planning
- [ ] Monitor for liquidity events

### Professional Support:
- [ ] Tax professional familiar with equity comp
- [ ] Fee-only financial planner
- [ ] Estate planning attorney (high net worth)
- [ ] Insurance review for growing assets

## Common Mistakes to Avoid

### Mistake 1: Ignoring AMT Implications
**Problem:** Large AMT liability from ISO exercises
**Solution:** Calculate AMT before exercising, spread exercises over years

### Mistake 2: Over-concentration in Company Stock
**Problem:** 70%+ net worth in single company
**Solution:** Systematic selling plan, diversification timeline

### Mistake 3: Missing 83(b) Election Deadline
**Problem:** Higher future tax liability
**Solution:** Calendar reminders, work with tax professional

### Mistake 4: Poor Liquidity Event Planning
**Problem:** Massive tax bill in IPO/acquisition year
**Solution:** Tax planning 12-18 months in advance

### Mistake 5: Emotional Decision Making
**Problem:** Holding "winning" stocks too long
**Solution:** Predetermined selling rules, systematic approach

## Key Takeaways

1. **Understand your grants**: Each type has different tax implications and strategies
2. **Plan for taxes**: Equity compensation often creates large tax liabilities
3. **Manage concentration risk**: Systematic selling prevents over-concentration
4. **Professional guidance crucial**: Complex rules require expert advice
5. **Plan for liquidity events**: IPOs and acquisitions require advance planning
6. **Regular review essential**: Strategies should evolve with career and market changes

Equity compensation can be the foundation of significant wealth for tech professionals. However, it requires active management, tax planning, and risk mitigation to optimize outcomes. The strategies outlined here provide a framework for turning your equity compensation into diversified, long-term wealth.`,
        durationMinutes: 85,
        orderIndex: 1
      }
    });

    // Create Lesson 2: Advanced Exercise and Sale Strategies
    const lesson2 = await prisma.lesson.create({
      data: {
        weekId: week3.id,
        title: 'Advanced Exercise and Sale Strategies for Maximum Wealth',
        slug: 'advanced-exercise-sale-strategies',
        content: `# Advanced Exercise and Sale Strategies for Maximum Wealth

## Introduction: Strategic Timing for Wealth Optimization

The timing of option exercises and stock sales can dramatically impact your after-tax wealth. This lesson covers advanced strategies for optimizing exercise timing, managing tax implications, and building systematic approaches to equity compensation management.

## Advanced Exercise Strategies

### Early Exercise Strategy for ISOs

**When to Consider Early Exercise:**
- Company valuation is low (FMV ≈ Strike Price)
- High confidence in company growth potential
- Sufficient cash reserves for exercise
- Long time horizon until potential liquidity

**Benefits of Early Exercise:**
- Minimal AMT exposure when FMV = Strike Price
- Starts capital gains holding period clock
- Converts future appreciation to capital gains
- Maximum time for qualifying disposition

**Risks of Early Exercise:**
- Cash tied up in illiquid investment
- Total loss if company fails
- Opportunity cost of invested capital
- Cannot recover taxes if shares become worthless

**Early Exercise Calculation:**
Exercise Cost = Strike Price × Shares
AMT Impact = (FMV - Strike Price) × Shares
Cash Needed = Exercise Cost + Tax Impact

**Example:**
1,000 ISOs at $5 strike, FMV = $6
Exercise Cost: $5,000
AMT Impact: ($6 - $5) × 1,000 = $1,000
Total Cash Needed: ~$5,300 (including AMT)

### Layered Exercise Strategy

**Concept:** Exercise options in layers over multiple years to manage AMT and spread tax impact.

**Implementation:**
Year 1: Exercise options with AMT = $25,000
Year 2: Exercise options with AMT = $25,000  
Year 3: Exercise remaining options

**Benefits:**
- Spreads AMT impact over multiple years
- Provides multiple tax basis points
- Reduces concentration of tax liability
- Maintains flexibility for market timing

### Net Exercise vs. Cash Exercise

**Cash Exercise (Preferred):**
- Pay exercise price in cash
- Keep all shares
- Maximizes equity ownership
- Better for long-term wealth building

**Net Exercise (Cashless):**
- Use some shares to pay exercise price
- Keep fewer shares
- No cash outlay required
- Creates immediate taxable income

**Comparison Example:**
1,000 options at $10 strike, FMV = $40

Cash Exercise:
- Pay $10,000 cash
- Keep 1,000 shares worth $40,000
- Net investment: $10,000

Net Exercise:
- Sell 250 shares to pay $10,000 cost
- Keep 750 shares worth $30,000
- Net investment: $0, but less equity ownership

## Advanced Sale Strategies

### Systematic Selling Framework

**The 25% Rule:**
Sell 25% of vested equity each quarter to systematically reduce concentration risk while maintaining upside participation.

**Benefits:**
- Reduces concentration risk gradually
- Smooths tax impact over time
- Removes emotional decision making
- Maintains some company upside

**Implementation:**
RSU Vest: 100 shares at $50 = $5,000
Immediate Sale: 25 shares = $1,250
Hold: 75 shares for future appreciation
Next Quarter: Sell 25% of new vests + 25% of held shares

### Tax-Optimal Sale Timing

**Tax Bracket Management:**
- Monitor annual income levels
- Time sales to avoid bracket bumps
- Consider multi-year tax planning
- Use tax-loss harvesting to offset gains

**Long-Term vs. Short-Term Gains:**
Hold Period: 1 year for long-term treatment
Tax Rates (2024):
- Long-term capital gains: 0%, 15%, 20%
- Short-term capital gains: Ordinary income rates (up to 37%)

**State Tax Considerations:**
- High-tax states: CA (13.3%), NY (8.82%)
- No-tax states: WA, TX, FL, NV
- Consider timing around state residence changes

### 10b5-1 Trading Plans

**What is a 10b5-1 Plan:**
Pre-arranged trading plan that allows insiders to sell shares without insider trading violations.

**Benefits:**
- Systematic execution
- Removes timing decisions
- Provides legal safe harbor
- Can be used for both sales and purchases

**Requirements:**
- Must be established when not in possession of material non-public information
- Specific instructions for timing, amount, and price
- Cannot modify during blackout periods

**Example 10b5-1 Structure:**
Plan Duration: 12 months
Frequency: Monthly sales
Amount: 500 shares per month or $X dollars
Price Conditions: Market order or limit order parameters

### Concentration Risk Management

**Target Allocation Framework:**
- Early Career: Max 15% in company stock
- Mid Career: Max 10% in company stock  
- Late Career: Max 5% in company stock

**Risk Assessment Questions:**
1. What percentage of net worth is in company stock?
2. How correlated is the stock with your salary/bonus?
3. What would happen if the stock declined 50%?
4. How much time until you need the money?

**Diversification Timeline:**
Year 1: Reduce concentration to 25%
Year 2: Reduce concentration to 15%  
Year 3: Reduce concentration to target level
Ongoing: Maintain target through systematic selling

## Advanced Tax Planning Strategies

### AMT Planning for ISO Exercises

**AMT Calculation:**
Alternative Minimum Taxable Income (AMTI) = Regular Income + ISO Spread + Other AMT Adjustments
AMT = 28% × (AMTI - AMT Exemption)
Tax Owed = Higher of Regular Tax or AMT

**AMT Exemption (2024):**
Single: $85,700
Married Filing Jointly: $133,300
Phase-out begins at higher income levels

**ISO Exercise Planning:**
- Calculate AMT impact before exercising
- Spread exercises to avoid large AMT years
- Consider exercising in lower income years
- Monitor AMT credit accumulation

### Tax-Loss Harvesting Integration

**Coordinating with Equity Sales:**
- Harvest losses before large RSU vests
- Use losses to offset option exercise gains
- Build loss bank for future use
- Monitor wash sale rules

**Strategic Loss Generation:**
- Rebalance portfolio to realize losses
- Use similar but not identical securities
- Maximize loss utilization each year
- Plan harvesting around equity events

### Charitable Giving Strategies

**Donating Appreciated Stock:**
Benefits:
- Avoid capital gains tax
- Full fair market value deduction
- Reduce concentration risk
- Support charitable causes

Requirements:
- Hold stock for more than 1 year
- Deduction limited to 30% of AGI
- Must itemize deductions
- Get qualified appraisal for large gifts

**Donor-Advised Funds:**
- Make large contribution in high-income year
- Take immediate tax deduction
- Invest funds for growth
- Make grants to charities over time

## Liquidity Event Optimization

### Pre-IPO Strategy

**12-18 Months Before IPO:**
- Exercise ISOs to start capital gains clock
- Build cash reserves for tax payments
- Consider 83(b) elections for early exercise
- Review estate planning implications

**6-12 Months Before IPO:**
- Finalize option exercise strategy
- Set up 10b5-1 plan framework
- Review insurance coverage
- Plan for lockup period cash flow

**IPO Month:**
- Prepare for lockup period restrictions
- Set up tax payment accounts
- Monitor for lock-up expiration
- Plan post-lockup selling strategy

### Post-IPO Optimization

**Lockup Period (Months 1-6):**
- No selling allowed typically
- Monitor stock performance
- Plan for lockup expiration
- Consider hedging strategies if allowed

**Post-Lockup (Month 6+):**
- Implement systematic selling plan
- Diversify into broader portfolio
- Continue tax-loss harvesting
- Regular rebalancing

### Acquisition Planning

**All-Cash Acquisition:**
- Immediate tax liability on full gain
- No ability to defer taxation
- Plan for large tax payments
- Consider charitable giving to offset

**All-Stock Acquisition:**
- May defer taxation until sale of acquirer stock
- Research reorganization tax treatment
- Understand new company restrictions
- Plan for potential future liquidity

**Mixed Consideration:**
- Immediate tax on cash portion
- Potential deferral on stock portion
- More complex tax calculations
- Professional tax advice essential

## Technology Tools and Automation

### Portfolio Management Software

**Professional Tools:**
- Schwab Stock Plan Connect
- Morgan Stanley StockPlan Connect  
- Fidelity Stock Plan Services
- E*TRADE Equity Edge

**Features to Look For:**
- Automated exercise notifications
- Tax impact calculations
- 10b5-1 plan setup
- Integration with tax software

### Tax Planning Software

**Advanced Calculations:**
- AMT impact modeling
- Multi-year tax projections
- Scenario analysis tools
- Loss harvesting optimization

**Recommended Platforms:**
- BNA Income Tax Planner
- Holistiplan for advisors
- Personal Capital tax tools
- TurboTax Live for complex situations

## Case Study: Complete Strategy Implementation

### Background: Jennifer, Principal Engineer
- Company: Pre-IPO SaaS startup
- ISOs: 20,000 at $3 strike (FMV: $15)
- RSUs: 1,000 vesting over 4 years
- NQSOs: 5,000 at $8 strike
- Annual Income: $200,000
- IPO Expected: 18 months

### Strategy Development:

**Phase 1: Pre-IPO (Next 12 months)**
- Exercise 5,000 ISOs now (AMT = $60,000)
- File 83(b) election for early exercise
- Build $25,000 cash reserve for taxes
- Exercise remaining ISOs 6 months before IPO

**Phase 2: IPO Preparation (Months 12-18)**
- Exercise remaining ISOs (manage AMT)
- Prepare for lockup period expenses
- Set up 10b5-1 plan framework
- Review insurance and estate planning

**Phase 3: Post-IPO (Months 18+)**
- Execute 10b5-1 plan: 25% quarterly selling
- Exercise NQSOs based on market conditions
- Diversify into 60/25/15 portfolio (US/Intl/Bonds)
- Continue systematic rebalancing

### Expected Outcomes:
- Reduced concentration from 80% to 15% over 3 years
- Optimized tax treatment through strategic timing
- Built diversified $2M+ portfolio
- Maintained upside participation in company growth

## Key Performance Metrics

### Success Measurements:
1. **Concentration Risk:** Target <15% in company stock
2. **Tax Efficiency:** Effective tax rate optimization
3. **Liquidity:** Sufficient cash for taxes and expenses
4. **Growth:** Total portfolio value increase
5. **Risk Management:** Volatility reduction through diversification

### Regular Review Schedule:
- **Monthly:** Monitor vesting schedules and market conditions
- **Quarterly:** Execute systematic selling plan
- **Annually:** Comprehensive strategy review and adjustment
- **Life Events:** Major strategy updates for IPO, acquisition, etc.

## Key Takeaways

1. **Early planning pays:** The best strategies are implemented years before liquidity events
2. **Systematic beats emotional:** Predetermined rules prevent poor timing decisions
3. **Tax planning is crucial:** Poor tax planning can cost 10-15% of total wealth
4. **Professional guidance essential:** Complex strategies require expert implementation
5. **Regular monitoring required:** Strategies must adapt to changing circumstances
6. **Balance risk and reward:** Optimize for tax efficiency while managing concentration risk

Advanced equity compensation strategies can significantly enhance your wealth building potential. The key is implementing systematic approaches early, managing tax implications proactively, and maintaining disciplined execution over time. Remember that the best strategy is one that balances tax optimization, risk management, and your personal financial goals.`,
        durationMinutes: 90,
        orderIndex: 2
      }
    });

    // Create Lesson 3: Liquidity Events and Advanced Planning
    const lesson3 = await prisma.lesson.create({
      data: {
        weekId: week3.id,
        title: 'IPO and Acquisition Planning: Maximizing Liquidity Events',
        slug: 'ipo-acquisition-planning-liquidity-events',
        content: `# IPO and Acquisition Planning: Maximizing Liquidity Events

## Introduction: Preparing for Life-Changing Events

IPOs and acquisitions represent the ultimate goal for many tech professionals with equity compensation. However, these events can create massive tax liabilities and concentration risks if not properly planned. This lesson covers comprehensive strategies for maximizing wealth during liquidity events.

## Understanding Liquidity Events

### Types of Liquidity Events

**Initial Public Offering (IPO):**
- Company goes public on stock exchange
- Creates public market for shares
- Typically includes lockup period (90-180 days)
- Provides ongoing liquidity post-lockup

**Acquisition:**
- Company sold to another company
- May be cash, stock, or mixed consideration
- Typically results in immediate liquidity
- May trigger accelerated vesting

**Secondary Market Sale:**
- Private company allows limited share sales
- Usually restricted to certain employees
- Provides partial liquidity before IPO/acquisition
- Often at discount to potential public valuation

**Direct Listing:**
- Alternative to traditional IPO
- No new shares issued, existing shares trade
- No lockup period typically
- Immediate liquidity for shareholders

### Pre-Event Indicators

**IPO Signals:**
- Hiring of CFO with public company experience
- Selection of investment banks
- Implementation of SOX compliance
- Board composition changes
- Revenue growth and profitability metrics

**Acquisition Signals:**
- Strategic discussions and partnerships
- Due diligence requests
- Management retention discussions
- Integration planning conversations
- Board meeting frequency changes

## IPO Planning Strategy

### Pre-IPO Phase (12-24 months before)

**Option Exercise Strategy:**
- Exercise ISOs while FMV is low
- Start capital gains holding period
- Consider early exercise and 83(b) election
- Manage AMT implications across tax years

**Cash Planning:**
- Build reserves for tax payments
- Calculate potential tax liabilities
- Consider loan options against equity
- Plan for lockup period cash flow

**Risk Management:**
- Review insurance coverage (disability, life, umbrella)
- Consider hedge strategies for concentration risk
- Estate planning updates
- Family financial planning

### IPO Process Phase (6-12 months before)

**Final Exercise Decisions:**
- Complete option exercise strategy
- Monitor AMT accumulation
- Consider NQ vs. ISO exercise timing
- Coordinate with tax professional

**10b5-1 Plan Preparation:**
- Cannot establish during registration process
- Set up framework for post-lockup
- Coordinate with company compliance
- Plan systematic selling approach

**Tax Preparation:**
- Project total tax liability
- Arrange for quarterly payments
- Consider state tax implications
- Plan for potential audit

### Lockup Period Strategy (IPO + 0-180 days)

**During Lockup:**
- Monitor stock performance
- Cannot sell shares typically
- Plan for lockup expiration
- Consider hedging if allowed by company

**Hedging Strategies (if permitted):**
- Protective puts (downside protection)
- Collar strategies (limited upside/downside)
- Forward sale contracts
- Exchange funds for diversification

**Cash Flow Management:**
- Plan for tax payments without share sales
- Consider loan options if needed
- Manage lifestyle inflation temptation
- Continue regular investment contributions

### Post-Lockup Execution (IPO + 180+ days)

**Systematic Selling Plan:**
- Implement 10b5-1 plan
- Target 25% quarterly sales
- Monitor tax impact
- Coordinate with overall portfolio

**Diversification Timeline:**
- Year 1: Reduce to 50% company stock
- Year 2: Reduce to 25% company stock
- Year 3: Reach target allocation (10-15%)

## Acquisition Planning Strategy

### Pre-Acquisition Phase

**Due Diligence Period:**
- Understand deal structure (cash/stock/mixed)
- Review tax implications of each scenario
- Consider acceleration of vesting
- Plan for integration timeline

**Deal Structure Analysis:**
- All-cash: Immediate tax liability
- All-stock: Potential tax deferral
- Mixed: Combination of immediate and deferred
- Earnouts: Contingent consideration planning

### Tax Optimization Strategies

**Installment Sales:**
- Available for some stock sales
- Spreads tax liability over time
- Requires specific deal structure
- Not available for cash deals

**Charitable Planning:**
- Large gifts in high-income years
- Donor-advised funds for future giving
- Charitable remainder trusts
- Private foundation consideration

**Family Tax Planning:**
- Gifts to family members
- Generation-skipping strategies
- Trust structures for tax efficiency
- Estate tax planning

### Post-Acquisition Integration

**Acquirer Stock Management:**
- Understand new company restrictions
- Research acquirer stock performance
- Plan diversification strategy
- Monitor for additional liquidity events

**Career Transition Planning:**
- Retention bonus negotiations
- Vesting schedule modifications
- New equity grant evaluation
- Career transition options

## Advanced Tax Planning Strategies

### Multi-Year Tax Planning

**Income Smoothing:**
- Spread recognition across multiple years
- Use installment sale treatment where available
- Plan Roth conversions in low-income years
- Coordinate with spouse's income

**State Tax Optimization:**
- Consider temporary residency changes
- Understand state tax implications
- Plan for multi-state tax filings
- Consult with tax professionals

### Estate and Gift Tax Planning

**Annual Gifting:**
- $18,000 per recipient (2024)
- Lifetime exemption utilization
- Family limited partnerships
- Grantor trust strategies

**Generation-Skipping Planning:**
- GST tax exemption utilization
- Dynasty trust structures
- Multiple generation tax planning
- Professional trust administration

### Charitable Strategies

**Charitable Remainder Trusts (CRTs):**
- Income stream for life
- Tax deduction on contribution
- Diversification of concentrated position
- Charitable legacy planning

**Private Foundation:**
- Perpetual charitable vehicle
- Family involvement opportunities
- Tax deduction for contributions
- Professional management required

## Risk Management During Liquidity Events

### Concentration Risk Mitigation

**Diversification Framework:**
Target allocation post-liquidity:
- 60% Diversified equities
- 25% Fixed income
- 10% Alternatives (REITs, commodities)
- 5% Cash/emergency fund

**Risk Monitoring:**
- Single stock concentration
- Sector concentration (tech heavy)
- Geographic concentration
- Currency concentration

### Insurance Review

**Disability Insurance:**
- Increase coverage with higher net worth
- Consider supplemental policies
- Review benefit periods
- Coordinate with employer coverage

**Life Insurance:**
- Estate tax planning needs
- Family income replacement
- Consider permanent life insurance
- Trust ownership for estate exclusion

**Umbrella Liability:**
- Minimum $2-5M for high net worth
- Asset protection strategy
- Professional liability coverage
- International coverage if needed

### Asset Protection Planning

**Domestic Strategies:**
- Homestead exemptions
- Retirement account protection
- Insurance as asset protection
- Business entity structures

**Offshore Considerations:**
- High net worth planning
- International diversification
- Professional management required
- Compliance complexity

## Case Studies

### Case Study 1: IPO Success Story

**Background: Mark, Senior Director at SaaS Company**
- Pre-IPO equity value: $3M
- IPO valuation increase: 4x to $12M
- Lockup period: 180 days
- Tax situation: CA resident, high income

**Strategy Implementation:**
**Pre-IPO (18 months):**
- Exercised 50% of ISOs early
- Built $500K cash reserve
- Filed 83(b) elections
- Set up AMT planning

**IPO Process:**
- Stock opened at 2x expected price
- Lockup restrictions prevented selling
- Managed cash flow for tax payments
- Avoided lifestyle inflation

**Post-Lockup:**
- Implemented 10b5-1 plan
- Sold 25% quarterly over 2 years
- Diversified into balanced portfolio
- Used tax-loss harvesting

**Results:**
- Final after-tax wealth: $8.5M
- Reduced concentration to 15%
- Effective tax rate: 29%
- Built diversified investment portfolio

### Case Study 2: Acquisition Scenario

**Background: Lisa, Engineering VP at AI Startup**
- Pre-acquisition equity: $2M
- Acquisition: All-cash deal at $5M value
- Accelerated vesting: All options
- Tax impact: $1.2M federal and state

**Strategy Implementation:**
**Pre-Acquisition:**
- Planned for immediate tax liability
- Arranged bridge financing
- Considered charitable strategies
- Updated estate planning

**At Closing:**
- Received $5M cash
- Owed $1.2M in taxes
- Net proceeds: $3.8M
- Immediate diversification opportunity

**Post-Acquisition:**
- Diversified entire proceeds
- Made charitable contributions
- Established education funds for children
- Continued working with acquiring company

**Results:**
- Built $3.8M diversified portfolio
- Zero concentration risk
- Tax-efficient charitable giving
- Strong financial foundation

## Technology and Tools

### Financial Planning Software

**Professional Platforms:**
- MoneyGuidePro for comprehensive planning
- eMoney for complex scenarios
- NaviPlan for advanced modeling
- RightCapital for equity compensation

**Tax Modeling Tools:**
- BNA Income Tax Planner
- Lacerte tax software
- CCH Axcess for complex situations
- Holistiplan for planning analysis

### Portfolio Management

**Institutional Platforms:**
- Charles Schwab Portfolio Connect
- Fidelity Wealth Management
- Morgan Stanley Access
- Goldman Sachs Personal Financial Management

**Features for Liquidity Events:**
- Multi-scenario modeling
- Tax-loss harvesting
- Rebalancing automation
- Performance tracking

## Professional Team Assembly

### Essential Team Members

**Fee-Only Financial Planner:**
- Comprehensive wealth planning
- No product sales conflicts
- Fiduciary standard
- Experience with liquidity events

**Tax Professional:**
- CPA with equity compensation expertise
- Multi-state tax planning
- AMT and complex transactions
- Proactive tax strategies

**Estate Planning Attorney:**
- Trust and estate expertise
- State-specific planning
- Generation-skipping strategies
- Asset protection planning

**Insurance Professional:**
- Risk management analysis
- High-net-worth products
- Asset protection strategies
- Objective advice focus

### Coordination and Communication

**Team Meeting Cadence:**
- Quarterly comprehensive reviews
- Monthly during liquidity events
- Annual strategy updates
- Ad-hoc for major decisions

**Documentation Requirements:**
- Comprehensive planning documents
- Tax projection models
- Estate planning updates
- Risk management reviews

## Common Mistakes and Pitfalls

### Pre-Event Mistakes

**Mistake 1: Insufficient Cash Planning**
- Problem: Cannot pay taxes without selling stock
- Solution: Build cash reserves 18+ months in advance

**Mistake 2: Poor Option Exercise Timing**
- Problem: High AMT liability, short capital gains holding
- Solution: Exercise planning 2+ years before events

**Mistake 3: Inadequate Professional Support**
- Problem: DIY approach to complex situations
- Solution: Assemble professional team early

### Event-Time Mistakes

**Mistake 4: Emotional Decision Making**
- Problem: Fear or greed driving poor decisions
- Solution: Pre-determined systematic strategies

**Mistake 5: Lifestyle Inflation**
- Problem: Spending based on paper wealth
- Solution: Conservative lifestyle management

**Mistake 6: Concentration Risk Ignoring**
- Problem: Holding too much company stock post-event
- Solution: Systematic diversification plan

## Key Success Factors

### Planning Timeline
- **24+ months:** Initial strategy development
- **18 months:** Team assembly and plan execution
- **12 months:** Tax planning and final preparations
- **6 months:** Final adjustments and execution readiness
- **Event time:** Disciplined execution of predetermined plans
- **Post-event:** Systematic diversification and wealth management

### Critical Success Elements
1. **Early planning:** Best outcomes require years of advance planning
2. **Professional guidance:** Complex situations need expert advice
3. **Tax optimization:** Proper tax planning can save 15-20% of wealth
4. **Risk management:** Systematic diversification prevents concentration disasters
5. **Emotional discipline:** Stick to predetermined plans despite market emotions
6. **Family communication:** Ensure all family members understand the plan

## Key Takeaways

1. **Liquidity events are career-defining moments** that require extensive planning
2. **Tax implications can consume 30-50% of wealth** without proper planning
3. **Diversification must be systematic** to avoid emotional decision-making
4. **Professional teams are essential** for optimal outcomes
5. **Early planning provides the most options** and best results
6. **Risk management is crucial** during high-wealth concentration periods

Liquidity events represent the culmination of years of equity compensation accumulation. With proper planning, they can establish generational wealth and financial freedom. However, without adequate preparation, they can result in massive tax liabilities, concentration risk, and missed opportunities. The strategies outlined in this lesson provide a comprehensive framework for maximizing the wealth-building potential of these life-changing events.`,
        durationMinutes: 95,
        orderIndex: 3
      }
    });

    // Create Week 3 Quiz
    const week3Quiz = await prisma.quiz.create({
      data: {
        weekId: week3.id,
        title: 'Stock Options and Equity Compensation Quiz',
        description: 'Test your understanding of equity compensation types, tax implications, exercise strategies, and liquidity event planning.'
      }
    });

    // Create Quiz Questions
    const questions = [
      {
        questionText: 'What are the two holding period requirements for a qualifying disposition of Incentive Stock Options (ISOs)?',
        options: JSON.stringify([
          '1 year from grant and 1 year from exercise',
          '2 years from grant and 1 year from exercise',
          '1 year from grant and 2 years from exercise',
          '2 years from grant and 2 years from exercise'
        ]),
        correctAnswer: '1',
        explanation: 'For ISOs to qualify for favorable capital gains treatment, you must hold the stock for at least 2 years from the grant date AND at least 1 year from the exercise date.'
      },
      {
        questionText: 'When exercising ISOs, what creates Alternative Minimum Tax (AMT) liability?',
        options: JSON.stringify([
          'The exercise price paid',
          'The spread between fair market value and exercise price',
          'The sale proceeds when sold',
          'Only if the stock declines after exercise'
        ]),
        correctAnswer: '1',
        explanation: 'AMT is triggered by the spread (fair market value minus exercise price) at the time of exercise, even though no cash is received until the stock is sold.'
      },
      {
        questionText: 'What is the recommended maximum allocation to company stock to avoid concentration risk?',
        options: JSON.stringify([
          '25%',
          '15%',
          '5%',
          '10%'
        ]),
        correctAnswer: '2',
        explanation: 'The 5% rule recommends never holding more than 5% of your total portfolio in any single stock, including employer stock, to maintain proper diversification.'
      },
      {
        questionText: 'What is the systematic selling approach recommended for managing equity concentration?',
        options: JSON.stringify([
          'Sell everything immediately after vesting',
          'Hold all shares for maximum appreciation',
          'Sell 25% of vested equity each quarter',
          'Sell only when the stock price doubles'
        ]),
        correctAnswer: '2',
        explanation: 'The 25% quarterly rule provides systematic diversification while maintaining some upside participation, reducing concentration risk gradually over time.'
      },
      {
        questionText: 'When should you typically establish a 10b5-1 trading plan for an upcoming IPO?',
        options: JSON.stringify([
          'During the IPO registration process',
          'Immediately after the IPO',
          'Before the IPO registration process begins',
          'Only after the lockup period expires'
        ]),
        correctAnswer: '2',
        explanation: '10b5-1 plans must be established when you are not in possession of material non-public information, which means before the IPO registration process begins.'
      }
    ];

    for (let i = 0; i < questions.length; i++) {
      await prisma.question.create({
        data: {
          quizId: week3Quiz.id,
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

    console.log('Course 3 Week 3 added successfully');
    console.log(`- Week 3: ${week3.title}`);
    console.log(`- Lessons: ${lesson1.title}, ${lesson2.title}, ${lesson3.title}`);
    console.log(`- Quiz: ${week3Quiz.title}`);

  } catch (error) {
    console.error('Error adding Course 3 Week 3:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addCourse3Week3();