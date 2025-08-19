# Technology Stack

## Build System & Framework
- **Vite** - Fast build tool and dev server
- **React 18** - Component-based UI library
- **ES Modules** - Modern JavaScript module system

## Key Dependencies
- **framer-motion** (v11.2.6) - Animation library for smooth transitions and effects
- **@vitejs/plugin-react** - Vite plugin for React support

## Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Code Style & Patterns
- **Functional Components** - Use React function components exclusively
- **ES6+ Syntax** - Modern JavaScript features (arrow functions, destructuring, template literals)
- **CSS Custom Properties** - Use CSS variables defined in :root for theming
- **Component Props** - Pass data via props, destructure in function parameters
- **Named Exports** - Use named exports for data and components
- **Inline Styles** - Minimal inline styles, prefer CSS classes

## Animation Guidelines
- Use framer-motion for page transitions and component animations
- Keep animations subtle and performance-focused
- Standard animation duration: 0.6s with staggered delays (0.1s)
- Use opacity and transform properties for smooth effects

## Styling Approach
- Single CSS file (styles.css) with utility-first approach
- Dark theme with glassmorphism effects
- CSS Grid and Flexbox for layouts
- Responsive design with mobile-first breakpoints
- Custom CSS properties for consistent theming