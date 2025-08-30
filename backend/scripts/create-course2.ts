import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createCourse2() {
  console.log('Creating Course 2: Business Structure & Legal Foundations...')

  try {
    // Get Foundation Courses category
    const foundationCategory = await prisma.courseCategory.findFirst({
      where: { slug: 'foundation' }
    })

    if (!foundationCategory) {
      throw new Error('Foundation course category not found')
    }

    // Create Course 2
    const course = await prisma.course.create({
      data: {
        title: 'Business Structure & Legal Foundations',
        slug: 'business-structure-legal',
        description: 'Learn essential legal structures and business formation fundamentals for developers starting their own businesses.',
        shortDescription: 'Master business entities, contracts, and legal compliance for developer entrepreneurs.',
        categoryId: foundationCategory.id,
        level: 'beginner',
        duration: '3 weeks',
        estimatedHours: 24,
        price: 9700, // $97
        originalPrice: 12700, // $127
        instructor: 'Michael Chen, JD, MBA',
        instructorBio: 'Business attorney and entrepreneur with 12+ years helping tech startups navigate legal formations and compliance. Former Silicon Valley startup founder.',
        thumbnailUrl: '/images/courses/business-structure-legal.jpg',
        orderIndex: 2,
        isPublished: true,
        isFeatured: false,
        skillsLearned: JSON.stringify([
          'Business entity selection and formation',
          'Contract fundamentals and negotiation',
          'Intellectual property protection',
          'Business registration and compliance',
          'Legal risk assessment and mitigation'
        ]),
        targetAudience: 'Developers and tech professionals starting their own businesses who need foundational legal and business structure knowledge.'
      }
    })

    console.log('Created course:', course.title)

    // Create Week 1: Business Entity Types
    const week1 = await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: 1,
        title: 'Business Entity Types & Selection',
        overview: 'Understanding different business structures (LLC, Corp, S-Corp, Partnership) and how to choose the right one for your developer business.',
        learningObjectives: JSON.stringify([
          'Understand the pros and cons of each business entity type',
          'Learn tax implications of different structures',
          'Master the decision framework for entity selection',
          'Understand liability protection and operational requirements',
          'Learn about state-specific considerations'
        ]),
        estimatedHours: 8
      }
    })

    // Create Week 1 Lessons
    const week1Lessons = [
      {
        title: 'Business Entity Fundamentals',
        slug: 'business-entity-fundamentals',
        content: `# Business Entity Fundamentals for Developers

## Why Business Structure Matters

As a developer transitioning from employee to entrepreneur, one of your first critical decisions is choosing the right business structure. This decision affects your taxes, liability protection, ability to raise capital, and operational complexity.

[!info]
Your business entity choice is not permanent, but changing later can be expensive and complex. Making the right choice upfront saves time, money, and legal complications.

### The Developer's Business Entity Landscape

**Key Factors for Entity Selection:**
1. **Liability Protection** - Separating personal and business assets
2. **Tax Efficiency** - Minimizing total tax burden
3. **Operational Simplicity** - Reducing administrative overhead
4. **Growth Flexibility** - Ability to scale and take investment
5. **Credibility** - Professional appearance to clients and partners

### Overview of Common Business Entities

**1. Sole Proprietorship**
- **Best For**: Very small, low-risk operations
- **Pros**: Simplest setup, minimal paperwork, direct tax pass-through
- **Cons**: No liability protection, limited credibility, difficult to scale
- **Tax**: Personal income tax rates (up to 37% + self-employment tax)

**2. Limited Liability Company (LLC)**
- **Best For**: Most solo developers and small teams
- **Pros**: Liability protection, tax flexibility, operational simplicity
- **Cons**: Self-employment tax on all profits, limited investment options
- **Tax**: Pass-through taxation (can elect corporate tax treatment)

**3. C-Corporation**
- **Best For**: High-growth businesses seeking investment
- **Pros**: Strong liability protection, easy to raise capital, employee benefits
- **Cons**: Double taxation, complex compliance, higher costs
- **Tax**: Corporate tax (21%) + personal tax on dividends

**4. S-Corporation**
- **Best For**: Profitable businesses wanting to minimize self-employment tax
- **Pros**: Pass-through taxation, reduced self-employment tax, liability protection
- **Cons**: Ownership restrictions, complex payroll requirements
- **Tax**: Pass-through to personal returns, payroll tax on reasonable salary only

### The Developer Business Entity Decision Tree

[!example]
**Decision Framework:**

**Start Here: What's your primary goal?**

**Path 1: Maximum Simplicity**
→ Revenue < $50K/year, low liability risk
→ **Consider: Sole Proprietorship or Single-Member LLC**

**Path 2: Balance of Protection and Simplicity**
→ Revenue $50K-$200K/year, moderate growth plans
→ **Consider: LLC (most common choice)**

**Path 3: Tax Optimization**
→ Profit > $60K/year, want to minimize self-employment tax
→ **Consider: S-Corp election**

**Path 4: High Growth/Investment**
→ Planning to raise capital, high-growth trajectory
→ **Consider: C-Corp (Delaware)**

### Limited Liability Company (LLC) Deep Dive

LLCs are the most popular choice for developer businesses, and for good reason:

**LLC Advantages:**
- **Liability Protection**: Personal assets protected from business debts
- **Tax Flexibility**: Choose how to be taxed (sole prop, partnership, S-Corp, C-Corp)
- **Operational Simplicity**: Minimal required meetings, records, or formalities
- **Ownership Flexibility**: Multiple classes of ownership, profit distribution flexibility
- **Credibility**: Professional appearance for contracts and business relationships

**LLC Disadvantages:**
- **Self-Employment Tax**: All profits subject to SE tax (15.3%)
- **Investment Limitations**: VCs prefer corporations for investment
- **State Variations**: Rules vary significantly by state

[!tip]
For most solo developers and small development teams, an LLC provides the best balance of protection, simplicity, and tax efficiency.

### Corporation Structures

**C-Corporation Benefits:**
- **Strongest Liability Protection**: Complete separation of personal and business
- **Investment Ready**: Preferred structure for raising venture capital
- **Employee Benefits**: Better retirement plans, health insurance deductions
- **Perpetual Existence**: Continues regardless of owner changes
- **Stock Options**: Easy to implement employee equity plans

**C-Corporation Drawbacks:**
- **Double Taxation**: Corporate profits taxed, then dividends taxed again
- **Complex Compliance**: Board meetings, corporate resolutions, extensive record-keeping
- **Higher Costs**: Formation, annual fees, tax preparation more expensive

[!warning]
C-Corporations make sense mainly if you plan to raise significant venture capital or go public. For most developer businesses, the complexity and double taxation aren't worth it.

**S-Corporation Benefits:**
- **Pass-Through Taxation**: Avoid double taxation of C-Corp
- **Self-Employment Tax Savings**: Only pay SE tax on reasonable salary, not all profits
- **Liability Protection**: Same as C-Corp
- **Business Legitimacy**: Corporate structure provides credibility

**S-Corporation Drawbacks:**
- **Ownership Restrictions**: Max 100 shareholders, all must be US citizens/residents
- **Payroll Complexity**: Must run payroll for owner-employees
- **IRS Scrutiny**: "Reasonable salary" requirements heavily audited
- **Limited Tax Benefits**: Can't deduct health insurance for >2% shareholders

### Partnership Structures

**General Partnership:**
- **Rarely Recommended**: Unlimited liability for all partners
- **Better Alternative**: Multi-member LLC provides same benefits with protection

**Limited Partnership (LP):**
- **Specialized Use**: Real estate, investment funds
- **Complex Structure**: General partner (unlimited liability) + limited partners
- **Not Common**: Rarely appropriate for developer businesses

### State-Specific Considerations

**Delaware Incorporation:**
- **Best For**: C-Corps seeking investment
- **Benefits**: Business-friendly courts, established corporate law
- **Costs**: Higher fees, must register in home state too
- **Not Necessary**: For LLCs or small businesses

**Home State Formation:**
- **Usually Best**: For LLCs and small corporations
- **Benefits**: Lower costs, simpler compliance
- **Local Advantages**: Better access to local attorneys and accountants

### Tax Implications Comparison

[!example]
**Scenario**: Developer business with $120,000 annual profit

**Sole Proprietorship:**
- Income Tax: ~$18,000 (15% bracket)
- Self-Employment Tax: ~$15,300 (12.4% + 2.9%)
- **Total Tax: ~$33,300**

**LLC (Default Taxation):**
- Same as sole proprietorship: **~$33,300**

**S-Corp Election:**
- Reasonable Salary: $80,000
- Payroll Taxes: ~$12,240 (employer + employee)
- Income Tax on Distributions: ~$6,000
- **Total Tax: ~$18,240** (Save ~$15,000!)

**C-Corporation:**
- Corporate Tax: ~$25,200 (21% rate)
- Personal Tax on Salary: ~$12,000
- **Total Tax: ~$37,200** (if profits retained)

### Making Your Decision

[!tip]
**For Most Developers, Follow This Path:**
1. **Start Simple**: Begin with LLC for liability protection
2. **Grow Smartly**: Make S-Corp election when profit > $60K
3. **Scale Strategically**: Convert to C-Corp only when seeking investment

### Common Mistakes to Avoid

**1. Analysis Paralysis**
- Don't delay starting your business over entity choice
- You can change structures later (with costs and complexity)
- Start with LLC if uncertain

**2. Choosing Based on Taxes Alone**
- Consider liability, operations, and growth plans
- Tax benefits mean nothing if you're sued and lose personal assets

**3. DIY Complex Structures**
- LLCs can often be DIY with online services
- S-Corp and C-Corp elections need professional guidance

**4. Ignoring State Requirements**
- Each state has different rules and costs
- Some states (like California) have high minimum franchise taxes

### Action Items for This Week

1. **Assess Your Situation**: Use the decision framework to identify your likely best option
2. **Research Your State**: Look up formation costs and annual requirements
3. **Consult Professionals**: Schedule consultation with business attorney and CPA
4. **Plan Timeline**: Entity formation can take 2-4 weeks
5. **Prepare Documentation**: Gather information needed for formation documents

### Next Week Preview

Next week, we'll dive deep into contract fundamentals - the legal agreements that protect your business and define your client relationships. We'll cover service agreements, NDAs, and intellectual property clauses that every developer business needs.

[!warning]
Entity selection is a critical decision that affects every aspect of your business. When in doubt, consult with a qualified business attorney and CPA who understand your specific situation and state requirements.`,
        orderIndex: 1,
        lessonType: 'lecture',
        durationMinutes: 60
      },
      {
        title: 'LLC vs Corporation: Deep Comparison',
        slug: 'llc-vs-corporation-comparison',
        content: `# LLC vs Corporation: Deep Comparison for Developers

## The Great Entity Debate

The choice between LLC and Corporation is the most common decision point for developer entrepreneurs. Both offer liability protection, but they differ significantly in taxation, operations, and growth potential.

[!info]
This lesson provides a comprehensive comparison to help you make an informed decision based on your specific business goals and situation.

### Fundamental Differences

**Limited Liability Company (LLC)**
- **Legal Nature**: Hybrid entity (partnership flexibility + corporate protection)
- **Ownership**: Members (can be individuals, corporations, other LLCs)
- **Management**: Member-managed or manager-managed
- **Taxation**: Pass-through (but can elect corporate taxation)

**Corporation**
- **Legal Nature**: Separate legal entity with perpetual existence
- **Ownership**: Shareholders (stock ownership)
- **Management**: Board of Directors → Officers → Employees
- **Taxation**: C-Corp (separate tax entity) or S-Corp (pass-through)

### Detailed LLC Analysis

**LLC Formation Process:**
1. Choose and reserve business name
2. File Articles of Organization with state
3. Create Operating Agreement (highly recommended)
4. Obtain EIN from IRS
5. Open business bank account

**LLC Operational Requirements:**
- **Minimal**: No required meetings or resolutions
- **Flexible**: Operating agreement governs management
- **Simple**: Fewer compliance requirements
- **Records**: Basic financial records sufficient

**LLC Tax Advantages:**
- **Default**: Pass-through taxation (profits/losses flow to members)
- **Flexibility**: Can elect S-Corp or C-Corp taxation
- **Simplicity**: Single level of taxation
- **Losses**: Can deduct business losses against other income

**LLC Tax Disadvantages:**
- **Self-Employment Tax**: All profits subject to SE tax (15.3%)
- **No Salary Splitting**: Can't separate wages from distributions for tax purposes
- **State Variations**: Some states impose additional LLC taxes

[!example]
**LLC Tax Example:**
Developer LLC with $100,000 profit:
- Income Tax: ~$15,000
- Self-Employment Tax: ~$14,100 (on $92,350 after deduction)
- **Total: ~$29,100**

### Detailed Corporation Analysis

**C-Corporation Formation Process:**
1. Choose and reserve corporate name
2. File Articles of Incorporation
3. Create corporate bylaws
4. Hold initial board meeting
5. Issue stock certificates
6. Obtain EIN and open bank account

**C-Corporation Operational Requirements:**
- **Annual Meetings**: Shareholders and Board of Directors
- **Corporate Resolutions**: Major decisions must be documented
- **Record Keeping**: Meeting minutes, stock records, financial statements
- **Compliance**: Annual reports, franchise taxes

**C-Corporation Tax Structure:**
- **Separate Entity**: Corporation pays taxes on profits (21% federal rate)
- **Double Taxation**: Shareholder pays tax on dividends received
- **Salary Requirements**: Owner-employees must receive reasonable wages
- **Benefit Deductions**: Health insurance, retirement plans fully deductible

**S-Corporation Election Benefits:**
- **Pass-Through**: Avoids double taxation of C-Corp
- **Self-Employment Savings**: Only salary subject to payroll taxes
- **Maintained Structure**: Same operational benefits as C-Corp
- **Growth Potential**: Easier conversion to C-Corp later

[!example]
**S-Corp Tax Example:**
Same $100,000 profit, $70,000 reasonable salary:
- Payroll Tax on Salary: ~$10,710
- Income Tax: ~$15,000
- **Total: ~$25,710** (Save ~$3,400 vs LLC)

### Direct Comparison Matrix

| Factor | LLC | C-Corporation | S-Corporation |
|--------|-----|---------------|---------------|
| **Liability Protection** | Excellent | Excellent | Excellent |
| **Formation Complexity** | Simple | Complex | Complex |
| **Ongoing Compliance** | Minimal | High | High |
| **Tax Efficiency** | Good | Poor | Excellent |
| **Investment Ready** | Limited | Excellent | Limited |
| **Ownership Flexibility** | High | High | Restricted |
| **Operational Simplicity** | High | Low | Low |
| **Self-Employment Tax** | High | N/A | Reduced |
| **Professional Credibility** | Good | Excellent | Excellent |

### Specific Developer Business Scenarios

[!example]
**Scenario 1: Solo Freelancer**
- Revenue: $80,000/year
- Clients: Small to medium businesses
- Growth Plan: Moderate growth, might hire 1-2 people
- **Recommendation: LLC** (simple, adequate protection, reasonable tax burden)

**Scenario 2: SaaS Startup**
- Revenue: $200,000/year (growing rapidly)
- Plan: Raise venture capital within 2 years
- Team: 3-5 employees anticipated
- **Recommendation: C-Corp** (investor preference, stock option plans)

**Scenario 3: Consulting Agency**
- Revenue: $300,000/year
- Partners: 2 developers, stable business
- Focus: Service delivery, not product development
- **Recommendation: LLC with S-Corp Election** (tax savings, operational simplicity)

**Scenario 4: App Development Shop**
- Revenue: $150,000/year
- Clients: Mix of small business and contracts
- Goal: Build and sell business in 5 years
- **Recommendation: S-Corp** (tax efficiency, easier sale preparation)

### Making the S-Corp Election

**When to Consider S-Corp Election:**
- Business profit > $60,000/year
- Want to minimize self-employment tax
- Don't need outside investment
- Can handle payroll complexity

**S-Corp Election Process:**
1. Form LLC or Corporation first
2. File Form 2553 with IRS
3. Set up payroll system
4. Determine reasonable salary
5. File quarterly payroll returns

[!warning]
**S-Corp Reasonable Salary Requirements:**
The IRS requires owner-employees to pay themselves a "reasonable salary" for services performed. This salary must be comparable to what you'd pay someone else to do the same work. Paying too low a salary invites IRS scrutiny and penalties.

### State-Specific Considerations

**High-Tax States (CA, NY, NJ):**
- LLCs may have significant annual fees
- Corporations might have lower annual costs
- Consider formation in business-friendly states

**Business-Friendly States:**
- **Delaware**: Best for C-Corps, extensive case law
- **Wyoming**: Low-cost LLCs, strong privacy protection  
- **Nevada**: No corporate income tax, good for C-Corps
- **Texas**: No state income tax, reasonable formation costs

**Home State Factors:**
- Where you live and do business
- Nexus rules may require registration anyway
- Local attorney and CPA familiarity

### Conversion Considerations

**LLC to Corporation:**
- Possible but can trigger tax consequences
- May need to contribute LLC assets to corporation
- Professional guidance essential

**Corporation to LLC:**
- More complex, often triggers taxable liquidation
- Generally not recommended

**C-Corp to S-Corp:**
- Simple election (Form 2553)
- No entity conversion required
- Can be reverted (with waiting period)

### Professional Guidance Timeline

**Month 1: Research Phase**
- Read and understand basic differences
- Identify your likely best option
- Research state-specific requirements

**Month 2: Professional Consultation**
- Schedule meetings with business attorney and CPA
- Get recommendations based on your specific situation
- Understand formation and ongoing costs

**Month 3: Formation**
- File appropriate formation documents
- Set up business banking and accounting
- Implement chosen structure

### Common Decision Mistakes

**1. Choosing Based on Cost Alone**
- Cheapest formation doesn't mean best long-term value
- Consider total cost of compliance over time

**2. Overcomplicating Simple Businesses**
- Not every business needs a corporation
- Sometimes simple is better

**3. Underestimating Compliance Requirements**
- Corporations require ongoing attention
- Budget for additional accounting and legal costs

**4. Ignoring Tax Elections**
- S-Corp election can save thousands annually
- Timing of election matters (75-day window)

### Action Items

1. **Complete Entity Assessment**: Use decision matrix with your specific numbers
2. **Calculate Tax Scenarios**: Model your situation under each structure
3. **Research State Requirements**: Understand your state's specific rules and costs
4. **Interview Professionals**: Get at least 2 opinions from qualified attorneys/CPAs
5. **Create Formation Timeline**: Plan for 30-60 days from decision to completion

### Next Steps

With entity fundamentals understood, next week we'll explore contract law and intellectual property - the legal agreements that protect your business relationships and innovations. Understanding contracts is essential regardless of your entity choice.

[!tip]
Remember: The "perfect" entity choice doesn't exist. Focus on making a good decision that fits your current situation and allows for future growth and changes.`,
        orderIndex: 2,
        lessonType: 'lecture',
        durationMinutes: 55
      },
      {
        title: 'State Requirements and Formation Process',
        slug: 'state-requirements-formation',
        content: `# State Requirements and Formation Process

## Navigating the Legal Formation Maze

Every state has different requirements, costs, and procedures for business formation. Understanding your state's specific requirements and the formation process is crucial for getting your business started legally and efficiently.

[!info]
This lesson provides a comprehensive guide to state requirements and step-by-step formation processes for both LLCs and Corporations, plus strategies for choosing the optimal state for formation.

### State Selection Strategy

**Home State vs Other States:**
Most small businesses should form in their home state, but there are exceptions:

**Form in Your Home State If:**
- You're a solo developer or small team
- Your business operates locally or regionally
- You want to minimize costs and complexity
- You prefer working with local attorneys and accountants

**Consider Another State If:**
- You're planning to raise venture capital (Delaware C-Corp)
- Your home state has very high fees (California LLC fees)
- You need specific legal protections (Nevada privacy laws)
- You're building a multi-state business from day one

### State-by-State LLC Requirements

**Low-Cost LLC States:**

**Wyoming:**
- Filing Fee: $100
- Annual Report: $50
- No publication requirement
- Strong privacy protection
- No state income tax

**Delaware:**
- Filing Fee: $90
- Annual Franchise Tax: $300
- Well-developed business law
- Court of Chancery for business disputes
- Privacy protection available

**Nevada:**
- Filing Fee: $75
- Annual List: $150
- No state income tax
- Strong privacy laws
- No information sharing agreements with IRS

**High-Cost LLC States:**

**California:**
- Filing Fee: $70
- Annual LLC Tax: $800 minimum (regardless of income!)
- Additional fees based on gross receipts:
  - $900 for $250K-$499,999
  - $2,500 for $500K-$999,999
  - Up to $11,790 for $5M+

**New York:**
- Filing Fee: $200
- Publication Requirement: $1,000-$2,000 in most counties
- Biennial report: $9

### State-by-State Corporation Requirements

**Delaware C-Corporation:**
- Filing Fee: $89
- Annual Franchise Tax: $175 minimum (can be much higher)
- Annual Report: $50
- Advantages:
  - Court of Chancery (business-specialized courts)
  - Extensive case law and predictability
  - Director/officer liability protection
  - VC preference for Delaware incorporation

**Home State C-Corporation (Example: Texas):**
- Filing Fee: $300
- Annual Franchise Tax: 0.375% of gross receipts
- Annual Report: No separate fee
- Advantages:
  - Lower ongoing costs
  - Simpler compliance (one state only)
  - Local professional familiarity

### LLC Formation Process Step-by-Step

**Step 1: Name Selection and Reservation**
- Check name availability (state database search)
- Ensure compliance with state naming requirements
- Reserve name if needed (usually $10-50 for 30-120 days)
- Consider trademark search for broader protection

[!tip]
**LLC Naming Requirements:**
- Must contain "Limited Liability Company," "LLC," or "L.L.C."
- Cannot be misleading (e.g., suggest it's a bank or insurance company)
- Cannot be the same as or confusingly similar to existing entities
- Some states restrict certain words (e.g., "bank," "insurance," "university")

**Step 2: Registered Agent Requirements**
- Must have registered agent in formation state
- Can be yourself (if you have state address) or professional service
- Responsible for receiving legal documents and state correspondence
- Must be available during normal business hours

**Professional Registered Agent Benefits:**
- Privacy protection (your home address not public record)
- Reliability (always available to receive documents)
- Compliance assistance (reminders for annual reports)
- Cost: Usually $100-300/year

**Step 3: Articles of Organization Preparation**

**Required Information (varies by state):**
- LLC name and address
- Registered agent name and address
- Purpose of business (can be general)
- Management structure (member-managed vs manager-managed)
- Duration (can be perpetual)

[!example]
**Sample Articles of Organization Content:**
- **Name**: "TechSolutions Development LLC"
- **Address**: "123 Main St, Austin, TX 78701"
- **Purpose**: "To engage in any lawful business activity"
- **Management**: "Member-managed"
- **Duration**: "Perpetual"
- **Registered Agent**: "John Smith, 123 Main St, Austin, TX 78701"

**Step 4: Filing and Payment**
- File Articles of Organization with Secretary of State
- Pay required filing fee
- Processing time: Usually 1-3 weeks (expedited available in most states)
- You'll receive Certificate of Formation when approved

**Step 5: EIN Application**
- Apply for Employer Identification Number (EIN) with IRS
- Free application directly through IRS website (avoid paid services)
- Required even for single-member LLCs
- Receive EIN immediately online

**Step 6: Operating Agreement Creation**

[!warning]
**Operating Agreement is Critical:**
Even though most states don't require it, an Operating Agreement is essential for:
- Defining member rights and responsibilities
- Specifying profit/loss distribution
- Setting management structure and procedures
- Protecting LLC status in legal disputes
- Preventing disputes between members

**Operating Agreement Key Provisions:**
- Member information and ownership percentages
- Capital contributions and additional funding requirements
- Management structure and decision-making process
- Profit and loss distribution methods
- Transfer restrictions and buyout procedures
- Dissolution and liquidation procedures

**Step 7: Business Banking Setup**
- Open dedicated business bank account
- Bring formation documents and EIN
- Never mix personal and business funds
- Consider business credit card for expenses

### Corporation Formation Process

**Step 1: Articles of Incorporation**

**Required Information:**
- Corporate name (must include Corp., Inc., Company, or abbreviation)
- Registered office and agent
- Number of authorized shares
- Purpose of corporation
- Incorporator information

**Step 2: Corporate Bylaws**
- Internal operating rules for corporation
- Board of Directors structure and meetings
- Officer roles and responsibilities
- Shareholder rights and meeting procedures
- Amendment procedures

**Step 3: Initial Board Meeting**
- Elect officers
- Approve bylaws
- Authorize issuance of stock
- Set fiscal year
- Approve initial corporate resolutions

**Step 4: Stock Issuance**
- Issue stock certificates to initial shareholders
- Maintain stock ledger
- Consider 83(b) election for founder stock
- Establish stock option plan if needed

### Multi-State Considerations

**When You Need to Register in Multiple States:**

**Physical Nexus:**
- Office, warehouse, or other permanent establishment
- Employees working in the state
- Owning or leasing property in the state

**Economic Nexus:**
- Significant sales to state residents
- Regular business activities in the state
- State-specific thresholds (varies widely)

**Foreign Qualification Process:**
- File application to do business as foreign entity
- Appoint registered agent in each state
- Pay annual fees in each state
- File annual reports in each state

[!warning]
**Penalties for Not Registering:**
- Inability to sue in state courts
- Daily penalties for non-compliance
- Personal liability for company debts
- Invalidation of contracts

### Formation Timeline and Costs

**LLC Formation Timeline:**
- Name reservation: 1-2 days
- Document preparation: 1-3 days
- State filing: 1-3 weeks (expedited: 1-3 days)
- EIN application: Same day
- Bank account opening: 1-2 days
- **Total: 2-4 weeks**

**LLC Formation Costs:**
- State filing fee: $50-$500
- Registered agent: $100-300/year
- Operating Agreement: $500-2,000 (attorney-drafted)
- EIN: Free
- **Total: $650-$2,800 first year**

**Corporation Formation Timeline:**
- Similar to LLC but add:
- Bylaw preparation: 2-5 days
- Initial board meeting: 1 day
- Stock certificate preparation: 2-3 days
- **Total: 3-5 weeks**

**Corporation Formation Costs:**
- State filing fee: $100-$800
- Registered agent: $100-300/year
- Attorney fees: $1,500-5,000
- Corporate kit: $100-200
- **Total: $1,800-$6,300 first year**

### Common Formation Mistakes

**1. Rushing the Process**
- Taking time to understand requirements prevents costly mistakes
- Proper planning saves time and money later

**2. DIY Complex Structures**
- LLCs can often be DIY with care
- Corporations usually need professional guidance
- Multi-member entities always need attorney involvement

**3. Ignoring Ongoing Compliance**
- Formation is just the beginning
- Annual reports, taxes, and other requirements continue
- Budget for ongoing compliance costs

**4. Inadequate Documentation**
- Operating agreements and bylaws are crucial
- Proper documentation protects limited liability
- Templates are available but customization recommended

### Professional Service Recommendations

**When to DIY:**
- Single-member LLC in business-friendly state
- Simple business structure
- Comfortable with legal research and forms

**When to Hire Professionals:**
- Multi-member entities
- Complex ownership structures
- S-Corp or C-Corp election
- Multi-state operations
- Significant assets or liability concerns

**Professional Service Types:**
- **Online Legal Services**: $200-800 (LegalZoom, Incfile)
- **Local Attorney**: $1,500-5,000 (personalized service)
- **CPA Assistance**: Tax election guidance
- **Registered Agent Services**: $100-300/year

### Action Items for This Week

1. **Research Your State**: Review formation requirements and costs for your state
2. **Choose Formation State**: Decide between home state and alternatives
3. **Name Selection**: Check availability and reserve if needed
4. **Professional Consultation**: Schedule meetings with attorney and CPA
5. **Document Preparation**: Begin gathering information for formation documents
6. **Timeline Planning**: Create realistic timeline for formation process

### Next Week Preview

Next week, we'll dive deep into contracts and intellectual property - the legal agreements that protect your business relationships and innovations. We'll cover service agreements, NDAs, IP assignment, and other essential contracts every developer business needs.

[!tip]
Formation is a one-time process, but the entity you create will affect every aspect of your business operations. Take the time to do it right the first time, and don't hesitate to invest in professional guidance for complex situations.`,
        orderIndex: 3,
        lessonType: 'lecture',
        durationMinutes: 50
      }
    ]

    for (const lessonData of week1Lessons) {
      const lesson = await prisma.lesson.create({
        data: {
          weekId: week1.id,
          ...lessonData
        }
      })
      console.log('Created lesson:', lesson.title)
    }

    // Create Week 1 Quiz
    const week1Quiz = await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'Week 1: Business Entity Selection Assessment',
        description: 'Test your understanding of business entity types and formation requirements',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25
      }
    })

    // Create Week 1 Quiz Questions
    const week1Questions = [
      {
        questionText: 'Which business entity provides the best balance of liability protection and operational simplicity for most solo developers?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['Sole Proprietorship', 'LLC', 'C-Corporation', 'Partnership']),
        correctAnswer: 'LLC',
        explanation: 'LLCs provide liability protection like corporations but with much simpler operational requirements and tax flexibility.',
        points: 1,
        orderIndex: 1
      },
      {
        questionText: 'At what annual profit level should a developer business consider making an S-Corp election to minimize self-employment taxes?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['$30,000', '$60,000', '$100,000', '$150,000']),
        correctAnswer: '$60,000',
        explanation: 'The S-Corp election typically becomes beneficial when profits exceed $60,000 annually, as the self-employment tax savings outweigh the additional payroll complexity.',
        points: 1,
        orderIndex: 2
      },
      {
        questionText: 'Which state is most preferred by venture capital investors for C-Corporation formation?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['California', 'Delaware', 'Nevada', 'Wyoming']),
        correctAnswer: 'Delaware',
        explanation: 'Delaware is preferred by VCs due to its Court of Chancery, extensive business law precedent, and predictable legal environment.',
        points: 1,
        orderIndex: 3
      },
      {
        questionText: 'True or False: An LLC Operating Agreement is legally required in all states.',
        questionType: 'true-false',
        options: JSON.stringify(['True', 'False']),
        correctAnswer: 'False',
        explanation: 'While not legally required in most states, an Operating Agreement is highly recommended to define member rights and protect the LLC structure.',
        points: 1,
        orderIndex: 4
      },
      {
        questionText: 'What is the primary disadvantage of C-Corporation taxation for small developer businesses?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['Limited liability protection', 'Double taxation', 'Complex formation process', 'Ownership restrictions']),
        correctAnswer: 'Double taxation',
        explanation: 'C-Corporations face double taxation - the corporation pays tax on profits, and shareholders pay tax again on dividends, making it less efficient for small businesses.',
        points: 1,
        orderIndex: 5
      }
    ]

    for (const questionData of week1Questions) {
      await prisma.question.create({
        data: {
          quizId: week1Quiz.id,
          ...questionData
        }
      })
    }

    console.log('✅ Successfully created Course 2: Business Structure & Legal Foundations')
    console.log('📚 Week 1: Business Entity Types & Selection - Complete')
    console.log('   - 3 comprehensive lessons')
    console.log('   - 1 assessment quiz with 5 questions')
    console.log('   - Total duration: ~165 minutes of content')

  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

createCourse2()
  .catch((error) => {
    console.error('Failed to create course:', error)
    process.exit(1)
  })