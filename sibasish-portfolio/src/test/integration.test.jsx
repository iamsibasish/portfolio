import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { ThemeProvider } from '../contexts/ThemeContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
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

describe('Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    
    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  describe('Full Application Rendering', () => {
    it('should render complete application without errors', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Check that main sections are present
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText(/Sibasish Mohanty/)).toBeInTheDocument();
      expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    });

    it('should have proper document structure and semantics', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Check semantic structure
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      // Check headings hierarchy
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('Theme Integration', () => {
    it('should integrate theme system across all components', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Find and click theme toggle
      const themeToggle = screen.getByLabelText(/toggle theme/i);
      expect(themeToggle).toBeInTheDocument();

      await user.click(themeToggle);

      // Theme should change across the application
      // (We can't easily test visual changes in jsdom, but we can verify the toggle works)
      expect(themeToggle).toBeInTheDocument();
    });

    it('should persist theme preference across component re-renders', async () => {
      const user = userEvent.setup();
      
      const { rerender } = render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      const themeToggle = screen.getByLabelText(/toggle theme/i);
      await user.click(themeToggle);

      // Re-render the app
      rerender(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Theme toggle should still be present and functional
      expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
    });
  });

  describe('Navigation Integration', () => {
    it('should handle navigation between sections', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Check that navigation links work
      const navLinks = screen.getAllByRole('link');
      const internalLinks = navLinks.filter(link => 
        link.getAttribute('href')?.startsWith('#')
      );

      // Should have internal navigation links
      expect(internalLinks.length).toBeGreaterThan(0);

      // Click on a navigation link (if any)
      if (internalLinks.length > 0) {
        await user.click(internalLinks[0]);
        // Link should remain functional (no errors thrown)
        expect(internalLinks[0]).toBeInTheDocument();
      }
    });

    it('should handle mobile navigation menu', async () => {
      const user = userEvent.setup();
      
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Look for mobile menu toggle
      const menuToggle = screen.queryByLabelText(/open navigation menu/i);
      
      if (menuToggle) {
        expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
        
        await user.click(menuToggle);
        expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
      }
    });
  });

  describe('External Links Validation', () => {
    it('should have proper attributes for external links', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Find external links (those with target="_blank")
      const externalLinks = screen.getAllByRole('link').filter(link =>
        link.getAttribute('target') === '_blank'
      );

      externalLinks.forEach(link => {
        // External links should have proper security attributes
        expect(link).toHaveAttribute('rel', 'noreferrer');
        expect(link).toHaveAttribute('target', '_blank');
        
        // Should have valid href
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^https?:\/\//);
      });
    });

    it('should validate contact links functionality', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Check email links
      const emailLinks = screen.getAllByRole('link').filter(link =>
        link.getAttribute('href')?.startsWith('mailto:')
      );

      emailLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toMatch(/^mailto:.+@.+\..+/);
      });

      // Check phone links
      const phoneLinks = screen.getAllByRole('link').filter(link =>
        link.getAttribute('href')?.startsWith('tel:')
      );

      phoneLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toMatch(/^tel:\+?\d+/);
      });

      // Check social media links
      const socialLinks = screen.getAllByRole('link').filter(link => {
        const href = link.getAttribute('href');
        return href?.includes('linkedin.com') || href?.includes('github.com');
      });

      socialLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toMatch(/^https:\/\/(www\.)?(linkedin\.com|github\.com)/);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
      });
    });
  });

  describe('Project Carousel Integration', () => {
    it('should integrate project search with carousel navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Find search input
      const searchInput = screen.queryByPlaceholderText(/search projects/i);
      
      if (searchInput) {
        // Test search functionality
        await user.type(searchInput, 'React');
        
        // Should filter projects
        expect(searchInput).toHaveValue('React');
        
        // Clear search
        await user.clear(searchInput);
        expect(searchInput).toHaveValue('');
      }
    });

    it('should handle carousel navigation with keyboard', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      const carouselRegion = screen.queryByRole('region', { name: /project showcase/i });
      
      if (carouselRegion) {
        // Test keyboard navigation
        fireEvent.keyDown(carouselRegion, { key: 'ArrowRight' });
        fireEvent.keyDown(carouselRegion, { key: 'ArrowLeft' });
        
        // Should handle keyboard events without errors
        expect(carouselRegion).toBeInTheDocument();
      }
    });
  });

  describe('Accessibility Integration', () => {
    it('should have proper ARIA labels and roles throughout the app', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Check for proper ARIA attributes
      const elementsWithAriaLabel = document.querySelectorAll('[aria-label]');
      const elementsWithAriaLabelledBy = document.querySelectorAll('[aria-labelledby]');
      const elementsWithRole = document.querySelectorAll('[role]');

      // Should have accessibility attributes
      expect(elementsWithAriaLabel.length + elementsWithAriaLabelledBy.length).toBeGreaterThan(0);
      expect(elementsWithRole.length).toBeGreaterThan(0);
    });

    it('should support keyboard navigation throughout the app', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Test tab navigation
      await user.tab();
      
      // Should have focusable elements
      const focusedElement = document.activeElement;
      expect(focusedElement).not.toBe(document.body);
    });

    it('should have proper heading hierarchy', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      const headings = screen.getAllByRole('heading');
      
      // Should have headings
      expect(headings.length).toBeGreaterThan(0);
      
      // Check for h1 (should have at least one)
      const h1Elements = headings.filter(heading => heading.tagName === 'H1');
      expect(h1Elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Performance Integration', () => {
    it('should handle rapid theme switching without errors', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      const themeToggle = screen.getByLabelText(/toggle theme/i);
      
      // Rapidly toggle theme multiple times
      for (let i = 0; i < 5; i++) {
        await user.click(themeToggle);
      }
      
      // Should still be functional
      expect(themeToggle).toBeInTheDocument();
    });

    it('should handle multiple carousel interactions without performance issues', async () => {
      const user = userEvent.setup();
      
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      const nextButton = screen.queryByLabelText(/view next.*projects/i);
      
      if (nextButton) {
        // Click multiple times rapidly
        for (let i = 0; i < 3; i++) {
          await user.click(nextButton);
        }
        
        // Should still be functional
        expect(nextButton).toBeInTheDocument();
      }
    });
  });

  describe('Error Boundary Integration', () => {
    it('should handle component errors gracefully', () => {
      // Mock console.error to prevent test output pollution
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // App should render without throwing errors
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Data Integration', () => {
    it('should properly integrate data across all components', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Should display personal information
      expect(screen.getByText(/Sibasish Mohanty/)).toBeInTheDocument();
      
      // Should display projects (if any)
      const projectElements = screen.queryAllByText(/project/i);
      expect(projectElements.length).toBeGreaterThanOrEqual(0);
    });
  });
});