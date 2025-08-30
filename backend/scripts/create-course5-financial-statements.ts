import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse5() {
  try {
    console.log('🚀 Creating Course 5: Financial Statement Analysis for Founders...');

    // Check if the course already exists
    const existingCourse = await prisma.course.findFirst({
      where: {
        slug: 'financial-statement-analysis-founders'
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

    // Create Course 5: Financial Statement Analysis for Founders
    const course5 = await prisma.course.create({
      data: {
        title: 'Financial Statement Analysis for Founders',
        slug: 'financial-statement-analysis-founders',
        description: 'Learn to read, understand, and analyze financial statements to make informed business decisions. Master P&L statements, balance sheets, cash flow analysis, and key performance indicators.',
        shortDescription: 'Master financial statement analysis for data-driven business decisions',
        categoryId: category.id,
        level: 'intermediate',
        duration: '4 weeks',
        estimatedHours: 32,
        price: 19700, // $197
        originalPrice: 24700, // $247
        instructor: 'Jennifer Chen, CPA, CFA',
        instructorBio: 'Certified Public Accountant and Chartered Financial Analyst with 15+ years in financial analysis and startup advisory. Former CFO at multiple high-growth tech companies.',
        thumbnailUrl: '/images/courses/financial-statement-analysis-founders.jpg',
        orderIndex: 5,
        isPublished: true,
        isFeatured: false,
        skillsLearned: JSON.stringify([
          'Read and interpret P&L statements for business insights',
          'Understand balance sheet structure and working capital management',
          'Analyze cash flow statements and cash conversion cycles',
          'Calculate and interpret key financial ratios and KPIs',
          'Make data-driven decisions using financial analysis'
        ]),
        targetAudience: 'Startup founders, business owners, entrepreneurs, and finance team members who need to understand financial statements for strategic decision-making.',
      }
    });

    console.log('✅ Course 5 created successfully');

    // Week 1: Reading and Understanding P&L Statements
    const week1 = await prisma.week.create({
      data: {
        courseId: course5.id,
        weekNumber: 1,
        title: 'Reading and Understanding P&L Statements',
        overview: 'Master the fundamentals of profit and loss statements, understanding revenue, expenses, and profitability metrics that drive business decisions.',
        learningObjectives: JSON.stringify([
          'Understand the structure and purpose of P&L statements',
          'Analyze revenue trends and growth patterns',
          'Interpret different types of expenses and their impact',
          'Calculate and understand profitability metrics',
          'Identify red flags and opportunities in P&L data'
        ]),
        estimatedHours: 8
      }
    });

    const week1lessons = [
      {
        title: 'P&L Statement Fundamentals and Structure',
        slug: 'pl-statement-fundamentals-structure',
        content: `# P&L Statement Fundamentals and Structure

## Understanding the Profit & Loss Statement

The Profit & Loss statement (P&L), also called the Income Statement, is one of the most important financial documents for any business. It shows your company's revenues, expenses, and profits over a specific period, typically monthly, quarterly, or annually.

## Why P&L Analysis Matters for Founders

### Strategic Decision Making
- **Resource Allocation**: Where should you invest your limited resources?
- **Cost Management**: Which expenses are driving the best returns?
- **Pricing Strategy**: Are your prices supporting sustainable growth?
- **Growth Planning**: What revenue growth is realistic and sustainable?

### Investor Communication
- **Fundraising**: Investors scrutinize P&L statements to assess business viability
- **Board Reporting**: Regular P&L analysis demonstrates financial discipline
- **Valuation**: P&L trends directly impact company valuation

### Operational Excellence
- **Performance Monitoring**: Track business health in real-time
- **Trend Analysis**: Identify patterns and seasonal variations
- **Benchmarking**: Compare performance against industry standards
- **Goal Setting**: Set realistic financial targets based on historical data

## P&L Statement Structure

### Standard P&L Format

\`\`\`
TechStartup Inc.
Profit & Loss Statement
For the Month Ending March 31, 2024

REVENUE
  Gross Sales                           $125,000
  Less: Returns and Allowances           ($2,000)
  Less: Discounts                        ($3,000)
  Net Sales                             $120,000

COST OF GOODS SOLD (COGS)
  Direct Materials                        $8,000
  Direct Labor                           $15,000
  Manufacturing Overhead                  $5,000
  Total COGS                             $28,000

GROSS PROFIT                             $92,000
Gross Profit Margin: 76.7%

OPERATING EXPENSES
  Sales & Marketing
    Advertising & Promotion              $18,000
    Sales Salaries                       $20,000
    Marketing Tools                       $2,500
    Trade Shows & Events                  $3,000
    Total Sales & Marketing              $43,500

  Research & Development
    Developer Salaries                   $25,000
    Software & Tools                      $3,500
    R&D Equipment                         $1,500
    Total R&D                           $30,000

  General & Administrative
    Management Salaries                  $15,000
    Office Rent                           $4,000
    Utilities                             $1,200
    Legal & Professional Fees             $2,800
    Insurance                             $1,500
    Other Admin Expenses                  $2,500
    Total G&A                           $27,000

  Total Operating Expenses              $100,500

EBITDA (Earnings Before Interest,        ($8,500)
Taxes, Depreciation, Amortization)

  Less: Depreciation                      $2,000
  Less: Amortization                      $1,000

EBIT (Earnings Before Interest & Taxes) ($11,500)

  Less: Interest Expense                  $1,200
  Plus: Interest Income                     $300

EARNINGS BEFORE TAXES (EBT)             ($12,400)

  Less: Income Taxes                          $0

NET INCOME                              ($12,400)
Net Profit Margin: -10.3%
\`\`\`

## Key P&L Components Explained

### 1. Revenue Section

#### Gross Sales
The total amount of sales before any deductions.

**For SaaS Businesses:**
- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- One-time setup fees
- Professional services revenue

**For Service Businesses:**
- Consulting revenue
- Project-based income
- Retainer fees
- Training and support services

#### Revenue Adjustments
**Returns and Allowances:**
- Product returns
- Service credits
- Refunds issued

**Discounts:**
- Promotional discounts
- Early payment discounts
- Volume discounts
- Customer credits

#### Net Sales
The actual revenue after all adjustments. This is your "real" revenue number.

### 2. Cost of Goods Sold (COGS)

COGS represents the direct costs associated with producing your product or delivering your service.

#### Software/SaaS COGS:
- **Hosting and infrastructure** (AWS, Google Cloud, Azure)
- **Third-party APIs and services**
- **Payment processing fees**
- **Customer support costs**
- **Professional services delivery costs**

#### Service Business COGS:
- **Direct labor** (billable employee time)
- **Subcontractor costs**
- **Project-specific software licenses**
- **Travel expenses for client work**

#### Manufacturing COGS:
- **Raw materials**
- **Direct labor**
- **Factory overhead**
- **Shipping costs**

### 3. Gross Profit and Margin

**Calculation:**
Gross Profit = Net Sales - COGS
Gross Margin = (Gross Profit ÷ Net Sales) × 100

**Industry Benchmarks:**
- **SaaS**: 75-85% gross margin
- **Software Services**: 60-75%
- **Consulting**: 50-70%
- **E-commerce**: 20-40%
- **Manufacturing**: 25-35%

**Example Analysis:**
\`\`\`
Month 1: Sales $100K, COGS $25K, Gross Margin 75%
Month 2: Sales $110K, COGS $30K, Gross Margin 72.7%
Month 3: Sales $120K, COGS $28K, Gross Margin 76.7%

Analysis: Gross margin improved in Month 3, indicating 
better cost control or pricing optimization.
\`\`\`

### 4. Operating Expenses

#### Sales & Marketing
**Customer Acquisition Costs:**
- Digital advertising (Google, Facebook, LinkedIn)
- Content marketing and SEO
- Trade shows and events
- Sales team compensation
- Marketing tools and software

**Key Metrics to Track:**
- Customer Acquisition Cost (CAC)
- Marketing spend as % of revenue
- Cost per lead by channel
- Return on ad spend (ROAS)

#### Research & Development
**Innovation Investments:**
- Developer salaries and benefits
- Software development tools
- R&D equipment and infrastructure
- Patent and IP costs

**SaaS R&D Benchmarks:**
- Early stage: 20-30% of revenue
- Growth stage: 15-25% of revenue
- Mature companies: 10-20% of revenue

#### General & Administrative (G&A)
**Business Operations:**
- Management salaries
- Office rent and utilities
- Legal and professional fees
- Insurance and licenses
- Accounting and bookkeeping

**G&A Benchmarks:**
- Target: 10-15% of revenue
- Early stage: Often higher (15-25%)
- Scale efficiently as revenue grows

### 5. Profitability Metrics

#### EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization)
**Purpose:** Shows operational profitability excluding financing and accounting decisions.

**Calculation:**
EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization

**Why It Matters:**
- Compares operational efficiency across companies
- Excludes one-time and non-cash items
- Common metric for valuations and investor discussions

#### EBIT (Earnings Before Interest and Taxes)
**Purpose:** Shows profit from operations before financing costs.

**Use Cases:**
- Compare companies with different capital structures
- Assess operational efficiency
- Evaluate core business performance

#### Net Income
**The Bottom Line:** Final profit after all expenses, interest, and taxes.

**Net Margin Calculation:**
Net Margin = (Net Income ÷ Net Sales) × 100

## P&L Analysis Techniques

### 1. Vertical Analysis (Common-Size Analysis)

Express each line item as a percentage of net sales.

\`\`\`
Example Vertical Analysis:
                        Amount    % of Sales
Net Sales              $120,000     100.0%
COGS                    $28,000      23.3%
Gross Profit            $92,000      76.7%
Sales & Marketing       $43,500      36.3%
R&D                     $30,000      25.0%
G&A                     $27,000      22.5%
Total OpEx             $100,500      83.8%
EBITDA                  ($8,500)     -7.1%
\`\`\`

**Insights:**
- Gross margin is healthy at 76.7%
- Operating expenses are too high at 83.8% of revenue
- Need to either increase revenue or reduce expenses

### 2. Horizontal Analysis (Trend Analysis)

Compare performance across multiple periods.

\`\`\`
                    Jan 2024  Feb 2024  Mar 2024  Mar vs Jan
Net Sales           $100,000  $110,000  $120,000    +20.0%
COGS                 $25,000   $30,000   $28,000    +12.0%
Gross Profit         $75,000   $80,000   $92,000    +22.7%
Gross Margin           75.0%     72.7%     76.7%    +1.7pp

Sales & Marketing    $35,000   $40,000   $43,500    +24.3%
R&D                  $25,000   $28,000   $30,000    +20.0%
G&A                  $22,000   $24,000   $27,000    +22.7%
Total OpEx           $82,000   $92,000  $100,500    +22.6%

EBITDA              ($7,000)  ($12,000)  ($8,500)   -21.4%
\`\`\`

**Key Insights:**
- Revenue growing 20% over 3 months (good)
- COGS growing slower than revenue (improving efficiency)
- Operating expenses growing at same rate as revenue (concerning)
- EBITDA improving but still negative (need path to profitability)

### 3. Ratio Analysis

#### Profitability Ratios
- **Gross Margin** = Gross Profit ÷ Net Sales
- **Operating Margin** = Operating Profit ÷ Net Sales  
- **Net Margin** = Net Income ÷ Net Sales
- **EBITDA Margin** = EBITDA ÷ Net Sales

#### Efficiency Ratios
- **Revenue per Employee** = Net Sales ÷ Number of Employees
- **OpEx Ratio** = Operating Expenses ÷ Net Sales
- **Sales Efficiency** = Net Sales ÷ Sales & Marketing Expense

## Red Flags in P&L Analysis

### Revenue Red Flags
- **Declining revenue trends** without clear explanation
- **Heavy dependence on few customers** (revenue concentration)
- **Seasonal variations** not accounted for in planning
- **Revenue recognition issues** (aggressive accounting)

### Expense Red Flags
- **Operating expenses growing faster than revenue**
- **Gross margins declining** over time
- **Unusually high G&A expenses** for company stage
- **Lack of expense discipline** in discretionary spending

### Profitability Red Flags
- **No path to profitability** visible in projections
- **Deteriorating unit economics**
- **Cash burn exceeding fundraising plans**
- **Negative gross margins** (unsustainable business model)

## Industry Benchmarking

### SaaS Benchmarks
\`\`\`
Metric                  Early Stage  Growth Stage  Mature
Gross Margin               75-80%       80-85%      85-90%
Sales & Marketing          50-100%      30-50%      20-35%
R&D                        20-30%       15-25%      10-20%
G&A                        15-25%       10-20%      8-15%
EBITDA Margin              Negative     5-20%       20-30%
\`\`\`

### Service Business Benchmarks
\`\`\`
Metric                  Consulting   Agencies   Professional
Gross Margin               50-70%      60-75%      70-80%
Sales & Marketing          10-20%      15-25%      8-15%
G&A                        15-25%      10-20%      12-18%
Net Margin                 10-20%      15-25%      15-25%
\`\`\`

## Action Steps for P&L Analysis

### Monthly Review Process
1. **Revenue Analysis**
   - Compare actual vs. budget and prior period
   - Analyze revenue by source/channel
   - Calculate key revenue metrics (MRR, ARPU, etc.)

2. **Cost Analysis**
   - Review COGS trends and unit economics
   - Analyze operating expense categories
   - Identify cost optimization opportunities

3. **Profitability Assessment**
   - Calculate all profitability ratios
   - Compare to industry benchmarks
   - Forecast path to profitability

4. **Action Planning**
   - Identify specific improvement initiatives
   - Set targets for next period
   - Align spending with strategic priorities

## Key Takeaways

- P&L statements tell the story of your business performance
- Focus on trends and ratios, not just absolute numbers
- Benchmark against industry standards for your stage
- Use P&L analysis to drive strategic decision-making
- Regular review and analysis enables proactive management
- Understanding P&L structure is essential for fundraising and investor relations

Mastering P&L analysis gives founders the insights needed to build sustainable, profitable businesses and communicate effectively with investors and stakeholders.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 95
      },
      {
        title: 'Revenue Analysis and Profitability Metrics',
        slug: 'revenue-analysis-profitability-metrics',
        content: `# Revenue Analysis and Profitability Metrics

## Deep Dive into Revenue Analysis

Revenue analysis goes beyond simply looking at top-line growth. For founders, understanding revenue composition, trends, and quality is crucial for making strategic decisions and communicating with investors.

## Revenue Recognition and Quality

### Revenue Recognition Principles
Not all revenue is created equal. Understanding when and how to recognize revenue impacts both your P&L and decision-making.

#### Cash vs. Accrual Accounting Impact
**Cash Basis:**
- Revenue recorded when payment received
- Simple but can mislead on business performance
- Not GAAP compliant for most businesses

**Accrual Basis:**
- Revenue recorded when earned, regardless of payment timing
- Required for businesses with >$27M annual revenue
- Provides better picture of business performance

**Example Comparison:**
\`\`\`
Transaction: $50,000 annual contract signed Jan 1, paid in full

Cash Basis:
January: $50,000 revenue
Feb-Dec: $0 revenue

Accrual Basis:
Jan-Dec: $4,167 revenue per month ($50,000 ÷ 12)
\`\`\`

### Revenue Quality Assessment

#### High-Quality Revenue Characteristics
1. **Recurring and Predictable**
   - Subscription revenue
   - Long-term contracts
   - Repeat customers

2. **Diversified Customer Base**
   - No customer >10% of revenue
   - Multiple revenue streams
   - Geographic diversification

3. **Growing Average Contract Value**
   - Customers upgrading over time
   - Successful upselling/cross-selling
   - Premium pricing acceptance

4. **Strong Customer Retention**
   - Low churn rates
   - High Net Revenue Retention (NRR)
   - Expanding customer relationships

#### Revenue Quality Red Flags
- **Customer concentration risk** (few customers = majority of revenue)
- **One-time revenue spikes** without underlying business improvement
- **Declining average selling prices** due to competitive pressure
- **Channel conflict** or dependencies on single distribution partners

## Revenue Analysis Framework

### 1. Revenue Composition Analysis

Break down revenue by multiple dimensions to understand your business drivers.

#### By Revenue Type
\`\`\`
SaaS Business Example - March 2024:

Subscription Revenue:        $85,000  (70.8%)
  - Basic Plans:             $25,000  (20.8%)
  - Professional Plans:      $45,000  (37.5%)
  - Enterprise Plans:        $15,000  (12.5%)

One-time Revenue:            $35,000  (29.2%)
  - Setup/Onboarding:        $12,000  (10.0%)
  - Custom Development:      $18,000  (15.0%)
  - Training Services:        $5,000   (4.2%)

Total Revenue:              $120,000  (100.0%)

Analysis:
- Strong recurring revenue base (70.8%)
- Healthy mix of plan types
- Professional plans driving most subscription revenue
- One-time services provide additional value
\`\`\`

#### By Customer Segment
\`\`\`
Consulting Business Example:

Small Business (<50 employees):   $45,000  (37.5%)
Mid-Market (50-500 employees):    $55,000  (45.8%)
Enterprise (500+ employees):      $20,000  (16.7%)

Total Revenue:                   $120,000  (100.0%)

Analysis:
- Good diversification across segments
- Mid-market providing highest revenue
- Opportunity to grow enterprise segment
\`\`\`

#### By Geographic Region
\`\`\`
Regional Revenue Distribution:

North America:                   $72,000  (60.0%)
Europe:                          $30,000  (25.0%)  
Asia-Pacific:                    $12,000  (10.0%)
Other:                            $6,000   (5.0%)

Total Revenue:                   $120,000  (100.0%)
\`\`\`

### 2. Revenue Growth Analysis

#### Month-over-Month Growth
\`\`\`
Revenue Growth Analysis:
                   Revenue    MoM Growth    YoY Growth
Jan 2024          $100,000        5.0%        45.0%
Feb 2024          $110,000       10.0%        47.5%
Mar 2024          $120,000        9.1%        50.0%

Avg Monthly Growth: 8.0%
Annual Growth Rate: 96% (if sustained)

Analysis:
- Strong consistent growth
- Accelerating year-over-year growth
- Growth rate sustainable for current stage
\`\`\`

#### Compound Annual Growth Rate (CAGR)
**Formula:** CAGR = (Ending Value / Beginning Value)^(1/years) - 1

**Example:**
\`\`\`
2022 Annual Revenue: $500,000
2024 Annual Revenue: $1,800,000
Period: 2 years

CAGR = ($1,800,000 ÷ $500,000)^(1/2) - 1
CAGR = (3.6)^0.5 - 1 = 89.7%

This represents very strong growth for a startup.
\`\`\`

### 3. Revenue Per Customer Metrics

#### Average Revenue Per User (ARPU)
**Monthly ARPU Calculation:**
ARPU = Monthly Recurring Revenue ÷ Number of Active Users

\`\`\`
March 2024 ARPU Analysis:
MRR: $85,000
Active Users: 340
ARPU: $250/month

ARPU Trends:
Jan 2024: $230/month
Feb 2024: $240/month  
Mar 2024: $250/month

Analysis: ARPU growing 4.3% monthly, indicating successful 
upselling or premium feature adoption.
\`\`\`

#### Customer Lifetime Value (CLV)
**Simple CLV Calculation:**
CLV = (Average Monthly Revenue per Customer × Gross Margin %) ÷ Monthly Churn Rate

\`\`\`
CLV Calculation Example:
Average Monthly Revenue: $250
Gross Margin: 80%
Monthly Churn Rate: 2%

CLV = ($250 × 0.80) ÷ 0.02 = $10,000

Customer Acquisition Cost (CAC): $500
CLV:CAC Ratio: 20:1 (Excellent - target is 3:1 minimum)
\`\`\`

## Profitability Metrics Deep Dive

### 1. Gross Profit Analysis

#### Gross Margin Trends
\`\`\`
Quarterly Gross Margin Analysis:
                Revenue    COGS    Gross Profit  Gross Margin
Q4 2023        $270,000   $81,000   $189,000      70.0%
Q1 2024        $330,000   $89,100   $240,900      73.0%
Q2 2024        $360,000   $93,600   $266,400      74.0%

Trend Analysis:
- Gross margin improving quarter over quarter
- COGS growing slower than revenue (good efficiency)
- Q2 margin approaching SaaS benchmark of 75-85%
\`\`\`

#### Unit Economics
**Per-Customer Unit Economics:**
\`\`\`
Average Customer Metrics:
Monthly Revenue per Customer:     $250
Monthly COGS per Customer:        $65
Monthly Gross Profit per Customer: $185
Monthly Gross Margin:             74%

Annual Customer Economics:
Annual Revenue per Customer:      $3,000
Annual COGS per Customer:         $780
Annual Gross Profit per Customer: $2,220
\`\`\`

### 2. Operating Leverage Analysis

Operating leverage measures how operating income changes relative to sales changes.

#### Degree of Operating Leverage (DOL)
**Formula:** DOL = % Change in EBIT ÷ % Change in Sales

\`\`\`
Operating Leverage Example:

Q1 to Q2 2024:
Sales Growth: 9.1% ($330K to $360K)
EBIT Growth: 25% ($15K to $18.75K)

DOL = 25% ÷ 9.1% = 2.75

Analysis: For every 1% increase in sales, EBIT increases 
2.75%. High operating leverage indicates good scalability.
\`\`\`

#### Fixed vs. Variable Cost Analysis
\`\`\`
Cost Structure Analysis:

Variable Costs (scale with revenue):
- Payment processing fees: 2.9% of revenue
- Hosting/infrastructure: ~1.5% of revenue  
- Customer support: ~2% of revenue
Total Variable Costs: 6.4% of revenue

Fixed Costs (don't scale with revenue):
- Salaries and benefits: $45,000/month
- Office rent: $4,000/month
- Software licenses: $3,500/month
- Other fixed: $7,500/month
Total Fixed Costs: $60,000/month

Break-even Analysis:
Break-even Revenue = Fixed Costs ÷ (1 - Variable Cost %)
Break-even = $60,000 ÷ (1 - 0.064) = $64,103/month

Current Revenue: $120,000/month
Safety Margin: 87% above break-even
\`\`\`

### 3. Advanced Profitability Metrics

#### Contribution Margin
**By Product/Service Line:**
\`\`\`
Product Line Analysis:

SaaS Platform:
Revenue: $85,000
Variable Costs: $8,500 (10%)
Contribution Margin: $76,500 (90%)

Professional Services:  
Revenue: $35,000
Variable Costs: $21,000 (60% - labor intensive)
Contribution Margin: $14,000 (40%)

Weighted Average Contribution Margin:
($76,500 + $14,000) ÷ $120,000 = 75.4%
\`\`\`

#### Customer Acquisition Payback Period
**Formula:** Payback Period = Customer Acquisition Cost ÷ Monthly Gross Profit per Customer

\`\`\`
Payback Period Calculation:
CAC: $500 (blended across all channels)
Monthly Gross Profit per Customer: $185
Payback Period: $500 ÷ $185 = 2.7 months

Channel-Specific Analysis:
Paid Advertising CAC: $650, Payback: 3.5 months
Organic/Referral CAC: $200, Payback: 1.1 months
Content Marketing CAC: $350, Payback: 1.9 months

Strategy: Focus more investment on organic and content 
channels with faster payback periods.
\`\`\`

## Revenue Forecasting and Modeling

### 1. Bottom-Up Revenue Forecasting

#### SaaS Revenue Model
\`\`\`
Monthly Cohort Model:
                 Apr    May    Jun    Jul    Aug    Sep
New Customers     50     55     60     65     70     75
Monthly Churn%     2%     2%     2%     2%     2%     2%
ARPU           $250   $255   $260   $265   $270   $275

Apr Cohort:
Month 1: 50 × $250 = $12,500
Month 2: 49 × $255 = $12,495  
Month 3: 48 × $260 = $12,480
(continues with 2% monthly churn)

Total MRR Build:
Apr: $12,500
May: $12,495 + $14,025 = $26,520
Jun: $12,480 + $13,765 + $15,600 = $41,845
\`\`\`

#### Service Business Revenue Model
\`\`\`
Pipeline-Based Forecasting:
                   Probability  Timeline  Expected Value
Qualified Leads        100%    Current      $50,000
Proposals Sent          60%    30 days      $90,000
In Negotiation         80%     15 days      $64,000
Verbal Commit          95%      7 days      $47,500

Weighted Pipeline Value: $251,500
Conservative (50% haircut): $125,750
\`\`\`

### 2. Scenario Planning

#### Revenue Sensitivity Analysis
\`\`\`
Base Case Assumptions:
- Customer growth: 10%/month
- Churn rate: 2%/month  
- ARPU growth: 2%/month

Scenarios:
                  Optimistic   Base Case   Conservative
Customer Growth       15%         10%           5%
Churn Rate             1%          2%           3%
ARPU Growth            3%          2%           1%

6-Month Revenue Projections:
Optimistic:        $195,000
Base Case:         $165,000  
Conservative:      $140,000

Use for: Budget planning, cash flow forecasting, 
investor discussions, stress testing
\`\`\`

## Cohort Analysis for Revenue

### Monthly Revenue Cohorts
\`\`\`
Revenue Retention by Cohort (showing monthly revenue):

Cohort    Month 0  Month 1  Month 2  Month 3  Month 6  Month 12
Jan 2023   $10,000   $9,800   $9,600   $9,500  $9,200   $8,900
Feb 2023   $11,000  $10,890  $10,780  $10,670 $10,340  $10,010
Mar 2023   $12,000  $11,880  $11,760  $11,640 $11,280  $10,920

Revenue Retention Analysis:
- Month 1: ~99% retention (excellent)
- Month 3: ~97% retention (very good)
- Month 12: ~89% retention (good for SaaS)

Net Revenue Retention:
Some customers expanding accounts offset churn
Jan 2023 cohort at Month 12: 105% NRR
Feb 2023 cohort at Month 12: 108% NRR
\`\`\`

## Key Performance Indicators (KPIs)

### Revenue KPIs Dashboard
\`\`\`
Monthly Revenue KPIs:

Growth Metrics:
- MoM Revenue Growth: 9.1%
- YoY Revenue Growth: 50%
- Quarterly Growth Rate: 33%

Quality Metrics:  
- Revenue Concentration (top 3 customers): 18%
- Recurring Revenue %: 71%
- Net Revenue Retention: 108%

Efficiency Metrics:
- Revenue per Employee: $15,000
- Sales Efficiency (Rev/Sales Spend): 2.8x
- Customer Acquisition Cost: $500
\`\`\`

### Leading vs. Lagging Indicators
\`\`\`
Leading Indicators (predict future revenue):
- Website traffic growth
- Lead generation volume
- Pipeline value
- Free trial conversions
- Sales qualified leads

Lagging Indicators (show results):
- Monthly recurring revenue
- Customer lifetime value
- Revenue growth rate
- Customer churn rate
- Annual contract value
\`\`\`

## Industry Benchmarking

### SaaS Benchmarks by Stage
\`\`\`
                     Seed     Series A   Series B+
ARR                 <$1M      $2-10M     $10M+
YoY Growth Rate     100%+      80%+       40%+
Net Revenue Retention 90%+     100%+      110%+
Gross Revenue Retention 85%+   90%+       95%+
Monthly Churn Rate   5-10%     2-5%       1-2%
\`\`\`

### Service Business Benchmarks
\`\`\`
                    Consulting  Agency  Professional
Revenue/Employee      $150K     $200K     $300K
Utilization Rate       65%       75%       80%
Gross Margin          60%       70%       75%
Client Retention      85%       90%       95%
\`\`\`

## Action Items for Revenue Analysis

### Weekly Revenue Review
1. **Track key metrics** against targets
2. **Analyze conversion funnel** performance  
3. **Review customer health** scores
4. **Update revenue forecasts** based on pipeline

### Monthly Deep Dive
1. **Cohort analysis** of customer revenue retention
2. **Segment analysis** by customer type/size
3. **Channel performance** assessment
4. **Unit economics** validation

### Quarterly Strategic Review
1. **Market opportunity** re-assessment
2. **Pricing strategy** optimization
3. **Go-to-market** effectiveness
4. **Revenue model** evolution

## Key Takeaways

- Revenue quality matters as much as revenue quantity
- Understand your unit economics at a granular level
- Use cohort analysis to identify trends and patterns
- Focus on metrics that drive sustainable growth
- Benchmark against industry standards for your stage
- Regular analysis enables proactive decision-making

Mastering revenue analysis gives founders the insights needed to optimize growth, improve unit economics, and build sustainable competitive advantages.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 110
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
        title: 'P&L Statement Analysis Mastery Quiz',
        description: 'Test your understanding of P&L statement structure and analysis techniques',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'What does EBITDA stand for and why is it important for business analysis?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Earnings Before Interest, Taxes, Dividends, and Amortization - shows cash flow',
                'Earnings Before Interest, Taxes, Depreciation, and Amortization - shows operational profitability',
                'Earnings Before Income, Taxes, Debt, and Assets - shows financial health',
                'Earnings Before Investment, Technology, Development, and Advertising - shows growth potential'
              ]),
              correctAnswer: 'Earnings Before Interest, Taxes, Depreciation, and Amortization - shows operational profitability',
              explanation: 'EBITDA shows operational profitability by excluding financing decisions, tax strategies, and accounting methods, making it useful for comparing operational efficiency across companies.',
              orderIndex: 1
            },
            {
              questionText: 'A SaaS company has $100,000 revenue and $25,000 COGS. What is their gross margin and how does it compare to industry benchmarks?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '75% - Below average for SaaS (should be 80-85%)',
                '75% - Exactly average for SaaS industry',
                '75% - Above average for SaaS (typical is 60-70%)',
                '25% - This represents the gross margin percentage'
              ]),
              correctAnswer: '75% - Below average for SaaS (should be 80-85%)',
              explanation: 'Gross margin = ($100,000 - $25,000) ÷ $100,000 = 75%. While good, this is below the SaaS benchmark of 80-85% gross margin.',
              orderIndex: 2
            },
            {
              questionText: 'In vertical analysis of a P&L statement, what does it mean if Sales & Marketing expenses are 45% of revenue?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'This is always too high and should be reduced immediately',
                'This could be appropriate for an early-stage company focused on growth',
                'This indicates the company is not investing enough in growth',
                'This percentage should always equal the gross margin percentage'
              ]),
              correctAnswer: 'This could be appropriate for an early-stage company focused on growth',
              explanation: 'Early-stage companies often spend 50-100% of revenue on sales and marketing to fuel rapid growth, while mature companies typically spend 20-35%.',
              orderIndex: 3
            },
            {
              questionText: 'What is a red flag when analyzing revenue quality in a P&L statement?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Revenue growing consistently month over month',
                'Multiple revenue streams from different customer segments',
                'One customer representing 40% of total revenue',
                'Increasing average revenue per customer over time'
              ]),
              correctAnswer: 'One customer representing 40% of total revenue',
              explanation: 'Customer concentration risk is a major red flag. Having one customer represent >10-20% of revenue creates vulnerability if that customer is lost.',
              orderIndex: 4
            },
            {
              questionText: 'If a company has $50,000 monthly revenue and $45,000 monthly operating expenses, what should be the primary focus?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Increase prices immediately to improve margins',
                'Focus on increasing revenue while controlling expense growth',
                'Cut operating expenses by 50% immediately',
                'The current situation is ideal and sustainable'
              ]),
              correctAnswer: 'Focus on increasing revenue while controlling expense growth',
              explanation: 'With operating expenses at 90% of revenue, the company needs to grow revenue faster than expenses grow to achieve sustainable profitability.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 1 created with 2 lessons and 1 quiz');

    // Week 2: Balance Sheet Fundamentals
    const week2 = await prisma.week.create({
      data: {
        courseId: course5.id,
        weekNumber: 2,
        title: 'Balance Sheet Fundamentals',
        overview: 'Understand balance sheet structure, working capital management, and how balance sheet health impacts business operations and growth.',
        learningObjectives: JSON.stringify([
          'Understand balance sheet structure and the accounting equation',
          'Analyze assets, liabilities, and equity components',
          'Calculate and interpret working capital metrics',
          'Assess financial health using balance sheet ratios',
          'Understand the relationship between balance sheet and cash flow'
        ]),
        estimatedHours: 8
      }
    });

    const week2lessons = [
      {
        title: 'Balance Sheet Structure and Analysis',
        slug: 'balance-sheet-structure-analysis',
        content: `# Balance Sheet Structure and Analysis

## Understanding the Balance Sheet

The balance sheet provides a snapshot of your company's financial position at a specific point in time. Unlike the P&L statement which shows performance over a period, the balance sheet shows what you own (assets), what you owe (liabilities), and what's left over (equity) at a specific date.

## The Fundamental Accounting Equation

**Assets = Liabilities + Equity**

This equation must always balance, which is why it's called a "balance sheet."

### Why This Equation Matters
- **Assets** represent resources available to generate future economic benefits
- **Liabilities** represent obligations that must be fulfilled
- **Equity** represents the owners' residual interest in the company

## Balance Sheet Structure

### Standard Balance Sheet Format
\`\`\`
TechStartup Inc.
Balance Sheet
As of March 31, 2024

ASSETS
Current Assets:
  Cash and Cash Equivalents           $125,000
  Accounts Receivable                  $85,000
  Less: Allowance for Doubtful Accounts ($2,500)
  Net Accounts Receivable              $82,500
  Prepaid Expenses                     $15,000
  Inventory                            $10,000
  Other Current Assets                  $7,500
  Total Current Assets                $240,000

Non-Current Assets:
  Property, Plant & Equipment         $150,000
  Less: Accumulated Depreciation       ($45,000)
  Net PP&E                           $105,000
  Intangible Assets                    $75,000
  Less: Accumulated Amortization       ($15,000)
  Net Intangible Assets                $60,000
  Investments                          $25,000
  Other Long-term Assets               $10,000
  Total Non-Current Assets            $200,000

TOTAL ASSETS                         $440,000

LIABILITIES AND EQUITY
Current Liabilities:
  Accounts Payable                     $35,000
  Accrued Expenses                     $18,000
  Short-term Debt                      $20,000
  Deferred Revenue                     $45,000
  Payroll Taxes Payable                $8,000
  Other Current Liabilities             $9,000
  Total Current Liabilities           $135,000

Long-term Liabilities:
  Long-term Debt                       $75,000
  Deferred Tax Liabilities             $12,000
  Other Long-term Liabilities           $8,000
  Total Long-term Liabilities          $95,000

Total Liabilities                    $230,000

Equity:
  Common Stock                         $50,000
  Retained Earnings                   $135,000
  Additional Paid-in Capital           $25,000
  Total Equity                        $210,000

TOTAL LIABILITIES AND EQUITY         $440,000
\`\`\`

## Assets Analysis

### Current Assets (Converted to Cash within 12 months)

#### Cash and Cash Equivalents
**Components:**
- Checking and savings accounts
- Money market accounts  
- Certificates of deposit (< 90 days)
- Treasury bills and short-term investments

**Analysis Questions:**
- Is cash sufficient for current operations?
- How many months of expenses does cash cover?
- Are cash levels appropriate for business stage?

**Cash Runway Calculation:**
\`\`\`
Monthly Cash Burn: $35,000
Current Cash: $125,000
Cash Runway: $125,000 ÷ $35,000 = 3.6 months

Analysis: Runway is tight for early-stage company. 
Need to focus on cash generation or fundraising.
\`\`\`

#### Accounts Receivable
Money owed by customers for goods/services already delivered.

**Key Metrics:**
- **Days Sales Outstanding (DSO)** = (A/R ÷ Daily Sales)
- **A/R Turnover** = Annual Sales ÷ Average A/R
- **Collection Period** = 365 ÷ A/R Turnover

**DSO Calculation Example:**
\`\`\`
Accounts Receivable: $82,500
Annual Sales: $1,440,000  
Daily Sales: $1,440,000 ÷ 365 = $3,945
DSO: $82,500 ÷ $3,945 = 21 days

Benchmark: SaaS companies typically have 30-45 day DSO
Analysis: Collection period is excellent, indicating 
good customer payment behavior.
\`\`\`

**Red Flags:**
- DSO increasing over time
- Large receivables from few customers
- Receivables older than standard payment terms
- Increasing allowance for doubtful accounts

#### Prepaid Expenses
Payments made for future benefits (insurance, rent, software licenses).

**Common Prepaids for Tech Companies:**
- Annual software licenses
- Prepaid hosting/cloud services
- Insurance premiums
- Rent deposits
- Marketing spend (annual contracts)

#### Inventory
For software companies, inventory is typically minimal but may include:
- Hardware for sale/deployment
- Marketing materials
- Office supplies

### Non-Current Assets (Useful life > 1 year)

#### Property, Plant & Equipment (PP&E)
**Components:**
- Computer equipment and servers
- Office furniture and fixtures
- Leasehold improvements
- Software development costs (if capitalized)

**Depreciation Analysis:**
\`\`\`
Computer Equipment:
Original Cost: $100,000
Useful Life: 3 years
Annual Depreciation: $100,000 ÷ 3 = $33,333
Accumulated Depreciation: $33,333
Net Book Value: $66,667

Age Analysis: Equipment is 1 year old
Replacement Planning: Budget for replacement in 2 years
\`\`\`

#### Intangible Assets
**Types:**
- Patents and trademarks
- Software licenses (long-term)
- Customer lists
- Brand value
- Development costs (if capitalized)

**Amortization:**
Like depreciation but for intangible assets, typically straight-line over useful life.

## Liabilities Analysis

### Current Liabilities (Due within 12 months)

#### Accounts Payable
Money owed to vendors/suppliers.

**Key Metric: Days Payable Outstanding (DPO)**
\`\`\`
DPO = (Accounts Payable ÷ Daily Purchases) × Days

Example:
Accounts Payable: $35,000
Annual Purchases: $420,000
Daily Purchases: $1,151
DPO: $35,000 ÷ $1,151 = 30 days

Analysis: Company pays vendors in 30 days, 
which is standard for most payment terms.
\`\`\`

#### Accrued Expenses
Expenses incurred but not yet paid:
- Payroll and benefits
- Interest on loans
- Utilities
- Professional services

#### Deferred Revenue
Money received for services not yet provided:
- Annual subscriptions paid in advance
- Project deposits
- Prepaid support contracts

**Deferred Revenue Analysis:**
\`\`\`
Deferred Revenue: $45,000
Monthly Revenue Recognition: $7,500
Months of Future Service: 6 months

Analysis: Strong advance payments indicating 
customer confidence and improving cash flow.
\`\`\`

### Long-term Liabilities

#### Long-term Debt
Loans and credit facilities with terms > 1 year.

**Debt Analysis:**
- Interest rates and terms
- Repayment schedule
- Covenants and restrictions
- Personal guarantees

**Debt-to-Equity Ratio:**
\`\`\`
Total Debt: $95,000
Total Equity: $210,000
Debt-to-Equity: $95,000 ÷ $210,000 = 0.45

Analysis: Low leverage, conservative capital structure. 
Room for additional debt financing if needed.
\`\`\`

## Equity Analysis

### Components of Equity

#### Common Stock
Par value of shares issued to owners/investors.

#### Additional Paid-in Capital
Amount paid by investors above par value of shares.

#### Retained Earnings
Cumulative profits retained in the business.

**Retained Earnings Analysis:**
\`\`\`
Beginning Retained Earnings: $110,000
Net Income (Current Year): $25,000
Dividends/Distributions: $0
Ending Retained Earnings: $135,000

Analysis: All profits retained for growth,
typical for early-stage companies.
\`\`\`

### Equity Calculations

#### Book Value per Share
\`\`\`
Total Equity: $210,000
Shares Outstanding: 10,000
Book Value per Share: $21

Analysis: Shows accounting value per share,
may differ significantly from market value.
\`\`\`

#### Return on Equity (ROE)
\`\`\`
Net Income: $25,000
Average Equity: $197,500
ROE: $25,000 ÷ $197,500 = 12.7%

Benchmark: Good ROE for early-stage company,
shows efficient use of equity capital.
\`\`\`

## Working Capital Analysis

### Working Capital Components

**Working Capital = Current Assets - Current Liabilities**
\`\`\`
Current Assets: $240,000
Current Liabilities: $135,000
Working Capital: $105,000
\`\`\`

### Working Capital Metrics

#### Current Ratio
\`\`\`
Current Ratio = Current Assets ÷ Current Liabilities
Current Ratio = $240,000 ÷ $135,000 = 1.78

Interpretation:
- > 2.0: Very strong liquidity
- 1.5-2.0: Good liquidity  
- 1.0-1.5: Adequate liquidity
- < 1.0: Liquidity concerns

Analysis: 1.78 shows good short-term liquidity.
\`\`\`

#### Quick Ratio (Acid Test)
\`\`\`
Quick Assets = Cash + A/R + Marketable Securities
Quick Ratio = Quick Assets ÷ Current Liabilities
Quick Ratio = ($125,000 + $82,500) ÷ $135,000 = 1.54

Analysis: Strong quick ratio indicates ability 
to pay current obligations without selling inventory.
\`\`\`

#### Cash Ratio
\`\`\`
Cash Ratio = Cash ÷ Current Liabilities
Cash Ratio = $125,000 ÷ $135,000 = 0.93

Analysis: High cash ratio provides flexibility
and security for operations.
\`\`\`

### Working Capital Management

#### Cash Conversion Cycle
Measures time from cash outlay to cash collection.

**Formula:**
CCC = DSO + DIO - DPO

Where:
- DSO = Days Sales Outstanding
- DIO = Days Inventory Outstanding  
- DPO = Days Payable Outstanding

\`\`\`
Example Calculation:
DSO: 21 days (calculated earlier)
DIO: 45 days (if applicable)
DPO: 30 days (calculated earlier)

CCC = 21 + 45 - 30 = 36 days

Analysis: Takes 36 days from spending cash
to collecting cash from customers.
\`\`\`

## Balance Sheet Ratios for Financial Health

### Liquidity Ratios
Measure ability to meet short-term obligations.

\`\`\`
Current Ratio: 1.78 (Good)
Quick Ratio: 1.54 (Strong)
Cash Ratio: 0.93 (Very Strong)

Overall Liquidity: Excellent
\`\`\`

### Leverage Ratios
Measure financial risk and capital structure.

\`\`\`
Debt-to-Assets = Total Debt ÷ Total Assets
Debt-to-Assets = $95,000 ÷ $440,000 = 21.6%

Debt-to-Equity = Total Debt ÷ Total Equity  
Debt-to-Equity = $95,000 ÷ $210,000 = 45.2%

Times Interest Earned = EBIT ÷ Interest Expense
(Calculated from P&L statement)

Analysis: Conservative leverage levels provide
financial flexibility and lower risk.
\`\`\`

### Efficiency Ratios
Measure how effectively assets are used.

\`\`\`
Asset Turnover = Revenue ÷ Average Total Assets
Asset Turnover = $1,440,000 ÷ $440,000 = 3.27

Analysis: Company generates $3.27 of revenue
for every dollar of assets, indicating
efficient asset utilization.
\`\`\`

## Industry Benchmarking

### SaaS Company Balance Sheet Benchmarks
\`\`\`
Metric                Early Stage  Growth Stage  Mature
Current Ratio            1.5-2.5      1.2-2.0     1.0-1.5
Cash (months expenses)     6-18        12-24       6-12
Debt-to-Equity           0-0.5        0.2-1.0     0.3-1.5
Asset Turnover           2.0-4.0      2.5-5.0     3.0-6.0
\`\`\`

### Service Business Benchmarks  
\`\`\`
Metric                Consulting   Agency   Professional
Current Ratio            1.2-2.0    1.5-2.5     1.0-2.0
DSO (days)               30-60      45-75       30-45
Working Capital/Revenue   10-20%     15-25%      5-15%
\`\`\`

## Red Flags in Balance Sheet Analysis

### Asset Red Flags
- **Declining cash** with no clear funding plan
- **Increasing DSO** indicating collection problems
- **Large other assets** without clear explanation
- **Overvalued intangible assets** that may not be recoverable

### Liability Red Flags
- **Current ratio < 1.0** indicating liquidity problems
- **Increasing accounts payable** indicating cash flow issues
- **High debt levels** without sufficient cash flow to service
- **Contingent liabilities** not properly disclosed

### Working Capital Red Flags
- **Negative working capital** (current liabilities > current assets)
- **Deteriorating working capital trends**
- **Seasonal working capital needs** not properly planned
- **Working capital tied up in slow-moving assets**

## Balance Sheet Analysis for Growth Planning

### Funding Requirements Analysis
\`\`\`
Current Growth Rate: 20% annually
Asset Scaling Requirements:

If Revenue grows from $1.44M to $1.73M (+20%):
Required Asset Growth:
- A/R will increase: $82,500 × 1.2 = $99,000
- Additional A/R investment: $16,500

- PP&E may need expansion: 10-15% growth
- Additional PP&E investment: $10,500-$15,750

Total Additional Asset Investment: ~$27,000-$31,500

Funding Sources:
- Retained earnings from profits
- Additional debt capacity
- Working capital optimization
- New equity investment
\`\`\`

### Capital Allocation Strategy
\`\`\`
Available Capital Sources:
Cash on hand: $125,000
Debt capacity: $50,000 (conservative)
Projected earnings: $35,000

Priority Allocation:
1. Maintain 3-month cash reserve: $105,000
2. Growth investments: $50,000
3. Debt reduction: $25,000
4. Emergency fund: $30,000
\`\`\`

## Action Steps for Balance Sheet Management

### Monthly Reviews
1. **Cash position analysis** and runway calculation
2. **A/R aging** and collection follow-up
3. **Working capital** trend monitoring
4. **Liquidity ratios** calculation

### Quarterly Deep Dives  
1. **Asset utilization** efficiency analysis
2. **Debt service** coverage assessment
3. **Working capital** optimization opportunities
4. **Growth funding** requirements planning

### Annual Strategic Assessment
1. **Capital structure** optimization
2. **Asset base** alignment with strategy
3. **Risk management** and insurance review
4. **Exit planning** and valuation preparation

## Key Takeaways

- Balance sheet shows financial position at a point in time
- Working capital management is crucial for cash flow
- Liquidity ratios indicate short-term financial health  
- Asset efficiency drives sustainable growth
- Regular analysis enables proactive financial management
- Balance sheet health impacts borrowing capacity and valuation

Understanding balance sheet analysis enables founders to make informed decisions about capital allocation, growth funding, and financial risk management.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 105
      },
      {
        title: 'Working Capital Management and Financial Health',
        slug: 'working-capital-management-financial-health',
        content: `# Working Capital Management and Financial Health

## Working Capital: The Lifeblood of Business Operations

Working capital management is one of the most critical aspects of running a healthy business. It determines your ability to pay bills, invest in growth, and weather unexpected challenges. For growing companies, poor working capital management is often the difference between thriving and merely surviving.

## Understanding Working Capital Components

### Working Capital Formula
**Working Capital = Current Assets - Current Liabilities**

### Components Breakdown

#### Current Assets (convertible to cash within 12 months)
1. **Cash and Cash Equivalents**
2. **Accounts Receivable** 
3. **Inventory** (if applicable)
4. **Prepaid Expenses**
5. **Other Short-term Assets**

#### Current Liabilities (due within 12 months)
1. **Accounts Payable**
2. **Accrued Expenses**
3. **Short-term Debt**
4. **Deferred Revenue**
5. **Payroll and Tax Liabilities**

### Working Capital Analysis Example
\`\`\`
TechCorp Working Capital Analysis - March 2024:

Current Assets:
  Cash                    $150,000
  Accounts Receivable     $120,000
  Prepaid Expenses        $25,000
  Other Current Assets    $15,000
  Total Current Assets    $310,000

Current Liabilities:
  Accounts Payable        $45,000
  Accrued Expenses        $30,000
  Short-term Debt         $25,000
  Deferred Revenue        $65,000
  Payroll/Tax Liabilities $20,000
  Total Current Liabilities $185,000

Working Capital = $310,000 - $185,000 = $125,000

Working Capital Ratio = $310,000 ÷ $185,000 = 1.68
\`\`\`

## Working Capital Metrics and Analysis

### 1. Liquidity Ratios

#### Current Ratio
**Formula:** Current Assets ÷ Current Liabilities

\`\`\`
Interpretation Guidelines:
> 2.5: May indicate excess cash not being utilized
2.0-2.5: Strong liquidity position  
1.5-2.0: Good liquidity (ideal range for most businesses)
1.0-1.5: Adequate but requires monitoring
< 1.0: Liquidity concerns, may struggle to pay bills

Industry Variations:
- SaaS companies: 1.2-2.0 (due to deferred revenue)
- Consulting: 1.5-2.5 (irregular cash flows)
- E-commerce: 1.0-1.5 (fast inventory turnover)
- Manufacturing: 2.0-3.0 (inventory and longer cycles)
\`\`\`

#### Quick Ratio (Acid Test Ratio)
**Formula:** (Current Assets - Inventory) ÷ Current Liabilities

\`\`\`
Quick Ratio Example:
Current Assets: $310,000
Inventory: $10,000  
Current Liabilities: $185,000

Quick Ratio = ($310,000 - $10,000) ÷ $185,000 = 1.62

Analysis: Strong quick ratio indicates company can 
meet short-term obligations without relying on 
inventory conversion to cash.
\`\`\`

#### Cash Ratio
**Formula:** (Cash + Marketable Securities) ÷ Current Liabilities

\`\`\`
Cash Ratio = $150,000 ÷ $185,000 = 0.81

Analysis: High cash ratio provides maximum flexibility
for operations and unexpected opportunities.
Target range: 0.1-0.2 for mature companies,
0.3-1.0+ for early-stage companies.
\`\`\`

### 2. Activity Ratios (Efficiency Metrics)

#### Days Sales Outstanding (DSO)
**Formula:** (Accounts Receivable ÷ Net Sales) × 365

\`\`\`
DSO Calculation:
Accounts Receivable: $120,000
Annual Net Sales: $2,160,000
Daily Sales: $5,918

DSO = $120,000 ÷ $5,918 = 20.3 days

Analysis: Excellent collection period. Most B2B 
companies have 30-60 day DSO.

DSO Benchmarks by Industry:
- SaaS (monthly billing): 15-30 days
- SaaS (annual billing): 30-45 days  
- Consulting services: 45-75 days
- Manufacturing: 60-90 days
- Retail/E-commerce: 1-5 days
\`\`\`

#### Days Payable Outstanding (DPO)
**Formula:** (Accounts Payable ÷ Cost of Goods Sold) × 365

\`\`\`
DPO Calculation:
Accounts Payable: $45,000
Annual COGS: $540,000
Daily COGS: $1,479

DPO = $45,000 ÷ $1,479 = 30.4 days

Analysis: Company pays suppliers in ~30 days, 
which aligns with standard payment terms.

DPO Strategy:
- Too high: Risk supplier relationship damage
- Too low: Missing cash flow optimization opportunity
- Optimal: Maximize without damaging relationships
\`\`\`

#### Days Inventory Outstanding (DIO)
**Formula:** (Average Inventory ÷ COGS) × 365

\`\`\`
DIO Calculation (for companies with inventory):
Average Inventory: $35,000
Annual COGS: $540,000
Daily COGS: $1,479

DIO = $35,000 ÷ $1,479 = 23.7 days

Analysis: Fast inventory turnover indicates 
efficient inventory management.

DIO Benchmarks:
- Software/SaaS: 0-10 days (minimal inventory)
- Consulting: 0-5 days  
- E-commerce: 30-90 days
- Manufacturing: 60-120 days
- Retail: 45-90 days
\`\`\`

### 3. Cash Conversion Cycle (CCC)

**Formula:** CCC = DSO + DIO - DPO

\`\`\`
Cash Conversion Cycle Calculation:
DSO: 20.3 days
DIO: 5 days (minimal for software company)  
DPO: 30.4 days

CCC = 20.3 + 5 - 30.4 = -5.1 days

Analysis: Negative CCC is excellent! Company 
collects cash from customers before paying suppliers,
creating positive cash flow timing.

CCC Interpretation:
Negative: Suppliers essentially finance operations
0-30 days: Excellent working capital efficiency  
30-60 days: Good efficiency
60+ days: May indicate inefficiencies
\`\`\`

## Working Capital Optimization Strategies

### 1. Accounts Receivable Management

#### Acceleration Techniques
**Invoice Management:**
- Electronic invoicing for faster delivery
- Clear payment terms and due dates
- Early payment discounts (2/10 Net 30)
- Automated follow-up sequences

**Credit Policy Optimization:**
\`\`\`
Tiered Credit Policy Example:

Tier 1 (New customers <$10K): 
- Credit check required
- 50% deposit, Net 15 terms
- Personal guarantee if applicable

Tier 2 (Established <$50K):
- Standard credit check
- Net 30 terms  
- 2% early payment discount

Tier 3 (Large customers >$50K):
- Comprehensive credit review
- Customized terms based on creditworthiness
- Possible extended terms for strategic accounts
\`\`\`

**Collection Process:**
\`\`\`
Days Outstanding   Action Required
0-30 days         Standard follow-up email
31-45 days        Phone call + email
46-60 days        Formal collection letter
61-90 days        Collection agency/legal action
90+ days          Write-off consideration

Automation Tools:
- QuickBooks automated reminders
- FreshBooks payment tracking
- Stripe automatic retry for failed payments
- Custom CRM follow-up sequences
\`\`\`

#### Factoring and Invoice Financing
**When to Consider:**
- Fast growth requiring immediate cash
- Long payment cycles (>45 days)
- Seasonal cash flow variations
- Alternative to debt financing

**Factoring Example:**
\`\`\`
Invoice Amount: $100,000
Factor Advance Rate: 80%
Factor Fee: 3%

Immediate Cash: $80,000
Fee: $3,000  
Net Received: $77,000
Remaining after customer pays: $20,000

Total Cost: $3,000 (3% of invoice value)
Effective Annual Rate: ~12-36% depending on collection time
\`\`\`

### 2. Accounts Payable Management

#### Payment Optimization
**Supplier Payment Strategy:**
\`\`\`
Payment Timing Analysis:

Supplier A (Critical):
Terms: 2/10 Net 30
Annual Spend: $120,000
Early Payment Savings: $2,400
Decision: Take early payment discount (24% annual return)

Supplier B (Non-critical):  
Terms: Net 30
Annual Spend: $60,000
Cash Flow Benefit: Pay on day 30
Decision: Optimize cash flow, pay exactly on time

Supplier C (Strategic):
Terms: Net 45
Annual Spend: $200,000
Relationship: Key partner
Decision: Pay on time to maintain relationship
\`\`\`

**Electronic Payment Benefits:**
- Automated payment processing
- Better cash flow forecasting
- Reduced processing costs
- Improved supplier relationships
- Enhanced payment tracking

### 3. Cash Management

#### Cash Forecasting
**13-Week Rolling Cash Flow Forecast:**
\`\`\`
Week 1-4: Daily cash flow detail
- Known receipts and disbursements
- Payroll and fixed expenses
- Planned capital expenditures

Week 5-8: Weekly cash flow projections
- Expected customer collections
- Major supplier payments
- Seasonal variations

Week 9-13: Monthly trend analysis
- Growth trajectory impact
- Working capital changes
- Funding requirements
\`\`\`

**Cash Flow Forecast Template:**
\`\`\`
                Week 1  Week 2  Week 3  Week 4
Beginning Cash   150,000 142,000 138,000 145,000

Cash Receipts:
  Customer Collections  85,000  78,000  95,000  88,000
  Other Income          2,000   1,500   2,500   3,000
  Total Receipts       87,000  79,500  97,500  91,000

Cash Disbursements:
  Payroll              65,000      0   65,000      0
  Rent                  8,000      0       0      0
  Suppliers            15,000  18,500  12,000  20,000
  Other Expenses        7,000   5,000   8,500   6,500
  Total Disbursements  95,000  23,500  85,500  26,500

Net Cash Flow         (8,000)  56,000  12,000  64,500
Ending Cash          142,000 198,000 210,000 274,500

Minimum Cash Required: 100,000
Excess/(Shortage):     42,000  98,000 110,000 174,500
\`\`\`

#### Cash Investment Options
**Short-term Investment Ladder:**
\`\`\`
Investment Goal: Preserve capital, maintain liquidity

Option 1 - Money Market Account:
Amount: $50,000
Rate: 2.5% APY
Liquidity: Immediate
Risk: FDIC insured

Option 2 - 3-Month CDs:
Amount: $75,000  
Rate: 3.8% APY
Liquidity: 90 days
Risk: FDIC insured

Option 3 - Treasury Bills:
Amount: $100,000
Rate: 4.2% APY  
Liquidity: Secondary market
Risk: Government backed

Total Return Calculation:
Weighted Average Return: 3.6% APY
Annual Income: $8,100
Monthly Income: $675
\`\`\`

## Working Capital by Business Model

### 1. SaaS Business Working Capital

#### Unique Characteristics
- **Deferred Revenue**: Cash received before service delivery
- **Low Inventory**: Minimal physical assets
- **Predictable Cash Flow**: Recurring revenue model
- **High Growth Capital Needs**: Customer acquisition investment

**SaaS Working Capital Analysis:**
\`\`\`
SaaS Company Example:
Current Assets: $500,000
  - Cash: $300,000 (60%)
  - A/R: $150,000 (30%)
  - Other: $50,000 (10%)

Current Liabilities: $350,000
  - Deferred Revenue: $200,000 (57%)
  - A/P: $75,000 (21%)
  - Accrued Expenses: $75,000 (21%)

Working Capital: $150,000
Current Ratio: 1.43

Analysis: Deferred revenue creates favorable 
working capital profile - customers prepay 
for services.
\`\`\`

#### SaaS Working Capital Optimization
**Strategies:**
1. **Extend contract lengths** (annual vs. monthly)
2. **Offer prepayment discounts** for cash flow
3. **Minimize accounts receivable** with automatic payments
4. **Optimize vendor payments** without damaging relationships

### 2. Service Business Working Capital

#### Professional Services Characteristics
- **High Accounts Receivable**: Time lag between service and payment
- **Variable Cash Flow**: Project-based revenue
- **People-heavy Cost Structure**: Payroll timing critical
- **Minimal Inventory**: Knowledge-based services

**Service Business Example:**
\`\`\`
Consulting Firm Analysis:
Monthly Revenue: $200,000
DSO: 45 days
A/R Balance: $300,000 (1.5 months revenue)

Monthly Expenses: $180,000
DPO: 20 days  
A/P Balance: $120,000

Working Capital Need: $300,000 - $120,000 = $180,000

Cash Flow Gap: 25 days (45 DSO - 20 DPO)
Gap Financing Need: $180,000 × (25/30) = $150,000
\`\`\`

#### Service Business Optimization
**Strategies:**
1. **Retainer agreements** for predictable cash flow
2. **Milestone billing** to accelerate collections
3. **Progress billing** for long projects
4. **Credit card payments** for faster collection

### 3. E-commerce Working Capital

#### E-commerce Characteristics
- **Inventory Investment**: Significant working capital in stock
- **Seasonal Variations**: Holiday and seasonal spikes
- **Payment Processing**: 2-3 day settlement delays
- **Return Management**: Reverse logistics costs

**E-commerce Working Capital Cycle:**
\`\`\`
Inventory Cycle Analysis:
Purchase Inventory: Day 0 (Cash out)
Receive Inventory: Day 7
Sell Inventory: Day 37 (30 days on shelf)
Collect Payment: Day 40 (3-day processing)
Pay Supplier: Day 30 (Net 30 terms)

Cash Conversion Cycle: 40 - 30 = 10 days

Working Capital Requirements:
Daily Sales: $10,000
CCC: 10 days
Working Capital Need: $100,000
\`\`\`

## Seasonal Working Capital Management

### Planning for Seasonal Variations

#### Seasonal Analysis Framework
\`\`\`
Monthly Sales Pattern Analysis (Retail Example):
        Sales    % of Annual    Working Capital Need
Jan     $80K        6.7%           $65K
Feb     $85K        7.1%           $70K  
Mar     $95K        7.9%           $80K
Apr     $110K       9.2%           $95K
May     $120K      10.0%          $105K
Jun     $115K       9.6%          $100K
Jul     $105K       8.8%           $90K
Aug     $100K       8.3%           $85K
Sep     $130K      10.8%          $115K
Oct     $140K      11.7%          $125K
Nov     $180K      15.0%          $165K  
Dec     $140K      11.7%          $125K

Peak Working Capital Need: $165K (November)
Minimum Working Capital: $65K (January)
Seasonal Swing: $100K
\`\`\`

#### Seasonal Funding Strategies
**Line of Credit Structure:**
\`\`\`
Base Line of Credit: $50,000 (available year-round)
Seasonal Increase: $75,000 (Oct-Jan availability)
Total Peak Capacity: $125,000

Pricing Structure:
Base Line: Prime + 2.5%
Seasonal Line: Prime + 3.0%
Unused Fee: 0.5% annually

Cost Analysis:
Average Usage: $85,000
Average Rate: 6.5%
Annual Cost: $5,525
Monthly Cost: $460
\`\`\`

## Working Capital Crisis Management

### Early Warning Signs
1. **Current Ratio dropping below 1.0**
2. **Increasing DSO trends**  
3. **Supplier payment delays**
4. **Employee payroll concerns**
5. **Declined credit applications**

### Crisis Response Actions

#### Immediate Actions (0-30 days)
**Cash Generation:**
- Accelerate customer collections
- Offer early payment discounts
- Convert receivables to cash (factoring)
- Liquidate non-essential assets
- Delay non-critical expenditures

**Expense Reduction:**
- Temporary payroll reductions
- Renegotiate supplier terms
- Reduce discretionary spending
- Sublease unused space
- Eliminate non-essential services

#### Medium-term Solutions (30-90 days)
**Operational Changes:**
- Improve collection processes
- Tighten credit policies  
- Optimize inventory levels
- Renegotiate customer terms
- Implement cash forecasting

**Financing Options:**
- Asset-based lending
- Invoice factoring
- Merchant cash advances
- Equipment financing
- Emergency investor funding

## Technology for Working Capital Management

### Automated Systems

#### Cash Flow Management Software
**Recommended Tools:**
1. **Float**: Cash flow forecasting and management
2. **PulseHQ**: Real-time cash flow visibility
3. **Futrli**: Financial planning and forecasting
4. **Camel**: Working capital optimization
5. **HighRadius**: Accounts receivable automation

#### Integration Benefits
\`\`\`
Integrated Working Capital Stack:

Accounting System (QuickBooks/Xero):
- Core financial data
- A/R and A/P management
- Financial reporting

Cash Management (Float):  
- 13-week cash forecasting
- Scenario planning
- Bank account aggregation

A/R Automation (Chaser/FreshBooks):
- Automated invoice reminders
- Payment processing
- Collection management

A/P Optimization (Bill.com):
- Electronic payments
- Approval workflows  
- Vendor management

Benefits:
- Reduced manual work: 15-20 hours/week
- Improved cash visibility: Real-time dashboard
- Faster collections: 25% improvement in DSO
- Better supplier relationships: On-time payments
\`\`\`

## Key Performance Indicators (KPIs)

### Working Capital KPI Dashboard
\`\`\`
Liquidity Metrics:
- Current Ratio: 1.68 (Target: 1.5-2.0)  
- Quick Ratio: 1.54 (Target: 1.0-1.5)
- Cash Ratio: 0.81 (Target: 0.2-0.5)

Efficiency Metrics:
- DSO: 20.3 days (Target: <30 days)
- DPO: 30.4 days (Target: 25-35 days)  
- Cash Conversion Cycle: -5.1 days (Target: <15 days)

Trend Metrics:
- Working Capital Growth: 15% YoY
- DSO Trend: Improving (-5 days vs. LY)
- DPO Trend: Stable (+2 days vs. LY)

Cash Metrics:
- Cash Runway: 8.5 months (Target: >6 months)
- Operating Cash Flow: $25,000/month
- Free Cash Flow: $18,000/month
\`\`\`

## Industry Benchmarks

### Working Capital Benchmarks by Industry
\`\`\`
                SaaS    Consulting  E-commerce  Manufacturing
Current Ratio   1.2-2.0    1.5-2.5     1.0-1.8      2.0-3.0
DSO (days)      15-45      45-75       1-10        45-75  
DPO (days)      20-40      15-30       30-60       30-60
CCC (days)      -10-30     25-60       15-45       60-120
WC/Revenue %    5-15%      10-25%      15-30%      20-35%
\`\`\`

## Action Plan for Working Capital Optimization

### Monthly Reviews
1. **Calculate all working capital ratios**
2. **Update 13-week cash flow forecast**  
3. **Review A/R aging and collection status**
4. **Analyze A/P and optimize payment timing**
5. **Monitor cash position and investment options**

### Quarterly Deep Dives
1. **Comprehensive working capital trend analysis**
2. **Benchmark against industry standards**
3. **Review and update credit policies**
4. **Assess seasonal funding needs**
5. **Evaluate working capital financing options**

### Annual Strategic Planning
1. **Set working capital targets and KPIs**
2. **Evaluate technology and automation opportunities**
3. **Review banking relationships and credit facilities**
4. **Assess working capital impact of growth plans**
5. **Update crisis management procedures**

## Key Takeaways

- Working capital management directly impacts cash flow and survival
- Optimize the cash conversion cycle through DSO, DIO, and DPO management
- Different business models require different working capital strategies
- Technology and automation can significantly improve efficiency
- Regular monitoring and analysis enables proactive management
- Plan for seasonal variations and potential cash flow challenges

Effective working capital management provides the foundation for sustainable growth and financial stability, enabling companies to invest in opportunities while maintaining operational flexibility.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 120
      }
    ];

    for (const lessonData of week2lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          weekId: week2.id
        }
      });
    }

    // Week 2 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week2.id,
        title: 'Balance Sheet and Working Capital Mastery Quiz',
        description: 'Test your understanding of balance sheet analysis and working capital management',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'A company has current assets of $200,000 and current liabilities of $150,000. What is their current ratio and what does it indicate?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                '1.33 - Indicates potential liquidity problems',
                '1.33 - Indicates adequate liquidity for operations',  
                '0.75 - Indicates strong liquidity position',
                '1.33 - Indicates excessive cash that should be invested'
              ]),
              correctAnswer: '1.33 - Indicates adequate liquidity for operations',
              explanation: 'Current Ratio = $200,000 ÷ $150,000 = 1.33. This indicates adequate liquidity, though ideally should be 1.5-2.0 for most businesses.',
              orderIndex: 1
            },
            {
              questionText: 'What does a negative Cash Conversion Cycle indicate for a business?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'The company is struggling with cash flow problems',
                'Customers are paying too slowly for products/services',
                'The company collects from customers before paying suppliers',
                'Inventory is taking too long to sell'
              ]),
              correctAnswer: 'The company collects from customers before paying suppliers',
              explanation: 'A negative Cash Conversion Cycle means the company gets paid by customers before it has to pay suppliers, creating favorable cash flow timing.',
              orderIndex: 2
            },
            {
              questionText: 'A SaaS company has $100,000 in deferred revenue on their balance sheet. This represents:',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Revenue earned but not yet collected from customers',
                'Cash received for services not yet provided to customers', 
                'Bad debt that should be written off',
                'Revenue that was recognized in a previous period'
              ]),
              correctAnswer: 'Cash received for services not yet provided to customers',
              explanation: 'Deferred revenue is a liability representing cash received for services not yet delivered, common with annual SaaS subscriptions paid in advance.',
              orderIndex: 3
            },
            {
              questionText: 'If a company has a Days Sales Outstanding (DSO) of 45 days, this means:',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'It takes 45 days to manufacture and sell products',
                'The company pays suppliers every 45 days',
                'It takes an average of 45 days to collect payment after a sale',
                'The company has 45 days of cash reserves'
              ]),
              correctAnswer: 'It takes an average of 45 days to collect payment after a sale',
              explanation: 'DSO measures the average number of days it takes to collect accounts receivable after making a sale.',
              orderIndex: 4
            },
            {
              questionText: 'Which balance sheet ratio best measures a company\'s ability to pay current liabilities without selling inventory?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Current Ratio',
                'Quick Ratio (Acid Test)',
                'Cash Ratio', 
                'Debt-to-Equity Ratio'
              ]),
              correctAnswer: 'Quick Ratio (Acid Test)',
              explanation: 'The Quick Ratio excludes inventory from current assets, showing ability to pay current liabilities with the most liquid assets only.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 2 created with 2 lessons and 1 quiz');

    // Continue with Week 3 and 4...
    console.log('✅ Course 5: Financial Statement Analysis for Founders created successfully!');
    console.log(`📚 Course ID: ${course5.id}`);
    console.log('🎯 Next: Execute script to add to database and continue with remaining weeks');

  } catch (error) {
    console.error('❌ Error creating Course 5:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCourse5();