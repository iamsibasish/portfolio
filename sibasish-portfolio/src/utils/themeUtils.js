/**
 * Utility functions for theme detection and management
 */

/**
 * Detects the user's system color scheme preference
 * @returns {'light' | 'dark'} The system preference
 */
export const getSystemPreference = () => {
  if (typeof window === 'undefined') return 'dark';
  
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery.matches ? 'dark' : 'light';
  } catch (error) {
    console.warn('Failed to detect system preference:', error);
    return 'dark';
  }
};

/**
 * Gets the saved theme preference from localStorage
 * @returns {'light' | 'dark' | null} The saved theme or null if not found
 */
export const getSavedTheme = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return null;
  } catch (error) {
    console.warn('Failed to get saved theme:', error);
    return null;
  }
};

/**
 * Saves the theme preference to localStorage
 * @param {'light' | 'dark'} theme - The theme to save
 */
export const saveTheme = (theme) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('portfolio-theme', theme);
  } catch (error) {
    console.warn('Failed to save theme:', error);
  }
};

/**
 * Applies the theme to the document root
 * @param {'light' | 'dark'} theme - The theme to apply
 */
export const applyTheme = (theme) => {
  if (typeof document === 'undefined') return;
  
  document.documentElement.setAttribute('data-theme', theme);
};

/**
 * Creates a media query listener for system preference changes
 * @param {Function} callback - Function to call when preference changes
 * @returns {Function} Cleanup function to remove the listener
 */
export const createSystemPreferenceListener = (callback) => {
  if (typeof window === 'undefined') return () => {};
  
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      callback(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  } catch (error) {
    console.warn('Failed to create system preference listener:', error);
    return () => {};
  }
};