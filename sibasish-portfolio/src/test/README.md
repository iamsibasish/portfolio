# Test Suite Documentation

This directory contains comprehensive tests for the Sibasish Portfolio application, covering all aspects of functionality, accessibility, and user experience.

## Test Files

### `comprehensive.test.jsx`
Main test suite covering:
- **Theme System Tests**: Theme context initialization, toggling, and persistence
- **Projects Component Tests**: Search functionality, carousel behavior, accessibility
- **Contact Component Tests**: Link validation, external link attributes, icons
- **Responsive Design Tests**: Viewport handling, mobile accessibility
- **External Links Validation**: Email, phone, and social media link formats
- **Performance Tests**: Rapid interactions, error handling
- **Accessibility Compliance**: ARIA attributes, keyboard navigation

### `setup.js`
Test environment configuration including:
- jsdom setup for browser environment simulation
- Mock implementations for browser APIs (matchMedia, localStorage, IntersectionObserver)
- Global test utilities and helpers

## Test Coverage

The test suite covers the requirements specified in task 12:

### ✅ Theme Context Functionality
- Theme initialization from system preferences
- Theme switching and persistence
- System preference detection
- Reduced motion support

### ✅ Responsive Behavior Testing
- Multiple viewport sizes (320px to 1440px)
- Mobile, tablet, and desktop breakpoints
- Touch interaction handling
- Keyboard navigation support

### ✅ Project Carousel Testing
- Search functionality
- Touch swipe gestures
- Keyboard navigation
- Auto-play behavior
- Navigation controls

### ✅ External Links Validation
- Email link format validation (`mailto:`)
- Phone link format validation (`tel:`)
- Social media links (LinkedIn, GitHub)
- External link security attributes (`target="_blank"`, `rel="noreferrer"`)

### ✅ Contact Functionality
- All contact methods present and functional
- Proper ARIA labels for accessibility
- Icon display and external link indicators
- Error handling for missing information

### ✅ Accessibility Compliance
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Semantic HTML structure
- Color contrast considerations (through theme system)

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test comprehensive

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Environment

- **Framework**: Vitest with jsdom environment
- **Testing Library**: @testing-library/react for component testing
- **Mocking**: Vitest mocks for external dependencies
- **Accessibility**: @testing-library/jest-dom for accessibility assertions

## Key Testing Strategies

1. **Component Isolation**: Each component is tested in isolation with mocked dependencies
2. **User-Centric Testing**: Tests focus on user interactions and expected behaviors
3. **Accessibility First**: All tests include accessibility checks
4. **Error Boundary Testing**: Components are tested for graceful error handling
5. **Performance Testing**: Rapid interactions and edge cases are covered

## Mock Strategy

- **Framer Motion**: Mocked to simple div elements to avoid animation complexity
- **Theme Utils**: Mocked to control theme behavior in tests
- **Browser APIs**: Comprehensive mocks for localStorage, matchMedia, etc.
- **External Components**: LazyImage and other complex components are mocked

## Continuous Integration

These tests are designed to run in CI environments and provide comprehensive coverage of the application's functionality, ensuring reliability and maintainability.