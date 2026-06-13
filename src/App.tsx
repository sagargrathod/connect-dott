import { useState, useEffect } from 'react';

import './App.css';

import Navigation from './navigation';
import HomePage from './page/HomePage';
import AboutPage from './page/AboutPage';
import PrivacyPage from './page/PrivacyPage';
import TermsPage from './page/TermsPage';

import type { TabType } from './navigation/types';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Handle scroll events to update CSS scroll variable
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--scroll-y', window.scrollY.toString());
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Synchronize CSS class with dark/light mode
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Scroll reveal setup using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [currentTab]);

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* Background slowly morphing blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navigation and Router Layout Wrapper */}
      <Navigation
        currentTab={currentTab}
        onTabChange={handleTabChange}
        theme={theme}
        toggleTheme={toggleTheme}
      >
        {currentTab === 'home' && <HomePage theme={theme} />}
        {currentTab === 'about' && <AboutPage theme={theme} />}
        {currentTab === 'privacy' && <PrivacyPage theme={theme} />}
        {currentTab === 'terms' && <TermsPage theme={theme} />}
      </Navigation>
    </>
  );
}

export default App;
