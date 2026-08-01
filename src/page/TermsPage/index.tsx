import React, { useState, useEffect, useRef } from 'react';

import { getStyles } from './styles';

import type { TermsPageProps } from './types';

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

const TermsPage: React.FC<TermsPageProps> = ({ theme }) => {
  const styles = getStyles(theme);

  return (
    <section className="legal-section reveal-on-scroll" style={styles.container}>
      <div className="legal-header">
        <h2 className="section-title">Terms & Conditions</h2>
        <p className="section-subtitle">Last Updated: July 4, 2026</p>
        <p className="accordion-p" style={styles.introText}>
          Welcome to Dots Connect! By installing and playing the game, you agree to comply with and be bound by the following Terms & Conditions.
        </p>
      </div>

      <div className="accordion-group">
        <AccordionItem title="1. License Grant">
          <p className="accordion-p">
            Dots Connect grants you a personal, non-exclusive, non-transferable, revocable, and limited license to install and use the application on compatible mobile devices for your personal, non-commercial entertainment.
          </p>
        </AccordionItem>

        <AccordionItem title="2. In-Game Economy & Currency">
          <ul className="accordion-list">
            <li>
              <strong>Coins and Hints:</strong> The virtual currency (Gold Coins) and item inventory (Hints) obtained within Dots Connect are digital-only assets.
            </li>
            <li>
              <strong>No Cash Value:</strong> In-game assets hold no monetary value, cannot be redeemed for real-world currency, and cannot be transferred, sold, or traded.
            </li>
            <li>
              <strong>Loss of Data:</strong> Clearing local application storage or deleting the app from your device may permanently erase your coin balances and hints. We do not provide restorations or refunds for locally lost items.
            </li>
          </ul>
        </AccordionItem>

        <AccordionItem title="3. Acceptable Use">
          <p className="accordion-p">Players agree not to:</p>
          <ul className="accordion-list">
            <li>Reverse engineer, decompile, or disassemble game files.</li>
            <li>Employ automated cheat scripts, bots, hacks, or mods.</li>
            <li>Exploit software errors to bypass level ratings, lives restrictions, or item purchases.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="4. Intellectual Property">
          <p className="accordion-p">
            All puzzle configurations, logic engines, audio assets, visual icons, themes, logo animations, and brand designations (specifically &quot;DOTSCONNECT&quot;) are the exclusive intellectual property of the game developers and are protected under international copyright and trademark laws.
          </p>
        </AccordionItem>

        <AccordionItem title="5. Limitation of Liability">
          <p className="accordion-p">
            The game is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. Under no circumstances shall the developers be held liable for any direct, indirect, incidental, or consequential damages resulting from app downtime, device issues, or loss of local gameplay data.
          </p>
        </AccordionItem>

        <AccordionItem title="6. Contact Information">
          <p className="accordion-p">
            For any legal inquiries regarding these terms, please contact:
          </p>
          <ul className="accordion-list">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@dotsconnect-game.com" style={styles.emailText}>
                support@dotsconnect-game.com
              </a>
            </li>
          </ul>
        </AccordionItem>
      </div>
    </section>
  );
};

export default TermsPage;
