# Development Workflow

## Local Development Setup

### Prerequisites

```bash
# Required software
node --version    # v18.17.0 or higher (LTS recommended)
npm --version     # v9.0.0 or higher

# Recommended
git --version     # Latest
```

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd umerfilms

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
# - RESEND_API_KEY=your_resend_api_key
# - CONTACT_EMAIL=umer@example.com
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server locally
npm run start

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## Environment Configuration

### Required Environment Variables

```bash
# .env.local (development)

# Resend API Key for email sending
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email to receive contact form submissions
CONTACT_EMAIL=umer@example.com

# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
# Production (set in Vercel dashboard)

RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=umer@example.com
NEXT_PUBLIC_SITE_URL=https://umerfilms.com
```

---
