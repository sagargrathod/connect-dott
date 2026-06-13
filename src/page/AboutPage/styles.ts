import { COLORS } from '../../constants/colors';

export const getStyles = (theme: 'dark' | 'light') => {
  const isDark = theme === 'dark';
  const c = isDark ? COLORS.dark : COLORS.light;
  const primaryColor = c.accentPrimary;

  return {
    aboutCard: {
      borderColor: primaryColor,
      boxShadow: `0 0 25px ${isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(66, 133, 244, 0.1)'}`,
    },
    aboutTitle: {
      marginBottom: '30px',
    },
    aboutSubhead: {
      fontFamily: 'var(--font-heading)',
      fontSize: '1.35rem',
      fontWeight: 700,
      marginTop: '25px',
      marginBottom: '10px',
      color: primaryColor,
    },
    aboutLastParagraph: {
      marginBottom: '40px',
    },
    statNum: {
      color: primaryColor,
    },
    statLabel: {
      color: c.text,
    },
  };
};
