import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Tab trapping for mobile menu
      if (isMobileMenuOpen && event.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          '.nav-mobile-menu a, .nav-mobile-menu button, .theme-toggle, .nav-mobile-toggle'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on navigation
  const handleNavClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className="nav">
      <div className="nav-inner">
        {/* Logo/Name */}
        <motion.a 
          href="#top" 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sibasish
        </motion.a>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="nav-links">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="nav-link"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.a>
            ))}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        )}

        {/* Mobile Menu Button and Theme Toggle */}
        {isMobile && (
          <div className="nav-mobile-controls">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <motion.button
              className="nav-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${isMobileMenuOpen ? 'Close' : 'Open'} navigation menu`}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.button>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="nav-mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <nav className="nav-mobile-links" role="none">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="nav-mobile-link"
                    onClick={handleNavClick}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavClick();
                        window.location.href = item.href;
                      }
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                    role="menuitem"
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// Theme Toggle Component
function ThemeToggle({ theme, onToggle }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.button
      className="theme-toggle"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <motion.div
        className="theme-toggle-icon"
        initial={false}
        animate={{ rotate: theme === 'light' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" fill="currentColor"/>
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
