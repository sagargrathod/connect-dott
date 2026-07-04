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
  const [isWebViewPath, setIsWebViewPath] = useState<boolean>(false);
  const [webViewRoute, setWebViewRoute] = useState<string>('');

  // Handle pathname routing and theme query params
  useEffect(() => {
    let path = window.location.pathname.toLowerCase();
    
    // Normalize path by stripping base URL if applicable (e.g. /connect-dott/about -> /about)
    const base = (import.meta.env.BASE_URL || '/').toLowerCase();
    if (base !== '/' && path.startsWith(base)) {
      path = path.slice(base.length - 1);
    } else if (base !== '/' && path === base.slice(0, -1)) {
      path = '/';
    }

    // Support hash routing fallback for static hosting (e.g. /#/privacy-policy)
    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#/')) {
      path = hash.slice(1);
    }
    
    // Check if current URL matches a standalone webview route
    const isLegalOrAboutPath = [
      '/about',
      '/privacy',
      '/privacy-policy',
      '/terms',
      '/terms-and-conditions',
    ].includes(path);

    if (isLegalOrAboutPath) {
      setIsWebViewPath(true);
      setWebViewRoute(path);
    } else {
      setIsWebViewPath(false);
      setWebViewRoute('');
    }

    // Read theme selection from query params (e.g. ?theme=light)
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');
    if (themeParam === 'light' || themeParam === 'dark') {
      setTheme(themeParam);
    }
  }, []);

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
    if (isWebViewPath) {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => el.classList.add('active'));
      return;
    }

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
  }, [currentTab, isWebViewPath]);

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Standalone Mobile WebView View
  if (isWebViewPath) {
    return (
      <div className="webview-page-container">
        {/* Background slowly morphing blobs */}
        <div className="blob-container">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="webview-content-card">
          {(webViewRoute === '/privacy' || webViewRoute === '/privacy-policy') && (
            <PrivacyPage theme={theme} />
          )}
          {(webViewRoute === '/terms' || webViewRoute === '/terms-and-conditions') && (
            <TermsPage theme={theme} />
          )}
          {webViewRoute === '/about' && (
            <AboutPage theme={theme} />
          )}
        </div>
      </div>
    );
  }

  // Full Landing Page View
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
