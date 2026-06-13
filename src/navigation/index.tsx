import React, { useState, useEffect } from 'react';

import { getStyles } from './styles';

import type { NavigationProps } from './types';

const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  theme,
  toggleTheme,
  children,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const styles = getStyles(theme);

  const handleHomeClick = () => onTabChange('home');
  const handleAboutClick = () => onTabChange('about');
  const handlePrivacyClick = () => onTabChange('privacy');
  const handleTermsClick = () => onTabChange('terms');

  return (
    <>
      <header 
        className={`app-header glass-panel ${isScrolled ? 'scrolled' : ''}`}
        style={styles.header}
      >
        <div className="logo-section" onClick={handleHomeClick}>
          <div className="logo-icon-circle">
            <svg 
              viewBox="0 0 512 512" 
              className="logo-icon-svg"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="32"
            >
              <circle cx="256" cy="256" r="96" />
              <line x1="32" y1="256" x2="160" y2="256" strokeLinecap="round" />
              <line x1="352" y1="256" x2="480" y2="256" strokeLinecap="round" />
            </svg>
          </div>
          <span className="logo-text" style={styles.logoText}>
            DOTS<span style={styles.logoSpan}>CONNECT</span>
          </span>
        </div>

        <nav>
          <ul className="nav-links">
            <li 
              className={`nav-link ${currentTab === 'home' ? 'active' : ''}`} 
              onClick={handleHomeClick}
            >
              Home
            </li>
            <li 
              className={`nav-link ${currentTab === 'about' ? 'active' : ''}`} 
              onClick={handleAboutClick}
            >
              About Us
            </li>
            <li 
              className={`nav-link ${currentTab === 'privacy' ? 'active' : ''}`} 
              onClick={handlePrivacyClick}
            >
              Privacy Policy
            </li>
            <li 
              className={`nav-link ${currentTab === 'terms' ? 'active' : ''}`} 
              onClick={handleTermsClick}
            >
              Terms & Conditions
            </li>
          </ul>
        </nav>

        <div className="nav-controls">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            aria-label="Toggle Dark/Light Mode"
            style={styles.themeToggleBtn}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="app-footer" style={styles.footer}>
        <div className="footer-nav">
          <span className="footer-link" onClick={handleHomeClick}>Home</span>
          <span className="footer-link" onClick={handleAboutClick}>About Us</span>
          <span className="footer-link" onClick={handlePrivacyClick}>Privacy Policy</span>
          <span className="footer-link" onClick={handleTermsClick}>Terms & Conditions</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Dots Connect. All rights reserved. Made with love for puzzle solvers.</p>
      </footer>
    </>
  );
};

export default Navigation;
