#!/usr/bin/env tsx

import prisma from './prisma'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '../.env' })

async function updateWeek6() {
  try {
    console.log('🔄 Updating Week 6 with comprehensive content...')

    // Find the course
    const course = await prisma.course.findFirst({
      where: { slug: 'finacademy-for-developers' }
    })

    if (!course) {
      console.error('❌ Course not found')
      return
    }

    console.log('✅ Found course:', course.title)

    // Update Week 6 metadata
    const updatedWeek = await prisma.week.update({
      where: {
        courseId_weekNumber: {
          courseId: course.id,
          weekNumber: 6
        }
      },
      data: {
        title: 'Investment and Funding Strategies',
        overview: 'Understand different funding options for tech businesses, from bootstrapping to venture capital, and learn how to make smart investment decisions.',
        learningObjectives: JSON.stringify([
          'Evaluate different funding sources and their trade-offs',
          'Understand equity dilution and valuation basics',
          'Learn to pitch to investors effectively',
          'Make informed decisions about when and how much to raise',
          'Understand investment principles for business owners'
        ]),
        estimatedHours: 10
      }
    })

    console.log('✅ Updated Week 6 metadata')

    // Delete existing lessons (if any)
    await prisma.lesson.deleteMany({
      where: { weekId: updatedWeek.id }
    })

    // Add comprehensive lessons
    const lessons = [
      {
        title: 'Bootstrapping vs External Funding',
        slug: 'bootstrapping-vs-funding',
        orderIndex: 1,
        lessonType: 'lecture',
        durationMinutes: 75,
        content: `# Bootstrapping vs External Funding

## The Funding Decision Framework

Choosing how to fund your business is one of the most critical strategic decisions you'll make. Each approach has profound implications for control, growth trajectory, and ultimate outcomes.

### Bootstrapping: Building with Your Own Resources

**Definition:** Self-funding through personal savings, revenue reinvestment, and organic growth.

**Advantages:**
- **Full Control:** You make all decisions without investor input
- **No Dilution:** You own 100% of your business
- **No Debt:** No loans to repay or interest payments
- **Focus on Profitability:** Forces sustainable business practices
- **Flexibility:** Pivot quickly without investor approval

**Disadvantages:**
- **Limited Resources:** Growth constrained by available cash
- **Slower Growth:** May miss market opportunities
- **Personal Risk:** Your money is at stake
- **Resource Limitations:** Can't hire top talent or invest in marketing at scale
- **Competitive Disadvantage:** Funded competitors may outspend you

**Best For:**
- Service-based businesses (consulting, agencies)
- SaaS products with low initial costs
- Businesses with quick path to profitability
- Entrepreneurs who value control over growth speed

### External Funding: Accessing Outside Capital

**Definition:** Raising money from investors, lenders, or other external sources in exchange for equity, debt, or revenue sharing.

**Advantages:**
- **Accelerated Growth:** Access to capital for rapid scaling
- **Expertise and Networks:** Investors bring knowledge and connections
- **Risk Sharing:** Others share in the financial risk
- **Competitive Advantage:** Outspend bootstrapped competitors
- **Talent Acquisition:** Can hire experienced team members

**Disadvantages:**
- **Equity Dilution:** You give up ownership percentage
- **Loss of Control:** Investors have say in major decisions
- **Pressure for Growth:** Must deliver returns on investor timeline
- **Complexity:** Legal, reporting, and governance overhead
- **Exit Pressure:** Investors need liquidity events

**Best For:**
- Capital-intensive businesses
- Winner-take-all markets
- Businesses requiring significant upfront investment
- Markets where speed to scale is critical

### Hybrid Approaches

**Revenue-Based Financing (RBF)**
- Repay based on percentage of monthly revenue
- No equity dilution
- Higher cost of capital than traditional debt

**Convertible Debt**
- Initially structured as debt, converts to equity later
- Common for early-stage funding
- Delays valuation discussion

**SAFE (Simple Agreement for Future Equity)**
- Not debt, not equity initially
- Popular with Y Combinator companies
- Converts during next priced round

### Financial Comparison

**Bootstrapped SaaS Example:**
- Year 1: $0 → $50k revenue
- Year 2: $50k → $200k revenue  
- Year 3: $200k → $500k revenue
- Founder owns: 100%
- Time to $1M ARR: 4-5 years

**VC-Funded SaaS Example:**
- Raise $1M seed round (give up 20%)
- Year 1: $0 → $200k revenue
- Year 2: $200k → $1M revenue
- Year 3: $1M → $3M revenue
- Founder owns: 80% (before future dilution)
- Time to $1M ARR: 18-24 months

### The Dilution Math

**Seed Round Example:**
- Pre-money valuation: $4M
- Investment: $1M
- Post-money valuation: $5M
- Dilution: 20% ($1M ÷ $5M)
- Founder ownership: 80%

**Series A Example (18 months later):**
- Pre-money valuation: $9M
- Investment: $3M
- Post-money valuation: $12M
- New dilution: 25% ($3M ÷ $12M)
- Original founder ownership: 80% × 75% = 60%

### Decision Criteria

**Choose Bootstrapping If:**
- You can achieve profitability quickly (6-18 months)
- Market doesn't require first-mover advantage
- You have sufficient personal resources
- You value control over growth speed
- Your business model has strong margins

**Choose External Funding If:**
- Market opportunity is massive and time-sensitive
- Significant upfront investment required
- Network effects or winner-take-all dynamics
- You need specific expertise investors can provide
- Personal resources are insufficient

### Bootstrapping Strategies for Developers

**1. Client-Funded Development**
- Build products while doing consulting
- Use client projects to fund product development
- Validate ideas with paying customers first

**2. Pre-Sales and Crowdfunding**
- Sell before you build
- Use platforms like Kickstarter, Indiegogo
- Validate demand and raise capital simultaneously

**3. Revenue Optimization**
- Focus on high-margin services initially
- Reinvest all profits into product development
- Gradually transition from services to products

**4. Lean Operations**
- Work from home/co-working spaces
- Use open-source tools where possible
- Outsource non-core activities

### Common Bootstrapping Mistakes

1. **Lifestyle Creep:** Increasing personal expenses as revenue grows
2. **Under-Investment in Marketing:** Not spending enough on customer acquisition
3. **Poor Cash Flow Management:** Not maintaining adequate reserves
4. **Perfectionism:** Over-engineering before market validation
5. **Underpricing:** Not raising prices as value is proven

### When to Consider Funding

**Positive Indicators:**
- Strong product-market fit demonstrated
- Clear path to 10x+ growth
- Competitive landscape requires speed
- Team ready to scale operations
- Clear use of funds with measurable outcomes

**Warning Signs:**
- Seeking funding to solve fundamental business problems
- No clear plan for using the capital
- Unrealistic growth projections
- Team inexperienced with managing investors
- Personal motivation is just having more cash

### Action Items
1. Calculate how much personal runway you have for bootstrapping
2. Research 5 companies in your space and how they were funded
3. Create a 3-year financial projection for both scenarios
4. List the trade-offs that matter most to you personally`
      },
      {
        title: 'Understanding Equity and Valuation',
        slug: 'equity-and-valuation',
        orderIndex: 2,
        lessonType: 'lecture',
        durationMinutes: 90,
        content: `# Understanding Equity and Valuation

## Equity Fundamentals for Developers

Equity represents ownership in your company. As a founder, understanding how equity works is crucial whether you're bootstrapping, bringing on co-founders, or raising investment.

### What is Equity?

**Equity = Ownership Percentage of Company Value**

If your company is worth $1,000,000 and you own 50% equity, your stake is worth $500,000 (on paper).

**Key Components:**
- **Common Stock:** What founders and employees typically receive
- **Preferred Stock:** What investors typically receive (with special rights)
- **Options/Warrants:** Rights to purchase shares at set prices
- **Convertible Securities:** Debt or preferred that converts to equity

### Pre-Money vs Post-Money Valuation

**Pre-Money Valuation:** Company value before investment
**Post-Money Valuation:** Company value after investment

**Example:**
- Pre-money valuation: $4M
- Investment: $1M
- Post-money valuation: $5M
- Investor owns: $1M ÷ $5M = 20%
- Founder dilution: 20%

### Valuation Methods for Early-Stage Companies

**1. Comparable Company Analysis**
- Look at similar companies' valuations
- Adjust for differences in stage, market, team
- Common in later-stage valuations

**2. Revenue Multiples**
- SaaS: 5-15x Annual Recurring Revenue
- Marketplaces: 10-20x Revenue
- E-commerce: 2-6x Revenue
- Varies greatly by growth rate and margins

**3. Risk-Adjusted Net Present Value**
- Discount future cash flows to present value
- Apply high discount rates (30-50%) for risk
- Complex but most theoretically sound

**4. Berkus Method (Dave Berkus)**
- Pre-revenue valuation framework
- Assigns value to different risk factors:
  - Sound idea: $0-$500k
  - Prototype: $0-$500k
  - Quality management team: $0-$500k
  - Strategic relationships: $0-$500k
  - Product rollout/sales: $0-$500k
- Maximum pre-money: $2.5M

**5. First Chicago Method**
- Create three scenarios: worst, base, best
- Assign probabilities to each
- Calculate weighted average valuation

### Startup Valuation by Stage

**Pre-Seed/Idea Stage:**
- Valuation: $1M-$5M
- Based on team, market size, initial traction
- Primarily qualitative assessment

**Seed Stage:**
- Valuation: $3M-$15M
- Some revenue/user traction
- Product-market fit signals

**Series A:**
- Valuation: $10M-$50M
- Proven business model
- Clear growth metrics and path to scale

**Series B and Beyond:**
- Valuation: $25M-$500M+
- Strong revenue growth
- Path to profitability or exit

### Cap Tables and Equity Distribution

**Typical Cap Table Progression:**

**At Founding:**
- Founder 1: 60%
- Founder 2: 40%
- Employee option pool: 0%

**Pre-Seed ($200k SAFE):**
- Founders: 80% (diluted from fundraise)
- Employee options: 15%
- SAFE investors: 5%

**Seed Round ($1M):**
- Founders: 60%
- Employees: 12%
- Seed investors: 20%
- SAFE investors: 8%

**Series A ($5M):**
- Founders: 45%
- Employees: 15%
- Series A: 25%
- Earlier investors: 15%

### Founder Equity Splits

**Equal Split (50/50, 33/33/33):**
- Pros: Simple, shows commitment to partnership
- Cons: Doesn't reflect different contributions
- When to use: Co-founders contributing equally

**Unequal Split:**
- Based on: Idea origination, capital contribution, time commitment, relevant experience, risk taken
- More complex but potentially fairer
- Use frameworks like the Founder Equity Calculator

**Vesting Schedules:**
- Standard: 4 years with 1-year cliff
- Protects company if founder leaves early
- Both co-founders should be subject to vesting

### Employee Equity (Stock Options)

**Option Pool Size:**
- Pre-seed: 10-15%
- Seed: 15-20%
- Series A: 15-25%

**Individual Grants:**
- Early employees: 0.1-2.0%
- Senior hires: 0.25-1.0%
- C-level executives: 1-5%

**Option Pricing:**
- Strike price = Fair Market Value at grant
- 409A valuations required for private companies
- ISOs vs NSOs have different tax implications

### Dilution Protection and Anti-Dilution

**Pro-Rata Rights:** Investors can maintain ownership percentage in future rounds

**Anti-Dilution Provisions:**
- **Full Ratchet:** Conversion price adjusts to lowest price in down round
- **Weighted Average:** More founder-friendly adjustment based on amount raised

**Example of Anti-Dilution:**
- Investor pays $10/share in Series A
- Series B raises at $5/share (down round)
- Full ratchet: Series A converts at $5/share
- Weighted average: Might convert at $7/share

### Liquidation Preferences

**Non-Participating Preferred:**
- Investor gets back investment amount first
- Then participates in remaining proceeds based on ownership

**Participating Preferred:**
- Investor gets back investment AND participates in upside
- "Double dipping" - less founder friendly

**Example ($10M exit, $2M invested for 20%):**
- Non-participating: $2M preference + 20% of remaining $8M = $3.6M total
- Participating: $2M preference + 20% of total $10M = $4M total

### Valuation Negotiation Strategies

**For Founders:**
1. **Build leverage:** Multiple interested investors
2. **Show traction:** Revenue, users, partnerships
3. **Demonstrate team strength:** Previous successes, relevant experience
4. **Highlight market opportunity:** Large, growing market
5. **Minimize dilution:** Raise only what you need

**Red Flags in Term Sheets:**
- Excessive liquidation preferences (2x+ or participating)
- Unfavorable anti-dilution (full ratchet)
- High option pool requirements
- Onerous control provisions
- Personal guarantees

### Common Valuation Mistakes

**Overvaluing Early:**
- Makes future fundraising difficult
- Creates unrealistic expectations
- May deter experienced investors

**Undervaluing Significantly:**
- Excessive dilution
- Undervalues founder contributions
- Sets low benchmark for employees

**Ignoring Terms for Valuation:**
- High valuation with bad terms may be worse than lower valuation with good terms
- Liquidation preferences can eliminate upside

### Tax Considerations

**83(b) Election:**
- Pay taxes on equity value at grant, not vesting
- Critical for founder shares
- Must file within 30 days

**ISOs vs NSOs:**
- ISOs have preferential tax treatment but limitations
- NSOs more flexible but higher tax burden

**QSBS (Qualified Small Business Stock):**
- Potential to exclude up to $10M from federal taxes
- Requires holding stock for 5+ years
- Specific requirements must be met

### Action Items
1. Create a simple cap table model in Excel/Google Sheets
2. Research valuations of 5 companies similar to yours
3. Calculate your personal equity value under different exit scenarios
4. Understand the tax implications of your equity structure`
      },
      {
        title: 'Angel Investors and VCs',
        slug: 'angel-investors-vcs',
        orderIndex: 3,
        lessonType: 'lecture',
        durationMinutes: 85,
        content: `# Angel Investors and VCs: Understanding the Ecosystem

## The Investment Landscape for Tech Startups

Understanding different types of investors, their motivations, and investment criteria is crucial for successfully raising capital and choosing the right partners for your business.

### Angel Investors: Your First Institutional Capital

**Who They Are:**
- High-net-worth individuals who invest personal funds
- Often successful entrepreneurs or executives
- Typically invest $25k-$250k per deal
- More relationship-driven than institutional

**What They Bring:**
- **Capital:** Usually smaller amounts than VCs
- **Expertise:** Often domain-specific knowledge
- **Networks:** Connections to customers, partners, talent
- **Mentorship:** Hands-on guidance and support

**Investment Criteria:**
- Strong founding team (most important factor)
- Large market opportunity
- Defensible business model
- Personal connection/interest in the space
- Potential for 10x+ returns

**Angel Groups:**
- Angels who pool resources and share due diligence
- More structured process than individual angels
- Examples: Band of Angels, New York Angels, Tech Coast Angels

### Venture Capital: Scaling with Institutional Money

**VC Fund Economics:**
- Manage other people's money (pension funds, endowments, wealthy individuals)
- Typically 2% management fee + 20% carry
- Expected 3-5x returns to LPs (limited partners)
- Need 10x+ returns on investments to achieve fund returns

**VC Investment Stages:**

**Seed VCs:**
- Investment size: $500k-$3M
- Stage: MVP to early traction
- Examples: First Round, Precursor Ventures, Homebrew

**Series A VCs:**
- Investment size: $3M-$15M
- Stage: Product-market fit, scaling revenue
- Examples: Greylock, Sequoia, Benchmark

**Growth Stage VCs:**
- Investment size: $15M-$100M+
- Stage: Proven business model, scaling operations
- Examples: Tiger Global, Insight Partners, General Atlantic

### What VCs Look for: The Investment Framework

**1. Market Size and Opportunity**
- Total Addressable Market (TAM) >$1B
- Growing market with tailwinds
- Potential for market disruption

**2. Team Quality**
- Relevant domain expertise
- Previous startup experience (preferred)
- Ability to execute and scale
- Coachability and learning mindset

**3. Product and Traction**
- Strong product-market fit signals
- Compelling unit economics
- Defensible competitive moats
- Clear path to scale

**4. Business Model**
- High gross margins (>70% for software)
- Recurring revenue preferred
- Network effects or winner-take-all dynamics
- Clear monetization strategy

**5. Financial Metrics**
- Rule of 40 (Growth Rate + Profit Margin ≥ 40%)
- Strong cohort retention and LTV/CAC ratios
- Efficient growth (reasonable burn rate)

### The Fundraising Process

**1. Preparation Phase (2-4 weeks)**
- Create compelling pitch deck
- Prepare detailed financial model
- Gather supporting materials (demo, references)
- Research target investors thoroughly

**2. Initial Outreach (2-3 weeks)**
- Warm introductions preferred (5x higher success rate)
- Craft personalized outreach emails
- Target 20-30 relevant investors initially

**3. First Meetings (3-4 weeks)**
- 30-60 minute initial pitch meetings
- Focus on telling compelling story
- Expect 50%+ rejection rate at this stage

**4. Due Diligence (3-6 weeks)**
- Deep dive on market, team, product
- Reference calls with customers and team
- Financial and legal review
- Technical/security assessment

**5. Term Sheet and Negotiation (1-2 weeks)**
- Non-binding terms outline
- Negotiate key terms (valuation, board seats, etc.)
- Legal documentation follows

**6. Closing (2-4 weeks)**
- Final legal documentation
- Investor onboarding
- Capital deployment

### Pitch Deck Essentials

**The 10-15 Slide Structure:**

1. **Problem:** Clear, relatable problem statement
2. **Solution:** Your unique approach to solving it
3. **Market:** Size and growth of opportunity
4. **Product:** Demo or detailed product overview
5. **Traction:** Key metrics and growth
6. **Business Model:** How you make money
7. **Competition:** Competitive landscape and differentiation
8. **Team:** Why you're the right team to execute
9. **Financials:** Revenue projections and key metrics
10. **Funding:** How much and what you'll use it for

**Key Principles:**
- Tell a story, don't just present facts
- Keep slides simple and visual
- Practice until you can pitch without slides
- Be prepared for deep technical questions

### Common Fundraising Mistakes

**1. Fundraising Too Early**
- No clear traction or product-market fit
- Weak metrics or story
- Results in lower valuation or rejection

**2. Fundraising Too Late**
- Running out of cash during process
- Desperate positioning weakens negotiation
- May have to accept unfavorable terms

**3. Poor Investor Selection**
- Pitching to investors who don't invest in your stage/sector
- Not researching investor backgrounds and portfolios
- Focusing only on brand names vs. best fit

**4. Inadequate Preparation**
- Weak financial model or projections
- Can't answer basic questions about business
- No clear use of funds or milestones

**5. Unrealistic Expectations**
- Overvaluing company significantly
- Expecting immediate responses or decisions
- Not understanding investor decision timelines

### Working with VCs Post-Investment

**Board Management:**
- Typically 1-3 investor board seats depending on round
- Monthly board meetings with prepared materials
- Focus on key metrics, challenges, and asks for help

**Investor Communications:**
- Monthly investor updates (even if not required)
- Quarterly metrics reviews
- Annual strategy sessions

**Leveraging Investor Value-Add:**
- Recruiting: Help finding key hires
- Customer introductions and partnerships
- Strategic guidance on key decisions
- Next round fundraising support

### Alternative Investment Sources

**Corporate VCs:**
- Strategic investors from large companies
- Bring potential partnerships and exits
- May have strategic agenda beyond returns
- Examples: GV (Google), Intel Capital, Salesforce Ventures

**Government Programs:**
- SBIR grants for R&D focused companies
- State and local economic development programs
- Generally dilution-free but competitive

**Accelerators:**
- 3-6 month programs with demo day
- Typically invest $25k-$250k for 6-10% equity
- Provide mentorship, networks, and structure
- Examples: Y Combinator, Techstars, 500 Startups

### International Considerations

**Global VC Markets:**
- Silicon Valley: Largest, most competitive
- New York: Strong fintech and enterprise focus
- London: European hub, growing ecosystem
- Southeast Asia: Rapidly expanding market

**Cross-Border Implications:**
- Tax and legal complexity
- Currency and political risks
- Different investor expectations and norms

### Action Items
1. Research 20 investors who invest in your stage/sector
2. Identify mutual connections for warm introductions
3. Create a target list with investment thesis for each
4. Practice your pitch with advisors and other founders
5. Prepare comprehensive data room materials`
      },
      {
        title: 'Alternative Funding Sources',
        slug: 'alternative-funding',
        orderIndex: 4,
        lessonType: 'lecture',
        durationMinutes: 80,
        content: `# Alternative Funding Sources

## Beyond Traditional VC: Exploring Creative Capital Options

While venture capital gets most of the attention, many successful tech businesses have been built using alternative funding sources that offer different trade-offs in terms of control, cost, and complexity.

### Revenue-Based Financing (RBF)

**How It Works:**
- Investors provide capital in exchange for a percentage of future revenue
- Repayment continues until a pre-agreed multiple is reached (typically 1.5x-3x)
- No equity dilution or board seats

**Example Structure:**
- Raise: $500k
- Revenue share: 4% of monthly revenue
- Repayment cap: $1.5M (3x multiple)
- If monthly revenue = $100k, monthly payment = $4k
- Payback period varies based on growth

**Best For:**
- SaaS companies with recurring revenue
- Businesses with predictable cash flows
- Founders who want to maintain control
- Companies that don't fit traditional VC model

**Providers:**
- Lighter Capital
- Clearbanc (now Clearco)
- Foundry Group's Next Wave
- Bigfoot Capital

**Pros:**
- No equity dilution
- No board seats or control loss
- Flexible repayment (tied to performance)
- Faster process than VC fundraising

**Cons:**
- Higher cost of capital (12-20% IRR)
- Revenue share can constrain cash flow
- Limited funding amounts ($10k-$10M typical)
- Requires consistent revenue

### Debt Financing Options

**Traditional Bank Loans:**
- Difficult for early-stage startups
- Requires personal guarantees and collateral
- Lower cost but strict repayment terms

**SBA Loans:**
- Government-backed loans for small businesses
- 7(a) loans up to $5M
- Lower down payments and longer terms
- Extensive paperwork and approval process

**Equipment Financing:**
- Loans for specific business equipment
- Equipment serves as collateral
- Good for hardware startups or office buildouts

**Lines of Credit:**
- Flexible access to capital up to limit
- Interest only on amounts used
- Good for managing cash flow fluctuations

### Crowdfunding Platforms

**Reward-Based Crowdfunding:**

**Kickstarter:**
- All-or-nothing funding model
- Backers receive products or rewards
- Great for consumer products and hardware
- Average successful project: $25k-$50k

**Indiegogo:**
- Flexible funding options
- Keep funds even if goal not met
- Good for niche or specialized products

**Success Strategies:**
- Professional video and campaign page
- Early community building
- Press and influencer outreach
- Compelling reward tiers

**Equity Crowdfunding:**

**Republic:**
- Accredited and non-accredited investors
- SEC-compliant equity offerings
- Community building features

**SeedInvest:**
- Focus on accredited investors
- Professional due diligence process
- Higher minimum investments

**Regulation CF:**
- Raise up to $5M from general public
- Extensive disclosure requirements
- 12-month fundraising period limit

### Grants and Competitions

**Federal Grants:**

**SBIR (Small Business Innovation Research):**
- Phase I: Up to $256k for feasibility
- Phase II: Up to $1.65M for development
- Phase III: Commercial applications
- No equity dilution
- Highly competitive (5-15% acceptance)

**STTR (Small Business Technology Transfer):**
- Similar to SBIR but requires university partnership
- Good for research-heavy projects

**State and Local Grants:**
- Economic development incentives
- Industry-specific programs
- Often smaller amounts but easier process

**Private Grants:**
- Foundation grants for social impact
- Corporate innovation challenges
- Industry association programs

**Startup Competitions:**
- Cash prizes ranging from $10k-$100k+
- Often include mentorship and networking
- Examples: TechCrunch Disrupt, RISE, local pitch competitions

### Strategic Partnerships and Joint Ventures

**Corporate Development:**
- Large companies investing in strategic suppliers
- Access to distribution channels and customers
- Potential acquisition path
- May limit independence and flexibility

**Revenue Sharing Partnerships:**
- Partner provides upfront capital for revenue share
- Common in affiliate marketing and e-commerce
- Aligns incentives between partners

**Joint Ventures:**
- Shared ownership of new entity
- Combines resources and expertise
- Complex legal and operational structure

### Personal and Friends/Family Funding

**Bootstrap Financing:**
- Credit cards (0% promotional rates)
- Home equity lines of credit
- Personal savings and assets
- Maintaining full control

**Friends and Family:**
- Typically $5k-$100k total
- Simple terms and quick decisions
- Risk of straining relationships
- Important to formalize with proper documentation

**Best Practices:**
- Clear written agreements
- Regular communication and updates
- Professional approach despite personal relationships
- Plan for different outcome scenarios

### Invoice Factoring and Asset-Based Lending

**Invoice Factoring:**
- Sell outstanding invoices for immediate cash
- Receive 70-90% of invoice value upfront
- Factor collects payment from customers
- Cost: 1-5% per month

**Asset-Based Lending:**
- Borrow against business assets (inventory, equipment, receivables)
- Higher borrowing capacity than traditional loans
- Complex structure and covenants

### Cryptocurrency and Token Sales

**Initial Coin Offerings (ICOs):**
- Largely replaced by other mechanisms
- Significant regulatory uncertainty
- High risk and complexity

**Security Token Offerings (STOs):**
- SEC-compliant token sales
- Tokens represent equity or debt
- Still emerging market

**Utility Tokens:**
- Tokens that provide access to platform or service
- Must have clear utility beyond investment
- Complex regulatory landscape

### Vendor Financing and Trade Credit

**Supplier Credit:**
- Extended payment terms with suppliers
- Equipment lease programs
- Deferred payment arrangements

**Customer Financing:**
- Advance payments from customers
- Pre-orders and deposits
- Revenue sharing agreements

### Choosing the Right Funding Mix

**Evaluation Criteria:**

1. **Cost of Capital**
   - Interest rates and fees
   - Opportunity cost of equity dilution
   - Hidden costs and complexity

2. **Control and Flexibility**
   - Decision-making autonomy
   - Operational restrictions
   - Exit requirements

3. **Amount and Timing**
   - Capital requirements and timing
   - Funding availability and speed
   - Future funding implications

4. **Strategic Value**
   - Beyond capital benefits
   - Network and expertise access
   - Market validation

**Common Funding Progressions:**

**Bootstrap → Angel → VC:**
- Traditional startup path
- Maintains investor interest and momentum

**Bootstrap → RBF → VC:**
- Good for businesses with early revenue
- Maintains more equity for VC round

**Grant → Crowdfunding → Traditional:**
- Good for hardware or social impact ventures
- Builds market validation early

### Due Diligence for Alternative Funding

**Key Questions:**
1. What are all costs (fees, interest, penalties)?
2. What happens if I can't meet payment obligations?
3. Are there personal guarantees required?
4. How does this affect my ability to raise future capital?
5. What are the reporting and compliance requirements?

### Action Items
1. Map your funding needs over the next 18 months
2. Research 3-5 alternative funding sources that fit your business
3. Calculate the true cost of capital for each option
4. Prepare materials required for alternative funding applications
5. Consider combining multiple funding sources for optimal mix`
      },
      {
        title: 'Investment Principles for Entrepreneurs',
        slug: 'investment-principles',
        orderIndex: 5,
        lessonType: 'lecture',
        durationMinutes: 70,
        content: `# Investment Principles for Entrepreneurs

## Building Wealth While Building Your Business

As an entrepreneur, you're building a business and need to think about personal wealth building. Understanding investment principles helps you make better decisions about business finances and personal wealth management.

### The Entrepreneur's Investment Mindset

**Key Differences from Traditional Investors:**

**1. Concentration vs Diversification**
- Entrepreneurs have concentrated risk in their business
- Need diversification in other investments
- Balance business investment with personal portfolio

**2. Liquidity Considerations**
- Most wealth tied up in illiquid business equity
- Need more liquid emergency funds
- Consider liquidity when making investment decisions

**3. Tax Optimization**
- Business ownership creates unique tax situations
- Investment timing can optimize tax outcomes
- Coordination between business and personal tax planning

**4. Time Horizon Variability**
- Business success timeline uncertain
- Investment horizon may change with business outcomes
- Need flexibility in investment approach

### Core Investment Principles

**1. Start Early and Be Consistent**
- Time in market beats timing the market
- Compound interest is most powerful over long periods
- Even small amounts early make huge difference

**Example:**
- Start at 25: $500/month → $1.37M at 65 (7% return)
- Start at 35: $500/month → $611k at 65 (7% return)
- 10-year delay costs over $750k

**2. Diversification Reduces Risk**
- Don't put all eggs in one basket
- Spread risk across asset classes, geographies, time
- Your business is already one big bet

**3. Keep Costs Low**
- Investment fees compound against you
- 1% annual fee costs 20%+ of returns over time
- Index funds typically have lowest costs

**4. Stay Disciplined**
- Emotions are the biggest enemy of investment returns
- Stick to systematic approach
- Don't chase hot investments or panic sell

### Asset Allocation for Entrepreneurs

**The 120 Rule Modified for Entrepreneurs:**
Traditional: Stock allocation = 120 - Your Age
Entrepreneur: Stock allocation = 100 - Your Age (more conservative due to business concentration)

**Sample Allocations:**

**Age 30 Entrepreneur:**
- Stocks: 70% (vs 90% traditional)
- Bonds: 20%
- Cash/Emergency Fund: 10%

**Age 50 Entrepreneur:**
- Stocks: 50%
- Bonds: 35%
- Cash/Emergency Fund: 15%

**Three-Fund Portfolio (Simple & Effective):**
- Total Stock Market Index: 60%
- International Stock Index: 20%
- Bond Index: 20%

### Investment Vehicles for Entrepreneurs

**Tax-Advantaged Accounts:**

**Solo 401(k) / SEP-IRA:**
- High contribution limits for self-employed
- Solo 401(k): Up to $66k annually (2023)
- SEP-IRA: Up to 25% of compensation
- Great for high-income entrepreneurs

**Backdoor Roth IRA:**
- For high earners above income limits
- Contribute to traditional IRA, convert to Roth
- Tax-free growth and withdrawals in retirement

**HSA (Health Savings Account):**
- Triple tax advantage (deductible, growth, withdrawals)
- Can invest funds after minimum balance
- Becomes additional retirement account after 65

**Taxable Investment Accounts:**
- More flexibility than retirement accounts
- Important for entrepreneurs who may need access
- Tax-efficient investing strategies important

### Dollar-Cost Averaging vs Lump Sum

**Dollar-Cost Averaging (DCA):**
- Invest fixed amount regularly regardless of price
- Reduces timing risk
- Good for systematic saving from business income

**Lump Sum Investing:**
- Invest large amounts when available
- Historically better returns due to time in market
- Good when selling business assets or windfalls

**For Entrepreneurs: Hybrid Approach**
- DCA from regular income
- Lump sum from business profits or exits
- Maintain cash reserves for opportunities

### Business vs Personal Investment Decisions

**When to Invest in Business vs Markets:**

**Invest in Business When:**
- Expected ROI significantly higher than market (>15-20%)
- Clear competitive moats and advantages
- Strong product-market fit demonstrated
- You have unique ability to impact outcomes

**Invest in Markets When:**
- Business returns uncertain or lower
- Need diversification from business risk
- Business doesn't need additional capital
- Personal wealth building independent of business

**Example Decision Framework:**
- Business expansion ROI: 25% expected
- Stock market historical: 10%
- Risk-adjusted business return: 20% (accounting for higher risk)
- Decision: Invest in business, but also maintain market investments for diversification

### Emergency Funds for Entrepreneurs

**Standard Advice:** 3-6 months expenses
**Entrepreneur Reality:** 6-12 months expenses

**Why Entrepreneurs Need More:**
- Irregular income patterns
- Business downturns affect personal income
- May need to invest personal funds in business
- Harder to get traditional employment quickly

**Where to Keep Emergency Funds:**
- High-yield savings accounts (currently 4-5%)
- Money market funds
- Short-term CDs or Treasury bills
- NOT in stocks or business investments

### Investment Mistakes Entrepreneurs Make

**1. Over-Concentration in Own Business**
- All wealth tied to business success
- No diversification if business fails
- Solution: Regular portfolio contributions regardless of business performance

**2. Chasing High Returns**
- Looking for "10x" returns in everything
- Taking unnecessary risks outside business
- Solution: Boring, consistent index fund investing

**3. Poor Liquidity Management**
- All money locked in business or long-term investments
- Can't handle emergencies or opportunities
- Solution: Maintain adequate liquid reserves

**4. Tax Inefficiency**
- Not using tax-advantaged accounts
- Poor timing of capital gains
- Solution: Coordinate with tax professional

**5. Emotional Decision Making**
- Making investment decisions based on business stress
- Panic buying or selling
- Solution: Systematic approach and rules-based investing

### Real Estate Investment for Entrepreneurs

**Primary Residence:**
- Often good investment for entrepreneurs
- Mortgage interest deduction
- Forced savings through principal payments
- Hedge against inflation

**Rental Property:**
- Can provide steady cash flow
- Tax advantages through depreciation
- Requires active management or property manager
- Concentration risk if local to your business

**REITs (Real Estate Investment Trusts):**
- Liquid real estate exposure
- Professional management
- Diversification across property types
- Good alternative to direct ownership

### Exit Planning and Investment Strategy

**Preparing for Business Exit:**

**Years Before Exit:**
- Maximize tax-advantaged retirement accounts
- Build diversified investment portfolio
- Plan for large tax bill from sale
- Consider installment sales or other structures

**After Exit:**
- Don't rush to invest large windfall
- Consider "bucket strategy" for different time horizons
- Work with fee-only financial advisor
- Maintain some higher-risk investments (you can afford it)

**Wealth Preservation Strategies:**
- Asset protection structures
- Tax optimization through charitable giving
- Estate planning considerations
- Maintaining appropriate liquidity

### Investment Resources and Tools

**Low-Cost Brokers:**
- Vanguard, Fidelity, Charles Schwab
- No-fee stock and ETF trades
- Low expense ratio index funds

**Robo-Advisors:**
- Betterment, Wealthfront, Vanguard Personal Advisor
- Automated portfolio management
- Good for busy entrepreneurs
- Reasonable fees for full service

**Education Resources:**
- Bogleheads community and wiki
- "A Random Walk Down Wall Street" by Burton Malkiel
- "The Bogleheads' Guide to Investing"
- Morningstar.com for research

### Action Items
1. Calculate your current asset allocation including business equity
2. Set up tax-advantaged investment accounts if not done
3. Automate monthly investments to index funds
4. Build emergency fund to 6-12 months expenses
5. Review and rebalance portfolio quarterly`
      }
    ]

    console.log('🔄 Adding comprehensive lessons...')
    
    for (const lesson of lessons) {
      await prisma.lesson.create({
        data: {
          weekId: updatedWeek.id,
          title: lesson.title,
          slug: lesson.slug,
          content: lesson.content,
          orderIndex: lesson.orderIndex,
          lessonType: lesson.lessonType,
          durationMinutes: lesson.durationMinutes
        }
      })
      console.log(`✅ Added lesson: ${lesson.title}`)
    }

    console.log('🎉 Week 6 update completed successfully!')
    console.log(`📚 Added ${lessons.length} comprehensive lessons`)
    console.log('💡 Week 6 now covers: Investment and Funding Strategies')

  } catch (error) {
    console.error('❌ Error updating Week 6:', error)
    throw error
  } finally {
    // Don't disconnect since we're using the shared instance
  }
}

// Run the update
updateWeek6()
  .then(() => {
    console.log('✅ Week 6 update script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Update failed:', error)
    process.exit(1)
  })