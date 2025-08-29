import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addWeek7() {
  console.log('🚀 Adding Week 7: Performance Metrics and KPIs...')

  try {
    // Get the existing course
    const course = await prisma.course.findFirst({
      where: { slug: 'finacademy-for-developers' }
    })

    if (!course) {
      throw new Error('Course not found')
    }

    // Find existing Week 7
    const existingWeek = await prisma.week.findFirst({
      where: {
        courseId: course.id,
        weekNumber: 7
      }
    })

    if (!existingWeek) {
      console.log('❌ Week 7 not found, cannot update')
      return
    }

    console.log('📚 Updating Week 7...')

    // Update Week 7 with comprehensive content
    await prisma.week.update({
      where: { id: existingWeek.id },
      data: {
        title: 'Performance Metrics and KPIs',
        overview: 'Master the key performance indicators and metrics that drive developer business success. Learn to measure, analyze, and optimize your business performance.',
        learningObjectives: JSON.stringify([
          'Understand essential business KPIs for developers',
          'Learn to create effective dashboards and reporting',
          'Master customer and financial metrics',
          'Understand operational efficiency metrics',
          'Learn to use metrics for strategic decision making'
        ]),
        estimatedHours: 7.5, // Total of all lessons
      }
    })

    console.log('📝 Adding lessons to Week 7...')

    // Delete existing lessons for Week 7 if any
    await prisma.lesson.deleteMany({
      where: { weekId: existingWeek.id }
    })

    // Add new lessons
    const lessons = [
      {
        title: 'Essential Business KPIs for Developers',
        slug: 'essential-business-kpis',
        content: `# Essential Business KPIs for Developers

## Introduction to Business Metrics

As a developer running your own business, you have an advantage: you understand data and can build systems to track it. However, knowing which metrics matter and how to interpret them is crucial for success.

### Why KPIs Matter for Developer Businesses

**Data-Driven Decisions:**
- Remove emotion and bias from business decisions
- Identify problems before they become critical
- Spot opportunities for growth and optimization
- Track progress toward specific goals

**Competitive Advantage:**
- Most small businesses don't track metrics systematically
- Your technical skills make metric collection easier
- Data can reveal hidden patterns and insights
- Metrics enable rapid iteration and improvement

## Financial Performance KPIs

### Revenue Metrics

**Monthly Recurring Revenue (MRR)**
- Most important metric for subscription businesses
- Calculation: Sum of all monthly subscriptions
- Tracking: Monitor growth rate month-over-month
- Target: 15-20% monthly growth for SaaS startups

**Annual Contract Value (ACV)**
- Important for B2B services and enterprise deals
- Calculation: Total contract value / contract years
- Tracking: Average ACV and ACV growth over time
- Insight: Higher ACV often means better customer fit

**Revenue Per Customer**
- Measures average value of each customer relationship
- Calculation: Total revenue / number of customers
- Tracking: Monitor trends over time
- Goal: Increase through upselling and optimization

### Key Action Items

1. **Audit Current Metrics** - List all metrics you currently track
2. **Choose 5-7 Key KPIs** - Select metrics aligned with business goals
3. **Set Up Data Collection** - Integrate necessary tools and systems
4. **Create Dashboard** - Use tools like Google Data Studio or custom solution
5. **Establish Review Cadence** - Schedule regular metric reviews

Remember: The goal isn't to track everything, but to track the right things that help you make better business decisions.`,
        orderIndex: 1,
        durationMinutes: 90
      },
      {
        title: 'Customer and Sales Analytics',
        slug: 'customer-sales-analytics',
        content: `# Customer and Sales Analytics for Developer Businesses

## Understanding Your Customer Data

Customer analytics is the foundation of sustainable business growth. As a developer, you have unique opportunities to collect and analyze customer data that many traditional businesses miss.

### The Customer Journey Analytics

**Awareness Stage**
- Website traffic sources and quality
- Content engagement metrics
- Social media reach and interaction
- Brand search volume and mentions

**Consideration Stage**
- Email signup conversion rates
- Content download and engagement
- Demo or trial requests
- Pricing page views and time spent

**Decision Stage**
- Proposal acceptance rates
- Sales cycle length by deal size
- Objection patterns and frequency
- Competitive loss analysis

### Customer Segmentation Analytics

**Behavioral Segmentation**
- Power users (high engagement, many features)
- Core users (regular usage, key features)
- Light users (minimal usage, basic features)
- At-risk users (declining usage patterns)

**Value-Based Segments**
- High-value customers (top 20% of revenue)
- Growth customers (expanding usage/spending)
- Stable customers (consistent moderate value)
- Price-sensitive customers (primarily choosing on price)

### Sales Funnel Analytics

**Lead Generation Analysis**
Track leads and customers by source:
- Organic search: Cost per lead, conversion rate
- Paid advertising: CAC, ROAS, conversion quality
- Content marketing: Lead quality, nurturing effectiveness
- Referrals: Volume, conversion rate, source quality

**Pipeline Velocity**
Formula: (Number of opportunities × Average deal size × Win rate) / Sales cycle length

### Action Items

1. **Set Up Basic Analytics** - Install customer analytics tools
2. **Implement Health Scoring** - Define health score components
3. **Analyze Sales Funnel** - Map current sales process
4. **Start Customer Surveys** - Implement NPS surveys
5. **Build Revenue Forecasting** - Create basic MRR tracking

Remember: Customer analytics is about understanding your customers deeply so you can serve them better and grow your business sustainably.`,
        orderIndex: 2,
        durationMinutes: 85
      },
      {
        title: 'Financial Dashboard Creation',
        slug: 'financial-dashboard-creation',
        content: `# Creating Effective Financial Dashboards for Developer Businesses

## Introduction to Financial Dashboards

A well-designed financial dashboard transforms raw data into actionable insights. As a developer, you have the technical skills to create sophisticated dashboards that most business owners only dream of.

### Why Financial Dashboards Matter

**Real-Time Decision Making**
- Spot problems before they become critical
- Identify opportunities as they emerge
- Make data-driven decisions quickly
- Track progress toward financial goals

**Stakeholder Communication**
- Provide clear updates to investors or partners
- Share progress with team members
- Demonstrate business health to lenders
- Support strategic planning discussions

### The 5-Second Rule

Your dashboard should answer the most important questions within 5 seconds:
- Is the business making money?
- Are we growing or declining?
- Do we have enough cash?
- Are customers happy?
- What needs immediate attention?

## Essential Financial Dashboard Components

### Executive Summary Panel
Key metrics (top row):
- Revenue (current month)
- Profit Margin (percentage)
- Cash Position (current balance)
- New Customers (count with trend)

### Revenue Analytics Panel
- Monthly revenue trend (line chart)
- Revenue by source (stacked bar chart)
- Year-over-year comparison
- Seasonal patterns visualization

### Technology Stack Options

**Budget-Friendly ($0-100/month)**
- Google Sheets + Google Data Studio
- Airtable + integrated charts
- Microsoft Excel + Power BI
- Custom React app + Chart.js

**Mid-Range ($100-500/month)**
- Tableau Public/Creator
- Looker Studio Pro
- Metabase (open source)
- Custom dashboard with cloud database

### Action Items

1. **Define Dashboard Requirements** - List key stakeholders and their needs
2. **Choose Technology Stack** - Evaluate budget and technical requirements
3. **Create MVP Dashboard** - Start with 5-7 core metrics
4. **Test and Iterate** - Get feedback from actual users
5. **Scale and Enhance** - Add advanced features as business grows

Remember: A great dashboard is not about showing all available data—it's about showing the right data in a way that drives better business decisions.`,
        orderIndex: 3,
        durationMinutes: 95
      },
      {
        title: 'Competitive Analysis and Benchmarking',
        slug: 'competitive-analysis-benchmarking',
        content: `# Competitive Analysis and Benchmarking for Developer Businesses

## Understanding Your Competitive Landscape

Competitive analysis is crucial for developer businesses because the market moves fast, barriers to entry are often low, and new solutions can disrupt established players quickly.

### Why Competitive Analysis Matters

**Market Positioning**
- Understand how you fit in the competitive landscape
- Identify your unique value proposition
- Find underserved market segments
- Position against incumbents and newcomers

**Strategic Planning**
- Anticipate competitive moves and market changes
- Identify partnership and acquisition opportunities
- Plan product roadmap based on competitive gaps
- Make informed decisions about resource allocation

### Identifying Your Competition

**Direct Competitors**
- Same technology stack or approach
- Similar pricing and business model
- Targeting identical customer segments
- Solving the same core problem

**Indirect Competitors**
- Different technology but same outcome
- In-house solutions customers might build
- Adjacent products that overlap functionality
- Manual processes or legacy systems

**Emerging Competitors**
- Well-funded startups in adjacent spaces
- Large tech companies entering your market
- Open source alternatives gaining traction
- International companies expanding globally

## Key Performance Benchmarks

### SaaS Metrics Benchmarks
- Annual Recurring Revenue (ARR) growth: 100%+ for early-stage, 40%+ for mature
- Monthly churn rate: <5% for B2B, <10% for B2C
- Gross revenue retention: 85%+ for healthy SaaS
- Net revenue retention: 110%+ for best-in-class
- Customer acquisition cost (CAC) payback: <12 months

### Service Business Benchmarks
- Gross margin: 50-70% for development services
- Utilization rate: 70-80% for sustainable consulting
- Average project size: Varies widely by market segment
- Client retention rate: 80%+ for successful service providers

### Action Items

1. **Competitive Landscape Mapping** - Identify direct and indirect competitors
2. **Benchmark Selection** - Choose 5-7 key metrics to track regularly
3. **Intelligence Gathering** - Set up automated monitoring tools
4. **Strategic Response Planning** - Identify competitive advantages to leverage
5. **Reporting and Communication** - Create executive dashboard for key stakeholders

Remember: Competitive analysis is not about copying competitors—it's about understanding the market so you can make better strategic decisions.`,
        orderIndex: 4,
        durationMinutes: 80
      },
      {
        title: 'Using Metrics for Strategic Decisions',
        slug: 'metrics-strategic-decisions',
        content: `# Using Metrics for Strategic Business Decisions

## From Data to Strategy

The ultimate value of business metrics isn't in collection or reporting—it's in using them to make better strategic decisions. This lesson focuses on translating data insights into actionable business strategy.

### The Strategic Decision-Making Process

**Step 1: Define the Decision**
- Clearly articulate the strategic question or choice
- Identify the potential options and alternatives
- Understand the stakes and consequences
- Set decision criteria and success metrics

**Step 2: Gather Relevant Data**
- Identify which metrics are most relevant to the decision
- Collect quantitative data from your systems
- Gather qualitative insights from customers and team
- Research market and competitive intelligence

**Step 3: Analyze and Interpret**
- Look for patterns, trends, and anomalies
- Consider multiple perspectives and scenarios
- Test hypotheses with available data
- Identify gaps and uncertainties

## Strategic Decision Categories

### Product Development Decisions

**Feature Prioritization**
Use metrics to decide what to build next:
- User requests and feedback volume
- Current usage patterns and pain points
- Revenue impact of missing features
- Development effort and resource allocation
- Competitive necessity and market demands

**Product-Market Fit Assessment**
Key metrics for PMF decisions:
- Net Promoter Score (NPS): >50 indicates strong fit
- Customer retention: >80% after 6 months
- Organic growth rate: >15% monthly from referrals
- Usage intensity: >3 times per week for core features
- Revenue growth: Consistent month-over-month increases

### Pricing Strategy Decisions

**Price Increase Analysis**
Before raising prices, analyze:
- Current price vs competitor pricing
- Churn rate trends and price sensitivity
- Customer complaints about pricing
- Feature requests that justify higher prices
- Revenue impact scenarios

**Value-Based Pricing Decisions**
Use customer data to set prices:
- Customer lifetime value analysis by segment
- Willingness to pay survey results
- Value realization metrics (ROI for customers)
- Price sensitivity testing through A/B tests

## Common Decision-Making Pitfalls

### Analysis Paralysis
- Problem: Collecting too much data without making decisions
- Solution: Set decision deadlines and minimum data requirements
- Framework: 70% rule - make decisions when you have 70% of ideal information

### Confirmation Bias
- Problem: Interpreting data to support pre-existing beliefs
- Solution: Actively look for disconfirming evidence
- Practice: Have team members argue opposite position

### Action Items

1. **Audit Current Decision Making** - Review recent strategic decisions
2. **Create Decision Frameworks** - Develop templates for common decision types
3. **Implement Decision Tracking** - Set up decision logs and documentation
4. **Build Team Capabilities** - Train team on key business metrics
5. **Improve Data Infrastructure** - Ensure decision-relevant metrics are easily accessible

Remember: Perfect data doesn't exist, and decisions can't wait for it. The goal is to make better decisions with available data while continuously improving your decision-making process.`,
        orderIndex: 5,
        durationMinutes: 100
      }
    ]

    for (const lessonData of lessons) {
      await prisma.lesson.create({
        data: {
          weekId: existingWeek.id,
          title: lessonData.title,
          slug: lessonData.slug,
          content: lessonData.content,
          orderIndex: lessonData.orderIndex,
          durationMinutes: lessonData.durationMinutes
        }
      })
    }

    console.log('✅ Week 7 updated successfully!')
    console.log(`📊 Added ${lessons.length} comprehensive lessons`)
    console.log(`⏱️ Total duration: ${lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0)} minutes`)

  } catch (error) {
    console.error('❌ Error updating Week 7:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addWeek7()