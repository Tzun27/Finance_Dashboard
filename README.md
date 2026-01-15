# 📊 Finance Visualizer

A modern, interactive web application for visualizing and planning your financial future. Built with Next.js 15, TypeScript, and shadcn/ui components.

## ✨ Features

### 🧮 Compound Interest Calculator
- **Interactive visualization** with real-time chart updates
- **Multiple compounding frequencies** (Annual vs Monthly)
- **Risk scenarios** with variance analysis (+/- rate adjustments)
- **Baseline comparison** showing savings without interest
- **Professional tooltips** with detailed breakdowns
- **Responsive design** that scales beautifully across all devices

### 🏠 Mortgage Calculator
- **Comprehensive inputs** for home price, down payment, rates, and terms
- **Detailed cost breakdown** including property tax, insurance, and HOA
- **Amortization schedule** with monthly/yearly views and interactive charts
- **Extra payment analysis** to visualize savings from pre-payments
- **Smart validation** to ensure realistic financial projections

### 💱 Currency Converter
- **Real-time exchange rates** powered by FxRatesAPI
- **Live historical trends** visualized with custom interactive SVG charts
- **Smart caching** and debounced updates for performance
- **Min/Max/Avg statistics** for selected currency pairs
- **Popular currency pairs** dashboard with live updates

### 🎨 Modern UI/UX
- **Clean, intuitive interface** built with shadcn/ui components
- **Dark/light theme support** using CSS variables
- **Smooth animations** and hover effects
- **Mobile-first responsive design**
- **Professional typography** with optimized fonts

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** and npm/yarn/pnpm/bun
- **Docker** (optional, for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/finance_visualizer.git
   cd finance_visualizer/finance-dashboard
   ```

2. **Setup environment variables**
   
   Copy `.env.example` and create `.env.local`:
   ```bash
   NEXT_PUBLIC_FX_RATES_API_KEY=your_api_key_here
   ```

3. **Install dependencies and run**
   ```bash
   npm install
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

### Docker Deployment

**Quick Start:**
```bash
# Using Docker Compose (recommended)
docker-compose up

# Or using Docker CLI
docker build -t finance-dashboard .
docker run -p 3000:3000 --env-file .env.local finance-dashboard
```

**Environment Variables:**
- The `docker-compose.yml` automatically loads `.env.local`
- For production, use cloud platform environment configuration (Google Cloud Run, AWS, etc.)
- Never commit API keys to version control

**Multi-Stage Build:**
The Dockerfile uses a 3-stage build optimized for production:
- **Stage 1 (deps)**: Production dependencies only
- **Stage 2 (builder)**: Builds the application with all dev dependencies
- **Stage 3 (runner)**: Minimal production image (~150MB) with non-root user

See `.dockerignore` for excluded files from the build context.

## 🧪 Testing

The project uses **Vitest** for robust unit testing to ensure calculation accuracy.

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui
```

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - UI library with latest features
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components & Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Recharts](https://recharts.org/)** - Composable charting library

### Development & Testing
- **[Vitest](https://vitest.dev/)** - Blazing fast unit test framework
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS post-processing
- **[Geist Font](https://vercel.com/font)** - Modern typography

## 🔧 Development

### Project Structure
```
finance-dashboard/
├── app/                    # Next.js App Router
│   ├── pages/             # Page components
│   │   └── landing/       # Landing page sections
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── helper_functions/ # Utility components
├── lib/                  # Utility functions
└── public/              # Static assets
```

### Available Scripts

**Development:**
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI

**Docker:**
- `docker-compose up` - Build and run with Docker Compose
- `docker-compose down` - Stop and remove containers
- `docker build -t finance-dashboard .` - Build Docker image

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[shadcn](https://twitter.com/shadcn)** for the excellent UI component library
- **[Vercel](https://vercel.com)** for Next.js and deployment platform
- **[Tailwind Labs](https://tailwindlabs.com)** for the utility-first CSS framework
- **[Recharts](https://recharts.org)** for the powerful charting library

## 📧 Contact

If you have any questions or suggestions, feel free to reach out or open an issue on GitHub.

---

**Get rich together.**