import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addCourse2Week2() {
  console.log('Creating Week 2: Contract Basics and Intellectual Property...')

  try {
    // Get Course 2
    const course = await prisma.course.findFirst({
      where: { slug: 'business-structure-legal' }
    })

    if (!course) {
      throw new Error('Course 2: Business Structure & Legal Foundations not found')
    }

    // Create Week 2: Contract Basics and Intellectual Property
    const week2 = await prisma.week.create({
      data: {
        courseId: course.id,
        weekNumber: 2,
        title: 'Contract Basics and Intellectual Property',
        overview: 'Master essential contract types for developers, intellectual property protection, and legal agreements that protect your business relationships and innovations.',
        learningObjectives: JSON.stringify([
          'Understand fundamental contract law principles',
          'Master service agreements and statements of work',
          'Learn to protect intellectual property rights',
          'Navigate NDAs and confidentiality agreements',
          'Implement liability limitation strategies'
        ]),
        estimatedHours: 8
      }
    })

    // Create Week 2 Lessons
    const week2Lessons = [
      {
        title: 'Contract Law Fundamentals for Developers',
        slug: 'contract-law-fundamentals',
        content: `# Contract Law Fundamentals for Developers

## The Developer's Guide to Contracts

Every business relationship you enter as a developer is governed by contract law, whether written or implied. Understanding contract fundamentals protects your business, ensures you get paid, and helps you avoid legal disputes.

[!info]
Contracts aren't just legal documents - they're business tools that define expectations, allocate risks, and provide remedies when things go wrong. Every successful developer business relies on well-structured contracts.

### What Makes a Contract Legally Binding

**The Four Essential Elements:**

**1. Offer**
- Clear proposal of terms and conditions
- Specific enough to be actionable
- Example: "I will develop your e-commerce website for $5,000, delivered in 6 weeks"

**2. Acceptance**
- Unqualified agreement to all terms
- Can be written, verbal, or through conduct
- Must match the offer exactly (mirror image rule)

**3. Consideration**
- Something of value exchanged by both parties
- Money, services, goods, or promises
- Must be legally sufficient (not necessarily equal)

**4. Legal Capacity & Purpose**
- Parties must be legally able to contract
- Purpose must be legal and not against public policy
- No fraud, duress, or undue influence

[!example]
**Valid Contract Example:**
- **Offer**: "I'll build your mobile app for $10,000"
- **Acceptance**: "Yes, we agree to your proposal"
- **Consideration**: $10,000 (client) + App development services (developer)
- **Legal**: Both parties competent, app development is legal

### Types of Contracts for Developer Businesses

**Written vs Oral Contracts:**
- **Written**: Required for services over certain amounts ($500 in many states)
- **Oral**: Valid but difficult to prove and enforce
- **Electronic**: Email agreements are legally binding contracts

[!warning]
**Statute of Frauds Requirements:**
Certain contracts MUST be written:
- Contracts that cannot be performed within one year
- Contracts for sale of goods over $500
- Real estate transactions
- Contracts to pay someone else's debts

**Express vs Implied Contracts:**
- **Express**: Terms explicitly stated (written or oral)
- **Implied**: Created by conduct and circumstances
- **Implied-in-Fact**: Parties' actions show agreement
- **Implied-in-Law**: Court imposes to prevent unjust enrichment

### Essential Contract Terms for Developers

**1. Scope of Work (Statement of Work)**
- Detailed description of deliverables
- Technical specifications and requirements
- Milestones and deadlines
- Change order procedures

[!example]
**Scope of Work Example:**
"Developer will create a responsive e-commerce website including:
- Product catalog with search functionality
- Shopping cart and checkout system
- Payment processing integration (Stripe)
- Admin dashboard for inventory management
- Mobile-responsive design for all pages
- Delivery: 8 weeks from contract signing"

**2. Payment Terms**
- Total contract price
- Payment schedule and milestones
- Late payment penalties and interest
- Expense reimbursement terms

**3. Timeline and Deadlines**
- Project start date
- Milestone delivery dates
- Final completion deadline
- Consequences of delays (both parties)

**4. Intellectual Property Ownership**
- Who owns the developed code
- Client's rights to use and modify
- Developer's rights to reuse components
- Third-party IP considerations

**5. Confidentiality and Non-Disclosure**
- Definition of confidential information
- Obligations to protect confidentiality
- Duration of confidentiality obligations
- Exceptions (publicly available information)

**6. Liability and Risk Allocation**
- Limitation of damages
- Warranty disclaimers
- Indemnification clauses
- Insurance requirements

### Contract Formation Best Practices

**1. Written Agreements Always**
- Email exchanges can be binding but unclear
- Formal written contracts prevent misunderstandings
- Use plain English, avoid unnecessary legal jargon

**2. Clear and Specific Terms**
- Avoid ambiguous language
- Define technical terms and acronyms
- Include examples when helpful

**3. Change Management Process**
- Require written approval for scope changes
- Document additional fees for changes
- Set limits on minor changes included

[!tip]
**Change Order Template:**
"Any changes to the agreed scope of work must be requested in writing and approved by both parties. Additional work will be billed at $150/hour. Changes affecting timeline will extend delivery dates accordingly."

### Common Contract Pitfalls for Developers

**1. Unclear Scope of Work**
- **Problem**: "Build a website" (too vague)
- **Solution**: Detailed functional requirements document
- **Result**: Prevents scope creep and disputes

**2. Unrealistic Timelines**
- **Problem**: Agreeing to impossible deadlines under pressure
- **Solution**: Build in buffers and clarify dependencies
- **Result**: Protects your reputation and sanity

**3. Payment Terms That Hurt Cash Flow**
- **Problem**: Net 60 or longer payment terms
- **Solution**: Negotiate shorter terms or require deposits
- **Result**: Better cash flow and less collection risk

**4. Unlimited Revisions**
- **Problem**: "Revisions until client is satisfied"
- **Solution**: Specify number of included revision rounds
- **Result**: Prevents endless revision cycles

### Electronic Contracts and Digital Signatures

**Legal Validity of Electronic Contracts:**
- E-SIGN Act (2000) makes electronic signatures legally binding
- Email acceptance creates binding contracts
- Digital signature platforms provide additional security

**Best Practices for Electronic Contracts:**
- Use reputable digital signature platforms (DocuSign, HelloSign)
- Maintain audit trails and timestamped records
- Include digital signature clauses in your terms
- Ensure parties intend to be legally bound

**Electronic Contract Example:**
\`\`\`
"By clicking 'Accept' or signing electronically below, you agree to be legally bound by all terms and conditions of this agreement. Electronic signatures are legally equivalent to handwritten signatures."
\`\`\`

### Contract Performance and Breach

**Types of Contract Performance:**
- **Complete Performance**: All obligations fulfilled as agreed
- **Substantial Performance**: Minor deviations from contract terms
- **Breach**: Failure to perform material contract obligations

**Remedies for Contract Breach:**
- **Damages**: Monetary compensation for losses
- **Specific Performance**: Court order to complete the contract
- **Rescission**: Cancel contract and return to pre-contract state
- **Reformation**: Correct mistakes in the written contract

[!warning]
**Material vs Minor Breach:**
- **Material Breach**: Goes to the essence of the contract (non-payment, delivering wrong product)
- **Minor Breach**: Technical violation that doesn't defeat the contract's purpose
- Material breach allows the non-breaching party to terminate and seek damages

### Dispute Resolution Mechanisms

**1. Direct Negotiation**
- First step in resolving contract disputes
- Cost-effective and preserves business relationships
- Document all negotiation attempts

**2. Mediation**
- Neutral third party facilitates resolution
- Non-binding but often effective
- Much less expensive than litigation

**3. Arbitration**
- Private judge makes binding decision
- Faster and cheaper than court
- Limited appeal rights

**4. Litigation**
- Court-based resolution
- Most expensive and time-consuming
- Public record with broad appeal rights

[!tip]
**Dispute Resolution Clause Example:**
"Any disputes arising from this agreement shall first be addressed through good faith negotiation. If unsuccessful, disputes shall be resolved through binding arbitration under American Arbitration Association rules in [State/City]."

### Contract Templates and Standardization

**Benefits of Standard Contract Templates:**
- Consistency across all client relationships
- Reduced legal review costs
- Faster contract negotiation process
- Better risk management

**Key Templates Every Developer Business Needs:**
1. **Master Service Agreement** (ongoing relationship framework)
2. **Statement of Work** (specific project details)
3. **Non-Disclosure Agreement** (confidentiality protection)
4. **Independent Contractor Agreement** (when hiring others)
5. **Software License Agreement** (if selling software products)

### Legal Review and Professional Guidance

**When to Have Contracts Reviewed:**
- First-time contract templates
- High-value agreements ($25,000+)
- Complex technical requirements
- Unusual risk allocation
- Multi-party agreements

**What Attorneys Look For:**
- Enforceability of key terms
- Risk allocation and liability limits
- Compliance with applicable laws
- Protection of your business interests
- Clarity and completeness

**Legal Review Investment:**
- Template review: $500-1,500
- Custom contract drafting: $1,500-5,000
- Contract negotiation assistance: $200-500/hour
- Consider it business insurance

### Practical Exercise: Contract Analysis

[!example]
**Sample Contract Clause Analysis:**
"Developer agrees to complete the project on time and to the Client's complete satisfaction. Any delays or dissatisfaction may result in immediate termination without compensation."

**Problems with This Clause:**
1. "Complete satisfaction" is subjective and unenforceable
2. "On time" without defined timeline
3. No payment for work completed
4. No protection against unreasonable client demands

**Improved Version:**
"Developer agrees to complete the project according to the specifications and timeline outlined in Exhibit A. Client will provide feedback within 5 business days of each deliverable. Developer will address reasonable feedback requests. If Client terminates for convenience, Developer will be paid for all work completed through termination date."

### Action Items for This Week

1. **Audit Current Agreements**: Review any existing contracts or agreements you use
2. **Identify Template Needs**: Determine which contract templates your business requires
3. **Research Local Laws**: Understand your state's contract law requirements
4. **Legal Consultation**: Schedule consultation with business attorney about contract templates
5. **Create Contract Process**: Develop standardized process for contract negotiation and execution

### Key Takeaways

[!warning]
**Critical Success Factors:**
- Every business relationship needs a clear, written agreement
- Contracts are business tools, not just legal documents
- Clear terms prevent disputes and protect relationships
- Electronic contracts are legally binding and enforceable
- Professional legal review is an investment in business protection

### Next Lesson Preview

Next, we'll dive deep into service agreements and statements of work - the specific contracts that govern your development projects and define exactly what you'll deliver to clients.

[!tip]
Remember: The best contracts are ones you never have to enforce because they clearly set expectations and prevent disputes. Invest time upfront in creating solid contract templates that protect your business and clarify your professional relationships.`,
        orderIndex: 1,
        lessonType: 'lecture',
        durationMinutes: 60
      },
      {
        title: 'Service Agreements and Statements of Work',
        slug: 'service-agreements-statements-of-work',
        content: `# Service Agreements and Statements of Work

## The Blueprint for Developer Projects

Service agreements and statements of work (SOWs) are the foundation documents that define your project relationships. These contracts protect your business, ensure clear communication, and provide legal recourse when projects go sideways.

[!info]
Master Service Agreements establish the overall relationship framework, while Statements of Work define specific project details. This two-document approach provides flexibility while maintaining legal protection.

### Master Service Agreement (MSA) vs Statement of Work (SOW)

**Master Service Agreement:**
- Overarching contract governing the business relationship
- Contains standard terms, conditions, and legal protections
- Negotiated once, covers multiple projects
- Includes payment terms, IP ownership, liability limits

**Statement of Work:**
- Project-specific document referencing the MSA
- Contains detailed scope, timeline, and deliverables
- Created for each individual project
- Can be executed quickly without renegotiating legal terms

[!example]
**MSA + SOW Structure:**
1. **MSA**: "XYZ Company and Developer agree to work together under these terms..."
2. **SOW #1**: "Project: E-commerce Website - 6 weeks, $15,000"
3. **SOW #2**: "Project: Mobile App Development - 8 weeks, $25,000"
4. **SOW #3**: "Project: API Integration - 2 weeks, $5,000"

### Essential MSA Clauses for Developers

**1. Scope and Services Overview**
\`\`\`
Developer provides software development, consulting, and related technical services as detailed in individual Statements of Work. This Agreement establishes the framework for all project engagements between the parties.
\`\`\`

**2. Payment Terms and Billing**
\`\`\`
Client agrees to pay Developer according to the payment schedule specified in each SOW. Invoices are due within [15/30] days of receipt. Past due amounts accrue interest at 1.5% per month. Developer reserves the right to suspend work for accounts more than 30 days past due.
\`\`\`

**3. Intellectual Property Ownership**
\`\`\`
Upon full payment of all fees, Client will own all custom software code developed specifically for Client's project. Developer retains ownership of pre-existing code, frameworks, and general methodologies. Developer may use learned techniques and general knowledge in other projects.
\`\`\`

[!warning]
**IP Ownership Variations:**
- **Work for Hire**: Client owns everything (typical for custom development)
- **License Back**: Client owns code but licenses back to developer
- **Shared Ownership**: Both parties own different aspects
- **Developer Retention**: Developer keeps IP, licenses to client

**4. Confidentiality and Non-Disclosure**
\`\`\`
Both parties acknowledge they may access confidential information during the engagement. Confidential information includes business plans, customer data, source code, and proprietary processes. Each party agrees to protect confidential information and not disclose to third parties for a period of [3-5] years after engagement termination.
\`\`\`

**5. Limitation of Liability**
\`\`\`
EXCEPT FOR BREACHES OF CONFIDENTIALITY OR IP INDEMNIFICATION, DEVELOPER'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY CLIENT IN THE 12 MONTHS PRECEDING THE CLAIM. DEVELOPER SHALL NOT BE LIABLE FOR CONSEQUENTIAL, INCIDENTAL, OR INDIRECT DAMAGES INCLUDING LOST PROFITS OR BUSINESS INTERRUPTION.
\`\`\`

**6. Term and Termination**
\`\`\`
This Agreement begins on the Effective Date and continues until terminated by either party with [30] days written notice. Termination does not affect obligations under active SOWs. Sections regarding confidentiality, IP ownership, and liability limitations survive termination.
\`\`\`

### Detailed SOW Components

**1. Project Description and Objectives**
- Business goals and success criteria
- Technical requirements and constraints
- Integration requirements with existing systems
- Performance and scalability requirements

[!example]
**Project Description Example:**
"Develop a customer portal web application enabling clients to:
- View account information and billing history
- Submit support requests and track status
- Download reports and documentation
- Manage user permissions and access levels

The portal must integrate with existing CRM system (Salesforce) and support 500+ concurrent users with sub-3-second page load times."

**2. Detailed Scope of Work**
- Specific deliverables with acceptance criteria
- Technical specifications and requirements
- What is included vs excluded from scope
- Dependencies on client-provided resources

**3. Project Timeline and Milestones**
- Project phases and major milestones
- Dependencies and critical path items
- Client review and approval periods
- Buffer time for revisions and testing

[!tip]
**Timeline Best Practices:**
- Build in 20-25% buffer for unexpected issues
- Clearly define what constitutes "client approval"
- Specify consequences of client delays
- Include testing and revision time in estimates

**4. Deliverables and Acceptance Criteria**
- Specific outputs for each milestone
- Objective criteria for acceptance
- Format and delivery method
- Documentation and training requirements

**5. Change Management Process**
- How scope changes are requested and approved
- Impact assessment and approval timeframe
- Additional fees for scope changes
- Timeline impacts of changes

### Payment Structures and Billing

**Fixed-Price Projects:**
- Total project cost agreed upfront
- Payment tied to milestone completion
- Developer assumes scope and timeline risk
- Best for well-defined projects

[!example]
**Fixed-Price Payment Schedule:**
- 25% upon contract signing
- 25% upon completion of Phase 1 (Design & Architecture)
- 25% upon completion of Phase 2 (Core Development)
- 25% upon final delivery and client acceptance

**Time and Materials:**
- Hourly or daily rate billing
- Client pays for actual time spent
- Requires detailed time tracking
- Good for unclear scope or ongoing work

**Hybrid Approaches:**
- Fixed price for defined scope + T&M for changes
- Monthly retainer plus project bonuses
- Value-based pricing tied to business outcomes

### Risk Allocation and Protection

**1. Warranty and Disclaimer Clauses**
\`\`\`
Developer warrants that services will be performed in a professional manner consistent with industry standards. SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
\`\`\`

**2. Indemnification Provisions**
\`\`\`
Each party agrees to indemnify and hold harmless the other party from claims arising from: (a) breach of this Agreement, (b) negligent or willful acts, or (c) violation of applicable laws. Developer shall indemnify Client for third-party IP infringement claims related to custom-developed code.
\`\`\`

**3. Force Majeure**
\`\`\`
Neither party shall be liable for delays or failures in performance resulting from acts beyond reasonable control, including natural disasters, war, terrorism, strikes, or government actions. The affected party must promptly notify the other party and use reasonable efforts to mitigate impacts.
\`\`\`

### Client Responsibility Clauses

**1. Client Cooperation Requirements**
\`\`\`
Client agrees to: (a) provide timely access to necessary personnel and systems, (b) deliver required information and materials as specified, (c) respond to requests for feedback within agreed timeframes, and (d) provide necessary approvals for project progression.
\`\`\`

**2. Third-Party Dependencies**
\`\`\`
Project timeline assumes timely delivery of third-party services, systems, and data as specified in project requirements. Delays in third-party deliverables may impact project timeline and costs, which will be addressed through the change management process.
\`\`\`

**3. Client-Provided Resources**
\`\`\`
Client will provide access to existing systems, documentation, and technical personnel as required for project completion. Any additional costs arising from inadequate or delayed client resources will be addressed as scope changes.
\`\`\`

### Common SOW Pitfalls and Solutions

**1. Scope Creep Prevention**

**Problem**: "Can you just add this small feature?"

**Solution**:
\`\`\`
Minor modifications (less than 4 hours) may be included at Developer's discretion. All other changes require written approval and will be billed at [rate]. Changes affecting timeline will extend delivery dates accordingly.
\`\`\`

**2. Revision Management**

**Problem**: Unlimited revisions leading to project delays

**Solution**:
\`\`\`
Each project phase includes two rounds of revisions based on Client feedback. Additional revisions beyond the included amount will be billed at [rate] or may be addressed through a change order.
\`\`\`

**3. Acceptance Criteria Disputes**

**Problem**: Client rejecting deliverables for subjective reasons

**Solution**:
\`\`\`
Deliverables are deemed accepted if: (a) they meet specifications outlined in this SOW, (b) Client uses them in production, or (c) no written objection is received within 5 business days of delivery.
\`\`\`

### Industry-Specific Considerations

**Healthcare/HIPAA Projects:**
- Business Associate Agreement requirements
- Data security and encryption standards
- Compliance with HIPAA Privacy and Security Rules
- Audit trail and access logging requirements

**Financial Services Projects:**
- PCI DSS compliance for payment processing
- Financial data protection requirements
- Regulatory compliance (SOX, GDPR, etc.)
- Third-party security assessments

**E-commerce Projects:**
- PCI compliance for credit card processing
- State sales tax compliance
- Consumer protection law compliance
- Privacy policy and terms of service requirements

### Contract Templates and Customization

**Template Components to Customize:**
1. **Payment terms** (net 15 vs net 30)
2. **Liability caps** (1x fees vs 2x fees vs uncapped)
3. **IP ownership** (work for hire vs shared ownership)
4. **Warranty periods** (30 days vs 90 days vs 1 year)
5. **Termination clauses** (convenience vs cause only)

**Industry Template Sources:**
- **Legal Technology**: LawGeex, ContractWorks
- **Professional Organizations**: Freelancers Union templates
- **Attorney-Drafted**: Custom templates for your specific business
- **Online Services**: LegalZoom, Nolo (basic templates only)

### Electronic Execution and Management

**Digital Signature Platforms:**
- **DocuSign**: Most comprehensive, integrates with CRMs
- **HelloSign**: Simple interface, good for small businesses
- **Adobe Sign**: Good integration with Adobe products
- **PandaDoc**: Includes proposal and contract management

**Contract Management Best Practices:**
- Maintain organized contract database
- Set calendar reminders for renewal dates
- Track amendment history and versions
- Regular review and template updates

### Action Items for This Week

1. **Create MSA Template**: Draft master service agreement for your business
2. **Develop SOW Template**: Create statement of work template with your standard terms
3. **Define Payment Terms**: Establish your standard payment schedule and terms
4. **Legal Review**: Have templates reviewed by qualified business attorney
5. **Digital Setup**: Choose and implement electronic signature solution

### Next Lesson Preview

Next, we'll explore intellectual property protection in detail - including copyrights, trademarks, trade secrets, and how to protect your code, business name, and proprietary processes while respecting others' IP rights.

[!tip]
Great service agreements are like good code - they're clear, comprehensive, and handle edge cases gracefully. Invest time in creating solid templates that protect your business while maintaining good client relationships.`,
        orderIndex: 2,
        lessonType: 'lecture',
        durationMinutes: 65
      },
      {
        title: 'Intellectual Property Protection for Developers',
        slug: 'intellectual-property-protection',
        content: `# Intellectual Property Protection for Developers

## Your Code, Your Brand, Your Competitive Advantage

Intellectual property is often your most valuable business asset as a developer. Understanding how to protect, license, and respect IP rights is crucial for building and maintaining a successful development business.

[!info]
IP protection isn't just about preventing others from copying your code - it's about creating business value, enabling licensing opportunities, and building a defensible competitive position in the market.

### The Four Types of Intellectual Property

**1. Copyright**
- **Protects**: Original works of authorship (code, documentation, designs)
- **Duration**: Life of author + 70 years (or 95 years for corporate works)
- **Requirements**: Automatic upon creation, registration provides additional benefits
- **Enforcement**: Civil lawsuits, DMCA takedowns, licensing agreements

**2. Trademark**
- **Protects**: Brand names, logos, slogans that identify business sources
- **Duration**: Potentially infinite with proper use and renewal
- **Requirements**: Use in commerce, distinctiveness, registration optional but recommended
- **Enforcement**: Opposition proceedings, infringement lawsuits, domain disputes

**3. Trade Secrets**
- **Protects**: Confidential business information providing competitive advantage
- **Duration**: As long as information remains secret and valuable
- **Requirements**: Reasonable efforts to maintain secrecy
- **Enforcement**: Non-disclosure agreements, employee agreements, litigation

**4. Patents**
- **Protects**: Novel, non-obvious inventions and processes
- **Duration**: 20 years from filing date
- **Requirements**: USPTO application, examination, and approval
- **Enforcement**: Expensive litigation, licensing negotiations

### Copyright Protection for Developers

**What Copyright Covers in Software:**
- Source code (all programming languages)
- Object code and compiled programs
- User interfaces and screen displays
- Documentation and user manuals
- Database schema and structure
- API documentation

[!example]
**Copyright Protection Examples:**
- ✅ **Protected**: Your custom e-commerce platform code
- ✅ **Protected**: Unique algorithms you developed
- ✅ **Protected**: Your application's UI design and layout
- ❌ **Not Protected**: Programming language syntax
- ❌ **Not Protected**: Common coding patterns and techniques
- ❌ **Not Protected**: Ideas and concepts (only expression)

**Copyright Ownership Rules:**

**Individual Developers:**
- You own copyright in code you write independently
- Copyright exists automatically upon creation
- No registration required for basic protection

**Employee Developers:**
- Employer owns copyright under "work for hire" doctrine
- Code written during employment belongs to company
- Personal projects may have different rules

**Contractor/Freelancer Developers:**
- Default: Contractor owns copyright unless transferred
- Contracts typically require copyright assignment to client
- Important to clarify ownership in agreements

[!warning]
**Work for Hire Misconception:**
Many clients assume they automatically own contractor-created code. Without explicit copyright assignment in your contract, YOU own the copyright as the creator. Always clarify ownership upfront.

**Copyright Registration Benefits:**
- **Enhanced Legal Standing**: Stronger position in court
- **Statutory Damages**: Up to $150,000 per work infringed
- **Attorney's Fees**: Court may award legal costs to winner
- **Presumption of Validity**: Registration creates legal presumption of ownership
- **Cost**: $45-65 per application online

### Trademark Protection for Developer Businesses

**Trademarkable Assets for Developers:**
- Business names and "doing business as" names
- Software product names and logos
- App names and icons
- Service mark for consulting services
- Domain names (related to trademark rights)

**Trademark Classes for Developers:**
- **Class 9**: Computer software, mobile apps, hardware
- **Class 35**: Business services, advertising, marketing
- **Class 42**: Computer services, software as a service, consulting

[!example]
**Trademark Examples:**
- **Strong**: "CodeCraft Solutions" for development services
- **Medium**: "WebBuilder Pro" for website development tool
- **Weak**: "Fast Web Services" (generic/descriptive)
- **Unregistrable**: "JavaScript Expert" (generic programming term)

**Trademark Search and Clearance:**
1. **USPTO Database Search**: Check registered and pending trademarks
2. **Common Law Search**: Google, social media, domain names
3. **Professional Search**: Comprehensive search by trademark attorney
4. **International Search**: If planning global business expansion

**Trademark Application Process:**
1. **Prepare Application**: Name, logo, description of goods/services
2. **File with USPTO**: $250-350 per class online
3. **Examination**: 3-6 months for initial review
4. **Publication**: 30-day opposition period
5. **Registration**: Certificate issued if no opposition
6. **Maintenance**: Renewal between years 5-6, then every 10 years

### Trade Secrets for Developers

**What Qualifies as Trade Secrets:**
- Proprietary algorithms and data structures
- Customer lists and pricing information
- Business processes and methodologies
- Performance optimization techniques
- Security vulnerabilities and patches

**Trade Secret Protection Requirements:**

**1. Information Must Be Secret**
- Not generally known in the industry
- Not readily discoverable through proper means
- Provides economic value from being secret

**2. Reasonable Efforts to Maintain Secrecy**
- Non-disclosure agreements with employees and contractors
- Limited access on need-to-know basis
- Password protection and encryption
- Physical security measures
- Clear marking of confidential documents

[!example]
**Trade Secret Protection Checklist:**
- ✅ NDAs with all employees, contractors, and business partners
- ✅ Access controls and password protection for sensitive systems
- ✅ Clear policies on confidential information handling
- ✅ Regular training on trade secret protection
- ✅ Exit interviews and return of confidential materials
- ✅ Physical security for offices and equipment

### Patent Protection for Software Innovations

**Software Patent Landscape:**
- **Historical**: Software was not patentable
- **Current**: Software patents allowed if they solve technical problems
- **Controversy**: Many believe software patents stifle innovation
- **Practical**: Expensive and time-consuming to obtain

**Patentable Software Inventions:**
- Novel algorithms solving technical problems
- Improved computer functionality
- Hardware-software combinations
- Business methods with technical implementation

**Patent Application Process:**
- **Cost**: $5,000-15,000+ including attorney fees
- **Timeline**: 2-4 years from application to grant
- **Requirements**: Detailed specification and claims
- **Maintenance**: Annual fees required to keep patent active

[!warning]
**Patent Considerations for Small Developers:**
Patents are expensive and time-consuming. Most small developer businesses are better served focusing on copyright, trademarks, and trade secrets. Consider patents only for truly innovative technical solutions with significant commercial potential.

### IP Licensing and Assignment

**Copyright Assignment vs Licensing:**

**Assignment (Transfer Ownership):**
\`\`\`
Developer hereby assigns to Client all right, title, and interest in and to the custom software code developed under this agreement, including all copyrights therein. This assignment includes the right to modify, distribute, and create derivative works.
\`\`\`

**Licensing (Grant Rights, Retain Ownership):**
\`\`\`
Developer grants Client a non-exclusive, perpetual license to use, modify, and distribute the software for Client's business purposes. Developer retains ownership and may license the software to others.
\`\`\`

**Open Source Considerations:**
- **Using Open Source**: Understand license obligations (GPL, MIT, Apache)
- **Contributing to Open Source**: Consider impact on client work
- **Dual Licensing**: Offer both commercial and open source licenses
- **License Compatibility**: Ensure open source licenses are compatible

### IP Infringement and Enforcement

**Copyright Infringement Response:**
1. **Document the Infringement**: Screenshots, copies, dates
2. **Send Cease and Desist**: Demand letter requesting cessation
3. **DMCA Takedown Notice**: For online infringement
4. **Legal Action**: Federal court lawsuit if necessary

**Trademark Infringement Response:**
1. **Evaluate Strength**: Is your mark strong and properly used?
2. **Assess Likelihood of Confusion**: Similar marks in similar industries
3. **Opposition/Cancellation**: Challenge USPTO applications/registrations
4. **Domain Name Disputes**: UDRP proceedings for cybersquatting

**Defensive Strategies:**
- **Freedom to Operate Analysis**: Ensure your products don't infringe others' IP
- **Patent Monitoring**: Watch for patents in your technology areas
- **Trademark Watching**: Monitor for similar trademark applications
- **Insurance**: Consider IP insurance for significant risks

### IP Clauses in Client Contracts

**Standard IP Assignment Clause:**
\`\`\`
Upon full payment of all fees, Developer assigns to Client all right, title, and interest in and to all custom code, documentation, and materials created specifically for this project. Developer retains rights to pre-existing IP and general knowledge gained.
\`\`\`

**Carve-Out Provisions:**
\`\`\`
Developer retains ownership of: (a) pre-existing software, frameworks, and tools; (b) general programming techniques and knowledge; (c) improvements to Developer's methodologies; and (d) any open-source software incorporated into the work.
\`\`\`

**IP Indemnification:**
\`\`\`
Developer agrees to indemnify and hold harmless Client from third-party claims that the custom-developed software infringes any copyright, patent, or trademark, provided Client promptly notifies Developer of such claims and allows Developer to control the defense.
\`\`\`

### International IP Considerations

**Copyright Protection:**
- **Berne Convention**: Automatic copyright protection in 177+ countries
- **Duration Variations**: Different countries have different copyright terms
- **Registration Benefits**: Vary by country

**Trademark Protection:**
- **Madrid Protocol**: International trademark registration system
- **Country-Specific**: Trademarks are territorial rights
- **Prior Use vs First-to-File**: Different countries have different systems

**Practical International Strategy:**
- Focus on key markets first
- Consider international trademark registration for brands
- Understand export control laws for software
- Local counsel in major international markets

### IP Portfolio Management

**IP Audit and Inventory:**
- Catalog all IP assets (copyrights, trademarks, trade secrets)
- Document ownership and chain of title
- Identify IP that should be registered
- Assess protection and enforcement strategies

**IP Valuation Considerations:**
- **Cost Approach**: What did it cost to develop?
- **Market Approach**: What would someone pay for similar IP?
- **Income Approach**: What revenue can the IP generate?
- **Strategic Value**: Competitive advantage and defensive value

### Action Items for This Week

1. **IP Inventory**: Create comprehensive list of your business IP assets
2. **Contract Review**: Ensure IP ownership is clearly addressed in client contracts
3. **Trademark Search**: Conduct preliminary search for your business name
4. **Trade Secret Assessment**: Identify confidential information requiring protection
5. **Legal Consultation**: Discuss IP strategy with qualified IP attorney

### Key Takeaways

[!warning]
**Critical IP Protection Principles:**
- Copyright protection is automatic but registration provides additional benefits
- Trademarks require use in commerce and benefit from registration
- Trade secrets require active protection measures
- Clear contract terms prevent IP ownership disputes
- IP protection is an ongoing process, not a one-time event

### Next Week Preview

Next week, we'll move to Week 3 and cover Business Registration and Compliance Requirements - the operational legal requirements for running a legitimate business including licenses, permits, taxes, and regulatory compliance.

[!tip]
Your intellectual property is often your most valuable business asset. Invest in understanding and protecting it properly - the cost of prevention is always less than the cost of litigation or losing valuable IP rights.`,
        orderIndex: 3,
        lessonType: 'lecture',
        durationMinutes: 70
      }
    ]

    for (const lessonData of week2Lessons) {
      const lesson = await prisma.lesson.create({
        data: {
          weekId: week2.id,
          ...lessonData
        }
      })
      console.log('Created lesson:', lesson.title)
    }

    // Create Week 2 Quiz
    const week2Quiz = await prisma.quiz.create({
      data: {
        weekId: week2.id,
        title: 'Week 2: Contracts and IP Assessment',
        description: 'Test your understanding of contract law and intellectual property protection for developer businesses',
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 30
      }
    })

    // Create Week 2 Quiz Questions
    const week2Questions = [
      {
        questionText: 'What are the four essential elements that make a contract legally binding?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['Offer, Acceptance, Consideration, Legal Capacity', 'Offer, Payment, Delivery, Signature', 'Agreement, Money, Timeline, Warranty', 'Terms, Conditions, Signatures, Witnesses']),
        correctAnswer: 'Offer, Acceptance, Consideration, Legal Capacity',
        explanation: 'A legally binding contract requires: (1) Offer - clear proposal of terms, (2) Acceptance - agreement to all terms, (3) Consideration - something of value exchanged, and (4) Legal Capacity - parties legally able to contract.',
        points: 1,
        orderIndex: 1
      },
      {
        questionText: 'In a typical work-for-hire arrangement, who owns the copyright to custom software developed for a client?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['The developer always retains ownership', 'The client owns it upon full payment', 'Ownership is shared equally', 'It depends on the programming language used']),
        correctAnswer: 'The client owns it upon full payment',
        explanation: 'In work-for-hire arrangements with proper contract language, the client owns the copyright to custom-developed software upon full payment, though developers typically retain rights to pre-existing code and general methodologies.',
        points: 1,
        orderIndex: 2
      },
      {
        questionText: 'Which type of intellectual property protection lasts for the life of the author plus 70 years?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['Copyright', 'Trademark', 'Patent', 'Trade Secret']),
        correctAnswer: 'Copyright',
        explanation: 'Copyright protection lasts for the life of the author plus 70 years for individual creators, or 95 years for corporate works. This is much longer than patents (20 years) and potentially shorter than trademarks (can be renewed indefinitely) or trade secrets (as long as kept secret).',
        points: 1,
        orderIndex: 3
      },
      {
        questionText: 'True or False: A Master Service Agreement (MSA) must be renegotiated for every new project with a client.',
        questionType: 'true-false',
        options: JSON.stringify(['True', 'False']),
        correctAnswer: 'False',
        explanation: 'The MSA establishes the overarching relationship framework and standard terms. Individual projects are then governed by Statements of Work (SOWs) that reference the MSA, eliminating the need to renegotiate basic terms for each project.',
        points: 1,
        orderIndex: 4
      },
      {
        questionText: 'What is the primary requirement for maintaining trade secret protection?',
        questionType: 'multiple-choice',
        options: JSON.stringify(['USPTO registration', 'Public disclosure', 'Reasonable efforts to maintain secrecy', 'Payment of annual fees']),
        correctAnswer: 'Reasonable efforts to maintain secrecy',
        explanation: 'Trade secrets require reasonable efforts to maintain secrecy, such as NDAs, access controls, and security measures. Unlike patents or trademarks, trade secrets do not require registration and lose protection if the information becomes publicly known.',
        points: 1,
        orderIndex: 5
      }
    ]

    for (const questionData of week2Questions) {
      await prisma.question.create({
        data: {
          quizId: week2Quiz.id,
          ...questionData
        }
      })
    }

    console.log('✅ Successfully created Week 2: Contract Basics and Intellectual Property')
    console.log('📚 Week 2 Content Summary:')
    console.log('   - 3 comprehensive lessons covering contracts and IP')
    console.log('   - 1 assessment quiz with 5 questions')
    console.log('   - Total duration: ~195 minutes of content')

  } catch (error) {
    console.error('Error creating Week 2:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

addCourse2Week2()
  .catch((error) => {
    console.error('Failed to create Week 2:', error)
    process.exit(1)
  })