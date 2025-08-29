const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createWeek11() {
  console.log('Creating Week 11: Exit Strategies and Valuation')
  
  // First, get the course ID
  const course = await prisma.course.findFirst({
    where: { slug: 'finacademy-for-developers' }
  })
  
  if (!course) {
    console.error('Course not found!')
    return
  }
  
  // Update Week 11 with proper content
  const week11 = await prisma.week.update({
    where: { courseId_weekNumber: { courseId: course.id, weekNumber: 11 } },
    data: {
      title: 'Exit Strategies and Valuation',
      overview: 'Understanding business valuation methods and exit strategies for developer businesses. Learn how to maximize value, prepare for exits, and make strategic decisions about selling or transitioning your business.',
      learningObjectives: JSON.stringify([
        'Master different business valuation methodologies',
        'Understand various exit strategy options and their implications',
        'Learn to prepare your business for sale or transition',
        'Develop value maximization strategies',
        'Understand the M&A process for technology businesses',
        'Plan for succession and legacy considerations'
      ]),
      estimatedHours: 8,
    },
  })
  
  console.log('Week 11 updated successfully:', week11.title)
  
  // Create Lesson 1
  await prisma.lesson.create({
    data: {
      weekId: week11.id,
      title: 'Business Valuation Fundamentals',
      slug: 'business-valuation-fundamentals',
      orderIndex: 1,
      durationMinutes: 95,
      content: `# Business Valuation Fundamentals

## Understanding What Your Developer Business is Worth

Business valuation is both an art and a science, especially for developer businesses where much of the value lies in intangible assets like expertise, client relationships, and intellectual property. Understanding how to value your business is crucial whether you're planning an exit, seeking investment, or simply tracking progress.

### Why Valuation Matters for Developers

**Strategic Planning Benefits:**
- Setting realistic growth and profitability targets
- Making informed investment decisions
- Understanding the financial impact of business decisions
- Benchmarking against industry peers

**Practical Applications:**
- Partnership negotiations and equity splits
- Investment fundraising and investor discussions
- Insurance coverage determinations
- Estate planning and succession considerations
- Exit planning and sale preparation

### Core Valuation Concepts

**Book Value vs. Market Value**
- **Book Value**: Accounting value based on financial statements
- **Market Value**: What buyers are willing to pay in current market conditions
- For developer businesses, market value typically exceeds book value significantly

**Going Concern vs. Liquidation Value**
- **Going Concern**: Value as an operating business
- **Liquidation Value**: Value if assets were sold individually
- Developer businesses have minimal liquidation value but substantial going concern value

**Control Premium and Minority Discount**
- **Control Premium**: Additional value for controlling stake
- **Minority Discount**: Reduced value for non-controlling interests
- Critical for partnership valuations and equity transactions

### Primary Valuation Approaches

**1. Asset-Based Approach**

**Book Value Method:**
Most basic approach using balance sheet values.

Calculation:
Total Assets - Total liabilities = Book Value

Developer Business Example:
- Equipment and Software: $25,000
- Cash and Receivables: $50,000  
- Total Assets: $75,000
- Total Liabilities: $15,000
- Book Value: $60,000

**Limitations for Developer Businesses:**
- Ignores intangible assets (client relationships, expertise, brand)
- Doesn't reflect future earning potential
- Undervalues knowledge-based businesses
- Suitable mainly as a floor value

**Adjusted Book Value Method:**
Adjusts asset values to current market prices.

Adjustments for Developers:
- Equipment at fair market value
- Accounts receivable at net realizable value
- Add value for developed software/IP
- Subtract estimated collection costs

**2. Income-Based Approach**

**Discounted Cash Flow (DCF) Method:**
Values business based on projected future cash flows.

**Step 1: Project Free Cash Flows**
Free Cash Flow = Net Income + Depreciation - Capital Expenditures - Change in Working Capital

5-Year Developer Business Projection:
Year 1: $100,000 free cash flow
Year 2: $120,000 (+20% growth)
Year 3: $140,000 (+17% growth)
Year 4: $160,000 (+14% growth)
Year 5: $175,000 (+9% growth)

**Step 2: Determine Discount Rate**
Discount Rate = Risk-Free Rate + Risk Premium

Components:
- Risk-free rate (10-year Treasury): 3.5%
- Business risk premium: 8-15%
- Size premium (small business): 5-10%
- Total discount rate: 16.5-28.5%

**Step 3: Calculate Terminal Value**
Terminal Value = Year 5 FCF × (1 + growth) / (discount rate - growth)

Assuming 3% terminal growth and 20% discount rate:
Terminal Value = $175,000 × 1.03 / (0.20 - 0.03) = $1,060,294

**Step 4: Present Value Calculation**
PV of Year 1-5 cash flows + PV of terminal value = Business Value

**Capitalization of Earnings Method:**
Simpler approach using single-year earnings.

Formula: Business Value = Annual Earnings / Capitalization Rate

Example:
- Normalized annual earnings: $150,000
- Capitalization rate: 25%
- Business value: $150,000 / 0.25 = $600,000

Capitalization Rate Considerations:
- Higher risk = higher cap rate = lower value
- Developer businesses typically 20-30% cap rates
- Established businesses with diverse clients: 20-25%
- Newer or client-dependent businesses: 25-35%

**3. Market-Based Approach**

**Comparable Company Analysis:**
Values business based on similar companies' sale prices.

**Key Metrics for Developer Businesses:**
- Price-to-Revenue multiples: 1.5x - 4x
- Price-to-EBITDA multiples: 3x - 8x
- Price-to-Discretionary Earnings: 2x - 5x

**Market Multiple Ranges by Business Type:**

Custom Software Development:
- Revenue multiple: 1.5x - 3x
- EBITDA multiple: 4x - 7x
- Factors: Client diversity, recurring revenue, team size

SaaS/Product Companies:
- Revenue multiple: 2x - 6x
- EBITDA multiple: 6x - 12x
- Factors: Growth rate, churn, market size

Consulting/Services:
- Revenue multiple: 1x - 2.5x
- EBITDA multiple: 3x - 6x
- Factors: Specialization, client relationships, repeatability

**Adjustments for Comparability:**
- Business size differences
- Geographic market variations
- Service mix and complexity
- Client concentration levels
- Growth rates and trends

### Valuation Factors Unique to Developer Businesses

**Technology and Intellectual Property**
- Proprietary software and code libraries
- Patents, trademarks, and copyrights
- Trade secrets and methodologies
- Technical documentation and processes

Valuation Considerations:
- Competitive advantage duration
- Ease of replication
- Market demand and application
- Legal protection strength

**Human Capital and Expertise**
- Team technical expertise and experience
- Industry specialization and reputation
- Client relationships and trust
- Training and development capabilities

Key Factors:
- Key person dependency risks
- Team retention and loyalty
- Knowledge documentation and transfer
- Succession planning readiness

**Client Portfolio Quality**
- Client concentration and diversification
- Contract length and renewal rates
- Payment terms and collection history
- Market position and growth potential

Portfolio Analysis:
- Top 5 clients' revenue percentage
- Average contract duration
- Client industry diversification
- Geographic distribution

### Common Valuation Mistakes

**Overvaluing Based on Potential**
- Counting uncertain future opportunities
- Ignoring execution risks and market changes
- Overestimating market size and share
- Underestimating competitive responses

**Undervaluing Intangible Assets**
- Ignoring brand value and reputation
- Overlooking client relationship value  
- Discounting intellectual property
- Underestimating team expertise value

**Using Inappropriate Multiples**
- Comparing to different business models
- Ignoring size and risk differences
- Using outdated market data
- Misapplying public company multiples

### Building Your Valuation Model

**Step 1: Data Preparation**
- Clean 3-5 years of financial statements
- Normalize earnings (remove one-time items)
- Adjust for owner compensation
- Document key business metrics

**Step 2: Multiple Method Application**
- Apply 2-3 different valuation methods
- Compare results for reasonableness
- Weight methods based on business characteristics
- Document assumptions and limitations

**Step 3: Value Range Development**
Rather than a single point value, develop ranges:
- Conservative estimate: Lower end of range
- Most likely estimate: Mid-point of range  
- Optimistic estimate: Upper end of range

Example Developer Business Valuation Summary:
Asset Approach: $60,000 - $100,000
Income Approach: $400,000 - $700,000  
Market Approach: $500,000 - $800,000
Weighted Average: $475,000 - $750,000

### Key Takeaways

- Multiple valuation methods provide better accuracy than single approaches
- Developer businesses derive most value from intangible assets
- Market conditions and timing significantly impact valuations
- Regular valuation updates help track business building progress
- Professional appraisers add credibility for major transactions

Understanding your business value enables better strategic decisions and helps you build value systematically over time. Whether planning an exit or reinvesting in growth, valuation provides the financial foundation for informed choices.`
    }
  })
  console.log('Created Lesson 1: Business Valuation Fundamentals')

  // Create Lesson 2
  await prisma.lesson.create({
    data: {
      weekId: week11.id,
      title: 'Exit Strategy Options and Planning',
      slug: 'exit-strategy-options-planning',
      orderIndex: 2,
      durationMinutes: 100,
      content: `# Exit Strategy Options and Planning

## Strategic Approaches to Business Transition

Exit planning isn't just about selling your business—it's about creating optionality and maximizing value regardless of your ultimate path. Smart developers begin exit planning early to build valuable, transferable businesses.

### Why Exit Planning Matters

**Value Creation Benefits:**
- Forces focus on building transferable value
- Identifies and addresses business weaknesses
- Creates multiple future options and flexibility
- Maximizes financial returns from your efforts

**Risk Management:**
- Protects against unexpected life changes
- Ensures business continuity for employees and clients
- Provides financial security for your family
- Creates contingency plans for various scenarios

**Timeline Considerations:**
Exit planning should begin 3-5 years before your intended transition to allow time for value building and market positioning.

### Common Exit Strategy Options

**1. Strategic Sale to Competitors or Related Companies**

**Advantages:**
- Typically highest valuations due to synergies
- Strategic buyers can afford premium prices
- May offer opportunities for continued involvement
- Access to larger markets and resources

**Strategic Buyer Types:**
- Direct competitors seeking market share
- Larger agencies looking for specialized expertise
- Technology companies expanding service offerings
- Consulting firms adding technical capabilities

**Synergy Value Drivers:**
- Client base expansion and cross-selling
- Geographic market expansion
- Technology stack complementarity
- Team expertise and capability additions

**Preparation Requirements:**
- Document all processes and methodologies
- Create detailed client and project histories
- Establish clear intellectual property ownership
- Build systems that don't depend on owner presence

Real Example:
A specialized fintech development agency was acquired by a large consulting firm for 4.5x revenue because they brought deep regulatory expertise and established relationships with financial institutions that the buyer couldn't easily replicate.

**2. Financial Buyer Sale (Private Equity/Investment Groups)**

**Advantages:**
- Professional transaction process
- May allow partial liquidity while retaining ownership
- Access to capital for growth acceleration
- Professional management expertise

**Financial Buyer Characteristics:**
- Focus on consistent cash flows and growth potential
- Typically require $2M+ EBITDA
- Often seek platform companies for add-on acquisitions
- Usually have 3-7 year investment horizons

**What Financial Buyers Look For:**
- Predictable, recurring revenue streams
- Diversified client base and market position
- Professional management team beyond founder
- Clear growth opportunities and scalability

**Transaction Structures:**
- Full sale: 100% equity transfer
- Majority recapitalization: Sell majority, retain equity
- Management buyout financing: Buy from other partners

**3. Management Buyout (MBO)**

**Advantages:**
- Maintains business culture and relationships
- Provides opportunity for key employees
- Ensures business continuity
- May offer seller financing options

**MBO Structures:**
- Employee Stock Ownership Plan (ESOP)
- Direct purchase by management team
- Gradual ownership transition over time
- Performance-based earnout arrangements

**Requirements for Success:**
- Capable management team with business experience
- Strong financial performance and cash flows
- Access to financing (SBA loans, seller financing)
- Clear succession plan and documentation

**Financing Considerations:**
- Management team typically can't finance full purchase
- Seller financing often necessary
- SBA loans may be available for qualified buyers
- Performance earnouts protect both parties

**4. Initial Public Offering (IPO)**

**Advantages:**
- Highest potential valuations
- Liquidity while retaining control
- Currency for acquisitions
- Enhanced credibility and brand recognition

**IPO Requirements:**
- Minimum $50M+ annual revenue (typically much higher)
- Strong growth trajectory and market opportunity
- Professional management and board structure
- Comprehensive financial controls and reporting

**Developer Business IPO Challenges:**
- Most developer businesses too small for public markets
- High ongoing compliance and reporting costs
- Loss of privacy and operational flexibility
- Quarterly earnings pressure may conflict with long-term strategy

**Alternative: SPAC Transactions**
Special Purpose Acquisition Companies may offer IPO alternative for larger developer businesses with strong growth profiles.

### Strategic Considerations for Each Option

**Timing Market Conditions**

Market cycles significantly impact exit opportunities:

**Bull Markets:**
- Higher valuations across all exit types
- More buyer competition and strategic premium
- Greater access to financing for buyers
- Shorter transaction timelines

**Bear Markets:**
- Lower valuations but potentially better businesses available
- Strategic buyers focus on defensive acquisitions
- Financial buyers seek distressed opportunities
- Longer transaction timelines and more due diligence

**Industry-Specific Factors:**
- Technology platform shifts creating consolidation
- Regulatory changes affecting industry dynamics
- Economic conditions impacting client spending
- Talent market competition and wage inflation

**Owner Objectives Alignment**

**Financial Objectives:**
- Maximum cash at closing vs. future earnout potential
- Tax optimization and capital gains treatment
- Liquidity needs and timeline requirements
- Risk tolerance for seller financing

**Personal Objectives:**
- Continued involvement vs. complete exit
- Legacy and reputation considerations
- Team and client relationship preservation
- Family and lifestyle goals

**Business Objectives:**
- Company culture and value preservation
- Growth opportunity maximization
- Innovation and technology advancement
- Market position and competitive strength

### Maximizing Exit Value

**Value Building Strategies**

**Revenue Quality Improvements:**
- Increase recurring revenue percentage
- Diversify client base and reduce concentration
- Expand geographic markets
- Develop higher-margin service offerings

**Operational Excellence:**
- Document and systematize key processes
- Reduce owner dependency through delegation
- Implement professional management practices
- Establish clear performance metrics and reporting

**Strategic Positioning:**
- Develop unique market positioning and competitive advantages
- Build intellectual property and proprietary methodologies
- Establish thought leadership and brand recognition
- Create barriers to entry for competitors

**Financial Optimization:**
- Improve profit margins through efficiency gains
- Optimize working capital and cash conversion
- Eliminate non-essential expenses and investments
- Prepare clean, audited financial statements

**Team Development:**
- Build strong management team below owner level
- Create succession plans for key positions
- Establish employee retention and incentive programs
- Document institutional knowledge and training materials

### Exit Planning Timeline

**3-5 Years Before Exit:**
- Begin value building initiatives
- Address major business dependencies and risks
- Establish financial control systems and reporting
- Start building strategic buyer relationships

**2-3 Years Before Exit:**
- Engage professional advisors (investment banker, attorney, accountant)
- Complete business valuation and gap analysis
- Implement tax planning strategies
- Begin management team development

**1-2 Years Before Exit:**
- Complete operational improvements and documentation
- Conduct practice due diligence process
- Finalize legal structure and documentation
- Begin informal market testing

**6-12 Months Before Exit:**
- Launch formal sale process
- Complete due diligence preparation
- Negotiate and structure transactions
- Plan post-transaction transition

### Common Exit Planning Mistakes

**Starting Too Late:**
- Insufficient time for value building
- Limited buyer options and negotiation power
- Rushed transactions at suboptimal prices
- Inadequate tax planning opportunities

**Over-Optimizing for Single Exit Path:**
- Market conditions may not support preferred exit
- Single buyer dependency creates negotiation weakness
- Alternative structures may offer better outcomes
- Economic cycles may require flexibility

**Ignoring Tax Implications:**
- Capital gains vs. ordinary income treatment
- State tax implications of transaction structure
- Installment sale and earnout tax consequences
- Estate planning integration with exit planning

### Key Takeaways

- Exit planning should begin years before intended transaction
- Multiple exit options provide flexibility and negotiation strength
- Value building activities benefit the business regardless of exit path
- Professional advisor team is essential for complex transactions
- Market timing and industry dynamics significantly impact outcomes
- Owner objectives should drive exit strategy selection

Remember: The best exit strategy is having multiple options. Build your business to be attractive to various types of buyers while remaining flexible about timing and structure based on market conditions and personal objectives.`
    }
  })
  console.log('Created Lesson 2: Exit Strategy Options and Planning')

  // Create Lesson 3
  await prisma.lesson.create({
    data: {
      weekId: week11.id,
      title: 'Preparing Your Business for Sale',
      slug: 'preparing-business-for-sale',
      orderIndex: 3,
      durationMinutes: 90,
      content: `# Preparing Your Business for Sale

## Creating a Sellable Developer Business

The difference between a business that sells quickly at premium valuation and one that struggles to find buyers often comes down to preparation. Smart preparation transforms your developer expertise into a transferable business asset.

### The Sellable Business Framework

**Transferable Value Components:**
- Documented systems and processes
- Diversified client relationships
- Recurring revenue streams
- Professional management capabilities
- Intellectual property and methodologies
- Growth opportunities and market position

**Buyer's Perspective on Developer Businesses:**
Buyers evaluate developer businesses through the lens of risk and opportunity. They want predictable returns with manageable risk and clear growth potential.

### Financial Readiness

**Clean Financial Statements**

**Professional Bookkeeping Standards:**
- Monthly financial statement preparation
- Generally Accepted Accounting Principles (GAAP) compliance
- Consistent accounting methods and periods
- Proper expense categorization and tracking

**Key Financial Documents Required:**
- 3-5 years of profit and loss statements
- Balance sheets with detailed asset/liability breakdown
- Cash flow statements showing operating activities
- Tax returns for business and key owners
- Accounts receivable and payable aging reports

**Financial Statement Quality Issues to Address:**

Personal Expenses Mixed with Business:
- Separate all personal expenses from business accounts
- Document any legitimate business use of personal assets
- Establish clear expense reimbursement policies
- Maintain detailed records of business-related expenses

Revenue Recognition Problems:
- Consistent timing of revenue recording
- Proper matching of project revenue with expenses
- Clear documentation of contract terms and milestones
- Accrual accounting for projects spanning multiple periods

**Normalized Earnings Calculation:**
Buyers focus on maintainable earnings rather than reported net income.

Common Normalization Adjustments:
- Remove one-time expenses (legal settlements, major equipment)
- Adjust owner compensation to market rates
- Add back discretionary expenses (excessive travel, personal items)
- Remove related-party transactions at off-market rates

Example Normalization:
Reported Net Income: $120,000
+ Excess owner compensation: $40,000
+ One-time legal expenses: $15,000
+ Personal vehicle expenses: $8,000
- Market-rate owner compensation: $(80,000)
= Normalized Earnings: $103,000

**Recurring Revenue Analysis**
Buyers pay premium multiples for predictable revenue streams.

**Revenue Quality Hierarchy:**
1. **Software licenses/subscriptions**: Highest value, most predictable
2. **Maintenance contracts**: High value, predictable with some churn risk
3. **Retainer agreements**: Good value, medium predictability
4. **Repeat project clients**: Medium value, less predictable timing
5. **New project pipeline**: Lowest value, high uncertainty

**Revenue Stream Documentation:**
- Contract terms and renewal rates
- Historical client retention statistics
- Pipeline probability and conversion rates
- Seasonality patterns and trends

### Operational Excellence

**Process Documentation**

**Critical Process Categories:**

**Sales and Marketing:**
- Lead generation and qualification procedures
- Proposal development and pricing methodologies
- Contract negotiation and closing processes
- Client onboarding and expectation setting

**Project Delivery:**
- Project scoping and estimation processes
- Development methodologies and standards
- Quality assurance and testing procedures
- Client communication and reporting protocols

**Business Operations:**
- Financial management and reporting
- Human resources and team management
- Vendor management and procurement
- Legal and compliance procedures

**Documentation Standards:**
Each process should include:
- Step-by-step procedures
- Responsible parties and roles
- Required tools and resources
- Quality checkpoints and metrics
- Exception handling procedures

**Systems and Technology Infrastructure**

**Business Systems Inventory:**
- Customer Relationship Management (CRM)
- Project management and tracking
- Financial management and accounting
- Time tracking and resource management
- Communication and collaboration tools

**Technical Infrastructure:**
- Development environment setup and maintenance
- Code repositories and version control
- Testing and deployment automation
- Security and backup procedures
- Documentation and knowledge management

**System Integration and Dependencies:**
- Data flow between systems
- Integration points and APIs
- Backup and disaster recovery procedures
- Security protocols and access controls

### Reducing Owner Dependency

**Management Team Development**

**Key Management Roles:**
- Operations Manager: Daily business operations
- Technical Lead: Development standards and architecture
- Client Relationship Manager: Account management and growth
- Business Development: Sales and marketing leadership

**Delegation Strategy:**
Systematically transfer responsibilities from owner to team members:

**Phase 1: Operational Tasks**
- Day-to-day project management
- Client communication and reporting
- Quality assurance and testing
- Administrative and financial tasks

**Phase 2: Strategic Decisions**
- Project scoping and estimation
- Technology platform decisions
- Hiring and team development
- Vendor selection and management

**Phase 3: Client Relationships**
- Primary client contact responsibilities
- Contract negotiation and renewal
- Business development and sales
- Strategic planning and vision

**Knowledge Transfer Process:**
- Document decision-making criteria
- Create training materials and procedures
- Establish mentoring and coaching programs
- Implement gradual responsibility transfer

### Client Portfolio Optimization

**Client Concentration Risk**

**Diversification Targets:**
- No single client >30% of revenue
- Top 5 clients <60% of revenue
- Multiple industry verticals represented
- Geographic distribution when possible

**Client Quality Assessment:**
- Payment terms and collection history
- Project profitability and scope creep
- Relationship stability and communication
- Growth potential and referral value

**Client Relationship Documentation:**
- Complete project history and outcomes
- Key contact relationships and preferences
- Technical requirements and constraints
- Competitive position and market context

**Contract Standardization**
Buyers prefer businesses with consistent, professional contracts.

**Standard Contract Elements:**
- Clear scope definition and change order procedures
- Intellectual property ownership and licensing
- Payment terms and collection procedures
- Limitation of liability and indemnification
- Termination clauses and transition procedures

### Intellectual Property and Assets

**IP Audit and Documentation**

**Code and Software Assets:**
- Custom frameworks and libraries
- Proprietary algorithms and methodologies
- Client-specific customizations and tools
- Internal development and management tools

**IP Protection Strategies:**
- Copyright registration for significant code bases
- Trade secret protection for proprietary methods
- Non-disclosure agreements with employees and contractors
- Clear IP ownership clauses in all contracts

**Brand and Reputation Assets:**
- Trademarks and domain names
- Marketing materials and brand guidelines
- Case studies and client testimonials
- Industry recognition and awards

### Due Diligence Preparation

**Information Room Organization**
Organize all business information for easy buyer access:

**Financial Information:**
- Historical financial statements and tax returns
- Management reports and KPI dashboards
- Contracts and receivables documentation
- Capital expenditure and investment records

**Legal Documentation:**
- Corporate formation and governance documents
- Employment agreements and contractor relationships
- Client contracts and master service agreements
- Intellectual property and licensing agreements

**Operational Information:**
- Process documentation and procedures
- Technology infrastructure and systems
- Insurance policies and risk management
- Regulatory compliance and certifications

### Pre-Sale Value Enhancement

**Quick Wins (3-6 months):**
- Clean up financial record-keeping
- Document critical business processes
- Standardize client contracts and terms
- Reduce owner involvement in daily operations

**Medium-term Improvements (6-18 months):**
- Diversify client base and reduce concentration
- Implement professional management systems
- Build recurring revenue streams
- Develop strong management team

**Long-term Value Building (1-3 years):**
- Establish market-leading competitive position
- Create scalable business model and operations
- Build strong brand and reputation
- Develop multiple exit opportunity paths

### Common Preparation Mistakes

**Waiting Until Ready to Sell:**
Business improvements take time to show results and build credibility with buyers.

**Over-Engineering the Business:**
Focus on changes that actually impact buyer perception and business value.

**Ignoring Team Concerns:**
Employees may worry about job security during sale process. Clear communication builds support.

**Underestimating Time Requirements:**
Sale preparation requires significant management attention while running the business.

### Key Takeaways

- Business preparation should begin 2-3 years before intended sale
- Financial cleanliness and transparency are fundamental requirements
- Owner dependency is the biggest value killer for developer businesses
- Process documentation and systems thinking appeal to buyers
- Client diversification and recurring revenue drive premium valuations
- Professional management team development enables higher multiples

Remember: You're not just selling a business—you're selling a platform for the buyer's future success. The more turnkey and growth-ready your business appears, the more buyers will pay for that opportunity.`
    }
  })
  console.log('Created Lesson 3: Preparing Your Business for Sale')

  // Create Lesson 4
  await prisma.lesson.create({
    data: {
      weekId: week11.id,
      title: 'Mergers and Acquisitions Process',
      slug: 'mergers-acquisitions-process',
      orderIndex: 4,
      durationMinutes: 85,
      content: `# Mergers and Acquisitions Process

## Navigating the M&A Journey

Understanding the M&A process is crucial for developer business owners considering a sale. The process is complex, time-consuming, and emotionally challenging, but proper preparation and professional guidance can lead to successful outcomes.

### Overview of the M&A Process

**Typical Timeline:**
- Preparation and Setup: 2-4 months
- Marketing and Initial Outreach: 1-3 months
- Buyer Evaluation and Selection: 2-4 months
- Due Diligence and Negotiation: 3-6 months
- Closing and Integration: 1-3 months
- **Total Timeline: 9-20 months**

**Success Factors:**
- Thorough preparation before market engagement
- Professional advisor team with M&A experience
- Clear objectives and decision-making criteria
- Patience and persistence throughout the process
- Flexible negotiation approach and problem-solving

### Phase 1: Pre-Market Preparation

**Building Your Advisory Team**

**Investment Banker/M&A Advisor:**
- Provides market expertise and buyer relationships
- Manages process timeline and communications
- Advises on valuation and negotiation strategy
- Maintains confidentiality and professional distance

Selection Criteria:
- Technology industry experience and track record
- Relevant transaction size expertise ($1M-$50M for most developer businesses)
- Strong buyer network and relationship
- Fee structure alignment with your objectives

**Attorney (M&A Specialist):**
- Reviews and negotiates transaction documents
- Provides legal structure and tax optimization advice
- Manages regulatory compliance and approvals
- Protects your interests throughout the process

**Certified Public Accountant:**
- Prepares financial due diligence materials
- Advises on tax implications and optimization strategies
- Supports financial due diligence responses
- Plans post-transaction tax and financial structure

**Business Valuation:**
Professional valuation serves multiple purposes:
- Establishes realistic price expectations
- Provides negotiation anchor point
- Supports financing applications
- Creates credible marketing materials

### Phase 2: Marketing Strategy and Execution

**Buyer Identification and Categorization**

**Strategic Buyers:**
- Direct competitors seeking market share expansion
- Technology companies adding service capabilities
- Consulting firms acquiring specialized expertise
- Larger agencies pursuing geographic expansion

Strategic Buyer Research:
- Recent acquisition activity and patterns
- Financial capacity and acquisition criteria
- Strategic objectives and growth plans
- Cultural fit and integration approach

**Financial Buyers:**
- Private equity funds with technology focus
- Investment groups seeking platform companies
- Family offices and individual investors
- Mezzanine funds and growth capital providers

Financial Buyer Analysis:
- Fund size and investment criteria
- Portfolio companies and synergy opportunities
- Investment timeline and exit strategy
- Management involvement expectations

**Marketing Materials Development**

**Confidential Information Memorandum (CIM):**
Professional marketing document highlighting business strengths and opportunities:

Essential CIM Sections:
- Executive Summary: Key value proposition and metrics
- Business Overview: Services, markets, and competitive position
- Management Team: Experience, roles, and post-transaction plans
- Financial Performance: Historical results and future projections
- Strategic Rationale: Growth opportunities and synergies

**Financial Model and Projections:**
Detailed 3-5 year financial projections supporting valuation:
- Revenue growth assumptions and drivers
- Operating expense scaling and leverage
- Capital expenditure requirements
- Cash flow generation and distribution

**Process Letter and Teaser:**
Initial marketing materials for broad distribution:
- One-page business overview without identifying information
- Key financial metrics and growth indicators
- Investment highlights and strategic rationale
- Process timeline and next steps

### Phase 3: Buyer Outreach and Management

**Controlled Auction Process**

**Initial Outreach Strategy:**
- Prioritized list of 20-40 potential buyers
- Staged approach with strategic buyers first
- Confidentiality agreements before information sharing
- Professional presentation and communication

**Managing Multiple Buyers:**
- Consistent information and timing across all parties
- Clear process rules and expectations
- Regular communication and status updates
- Objective evaluation criteria and scoring

**Indication of Interest (IOI) Collection:**
Preliminary offers typically include:
- Purchase price range and structure
- Key assumptions and conditions
- Financing arrangements and certainty
- Timeline and next steps

**IOI Evaluation Criteria:**
- Price and total consideration value
- Deal structure and risk allocation
- Buyer credibility and financial capacity
- Cultural fit and business philosophy
- Post-transaction employee treatment

### Phase 4: Due Diligence Process

**Due Diligence Categories**

**Financial Due Diligence:**
Detailed review of financial performance and projections:
- Revenue recognition and sustainability analysis
- Cost structure and margin analysis
- Working capital requirements and trends
- Capital expenditure and investment needs

Common Financial Issues:
- Revenue concentration and client dependency
- Margin pressure and competitive dynamics
- Cash conversion and collection challenges
- Hidden liabilities or contingencies

**Commercial Due Diligence:**
Market and competitive position analysis:
- Market size, growth, and dynamics
- Competitive landscape and positioning
- Client satisfaction and retention
- Service offerings and differentiation

**Operational Due Diligence:**
Business systems and process evaluation:
- Management team depth and capabilities
- Process documentation and scalability
- Technology infrastructure and systems
- Quality control and risk management

**Legal Due Diligence:**
Legal structure and compliance review:
- Corporate structure and governance
- Material contracts and commitments
- Intellectual property ownership and protection
- Regulatory compliance and litigation

**Information Room Management:**
Organized virtual data room with:
- Indexed document organization
- Version control and update management
- Access control and audit tracking
- Response tracking and follow-up management

### Phase 5: Negotiation and Documentation

**Letter of Intent (LOI)**
Non-binding agreement outlining key transaction terms:

**Key LOI Terms:**
- Purchase price and payment structure
- Deal structure (asset vs. stock sale)
- Due diligence timeline and conditions
- Exclusivity period and termination rights
- Key assumptions and requirements

**Negotiation Strategy:**
- Focus on total economic value, not just price
- Understand buyer's key concerns and constraints
- Maintain leverage through multiple interested parties
- Balance risk protection with deal completion

**Definitive Purchase Agreement**
Comprehensive legal document governing the transaction:

**Critical Agreement Sections:**
- Purchase price and adjustment mechanisms
- Representations and warranties
- Indemnification provisions
- Closing conditions and requirements
- Post-closing covenants and restrictions

**Common Negotiation Points:**
- Working capital adjustments and normalization
- Earnout structures and performance metrics
- Employment agreements and non-compete terms
- Escrow arrangements and holdback provisions

### Managing Transaction Risks

**Due Diligence Risk Mitigation**
- Thorough preparation and documentation
- Proactive disclosure of known issues
- Professional advice on complex matters
- Realistic expectations and contingency planning

**Financing Risk Management**
- Buyer financial capacity verification
- Financing commitment quality assessment
- Alternative structure consideration
- Backup buyer maintenance

**Closing Risk Factors**
- Regulatory approval requirements
- Third-party consent and approvals
- Material adverse change provisions
- Integration planning and preparation

### Post-Transaction Considerations

**Transition Planning**
- Employee communication and retention
- Client notification and relationship transfer
- System integration and process alignment
- Cultural integration and change management

**Earnout Management**
If transaction includes earnout provisions:
- Clear performance metrics and measurement
- Regular reporting and communication
- Dispute resolution procedures
- Alignment with business operations

**Tax Optimization**
- Structure selection (asset vs. stock sale)
- Installment sale and deferred recognition
- State tax implications and planning
- Estate planning integration

### Common M&A Mistakes

**Overvaluing the Business:**
- Unrealistic price expectations kill deals
- Market conditions change during process
- Comparable transactions may not be relevant

**Inadequate Preparation:**
- Poor due diligence preparation creates delays
- Undocumented processes raise buyer concerns
- Financial statement issues undermine credibility

**Emotional Decision Making:**
- Personal attachment affects negotiation
- Fear of change prevents good decisions
- Short-term thinking sacrifices long-term value

**Single Buyer Focus:**
- Limited negotiation leverage
- Higher transaction risk
- Suboptimal terms and conditions

### Key Takeaways

- M&A process is complex and time-consuming, requiring professional guidance
- Thorough preparation significantly improves outcome probability and value
- Multiple interested buyers provide negotiation leverage and risk mitigation
- Due diligence preparation and responsiveness build buyer confidence
- Focus on total economic value, not just headline purchase price
- Post-transaction planning and integration affect long-term success

Remember: M&A transactions are as much about relationship and trust as they are about financials. Building credibility through professionalism and transparency throughout the process leads to better outcomes for all parties involved.`
    }
  })
  console.log('Created Lesson 4: Mergers and Acquisitions Process')

  // Create Lesson 5
  await prisma.lesson.create({
    data: {
      weekId: week11.id,
      title: 'Succession Planning and Legacy Considerations',
      slug: 'succession-planning-legacy-considerations',
      orderIndex: 5,
      durationMinutes: 110,
      content: `# Succession Planning and Legacy Considerations

## Building Lasting Value Beyond Your Direct Involvement

Succession planning goes beyond simply transferring ownership—it's about ensuring your business continues to thrive, your team remains successful, and your legacy endures. For developer businesses, succession planning requires careful attention to knowledge transfer, relationship continuity, and cultural preservation.

### Understanding Succession Planning

**Succession vs. Exit Planning:**
- **Exit Planning**: Focuses on owner's departure and value maximization
- **Succession Planning**: Emphasizes business continuity and stakeholder welfare
- **Integration**: Best outcomes combine both perspectives for comprehensive planning

**Stakeholder Considerations:**
- **Employees**: Job security, career development, cultural preservation
- **Clients**: Service continuity, relationship stability, quality maintenance
- **Family**: Financial security, legacy preservation, involvement opportunities
- **Community**: Economic impact, industry leadership, knowledge sharing

### Types of Succession Scenarios

**Planned Succession**
Systematic transition over 3-7 years with owner involvement:

**Advantages:**
- Gradual knowledge transfer and relationship building
- Opportunity to optimize business value and structure
- Reduced risk for all stakeholders
- Tax optimization and estate planning integration

**Structure Options:**
- Management buyout with owner financing
- Employee stock ownership plan (ESOP)
- Family member gradual transition
- Strategic partner development

**Unplanned Succession**
Sudden owner departure due to illness, disability, or death:

**Risk Mitigation Strategies:**
- Key person insurance policies
- Emergency succession procedures
- Business continuation agreements
- Comprehensive documentation and training

**Business Impact Minimization:**
- Cross-training for critical functions
- Client relationship diversification
- Financial reserves and credit facilities
- Legal document preparation and accessibility

### Family Business Succession

**Next-Generation Involvement**

**Assessment Criteria:**
- Interest and passion for the business
- Technical aptitude and learning capability
- Leadership and interpersonal skills
- Work ethic and commitment level
- Cultural fit and values alignment

**Development Path Design:**
- Education and external experience requirements
- Mentoring and coaching programs
- Gradual responsibility increases
- Performance measurement and feedback
- Leadership development opportunities

**Common Family Succession Challenges:**
- Mixing family dynamics with business decisions
- Unequal treatment of family members
- Resistance from non-family employees
- Inadequate preparation and development
- Communication and expectation management

**Governance Structure for Family Business:**
- Family council for major decisions
- Board of directors with outside members
- Employment and compensation policies
- Conflict resolution procedures
- Succession timeline and milestones

### Management Team Succession

**Identifying Internal Successors**

**Leadership Assessment Framework:**
- Technical competency and continuous learning
- Client relationship management capabilities
- Business acumen and strategic thinking
- Team leadership and development skills
- Cultural stewardship and value alignment

**Development Program Components:**
- Business education and training
- Cross-functional experience and exposure
- Mentoring relationships and coaching
- External networking and industry involvement
- Increasing responsibility and autonomy

**Management Buyout Structures**

**Financing Strategies:**
- Seller financing with performance-based terms
- SBA loans for qualified management teams
- Private equity partnerships for growth capital
- Employee stock ownership plans (ESOPs)
- Earnout arrangements tied to performance

**ESOP Considerations for Developer Businesses:**

**ESOP Advantages:**
- Tax benefits for selling owner
- Employee motivation and retention
- Business culture and value preservation
- Gradual transition and involvement options

**ESOP Requirements:**
- Minimum business size ($2M+ revenue typically)
- Professional valuation and ongoing updates
- Fiduciary responsibilities and governance
- Annual administration and compliance costs

**ESOP Structure Example:**
Year 1: Owner sells 30% to ESOP, remains active
Year 3: Owner sells additional 40% to ESOP
Year 5: Owner sells remaining 30%, transitions to advisory role
Ongoing: Employees build equity through business performance

### Knowledge Transfer and Documentation

**Critical Knowledge Categories**

**Technical Knowledge:**
- Architecture decisions and system design rationale
- Code standards and development methodologies
- Technology platform expertise and best practices
- Security protocols and compliance procedures
- Integration approaches and troubleshooting guides

**Client Knowledge:**
- Account history and relationship development
- Technical requirements and constraints
- Communication preferences and protocols
- Business context and strategic objectives
- Competitive dynamics and market positioning

**Business Knowledge:**
- Strategic planning processes and decision criteria
- Financial management and performance metrics
- Vendor relationships and contract negotiations
- Market analysis and competitive intelligence
- Innovation processes and technology evaluation

**Knowledge Transfer Methodologies**

**Documentation Systems:**
- Comprehensive process and procedure manuals
- Client relationship and project history databases
- Technical architecture and system documentation
- Decision trees and troubleshooting guides
- Video recordings of key processes and demonstrations

**Mentoring and Training Programs:**
- Structured apprenticeship and development plans
- Regular knowledge-sharing sessions and workshops
- Cross-functional project assignments
- Industry conference and training participation
- External coaching and development resources

**Redundancy and Cross-Training:**
- Multiple people trained for each critical function
- Regular rotation of responsibilities and assignments
- Documentation verification and updating processes
- Knowledge testing and competency validation
- Backup systems for all critical processes

### Client Relationship Transition

**Relationship Mapping and Analysis**

**Client Relationship Assessment:**
- Primary and secondary contact relationships
- Decision-making process and key influencers
- Service history and satisfaction levels
- Growth potential and strategic importance
- Competitive threats and relationship risks

**Transition Strategy Development:**
- Gradual introduction of successor team members
- Joint meetings and project collaboration
- Communication plan for ownership transition
- Service level maintenance and improvement
- Feedback collection and relationship monitoring

**Communication Planning:**
- Timing and messaging for transition announcements
- Individual client meetings and discussions
- Reassurance about service continuity and quality
- Introduction of new leadership team
- Ongoing communication and relationship building

### Cultural Preservation and Evolution

**Defining Company Culture**

**Core Values and Principles:**
- Quality standards and client service philosophy
- Innovation and continuous learning commitment
- Team collaboration and mutual respect
- Professional growth and development support
- Community involvement and social responsibility

**Cultural Documentation:**
- Mission, vision, and values statements
- Employee handbook and policy documentation
- Stories and examples of cultural values in action
- Recognition and reward systems alignment
- Communication styles and decision-making processes

**Cultural Transition Management:**
- Involving existing team in culture definition
- New leadership commitment to cultural preservation
- Evolution planning for changing market conditions
- Regular culture assessment and reinforcement
- Integration of new team members and practices

### Legacy Planning Considerations

**Personal Legacy Objectives**

**Professional Recognition:**
- Industry leadership and thought leadership
- Innovation contributions and technology advancement
- Mentoring and talent development impact
- Community involvement and charitable activities
- Knowledge sharing and education contributions

**Financial Legacy:**
- Wealth preservation and family security
- Charitable giving and foundation establishment
- Investment portfolio and passive income creation
- Tax optimization and estate planning
- Financial independence and lifestyle maintenance

**Business Legacy:**
- Company culture and values preservation
- Employee welfare and career development
- Client relationship continuity and satisfaction
- Industry reputation and market position
- Innovation and technology leadership continuation

### Estate Planning Integration

**Business Interest Valuation**
Regular business valuations for estate planning purposes:
- Gift and estate tax planning opportunities
- Generation-skipping trust strategies
- Charitable giving and tax optimization
- Family limited partnership structures
- Buy-sell agreement provisions

**Insurance and Risk Management**
- Key person life insurance for business protection
- Disability insurance for owner and successors
- General liability and professional coverage continuation
- Directors and officers insurance for governance
- Cyber liability and technology coverage

### Implementation Timeline and Milestones

**5-7 Years Before Transition:**
- Begin succession planning discussions and assessment
- Identify and develop potential successors
- Implement knowledge documentation and transfer systems
- Establish governance and decision-making processes
- Begin estate planning and tax optimization strategies

**3-5 Years Before Transition:**
- Intensify successor development and training programs
- Begin gradual responsibility and authority transfer
- Implement client relationship transition strategies
- Complete legal documentation and structure optimization
- Establish financing arrangements and agreements

**1-3 Years Before Transition:**
- Complete due diligence preparation and documentation
- Finalize successor selection and development
- Execute transition agreements and financing
- Implement communication plans for all stakeholders
- Begin active transition and monitoring processes

**During Transition (1-2 Years):**
- Monitor business performance and relationship stability
- Provide ongoing support and guidance
- Address unexpected challenges and adjustments
- Maintain stakeholder communication and confidence
- Complete legal and financial transition requirements

**Post-Transition (1-3 Years):**
- Advisory role and ongoing support as needed
- Monitor successor success and business performance
- Legacy projects and industry involvement
- Wealth management and investment activities
- Family and personal priority focus

### Measuring Succession Success

**Business Performance Metrics:**
- Revenue growth and profitability maintenance
- Client retention and satisfaction levels
- Employee retention and engagement scores
- Market position and competitive strength
- Innovation and technology advancement

**Stakeholder Satisfaction Indicators:**
- Employee morale and career development
- Client feedback and relationship quality
- Family harmony and financial security
- Community recognition and involvement
- Industry reputation and leadership

### Key Takeaways

- Succession planning requires years of preparation for optimal outcomes
- Knowledge transfer and relationship continuity are critical success factors
- Multiple succession scenarios should be planned and documented
- Cultural preservation while enabling evolution requires careful balance
- Estate planning integration optimizes financial outcomes for families
- Success measurement extends beyond financial metrics to stakeholder welfare

Remember: Great succession planning creates value for all stakeholders—the departing owner, the succeeding team, employees, clients, and the broader community. The goal is not just successful transition, but long-term thriving of the business and positive impact on all involved parties.

Your business represents years of expertise, relationships, and value creation. Thoughtful succession planning ensures that value continues to grow and benefit others long after your direct involvement ends.`
    }
  })
  console.log('Created Lesson 5: Succession Planning and Legacy Considerations')
  
  console.log('Week 11 curriculum complete! 5 lessons created with 480 total minutes of content.')
  await prisma.$disconnect()
}

createWeek11().catch(console.error)