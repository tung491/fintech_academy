# FinAcademy - Financial Education Platform for Developers

A comprehensive full-stack web application that teaches financial and accounting knowledge to developers, enabling them to run their own businesses successfully.

## Features

- **12-Week Comprehensive Curriculum**: University-level content covering all aspects of finance and accounting for tech entrepreneurs
- **Interactive Learning**: Each week includes detailed lessons, practical examples, and quizzes
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **User Authentication**: Secure login system with JWT tokens
- **Quiz System**: Test your knowledge with comprehensive assessments

## Tech Stack

### Backend
- Node.js with Express.js
- TypeScript for type safety
- PostgreSQL database
- JWT authentication
- bcrypt for password hashing

### Frontend
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- Zustand for state management

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finacademy.git
cd finacademy
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up the database:
```bash
# Create PostgreSQL database
createdb finacademy

# Copy environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials
```

4. Run database migrations:
```bash
cd backend
npm run migrate
```

5. Seed the database with curriculum content:
```bash
npm run seed
```

6. Start the development servers:
```bash
# From the root directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Demo Accounts

After seeding the database, you can use these accounts:
- **Student**: student@example.com / student123
- **Admin**: admin@finacademy.com / admin123

## Curriculum Overview

### Week 1: Financial Literacy Basics & Business Mindset
- Introduction to Financial Thinking
- Time Value of Money
- Revenue, Costs, and Profit
- Cash Flow Basics
- Business Models for Developers

### Week 2: Bookkeeping and Accounting Fundamentals
- Double-entry bookkeeping
- Debits and credits
- Financial statements
- Accounting equation
- Chart of accounts

### Week 3: Financial Statements Deep Dive
- Income statements
- Balance sheets
- Cash flow statements
- Statement analysis

### Week 4: Tax Planning and Compliance
- Business tax basics
- Tax deductions for developers
- Quarterly estimates
- International considerations

### Week 5: Pricing Strategies and Cost Analysis
- Value-based pricing
- Cost analysis
- Competitive positioning
- Price optimization

### Week 6: Financial Planning and Budgeting
- Creating budgets
- Financial forecasting
- Scenario planning
- KPI tracking

### Week 7: Investment and Funding Strategies
- Bootstrapping vs funding
- Types of investors
- Equity and debt
- Term sheets

### Week 8: Financial Analysis and KPIs
- Key metrics for tech businesses
- Financial ratios
- Dashboard creation
- Performance monitoring

### Week 9: Legal Structures and Contracts
- Business entity types
- Contract essentials
- IP protection
- Liability management

### Week 10: Risk Management and Insurance
- Identifying business risks
- Insurance types
- Risk mitigation strategies
- Contingency planning

### Week 11: Scaling and Growth Finance
- Growth metrics
- Unit economics
- Scaling strategies
- International expansion

### Week 12: Exit Strategies and Valuation
- Business valuation methods
- Exit planning
- M&A basics
- Succession planning

## Project Structure

```
finacademy/
├── backend/
│   ├── src/
│   │   ├── db/          # Database configuration and migrations
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # API routes
│   │   └── index.ts     # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js app router pages
│   │   ├── components/  # React components
│   │   ├── lib/         # Utilities and API client
│   │   └── stores/      # Zustand stores
│   ├── package.json
│   └── next.config.js
└── package.json         # Root package.json for scripts

```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/week/:weekNumber` - Get week content

### Lessons
- `GET /api/lessons/:id` - Get lesson content
- `POST /api/lessons/:id/complete` - Mark lesson complete

### Quizzes
- `GET /api/quizzes/:id` - Get quiz questions
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `GET /api/quizzes/:id/attempts` - Get user attempts

### Progress
- `GET /api/progress/dashboard` - Get dashboard data
- `GET /api/progress/course/:id` - Get course progress

## Deployment

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
npm run build
```

3. Set production environment variables
4. Start the production server:
```bash
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the GitHub repository.