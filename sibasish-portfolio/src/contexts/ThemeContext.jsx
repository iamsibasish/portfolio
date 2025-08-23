import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getSystemPreference, 
  getSavedTheme, 
  saveTheme, 
  applyTheme, 
  createSystemPreferenceListener,
  getPrefersReducedMotion,
  createReducedMotionListener
} from '../utils/themeUtils.js';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme immediately to prevent flash
    const savedTheme = getSavedTheme();
    return savedTheme || getSystemPreference();
  });
  const [systemPreference, setSystemPreference] = useState(() => getSystemPreference());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => getPrefersReducedMotion());

  // Set up system preference listeners
  useEffect(() => {
    const cleanupTheme = createSystemPreferenceListener(setSystemPreference);
    const cleanupMotion = createReducedMotionListener(setPrefersReducedMotion);
    
    return () => {
      cleanupTheme();
      cleanupMotion();
    };
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemPreference);
    }
  }, [systemPreference]);

  // Apply theme to document root
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Apply reduced motion preference to document root
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-reduced-motion', prefersReducedMotion.toString());
    }
  }, [prefersReducedMotion]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
    systemPreference,
    prefersReducedMotion
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};