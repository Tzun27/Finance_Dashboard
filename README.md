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

### 🎨 Modern UI/UX
- **Clean, intuitive interface** built with shadcn/ui components
- **Dark/light theme support** using CSS variables
- **Smooth animations** and hover effects
- **Mobile-first responsive design**
- **Professional typography** with optimized fonts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/finance_visualizer.git
   cd finance_visualizer/finance-dashboard
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

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

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

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS post-processing
- **[Geist Font](https://vercel.com/font)** - Modern typography

## 📊 Chart Features

### Interactive Visualizations
- **Primary Line**: Compound interest growth (thick, prominent)
- **Baseline**: Simple savings without interest (dashed)
- **Variance Lines**: Risk scenarios (green/red, conditional)
- **Responsive Scaling**: Charts adapt to container size
- **Custom Tooltips**: Detailed hover information

### Calculation Methods
- **Annual compounding**: Simple year-over-year growth where only money present at year start earns interest
- **Monthly compounding**: Uses standard compound interest formula `FV = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^nt - 1) / (r/n))`
- **Real-time updates** as inputs change
- **Variance modeling** for risk scenario analysis

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
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

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