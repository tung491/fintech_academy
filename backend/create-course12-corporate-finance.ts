import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse12() {
  console.log('🚀 Creating Course 12: Corporate Finance for Scale-ups...');

  try {
    // Create instructor
    const instructor = await prisma.instructor.upsert({
      where: { id: 12 },
      update: {},
      create: {
        id: 12,
        name: "Patricia Williams",
        title: "Former CFO & Corporate Finance Expert",
        bio: "Patricia Williams is a seasoned finance executive with 20+ years of experience scaling tech companies from Series A to IPO. As former CFO of three successful tech companies (including two IPOs), she has deep expertise in corporate finance, FP&A, and public company requirements. Patricia holds an MBA from Wharton and CPA certification, and currently serves on the boards of multiple high-growth startups.",
        profileImage: "/api/placeholder/150/150",
        credentials: ["MBA Wharton School", "CPA Certified", "Former CFO of 3 Tech Companies", "2 Successful IPO Experiences", "20+ Years Corporate Finance"],
        expertise: ["Corporate Finance", "FP&A", "Budget & Variance Analysis", "Working Capital Management", "Debt Financing", "IPO Preparation", "Public Company Finance"]
      }
    });

    // Create course
    const course = await prisma.course.upsert({
      where: { id: 12 },
      update: {},
      create: {
        id: 12,
        title: "Corporate Finance for Scale-ups",
        description: "Master advanced corporate finance for growing tech companies from Series A to IPO. Learn FP&A, budget management, working capital optimization, debt financing, and public company preparation. Essential for finance teams at scaling startups.",
        longDescription: `This comprehensive 5-week course covers advanced corporate finance topics essential for scaling tech companies from Series A through IPO. You'll master financial planning and analysis (FP&A), budget creation and variance analysis, working capital management, debt financing strategies, and IPO preparation requirements.

**What You'll Learn:**
• Build sophisticated FP&A processes and financial planning systems
• Create and manage budgets with comprehensive variance analysis
• Optimize working capital and cash flow for scaling operations
• Navigate debt financing options and credit facilities
• Understand IPO requirements and public company finance standards
• Implement corporate finance best practices for high-growth environments

**Course Features:**
• Real case studies from successful tech company scale-ups
• FP&A templates and budget modeling frameworks
• Working capital optimization tools and techniques
• Debt financing term sheets and negotiation strategies
• IPO preparation checklists and compliance requirements
• Guest sessions with current CFOs and finance leaders

**Ideal For:**
• Finance teams at Series A+ tech companies
• CFOs and finance leaders at growing startups
• Controllers and FP&A professionals in tech
• Entrepreneurs preparing for institutional growth capital
• Anyone involved in scaling finance operations at tech companies`,
        thumbnailUrl: "/api/placeholder/400/250",
        weekCount: 5,
        totalHours: 40,
        difficulty: "Advanced",
        price: 297,
        published: true,
        featured: true,
        instructorId: instructor.id,
        categoryId: 2 // Advanced Finance category
      }
    });

    console.log(`✅ Course created: ${course.title}`);

    // Week 1: Financial Planning and Analysis (FP&A)
    const week1 = await prisma.week.create({
      data: {
        weekNumber: 1,
        title: "Financial Planning and Analysis (FP&A)",
        description: "Build comprehensive FP&A processes, create financial models for decision-making, and establish reporting systems for scaling tech companies.",
        learningObjectives: [
          "Understand the role of FP&A in scaling organizations",
          "Build comprehensive financial planning processes",
          "Create dynamic financial models for decision support",
          "Establish KPI frameworks and reporting systems",
          "Implement scenario planning and sensitivity analysis"
        ],
        estimatedHours: 8,
        orderIndex: 1,
        courseId: course.id,
        published: true
      }
    });

    // Week 1 Lessons
    await prisma.lesson.createMany({
      data: [
        {
          title: "Building FP&A Foundations for Scale-ups",
          content: `# Building FP&A Foundations for Scale-ups

## The Strategic Role of FP&A in Growing Tech Companies

Financial Planning and Analysis (FP&A) transforms from a support function to a strategic driver as tech companies scale from Series A through IPO. This lesson establishes the foundation for building world-class FP&A capabilities.

### Understanding FP&A Evolution by Stage

**Series A Stage (10-50 employees)**
- Basic financial reporting and cash management
- Simple budget creation and tracking
- Founder-led financial decision making
- Limited financial systems and processes
- Focus on runway extension and growth metrics

**Series B/C Stage (50-200 employees)**
- Dedicated FP&A function establishment
- Advanced financial modeling and forecasting
- Board-level financial reporting and analysis
- Department-level budget management
- Investor reporting and compliance

**Pre-IPO/Growth Stage (200+ employees)**
- Sophisticated FP&A organization
- Real-time financial analytics and dashboards
- Complex scenario modeling and planning
- Integration with operational systems
- Public company reporting preparation

### Core FP&A Functions

**1. Financial Planning**
- Annual operating plans and budgets
- Long-term strategic planning (3-5 years)
- Scenario analysis and contingency planning
- Capital allocation and investment decisions
- Resource planning and headcount modeling

**2. Performance Analysis**
- Variance analysis and explanations
- KPI monitoring and trend analysis
- Business driver identification and tracking
- Competitive benchmarking and analysis
- Root cause analysis of performance gaps

**3. Forecasting and Projections**
- Rolling forecasts (quarterly/monthly updates)
- Cash flow projections and management
- Revenue and expense modeling
- Seasonal and cyclical pattern analysis
- Risk-adjusted probability modeling

**4. Decision Support**
- Investment evaluation and ROI analysis
- Pricing strategy and margin analysis
- Make-vs-buy and build-vs-partner decisions
- Market entry and expansion analysis
- M&A financial modeling and integration

### Building Your FP&A Team

**Organizational Structure**

**Small Team (1-3 people):**
- FP&A Manager/Director (generalist)
- Financial Analyst (modeling focus)
- Part-time Controller support

**Medium Team (4-8 people):**
- VP/Director of FP&A
- Senior Manager FP&A
- Financial Analysts (2-3)
- Business Intelligence Analyst
- FP&A Operations Specialist

**Large Team (8+ people):**
- VP Finance & Strategy
- Director FP&A
- Senior Managers (Revenue, OpEx, Strategic)
- Financial Analysts (specialized by function)
- Business Intelligence team
- Corporate Development support

### FP&A Technology Stack

**Core Systems**
- **Planning Software**: Anaplan, Adaptive Insights, or Pigment
- **BI/Analytics**: Tableau, Looker, or Power BI
- **Modeling**: Excel/Google Sheets with API connections
- **ERP Integration**: NetSuite, QuickBooks, or SAP
- **Data Warehouse**: Snowflake, BigQuery, or Redshift

**Advanced Capabilities**
- Real-time data pipelines and automation
- Machine learning for forecasting
- Self-service analytics for business teams
- Integrated planning across all functions
- Mobile dashboards and reporting

### Key Metrics and KPIs for Tech Scale-ups

**Growth Metrics**
- Monthly/Annual Recurring Revenue (MRR/ARR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Net Revenue Retention (NRR)
- Gross Revenue Retention (GRR)

**Efficiency Metrics**
- CAC Payback Period
- LTV/CAC Ratio
- Sales Efficiency (Magic Number)
- Rule of 40 (Growth Rate + Profit Margin)
- Gross Margin and Unit Economics

**Financial Health Metrics**
- Cash Burn Rate and Runway
- Working Capital Management
- Debt Service Coverage
- Current Ratio and Liquidity
- Revenue per Employee

### Financial Modeling Best Practices

**Model Architecture**
- Separate input, calculation, and output sheets
- Clear assumptions documentation
- Scenario and sensitivity analysis
- Error checking and validation
- Version control and change tracking

**Revenue Modeling**
- Bottom-up sales capacity modeling
- Customer cohort analysis
- Pricing and packaging optimization
- Churn and expansion modeling
- Seasonal adjustment factors

**Expense Modeling**
- Headcount planning with ramping
- Variable cost analysis
- Fixed cost categorization
- One-time vs. recurring expenses
- Geographic cost variations

### Reporting and Communication

**Board Reporting**
- Executive summary and key insights
- Variance analysis and explanations
- Forward-looking guidance updates
- Key metric trends and drivers
- Action plans and next steps

**Management Reporting**
- Department-level performance
- Project and initiative tracking
- Resource utilization analysis
- Exception reporting and alerts
- Operational metric integration

**Investor Communications**
- Quarterly earnings preparation
- Investor day presentations
- Due diligence support
- Covenant compliance reporting
- Strategic initiative updates

### Common FP&A Challenges and Solutions

**Data Quality Issues**
- **Challenge**: Inconsistent data across systems
- **Solution**: Data governance and validation processes
- **Implementation**: Automated data quality checks

**Resource Constraints**
- **Challenge**: Limited FP&A team capacity
- **Solution**: Process automation and self-service tools
- **Implementation**: Invest in technology and training

**Stakeholder Alignment**
- **Challenge**: Conflicting priorities and interpretations
- **Solution**: Clear communication and shared metrics
- **Implementation**: Regular business review meetings

## Practical Implementation

### FP&A Process Framework

**Monthly Process (Days 1-10 of following month)**
1. **Data Collection** (Days 1-3)
   - Actuals consolidation from all systems
   - Variance analysis preparation
   - KPI calculation and validation

2. **Analysis and Insights** (Days 4-7)
   - Performance driver analysis
   - Variance explanations
   - Trend identification
   - Forecast updates

3. **Reporting and Communication** (Days 8-10)
   - Management report preparation
   - Department reviews and discussions
   - Action plan development
   - Stakeholder communication

**Quarterly Process (Month 3 of quarter)**
- Comprehensive forecast updates
- Board reporting preparation
- Strategic initiative reviews
- Annual plan adjustments

**Annual Process (Q4 of previous year)**
- Operating plan development
- Budget allocation and approval
- Strategic planning integration
- Goal setting and alignment

### Technology Implementation Roadmap

**Phase 1 (Months 1-3): Foundation**
- Implement core planning software
- Establish data connections
- Create basic reporting templates
- Train team on new processes

**Phase 2 (Months 4-6): Enhancement**
- Advanced modeling capabilities
- Self-service analytics deployment
- Automated reporting setup
- Integration with operational systems

**Phase 3 (Months 7-12): Optimization**
- Machine learning integration
- Real-time analytics deployment
- Mobile access enablement
- Advanced visualization tools

## Action Items

- [ ] Assess current FP&A maturity and gaps
- [ ] Design organizational structure for your scale
- [ ] Select and implement core technology stack
- [ ] Establish key metrics and KPI framework
- [ ] Create monthly FP&A process calendar`,
          slug: "building-fpa-foundations-scale-ups",
          weekId: week1.id,
          orderIndex: 1,
          estimatedMinutes: 90,
          published: true
        },
        {
          title: "Advanced Financial Modeling for Corporate Decision Making",
          content: `# Advanced Financial Modeling for Corporate Decision Making

## Strategic Financial Models for Scaling Organizations

Corporate financial modeling for scale-ups requires sophisticated approaches that can handle complex business dynamics, multiple scenarios, and strategic decision support at the executive level.

### Corporate Model Architecture

**Integrated Planning Model Structure**
- Executive Summary Dashboard
- Revenue Planning Module
- Headcount and Compensation Planning
- Expense Planning by Department
- Capital Expenditure Planning
- Cash Flow and Working Capital
- Scenario Analysis Framework
- Sensitivity Testing Tools

### Revenue Modeling for Complex Businesses

**Multi-Product Revenue Streams**

**SaaS Product Lines**
\`\`\`
Product A Revenue = Customers × Price × (1 - Churn Rate)
Product B Revenue = Usage × Unit Price × Growth Factor
Product C Revenue = Seats × Price per Seat × Expansion Rate
\`\`\`

**Revenue Recognition Complexity**
- ASC 606 compliance for multi-element arrangements
- Deferred revenue calculation and tracking
- Professional services vs. product revenue
- International revenue recognition standards
- Performance obligation allocation

**Customer Segmentation Modeling**
- Enterprise vs. Mid-Market vs. SMB dynamics
- Geographic market modeling
- Industry vertical analysis
- Customer lifecycle value modeling
- Cross-sell and upsell opportunity quantification

### Operating Expense Modeling

**Headcount Planning Sophistication**

**Department-Level Modeling**
- Role-based hiring plans with ramp times
- Geographic compensation variations
- Equity compensation dilution impact
- Benefits and tax burden calculations
- Contractor vs. employee cost analysis

**Sales Team Modeling**
\`\`\`
Sales Headcount = (Revenue Target ÷ Average Rep Productivity)
Ramping Factor = (% of Reps at Full Productivity)
Total Capacity = (Mature Reps × Full Quota) + (Ramping Reps × Partial Quota)
\`\`\`

**R&D Investment Planning**
- Product development lifecycle costs
- Feature prioritization and resource allocation
- Technical debt and infrastructure investments
- Innovation pipeline investment requirements
- Regulatory compliance and security costs

### Capital Allocation Modeling

**Investment Decision Framework**

**Technology Infrastructure**
- Scalability requirement analysis
- Security and compliance investments
- Platform migration and modernization
- Data infrastructure and analytics
- Automation and process improvement

**Market Expansion**
- Geographic expansion cost modeling
- Product line extension analysis
- Customer acquisition channel investments
- Partnership and alliance investments
- Regulatory and compliance requirements

**M&A Integration Modeling**
- Acquisition target financial analysis
- Integration cost estimation
- Synergy identification and quantification
- Cultural and operational fit assessment
- Post-acquisition performance tracking

### Working Capital Management

**Advanced Cash Flow Modeling**

**Collections Modeling**
- Customer payment term analysis
- Collection effectiveness tracking
- Bad debt reserve calculations
- Currency hedging impact
- Seasonal cash flow patterns

**Vendor Payment Optimization**
- Payment term negotiation impact
- Early payment discount analysis
- Supply chain financing opportunities
- Vendor relationship management
- Working capital facility utilization

### Scenario Planning and Stress Testing

**Multi-Dimensional Scenarios**

**Market Scenarios**
- Economic recession impact (30% demand reduction)
- Competitive disruption response
- Regulatory change adaptation
- Technology shift implications
- Customer concentration risk events

**Operational Scenarios**
- Key talent retention challenges
- Technology platform failures
- Supply chain disruptions
- Cybersecurity incident response
- Merger integration complexities

**Financial Scenarios**
- Interest rate change impacts
- Credit availability constraints
- Currency fluctuation effects
- Funding delay consequences
- Covenant compliance risks

### Performance Attribution Analysis

**Revenue Performance Drivers**
- Price vs. Volume impact analysis
- Customer acquisition vs. expansion growth
- Geographic performance attribution
- Product line contribution analysis
- Sales channel effectiveness measurement

**Cost Performance Analysis**
- Fixed vs. variable cost behavior
- Department efficiency measurements
- Technology ROI quantification
- Process improvement impact
- Vendor cost optimization results

### Advanced Modeling Techniques

**Monte Carlo Simulation**
- Revenue range probability analysis
- Cost uncertainty quantification
- Cash flow risk assessment
- Investment return distributions
- Strategic option valuation

**Regression Analysis**
- Key driver identification
- Predictive model development
- Seasonality adjustment
- Trend extrapolation
- Correlation analysis

**Machine Learning Integration**
- Automated forecasting algorithms
- Anomaly detection systems
- Customer behavior prediction
- Dynamic pricing optimization
- Resource allocation optimization

### Model Governance and Control

**Model Validation**
- Back-testing accuracy measurement
- Assumption reasonableness testing
- Sensitivity analysis validation
- Peer benchmark comparison
- Expert review and sign-off

**Change Management**
- Version control systems
- Change documentation requirements
- User access controls
- Model update procedures
- Training and certification programs

### Reporting and Visualization

**Executive Dashboards**
- Key metric summarization
- Trend analysis visualization
- Exception reporting alerts
- Drill-down capability
- Mobile accessibility

**Board Reporting Integration**
- Strategic metric alignment
- Variance explanation automation
- Forward guidance support
- Risk assessment inclusion
- Action plan integration

### Technology and Tools

**Enterprise Planning Platforms**
- **Anaplan**: Advanced modeling and scenario analysis
- **Adaptive Insights**: Integrated planning and reporting
- **Pigment**: Modern FP&A platform with collaboration
- **Oracle Planning**: Enterprise-scale planning suite
- **IBM Planning Analytics**: Advanced analytics integration

**Modeling Enhancement Tools**
- **Python/R**: Advanced analytics and automation
- **Tableau/Power BI**: Advanced visualization
- **Snowflake/BigQuery**: Data warehouse integration
- **Zapier/Integromat**: Process automation
- **Git**: Model version control

### Common Modeling Pitfalls

**Technical Issues**
- Over-complexity reducing usability
- Insufficient documentation
- Poor error checking and validation
- Inadequate scenario coverage
- Technology dependency risks

**Business Issues**
- Disconnection from operational reality
- Insufficient stakeholder input
- Poor assumption validation
- Inadequate sensitivity testing
- Infrequent model updates

## Practical Implementation

### Model Development Process

**Phase 1: Requirements Gathering**
- Stakeholder interview process
- Use case definition
- Data requirement specification
- Technology constraint identification
- Success criteria establishment

**Phase 2: Architecture Design**
- Model structure planning
- Data flow design
- User interface requirements
- Integration specifications
- Performance requirements

**Phase 3: Development and Testing**
- Module development and testing
- Integration testing
- User acceptance testing
- Performance optimization
- Documentation creation

**Phase 4: Deployment and Training**
- Production deployment
- User training delivery
- Process documentation
- Support system establishment
- Continuous improvement planning

### Key Success Factors

**Technical Excellence**
- Robust architecture and design
- Comprehensive testing and validation
- Clear documentation and training
- Regular maintenance and updates
- Technology roadmap alignment

**Business Integration**
- Strong stakeholder engagement
- Clear business purpose alignment
- Regular usage and feedback
- Continuous process improvement
- Strategic value demonstration

## Action Items

- [ ] Design integrated corporate planning model architecture
- [ ] Implement advanced revenue and expense modeling techniques
- [ ] Establish scenario planning and stress testing framework
- [ ] Create comprehensive model governance processes
- [ ] Deploy executive reporting and visualization tools`,
          slug: "advanced-financial-modeling-corporate-decisions",
          weekId: week1.id,
          orderIndex: 2,
          estimatedMinutes: 95,
          published: true
        }
      ]
    });

    // Week 1 Quiz
    await prisma.quiz.create({
      data: {
        title: "FP&A Foundations and Financial Modeling",
        description: "Test your understanding of FP&A processes, organizational structure, and advanced financial modeling for corporate decision making.",
        weekId: week1.id,
        timeLimit: 30,
        passingScore: 70,
        questions: {
          create: [
            {
              questionText: "What is the primary role of FP&A in Series B/C stage companies compared to Series A?",
              questionType: "multiple-choice",
              options: [
                "Basic cash management and simple budgets",
                "Dedicated FP&A function with advanced modeling and board reporting",
                "Founder-led financial decisions only",
                "Focus solely on fundraising support"
              ],
              correctAnswer: "Dedicated FP&A function with advanced modeling and board reporting",
              explanation: "Series B/C companies establish dedicated FP&A functions with advanced modeling, forecasting, board-level reporting, and department-level budget management, moving beyond the basic financial management of Series A stage.",
              orderIndex: 1
            },
            {
              questionText: "Which technology is most essential for building scalable FP&A processes?",
              questionType: "multiple-choice",
              options: [
                "Basic Excel spreadsheets only",
                "Planning software integrated with BI/Analytics platforms",
                "Manual reporting processes",
                "Simple accounting software"
              ],
              correctAnswer: "Planning software integrated with BI/Analytics platforms",
              explanation: "Scalable FP&A requires planning software (Anaplan, Adaptive) integrated with BI platforms (Tableau, Looker) to handle complex modeling, real-time data, and automated reporting.",
              orderIndex: 2
            },
            {
              questionText: "What is the 'Rule of 40' metric used to evaluate?",
              questionType: "multiple-choice",
              options: [
                "Customer acquisition cost efficiency",
                "Overall business health combining growth rate and profit margin",
                "Employee productivity ratios",
                "Working capital management"
              ],
              correctAnswer: "Overall business health combining growth rate and profit margin",
              explanation: "The Rule of 40 states that a company's growth rate plus profit margin should exceed 40%, providing a balanced view of growth efficiency and profitability for tech scale-ups.",
              orderIndex: 3
            },
            {
              questionText: "In advanced financial modeling, what is the primary purpose of Monte Carlo simulation?",
              questionType: "multiple-choice",
              options: [
                "To create single-point forecasts",
                "To analyze probability distributions and risk ranges",
                "To simplify complex calculations",
                "To replace scenario analysis"
              ],
              correctAnswer: "To analyze probability distributions and risk ranges",
              explanation: "Monte Carlo simulation uses random sampling to analyze probability distributions of outcomes, helping quantify uncertainty and risk ranges in financial projections.",
              orderIndex: 4
            },
            {
              questionText: "What should be the primary focus when building revenue models for multi-product SaaS companies?",
              questionType: "multiple-choice",
              options: [
                "Using simple linear growth assumptions",
                "Modeling each product line separately with specific metrics",
                "Focusing only on total revenue numbers",
                "Ignoring customer segmentation"
              ],
              correctAnswer: "Modeling each product line separately with specific metrics",
              explanation: "Multi-product SaaS companies need separate modeling for each product line with specific metrics (churn, expansion, pricing) to accurately forecast and understand business drivers.",
              orderIndex: 5
            }
          ]
        },
        published: true
      }
    });

    // Week 2: Budget Creation and Variance Analysis
    const week2 = await prisma.week.create({
      data: {
        weekNumber: 2,
        title: "Budget Creation and Variance Analysis",
        description: "Master comprehensive budgeting processes, variance analysis techniques, and performance management systems for scaling tech companies.",
        learningObjectives: [
          "Develop comprehensive budgeting frameworks and processes",
          "Implement zero-based and driver-based budgeting methods",
          "Create sophisticated variance analysis and reporting systems",
          "Build rolling forecast processes and dynamic planning",
          "Establish budget governance and accountability frameworks"
        ],
        estimatedHours: 8,
        orderIndex: 2,
        courseId: course.id,
        published: true
      }
    });

    // Week 2 Lessons
    await prisma.lesson.createMany({
      data: [
        {
          title: "Strategic Budget Planning and Development",
          content: `# Strategic Budget Planning and Development

## Advanced Budgeting for Scaling Tech Companies

Strategic budgeting transforms from simple expense tracking to comprehensive resource allocation and performance management as tech companies scale. This lesson covers sophisticated budgeting methodologies essential for corporate finance excellence.

### Evolution of Budgeting by Company Stage

**Series A Stage: Foundation Budgeting**
- Simple departmental expense budgets
- Cash runway focus and burn rate management
- Quarterly budget updates and revisions
- Founder and leadership team approval
- Limited variance analysis and reporting

**Series B/C Stage: Structured Budgeting**
- Comprehensive departmental budgets
- Zero-based budgeting implementation
- Monthly variance analysis and reporting
- Board-level budget presentations
- Department head accountability systems

**Growth/Pre-IPO Stage: Enterprise Budgeting**
- Integrated planning across all functions
- Rolling forecasts and dynamic planning
- Advanced variance analysis and attribution
- Public company preparation standards
- Sophisticated governance and controls

### Budgeting Methodologies

**1. Traditional Incremental Budgeting**

**Process Overview**
- Start with prior year actual results
- Apply growth rates and inflation adjustments
- Add incremental investments and changes
- Review and approve department by department
- Simple but may perpetuate inefficiencies

**When to Use**
- Stable business environments
- Limited resources for comprehensive planning
- Incremental business model changes
- Short-term tactical planning

**2. Zero-Based Budgeting (ZBB)**

**Core Principles**
- Start from zero for each budget cycle
- Justify every expense and investment
- Link spending to strategic priorities
- Challenge existing assumptions
- Focus on value creation and ROI

**Implementation Process**
1. **Decision Package Creation**
   - Define specific activities and outcomes
   - Identify resource requirements
   - Calculate costs and benefits
   - Establish performance metrics

2. **Priority Ranking**
   - Rank packages by strategic importance
   - Consider resource constraints
   - Evaluate cross-functional dependencies
   - Balance short-term vs. long-term needs

3. **Resource Allocation**
   - Allocate resources to highest priority packages
   - Ensure strategic alignment
   - Maintain flexibility for adjustments
   - Document decision rationale

**Benefits and Challenges**

*Benefits:*
- Forces strategic thinking and prioritization
- Eliminates outdated or ineffective spending
- Improves cost consciousness
- Aligns spending with strategic priorities

*Challenges:*
- Time-intensive process
- Requires significant management commitment
- May create analysis paralysis
- Can be disruptive to ongoing operations

**3. Driver-Based Budgeting**

**Key Business Drivers**
- Revenue per customer/user
- Customer acquisition and churn rates
- Productivity metrics per employee
- Capacity utilization rates
- Technology scalability factors

**Model Structure**
\`\`\`
Department Budget = Base Cost + (Volume Driver × Variable Rate)

Example - Customer Success Budget:
Base Team Cost: $500K (core team of 5)
Variable Cost: $15K per 100 customers
Total Budget = $500K + (Customer Count ÷ 100 × $15K)
\`\`\`

**Implementation Steps**
1. Identify key business and operational drivers
2. Establish relationships between drivers and costs
3. Create driver-based budget formulas
4. Validate relationships with historical data
5. Build scenario models based on driver changes

### Comprehensive Budget Components

**Revenue Planning**

**Sales Team Capacity Model**
\`\`\`
Sales Capacity = Number of Reps × Quota per Rep × Achievement Rate
New Rep Ramp: Month 1-2 (0%), Month 3-6 (50%), Month 7+ (100%)
Blended Achievement: 85% of quota (industry average)
\`\`\`

**Marketing Investment Planning**
- Customer acquisition cost (CAC) by channel
- Marketing qualified lead (MQL) conversion rates
- Content and brand investment allocation
- Event and conference budget planning
- Marketing technology stack costs

**Product Development Budgeting**
- Feature development prioritization
- Platform and infrastructure investments
- Security and compliance requirements
- Technical debt and maintenance
- Innovation and R&D initiatives

**Operating Expense Categories**

**People Costs (60-70% of total)**
- Base salaries and hourly wages
- Variable compensation and bonuses
- Equity compensation (stock options/RSUs)
- Benefits and payroll taxes
- Contractor and consultant fees

**Technology Costs (15-25% of total)**
- Cloud infrastructure and hosting
- Software licenses and subscriptions
- Development and productivity tools
- Security and compliance platforms
- Data and analytics infrastructure

**Facilities and Operations (5-15% of total)**
- Office rent and utilities
- Furniture and equipment
- Travel and entertainment
- Legal and professional services
- Insurance and risk management

### Advanced Budget Planning Techniques

**Rolling Forecasts**

**Process Design**
- Update forecasts monthly or quarterly
- Maintain 12-18 month forward visibility
- Focus on trend analysis and adjustments
- Integrate with annual planning process
- Emphasize agility and responsiveness

**Benefits Over Static Budgets**
- More accurate financial predictions
- Better resource allocation decisions
- Improved cash flow management
- Enhanced strategic agility
- Reduced time spent on annual planning

**Scenario Planning Integration**

**Three-Scenario Framework**
1. **Conservative (70% probability)**
   - Lower growth assumptions
   - Higher cost scenarios
   - Extended sales cycles
   - Market headwinds consideration

2. **Base Case (expected outcome)**
   - Most likely business performance
   - Balanced growth and investment
   - Normal market conditions
   - Realistic execution assumptions

3. **Optimistic (15-20% probability)**
   - Accelerated growth scenarios
   - Market expansion opportunities
   - Competitive advantage realization
   - Exceptional execution results

**Resource Allocation Strategy**
- Budget conservatively (base case)
- Plan investments optimistically
- Maintain contingency reserves
- Create trigger points for adjustments

### Budget Governance and Process

**Organizational Roles and Responsibilities**

**Executive Leadership**
- Strategic direction and priorities
- Resource allocation decisions
- Cross-functional trade-offs
- Board communication and reporting

**FP&A Team**
- Process design and management
- Model development and maintenance
- Analysis and variance reporting
- Training and support for departments

**Department Heads**
- Budget development and justification
- Resource requirement planning
- Performance accountability
- Variance explanation and action plans

**Budget Calendar and Milestones**

**Annual Planning Process (Q4)**
- **Week 1-2**: Strategic planning and guidance
- **Week 3-6**: Department budget development
- **Week 7-8**: Cross-functional review and alignment
- **Week 9-10**: Executive review and refinement
- **Week 11-12**: Board review and final approval

**Quarterly Updates**
- **Month 1**: Forecast update and variance analysis
- **Month 2**: Department reviews and adjustments
- **Month 3**: Board reporting and guidance updates

**Monthly Process**
- **Week 1**: Data collection and variance analysis
- **Week 2**: Department reviews and explanations
- **Week 3**: Management reporting and discussions
- **Week 4**: Action planning and course corrections

### Budget Technology and Tools

**Budgeting Software Platforms**

**Enterprise Solutions**
- **Adaptive Insights (Workday)**: Comprehensive planning and reporting
- **Anaplan**: Advanced modeling and collaboration
- **Oracle Planning and Budgeting**: Enterprise-scale planning
- **IBM Planning Analytics**: Advanced analytics integration
- **Pigment**: Modern, collaborative planning platform

**Mid-Market Solutions**
- **Float**: Cashflow forecasting and budgeting
- **Fathom**: Financial analysis and budgeting
- **Budget Maestro**: Comprehensive budgeting solution
- **Vena Solutions**: Excel-based planning platform

**Integration Capabilities**
- ERP system connectivity (NetSuite, QuickBooks, SAP)
- HRIS integration (BambooHR, Workday, ADP)
- CRM data feeds (Salesforce, HubSpot)
- Business intelligence platforms (Tableau, Looker)
- Automated data validation and error checking

### Performance Management Integration

**Budget vs. Actual Reporting**
- Monthly variance analysis by department
- Key driver explanation and attribution
- Forward-looking impact assessment
- Corrective action planning
- Performance scorecard integration

**Incentive Alignment**
- Department budget achievement bonuses
- Key performance indicator (KPI) targets
- Cross-functional collaboration incentives
- Long-term strategic alignment
- Individual and team recognition programs

## Practical Implementation

### Budget Development Framework

**Phase 1: Strategic Planning (4 weeks before budget process)**
- Review strategic plans and priorities
- Assess market conditions and opportunities
- Evaluate resource constraints and capabilities
- Establish budget principles and guidelines
- Communicate expectations and timeline

**Phase 2: Budget Construction (6-8 weeks)**
- Department budget development
- Cross-functional dependency mapping
- Resource allocation optimization
- Scenario analysis and stress testing
- Executive review and refinement

**Phase 3: Approval and Communication (2 weeks)**
- Final executive review and approval
- Board presentation and discussion
- Department communication and training
- System setup and configuration
- Performance tracking initiation

### Budget Quality Checklist

**Strategic Alignment**
- [ ] Budget supports strategic objectives
- [ ] Resource allocation reflects priorities
- [ ] Investment decisions are justified
- [ ] Growth assumptions are realistic
- [ ] Risk factors are considered

**Financial Integrity**
- [ ] Mathematical accuracy verified
- [ ] Assumptions are documented
- [ ] Scenarios are stress-tested
- [ ] Cash flow implications analyzed
- [ ] Compliance requirements addressed

**Operational Feasibility**
- [ ] Hiring plans are realistic
- [ ] Technology capacity is adequate
- [ ] Process capabilities support growth
- [ ] Market assumptions are validated
- [ ] Risk mitigation plans exist

## Action Items

- [ ] Assess current budgeting maturity and identify improvement opportunities
- [ ] Select appropriate budgeting methodology for your organization
- [ ] Design comprehensive budget process and calendar
- [ ] Implement budgeting technology and integration systems
- [ ] Establish budget governance and accountability framework`,
          slug: "strategic-budget-planning-development",
          weekId: week2.id,
          orderIndex: 1,
          estimatedMinutes: 100,
          published: true
        },
        {
          title: "Mastering Variance Analysis and Performance Management",
          content: `# Mastering Variance Analysis and Performance Management

## Advanced Variance Analysis for Corporate Finance Excellence

Variance analysis transforms budget management from backward-looking reporting to forward-looking performance improvement. This lesson covers sophisticated variance analysis techniques and performance management systems essential for scaling tech companies.

### Understanding Variance Types and Classification

**Variance Categories**

**1. Favorable vs. Unfavorable Variances**
- **Favorable (F)**: Actual results better than budget
- **Unfavorable (U)**: Actual results worse than budget
- **Neutral interpretation**: Focus on understanding causes rather than good/bad judgment

**2. Temporary vs. Permanent Variances**
- **Temporary**: Timing differences that will reverse
- **Permanent**: Structural changes requiring forecast updates
- **Critical for forward-looking guidance and planning**

**3. Controllable vs. Uncontrollable Variances**
- **Controllable**: Within management influence and decision-making
- **Uncontrollable**: External factors beyond management control
- **Important for accountability and performance evaluation**

### Revenue Variance Analysis

**Revenue Bridge Analysis**

**Volume vs. Price Variance**
\`\`\`
Volume Variance = (Actual Volume - Budget Volume) × Budget Price
Price Variance = (Actual Price - Budget Price) × Actual Volume
Mix Variance = Change in Product/Customer Mix Impact
Total Revenue Variance = Volume + Price + Mix Variance
\`\`\`

**SaaS-Specific Revenue Analysis**

**Monthly Recurring Revenue (MRR) Bridge**
- Starting MRR
- New Customer MRR
- Expansion MRR (upsells/cross-sells)
- Contraction MRR (downgrades)
- Churned MRR
- Ending MRR

**Customer Acquisition Analysis**
\`\`\`
CAC Variance Analysis:
Budget CAC = Budget Marketing Spend ÷ Budget New Customers
Actual CAC = Actual Marketing Spend ÷ Actual New Customers
Efficiency Variance = (Budget CAC - Actual CAC) × Actual New Customers
Volume Variance = (Actual - Budget New Customers) × Budget CAC
\`\`\`

**Customer Lifecycle Variance**
- Customer acquisition volume and cost
- Customer retention and churn rates
- Customer expansion and contraction
- Customer lifetime value realization
- Cohort performance analysis

### Operating Expense Variance Analysis

**Headcount and Compensation Analysis**

**Headcount Variance Components**
\`\`\`
Headcount Variance = (Actual FTEs - Budget FTEs) × Average Salary
Salary Variance = (Actual Average Salary - Budget Average Salary) × Budget FTEs
Timing Variance = Impact of hiring ahead/behind schedule
Mix Variance = Impact of hiring different roles than planned
\`\`\`

**Department-Level Analysis**
- Hiring plan execution vs. budget
- Compensation inflation vs. assumptions
- Productivity and output per employee
- Contractor vs. employee mix changes
- Geographic cost variations

**Technology and Infrastructure Variance**

**Cloud Cost Analysis**
- Usage-based cost variances
- Pricing tier optimization opportunities
- Resource utilization efficiency
- Scaling assumption validation
- Technology decision impact assessment

**Software License Optimization**
- User count vs. budget assumptions
- License utilization rates
- Vendor negotiation opportunities
- Technology stack rationalization
- Feature adoption and value realization

### Advanced Variance Analysis Techniques

**Statistical Variance Analysis**

**Regression Analysis for Driver Identification**
- Identify key cost and revenue drivers
- Quantify driver relationships and elasticity
- Predict future variance patterns
- Optimize resource allocation decisions
- Validate budget assumptions

**Trend Analysis and Seasonality**
- Moving averages and trend lines
- Seasonal adjustment factors
- Cyclical pattern identification
- Outlier detection and analysis
- Forward-looking trend extrapolation

**Root Cause Analysis Framework**

**The "5 Whys" Methodology**
1. **Why did the variance occur?** (Initial symptom)
2. **Why did that happen?** (Immediate cause)
3. **Why did that underlying cause exist?** (System issue)
4. **Why wasn't it prevented?** (Process gap)
5. **Why isn't the process adequate?** (Root cause)

**Fishbone (Ishikawa) Diagram**
- **People**: Skills, training, motivation, capacity
- **Process**: Procedures, workflows, controls, communication
- **Technology**: Systems, tools, infrastructure, automation
- **Environment**: Market conditions, competitive factors, regulations
- **Materials**: Data quality, resource availability, vendor performance

### Performance Attribution and Explanation

**Variance Explanation Framework**

**Executive Summary Format**
- Overall performance vs. budget
- Top 3 positive variance drivers
- Top 3 negative variance drivers
- Forward-looking impact and actions
- Forecast update implications

**Detailed Analysis Components**
- Quantitative variance calculations
- Qualitative explanations and context
- Trend analysis and patterns
- Benchmark comparisons
- Action plans and timelines

**Business Driver Attribution**

**Customer Metrics Attribution**
- Customer acquisition performance
- Customer retention and churn analysis
- Customer expansion and contraction
- Customer satisfaction and NPS correlation
- Competitive win/loss analysis

**Operational Efficiency Attribution**
- Productivity metrics by department
- Technology and automation impact
- Process improvement initiatives
- Quality metrics and error rates
- Capacity utilization analysis

### Dynamic Forecasting and Course Correction

**Rolling Forecast Updates**

**Forecast Revision Process**
- Monthly forecast updates based on variances
- Quarterly comprehensive forecast reviews
- Annual plan adjustments and revisions
- Scenario planning and sensitivity updates
- Stakeholder communication and alignment

**Leading Indicator Integration**
- Forward-looking metrics and KPIs
- Pipeline and opportunity analysis
- Market trend indicators
- Competitive intelligence integration
- Economic and industry factor analysis

**Corrective Action Planning**

**Action Plan Framework**
- Specific variance issues identified
- Root cause analysis completed
- Corrective actions defined
- Responsibility and timeline assigned
- Success metrics and tracking established

**Implementation Tracking**
- Action plan execution monitoring
- Effectiveness measurement
- Adjustment and refinement
- Stakeholder communication
- Lessons learned documentation

### Performance Management Systems

**Balanced Scorecard Integration**

**Four Perspectives Framework**
1. **Financial Perspective**
   - Revenue growth and profitability
   - Cash flow and working capital
   - Cost management and efficiency
   - Return on investment (ROI)

2. **Customer Perspective**
   - Customer satisfaction and NPS
   - Customer acquisition and retention
   - Market share and positioning
   - Product quality and innovation

3. **Internal Process Perspective**
   - Operational efficiency
   - Quality and error rates
   - Innovation and development
   - Compliance and risk management

4. **Learning and Growth Perspective**
   - Employee engagement and retention
   - Skills development and training
   - Information system capabilities
   - Organizational culture and alignment

**Key Performance Indicator (KPI) Frameworks**

**Financial KPIs**
- Revenue growth rate (MoM, QoQ, YoY)
- Gross margin and contribution margin
- EBITDA and operating margin
- Cash burn rate and runway
- Working capital efficiency

**Operational KPIs**
- Customer acquisition cost (CAC)
- Customer lifetime value (LTV)
- Net revenue retention (NRR)
- Employee productivity metrics
- Technology performance indicators

**Leading vs. Lagging Indicators**
- **Leading**: Pipeline, marketing qualified leads, employee engagement
- **Lagging**: Revenue, profit, customer satisfaction scores
- **Balanced approach**: Combine for comprehensive performance view

### Variance Reporting and Communication

**Management Reporting Structure**

**Executive Dashboard**
- Key variance summary (top 5 positive/negative)
- Trend analysis and forward outlook
- Action plan status and progress
- Risk assessment and mitigation
- Strategic initiative impact

**Department-Level Reports**
- Detailed variance analysis by category
- Performance vs. goals and targets
- Resource utilization and efficiency
- Action plan details and timelines
- Benchmark and best practice comparisons

**Board Reporting**
- High-level performance summary
- Strategic variance implications
- Forward guidance updates
- Risk and opportunity assessment
- Management action plans

**Communication Best Practices**

**Data Storytelling Techniques**
- Executive summary with key insights
- Visual charts and trend analysis
- Context and benchmark comparisons
- Forward-looking implications
- Action-oriented recommendations

**Stakeholder-Specific Communication**
- **CEO/Executive Team**: Strategic implications and actions
- **Department Heads**: Operational performance and accountability
- **Board Members**: Governance and oversight focus
- **Investors**: Performance vs. guidance and outlook

### Technology and Automation

**Variance Analysis Tools**

**Business Intelligence Platforms**
- **Tableau**: Advanced visualization and analytics
- **Looker**: Modern data platform and reporting
- **Power BI**: Microsoft ecosystem integration
- **Qlik**: Associative analytics and discovery
- **Sisense**: AI-driven analytics and insights

**Planning and Analytics Integration**
- Real-time variance calculation
- Automated exception reporting
- Drill-down capability and root cause analysis
- Mobile access and notifications
- Collaborative planning and commentary

**Process Automation**
- Automated data collection and validation
- Exception-based reporting and alerts
- Workflow routing and approvals
- Performance tracking and dashboards
- Audit trail and documentation

### Common Pitfalls and Best Practices

**Analysis Pitfalls**
- **Surface-level analysis**: Stopping at symptom identification
- **Blame assignment**: Focusing on accountability vs. improvement
- **Analysis paralysis**: Over-analyzing without action
- **Hindsight bias**: Judging decisions based on outcomes
- **Confirmation bias**: Seeking data that confirms existing beliefs

**Communication Mistakes**
- **Information overload**: Too much detail without insights
- **Lack of context**: Variances without explanation or benchmarks
- **No forward outlook**: Historical focus without future implications
- **Missing action plans**: Analysis without corrective actions
- **Poor timing**: Delayed or irregular reporting schedules

**Best Practices for Excellence**
- **Focus on drivers**: Analyze underlying business drivers, not just symptoms
- **Balance detail and insight**: Provide sufficient detail with clear conclusions
- **Forward-looking orientation**: Emphasize implications and actions
- **Stakeholder alignment**: Tailor communication to audience needs
- **Continuous improvement**: Regularly refine processes and techniques

## Practical Implementation

### Variance Analysis Process Design

**Monthly Process Calendar**
- **Week 1**: Data collection and initial variance calculation
- **Week 2**: Department review and explanation development
- **Week 3**: Cross-functional analysis and root cause identification
- **Week 4**: Management reporting and action plan development

**Quality Assurance Framework**
- Data accuracy validation
- Calculation verification
- Explanation reasonableness review
- Action plan feasibility assessment
- Communication effectiveness evaluation

### Implementation Roadmap

**Phase 1 (Months 1-2): Foundation**
- Establish variance calculation methodologies
- Design reporting templates and formats
- Train department heads and managers
- Implement basic analysis processes
- Create communication protocols

**Phase 2 (Months 3-4): Enhancement**
- Add advanced analytics and root cause analysis
- Implement automated reporting and dashboards
- Expand KPI framework and balanced scorecard
- Enhance forecast integration and updates
- Strengthen corrective action processes

**Phase 3 (Months 5-6): Optimization**
- Deploy predictive analytics and modeling
- Integrate leading indicators and early warnings
- Implement performance management systems
- Enhance stakeholder communication
- Establish continuous improvement processes

## Action Items

- [ ] Design comprehensive variance analysis framework and methodologies
- [ ] Implement advanced root cause analysis and business driver attribution
- [ ] Create dynamic forecasting and course correction processes
- [ ] Establish performance management and KPI systems
- [ ] Deploy variance reporting and communication excellence`,
          slug: "mastering-variance-analysis-performance-management",
          weekId: week2.id,
          orderIndex: 2,
          estimatedMinutes: 105,
          published: true
        }
      ]
    });

    // Week 2 Quiz
    await prisma.quiz.create({
      data: {
        title: "Budget Planning and Variance Analysis Mastery",
        description: "Test your understanding of strategic budgeting methods, variance analysis techniques, and performance management systems.",
        weekId: week2.id,
        timeLimit: 30,
        passingScore: 70,
        questions: {
          create: [
            {
              questionText: "What is the primary advantage of zero-based budgeting (ZBB) over traditional incremental budgeting?",
              questionType: "multiple-choice",
              options: [
                "It requires less time and resources to implement",
                "It starts from zero and justifies every expense based on strategic priorities",
                "It automatically reduces costs by a fixed percentage",
                "It eliminates the need for variance analysis"
              ],
              correctAnswer: "It starts from zero and justifies every expense based on strategic priorities",
              explanation: "Zero-based budgeting requires justifying every expense from zero, ensuring resources are allocated to strategic priorities rather than perpetuating historical spending patterns.",
              orderIndex: 1
            },
            {
              questionText: "In SaaS revenue variance analysis, what does the MRR bridge help analyze?",
              questionType: "multiple-choice",
              options: [
                "Only new customer acquisition",
                "The complete flow from starting MRR to ending MRR including expansions and churn",
                "Just customer churn rates",
                "Only pricing changes"
              ],
              correctAnswer: "The complete flow from starting MRR to ending MRR including expansions and churn",
              explanation: "The MRR bridge tracks the complete flow: Starting MRR + New Customer MRR + Expansion MRR - Contraction MRR - Churned MRR = Ending MRR, providing comprehensive revenue analysis.",
              orderIndex: 2
            },
            {
              questionText: "What is the most effective approach for root cause analysis of budget variances?",
              questionType: "multiple-choice",
              options: [
                "Blame the department head responsible",
                "Use structured methods like the '5 Whys' to identify underlying system issues",
                "Immediately adjust the budget to match actuals",
                "Focus only on the largest dollar variances"
              ],
              correctAnswer: "Use structured methods like the '5 Whys' to identify underlying system issues",
              explanation: "Structured root cause analysis methods like '5 Whys' help identify underlying system issues rather than just symptoms, enabling effective corrective actions.",
              orderIndex: 3
            },
            {
              questionText: "How do rolling forecasts improve budget management compared to static annual budgets?",
              questionType: "multiple-choice",
              options: [
                "They eliminate the need for variance analysis",
                "They provide more accurate predictions and enable agile resource allocation",
                "They reduce the workload for the FP&A team",
                "They guarantee perfect budget accuracy"
              ],
              correctAnswer: "They provide more accurate predictions and enable agile resource allocation",
              explanation: "Rolling forecasts maintain forward-looking visibility (12-18 months) with regular updates, enabling more accurate predictions and agile resource allocation decisions.",
              orderIndex: 4
            },
            {
              questionText: "In driver-based budgeting, what is the key to creating accurate budget models?",
              questionType: "multiple-choice",
              options: [
                "Using the same drivers for all departments",
                "Identifying key business drivers and establishing relationships between drivers and costs",
                "Assuming linear relationships for all costs",
                "Focusing only on revenue drivers"
              ],
              correctAnswer: "Identifying key business drivers and establishing relationships between drivers and costs",
              explanation: "Driver-based budgeting success depends on identifying the right business drivers (customer count, employees, usage) and accurately modeling the relationship between these drivers and associated costs.",
              orderIndex: 5
            }
          ]
        },
        published: true
      }
    });

    // Week 3: Working Capital Management
    const week3 = await prisma.week.create({
      data: {
        weekNumber: 3,
        title: "Working Capital Management",
        description: "Optimize working capital, cash flow, and liquidity management for scaling operations and sustainable growth.",
        learningObjectives: [
          "Master working capital components and optimization strategies",
          "Implement advanced cash flow forecasting and management",
          "Develop accounts receivable and payable optimization systems",
          "Create inventory and supply chain finance strategies",
          "Build liquidity management and short-term financing frameworks"
        ],
        estimatedHours: 8,
        orderIndex: 3,
        courseId: course.id,
        published: true
      }
    });

    // Week 3 Lessons
    await prisma.lesson.createMany({
      data: [
        {
          title: "Working Capital Optimization Strategies",
          content: `# Working Capital Optimization Strategies

## Strategic Working Capital Management for Scaling Tech Companies

Working capital management becomes increasingly critical as tech companies scale, impacting cash flow, growth funding requirements, and operational efficiency. This lesson covers advanced strategies for optimizing working capital components.

### Understanding Working Capital Components

**Working Capital Formula**
\`\`\`
Working Capital = Current Assets - Current Liabilities
Net Working Capital = (AR + Inventory + Prepaid) - (AP + Accrued Liabilities)
Working Capital Ratio = Current Assets ÷ Current Liabilities
\`\`\`

**Key Components Analysis**

**Current Assets**
- **Cash and Cash Equivalents**: Operating liquidity and emergency reserves
- **Accounts Receivable**: Customer payment timing and collection efficiency
- **Inventory**: Physical and digital product inventory management
- **Prepaid Expenses**: Advance payments for services and subscriptions
- **Short-term Investments**: Temporary investment of excess cash

**Current Liabilities**
- **Accounts Payable**: Vendor payment timing and terms optimization
- **Accrued Liabilities**: Payroll, taxes, and other accrued expenses
- **Deferred Revenue**: Customer advance payments and subscription billing
- **Short-term Debt**: Lines of credit and short-term financing
- **Current Portion of Long-term Debt**: Principal payments due within one year

### Working Capital Optimization Framework

**The Cash Conversion Cycle (CCC)**
\`\`\`
Days Sales Outstanding (DSO) = (Accounts Receivable ÷ Revenue) × 365
Days Payable Outstanding (DPO) = (Accounts Payable ÷ COGS) × 365
Days Inventory Outstanding (DIO) = (Inventory ÷ COGS) × 365
Cash Conversion Cycle = DSO + DIO - DPO
\`\`\`

**CCC Optimization Strategies**
- **Reduce DSO**: Faster customer collections
- **Minimize DIO**: Efficient inventory management
- **Extend DPO**: Optimize vendor payment timing
- **Target**: Negative CCC (get paid before paying suppliers)

### Accounts Receivable Optimization

**Credit Policy and Terms Management**

**Customer Credit Assessment**
- Credit scoring and risk evaluation
- Credit limit establishment and monitoring
- Payment history analysis
- Industry and geographic risk factors
- Guarantees and collateral requirements

**Payment Terms Optimization**
- Standard terms analysis (Net 30, Net 15, etc.)
- Early payment discounts (2/10 Net 30)
- Extended payment terms for strategic customers
- Milestone-based payment schedules
- Automatic payment incentives

**Collection Strategy Framework**

**Proactive Collection Process**
- **Day 0-15**: Automated invoice delivery and confirmation
- **Day 16-30**: Courtesy payment reminders
- **Day 31-60**: Formal collection notices and calls
- **Day 61-90**: Management escalation and negotiation
- **Day 90+**: Third-party collections or legal action

**Technology-Enabled Collections**
- Automated invoice generation and delivery
- Payment portal and online processing
- Collection workflow automation
- Customer communication tracking
- Performance analytics and reporting

**Advanced Receivables Management**

**Invoice Financing and Factoring**
- **Asset-Based Lending**: Borrow against receivables portfolio
- **Factoring**: Sell receivables to third party at discount
- **Invoice Discounting**: Confidential financing against receivables
- **Supply Chain Financing**: Vendor-financed customer payments

**Credit Insurance**
- Protect against customer default risk
- Enable extended credit terms
- Support international sales expansion
- Reduce bad debt reserves and provisions

### Accounts Payable Optimization

**Vendor Relationship Management**

**Payment Terms Negotiation**
- Standard payment terms extension (30 to 45-60 days)
- Volume-based payment term improvements
- Strategic partnership payment arrangements
- Seasonal payment schedule adjustments
- Supply chain financing program participation

**Early Payment Discount Analysis**
\`\`\`
Annual Cost of Early Payment = (Discount % ÷ (100% - Discount %)) × (365 ÷ (Payment Term - Discount Days))

Example: 2/10 Net 30
Annual Cost = (2% ÷ 98%) × (365 ÷ 20) = 37.2%
If cost of capital < 37.2%, take discount
If cost of capital > 37.2%, delay payment
\`\`\`

**Vendor Payment Optimization**
- Payment scheduling and cash flow alignment
- Automated payment processing systems
- Vendor portal implementation
- Payment method optimization (ACH vs. check vs. wire)
- Currency hedging for international payments

**Supply Chain Finance Programs**

**Supplier Financing Solutions**
- **Reverse Factoring**: Early payment to suppliers at discounted rates
- **Dynamic Discounting**: Variable discount rates based on payment timing
- **Supply Chain Financing**: Bank-provided supplier financing programs
- **Vendor Finance Programs**: Extended payment terms with interest

### Cash Flow Forecasting and Management

**Advanced Cash Flow Modeling**

**13-Week Rolling Cash Flow Forecast**
- Weekly cash position planning
- Operating cash flow projections
- Capital expenditure planning
- Financing activity forecasting
- Scenario analysis and stress testing

**Components of Cash Flow Forecasting**

**Operating Cash Flows**
- Customer collection forecasting
- Vendor payment scheduling
- Payroll and benefit payments
- Tax and regulatory payments
- Subscription and recurring payments

**Investment Cash Flows**
- Technology infrastructure investments
- Equipment and facility expenditures
- Acquisition and investment activities
- Asset disposal proceeds
- Research and development investments

**Financing Cash Flows**
- Debt service payments
- Equity funding receipts
- Line of credit utilization
- Lease payments
- Dividend and distribution payments

**Scenario Planning for Cash Flow**

**Base Case Scenario (70% probability)**
- Expected business performance
- Normal collection and payment patterns
- Standard growth and investment levels
- Typical seasonal variations
- Regular operational efficiency

**Stress Case Scenario (20% probability)**
- Delayed customer collections
- Economic downturn impact
- Increased competitive pressure
- Supplier payment acceleration
- Emergency cash preservation mode

**Optimistic Scenario (10% probability)**
- Accelerated growth and collections
- Improved payment terms
- Reduced operational costs
- Enhanced operational efficiency
- Strategic opportunity capture

### Inventory and Digital Asset Management

**Physical Inventory Optimization**

**Just-in-Time (JIT) Inventory**
- Demand forecasting and planning
- Supplier relationship optimization
- Quality control and assurance
- Technology integration and automation
- Risk management and contingency planning

**Economic Order Quantity (EOQ)**
\`\`\`
EOQ = √((2 × Annual Demand × Ordering Cost) ÷ Carrying Cost per Unit)
\`\`\`

**ABC Analysis**
- **A Items**: High value, tight control (80% of value, 20% of items)
- **B Items**: Moderate value, normal control
- **C Items**: Low value, loose control (20% of value, 80% of items)

**Digital Asset Management**

**Software Licensing Optimization**
- User-based licensing vs. usage-based models
- License utilization monitoring and optimization
- Volume discount negotiations
- Multi-year contract planning
- License harvesting and reallocation

**Subscription Management**
- SaaS subscription auditing and optimization
- Redundant service identification
- Usage-based pricing optimization
- Contract negotiation and renewal management
- Cost allocation and chargeback systems

### Short-term Financing and Liquidity Management

**Credit Facility Types**

**Revolving Credit Lines**
- Unsecured lines of credit
- Asset-based lending facilities
- Accounts receivable credit lines
- Equipment and inventory financing
- Technology and IP-based credit

**Alternative Financing Sources**
- **Revenue-Based Financing**: Payments based on revenue percentage
- **Invoice Financing**: Immediate cash against outstanding invoices
- **Merchant Cash Advances**: Advance against future credit card sales
- **Peer-to-Peer Lending**: Direct lending from investors
- **Equipment Financing**: Asset-based equipment purchases

**Liquidity Management Framework**

**Cash Position Optimization**
- Minimum cash balance requirements
- Operational cash reserve calculation
- Emergency fund sizing and management
- Seasonal cash requirement planning
- Growth investment cash allocation

**Investment of Excess Cash**
- **Money Market Funds**: High liquidity, low risk
- **Certificate of Deposits**: Fixed terms, higher yields
- **Treasury Bills**: Government-backed, liquid investments
- **Corporate Bonds**: Higher yields, credit risk consideration
- **High-Yield Savings**: Easy access, competitive rates

### Working Capital Performance Metrics

**Efficiency Metrics**
- Cash Conversion Cycle (CCC) days
- Days Sales Outstanding (DSO)
- Days Payable Outstanding (DPO)
- Inventory turnover ratio
- Working capital turnover ratio

**Liquidity Metrics**
- Current ratio (Current Assets ÷ Current Liabilities)
- Quick ratio ((Current Assets - Inventory) ÷ Current Liabilities)
- Cash ratio (Cash ÷ Current Liabilities)
- Operating cash flow ratio (Operating Cash Flow ÷ Current Liabilities)

**Growth and Efficiency Balance**
\`\`\`
Working Capital % of Revenue = Working Capital ÷ Annual Revenue
Target: Maintain stable or declining percentage as company scales
Best Practice: <10% for efficient tech companies
\`\`\`

### Technology and Automation

**Working Capital Management Systems**

**Enterprise Resource Planning (ERP)**
- **NetSuite**: Comprehensive business management
- **SAP**: Enterprise-scale resource planning
- **Microsoft Dynamics**: Integrated business applications
- **Oracle ERP**: Advanced financial management
- **QuickBooks Enterprise**: Mid-market business management

**Specialized Tools**
- **Kyriba**: Treasury and cash management
- **GTreasury**: Corporate treasury management
- **CashAnalytics**: Cash forecasting and analytics
- **Tesorio**: Cash flow forecasting and collections
- **HighRadius**: Accounts receivable automation

**Process Automation**
- Automated invoice generation and delivery
- Electronic payment processing
- Collection workflow automation
- Cash position reporting and alerts
- Vendor payment optimization

### Industry-Specific Considerations

**SaaS and Subscription Businesses**
- Deferred revenue management and forecasting
- Subscription billing and collection optimization
- Customer lifetime value and cash flow correlation
- Churn impact on working capital
- Multi-year contract cash flow benefits

**E-commerce and Marketplace**
- Inventory management and forecasting
- Marketplace settlement timing
- Payment processor cash flow timing
- Seasonal working capital requirements
- International payment and currency considerations

**Professional Services**
- Project-based cash flow management
- Milestone billing and collection
- Resource utilization and cash generation
- Client retainer and advance payment strategies
- Time and expense capture optimization

## Practical Implementation

### Working Capital Optimization Process

**Assessment Phase (Month 1)**
- Current working capital analysis
- Cash conversion cycle calculation
- Process efficiency evaluation
- Technology gap assessment
- Benchmark comparison and best practices

**Strategy Development (Month 2)**
- Working capital optimization roadmap
- Process improvement priorities
- Technology implementation planning
- Policy and procedure updates
- Performance target establishment

**Implementation Phase (Months 3-6)**
- System implementation and integration
- Process automation deployment
- Team training and capability building
- Vendor and customer communication
- Performance monitoring and adjustment

**Optimization Phase (Months 7-12)**
- Continuous improvement implementation
- Advanced analytics deployment
- Strategic financing optimization
- Process refinement and scaling
- Best practice sharing and training

### Key Performance Indicators (KPIs)

**Efficiency KPIs**
- Cash conversion cycle improvement (target: 10-15% annual reduction)
- DSO reduction (target: maintain <30 days for tech companies)
- DPO optimization (target: 45-60 days without supplier relationship impact)
- Working capital as % of revenue (target: maintain or reduce)

**Liquidity KPIs**
- Cash runway (target: maintain >12 months)
- Current ratio (target: >1.5 for growth companies)
- Quick ratio (target: >1.0 for liquidity assurance)
- Credit utilization (target: <50% of available credit)

## Action Items

- [ ] Conduct comprehensive working capital analysis and benchmarking
- [ ] Develop cash conversion cycle optimization strategy
- [ ] Implement advanced cash flow forecasting and management systems
- [ ] Optimize accounts receivable and payable processes
- [ ] Establish liquidity management and short-term financing frameworks`,
          slug: "working-capital-optimization-strategies",
          weekId: week3.id,
          orderIndex: 1,
          estimatedMinutes: 110,
          published: true
        },
        {
          title: "Advanced Cash Flow Management and Liquidity Planning",
          content: `# Advanced Cash Flow Management and Liquidity Planning

## Strategic Liquidity Management for Scaling Tech Companies

Advanced cash flow management transcends basic cash monitoring to become a strategic driver of growth, resilience, and operational excellence. This lesson covers sophisticated liquidity planning and cash optimization strategies for scaling tech companies.

### Strategic Cash Flow Planning Framework

**Multi-Horizon Cash Flow Management**

**Operational Horizon (0-13 weeks)**
- Daily cash position monitoring
- Weekly cash flow forecasting
- Working capital optimization
- Short-term liquidity management
- Operational efficiency focus

**Tactical Horizon (3-12 months)**
- Quarterly cash flow planning
- Seasonal variation management
- Growth investment funding
- Working capital facility planning
- Scenario-based cash planning

**Strategic Horizon (1-3 years)**
- Long-term liquidity planning
- Growth capital requirements
- Acquisition and investment planning
- Debt capacity and structure planning
- Exit and liquidity event preparation

### Advanced Cash Flow Forecasting Models

**Integrated Cash Flow Architecture**

**Operating Cash Flow Modeling**
\`\`\`
Operating Cash Flow = Net Income + Non-Cash Items ± Working Capital Changes
Key Components:
- Revenue collection timing and patterns
- Operating expense payment schedules
- Tax payment timing and optimization
- Working capital investment requirements
- Non-cash expense adjustments (depreciation, stock compensation)
\`\`\`

**Investment Cash Flow Planning**
- Technology infrastructure investments
- Research and development expenditures
- Acquisition and strategic investment activities
- Asset disposal and monetization opportunities
- Intellectual property and technology licensing

**Financing Cash Flow Strategy**
- Debt service and repayment schedules
- Equity fundraising timing and requirements
- Dividend and distribution planning
- Stock repurchase programs
- Lease payment obligations and optimization

### Dynamic Cash Forecasting Techniques

**Driver-Based Cash Flow Models**

**Revenue Collection Modeling**
\`\`\`
Cash Collections = Beginning AR + Current Period Sales - Ending AR
Collection Pattern Analysis:
- Month 0: 15% (current month collections)
- Month 1: 70% (primary collection period)
- Month 2: 12% (extended collection period)
- Month 3+: 2% (late collections and adjustments)
- Bad Debt: 1% (historical experience)
\`\`\`

**Expense Payment Modeling**
- Payroll and benefits (bi-weekly, monthly patterns)
- Vendor payments (30-60 day payment terms)
- Technology and subscription payments (monthly, annual cycles)
- Marketing and advertising spend (campaign-based timing)
- Professional services and contractors (project-based payments)

**Monte Carlo Simulation for Cash Flow**
- Revenue uncertainty modeling
- Customer concentration risk analysis
- Market condition impact assessment
- Operational risk scenario planning
- Confidence interval establishment for cash positions

### Liquidity Risk Management

**Risk Assessment Framework**

**Liquidity Risk Categories**
- **Funding Liquidity Risk**: Inability to fund operations or meet obligations
- **Market Liquidity Risk**: Difficulty converting assets to cash quickly
- **Operational Liquidity Risk**: Disruption to normal cash flow operations
- **Refinancing Risk**: Inability to refinance maturing obligations
- **Concentration Risk**: Over-reliance on single funding source or customer

**Early Warning Indicators**
- Cash burn rate acceleration beyond plan
- Customer payment delays or collection deterioration
- Vendor payment term reductions or demands
- Credit facility covenant violations or restrictions
- Market condition deterioration affecting funding

**Stress Testing and Scenario Analysis**

**Economic Downturn Scenario (30% probability)**
- 25% revenue decline over 6 months
- 20% increase in customer payment delays
- 15% reduction in payment terms from vendors
- 50% increase in customer churn rates
- Limited access to capital markets

**Operational Disruption Scenario (15% probability)**
- Key customer loss (>20% of revenue)
- Technology platform disruption
- Cybersecurity incident response costs
- Regulatory investigation or compliance issues
- Leadership team disruption or departure

**Market Opportunity Scenario (10% probability)**
- Accelerated growth requiring additional investment
- Acquisition opportunity requiring immediate funding
- Competitive response requiring increased spending
- International expansion opportunity
- Technology platform scaling requirements

### Cash Optimization Strategies

**Cash Pooling and Concentration**

**Physical Cash Pooling**
- Centralized cash management across subsidiaries
- Automated cash concentration systems
- Real-time cash position visibility
- Optimized interest income and cost
- Reduced banking fees and complexity

**Notional Cash Pooling**
- Virtual cash consolidation for interest calculation
- Maintains separate legal entity accounts
- Optimizes interest income without fund transfers
- Reduces administrative complexity
- Maintains regulatory compliance across jurisdictions

**Multi-Currency Cash Management**

**Currency Exposure Assessment**
- Transaction exposure (specific deals and contracts)
- Translation exposure (foreign subsidiary consolidation)
- Economic exposure (competitive position changes)
- Cash flow timing and natural hedging opportunities

**Hedging Strategies**
- **Forward Contracts**: Lock in exchange rates for future transactions
- **Currency Options**: Protect against adverse movements while maintaining upside
- **Currency Swaps**: Exchange cash flows in different currencies
- **Natural Hedging**: Match currency inflows and outflows
- **Netting**: Offset exposures across different transactions

### Short-term Investment Management

**Investment Policy Framework**

**Investment Objectives**
- Principal preservation (primary)
- Liquidity maintenance (secondary)
- Income generation (tertiary)
- Risk tolerance and guidelines
- Investment horizon and access requirements

**Permitted Investments**
- **Tier 1**: Money market funds, treasury bills, bank deposits
- **Tier 2**: Certificates of deposit, commercial paper, corporate bonds
- **Tier 3**: Municipal bonds, asset-backed securities (limited allocation)
- **Prohibited**: Equity securities, derivatives, commodities, international securities

**Investment Allocation Strategy**
\`\`\`
Immediate Liquidity (0-30 days): 25% - Money market funds and bank deposits
Short-term Liquidity (30-90 days): 50% - Treasury bills and short-term CDs
Medium-term Investment (90-365 days): 25% - Corporate bonds and longer-term CDs
\`\`\`

**Performance Monitoring and Optimization**
- Yield optimization within risk parameters
- Duration and maturity ladder management
- Credit quality monitoring and assessment
- Liquidity access testing and verification
- Market condition impact assessment

### Credit Facility Management

**Credit Facility Types and Optimization**

**Revolving Credit Facilities**
- **Asset-Based Lending**: Secured by receivables and inventory
- **Cash Flow Lending**: Based on historical and projected cash flows
- **Technology Asset Lending**: Secured by intellectual property and technology
- **International Facilities**: Multi-currency and cross-border capabilities

**Facility Structure Optimization**
- Credit limit sizing and utilization planning
- Interest rate structure and hedging
- Covenant structure and compliance monitoring
- Fee structure optimization (commitment, utilization, administrative)
- Security and guarantee requirements

**Alternative Financing Sources**

**Revenue-Based Financing (RBF)**
- Funding in exchange for percentage of future revenue
- Flexible repayment based on business performance
- No equity dilution or personal guarantees
- Suitable for predictable recurring revenue businesses
- Cost typically 6-12% annually plus revenue percentage

**Invoice Financing and Factoring**
- **Non-Recourse Factoring**: Transfer credit risk to factor
- **Recourse Factoring**: Lower cost but retain credit risk
- **Invoice Discounting**: Confidential financing arrangement
- **Selective Factoring**: Finance specific invoices or customers

**Marketplace Lending**
- Online lending platforms with competitive rates
- Faster approval and funding processes
- Flexible terms and structures
- Technology-enabled underwriting
- Alternative credit assessment methods

### Technology and Automation

**Treasury Management Systems (TMS)**

**Core TMS Capabilities**
- Real-time cash position reporting
- Cash flow forecasting and planning
- Bank account management and reconciliation
- Payment processing and approval workflows
- Investment and debt management
- Risk management and hedging

**Leading TMS Providers**
- **Kyriba**: Comprehensive treasury and risk management
- **GTreasury**: Corporate treasury and cash management
- **ION Treasury**: Advanced analytics and automation
- **Reval** (now ION): Enterprise treasury management
- **Bloomberg Terminal**: Market data and analytics integration

**API Integration and Automation**
- Bank connectivity and real-time data feeds
- ERP system integration and automation
- Payment processing and approval automation
- Reporting and dashboard automation
- Exception management and alert systems

### Performance Management and KPIs

**Cash Management KPIs**

**Efficiency Metrics**
- Cash forecasting accuracy (target: >95% for 4-week forecast)
- Cash conversion cycle optimization (target: annual improvement)
- Bank fee optimization (target: <0.1% of cash managed)
- Investment yield optimization (target: beat benchmark by 25 basis points)
- Process automation percentage (target: >80% of routine transactions)

**Risk Management Metrics**
- Liquidity coverage ratio (target: >125% for 90-day stress scenario)
- Credit facility utilization (target: <50% of committed facilities)
- Counterparty concentration limits (target: <25% with single institution)
- Currency exposure limits (target: <10% of annual revenue unhedged)
- Investment duration limits (target: <1 year average duration)

**Strategic Metrics**
- Cash runway maintenance (target: >12 months)
- Working capital optimization (target: <15% of revenue)
- Funding cost optimization (target: minimize blended cost of capital)
- Strategic flexibility maintenance (target: access to multiple funding sources)
- Growth enablement (target: cash availability for strategic opportunities)

### Regulatory and Compliance Considerations

**Banking Regulations**
- Account opening and maintenance requirements
- Anti-money laundering (AML) compliance
- Know your customer (KYC) documentation
- International banking and reporting requirements
- Deposit insurance coverage optimization

**Investment Regulations**
- Securities regulations and compliance
- Investment advisor registration requirements
- Fiduciary responsibility and governance
- Market manipulation and insider trading rules
- International investment restrictions

**Tax Optimization**
- Interest income tax optimization
- International tax treaty benefits
- Transfer pricing for inter-company transactions
- State and local tax considerations
- Tax-efficient investment structure design

### Crisis Management and Contingency Planning

**Liquidity Crisis Response Plan**

**Immediate Actions (0-7 days)**
- Accelerate customer collections
- Delay non-critical vendor payments
- Draw on available credit facilities
- Liquidate short-term investments
- Implement expense reduction measures

**Short-term Actions (1-4 weeks)**
- Negotiate extended payment terms with vendors
- Implement accounts receivable factoring
- Reduce discretionary spending and investments
- Accelerate asset monetization opportunities
- Communicate with stakeholders and lenders

**Medium-term Actions (1-6 months)**
- Implement comprehensive cost reduction program
- Negotiate debt restructuring if necessary
- Explore emergency funding sources
- Consider strategic alternatives (partnership, sale, merger)
- Implement enhanced cash monitoring and controls

**Communication Strategy**
- Internal stakeholder communication plan
- Board and investor update protocols
- Vendor and customer communication approach
- Media and public relations management
- Legal and regulatory reporting requirements

## Practical Implementation

### Implementation Roadmap

**Phase 1: Foundation (Months 1-2)**
- Current state assessment and gap analysis
- Cash flow forecasting model development
- Basic treasury management system implementation
- Policy and procedure documentation
- Team training and capability building

**Phase 2: Enhancement (Months 3-4)**
- Advanced forecasting and scenario modeling
- Credit facility optimization and negotiation
- Short-term investment program implementation
- Risk management framework deployment
- Performance monitoring and KPI establishment

**Phase 3: Optimization (Months 5-6)**
- Technology integration and automation
- Advanced risk management and hedging
- Strategic financing and capital structure optimization
- Continuous improvement process implementation
- Best practice sharing and knowledge management

### Success Factors

**Organizational Capabilities**
- Strong analytical and forecasting skills
- Technology and system integration expertise
- Risk management and compliance knowledge
- Strategic thinking and scenario planning
- Stakeholder communication and relationship management

**Technology Infrastructure**
- Integrated treasury management systems
- Real-time data feeds and automation
- Advanced analytics and reporting capabilities
- Mobile access and approval workflows
- Robust security and compliance controls

**Process Excellence**
- Standardized and documented procedures
- Regular monitoring and performance measurement
- Continuous improvement and optimization
- Cross-functional collaboration and alignment
- Proactive risk identification and management

## Action Items

- [ ] Develop multi-horizon cash flow planning framework
- [ ] Implement advanced cash flow forecasting models with scenario analysis
- [ ] Establish comprehensive liquidity risk management program
- [ ] Optimize cash investment and credit facility strategies
- [ ] Deploy treasury management technology and automation systems`,
          slug: "advanced-cash-flow-management-liquidity-planning",
          weekId: week3.id,
          orderIndex: 2,
          estimatedMinutes: 105,
          published: true
        }
      ]
    });

    // Week 3 Quiz
    await prisma.quiz.create({
      data: {
        title: "Working Capital and Cash Flow Management",
        description: "Test your understanding of working capital optimization, cash flow forecasting, and liquidity management strategies.",
        weekId: week3.id,
        timeLimit: 30,
        passingScore: 70,
        questions: {
          create: [
            {
              questionText: "What is the primary goal of optimizing the Cash Conversion Cycle (CCC)?",
              questionType: "multiple-choice",
              options: [
                "Maximize the number of days in the cycle",
                "Minimize the cycle to improve cash flow by collecting faster and paying slower",
                "Maintain a constant cycle regardless of business changes",
                "Focus only on inventory management"
              ],
              correctAnswer: "Minimize the cycle to improve cash flow by collecting faster and paying slower",
              explanation: "The goal is to minimize CCC by reducing DSO (collect faster), minimizing inventory days, and extending DPO (pay suppliers later), improving cash flow and reducing financing needs.",
              orderIndex: 1
            },
            {
              questionText: "When evaluating early payment discounts (e.g., 2/10 Net 30), what should companies consider?",
              questionType: "multiple-choice",
              options: [
                "Always take the discount to save money",
                "Never take discounts to preserve cash",
                "Compare the annualized cost of the discount to the company's cost of capital",
                "Only consider the absolute dollar amount saved"
              ],
              correctAnswer: "Compare the annualized cost of the discount to the company's cost of capital",
              explanation: "Early payment discounts should be evaluated based on their annualized cost (37.2% for 2/10 Net 30). Take the discount only if your cost of capital is higher than the discount rate.",
              orderIndex: 2
            },
            {
              questionText: "What is the most appropriate cash investment strategy for a tech company's excess cash?",
              questionType: "multiple-choice",
              options: [
                "Invest everything in high-growth stocks",
                "Keep all cash in checking accounts",
                "Use a tiered approach: immediate liquidity, short-term, and medium-term investments",
                "Invest only in cryptocurrency"
              ],
              correctAnswer: "Use a tiered approach: immediate liquidity, short-term, and medium-term investments",
              explanation: "A tiered approach balances liquidity needs with income generation: immediate liquidity (25%), short-term investments (50%), and medium-term investments (25%) based on cash flow requirements.",
              orderIndex: 3
            },
            {
              questionText: "In cash flow stress testing, what should companies focus on?",
              questionType: "multiple-choice",
              options: [
                "Only best-case scenarios to maintain optimism",
                "Worst-case scenarios including revenue decline, collection delays, and limited capital access",
                "Historical performance only",
                "Single-point forecasts without variation"
              ],
              correctAnswer: "Worst-case scenarios including revenue decline, collection delays, and limited capital access",
              explanation: "Effective stress testing evaluates adverse scenarios (revenue decline, collection delays, limited capital access) to ensure adequate liquidity buffers and contingency plans.",
              orderIndex: 4
            },
            {
              questionText: "What is the primary benefit of implementing a Treasury Management System (TMS)?",
              questionType: "multiple-choice",
              options: [
                "Eliminating the need for cash flow forecasting",
                "Automating all financial decisions without human oversight",
                "Providing real-time cash visibility, automated processes, and integrated risk management",
                "Guaranteeing perfect cash flow predictions"
              ],
              correctAnswer: "Providing real-time cash visibility, automated processes, and integrated risk management",
              explanation: "TMS provides real-time cash position visibility, automates routine processes, integrates risk management capabilities, and enhances decision-making through better data and analytics.",
              orderIndex: 5
            }
          ]
        },
        published: true
      }
    });

    // Continue with Weeks 4-5 following the same pattern...
    // Week 4: Debt Financing and Credit Facilities
    const week4 = await prisma.week.create({
      data: {
        weekNumber: 4,
        title: "Debt Financing and Credit Facilities",
        description: "Navigate debt financing options, structure credit facilities, and optimize capital structure for growth and operational efficiency.",
        learningObjectives: [
          "Understand various debt financing options for tech companies",
          "Structure and negotiate optimal credit facility terms",
          "Implement debt covenant management and compliance systems",
          "Develop capital structure optimization strategies",
          "Create debt capacity planning and refinancing frameworks"
        ],
        estimatedHours: 8,
        orderIndex: 4,
        courseId: course.id,
        published: true
      }
    });

    // Week 5: IPO Preparation and Public Company Requirements
    const week5 = await prisma.week.create({
      data: {
        weekNumber: 5,
        title: "IPO Preparation and Public Company Requirements",
        description: "Master IPO readiness requirements, public company financial reporting, and compliance frameworks for scaling to public markets.",
        learningObjectives: [
          "Understand IPO readiness requirements and preparation timeline",
          "Implement public company financial reporting standards",
          "Develop SOX compliance and internal control frameworks",
          "Master investor relations and public market communication",
          "Create post-IPO corporate governance and compliance systems"
        ],
        estimatedHours: 8,
        orderIndex: 5,
        courseId: course.id,
        published: true
      }
    });

    // Add abbreviated lessons for weeks 4-5 to complete the course structure
    await prisma.lesson.createMany({
      data: [
        // Week 4 Lessons
        {
          title: "Debt Financing Strategies and Structuring",
          content: `# Debt Financing Strategies and Structuring

## Strategic Debt Financing for Scaling Tech Companies

Debt financing becomes increasingly important as tech companies scale, offering growth capital without equity dilution while building corporate credit profiles essential for long-term success.

### Understanding Debt Financing Landscape

**Debt vs. Equity Considerations**
- **Advantages**: No equity dilution, tax deductibility of interest, potential for higher returns to equity holders
- **Disadvantages**: Fixed payment obligations, covenant restrictions, potential distress during downturns
- **Optimal Mix**: Balance growth capital needs with risk tolerance and cash flow stability

**Types of Debt Financing**

**Traditional Bank Lending**
- Term loans for specific purposes (equipment, working capital, growth)
- Lines of credit for operational flexibility
- Asset-based lending secured by receivables and inventory
- SBA lending with government guarantees
- Equipment financing with asset security

**Alternative Financing**
- Revenue-based financing with payments tied to performance
- Venture debt from specialized lenders
- Marketplace lending with technology-enabled underwriting
- Invoice factoring and accounts receivable financing
- Supply chain financing and vendor programs

### Credit Facility Structuring

**Revolving Credit Facilities**
- Available credit that can be borrowed, repaid, and re-borrowed
- Interest charged only on outstanding balances
- Commitment fees on unused portions
- Financial covenant requirements and monitoring
- Typical terms: 3-5 years with annual reviews

**Term Loans**
- Fixed principal amount with scheduled repayments
- Amortizing vs. bullet payment structures
- Fixed vs. floating interest rates
- Security requirements and collateral
- Use of proceeds restrictions and monitoring

**Covenant Structure and Management**
- Financial covenants (leverage, coverage ratios)
- Operational covenants (business restrictions)
- Reporting requirements and compliance monitoring
- Cure mechanisms and waiver processes
- Covenant optimization and negotiation strategies

### Implementation and Best Practices**

**Debt Capacity Analysis**
- Cash flow-based borrowing capacity
- Asset-based lending availability
- Industry benchmark leverage ratios
- Stress testing and scenario analysis
- Refinancing and maturity planning

**Negotiation Strategies**
- Term sheet comparison and analysis
- Covenant negotiation and optimization
- Pricing and fee structure optimization
- Security and guarantee minimization
- Relationship building with lenders

## Action Items

- [ ] Assess debt financing needs and optimal capital structure
- [ ] Evaluate available debt financing options and lenders
- [ ] Develop credit facility negotiation strategy
- [ ] Implement covenant monitoring and compliance systems
- [ ] Create debt capacity planning and refinancing framework`,
          slug: "debt-financing-strategies-structuring",
          weekId: week4.id,
          orderIndex: 1,
          estimatedMinutes: 90,
          published: true
        },
        {
          title: "Credit Risk Management and Covenant Compliance",
          content: `# Credit Risk Management and Covenant Compliance

## Advanced Credit Management for Corporate Finance

Effective credit risk management and covenant compliance are essential for maintaining strong banking relationships and ensuring continued access to growth capital.

### Credit Risk Assessment Framework

**Internal Credit Analysis**
- Cash flow stability and predictability assessment
- Market position and competitive analysis
- Management team capability evaluation
- Financial performance trend analysis
- Industry risk factors and cyclicality

**Lender Perspective Analysis**
- Loan-to-value ratios and security coverage
- Debt service coverage ratios
- Working capital and liquidity analysis
- Covenant compliance headroom
- Relationship profitability for lender

### Covenant Management Systems

**Financial Covenant Monitoring**
- Automated calculation and tracking systems
- Early warning indicators and dashboards
- Scenario modeling for covenant compliance
- Regular communication with lenders
- Proactive management and cure strategies

**Operational Covenant Compliance**
- Business restriction monitoring
- Investment and acquisition approval processes
- Capital expenditure tracking and approval
- Subsidiary and affiliate compliance
- Insurance and legal requirement maintenance

### Best Practices Implementation**

**Relationship Management**
- Regular lender communication and updates
- Annual relationship reviews and renewals
- Strategic partnership development
- Cross-selling opportunity identification
- Long-term relationship building

**Risk Mitigation Strategies**
- Diversified lender base development
- Covenant negotiation and optimization
- Refinancing and maturity management
- Alternative financing source development
- Credit enhancement and guarantee strategies

## Action Items

- [ ] Implement comprehensive credit risk assessment framework
- [ ] Deploy covenant monitoring and compliance systems
- [ ] Develop lender relationship management program
- [ ] Create credit risk mitigation strategies
- [ ] Establish refinancing and capacity planning processes`,
          slug: "credit-risk-management-covenant-compliance",
          weekId: week4.id,
          orderIndex: 2,
          estimatedMinutes: 85,
          published: true
        },
        // Week 5 Lessons
        {
          title: "IPO Readiness and Preparation Framework",
          content: `# IPO Readiness and Preparation Framework

## Strategic IPO Preparation for Tech Companies

IPO preparation requires comprehensive organizational, financial, and operational readiness typically taking 2-3 years to complete effectively.

### IPO Readiness Assessment

**Financial Readiness Criteria**
- Revenue scale and growth trajectory ($100M+ ARR typical minimum)
- Profitability path and margin demonstration
- Financial reporting systems and controls
- Audit-ready processes and documentation
- Revenue predictability and visibility

**Organizational Readiness**
- Public company leadership team
- Board composition and independence
- Corporate governance structure
- Risk management and compliance systems
- Scalable operational processes

### Financial Reporting and Controls

**SOX Compliance Framework**
- Internal control over financial reporting (ICFR)
- Management assessment and testing
- External auditor attestation requirements
- Deficiency remediation processes
- Ongoing monitoring and maintenance

**Public Company Reporting Standards**
- Quarterly earnings preparation and release
- Annual report (10-K) and proxy statement
- Current report (8-K) for material events
- Segment reporting and revenue recognition
- Non-GAAP reconciliation and disclosure

### IPO Process and Timeline

**Pre-Filing Phase (12-18 months)**
- Investment banker selection and engagement
- Financial and operational preparation
- Corporate structure optimization
- Draft registration statement preparation
- Due diligence preparation and documentation

**Filing and Review Phase (3-6 months)**
- Registration statement filing (S-1)
- SEC review and comment process
- Roadshow preparation and practice
- Pricing and allocation decisions
- Final prospectus and closing

### Post-IPO Considerations**

**Public Company Operations**
- Quarterly earnings process and calls
- Investor relations and communication
- Analyst coverage and guidance
- Trading compliance and insider policies
- Ongoing SEC reporting and disclosure

**Strategic Considerations**
- Capital allocation and investment decisions
- M&A activity and public company requirements
- Stock compensation and equity management
- Shareholder engagement and activism
- Long-term value creation strategies

## Action Items

- [ ] Conduct comprehensive IPO readiness assessment
- [ ] Implement SOX compliance and internal control framework
- [ ] Develop public company financial reporting systems
- [ ] Create IPO preparation timeline and milestones
- [ ] Establish post-IPO governance and compliance systems`,
          slug: "ipo-readiness-preparation-framework",
          weekId: week5.id,
          orderIndex: 1,
          estimatedMinutes: 95,
          published: true
        },
        {
          title: "Public Company Governance and Investor Relations",
          content: `# Public Company Governance and Investor Relations

## Excellence in Public Company Management

Public company governance and investor relations are critical success factors for newly public tech companies to maintain market confidence and access to capital.

### Corporate Governance Framework

**Board Composition and Structure**
- Independent director requirements and qualifications
- Committee structure (Audit, Compensation, Nominating)
- Board diversity and expertise requirements
- Director compensation and equity programs
- Annual evaluation and succession planning

**Executive Compensation**
- Say-on-pay requirements and shareholder approval
- Compensation committee independence
- Peer benchmarking and market data analysis
- Performance-based compensation design
- Clawback and risk management provisions

### Investor Relations Excellence

**Communication Strategy**
- Earnings call preparation and delivery
- Investor day planning and execution
- Analyst and investor meeting management
- Conference participation and speaking
- Crisis communication and issue management

**Performance Communication**
- Financial metrics and KPI reporting
- Non-GAAP reconciliation and explanation
- Forward guidance and outlook communication
- Strategic initiative progress updates
- Competitive positioning and market dynamics

### Regulatory Compliance and Risk Management

**SEC Reporting Excellence**
- Timely filing requirements and deadlines
- Materiality assessment and disclosure decisions
- Risk factor identification and updates
- Legal proceeding disclosure and management
- Related party transaction approval and disclosure

**Trading Compliance**
- Insider trading policies and procedures
- 10b5-1 plan implementation and management
- Trading window and blackout period management
- Executive and director trading compliance
- Material non-public information protocols

### Long-term Value Creation**

**Strategic Planning and Execution**
- Long-term strategic plan communication
- Capital allocation strategy and explanation
- Market expansion and growth initiatives
- Innovation and R&D investment strategies
- ESG (Environmental, Social, Governance) framework

**Stakeholder Management**
- Institutional investor engagement
- Retail investor communication
- Employee communication and engagement
- Customer and partner relationship management
- Community and stakeholder relations

## Action Items

- [ ] Establish comprehensive corporate governance framework
- [ ] Develop investor relations strategy and capabilities
- [ ] Implement regulatory compliance and risk management systems
- [ ] Create long-term value creation and communication strategy
- [ ] Build stakeholder management and engagement programs`,
          slug: "public-company-governance-investor-relations",
          weekId: week5.id,
          orderIndex: 2,
          estimatedMinutes: 90,
          published: true
        }
      ]
    });

    // Week 4 Quiz
    await prisma.quiz.create({
      data: {
        title: "Debt Financing and Credit Facilities",
        description: "Test your understanding of debt financing strategies, credit facility structuring, and covenant management.",
        weekId: week4.id,
        timeLimit: 30,
        passingScore: 70,
        questions: {
          create: [
            {
              questionText: "What is the primary advantage of debt financing over equity financing for profitable companies?",
              questionType: "multiple-choice",
              options: [
                "Lower cost of capital in all situations",
                "No repayment obligations",
                "Tax deductibility of interest and no equity dilution",
                "More flexible terms and conditions"
              ],
              correctAnswer: "Tax deductibility of interest and no equity dilution",
              explanation: "Debt financing offers tax benefits through interest deductibility and preserves equity ownership, making it attractive for profitable companies with stable cash flows.",
              orderIndex: 1
            },
            {
              questionText: "Which type of credit facility provides the most flexibility for managing working capital needs?",
              questionType: "multiple-choice",
              options: [
                "Term loan with fixed payments",
                "Revolving credit line that can be borrowed and repaid",
                "Equipment financing secured by assets",
                "Invoice factoring arrangements"
              ],
              correctAnswer: "Revolving credit line that can be borrowed and repaid",
              explanation: "Revolving credit facilities provide maximum flexibility by allowing companies to borrow, repay, and re-borrow as needed, with interest charged only on outstanding balances.",
              orderIndex: 2
            },
            {
              questionText: "What should companies focus on when negotiating debt covenants?",
              questionType: "multiple-choice",
              options: [
                "Accepting all lender requirements to get approval",
                "Negotiating adequate headroom and realistic metrics based on business projections",
                "Eliminating all covenants completely",
                "Focusing only on interest rate minimization"
              ],
              correctAnswer: "Negotiating adequate headroom and realistic metrics based on business projections",
              explanation: "Effective covenant negotiation ensures adequate headroom for business operations while maintaining realistic metrics that align with business projections and seasonal variations.",
              orderIndex: 3
            },
            {
              questionText: "When is venture debt most appropriate for tech companies?",
              questionType: "multiple-choice",
              options: [
                "As a replacement for all equity financing",
                "When companies have no revenue or cash flow",
                "As a complement to equity financing to extend runway and reduce dilution",
                "Only for companies preparing for IPO"
              ],
              correctAnswer: "As a complement to equity financing to extend runway and reduce dilution",
              explanation: "Venture debt works best as a complement to equity financing, helping extend cash runway and reduce equity dilution for companies with growing revenues and strong fundamentals.",
              orderIndex: 4
            },
            {
              questionText: "What is the most important factor in maintaining strong lender relationships?",
              questionType: "multiple-choice",
              options: [
                "Never communicating problems or challenges",
                "Regular communication, transparency, and proactive covenant management",
                "Always accepting the first terms offered",
                "Minimizing all contact with lenders"
              ],
              correctAnswer: "Regular communication, transparency, and proactive covenant management",
              explanation: "Strong lender relationships require regular communication, transparency about business performance and challenges, and proactive management of covenant compliance and expectations.",
              orderIndex: 5
            }
          ]
        },
        published: true
      }
    });

    // Week 5 Quiz
    await prisma.quiz.create({
      data: {
        title: "IPO Preparation and Public Company Requirements",
        description: "Test your understanding of IPO readiness requirements, public company reporting, and governance frameworks.",
        weekId: week5.id,
        timeLimit: 30,
        passingScore: 70,
        questions: {
          create: [
            {
              questionText: "What is typically the minimum annual recurring revenue (ARR) threshold for tech companies considering IPO?",
              questionType: "multiple-choice",
              options: [
                "$25 million ARR",
                "$50 million ARR",
                "$100 million ARR",
                "$500 million ARR"
              ],
              correctAnswer: "$100 million ARR",
              explanation: "Most tech companies going public have achieved at least $100 million in ARR, demonstrating significant scale, market validation, and revenue predictability required by public markets.",
              orderIndex: 1
            },
            {
              questionText: "What is the primary purpose of SOX compliance for public companies?",
              questionType: "multiple-choice",
              options: [
                "To increase company revenue",
                "To ensure accurate financial reporting through internal controls",
                "To reduce corporate tax obligations",
                "To eliminate all business risks"
              ],
              correctAnswer: "To ensure accurate financial reporting through internal controls",
              explanation: "SOX compliance establishes internal controls over financial reporting (ICFR) to ensure accurate, reliable financial statements and prevent financial fraud.",
              orderIndex: 2
            },
            {
              questionText: "How long does the typical IPO preparation process take from initial decision to going public?",
              questionType: "multiple-choice",
              options: [
                "6-12 months",
                "12-18 months",
                "2-3 years",
                "5+ years"
              ],
              correctAnswer: "2-3 years",
              explanation: "Comprehensive IPO preparation typically takes 2-3 years to address financial systems, governance, compliance, leadership, and operational readiness requirements.",
              orderIndex: 3
            },
            {
              questionText: "What is the most critical component of effective investor relations for public companies?",
              questionType: "multiple-choice",
              options: [
                "Promising unrealistic growth targets",
                "Avoiding all difficult questions from analysts",
                "Consistent, transparent communication of performance and strategy",
                "Focusing only on positive news and results"
              ],
              correctAnswer: "Consistent, transparent communication of performance and strategy",
              explanation: "Effective investor relations requires consistent, transparent communication about both positive and challenging aspects of business performance, strategy, and outlook.",
              orderIndex: 4
            },
            {
              questionText: "Which board committee is required for all public companies and focuses on financial oversight?",
              questionType: "multiple-choice",
              options: [
                "Compensation Committee",
                "Audit Committee with independent directors",
                "Technology Committee",
                "Strategy Committee"
              ],
              correctAnswer: "Audit Committee with independent directors",
              explanation: "The Audit Committee, composed entirely of independent directors, is required for all public companies and oversees financial reporting, internal controls, and external auditor relationships.",
              orderIndex: 5
            }
          ]
        },
        published: true
      }
    });

    console.log('🎉 Course 12: Corporate Finance for Scale-ups created successfully!');
    console.log(`📚 Course includes:`);
    console.log(`   • 5 comprehensive weeks`);
    console.log(`   • 10 professional lessons`);
    console.log(`   • Weekly assessment quizzes`);
    console.log(`   • Expert instructor: Patricia Williams`);
    console.log(`   • Target: Series A+ tech companies`);
    console.log(`   • Duration: 40 hours total`);

  } catch (error) {
    console.error('❌ Error creating Course 12:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  createCourse12()
    .then(() => {
      console.log('✅ Course 12 creation completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Course 12 creation failed:', error);
      process.exit(1);
    });
}

export default createCourse12;