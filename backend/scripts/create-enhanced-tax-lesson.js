const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createEnhancedTaxLesson() {
  console.log('🎯 Creating Enhanced Tax Strategies for Developer Entrepreneurs...');

  try {
    // Find Week 5 (Tax and Legal Structure)
    const week5 = await prisma.week.findFirst({
      where: {
        weekNumber: 5,
        course: {
          title: 'Financial and Accounting Knowledge for Developers'
        }
      },
      include: {
        course: true
      }
    });

    if (!week5) {
      console.error('❌ Week 5 not found');
      return;
    }

    console.log(`✅ Found Week 5: ${week5.title}`);

    // Create enhanced tax lesson
    const enhancedTaxLesson = await prisma.lesson.create({
      data: {
        weekId: week5.id,
        title: 'Advanced Tax Strategies for Developer Entrepreneurs',
        slug: 'advanced-tax-strategies-developers',
        content: `# Advanced Tax Strategies for Developer Entrepreneurs

## Strategic Tax Planning for Tech Businesses

As a developer entrepreneur, understanding advanced tax strategies can save you thousands of dollars annually while ensuring full compliance. This lesson covers sophisticated but legal tax optimization techniques specifically relevant to technology businesses.

[!info]
**Legal Disclaimer**: This lesson provides educational content about tax strategies. Always consult with a qualified CPA or tax attorney before implementing any tax strategies. Tax laws vary by jurisdiction and change frequently.

### Business Entity Selection for Maximum Tax Efficiency

**1. LLC vs S-Corp Election: The Developer's Dilemma**

[!example]
**Scenario Analysis**: 
You earn $120,000 annually from your development services.

**As LLC (Default)**:
- Self-Employment Tax: $120,000 × 15.3% = $18,360
- Income Tax: ~$15,000 (depending on deductions)
- **Total Tax**: ~$33,360

**As S-Corp Election**:
- Reasonable Salary: $60,000 (SE tax: $9,180)
- Distributions: $60,000 (no SE tax)
- Income Tax: ~$15,000
- **Total Tax**: ~$24,180
- **Annual Savings**: ~$9,180

[!warning]
**IRS Scrutiny**: The IRS requires "reasonable compensation" for S-Corp owners. For developers, $40-80k salary range is typically defensible depending on location and experience.

**2. Solo 401(k) vs SEP-IRA Comparison**

**Solo 401(k) Advantages**:
- Higher contribution limits: $69,000 (2025) + $7,500 catch-up (50+)
- Loan option: Borrow up to $50,000
- Roth option available
- **Best for**: High earners with no employees

**SEP-IRA Advantages**:
- Simpler administration
- Can contribute up to 25% of compensation
- **Best for**: Businesses with employees (must contribute equally)

### Advanced Deduction Strategies for Developers

[!tip]
**1. Home Office Deduction Optimization**

**Simplified Method**: $5/sq ft up to 300 sq ft (max $1,500)
**Actual Expense Method**: 
- Calculate business use percentage
- Deduct: Mortgage interest, property taxes, utilities, maintenance
- **Example**: 200 sq ft office in 2,000 sq ft home = 10% business use

**Pro Tip**: Keep detailed records of exclusive business use. The IRS requires the space be used "regularly and exclusively" for business.

**2. Equipment and Software Deductions**

**Section 179 vs Bonus Depreciation**:
- **Section 179**: Immediate deduction up to $1,160,000 (2025)
- **Bonus Depreciation**: 80% immediate deduction (2025), phasing down
- **Best Practice**: Use Section 179 for smaller purchases, bonus depreciation for larger assets

**Example Equipment Deductions**:
- MacBook Pro: $3,000 (immediate deduction)
- Multiple monitors: $1,200
- Standing desk setup: $800
- Software subscriptions: $2,400/year
- **Total Annual Deductions**: $7,400+

**3. Professional Development and Education**

**Deductible Education Expenses**:
- Online courses (Udemy, Coursera, Pluralsight): 100% deductible
- Conferences and workshops: 100% deductible
- Certification programs: 100% deductible
- Books and technical publications: 100% deductible

**Travel for Education**:
- Conference travel: Flights, hotels, meals (50% for meals)
- **Pro Tip**: Extend business travel by a day for legitimate business purposes to maximize deductions

### International and Remote Work Tax Implications

[!warning]
**Digital Nomad Tax Complexity**

**1. US Tax Obligations for Citizens/Residents**:
- Must file US tax returns regardless of where you live
- Foreign Earned Income Exclusion: Up to $126,500 (2025) if you meet physical presence test
- **Key Requirement**: Must be outside US for 330 days in 12-month period

**2. State Tax Considerations**:
- Some states (FL, TX, WA) have no income tax
- Others may claim you're still a resident even if living abroad
- **Strategy**: Establish domicile in no-tax state before going nomad

**3. Foreign Tax Credit vs Foreign Earned Income Exclusion**:
- **FEIE**: Excludes foreign income from US tax
- **FTC**: Credits foreign taxes paid against US tax liability
- **Choose Based On**: Compare foreign tax rate to US rate

### Tax-Advantaged Business Structures

[!example]
**1. Captive Insurance Company (For High Earners)**

For developers earning $300k+:
- Form insurance subsidiary to insure business risks
- Deduct premiums paid to captive (up to $2.45M annually)
- Insurance company pays lower corporate tax rates
- **Annual Tax Savings**: $50,000-$200,000+

**Legitimate Risks to Insure**:
- Cyber liability
- Errors & omissions
- Business interruption
- Key person insurance

**2. Conservation Easement (Advanced Strategy)**

- Donate development rights on land
- Claim charitable deduction of 3-10x cost basis
- **Example**: $100k investment → $500k+ deduction
- **Warning**: IRS scrutinizes these heavily; only work with reputable sponsors

### Quarterly Estimated Tax Strategies

[!tip]
**Optimize Cash Flow with Safe Harbor Rules**

**Safe Harbor Options**:
1. **100% of Prior Year**: Pay 100% of last year's tax liability
2. **110% Rule**: If AGI > $150k, pay 110% of prior year
3. **90% of Current Year**: Pay 90% of current year's estimated tax

**Cash Flow Optimization**:
- Front-load Q4 payment if expecting large Q4 income
- Use prior year safe harbor if current year income is higher
- **Strategy**: Maximize working capital while avoiding penalties

### Record Keeping and Audit Protection

**1. Digital Receipt Management**:
- Use apps like Shoeboxed, Receipt Bank, or Expensify
- Take photos immediately of physical receipts
- **Retention Period**: Keep records for 7 years (3 years standard, 7 for safety)

**2. Mileage Tracking for Business Travel**:
- **Standard Mileage Rate**: 67¢ per mile (2025)
- Use apps like MileIQ or TripLog for automatic tracking
- **Pro Tip**: Track all miles, even short trips to office supply stores

**3. Bank Account Separation**:
- **Never** mix personal and business transactions
- Use separate credit cards for business expenses
- **Monthly Practice**: Reconcile all business accounts

### Advanced Tax Planning Techniques

[!example]
**1. Income Timing and Recognition**

**For Cash Basis Taxpayers (Most Small Businesses)**:
- **December Strategy**: Delay invoicing until January for lower current-year tax
- **Expense Acceleration**: Pay January expenses in December for current-year deduction
- **Equipment Purchases**: Buy and place in service before Dec 31

**2. Retirement Plan Contributions**:
- **Solo 401k**: Contributions due by tax filing deadline + extensions
- **SEP-IRA**: Same deadline flexibility
- **Strategy**: Wait until tax prep to optimize contribution amount

**3. Tax Loss Harvesting for Business Investments**:
- Sell losing investments to offset gains
- **Wash Sale Rule**: Can't repurchase same security within 30 days
- **Application**: Business investment portfolio management

### Compliance and Audit Preparedness

**1. Documentation Best Practices**:
- **Business Purpose**: Document the business reason for every expense
- **Contemporaneous Records**: Record details at time of expense, not later
- **5 W's Rule**: Who, What, When, Where, Why for every business expense

**2. Common Audit Triggers to Avoid**:
- Home office deduction without proper documentation
- 100% business use of vehicles
- Excessive travel and entertainment
- Disproportionate deductions to income

**3. Audit Defense Strategies**:
- Maintain organized digital records
- Work with experienced tax professional
- Understand your rights during an audit
- **Never Ignore**: IRS correspondence - respond timely

### Actionable Tax Optimization Checklist

[!example]
**Quarterly Review Checklist**:

**Entity Structure**:
- [ ] Review S-Corp election benefits annually
- [ ] Optimize salary vs distribution ratio
- [ ] Consider entity changes as business grows

**Deduction Maximization**:
- [ ] Track all home office usage
- [ ] Document business use of equipment
- [ ] Maintain education expense records
- [ ] Log business mileage consistently

**Strategic Planning**:
- [ ] Project year-end income and tax liability
- [ ] Plan equipment purchases and timing
- [ ] Optimize retirement contributions
- [ ] Review estimated tax payments

**Compliance**:
- [ ] Reconcile all business accounts monthly
- [ ] Organize receipts and documentation
- [ ] Review state tax obligations
- [ ] Prepare for potential audits

### Future Tax Law Changes to Monitor

**1. Proposed Changes Affecting Developers**:
- R&D expense capitalization (already in effect)
- Changes to Section 199A (QBI deduction)
- International tax law modifications
- State nexus rules for remote work

**2. Planning for Uncertainty**:
- Build flexibility into business structure
- Don't over-optimize for current law
- Maintain relationships with tax professionals
- **Stay Informed**: Subscribe to tax law updates

### Key Performance Indicators for Tax Efficiency

[!tip]
**Measure Your Tax Strategy Success**:

1. **Effective Tax Rate**: Total tax ÷ Total income
2. **Tax per Dollar of Revenue**: Track year-over-year improvement
3. **Audit Risk Score**: Self-assess based on deduction patterns
4. **Compliance Cost**: Time and money spent on tax prep
5. **Cash Flow Impact**: Timing of tax payments vs income

### Advanced Software Tools for Tax Management

**1. Accounting Software Integration**:
- QuickBooks Online with tax categorization
- Xero with receipt capture
- FreshBooks for time tracking and invoicing
- **Goal**: Automate as much classification as possible

**2. Tax Preparation Software**:
- Professional software for complex returns
- Integration with accounting systems
- **Multi-state Capability**: For developers with clients in multiple states

### Conclusion and Action Steps

[!warning]
**Implementation Priority**:
1. **Immediate**: Separate business and personal finances
2. **This Quarter**: Set up proper record-keeping systems
3. **This Year**: Evaluate entity structure optimization
4. **Ongoing**: Maintain compliance and monitor law changes

**Professional Resources**:
- Work with CPA experienced in tech businesses
- Consider tax attorney for complex strategies
- Join developer entrepreneur tax forums
- **Investment**: Good tax advice pays for itself many times over

### Final Thoughts

Tax optimization is not about avoiding taxes—it's about paying the correct amount while maximizing your business's growth potential. The strategies covered here can save developer entrepreneurs significant money when properly implemented with professional guidance.

[!tip]
**Remember**: The best tax strategy is one that aligns with your business goals while maintaining full compliance with tax laws. Start with the basics and gradually implement more sophisticated strategies as your business grows.`,
        orderIndex: 2,
        lessonType: 'lecture',
        durationMinutes: 75
      }
    });

    console.log(`✅ Created enhanced tax lesson: ${enhancedTaxLesson.title}`);

    // Update week description to reflect enhanced content
    await prisma.week.update({
      where: { id: week5.id },
      data: {
        title: 'Advanced Tax and Legal Strategies',
        overview: 'Deep dive into sophisticated tax optimization strategies, business entity selection, and compliance for developer entrepreneurs.',
        learningObjectives: JSON.stringify([
          "Master advanced tax strategies for developer businesses",
          "Optimize business entity structure for tax efficiency",
          "Understand international and remote work tax implications", 
          "Implement professional record-keeping and compliance systems",
          "Plan for future tax law changes and business growth"
        ])
      }
    });

    console.log('✅ Updated Week 5 title and objectives');
    console.log('🎉 Enhanced tax content creation complete!');

  } catch (error) {
    console.error('❌ Error creating enhanced tax lesson:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createEnhancedTaxLesson();