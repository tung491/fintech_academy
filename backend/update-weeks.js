const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const courseId = 'cmexeuw0v0002vb2ampmo9m5w';

const weekUpdates = [
  {
    weekNumber: 5,
    title: 'Investment Strategies & Portfolio Management',
    overview: 'Learn to build and manage investment portfolios, understand different asset classes, and develop long-term wealth building strategies for developers.',
    learningObjectives: JSON.stringify([
      'Understand different investment vehicles and asset classes',
      'Build a diversified investment portfolio aligned with your goals',
      'Learn about index funds, ETFs, and individual stock investing',
      'Develop strategies for retirement planning and long-term wealth building',
      'Master risk assessment and portfolio rebalancing techniques',
      'Understand tax-efficient investing strategies'
    ]),
    estimatedHours: 8
  },
  {
    weekNumber: 6,
    title: 'Tax Planning & Business Structure Optimization',
    overview: 'Master tax strategies for developers, choose optimal business structures, and implement advanced tax planning techniques to maximize after-tax income.',
    learningObjectives: JSON.stringify([
      'Choose the optimal business structure (LLC, Corp, S-Corp) for your situation',
      'Understand tax implications of different business entities',
      'Implement advanced tax deduction strategies for developers',
      'Plan for quarterly estimated taxes and cash flow management',
      'Learn about international tax considerations for remote work',
      'Develop year-end tax planning strategies'
    ]),
    estimatedHours: 8
  },
  {
    weekNumber: 7,
    title: 'Advanced Analytics & Financial Metrics',
    overview: 'Dive deep into financial analytics, KPIs, and metrics that matter for scaling developer businesses and making data-driven financial decisions.',
    learningObjectives: JSON.stringify([
      'Master advanced financial ratios and performance metrics',
      'Build financial dashboards and tracking systems',
      'Understand unit economics and customer lifetime value',
      'Learn about cohort analysis and revenue forecasting',
      'Implement financial modeling and scenario planning',
      'Use data to optimize pricing and business model decisions'
    ]),
    estimatedHours: 10
  },
  {
    weekNumber: 8,
    title: 'Fundraising & Investor Relations',
    overview: 'Navigate the world of fundraising, understand investor expectations, and learn to pitch your developer business to potential investors.',
    learningObjectives: JSON.stringify([
      'Understand different types of funding (bootstrapping, angels, VCs)',
      'Prepare compelling pitch decks and financial projections',
      'Navigate term sheets and equity negotiations',
      'Build relationships with investors and maintain investor relations',
      'Understand valuation methods and equity dilution',
      'Plan for multiple funding rounds and exit strategies'
    ]),
    estimatedHours: 10
  },
  {
    weekNumber: 9,
    title: 'Mergers, Acquisitions & Exit Strategies',
    overview: 'Learn about exit strategies, M&A processes, and how to prepare your developer business for potential acquisition or strategic partnerships.',
    learningObjectives: JSON.stringify([
      'Understand different exit strategies and their implications',
      'Prepare your business for due diligence and acquisition',
      'Navigate M&A negotiations and deal structures',
      'Understand earn-outs, escrows, and post-acquisition integration',
      'Learn about strategic partnerships and joint ventures',
      'Plan for succession and business continuity'
    ]),
    estimatedHours: 8
  },
  {
    weekNumber: 10,
    title: 'International Business & Currency Management',
    overview: 'Master the financial aspects of international business, currency hedging, and global expansion strategies for developer businesses.',
    learningObjectives: JSON.stringify([
      'Navigate international tax and regulatory requirements',
      'Understand currency risks and hedging strategies',
      'Set up international business entities and banking',
      'Manage multi-currency cash flows and reporting',
      'Learn about transfer pricing and international compliance',
      'Develop global expansion financial strategies'
    ]),
    estimatedHours: 8
  },
  {
    weekNumber: 11,
    title: 'Risk Management & Insurance Planning',
    overview: 'Develop comprehensive risk management strategies, understand business insurance needs, and protect your financial future.',
    learningObjectives: JSON.stringify([
      'Conduct comprehensive business risk assessments',
      'Understand different types of business insurance coverage',
      'Implement cybersecurity and data protection strategies',
      'Plan for business continuity and disaster recovery',
      'Manage personal and professional liability risks',
      'Develop crisis management and financial contingency plans'
    ]),
    estimatedHours: 8
  },
  {
    weekNumber: 12,
    title: 'Building Financial Teams & Scaling Operations',
    overview: 'Learn to build financial teams, implement scalable financial processes, and prepare for sustainable growth as your business expands.',
    learningObjectives: JSON.stringify([
      'Build and manage finance and accounting teams',
      'Implement scalable financial processes and systems',
      'Choose and integrate financial software and tools',
      'Develop internal controls and financial governance',
      'Create board reporting and stakeholder communication processes',
      'Plan for long-term organizational and financial scaling'
    ]),
    estimatedHours: 10
  }
];

async function updateWeeks() {
  try {
    console.log('🚀 Starting week content updates...');

    for (const weekData of weekUpdates) {
      console.log(`📝 Updating Week ${weekData.weekNumber}: ${weekData.title}`);
      
      await prisma.week.update({
        where: {
          courseId_weekNumber: {
            courseId: courseId,
            weekNumber: weekData.weekNumber
          }
        },
        data: {
          title: weekData.title,
          overview: weekData.overview,
          learningObjectives: weekData.learningObjectives,
          estimatedHours: weekData.estimatedHours
        }
      });
      
      console.log(`✅ Successfully updated Week ${weekData.weekNumber}`);
    }

    console.log('🎉 All weeks updated successfully!');

    // Fetch and display the updated weeks
    const updatedWeeks = await prisma.week.findMany({
      where: {
        courseId: courseId,
        weekNumber: {
          in: [5, 6, 7, 8, 9, 10, 11, 12]
        }
      },
      orderBy: {
        weekNumber: 'asc'
      },
      select: {
        weekNumber: true,
        title: true,
        overview: true,
        estimatedHours: true
      }
    });

    console.log('\n📋 Updated weeks summary:');
    console.log('─'.repeat(80));
    updatedWeeks.forEach(week => {
      console.log(`Week ${week.weekNumber}: ${week.title}`);
      console.log(`Overview: ${week.overview.substring(0, 80)}...`);
      console.log(`Estimated Hours: ${week.estimatedHours}h`);
      console.log('─'.repeat(80));
    });

  } catch (error) {
    console.error('❌ Error updating weeks:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateWeeks();