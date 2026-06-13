import React from 'react';

import { getStyles } from './styles';

import themePlaceholder from '../../assets/theme_placeholder.png';

import { GAME_THEMES } from './types';
import type { HomePageProps } from './types';

const HomePage: React.FC<HomePageProps> = ({ theme }) => {
  const styles = getStyles(theme);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-glow-title" style={styles.heroTitle}>DOTSCONNECT</h1>
        <p className="hero-tagline" style={styles.heroTagline}>CONNECT THE DOTS • CLEAR THE BOARD</p>
        <p className="hero-description">Experience over 600+ handcrafted neon puzzles. Guide glowing paths, avoid hazards, and unlock beautiful custom themes in this ultimate flow connection challenge.</p>

        <div className="download-buttons">
          <a href="#download-android" className="btn-download btn-primary">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.5,12.14L17.87,12.95L3,20.3L16.55,12.65L17.87,11.33M3,3.7L17.87,11.05L16.55,11.35L3,3.7Z"/>
            </svg>
            Get it on Google Play
          </a>
        </div>
      </section>

      {/* VISUAL SHOWCASE */}
      <section className="showcase-section reveal-on-scroll">
        <h2 className="section-title" style={styles.showcaseTitle}>Visual Showcase</h2>
        <p className="section-subtitle" style={styles.showcaseSubtitle}>Explore 10 gorgeous, handcrafted themes. Customize your gaming board to fit your vibe.</p>
        
        <div className="showcase-list">
          {GAME_THEMES.map((themeItem, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={themeItem.id} 
                className={`showcase-row reveal-on-scroll theme-${themeItem.id} ${isEven ? 'row-even' : 'row-odd'}`}
              >
                <div className="showcase-text-col">
                  <div className="theme-meta">
                    <span className="theme-emoji">{themeItem.emoji}</span>
                    {themeItem.isFree && <span className="theme-badge">Free</span>}
                  </div>
                  <h3 className="theme-name">
                    {themeItem.name}
                  </h3>
                  <p className="theme-description">
                    {themeItem.description}
                  </p>
                </div>
                <div className="showcase-image-col">
                  <div className="theme-image-wrapper">
                    <img 
                      src={themePlaceholder} 
                      alt={`${themeItem.name} Theme Preview`} 
                      className="theme-showcase-image" 
                    />
                  </div>
                </div>
              </div>
            );
          })}
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
          <p className="cta-desc">Start connecting today. Download Dots Connect for free on Android!</p>
          <div className="download-buttons" style={styles.ctaButtons}>
            <a href="#download-android" className="btn-download btn-primary">
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

