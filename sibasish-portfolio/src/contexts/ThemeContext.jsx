import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getSystemPreference, 
  getSavedTheme, 
  saveTheme, 
  applyTheme, 
  createSystemPreferenceListener 
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

  // Set up system preference listener
  useEffect(() => {
    const cleanup = createSystemPreferenceListener(setSystemPreference);
    return cleanup;
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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
    systemPreference
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};