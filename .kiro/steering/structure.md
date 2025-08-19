# Project Structure

## Root Directory
```
sibasish-portfolio/
├── public/           # Static assets
├── src/             # Source code
├── package.json     # Dependencies and scripts
├── vite.config.js   # Vite configuration
└── index.html       # Entry HTML file
```

## Source Organization
```
src/
├── App.jsx          # Main application component
├── main.jsx         # React app entry point
├── styles.css       # Global styles and theme
├── data.js          # Portfolio content and data
├── components/      # Reusable UI components
│   ├── Hero.jsx     # Landing hero section
│   ├── Nav.jsx      # Navigation component
│   ├── Projects.jsx # Projects showcase
│   ├── Section.jsx  # Generic section wrapper
│   └── Timeline.jsx # Experience timeline
└── assets/          # Local assets (currently empty)
```

## Public Assets
```
public/
├── favicon.svg      # Site favicon
├── p1.svg          # Project 1 thumbnail
├── p2.svg          # Project 2 thumbnail
└── p3.svg          # Project 3 thumbnail
```

## Architecture Patterns

### Data Layer
- **Centralized Data** - All content stored in `src/data.js`
- **Structured Exports** - Separate exports for `me`, `projects`, `experience`, `education`
- **Static Content** - No external APIs or dynamic data fetching

### Component Structure
- **Single Responsibility** - Each component handles one UI concern
- **Props-Based** - Components receive data via props from parent
- **Composition** - App.jsx composes all sections using reusable components
- **No State Management** - Simple prop drilling, no Redux/Context needed

### File Naming
- **PascalCase** - Component files use PascalCase (Hero.jsx, Nav.jsx)
- **camelCase** - Data and utility files use camelCase (data.js, main.jsx)
- **Descriptive Names** - File names clearly indicate component purpose

### Import Conventions
- **Relative Imports** - Use relative paths for local components
- **Named Imports** - Import specific items from data.js
- **Default Exports** - Components use default exports