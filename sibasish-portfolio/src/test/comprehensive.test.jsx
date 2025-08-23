import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import * as themeUtils from '../utils/themeUtils';

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
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
}));

// Mock LazyImage
vi.mock('../components/LazyImage', () => ({
  default: ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} data-testid="lazy-image" />
  ),
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

describe('Comprehensive Testing Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    
    // Reset matchMedia mock
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  describe('Theme System Tests', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <button onClick={toggleTheme} data-testid="toggle">Toggle</button>
        </div>
      );
    };

    it('should initialize theme context correctly', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });

    it('should toggle theme when button is clicked', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle');
      fireEvent.click(toggleButton);

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('should call theme utility functions', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(themeUtils.getSystemPreference).toHaveBeenCalled();
      expect(themeUtils.applyTheme).toHaveBeenCalled();
    });
  });

  describe('Projects Component Tests', () => {
    it('should render projects component without errors', () => {
      render(<Projects />);
      
      expect(screen.getByPlaceholderText(/search projects/i)).toBeInTheDocument();
      expect(screen.getByRole('region', { name: /project showcase/i })).toBeInTheDocument();
    });

    it('should display search functionality', () => {
      render(<Projects />);
      
      const searchInput = screen.getByPlaceholderText(/search projects/i);
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('id', 'project-search');
    });

    it('should have proper accessibility attributes', () => {
      render(<Projects />);
      
      // Check for ARIA labels
      expect(screen.getByLabelText(/search projects/i)).toBeInTheDocument();
      expect(screen.getByRole('region', { name: /project showcase/i })).toBeInTheDocument();
      
      // Check for screen reader help text
      expect(screen.getByText(/search through.*projects/i)).toBeInTheDocument();
    });

    it('should handle keyboard events on carousel', () => {
      render(<Projects />);
      
      const carouselWrapper = screen.getByRole('region', { name: /project showcase/i });
      
      // Should not throw errors when handling keyboard events
      expect(() => {
        fireEvent.keyDown(carouselWrapper, { key: 'ArrowRight' });
        fireEvent.keyDown(carouselWrapper, { key: 'ArrowLeft' });
      }).not.toThrow();
    });

    it('should handle touch events on carousel', () => {
      render(<Projects />);
      
      const carouselWrapper = screen.getByRole('region', { name: /project showcase/i });
      
      // Should not throw errors when handling touch events
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

  describe('Contact Component Tests', () => {
    const mockContactInfo = {
      email: 'test@example.com',
      phone: '+1234567890',
      linkedin: 'https://linkedin.com/in/testuser',
      github: 'https://github.com/testuser'
    };

    it('should render contact component with all buttons', () => {
      render(<Contact contactInfo={mockContactInfo} />);
      
      expect(screen.getByText("Let's Connect")).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
    });

    it('should have correct href attributes', () => {
      render(<Contact contactInfo={mockContactInfo} />);
      
      const emailLink = screen.getByLabelText(/send email/i);
      const phoneLink = screen.getByLabelText(/call/i);
      
      expect(emailLink).toHaveAttribute('href', `mailto:${mockContactInfo.email}`);
      expect(phoneLink).toHaveAttribute('href', `tel:${mockContactInfo.phone}`);
    });

    it('should have proper external link attributes', () => {
      render(<Contact contactInfo={mockContactInfo} />);
      
      const linkedinLink = screen.getByLabelText(/linkedin.*new tab/i);
      const githubLink = screen.getByLabelText(/github.*new tab/i);
      
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noreferrer');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noreferrer');
    });

    it('should display contact icons', () => {
      render(<Contact contactInfo={mockContactInfo} />);
      
      // Check that emoji icons are present
      expect(screen.getByText('📧')).toBeInTheDocument();
      expect(screen.getByText('💼')).toBeInTheDocument();
      expect(screen.getByText('🔗')).toBeInTheDocument();
      expect(screen.getByText('📞')).toBeInTheDocument();
    });
  });

  describe('Responsive Design Tests', () => {
    const mockViewport = (width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      fireEvent(window, new Event('resize'));
    };

    it('should handle different viewport sizes', () => {
      const viewports = [320, 768, 1024, 1440];
      
      viewports.forEach(width => {
        mockViewport(width);
        
        const { unmount } = render(<Projects />);
        
        // Should render without errors at any viewport size
        expect(screen.getByRole('region', { name: /project showcase/i })).toBeInTheDocument();
        
        unmount();
      });
    });

    it('should maintain accessibility across breakpoints', () => {
      mockViewport(375); // Mobile
      
      render(<Projects />);
      
      // Accessibility features should work on mobile
      expect(screen.getByLabelText(/search projects/i)).toBeInTheDocument();
      expect(screen.getByRole('region', { name: /project showcase/i })).toBeInTheDocument();
    });
  });

  describe('External Links Validation', () => {
    const mockContactInfo = {
      email: 'test@example.com',
      phone: '+1234567890',
      linkedin: 'https://linkedin.com/in/testuser',
      github: 'https://github.com/testuser'
    };

    it('should validate email link format', () => {
      render(<Contact contactInfo={mockContactInfo} />);
      
      const emailLink = screen.getByLabelText(/send email/i);
      const href = emailLink.getAttribute('href');
      
      expect(href).toMatch(/^mailto:.+@.+\..+/);
    });

    it('should validate phone link format', () => {
      render(<Contact contactInfo={mockContactInfo} />);
      
      const phoneLink = screen.getByLabelText(/call/i);
      const href = phoneLink.getAttribute('href');
      
      expect(href).toMatch(/^tel:\+?\d+/);
    });

    it('should validate social media links', () => {
      render(<Contact contactInfo={mockContactInfo} />);
      
      const linkedinLink = screen.getByLabelText(/linkedin.*new tab/i);
      const githubLink = screen.getByLabelText(/github.*new tab/i);
      
      expect(linkedinLink.getAttribute('href')).toMatch(/^https:\/\/linkedin\.com/);
      expect(githubLink.getAttribute('href')).toMatch(/^https:\/\/github\.com/);
    });
  });

  describe('Performance and Error Handling', () => {
    it('should handle rapid theme changes', () => {
      const TestComponent = () => {
        const { toggleTheme } = useTheme();
        return <button onClick={toggleTheme} data-testid="toggle">Toggle</button>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle');
      
      // Rapidly toggle theme multiple times
      for (let i = 0; i < 5; i++) {
        fireEvent.click(toggleButton);
      }
      
      // Should not throw errors
      expect(toggleButton).toBeInTheDocument();
    });

    it('should handle missing contact information gracefully', () => {
      const incompleteContactInfo = {
        email: 'test@example.com',
        // Missing other fields
      };
      
      expect(() => {
        render(<Contact contactInfo={incompleteContactInfo} />);
      }).not.toThrow();
    });

    it('should handle component rendering errors gracefully', () => {
      // Mock console.error to prevent test output pollution
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<Projects />);
      }).not.toThrow();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Theme Persistence Tests', () => {
    it('should save theme to localStorage', () => {
      themeUtils.saveTheme.mockImplementation((theme) => {
        localStorage.setItem('portfolio-theme', theme);
      });
      
      themeUtils.getSavedTheme.mockImplementation(() => {
        return localStorage.getItem('portfolio-theme');
      });

      const TestComponent = () => {
        const { theme, toggleTheme } = useTheme();
        return (
          <div>
            <div data-testid="theme">{theme}</div>
            <button onClick={toggleTheme} data-testid="toggle">Toggle</button>
          </div>
        );
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle');
      fireEvent.click(toggleButton);

      expect(themeUtils.saveTheme).toHaveBeenCalled();
    });
  });

  describe('Accessibility Compliance Tests', () => {
    it('should have proper ARIA attributes in Projects component', () => {
      render(<Projects />);
      
      // Check for proper ARIA labels
      const searchInput = screen.getByLabelText(/search projects/i);
      expect(searchInput).toHaveAttribute('aria-describedby');
      
      const carousel = screen.getByRole('region', { name: /project showcase/i });
      expect(carousel).toHaveAttribute('aria-live', 'polite');
    });

    it('should have proper ARIA attributes in Contact component', () => {
      const mockContactInfo = {
        email: 'test@example.com',
        phone: '+1234567890',
        linkedin: 'https://linkedin.com/in/testuser',
        github: 'https://github.com/testuser'
      };

      render(<Contact contactInfo={mockContactInfo} />);
      
      // All contact buttons should have proper ARIA labels
      expect(screen.getByLabelText(/send email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/call/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/linkedin.*new tab/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/github.*new tab/i)).toBeInTheDocument();
    });

    it('should support keyboard navigation', () => {
      render(<Projects />);
      
      const searchInput = screen.getByLabelText(/search projects/i);
      
      // Should be focusable
      searchInput.focus();
      expect(document.activeElement).toBe(searchInput);
    });
  });
});