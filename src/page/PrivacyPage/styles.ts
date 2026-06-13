import type { CSSProperties } from 'react';

import { COLORS } from '../../constants/colors';

export const getStyles = (theme: 'dark' | 'light'): Record<string, CSSProperties> => {
  const isDark = theme === 'dark';
  const c = isDark ? COLORS.dark : COLORS.light;
  const highlightColor = isDark ? c.accentPrimary : c.accentSecondary;

  return {
    container: {
      color: c.text,
    },
    subhead: {
      fontFamily: 'var(--font-heading)',
      fontSize: '1.05rem',
      fontWeight: 700,
      marginTop: '20px',
      marginBottom: '8px',
      color: highlightColor,
    },
    firstSubhead: {
      fontFamily: 'var(--font-heading)',
      fontSize: '1.05rem',
      fontWeight: 700,
      marginTop: '0px',
      marginBottom: '8px',
      color: highlightColor,
    },
    emailText: {
      color: highlightColor,
      fontWeight: 600,
      textDecoration: 'none',
    },
    paragraphSpacer: {
      marginTop: '10px',
    },
    introText: {
      marginTop: '20px',
      textAlign: 'center',
    },
  };
};
