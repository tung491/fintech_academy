import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function completeCurriculum456() {
  console.log('🚀 Completing FinAcademy Curriculum - Adding Weeks 4-6...')

  try {
    // Get the existing course
    const course = await prisma.course.findFirst({
      where: { slug: 'finacademy-for-developers' }
    })

    if (!course) {
      throw new Error('Course not found')
    }

    // =======================================================================
    // WEEK 4: Cash Flow Management
    // =======================================================================
    
    console.log('📚 Creating Week 4: Cash Flow Management...')
    
    const week4 = await prisma.week.update({
      where: {
        courseId_weekNumber: {
          courseId: course.id,
          weekNumber: 4
        }
      },
      data: {
        title: 'Cash Flow Management',
        overview: 'Master cash flow management, forecasting, and optimization strategies. Learn to maintain healthy cash flow and avoid cash crises.',
        learningObjectives: JSON.stringify([
          'Understand cash flow cycles and timing',
          'Learn cash flow forecasting techniques',
          'Master working capital management',
          'Understand cash flow optimization strategies',
          'Learn to handle cash flow crises'
        ]),
        estimatedHours: 8,
      }
    })

    // Week 4 Lessons
    await prisma.lesson.createMany({
      data: [
        {
          weekId: week4.id,
          title: 'Cash Flow Forecasting',
          slug: 'cash-flow-forecasting',
          content: `# Cash Flow Forecasting

## Planning Your Financial Future

Cash flow forecasting is the process of predicting future cash inflows and outflows to ensure your business maintains adequate liquidity.

### Why Cash Flow Forecasting Matters

**1. Avoid Cash Crises**
- Predict when cash might run low
- Plan for seasonal fluctuations
- Prepare for large expenses

**2. Make Better Decisions**
- Time major purchases appropriately
- Plan hiring and expansion
- Optimize payment terms

**3. Secure Financing**
- Banks require cash flow projections
- Investors want to see cash management
- Better terms with demonstrated planning

### Types of Cash Flow Forecasts

**1. Short-term (13 weeks)**
- Weekly detail for immediate planning
- Focus on operational cash flow
- Track receivables and payables

**2. Medium-term (12 months)**
- Monthly projections
- Include seasonal patterns
- Plan for growth and investment

**3. Long-term (3-5 years)**
- Annual overview
- Strategic planning tool
- Scenario analysis

### Building a Cash Flow Forecast

**Starting Point: Opening Cash Balance**
- Current bank account balances
- Outstanding receivables
- Available credit lines

**Cash Inflows:**
- Customer payments (timing is key)
- Loan proceeds
- Investment funding
- Asset sales

**Cash Outflows:**
- Operational expenses
- Debt payments
- Capital expenditures
- Tax payments

### 13-Week Rolling Forecast Template

**Week 1-4: Detailed Planning**
- Known receivables by due date
- Scheduled payments and expenses
- Confirmed project milestones

**Week 5-8: Weekly detail for short-term planning**
- Expected sales closings
- Regular operational expenses
- Planned investments

**Week 9-13: Weekly estimates for trend analysis**
- Historical patterns
- Conservative estimates
- Scenario planning

### Cash Flow Forecasting Tools

**Spreadsheet Method:**
- Simple and customizable
- Good for small businesses
- Requires manual updates

**Accounting Software:**
- Integrates with your books
- Automated data feeds
- Real-time updates

**Specialized Tools:**
- Float, Pulse, Fluidly
- Advanced analytics
- Scenario modeling

### Key Forecasting Principles

**1. Be Conservative**
- Underestimate inflows
- Overestimate outflows
- Build in buffer time

**2. Update Regularly**
- Weekly reviews minimum
- Adjust for actual results
- Roll forward continuously

**3. Scenario Planning**
- Best case scenario
- Most likely scenario
- Worst case scenario

### Sample 4-Week Forecast

**Week 1:**
Opening: $15,000
Inflows: $8,000 (Client A payment)
Outflows: $6,500 (Payroll, hosting, tools)
Closing: $16,500

**Week 2:**
Opening: $16,500
Inflows: $12,000 (Client B milestone)
Outflows: $4,200 (Marketing, contractors)
Closing: $24,300

### Managing Forecast Accuracy

**Track Forecast vs Actual:**
- Monitor prediction accuracy
- Identify patterns in variances
- Improve forecasting methods

**Key Metrics:**
- Forecast accuracy percentage
- Cash conversion cycle
- Days sales outstanding

### Red Flags to Watch

1. **Declining Cash Trend:** Consistent weekly decreases
2. **Large Payment Dependencies:** Too much reliance on single payments
3. **Seasonal Gaps:** Predictable low-cash periods
4. **Growth Strain:** Cash needs outpacing growth

### Action Items

1. Create your first 13-week forecast
2. Set up weekly review process
3. Identify your biggest cash flow risks
4. Plan mitigation strategies`,

          orderIndex: 1,
          lessonType: 'lecture',
          durationMinutes: 90,
        },
        {
          weekId: week4.id,
          title: 'Working Capital Management',
          slug: 'working-capital-management',
          content: `# Working Capital Management

## Optimizing Your Short-Term Financial Resources

Working capital is the lifeblood of your business - it's the difference between current assets and current liabilities, representing the funds available for day-to-day operations.

### Understanding Working Capital

**Formula: Working Capital = Current Assets - Current Liabilities**

**Current Assets:**
- Cash and bank balances
- Accounts receivable
- Inventory (if applicable)
- Prepaid expenses

**Current Liabilities:**
- Accounts payable
- Accrued expenses
- Short-term debt
- Customer deposits

### Working Capital Components

**1. Cash Management**
- Optimal cash balance
- Cash conversion efficiency
- Emergency reserves

**2. Accounts Receivable Management**
- Collection periods
- Credit policies
- Payment terms

**3. Accounts Payable Management**
- Payment timing optimization
- Supplier relationship management
- Cash flow timing

### Cash Conversion Cycle

The time it takes to convert investments back into cash:

**For Service Businesses:**
Days to Complete Work + Days to Collect Payment = Cash Cycle

**Example Developer Consulting:**
- Day 0: Start project
- Day 30: Complete and invoice
- Day 45: Receive payment
- Cash Cycle: 45 days

### Optimizing Accounts Receivable

**1. Faster Invoicing**
- Invoice immediately upon delivery
- Automate recurring invoices
- Clear payment instructions

**2. Better Payment Terms**
- Net 15 instead of Net 30
- Early payment discounts (2/10 Net 30)
- Late payment penalties

**3. Collection Strategies**
- Automated reminder systems
- Personal follow-up on large amounts
- Payment plans for struggling clients

### Managing Accounts Payable

**1. Strategic Payment Timing**
- Pay on due date, not early
- Take advantage of early payment discounts
- Negotiate better terms with suppliers

**2. Vendor Relationships**
- Build trust for flexible terms
- Consolidate purchases for better rates
- Regular communication about cash flow

### Working Capital Ratios

**1. Current Ratio**
Formula: Current Assets / Current Liabilities
Target: 1.5 - 3.0
- Above 3.0 might indicate inefficient cash use
- Below 1.5 suggests potential liquidity problems

**2. Quick Ratio**
Formula: (Current Assets - Inventory) / Current Liabilities
Target: 1.0 - 2.0
- More conservative than current ratio
- Better measure for service businesses

**3. Cash Ratio**
Formula: Cash / Current Liabilities
Target: 0.2 - 0.5
- Measures immediate liquidity
- Too high suggests excess cash

### Working Capital Optimization Strategies

**1. Accelerate Cash Inflows**
- Require upfront deposits (25-50%)
- Offer multiple payment methods
- Accept credit cards despite fees
- Factor or sell receivables if needed

**2. Manage Cash Outflows**
- Negotiate extended payment terms
- Use business credit cards for float
- Lease instead of buy equipment
- Time large purchases carefully

**3. Reduce Working Capital Needs**
- Improve operational efficiency
- Automate processes to reduce labor
- Outsource non-core functions
- Use technology to reduce overhead

### Industry Benchmarks for Developers

**SaaS Businesses:**
- Current Ratio: 2.0 - 4.0
- Cash Cycle: Negative (customers pay upfront)
- Working Capital: 3-6 months expenses

**Consulting Businesses:**
- Current Ratio: 1.5 - 2.5
- Cash Cycle: 30-60 days
- Working Capital: 2-4 months expenses

### Working Capital Financing

**When You Need More:**

**1. Line of Credit**
- Flexible borrowing up to limit
- Interest only on amount used
- Good for seasonal businesses

**2. Invoice Factoring**
- Sell receivables for immediate cash
- Get 70-90% of invoice value
- Expensive but fast

**3. Equipment Financing**
- Finance equipment purchases
- Preserve cash for operations
- Equipment serves as collateral

### Warning Signs

**Too Little Working Capital:**
- Difficulty paying bills on time
- Using credit cards for operations
- Turning down profitable work
- Stressed about payroll

**Too Much Working Capital:**
- Large idle cash balances
- Low return on assets
- Missed growth opportunities
- Inefficient operations

### Seasonal Considerations

**For Businesses with Seasonality:**

**High Season Preparation:**
- Build cash reserves
- Arrange credit facilities
- Plan inventory needs

**Low Season Management:**
- Reduce discretionary spending
- Collect outstanding receivables
- Consider temporary financing

### Technology Solutions

**Cash Flow Management:**
- Float, Pulse: Cash forecasting
- Kabbage, BlueVine: Lines of credit
- FundThrough: Invoice factoring

**Receivables Management:**
- FreshBooks, Invoice2go: Invoicing
- PayPal, Stripe: Payment processing
- Chaser, Atradius: Collections

### Key Takeaways

- Working capital is critical for survival
- Focus on cash conversion cycle optimization
- Balance liquidity with growth investment
- Monitor ratios regularly
- Plan for seasonal variations`,

          orderIndex: 2,
          lessonType: 'lecture',
          durationMinutes: 85,
        }
      ]
    })

    // =======================================================================
    // WEEK 5: Taxation and Legal Structure  
    // =======================================================================

    console.log('📚 Creating Week 5: Taxation and Legal Structure...')

    const week5 = await prisma.week.update({
      where: {
        courseId_weekNumber: {
          courseId: course.id,
          weekNumber: 5
        }
      },
      data: {
        title: 'Taxation and Legal Structure',
        overview: 'Understand business legal structures, tax implications, and compliance requirements. Learn to optimize your business structure for taxes and liability protection.',
        learningObjectives: JSON.stringify([
          'Understand different business legal structures',
          'Learn tax implications of each structure',
          'Master basic tax planning strategies',
          'Understand liability protection concepts',
          'Learn compliance requirements and deadlines'
        ]),
        estimatedHours: 8,
      }
    })

    await prisma.lesson.createMany({
      data: [
        {
          weekId: week5.id,
          title: 'Business Legal Structures',
          slug: 'business-legal-structures',
          content: `# Business Legal Structures

## Choosing the Right Structure for Your Developer Business

Your business structure affects taxes, liability, funding options, and day-to-day operations. Understanding the options helps you make informed decisions.

### Sole Proprietorship

**What It Is:**
- You and your business are legally the same entity
- Default structure for single-owner businesses
- No formal registration required in most states

**Tax Treatment:**
- Pass-through taxation (Schedule C)
- Self-employment tax on all profits
- No double taxation

**Pros:**
- Simple to set up and maintain
- Complete control over decisions
- Lower administrative costs
- Direct access to profits

**Cons:**
- Unlimited personal liability
- Harder to raise capital
- No tax planning flexibility
- Dies with owner

**Best For:**
- Solo developers starting out
- Low-risk service businesses
- Testing business concepts
- Simple consulting operations

### Partnership

**What It Is:**
- Two or more owners sharing profits and losses
- Partnership agreement defines roles and splits
- Pass-through taxation entity

**Types:**
- **General Partnership:** All partners liable
- **Limited Partnership:** Some partners have limited liability
- **Limited Liability Partnership (LLP):** Professional services

**Tax Treatment:**
- Pass-through to partners (Form 1065)
- Partners pay tax on their share
- Self-employment tax on active partners

**Pros:**
- Shared resources and expertise
- Pass-through taxation
- Flexible profit/loss allocation

**Cons:**
- Shared liability for all partners
- Potential conflicts between partners
- More complex than sole proprietorship

### Limited Liability Company (LLC)

**What It Is:**
- Hybrid structure combining corporation and partnership benefits
- Members (owners) have limited liability
- Flexible management structure

**Tax Treatment Options:**
- Single-member: Disregarded entity (Schedule C)
- Multi-member: Partnership taxation
- Can elect corporate taxation (S or C Corp)

**Pros:**
- Limited personal liability
- Tax flexibility
- Less paperwork than corporations
- Credibility with clients and vendors

**Cons:**
- Self-employment tax on active members
- Limited life in some states
- Less established law than corporations

**Best For:**
- Most developer businesses
- Multiple owners with different roles
- Businesses wanting liability protection
- Those needing tax flexibility

### S Corporation

**What It Is:**
- Corporation electing special tax treatment
- Up to 100 shareholders (must be US persons)
- One class of stock only

**Tax Treatment:**
- Pass-through taxation (no corporate tax)
- Owner-employees must take reasonable salary
- Remaining profits pass through without self-employment tax

**Pros:**
- Limited liability protection
- Potential self-employment tax savings
- Easier to add investors than LLC
- Established business structure

**Cons:**
- Strict eligibility requirements
- More paperwork and formalities
- Limited to one class of stock
- Must pay reasonable salary

**Best For:**
- Profitable service businesses
- Businesses with active owners
- Those wanting to minimize SE tax

### C Corporation

**What It Is:**
- Traditional corporation structure
- Separate tax entity
- Unlimited shareholders and share classes

**Tax Treatment:**
- Double taxation (corporate + individual)
- Corporate tax rate: 21% (federal)
- Qualified Small Business Stock benefits

**Pros:**
- Complete liability protection
- Easy to raise capital
- Employee benefit advantages
- No self-employment tax

**Cons:**
- Double taxation
- More complex and expensive
- Extensive record keeping
- Corporate formalities required

**Best For:**
- High-growth startups seeking investment
- Businesses planning to reinvest profits
- International operations
- Employee stock option plans

### Comparison Table

| Structure | Liability | Taxation | Complexity | Best For |
|-----------|-----------|----------|------------|----------|
| Sole Prop | Unlimited | Pass-through | Low | Solo, starting |
| Partnership | Unlimited | Pass-through | Medium | Multiple owners |
| LLC | Limited | Flexible | Medium | Most developers |
| S Corp | Limited | Pass-through* | High | Profitable service |
| C Corp | Limited | Double | High | High growth |

*S Corp requires reasonable salary subject to payroll taxes

### State Considerations

**LLC-Friendly States:**
- Delaware: Business-friendly laws
- Nevada: No state income tax
- Wyoming: Low fees and taxes

**Tax Considerations:**
- State income tax rates
- Franchise taxes and fees
- Operating agreement requirements
- Annual reporting requirements

### Changing Your Structure

**When to Consider Changes:**
- Significant profit increases
- Adding partners/investors
- Expanding to new states
- Planning for sale/exit

**Common Progressions:**
1. Sole Proprietorship → LLC
2. LLC → S Corporation (tax election)
3. S Corporation → C Corporation (growth/investment)

### Professional Advice

**When to Consult Professionals:**
- Choosing initial structure
- Significant business changes
- Tax planning strategies
- Legal compliance issues

**Types of Advisors:**
- Business Attorney: Legal structure advice
- CPA: Tax implications
- Business Advisor: Strategy alignment

### Key Takeaways

- Structure affects taxes, liability, and operations
- LLC is often best starting point for developers
- Consider changing structure as business grows
- Professional advice is valuable investment
- Don't let structure choice paralyze you - you can change later`,

          orderIndex: 1,
          lessonType: 'lecture',
          durationMinutes: 85,
        }
      ]
    })

    // =======================================================================
    // WEEK 6: Investment and Funding Strategies
    // =======================================================================

    console.log('📚 Creating Week 6: Investment and Funding Strategies...')

    const week6 = await prisma.week.update({
      where: {
        courseId_weekNumber: {
          courseId: course.id,
          weekNumber: 6
        }
      },
      data: {
        title: 'Investment and Funding Strategies',
        overview: 'Explore funding options for developer businesses, from bootstrapping to venture capital. Learn to evaluate and pursue appropriate funding sources.',
        learningObjectives: JSON.stringify([
          'Understand different funding options and their implications',
          'Learn to evaluate funding needs and timing',
          'Master bootstrapping and self-funding strategies',
          'Understand investor expectations and equity',
          'Learn to prepare for funding conversations'
        ]),
        estimatedHours: 8,
      }
    })

    await prisma.lesson.createMany({
      data: [
        {
          weekId: week6.id,
          title: 'Bootstrapping vs External Funding',
          slug: 'bootstrapping-vs-external-funding',
          content: `# Bootstrapping vs External Funding

## Choosing Your Funding Path

The decision between bootstrapping (self-funding) and seeking external funding is one of the most important choices you'll make as a developer entrepreneur.

### Bootstrapping: Building with Your Own Resources

**What It Means:**
- Using personal savings, revenue, and organic growth
- No external investors or significant debt
- Maintaining 100% ownership and control

**Advantages of Bootstrapping:**

**1. Complete Control**
- Make decisions without investor approval
- Pivot quickly when needed
- Maintain your vision and values
- No board meetings or reporting requirements

**2. Keep All Equity**
- 100% ownership means 100% of future value
- No dilution from multiple funding rounds
- All profits belong to you

**3. Focus on Profitability**
- Forces efficient spending and lean operations
- Revenue-focused from day one
- Sustainable business model required

**4. Lower Risk**
- No pressure to achieve unrealistic growth
- Fail small if business doesn't work
- No personal guarantees on large loans

**Challenges of Bootstrapping:**

**1. Limited Growth Capital**
- Slower expansion due to cash constraints
- May miss market opportunities
- Competition with well-funded rivals

**2. Personal Financial Risk**
- Using personal savings and assets
- Opportunity cost of salary
- Family financial pressure

**3. Resource Constraints**
- Harder to hire top talent
- Limited marketing budgets
- Fewer tools and technologies

### External Funding: Using Other People's Money

**What It Means:**
- Raising money from investors, lenders, or partners
- Exchanging equity or taking on debt
- Accelerating growth with capital infusion

**Types of External Funding:**

**1. Debt Financing**
- Business loans
- Lines of credit
- Equipment financing
- Maintain ownership but have repayment obligations

**2. Equity Financing**
- Angel investors
- Venture capital
- Strategic investors
- Give up ownership for capital and expertise

**Advantages of External Funding:**

**1. Accelerated Growth**
- Hire team quickly
- Invest in marketing and sales
- Capture market opportunities

**2. Expertise and Networks**
- Investor knowledge and experience
- Access to their professional networks
- Strategic guidance and mentoring

**3. Shared Risk**
- Reduce personal financial exposure
- Validate business concept
- Professional management systems

**Challenges of External Funding:**

**1. Loss of Control**
- Board seats and voting rights
- Investor approval required for major decisions
- Pressure to achieve investor returns

**2. Equity Dilution**
- Own smaller percentage of larger company
- Future funding rounds dilute further
- May lose founder control

**3. Growth Pressure**
- Expectation of rapid scalability
- Risk-taking to achieve returns
- Potential pivot pressure

### Decision Framework

**Bootstrap When:**
- You have sufficient personal resources
- Market doesn't require speed to capture
- You value control over growth
- Business model is profitable quickly
- Low startup costs required

**Seek Funding When:**
- Large market opportunity with time pressure
- High upfront capital requirements
- Network effects or first-mover advantages
- Need specialized expertise
- Personal resources insufficient

### Hybrid Approaches

**Revenue-Based Financing:**
- Investors provide capital for percentage of revenue
- No equity dilution
- Payments tied to business performance

**Crowdfunding:**
- Raise small amounts from many people
- Keep equity and control
- Marketing and validation benefits

**Strategic Partnerships:**
- Partner provides resources for revenue share
- Access to their customer base
- Shared risk and investment

### Developer Business Examples

**Bootstrapped Success Stories:**
- **Basecamp:** 37signals built profitable business
- **Mailchimp:** Grew to billion-dollar valuation
- **GitHub:** Initially bootstrapped before funding

**VC-Funded Success Stories:**
- **Stripe:** Raised funding to capture payments market
- **Slack:** Scaled quickly with VC backing
- **Zoom:** Built enterprise platform with funding

### Financial Comparison

**Bootstrapped Business Example:**
- Year 1: $50K revenue, $30K profit (60% margin)
- Year 3: $300K revenue, $180K profit
- Owner keeps 100% = $180K annual income

**VC-Funded Business Example:**
- Year 1: $200K revenue, -$300K (investing in growth)
- Year 3: $2M revenue, $200K profit
- Owner keeps 60% = $120K equivalent income
- But company worth $10M+ (Owner's 60% = $6M)

### Making Your Decision

**Consider Your Goals:**
1. **Lifestyle Business:** Bootstrapping often better
2. **High Growth:** External funding may be necessary
3. **Market Timing:** Speed to market requirements
4. **Personal Risk Tolerance:** How much can you afford to lose?

**Questions to Ask:**
- What's your growth timeline?
- How much control are you willing to give up?
- What's the total addressable market?
- Do you need specialized expertise?
- What are your personal financial constraints?

### The Middle Ground

Many successful companies start bootstrapped and raise funding later:

**Progression Path:**
1. **Bootstrap to validate:** Prove concept with own money
2. **Revenue growth:** Use profits to scale gradually  
3. **Strategic funding:** Raise money when opportunity is clear
4. **Scale aggressively:** Use funding to capture market

### Key Takeaways

- Neither path is inherently better - depends on your situation
- Consider your goals, market, and resources
- You can change paths as business evolves
- Most successful developers start bootstrapped
- External funding is a tool, not a goal`,

          orderIndex: 1,
          lessonType: 'lecture',
          durationMinutes: 90,
        }
      ]
    })

    console.log('✅ Weeks 4-6 created successfully!')
    console.log('📊 Created comprehensive lesson content for cash flow, taxation, and funding')

  } catch (error) {
    console.error('❌ Error completing curriculum 4-6:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

completeCurriculum456().catch(console.error)