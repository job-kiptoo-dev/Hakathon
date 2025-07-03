# Hakathon Frontend

A modern, AI-powered job matching platform frontend built with React, TypeScript, Vite, shadcn-ui, and Tailwind CSS.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **AI-Powered Job Matching:** Smart job recommendations based on applicant profiles and preferences.
- **Applicant Dashboard:**
  - Job search with advanced filters (keywords, location, type, remote, salary).
  - View job details, save jobs, and apply directly.
  - Track applications and interview progress.
  - AI-powered interview preparation and resume/cover letter tools.
- **Employer Dashboard:**
  - Manage job listings, view candidates, and track applications.
  - Schedule interviews and review analytics.
- **Admin Dashboard:**
  - Platform analytics, user management, content moderation, and reports.
- **Modern UI:** Responsive, accessible, and visually appealing interface using shadcn-ui and Tailwind CSS.
- **Authentication:** Role-based access for applicants, employers, and admins.
- **Notifications:** Real-time updates and alerts for users.

## Project Structure
```
front-end/
  ├── public/                # Static assets
  ├── src/
  │   ├── components/        # Reusable UI and feature components
  │   ├── contexts/          # React context providers (auth, notifications)
  │   ├── data/              # Mock data for development
  │   ├── hooks/             # Custom React hooks
  │   ├── lib/               # Utility functions
  │   ├── pages/             # Top-level route pages
  │   ├── services/          # API and AI service integrations
  │   ├── types/             # TypeScript type definitions
  │   └── main.tsx           # App entry point
  ├── index.html             # Main HTML file
  ├── package.json           # Project metadata and scripts
  └── tailwind.config.ts     # Tailwind CSS configuration
```

## Tech Stack
- **React** (with React Router)
- **TypeScript**
- **Vite** (build tool)
- **shadcn-ui** (UI components, built on Radix UI)
- **Tailwind CSS** (utility-first styling)
- **Jest** & **React Testing Library** (testing)
- **@tanstack/react-query** (data fetching/caching)
- **Lucide-react** (icons)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd front-end

# Install dependencies
npm install
```

### Running the Development Server
```sh
npm run dev
```
- The app will be available at `http://localhost:5173` (default Vite port).

### Building for Production
```sh
npm run build
```
- Output will be in the `dist/` directory.

### Previewing Production Build
```sh
npm run preview
```

## Available Scripts

### Development
- `npm run dev` — Start the development server
- `npm run preview` — Preview the production build

### Building
- `npm run build` — Build for production
- `npm run build:dev` — Build for development
- `npm run build:analyze` — Build and analyze bundle size

### Code Quality & Linting
- `npm run lint` — Lint the codebase with ESLint
- `npm run lint:fix` — Lint and automatically fix issues
- `npm run type-check` — Run TypeScript type checking
- `npm run quality:check` — Run all quality checks (lint + type-check + security)

### Security & Dependencies
- `npm run security:audit` — Run npm security audit
- `npm run security:check` — Run comprehensive security checks
- `npm run deps:check` — Check for outdated dependencies
- `npm run deps:update` — Update dependencies

### Maintenance
- `npm run clean` — Clean build artifacts and cache

## CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline that focuses on code quality, security, and build optimization:

### Pipeline Features
- **Code Quality**: ESLint with enhanced rules, TypeScript strict mode checking
- **Security**: npm audit, vulnerability scanning, dependency analysis
- **Build Optimization**: Production and development builds with bundle analysis
- **Performance**: Bundle size monitoring and chunk optimization
- **Caching**: Intelligent dependency caching for faster builds

### Quality Checks
- **Linting**: Enhanced ESLint configuration with security and best practice rules
- **Type Safety**: Strict TypeScript configuration with comprehensive type checking
- **Security**: Automated vulnerability scanning and dependency auditing
- **Code Analysis**: File size monitoring, complexity analysis, and import organization

### Build Artifacts
- Production builds are optimized with tree-shaking and minification
- Development builds include source maps for debugging
- Bundle analysis reports for performance monitoring
- Automated artifact upload for deployment

## Configuration
- **TypeScript:** Configured via `tsconfig.json` and `tsconfig.app.json`.
- **Path Aliases:** Use `@/` to reference `src/` (e.g., `@/components/ui/button`).
- **Environment Variables:**
  - Create a `.env` file for custom environment variables if needed (see [Vite env docs](https://vitejs.dev/guide/env-and-mode.html)).

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run tests and lint your code
5. Commit and push (`git commit -m 'Add feature' && git push`)
6. Open a pull request

## License
This project is licensed under the MIT License.
