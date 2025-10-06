# Clock-Out ⏰

A modern, intuitive time tracking application built with Next.js that helps you efficiently monitor your working hours with a simple punch clock system.

## ✨ Features

- **🔐 Secure Authentication**: Multi-user support with Clerk authentication
- **👥 Organization Management**: Support for multiple organizations and team management
- **⏱️ Punch Clock System**: Simple clock-in/clock-out functionality
- **📊 Hours Tracking**: Comprehensive view of hours worked with weekly and yearly summaries
- **📈 Visual Analytics**: Interactive charts showing work patterns and productivity trends
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🌙 Dark Theme**: Modern dark UI with gradient accents
- **🚀 Real-time Updates**: Live data updates using React Query

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL (Neon)
- **Authentication**: Clerk
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Code Quality**: Biome (linting & formatting)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- PostgreSQL database (or Neon account)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clock-out
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Database (Neon PostgreSQL)
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Set up the database**
   
   Run the SQL schema to create the required tables:
   ```bash
   # Use the schema.sql file in src/lib/SQL/schema.sql
   # Connect to your PostgreSQL database and run the schema
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### For Individual Users

1. **Sign Up/Sign In**: Create an account or log in using Clerk authentication
2. **Punch In**: Click "Punch Clock" and record your start time
3. **Punch Out**: Return to punch out when your work session is complete
4. **View Hours**: Check "Hours Worked" to see your time summaries and analytics

### For Organizations

1. **Create/Join Organization**: Use the organization switcher to manage teams
2. **Team Time Tracking**: Each organization maintains separate time records
3. **Analytics**: View team productivity patterns and work hour distributions

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── hours-worked/      # Hours tracking and analytics pages
│   ├── punch-clock/       # Time clock interface
│   ├── privacy/           # Privacy policy page
│   └── terms/             # Terms of service page
├── components/            # Reusable UI components
│   └── ui/               # UI component library
├── lib/                  # Utilities and business logic
│   ├── DAL/              # Data Access Layer
│   ├── DB/               # Database connections
│   ├── SQL/              # Database schemas
│   └── actions/          # Server actions
└── middleware.ts         # Clerk authentication middleware
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## 🗃️ Database Schema

The application uses a simple but effective schema:

```sql
CREATE TABLE time_clock (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    org_id VARCHAR(50) NOT NULL,
    time_in TIMESTAMP NOT NULL,
    time_out TIMESTAMP
);
```

## 🎨 Design Philosophy

Clock-Out prioritizes:
- **Simplicity**: Clean, intuitive interface that anyone can use
- **Efficiency**: Quick punch-in/out process with minimal friction
- **Insights**: Meaningful analytics to understand work patterns
- **Flexibility**: Support for both individual and team time tracking

## 🔐 Privacy & Security

- Secure authentication via Clerk
- Organization-based data isolation
- GDPR-compliant data handling
- See [Privacy Policy](PRIVACY_POLICY.md) and [Terms of Service](TERMS_OF_SERVICE.md)

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy automatically with each push to main

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/clock-out)

### Manual Deployment

1. Build the application: `npm run build`
2. Set up your environment variables on your hosting platform
3. Ensure your PostgreSQL database is accessible
4. Deploy the built application

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js and modern web technologies**
