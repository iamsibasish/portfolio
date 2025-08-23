import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import * as themeUtils from '../utils/themeUtils';

// Mock the theme utils
vi.mock('../utils/themeUtils', () => ({
  getSystemPreference: vi.fn(() => 'dark'),
  getSavedTheme: vi.fn(() => null),
  saveTheme: vi.fn(),
  applyTheme: vi.fn(),
  createSystemPreferenceListener: vi.fn(() => () => {}),
  getPrefersReducedMotion: vi.fn(() => false),
  createReducedMotionListener: vi.fn(() => () => {}),
}));

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, toggleTheme, systemPreference, prefersReducedMotion } = useTheme();
  
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <div data-testid="system-preference">{systemPreference}</div>
      <div data-testid="reduced-motion">{prefersReducedMotion.toString()}</div>
      <button onClick={toggleTheme} data-testid="toggle-theme">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with system preference when no saved theme', () => {
    themeUtils.getSavedTheme.mockReturnValue(null);
    themeUtils.getSystemPreference.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('system-preference')).toHaveTextContent('dark');
  });

  it('should initialize with saved theme when available', () => {
    themeUtils.getSavedTheme.mockReturnValue('light');
    themeUtils.getSystemPreference.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should toggle theme correctly', async () => {
    const user = userEvent.setup();
    themeUtils.getSavedTheme.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    await user.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(themeUtils.saveTheme).toHaveBeenCalledWith('light');
  });

  it('should apply theme to document when theme changes', () => {
    themeUtils.getSavedTheme.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(themeUtils.applyTheme).toHaveBeenCalledWith('dark');
  });

  it('should handle reduced motion preference', () => {
    themeUtils.getPrefersReducedMotion.mockReturnValue(true);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
  });

  it('should set up system preference listeners', () => {
    const mockCleanup = vi.fn();
    themeUtils.createSystemPreferenceListener.mockReturnValue(mockCleanup);
    themeUtils.createReducedMotionListener.mockReturnValue(mockCleanup);

    const { unmount } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(themeUtils.createSystemPreferenceListener).toHaveBeenCalled();
    expect(themeUtils.createReducedMotionListener).toHaveBeenCalled();

    unmount();

    expect(mockCleanup).toHaveBeenCalledTimes(2);
  });

  it('should throw error when useTheme is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  it('should persist theme across browser sessions', async () => {
    const user = userEvent.setup();
    themeUtils.getSavedTheme.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByTestId('toggle-theme'));

    expect(themeUtils.saveTheme).toHaveBeenCalledWith('light');
  });

  it('should update theme when system preference changes', async () => {
    let systemPreferenceCallback;
    themeUtils.createSystemPreferenceListener.mockImplementation((callback) => {
      systemPreferenceCallback = callback;
      return () => {};
    });
    themeUtils.getSavedTheme.mockReturnValue(null);
    themeUtils.getSystemPreference.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    // Simulate system preference change
    act(() => {
      systemPreferenceCallback('light');
    });

    await waitFor(() => {
      expect(screen.getByTestId('system-preference')).toHaveTextContent('light');
    });
  });
});