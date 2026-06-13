import React, { useState } from 'react';

import { getStyles } from './styles';

import { COLORS } from '../../constants/colors';

import type { HomePageProps } from './types';

const HomePage: React.FC<HomePageProps> = ({ theme }) => {
  const [showcaseTheme, setShowcaseTheme] = useState<'midnightNeon' | 'retroPink' | 'cyberGold' | 'oceanDrift'>('midnightNeon');

  const styles = getStyles(theme);

  const selectMidnight = () => setShowcaseTheme('midnightNeon');
  const selectRetro = () => setShowcaseTheme('retroPink');
  const selectCyber = () => setShowcaseTheme('cyberGold');
  const selectOcean = () => setShowcaseTheme('oceanDrift');

  // Showcase grid definition
  const renderShowcaseGrid = () => {
    const activeThemeConf = COLORS.themes[showcaseTheme];
    const gridDots = [];

    // Helper map of coordinates to target theme connected paths
    const pathDots: Record<string, string> = {};
    if (showcaseTheme === 'midnightNeon') {
      pathDots['0,0'] = activeThemeConf.dots[0];
      pathDots['1,0'] = activeThemeConf.dots[0];
      pathDots['1,1'] = activeThemeConf.dots[0];
      pathDots['1,2'] = activeThemeConf.dots[0];
      pathDots['2,2'] = activeThemeConf.dots[0];
      pathDots['2,3'] = activeThemeConf.dots[0];
    } else if (showcaseTheme === 'retroPink') {
      pathDots['4,4'] = activeThemeConf.dots[0];
      pathDots['3,4'] = activeThemeConf.dots[0];
      pathDots['3,3'] = activeThemeConf.dots[0];
      pathDots['2,3'] = activeThemeConf.dots[0];
      pathDots['2,2'] = activeThemeConf.dots[0];
      pathDots['1,2'] = activeThemeConf.dots[0];
    } else if (showcaseTheme === 'cyberGold') {
      pathDots['0,4'] = activeThemeConf.dots[0];
      pathDots['1,4'] = activeThemeConf.dots[0];
      pathDots['1,3'] = activeThemeConf.dots[0];
      pathDots['2,3'] = activeThemeConf.dots[0];
      pathDots['3,3'] = activeThemeConf.dots[0];
      pathDots['3,2'] = activeThemeConf.dots[0];
    } else {
      pathDots['2,0'] = activeThemeConf.dots[0];
      pathDots['2,1'] = activeThemeConf.dots[0];
      pathDots['3,1'] = activeThemeConf.dots[0];
      pathDots['3,2'] = activeThemeConf.dots[0];
      pathDots['4,2'] = activeThemeConf.dots[0];
      pathDots['4,3'] = activeThemeConf.dots[0];
    }

    // SVG path string matching the coordinates
    const pathD = showcaseTheme === 'midnightNeon'
      ? 'M 10,10 L 30,10 L 30,30 L 30,50 L 50,50 L 50,70'
      : showcaseTheme === 'retroPink'
      ? 'M 90,90 L 70,90 L 70,70 L 50,70 L 50,50 L 30,50'
      : showcaseTheme === 'cyberGold'
      ? 'M 10,90 L 30,90 L 30,70 L 50,70 L 70,70 L 70,50'
      : 'M 50,10 L 50,30 L 70,30 L 70,50 L 90,50 L 90,70';

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const coordKey = `${col},${row}`;
        const isPath = coordKey in pathDots;
        let color = activeThemeConf.dots[(row + col) % activeThemeConf.dots.length];
        if (isPath) {
          color = pathDots[coordKey];
        }

        gridDots.push(
          <div 
            key={coordKey} 
            className={`game-mock-dot ${isPath ? 'active' : ''}`}
            style={{ color: color }}
          />
        );
      }
    }

    return (
      <div className="showcase-board-grid" style={styles.showcaseGrid}>
        <svg className="game-svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d={pathD} 
            fill="none" 
            stroke={activeThemeConf.line} 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="connection-line"
          />
        </svg>
        {gridDots}
      </div>
    );
  };

  // Smartphone mockup board renderer
  const renderPhoneBoard = () => {
    const activeAccent = styles.phoneAccent;
    const secondaryAccent = styles.phoneSecondary;
    const gridDots = [];

    const pathDots: Record<string, boolean> = {
      '0,2': true,
      '1,2': true,
      '2,2': true,
      '2,3': true,
      '3,3': true,
      '3,4': true
    };

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const coordKey = `${col},${row}`;
        const isPath = coordKey in pathDots;
        const color = isPath ? activeAccent : ((row + col) % 3 === 0 ? secondaryAccent : styles.phoneMuted);

        gridDots.push(
          <div 
            key={coordKey} 
            className={`game-mock-dot ${isPath ? 'active' : ''}`}
            style={{ color: color }}
          />
        );
      }
    }

    return (
      <div className="game-mock-board">
        <svg className="game-svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M 10,50 L 30,50 L 50,50 L 50,70 L 70,70 L 70,90" 
            fill="none" 
            stroke={activeAccent as string} 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="connection-line"
          />
        </svg>
        {gridDots}
      </div>
    );
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-glow-title" style={styles.heroTitle}>DOTSCONNECT</h1>
        <p className="hero-tagline" style={styles.heroTagline}>CONNECT THE DOTS • CLEAR THE BOARD</p>
        <p className="hero-description">Experience over 600+ handcrafted neon puzzles. Guide glowing paths, avoid hazards, and unlock beautiful custom themes in this ultimate flow connection challenge.</p>

        <div className="download-buttons">
          <a href="#download-ios" className="btn-download btn-primary">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.24 12.37,21.24C10.84,21.24 10.37,21.97 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z"/>
            </svg>
            Download on the App Store
          </a>
          <a href="#download-android" className="btn-download btn-secondary">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.5,12.14L17.87,12.95L3,20.3L16.55,12.65L17.87,11.33M3,3.7L17.87,11.05L16.55,11.35L3,3.7Z"/>
            </svg>
            Get it on Google Play
          </a>
        </div>

        {/* Parallax SVG connector lines behind phone mockup */}
        <svg className="bg-connection-canvas" viewBox="0 0 800 500">
          <path 
            d="M 400,200 L 120,80 M 400,250 L 50,320 M 400,300 L 220,480 M 400,200 L 680,60 M 400,280 L 720,400" 
            stroke={styles.phoneAccent as string} 
            strokeWidth="2" 
            opacity="0.3" 
            fill="none" 
            strokeDasharray="5 5" 
          />
        </svg>

        {/* Smartphone scale zooming mockup */}
        <div className="smartphone-wrap">
          <div className="smartphone-device">
            <div className="smartphone-notch"></div>
            <div className="smartphone-screen">
              <div className="game-mock-header">
                <div className="game-mock-stat">
                  <span className="game-mock-label">Level</span>
                  <span className="game-mock-val">14</span>
                </div>
                <div className="game-mock-stat">
                  <span className="game-mock-label">Score</span>
                  <span className="game-mock-val">2,450</span>
                </div>
                <div className="game-mock-lives">
                  <span className="game-mock-heart">♥</span>
                  <span className="game-mock-heart">♥</span>
                  <span className="game-mock-heart">♥</span>
                </div>
              </div>
              {renderPhoneBoard()}
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE THEME SWITCHER */}
      <section className="showcase-section reveal-on-scroll">
        <h2 className="section-title" style={styles.showcaseTitle}>Visual Showcase</h2>
        <p className="section-subtitle" style={styles.showcaseSubtitle}>Switch between 10 gorgeous, interactive themes on the fly. From Midnight Neon to Golden Hour, customize your gaming board to fit your mood.</p>
        
        <div className="showcase-container glass-panel" style={styles.showcaseContainer}>
          <div className="showcase-controls">
            <button 
              className={`showcase-btn ${showcaseTheme === 'midnightNeon' ? 'active' : ''}`}
              onClick={selectMidnight}
            >
              <span className="showcase-btn-title">Midnight Neon</span>
              <span className="showcase-btn-desc">High contrast neon cyan and pink on deep black velvet.</span>
            </button>

            <button 
              className={`showcase-btn ${showcaseTheme === 'retroPink' ? 'active' : ''}`}
              onClick={selectRetro}
            >
              <span className="showcase-btn-title">Retro Pink</span>
              <span className="showcase-btn-desc">Soft magenta hues paired with warm orange connections.</span>
            </button>

            <button 
              className={`showcase-btn ${showcaseTheme === 'cyberGold' ? 'active' : ''}`}
              onClick={selectCyber}
            >
              <span className="showcase-btn-title">Cyber Gold</span>
              <span className="showcase-btn-desc">A gold-and-amber glow over high-tech dark charcoal.</span>
            </button>

            <button 
              className={`showcase-btn ${showcaseTheme === 'oceanDrift' ? 'active' : ''}`}
              onClick={selectOcean}
            >
              <span className="showcase-btn-title">Ocean Drift</span>
              <span className="showcase-btn-desc">Deep navy backdrops offset with cool mint and sky blue dots.</span>
            </button>
          </div>

          <div className="showcase-preview-wrapper">
            <div 
              className="showcase-board-outer" 
              style={styles.showcaseOuter(COLORS.themes[showcaseTheme].bg)}
            >
              <div className="showcase-board-header">
                {COLORS.themes[showcaseTheme].name}
              </div>
              {renderShowcaseGrid()}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section reveal-on-scroll">
        <h2 className="section-title">Uncompromising Features</h2>
        <p className="section-subtitle">Every element of Dots Connect is crafted to deliver smooth puzzle solving and sensory satisfaction.</p>

        <div className="features-grid">
          <div className="glass-card glass-panel">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="feature-title">Precision Survival (3 Lives System)</h3>
            <p className="feature-desc">Plot your paths carefully! Connecting matching dots requires precise routing. Cutting or crossing existing paths will consume one of your 3 lifelines.</p>
          </div>

          <div className="glass-card glass-panel">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="feature-title">Solve & Unlock (The Theme Store)</h3>
            <p className="feature-desc">Earn Gold Coins by achieving perfect 3-star runs. Spend your coins in the shop to unlock 10 premium visual styles, including Retro Pink, Cyber Gold, and Neon Forest—each featuring customized light and dark configurations.</p>
          </div>

          <div className="glass-card glass-panel">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="feature-title">Daily Challenges</h3>
            <p className="feature-desc">Keep your brain sharp with unique puzzles every single day. Complete the Easy, Medium, and Hard daily tiers to earn bonus hints.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="cta-section reveal-on-scroll">
        <div className="cta-card glass-panel">
          <h2 className="cta-title">Ready to test your logic?</h2>
          <p className="cta-desc">Start connecting today. Download Dots Connect for free on iOS and Android!</p>
          <div className="download-buttons" style={styles.ctaButtons}>
            <a href="#download-ios" className="btn-download btn-primary">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.24 12.37,21.24C10.84,21.24 10.37,21.97 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z"/>
              </svg>
              Download on the App Store
            </a>
            <a href="#download-android" className="btn-download btn-secondary">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.5,12.14L17.87,12.95L3,20.3L16.55,12.65L17.87,11.33M3,3.7L17.87,11.05L16.55,11.35L3,3.7Z"/>
              </svg>
              Get it on Google Play
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
