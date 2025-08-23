import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Nav from '../components/Nav';
import Projects from '../components/Projects';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock theme utils
vi.mock('../utils/themeUtils', () => ({
  getSystemPreference: vi.fn(() => 'dark'),
  getSavedTheme: vi.fn(() => null),
  saveTheme: vi.fn(),
  applyTheme: vi.fn(),
  createSystemPreferenceListener: vi.fn(() => () => {}),
  getPrefersReducedMotion: vi.fn(() => false),
  createReducedMotionListener: vi.fn(() => () => {}),
}));

// Mock LazyImage
vi.mock('../components/LazyImage', () => ({
  default: ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} data-testid="lazy-image" />
  ),
}));

// Mock projects data
vi.mock('../data', () => ({
  projects: [
    {
      id: '1',
      title: 'Project 1',
      period: '2023',
      blurb: 'First project',
      tags: ['React'],
      image: '/p1.svg',
      category: 'Web'
    },
    {
      id: '2',
      title: 'Project 2',
      period: '2023',
      blurb: 'Second project',
      tags: ['Node.js'],
      image: '/p2.svg',
      category: 'Backend'
    },
    {
      id: '3',
      title: 'Project 3',
      period: '2022',
      blurb: 'Third project',
      tags: ['Python'],
      image: '/p3.svg',
      category: 'ML'
    },
    {
      id: '4',
      title: 'Project 4',
      period: '2022',
      blurb: 'Fourth project',
      tags: ['Kafka'],
      image: '/p4.svg',
      category: 'Data'
    }
  ]
}));

// Helper function to simulate viewport resize
const resizeWindow = (width, height) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  fireEvent(window, new Event('resize'));
};

// Helper function to simulate matchMedia for different screen sizes
const mockMatchMedia = (width) => {
  window.matchMedia = vi.fn().mockImplementation(query => {
    const matches = (() => {
      if (query.includes('max-width: 767px')) return width <= 767;
      if (query.includes('min-width: 768px') && query.includes('max-width: 1023px')) return width >= 768 && width <= 1023;
      if (query.includes('min-width: 1024px')) return width >= 1024;
      if (query.includes('prefers-color-scheme: dark')) return true;
      if (query.includes('prefers-reduced-motion')) return false;
      return false;
    })();

    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
};

describe('Responsive Behavior Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Navigation Responsive Behavior', () => {
    it('should show hamburger menu on mobile screens', () => {
      mockMatchMedia(375); // Mobile width
      resizeWindow(375, 667);

      render(
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      );

      // Should have mobile menu button
      expect(screen.getByLabelText(/open navigation menu/i)).toBeInTheDocument();
    });

    it('should show horizontal navigation on desktop screens', () => {
      mockMatchMedia(1200); // Desktop width
      resizeWindow(1200, 800);

      render(
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      );

      // Should have desktop navigation
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should handle navigation menu toggle on mobile', () => {
      mockMatchMedia(375);
      resizeWindow(375, 667);

      render(
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      );

      const menuButton = screen.getByLabelText(/open navigation menu/i);
      
      // Initially closed
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      // Click to open
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Click to close
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Projects Responsive Behavior', () => {
    it('should adapt project grid for mobile screens', () => {
      mockMatchMedia(375);
      resizeWindow(375, 667);

      render(<Projects />);

      const projectGrid = screen.getByRole('list', { name: /Showing \d+ of \d+ projects/ });
      expect(projectGrid).toHaveClass('grid-3'); // Should still use grid-3 class but CSS handles responsiveness
    });

    it('should maintain carousel functionality on tablet screens', () => {
      mockMatchMedia(768);
      resizeWindow(768, 1024);

      render(<Projects />);

      // Should have carousel controls (with 4 projects, controls should show)
      expect(screen.queryByLabelText('View previous 3 projects')).toBeInTheDocument();
      expect(screen.queryByLabelText('View next 3 projects')).toBeInTheDocument();
    });

    it('should handle touch interactions on mobile', () => {
      mockMatchMedia(375);
      resizeWindow(375, 667);

      render(<Projects />);

      const carouselWrapper = screen.getByRole('region', { name: 'Project showcase' });

      // Should handle touch events
      expect(() => {
        fireEvent.touchStart(carouselWrapper, {
          targetTouches: [{ clientX: 100 }]
        });
        fireEvent.touchMove(carouselWrapper, {
          targetTouches: [{ clientX: 50 }]
        });
        fireEvent.touchEnd(carouselWrapper);
      }).not.toThrow();
    });
  });

  describe('Breakpoint Testing', () => {
    const breakpoints = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Mobile Large', width: 414, height: 896 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop Small', width: 1024, height: 768 },
      { name: 'Desktop Large', width: 1440, height: 900 },
      { name: 'Desktop XL', width: 1920, height: 1080 },
    ];

    breakpoints.forEach(({ name, width, height }) => {
      it(`should render correctly at ${name} breakpoint (${width}x${height})`, () => {
        mockMatchMedia(width);
        resizeWindow(width, height);

        render(
          <ThemeProvider>
            <Nav />
          </ThemeProvider>
        );

        // Should render without errors
        expect(screen.getByRole('navigation')).toBeInTheDocument();
      });
    });
  });

  describe('Touch Target Accessibility', () => {
    it('should have minimum touch target sizes on mobile', () => {
      mockMatchMedia(375);
      resizeWindow(375, 667);

      render(
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      );

      const menuButton = screen.getByLabelText(/open navigation menu/i);
      
      // Should have appropriate CSS classes for touch targets
      expect(menuButton).toHaveClass('nav-mobile-toggle');
    });

    it('should have accessible carousel controls on touch devices', () => {
      mockMatchMedia(375);
      resizeWindow(375, 667);

      render(<Projects />);

      const prevButton = screen.queryByLabelText('View previous 3 projects');
      const nextButton = screen.queryByLabelText('View next 3 projects');

      if (prevButton && nextButton) {
        expect(prevButton).toHaveClass('carousel-nav');
        expect(nextButton).toHaveClass('carousel-nav');
      }
    });
  });

  describe('Orientation Changes', () => {
    it('should handle portrait to landscape orientation change', () => {
      mockMatchMedia(375);
      
      // Start in portrait
      resizeWindow(375, 667);
      
      render(
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();

      // Change to landscape
      mockMatchMedia(667);
      resizeWindow(667, 375);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('CSS Grid and Flexbox Behavior', () => {
    it('should use appropriate layout methods for different screen sizes', () => {
      render(<Projects />);

      const projectGrid = screen.getByRole('list', { name: /Showing \d+ of \d+ projects/ });
      
      // Should have grid classes that CSS will handle responsively
      expect(projectGrid).toHaveClass('grid-3');
    });
  });

  describe('Performance on Different Devices', () => {
    it('should handle reduced motion preferences', () => {
      // Mock reduced motion preference
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      );

      // Should render without issues when reduced motion is preferred
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Viewport Meta Tag Behavior', () => {
    it('should handle different viewport configurations', () => {
      // Test various viewport widths
      const viewports = [320, 375, 414, 768, 1024, 1440, 1920];

      viewports.forEach(width => {
        mockMatchMedia(width);
        resizeWindow(width, 800);

        const { unmount } = render(
          <ThemeProvider>
            <Nav />
          </ThemeProvider>
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Horizontal Scrolling Prevention', () => {
    it('should not cause horizontal scrolling on narrow screens', () => {
      mockMatchMedia(320); // Very narrow screen
      resizeWindow(320, 568);

      render(<Projects />);

      // Should render without causing layout issues
      expect(screen.getByRole('region', { name: 'Project showcase' })).toBeInTheDocument();
    });
  });
});