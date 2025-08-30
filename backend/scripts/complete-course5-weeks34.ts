import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function completeCourse5() {
  try {
    console.log('🚀 Completing Course 5: Adding Weeks 3 and 4...');

    // Find the existing Course 5
    const course5 = await prisma.course.findFirst({
      where: {
        slug: 'financial-statement-analysis-founders'
      }
    });

    if (!course5) {
      throw new Error('Course 5 not found. Please run create-course5-financial-statements.ts first.');
    }

    console.log('✅ Found Course 5');

    // Week 3: Cash Flow Statement Analysis
    const week3 = await prisma.week.create({
      data: {
        courseId: course5.id,
        weekNumber: 3,
        title: 'Cash Flow Statement Analysis',
        overview: 'Master cash flow statement analysis to understand cash generation, usage patterns, and make strategic decisions about liquidity and growth.',
        learningObjectives: JSON.stringify([
          'Understand the three components of cash flow statements',
          'Analyze operating cash flow and working capital changes',
          'Evaluate investing activities and capital allocation',
          'Assess financing activities and capital structure decisions',
          'Use cash flow analysis for strategic planning and forecasting'
        ]),
        estimatedHours: 8
      }
    });

    const week3lessons = [
      {
        title: 'Cash Flow Statement Components and Structure',
        slug: 'cash-flow-statement-components-structure',
        content: `# Cash Flow Statement Components and Structure

## Understanding Cash Flow Statements

The cash flow statement is arguably the most important financial statement for business management. While the P&L shows profitability and the balance sheet shows financial position, the cash flow statement reveals the actual movement of cash – the lifeblood of any business.

## Why Cash Flow Analysis Matters

### Cash vs. Profits
**Key Insight:** A profitable company can still fail if it runs out of cash.

**Common Scenarios:**
- **Rapid Growth**: Sales growing faster than cash collection
- **Seasonal Business**: Profits earned but cash tied up in inventory
- **Capital Intensive**: Large equipment purchases reducing cash reserves
- **Credit Terms**: Long payment cycles creating cash gaps

### The Cash Flow Statement's Unique Value
1. **Shows actual cash movements** (not accounting estimates)
2. **Reveals timing differences** between earnings and cash
3. **Identifies cash generation sources** and usage patterns  
4. **Enables cash forecasting** and liquidity planning
5. **Provides insights for investor communication**

## Cash Flow Statement Structure

### Standard Format (Direct Method)
\`\`\`
TechStartup Inc.
Cash Flow Statement
For the Year Ended December 31, 2024

CASH FLOWS FROM OPERATING ACTIVITIES
Cash Receipts:
  Cash received from customers             $1,250,000
  Interest received                            $2,500
  Other operating receipts                     $5,000
  Total cash receipts                      $1,257,500

Cash Payments:
  Cash paid to suppliers                    ($450,000)
  Cash paid to employees                    ($380,000)
  Cash paid for operating expenses          ($125,000)
  Interest paid                              ($15,000)
  Income taxes paid                          ($25,000)
  Total cash payments                       ($995,000)

Net Cash from Operating Activities          $262,500

CASH FLOWS FROM INVESTING ACTIVITIES
  Purchase of equipment                      ($85,000)
  Purchase of software/intangible assets     ($25,000)
  Investment in marketable securities        ($50,000)
  Sale of equipment                           $10,000
Net Cash Used in Investing Activities      ($150,000)

CASH FLOWS FROM FINANCING ACTIVITIES  
  Proceeds from bank loan                     $75,000
  Proceeds from equity investment            $200,000
  Repayment of long-term debt                ($40,000)
  Dividends/distributions paid               ($15,000)
Net Cash from Financing Activities          $220,000

Net Increase in Cash                        $332,500
Cash at Beginning of Period                  $85,000
Cash at End of Period                       $417,500
\`\`\`

### Indirect Method (More Common)
\`\`\`
CASH FLOWS FROM OPERATING ACTIVITIES
Net Income                                  $125,000

Adjustments to reconcile net income
to net cash from operations:
  Depreciation and amortization               $45,000
  Bad debt expense                             $8,000
  Stock-based compensation                    $12,000

Changes in operating assets and liabilities:
  (Increase) in accounts receivable          ($35,000)
  (Increase) in inventory                    ($15,000)
  (Increase) in prepaid expenses              ($5,000)
  Increase in accounts payable                $22,000
  Increase in accrued expenses                $18,000
  Increase in deferred revenue                $87,500

Net Cash from Operating Activities          $262,500
\`\`\`

## Operating Cash Flow Deep Dive

### 1. Understanding Operating Cash Flow

#### Quality of Earnings Analysis
**High-Quality Operating Cash Flow:**
- Operating cash flow > Net income
- Consistent positive operating cash flow
- Growing operating cash flow over time
- Operating cash flow covers capital expenditures

**Example Analysis:**
\`\`\`
Financial Performance Comparison:
                    2022     2023     2024    Trend
Net Income         $85K    $105K    $125K   Strong growth
Operating Cash Flow $95K    $140K    $263K   Accelerating
OCF/Net Income     1.12x   1.33x    2.10x   Improving quality

Analysis: Operating cash flow growing faster than 
net income indicates strong earnings quality and 
improving working capital management.
\`\`\`

#### Working Capital Impact on Cash Flow
**Working Capital Changes:**
- **Accounts Receivable increase** = Cash outflow (customers owe more)
- **Inventory increase** = Cash outflow (more cash tied up)
- **Accounts Payable increase** = Cash inflow (paying suppliers later)
- **Deferred Revenue increase** = Cash inflow (customers prepaying)

**Working Capital Analysis Example:**
\`\`\`
Working Capital Changes (2024):
                     Change    Cash Flow Impact
Accounts Receivable  +$35K    ($35K) outflow
Inventory           +$15K     ($15K) outflow  
Prepaid Expenses    +$5K      ($5K) outflow
Accounts Payable    +$22K     +$22K inflow
Accrued Expenses    +$18K     +$18K inflow
Deferred Revenue    +$87K     +$87K inflow

Net Working Capital Impact: +$72K inflow

Analysis: Despite growth requiring more A/R and 
inventory investment, strong deferred revenue 
growth created net positive cash flow impact.
\`\`\`

### 2. Operating Cash Flow Metrics

#### Free Cash Flow
**Formula:** Free Cash Flow = Operating Cash Flow - Capital Expenditures

\`\`\`
Free Cash Flow Calculation:
Operating Cash Flow: $262,500
Capital Expenditures: $110,000 (equipment + software)
Free Cash Flow: $152,500

Free Cash Flow Margin: $152,500 ÷ $1,300,000 = 11.7%

Analysis: Positive free cash flow indicates company
generates cash after necessary growth investments.
\`\`\`

#### Cash Conversion Efficiency
**Operating Cash Flow Margin:** Operating Cash Flow ÷ Revenue

\`\`\`
Operating Cash Flow Margin:
Operating Cash Flow: $262,500
Revenue: $1,300,000
OCF Margin: 20.2%

Industry Benchmarks:
- SaaS companies: 15-25%
- Consulting services: 10-20%  
- E-commerce: 5-15%
- Manufacturing: 8-15%

Analysis: 20.2% margin is strong for most industries,
indicating efficient cash generation from operations.
\`\`\`

### 3. Seasonal and Timing Analysis

#### Monthly Cash Flow Patterns
\`\`\`
Monthly Operating Cash Flow Analysis:
        Operating CF  Cumulative  Notes
Jan     $45,000      $45,000     Strong start
Feb     $38,000      $83,000     Seasonal dip
Mar     $52,000      $135,000    Q1 collections
Apr     $28,000      $163,000    Lower activity
May     $35,000      $198,000    Steady
Jun     $48,000      $246,000    Q2 strength
Jul     $22,000      $268,000    Summer slowdown
Aug     $25,000      $293,000    Continued slow
Sep     $41,000      $334,000    Recovery
Oct     $38,000      $372,000    Building
Nov     $45,000      $417,000    Strong finish
Dec     $55,000      $472,000    Year-end peak

Average Monthly OCF: $39,333
Seasonal Variation: $33,000 (Dec high vs Jul low)

Planning Implications:
- Build cash reserves for summer slowdown
- Plan major investments during strong periods
- Adjust staffing for seasonal patterns
\`\`\`

## Investing Cash Flow Analysis

### 1. Capital Expenditure Analysis

#### Types of Investing Activities
**Growth Investments:**
- New equipment and technology
- Software development costs
- Facility expansion
- Acquisition of other businesses

**Maintenance Investments:**  
- Equipment replacement
- Technology upgrades
- Facility improvements
- Regulatory compliance investments

#### Capital Efficiency Analysis
\`\`\`
Capital Expenditure Analysis:
                    2022    2023    2024   3-Year Total
Revenue Growth      15%     22%     18%    65%
CapEx Investment    $45K    $65K    $110K  $220K
CapEx/Revenue       4.2%    5.1%    8.5%   6.3%

Revenue per $ CapEx:
2022: $15.00 revenue per $1 invested
2023: $18.50 revenue per $1 invested  
2024: $11.80 revenue per $1 invested

Analysis: 2024 CapEx efficiency declined, indicating
either front-loaded investments or reduced efficiency.
Monitor future revenue impact.
\`\`\`

#### Return on Invested Capital (ROIC)
\`\`\`
ROIC Calculation:
NOPAT (Net Operating Profit After Tax): $95,000
Invested Capital: $320,000 (average)
ROIC: $95,000 ÷ $320,000 = 29.7%

Benchmark Analysis:
- Excellent: >20%
- Good: 15-20%  
- Average: 10-15%
- Poor: <10%

Analysis: 29.7% ROIC indicates very efficient
use of capital for growth and operations.
\`\`\`

### 2. Strategic Investment Analysis

#### Investment Categories
\`\`\`
2024 Investment Breakdown:
Growth Investments:        $75,000 (68%)
- New development tools:   $25,000
- Office expansion:        $35,000  
- Marketing technology:    $15,000

Maintenance Investments:   $25,000 (23%)
- Equipment replacement:   $15,000
- Software upgrades:       $10,000

Strategic Investments:     $10,000 (9%)
- Competitive analysis:    $5,000
- Market research:         $5,000

Total CapEx:              $110,000

Analysis: Heavy focus on growth investments
supports expansion strategy. Balanced approach
between growth and maintenance.
\`\`\`

## Financing Cash Flow Analysis

### 1. Capital Structure Decisions

#### Debt vs. Equity Financing
\`\`\`
2024 Financing Activities Analysis:

Debt Financing:
- New bank loan:           +$75,000
- Debt repayment:          -$40,000
- Net debt increase:       +$35,000

Equity Financing:
- New investment round:    +$200,000
- Cost (legal/professional): -$15,000
- Net equity raised:       +$185,000

Total External Financing:  +$220,000

Use of Funds Analysis:
- Growth investments:      $110,000 (50%)
- Working capital needs:   $75,000 (34%)  
- Cash reserve building:   $35,000 (16%)

Analysis: Balanced financing approach with
equity for growth and debt for working capital.
\`\`\`

#### Cost of Capital Analysis
\`\`\`
Weighted Average Cost of Capital (WACC):

Debt Component:
- Total debt: $110,000
- Interest rate: 6.5%
- Tax rate: 25%
- After-tax cost: 4.9%

Equity Component:  
- Total equity: $435,000
- Required return: 15%
- Cost of equity: 15%

WACC Calculation:
Debt weight: $110,000 ÷ $545,000 = 20.2%
Equity weight: $435,000 ÷ $545,000 = 79.8%

WACC = (20.2% × 4.9%) + (79.8% × 15%) = 12.95%

Analysis: 12.95% WACC provides hurdle rate
for investment decisions and valuation.
\`\`\`

### 2. Dividend and Distribution Policy

#### Cash Distribution Analysis
\`\`\`
Distribution Policy Evaluation:
Available Cash Flow:       $152,500 (Free Cash Flow)
Growth Investment Needs:   $125,000 (planned 2025)
Minimum Cash Reserve:      $75,000 (3 months expenses)

Available for Distribution: $152,500 - $125,000 = $27,500

Distribution Options:
Option 1: Retain all cash for growth
- Pros: Maximum growth funding, flexibility
- Cons: No shareholder returns

Option 2: Distribute $15,000 (10% of FCF)  
- Pros: Shareholder returns, discipline
- Cons: Reduced growth capacity

Recommendation: Retain cash in growth stage,
consider distributions when FCF > $300K annually.
\`\`\`

## Cash Flow Statement Red Flags

### Operating Cash Flow Red Flags
1. **Negative operating cash flow** despite profits
2. **Declining operating cash flow** over multiple periods
3. **Operating cash flow << Net income** consistently
4. **Large working capital swings** without explanation
5. **Dependence on asset sales** for positive cash flow

### Investing Cash Flow Red Flags
1. **No maintenance capital expenditures** (deferred investment)
2. **Declining investment** in growth during expansion phase
3. **Asset sales** to fund operations
4. **Poor returns** on invested capital
5. **Excessive investment** without revenue growth

### Financing Cash Flow Red Flags
1. **Frequent equity raises** without growth justification
2. **Increasing debt levels** without cash flow improvement
3. **Inability to access** external financing
4. **High cost** of capital relative to industry
5. **Unsustainable dividend/distribution** levels

## Cash Flow Forecasting

### Short-term Cash Flow Forecasting (13 weeks)
\`\`\`
Weekly Cash Flow Forecast:
                Week 1  Week 2  Week 3  Week 4
Beginning Cash   $417K   $445K   $438K   $456K

Operating Receipts:
Customer Collections $65K    $58K    $72K    $68K
Other Income        $2K     $1K     $3K     $2K
Total Receipts      $67K    $59K    $75K    $70K

Operating Payments:
Payroll            $35K    $0K     $35K    $0K
Suppliers          $18K    $22K    $15K    $25K  
Other Expenses     $8K     $12K    $9K     $11K
Total Payments     $61K    $34K    $59K    $36K

Net Operating CF   $6K     $25K    $16K    $34K

Investing Activities:
Equipment Purchase  $0K     $0K     $15K    $0K

Financing Activities:
Loan Payment       $8K     $0K     $0K     $8K

Net Cash Flow      ($2K)   $25K    $1K     $26K
Ending Cash        $445K   $470K   $471K   $497K

Minimum Required: $150K
Excess Cash: $295K-$347K (available for investment)
\`\`\`

### Long-term Cash Flow Modeling
\`\`\`
Annual Cash Flow Projections:
                    2025    2026    2027
Revenue Growth      25%     30%     25%
Revenue            $1.63M  $2.11M  $2.64M

Operating CF Margin 22%     24%     25%
Operating Cash Flow $358K   $507K   $660K

CapEx Rate          8%      6%      5%
Capital Expenditures $130K   $127K   $132K

Free Cash Flow      $228K   $380K   $528K

Analysis: Strong free cash flow growth supports
organic expansion and potential acquisitions.
\`\`\`

## Industry-Specific Cash Flow Analysis

### SaaS Business Cash Flow Patterns
\`\`\`
SaaS-Specific Metrics:
Cash Flow from New Bookings: $185K
Cash Flow from Renewals: $145K  
Cash Flow from Expansions: $65K
Total New Cash: $395K

Customer Acquisition Investment: $125K
Customer Success Investment: $45K
Total CAC Cash Outflow: $170K

Net New Customer Cash Flow: $225K

Unit Economics:
Average Contract Value: $12K
Customer Acquisition Cost: $2.1K
LTV/CAC Ratio: 14.3x (excellent)
Payback Period: 8.2 months (strong)

Cash Flow Quality: High recurring revenue
creates predictable cash generation patterns.
\`\`\`

### Service Business Cash Flow
\`\`\`
Service Business Characteristics:
Project Revenue Recognition: $285K
Cash Collections (different timing): $245K
Working Capital Impact: ($40K)

Utilization Impact on Cash Flow:
Billable Hours: 1,840 hours  
Utilization Rate: 76%
Revenue per Hour: $155
Cash Collection Rate: 94%

Seasonal Patterns:
Q1: Strong (budget season)
Q2: Moderate (planning season)  
Q3: Slow (vacation season)
Q4: Variable (depends on year-end spending)

Cash Management: Need 2-3 months reserves
for seasonal variations and project gaps.
\`\`\`

## Key Takeaways

- Cash flow statements show actual cash movements, not accounting profits
- Operating cash flow quality indicates sustainable business performance
- Working capital changes significantly impact cash flow timing
- Free cash flow (Operating CF - CapEx) shows true cash generation
- Investing activities reveal growth strategy and capital efficiency
- Financing activities show capital structure decisions and cost
- Regular cash flow analysis and forecasting prevents liquidity crises
- Industry-specific patterns require tailored analysis approaches

Cash flow analysis provides the foundation for liquidity management, growth planning, and strategic decision-making that ensures long-term business sustainability.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 105
      },
      {
        title: 'Cash Flow Forecasting and Management',
        slug: 'cash-flow-forecasting-management',
        content: `# Cash Flow Forecasting and Management

## The Critical Importance of Cash Flow Management

Cash flow management separates successful businesses from failed ones. Many profitable companies fail because they run out of cash, while some unprofitable companies survive by managing cash flow effectively. For founders, cash flow forecasting and management is a core competency that directly impacts survival, growth, and strategic opportunities.

## Cash Flow Forecasting Framework

### 1. Short-term Forecasting (13-Week Rolling)

#### Weekly Detail Structure
\`\`\`
13-Week Cash Flow Forecast Template:

Weeks 1-4: Daily detail for critical decisions
Weeks 5-8: Weekly detail for operational planning  
Weeks 9-13: Weekly trends for strategic planning

Components:
- Beginning cash position
- Operating cash inflows (customer collections)
- Operating cash outflows (payroll, suppliers, expenses)
- Investing activities (equipment, acquisitions)
- Financing activities (loans, investments, distributions)
- Ending cash position vs. minimum requirements
\`\`\`

#### Detailed Weekly Forecast Example
\`\`\`
Week 1 Detail (Daily breakdown):
                Mon    Tue    Wed    Thu    Fri   Total
Beginning Cash  $125K  $118K  $145K  $138K  $155K

Cash Inflows:
Customer A             $25K                         $25K
Customer B                           $15K          $15K  
Customer C                                   $20K   $20K
Wire Transfer          $10K                         $10K
Credit Card                   $8K            $3K    $11K
Total Inflows   $0K    $35K   $23K   $15K   $8K    $81K

Cash Outflows:
Payroll        $7K                                  $7K
Rent                  $5K                          $5K
Supplier X            $12K                         $12K
Supplier Y                    $8K                  $8K
Marketing                            $5K           $5K
Other          $0K    $3K    $22K   $12K   $15K   $52K
Total Outflows $7K    $20K   $30K   $17K   $15K   $89K

Net Daily CF   ($7K)  $15K   ($7K)  ($2K)  ($7K)  ($8K)
Ending Cash    $118K  $133K  $126K  $124K  $117K  $117K

Minimum Cash Required: $100K
Excess/(Shortage): $18K to $33K (adequate)

Key Insights:
- Wednesday has largest outflow ($30K)
- Need to monitor Customer A payment timing
- Week ends at minimum acceptable level
\`\`\`

### 2. Medium-term Forecasting (Quarterly)

#### Quarterly Cash Flow Model
\`\`\`
Quarterly Cash Flow Projection:
                     Q1 2024  Q2 2024  Q3 2024  Q4 2024
Beginning Cash        $115K    $185K    $235K    $195K

Operating Activities:
Revenue              $390K    $425K    $380K    $465K
Collection Rate        92%      94%      90%      96%
Collections          $359K    $400K    $342K    $446K

Operating Expenses:
Payroll              $195K    $210K    $210K    $225K
Rent                  $18K     $18K     $18K     $19K
Marketing             $35K     $45K     $28K     $55K
Other Expenses        $42K     $38K     $35K     $48K
Total OpEx           $290K    $311K    $291K    $347K

Net Operating CF      $69K     $89K     $51K     $99K

Investing Activities:
Equipment Purchase   ($25K)   ($15K)   ($35K)   ($20K)
Software Investment   ($8K)   ($12K)    ($5K)   ($15K)
Total Investing      ($33K)   ($27K)   ($40K)   ($35K)

Financing Activities:
Loan Proceeds           $0       $0      $50K       $0
Loan Payments        ($12K)   ($12K)   ($12K)   ($15K)
Equity Investment      $46K      $0       $0      $125K
Total Financing       $34K    ($12K)    $38K    $110K

Net Quarterly CF      $70K     $50K     $49K    $174K
Ending Cash          $185K    $235K    $284K    $458K

Analysis:
- Q3 shows lowest operating cash flow (seasonal)
- Q4 equity raise provides growth capital
- Steady improvement in cash position
- No liquidity concerns throughout period
\`\`\`

### 3. Long-term Forecasting (Annual Strategic)

#### Annual Strategic Cash Model
\`\`\`
5-Year Strategic Cash Flow Model:
                    2024    2025    2026    2027    2028
Revenue Growth       25%     35%     30%     25%     20%
Revenue            $1.66M  $2.24M  $2.91M  $3.64M  $4.37M

Operating Margin     18%     22%     25%     27%     30%
Operating CF       $299K   $493K   $728K   $983K  $1.31M

CapEx Rate           6%      8%      6%      5%      4%
Capital Expend.    $100K   $179K   $175K   $182K   $175K

Free Cash Flow     $199K   $314K   $553K   $801K  $1.14M

Key Assumptions:
- Market expansion drives 2025-2026 growth
- Operating leverage improves margins
- CapEx peaks during expansion phase
- Mature cash generation by 2028

Strategic Implications:
- 2025: Need growth capital ($500K raise planned)
- 2026: Self-funding growth becomes possible
- 2027+: Consider acquisitions or dividends
- Strong cash generation supports exit valuation
\`\`\`

## Cash Flow Analysis Techniques

### 1. Variance Analysis

#### Actual vs. Forecast Analysis
\`\`\`
March 2024 Cash Flow Variance Report:
                   Forecast   Actual   Variance   %Var
Beginning Cash      $125K     $118K     ($7K)    -5.6%

Collections:
Customer A           $25K      $30K      $5K     +20%
Customer B           $15K       $8K     ($7K)    -47%
Customer C           $20K      $22K      $2K     +10%
Other Collections    $11K       $9K     ($2K)    -18%
Total Collections    $71K      $69K     ($2K)     -3%

Payments:
Payroll              $35K      $35K       $0      0%
Rent                  $5K       $5K       $0      0%  
Suppliers            $28K      $32K      $4K     +14%
Marketing            $12K       $8K     ($4K)    -33%
Other                $15K      $18K      $3K     +20%
Total Payments       $95K      $98K      $3K     +3%

Net Cash Flow       ($24K)    ($29K)    ($5K)    -21%
Ending Cash         $101K      $89K    ($12K)    -12%

Variance Analysis:
Positive: Customer A paid early (+$5K)
Negative: Customer B payment delayed (-$7K)  
Negative: Supplier costs higher than expected (+$4K)
Positive: Marketing spend lower (-$4K)

Action Items:
1. Follow up on Customer B payment (past due)
2. Investigate supplier cost increase
3. Reallocate unused marketing budget
4. Update forecast assumptions for April
\`\`\`

### 2. Scenario Planning

#### Three-Scenario Cash Flow Model
\`\`\`
Q2 2024 Scenario Analysis:
                  Optimistic  Base Case  Conservative
Revenue Growth        +40%       +25%        +10%  
Collection Rate        96%        94%         90%
Expense Growth        +15%       +20%        +25%

Cash Flow Results:
                  Optimistic  Base Case  Conservative
Operating CF         $125K      $89K        $52K
Ending Cash          $310K     $235K       $197K
Cash Runway          12+ mos    8.5 mos     6.2 mos

Risk Assessment:
- Optimistic: 25% probability
- Base Case: 50% probability  
- Conservative: 25% probability

Weighted Expected CF: $89K × 0.5 + $125K × 0.25 + $52K × 0.25
                    = $89K (matches base case)

Contingency Planning:
If Conservative scenario occurs:
- Reduce discretionary spending by $15K
- Accelerate collection efforts
- Consider bridge financing of $50K
- Delay non-critical capital expenditures
\`\`\`

### 3. Sensitivity Analysis

#### Key Variable Impact Analysis
\`\`\`
Cash Flow Sensitivity to Key Variables:
Base Case Monthly Operating CF: $25K

Variable Changes (Impact on Monthly CF):
Revenue Growth:
+10%: Operating CF increases to $32K (+$7K)
-10%: Operating CF decreases to $18K (-$7K)

Collection Period:
+5 days: Operating CF decreases to $22K (-$3K)  
-5 days: Operating CF increases to $28K (+$3K)

Payment Terms:
+5 days DPO: Operating CF increases to $27K (+$2K)
-5 days DPO: Operating CF decreases to $23K (-$2K)

Payroll Changes:
+20%: Operating CF decreases to $18K (-$7K)
-10%: Operating CF increases to $29K (+$4K)

Most Sensitive Variables:
1. Revenue growth (±$7K per 10% change)
2. Payroll costs (±$7K per 20% change)  
3. Collection timing (±$3K per 5 days)
4. Payment timing (±$2K per 5 days)

Risk Mitigation:
- Focus on revenue quality and predictability
- Monitor payroll efficiency ratios
- Maintain strong collection processes
- Optimize supplier payment terms
\`\`\`

## Cash Management Strategies

### 1. Working Capital Optimization

#### Accounts Receivable Acceleration
\`\`\`
A/R Acceleration Strategies:

Current DSO: 32 days
Target DSO: 25 days
Monthly Sales: $150K
Daily Sales: $5K

Improvement Impact:
Current A/R: 32 × $5K = $160K
Target A/R: 25 × $5K = $125K
Cash Improvement: $35K one-time

Implementation Plan:
Week 1: Implement electronic invoicing
- Expected improvement: 2 days ($10K)

Week 2: Offer 2% early payment discount
- Expected improvement: 3 days ($15K)
- Cost: 2% × 40% uptake = $1.2K monthly

Week 3: Automated reminder system
- Expected improvement: 2 days ($10K)
- Cost: $200/month software

Total Improvement: 7 days ($35K cash)
Annual Cost: $16.4K
Net Benefit: $35K - $16.4K = $18.6K
\`\`\`

#### Accounts Payable Optimization
\`\`\`
A/P Optimization Strategy:

Current DPO: 25 days
Target DPO: 32 days  
Monthly Purchases: $80K
Daily Purchases: $2.67K

Working Capital Impact:
Current A/P: 25 × $2.67K = $66.7K
Target A/P: 32 × $2.67K = $85.3K
Cash Improvement: $18.6K

Implementation Strategy:
1. Negotiate extended terms with top suppliers
2. Centralize payment processing
3. Take advantage of payment terms fully
4. Use corporate credit cards for smaller purchases

Supplier Negotiation Results:
Supplier A (30% of spend): 30 → 35 days
Supplier B (25% of spend): 20 → 30 days  
Supplier C (15% of spend): 15 → 25 days
Others (30% of spend): No change

Weighted Average DPO: 29.5 days
Cash Improvement: $12.2K
\`\`\`

### 2. Cash Reserve Management

#### Optimal Cash Reserve Calculation
\`\`\`
Cash Reserve Analysis:

Monthly Cash Burn:
Operating Expenses: $75K
Capital Expenditures: $8K (average)
Debt Service: $3K
Total Monthly Burn: $86K

Reserve Requirements:
Minimum Operating (3 months): $258K
Growth Opportunities (2 months): $172K  
Contingency Reserve (1 month): $86K
Total Target Reserve: $516K

Current Cash: $285K
Reserve Gap: $231K

Funding Options:
1. Line of credit: $150K (immediate access)
2. Revenue acceleration: $50K (A/R improvement)
3. Expense reduction: $31K (3 months × $10K savings)
4. Asset optimization: $50K (equipment refinancing)

Total Available: $281K
Net Position: $281K - $231K = $50K buffer

Recommendation: Establish $150K line of credit
as primary solution with backup strategies.
\`\`\`

#### Cash Investment Strategy
\`\`\`
Excess Cash Investment Ladder:
Target Cash: $516K
Current Cash: $650K  
Excess Cash: $134K

Investment Allocation:
Tier 1 (Immediate Access): $50K
- High-yield savings: 2.5% APY
- Money market: 2.8% APY
- Liquidity: Same day

Tier 2 (30-Day Access): $50K
- 1-month CDs: 3.2% APY
- Treasury bills: 3.5% APY  
- Liquidity: 30 days

Tier 3 (90-Day Access): $34K
- 3-month CDs: 3.8% APY
- Commercial paper: 4.1% APY
- Liquidity: 90 days

Expected Annual Return:
Tier 1: $50K × 2.65% = $1,325
Tier 2: $50K × 3.35% = $1,675
Tier 3: $34K × 3.95% = $1,343
Total Annual Income: $4,343

Risk Management:
- All investments FDIC insured or government backed
- Ladder structure provides quarterly liquidity
- Conservative approach preserves capital
\`\`\`

## Cash Crisis Management

### 1. Early Warning System

#### Cash Flow Warning Indicators
\`\`\`
Red Flag Alert System:

Level 1 (Yellow Alert):
- Cash runway < 6 months
- Operating CF negative for 2 months
- DSO increasing >10% month-over-month
- Key customer payment delays

Level 2 (Orange Alert):  
- Cash runway < 3 months
- Operating CF negative for 3 months
- Unable to pay suppliers on time
- Credit line utilization >75%

Level 3 (Red Alert):
- Cash runway < 1 month
- Unable to make payroll  
- Supplier credit holds
- Bounced checks or failed payments

Current Status Assessment:
Cash Runway: 4.2 months (ORANGE)
Operating CF: Negative 1 month (YELLOW)
DSO Trend: Stable (GREEN)
Supplier Relations: Good (GREEN)

Overall Status: ORANGE - Action Required
\`\`\`

### 2. Crisis Response Plan

#### Immediate Actions (0-30 days)
\`\`\`
Cash Crisis Action Plan:

Immediate Cash Generation (Week 1):
1. Accelerate A/R collection
   - Personal calls to top 10 customers
   - Offer early payment discounts
   - Consider factoring largest invoices
   - Target: $45K additional cash

2. Delay non-critical payments
   - Negotiate payment plans with suppliers
   - Defer non-essential purchases
   - Delay capital expenditures
   - Target: $25K cash preservation

3. Asset conversion  
   - Sell non-essential equipment
   - Sublease unused office space
   - Convert excess inventory
   - Target: $15K cash generation

Week 1 Target: $85K cash improvement

Emergency Funding (Week 2-4):
1. Draw remaining credit line: $35K
2. Emergency investor bridge: $100K  
3. Asset-based lending: $50K
4. Equipment refinancing: $25K

Total Emergency Funding: $210K
Combined Cash Improvement: $295K
Extended Runway: 6.8 months
\`\`\`

#### Operational Restructuring
\`\`\`
Cost Reduction Plan:

Personnel (40% of costs):
- Temporary salary cuts (management): $8K/month
- Reduced hours (non-essential): $5K/month  
- Consultant elimination: $12K/month
- Subtotal savings: $25K/month

Facilities (15% of costs):
- Sublease excess space: $3K/month
- Utility reductions: $1K/month
- Service downgrades: $2K/month
- Subtotal savings: $6K/month

Services (20% of costs):
- Marketing reduction: $8K/month
- Software downgrades: $2K/month
- Professional service delays: $3K/month
- Subtotal savings: $13K/month

Total Monthly Savings: $44K
Impact on Runway: 4.2 → 7.5 months
\`\`\`

## Technology and Automation

### 1. Cash Flow Management Software

#### Software Comparison
\`\`\`
Cash Flow Management Tools:

Float (Recommended):
- Features: 13-week forecasting, scenario planning
- Integration: QuickBooks, Xero, banks
- Cost: $59-199/month
- Best for: Growing businesses

Camel:
- Features: Working capital optimization
- Integration: Multiple accounting systems
- Cost: $299/month  
- Best for: Larger companies

PulseHQ:
- Features: Real-time dashboards
- Integration: Limited but growing
- Cost: $29-89/month
- Best for: Small businesses

Futrli:
- Features: Advanced forecasting and budgeting
- Integration: Xero, QuickBooks
- Cost: $71-166/month
- Best for: Financial planning focus

Selection Criteria:
1. Forecasting accuracy and flexibility
2. Integration with existing systems
3. Ease of use and team adoption
4. Cost vs. value proposition
5. Reporting and visualization capabilities
\`\`\`

### 2. Automation Implementation

#### Cash Flow Process Automation
\`\`\`
Automation Roadmap:

Phase 1 (Month 1): Basic Automation
- Automated invoicing (QuickBooks)
- Payment reminders (automated emails)  
- Bank feed integration
- Expected time savings: 8 hours/week

Phase 2 (Month 2): Advanced Collection
- A/R aging automation
- Customer payment portals
- Failed payment retry logic
- Expected DSO improvement: 5 days

Phase 3 (Month 3): Forecasting Automation
- Daily cash position updates
- Weekly variance reporting
- Scenario model updates
- Expected accuracy improvement: 15%

Phase 4 (Month 4): Strategic Integration  
- Board reporting automation
- Investor dashboard creation
- KPI monitoring alerts
- Expected management time savings: 12 hours/month

Total Implementation Cost: $8,500
Annual Savings (time + DSO improvement): $47,000
ROI: 453%
\`\`\`

## Key Performance Indicators

### Cash Flow KPIs Dashboard
\`\`\`
Critical Cash Flow Metrics:

Liquidity Metrics:
- Current Cash Position: $285K
- Cash Runway: 4.2 months
- Minimum Cash Threshold: $100K  
- Days Above Minimum: 127 days

Flow Metrics:
- Operating Cash Flow (monthly): $22K
- Free Cash Flow (monthly): $15K
- Cash Conversion Cycle: 28 days
- Collection Efficiency: 94%

Predictive Metrics:
- Forecast Accuracy: 92%
- Scenario Range: ±$15K
- Variance from Plan: -3.2%
- Trend Direction: Improving

Quality Metrics:
- OCF/Revenue Ratio: 18%
- Working Capital Efficiency: 1.35x
- Cash-to-Debt Ratio: 2.8x
- Interest Coverage: 8.5x

Red/Yellow/Green Status:
🟢 Operating Cash Flow: Positive trend
🟡 Cash Runway: Below 6-month target  
🟢 Collection Efficiency: Above 90%
🟢 Forecast Accuracy: Above 90%
🟡 Working Capital: Room for improvement
\`\`\`

## Key Takeaways

- Cash flow forecasting prevents crises and enables strategic planning
- 13-week rolling forecasts provide operational visibility
- Scenario planning prepares for uncertainty and risk management
- Working capital optimization can generate significant cash improvements
- Early warning systems enable proactive crisis prevention
- Technology automation improves accuracy and reduces management time
- Regular variance analysis improves forecasting accuracy over time
- Cash reserves should be actively managed and invested appropriately

Effective cash flow management transforms from reactive crisis response to proactive strategic advantage, enabling sustainable growth and long-term success.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 115
      }
    ];

    for (const lessonData of week3lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          weekId: week3.id
        }
      });
    }

    // Week 3 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week3.id,
        title: 'Cash Flow Analysis Mastery Quiz',
        description: 'Test your understanding of cash flow statement analysis and cash flow management',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'What does Free Cash Flow represent and why is it important?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Total cash in bank accounts available for spending',
                'Operating Cash Flow minus Capital Expenditures - shows cash available for growth/distributions',
                'Net Income plus Depreciation - shows accounting profits adjusted for non-cash items',
                'Cash received from customers minus cash paid to suppliers'
              ]),
              correctAnswer: 'Operating Cash Flow minus Capital Expenditures - shows cash available for growth/distributions',
              explanation: 'Free Cash Flow = Operating Cash Flow - CapEx. It represents cash generated after necessary investments in the business, available for debt repayment, dividends, acquisitions, or reserves.',
              orderIndex: 1
            },
            {
              questionText: 'A company shows $100K net income but only $60K operating cash flow. What could explain this difference?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'The company is manipulating their financial statements',
                'Accounts receivable increased and/or accounts payable decreased',
                'The company made large capital expenditures during the period', 
                'Depreciation expense was recorded incorrectly'
              ]),
              correctAnswer: 'Accounts receivable increased and/or accounts payable decreased',
              explanation: 'Working capital changes explain differences between net income and operating cash flow. Growing A/R (sales not collected) and decreasing A/P (paying suppliers faster) reduce operating cash flow below net income.',
              orderIndex: 2
            },
            {
              questionText: 'In cash flow forecasting, what is the primary purpose of a 13-week rolling forecast?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'To comply with accounting standards and regulations',
                'To provide detailed short-term visibility for operational decisions and liquidity management',
                'To calculate annual tax liabilities for the business',
                'To determine the company\'s long-term valuation for investors'
              ]),
              correctAnswer: 'To provide detailed short-term visibility for operational decisions and liquidity management',
              explanation: 'A 13-week rolling forecast provides detailed near-term cash flow visibility, helping manage day-to-day liquidity, identify potential cash shortfalls, and make informed operational decisions.',
              orderIndex: 3
            },
            {
              questionText: 'What is the Cash Conversion Cycle and what does a negative cycle indicate?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'DSO + DIO - DPO; negative means poor working capital management',
                'DSO + DIO - DPO; negative means suppliers finance operations (favorable)',
                'The time it takes to convert inventory to cash; negative means inventory problems',
                'Operating Cash Flow divided by Net Income; negative means cash flow problems'
              ]),
              correctAnswer: 'DSO + DIO - DPO; negative means suppliers finance operations (favorable)',
              explanation: 'Cash Conversion Cycle = Days Sales Outstanding + Days Inventory Outstanding - Days Payable Outstanding. A negative cycle means the company collects from customers before paying suppliers, improving cash flow timing.',
              orderIndex: 4
            },
            {
              questionText: 'When managing a cash flow crisis, which action typically provides the fastest cash improvement?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Negotiating longer payment terms with suppliers',
                'Accelerating accounts receivable collection with discounts and personal follow-up',
                'Applying for a long-term bank loan',
                'Cutting all discretionary expenses immediately'
              ]),
              correctAnswer: 'Accelerating accounts receivable collection with discounts and personal follow-up',
              explanation: 'Accelerating A/R collection provides the fastest cash improvement because the sales have already been made - you\'re just speeding up payment timing. This can generate cash within days rather than weeks.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 3 created with 2 lessons and 1 quiz');

    // Week 4: Key Performance Indicators (KPIs) and Metrics  
    const week4 = await prisma.week.create({
      data: {
        courseId: course5.id,
        weekNumber: 4,
        title: 'Key Performance Indicators (KPIs) and Metrics',
        overview: 'Learn to identify, calculate, and interpret the most important financial KPIs and metrics for data-driven business decisions and performance management.',
        learningObjectives: JSON.stringify([
          'Identify key financial ratios and metrics for business analysis',
          'Calculate and interpret profitability, efficiency, and liquidity ratios',
          'Understand industry-specific KPIs and benchmarking',
          'Create KPI dashboards for ongoing performance monitoring',
          'Use financial metrics for strategic decision-making and goal setting'
        ]),
        estimatedHours: 8
      }
    });

    const week4lessons = [
      {
        title: 'Essential Financial Ratios and KPIs',
        slug: 'essential-financial-ratios-kpis',
        content: `# Essential Financial Ratios and KPIs

## Understanding Financial Ratios and KPIs

Financial ratios and Key Performance Indicators (KPIs) transform raw financial data into actionable insights. For founders, these metrics serve as the dashboard for business performance, enabling data-driven decisions, investor communication, and strategic planning.

## Why Financial Metrics Matter

### Business Management Benefits
1. **Performance Monitoring**: Track progress against goals and industry benchmarks
2. **Early Warning System**: Identify problems before they become critical
3. **Resource Allocation**: Make informed decisions about where to invest time and money
4. **Strategic Planning**: Set realistic targets based on historical performance
5. **Operational Efficiency**: Identify areas for improvement and optimization

### Stakeholder Communication
1. **Investor Relations**: Demonstrate business health and growth trajectory
2. **Board Reporting**: Provide consistent, comparable performance updates
3. **Lender Relations**: Show creditworthiness and repayment capacity
4. **Team Alignment**: Give everyone a common language for success metrics

## Financial Ratio Categories

### 1. Profitability Ratios

#### Gross Profit Margin
**Formula:** (Gross Profit ÷ Revenue) × 100

**Purpose:** Measures efficiency of core business operations

\`\`\`
Example Calculation:
Revenue: $500,000
Cost of Goods Sold: $125,000
Gross Profit: $375,000

Gross Profit Margin = ($375,000 ÷ $500,000) × 100 = 75%

Industry Benchmarks:
- SaaS: 75-85%
- Software Services: 60-75%  
- Consulting: 50-70%
- E-commerce: 20-40%
- Manufacturing: 25-35%

Analysis: 75% gross margin is excellent for most industries,
indicating strong pricing power and operational efficiency.
\`\`\`

**Improvement Strategies:**
- **Increase Prices**: Test price elasticity with customer segments
- **Reduce COGS**: Optimize hosting costs, negotiate better supplier terms
- **Product Mix**: Focus sales on higher-margin products/services
- **Automation**: Reduce labor costs through technology

#### Operating Profit Margin (EBITDA Margin)
**Formula:** (EBITDA ÷ Revenue) × 100

**Purpose:** Measures operational efficiency after all operating expenses

\`\`\`
Operating Margin Analysis:
Revenue: $500,000
Gross Profit: $375,000
Operating Expenses: $325,000
EBITDA: $50,000

Operating Margin = ($50,000 ÷ $500,000) × 100 = 10%

Target Ranges by Stage:
- Early Stage (0-2 years): Often negative to -20%
- Growth Stage (2-5 years): 5-15%  
- Mature Stage (5+ years): 15-25%

Interpretation: 10% operating margin is healthy for 
a growth-stage company, showing path to profitability.
\`\`\`

#### Net Profit Margin  
**Formula:** (Net Income ÷ Revenue) × 100

**Purpose:** Overall profitability after all expenses, interest, and taxes

\`\`\`
Net Margin Calculation:
EBITDA: $50,000
Depreciation & Amortization: $15,000
Interest Expense: $5,000
Taxes: $7,500
Net Income: $22,500

Net Margin = ($22,500 ÷ $500,000) × 100 = 4.5%

Industry Comparisons:
- Technology: 15-25%
- Professional Services: 10-20%
- Retail: 3-8%
- Manufacturing: 5-12%

Analysis: 4.5% net margin is acceptable for growing
company, with room for improvement as scale increases.
\`\`\`

#### Return on Assets (ROA)
**Formula:** (Net Income ÷ Average Total Assets) × 100

**Purpose:** Measures how efficiently assets generate profits

\`\`\`
ROA Analysis:
Net Income: $22,500
Beginning Assets: $180,000
Ending Assets: $220,000
Average Assets: $200,000

ROA = ($22,500 ÷ $200,000) × 100 = 11.25%

ROA Benchmarks:
- Excellent: >15%
- Good: 10-15%
- Average: 5-10%
- Poor: <5%

Interpretation: 11.25% ROA indicates good asset
utilization efficiency for generating profits.
\`\`\`

#### Return on Equity (ROE)
**Formula:** (Net Income ÷ Average Shareholders' Equity) × 100

**Purpose:** Measures return generated on shareholders' investment

\`\`\`
ROE Calculation:
Net Income: $22,500
Beginning Equity: $85,000  
Ending Equity: $115,000
Average Equity: $100,000

ROE = ($22,500 ÷ $100,000) × 100 = 22.5%

ROE Analysis:
- Excellent: >20%
- Good: 15-20%
- Average: 10-15%  
- Poor: <10%

Interpretation: 22.5% ROE is excellent, indicating
strong returns for equity investors.
\`\`\`

### 2. Liquidity Ratios

#### Current Ratio
**Formula:** Current Assets ÷ Current Liabilities

**Purpose:** Measures ability to pay short-term obligations

\`\`\`
Current Ratio Analysis:
Current Assets: $125,000
Current Liabilities: $75,000

Current Ratio = $125,000 ÷ $75,000 = 1.67

Interpretation Guidelines:
- >2.5: Potentially excess cash not being utilized
- 2.0-2.5: Strong liquidity position
- 1.5-2.0: Good liquidity (ideal for most businesses)
- 1.0-1.5: Adequate but requires monitoring
- <1.0: Potential liquidity problems

Analysis: 1.67 current ratio indicates good liquidity
with ability to meet short-term obligations.
\`\`\`

#### Quick Ratio (Acid Test)
**Formula:** (Current Assets - Inventory) ÷ Current Liabilities

**Purpose:** Measures liquidity excluding inventory (most liquid assets only)

\`\`\`
Quick Ratio Calculation:
Current Assets: $125,000
Inventory: $15,000
Current Liabilities: $75,000

Quick Ratio = ($125,000 - $15,000) ÷ $75,000 = 1.47

Target Ranges:
- >1.5: Excellent liquidity
- 1.0-1.5: Good liquidity
- 0.5-1.0: Adequate for some industries
- <0.5: Potential liquidity concerns

Analysis: 1.47 quick ratio shows strong ability to 
meet obligations without relying on inventory sales.
\`\`\`

#### Cash Ratio
**Formula:** (Cash + Marketable Securities) ÷ Current Liabilities

**Purpose:** Most conservative liquidity measure using only cash

\`\`\`
Cash Ratio Analysis:
Cash & Cash Equivalents: $65,000
Marketable Securities: $10,000
Current Liabilities: $75,000

Cash Ratio = ($65,000 + $10,000) ÷ $75,000 = 1.0

Cash Ratio Guidelines:
- >0.5: Strong cash position
- 0.2-0.5: Adequate cash reserves
- 0.1-0.2: Minimum acceptable for mature companies
- <0.1: Potential cash flow concerns

Analysis: 1.0 cash ratio indicates very strong
cash position with immediate payment capability.
\`\`\`

### 3. Efficiency Ratios

#### Asset Turnover
**Formula:** Revenue ÷ Average Total Assets

**Purpose:** Measures how efficiently assets generate sales

\`\`\`
Asset Turnover Analysis:
Revenue: $500,000
Average Total Assets: $200,000

Asset Turnover = $500,000 ÷ $200,000 = 2.5x

Industry Benchmarks:
- Software/SaaS: 1.5-3.0x
- Professional Services: 2.0-4.0x
- Retail: 2.0-3.5x
- Manufacturing: 1.0-2.0x

Analysis: 2.5x asset turnover shows efficient use
of assets to generate revenue for the industry.
\`\`\`

#### Inventory Turnover
**Formula:** Cost of Goods Sold ÷ Average Inventory

**Purpose:** Measures how quickly inventory is sold and replaced

\`\`\`
Inventory Turnover Calculation:
Cost of Goods Sold: $125,000
Average Inventory: $15,000

Inventory Turnover = $125,000 ÷ $15,000 = 8.33x

Days Inventory Outstanding = 365 ÷ 8.33 = 44 days

Industry Comparisons:
- Fast Fashion: 12-20x (18-30 days)
- Electronics: 6-12x (30-60 days)
- Automotive: 8-15x (24-45 days)  
- Software (minimal): 20x+ (18 days)

Analysis: 8.33x turnover (44 days) indicates
efficient inventory management.
\`\`\`

#### Accounts Receivable Turnover
**Formula:** Revenue ÷ Average Accounts Receivable

**Purpose:** Measures efficiency of credit and collection policies

\`\`\`
A/R Turnover Analysis:
Revenue: $500,000
Average A/R: $42,000

A/R Turnover = $500,000 ÷ $42,000 = 11.9x

Days Sales Outstanding = 365 ÷ 11.9 = 31 days

DSO Benchmarks:
- SaaS (monthly): 15-30 days
- SaaS (annual): 30-45 days
- Consulting: 45-75 days
- Manufacturing: 45-60 days

Analysis: 31-day DSO is excellent, indicating
effective collection processes.
\`\`\`

### 4. Leverage Ratios

#### Debt-to-Assets Ratio
**Formula:** Total Debt ÷ Total Assets

**Purpose:** Measures financial risk and capital structure

\`\`\`
Debt-to-Assets Analysis:
Total Debt: $60,000
Total Assets: $220,000

Debt-to-Assets = $60,000 ÷ $220,000 = 27.3%

Risk Assessment:
- <20%: Conservative, low financial risk
- 20-40%: Moderate leverage, acceptable risk
- 40-60%: High leverage, increased risk
- >60%: Very high risk, potential distress

Analysis: 27.3% debt-to-assets indicates moderate,
manageable leverage with room for additional debt.
\`\`\`

#### Debt-to-Equity Ratio  
**Formula:** Total Debt ÷ Total Equity

**Purpose:** Compares debt financing to equity financing

\`\`\`
Debt-to-Equity Calculation:
Total Debt: $60,000
Total Equity: $160,000

Debt-to-Equity = $60,000 ÷ $160,000 = 0.375 or 37.5%

D/E Ratio Guidelines:
- <0.3 (30%): Conservative capital structure
- 0.3-1.0 (30-100%): Moderate leverage
- 1.0-2.0 (100-200%): High leverage  
- >2.0 (200%+): Very high leverage

Analysis: 37.5% D/E ratio shows conservative
capital structure with growth financing capacity.
\`\`\`

#### Times Interest Earned
**Formula:** EBIT ÷ Interest Expense  

**Purpose:** Measures ability to service debt obligations

\`\`\`
Interest Coverage Analysis:
EBIT: $35,000
Interest Expense: $5,000

Times Interest Earned = $35,000 ÷ $5,000 = 7.0x

Coverage Ratios:
- >5x: Strong coverage, low default risk
- 3-5x: Adequate coverage, manageable risk
- 2-3x: Marginal coverage, moderate risk
- <2x: Weak coverage, high default risk

Analysis: 7.0x coverage provides comfortable
margin for debt service obligations.
\`\`\`

## Growth and Value Metrics

### Revenue Growth Rate
**Formula:** ((Current Period Revenue - Prior Period Revenue) ÷ Prior Period Revenue) × 100

\`\`\`
Growth Rate Analysis:
Q1 2024 Revenue: $110,000
Q2 2024 Revenue: $125,000

QoQ Growth = (($125,000 - $110,000) ÷ $110,000) × 100 = 13.6%
Annualized Growth = (1.136)^4 - 1 = 66.8%

Growth Stage Benchmarks:
- Seed Stage: 100%+ annually
- Series A: 100-200% annually  
- Series B: 50-100% annually
- Growth Stage: 30-50% annually
- Mature: 10-30% annually

Analysis: 66.8% annualized growth is excellent
for a growth-stage company.
\`\`\`

### Customer Lifetime Value (CLV)
**Formula:** (Average Revenue per Customer × Gross Margin %) ÷ Churn Rate

\`\`\`
CLV Calculation:
Average Revenue per Customer: $2,400/year
Gross Margin: 75%
Annual Churn Rate: 12%

CLV = ($2,400 × 0.75) ÷ 0.12 = $15,000

CLV Analysis:
Customer Acquisition Cost (CAC): $800
CLV/CAC Ratio: $15,000 ÷ $800 = 18.75x

CLV/CAC Benchmarks:
- >3:1: Minimum acceptable ratio
- 5-10:1: Good ratio for sustainable growth
- >10:1: Excellent ratio, strong unit economics

Analysis: 18.75:1 ratio indicates very strong
unit economics with healthy payback periods.
\`\`\`

## Industry-Specific KPIs

### SaaS Business Metrics

#### Monthly Recurring Revenue (MRR)
\`\`\`
MRR Components:
New MRR: $15,000 (new customers)
Expansion MRR: $8,000 (upgrades)
Contraction MRR: ($2,000) (downgrades)
Churned MRR: ($3,000) (lost customers)
Net New MRR: $18,000

MRR Growth Rate = $18,000 ÷ $142,000 = 12.7% monthly

Analysis: 12.7% monthly MRR growth is excellent,
indicating strong customer acquisition and retention.
\`\`\`

#### Net Revenue Retention (NRR)
\`\`\`
NRR Calculation:
Starting MRR (cohort): $100,000
Expansion MRR: $15,000
Contraction MRR: ($5,000)
Churned MRR: ($8,000)
Ending MRR: $102,000

NRR = $102,000 ÷ $100,000 = 102%

NRR Benchmarks:
- >110%: Excellent (best-in-class)
- 100-110%: Good (sustainable growth)
- 90-100%: Acceptable (room for improvement)
- <90%: Concerning (retention issues)

Analysis: 102% NRR shows slight expansion
within existing customer base.
\`\`\`

### Service Business Metrics

#### Utilization Rate
\`\`\`
Utilization Analysis:
Available Hours: 2,080 hours/year
Billable Hours: 1,560 hours/year

Utilization Rate = 1,560 ÷ 2,080 = 75%

Utilization Benchmarks:
- Consulting: 65-75%
- Accounting: 70-80%
- Legal Services: 60-70%
- Design Agencies: 70-80%

Revenue Impact:
Current Revenue: $234,000
At 80% Utilization: $249,600
Additional Revenue Opportunity: $15,600
\`\`\`

#### Revenue per Employee
\`\`\`
Revenue per Employee:
Total Revenue: $500,000
Number of Employees: 4

Revenue per Employee = $500,000 ÷ 4 = $125,000

Industry Benchmarks:
- Software/SaaS: $200,000-400,000
- Professional Services: $150,000-300,000
- Consulting: $100,000-200,000
- General Business: $100,000-150,000

Analysis: $125,000 per employee is at lower end
of consulting range, indicating opportunity for
efficiency improvements or price increases.
\`\`\`

## Ratio Interpretation Guidelines

### Trend Analysis
\`\`\`
Quarterly Trend Example:
                    Q1      Q2      Q3      Q4    Trend
Gross Margin        72%     75%     76%     78%   Improving
Current Ratio       1.45    1.52    1.67    1.72  Improving
ROE                 15%     18%     22%     25%   Improving
Debt/Equity         45%     42%     38%     32%   Improving

Overall Assessment: Strong improvement across
all key financial health indicators.
\`\`\`

### Industry Benchmarking
\`\`\`
Competitive Position Analysis:
                    Our Co  Industry Industry
                            Average  Top 25%
Gross Margin        75%     68%      78%
Operating Margin    10%     8%       15%
Current Ratio       1.67    1.45     1.85
ROE                 22%     16%      25%
Revenue Growth      67%     35%      55%

Competitive Position:
- Above average on most metrics
- Gross margin competitive with top performers
- Growth significantly above industry average
- Opportunity to improve operating efficiency
\`\`\`

## Common Ratio Analysis Mistakes

### 1. Single Period Analysis
**Problem:** Looking at ratios in isolation without trend context

**Solution:** Always analyze 3+ periods to identify trends

### 2. Industry Ignorance
**Problem:** Comparing ratios without industry context

**Solution:** Research industry benchmarks and peer comparisons

### 3. Ratio Gaming
**Problem:** Manipulating activities to improve ratios artificially

**Solution:** Focus on underlying business improvement, not just metrics

### 4. Overemphasis on Single Metrics
**Problem:** Making decisions based on one ratio

**Solution:** Use comprehensive ratio analysis with multiple metrics

### 5. Ignoring Business Context
**Problem:** Not considering business stage, strategy, or external factors

**Solution:** Interpret ratios within broader business context

## Building a Financial Dashboard

### Executive Dashboard Example
\`\`\`
Monthly Financial Dashboard:

PROFITABILITY (Green/Yellow/Red status):
🟢 Gross Margin: 75% (Target: >70%)
🟡 Operating Margin: 10% (Target: >15%)
🟢 Net Margin: 4.5% (Target: >3%)

LIQUIDITY:
🟢 Current Ratio: 1.67 (Target: >1.5)
🟢 Cash Position: $65K (Target: >$50K)
🟡 Cash Runway: 6.2 months (Target: >6 months)

EFFICIENCY:
🟢 Asset Turnover: 2.5x (Target: >2.0x)
🟢 DSO: 31 days (Target: <35 days)
🟡 Revenue/Employee: $125K (Target: >$150K)

GROWTH:
🟢 Revenue Growth: 67% YoY (Target: >30%)
🟢 Customer Growth: 45% YoY (Target: >25%)
🟢 CLV/CAC: 18.75x (Target: >5x)

LEVERAGE:
🟢 Debt/Equity: 37% (Target: <50%)
🟢 Interest Coverage: 7.0x (Target: >3.0x)
🟢 Debt Service Coverage: 4.2x (Target: >2.0x)

Overall Health Score: 14/15 metrics on target (93%)
\`\`\`

## Key Takeaways

- Financial ratios transform data into actionable business insights
- Use multiple ratios together for comprehensive analysis  
- Compare trends over time, not just point-in-time snapshots
- Benchmark against industry standards and competitors
- Different business models require different KPI emphasis
- Regular monitoring enables proactive management decisions
- Focus on ratios that drive your specific business strategy
- Balance financial metrics with operational and strategic indicators

Mastering financial ratios and KPIs provides founders with the analytical foundation for data-driven decision-making, investor communication, and sustainable business growth.`,
        orderIndex: 1,
        lessonType: 'reading',
        durationMinutes: 110
      },
      {
        title: 'KPI Dashboards and Performance Management',
        slug: 'kpi-dashboards-performance-management',
        content: `# KPI Dashboards and Performance Management

## The Power of Performance Dashboards

KPI dashboards transform complex financial data into clear, actionable insights that drive better business decisions. For founders, effective dashboard design and performance management systems are essential tools for scaling operations, communicating with stakeholders, and maintaining competitive advantage.

## Dashboard Design Principles

### 1. Audience-Specific Design

#### Executive Dashboard (CEO/Founder)
**Purpose:** Strategic oversight and key decision support
**Update Frequency:** Weekly/Monthly
**Key Focus Areas:** Growth, profitability, cash flow, strategic initiatives

\`\`\`
Executive Dashboard Layout:
┌─────────────────────────────────────────┐
│ EXECUTIVE DASHBOARD - March 2024        │
├─────────────────────────────────────────┤
│ REVENUE METRICS                         │
│ 🟢 Monthly Revenue: $125K (+15% MoM)    │
│ 🟢 YoY Growth: 67% (Target: 50%)        │
│ 🟢 MRR: $85K (+12% MoM)                │
│                                         │
│ PROFITABILITY                           │
│ 🟢 Gross Margin: 75% (Target: >70%)     │
│ 🟡 EBITDA Margin: 10% (Target: >15%)    │
│ 🟢 Unit Economics: 18.7x LTV/CAC        │
│                                         │
│ CASH FLOW                               │
│ 🟡 Cash Position: $285K (6.2mo runway)  │
│ 🟢 Operating CF: +$22K/month           │
│ 🟢 Free Cash Flow: +$15K/month         │
│                                         │
│ STRATEGIC INITIATIVES                   │
│ 🟢 Q1 Goals: 4/5 on track              │
│ 🟡 Product Launch: 2 weeks behind       │
│ 🟢 Team Expansion: On schedule          │
└─────────────────────────────────────────┘
\`\`\`

#### Operations Dashboard (COO/Managers)
**Purpose:** Operational efficiency and process optimization
**Update Frequency:** Daily/Weekly
**Key Focus Areas:** Customer metrics, operational efficiency, team performance

\`\`\`
Operations Dashboard:
┌─────────────────────────────────────────┐
│ OPERATIONS DASHBOARD - March 2024       │
├─────────────────────────────────────────┤
│ CUSTOMER METRICS                        │
│ 🟢 Customer Satisfaction: 4.7/5        │
│ 🟡 Churn Rate: 3.2% (Target: <3%)      │
│ 🟢 Support Response: 2.1 hours         │
│                                         │
│ OPERATIONAL EFFICIENCY                  │
│ 🟢 Order Processing: 1.3 days avg      │
│ 🟡 Utilization Rate: 73% (Target: 75%) │
│ 🟢 Quality Score: 94% (Target: >90%)   │
│                                         │
│ TEAM PERFORMANCE                        │
│ 🟢 Revenue/Employee: $125K             │
│ 🟢 Goal Achievement: 87%               │
│ 🟡 Training Completion: 68%            │
└─────────────────────────────────────────┘
\`\`\`

#### Financial Dashboard (CFO/Finance Team)
**Purpose:** Financial control and analysis
**Update Frequency:** Daily for cash, Weekly for other metrics
**Key Focus Areas:** Cash flow, profitability analysis, budget variance

\`\`\`
Financial Dashboard:
┌─────────────────────────────────────────┐
│ FINANCIAL DASHBOARD - March 2024        │
├─────────────────────────────────────────┤
│ CASH MANAGEMENT                         │
│ 💰 Current Cash: $285,447              │
│ 📈 13-week Forecast: $245K-$380K       │
│ ⚡ Burn Rate: $46K/month               │
│                                         │
│ PROFITABILITY ANALYSIS                  │
│ 📊 P&L Variance: +$8K vs budget        │
│ 💼 Customer Margins: 78% avg           │
│ 📉 Cost per Customer: $185             │
│                                         │
│ FINANCIAL RATIOS                        │
│ 🔢 Current Ratio: 1.67                 │
│ 📋 DSO: 31 days                        │
│ 💳 Debt/Equity: 37%                    │
└─────────────────────────────────────────┘
\`\`\`

### 2. Visual Design Best Practices

#### Color Coding System
\`\`\`
Universal Color Standards:
🟢 Green: On target or exceeding (>100% of target)
🟡 Yellow: Caution/needs attention (90-100% of target)  
🔴 Red: Critical/immediate action (< 90% of target)
🔵 Blue: Informational (no target comparison)
⚪ Gray: No data available or not applicable

Traffic Light Rules:
- Use sparingly (max 3-5 metrics per view)
- Ensure color accessibility (colorblind friendly)
- Provide numerical context alongside colors
- Update thresholds based on business maturity
\`\`\`

#### Chart Selection Guidelines
\`\`\`
Chart Type Selection:
📈 Line Charts: Trends over time
📊 Bar Charts: Comparisons between categories
🥧 Pie Charts: Parts of a whole (use sparingly)
📉 Area Charts: Volume trends over time
🎯 Gauges: Single metric vs target
📋 Tables: Detailed breakdowns and lists
🗺️ Heat Maps: Performance across dimensions

Example Usage:
Revenue Trend: Line chart (monthly growth)
Channel Performance: Bar chart (revenue by channel)  
Expense Breakdown: Stacked bar chart (categories)
Customer Satisfaction: Gauge (score vs target)
Regional Performance: Heat map (performance by region)
\`\`\`

### 3. Interactivity and Drill-Down

#### Dashboard Hierarchy Design
\`\`\`
Dashboard Navigation Structure:

Level 1: Executive Summary
- High-level KPIs and trends
- Red flag alerts and exceptions
- Click-through to detailed views

Level 2: Category Deep Dives  
- Revenue Analysis Dashboard
- Customer Metrics Dashboard
- Financial Health Dashboard
- Operations Performance Dashboard

Level 3: Detailed Analysis
- Individual customer analysis
- Product line profitability
- Cash flow forecasting tools
- Operational process details

Example Click-Through Flow:
Executive Dashboard: "Revenue: $125K (-5% vs forecast)"
↓ Click Revenue Box ↓
Revenue Dashboard: Shows breakdown by product, channel, geography
↓ Click Product A ↓
Product Analysis: Customer segments, pricing, churn analysis
\`\`\`

## Key Performance Indicators by Business Function

### 1. Sales and Marketing KPIs

#### Customer Acquisition Metrics
\`\`\`
Customer Acquisition Dashboard:
                     Current  Target   Status
Lead Generation      1,250    1,000   🟢 +25%
Conversion Rate      12%      10%     🟢 +20%
Cost per Lead        $45      $50     🟢 -10%
Sales Cycle          32 days  35 days 🟢 -9%
Close Rate           25%      20%     🟢 +25%

Customer Acquisition Cost by Channel:
Organic/SEO:         $125
Content Marketing:   $185
Paid Search:         $245
Social Media:        $315
Cold Outreach:       $425
Trade Shows:         $650

Channel ROI Analysis:
Organic: 24.5x LTV/CAC (Best performer)
Content: 16.2x LTV/CAC (Strong)
Paid Search: 12.1x LTV/CAC (Good)
Social: 9.4x LTV/CAC (Acceptable)
Outreach: 7.0x LTV/CAC (Monitor)
Trade Shows: 4.6x LTV/CAC (Reevaluate)
\`\`\`

#### Revenue Performance Tracking
\`\`\`
Revenue KPIs Dashboard:
                     Month    Quarter   YTD     YoY
Total Revenue        $125K    $347K     $347K   +67%
Recurring Revenue    $85K     $235K     $235K   +85%
New Customer Rev     $28K     $75K      $75K    +125%
Expansion Revenue    $12K     $37K      $37K    +45%

Revenue Quality Metrics:
Predictable Revenue: 68% (recurring)
Customer Concentration: 8% (largest customer)
Revenue Retention: 102% (net expansion)
Average Deal Size: $2,850 (+15% YoY)
Sales Velocity: $1,250 per day
\`\`\`

### 2. Customer Success and Retention

#### Customer Health Scoring
\`\`\`
Customer Health Dashboard:
                     Count    %       Trend
Healthy Customers    145     78%     ↗ +3%
At-Risk Customers    28      15%     ↘ -2%
Critical Customers   13      7%      → Stable

Health Score Components:
Product Usage: 40% weight
Support Tickets: 20% weight  
Payment History: 20% weight
Engagement Score: 10% weight
Contract Renewal: 10% weight

Customer Lifecycle Metrics:
Onboarding Completion: 87% (Target: 90%)
Time to First Value: 8.5 days (Target: 7 days)
Feature Adoption Rate: 65% (Target: 70%)
Support Satisfaction: 4.7/5 (Target: 4.5)
\`\`\`

#### Churn Analysis
\`\`\`
Churn Analytics Dashboard:
                     Current  Target   Trend
Monthly Churn Rate   2.8%     2.0%    🟡 Improving
Revenue Churn        3.2%     2.5%    🟡 Stable
Voluntary Churn      2.1%     1.5%    🟡 Monitor
Involuntary Churn    0.7%     0.5%    🟡 Payment issues

Churn Reasons (Last 30 days):
Price/Budget: 35% (9 customers)
Product Fit: 25% (6 customers)
Competitor: 20% (5 customers)
No Usage: 15% (4 customers)
Support Issues: 5% (1 customer)

Churn Prevention Actions:
- Price optimization program for budget-sensitive
- Enhanced onboarding for product fit issues
- Competitive analysis and feature gaps
- Usage monitoring and engagement campaigns
\`\`\`

### 3. Financial Performance KPIs

#### Profitability Analysis
\`\`\`
Profitability Dashboard:
                     Current  Target   Variance
Gross Margin         75%      70%      🟢 +5pp
Contribution Margin  68%      65%      🟢 +3pp  
EBITDA Margin        10%      15%      🟡 -5pp
Net Margin           4.5%     8%       🟡 -3.5pp

Margin Analysis by Segment:
Enterprise Customers: 82% gross margin
Mid-Market: 75% gross margin  
SMB Customers: 68% gross margin
Professional Services: 45% gross margin

Cost Structure Analysis:
COGS: 25% of revenue (Target: 25%)
Sales & Marketing: 45% of revenue (Target: 40%)
R&D: 20% of revenue (Target: 20%)
G&A: 15% of revenue (Target: 12%)
\`\`\`

#### Cash Flow Management
\`\`\`
Cash Flow KPIs:
                     Current   13-wk Fcst  Status
Operating Cash Flow  $22K/mo   $18-28K     🟢 Stable
Free Cash Flow       $15K/mo   $12-20K     🟢 Positive
Cash Runway          6.2 mos   5.8-7.1     🟡 Monitor
Collection Period    31 days   28-35 days  🟢 Good

Working Capital Metrics:
Days Sales Outstanding: 31 days (Industry: 45)
Days Payable Outstanding: 28 days (Opportunity: 35)
Cash Conversion Cycle: 18 days (Excellent)
Working Capital/Revenue: 8% (Efficient)

Liquidity Ratios:
Current Ratio: 1.67 (Target: >1.5) 🟢
Quick Ratio: 1.52 (Target: >1.0) 🟢  
Cash Ratio: 0.81 (Target: >0.2) 🟢
\`\`\`

### 4. Operations and Efficiency

#### Productivity Metrics
\`\`\`
Team Productivity Dashboard:
                     Current  Target   Trend
Revenue per Employee $125K    $150K   🟡 +8% YoY
Billable Utilization 73%      75%     🟡 -2%
Project Delivery     94%      95%     🟡 -1%
Quality Score        96%      95%     🟢 +1%

Department Efficiency:
Sales: $485K revenue per rep (Industry: $400K)
Engineering: 15 features/quarter (Target: 12)
Customer Success: 85 customers per CSM (Target: 75)
Marketing: 1,250 leads/month (Target: 1,000)

Operational KPIs:
Order Processing Time: 1.3 days (Target: 1.5)
Customer Onboarding: 8.5 days (Target: 7.0)
Support Response: 2.1 hours (Target: 2.0)
Bug Fix Time: 3.2 days (Target: 3.0)
\`\`\`

## Advanced Dashboard Features

### 1. Predictive Analytics Integration

#### Revenue Forecasting Dashboard
\`\`\`
Predictive Revenue Model:
                     Probability  Amount    Expected Value
Committed Pipeline   95%          $125K     $119K
Best Case Pipeline   75%          $200K     $150K
Likely Pipeline      50%          $300K     $150K
Possible Pipeline    25%          $400K     $100K

Total Expected Value: $519K (next quarter)

Confidence Intervals:
Conservative (80% confidence): $425K-$475K
Most Likely (50% confidence): $475K-$575K
Optimistic (20% confidence): $575K-$625K

Model Accuracy (Last 4 Quarters):
Q1: Actual $347K vs Forecast $335K (+3.6%)
Q2: Actual $298K vs Forecast $315K (-5.4%)
Q3: Actual $425K vs Forecast $410K (+3.7%)
Q4: Actual $387K vs Forecast $395K (-2.0%)
Average Accuracy: 96.2%
\`\`\`

### 2. Automated Alerting Systems

#### Alert Configuration
\`\`\`
Alert System Setup:
Critical Alerts (Immediate notification):
- Cash below 30-day minimum: $100K threshold
- Customer churn >5% monthly: Auto-trigger
- Revenue drop >15% WoW: Immediate alert
- System downtime >30 minutes: All hands

Warning Alerts (Daily digest):
- DSO increases >5 days: Weekly review
- Gross margin drops >2%: Investigation
- CAC increases >20%: Channel analysis
- Employee utilization <70%: Manager review

Informational Alerts (Weekly summary):
- New customer milestones: Celebrate wins
- Goal achievement updates: Team motivation
- Competitive intelligence: Market insights
- Performance benchmarks: Industry comparison

Alert Recipients:
CEO: All critical + selected warnings
CFO: All financial + cash flow alerts  
COO: Operations + efficiency alerts
VP Sales: Customer + revenue alerts
\`\`\`

### 3. Mobile Dashboard Optimization

#### Mobile KPI Views
\`\`\`
Mobile Dashboard Design:
┌─────────────────────┐
│ 📱 MOBILE EXEC VIEW │
├─────────────────────┤
│ 💰 Cash: $285K     │
│ 📈 Revenue: $125K  │
│ 👥 Customers: 186  │
│ 📊 Churn: 2.8%     │
│                     │
│ 🚨 ALERTS (2)       │
│ • DSO: 35 days     │
│ • Margin: 72%      │
│                     │
│ 📋 QUICK ACTIONS    │
│ □ Approve Expense  │
│ □ Review Contract  │
│ □ Check Pipeline   │
└─────────────────────┘

Mobile-First Features:
- One-thumb navigation
- Large touch targets
- Simplified data views  
- Offline data caching
- Push notifications
- Voice-to-text notes
\`\`\`

## Performance Management Systems

### 1. Goal Setting and Tracking

#### OKR (Objectives and Key Results) Integration
\`\`\`
Q2 2024 Company OKRs Dashboard:

OBJECTIVE 1: Accelerate Revenue Growth
Key Results:
□ Increase MRR to $100K (Current: $85K) - 85% ✅
□ Achieve 25% QoQ growth (Current: 22%) - 88% 🟡
□ Launch enterprise product tier - 90% 🟡

OBJECTIVE 2: Improve Customer Success
Key Results:  
□ Reduce churn to <2% (Current: 2.8%) - 60% 🟡
□ Increase NPS to >50 (Current: 45) - 75% 🟡
□ Achieve 95% onboarding completion - 96% ✅

OBJECTIVE 3: Achieve Operational Excellence
Key Results:
□ Reach 80% gross margin (Current: 75%) - 75% 🟡
□ Maintain >6mo cash runway - 103% ✅
□ Deploy automated billing system - 85% 🟡

Overall OKR Progress: 81% (On Track)
\`\`\`

### 2. Benchmarking and Competitive Analysis

#### Industry Benchmark Dashboard
\`\`\`
Competitive Position Analysis:
                    Our Co   Industry  Top 25%   Rank
Revenue Growth      67%      35%       55%      Top 10%
Gross Margin        75%      68%       78%      60th %ile
Customer Churn      2.8%     4.5%      2.2%     70th %ile
CLV/CAC Ratio       18.7x    8.2x      15.1x    Top 15%
Revenue/Employee    $125K    $135K     $185K    40th %ile
Time to Value       8.5d     12.3d     6.8d     65th %ile

Peer Comparison (Similar Stage Companies):
                    Company A Company B Company C  Us
ARR Growth          45%       52%       38%      67%
Burn Multiple       1.8x      2.2x      1.5x     2.1x
Gross Margin        78%       71%       82%      75%
Magic Number        1.2       0.8       1.4      1.1

Competitive Insights:
- Leading in growth but higher burn
- Gross margin improvement needed
- Strong unit economics vs peers
- Opportunity in revenue per employee
\`\`\`

## Dashboard Implementation Best Practices

### 1. Technology Stack Selection

#### Dashboard Platform Comparison
\`\`\`
Platform Assessment:
                    Tableau  PowerBI   Looker   ChartIO
Ease of Use         ⭐⭐      ⭐⭐⭐⭐   ⭐⭐⭐    ⭐⭐⭐⭐
Data Integration    ⭐⭐⭐⭐⭐   ⭐⭐⭐⭐    ⭐⭐⭐⭐⭐  ⭐⭐⭐
Cost (SMB)         ⭐⭐       ⭐⭐⭐⭐    ⭐⭐      ⭐⭐⭐⭐  
Mobile Support     ⭐⭐⭐      ⭐⭐⭐⭐    ⭐⭐⭐⭐   ⭐⭐⭐
Real-time Updates  ⭐⭐⭐      ⭐⭐⭐     ⭐⭐⭐⭐⭐  ⭐⭐⭐⭐

Recommendation for Early Stage:
ChartIO or PowerBI for cost-effectiveness
Looker for data-intensive businesses
Tableau for advanced analytics needs

DIY Options:
- Google Data Studio (free, limited)  
- Grafana (open source, technical)
- Custom React/D3.js dashboards
\`\`\`

### 2. Data Quality and Governance

#### Data Pipeline Management
\`\`\`
Data Quality Checklist:
□ Single source of truth for each metric
□ Automated data validation rules  
□ Regular data quality audits
□ Clear metric definitions documented
□ Version control for dashboard changes
□ User access controls and permissions
□ Data backup and recovery procedures
□ Performance monitoring and optimization

Common Data Issues:
- Duplicate records: Customer/transaction data
- Missing values: Incomplete form submissions  
- Inconsistent formats: Date/currency standards
- Calculation errors: Formula mistakes
- Timing mismatches: Different update frequencies
- Integration failures: API connection issues

Quality Assurance Process:
1. Daily automated data validation
2. Weekly spot checks of key metrics
3. Monthly reconciliation with source systems
4. Quarterly comprehensive audit
5. Annual metric definition review
\`\`\`

### 3. User Adoption and Training

#### Dashboard Rollout Plan
\`\`\`
Implementation Timeline:
Week 1-2: Technical setup and data integration
Week 3-4: Dashboard design and testing
Week 5: Executive team training and feedback
Week 6: Department manager training
Week 7: Full team rollout and support
Week 8-12: Optimization based on usage patterns

Training Program:
Executive Level (2 hours):
- Strategic KPI interpretation
- Decision-making frameworks
- Alert management
- Mobile access setup

Manager Level (4 hours):
- Department-specific dashboards
- Performance management integration
- Report customization
- Team goal tracking

Individual Contributor (1 hour):
- Personal performance metrics
- Goal progress tracking
- Basic navigation
- Support resources

Success Metrics:
- 90% daily active users (managers+)
- <5 support tickets per week
- 85% user satisfaction score
- Measurable improvement in decision speed
\`\`\`

## Key Takeaways

- Design dashboards for specific audiences with relevant KPIs
- Use visual hierarchy and color coding to guide attention
- Implement drill-down capabilities for detailed analysis
- Integrate predictive analytics for forward-looking insights
- Set up automated alerts for critical metrics
- Benchmark performance against industry standards
- Ensure data quality and governance processes
- Focus on user adoption and ongoing training
- Regularly review and optimize dashboard effectiveness
- Balance simplicity with comprehensive coverage

Effective KPI dashboards transform raw data into strategic advantage, enabling faster decisions, better performance management, and sustainable competitive positioning.`,
        orderIndex: 2,
        lessonType: 'reading',
        durationMinutes: 120
      }
    ];

    for (const lessonData of week4lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          weekId: week4.id
        }
      });
    }

    // Week 4 Quiz
    await prisma.quiz.create({
      data: {
        weekId: week4.id,
        title: 'KPIs and Performance Management Mastery Quiz',
        description: 'Test your understanding of key performance indicators and dashboard design principles',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 25,
        questions: {
          create: [
            {
              questionText: 'What is the primary difference between Return on Assets (ROA) and Return on Equity (ROE)?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'ROA measures profitability while ROE measures liquidity',
                'ROA shows efficiency of all assets while ROE shows returns to equity investors only',
                'ROA is for manufacturing companies while ROE is for service companies',
                'There is no difference - they measure the same thing'
              ]),
              correctAnswer: 'ROA shows efficiency of all assets while ROE shows returns to equity investors only',
              explanation: 'ROA measures how efficiently a company uses all its assets to generate profit, while ROE specifically measures the return generated on shareholders\' equity investment.',
              orderIndex: 1
            },
            {
              questionText: 'For a SaaS business, what does a Net Revenue Retention (NRR) of 110% indicate?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'The business is losing 10% of customers annually',
                'Existing customers are expanding their spending by 10% annually',
                'The business has 10% more customers than last year',
                'Customer acquisition costs are 10% higher than revenue'
              ]),
              correctAnswer: 'Existing customers are expanding their spending by 10% annually',
              explanation: 'NRR above 100% means existing customers are expanding their spending through upgrades, additional features, or increased usage, even after accounting for churn and downgrades.',
              orderIndex: 2
            },
            {
              questionText: 'In dashboard design, what is the best practice for using color coding?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Use as many colors as possible to make it visually appealing',
                'Use red/yellow/green for status with numerical context and accessibility considerations',
                'Only use black and white for professional appearance',
                'Match colors to company branding regardless of meaning'
              ]),
              correctAnswer: 'Use red/yellow/green for status with numerical context and accessibility considerations',
              explanation: 'Effective dashboard design uses intuitive color coding (red/yellow/green) sparingly, provides numerical context alongside colors, and considers colorblind accessibility.',
              orderIndex: 3
            },
            {
              questionText: 'What does a Customer Lifetime Value (CLV) to Customer Acquisition Cost (CAC) ratio of 3:1 indicate?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Excellent unit economics with high profitability',
                'Minimum acceptable ratio for sustainable business',
                'Poor unit economics requiring immediate attention', 
                'The business should increase marketing spend significantly'
              ]),
              correctAnswer: 'Minimum acceptable ratio for sustainable business',
              explanation: 'A 3:1 CLV/CAC ratio is the minimum threshold for sustainable unit economics. Ratios of 5:1 or higher indicate good economics, while below 3:1 suggests unsustainable customer acquisition.',
              orderIndex: 4
            },
            {
              questionText: 'When implementing KPI dashboards, what is the most critical success factor for user adoption?',
              questionType: 'multiple_choice',
              options: JSON.stringify([
                'Using the most advanced analytics software available',
                'Including as many metrics as possible for comprehensive coverage',
                'Designing audience-specific views with relevant KPIs and proper training',
                'Making dashboards as visually complex as possible'
              ]),
              correctAnswer: 'Designing audience-specific views with relevant KPIs and proper training',
              explanation: 'User adoption depends on providing relevant, actionable metrics for each audience level, combined with proper training on interpretation and usage.',
              orderIndex: 5
            }
          ]
        }
      }
    });

    console.log('✅ Week 4 created with 2 lessons and 1 quiz');
    console.log('✅ Course 5: Financial Statement Analysis for Founders completed successfully!');
    console.log('🎯 All 4 weeks with 8 lessons and 4 quizzes created');

  } catch (error) {
    console.error('❌ Error completing Course 5:', error);
  } finally {
    await prisma.$disconnect();
  }
}

completeCourse5();