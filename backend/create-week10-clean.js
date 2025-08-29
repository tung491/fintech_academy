const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createWeek10() {
  console.log('Creating Week 10: Scaling and Growth Finance')
  
  const course = await prisma.course.findFirst({
    where: { slug: 'finacademy-for-developers' }
  })
  
  if (!course) {
    console.error('Course not found!')
    return
  }
  
  const week10 = await prisma.week.update({
    where: { courseId_weekNumber: { courseId: course.id, weekNumber: 10 } },
    data: {
      title: 'Scaling and Growth Finance',
      overview: 'Master the financial strategies needed to scale your developer business. Learn about growth funding, financial planning for expansion, team building costs, and maintaining profitability while growing.',
      learningObjectives: JSON.stringify([
        'Understand different scaling strategies and their financial implications',
        'Learn growth funding options and requirements', 
        'Master cash flow planning for rapid growth',
        'Understand team expansion and hiring costs',
        'Learn to maintain profitability during scaling',
        'Develop financial controls for larger operations'
      ]),
      estimatedHours: 8,
    },
  })
  
  console.log('Week 10 updated successfully:', week10.title)
  
  // Create all 5 lessons
  const lessons = [
    {
      title: 'Growth Strategy and Financial Planning',
      slug: 'growth-strategy-financial-planning',
      orderIndex: 1,
      durationMinutes: 95,
      content: `# Growth Strategy and Financial Planning

## The Financial Foundation of Scalable Growth

Scaling a developer business requires more than just getting more clients—it demands sophisticated financial planning, strategic resource allocation, and careful cash flow management to ensure sustainable growth.

### Understanding Growth vs. Scaling

**Growth vs. Scaling Distinction:**
- **Growth**: Adding resources at the same rate as revenue increases
- **Scaling**: Increasing revenue significantly faster than costs increase
- **Sustainable Scaling**: Maintaining quality and profitability while expanding

**Example:**
- **Growing**: Hire 2 developers, revenue doubles, costs double
- **Scaling**: Hire 1 developer, revenue triples through better processes/tools
- **Sustainable Scaling**: Revenue triples, costs increase by 50%, quality maintained

### Types of Growth Strategies

**1. Organic Growth**
*Definition:* Growth using internal resources and reinvested profits

*Financial Characteristics:*
- Lower financial risk
- Slower growth rate
- Maintains full ownership control
- Self-funded expansion

*Financial Planning Requirements:*
- Conservative cash flow projections
- Reinvestment ratio optimization
- Working capital management
- Emergency fund maintenance

Example Financial Model:
Year 1: Revenue $300K, Profit $60K (20% margin)
Year 2: Reinvest $45K, Revenue $450K, Profit $90K
Year 3: Reinvest $70K, Revenue $675K, Profit $135K
Growth Rate: 50% annually, funded by retained earnings

**2. Funded Growth**
*Definition:* Growth accelerated by external capital investment

*Financial Characteristics:*
- Higher growth potential
- Increased financial risk
- Dilution of ownership
- External accountability requirements

*Types of Funded Growth:*
- Angel investment
- Venture capital
- Bank loans and lines of credit
- Revenue-based financing
- Crowdfunding

### Financial Planning Framework for Growth

**Phase 1: Growth Readiness Assessment**

*Financial Health Checklist:*
- 6+ months operating expenses in reserve
- Consistent profitability for 12+ months
- Predictable revenue streams
- Strong cash flow management
- Clean financial records and reporting

*Market Readiness Indicators:*
- Proven product-market fit
- Customer acquisition cost < customer lifetime value
- Positive customer feedback and referrals
- Scalable business processes
- Strong competitive position

**Phase 2: Growth Strategy Selection**

*Strategy Selection Criteria:*

**Market Opportunity Assessment:**
- Total Addressable Market (TAM) size
- Serviceable Addressable Market (SAM) analysis
- Market growth rate and trends
- Competitive landscape analysis
- Customer demand validation

**Strategic Options Analysis:**

*Option 1: Geographic Expansion*
- Financial Requirements: Marketing, legal, localization costs
- Revenue Potential: New market size × penetration rate
- Risk Factors: Currency, regulations, cultural differences
- Timeline: 6-18 months to establish presence

*Option 2: Service Line Extension*
- Financial Requirements: Skill development, tool acquisition, marketing
- Revenue Potential: Cross-sell to existing clients + new market access
- Risk Factors: Skill gaps, quality dilution, resource splitting
- Timeline: 3-12 months to launch new services

### Financial Modeling for Growth

**Growth Financial Model Components**

**1. Revenue Projections**

*Key Variables:*
- Customer acquisition rate
- Average project value
- Customer retention rate
- Pricing growth rate
- Market expansion effects

*Revenue Forecasting Methods:*

**Bottom-Up Approach:**
Monthly New Clients × Average Project Value × Months = Revenue
Example: 5 new clients × $20K average × 12 months = $1.2M base
Plus: Existing client renewals and expansions
Plus: New service line revenue
Total Projected Revenue

**Top-Down Approach:**
Market Size × Market Share % = Revenue Potential
Example: $10M market × 3% share = $300K potential
Adjusted for: Growth rate, competitive factors, capacity

**2. Cost Structure Planning**

*Variable Costs (Scale with Revenue):*
- Subcontractor fees
- Software licenses per user
- Payment processing fees
- Sales commissions
- Project-specific expenses

*Fixed Costs (Remain Constant):*
- Office rent and utilities
- Insurance premiums
- Software subscriptions (base plans)
- Legal and accounting fees
- Equipment depreciation

*Step-Fixed Costs (Jump at Capacity Thresholds):*
- Employee salaries
- Management structure
- Infrastructure upgrades
- Professional service contracts

### Resource Allocation Strategy

**Investment Prioritization Framework**

**1. ROI-Based Prioritization**
Calculate expected return on investment for each growth initiative:

ROI = (Expected Revenue Increase - Investment Cost) / Investment Cost × 100

Example Investments:
Marketing Campaign: ($100K revenue - $20K cost) / $20K = 400% ROI
New Employee: ($200K revenue - $80K cost) / $80K = 150% ROI
Tool Upgrade: ($50K efficiency - $10K cost) / $10K = 400% ROI

**2. Strategic Value Assessment**
Beyond ROI, consider:
- **Market Position**: Competitive advantage creation
- **Risk Mitigation**: Diversification and stability
- **Learning Value**: Knowledge and capability building
- **Network Effects**: Platform and ecosystem benefits

### Growth Stage Financial Management

**Stage 1: Foundation (0-$500K Revenue)**
*Financial Priorities:*
- Establish financial systems and controls
- Build emergency fund (3-6 months expenses)
- Optimize pricing and profitability
- Document financial processes

*Key Metrics:*
- Monthly Recurring Revenue (MRR) growth
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (CLV)
- Gross margin per project

**Stage 2: Acceleration ($500K-$2M Revenue)**
*Financial Priorities:*
- Implement advanced financial reporting
- Plan for team expansion costs
- Establish growth funding sources
- Build scalable operational processes

*Key Metrics:*
- Revenue growth rate
- Employee productivity metrics
- Working capital management
- EBITDA and cash flow

**Stage 3: Scale ($2M-$10M Revenue)**
*Financial Priorities:*
- Sophisticated financial planning and analysis
- Advanced team and project management
- Multiple revenue stream development
- Exit strategy preparation

*Key Metrics:*
- Market share and position
- Operational efficiency ratios
- Return on invested capital
- Enterprise value multiples

### Action Planning Framework

**30-Day Actions:**
1. Complete growth readiness assessment
2. Analyze current financial position
3. Identify top 3 growth opportunities
4. Develop basic financial projections

**90-Day Actions:**
1. Create detailed growth financial model
2. Establish funding sources or budget allocation
3. Implement enhanced financial reporting
4. Begin initial growth investments

**12-Month Actions:**
1. Execute growth strategy with regular reviews
2. Monitor and adjust financial projections
3. Build advanced financial management capabilities
4. Prepare for next phase of growth

### Key Takeaways

- Growth requires sophisticated financial planning and cash flow management
- Scaling means increasing revenue faster than costs increase
- Different growth strategies have different financial requirements and risks
- Financial controls become more critical as businesses grow
- Regular monitoring and adjustment are essential for successful scaling

Successful scaling combines strategic vision with disciplined financial management, ensuring that growth creates sustainable value rather than operational chaos.`
    },
    {
      title: 'Funding Options for Business Expansion',
      slug: 'funding-options-expansion',
      orderIndex: 2,
      durationMinutes: 100,
      content: `# Funding Options for Business Expansion

## Choosing the Right Capital for Your Growth Journey

Understanding your funding options is crucial for scaling your developer business. Each funding source has different requirements, costs, and implications for your business's future direction.

### Overview of Funding Landscape

**Funding Spectrum for Developer Businesses:**
1. **Self-Funding**: Personal savings, business profits
2. **Friends & Family**: Informal investment from personal network
3. **Angel Investors**: High-net-worth individuals investing personally
4. **Venture Capital**: Professional investment firms
5. **Bank Loans**: Traditional and SBA lending
6. **Alternative Financing**: Revenue-based, crowdfunding, grants

**Funding Amount Ranges:**
- Self/Friends & Family: $0-$100K
- Angel Investors: $25K-$1M
- Venture Capital: $1M-$50M+
- Bank Loans: $10K-$5M
- Alternative: $10K-$2M

### Self-Funding (Bootstrapping)

**Advantages:**
- Maintain complete ownership and control
- No external pressure or reporting requirements
- Keep all profits and equity value
- Faster decision-making processes
- No personal guarantees to external parties

**Disadvantages:**
- Limited growth capital available
- Personal financial risk exposure
- Slower growth compared to funded competitors
- Opportunity cost of personal capital
- Potential cash flow constraints

**When Self-Funding Works Best:**
- Profitable business with strong cash flow
- Conservative growth strategy preferred
- High profit margin business model
- Strong personal financial position
- Market doesn't require rapid scaling

**Self-Funding Strategies:**

*1. Profit Reinvestment*
Example Reinvestment Plan:
Monthly Profit: $15,000
Personal Draw: $8,000
Business Expenses: $2,000
Growth Investment: $5,000
Annual Growth Capital: $60,000

*2. Revenue Optimization*
- Increase pricing strategically
- Improve collection processes
- Reduce unnecessary expenses
- Optimize tax strategies

### Angel Investment

**Angel Investor Profile:**
- High-net-worth individuals ($1M+ net worth)
- Often former entrepreneurs or executives
- Invest personal money, not institutional funds
- Provide mentorship and connections
- Local or industry-specific focus

**Investment Characteristics:**
- Typical Investment: $25K-$250K
- Equity Stake: 10-25%
- Decision Timeline: 3-6 months
- Due Diligence: Moderate complexity
- Board Involvement: Advisory level

**What Angels Look For:**
- Strong management team
- Scalable business model
- Large market opportunity
- Traction and customer validation
- Clear path to profitability
- Reasonable valuation expectations

**Valuation Methods Angels Use:**

*1. Revenue Multiple Method*
Current Annual Revenue: $500K
Industry Multiple: 3-5x
Valuation Range: $1.5M-$2.5M
Angel Investment: $250K for 10-15% equity

*2. Comparable Company Analysis*
- Look at similar companies' valuations
- Adjust for stage, growth, and market differences
- Consider recent transaction data

### Venture Capital (VC)

**VC Firm Types:**
- **Micro VCs**: $5M-$50M funds, $100K-$2M investments
- **Traditional VCs**: $100M-$1B funds, $2M-$20M investments
- **Growth VCs**: $500M+ funds, $10M-$100M investments

**Investment Stages:**
- **Pre-Seed**: $100K-$500K, idea/prototype stage
- **Seed**: $500K-$2M, early revenue/traction
- **Series A**: $2M-$10M, proven business model
- **Series B+**: $10M+, scaling and expansion

**What VCs Look For:**
- Large addressable market ($1B+ TAM)
- Experienced founding team
- Scalable technology platform
- Strong unit economics
- Network effects or defensible moats
- Path to $100M+ revenue

### Bank Loans and Traditional Lending

**Types of Business Loans:**

*1. Term Loans*
- Fixed amount, fixed repayment schedule
- 1-10 year terms typically
- Secured or unsecured options
- Interest rates: 6-15%

*2. Lines of Credit*
- Revolving credit facility
- Pay interest only on amount used
- Good for cash flow management
- Interest rates: 8-20%

*3. SBA Loans*
- Government-guaranteed lending program
- Lower down payments and rates
- Longer repayment terms
- More flexible qualification requirements

**Qualification Requirements:**
- 2+ years in business
- Strong personal credit (680+ score)
- Profitable business operations
- Collateral for secured loans
- Personal guarantees typically required

### Alternative Financing Options

**1. Revenue-Based Financing (RBF)**

*How It Works:*
- Receive upfront capital in exchange for percentage of future revenue
- Repay through fixed percentage of monthly revenue
- No equity dilution or personal guarantees

*Terms:*
- Funding Amount: $50K-$2M
- Revenue Share: 2-10% of monthly revenue
- Payback Multiple: 1.3-1.8x of funded amount
- Term: 2-5 years typically

*Example:*
Funding: $200,000
Revenue Share: 5%
Monthly Revenue: $50,000
Monthly Payment: $2,500
Payback Multiple: 1.5x ($300,000 total)
Time to Repay: ~10 years at current revenue

*Best For:*
- SaaS or recurring revenue businesses
- Predictable monthly revenue streams
- Growth capital for proven business models
- Businesses wanting to avoid equity dilution

### Choosing the Right Funding Option

**Decision Framework:**

**1. Funding Need Assessment**
- Amount of capital required
- Timeline for funding need
- Use of funds (growth, equipment, working capital)
- Repayment ability and timeline

**2. Business Stage and Characteristics**
- Revenue and profitability status
- Growth trajectory and potential
- Market size and competition
- Business model and scalability

**3. Ownership and Control Preferences**
- Equity dilution tolerance
- Decision-making control importance
- Board involvement acceptance
- Reporting and oversight comfort

### Key Takeaways

- Match funding source to business stage, needs, and goals
- Understand the true cost and implications of each funding type
- Prepare thoroughly with professional documentation and analysis
- Consider multiple options and negotiate favorable terms
- Maintain strong investor/lender relationships post-funding

The right funding can accelerate your business growth significantly, while the wrong funding can create constraints that limit your success.`
    },
    {
      title: 'Team Building and Human Resources Costs',
      slug: 'team-building-hr-costs',
      orderIndex: 3,
      durationMinutes: 90,
      content: `# Team Building and Human Resources Costs

## The Financial Reality of Growing Your Team

Scaling a developer business inevitably means building a team. Understanding the true costs and financial implications of hiring is critical for sustainable growth and maintaining profitability.

### The True Cost of Hiring

**Beyond Base Salary Considerations:**

Most entrepreneurs underestimate hiring costs by focusing only on base salary. The reality is that total employment costs typically run 1.25-1.8x base salary when all factors are considered.

**Total Cost of Employment Formula:**
Base Salary: $80,000
+ Payroll Taxes (7.65%): $6,120
+ Benefits (20-30%): $16,000-$24,000
+ Equipment & Setup: $3,000-$8,000
+ Training & Onboarding: $2,000-$5,000
+ Office Space & Utilities: $3,000-$12,000
+ Management Overhead: $5,000-$10,000
Total Annual Cost: $115,120-$145,120
Cost Multiplier: 1.44-1.81x base salary

**Direct Employment Costs:**

*1. Base Compensation*
- Salary or hourly wages
- Overtime and premium pay
- Performance bonuses and incentives
- Commission structures (for sales roles)

*2. Mandatory Benefits and Taxes*
- Social Security (6.2% employer contribution)
- Medicare (1.45% employer contribution)
- Federal unemployment tax (FUTA): 6% on first $7,000
- State unemployment tax (varies by state)
- Workers' compensation insurance
- State disability insurance (where applicable)

*3. Voluntary Benefits*
- Health insurance premiums (employer portion: 70-80%)
- Dental and vision insurance
- Retirement plan contributions (401k match)
- Life and disability insurance
- Paid time off and holidays
- Professional development and training

### Hiring Strategy and Financial Planning

**Phase-Based Hiring Approach:**

**Phase 1: Core Team Building (2-5 employees)**
*Financial Focus:* Maximizing productivity per dollar spent
*Key Roles:*
- Senior developers (high productivity, mentoring capability)
- Project manager/scrum master
- Business development/account management

*Cost Planning:*
Senior Developer: $100K salary + $45K overhead = $145K total
Project Manager: $75K salary + $35K overhead = $110K total
Business Development: $70K + commission + $32K overhead = $120K total
Total Annual Team Cost: $375K
Revenue Target: $750K (2:1 ratio for profitability)

**Phase 2: Specialist Addition (5-15 employees)**
*Financial Focus:* Adding specialized skills and capacity
*Key Roles:*
- UX/UI designers
- DevOps engineers
- QA specialists
- Marketing coordinator

**Phase 3: Department Structure (15+ employees)**
*Financial Focus:* Organizational efficiency and management structure
*Key Roles:*
- Department heads and managers
- HR specialist
- Operations manager
- Finance/accounting staff

### Compensation Strategy

**Compensation Philosophy Development:**

*Market Positioning Options:*
- **Lead the Market**: 75th-90th percentile (premium talent strategy)
- **Match the Market**: 45th-55th percentile (competitive strategy)
- **Lag the Market**: 25th-40th percentile (cost-focused strategy)

*Total Compensation Mix:*
- Base salary (60-80% of total compensation)
- Performance bonuses (10-25%)
- Equity participation (5-15%)
- Benefits and perquisites (15-25%)

### Benefits and Perquisites

**Health and Wellness Benefits:**

*Health Insurance:*
- Group health insurance plans
- Employer contribution: 70-80% of premium costs
- Average cost: $6,000-$12,000 per employee annually
- HSA contributions and wellness programs

*Other Health Benefits:*
- Dental insurance: $300-$600 per employee annually
- Vision insurance: $100-$200 per employee annually
- Mental health and counseling services
- Gym memberships or wellness stipends

**Time Off and Flexibility:**

*Paid Time Off:*
- Vacation days: 15-25 days annually
- Sick leave: 5-10 days annually
- Personal days: 2-5 days annually
- Holidays: 10-12 federal holidays

### Performance Management and Retention

**Performance Management Systems:**

*Components:*
- Goal setting and performance objectives
- Regular check-ins and feedback sessions
- Annual or semi-annual performance reviews
- Professional development planning
- Career advancement pathways

**Employee Retention Strategies:**

*Financial Retention Tools:*
- Competitive compensation reviews
- Performance-based raises and bonuses
- Equity participation and vesting
- Retention bonuses for key employees

*Non-Financial Retention Factors:*
- Challenging and meaningful work
- Professional growth opportunities
- Positive company culture
- Work-life balance and flexibility
- Recognition and appreciation programs

**Cost of Employee Turnover:**

*Turnover Cost Calculation:*
Average Turnover Cost: 50-200% of annual salary

Example for $80K employee:
Direct costs: $15,000 (recruiting, training)
Indirect costs: $25,000 (lost productivity, team impact)
Total turnover cost: $40,000 (50% of salary)

High performer turnover could cost 150-200% of salary

### Key Metrics for Team Management

**Financial Metrics:**
- Revenue per employee
- Profit per employee  
- Total compensation as % of revenue
- Cost per hire and time to productivity
- Employee turnover cost

**Operational Metrics:**
- Employee satisfaction and engagement scores
- Retention rates by role and tenure
- Performance rating distribution
- Training completion and certification rates
- Internal promotion rates

### Key Takeaways

- Total employment costs are 1.25-1.8x base salary when fully loaded
- Hiring has immediate cash flow impact but delayed productivity benefits
- Compensation strategy should align with business goals and market position
- Employee retention is significantly more cost-effective than turnover
- HR systems and compliance become critical as team size grows
- Performance management and career development drive engagement and retention

Building a team is one of the highest-impact but highest-cost investments you'll make. Plan carefully, budget realistically, and focus on creating a culture that attracts and retains top talent while maintaining profitability.`
    },
    {
      title: 'Cash Flow Management for Rapid Growth',
      slug: 'cash-flow-management-rapid-growth',
      orderIndex: 4,
      durationMinutes: 85,
      content: `# Cash Flow Management for Rapid Growth

## Navigating the Cash Flow Challenges of Scaling

Rapid growth creates unique cash flow challenges that can threaten business survival even when the company is profitable on paper. Understanding and managing these challenges is critical for sustainable scaling.

### The Growth Cash Flow Paradox

**Why Growing Companies Face Cash Flow Problems:**

*The Revenue-Expense Timing Gap:*
- You must invest in capacity before revenue materializes
- Employee salaries start immediately, productivity takes months
- Marketing spend precedes customer acquisition
- Infrastructure investments happen before utilization

*Example of Growth Cash Flow Challenge:*
Month 1: Hire 3 new developers
- Salary costs: $22,500/month
- Setup costs: $15,000 one-time
- Immediate cash out: $37,500

Month 1-3: Training and ramp-up period
- Continued salary costs: $67,500 total
- Minimal revenue contribution
- Net cash flow: -$67,500

Month 4-6: Partial productivity
- Salary costs: $67,500
- Revenue contribution: $45,000
- Net cash flow: -$22,500

Month 7+: Full productivity
- Salary costs: $22,500/month
- Revenue contribution: $37,500/month
- Net cash flow: +$15,000/month

### Cash Flow Forecasting for Growth

**Advanced Cash Flow Forecasting Methods:**

**1. Rolling 13-Week Cash Flow Forecast**

*Week-by-Week Granularity:*
- Week 1-4: Daily detail for operational decisions
- Week 5-8: Weekly detail for short-term planning
- Week 9-13: Weekly estimates for trend analysis

*Key Components:*
- Collections from existing receivables
- New sales and payment terms
- Payroll and benefits (bi-weekly or monthly)
- Fixed expenses (rent, insurance, utilities)
- Variable expenses (travel, marketing, supplies)
- Capital expenditures and investments
- Loan payments and interest
- Tax payments and estimates

**2. Scenario-Based Cash Flow Planning**

*Three-Scenario Approach:*

*Optimistic Scenario (30% probability):*
- Sales growth 25% above plan
- Collection period improves by 5 days
- New client acquisition accelerates
- Higher pricing acceptance

*Most Likely Scenario (50% probability):*
- Sales growth as planned
- Current collection patterns continue
- Planned team expansion timeline
- Market conditions remain stable

*Pessimistic Scenario (20% probability):*
- Sales growth 15% below plan
- Collection period extends by 10 days
- Client project delays or cancellations
- Economic downturn impacts market

### Working Capital Management

**Accounts Receivable Management:**

*Collection Strategies:*
- Clear payment terms and policies
- Progress billing and milestone payments
- Electronic invoicing and payment systems
- Regular account aging analysis
- Proactive collection procedures

*Acceleration Techniques:*
- Early payment discounts (2/10 net 30)
- Retainer and deposit requirements
- Factoring or invoice financing
- Credit card payment acceptance
- Automated payment reminders

*Accounts Receivable Metrics:*
Days Sales Outstanding (DSO) = AR Balance / (Annual Sales / 365)
Target DSO: 30-45 days for most service businesses

Collection Effectiveness = Collections / (Beginning AR + Sales)
Target: >95% collection effectiveness

Aging Analysis:
0-30 days: >80% of total AR
31-60 days: <15% of total AR
60+ days: <5% of total AR

### Financing Growth Cash Flow Needs

**Short-Term Financing Options:**

**1. Lines of Credit**
*Purpose:* Bridge working capital gaps and seasonal variations
*Terms:* Revolving credit, pay interest only on amount used
*Requirements:* Strong credit, collateral, personal guarantees
*Cost:* Prime + 2-5%, commitment fees

*Example:*
Line of Credit: $200,000
Interest Rate: 8.5%
Amount Used: $75,000 (average)
Annual Interest Cost: $6,375
Commitment Fee: $500 (0.25% of unused portion)
Total Annual Cost: $6,875

**2. Invoice Factoring**
*Purpose:* Immediate cash from outstanding receivables
*Process:* Sell invoices to factoring company at discount
*Cost:* 1-5% per month, depends on customer credit quality
*Benefits:* No debt on balance sheet, collection services included

### Cash Management Best Practices

**Cash Monitoring and Controls:**

*Daily Cash Management:*
- Daily cash position reporting
- Bank balance reconciliation
- Cash flow variance analysis
- Short-term investment of excess cash
- Multi-bank relationship management

*Weekly Cash Analysis:*
- 13-week rolling forecast updates
- Key metric tracking and trending
- Scenario planning and stress testing
- Vendor payment scheduling
- Collection activity planning

**Cash Flow Key Performance Indicators:**

*Liquidity Metrics:*
- Current Ratio = Current Assets / Current Liabilities
- Quick Ratio = (Cash + AR) / Current Liabilities
- Cash Ratio = Cash / Current Liabilities

*Efficiency Metrics:*
- Cash Conversion Cycle = DSO + DIO - DPO
- Working Capital Turnover = Revenue / Average Working Capital
- Cash Flow from Operations / Revenue

*Target Benchmarks:*
Service Business Targets:
Current Ratio: 1.5-2.5
Quick Ratio: 1.0-1.5
DSO: 30-45 days
Cash Conversion Cycle: 15-35 days
Cash Flow Margin: 15-25%

### Growth-Specific Cash Flow Strategies

**Phased Growth Approach:**

*Phase 1: Foundation Building*
- Build cash reserves (6+ months operating expenses)
- Establish credit facilities before needed
- Optimize existing operations for cash generation
- Document and improve financial processes

*Phase 2: Controlled Expansion*
- Hire based on confirmed revenue pipeline
- Milestone-based investment approach
- Monitor cash flow weekly during expansion
- Maintain 3+ months cash reserves minimum

*Phase 3: Accelerated Growth*
- Secure growth financing before needed
- Implement advanced cash management systems
- Build management team for operational oversight
- Plan for seasonal and cyclical variations

### Key Takeaways

- Growth creates cash flow challenges even for profitable businesses
- Advanced forecasting and scenario planning are essential
- Working capital management becomes critical at scale
- Multiple financing options should be secured before needed
- Daily and weekly cash monitoring prevents crises
- Technology and automation improve cash flow management efficiency

Effective cash flow management during growth requires discipline, planning, and continuous monitoring. The businesses that master this survive and thrive during scaling, while those that don't often fail despite having profitable operations.`
    },
    {
      title: 'Financial Controls and Systems for Larger Operations',
      slug: 'financial-controls-systems-larger-operations',
      orderIndex: 5,
      durationMinutes: 110,
      content: `# Financial Controls and Systems for Larger Operations

## Building Scalable Financial Infrastructure

As your developer business grows beyond a few employees, informal financial processes become inadequate. Implementing proper financial controls and systems is essential for maintaining accuracy, preventing fraud, and enabling continued growth.

### The Evolution of Financial Systems

**Small Business Stage (1-5 employees):**
- Basic bookkeeping software (QuickBooks, Xero)
- Simple bank account management
- Manual invoice and payment processing
- Owner handles most financial decisions
- Monthly or quarterly financial review

**Growing Business Stage (5-25 employees):**
- Enhanced accounting software with modules
- Multiple bank accounts and cash management
- Automated billing and collection systems
- Dedicated financial staff or outsourced services
- Monthly financial statements and analysis

**Larger Operations Stage (25+ employees):**
- Enterprise resource planning (ERP) systems
- Integrated financial and operational systems
- Advanced reporting and business intelligence
- Professional finance team and controllers
- Real-time financial monitoring and controls

### Financial Control Framework

**Internal Control Objectives:**
1. **Safeguarding Assets**: Protect company resources from theft or misuse
2. **Accurate Record Keeping**: Ensure financial information is complete and accurate
3. **Operational Efficiency**: Optimize business processes and resource utilization
4. **Compliance**: Adhere to laws, regulations, and company policies
5. **Strategic Support**: Provide information for decision-making

**Control Environment Components:**

**1. Organizational Structure**
- Clear reporting relationships and authority levels
- Defined roles and responsibilities
- Board oversight (if applicable) or advisory board
- Professional development and competency requirements

**2. Risk Assessment**
- Regular evaluation of financial and operational risks
- Control design to address identified risks
- Monitoring of risk factors and early warning indicators
- Regular reassessment as business evolves

### Essential Financial Controls

**Cash Management Controls:**

*Bank Account Controls:*
- Segregation of duties (different people handling receipts, disbursements, reconciliation)
- Dual signature requirements for large transactions
- Monthly bank reconciliations by independent person
- Daily cash position monitoring and reporting
- Restricted access to online banking systems

*Cash Receipt Controls:*
- Immediate recording of all receipts
- Deposit preparation by different person than recorder
- Daily deposit requirements
- Customer payment application verification
- Reconciliation of deposits to recorded receipts

*Cash Disbursement Controls:*
- Purchase order and approval processes
- Three-way matching (purchase order, receipt, invoice)
- Check signing authority levels and dual signatures
- Electronic payment authorization and approval
- Void check and unused check security

**Revenue and Billing Controls:**

*Project and Time Tracking:*
- Standardized time and expense reporting
- Regular project budget vs. actual analysis
- Client approval for scope changes
- Milestone billing and progress verification
- Quality review before client delivery

*Invoicing Controls:*
- Automated invoice generation from approved time/expenses
- Management review and approval before sending
- Proper customer and project coding
- Sales tax calculation and compliance
- Accounts receivable aging and follow-up procedures

### Chart of Accounts and Financial Structure

**Chart of Accounts Design:**

*Account Numbering System:*
Assets: 1000-1999
  Current Assets: 1000-1499
    Cash and Equivalents: 1000-1099
    Accounts Receivable: 1100-1199
    Inventory: 1200-1299
    Prepaid Expenses: 1300-1399
  Fixed Assets: 1500-1999

Liabilities: 2000-2999
  Current Liabilities: 2000-2499
  Long-term Liabilities: 2500-2999

Equity: 3000-3999
Revenue: 4000-4999
Expenses: 5000-5999

**Department and Project Coding:**
- Department codes for cost center reporting
- Project codes for profitability analysis
- Client codes for relationship management
- Service line codes for business analysis

### Advanced Accounting Systems

**Enterprise Resource Planning (ERP) Systems:**

*Small to Medium Business ERP Options:*
- NetSuite: Cloud-based, scalable, $99-$499/user/month
- Microsoft Dynamics 365: Integrated with Office, $95-$210/user/month
- Sage Intacct: Financial-focused, strong reporting, $400+/month
- Acumatica: Industry-specific solutions, user-based pricing

*ERP Implementation Considerations:*
- Total cost of ownership (software, implementation, training, support)
- Scalability and future growth accommodation
- Integration capabilities with existing systems
- Customization requirements and limitations
- Vendor support and professional services availability

### Performance Measurement Systems

**Key Performance Indicators (KPIs):**

*Financial KPIs:*
- Revenue growth rate (monthly, quarterly, annual)
- Gross margin and net margin percentages
- EBITDA and cash flow generation
- Return on assets and return on equity
- Working capital management ratios

*Operational KPIs:*
- Revenue per employee and profit per employee
- Billable utilization rates and efficiency ratios
- Customer acquisition cost and lifetime value
- Project completion rates and quality metrics
- Employee satisfaction and retention rates

### Implementation Roadmap

**Phase 1: Foundation Building (Months 1-3)**
- Assess current financial systems and controls
- Identify gaps and improvement opportunities
- Design new chart of accounts and coding structure
- Implement basic controls and procedures
- Establish monthly financial reporting process

**Phase 2: System Enhancement (Months 4-9)**
- Select and implement enhanced accounting software
- Establish budget and forecasting processes
- Implement advanced controls and authorization procedures
- Create management reporting and dashboard systems
- Train staff on new systems and procedures

**Phase 3: Optimization and Integration (Months 10-18)**
- Integrate financial systems with operational systems
- Implement business intelligence and analytics tools
- Establish performance measurement and KPI tracking
- Create audit and compliance programs
- Develop continuous improvement processes

### Key Success Factors

**Management Commitment:**
- Executive sponsorship and support
- Adequate resource allocation and investment
- Change management and communication
- Performance measurement and accountability
- Continuous improvement mindset

**Staff Engagement:**
- Proper training and development programs
- Clear role definitions and expectations
- Regular feedback and performance reviews
- Recognition and reward systems
- Professional development opportunities

### Key Takeaways

- Financial controls become critical as business grows and complexity increases
- System selection should align with business size, growth plans, and requirements
- Implementation requires significant investment in time, money, and change management
- Automation and integration provide significant benefits but require careful planning
- Continuous improvement and adaptation are essential for long-term success
- ROI from financial systems improvements typically takes 18-24 months to fully realize

Building scalable financial systems and controls is an investment in your business's future. While the upfront costs and effort are significant, the benefits of accuracy, efficiency, and scalability far outweigh the investment for growing businesses.`
    }
  ]

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: {
        weekId: week10.id,
        ...lesson
      }
    })
    console.log(`Created lesson: ${lesson.title}`)
  }
  
  console.log('Week 10 curriculum complete! 5 lessons created with 480 total minutes of content.')
  await prisma.$disconnect()
}

createWeek10().catch(console.error)