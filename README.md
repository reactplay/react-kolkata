# 🚀 React Kolkata

**Building a thriving React developer community in Kolkata and beyond**

React Kolkata is a vibrant, community-driven organization dedicated to empowering React developers through knowledge sharing, collaboration, and career growth. We create an inclusive space where developers of all levels can learn, grow, and contribute to the React ecosystem.

## 🌟 About Our Community

We are passionate about fostering a supportive environment for React developers in Kolkata and the surrounding regions. Our mission is to bridge the gap between learning and practical application while building meaningful connections within the developer community.

### Our Mission

Empower developers through events, workshops, and mentorship while fostering an inclusive, welcoming community for continuous learning and growth.

### Our Values

- **Openness**: Sharing knowledge freely and transparently
- **Inclusivity**: Welcoming developers from all backgrounds and skill levels
- **Continuous Learning**: Staying current with React ecosystem developments
- **Community First**: Supporting each other's professional journey and growth

## 🎯 What We Do

### Technical Workshops

Hands-on coding sessions covering the latest React patterns, tools, and best practices to keep you at the forefront of modern development.

### Community Meetups

Regular gatherings to network, share experiences, and learn from fellow developers in a relaxed, collaborative environment.

### Lightning Talks

Quick, focused presentations on specific topics, tips, and emerging technologies that matter to React developers.

### Project Showcases

A platform for members to demo their projects, get constructive feedback, and inspire others with innovative solutions.

### Mentorship Program

Connect experienced developers with newcomers for guidance, career support, and knowledge transfer.

### Open Source Contributions

Collaborative projects and contributions to the broader React ecosystem, helping members build their open source portfolios.

## 🛠 This Website

This repository contains the source code for the React Kolkata community website, built with modern web technologies to showcase our community and provide resources for members.

### 🛠 Technical Stack

- **Next.js 15**: React framework with server-side rendering and modern features
- **React 19**: Latest React with concurrent features and improved performance
- **TypeScript**: Static typing for enhanced developer experience and code quality
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Smooth animations and interactive components
- **next-intl**: Internationalization support for multiple languages
- **Radix UI**: Accessible, unstyled UI components
- **ESLint & Prettier**: Code quality and formatting standards
- **Husky**: Git hooks for maintaining code quality
- **Playwright**: End-to-end testing across multiple browsers
- **Vitest**: Fast unit and integration testing
- **Docker**: Containerized development and deployment

## 🚀 Getting Started (For Contributors)

### Prerequisites

- Node.js 18 or later
- npm or pnpm
- Git

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/reactplay/react-kolkata.git
   cd react-kolkata
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### Using Docker (Alternative)

If you prefer using Docker for development:

```bash
docker-compose up
```

This command will:

1. Build the application container
2. Install all dependencies
3. Start the development server
4. Make the application available on localhost:3000

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run unit tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright

## 🌐 Internationalization (i18n)

The website supports multiple languages using next-intl, making it accessible to a broader audience.

### Features

- Route-based locale handling with `/[locale]/` directory structure
- Easy-to-use translation hooks with `useTranslations` in server and client components
- Support for English and French (extensible to other languages)

### Translation Files

Translation files are located in the `content/` directory:

```bash
content/
  ├── en.json
  ├── fr.json
  └── [other-locales].json
```

#### Adding New Language Support

1. **Create a new translation file** in the `content/` directory (e.g., `content/hi.json` for Hindi)

2. **Update the locales configuration** in `src/config/i18n/navigation.ts`:

```typescript
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fr", "hi"], // Add the new language code here

  // Used when no locale matches
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

#### Using Translations in Components

To use translations in both **client and server** components:

1. **Import the hook:**

   ```javascript
   import { useTranslations } from "next-intl";
   ```

2. **Initialize with a section:**

   ```javascript
   const t = useTranslations("Home");
   ```

3. **Use in your component:**
   ```javascript
   <h1>{t("welcomeMessage")}</h1>
   ```

## 🧪 Testing

### Playwright E2E Testing

The project includes comprehensive end-to-end testing with Playwright for robust testing across multiple browsers.

#### Features

- **Headless and UI Testing**: Run tests in both headless mode for automation and UI mode for debugging
- **Cross-Browser Compatibility**: Test on Chromium, Firefox, and WebKit
- **API and Component Testing**: Supports API calls and frontend component interactions

#### Running Playwright Tests

```shell
npm run test:e2e
```

#### Setup Playwright (first time)

```shell
npm run test:e2e:setup
```

#### Configuration

Test settings are defined in `playwright.config.ts`

#### Test Files

Playwright tests are located in `__tests__/e2e/`

## Vitest Unit & Integration Testing

Fast and efficient unit and integration testing with Vitest.

#### Features

- **Lightning-Fast Execution**: Runs tests in parallel for optimal speed
- **JSDOM Environment**: Simulates browser environment for React components
- **TypeScript Support**: Full TypeScript compatibility for type-safe testing
- **Mocking & Snapshot Testing**: Supports API mocking and UI snapshots

#### Running Vitest Tests

```shell
npm test
```

#### Watch Mode

```shell
npm run test:watch
```

#### Configuration

Test settings are defined in `vitest.config.mts`

## 📁 Project Structure

```bash
.
├── __tests__/              # Test files
│   └── e2e/               # Playwright E2E tests
├── content/               # i18n translation files
├── public/                # Static assets
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── base/
│   │   └── constants/    # Application constants
│   ├── components/       # Reusable UI components
│   │   ├── custom/       # Custom components
│   │   └── ui/          # Base UI components (buttons, inputs, etc.)
│   ├── config/          # Configuration files
│   │   └── i18n/        # Internationalization config
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries and configurations
│   ├── modules/         # Feature-specific modules/sections
│   └── utils/           # Utility functions
├── styles/              # Global styles and CSS
└── types/               # TypeScript type definitions
```

### Key Directories

- **`src/app/`** - Next.js App Router with pages, layouts, and routing
- **`src/components/`** - Reusable UI components organized by type
- **`src/modules/`** - Feature-specific sections (e.g., home page sections)
- **`src/base/constants/`** - Application constants and configuration data
- **`content/`** - Translation files for internationalization
- **`__tests__/`** - Test files for both unit and E2E testing

## 📋 Development Conventions

### General Naming Conventions

- **Files & Folders**: kebab-case (e.g., `my-component`, `user-profile.tsx`)
- **Functions & Variables**: camelCase (e.g., `getUserData`, `isLoading`)
- **Components**: PascalCase (e.g., `UserProfile`, `NavigationBar`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)
- **Types**: PascalCase with `.d.ts` extension (e.g., `UserProfile` in `types.d.ts`)

### Component Organization

- **UI Components**: Generic components in `src/components/ui/`
- **Custom Components**: Feature-specific components in `src/components/custom/`
- **Module Components**: Page-section components in `src/modules/[feature]/`
- **Export Pattern**: Each component folder has an `index.ts` for clean imports

### Code Style

- **Arrow Functions**: Preferred over function declarations
- **TypeScript**: Strict typing throughout the codebase
- **Imports**: Organized using the Prettier sort imports plugin
- **CSS**: Tailwind CSS utilities with consistent spacing and naming

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Whether you're fixing bugs, adding features, improving documentation, or sharing ideas, your contributions help make our community stronger.

### How to Contribute

1. **Fork the repository** and create your feature branch
2. **Follow our development conventions** outlined above
3. **Write tests** for any new functionality
4. **Ensure code quality** by running linters and tests
5. **Submit a pull request** with a clear description of your changes

### Ways to Get Involved

- 🐛 **Report bugs** or suggest improvements via GitHub issues
- 💡 **Propose new features** that benefit the community
- 📚 **Improve documentation** to help other contributors
- 🎨 **Enhance UI/UX** to make the website more engaging
- 🌐 **Add translations** to make the site accessible to more developers

### Code Quality Standards

Before submitting your contribution:

```bash
npm run lint          # Check code style
npm run format        # Format code
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
```

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

Please also read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## 🌍 Join Our Community

### Connect With Us

- **GitHub**: [React Kolkata Repository](https://github.com/reactplay/react-kolkata)
- **Events**: Follow our GitHub for announcements about upcoming meetups and workshops
- **Discussions**: Participate in community discussions and knowledge sharing

### Get Involved

- **Attend Meetups**: Join our regular community gatherings and networking events
- **Share Your Work**: Present your projects during our showcase sessions
- **Mentor Others**: Help newcomers learn and grow in their React journey
- **Contribute**: Help improve our website and community resources
- **Spread the Word**: Tell other developers about React Kolkata

## 🙏 Acknowledgements

This project is built with amazing open source technologies:

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with static type definitions
- **[Framer Motion](https://www.framer.com/motion/)** - A production-ready motion library for React
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization for Next.js
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Playwright](https://playwright.dev/)** - End-to-end testing framework
- **[Vitest](https://vitest.dev/)** - A blazing fast unit test framework

Special thanks to all the contributors who help maintain and improve this community resource!

---

**Made with ❤️ by the React Kolkata Community**
