import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addWeek8() {
  console.log('🚀 Adding Week 8: Tax Optimization and Planning...')

  try {
    // Get the existing course
    const course = await prisma.course.findFirst({
      where: { slug: 'finacademy-for-developers' }
    })

    if (!course) {
      throw new Error('Course not found')
    }

    // Find existing Week 8
    const existingWeek = await prisma.week.findFirst({
      where: {
        courseId: course.id,
        weekNumber: 8
      }
    })

    if (!existingWeek) {
      console.log('❌ Week 8 not found, cannot update')
      return
    }

    console.log('📚 Updating Week 8...')

    // Update Week 8 with comprehensive content
    await prisma.week.update({
      where: { id: existingWeek.id },
      data: {
        title: 'Tax Optimization and Planning',
        overview: 'Master tax strategies for developer businesses. Learn to minimize tax burden legally while maximizing deductions and planning for different business structures.',
        learningObjectives: JSON.stringify([
          'Understand tax basics for developer businesses',
          'Learn legal tax optimization strategies',
          'Master business deductions and expenses',
          'Plan tax strategies for different business structures',
          'Understand international tax considerations for global businesses'
        ]),
        estimatedHours: 8.0, // Total of all lessons
      }
    })

    console.log('📝 Adding lessons to Week 8...')

    // Delete existing lessons for Week 8 if any
    await prisma.lesson.deleteMany({
      where: { weekId: existingWeek.id }
    })

    // Add new lessons
    const lessons = [
      {
        title: 'Tax Fundamentals for Developer Businesses',
        slug: 'tax-fundamentals',
        content: `# Tax Fundamentals for Developer Businesses

## Understanding Your Tax Obligations

As a developer running your own business, understanding taxes is crucial for both compliance and optimization. This lesson covers the fundamental concepts and obligations you need to know.

### Business Structure and Tax Implications

**Sole Proprietorship**
- Simplest structure, taxes pass through to personal return
- Self-employment tax applies (15.3% on net earnings)
- All business income/losses reported on Schedule C
- Personal liability for all business debts and obligations

**Single-Member LLC**
- Default tax treatment same as sole proprietorship
- Can elect corporate taxation (S-Corp or C-Corp)
- Provides liability protection without tax complexity
- Popular choice for developer freelancers

**Partnership/Multi-Member LLC**
- Pass-through taxation, profits/losses flow to partners
- Each partner pays taxes on their share of income
- File Form 1065 (Partnership Return)
- Partners receive Schedule K-1 for personal returns

**S-Corporation**
- Pass-through taxation but with employment tax benefits
- Owners who work must take reasonable salary
- Only wages subject to employment taxes, not distributions
- Limited to 100 shareholders, one class of stock

**C-Corporation**
- Double taxation: corporate level + shareholder dividends
- Can retain earnings at lower corporate tax rates
- More complex compliance requirements
- Better for businesses seeking investment or going public

### Key Tax Concepts for Developers

**Business vs. Personal Expenses**
- Clear separation essential for audit protection
- Business expenses must be ordinary and necessary
- Personal use of business assets creates taxable income
- Maintain detailed records and receipts

**Cash vs. Accrual Accounting**
- Cash: Income/expenses recognized when paid
- Accrual: Recognized when earned/incurred
- Most small developers can use cash method
- C-Corps generally required to use accrual

**Estimated Tax Payments**
- Required if you expect to owe $1,000+ in taxes
- Paid quarterly (April 15, June 15, Sept 15, Jan 15)
- Based on current year estimate or prior year safe harbor
- Underpayment penalties apply if insufficient

### Self-Employment Tax

**Understanding SE Tax**
- Social Security: 12.4% on first $160,200 (2023)
- Medicare: 2.9% on all net earnings
- Additional Medicare: 0.9% on high earners
- Total: 15.3% on net self-employment income

**SE Tax Strategies**
- S-Corp election can reduce SE tax
- Only wages subject to employment taxes
- Reasonable salary requirement cannot be avoided
- Consult tax professional for optimal salary level

### Record Keeping Requirements

**Essential Documentation**
- All business receipts and invoices
- Bank statements and credit card records
- Mileage logs for business travel
- Home office measurements and expenses
- Equipment purchase records and depreciation schedules

**Digital Tools for Developers**
- Accounting software: QuickBooks, FreshBooks, Wave
- Receipt scanning: Receipt Bank, Shoeboxed
- Mileage tracking: MileIQ, TripLog
- Time tracking: Toggle, RescueTime
- Expense categorization: Mint, YNAB

### Common Tax Mistakes to Avoid

**Mixing Personal and Business**
- Using personal cards for business expenses
- Not maintaining separate business accounts
- Personal use of business equipment without adjustment
- Inadequate documentation of business purpose

**Missing Deductions**
- Home office expenses
- Professional development and training
- Software subscriptions and tools
- Business meals and entertainment
- Professional association memberships

**Poor Timing Strategies**
- Not planning for estimated payments
- Missing year-end tax planning opportunities
- Inadequate retirement planning
- Not considering equipment purchase timing

### Action Items for This Week

1. **Business Structure Review**
   - Evaluate current structure efficiency
   - Consider S-Corp election if appropriate
   - Consult tax professional if needed

2. **Record Keeping Setup**
   - Implement digital record keeping system
   - Set up automated expense tracking
   - Create regular backup procedures

3. **Estimated Tax Planning**
   - Calculate current year tax liability
   - Set up quarterly payment schedule
   - Review withholding and estimated payments

4. **Professional Network Building**
   - Find qualified tax professional
   - Join business owner tax planning groups
   - Subscribe to relevant tax updates and resources
`,
        orderIndex: 1,
        lessonType: 'lecture',
        durationMinutes: 95,
      },
      {
        title: 'Business Deductions and Write-offs',
        slug: 'business-deductions',
        content: `# Business Deductions and Write-offs

## Maximizing Legal Deductions

Understanding and properly claiming business deductions is one of the most effective ways to reduce your tax burden. This lesson covers deductions specifically relevant to developer businesses.

### Home Office Deduction

**Exclusive Use Test**
- Space must be used exclusively for business
- Regular use requirement (not just occasional)
- Principal place of business or regular meetings
- Cannot be used for personal activities

**Calculation Methods**
- **Simplified Method**: $5 per square foot, up to 300 sq ft ($1,500 max)
- **Actual Method**: Percentage of home expenses based on office space
- Consider utility costs, mortgage interest, property taxes
- Depreciation recapture on home sale if using actual method

**Documentation Requirements**
- Photos of home office setup
- Square footage measurements
- Records of home expenses
- Evidence of exclusive business use

### Technology and Equipment

**Computer Equipment**
- Laptops, desktops, monitors, keyboards, mice
- Must be used primarily for business (>50%)
- Can deduct in full if 100% business use
- Section 179 allows immediate expensing up to limits

**Software and Subscriptions**
- Development tools: IDEs, compilers, testing frameworks
- Design software: Adobe Creative Suite, Sketch, Figma
- Business software: CRM, accounting, project management
- Cloud services: AWS, Azure, Google Cloud, hosting

**Peripherals and Accessories**
- External monitors and stands
- Professional cameras and lighting for video calls
- High-quality microphones and headphones
- Ergonomic furniture and accessories

### Professional Development

**Training and Education**
- Online courses: Udemy, Pluralsight, Coursera
- Certification programs: AWS, Google Cloud, Microsoft
- Conference attendance: travel, lodging, registration
- Books, magazines, and technical publications

**Networking and Events**
- Professional association memberships
- Industry conference tickets
- Networking event costs
- Business meal expenses (50% deductible)

**Skill Development**
- Workshops and bootcamps
- Mentoring and coaching programs
- Technical training materials
- Language learning for international markets

### Business Operations

**Internet and Communication**
- Business portion of home internet
- Dedicated business phone lines
- Video conferencing subscriptions
- Communication tools: Slack, Discord, Teams

**Marketing and Advertising**
- Website development and maintenance
- SEO tools and services
- Social media advertising
- Content creation tools
- Business cards and promotional materials

**Legal and Professional Services**
- Attorney fees for business matters
- Accounting and tax preparation
- Business consulting services
- Contract review and drafting

### Vehicle Expenses

**Standard Mileage Method**
- 2023 rate: $0.655 per business mile
- Simpler record keeping
- Cannot claim actual vehicle expenses
- Must use from first year of business use

**Actual Expense Method**
- Deduct percentage of actual vehicle costs
- Includes gas, maintenance, insurance, depreciation
- More complex record keeping required
- Can switch between methods under certain conditions

**Required Documentation**
- Detailed mileage log with dates, destinations, business purpose
- Beginning and ending odometer readings
- Total miles driven for the year
- Business vs. personal use percentage

### Travel and Entertainment

**Business Travel**
- 100% deductible: airfare, hotels, car rentals
- 50% deductible: meals during travel
- Must be overnight trip away from home
- Cannot be primarily personal in nature

**Business Meals**
- 50% deductible for business discussions
- 100% deductible for company parties/events
- Must have legitimate business purpose
- Keep records of attendees and topics discussed

**Client Entertainment**
- Generally not deductible after 2017 tax reform
- Exceptions for employee recreation and company events
- Business meals still partially deductible
- Focus on business meals rather than entertainment

### Advanced Deduction Strategies

**Section 199A QBI Deduction**
- Up to 20% deduction on qualified business income
- Applies to pass-through entities (S-Corp, LLC, sole prop)
- Income limitations and business type restrictions
- Professional services businesses have limitations

**Retirement Plan Contributions**
- SEP-IRA: up to 25% of compensation
- Solo 401(k): higher contribution limits
- Traditional vs. Roth considerations
- Current deduction vs. future tax benefits

**Health Insurance Deductions**
- Self-employed health insurance premiums
- Health Savings Account (HSA) contributions
- Medical expenses exceeding 7.5% of AGI
- Long-term care insurance premiums

### Red Flags and Audit Prevention

**Common Audit Triggers**
- Unusually high deductions relative to income
- 100% business use claims on expensive items
- Excessive meal and entertainment expenses
- Home office deductions for employees
- Round numbers indicating estimates rather than actual records

**Best Practices**
- Keep contemporaneous records
- Document business purpose for all expenses
- Maintain receipts for all deductions
- Use business accounts for business expenses
- Be reasonable and honest in claims

### Action Items

1. **Expense Tracking Setup**
   - Implement automated expense categorization
   - Set up receipt scanning system
   - Create monthly expense review process

2. **Home Office Optimization**
   - Measure and document office space
   - Calculate optimal deduction method
   - Organize supporting documentation

3. **Equipment Audit**
   - List all business equipment and software
   - Document business use percentage
   - Plan equipment purchases for tax optimization

4. **Professional Development Plan**
   - Budget for annual training and conferences
   - Track all learning-related expenses
   - Document business benefit of education
`,
        orderIndex: 2,
        lessonType: 'lecture',
        durationMinutes: 100,
      },
      {
        title: 'Retirement Planning and Tax-Advantaged Accounts',
        slug: 'retirement-tax-planning',
        content: `# Retirement Planning and Tax-Advantaged Accounts

## Building Wealth Through Tax-Advantaged Retirement Planning

As a self-employed developer, you have unique retirement planning opportunities and challenges. This lesson covers strategies to maximize your retirement savings while minimizing current taxes.

### Self-Employment Retirement Options

**SEP-IRA (Simplified Employee Pension)**
- **Contribution Limits**: Up to 25% of compensation or $66,000 (2023)
- **Setup**: Simple paperwork, no annual filing requirements
- **Eligibility**: Any business owner, including sole proprietors
- **Employee Rules**: Must contribute equally for all eligible employees
- **Pros**: High contribution limits, easy administration
- **Cons**: Must cover employees if you have them

**Solo 401(k) (Individual 401k)**
- **Contribution Limits**: $22,500 employee + 25% employer (2023)
- **Total Limit**: Up to $66,000 ($73,500 if 50+)
- **Dual Role**: You're both employee and employer
- **Loan Feature**: Can borrow up to $50,000 or 50% of balance
- **Pros**: Highest contribution potential, loan option
- **Cons**: More complex, becomes unavailable with employees

**SIMPLE IRA**
- **Contribution Limits**: $15,500 employee + 3% employer match (2023)
- **Employee Friendly**: Good option if you have employees
- **Lower Limits**: Less than SEP-IRA or Solo 401(k)
- **Pros**: Employee-friendly, moderate complexity
- **Cons**: Lower contribution limits than alternatives

### Traditional vs. Roth Considerations

**Traditional Retirement Accounts**
- **Tax Treatment**: Deductible contributions, taxable withdrawals
- **Current Benefit**: Immediate tax deduction
- **Future Cost**: All withdrawals taxed as ordinary income
- **RMDs**: Required minimum distributions starting at 73

**Roth Options**
- **Tax Treatment**: After-tax contributions, tax-free withdrawals
- **Current Cost**: No immediate tax benefit
- **Future Benefit**: Tax-free growth and withdrawals
- **Flexibility**: No RMDs, can access contributions penalty-free

**Decision Factors**
- Current tax bracket vs. expected retirement bracket
- Years to retirement (time for tax-free growth)
- Diversification of tax treatment in retirement
- Estate planning considerations

### Health Savings Accounts (HSAs)

**Triple Tax Advantage**
- **Deductible Contributions**: Immediate tax benefit
- **Tax-Free Growth**: No taxes on investment gains
- **Tax-Free Withdrawals**: For qualified medical expenses
- **Bonus**: After 65, can withdraw for any purpose (taxed as income)

**Contribution Limits (2023)**
- Individual: $3,650
- Family: $7,300
- Catch-up (55+): Additional $1,000

**Investment Strategy**
- Use HSA as retirement account, not just medical fund
- Pay medical expenses out-of-pocket if possible
- Invest HSA funds for long-term growth
- Keep receipts for future reimbursement

### Backdoor Roth Strategies

**Traditional Backdoor Roth**
- Make non-deductible IRA contribution
- Immediately convert to Roth IRA
- Useful when income exceeds Roth limits
- Watch out for pro-rata rule if you have existing traditional IRAs

**Mega Backdoor Roth (Solo 401k)**
- Make after-tax contributions beyond normal limits
- Convert after-tax portion to Roth
- Can potentially get $43,500+ into Roth annually
- Requires plan document allowing after-tax contributions

### Tax Planning Throughout Career Phases

**Early Career (Lower Income)**
- Prioritize Roth contributions
- Take advantage of lower tax brackets
- Build emergency fund first
- Consider index fund investments

**Mid Career (Higher Income)**
- Mix of traditional and Roth contributions
- Maximize high-limit retirement accounts
- Consider tax-loss harvesting in taxable accounts
- Evaluate business structure for tax efficiency

**Pre-Retirement (Peak Earnings)**
- Maximize traditional contributions for immediate tax relief
- Consider Roth conversions in low-income years
- Plan withdrawal sequence for tax efficiency
- Evaluate long-term care insurance

### Investment Selection Within Retirement Accounts

**Asset Allocation Principles**
- Age-appropriate risk tolerance
- Diversification across asset classes
- Low-cost index funds for core holdings
- Regular rebalancing

**Tax-Efficient Placement**
- **Tax-Advantaged Accounts**: Bonds, REITs, active trading
- **Taxable Accounts**: Tax-efficient index funds, individual stocks
- **Roth Accounts**: Highest growth potential investments
- **Traditional Accounts**: Income-producing investments

**Common Investment Options**
- Target-date funds for simplicity
- Total stock market index funds
- International index funds
- Bond index funds
- Real estate investment trusts (REITs)

### Social Security Optimization

**Self-Employment Impact**
- Pay both employee and employer portions (15.3%)
- Credits based on covered earnings
- Need 40 quarters (10 years) for eligibility
- Benefits calculated on highest 35 years of earnings

**Timing Strategies**
- Full retirement age: 66-67 depending on birth year
- Early claiming (62): Reduced benefits permanently
- Delayed claiming (70): Increased benefits permanently
- Spousal benefits and claiming strategies

### Advanced Strategies

**Cash Balance Plans**
- Hybrid pension/401(k) plan
- Very high contribution limits for high earners
- Complex administration requirements
- Good for established businesses with predictable income

**Defined Benefit Plans**
- Traditional pension plans
- Highest possible contributions
- Actuarial costs and complexity
- Best for businesses with consistent high income

**Multiple Business Structures**
- Separate businesses for different income streams
- Maximize retirement contributions across entities
- Consider controlled group rules
- Professional tax planning required

### Estate Planning Integration

**Beneficiary Designations**
- Keep beneficiaries updated
- Consider trust beneficiaries for control
- Stretch provisions for inherited accounts
- Spousal rollover options

**Roth Conversion Planning**
- Strategic conversions in low-income years
- Leave tax-free assets to heirs
- Consider state tax implications
- Multi-year conversion strategies

### Action Items

1. **Retirement Plan Evaluation**
   - Calculate optimal contribution amounts
   - Compare plan types for your situation
   - Set up automatic contributions
   - Review investment allocations

2. **Tax Strategy Implementation**
   - Determine traditional vs. Roth split
   - Plan conversion opportunities
   - Optimize HSA contributions and investments
   - Consider professional tax planning consultation

3. **Investment Portfolio Review**
   - Ensure appropriate asset allocation
   - Minimize investment fees
   - Implement tax-efficient placement
   - Set up automatic rebalancing

4. **Long-term Planning**
   - Project retirement income needs
   - Model different contribution scenarios
   - Plan Social Security claiming strategy
   - Integrate with overall financial plan
`,
        orderIndex: 3,
        lessonType: 'lecture',
        durationMinutes: 90,
      },
      {
        title: 'International Tax Considerations for Global Developers',
        slug: 'international-tax',
        content: `# International Tax Considerations for Global Developers

## Navigating Global Taxation in a Connected World

Modern developer businesses often operate across borders, serving international clients and potentially residing in different countries. Understanding international tax obligations is crucial for compliance and optimization.

### U.S. Tax Obligations for Expats

**Tax Residency Rules**
- **Citizen Test**: U.S. citizens taxed worldwide regardless of residence
- **Resident Alien Test**: Green card or substantial presence test
- **Substantial Presence**: 31+ days current year + 183 days over 3 years
- **Tax Treaties**: May provide relief from double taxation

**Worldwide Income Reporting**
- All income must be reported on U.S. returns
- Includes foreign employment, business, investment income
- Foreign bank account reporting requirements (FBAR)
- Potential penalties for non-compliance are severe

**Foreign Earned Income Exclusion (FEIE)**
- Exclude up to $120,000 foreign earned income (2023)
- Must meet physical presence or bona fide residence test
- Only applies to earned income, not investment income
- Cannot use if claiming foreign tax credits

**Foreign Tax Credit (FTC)**
- Credit for foreign taxes paid on foreign income
- Prevents double taxation on same income
- Can carry forward unused credits
- More complex than FEIE but often more beneficial

### Common International Structures

**Foreign Corporation with U.S. Shareholder**
- **CFC Rules**: Controlled Foreign Corporation taxation
- **PFIC Rules**: Passive Foreign Investment Company rules
- **Subpart F**: Current taxation of certain foreign income
- **GILTI**: Global Intangible Low-Taxed Income inclusion

**Foreign LLC/Partnership**
- Generally treated as transparent for U.S. tax purposes
- Income flows through to U.S. owner
- May need to file Forms 8865 and 8938
- Consider check-the-box elections

**Digital Nomad Considerations**
- Physical presence test requirements
- Banking and business address issues
- Client location and source rules
- State tax nexus concerns

### Value Added Tax (VAT) Obligations

**EU VAT System**
- **Registration Thresholds**: Vary by EU member state
- **Digital Services**: B2C sales taxed where customer located
- **B2B Sales**: Generally taxed where customer is established
- **OSS System**: One Stop Shop for simplified compliance

**Common VAT Issues for Developers**
- SaaS and digital service classification
- Place of supply rules for services
- VAT identification number requirements
- Invoice requirements and language

**VAT Planning Strategies**
- Consider location of incorporation
- Understand customer location impact
- Plan for VAT registration thresholds
- Implement proper invoicing systems

### Transfer Pricing for Developer Businesses

**Arm's Length Principle**
- Intercompany transactions at market rates
- Required for related party transactions
- Applies to services, IP licensing, cost sharing
- Documentation requirements vary by jurisdiction

**Common IP Structures**
- Develop IP in low-tax jurisdiction
- License IP to operating companies
- Cost-sharing arrangements for development
- BEPS (Base Erosion and Profit Shifting) limitations

**Documentation Requirements**
- Transfer pricing documentation
- Country-by-country reporting (if applicable)
- Economic analysis supporting pricing
- Regular updates for changing circumstances

### Tax-Efficient International Structures

**Ireland - Netherlands - Bermuda Structure**
- Traditional IP holding structure
- Largely eliminated by BEPS reforms
- Current limitations and requirements
- Alternative structures available

**Singapore Hub Structure**
- Attractive for Asia-Pacific operations
- Substantial activities requirements
- Development center incentives
- Strong tax treaty network

**Estonia E-Residency**
- Digital residency program
- EU company formation for non-residents
- Distributed profits taxation
- Growing ecosystem for digital entrepreneurs

### Crypto and Digital Asset Taxation

**U.S. Treatment**
- Cryptocurrency treated as property
- Taxable events: trading, mining, receiving payment
- Basis tracking and gain/loss calculation
- Reporting requirements on tax returns

**International Variations**
- Some countries treat crypto as currency
- Mining taxation varies significantly
- DeFi and staking reward treatment
- Privacy coin considerations

**Record Keeping Challenges**
- Multiple exchange reporting
- DeFi protocol interactions
- Basis tracking across wallets
- International transfer reporting

### Tax Planning for Remote Teams

**Employee vs. Contractor Classification**
- Local labor law implications
- Tax withholding obligations
- Social security and benefits requirements
- Immigration and work permit issues

**Payroll Tax Obligations**
- Source country withholding
- Residence country obligations
- Social security totalization agreements
- Double taxation relief mechanisms

**Equity Compensation**
- Stock option taxation varies by country
- Timing of taxation events
- Withholding and reporting obligations
- Treaty relief provisions

### Compliance and Reporting Requirements

**U.S. International Forms**
- **Form 8938**: FATCA reporting of foreign accounts
- **FBAR**: Foreign Bank Account Report
- **Form 8865**: Foreign partnership returns
- **Form 5471**: Controlled foreign corporation
- **Form 8858**: Disregarded entity reporting

**Common Penalties**
- FBAR: Up to $12,921 per account
- Form 8938: Up to $60,000
- Form 5471: $10,000 base penalty
- Reasonable cause exceptions available

### Practical Implementation

**Professional Assistance**
- International tax attorney
- CPA with international expertise
- Local tax advisors in operating countries
- Regular compliance reviews

**Technology Solutions**
- International tax software
- Multi-currency accounting systems
- Automated VAT calculation
- Compliance monitoring tools

**Documentation Systems**
- Maintain detailed records
- Document business substance
- Support transfer pricing positions
- Prepare for potential audits

### Planning Opportunities

**Income Shifting Strategies**
- Timing of income recognition
- Deduction acceleration
- Treaty shopping considerations
- Advance pricing agreements

**Structure Optimization**
- Regular structure reviews
- Response to law changes
- Business substance requirements
- Cost-benefit analysis

### Red Flags and Common Mistakes

**Aggressive Structures**
- Lack of business substance
- Purely tax-driven arrangements
- Non-compliance with BEPS measures
- Inadequate documentation

**Compliance Failures**
- Missing filing deadlines
- Incomplete disclosure
- Incorrect classifications
- Inadequate record keeping

### Action Items

1. **Compliance Assessment**
   - Review current international obligations
   - Identify missing filings or reports
   - Implement compliance calendar
   - Consider voluntary disclosure if needed

2. **Structure Review**
   - Analyze current business structure efficiency
   - Consider BEPS and local law changes
   - Document business substance
   - Plan for growth and expansion

3. **Process Implementation**
   - Set up international accounting systems
   - Implement VAT collection/reporting
   - Create transfer pricing documentation
   - Establish regular review procedures

4. **Professional Network**
   - Build international tax advisor team
   - Establish relationships in key jurisdictions
   - Join international business groups
   - Stay current on law changes
`,
        orderIndex: 4,
        lessonType: 'lecture',
        durationMinutes: 85,
      },
      {
        title: 'Advanced Tax Strategies and Year-End Planning',
        slug: 'advanced-tax-strategies',
        content: `# Advanced Tax Strategies and Year-End Planning

## Sophisticated Tax Planning for Established Developer Businesses

As your developer business grows and becomes more profitable, advanced tax strategies become increasingly important for optimizing your tax burden while remaining compliant with tax laws.

### Year-End Tax Planning Timeline

**October - November Planning**
- Project current year income and expenses
- Calculate estimated tax payments needed
- Review potential year-end moves
- Consult with tax professionals

**November - December Execution**
- Implement equipment purchases
- Execute tax-loss harvesting
- Make retirement plan contributions
- Accelerate or defer income/expenses

**December 31 Deadline Items**
- Equipment placed in service
- Retirement contributions (except IRAs)
- Tax-loss harvesting transactions
- Business structure elections

**January - April Extensions**
- IRA contributions until tax deadline
- Some retirement plan contributions
- Equipment purchases for prior year
- Amended return strategies

### Income Timing Strategies

**Revenue Recognition Timing**
- **Cash Method**: Control timing of invoicing and collections
- **Accrual Method**: Consider advance payments and deferred revenue
- **Installment Sales**: Spread gain recognition over multiple years
- **Like-Kind Exchanges**: Defer recognition on business asset exchanges

**Multi-Year Income Averaging**
- Spread lumpy income over multiple years
- Use retirement contributions for smoothing
- Consider installment payment contracts
- Plan major project timing

**Deferred Compensation Strategies**
- Delay year-end bonuses to January
- Structure consulting agreements for future payment
- Use escrow arrangements for milestone payments
- Consider rabbi trusts for key employees

### Advanced Deduction Strategies

**Section 179 vs. Bonus Depreciation**
- **Section 179**: Up to $1,160,000 immediate expensing (2023)
- **Bonus Depreciation**: 80% immediate expension (phasing down)
- **Regular Depreciation**: Spread over useful life
- **Mixed Approach**: Optimize based on income levels

**Cost Segregation Studies**
- Separate building components for faster depreciation
- Accelerate tax benefits on real estate
- Professional engineering analysis required
- Significant tax benefits for business owners

**R&D Credit Strategies**
- Credit for qualifying research activities
- Software development often qualifies
- 14% credit rate for eligible small businesses
- Can offset payroll taxes for startups

### Business Structure Optimization

**S-Corporation Salary Optimization**
- **Reasonable Salary**: Must pay market-rate wages
- **Distribution Savings**: Avoid employment taxes on distributions
- **Professional Guidance**: IRS scrutinizes salary levels
- **Documentation**: Support salary decisions with market data

**Multiple Entity Strategies**
- Separate high-risk activities
- Optimize tax brackets across entities
- Isolate intellectual property
- Consider controlled group rules

**Check-the-Box Elections**
- Change entity tax treatment
- Single-member LLC to S-Corp
- Multi-member LLC to corporation
- Timing and revocation rules apply

### Retirement Plan Advanced Strategies

**Defined Benefit Plan Design**
- Maximize contributions for business owners
- Age-weighted formulas favor older owners
- Cross-tested designs for employee fairness
- Actuarial services required

**Cash Balance Plan Hybrid**
- Combine 401(k) with defined benefit features
- Higher contribution limits than traditional plans
- More predictable costs than traditional pensions
- Good for businesses with fluctuating income

**Multiple Plan Strategies**
- 401(k) for employees, defined benefit for owners
- Separate plans for different business units
- Maximize overall contribution limits
- Careful design to avoid discrimination

### Estate and Gift Tax Planning

**Annual Gift Tax Exclusions**
- $17,000 per recipient (2023)
- Unlimited gifts to U.S. citizen spouses
- Medical and education payment exceptions
- Generation-skipping transfer opportunities

**Business Valuation Discounts**
- Minority interest discounts
- Marketability discounts
- Key person discounts
- Regular valuation updates

**Grantor Trust Strategies**
- Intentionally defective grantor trusts
- Transfer future appreciation to heirs
- Pay income taxes on trust income
- Professional estate planning required

### Tax-Loss Harvesting Strategies

**Securities Portfolio Management**
- Realize losses to offset gains
- Avoid wash sale rules (30-day rule)
- Harvest losses in taxable accounts
- Consider state tax implications

**Business Asset Dispositions**
- Write off obsolete inventory
- Dispose of depreciated business assets
- Abandon worthless investments
- Document business purpose

**Cryptocurrency Tax-Loss Harvesting**
- No wash sale rules currently apply
- Harvest losses on digital assets
- Consider like-kind exchange rules
- Track basis across multiple wallets

### State and Local Tax (SALT) Planning

**State Residency Planning**
- Establish residency in no-tax states
- Document days spent in each state
- Consider domicile vs. residency factors
- Plan for multi-state tax issues

**Business Location Strategies**
- Locate business in tax-favorable states
- Understand nexus rules for sales tax
- Consider remote work implications
- Plan for apportionment rules

**Local Tax Considerations**
- City and county business taxes
- Property tax on business assets
- Local payroll taxes
- Special assessments and fees

### International Tax Advanced Strategies

**Pre-Immigration Planning**
- Step-up basis on assets before residency
- Offshore trust strategies
- Pre-immigration income acceleration
- Estate planning before U.S. residency

**Expatriation Planning**
- Exit tax calculations and planning
- Covered expatriate rules
- Gift and estate tax implications
- Professional guidance essential

**Treaty Benefits Optimization**
- Utilize tax treaty provisions
- Plan for treaty shopping rules
- Consider substance requirements
- Document treaty positions

### Audit Defense and Compliance

**Audit-Proof Documentation**
- Contemporaneous records
- Business purpose documentation
- Reasonable and ordinary standards
- Professional appearance and organization

**Voluntary Disclosure Programs**
- Correct past filing errors
- Minimize penalties and interest
- Establish compliance going forward
- Professional representation recommended

**Statute of Limitations Planning**
- Understand examination periods
- Consider consent to extend
- Plan for amended returns
- Document position strengths

### Technology and Automation

**Tax Software Integration**
- Automated transaction categorization
- Multi-entity consolidation
- Estimated payment calculations
- Compliance deadline tracking

**AI-Powered Tax Planning**
- Scenario modeling and projections
- Automated optimization suggestions
- Real-time compliance monitoring
- Predictive analytics for planning

**Blockchain and Smart Contracts**
- Automated tax-optimized transactions
- Smart contract tax implications
- Decentralized finance (DeFi) planning
- Regulatory compliance monitoring

### Risk Management

**Professional Liability Insurance**
- Errors and omissions coverage
- Tax penalty insurance
- Professional service coverage
- Regular coverage reviews

**Tax Compliance Insurance**
- Coverage for tax preparation errors
- Penalty and interest protection
- Audit defense coverage
- Peace of mind for complex returns

### Emerging Areas and Future Planning

**Digital Asset Taxation**
- NFT and tokenization strategies
- Decentralized autonomous organization (DAO) taxation
- Metaverse income and deductions
- Regulatory development monitoring

**Artificial Intelligence Tax Implications**
- AI development cost treatment
- Intellectual property considerations
- International transfer pricing
- Future regulatory frameworks

### Action Items for Advanced Planning

1. **Annual Planning Process**
   - Establish regular planning meetings
   - Create tax projection models
   - Implement planning recommendations
   - Monitor and adjust throughout year

2. **Professional Team Assembly**
   - Tax attorney for complex strategies
   - CPA with advanced planning experience
   - Financial advisor for integration
   - Estate planning attorney

3. **Documentation and Compliance Systems**
   - Implement advanced record keeping
   - Create audit defense files
   - Establish compliance calendars
   - Regular strategy reviews

4. **Continuous Education**
   - Stay current on tax law changes
   - Attend professional development
   - Join tax planning organizations
   - Monitor regulatory developments

### Conclusion

Advanced tax planning requires sophisticated strategies, professional guidance, and ongoing attention to detail. The key to successful tax planning is balancing optimization with compliance, ensuring that all strategies are legally sound and properly documented. Regular reviews and updates are essential as tax laws evolve and business circumstances change.

Remember that aggressive tax planning can lead to scrutiny and potential penalties. Always work with qualified professionals and maintain detailed documentation supporting your tax positions. The goal is sustainable, long-term tax efficiency that supports your business objectives while maintaining full compliance with applicable tax laws.
`,
        orderIndex: 5,
        lessonType: 'lecture',
        durationMinutes: 110,
      }
    ]

    // Create lessons
    for (const lessonData of lessons) {
      await prisma.lesson.create({
        data: {
          weekId: existingWeek.id,
          title: lessonData.title,
          slug: lessonData.slug,
          content: lessonData.content,
          orderIndex: lessonData.orderIndex,
          lessonType: lessonData.lessonType,
          durationMinutes: lessonData.durationMinutes,
        }
      })
    }

    console.log('✅ Week 8 successfully added with 5 comprehensive lessons!')
    console.log('📊 Total content: 480 minutes (8 hours) of advanced tax planning education')
    console.log('🎯 Coverage: Tax fundamentals, deductions, retirement planning, international tax, advanced strategies')

  } catch (error) {
    console.error('❌ Error adding Week 8:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addWeek8()