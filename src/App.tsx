import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Navigation from './navigation';
import HomePage from './page/HomePage';
import AboutPage from './page/AboutPage';
import PrivacyPage from './page/PrivacyPage';
import TermsPage from './page/TermsPage';

import type { TabType } from './navigation/types';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isTabNavigated, setIsTabNavigated] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Route Fallback & Synchronization on Mount
  useEffect(() => {
    // Check if URL search has SPA redirect query (e.g. ?/privacy-policy)
    const search = window.location.search;
    if (search.startsWith('?/')) {
      const targetRoute = '/' + search.slice(2).split('&')[0].split('?')[0];
      if (targetRoute && targetRoute !== '/' && location.pathname !== targetRoute) {
        navigate(targetRoute, { replace: true });
        return;
      }
    }

    // Check if raw pathname is a known route (e.g. /connect-dott/privacy-policy)
    let rawPath = window.location.pathname.toLowerCase();
    const base = (import.meta.env.BASE_URL || '/').toLowerCase();
    if (base !== '/' && rawPath.startsWith(base)) {
      rawPath = rawPath.slice(base.length - 1);
    }

    const isKnownRoute = [
      '/about',
      '/privacy',
      '/privacy-policy',
      '/terms',
      '/terms-and-conditions',
    ].includes(rawPath);

    if (isKnownRoute && location.pathname !== rawPath) {
      navigate(rawPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  // Read theme selection from query params (e.g. ?theme=light)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search || location.search);
    const themeParam = params.get('theme');
    if (themeParam === 'light' || themeParam === 'dark') {
      setTheme(themeParam);
    }
  }, [location.search]);

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
    const currentPath = location.pathname.toLowerCase();
    const isWebView = [
      '/about',
      '/privacy',
      '/privacy-policy',
      '/terms',
      '/terms-and-conditions',
    ].includes(currentPath);

    if (isWebView) {
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
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const getTabFromPath = (path: string): TabType => {
    const p = path.toLowerCase();
    if (p === '/about') return 'about';
    if (p === '/privacy' || p === '/privacy-policy') return 'privacy';
    if (p === '/terms' || p === '/terms-and-conditions') return 'terms';
    return 'home';
  };

  const currentPath = location.pathname.toLowerCase();
  const currentTab = getTabFromPath(currentPath);

  const handleTabChange = (tab: TabType) => {
    setIsTabNavigated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    switch (tab) {
      case 'about':
        navigate('/about');
        break;
      case 'privacy':
        navigate('/privacy-policy');
        break;
      case 'terms':
        navigate('/terms-and-conditions');
        break;
      case 'home':
      default:
        navigate('/');
        break;
    }
  };

  const isLegalOrAboutRoute = [
    '/about',
    '/privacy',
    '/privacy-policy',
    '/terms',
    '/terms-and-conditions',
  ].includes(currentPath);

  // Standalone Mobile WebView View:
  // Render clean webview card if loaded directly as legal/about URL without clicking website header tabs
  const isStandaloneWebView = isLegalOrAboutRoute && !isTabNavigated;

  if (isStandaloneWebView) {
    return (
      <div className="webview-page-container">
        {/* Background slowly morphing blobs */}
        <div className="blob-container">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="webview-content-card">
          <Routes>
            <Route path="/privacy" element={<PrivacyPage theme={theme} />} />
            <Route path="/privacy-policy" element={<PrivacyPage theme={theme} />} />
            <Route path="/terms" element={<TermsPage theme={theme} />} />
            <Route path="/terms-and-conditions" element={<TermsPage theme={theme} />} />
            <Route path="/about" element={<AboutPage theme={theme} />} />
            <Route path="*" element={<Navigate to="/privacy-policy" replace />} />
          </Routes>
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
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="/about" element={<AboutPage theme={theme} />} />
          <Route path="/privacy" element={<PrivacyPage theme={theme} />} />
          <Route path="/privacy-policy" element={<PrivacyPage theme={theme} />} />
          <Route path="/terms" element={<TermsPage theme={theme} />} />
          <Route path="/terms-and-conditions" element={<TermsPage theme={theme} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Navigation>
    </>
  );
}

export default App;
