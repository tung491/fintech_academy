import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse6() {
  try {
    console.log('🚀 Creating Course 6: Advanced Accounting for SaaS Businesses...');

    // Check if the course already exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        slug: 'advanced-accounting-saas-businesses'
      }
    });

    if (existingCourse) {
      console.log('⚠️ Course already exists, deleting and recreating...');
      
      // Delete existing course and related data
      await prisma.quiz.deleteMany({
        where: {
          week: {
            courseId: existingCourse.id
          }
        }
      });
      
      await prisma.lesson.deleteMany({
        where: {
          week: {
            courseId: existingCourse.id
          }
        }
      });
      
      await prisma.week.deleteMany({
        where: {
          courseId: existingCourse.id
        }
      });
      
      await prisma.course.delete({
        where: {
          id: existingCourse.id
        }
      });
    }

    // Get the existing Accounting & Bookkeeping category
    const category = await prisma.courseCategory.findFirst({
      where: {
        slug: 'accounting'
      }
    });

    if (!category) {
      throw new Error('Accounting & Bookkeeping category not found. Please create it first.');
    }
    
    console.log('✅ Using existing Accounting & Bookkeeping category');

    // Create Course 6: Advanced Accounting for SaaS Businesses
    const course6 = await prisma.course.create({
      data: {
        title: 'Advanced Accounting for SaaS Businesses',
        slug: 'advanced-accounting-saas-businesses',
        description: 'Master advanced SaaS accounting including revenue recognition, subscription metrics, unit economics, and investor reporting for high-growth SaaS companies.',
        shortDescription: 'Advanced SaaS accounting for founders and finance teams',
        categoryId: category.id,
        level: 'advanced',
        duration: '6 weeks',
        estimatedHours: 48,
        price: 29700, // $297
        originalPrice: 39700, // $397
        instructor: 'David Kim, CPA, MBA',
        instructorBio: 'Former CFO at multiple unicorn SaaS companies with 12+ years in SaaS finance and accounting. Led IPO processes and managed investor relations at high-growth technology companies.',
        thumbnailUrl: '/images/courses/advanced-accounting-saas-businesses.jpg',
        orderIndex: 6,
        isPublished: true,
        isFeatured: true,
        skillsLearned: JSON.stringify([
          'Master ASC 606 revenue recognition for complex SaaS models',
          'Calculate and optimize key SaaS metrics (MRR, ARR, Churn, LTV)',
          'Implement proper deferred revenue accounting and automation',
          'Analyze unit economics and cohort performance',
          'Build sophisticated financial models and forecasts',
          'Create investor-grade financial reports and presentations'
        ]),
        targetAudience: 'SaaS founders, CFOs, finance teams, and controllers at growth-stage SaaS companies who need advanced accounting expertise for scaling operations and fundraising.',
      }
    });

    console.log('✅ Course 6 created successfully');

    // Week 1: Revenue Recognition (ASC 606)
    const week1 = await prisma.week.create({
      data: {
        courseId: course6.id,
        weekNumber: 1,
        title: 'Revenue Recognition (ASC 606)',
        overview: 'Master advanced revenue recognition principles for SaaS businesses under ASC 606, including performance obligations, contract modifications, and complex pricing arrangements.',
        learningObjectives: JSON.stringify([
          'Understand ASC 606 requirements for SaaS businesses',
          'Identify performance obligations in SaaS contracts',
          'Handle contract modifications and variable consideration',
          'Implement proper revenue recognition processes',
          'Navigate complex pricing arrangements and bundled services'
        ]),
        estimatedHours: 8
      }
    });

    const week1lessons = [
      {
        title: 'ASC 606 Fundamentals for SaaS Companies',
        slug: 'asc-606-fundamentals-saas',
        content: `# ASC 606 Fundamentals for SaaS Companies

## Introduction to ASC 606

ASC 606 (Revenue from Contracts with Customers) is the accounting standard that governs revenue recognition for all industries, including SaaS businesses. For SaaS companies, proper implementation of ASC 606 is crucial for compliance, investor confidence, and accurate financial reporting.

## The Five-Step Revenue Recognition Model

### Step 1: Identify the Contract with the Customer

**Contract Criteria for SaaS:**
- Commercial substance exists
- Parties have approved the contract
- Payment terms are identified
- Rights of parties are identified
- Collection is probable

**SaaS Contract Examples:**
\`\`\`
Valid SaaS Contract:
- Annual subscription agreement: $120,000
- Clear service terms: 12 months of software access
- Payment terms: Net 30
- Probability of collection: High (established customer)
- Status: Recognize revenue over 12 months

Invalid Contract Example:
- Month-to-month agreement with new startup
- Payment history: None
- Credit assessment: Poor
- Collection probability: Low
- Status: Do not recognize revenue until collection reasonably assured
\`\`\`

### Step 2: Identify Performance Obligations

**What is a Performance Obligation?**
A promise to transfer a good or service that is distinct.

**Common SaaS Performance Obligations:**
1. **Software License/Access**
   - Core platform functionality
   - User access and authentication
   - Data storage and security

2. **Implementation Services**
   - Setup and configuration
   - Data migration
   - Custom integrations

3. **Training Services**
   - User training sessions
   - Administrator certification
   - Best practices consultation

4. **Support Services**
   - Technical support
   - Customer success management
   - Regular product updates

**Distinct vs. Bundled Analysis:**
\`\`\`
Example: Enterprise SaaS Package ($100,000)

Component 1: Software License (12 months)
- Can customer benefit from this alone? Yes
- Is it separately identifiable? Yes
- Conclusion: Separate performance obligation

Component 2: Implementation Services
- Can customer benefit from this alone? No (needs software)
- Is it separately identifiable? Yes (distinct service)
- Conclusion: Separate performance obligation

Component 3: Ongoing Support
- Can customer benefit from this alone? No (needs software)
- Is it separately identifiable? No (integrated with software)
- Conclusion: Combined with software license
\`\`\`

### Step 3: Determine the Transaction Price

**Transaction Price Components:**
- Fixed consideration
- Variable consideration
- Financing components
- Non-cash consideration
- Consideration payable to customer

**Variable Consideration in SaaS:**

**Usage-Based Billing:**
\`\`\`
SaaS Company Example:
Base subscription: $10,000/month (fixed)
Usage overage: $0.10 per API call >100,000 calls

Transaction Price Estimation:
- Fixed component: $120,000 annually
- Variable component: Estimated based on historical usage
- Customer typically uses 150,000 calls/month
- Expected overage: 50,000 × $0.10 × 12 = $6,000
- Total estimated transaction price: $126,000

Constraint Analysis:
- Is overage highly probable? Yes (consistent usage pattern)
- Risk of reversal? Low (historical data supports estimate)
- Include in transaction price: Yes
\`\`\`

**Performance Bonuses:**
\`\`\`
Contract Terms:
- Base fee: $50,000
- Performance bonus: $10,000 if uptime >99.5%

Analysis:
- Historical uptime: 99.8%
- Achievement probability: Very high
- Reversal risk: Low
- Include bonus: Yes, $60,000 transaction price
\`\`\`

### Step 4: Allocate Transaction Price to Performance Obligations

**Allocation Methods:**
1. **Standalone Selling Price (SSP)** - Preferred method
2. **Residual approach** - When SSP not observable
3. **Expected cost plus margin** - For services

**SaaS Allocation Example:**
\`\`\`
Enterprise Package: $120,000

Performance Obligations & SSPs:
1. Software License (12 months): SSP = $100,000
2. Implementation Services: SSP = $30,000
3. Total SSPs: $130,000

Allocation:
Software License: ($100,000 ÷ $130,000) × $120,000 = $92,308
Implementation: ($30,000 ÷ $130,000) × $120,000 = $27,692

Revenue Recognition:
Software License: $92,308 ÷ 12 months = $7,692/month
Implementation: $27,692 recognized upon completion
\`\`\`

### Step 5: Recognize Revenue When Performance Obligation is Satisfied

**Timing of Recognition:**
- **Over time**: Performance obligation satisfied over time
- **Point in time**: Performance obligation satisfied at specific point

**SaaS Recognition Patterns:**

**Software as a Service (Over Time):**
\`\`\`
Criteria Met:
- Customer receives and consumes benefits simultaneously
- Company's performance creates an asset customer controls
- No alternative use for service

Recognition Method:
Time-based (straight-line over contract term)

Example:
Annual subscription: $120,000
Recognition: $10,000 per month for 12 months
\`\`\`

**Professional Services (Point in Time or Over Time):**
\`\`\`
Implementation Services Analysis:

Over Time Recognition (if):
- Customer controls asset as it's created
- No alternative use for service
- Right to payment for performance to date

Point in Time Recognition (if):
- Discrete deliverables
- Customer receives control at completion
- No ongoing benefit during performance

Example: Data Migration Service
- Control transfers upon completion
- Customer can't benefit until migration complete
- Recognition: Point in time at go-live
\`\`\`

## Complex SaaS Revenue Recognition Scenarios

### Multi-Element Arrangements

**Scenario: Complete SaaS Solution**
\`\`\`
Contract Details:
- Software Platform: 36 months @ $5,000/month = $180,000
- Custom Development: $75,000 (one-time)
- Training: $15,000 (delivered over 3 months)
- Premium Support: 36 months @ $1,000/month = $36,000
Total Contract: $306,000

Performance Obligations:
1. Software Platform (36 months)
2. Custom Development (point in time)
3. Training (over time - 3 months)
4. Premium Support (over time - 36 months)

SSP Analysis:
Software Platform: $6,000/month × 36 = $216,000
Custom Development: $90,000 (standalone rate)
Training: $20,000 (standalone rate)
Premium Support: $1,200/month × 36 = $43,200
Total SSPs: $369,200

Allocation:
Software: ($216,000 ÷ $369,200) × $306,000 = $179,000
Development: ($90,000 ÷ $369,200) × $306,000 = $74,600
Training: ($20,000 ÷ $369,200) × $306,000 = $16,600
Support: ($43,200 ÷ $369,200) × $306,000 = $35,800
Total: $306,000

Recognition Schedule:
Software: $179,000 ÷ 36 months = $4,972/month
Development: $74,600 when development complete
Training: $16,600 ÷ 3 months = $5,533/month (months 1-3)
Support: $35,800 ÷ 36 months = $994/month
\`\`\`

### Contract Modifications

**Type 1: New Performance Obligations at SSP**
\`\`\`
Original Contract:
Software License: $100,000 (12 months)

Modification (Month 6):
Add Premium Features: $50,000 (6 months remaining)
SSP of Premium Features: $10,000/month

Treatment:
- Separate contract for premium features
- New revenue recognition: $50,000 ÷ 6 months = $8,333/month
- Original contract unchanged
\`\`\`

**Type 2: Distinct Goods/Services Not at SSP**
\`\`\`
Original Contract: $120,000 (12 months)
Current Status: 4 months completed, $40,000 recognized

Modification (Month 4):
Additional Services: $30,000 (8 months remaining)
SSP would be: $40,000

Treatment:
- Prospective adjustment
- Remaining original: $80,000
- Additional services: $30,000
- Total to recognize: $110,000 over 8 months = $13,750/month
\`\`\`

### Variable Consideration and Constraints

**Usage-Based SaaS Revenue:**
\`\`\`
Pricing Model:
Base Platform: $20,000/month
API Calls: $0.05 per call above 500,000/month

Historical Usage Pattern:
Month 1-6: Average 750,000 calls/month
Month 7-12: Projected 800,000 calls/month

Variable Consideration Calculation:
Overage: 300,000 calls × $0.05 = $15,000/month
Annual overage estimate: $15,000 × 12 = $180,000

Constraint Analysis:
- Customer usage predictable? Yes (historical data)
- Risk of significant reversal? Low
- Include in transaction price? Yes

Monthly Recognition:
Base: $20,000
Variable: $15,000
Total: $35,000/month
\`\`\`

## Implementation Considerations

### Revenue Recognition Systems

**Required Capabilities:**
1. **Contract Management**
   - Store all contract terms
   - Track performance obligations
   - Monitor modifications

2. **SSP Management**
   - Maintain standalone selling prices
   - Update regularly based on sales data
   - Document pricing rationale

3. **Revenue Calculation**
   - Allocate transaction price
   - Calculate monthly recognition amounts
   - Handle variable consideration

4. **Reporting and Analytics**
   - ASC 606 compliance reports
   - Revenue waterfalls
   - Performance obligation schedules

**System Integration:**
\`\`\`
Data Flow Example:

CRM (Salesforce) → Contract Details
↓
Revenue Recognition System → Calculations
↓
ERP (NetSuite) → Journal Entries
↓
Financial Reports → Investor Reporting
\`\`\`

### Key Controls and Processes

**Contract Review Process:**
1. **Legal Review**
   - Contract terms and conditions
   - Performance obligation identification
   - Payment terms analysis

2. **Accounting Review**
   - ASC 606 compliance
   - Revenue recognition treatment
   - System setup requirements

3. **Ongoing Monitoring**
   - Contract modifications
   - Performance obligation satisfaction
   - Variable consideration updates

**Month-End Close Process:**
\`\`\`
Day 1-2: Contract Updates
- New contracts entered
- Modifications processed
- SSPs updated

Day 3-4: Revenue Calculations
- Performance obligation progress
- Variable consideration updates
- Recognition calculations

Day 5: Journal Entries
- Revenue recognition entries
- Deferred revenue adjustments
- Commission deferrals

Day 6: Review and Approval
- Management review
- Supporting documentation
- Final approval
\`\`\`

## Industry Best Practices

### Documentation Requirements

**Essential Documentation:**
1. **Revenue Recognition Memo**
   - Contract terms analysis
   - Performance obligation identification
   - SSP support
   - Recognition conclusion

2. **SSP Support**
   - Standalone pricing evidence
   - Market data analysis
   - Management estimates basis

3. **Modification Analysis**
   - Change description
   - Accounting treatment rationale
   - Impact calculation

### Common Implementation Challenges

**Challenge 1: Identifying Performance Obligations**
\`\`\`
Problem: Bundled software features
Question: Are premium features distinct?

Analysis Framework:
1. Can customer benefit from premium features alone?
   - Need base platform access
   - Answer: No

2. Are premium features distinct within contract?
   - Significantly modify/customize base platform
   - Answer: No

Conclusion: Single performance obligation
Recognition: Combined over subscription term
\`\`\`

**Challenge 2: Variable Consideration**
\`\`\`
Problem: Usage-based pricing uncertainty
Issue: High usage volatility

Solution:
1. Analyze historical patterns
2. Consider customer characteristics
3. Apply constraint testing
4. Document estimate basis
5. Update quarterly assessments
\`\`\`

### Compliance and Disclosure

**Financial Statement Impact:**
1. **Revenue Recognition**
   - Current vs. non-current deferred revenue
   - Contract assets and liabilities
   - Remaining performance obligations

2. **Cash Flow Classification**
   - Operating activities
   - Contract asset changes
   - Deferred revenue changes

**Disclosure Requirements:**
- Revenue disaggregation
- Contract balances
- Performance obligations
- Significant judgments

## Key Takeaways

- ASC 606 requires systematic approach to revenue recognition
- Performance obligation identification is critical for SaaS
- Variable consideration must be carefully estimated and constrained
- Contract modifications require specific accounting treatment
- Strong systems and controls are essential for compliance
- Regular updates and assessments ensure ongoing accuracy

Proper ASC 606 implementation provides foundation for accurate financial reporting, investor confidence, and sustainable growth in SaaS businesses.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 120
      },
      {
        title: 'Complex SaaS Revenue Scenarios and Implementation',
        slug: 'complex-saas-revenue-scenarios-implementation',
        content: `# Complex SaaS Revenue Scenarios and Implementation

## Advanced Revenue Recognition Scenarios

### Multi-Product SaaS Platforms

Many modern SaaS companies offer multiple products and services bundled together. Proper revenue recognition requires careful analysis of each component.

**Scenario 1: Integrated Platform Suite**
\`\`\`
TechCorp Platform Bundle - Annual Contract: $360,000

Components:
1. Core CRM Platform: $200,000 annually (SSP)
2. Marketing Automation: $120,000 annually (SSP)  
3. Analytics Dashboard: $60,000 annually (SSP)
4. Integration Setup: $30,000 one-time (SSP: $40,000)
Total SSPs: $420,000

Performance Obligation Analysis:
Core CRM: Can function independently ✓ Distinct
Marketing Auto: Requires CRM integration ✗ Not distinct alone
Analytics: Can function independently ✓ Distinct
Integration: Enhances all platforms ✗ Not distinct alone

Combined Performance Obligations:
1. CRM + Marketing + Integration: $350,000 SSP
2. Analytics: $60,000 SSP
Total Combined SSPs: $410,000

Allocation:
Combined Platform: ($350,000 ÷ $410,000) × $360,000 = $307,317
Analytics: ($60,000 ÷ $410,000) × $360,000 = $52,683

Recognition:
Combined Platform: $307,317 ÷ 12 months = $25,610/month
Analytics: $52,683 ÷ 12 months = $4,390/month
Total: $30,000/month
\`\`\`

### Usage-Based and Hybrid Models

**Scenario 2: Tiered Usage with Overages**
\`\`\`
CloudServices Inc. - Annual Contract

Base Tier: $50,000 (up to 1M API calls/month)
Overage: $0.05 per call above 1M
Premium Features: $20,000 annually

Customer Historical Usage:
Months 1-6: Average 1.5M calls (500K overage)
Months 7-12: Projected 1.8M calls (800K overage)

Variable Consideration Analysis:
Historical overage: 500K × $0.05 × 6 = $15,000
Projected overage: 800K × $0.05 × 6 = $24,000
Total estimated overage: $39,000

Constraint Testing:
- Usage pattern consistent? Yes
- Customer growth trajectory? Predictable
- Risk of significant reversal? Low
- Economic factors? Stable

Total Transaction Price:
Base Tier: $50,000
Premium Features: $20,000
Estimated Overage: $39,000
Total: $109,000

Recognition Pattern:
Fixed Components: ($70,000 ÷ 12) = $5,833/month
Variable Component: Recognized as incurred
Month 1-6: $15,000 ÷ 6 = $2,500/month additional
Month 7-12: $24,000 ÷ 6 = $4,000/month additional
\`\`\`

### Contract Modifications and Upgrades

**Scenario 3: Mid-Contract Upgrade**
\`\`\`
Original Contract (January 1):
Basic Plan: $100,000 annually
Term: 12 months

Modification (July 1):
Upgrade to Enterprise Plan
Additional consideration: $80,000 for remaining 6 months
Enterprise SSP: $200,000 annually ($100,000 for 6 months)

Modification Analysis:
Additional services: Distinct? Yes
Price vs. SSP: $80,000 vs. $100,000 SSP
Treatment: Prospective (not at SSP)

Accounting Treatment:
Original remaining: $100,000 × (6÷12) = $50,000
Additional consideration: $80,000
Total to recognize over 6 months: $130,000
New monthly amount: $130,000 ÷ 6 = $21,667

Journal Entries (July 1):
No entry required - prospective treatment

Monthly Recognition (July-December):
Dr. Deferred Revenue: $21,667
Cr. Revenue: $21,667
\`\`\`

### Revenue Recognition for SaaS Marketplaces

**Scenario 4: SaaS Marketplace Platform**
\`\`\`
MarketPlace Co. Business Model:

1. Platform hosting fee: $10,000/month from vendors
2. Transaction fees: 5% of GMV
3. Premium listing fees: $1,000/month per premium vendor
4. Professional services: Implementation and training

Revenue Streams Analysis:

Platform Hosting (Principal vs. Agent):
- Controls service before transfer to customer? Yes
- Primary responsibility for fulfillment? Yes  
- Inventory risk? Yes (server capacity)
- Pricing discretion? Yes
Conclusion: Principal - recognize gross revenue

Transaction Fees (Principal vs. Agent):
- Facilitates transactions between parties? Yes
- Controls goods/services? No
- Primary responsibility? No
- Fixed payment regardless of collection? No
Conclusion: Agent - recognize net fees

Premium Listings:
- Distinct service? Yes
- Over time or point in time? Over time (monthly benefit)
Recognition: $1,000/month per vendor

Professional Services:
- Distinct from platform? Yes
- Timing: Point in time (upon completion)
Recognition: When service complete
\`\`\`

## Implementation Systems and Processes

### Revenue Recognition Technology Stack

**Core System Requirements:**
1. **Contract Management Platform**
   - Salesforce CPQ
   - Oracle CPQ Cloud
   - Custom CRM integration

2. **Revenue Recognition Engine**
   - Zuora RevPro
   - Oracle Revenue Management Cloud
   - SAP RAR (Revenue Accounting and Reporting)

3. **Financial Reporting System**
   - NetSuite
   - Oracle ERP Cloud  
   - SAP S/4HANA

**Integration Architecture:**
\`\`\`
Data Flow:

CRM/CPQ → Contract Data
    ↓
Revenue Recognition System → Calculations
    ↓ (API Integration)
ERP System → Journal Entries
    ↓
Financial Reporting → Management/Investor Reports
    ↓
External Reporting → SEC Filings, Auditors
\`\`\`

### Automated Revenue Recognition Process

**Daily Processing:**
\`\`\`
Step 1: Data Synchronization (Automated)
- New contracts from CRM
- Contract modifications  
- Usage data from billing system
- Actual vs. estimated comparisons

Step 2: Revenue Calculations (Automated)
- Performance obligation progress
- Variable consideration updates
- Contract modification treatments
- Revenue allocation adjustments

Step 3: Journal Entry Generation (Automated)
- Revenue recognition entries
- Deferred revenue adjustments
- Contract asset/liability updates
- Commission deferral calculations

Step 4: Exception Management (Manual Review)
- Unusual contract terms
- Large modifications
- Significant estimate changes
- System calculation errors
\`\`\`

**Monthly Close Process:**
\`\`\`
Days 1-2: Contract Review and Updates
- Legal team: New contract review
- Sales ops: CRM data validation
- Accounting: ASC 606 compliance check
- IT: System synchronization

Days 3-4: Revenue Calculations
- Run automated calculations
- Review exception reports  
- Validate variable consideration
- Update estimates and constraints

Day 5: Journal Entries and Reconciliation
- Generate and post entries
- Reconcile sub-ledger to GL
- Prepare supporting schedules
- Document significant judgments

Days 6-7: Management Review and Approval
- Finance team review
- Management approval
- Auditor coordination (if required)
- Final close procedures
\`\`\`

### Key Performance Indicators (KPIs)

**Revenue Recognition KPIs:**
\`\`\`
Accuracy Metrics:
- Revenue reversals as % of recognized revenue: <1%
- Contract setup errors: <2%
- Manual adjustments as % of total: <5%

Efficiency Metrics:
- Average contract setup time: <4 hours
- Month-end close cycle time: <7 days
- Automation rate: >95%

Compliance Metrics:
- Control deficiencies: 0
- Management letter comments: 0
- Restatements: 0
\`\`\`

## Advanced Topics and Considerations

### International Revenue Recognition

**Multi-Currency Contracts:**
\`\`\`
Challenge: European customer contract in EUR

Contract Terms:
- Amount: €100,000 annually
- Payment terms: Quarterly in EUR
- Service: Global SaaS platform access

Exchange Rate Considerations:
Contract date (Jan 1): 1 EUR = 1.20 USD
Transaction price: €100,000 × 1.20 = $120,000

Recognition Approach:
Option 1: Translate monthly at spot rates
Option 2: Use contract date rate consistently

Recommendation: Spot rate translation
- More accurate economic reality
- Aligns with cash collection
- Standard practice for most companies

Monthly Recognition:
Revenue (USD): €8,333 × monthly spot rate
FX gain/loss: Record as separate line item
\`\`\`

### Revenue Recognition for Acquisitions

**Purchase Price Allocation Impact:**
\`\`\`
Scenario: SaaS Company Acquisition

Pre-Acquisition Revenue Recognition:
- Contracts at historical cost basis
- Deferred revenue at book value

Post-Acquisition Adjustments:
- Fair value customer relationships
- Fair value contract liabilities (deferred revenue)
- Impact on future revenue recognition

Example:
Historical deferred revenue: $2,000,000
Fair value assessment: $1,800,000
Adjustment: $200,000 reduction

Impact:
- Lower future revenue recognition
- Immediate P&L improvement
- Different margin profile going forward
\`\`\`

### Advanced Contract Terms

**Service Level Agreements (SLAs):**
\`\`\`
Contract with SLA Penalties:

Base Service: $100,000 annually
SLA Requirement: 99.9% uptime
Penalty: 10% monthly fee reduction for each 0.1% below

Revenue Recognition Considerations:
1. Is penalty a refund or discount?
2. Should reduce transaction price?
3. How to estimate penalties?

Analysis:
- Historical uptime: 99.95% (consistently above SLA)
- Penalty probability: Low
- Include penalty in constraint? No

Recognition: Full $100,000 over 12 months
Monitor: Monthly uptime to reassess estimates
\`\`\`

**Success Fees and Bonuses:**
\`\`\`
Implementation Service Contract:

Base Fee: $50,000
Success Bonus: $25,000 if delivered 30 days early
Go-live Bonus: $10,000 if zero critical issues first 30 days

Variable Consideration Analysis:
Early Delivery:
- Historical performance: 70% deliver early
- Include in transaction price: 70% × $25,000 = $17,500

Go-live Bonus:
- Historical success rate: 90%
- Include in transaction price: 90% × $10,000 = $9,000

Total Transaction Price: $76,500
Recognition: Upon service completion
\`\`\`

## Common Implementation Challenges and Solutions

### Challenge 1: System Integration Complexity

**Problem:**
- Multiple billing systems
- Legacy contract data
- Manual processes

**Solution Framework:**
\`\`\`
Phase 1: Data Cleanup (Months 1-2)
- Standardize contract formats
- Clean historical data
- Establish data governance

Phase 2: System Selection (Months 2-3)  
- RFP process for revenue system
- Integration requirements analysis
- Vendor selection and contracting

Phase 3: Implementation (Months 4-8)
- System configuration
- Data migration
- Integration development
- User acceptance testing

Phase 4: Go-Live and Optimization (Months 9-12)
- Parallel processing
- Issue resolution
- Process refinement
- Training and adoption
\`\`\`

### Challenge 2: Complex Contract Structures

**Problem:**
- Non-standard contract terms
- Unique pricing models
- Multiple performance obligations

**Solution:**
\`\`\`
Standardization Initiative:

1. Contract Template Development
- Standard terms and conditions
- Limited pricing model options
- Clear performance obligations

2. Sales Training Program
- ASC 606 impact awareness
- Approved contract variations
- Accounting consultation process

3. Review and Approval Process
- Legal review for compliance
- Accounting review for revenue impact
- Management approval for non-standard terms

4. System Configuration
- Template-based contract entry
- Pre-configured revenue treatments
- Exception handling workflows
\`\`\`

### Challenge 3: Variable Consideration Estimation

**Problem:**
- Unpredictable usage patterns
- New customer segments
- Economic volatility

**Solution Framework:**
\`\`\`
Estimation Methodology:

1. Data Analysis
- Historical usage patterns
- Customer segmentation
- Economic indicator correlation

2. Constraint Application
- Conservative estimation approach
- Regular reassessment process
- Documented judgement basis

3. Monitoring and Updates
- Monthly usage tracking
- Quarterly estimate updates
- Annual methodology review

4. Controls and Documentation
- Management review of estimates
- Supporting analysis documentation
- Audit trail maintenance
\`\`\`

## Key Takeaways

- Complex SaaS scenarios require careful analysis of performance obligations
- System integration is critical for scalable revenue recognition
- Process automation reduces errors and improves efficiency
- Regular monitoring and updates ensure ongoing compliance
- Strong controls and documentation support audit and regulatory requirements
- Standardization initiatives reduce complexity and implementation costs

Successful ASC 606 implementation for complex SaaS businesses requires combination of proper accounting analysis, robust technology systems, and strong operational processes.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 130
      }
    ];

    for (const lessonData of week1lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          weekId: week1.id
        }
      });
    }

    // Week 1 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week1.id,
        title: 'ASC 606 Revenue Recognition Mastery Quiz',
        description: 'Test your understanding of ASC 606 revenue recognition principles and complex SaaS scenarios',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 30,
        questions: {
          create: [
            {
              questionText: 'Under ASC 606, which step involves determining whether promises in a contract are distinct?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Step 1: Identify the contract with the customer',
                'Step 2: Identify the performance obligations in the contract',
                'Step 3: Determine the transaction price',
                'Step 4: Allocate the transaction price to performance obligations'
              ]),
              correctAnswer: 'Step 2: Identify the performance obligations in the contract',
              explanation: 'Step 2 of ASC 606 requires identifying performance obligations by determining which promises in the contract are distinct goods or services.',
              orderIndex: 1
            },
            {
              questionText: 'A SaaS company has a $120,000 annual contract with software ($100,000 SSP) and implementation ($40,000 SSP). How should the transaction price be allocated?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Software: $85,714, Implementation: $34,286',
                'Software: $100,000, Implementation: $20,000', 
                'Software: $80,000, Implementation: $40,000',
                'Software: $60,000, Implementation: $60,000'
              ]),
              correctAnswer: 'Software: $85,714, Implementation: $34,286',
              explanation: 'Allocation based on relative SSPs: Software ($100k ÷ $140k total SSP) × $120k = $85,714; Implementation ($40k ÷ $140k) × $120k = $34,286.',
              orderIndex: 2
            },
            {
              questionText: 'When should variable consideration be included in the transaction price under ASC 606?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Always include the maximum possible amount',
                'Only when payment is guaranteed',
                'When it is highly probable that inclusion will not result in significant revenue reversal',
                'Never include variable consideration'
              ]),
              correctAnswer: 'When it is highly probable that inclusion will not result in significant revenue reversal',
              explanation: 'ASC 606 requires applying the constraint to variable consideration - include only amounts that are highly probable not to result in significant reversal when uncertainty resolves.',
              orderIndex: 3
            },
            {
              questionText: 'A SaaS contract modification adds new services at a price below their standalone selling price. How should this be treated?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Terminate original contract and create new contract',
                'Treat as separate contract',
                'Prospective adjustment to remaining performance obligations',
                'Retrospective adjustment to entire contract'
              ]),
              correctAnswer: 'Prospective adjustment to remaining performance obligations',
              explanation: 'When contract modifications involve distinct goods/services not priced at SSP, treat as prospective adjustment by reallocating remaining consideration over remaining performance obligations.',
              orderIndex: 4
            },
            {
              questionText: 'For SaaS companies, when is revenue typically recognized over time rather than at a point in time?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'When the software is delivered to the customer',
                'When the customer receives and consumes benefits simultaneously',
                'When payment is received in advance',
                'When the contract is signed'
              ]),
              correctAnswer: 'When the customer receives and consumes benefits simultaneously',
              explanation: 'SaaS revenue is typically recognized over time because customers receive and consume benefits simultaneously as the company provides ongoing access to the software platform.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 1 created with 2 lessons and 1 quiz');

    // Continue with additional weeks...
    console.log('✅ Course 6: Advanced Accounting for SaaS Businesses created successfully (Week 1 only for now)!');
    console.log(`📚 Course ID: ${course6.id}`);
    console.log('🎯 Next: Add remaining weeks 2-6 with comprehensive SaaS accounting content');

  } catch (error) {
    console.error('❌ Error creating Course 6:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCourse6();