import React from 'react';

import { getStyles } from './styles';

import type { AboutPageProps } from './types';

const AboutPage: React.FC<AboutPageProps> = ({ theme }) => {
  const styles = getStyles(theme);

  return (
    <section className="about-section reveal-on-scroll">
      <div className="about-card glass-panel" style={styles.aboutCard}>
        <h2 className="section-title" style={styles.aboutTitle}>The Vision Behind the Connection</h2>
        
        <h3 style={styles.aboutSubhead}>Our Mission</h3>
        <p className="about-p">
          Dots Connect was born from a simple desire: to transform classic grid-routing puzzles into a vibrant, multisensory, neon art form. We believe puzzle games shouldn't just exercise the mind, they should soothe the eyes and fingers. With custom soundscapes, rich haptic responses, and adaptive themes, we've built a sandbox of color and logic.
        </p>

        <h3 style={styles.aboutSubhead}>Handcrafted Level Design</h3>
        <p className="about-p">
          Every single one of our 600+ levels is manually designed, tested, and verified to ensure multiple viable routing paths. From the relaxing grids of Easy Mode to the obstacle-filled hazard zones of Medium Mode and the complex geometric perimeters of Hard/Expert Mode, every puzzle represents a unique path toward order.
        </p>

        <h3 style={styles.aboutSubhead}>Play-to-Win Integrity</h3>
        <p className="about-p" style={styles.aboutLastParagraph}>
          Created by an independent game development studio dedicated to crafting clean, high-performance mobile experiences. We abide by strict, ad-supported and coin-rewarded fair play—no pay-to-win mechanics, just pure logic and concentration.
        </p>
        
        <div className="about-highlight-box">
          <div className="about-stat-item">
            <div className="about-stat-num" style={styles.statNum}>10M+</div>
            <div className="about-stat-label" style={styles.statLabel}>Active Players</div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-num" style={styles.statNum}>4.8</div>
            <div className="about-stat-label" style={styles.statLabel}>App Store Rating</div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-num" style={styles.statNum}>500+</div>
            <div className="about-stat-label" style={styles.statLabel}>Unique Levels</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
