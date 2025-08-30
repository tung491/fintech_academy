import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCourse3Week4() {
  try {
    // Find Course 3
    const course = await prisma.course.findFirst({
      where: { slug: 'personal-finance-tech' }
    });

    if (!course) {
      throw new Error('Course 3 not found');
    }

    console.log('Adding Week 4 to Course 3:', course.title);

    // Create Week 4: Retirement Planning and Tax-Advantaged Accounts
    const week4 = await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: 4,
        title: 'Retirement Planning and Tax-Advantaged Accounts',
        overview: 'Master advanced retirement planning strategies and maximize tax-advantaged account benefits for long-term wealth building.',
        learningObjectives: JSON.stringify([
          'Maximize contributions to 401(k), IRA, and other tax-advantaged accounts',
          'Implement advanced strategies like backdoor Roth and mega backdoor Roth',
          'Plan for early retirement and FIRE strategies for tech professionals',
          'Optimize withdrawal strategies and tax management in retirement'
        ]),
        estimatedHours: 10
      }
    });

    // Create Lesson 1: 401(k) Optimization and Advanced Strategies
    const lesson1 = await prisma.lesson.create({
      data: {
        weekId: week4.id,
        title: '401(k) Optimization and Advanced Contribution Strategies',
        slug: 'retirement-401k-optimization-strategies',
        content: `# 401(k) Optimization and Advanced Contribution Strategies

## Introduction: The Foundation of Retirement Wealth

For high-earning tech professionals, 401(k) plans represent one of the most powerful wealth-building tools available. Understanding how to maximize these benefits can add hundreds of thousands to your retirement wealth over a career.

## Understanding 401(k) Fundamentals

### Contribution Limits and Types (2024)

**Employee Contributions:**
- Traditional + Roth 401(k): $23,000 ($30,500 if 50+)
- Catch-up contributions: Additional $7,500 for 50+
- Total employee + employer limit: $70,000 ($77,500 if 50+)

**Contribution Types:**
- **Traditional 401(k):** Pre-tax contributions, taxed in retirement
- **Roth 401(k):** After-tax contributions, tax-free growth and withdrawals
- **After-tax 401(k):** After-tax contributions, growth taxed in retirement

### Employer Matching Strategies

**Maximizing Free Money:**
Always contribute enough to get full employer match - this is an immediate 100% return on investment.

**Common Matching Formulas:**
- 100% match on first 3% of salary
- 50% match on first 6% of salary  
- Dollar-for-dollar up to $X amount

**Matching Timing Considerations:**
- Some employers match per paycheck
- Others use annual true-up
- Front-loading contributions may miss matching if no true-up

**Example:**
Salary: $150,000
Match: 50% on first 6%
Employee contribution: 6% = $9,000
Employer match: 3% = $4,500
Total retirement contribution: $13,500

## Advanced 401(k) Strategies

### Traditional vs. Roth 401(k) Decision Framework

**Choose Traditional When:**
- Currently in high tax bracket (32%+)
- Expect lower tax bracket in retirement
- Want immediate tax deduction
- Maximizing current cash flow

**Choose Roth When:**
- Currently in moderate tax bracket (22-24%)
- Young with many years to compound
- Expect higher tax bracket in retirement
- Want tax-free retirement income

**Hybrid Strategy:**
Split contributions between traditional and Roth based on tax situation and goals.

**Tax Bracket Arbitrage:**
Traditional at 37% bracket → Roth withdrawals at 22% bracket
Effective tax savings: 15 percentage points

### Mega Backdoor Roth Strategy

**Requirements:**
- Plan allows after-tax contributions
- Plan allows in-service distributions OR in-plan Roth conversions
- High income to contribute beyond $23,000

**Process:**
1. Max regular 401(k): $23,000
2. Add after-tax contributions up to $70,000 total limit
3. Convert after-tax to Roth 401(k) or Roth IRA
4. Result: Up to $47,000 additional Roth space

**Example:**
Regular 401(k): $23,000
Employer match: $7,500
After-tax contribution: $39,500
Total contribution: $70,000
Mega backdoor Roth: $39,500 tax-free growth

**Tax Implications:**
- After-tax contributions: No immediate tax benefit
- Conversion: Taxed only on earnings since contribution
- Growth: Tax-free forever if converted to Roth

### Advanced Withdrawal Strategies

**401(k) Loan Strategy:**
- Borrow up to 50% of balance or $50,000
- Pay interest to yourself
- No credit check required
- Risk: Must repay if leaving company

**In-Service Distributions:**
- Some plans allow withdrawals while employed
- Typically age 59.5+ required
- May enable additional investment options
- Consider tax implications carefully

**Hardship Withdrawals:**
- Limited to specific financial needs
- 10% penalty plus income tax
- Cannot contribute for 6 months after
- Last resort option only

## IRA Strategies for High Earners

### Traditional IRA Considerations

**Income Limits for Deductibility (2024):**
- Single: Phase-out $77,000-$87,000
- Married filing jointly: Phase-out $123,000-$143,000
- Most tech professionals exceed these limits

**Non-deductible IRA Strategy:**
- Contribute to traditional IRA without deduction
- Use as stepping stone for backdoor Roth
- Track basis for tax purposes
- Consider pro-rata rule implications

### Backdoor Roth IRA Strategy

**Step-by-Step Process:**
1. Contribute $7,000 to traditional IRA (non-deductible)
2. Convert traditional IRA to Roth IRA immediately  
3. Pay taxes on any gains during conversion window
4. Enjoy tax-free growth and withdrawals

**Pro-rata Rule Complications:**
If you have existing traditional IRA balances, the conversion is proportionally taxable.

**Example:**
Existing traditional IRA: $93,000
New contribution: $7,000
Total IRA balance: $100,000
Taxable portion of $7,000 conversion: $6,510 (93%)

**Solutions for Pro-rata Rule:**
- Roll existing IRAs into 401(k) before conversion
- Convert entire traditional IRA balance
- Time strategy implementation carefully

### Roth IRA Advantages for High Earners

**Benefits:**
- No required minimum distributions (RMDs)
- Tax-free growth and withdrawals
- Estate planning benefits
- Early retirement access to contributions

**5-Year Rule Considerations:**
- Each conversion starts own 5-year clock
- Contributions always available penalty-free
- Earnings subject to 5-year rule and age 59.5

**Early Retirement Strategy:**
Use Roth IRA contributions as bridge income before 401(k) access at age 59.5.

## HSA: The Ultimate Tax-Advantaged Account

### Triple Tax Advantage

**Tax Benefits:**
- Deductible contributions
- Tax-free growth
- Tax-free withdrawals for qualified expenses

**Contribution Limits (2024):**
- Individual: $4,300
- Family: $8,550
- Catch-up (55+): Additional $1,000

### HSA as Retirement Account

**Strategy:**
- Pay medical expenses out-of-pocket while young
- Let HSA investments grow tax-free
- Use for healthcare expenses in retirement
- After age 65: Penalty-free withdrawals for non-medical expenses

**Long-term Wealth Building:**
A $4,300 annual HSA contribution growing at 7% for 30 years = $435,000 tax-free.

**Investment Options:**
- Many plans offer mutual fund investments
- Low-cost index funds preferred
- Conservative allocation for near-term medical expenses
- Aggressive allocation for long-term growth

## Advanced Retirement Planning for Tech Professionals

### FIRE (Financial Independence, Retire Early) Strategies

**FIRE Fundamentals:**
- Save 50-70% of income
- Achieve 25x annual expenses invested
- Use 4% withdrawal rule
- Focus on tax-efficient withdrawal strategies

**Tech Professional Advantages:**
- High income and savings potential
- Stock option windfalls
- Lower lifestyle needs (remote work)
- Strong analytical skills for planning

**FIRE Variations:**
- **Lean FIRE:** $1-2.5M, modest lifestyle
- **Fat FIRE:** $5-10M+, luxury lifestyle  
- **Barista FIRE:** Partial retirement, part-time income
- **Coast FIRE:** Enough saved to grow to retirement needs

### Early Retirement Withdrawal Strategies

**Rule of 55:**
- Access 401(k) penalty-free if separating from service at age 55+
- Only applies to current employer's 401(k)
- Does not apply to IRAs
- Useful for early retirees

**72(t) SEPP (Substantially Equal Periodic Payments):**
- Access IRA/401(k) before age 59.5 without penalty
- Must take payments for 5 years or until age 59.5 (whichever is longer)
- Three calculation methods available
- Cannot change once started

**Roth IRA Ladder Strategy:**
- Convert traditional 401(k)/IRA to Roth IRA annually
- Wait 5 years, then access conversion amounts penalty-free
- Plan 5+ years ahead for early retirement
- Manage tax brackets during conversion years

### Tax Bracket Management in Retirement

**Progressive Withdrawal Strategy:**
1. Taxable accounts (most flexible)
2. Traditional 401(k)/IRA (manage brackets)
3. Roth accounts (tax-free, save for last)

**Tax Bracket Filling:**
- Fill lower tax brackets with traditional account withdrawals
- Use Roth for amounts above bracket thresholds
- Consider tax-loss harvesting in taxable accounts

## Estate Planning Considerations

### Required Minimum Distributions (RMDs)

**RMD Rules:**
- Traditional 401(k)/IRA: Start at age 73
- Roth 401(k): Subject to RMDs (consider rolling to Roth IRA)
- Roth IRA: No RMDs during owner's lifetime

**RMD Calculation:**
Account Balance ÷ Life Expectancy Factor = Required Distribution

**Strategies to Minimize RMDs:**
- Roth conversions before age 73
- Charitable Qualified Distributions
- Asset location optimization

### Beneficiary Planning

**Beneficiary IRA Rules (SECURE Act):**
- Most non-spouse beneficiaries must withdraw over 10 years
- Spouses can treat inherited accounts as their own
- Consider impact on beneficiaries' tax brackets

**Estate Tax Considerations:**
- 401(k)/IRA assets included in estate
- Roth conversions reduce estate size
- Consider charitable remainder trusts
- Generation-skipping strategies for large estates

## Technology Tools for Retirement Planning

### Retirement Planning Software

**Professional Tools:**
- MoneyGuidePro
- eMoney Advisor
- NaviPlan
- RightCapital

**Consumer Tools:**
- Personal Capital Retirement Planner
- Fidelity Planning & Guidance Center
- Vanguard Retirement Nest Egg Calculator
- FidSafe for document management

### Investment Management Platforms

**Low-Cost Providers:**
- Vanguard (lowest expense ratios)
- Fidelity (zero-fee index funds)
- Schwab (comprehensive platform)
- TIAA (for educators/nonprofits)

**Target-Date Fund Considerations:**
- Age-appropriate asset allocation
- Automatic rebalancing
- Single fund solution
- May be too conservative for high earners

## Case Study: Complete Strategy Implementation

### Background: Alex, Senior Software Engineer
- Age: 32, married, 2 kids
- Salary: $180,000
- Spouse income: $60,000
- 401(k) balance: $125,000
- Goals: Retire at 55, kids' college funding

### Strategy Development:

**Phase 1: Foundation (Ages 32-40)**
- Max both 401(k)s: $46,000 annually
- Implement mega backdoor Roth: $30,000 annually
- Max HSAs: $8,550 annually
- 529 plans: $15,000 annually for kids
- Total tax-advantaged saving: $99,550/year

**Phase 2: Acceleration (Ages 40-50)**
- Continue maximum contributions
- Add catch-up contributions at 50
- Roth conversion ladder planning
- Monitor FIRE progress

**Phase 3: Transition (Ages 50-55)**
- Rule of 55 planning for 401(k) access
- Roth conversion ladder execution
- Bridge strategy to full retirement
- Healthcare coverage planning

### Projected Results:
- Age 55 retirement assets: $3.2M
- Annual expenses: $100,000
- Safe withdrawal rate: 3.1%
- FIRE goal achieved with buffer

## Common Mistakes and Optimization Opportunities

### Mistake 1: Not Maximizing Employer Match
**Problem:** Leaving free money on the table
**Solution:** Always contribute enough for full match

### Mistake 2: All Traditional or All Roth
**Problem:** Missing tax bracket optimization
**Solution:** Strategic mix based on current/future tax brackets

### Mistake 3: Ignoring HSA Potential
**Problem:** Using HSA as checking account
**Solution:** Treat HSA as retirement account, invest for growth

### Mistake 4: Poor Investment Selection
**Problem:** High-fee actively managed funds
**Solution:** Low-cost index funds for core holdings

### Mistake 5: Not Planning for Early Retirement
**Problem:** Penalty-trapped retirement accounts
**Solution:** Multi-account strategy and withdrawal planning

## Implementation Checklist

### Immediate Actions:
- [ ] Maximize 401(k) contributions and employer match
- [ ] Implement backdoor Roth IRA if eligible
- [ ] Maximize HSA contributions and invest funds
- [ ] Review investment selection and fees
- [ ] Set up automatic contributions

### Annual Review Items:
- [ ] Adjust contribution amounts for salary increases
- [ ] Rebalance investment allocations
- [ ] Review and update beneficiary designations
- [ ] Consider Roth conversion opportunities
- [ ] Monitor progress toward retirement goals

### Major Milestone Actions:
- [ ] Age 50: Begin catch-up contributions
- [ ] Pre-retirement: Implement withdrawal strategy
- [ ] Age 55: Consider rule of 55 strategy
- [ ] Age 59.5: Penalty-free retirement account access
- [ ] Age 73: Begin required minimum distributions

## Key Takeaways

1. **Maximize tax-advantaged space:** Use every available account type (401k, IRA, HSA)
2. **Strategic Roth conversions:** Plan for tax-free retirement income
3. **Early retirement planning:** Requires multi-account withdrawal strategy
4. **Investment selection matters:** Low-cost index funds for the majority of holdings
5. **Regular review essential:** Strategies should evolve with income and life changes
6. **Professional guidance valuable:** Complex strategies benefit from expert advice

Advanced retirement planning for tech professionals involves maximizing multiple tax-advantaged accounts while planning for various retirement scenarios. The high income potential in tech provides unique opportunities for accelerated wealth building, but requires sophisticated strategies to optimize tax efficiency and achieve financial independence goals.

Your retirement planning foundation should focus on maximizing tax-advantaged contributions, implementing strategic Roth conversions, and planning for flexible withdrawal strategies that support both traditional and early retirement scenarios.`,
        durationMinutes: 85,
        orderIndex: 1
      }
    });

    // Create Lesson 2: Advanced IRA Strategies and Tax Optimization
    const lesson2 = await prisma.lesson.create({
      data: {
        weekId: week4.id,
        title: 'Advanced IRA Strategies and Roth Conversion Planning',
        slug: 'advanced-ira-roth-conversion-planning',
        content: `# Advanced IRA Strategies and Roth Conversion Planning

## Introduction: Maximizing Tax-Free Retirement Wealth

For high-earning tech professionals, traditional IRA contributions are typically not tax-deductible. However, IRAs remain powerful tools through backdoor Roth strategies, conversion planning, and sophisticated withdrawal techniques that can dramatically enhance retirement wealth.

## Understanding IRA Types and Limitations

### Traditional IRA Income Limits

**Deduction Phase-outs (2024):**
- Single filers: $77,000-$87,000
- Married filing jointly: $123,000-$143,000
- Most tech professionals exceed these limits

**Non-deductible Traditional IRA Strategy:**
When income exceeds limits, contributions are made with after-tax dollars but growth is tax-deferred until withdrawal.

**Tracking Basis:**
- File Form 8606 annually
- Track cumulative non-deductible contributions
- Basis determines taxable portion of withdrawals
- Critical for backdoor Roth strategy

### Roth IRA Income Limits

**Contribution Phase-outs (2024):**
- Single filers: $138,000-$153,000  
- Married filing jointly: $218,000-$228,000
- Most tech professionals cannot contribute directly

**Backdoor Roth IRA Solution:**
Legal strategy to access Roth IRA benefits despite income limitations.

## Mastering the Backdoor Roth IRA

### Step-by-Step Implementation

**Step 1: Make Non-deductible Traditional IRA Contribution**
- Contribute $7,000 ($8,000 if 50+) to traditional IRA
- File Form 8606 with tax return
- Do not take tax deduction
- Choose appropriate investment (cash or stable value initially)

**Step 2: Convert to Roth IRA**
- Convert traditional IRA balance to Roth IRA
- Timing: Immediately or within same tax year
- Pay taxes on any gains since contribution
- File Form 8606 showing conversion

**Step 3: Invest Roth IRA Funds**
- Choose appropriate asset allocation
- Focus on high-growth investments
- Benefit from tax-free growth going forward

### Pro-rata Rule Management

**The Problem:**
If you have existing traditional IRA balances, conversions are proportionally taxable based on total IRA balance.

**Example:**
- Existing traditional IRA: $93,000 (all pre-tax)
- New contribution: $7,000 (non-deductible)
- Total balance: $100,000
- Conversion of $7,000: 93% taxable ($6,510)

**Solutions:**

**Option 1: Roll existing IRAs into 401(k)**
- Move traditional IRA balances to current employer's 401(k)
- Eliminates pro-rata rule complications
- Must occur before December 31 of conversion year

**Option 2: Convert entire balance**
- Convert all traditional IRA assets to Roth
- Pay taxes on entire pre-tax amount
- May make sense in low-income years

**Option 3: Time strategy implementation**
- Wait until job change to roll IRAs into new 401(k)
- Delay backdoor Roth until pro-rata issue resolved

### Advanced Backdoor Roth Techniques

**Spousal Backdoor Roth:**
- Non-working or lower-earning spouse can also contribute
- Doubles annual Roth IRA capacity to $14,000-$16,000
- Requires separate IRA accounts for each spouse

**Multi-year Planning:**
- Implement consistently for maximum benefit
- $7,000 × 30 years × 7% growth = $708,000 tax-free
- Consider increasing contribution limits over time

## Strategic Roth Conversion Planning

### Optimal Conversion Timing

**Low-Income Years:**
- Between jobs or career transitions
- Sabbatical or startup years
- Market downturn years (lower account values)
- Early retirement years before Social Security

**Tax Bracket Filling Strategy:**
- Calculate available space in current tax bracket
- Convert up to next bracket threshold
- Avoid pushing into higher marginal rates
- Consider state tax implications

**Example Bracket Filling (2024):**
Current income: $150,000 (24% bracket)
22% bracket ends at: $201,050
Available conversion space: $51,050 at 22% rate

### Multi-Year Conversion Strategies

**Roth Conversion Ladder:**
Systematic conversions over multiple years to manage tax impact.

**Year 1:** Convert $50,000 (pay taxes now)
**Year 2:** Convert $50,000 (pay taxes now)  
**Year 3:** Convert $50,000 (pay taxes now)
**Year 6:** Access first conversion penalty-free (5-year rule)

**Benefits:**
- Spreads tax liability over time
- Provides penalty-free access for early retirement
- Locks in current tax rates
- Creates tax-free income in retirement

### Advanced Conversion Techniques

**Partial Account Conversions:**
Convert specific investments rather than proportional amounts.

**Example:**
Traditional IRA has both winners and losers
- Convert losing investments (lower tax impact)
- Keep winning investments in traditional IRA
- Rebalance after conversion

**Recharacterization (No longer available):**
Prior to 2018, conversions could be "undone" - strategy no longer available but important to understand for historical planning.

**Market Timing Considerations:**
- Convert more in market downturns (lower values = lower taxes)
- Convert less in market peaks
- Dollar-cost average conversions over time

## HSA as the Ultimate Retirement Account

### Triple Tax Advantage Maximization

**Strategy 1: Pay Medical Expenses Out-of-Pocket**
- Keep HSA funds invested for growth
- Save receipts for future reimbursement
- No time limit on reimbursement claims
- Maximizes tax-free growth potential

**Strategy 2: Investment-First Approach**
- Contribute maximum annually
- Invest in low-cost index funds
- Treat as retirement account, not checking account
- Use other funds for current medical expenses

### HSA Investment Strategies

**Asset Allocation by Age:**

**Younger Professionals (20s-30s):**
- 90% stocks, 10% bonds
- Focus on growth for 30+ year timeline
- International diversification
- Small-cap and emerging market exposure

**Mid-Career (40s-50s):**
- 70% stocks, 30% bonds
- Balance growth with stability
- Some healthcare-focused investments
- Maintain tax-efficient funds

**Pre-Retirement (50s-60s):**
- 60% stocks, 40% bonds
- Increase liquidity for near-term expenses
- Consider healthcare REITs
- Plan for Medicare transition

### HSA Estate Planning Benefits

**No Required Minimum Distributions:**
HSAs have no RMDs during owner's lifetime, making them excellent estate planning tools.

**Spousal Inheritance:**
- Spouse inherits HSA as their own
- Continues triple tax advantage
- No required distributions

**Non-spouse Inheritance:**
- Account becomes taxable to beneficiary
- No penalty if used for medical expenses
- Consider gifting strategy during lifetime

## Early Retirement Withdrawal Strategies

### FIRE Movement and IRA Access

**Traditional FIRE Withdrawal Order:**
1. Taxable investment accounts
2. Roth IRA contributions (always penalty-free)
3. Traditional 401(k)/IRA via 72(t) or conversions
4. Roth IRA earnings (after age 59.5)

### Rule 72(t) - Substantially Equal Periodic Payments

**How it Works:**
- Allows penalty-free withdrawals before age 59.5
- Must take payments for 5 years or until age 59.5 (whichever is longer)
- Cannot modify payments once started
- Applies to traditional IRAs and 401(k)s

**Three Calculation Methods:**

**1. Required Minimum Distribution Method:**
Account Balance ÷ Life Expectancy Factor = Annual Payment
Most conservative approach, lowest payments

**2. Fixed Amortization Method:**
Amortizes account over life expectancy at reasonable interest rate
Higher payments than RMD method

**3. Fixed Annuitization Method:**
Uses annuity factor for life expectancy and interest rate
Highest payments of the three methods

**Example (Age 50, $500,000 IRA balance):**
- RMD Method: ~$14,600/year
- Amortization Method: ~$23,100/year
- Annuitization Method: ~$24,400/year

### Roth IRA Ladders for Early Retirement

**5-Year Strategy:**
Convert traditional IRA/401(k) to Roth IRA annually, access conversions penalty-free after 5 years.

**Implementation Timeline:**
**Age 45-49:** Convert $40,000/year to Roth (5 conversions)
**Age 50:** Access first conversion penalty-free
**Age 51:** Access second conversion penalty-free
Continue pattern for bridge income until age 59.5

**Tax Management:**
- Time conversions for low-income years
- Fill lower tax brackets efficiently
- Consider geographic arbitrage to low-tax states

## Advanced Tax Optimization Strategies

### Asset Location Optimization

**Tax-Efficient Account Placement:**

**Traditional IRA/401(k):**
- High-yield bonds (ordinary income)
- REITs (ordinary income distributions)
- Actively managed funds (high turnover)
- Commodities and alternatives

**Roth IRA/401(k):**
- High-growth investments
- Most volatile assets
- International small-cap
- Individual growth stocks
- Alternatives with high appreciation potential

**Taxable Accounts:**
- Tax-efficient index funds
- Individual stocks (long-term capital gains)
- Municipal bonds (tax-free interest)
- International funds (foreign tax credit)

### Tax-Loss Harvesting Integration

**Coordinating with Roth Conversions:**
- Harvest losses to offset conversion income
- Build loss bank for future conversions
- Time harvesting around conversion years
- Monitor wash sale rules

**Strategic Loss Generation:**
- Rebalance to realize losses
- Use losses to offset other income
- Maximize $3,000 annual ordinary income offset
- Carry forward unused losses indefinitely

### Charitable Strategies with IRAs

**Qualified Charitable Distribution (QCD):**
- Available at age 70.5+
- Direct transfer from IRA to charity
- Counts toward RMD requirement
- Excludes distribution from taxable income
- Up to $105,000 annually (2024)

**Benefits over Standard Charitable Deduction:**
- Reduces AGI directly
- Benefits even if not itemizing
- Avoids IRMAA Medicare surcharges
- Reduces state tax liability

**Example:**
RMD requirement: $25,000
QCD to charity: $10,000
Taxable RMD: $15,000 (instead of $25,000)

## Estate Planning and IRA Legacy

### SECURE Act Impact

**10-Year Rule for Most Beneficiaries:**
- Non-spouse beneficiaries must withdraw inherited IRA over 10 years
- No annual RMD requirements during 10-year period
- Can withdraw all in year 10 or spread over the decade
- Exceptions for spouses, minors, disabled, and chronically ill

**Planning Implications:**
- Consider beneficiary tax situations
- Roth conversions reduce future tax burden on heirs
- Generation-skipping strategies more complex
- Charitable beneficiaries avoid 10-year rule

### Spousal IRA Strategies

**Spousal Rollover vs. Inherited IRA:**

**Rollover Benefits:**
- Treat inherited IRA as own
- Delay RMDs until age 73
- Name new beneficiaries
- Continue contributions if working

**Inherited IRA Benefits:**
- Access funds before age 59.5 without penalty
- Use deceased spouse's life expectancy for RMDs
- May be beneficial if surviving spouse is younger

### Multi-generational Planning

**Roth IRA Legacy Benefits:**
- No RMDs during owner's lifetime
- Tax-free growth for beneficiaries
- 10-year distribution period allows growth
- Excellent wealth transfer vehicle

**Generation-Skipping Strategies:**
- Consider grandchildren as beneficiaries
- Use dynasty trusts for multiple generations
- Coordinate with GST tax exemption
- Professional trust management recommended

## Technology Tools and Platforms

### IRA Management Platforms

**Major Custodians:**
- Vanguard (lowest costs, excellent funds)
- Fidelity (zero-fee funds, comprehensive platform)
- Schwab (robust platform, good service)
- TD Ameritrade/Charles Schwab merger

**Key Features:**
- Low-cost investment options
- Easy conversion processes
- Comprehensive reporting
- Tax document generation

### Planning Software

**Professional Tools:**
- NaviPlan for complex scenarios
- MoneyGuidePro for retirement planning
- BNA Tax Planner for conversion analysis
- Holistiplan for tax-aware planning

**Consumer Tools:**
- Personal Capital for account aggregation
- Vanguard Personal Advisor Services
- Fidelity Planning & Guidance
- Schwab Intelligent Portfolios

## Case Study: Advanced IRA Strategy Implementation

### Background: Maria and Carlos, Tech Couple
- Ages: 35 and 37
- Combined income: $350,000
- 401(k) balances: $300,000 combined
- Traditional IRA: $50,000 (Carlos)
- Goals: Retire at 55, maximize tax-free wealth

### Strategy Implementation:

**Phase 1: Foundation (Years 1-2)**
- Roll Carlos's IRA into 401(k) to clear pro-rata rule
- Implement dual backdoor Roth IRAs: $14,000/year
- Max out HSAs: $8,550/year
- Begin tax-loss harvesting in taxable accounts

**Phase 2: Roth Conversion Ladder (Years 3-15)**
- Systematic Roth conversions: $50,000/year
- Fill 24% tax bracket efficiently
- Build 5-year Roth ladder for early retirement access
- Continue backdoor Roth contributions

**Phase 3: Early Retirement Bridge (Ages 55-59.5)**
- Access Roth conversions from ladder (no penalties)
- Use taxable account for additional income
- Delay Social Security to age 70
- Maintain health insurance coverage

### Projected Results:
- Age 55 Roth IRA balance: $850,000 (tax-free)
- Traditional 401(k) balance: $1.2M
- HSA balance: $180,000 (triple tax advantage)
- Total retirement assets: $2.2M+

## Common Mistakes and Solutions

### Mistake 1: Ignoring Pro-rata Rule
**Problem:** Large unexpected tax bill on backdoor Roth
**Solution:** Clean up traditional IRA balances first

### Mistake 2: Poor Conversion Timing
**Problem:** Converting in high-income years
**Solution:** Time conversions for lower tax brackets

### Mistake 3: Not Maximizing HSA
**Problem:** Using HSA as checking account
**Solution:** Invest HSA for long-term growth

### Mistake 4: Emotional Conversion Decisions
**Problem:** Converting based on market performance
**Solution:** Systematic approach based on tax planning

### Mistake 5: Inadequate Record Keeping
**Problem:** Lost documentation for basis tracking
**Solution:** Maintain detailed records and Form 8606 filings

## Key Takeaways

1. **Backdoor Roth IRAs provide Roth access** for high earners despite income limits
2. **Pro-rata rule management is critical** for successful backdoor Roth implementation  
3. **Roth conversions should be strategic** and timed for optimal tax efficiency
4. **HSAs are the ultimate retirement account** with triple tax advantages
5. **Early retirement requires sophisticated withdrawal planning** using multiple account types
6. **Estate planning considerations** have changed significantly with the SECURE Act

Advanced IRA strategies provide high-earning tech professionals with powerful tools for tax-free wealth building and sophisticated retirement income planning. The key is implementing these strategies systematically while managing tax implications and coordinating with overall financial goals.

These strategies become increasingly valuable as your income and wealth grow, making professional guidance essential for optimal implementation and ongoing management.`,
        durationMinutes: 95,
        orderIndex: 2
      }
    });

    // Create Lesson 3: Early Retirement and FIRE Strategies
    const lesson3 = await prisma.lesson.create({
      data: {
        weekId: week4.id,
        title: 'Early Retirement and FIRE Strategies for Tech Professionals',
        slug: 'early-retirement-fire-strategies-tech',
        content: `# Early Retirement and FIRE Strategies for Tech Professionals

## Introduction: Financial Independence in the Tech Industry

The FIRE (Financial Independence, Retire Early) movement has gained significant traction among tech professionals due to high earning potential, analytical mindsets, and lifestyle flexibility. This lesson covers comprehensive strategies for achieving financial independence and early retirement in the technology sector.

## Understanding FIRE Fundamentals

### The 4% Rule and Safe Withdrawal Rates

**Traditional 4% Rule:**
- Withdraw 4% of portfolio value in first year of retirement
- Adjust for inflation in subsequent years
- Based on historical 30-year success rates
- Assumes traditional retirement (age 65+)

**FIRE Modifications:**
- 3.25-3.5% for very early retirement (40s)
- Longer retirement periods require more conservative rates
- Market sequence of returns risk
- Consider bond tent approaches

**Example:**
Target annual expenses: $80,000
Required portfolio: $80,000 ÷ 0.04 = $2,000,000
Conservative FIRE target: $80,000 ÷ 0.035 = $2,285,714

### Types of FIRE

**Lean FIRE:**
- Annual expenses: $40,000-$60,000
- Portfolio target: $1M-$1.5M
- Minimalist lifestyle approach
- Geographic arbitrage common
- Healthcare cost considerations critical

**Fat FIRE:**
- Annual expenses: $100,000-$200,000+
- Portfolio target: $2.5M-$5M+
- Maintain higher lifestyle in retirement
- Less geographic constraints
- Premium healthcare options

**Barista FIRE:**
- Partial financial independence
- Part-time work covers some expenses
- Lower portfolio requirements
- Employer healthcare benefits
- Career flexibility and satisfaction

**Coast FIRE:**
- Enough invested to grow to retirement needs
- No additional retirement savings required
- Can focus on current lifestyle
- Traditional retirement age assumption

### Tech Professional Advantages for FIRE

**High Income Potential:**
- Senior engineers: $150,000-$400,000+
- Stock option windfalls
- Rapid career progression
- Multiple income streams potential

**Lifestyle Factors:**
- Remote work flexibility
- Lower commuting costs
- Digital lifestyle (lower material needs)
- Geographic arbitrage opportunities

**Analytical Skills:**
- Data-driven decision making
- Spreadsheet modeling expertise
- System optimization mindset
- Risk assessment capabilities

**Technology Integration:**
- Automated investing platforms
- Expense tracking apps
- Tax optimization software
- Portfolio management tools

## FIRE Savings Strategies for Tech Professionals

### Aggressive Savings Rates

**Traditional Recommendation:** Save 10-15% of income
**FIRE Requirement:** Save 50-70% of income

**Savings Rate Impact on Timeline:**
- 10% savings rate: 51 years to FIRE
- 25% savings rate: 32 years to FIRE
- 50% savings rate: 17 years to FIRE
- 65% savings rate: 10.5 years to FIRE

**Tech Professional Savings Framework:**
- Live on entry-level salary throughout career
- Save 100% of raises and bonuses
- Save 100% of stock option proceeds
- Optimize for lowest sustainable expenses

### Income Optimization Strategies

**Career Advancement:**
- Aggressive skill development
- Strategic job changes for salary bumps
- Negotiation of total compensation packages
- Leadership and management track progression

**Stock Option Maximization:**
- Join companies pre-IPO when possible
- Diversify concentrated positions systematically
- Plan for tax-efficient exercises and sales
- Reinvest proceeds in diversified portfolios

**Side Income Development:**
- Consulting in area of expertise
- Creating digital products/courses
- Angel investing (for accredited investors)
- Real estate investment opportunities

**Geographic Arbitrage:**
- Remote work from lower cost-of-living areas
- International remote work (tax considerations)
- Temporary relocations during high-earning years
- Retirement location cost optimization

### Expense Optimization Framework

**Housing (Typically 25-30% of budget):**
- House hacking strategies
- Geographic arbitrage
- Downsizing and minimalism
- Consider renting vs buying analysis

**Transportation (10-15% typical):**
- Reliable used vehicles
- Public transportation optimization  
- Remote work to eliminate commuting
- Bike/walk for local transportation

**Food (10-15% typical):**
- Meal planning and bulk cooking
- Generic brands and wholesale clubs
- Garden/growing food where possible
- Reasonable restaurant/entertainment balance

**Healthcare (5-10% typical):**
- High-deductible health plan + HSA
- Preventive care focus
- Shop for procedures and medications
- Consider medical tourism for major procedures

**Utilities and Services (5-10% typical):**
- Energy efficiency improvements
- Service plan optimization
- Eliminate unused subscriptions
- Negotiate with providers

## Investment Strategies for FIRE

### Asset Allocation for Early Retirement

**Accumulation Phase (Pre-FIRE):**
- 80-90% stocks for growth
- International diversification (30-40%)
- Low-cost index funds focus
- Tax-loss harvesting optimization

**Early Retirement Phase (40s-50s):**
- 60-70% stocks for continued growth
- Bond tent approach as you age
- Maintain inflation protection
- Liquidity for bridge years

**Traditional Retirement Phase (60s+):**
- 50-60% stocks for longevity
- Increased fixed income allocation
- Focus on income generation
- Healthcare cost planning

### Tax-Efficient FIRE Portfolios

**Account Prioritization:**
1. Max employer 401(k) match (free money)
2. Max HSA contributions (triple tax advantage)
3. Max backdoor Roth IRA (tax-free growth)
4. Max traditional 401(k) (current tax savings)
5. Taxable accounts (flexibility and access)

**Asset Location Strategy:**
- **Taxable:** Tax-efficient index funds, individual stocks, municipal bonds
- **Traditional 401(k)/IRA:** Bonds, REITs, tax-inefficient investments
- **Roth IRA/401(k):** Highest growth potential, most volatile assets

**Tax-Loss Harvesting:**
- Systematic loss harvesting in taxable accounts
- Build loss bank for future use
- Coordinate with Roth conversion strategies
- Avoid wash sale rules

### Geographic Arbitrage Strategies

**Domestic Arbitrage:**
- High salary states (CA, NY, WA) → Low cost states (TX, TN, FL)
- Remote work with location-independent salary
- State tax optimization (0% vs 13%+ income tax)
- Lower housing and living costs

**International Arbitrage:**
- Work from countries with lower living costs
- Consider visa and tax implications
- Healthcare and infrastructure quality
- Time zone and cultural considerations

**Example:**
SF salary: $200,000, expenses $120,000, savings $80,000
Move to Austin: Same salary, expenses $80,000, savings $120,000
Additional annual savings: $40,000
Time to FIRE reduction: 3-5 years

## Early Retirement Withdrawal Strategies

### Bridge Strategies (Pre-59.5)

**Taxable Account Bridge:**
- Use taxable investment accounts first
- Most flexible access to funds
- Tax-efficient fund selection
- Tax-loss harvesting coordination

**Roth IRA Contribution Ladder:**
- Access Roth IRA contributions penalty-free anytime
- $7,000/year × years of contributions
- No taxes or penalties on contributions
- Leave earnings to grow tax-free

**Roth IRA Conversion Ladder:**
- Convert traditional 401(k)/IRA to Roth annually
- Wait 5 years, access conversions penalty-free
- Plan 5+ years before early retirement
- Manage tax brackets during conversions

**Example Conversion Ladder:**
Ages 35-44: Convert $40,000/year (10 conversions)
Ages 45-54: Access conversions penalty-free
Build $400,000 bridge for early retirement

### 72(t) Substantially Equal Periodic Payments

**When to Consider:**
- Insufficient bridge funds from other sources
- Large traditional IRA/401(k) balances
- Comfortable with required payment schedule
- No plans to return to work

**Payment Calculation Methods:**
1. **RMD Method:** Most conservative, lowest payments
2. **Amortization:** Medium payments, fixed amount
3. **Annuitization:** Highest payments, fixed amount

**Considerations:**
- Cannot modify once started (except for one-time switch to RMD)
- Must continue for 5 years or until age 59.5 (whichever is longer)
- Penalty applies if rules violated
- State tax implications vary

### Healthcare Coverage Strategies

**COBRA Continuation:**
- 18-36 months of employer coverage
- Expensive but comprehensive
- Bridge to marketplace plans
- Pregnancy and pre-existing conditions covered

**ACA Marketplace Plans:**
- Income-based premium subsidies
- Manage income to optimize subsidies
- High-deductible plans + HSA compatibility
- Network and coverage considerations

**Healthcare Sharing Ministries:**
- Lower cost alternative
- Religious exemption from ACA
- Not insurance - shared cost arrangement
- Limited coverage for pre-existing conditions

**International Options:**
- Healthcare tourism for major procedures
- Extended travel with international insurance
- Expatriate health insurance plans
- Medicare abroad limitations

### Managing Healthcare Costs in Early Retirement

**Income Management for Subsidies:**
- Roth withdrawals don't count as income
- Time traditional account withdrawals
- Capital gains vs ordinary income planning
- Geographic considerations for state programs

**HSA Strategy:**
- Triple tax advantage makes HSA ultimate healthcare account
- Pay medical expenses out-of-pocket during working years
- Save receipts for future reimbursement (no time limit)
- Let HSA investments grow for retirement healthcare

## FIRE Implementation Timeline

### Phase 1: Foundation Building (Years 1-3)

**Financial Infrastructure:**
- Emergency fund establishment (3-6 months expenses)
- High-yield savings account setup
- Investment account opening and automation
- Credit optimization and debt elimination

**Career Optimization:**
- Skill development and certification
- Network building and mentorship
- Performance review preparation
- Strategic job market monitoring

**Lifestyle Optimization:**
- Expense tracking and budgeting
- Subscription and service audits
- Housing optimization
- Transportation cost reduction

### Phase 2: Acceleration (Years 4-7)

**Income Growth:**
- Strategic job changes for salary increases
- Stock option exercise and diversification
- Side income development
- Investment in high-ROI skills

**Savings Rate Maximization:**
- Live on fixed percentage of income
- Save 100% of raises and bonuses
- Optimize tax-advantaged account usage
- Implement tax-loss harvesting

**Investment Sophistication:**
- Asset allocation optimization
- International diversification
- Factor tilting strategies
- Tax location optimization

### Phase 3: Final Approach (Years 8-12)

**Portfolio Optimization:**
- Rebalancing and risk management
- Sequence of returns mitigation
- Bond tent implementation
- Liquidity planning for early retirement

**Early Retirement Planning:**
- Healthcare coverage strategy development
- Withdrawal strategy testing
- Roth conversion ladder implementation
- Geographic planning for retirement

**Professional Development:**
- Optional: Part-time or consulting prep
- Skill maintenance for potential return
- Network maintenance
- Passion project development

### Phase 4: FIRE Execution (Financial Independence)

**Withdrawal Implementation:**
- Execute planned withdrawal strategy
- Monitor portfolio performance vs spending
- Adjust for sequence of returns risk
- Maintain emergency fund buffer

**Lifestyle Transition:**
- Gradual work reduction vs cliff retirement
- Healthcare transition management
- Social and purpose considerations
- Family and relationship impacts

## Advanced FIRE Strategies

### Tax Optimization in Early Retirement

**Low-Income Years Strategy:**
- Large Roth conversions in first years of retirement
- Fill lower tax brackets efficiently
- Charitable giving strategies
- Geographic tax optimization

**Asset Location During Withdrawal:**
- Draw from taxable accounts first (most flexible)
- Fill tax brackets with traditional account withdrawals
- Use Roth for amounts above bracket thresholds
- Coordinate with Social Security planning

### Real Estate in FIRE Strategies

**Primary Residence:**
- Pay off mortgage vs invest decision
- Geographic arbitrage through relocation
- House hacking during accumulation
- Downsizing in retirement

**Investment Real Estate:**
- Rental property income streams
- REITs vs direct ownership
- Real estate crowdfunding platforms
- International real estate considerations

**Real Estate Investment Trusts (REITs):**
- Provide real estate exposure without management
- Higher dividend yields
- Professional management
- Liquidity advantages over direct ownership

### Business and Entrepreneurship

**Building Passive Income:**
- Software products and SaaS
- Course creation and digital products
- Affiliate marketing and content creation
- Investment in other businesses

**Consulting and Fractional Work:**
- High-value, part-time consulting
- Fractional CTO or engineering roles
- Board positions and advisory roles
- Maintain skills and network

## Case Studies

### Case Study 1: Lean FIRE Success

**Background: Tom, Software Engineer**
- Starting age: 25
- Starting salary: $75,000
- Final salary: $140,000
- FIRE age: 38 (13 years)
- Target annual expenses: $45,000

**Strategy:**
- Maintained $50,000/year lifestyle throughout career
- Saved 65% of gross income
- Lived in shared housing, used public transportation
- Cooked most meals, minimal lifestyle inflation

**Results:**
- Age 38 portfolio: $1.4M
- Safe withdrawal rate: 3.2%
- Annual withdrawal capacity: $44,800
- Geographic arbitrage to lower-cost international locations

### Case Study 2: Fat FIRE with Stock Options

**Background: Sarah, Engineering Manager**
- Starting age: 28
- Peak compensation: $350,000 + equity
- FIRE age: 42 (14 years)
- Target annual expenses: $120,000

**Strategy:**
- Systematic stock option diversification
- Lived on base salary, saved bonuses and equity
- Real estate investment for rental income
- Built consulting business for flexibility

**Results:**
- Age 42 portfolio: $3.2M
- Rental income: $24,000/year
- Consulting income: $30,000/year (optional)
- Total income capacity: $142,000/year

### Case Study 3: Barista FIRE Approach

**Background: Mike, Full-Stack Developer**
- Starting age: 30
- Final salary: $120,000
- Barista FIRE age: 45 (15 years)
- Target annual expenses: $70,000

**Strategy:**
- Built portfolio to cover 60% of expenses
- Developed teaching and training skills
- Created online course business
- Planned part-time work for benefits and fulfillment

**Results:**
- Age 45 portfolio: $1.2M
- Portfolio income: $42,000/year (3.5% withdrawal)
- Part-time income need: $28,000/year
- Flexibility to work 15-20 hours/week

## Technology Tools for FIRE

### Expense Tracking and Budgeting

**Automated Tracking:**
- Mint (free, comprehensive)
- Personal Capital (investment focus)
- YNAB (zero-based budgeting)
- PocketGuard (spending control)

**Manual Tracking:**
- Excel/Google Sheets
- Custom databases
- Receipt scanning apps
- Bank and credit card categorization

### Investment Management

**Robo-Advisors:**
- Betterment (tax-loss harvesting)
- Wealthfront (direct indexing)
- Schwab Intelligent Portfolios
- Vanguard Personal Advisor Services

**Self-Directed Platforms:**
- Vanguard (lowest cost index funds)
- Fidelity (zero-fee index funds)
- Schwab (comprehensive platform)
- M1 Finance (pie-based investing)

### FIRE-Specific Tools

**Retirement Calculators:**
- FIRECalc (historical success rates)
- cFIREsim (Monte Carlo analysis)
- Personal Capital Retirement Planner
- Portfolio Visualizer (backtesting)

**Tax Planning:**
- FreeTaxUSA (low-cost preparation)
- TurboTax (comprehensive features)
- TaxAct (mid-range option)
- BNA Tax Planner (professional)

## Common FIRE Mistakes and Solutions

### Mistake 1: Underestimating Healthcare Costs
**Problem:** Healthcare can be 15-25% of budget in early retirement
**Solution:** Model healthcare costs realistically, maximize HSA, consider geographic options

### Mistake 2: Sequence of Returns Risk
**Problem:** Poor market performance early in retirement
**Solution:** Bond tent approach, larger cash cushion, flexible spending

### Mistake 3: Social and Purpose Vacuum
**Problem:** Loss of identity and social connections from work
**Solution:** Develop purpose-driven activities, maintain professional networks

### Mistake 4: Inflexible Withdrawal Strategy
**Problem:** Rigid 4% rule regardless of market conditions
**Solution:** Dynamic withdrawal strategies, guardrails approach

### Mistake 5: Inadequate Tax Planning
**Problem:** Poor tax management reduces portfolio longevity
**Solution:** Strategic account withdrawals, Roth conversions, tax location

## Key Implementation Steps

### Immediate Actions (Next 30 days):
- [ ] Calculate current net worth and savings rate
- [ ] Set up automated expense tracking
- [ ] Maximize employer 401(k) match
- [ ] Open high-yield savings account
- [ ] Create FIRE timeline and goals

### Medium-term Actions (Next 6 months):
- [ ] Optimize housing and transportation costs
- [ ] Implement tax-loss harvesting strategy
- [ ] Set up backdoor Roth IRA if eligible
- [ ] Develop side income streams
- [ ] Build professional network for future opportunities

### Long-term Actions (Next 2 years):
- [ ] Implement Roth conversion ladder if planning early retirement
- [ ] Develop healthcare coverage strategy
- [ ] Consider real estate investment opportunities
- [ ] Build consulting or business skills
- [ ] Plan geographic arbitrage strategies

## Key Takeaways

1. **FIRE is achievable for tech professionals** due to high earning potential and analytical skills
2. **Savings rate is more important than investment returns** for reaching FIRE quickly
3. **Healthcare costs are a major consideration** requiring careful planning and budgeting
4. **Multiple withdrawal strategies** provide flexibility and risk mitigation
5. **Geographic arbitrage can dramatically accelerate** timeline to financial independence
6. **Tax optimization is crucial** for both accumulation and withdrawal phases
7. **Purpose and social connections** are important considerations beyond the financial aspects

FIRE represents an extreme approach to financial independence that can provide tremendous freedom and flexibility. For tech professionals with high incomes and analytical mindsets, it offers a systematic path to escape traditional work requirements decades earlier than conventional retirement planning.

Success requires discipline, optimization, and careful planning across multiple dimensions - but the payoff of decades of freedom to pursue meaningful work, travel, family time, or personal projects can be transformational.`,
        durationMinutes: 100,
        orderIndex: 3
      }
    });

    // Create Week 4 Quiz
    const week4Quiz = await prisma.quiz.create({
      data: {
        weekId: week4.id,
        title: 'Retirement Planning and Tax-Advantaged Accounts Quiz',
        description: 'Test your understanding of retirement planning strategies, tax-advantaged accounts, and FIRE (Financial Independence, Retire Early) concepts.'
      }
    });

    // Create Quiz Questions
    const questions = [
      {
        questionText: 'What is the maximum total contribution limit for 401(k) plans in 2024 (including employer match)?',
        options: JSON.stringify([
          '$23,000',
          '$46,000',
          '$70,000',
          '$77,500'
        ]),
        correctAnswer: '2',
        explanation: 'The total contribution limit for 401(k) plans in 2024 is $70,000 ($77,500 if 50+), which includes employee contributions, employer match, and after-tax contributions.'
      },
      {
        questionText: 'What is the "pro-rata rule" in relation to backdoor Roth IRA conversions?',
        options: JSON.stringify([
          'A rule that limits conversion amounts',
          'A rule that makes conversions proportionally taxable based on total IRA balance',
          'A rule that requires equal annual conversions',
          'A rule that applies only to high earners'
        ]),
        correctAnswer: '1',
        explanation: 'The pro-rata rule makes Roth IRA conversions proportionally taxable based on the ratio of pre-tax to after-tax money in all your traditional IRAs combined.'
      },
      {
        questionText: 'What are the three tax advantages of an HSA (Health Savings Account)?',
        options: JSON.stringify([
          'Deductible contributions, tax-free growth, tax-free withdrawals for medical expenses',
          'Tax-free contributions, taxable growth, tax-free withdrawals',
          'Deductible contributions, taxable growth, tax-free withdrawals',
          'Tax-free contributions, tax-free growth, taxable withdrawals'
        ]),
        correctAnswer: '0',
        explanation: 'HSAs offer a triple tax advantage: contributions are tax-deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free.'
      },
      {
        questionText: 'In the FIRE movement, what savings rate is typically required to retire in 17 years?',
        options: JSON.stringify([
          '25%',
          '35%',
          '50%',
          '65%'
        ]),
        correctAnswer: '2',
        explanation: 'A 50% savings rate typically allows for retirement in approximately 17 years, based on the relationship between savings rate and years to financial independence.'
      },
      {
        questionText: 'What is the recommended safe withdrawal rate for very early retirement (40s) compared to the traditional 4% rule?',
        options: JSON.stringify([
          '4.5-5%',
          '3.25-3.5%',
          '2-2.5%',
          '5-6%'
        ]),
        correctAnswer: '1',
        explanation: 'For very early retirement in your 40s, a more conservative withdrawal rate of 3.25-3.5% is recommended due to the longer retirement period and sequence of returns risk.'
      }
    ];

    for (let i = 0; i < questions.length; i++) {
      await prisma.question.create({
        data: {
          quizId: week4Quiz.id,
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

    console.log('Course 3 Week 4 added successfully');
    console.log(`- Week 4: ${week4.title}`);
    console.log(`- Lessons: ${lesson1.title}, ${lesson2.title}, ${lesson3.title}`);
    console.log(`- Quiz: ${week4Quiz.title}`);

  } catch (error) {
    console.error('Error adding Course 3 Week 4:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addCourse3Week4();