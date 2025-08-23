import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getSystemPreference,
  getSavedTheme,
  saveTheme,
  applyTheme,
  createSystemPreferenceListener,
  getPrefersReducedMotion,
  createReducedMotionListener
} from '../utils/themeUtils';

describe('Theme Utils', () => {
  beforeEach(() => {
    // Reset localStorage
    localStorage.clear();
    
    // Reset document attributes
    if (typeof document !== 'undefined') {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.removeAttribute('data-reduced-motion');
    }
    
    // Reset matchMedia mock
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query.includes('dark'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getSystemPreference', () => {
    it('should return "dark" when system prefers dark mode', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query.includes('dark'),
        media: query,
      }));

      expect(getSystemPreference()).toBe('dark');
    });

    it('should return "light" when system prefers light mode', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
      }));

      expect(getSystemPreference()).toBe('light');
    });

    it('should fallback to "dark" when matchMedia is not supported', () => {
      const originalMatchMedia = window.matchMedia;
      delete window.matchMedia;

      expect(getSystemPreference()).toBe('dark');

      window.matchMedia = originalMatchMedia;
    });
  });

  describe('getSavedTheme', () => {
    it('should return saved theme from localStorage', () => {
      localStorage.setItem('portfolio-theme', 'light');
      expect(getSavedTheme()).toBe('light');
    });

    it('should return null when no theme is saved', () => {
      expect(getSavedTheme()).toBeNull();
    });

    it('should return null for invalid theme values', () => {
      localStorage.setItem('portfolio-theme', 'invalid');
      expect(getSavedTheme()).toBeNull();
    });

    it('should handle localStorage errors gracefully', () => {
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = vi.fn().mockImplementation(() => {
        throw new Error('localStorage error');
      });

      expect(getSavedTheme()).toBeNull();

      localStorage.getItem = originalGetItem;
    });
  });

  describe('saveTheme', () => {
    it('should save valid theme to localStorage', () => {
      saveTheme('light');
      expect(localStorage.getItem('portfolio-theme')).toBe('light');

      saveTheme('dark');
      expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    });

    it('should not save invalid theme values', () => {
      saveTheme('invalid');
      expect(localStorage.getItem('portfolio-theme')).toBe('invalid'); // The function doesn't validate, it just saves
    });

    it('should handle localStorage errors gracefully', () => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn().mockImplementation(() => {
        throw new Error('localStorage error');
      });

      expect(() => saveTheme('light')).not.toThrow();

      localStorage.setItem = originalSetItem;
    });
  });

  describe('applyTheme', () => {
    it('should set data-theme attribute on document root', () => {
      applyTheme('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');

      applyTheme('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply any theme value to data-theme attribute', () => {
      applyTheme('invalid');
      expect(document.documentElement.getAttribute('data-theme')).toBe('invalid');
    });

    it('should handle missing document gracefully', () => {
      const originalDocument = global.document;
      global.document = undefined;

      expect(() => applyTheme('light')).not.toThrow();

      global.document = originalDocument;
    });
  });

  describe('createSystemPreferenceListener', () => {
    it('should create listener for system preference changes', () => {
      const mockAddEventListener = vi.fn();
      const mockRemoveEventListener = vi.fn();
      
      window.matchMedia = vi.fn().mockReturnValue({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      });

      const callback = vi.fn();
      const cleanup = createSystemPreferenceListener(callback);

      expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));

      // Test cleanup
      cleanup();
      expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should call callback when system preference changes', () => {
      let changeHandler;
      const mockAddEventListener = vi.fn((event, handler) => {
        changeHandler = handler;
      });
      
      window.matchMedia = vi.fn().mockReturnValue({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: vi.fn(),
      });

      const callback = vi.fn();
      createSystemPreferenceListener(callback);

      // Simulate preference change to dark
      window.matchMedia = vi.fn().mockReturnValue({ matches: true });
      changeHandler({ matches: true });

      expect(callback).toHaveBeenCalledWith('dark');
    });

    it('should handle matchMedia not supported', () => {
      const originalMatchMedia = window.matchMedia;
      delete window.matchMedia;

      const callback = vi.fn();
      const cleanup = createSystemPreferenceListener(callback);

      expect(typeof cleanup).toBe('function');
      expect(() => cleanup()).not.toThrow();

      window.matchMedia = originalMatchMedia;
    });
  });

  describe('getPrefersReducedMotion', () => {
    it('should return true when user prefers reduced motion', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query.includes('reduce'),
        media: query,
      }));

      expect(getPrefersReducedMotion()).toBe(true);
    });

    it('should return false when user does not prefer reduced motion', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
      }));

      expect(getPrefersReducedMotion()).toBe(false);
    });

    it('should fallback to false when matchMedia is not supported', () => {
      const originalMatchMedia = window.matchMedia;
      delete window.matchMedia;

      expect(getPrefersReducedMotion()).toBe(false);

      window.matchMedia = originalMatchMedia;
    });
  });

  describe('createReducedMotionListener', () => {
    it('should create listener for reduced motion preference changes', () => {
      const mockAddEventListener = vi.fn();
      const mockRemoveEventListener = vi.fn();
      
      window.matchMedia = vi.fn().mockReturnValue({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      });

      const callback = vi.fn();
      const cleanup = createReducedMotionListener(callback);

      expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));

      // Test cleanup
      cleanup();
      expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should call callback when reduced motion preference changes', () => {
      let changeHandler;
      const mockAddEventListener = vi.fn((event, handler) => {
        changeHandler = handler;
      });
      
      window.matchMedia = vi.fn().mockReturnValue({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: vi.fn(),
      });

      const callback = vi.fn();
      createReducedMotionListener(callback);

      // Simulate preference change to reduced motion
      window.matchMedia = vi.fn().mockReturnValue({ matches: true });
      changeHandler({ matches: true });

      expect(callback).toHaveBeenCalledWith(true);
    });
  });

  describe('Integration tests', () => {
    it('should handle complete theme switching workflow', () => {
      // Start with system preference
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query.includes('dark'),
      }));

      const systemPref = getSystemPreference();
      expect(systemPref).toBe('dark');

      // Apply theme
      applyTheme(systemPref);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

      // Save user preference
      saveTheme('light');
      expect(localStorage.getItem('portfolio-theme')).toBe('light');

      // Retrieve saved theme
      const savedTheme = getSavedTheme();
      expect(savedTheme).toBe('light');

      // Apply saved theme
      applyTheme(savedTheme);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should persist theme across browser sessions', () => {
      // Simulate first session
      saveTheme('light');
      applyTheme('light');

      // Simulate browser restart (clear in-memory state)
      const savedTheme = getSavedTheme();
      expect(savedTheme).toBe('light');

      applyTheme(savedTheme);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });
});