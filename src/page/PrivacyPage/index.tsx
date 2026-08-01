import React, { useState, useEffect, useRef } from 'react';

import { getStyles } from './styles';

import type { PrivacyPageProps } from './types';

// Helper component for Collapsible Accordion using Children
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = `${el.scrollHeight}px`;
    } else {
      el.style.maxHeight = '0px';
    }
  }, [isOpen]);

  return (
    <div className="accordion-item glass-panel">
      <div className="accordion-header" onClick={handleToggle}>
        <span className="accordion-title">{title}</span>
        <div className={`accordion-icon ${isOpen ? 'open' : ''}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div 
        ref={contentRef}
        className={`accordion-content-wrapper ${isOpen ? 'open' : ''}`}
      >
        <div className="accordion-content">
          {children}
        </div>
      </div>
    </div>
  );
};

const PrivacyPage: React.FC<PrivacyPageProps> = ({ theme }) => {
  const styles = getStyles(theme);

  return (
    <section className="legal-section reveal-on-scroll" style={styles.container}>
      <div className="legal-header">
        <h2 className="section-title">Privacy Policy</h2>
        <p className="section-subtitle">Effective Date: July 4, 2026</p>
        <p className="accordion-p" style={styles.introText}>
          At Dots Connect, we prioritize the privacy of our players. This Privacy Policy details the types of information we collect, how it is used, and your options regarding this data.
        </p>
      </div>
      
      <div className="accordion-group">
        <AccordionItem title="1. Information We Collect">
          <h4 style={styles.firstSubhead}>A. Local Gameplay Data</h4>
          <p className="accordion-p">To provide a persistent gaming experience, we store the following data locally on your device:</p>
          <ul className="accordion-list">
            <li>Level completion status and ratings (stars).</li>
            <li>In-game coin balance and unlocked themes.</li>
            <li>Daily challenge calendar achievements.</li>
          </ul>
          <p className="accordion-p" style={styles.paragraphSpacer}>
            This data is kept locally on your device's AsyncStorage and is not transmitted to external servers.
          </p>

          <h4 style={styles.subhead}>B. Device Permissions</h4>
          <p className="accordion-p">Dots Connect requests the following device integrations to operate:</p>
          <ul className="accordion-list">
            <li><strong>Vibration Control:</strong> Used to trigger haptic feedback loops during gameplay.</li>
            <li><strong>Local Storage Read/Write:</strong> Used to save your settings and progression state.</li>
          </ul>

          <h4 style={styles.subhead}>C. Analytics and Advertising</h4>
          <p className="accordion-p">
            We integrate third-party mobile advertising and analytics software development kits (SDKs). These tools may collect anonymous device-related metrics (such as Ad IDs or device type) to serve relevant advertisements and measure campaign attribution.
          </p>
        </AccordionItem>

        <AccordionItem title="2. Children's Privacy">
          <p className="accordion-p">
            Dots Connect is a general audience game and does not knowingly collect or request personal identifiable information from children under the age of 13.
          </p>
        </AccordionItem>

        <AccordionItem title="3. Data Retention and Deletion">
          <p className="accordion-p">
            Since all progression data is stored locally on your device, deleting the application from your device will permanently remove your stored coins, progression, and unlocked themes.
          </p>
        </AccordionItem>

        <AccordionItem title="4. Contact Us">
          <p className="accordion-p">
            For questions regarding this Privacy Policy, feel free to reach out to us at:
          </p>
          <ul className="accordion-list">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@dotsconnect-game.com" style={styles.emailText}>
                privacy@dotsconnect-game.com
              </a>
            </li>
          </ul>
        </AccordionItem>
      </div>
    </section>
  );
};

export default PrivacyPage;
