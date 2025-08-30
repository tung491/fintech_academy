import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addCourse2Week3() {
  console.log('Creating Week 3: Business Registration and Compliance Requirements...')

  try {
    // Get Course 2
    const course = await prisma.course.findFirst({
      where: { slug: 'business-structure-legal' }
    })

    if (!course) {
      throw new Error('Course 2: Business Structure & Legal Foundations not found')
    }

    // Create Week 3: Business Registration and Compliance Requirements
    const week3 = await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: 3,
        title: 'Business Registration and Compliance Requirements',
        overview: 'Navigate the essential business registration processes, licensing requirements, tax obligations, and ongoing compliance responsibilities for developer businesses.',
        learningObjectives: JSON.stringify([
          'Complete business registration processes efficiently',
          'Understand licensing and permit requirements',
          'Master tax registration and obligations',
          'Implement ongoing compliance systems',
          'Manage regulatory requirements for different business types'
        ]),
        estimatedHours: 8
      }
    })

    // Create Week 3 Lessons
    const week3Lessons = [
      {
        title: 'Business Registration Essentials',
        slug: 'business-registration-essentials',
        content: `# Business Registration Essentials

## From Idea to Legal Business Entity

Transforming your developer skills into a legitimate business requires navigating various registration processes, obtaining necessary licenses, and establishing proper compliance systems. This lesson provides a comprehensive roadmap for getting your business legally operational.

[!info]
Proper business registration not only provides legal protection but also establishes credibility with clients, enables business banking, and allows you to take advantage of business tax benefits and deductions.

### The Business Registration Lifecycle

**Phase 1: Pre-Registration Planning**
- Entity type selection (completed in Week 1)
- Name availability and trademark considerations
- Business location and address requirements
- Registered agent selection

**Phase 2: Core Registration**
- State entity formation filing
- Federal EIN registration
- State tax registration
- Local business license applications

**Phase 3: Operational Setup**
- Business banking establishment
- Accounting system implementation
- Insurance procurement
- Professional service setup

**Phase 4: Ongoing Compliance**
- Annual reports and renewals
- Tax filing obligations
- License renewals and updates
- Regulatory compliance monitoring

### Federal Registration Requirements

**1. Employer Identification Number (EIN)**

[!tip]
**EIN Application Process:**
- **Free Application**: Apply directly through IRS website (irs.gov)
- **Required Information**: Business name, address, entity type, responsible party
- **Processing Time**: Immediate online, 4-5 weeks by mail
- **Uses**: Tax filing, business banking, hiring employees, opening accounts

**When EIN is Required:**
- All LLCs (even single-member)
- All corporations
- Partnerships with multiple partners
- Sole proprietorships with employees
- Any business opening business bank account

**EIN Application Step-by-Step:**
1. Go to irs.gov and search "Apply for EIN Online"
2. Select your entity type from the list
3. Provide business information and address
4. Identify the responsible party (typically the owner)
5. Describe your business activities
6. Receive EIN immediately upon completion

[!warning]
**Avoid EIN Scams:**
- Never pay for EIN application (it's free from IRS)
- Only use official IRS website (irs.gov)
- Ignore phone calls or emails claiming to offer EIN services
- Be wary of Google ads for EIN services (many are scams)

**2. Federal Business Registration Database**

Some businesses must register with specific federal agencies:
- **FCC Registration**: If developing telecommunications software
- **FDA Registration**: If creating healthcare or medical device software  
- **FINCEN Registration**: If providing money services or cryptocurrency services
- **Export Administration**: If developing software with encryption or export restrictions

### State Registration Requirements

**1. Business Entity Formation**

**LLC State Filing:**
- Articles of Organization with Secretary of State
- Filing fees: \$50-\$500 (varies by state)
- Processing time: 1-3 weeks standard, 1-3 days expedited
- Required information: Name, address, registered agent, management structure

**Corporation State Filing:**
- Articles of Incorporation with Secretary of State
- Filing fees: \$100-\$800 (varies by state)
- Processing time: 1-3 weeks standard, 1-3 days expedited
- Required information: Name, address, registered agent, share structure

**2. State Tax Registration**

**Income Tax Registration:**
- Most states require income tax registration for entities
- Some states (TX, FL, NV, WY, etc.) have no state income tax
- Registration typically automatic with entity formation

**Sales Tax Registration:**
- Required if selling taxable goods or services in state
- Software development services: Usually not taxable
- Digital products/SaaS: Often taxable (varies by state)
- Registration required before first taxable sale

[!example]
**Sales Tax Nexus Examples:**
- **Physical Nexus**: Office, warehouse, or employees in state
- **Economic Nexus**: Exceed state's revenue/transaction thresholds
- **Common Thresholds**: \$100,000 annual sales or 200+ transactions
- **Developer Services**: Typically not subject to sales tax
- **Software Sales**: Often taxable, varies by state

**Employer Tax Registration:**
- Required when hiring first employee
- Includes unemployment insurance and workers' compensation
- Must register before paying first wages

### Local Registration Requirements

**1. Business License Requirements**

**General Business License:**
- Required in most cities and counties
- Annual fee: \$50-\$500 (varies by location)
- Application: Basic business information and activities
- Processing: Usually 1-2 weeks

**Home-Based Business Requirements:**
- Many cities require permits for home businesses
- Zoning compliance verification
- Neighbor notification in some areas
- Additional restrictions on signage, traffic, employees

**Professional License Requirements:**
- Some states require licenses for software development
- Engineering licenses for safety-critical software
- Contractor licenses for web development services
- Check with state professional licensing board

[!tip]
**License Research Strategy:**
1. Check city/county government websites
2. Call local business licensing office
3. Consult with local business attorney
4. Join local entrepreneur/developer groups for advice

**2. Zoning and Land Use Compliance**

**Home Office Considerations:**
- Residential zoning typically allows home offices
- Restrictions on client meetings, signage, employees
- Parking and traffic considerations
- HOA restrictions may apply

**Commercial Space Requirements:**
- Commercial zoning required for offices with employees
- Special permits for certain business types
- ADA compliance requirements
- Building code and safety requirements

### Industry-Specific Registration Requirements

**Software as a Service (SaaS) Businesses:**

**General Requirements:**
- Business entity registration (LLC or Corporation)
- Sales tax registration in states where economically significant
- Terms of service and privacy policy compliance
- Data protection regulation compliance (GDPR, CCPA)

**Additional Considerations:**
- PCI DSS compliance if processing payments
- SOC 2 compliance for enterprise clients
- Industry-specific regulations (HIPAA for healthcare, FERPA for education)

**E-commerce Development Services:**

**Requirements:**
- Business license in operating jurisdiction
- Sales tax compliance for client's business
- Consumer protection law compliance
- Accessibility compliance (ADA, WCAG)

**Web Development and Design Services:**

**Requirements:**
- Professional liability insurance
- Copyright and trademark compliance
- Client data protection measures
- Contract templates for client relationships

**Mobile App Development:**

**Requirements:**
- App store compliance (Apple App Store, Google Play)
- Privacy policy and terms of service requirements
- Age-appropriate design codes (COPPA compliance)
- International data transfer compliance

### Multi-State Business Registration

**When Multi-State Registration is Required:**

**Physical Presence:**
- Offices, warehouses, or employees in multiple states
- Must register as "foreign entity" in each state
- Pay annual fees and file annual reports in each state

**Economic Presence (Nexus):**
- Significant sales or transactions in state
- Triggers tax registration requirements
- May trigger business registration requirements

**Foreign Qualification Process:**
1. Certificate of Good Standing from home state
2. Foreign entity application in new state  
3. Registered agent appointment in new state
4. Annual report and fee obligations in new state

[!warning]
**Penalties for Non-Registration:**
- Inability to enforce contracts in state courts
- Daily penalties for operating without registration
- Personal liability exposure for business owners
- Back taxes and penalties assessment

### Registration Cost Planning

**Typical First-Year Registration Costs:**

**Single-State LLC (Home State):**
- State filing fee: \$100-\$300
- EIN application: Free
- Registered agent: \$100-\$300/year
- Business license: \$50-\$200
- **Total: \$250-\$800**

**Multi-State LLC (3 states):**
- Home state filing: \$100-\$300
- Foreign registration (2 states): \$200-\$600
- Registered agents (3 states): \$300-\$900/year
- Business licenses: \$150-\$600
- **Total: \$750-\$2,400**

**Corporation Registration:**
- Add \$500-\$1,500 for legal assistance
- Higher annual fees in most states
- More complex ongoing compliance
- **Total: \$1,500-\$5,000**

### Registration Timeline and Planning

**Pre-Launch Registration Timeline (8-10 weeks):**

**Weeks 1-2: Planning Phase**
- Finalize entity type and name
- Research state and local requirements
- Engage attorney and accountant if needed

**Weeks 3-4: State Registration**
- File entity formation documents
- Apply for EIN
- Set up registered agent service

**Weeks 5-6: Local Registration**
- Apply for business licenses
- Research zoning and permit requirements
- Set up business location compliance

**Weeks 7-8: Operational Setup**
- Open business bank accounts
- Set up business insurance
- Implement accounting system

**Weeks 9-10: Final Compliance**
- Complete any remaining registrations
- Set up compliance calendar
- Begin business operations

### Common Registration Mistakes

**1. Name Availability Issues**
- **Problem**: Chosen name not available or conflicts with trademark
- **Solution**: Check availability before forming attachment, have backup names
- **Prevention**: Comprehensive name search including trademarks and domains

**2. Registered Agent Problems**
- **Problem**: Using personal address or unreliable service
- **Solution**: Professional registered agent service
- **Prevention**: Research service reliability and coverage

**3. Incomplete Tax Registration**
- **Problem**: Missing required state or local tax registrations
- **Solution**: Comprehensive tax requirement analysis
- **Prevention**: Work with qualified CPA familiar with your state

**4. License Oversight**
- **Problem**: Operating without required licenses
- **Solution**: Regular compliance review and professional guidance
- **Prevention**: Join professional associations for regulatory updates

### Digital Tools and Resources

**Government Resources:**
- **SBA.gov**: Small Business Administration guidance and tools
- **Secretary of State Websites**: Entity formation and annual report filing
- **IRS.gov**: Federal tax registration and requirements
- **Business.USA.gov**: Federal business registration portal

**Third-Party Tools:**
- **LegalZoom, Incfile**: Entity formation services (\$50-\$300 + state fees)
- **Registered Agent Services**: Northwest, Incfile (\$100-\$300/year)
- **Business License Services**: LicenseLogix, Bizfilings (\$200-\$800)
- **Compliance Services**: Harbor Compliance, Cogency Global

### Compliance Calendar Setup

**Annual Requirements Tracking:**
- Entity annual reports (due dates vary by state)
- Business license renewals
- Professional license renewals
- Tax return filing deadlines
- Insurance policy renewals

[!tip]
**Compliance Calendar Template:**
- January: Review previous year compliance, plan current year
- March: Prepare for tax season deadlines
- May: Review business licenses and permits
- July: Mid-year compliance check and updates
- September: Prepare for year-end requirements
- November: Annual report preparation and filing

### Action Items for This Lesson

1. **Requirements Research**: Identify all registration requirements for your business type and location
2. **Cost Analysis**: Calculate total first-year registration and compliance costs
3. **Timeline Creation**: Develop detailed registration timeline with deadlines
4. **Professional Team**: Identify attorney, accountant, and other professionals needed
5. **Documentation System**: Set up system for tracking compliance requirements and deadlines

### Key Takeaways

[!warning]
**Critical Registration Success Factors:**
- Research requirements thoroughly before starting registration process
- Allow adequate time for processing and potential delays
- Keep detailed records of all registrations and compliance activities
- Set up systems for ongoing compliance monitoring
- Seek professional guidance for complex situations

### Next Lesson Preview

Next, we'll explore licensing and permits in detail - understanding when they're required, how to obtain them, and how to maintain compliance with various professional and business licensing requirements.

[!tip]
Proper business registration is the foundation of a legitimate, credible business. While the process can seem complex, breaking it down into manageable steps and using available resources makes it achievable for any developer entrepreneur.`,
        orderIndex: 1,
        lessonType: 'lecture',
        durationMinutes: 65
      },
      {
        title: 'Licensing and Permits for Developer Businesses',
        slug: 'licensing-permits-developer-businesses',
        content: `# Licensing and Permits for Developer Businesses

## Navigating the Licensing Landscape

Understanding licensing and permit requirements is crucial for operating legally and avoiding costly penalties. Different types of developer businesses have varying requirements, from simple business licenses to specialized professional certifications.

[!info]
Licensing requirements protect consumers and ensure professional standards. While they may seem burdensome, proper licensing establishes credibility, provides legal protection, and often enables access to better clients and higher rates.

### Types of Licenses and Permits

**1. Business Operation Licenses**
- General business license (city/county level)
- Professional business license (state level)
- Specialty permits for specific activities
- Home occupation permits

**2. Professional Licenses**
- Software engineering licenses (limited states)
- Professional engineer (PE) licenses for safety-critical systems
- Contractor licenses for web development services
- Consultant registration requirements

**3. Industry-Specific Permits**
- Sales tax permits
- Import/export licenses
- Telecommunications permits
- Financial services licenses

**4. Location-Based Permits**
- Zoning compliance certificates
- Building permits for office improvements
- Fire department permits
- Health department permits

### General Business License Requirements

**Municipal Business Licenses:**

Most cities and counties require a general business license for any business operating within their jurisdiction.

**Typical Requirements:**
- Business name and address
- Type of business activities
- Number of employees
- Estimated annual revenue
- Proof of entity formation

**Application Process:**
1. Complete business license application
2. Pay required fees (\$50-\$500 annually)
3. Provide supporting documentation
4. Schedule inspection if required
5. Display license at business location

[!example]
**Common Business License Classifications for Developers:**
- **Software Development Services**: Custom programming, web development
- **Computer Consulting**: Technical advisory and implementation services  
- **Information Technology Services**: Network setup, system administration
- **Digital Marketing Services**: SEO, social media, online advertising
- **E-commerce Development**: Online store development and management

**Home-Based Business Permits:**

If operating from home, additional permits may be required:

**Home Occupation Permit Requirements:**
- Residential zoning compliance
- Limited commercial activity restrictions
- Parking and signage limitations
- No manufacturing or retail sales
- Minimal customer traffic

**Application Process:**
1. Check local zoning ordinances
2. Apply for home occupation permit
3. Pay fees (\$25-\$200 annually)
4. Schedule zoning compliance inspection
5. Maintain compliance with permit conditions

### Professional Licensing for Software Development

**Software Engineering Licenses:**

Currently, only a few states have software engineering licensing requirements:

**Texas Professional Software Engineer License:**
- Required for software affecting public safety
- Requires engineering degree and experience
- Continuing education requirements
- Applies to critical infrastructure, medical devices, transportation systems

**Professional Engineer (PE) License:**
- Required for safety-critical software systems
- Extensive education and experience requirements
- Professional responsibility and liability
- Continuing education obligations

[!warning]
**PE License Considerations:**
PE licensing for software is controversial and not widely adopted. Most commercial software development doesn't require PE licensing, but safety-critical applications (medical devices, aerospace, automotive) may require PE oversight.

**Contractor Licenses:**

Some states classify web development and digital services as contractor work:

**Home Improvement Contractor Licenses:**
- May be required for website development services
- Typically applies when project value exceeds threshold (\$500-\$5,000)
- Bonding and insurance requirements
- Consumer protection obligations

**Technology Contractor Licenses:**
- Specialized licenses for IT services
- May cover network installation, system configuration
- Usually not required for pure software development
- Background check and experience requirements

### Industry-Specific Licensing Requirements

**Financial Technology (FinTech) Development:**

**Money Transmitter Licenses:**
- Required for payment processing applications
- State-by-state licensing required
- Significant bonding and capital requirements
- Extensive compliance and reporting obligations

**Investment Adviser Registration:**
- Required for financial planning software
- SEC or state registration depending on assets
- Fiduciary responsibility requirements
- Compliance and audit obligations

**Banking Software Development:**
- Enhanced due diligence requirements
- Security and compliance certifications
- Regular auditing and testing requirements
- Disaster recovery and business continuity plans

**Healthcare Technology Development:**

**HIPAA Business Associate Requirements:**
- Not a license but mandatory compliance
- Business Associate Agreement (BAA) required
- Privacy and security training requirements
- Incident response and breach notification procedures

**FDA Software as Medical Device (SaMD):**
- FDA approval required for medical software
- Quality management system requirements
- Clinical trial and validation requirements
- Post-market surveillance obligations

**Telecommunications Software Development:**

**FCC Registration:**
- Required for telecommunications software
- Equipment authorization for devices
- Accessibility compliance (Section 508)
- Emergency alert system compliance

### Sales Tax Permits and Compliance

**When Sales Tax Registration is Required:**

**Nexus Triggers:**
- Physical presence (office, employees, inventory)
- Economic presence (sales thresholds)
- Click-through nexus (affiliate relationships)
- Marketplace facilitator relationships

**Service vs. Product Taxation:**
- **Services**: Generally not taxable (consulting, custom development)
- **Digital Products**: Often taxable (SaaS, downloadable software, apps)
- **Mixed Transactions**: Complex rules apply

[!example]
**Sales Tax Examples for Developers:**
- ✅ **Not Taxable**: Custom web development, consulting, maintenance
- ❌ **Taxable**: SaaS subscriptions, mobile apps, stock templates
- ⚠️ **Varies**: Training, support services, hosting services

**Multi-State Sales Tax Compliance:**

**Streamlined Sales Tax (SST) Program:**
- Simplified registration and filing
- Uniform tax rates and rules
- Certified service provider options
- 24 member states participating

**Economic Nexus Thresholds by State:**
- Most states: \$100,000 or 200 transactions
- Some variation: \$250,000 or 25 transactions
- California: \$500,000 threshold
- Monitor changes as laws evolve

### International Business Licensing

**Export Control Compliance:**

**Export Administration Regulations (EAR):**
- Applies to software with encryption
- Classification and licensing requirements
- End-user and end-use restrictions
- Record-keeping and reporting requirements

**ITAR (International Traffic in Arms Regulations):**
- Applies to defense-related software
- Registration and licensing requirements
- Severe penalties for violations
- Legal counsel strongly recommended

**Import Requirements:**
- Temporary importation for trade shows
- Customs documentation requirements
- Value declaration and duty obligations
- Carnets for temporary imports

### Licensing Cost Analysis and Budgeting

**Annual Licensing Cost Examples:**

**Solo Developer (Home-Based):**
- Business license: \$50-\$200
- Home occupation permit: \$25-\$100  
- Professional memberships: \$100-\$500
- **Total: \$175-\$800/year**

**Small Development Agency (3-5 employees):**
- Business license: \$100-\$500
- Professional licenses (multiple): \$300-\$1,500
- Industry certifications: \$500-\$2,000
- Sales tax permits (5 states): \$0-\$500
- **Total: \$900-\$4,500/year**

**Specialized FinTech Developer:**
- Money transmitter licenses (10 states): \$50,000-\$200,000
- Bonding requirements: \$25,000-\$100,000
- Compliance systems: \$10,000-\$50,000
- Legal and consulting: \$25,000-\$100,000
- **Total: \$110,000-\$450,000/year**

### License Application Best Practices

**Pre-Application Research:**
1. Identify all applicable licenses and permits
2. Understand application requirements and timelines
3. Gather necessary documentation and information
4. Budget for fees and professional assistance
5. Plan for processing delays and follow-up

**Application Strategies:**
- Start early - some licenses take months to process
- Use professional services for complex applications
- Maintain detailed records of all applications
- Set up renewal reminders and compliance calendars
- Monitor regulatory changes affecting your licenses

**Documentation Management:**
- Digital copies of all licenses and permits
- Renewal date tracking system
- Compliance requirement checklists
- Professional correspondence files
- Fee payment records and receipts

### Compliance Monitoring and Renewal

**License Renewal Process:**

**Renewal Timeline Management:**
- Set calendar reminders 90 days before expiration
- Review any changes in requirements or regulations
- Update business information and activities
- Pay renewal fees on time to avoid penalties
- Complete any required continuing education

**Regulatory Change Monitoring:**
- Subscribe to regulatory agency updates
- Join professional associations for industry news
- Follow relevant legal blogs and publications
- Attend industry conferences and training
- Consult with professional advisors regularly

**Compliance Auditing:**
- Annual review of all licenses and permits
- Verification of ongoing compliance with conditions
- Documentation of compliance activities
- Professional compliance audit if needed
- Corrective action for any deficiencies

### Common Licensing Pitfalls

**1. Operating Without Required Licenses**
- **Risk**: Penalties, business closure, personal liability
- **Solution**: Comprehensive license requirements research
- **Prevention**: Regular compliance audits and professional guidance

**2. License Expiration Oversights**
- **Risk**: Interruption of business operations, renewal penalties
- **Solution**: Automated renewal reminders and professional management
- **Prevention**: Calendar systems and professional compliance services

**3. Multi-Jurisdiction Complexity**
- **Risk**: Non-compliance in some jurisdictions, uneven requirements
- **Solution**: Professional multi-state licensing services
- **Prevention**: Centralized compliance management system

**4. Changing Regulation Compliance**
- **Risk**: Operating under outdated requirements, new violation risks
- **Solution**: Regular regulatory monitoring and professional updates
- **Prevention**: Professional association membership and legal updates

### Technology and Automation Tools

**License Management Software:**
- **ComplianceHR**: Multi-state licensing management
- **Cogency Global**: Corporate compliance and licensing
- **Harbor Compliance**: Automated renewal and monitoring
- **Incorporate.com**: Business licensing services

**Regulatory Monitoring Services:**
- **Thomson Reuters**: Legal and regulatory updates
- **CCH**: Tax and compliance information services
- **BNA**: Business regulatory news and analysis
- **State Bar Publications**: Professional regulatory updates

### Action Items for This Lesson

1. **License Inventory**: Create comprehensive list of required licenses for your business
2. **Compliance Calendar**: Set up renewal reminders and compliance deadlines
3. **Cost Analysis**: Calculate annual licensing costs and budget appropriately
4. **Professional Network**: Establish relationships with compliance professionals
5. **Monitoring System**: Set up regulatory change monitoring for your industry

### Key Takeaways

[!warning]
**Critical Licensing Success Factors:**
- Identify ALL applicable licenses before starting operations
- Allow adequate time for application processing
- Maintain current licenses and monitor renewal dates
- Stay informed about regulatory changes affecting your business
- Seek professional guidance for complex licensing requirements

### Next Lesson Preview

Next, we'll explore tax obligations and ongoing compliance - understanding your tax responsibilities, filing requirements, record-keeping obligations, and strategies for managing the ongoing legal and regulatory requirements of your developer business.

[!tip]
Licensing compliance is an ongoing responsibility, not a one-time requirement. Building good systems and professional relationships early will save time, money, and potential legal issues as your business grows.`,
        orderIndex: 2,
        lessonType: 'lecture',
        durationMinutes: 60
      },
      {
        title: 'Tax Obligations and Ongoing Compliance',
        slug: 'tax-obligations-ongoing-compliance',
        content: `# Tax Obligations and Ongoing Compliance

## Mastering the Tax and Compliance Landscape

Understanding your tax obligations and implementing robust compliance systems is essential for business success and avoiding costly penalties. This lesson covers federal, state, and local tax requirements, plus ongoing compliance obligations for developer businesses.

[!info]
Tax compliance isn't just about avoiding penalties - it's about optimizing your tax position, maintaining good business records, and building a foundation for business growth and potential sale or investment.

### Federal Tax Obligations

**Business Entity Tax Requirements:**

**Sole Proprietorship Tax Reporting:**
- **Form**: Schedule C (Profit or Loss from Business)
- **Filing**: With personal Form 1040
- **Due Date**: April 15 (with extensions to October 15)
- **Quarterly Estimates**: Form 1040-ES if owing \$1,000+ annually

**Single-Member LLC Tax Reporting:**
- **Default**: Same as sole proprietorship (Schedule C)
- **Election Options**: S-Corp or C-Corp taxation
- **Forms**: Schedule C, or corporate returns if elected
- **Advantages**: Liability protection with pass-through taxation

**Multi-Member LLC Tax Reporting:**
- **Default**: Partnership taxation (Form 1065)
- **K-1 Forms**: Issued to each member
- **Due Date**: March 15 (with extensions to September 15)
- **Members**: Report K-1 income on personal returns

**S-Corporation Tax Reporting:**
- **Form**: 1120S (S Corporation Income Tax Return)
- **K-1 Forms**: Issued to shareholders
- **Due Date**: March 15 (with extensions to September 15)
- **Payroll**: Required for owner-employees
- **Reasonable Salary**: Must pay reasonable wages to working owners

**C-Corporation Tax Reporting:**
- **Form**: 1120 (Corporation Income Tax Return)
- **Due Date**: April 15 for calendar year (with extensions)
- **Tax Rate**: 21% federal corporate tax rate
- **Double Taxation**: Corporate profits + dividend taxes
- **Quarterly Estimates**: Form 1120-W if owing \$500+ annually

### Self-Employment Tax Considerations

**Self-Employment Tax Basics:**
- **Rate**: 15.3% (12.4% Social Security + 2.9% Medicare)
- **Base**: Net earnings from self-employment
- **Threshold**: \$400 annual net earnings triggers liability
- **Deduction**: 50% of SE tax deductible as business expense

**SE Tax by Entity Type:**
- **Sole Proprietorship**: All net profit subject to SE tax
- **Single-Member LLC**: Same as sole proprietorship (unless elected otherwise)
- **Multi-Member LLC**: Generally subject to SE tax on distributive share
- **S-Corporation**: Only wages subject to payroll tax (not distributions)
- **C-Corporation**: Wages subject to payroll tax (corporate pays employer portion)

[!example]
**Self-Employment Tax Calculation:**
Developer with \$80,000 net profit:
- SE Tax Base: \$80,000 × 92.35% = \$73,880
- SE Tax: \$73,880 × 15.3% = \$11,304
- Deductible Amount: \$11,304 × 50% = \$5,652
- **Net SE Tax Cost**: \$5,652

### Quarterly Estimated Tax Payments

**Who Must Make Quarterly Payments:**
- Sole proprietors expecting to owe \$1,000+ annually
- S-Corp shareholders expecting to owe \$1,000+ annually  
- C-Corporations expecting to owe \$500+ annually
- Generally applies to profitable businesses without withholding

**Quarterly Payment Schedule:**
- **Q1**: Due April 15 (January-March income)
- **Q2**: Due June 15 (April-May income) 
- **Q3**: Due September 15 (June-August income)
- **Q4**: Due January 15 (September-December income)

**Safe Harbor Rules:**
- Pay 100% of prior year tax liability (110% if AGI > \$150,000)
- Pay 90% of current year tax liability
- Avoid underpayment penalties by meeting safe harbor

[!tip]
**Quarterly Payment Strategy:**
- Set aside 25-30% of net profit for taxes
- Use accounting software to track quarterly obligations
- Consider automatic quarterly transfers to tax savings account
- Adjust payments based on actual quarterly performance

### State and Local Tax Obligations

**State Income Tax:**
- **No State Income Tax**: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming
- **State Income Tax**: Most other states (rates vary 3-13%)
- **City Income Tax**: Some cities impose additional income tax
- **Filing Requirements**: Vary by state, often mirror federal requirements

**State Sales Tax Registration:**
- **Nexus Requirements**: Physical or economic presence triggers registration
- **Filing Frequency**: Monthly, quarterly, or annually based on volume
- **Due Dates**: Vary by state (typically 20th of following month)
- **Exemptions**: Most development services exempt, digital products often taxable

**Local Business Taxes:**
- **Gross Receipts Tax**: Some cities tax gross revenue
- **Personal Property Tax**: Equipment and business assets
- **Real Property Tax**: Office space and business real estate
- **License Fees**: Annual business license renewals

### Payroll Tax Obligations

**When Payroll Tax Applies:**
- Hiring W-2 employees (full-time or part-time)
- S-Corp owner-employees taking wages
- C-Corp owner-employees taking wages
- Independent contractors: No payroll tax (use 1099s)

**Federal Payroll Taxes:**
- **Federal Income Tax Withholding**: Based on W-4 elections
- **Social Security Tax**: 6.2% each (employer + employee) on wages up to \$160,200 (2023)
- **Medicare Tax**: 1.45% each (employer + employee) on all wages
- **Additional Medicare**: 0.9% on wages over \$200,000 (employee only)
- **Federal Unemployment (FUTA)**: 6% on first \$7,000 wages (employer only)

**State Payroll Taxes:**
- **State Income Tax Withholding**: Varies by state
- **State Unemployment (SUTA)**: Varies by state and experience rating
- **State Disability Insurance**: Some states require (CA, NY, NJ, RI, HI)
- **Workers' Compensation**: Usually required for employees

**Payroll Tax Filing Schedule:**
- **Form 941**: Quarterly federal payroll tax return
- **Form 940**: Annual federal unemployment tax return
- **State Returns**: Quarterly or monthly depending on state
- **Deposits**: Federal deposits required semi-weekly or monthly

### Record-Keeping Requirements

**IRS Record-Keeping Rules:**
- **General Rule**: Keep records 3 years from filing date
- **Extended Rule**: 6 years if income understated by 25%+
- **Indefinite**: Keep records for non-filed returns or fraudulent returns
- **Employment Records**: Keep 4 years after tax due date

**Essential Business Records:**
- **Income Records**: Invoices, receipts, 1099s, bank deposits
- **Expense Records**: Receipts, invoices, canceled checks, credit card statements
- **Asset Records**: Purchase receipts, depreciation schedules, disposition records
- **Employment Records**: Payroll records, tax withholding, benefits documentation

**Digital Record-Keeping:**
- **IRS Acceptance**: Electronic records acceptable if legible and accessible
- **Backup Systems**: Cloud storage with redundancy recommended
- **Organization**: Folder structure by year and category
- **Integration**: Accounting software with receipt capture capabilities

### Business Deduction Strategies

**Home Office Deduction:**
- **Simplified Method**: \$5 per square foot up to 300 sq ft (\$1,500 max)
- **Actual Method**: Percentage of home expenses based on office square footage
- **Requirements**: Regular and exclusive business use
- **Records**: Measurements, home expenses, business use documentation

**Vehicle and Travel Expenses:**
- **Standard Mileage**: 65.5¢ per mile (2023 rate)
- **Actual Expenses**: Gas, maintenance, insurance, depreciation (business percentage)
- **Travel**: Lodging, meals (50%), transportation for business trips
- **Records**: Mileage logs, receipts, business purpose documentation

**Technology and Equipment:**
- **Section 179**: Immediate expensing up to \$1,160,000 (2023)
- **Bonus Depreciation**: 100% first-year depreciation for qualified assets
- **Regular Depreciation**: 3-year for computers, 5-year for office equipment
- **Software**: Generally deductible when purchased or as monthly subscription

**Professional Services:**
- **Legal Fees**: Business-related legal services fully deductible
- **Accounting Fees**: Tax preparation, bookkeeping, financial advice
- **Consulting Fees**: Business coaching, marketing, technical consulting
- **Professional Memberships**: Trade associations, professional organizations

### Ongoing Compliance Management

**Annual Compliance Calendar:**

**January:**
- Q4 estimated taxes due (15th)
- Issue 1099s to contractors (31st)
- W-2s to employees (31st)
- File 1099s with IRS (31st)

**March:**
- S-Corp and partnership returns due (15th)
- State corporate returns often due
- Q1 estimated taxes due

**April:**
- Individual and C-Corp returns due (15th)
- Q1 state sales tax often due
- Payroll tax returns (quarterly)

**June:**
- Q2 estimated taxes due (15th)
- Q1 state sales tax returns in some states

**September:**
- Q3 estimated taxes due (15th)
- Extended S-Corp and partnership returns due (15th)

**October:**
- Extended individual returns due (15th)
- Q3 payroll tax returns due

**December:**
- Year-end tax planning
- Q4 estimated tax planning
- Retirement plan contributions
- Equipment purchases for depreciation

### Common Compliance Mistakes

**1. Inadequate Record-Keeping**
- **Problem**: Missing receipts, poor organization, inadequate documentation
- **Solution**: Digital receipt capture, organized filing system, regular reconciliation
- **Prevention**: Accounting software integration, monthly record review

**2. Missed Quarterly Payments**
- **Problem**: Underpayment penalties, cash flow problems at year-end
- **Solution**: Automated savings transfers, calendar reminders, professional assistance
- **Prevention**: Safe harbor payment strategy, quarterly review with CPA

**3. Entity Election Timing**
- **Problem**: Missing S-Corp election deadline, incorrect entity taxation
- **Solution**: Professional guidance on election timing and requirements
- **Prevention**: Annual entity review with tax professional

**4. Payroll Compliance Errors**
- **Problem**: Incorrect withholding, missed deposits, late filings
- **Solution**: Professional payroll service, automated systems
- **Prevention**: Payroll compliance training, professional service providers

### Professional Services and Tools

**Tax Preparation Software:**
- **TurboTax Business**: Good for simple business returns
- **Drake Tax**: Professional-grade software for complex returns
- **Lacerte**: High-end professional tax software
- **ProSeries**: Mid-level professional tax preparation

**Payroll Services:**
- **ADP**: Comprehensive payroll and HR services
- **Paychex**: Small business payroll specialist
- **Gusto**: Modern payroll with benefits integration
- **QuickBooks Payroll**: Integrated with QuickBooks accounting

**Professional Services:**
- **CPA**: Annual tax preparation, quarterly reviews, planning
- **Enrolled Agent**: Tax-focused professionals, IRS representation
- **Payroll Companies**: Full-service payroll processing and compliance
- **Bookkeeping Services**: Monthly bookkeeping, financial statement preparation

### Tax Planning Strategies

**Income Timing:**
- **Accelerate Deductions**: Purchase equipment, pay expenses in high-income years
- **Defer Income**: Delay invoicing, time payments to optimize tax brackets
- **Retirement Contributions**: SEP-IRA, Solo 401k contributions
- **Health Savings Account**: Triple tax advantage for eligible businesses

**Entity Optimization:**
- **S-Corp Election**: Reduce self-employment tax on profitable businesses
- **Retirement Plans**: Enhanced contribution limits for corporations
- **Income Splitting**: Family member employment for tax optimization
- **Multiple Entities**: Asset protection and tax optimization strategies

### Action Items for This Lesson

1. **Tax Calendar**: Create comprehensive tax compliance calendar with all deadlines
2. **Record System**: Implement digital record-keeping system with regular backups
3. **Professional Team**: Establish relationships with CPA and payroll service provider
4. **Estimated Taxes**: Set up quarterly estimated tax payment system
5. **Deduction Tracking**: Implement system for tracking and documenting business deductions

### Key Takeaways

[!warning]
**Critical Tax Compliance Factors:**
- Maintain meticulous records for all income and expenses
- Make quarterly estimated payments to avoid penalties
- Understand your entity's specific tax obligations and deadlines
- Seek professional guidance for complex tax situations
- Plan tax strategies annually, not just at filing time

### Course Conclusion

Congratulations! You've completed Course 2: Business Structure & Legal Foundations. You now have the knowledge to:
- Select and form the optimal business entity structure
- Navigate contract law and protect intellectual property
- Complete business registration and licensing requirements
- Maintain ongoing tax and regulatory compliance

This foundation prepares you for Course 3: Personal Finance for Tech Professionals, where we'll explore individual financial planning strategies for developer entrepreneurs.

[!tip]
Tax compliance and business registration create the legal framework for your business success. The systems you implement now will serve you throughout your entrepreneurial journey and provide the foundation for scaling your business.`,
        orderIndex: 3,
        lessonType: 'lecture',
        durationMinutes: 75
      }
    ]

    for (const lessonData of week3Lessons) {
      const lesson = await prisma.lesson.create({
        data: {
          weekId: week3.id,
          ...lessonData
        }
      })
      console.log('Created lesson:', lesson.title)
    }

    // Create Week 3 Quiz
    const week3Quiz = await prisma.quiz.create({
      data: {
        weekId: week3.id,
        title: 'Week 3: Business Registration and Compliance Assessment',
        description: 'Test your understanding of business registration, licensing, and ongoing tax compliance requirements',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 35
      }
    })

    // Create Week 3 Quiz Questions
    const week3Questions = [
      {
        questionText: 'Which federal registration is required for all LLCs, even single-member LLCs?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['Business license', 'EIN (Employer Identification Number)', 'Sales tax permit', 'Professional license']),
        correctAnswer: 'EIN (Employer Identification Number)',
        explanation: 'All LLCs must obtain an EIN from the IRS, even single-member LLCs, for tax filing purposes and to open business bank accounts.',
        points: 1,
        orderIndex: 1
      },
      {
        questionText: 'At what annual income level do sole proprietors typically need to make quarterly estimated tax payments?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['$400', '$1,000', '$5,000', '$10,000']),
        correctAnswer: '$1,000',
        explanation: 'Sole proprietors who expect to owe $1,000 or more in taxes annually are generally required to make quarterly estimated tax payments to avoid underpayment penalties.',
        points: 1,
        orderIndex: 2
      },
      {
        questionText: 'What is the current self-employment tax rate for developers operating as sole proprietors?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['12.4%', '15.3%', '21%', '28%']),
        correctAnswer: '15.3%',
        explanation: 'Self-employment tax is 15.3% (12.4% for Social Security + 2.9% for Medicare) on net earnings from self-employment, though 50% of the SE tax is deductible as a business expense.',
        points: 1,
        orderIndex: 3
      },
      {
        questionText: 'True or False: Software development services are typically subject to state sales tax.',
        questionType: 'true-false',
        options: JSON.stringify(['True', 'False']),
        correctAnswer: 'False',
        explanation: 'Software development services (custom programming, consulting) are generally not subject to state sales tax, though digital products and SaaS subscriptions often are taxable. This varies by state.',
        points: 1,
        orderIndex: 4
      },
      {
        questionText: 'How long should businesses generally keep tax records according to IRS requirements?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['1 year', '3 years', '7 years', '10 years']),
        correctAnswer: '3 years',
        explanation: 'The IRS generally requires businesses to keep tax records for 3 years from the filing date, though this extends to 6 years if income is understated by 25% or more, and indefinitely for fraudulent returns or non-filed returns.',
        points: 1,
        orderIndex: 5
      }
    ]

    for (const questionData of week3Questions) {
      await prisma.question.create({
        data: {
          quizId: week3Quiz.id,
          ...questionData
        }
      })
    }

    console.log('✅ Successfully created Week 3: Business Registration and Compliance Requirements')
    console.log('📚 Week 3 Content Summary:')
    console.log('   - 3 comprehensive lessons covering registration, licensing, and tax compliance')
    console.log('   - 1 assessment quiz with 5 questions')
    console.log('   - Total duration: ~200 minutes of content')
    
    console.log('')
    console.log('🎉 COURSE 2 COMPLETION SUMMARY:')
    console.log('📚 Course 2: Business Structure & Legal Foundations - COMPLETE')
    console.log('   - Duration: 3 weeks')
    console.log('   - Total Lessons: 9 comprehensive lessons')
    console.log('   - Total Quizzes: 3 assessment quizzes (15 questions total)')
    console.log('   - Total Content Time: ~560 minutes (9+ hours)')
    console.log('   - Coverage: Entity formation, contracts, IP, registration, compliance')
    console.log('   - Target Audience: Developers starting businesses')

  } catch (error) {
    console.error('Error creating Week 3:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

addCourse2Week3()
  .catch((error) => {
    console.error('Failed to create Week 3:', error)
    process.exit(1)
  })`,
        orderIndex: 3,
        lessonType: 'lecture',
        durationMinutes: 75
      }
    ]

    for (const lessonData of week3Lessons) {
      const lesson = await prisma.lesson.create({
        data: {
          weekId: week3.id,
          ...lessonData
        }
      })
      console.log('Created lesson:', lesson.title)
    }

    // Create Week 3 Quiz
    const week3Quiz = await prisma.quiz.create({
      data: {
        weekId: week3.id,
        title: 'Week 3: Business Registration and Compliance Assessment',
        description: 'Test your understanding of business registration, licensing, and ongoing tax compliance requirements',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 35
      }
    })

    // Create Week 3 Quiz Questions
    const week3Questions = [
      {
        questionText: 'Which federal registration is required for all LLCs, even single-member LLCs?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['Business license', 'EIN (Employer Identification Number)', 'Sales tax permit', 'Professional license']),
        correctAnswer: 'EIN (Employer Identification Number)',
        explanation: 'All LLCs must obtain an EIN from the IRS, even single-member LLCs, for tax filing purposes and to open business bank accounts.',
        points: 1,
        orderIndex: 1
      },
      {
        questionText: 'At what annual income level do sole proprietors typically need to make quarterly estimated tax payments?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['$400', '$1,000', '$5,000', '$10,000']),
        correctAnswer: '$1,000',
        explanation: 'Sole proprietors who expect to owe $1,000 or more in taxes annually are generally required to make quarterly estimated tax payments to avoid underpayment penalties.',
        points: 1,
        orderIndex: 2
      },
      {
        questionText: 'What is the current self-employment tax rate for developers operating as sole proprietors?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['12.4%', '15.3%', '21%', '28%']),
        correctAnswer: '15.3%',
        explanation: 'Self-employment tax is 15.3% (12.4% for Social Security + 2.9% for Medicare) on net earnings from self-employment, though 50% of the SE tax is deductible as a business expense.',
        points: 1,
        orderIndex: 3
      },
      {
        questionText: 'True or False: Software development services are typically subject to state sales tax.',
        questionType: 'true-false',
        options: JSON.stringify(['True', 'False']),
        correctAnswer: 'False',
        explanation: 'Software development services (custom programming, consulting) are generally not subject to state sales tax, though digital products and SaaS subscriptions often are taxable. This varies by state.',
        points: 1,
        orderIndex: 4
      },
      {
        questionText: 'How long should businesses generally keep tax records according to IRS requirements?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['1 year', '3 years', '7 years', '10 years']),
        correctAnswer: '3 years',
        explanation: 'The IRS generally requires businesses to keep tax records for 3 years from the filing date, though this extends to 6 years if income is understated by 25% or more, and indefinitely for fraudulent returns or non-filed returns.',
        points: 1,
        orderIndex: 5
      }
    ]

    for (const questionData of week3Questions) {
      await prisma.question.create({
        data: {
          quizId: week3Quiz.id,
          ...questionData
        }
      })
    }

    console.log('✅ Successfully created Week 3: Business Registration and Compliance Requirements')
    console.log('📚 Week 3 Content Summary:')
    console.log('   - 3 comprehensive lessons covering registration, licensing, and tax compliance')
    console.log('   - 1 assessment quiz with 5 questions')
    console.log('   - Total duration: ~200 minutes of content')
    
    console.log('')
    console.log('🎉 COURSE 2 COMPLETION SUMMARY:')
    console.log('📚 Course 2: Business Structure & Legal Foundations - COMPLETE')
    console.log('   - Duration: 3 weeks')
    console.log('   - Total Lessons: 9 comprehensive lessons')
    console.log('   - Total Quizzes: 3 assessment quizzes (15 questions total)')
    console.log('   - Total Content Time: ~560 minutes (9+ hours)')
    console.log('   - Coverage: Entity formation, contracts, IP, registration, compliance')
    console.log('   - Target Audience: Developers starting businesses')

  } catch (error) {
    console.error('Error creating Week 3:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

addCourse2Week3()
  .catch((error) => {
    console.error('Failed to create Week 3:', error)
    process.exit(1)
  })